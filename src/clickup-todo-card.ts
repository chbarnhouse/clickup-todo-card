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

      return html`
        <ha-card>
          ${this._renderHeader(stateObj)}
          <div class="card-content ${this._config.compact_mode ? 'compact' : ''}">
            ${groups.size === 1 && groups.has('all')
              ? this._renderTaskList(groups.get('all')!)
              : this._renderGroupedTasks(groups)}
          </div>
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
    const unavailable = stateObj.state === 'unavailable';
    const showCount = this._config.show_task_count !== false;
    const showTitle = this._config.hide_title !== true;

    return html`
      ${showTitle || showCount ? html`
        <div class="card-header">
          ${showTitle ? html`<div class="name">${title}</div>` : ''}
          ${showCount ? html`<div class="task-count">${this._tasks.length}</div>` : ''}
        </div>
      ` : ''}
      <div class="add-item-row">
        <ha-icon-button
          .disabled=${unavailable}
          @click=${this._openAddDialog}
        >
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>
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

    return html`
      <div class="task-item ${completed ? 'completed' : ''} ${overdue ? 'overdue' : ''}">
        <div class="task-checkbox">
          <ha-checkbox
            .checked=${completed}
            @change=${() => this._toggleTask(task)}
          ></ha-checkbox>
        </div>

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
            ${this._renderStatus(task)}
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
    if (!this._config.show_status || !task.clickup_status) {
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

  private _openAddDialog(): void {
    this._showAddDialog = true;
  }

  private _openEditDialog(task: ClickUpTask): void {
    this._editingTask = task;
  }

  private _renderAddDialog(): TemplateResult {
    return html`
      <ha-dialog
        open
        @closed=${() => this._showAddDialog = false}
        .heading=${'Add Task'}
      >
        <div class="dialog-content">
          <ha-textfield
            dialogInitialFocus
            label="Summary"
            id="add-summary"
            required
          ></ha-textfield>

          <ha-textarea
            label="Description"
            id="add-description"
            rows="3"
          ></ha-textarea>

          <ha-textfield
            label="Start Date"
            id="add-start-date"
            type="date"
          ></ha-textfield>

          <ha-textfield
            label="Due Date"
            id="add-due-date"
            type="date"
          ></ha-textfield>

          <ha-select
            label="Priority"
            id="add-priority"
          >
            <mwc-list-item value="">No Priority</mwc-list-item>
            <mwc-list-item value="1">Urgent</mwc-list-item>
            <mwc-list-item value="2">High</mwc-list-item>
            <mwc-list-item value="3">Normal</mwc-list-item>
            <mwc-list-item value="4">Low</mwc-list-item>
          </ha-select>
        </div>

        <mwc-button slot="primaryAction" @click=${this._submitAddTask}>
          Add
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

    return html`
      <ha-dialog
        open
        @closed=${() => this._editingTask = null}
        .heading=${'Edit Task'}
      >
        <div class="dialog-content">
          <ha-textfield
            dialogInitialFocus
            label="Summary"
            id="edit-summary"
            .value=${task.summary}
            required
          ></ha-textfield>

          <ha-textarea
            label="Description"
            id="edit-description"
            .value=${task.description || ''}
            rows="3"
          ></ha-textarea>

          <ha-textfield
            label="Start Date"
            id="edit-start-date"
            type="date"
            .value=${startDateValue}
          ></ha-textfield>

          <ha-textfield
            label="Due Date"
            id="edit-due-date"
            type="date"
            .value=${dueDateValue}
          ></ha-textfield>

          <ha-select
            label="Priority"
            id="edit-priority"
            .value=${task.priority?.toString() || ''}
          >
            <mwc-list-item value="">No Priority</mwc-list-item>
            <mwc-list-item value="1">Urgent</mwc-list-item>
            <mwc-list-item value="2">High</mwc-list-item>
            <mwc-list-item value="3">Normal</mwc-list-item>
            <mwc-list-item value="4">Low</mwc-list-item>
          </ha-select>

          <div class="dialog-actions-extra">
            <mwc-button @click=${() => this._deleteTask(task)}>
              Delete Task
            </mwc-button>
          </div>
        </div>

        <mwc-button slot="primaryAction" @click=${this._submitEditTask}>
          Save
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
    const startDate = (this.shadowRoot?.querySelector('#add-start-date') as any)?.value;
    const dueDate = (this.shadowRoot?.querySelector('#add-due-date') as any)?.value;
    const priority = (this.shadowRoot?.querySelector('#add-priority') as any)?.value;

    try {
      const serviceData: any = {
        item: summary,
      };

      if (description) {
        serviceData.description = description;
      }

      if (dueDate) {
        serviceData.due = dueDate;
      }

      // Note: ClickUp integration may not support setting these via add_item
      // This depends on the integration's implementation
      await this.hass.callService('todo', 'add_item', serviceData, {
        entity_id: this._config.entity,
      });

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
    const startDate = (this.shadowRoot?.querySelector('#edit-start-date') as any)?.value;
    const dueDate = (this.shadowRoot?.querySelector('#edit-due-date') as any)?.value;
    const priority = (this.shadowRoot?.querySelector('#edit-priority') as any)?.value;

    try {
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
