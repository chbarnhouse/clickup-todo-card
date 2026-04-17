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

// Register card with Home Assistant
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'clickup-todo-card',
  name: 'ClickUp Todo Card',
  description: 'Enhanced todo card with ClickUp custom fields and filters',
  preview: true,
  documentationURL: 'https://github.com/chbarnhouse/clickup-todo-card'
});

@customElement('clickup-todo-card')
export class ClickUpTodoCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: ClickUpTodoCardConfig;
  @state() private _tasks: ClickUpTask[] = [];

  public static async getConfigElement() {
    await import('./editor');
    return document.createElement('clickup-todo-card-editor');
  }

  public static getStubConfig(): Record<string, unknown> {
    return {
      type: 'clickup-todo-card',
      entity: '',
      ...DEFAULT_CONFIG,
    };
  }

  public setConfig(config: ClickUpTodoCardConfig): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }

    if (!config.entity) {
      throw new Error('Entity is required');
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
    return hasConfigOrEntityChanged(this, changedProps, false);
  }

  protected render(): TemplateResult {
    if (!this._config || !this.hass) {
      return html``;
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
    `;
  }

  private _renderHeader(stateObj: ExtendedHassEntity): TemplateResult {
    const title = this._config.title || stateObj.attributes.friendly_name || 'Tasks';

    return html`
      <div class="card-header">
        <div class="name">${title}</div>
        <div class="task-count">${this._tasks.length}</div>
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

        <div class="task-main">
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

  static get styles(): CSSResultGroup {
    return styles;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'clickup-todo-card': ClickUpTodoCard;
  }
}
