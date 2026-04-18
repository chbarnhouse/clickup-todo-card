import { LitElement, html, TemplateResult, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCard, hasConfigOrEntityChanged, fireEvent } from 'custom-card-helpers';

import { ClickUpTodoCardConfig, ClickUpTask, ExtendedHassEntity } from './types';
import { CARD_VERSION, DEFAULT_CONFIG, PRIORITY_ICONS, PRIORITY_COLORS } from './const';
import { parseClickUpTasks } from './utils/clickup-data';
import { filterTasks } from './utils/filters';
import { sortTasks, groupTasks } from './utils/sort';
import { formatDate, formatCustomFieldValue, getInitials, isOverdue, getDateClass } from './utils/formatters';
import { styles } from './styles/card-styles';

console.info(
  `%c  CLICKUP-TODO-CARD  \n%c  Version ${CARD_VERSION}  `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

// Don't use decorator - will register manually after class definition
export class ClickUpTodoCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config: ClickUpTodoCardConfig = {
    type: 'custom:clickup-todo-card',
    entity: '',
    ...DEFAULT_CONFIG,
  };
  @state() private _tasks: ClickUpTask[] = [];
  @state() private _editingTask: ClickUpTask | null = null;
  @state() private _showAddDialog = false;
  @state() private _statusDropdownTask: string | null = null;

  public static async getConfigElement() {
    await import('./editor');
    return document.createElement('clickup-todo-card-editor');
  }

  public static getStubConfig(): Record<string, unknown> {
    return {
      type: 'custom:clickup-todo-card',
      entity: '',
      ...DEFAULT_CONFIG,
    };
  }

  public setConfig(config: ClickUpTodoCardConfig): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }

    this._config = {
      ...DEFAULT_CONFIG,
      ...config,
    };
  }

  public getCardSize(): number {
    return 3 + (this._tasks?.length || 0);
  }

  protected shouldUpdate(changedProps: Map<string | number | symbol, unknown>): boolean {
    if (!this._config || !this.hass) {
      return true; // Always update if we don't have config or hass yet
    }

    // Don't use hasConfigOrEntityChanged if we don't have a valid entity
    if (!this._config.entity) {
      return true;
    }

    try {
      return hasConfigOrEntityChanged(this, changedProps, false);
    } catch (e) {
      console.error('Error in shouldUpdate:', e);
      return true;
    }
  }

  protected render(): TemplateResult {
    try {
      if (!this._config || !this.hass) {
        return html`<ha-card><div class="warning">Loading...</div></ha-card>`;
      }

      if (!this._config.entity) {
        return html`
          <ha-card>
            <div class="warning">Please configure an entity in the card editor</div>
          </ha-card>
        `;
      }

      const stateObj = this.hass.states[this._config.entity] as ExtendedHassEntity;

      if (!stateObj) {
        return html`
          <ha-card>
            <div class="warning">Entity not found: ${this._config.entity}</div>
          </ha-card>
        `;
      }

      // Parse ClickUp tasks
      this._tasks = parseClickUpTasks(stateObj);

      // Apply filters
      const filteredTasks = filterTasks(this._tasks, this._config);

      // Apply sorting
      const sortedTasks = sortTasks(filteredTasks, this._config);

      // Group if needed
      const groupBy = this._config.group_by || 'none';
      const groups = groupTasks(sortedTasks, groupBy, this._config.group_field_id);

      const overlay = this._config.add_button_overlay !== false;
      const position = this._config.add_button_position || 'bottom-right';
      const showButtonBefore = !overlay && position.startsWith('top');
      const showButtonAfter = !overlay && position.startsWith('bottom');

      return html`
        <ha-card>
          ${this._renderHeader(stateObj)}
          ${showButtonBefore ? html`<div class="button-container">${this._renderFloatingAddButton(stateObj)}</div>` : ''}
          <div class="card-content ${this._config.compact_mode ? 'compact' : ''}">
            ${groups.size === 1 && groups.has('all')
              ? this._renderTaskList(groups.get('all')!)
              : this._renderGroupedTasks(groups)}
          </div>
          ${showButtonAfter ? html`<div class="button-container">${this._renderFloatingAddButton(stateObj)}</div>` : ''}
          ${overlay ? this._renderFloatingAddButton(stateObj) : ''}
        </ha-card>
        ${this._showAddDialog ? this._renderAddDialog() : ''}
        ${this._editingTask ? this._renderEditDialog() : ''}
      `;
    } catch (e) {
      console.error('Error rendering ClickUp Todo Card:', e);
      return html`
        <ha-card>
          <div class="warning">Error rendering card. Check console for details.</div>
        </ha-card>
      `;
    }
  }

  private _renderHeader(stateObj: ExtendedHassEntity): TemplateResult {
    if (this._config.hide_header) {
      return html``;
    }

    const title = this._config.title || stateObj.attributes.friendly_name || 'Tasks';
    const showCount = this._config.show_task_count !== false;
    const showTitle = this._config.hide_title !== true;

    if (!showTitle && !showCount) {
      return html``;
    }

    const taskCount = this._tasks.length;
    const isSingleDigit = taskCount < 10;

    return html`
      <div class="card-header">
        ${showTitle ? html`<div class="name">${title}</div>` : ''}
        ${showCount ? html`<div class="task-count ${isSingleDigit ? 'single-digit' : ''}">${taskCount}</div>` : ''}
      </div>
    `;
  }

  private _renderFloatingAddButton(stateObj: ExtendedHassEntity): TemplateResult {
    const unavailable = stateObj.state === 'unavailable';
    // If add_button_text is explicitly set (even to empty string), use it; otherwise default to 'Add Task'
    const buttonText = this._config.add_button_text !== undefined
      ? this._config.add_button_text
      : 'Add Task';
    const position = this._config.add_button_position || 'bottom-right';
    const overlay = this._config.add_button_overlay !== false;
    const iconOnly = buttonText === '';

    return html`
      <button
        class="floating-add-button ${position} ${iconOnly ? 'icon-only' : ''} ${overlay ? 'overlay' : 'non-overlay'}"
        ?disabled=${unavailable}
        @click=${this._openAddDialog}
      >
        <ha-icon icon="mdi:plus"></ha-icon>
        ${buttonText ? html`<span>${buttonText}</span>` : ''}
      </button>
    `;
  }

  private _renderGroupedTasks(groups: Map<string, ClickUpTask[]>): TemplateResult {
    const groupsArray = Array.from(groups.entries());

    return html`
      ${groupsArray.map(([groupName, tasks]) => html`
        <div class="task-group">
          <div class="group-header">
            <span class="group-name">${groupName}</span>
            <span class="group-count">${tasks.length}</span>
          </div>
          ${this._renderTaskList(tasks)}
        </div>
      `)}
    `;
  }

  private _renderTaskList(tasks: ClickUpTask[]): TemplateResult {
    if (!tasks || tasks.length === 0) {
      return html`
        <div class="empty-state">
          <ha-icon icon="mdi:check-circle-outline"></ha-icon>
          <span>No tasks</span>
        </div>
      `;
    }

    return html`
      <div class="tasks">
        ${tasks.map(task => this._renderTask(task))}
      </div>
    `;
  }

  private _renderTask(task: ClickUpTask): TemplateResult {
    const overdue = isOverdue(task);
    const completed = task.status === 'completed';
    const showStatus = this._config.show_status && task.clickup_status;
    const isDropdownOpen = this._statusDropdownTask === task.uid;

    return html`
      <div class="task-item ${completed ? 'completed' : ''} ${overdue ? 'overdue' : ''}">
        ${showStatus ? html`
          <div class="task-status-wrapper" @click=${(e: Event) => {
            e.stopPropagation();
            this._toggleStatusDropdown(task.uid);
          }}>
            ${this._renderStatus(task)}
            <ha-checkbox
              .checked=${completed}
              @change=${(e: Event) => {
                e.stopPropagation();
                this._toggleTask(task);
              }}
              @click=${(e: Event) => e.stopPropagation()}
            ></ha-checkbox>
            ${isDropdownOpen ? this._renderStatusDropdown(task) : ''}
          </div>
        ` : html`
          <div class="task-checkbox">
            <ha-checkbox
              .checked=${completed}
              @change=${() => this._toggleTask(task)}
            ></ha-checkbox>
          </div>
        `}

        <div class="task-main" @click=${() => this._openEditDialog(task)}>
          <div class="task-header">
            <span class="task-summary">${task.summary}</span>
            ${this._renderPriority(task)}
          </div>

          ${task.description ? html`
            <div class="task-description">${task.description}</div>
          ` : ''}

          <div class="task-metadata">
            ${this._renderDates(task)}
            ${this._renderTags(task)}
            ${this._renderAssignees(task)}
            ${this._renderCustomFields(task)}
          </div>
        </div>
      </div>
    `;
  }

  private _renderPriority(task: ClickUpTask): TemplateResult {
    if (!this._config.show_priority || task.priority === null || task.priority === undefined) {
      return html``;
    }

    const priority = task.priority as keyof typeof PRIORITY_ICONS;
    const icon = PRIORITY_ICONS[priority] || PRIORITY_ICONS[null as any];
    const color = PRIORITY_COLORS[priority] || PRIORITY_COLORS[null as any];

    return html`
      <ha-icon
        class="priority-icon"
        icon="${icon}"
        style="color: ${color}"
      ></ha-icon>
    `;
  }

  private _renderDates(task: ClickUpTask): TemplateResult {
    const showStart = this._config.show_start_date && task.start_date;
    const showDue = this._config.show_due_date && task.due;

    if (!showStart && !showDue) {
      return html``;
    }

    return html`
      <div class="task-dates">
        ${showStart ? html`
          <span class="date-item start-date">
            <ha-icon icon="mdi:calendar-start"></ha-icon>
            ${formatDate(task.start_date)}
          </span>
        ` : ''}

        ${showDue ? html`
          <span class="date-item due-date ${getDateClass(task.due)}">
            <ha-icon icon="mdi:calendar-end"></ha-icon>
            ${formatDate(task.due)}
          </span>
        ` : ''}
      </div>
    `;
  }

  private _renderStatus(task: ClickUpTask): TemplateResult {
    if (!task.clickup_status) {
      return html``;
    }

    const statusColor = task.clickup_status.color || 'var(--primary-color)';

    return html`
      <span class="status-badge" style="--status-color: ${statusColor}">
        ${task.clickup_status.status}
      </span>
    `;
  }

  private _renderTags(task: ClickUpTask): TemplateResult {
    if (!this._config.show_tags || !task.tags || task.tags.length === 0) {
      return html``;
    }

    return html`
      <div class="task-tags">
        ${task.tags.map(tag => html`
          <span
            class="tag"
            style="
              ${tag.tag_bg ? `background-color: ${tag.tag_bg};` : ''}
              ${tag.tag_fg ? `color: ${tag.tag_fg};` : ''}
            "
          >
            ${tag.name}
          </span>
        `)}
      </div>
    `;
  }

  private _renderAssignees(task: ClickUpTask): TemplateResult {
    if (!this._config.show_assignees || !task.assignees || task.assignees.length === 0) {
      return html``;
    }

    return html`
      <div class="task-assignees">
        ${task.assignees.map(assignee => html`
          <div
            class="assignee-avatar"
            style="${assignee.color ? `background-color: ${assignee.color}` : ''}"
            title="${assignee.username}"
          >
            ${assignee.profilePicture
              ? html`<img src="${assignee.profilePicture}" alt="${assignee.username}" />`
              : html`<span>${getInitials(assignee.username)}</span>`
            }
          </div>
        `)}
      </div>
    `;
  }

  private _renderCustomFields(task: ClickUpTask): TemplateResult {
    if (!this._config.show_custom_fields || !task.custom_fields || task.custom_fields.length === 0) {
      return html``;
    }

    // Filter to visible fields if specified
    let fields = task.custom_fields;
    if (this._config.visible_custom_fields && this._config.visible_custom_fields.length > 0) {
      fields = fields.filter(f => this._config.visible_custom_fields!.includes(f.id));
    }

    if (fields.length === 0) {
      return html``;
    }

    return html`
      <div class="custom-fields">
        ${fields.map(field => html`
          <div class="custom-field">
            <span class="field-name">${field.name}:</span>
            <span class="field-value">${formatCustomFieldValue(field)}</span>
          </div>
        `)}
      </div>
    `;
  }

  private async _toggleTask(task: ClickUpTask): Promise<void> {
    const newStatus = task.status === 'completed' ? 'needs_action' : 'completed';

    try {
      await this.hass.callService('todo', 'update_item', {
        entity_id: this._config.entity,
        item: task.uid,
        status: newStatus,
      });
    } catch (err) {
      console.error('Error toggling task:', err);
    }
  }

  private _toggleStatusDropdown(taskId: string): void {
    this._statusDropdownTask = this._statusDropdownTask === taskId ? null : taskId;
  }

  private _renderStatusDropdown(task: ClickUpTask): TemplateResult {
    // Common ClickUp statuses - this could be made dynamic by fetching from entity attributes
    const commonStatuses = [
      { name: 'TO DO', color: '#d3d3d3', type: 'open' },
      { name: 'IN PROGRESS', color: '#4194f6', type: 'custom' },
      { name: 'IN REVIEW', color: '#f6c342', type: 'custom' },
      { name: 'COMPLETE', color: '#6bc950', type: 'closed' },
      { name: 'BLOCKED', color: '#f50000', type: 'custom' },
    ];

    return html`
      <div class="status-dropdown" @click=${(e: Event) => e.stopPropagation()}>
        ${commonStatuses.map(status => html`
          <div
            class="status-option"
            style="--status-color: ${status.color}"
            @click=${() => this._changeTaskStatus(task, status.name)}
          >
            <span class="status-badge">${status.name}</span>
          </div>
        `)}
      </div>
    `;
  }

  private async _changeTaskStatus(task: ClickUpTask, newStatus: string): Promise<void> {
    try {
      // Close dropdown
      this._statusDropdownTask = null;

      // Call ClickUp integration service to update status
      await this.hass.callService('clickup', 'update_task_status', {
        task_id: task.clickup_id,
        status: newStatus,
      });
    } catch (err) {
      console.error('Error changing task status:', err);
    }
  }

  private _openAddDialog(): void {
    this._showAddDialog = true;
  }

  private _openEditDialog(task: ClickUpTask): void {
    this._editingTask = task;
  }

  private _renderAddDialog(): TemplateResult {
    const commonStatuses = [
      { name: 'TO DO', color: '#d3d3d3', type: 'open' },
      { name: 'IN PROGRESS', color: '#4194f6', type: 'custom' },
      { name: 'IN REVIEW', color: '#f6c342', type: 'custom' },
      { name: 'COMPLETE', color: '#6bc950', type: 'closed' },
      { name: 'BLOCKED', color: '#f50000', type: 'custom' },
    ];

    return html`
      <ha-dialog
        open
        @closed=${() => this._showAddDialog = false}
        .heading=${'Add Task'}
      >
        <div class="dialog-content">
          <ha-textfield
            dialogInitialFocus
            label="Task Name"
            id="add-summary"
            required
            helper="What needs to be done?"
          ></ha-textfield>

          <ha-textarea
            label="Description (Optional)"
            id="add-description"
            rows="3"
            helper="Add additional details"
          ></ha-textarea>

          <ha-select
            label="Status"
            id="add-status"
          >
            ${commonStatuses.map(status => html`
              <mwc-list-item value="${status.name}">${status.name}</mwc-list-item>
            `)}
          </ha-select>

          <ha-select
            label="Priority"
            id="add-priority"
          >
            <mwc-list-item value="">No Priority</mwc-list-item>
            <mwc-list-item value="1">🔴 Urgent</mwc-list-item>
            <mwc-list-item value="2">🟠 High</mwc-list-item>
            <mwc-list-item value="3">🟡 Normal</mwc-list-item>
            <mwc-list-item value="4">⚪ Low</mwc-list-item>
          </ha-select>

          <ha-textfield
            label="Start Date (Optional)"
            id="add-start-date"
            type="date"
            helper="When to start working on this"
          ></ha-textfield>

          <ha-textfield
            label="Due Date (Optional)"
            id="add-due-date"
            type="date"
            helper="When this should be completed"
          ></ha-textfield>
        </div>

        <mwc-button slot="primaryAction" @click=${this._submitAddTask}>
          Add Task
        </mwc-button>
        <mwc-button slot="secondaryAction" dialogAction="cancel">
          Cancel
        </mwc-button>
      </ha-dialog>
    `;
  }

  private _renderEditDialog(): TemplateResult {
    if (!this._editingTask) {
      return html``;
    }

    const task = this._editingTask;
    const startDateValue = task.start_date ? new Date(typeof task.start_date === 'number' ? task.start_date : parseInt(task.start_date as string)).toISOString().split('T')[0] : '';
    const dueDateValue = task.due ? new Date(task.due).toISOString().split('T')[0] : '';

    const commonStatuses = [
      { name: 'TO DO', color: '#d3d3d3', type: 'open' },
      { name: 'IN PROGRESS', color: '#4194f6', type: 'custom' },
      { name: 'IN REVIEW', color: '#f6c342', type: 'custom' },
      { name: 'COMPLETE', color: '#6bc950', type: 'closed' },
      { name: 'BLOCKED', color: '#f50000', type: 'custom' },
    ];

    return html`
      <ha-dialog
        open
        @closed=${() => this._editingTask = null}
        .heading=${'Edit Task'}
      >
        <div class="dialog-content">
          <ha-textfield
            dialogInitialFocus
            label="Task Name"
            id="edit-summary"
            .value=${task.summary}
            required
            helper="What needs to be done?"
          ></ha-textfield>

          <ha-textarea
            label="Description (Optional)"
            id="edit-description"
            .value=${task.description || ''}
            rows="3"
            helper="Add additional details"
          ></ha-textarea>

          <ha-select
            label="Status"
            id="edit-status"
            .value=${task.clickup_status?.status || 'TO DO'}
          >
            ${commonStatuses.map(status => html`
              <mwc-list-item value="${status.name}">${status.name}</mwc-list-item>
            `)}
          </ha-select>

          <ha-select
            label="Priority"
            id="edit-priority"
            .value=${task.priority?.toString() || ''}
          >
            <mwc-list-item value="">No Priority</mwc-list-item>
            <mwc-list-item value="1">🔴 Urgent</mwc-list-item>
            <mwc-list-item value="2">🟠 High</mwc-list-item>
            <mwc-list-item value="3">🟡 Normal</mwc-list-item>
            <mwc-list-item value="4">⚪ Low</mwc-list-item>
          </ha-select>

          <ha-textfield
            label="Start Date (Optional)"
            id="edit-start-date"
            type="date"
            .value=${startDateValue}
            helper="When to start working on this"
          ></ha-textfield>

          <ha-textfield
            label="Due Date (Optional)"
            id="edit-due-date"
            type="date"
            .value=${dueDateValue}
            helper="When this should be completed"
          ></ha-textfield>

          <div class="dialog-actions-extra">
            <mwc-button @click=${() => this._deleteTask(task)}>
              Delete Task
            </mwc-button>
          </div>
        </div>

        <mwc-button slot="primaryAction" @click=${this._submitEditTask}>
          Save Changes
        </mwc-button>
        <mwc-button slot="secondaryAction" dialogAction="cancel">
          Cancel
        </mwc-button>
      </ha-dialog>
    `;
  }

  private async _submitAddTask(): Promise<void> {
    const summary = (this.shadowRoot?.querySelector('#add-summary') as any)?.value?.trim();

    if (!summary) {
      return;
    }

    const description = (this.shadowRoot?.querySelector('#add-description') as any)?.value?.trim();
    const status = (this.shadowRoot?.querySelector('#add-status') as any)?.value;
    const startDate = (this.shadowRoot?.querySelector('#add-start-date') as any)?.value;
    const dueDate = (this.shadowRoot?.querySelector('#add-due-date') as any)?.value;
    const priority = (this.shadowRoot?.querySelector('#add-priority') as any)?.value;

    try {
      // First, create the task via the standard todo service
      const serviceData: any = {
        item: summary,
      };

      if (description) {
        serviceData.description = description;
      }

      if (dueDate) {
        serviceData.due = dueDate;
      }

      await this.hass.callService('todo', 'add_item', serviceData, {
        entity_id: this._config.entity,
      });

      // Wait a bit for the task to be created, then update status and priority via ClickUp service
      // This is a workaround since todo.add_item doesn't support ClickUp-specific fields
      if (status || priority || startDate) {
        setTimeout(async () => {
          try {
            // Get the newly created task
            const stateObj = this.hass.states[this._config.entity] as any;
            const tasks = stateObj?.attributes?.clickup_tasks || [];
            const newTask = tasks.find((t: ClickUpTask) => t.summary === summary);

            if (newTask && newTask.clickup_id) {
              // Update status if provided
              if (status) {
                await this.hass.callService('clickup', 'update_task_status', {
                  task_id: newTask.clickup_id,
                  status: status,
                });
              }

              // Update priority if provided
              if (priority) {
                await this.hass.callService('clickup', 'update_task_priority', {
                  task_id: newTask.clickup_id,
                  priority: parseInt(priority),
                });
              }

              // Update start date if provided
              if (startDate) {
                await this.hass.callService('clickup', 'update_task_start_date', {
                  task_id: newTask.clickup_id,
                  start_date: new Date(startDate).getTime(),
                });
              }
            }
          } catch (err) {
            console.error('Error updating task details:', err);
          }
        }, 1000);
      }

      this._showAddDialog = false;
    } catch (err) {
      console.error('Error adding task:', err);
    }
  }

  private async _submitEditTask(): Promise<void> {
    if (!this._editingTask) {
      return;
    }

    const summary = (this.shadowRoot?.querySelector('#edit-summary') as any)?.value?.trim();

    if (!summary) {
      return;
    }

    const description = (this.shadowRoot?.querySelector('#edit-description') as any)?.value?.trim();
    const status = (this.shadowRoot?.querySelector('#edit-status') as any)?.value;
    const startDate = (this.shadowRoot?.querySelector('#edit-start-date') as any)?.value;
    const dueDate = (this.shadowRoot?.querySelector('#edit-due-date') as any)?.value;
    const priority = (this.shadowRoot?.querySelector('#edit-priority') as any)?.value;

    try {
      const taskId = this._editingTask.clickup_id;

      // Update basic fields via todo service
      const serviceData: any = {
        entity_id: this._config.entity,
        item: this._editingTask.uid,
        rename: summary,
      };

      if (description !== undefined) {
        serviceData.description = description || null;
      }

      if (dueDate) {
        serviceData.due = dueDate;
      }

      await this.hass.callService('todo', 'update_item', serviceData);

      // Update ClickUp-specific fields if they changed
      if (taskId) {
        // Update status if changed
        if (status && status !== this._editingTask.clickup_status?.status) {
          await this.hass.callService('clickup', 'update_task_status', {
            task_id: taskId,
            status: status,
          });
        }

        // Update priority if changed
        const newPriority = priority ? parseInt(priority) : null;
        if (newPriority !== this._editingTask.priority) {
          await this.hass.callService('clickup', 'update_task_priority', {
            task_id: taskId,
            priority: newPriority,
          });
        }

        // Update start date if changed
        const existingStartDate = this._editingTask.start_date
          ? new Date(typeof this._editingTask.start_date === 'number'
              ? this._editingTask.start_date
              : parseInt(this._editingTask.start_date as string)).toISOString().split('T')[0]
          : '';

        if (startDate !== existingStartDate) {
          await this.hass.callService('clickup', 'update_task_start_date', {
            task_id: taskId,
            start_date: startDate ? new Date(startDate).getTime() : null,
          });
        }
      }

      this._editingTask = null;
    } catch (err) {
      console.error('Error updating task:', err);
    }
  }

  private async _deleteTask(task: ClickUpTask): Promise<void> {
    if (!confirm(`Delete task "${task.summary}"?`)) {
      return;
    }

    try {
      await this.hass.callService('todo', 'remove_item', {
        entity_id: this._config.entity,
        item: task.uid,
      });

      this._editingTask = null;
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  }

  static get styles(): CSSResultGroup {
    return styles;
  }
}

// Explicitly register the custom element
if (!customElements.get('clickup-todo-card')) {
  customElements.define('clickup-todo-card', ClickUpTodoCard);
  console.log('ClickUp Todo Card: Manually registered custom element');
}

// Register card with Home Assistant AFTER custom element is defined
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'clickup-todo-card',  // No 'custom:' prefix - HA adds it automatically
  name: 'ClickUp Todo Card',
  description: 'Enhanced todo card with ClickUp custom fields and filters',
  preview: true,
  documentationURL: 'https://github.com/chbarnhouse/clickup-todo-card'
});
console.log('ClickUp Todo Card: Registered in customCards array');

declare global {
  interface HTMLElementTagNameMap {
    'clickup-todo-card': ClickUpTodoCard;
  }
}
