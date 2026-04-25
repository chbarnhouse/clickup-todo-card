import { LitElement, html, TemplateResult, CSSResultGroup, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { fireEvent, HomeAssistant } from 'custom-card-helpers';

import { ClickUpTodoCardConfig, ClickUpTask, ExtendedHassEntity, MetadataField, MetadataFieldType } from './types';
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
  @state() private _selectedTab: number = 0;

  constructor() {
    super();
    console.log('ClickUp Card Editor: Constructor called');
  }

  connectedCallback() {
    super.connectedCallback();
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
        <div class="tabs">
          <button
            class="tab ${this._selectedTab === 0 ? 'active' : ''}"
            @click=${() => this._selectTab(0)}
          >
            Config
          </button>
          <button
            class="tab ${this._selectedTab === 1 ? 'active' : ''}"
            @click=${() => this._selectTab(1)}
          >
            Visibility
          </button>
          <button
            class="tab ${this._selectedTab === 2 ? 'active' : ''}"
            @click=${() => this._selectTab(2)}
          >
            Layout
          </button>
          <button
            class="tab ${this._selectedTab === 3 ? 'active' : ''}"
            @click=${() => this._selectTab(3)}
          >
            Filters
          </button>
          <button
            class="tab ${this._selectedTab === 4 ? 'active' : ''}"
            @click=${() => this._selectTab(4)}
          >
            Sort & Group
          </button>
        </div>

        <div class="tab-content">
          ${this._selectedTab === 0 ? this._renderConfigTab() : ''}
          ${this._selectedTab === 1 ? this._renderVisibilityTab(customFields) : ''}
          ${this._selectedTab === 2 ? this._renderLayoutTab() : ''}
          ${this._selectedTab === 3 ? this._renderFiltersTab(statuses, tags, assignees) : ''}
          ${this._selectedTab === 4 ? this._renderSortGroupTab(customFields) : ''}
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

  // Tab Methods

  private _selectTab(index: number): void {
    this._selectedTab = index;
  }

  private _renderConfigTab(): TemplateResult {
    return html`
      <div class="tab-panel">
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
            label="Title"
            .configValue=${'title'}
            .value=${this._config.title || ''}
            @input=${this._valueChanged}
            helper="Optional custom title for the card"
          ></ha-textfield>

          <ha-textfield
            label="Fixed Height (pixels)"
            type="number"
            .configValue=${'fixed_height'}
            .value=${this._config.fixed_height || ''}
            @input=${this._valueChanged}
            helper="Set a fixed height for scrollable content (leave empty for auto)"
          ></ha-textfield>

          <ha-formfield .label=${'Compact Mode'}>
            <ha-switch
              .checked=${this._config.compact_mode === true}
              .configValue=${'compact_mode'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>
        </div>
      </div>
    `;
  }

  private _renderVisibilityTab(customFields: Array<{value: string; label: string}>): TemplateResult {
    return html`
      <div class="tab-panel">
        <div class="config-section">
          <h3>Header</h3>

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
        </div>

        <div class="config-section">
          <h3>Task Fields</h3>

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

          <ha-formfield .label=${'Show Task Locations'}>
            <ha-switch
              .checked=${this._config.show_task_locations === true}
              .configValue=${'show_task_locations'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>
        </div>

        ${this._config.show_custom_fields && customFields.length > 0 ? html`
          <div class="config-section">
            <h3>Visible Custom Fields</h3>
            <p class="hint">Select which custom fields to display (leave all unchecked to show all)</p>

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
      </div>
    `;
  }

  private _renderLayoutTab(): TemplateResult {
    return html`
      <div class="tab-panel">
        <div class="config-section">
          <h3>Add Button</h3>

          <ha-textfield
            label="Button Text"
            .configValue=${'add_button_text'}
            .value=${this._config.add_button_text !== undefined ? this._config.add_button_text : 'Add Task'}
            @input=${this._valueChanged}
            helper="Leave empty for icon only"
          ></ha-textfield>

          <ha-selector
            .hass=${this.hass}
            .selector=${{
              select: {
                options: [
                  { value: 'bottom-left', label: 'Bottom Left' },
                  { value: 'bottom-center', label: 'Bottom Center' },
                  { value: 'bottom-right', label: 'Bottom Right' },
                  { value: 'top-left', label: 'Top Left' },
                  { value: 'top-center', label: 'Top Center' },
                  { value: 'top-right', label: 'Top Right' },
                ],
              },
            }}
            .value=${this._config.add_button_position || 'bottom-right'}
            .label=${'Button Position'}
            @value-changed=${(ev: any) => this._updateConfig('add_button_position', ev.detail.value)}
          ></ha-selector>

          <ha-formfield .label=${'Overlay Button (float over content)'}>
            <ha-switch
              .checked=${this._config.add_button_overlay !== false}
              .configValue=${'add_button_overlay'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>
        </div>

        <div class="config-section">
          <h3>UI Controls</h3>

          <ha-formfield .label=${'Show Sort Controls in Card'}>
            <ha-switch
              .checked=${this._config.show_sort_controls === true}
              .configValue=${'show_sort_controls'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${'Show Filter Controls in Card'}>
            <ha-switch
              .checked=${this._config.show_filter_controls === true}
              .configValue=${'show_filter_controls'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>
        </div>

        <div class="config-section">
          <h3>Metadata Grid Layout</h3>
          <p class="hint">Configure how task metadata fields are displayed using a flexible grid system</p>

          <ha-formfield .label=${'Use Custom Grid Layout'}>
            <ha-switch
              .checked=${this._config.metadata_grid !== undefined}
              @change=${this._toggleMetadataGrid}
            ></ha-switch>
          </ha-formfield>

          ${this._config.metadata_grid ? html`
            <div class="metadata-grid-config">
              <ha-textfield
                label="Grid Columns"
                .value=${this._config.metadata_grid.columns || 'repeat(auto-fit, minmax(150px, 1fr))'}
                @input=${(e: any) => this._metadataGridPropertyChanged('columns', e.target.value)}
                helper="CSS grid-template-columns value"
              ></ha-textfield>

              <ha-textfield
                label="Grid Gap"
                .value=${this._config.metadata_grid.gap || '6px 8px'}
                @input=${(e: any) => this._metadataGridPropertyChanged('gap', e.target.value)}
                helper="CSS gap value (row column)"
              ></ha-textfield>

              <div class="field-list">
                <label>Fields (use arrows to reorder)</label>
                ${this._config.metadata_grid.fields?.map((field, index) => this._renderMetadataFieldRow(field, index))}
              </div>

              <mwc-button @click=${this._addMetadataField}>
                <ha-icon icon="mdi:plus"></ha-icon>
                Add Field
              </mwc-button>
            </div>
          ` : html`
            <p class="hint">
              Grid layout is automatically generated from the "Visibility" tab settings.
              Enable custom grid layout to manually configure fields.
            </p>
          `}
        </div>
      </div>
    `;
  }

  private _renderFiltersTab(
    statuses: Array<{value: string; label: string}>,
    tags: Array<{value: string; label: string}>,
    assignees: Array<{value: string; label: string}>
  ): TemplateResult {
    return html`
      <div class="tab-panel">
        ${statuses.length > 0 ? html`
          <div class="config-section">
            <h3>Status Filters</h3>
            <p class="hint">Select which statuses to show</p>
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

        <div class="config-section">
          <h3>Priority Filters</h3>
          <p class="hint">Select which priorities to show</p>

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
          <div class="config-section">
            <h3>Tag Filters</h3>
            <p class="hint">Select which tags to show</p>
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
          <div class="config-section">
            <h3>Assignee Filters</h3>
            <p class="hint">Select which assignees to show</p>
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

        <div class="config-section">
          <h3>Due Date Range</h3>
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
    `;
  }

  private _renderSortGroupTab(customFields: Array<{value: string; label: string}>): TemplateResult {
    return html`
      <div class="tab-panel">
        <div class="config-section">
          <h3>Sorting</h3>

          <ha-selector
            .hass=${this.hass}
            .selector=${{
              select: {
                mode: 'dropdown',
                options: [
                  { value: 'due_date', label: 'Due Date' },
                  { value: 'start_date', label: 'Start Date' },
                  { value: 'priority', label: 'Priority' },
                  { value: 'name', label: 'Name' },
                  { value: 'status', label: 'Status' },
                  { value: 'custom', label: 'Custom Order (drag & drop)' },
                ],
              },
            }}
            .value=${this._config.sort_by || 'due_date'}
            .label=${'Sort By'}
            @value-changed=${(ev: any) => this._updateConfig('sort_by', ev.detail.value)}
          ></ha-selector>

          <ha-selector
            .hass=${this.hass}
            .selector=${{
              select: {
                mode: 'dropdown',
                options: [
                  { value: 'asc', label: 'Ascending' },
                  { value: 'desc', label: 'Descending' },
                ],
              },
            }}
            .value=${this._config.sort_order || 'asc'}
            .label=${'Sort Order'}
            @value-changed=${(ev: any) => this._updateConfig('sort_order', ev.detail.value)}
          ></ha-selector>
        </div>

        <div class="config-section">
          <h3>Grouping</h3>

          <ha-selector
            .hass=${this.hass}
            .selector=${{
              select: {
                options: [
                  { value: 'none', label: 'None' },
                  { value: 'status', label: 'Status' },
                  { value: 'priority', label: 'Priority' },
                  { value: 'assignee', label: 'Assignee' },
                  { value: 'list', label: 'List' },
                  { value: 'custom_field', label: 'Custom Field' },
                ],
              },
            }}
            .value=${this._config.group_by || 'none'}
            .label=${'Group By'}
            @value-changed=${(ev: any) => this._updateConfig('group_by', ev.detail.value)}
          ></ha-selector>

          ${this._config.group_by === 'custom_field' && customFields.length > 0 ? html`
            <ha-selector
              .hass=${this.hass}
              .selector=${{
                select: {
                  options: customFields.map(field => ({
                    value: field.value,
                    label: field.label,
                  })),
                },
              }}
              .value=${this._config.group_field_id || ''}
              .label=${'Custom Field for Grouping'}
              @value-changed=${(ev: any) => this._updateConfig('group_field_id', ev.detail.value)}
            ></ha-selector>
          ` : ''}
        </div>
      </div>
    `;
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

    // Convert number fields
    if (configValue === 'fixed_height' && value !== undefined) {
      value = parseInt(value, 10);
      if (isNaN(value)) {
        value = undefined;
      }
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
    if (!target) {
      console.log('No target element in select change event');
      return;
    }

    const configValue = target.configValue;
    if (!configValue) {
      console.log('No configValue on target', target);
      return;
    }

    // Use setTimeout to ensure DOM is updated
    setTimeout(() => {
      // Try to get value from target.value first
      let value = target.value;

      // If value is still undefined and target exists, try from selected property
      if ((value === undefined || value === null) && target) {
        if (typeof target.selected === 'number') {
          // Try to get items safely
          try {
            const items = target.querySelectorAll ? Array.from(target.querySelectorAll('mwc-list-item')) : [];
            const selectedItem = items[target.selected];
            if (selectedItem) {
              value = (selectedItem as any).value || selectedItem.getAttribute('value');
            }
          } catch (e) {
            console.log('Error querying list items', e);
          }
        }
      }

      if (value === undefined || value === null) {
        console.log('Could not determine dropdown value', {
          target,
          configValue,
          targetValue: target?.value,
          targetSelected: target?.selected
        });
        return;
      }

      // Handle empty strings for optional fields
      const finalValue = value === '' ? undefined : value;

      const newConfig = {
        ...this._config,
        [configValue]: finalValue,
      };

      console.log('Updating config:', { configValue, value: finalValue });

      fireEvent(this, 'config-changed', { config: newConfig });

      // Force a complete re-render
      this.requestUpdate();
      this._config = newConfig;
    }, 50);
  }

  private _updateConfig(key: string, value: any): void {
    console.log('_updateConfig called:', { key, value, hasConfig: !!this._config });
    if (!this._config) return;

    const newConfig = {
      ...this._config,
      [key]: value === '' ? undefined : value,
    };

    console.log('New config:', newConfig);
    this._config = newConfig;
    fireEvent(this, 'config-changed', { config: newConfig });
    console.log('Config updated and event fired');
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

  // Metadata Grid Methods

  private _toggleMetadataGrid(ev: any): void {
    const enabled = ev.target.checked;

    if (enabled) {
      // Create default metadata grid from current show_* settings
      const fields: MetadataField[] = [];

      if (this._config.show_task_locations) {
        fields.push({ type: 'location' });
      }
      if (this._config.show_start_date || this._config.show_due_date) {
        fields.push({ type: 'dates' });
      }
      if (this._config.show_tags) {
        fields.push({ type: 'tags', span: 'full' });
      }
      if (this._config.show_assignees) {
        fields.push({ type: 'assignees', span: 'full' });
      }
      if (this._config.show_custom_fields) {
        fields.push({ type: 'custom_fields', span: 'full' });
      }

      const newConfig = {
        ...this._config,
        metadata_grid: {
          columns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '6px 8px',
          fields,
        },
      };

      fireEvent(this, 'config-changed', { config: newConfig });
    } else {
      // Remove metadata_grid from config
      const newConfig = { ...this._config };
      delete newConfig.metadata_grid;
      fireEvent(this, 'config-changed', { config: newConfig });
    }
  }

  private _metadataGridPropertyChanged(property: 'columns' | 'gap', value: string): void {
    if (!this._config.metadata_grid) return;

    const newConfig = {
      ...this._config,
      metadata_grid: {
        ...this._config.metadata_grid,
        [property]: value,
      },
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _renderMetadataFieldRow(field: MetadataField, index: number): TemplateResult {
    const fieldTypeOptions = [
      { value: 'location', label: 'Location' },
      { value: 'start_date', label: 'Start Date' },
      { value: 'due_date', label: 'Due Date' },
      { value: 'dates', label: 'Dates (Start + Due)' },
      { value: 'tags', label: 'Tags' },
      { value: 'assignees', label: 'Assignees' },
      { value: 'custom_fields', label: 'Custom Fields' },
      { value: 'status', label: 'Status' },
      { value: 'priority', label: 'Priority' },
    ];

    const spanOptions = [
      { value: '', label: 'Auto' },
      { value: 'full', label: 'Full Width' },
      { value: '2', label: 'Span 2' },
      { value: '3', label: 'Span 3' },
    ];

    return html`
      <div class="field-row">
        <ha-icon icon="mdi:drag" class="drag-handle"></ha-icon>

        <ha-selector
          .hass=${this.hass}
          .selector=${{
            select: {
              options: fieldTypeOptions,
            },
          }}
          .value=${field.type}
          @value-changed=${(ev: any) => this._metadataFieldPropertyChanged(index, 'type', ev.detail.value)}
        ></ha-selector>

        <ha-selector
          .hass=${this.hass}
          .selector=${{
            select: {
              options: spanOptions,
            },
          }}
          .value=${field.span || ''}
          @value-changed=${(ev: any) => this._metadataFieldPropertyChanged(index, 'span', ev.detail.value)}
        ></ha-selector>

        <mwc-icon-button @click=${() => this._moveMetadataField(index, -1)}>
          <ha-icon icon="mdi:arrow-up"></ha-icon>
        </mwc-icon-button>

        <mwc-icon-button @click=${() => this._moveMetadataField(index, 1)}>
          <ha-icon icon="mdi:arrow-down"></ha-icon>
        </mwc-icon-button>

        <mwc-icon-button @click=${() => this._removeMetadataField(index)}>
          <ha-icon icon="mdi:delete"></ha-icon>
        </mwc-icon-button>
      </div>
    `;
  }

  private _addMetadataField(): void {
    if (!this._config.metadata_grid) return;

    const newField: MetadataField = {
      type: 'location',
    };

    const newConfig = {
      ...this._config,
      metadata_grid: {
        ...this._config.metadata_grid,
        fields: [...(this._config.metadata_grid.fields || []), newField],
      },
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _removeMetadataField(index: number): void {
    if (!this._config.metadata_grid) return;

    const fields = [...(this._config.metadata_grid.fields || [])];
    fields.splice(index, 1);

    const newConfig = {
      ...this._config,
      metadata_grid: {
        ...this._config.metadata_grid,
        fields,
      },
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _moveMetadataField(index: number, direction: number): void {
    if (!this._config.metadata_grid) return;

    const fields = [...(this._config.metadata_grid.fields || [])];
    const newIndex = index + direction;

    if (newIndex < 0 || newIndex >= fields.length) return;

    // Swap fields
    [fields[index], fields[newIndex]] = [fields[newIndex], fields[index]];

    const newConfig = {
      ...this._config,
      metadata_grid: {
        ...this._config.metadata_grid,
        fields,
      },
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _metadataFieldPropertyChanged(index: number, property: 'type' | 'span', value: any): void {
    if (!this._config.metadata_grid) return;

    const fields = [...(this._config.metadata_grid.fields || [])];

    if (property === 'type') {
      fields[index] = {
        ...fields[index],
        type: value as MetadataFieldType,
      };
    } else if (property === 'span') {
      if (value === '') {
        // Remove span property
        const { span, ...rest } = fields[index];
        fields[index] = rest as MetadataField;
      } else {
        fields[index] = {
          ...fields[index],
          span: value,
        };
      }
    }

    const newConfig = {
      ...this._config,
      metadata_grid: {
        ...this._config.metadata_grid,
        fields,
      },
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  static get styles(): CSSResultGroup {
    return css`
      .card-config {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .tabs {
        display: flex;
        border-bottom: 2px solid var(--divider-color);
        background: var(--card-background-color);
        gap: 4px;
        padding: 0 8px;
      }

      .tab {
        background: transparent;
        border: none;
        border-bottom: 2px solid transparent;
        color: var(--secondary-text-color);
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        padding: 12px 16px;
        margin-bottom: -2px;
        transition: all 0.2s ease;
        font-family: inherit;
      }

      .tab:hover {
        color: var(--primary-text-color);
        background: rgba(var(--rgb-primary-color), 0.05);
      }

      .tab.active {
        color: var(--primary-color);
        border-bottom-color: var(--primary-color);
      }

      .tab-content {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
      }

      .tab-panel {
        display: flex;
        flex-direction: column;
        gap: 16px;
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

      /* Metadata Grid Styles */
      .metadata-grid-config {
        margin-top: 16px;
        padding: 16px;
        background: var(--secondary-background-color);
        border-radius: 8px;
      }

      .field-list {
        margin: 16px 0;
      }

      .field-list > label {
        display: block;
        margin-bottom: 12px;
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .field-row {
        display: grid;
        grid-template-columns: 24px 1fr 1fr auto auto auto;
        gap: 8px;
        align-items: center;
        padding: 8px;
        margin-bottom: 8px;
        background: var(--card-background-color);
        border-radius: 8px;
        border: 1px solid var(--divider-color);
      }

      .field-row:hover {
        border-color: var(--primary-color);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .drag-handle {
        cursor: move;
        color: var(--secondary-text-color);
        --mdc-icon-size: 20px;
      }

      .field-row ha-selector {
        margin: 0;
      }

      .field-row mwc-icon-button {
        --mdc-icon-button-size: 32px;
        --mdc-icon-size: 20px;
      }

      mwc-button {
        margin-top: 12px;
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
