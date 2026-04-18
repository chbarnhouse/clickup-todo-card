import { LitElement, html, TemplateResult, CSSResultGroup, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { fireEvent, HomeAssistant } from 'custom-card-helpers';

import { ClickUpTodoCardConfig, ClickUpTask, ExtendedHassEntity } from './types';
import { parseClickUpTasks } from './utils/clickup-data';
import { getUniqueStatuses, getUniqueTags, getUniqueAssignees, getAvailableCustomFields } from './utils/clickup-data';

// Don't use decorator - will register manually after class definition
export class ClickUpTodoCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config: ClickUpTodoCardConfig = {
    type: 'custom:clickup-todo-card',
    entity: '',
  };
  @state() private _tasks: ClickUpTask[] = [];
  @state() private _helpers?: any;

  constructor() {
    super();
    console.log('ClickUp Card Editor: Constructor called');
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('ClickUp Card Editor: Connected to DOM');
  }

  public setConfig(config: ClickUpTodoCardConfig): void {
    this._config = {
      type: 'custom:clickup-todo-card',
      entity: '',
      ...config,
    };
    this._loadEntityData();
  }

  private _loadEntityData(): void {
    if (!this.hass || !this._config.entity) return;

    const stateObj = this.hass.states[this._config.entity] as ExtendedHassEntity;
    if (stateObj) {
      this._tasks = parseClickUpTasks(stateObj);
    }
  }

  protected render(): TemplateResult {
    try {
      if (!this.hass) {
        return html`<div>Loading hass...</div>`;
      }

      if (!this._config) {
        return html`<div>Loading config...</div>`;
      }

      const statuses = this._tasks.length > 0 ? getUniqueStatuses(this._tasks) : [];
      const tags = this._tasks.length > 0 ? getUniqueTags(this._tasks) : [];
      const assignees = this._tasks.length > 0 ? getUniqueAssignees(this._tasks) : [];
      const customFields = this._tasks.length > 0 ? getAvailableCustomFields(this._tasks) : [];

    return html`
      <div class="card-config">
        <!-- Basic Settings -->
        <div class="config-section">
          <h3>Basic Settings</h3>

          <ha-selector
            .hass=${this.hass}
            .selector=${{ entity: { domain: ['todo'] } }}
            .value=${this._config.entity}
            .label=${'Entity (required)'}
            .required=${true}
            @value-changed=${(ev: any) => this._entityChanged(ev.detail.value)}
          ></ha-selector>

          <ha-textfield
            label="Title (Optional)"
            .configValue=${'title'}
            .value=${this._config.title || ''}
            @input=${this._valueChanged}
          ></ha-textfield>
        </div>

        <!-- Display Options -->
        <div class="config-section">
          <h3>Display Options</h3>

          <ha-formfield .label=${'Hide Header'}>
            <ha-switch
              .checked=${this._config.hide_header === true}
              .configValue=${'hide_header'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${'Hide Title'}>
            <ha-switch
              .checked=${this._config.hide_title === true}
              .configValue=${'hide_title'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${'Show Task Count Badge'}>
            <ha-switch
              .checked=${this._config.show_task_count !== false}
              .configValue=${'show_task_count'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${'Show Start Date'}>
            <ha-switch
              .checked=${this._config.show_start_date !== false}
              .configValue=${'show_start_date'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${'Show Due Date'}>
            <ha-switch
              .checked=${this._config.show_due_date !== false}
              .configValue=${'show_due_date'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${'Show Priority'}>
            <ha-switch
              .checked=${this._config.show_priority !== false}
              .configValue=${'show_priority'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${'Show ClickUp Status'}>
            <ha-switch
              .checked=${this._config.show_status === true}
              .configValue=${'show_status'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${'Show Tags'}>
            <ha-switch
              .checked=${this._config.show_tags !== false}
              .configValue=${'show_tags'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${'Show Assignees'}>
            <ha-switch
              .checked=${this._config.show_assignees !== false}
              .configValue=${'show_assignees'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${'Show Custom Fields'}>
            <ha-switch
              .checked=${this._config.show_custom_fields === true}
              .configValue=${'show_custom_fields'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${'Compact Mode'}>
            <ha-switch
              .checked=${this._config.compact_mode === true}
              .configValue=${'compact_mode'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>
        </div>

        <!-- Add Button Settings -->
        <div class="config-section">
          <h3>Add Button</h3>

          <ha-textfield
            label="Button Text (leave empty for icon only)"
            .configValue=${'add_button_text'}
            .value=${this._config.add_button_text !== undefined ? this._config.add_button_text : 'Add Task'}
            @input=${this._valueChanged}
          ></ha-textfield>

          <ha-select
            .label=${'Button Position'}
            .configValue=${'add_button_position'}
            .value=${this._config.add_button_position || 'bottom-right'}
            @closed=${this._selectChanged}
          >
            <mwc-list-item value="bottom-left">Bottom Left</mwc-list-item>
            <mwc-list-item value="bottom-center">Bottom Center</mwc-list-item>
            <mwc-list-item value="bottom-right">Bottom Right</mwc-list-item>
            <mwc-list-item value="top-left">Top Left</mwc-list-item>
            <mwc-list-item value="top-center">Top Center</mwc-list-item>
            <mwc-list-item value="top-right">Top Right</mwc-list-item>
          </ha-select>

          <ha-formfield .label=${'Overlay Button (float over content)'}>
            <ha-switch
              .checked=${this._config.add_button_overlay !== false}
              .configValue=${'add_button_overlay'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>
        </div>

        <!-- Visible Custom Fields -->
        ${this._config.show_custom_fields && customFields.length > 0 ? html`
          <div class="config-section">
            <h3>Visible Custom Fields</h3>
            <p class="hint">Leave empty to show all custom fields</p>

            ${customFields.map(field => html`
              <ha-formfield .label=${field.label}>
                <ha-checkbox
                  .checked=${this._isFieldVisible(field.value)}
                  .value=${field.value}
                  @change=${this._customFieldChanged}
                ></ha-checkbox>
              </ha-formfield>
            `)}
          </div>
        ` : ''}

        <!-- Sorting -->
        <div class="config-section">
          <h3>Sorting</h3>

          <ha-select
            .label=${'Sort By'}
            .configValue=${'sort_by'}
            .value=${this._config.sort_by || 'due_date'}
            @closed=${this._selectChanged}
          >
            <mwc-list-item value="due_date">Due Date</mwc-list-item>
            <mwc-list-item value="start_date">Start Date</mwc-list-item>
            <mwc-list-item value="priority">Priority</mwc-list-item>
            <mwc-list-item value="name">Name</mwc-list-item>
            <mwc-list-item value="status">Status</mwc-list-item>
          </ha-select>

          <ha-select
            .label=${'Sort Order'}
            .configValue=${'sort_order'}
            .value=${this._config.sort_order || 'asc'}
            @closed=${this._selectChanged}
          >
            <mwc-list-item value="asc">Ascending</mwc-list-item>
            <mwc-list-item value="desc">Descending</mwc-list-item>
          </ha-select>
        </div>

        <!-- Grouping -->
        <div class="config-section">
          <h3>Grouping</h3>

          <ha-select
            .label=${'Group By'}
            .configValue=${'group_by'}
            .value=${this._config.group_by || 'none'}
            @closed=${this._selectChanged}
          >
            <mwc-list-item value="none">None</mwc-list-item>
            <mwc-list-item value="status">Status</mwc-list-item>
            <mwc-list-item value="priority">Priority</mwc-list-item>
            <mwc-list-item value="assignee">Assignee</mwc-list-item>
            <mwc-list-item value="list">List</mwc-list-item>
            <mwc-list-item value="custom_field">Custom Field</mwc-list-item>
          </ha-select>

          ${this._config.group_by === 'custom_field' && customFields.length > 0 ? html`
            <ha-select
              .label=${'Custom Field for Grouping'}
              .configValue=${'group_field_id'}
              .value=${this._config.group_field_id || ''}
              @closed=${this._selectChanged}
            >
              ${customFields.map(field => html`
                <mwc-list-item value="${field.value}">${field.label}</mwc-list-item>
              `)}
            </ha-select>
          ` : ''}
        </div>

        <!-- Filters -->
        <div class="config-section">
          <h3>Filters</h3>

          ${statuses.length > 0 ? html`
            <div class="filter-group">
              <label>Status</label>
              ${statuses.map(status => html`
                <ha-formfield .label=${status.label}>
                  <ha-checkbox
                    .checked=${this._isStatusFiltered(status.value)}
                    .value=${status.value}
                    @change=${this._statusFilterChanged}
                  ></ha-checkbox>
                </ha-formfield>
              `)}
            </div>
          ` : ''}

          <div class="filter-group">
            <label>Priority</label>
            <ha-formfield .label=${'Urgent'}>
              <ha-checkbox
                .checked=${this._isPriorityFiltered(1)}
                .value=${'1'}
                @change=${this._priorityFilterChanged}
              ></ha-checkbox>
            </ha-formfield>
            <ha-formfield .label=${'High'}>
              <ha-checkbox
                .checked=${this._isPriorityFiltered(2)}
                .value=${'2'}
                @change=${this._priorityFilterChanged}
              ></ha-checkbox>
            </ha-formfield>
            <ha-formfield .label=${'Normal'}>
              <ha-checkbox
                .checked=${this._isPriorityFiltered(3)}
                .value=${'3'}
                @change=${this._priorityFilterChanged}
              ></ha-checkbox>
            </ha-formfield>
            <ha-formfield .label=${'Low'}>
              <ha-checkbox
                .checked=${this._isPriorityFiltered(4)}
                .value=${'4'}
                @change=${this._priorityFilterChanged}
              ></ha-checkbox>
            </ha-formfield>
            <ha-formfield .label=${'No Priority'}>
              <ha-checkbox
                .checked=${this._isPriorityFiltered(null)}
                .value=${'null'}
                @change=${this._priorityFilterChanged}
              ></ha-checkbox>
            </ha-formfield>
          </div>

          ${tags.length > 0 ? html`
            <div class="filter-group">
              <label>Tags</label>
              ${tags.map(tag => html`
                <ha-formfield .label=${tag.label}>
                  <ha-checkbox
                    .checked=${this._isTagFiltered(tag.value)}
                    .value=${tag.value}
                    @change=${this._tagFilterChanged}
                  ></ha-checkbox>
                </ha-formfield>
              `)}
            </div>
          ` : ''}

          ${assignees.length > 0 ? html`
            <div class="filter-group">
              <label>Assignees</label>
              ${assignees.map(assignee => html`
                <ha-formfield .label=${assignee.label}>
                  <ha-checkbox
                    .checked=${this._isAssigneeFiltered(assignee.value)}
                    .value=${assignee.value}
                    @change=${this._assigneeFilterChanged}
                  ></ha-checkbox>
                </ha-formfield>
              `)}
            </div>
          ` : ''}

          <div class="filter-group">
            <label>Due Date Range</label>
            <ha-textfield
              .label=${'Start Date (YYYY-MM-DD)'}
              .value=${this._config.filters?.due_date_range?.start || ''}
              @input=${(e: any) => this._dateRangeChanged('start', e.target.value)}
            ></ha-textfield>
            <ha-textfield
              .label=${'End Date (YYYY-MM-DD)'}
              .value=${this._config.filters?.due_date_range?.end || ''}
              @input=${(e: any) => this._dateRangeChanged('end', e.target.value)}
            ></ha-textfield>
          </div>
        </div>
      </div>
    `;
    } catch (error) {
      console.error('Error rendering ClickUp Todo Card editor:', error);
      return html`
        <div class="card-config">
          <div class="warning">
            Error loading editor. Please check the console for details.
          </div>
        </div>
      `;
    }
  }

  private _valueChanged(ev: any): void {
    if (!this._config || !this.hass) return;

    const target = ev.target;
    const configValue = target.configValue;

    if (!configValue) return;

    let value: any;
    if (target.checked !== undefined) {
      value = target.checked;
    } else if (target.value !== undefined) {
      value = target.value;
    } else {
      return;
    }

    // Handle empty strings for optional fields
    // Special case: add_button_text should allow empty string
    if (value === '' && configValue !== 'add_button_text') {
      value = undefined;
    }

    const newConfig = {
      ...this._config,
      [configValue]: value,
    };

    // Reload entity data if entity changed
    if (configValue === 'entity') {
      setTimeout(() => this._loadEntityData(), 100);
    }

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _selectChanged(ev: any): void {
    if (!this._config || !this.hass) return;

    const target = ev.target as any;
    const configValue = target.configValue;

    if (!configValue) return;

    // Use setTimeout to ensure the value is set before we read it
    setTimeout(() => {
      const value = target.value;

      if (value === undefined) return;

      // Handle empty strings for optional fields
      const finalValue = value === '' ? undefined : value;

      const newConfig = {
        ...this._config,
        [configValue]: finalValue,
      };

      fireEvent(this, 'config-changed', { config: newConfig });

      // Force a complete re-render
      this.requestUpdate();
      this._config = newConfig;
    }, 0);
  }

  private _entityChanged(entity: string): void {
    if (!this._config || entity === this._config.entity) {
      return;
    }

    const newConfig = {
      ...this._config,
      entity,
    };

    this._config = newConfig;
    this._loadEntityData();
    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _isFieldVisible(fieldId: string): boolean {
    if (!this._config.visible_custom_fields || this._config.visible_custom_fields.length === 0) {
      return false;
    }
    return this._config.visible_custom_fields.includes(fieldId);
  }

  private _customFieldChanged(ev: any): void {
    const checkbox = ev.target as any;
    const fieldId = checkbox.value;
    const checked = checkbox.checked;

    const visibleFields = this._config.visible_custom_fields || [];

    let newFields: string[];
    if (checked) {
      newFields = [...visibleFields, fieldId];
    } else {
      newFields = visibleFields.filter(id => id !== fieldId);
    }

    const newConfig = {
      ...this._config,
      visible_custom_fields: newFields.length > 0 ? newFields : undefined,
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _isStatusFiltered(status: string): boolean {
    return this._config.filters?.status?.includes(status) || false;
  }

  private _statusFilterChanged(ev: any): void {
    const checkbox = ev.target as any;
    const status = checkbox.value;
    const checked = checkbox.checked;

    const filters = this._config.filters || {};
    const currentStatuses = filters.status || [];

    let newStatuses: string[];
    if (checked) {
      newStatuses = [...currentStatuses, status];
    } else {
      newStatuses = currentStatuses.filter(s => s !== status);
    }

    const newConfig = {
      ...this._config,
      filters: {
        ...filters,
        status: newStatuses.length > 0 ? newStatuses : undefined,
      },
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _isPriorityFiltered(priority: number | null): boolean {
    return this._config.filters?.priority?.includes(priority as number) || false;
  }

  private _priorityFilterChanged(ev: any): void {
    const checkbox = ev.target as any;
    const priorityStr = checkbox.value;
    const priority = priorityStr === 'null' ? null : parseInt(priorityStr);
    const checked = checkbox.checked;

    const filters = this._config.filters || {};
    const currentPriorities = filters.priority || [];

    let newPriorities: (number | null)[];
    if (checked) {
      newPriorities = [...currentPriorities, priority];
    } else {
      newPriorities = currentPriorities.filter(p => p !== priority);
    }

    const newConfig = {
      ...this._config,
      filters: {
        ...filters,
        priority: newPriorities.length > 0 ? newPriorities : undefined,
      },
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _isTagFiltered(tag: string): boolean {
    return this._config.filters?.tags?.includes(tag) || false;
  }

  private _tagFilterChanged(ev: any): void {
    const checkbox = ev.target as any;
    const tag = checkbox.value;
    const checked = checkbox.checked;

    const filters = this._config.filters || {};
    const currentTags = filters.tags || [];

    let newTags: string[];
    if (checked) {
      newTags = [...currentTags, tag];
    } else {
      newTags = currentTags.filter(t => t !== tag);
    }

    const newConfig = {
      ...this._config,
      filters: {
        ...filters,
        tags: newTags.length > 0 ? newTags : undefined,
      },
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _isAssigneeFiltered(assigneeId: string): boolean {
    return this._config.filters?.assignees?.includes(assigneeId) || false;
  }

  private _assigneeFilterChanged(ev: any): void {
    const checkbox = ev.target as any;
    const assigneeId = checkbox.value;
    const checked = checkbox.checked;

    const filters = this._config.filters || {};
    const currentAssignees = filters.assignees || [];

    let newAssignees: string[];
    if (checked) {
      newAssignees = [...currentAssignees, assigneeId];
    } else {
      newAssignees = currentAssignees.filter(a => a !== assigneeId);
    }

    const newConfig = {
      ...this._config,
      filters: {
        ...filters,
        assignees: newAssignees.length > 0 ? newAssignees : undefined,
      },
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _dateRangeChanged(type: 'start' | 'end', value: string): void {
    const filters = this._config.filters || {};
    const currentRange = filters.due_date_range || {};

    const newRange = {
      ...currentRange,
      [type]: value || undefined,
    };

    // Remove range entirely if both are empty
    const hasRange = newRange.start || newRange.end;

    const newConfig = {
      ...this._config,
      filters: {
        ...filters,
        due_date_range: hasRange ? newRange : undefined,
      },
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  static get styles(): CSSResultGroup {
    return css`
      .card-config {
        padding: 16px;
      }

      .config-section {
        margin-bottom: 24px;
        padding-bottom: 16px;
        border-bottom: 1px solid var(--divider-color);
      }

      .config-section:last-child {
        border-bottom: none;
      }

      h3 {
        margin: 0 0 16px 0;
        font-size: 16px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .hint {
        margin: 0 0 12px 0;
        font-size: 12px;
        color: var(--secondary-text-color);
        font-style: italic;
      }

      .input-group {
        margin-bottom: 24px;
      }

      .input-group label {
        display: block;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .entity-input {
        width: 100%;
        padding: 12px;
        font-size: 14px;
        background: var(--card-background-color);
        color: var(--primary-text-color);
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        box-sizing: border-box;
      }

      .entity-list {
        margin-top: 12px;
        padding: 12px;
        background: var(--secondary-background-color);
        border-radius: 4px;
        max-height: 200px;
        overflow-y: auto;
      }

      .entity-list p {
        margin: 0 0 8px 0;
        font-size: 12px;
        font-weight: 500;
        color: var(--secondary-text-color);
      }

      .entity-item {
        padding: 8px;
        margin: 4px 0;
        background: var(--card-background-color);
        border-radius: 4px;
        cursor: pointer;
        font-size: 13px;
        color: var(--primary-text-color);
      }

      .entity-item:hover {
        background: var(--primary-color);
        color: var(--text-primary-color);
      }

      ha-entity-picker,
      ha-textfield,
      ha-select {
        display: block;
        margin-bottom: 16px;
        width: 100%;
      }

      ha-formfield {
        display: block;
        margin-bottom: 12px;
      }

      .filter-group {
        margin-bottom: 20px;
      }

      .filter-group:last-child {
        margin-bottom: 0;
      }

      .filter-group > label {
        display: block;
        font-weight: 500;
        margin-bottom: 8px;
        color: var(--primary-text-color);
      }

      .filter-group ha-formfield {
        margin-bottom: 8px;
      }
    `;
  }
}

// Explicitly register the custom element as a fallback
if (!customElements.get('clickup-todo-card-editor')) {
  customElements.define('clickup-todo-card-editor', ClickUpTodoCardEditor);
  console.log('ClickUp Todo Card Editor: Manually registered custom element');
}

declare global {
  interface HTMLElementTagNameMap {
    'clickup-todo-card-editor': ClickUpTodoCardEditor;
  }
}
