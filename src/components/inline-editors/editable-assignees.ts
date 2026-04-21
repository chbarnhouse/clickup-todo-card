import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export interface Assignee {
  id: number;
  username: string;
  email?: string;
  color?: string;
  initials?: string;
  profilePicture?: string;
}

/**
 * Editable assignees component for inline editing
 * Displays assignee avatars that open a multi-select dropdown when clicked
 */
@customElement('editable-assignees')
export class EditableAssignees extends LitElement {
  @property({ type: Array }) value: Assignee[] = [];
  @property({ type: Array }) available: Assignee[] = [];
  @property({ type: Boolean }) compact = false;

  @state() private _isOpen = false;
  @state() private _selectedIds: Set<number> = new Set();

  static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }

    .assignees-display {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .assignees-display:hover {
      background-color: var(--divider-color, rgba(0, 0, 0, 0.08));
    }

    .assignees-display.open {
      background-color: var(--divider-color, rgba(0, 0, 0, 0.12));
    }

    .assignees-display.empty {
      color: var(--secondary-text-color);
      font-size: 13px;
      padding: 4px 8px;
    }

    .assignee-avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 600;
      color: white;
      background-color: var(--primary-color);
      border: 2px solid var(--card-background-color);
      flex-shrink: 0;
    }

    .assignee-avatar:not(:first-child) {
      margin-left: -8px;
    }

    .compact .assignee-avatar {
      width: 20px;
      height: 20px;
      font-size: 9px;
      border-width: 1px;
    }

    .assignee-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .add-assignee {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 2px dashed var(--divider-color);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--secondary-text-color);
      background: var(--card-background-color);
    }

    .compact .add-assignee {
      width: 20px;
      height: 20px;
      border-width: 1px;
    }

    .add-icon {
      --mdc-icon-size: 14px;
    }

    .compact .add-icon {
      --mdc-icon-size: 12px;
    }

    .dropdown {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      background: var(--card-background-color);
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-card-border-radius, 12px);
      box-shadow: 0 4px 16px color-mix(in srgb, var(--shadow-color, #000) 25%, transparent);
      z-index: 100;
      min-width: 250px;
      max-height: 300px;
      overflow-y: auto;
      padding: 8px;
      animation: fadeIn 0.15s ease;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-4px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .dropdown-header {
      font-size: 12px;
      font-weight: 600;
      color: var(--secondary-text-color);
      padding: 4px 12px 8px;
      border-bottom: 1px solid var(--divider-color);
      margin-bottom: 8px;
    }

    .assignee-option {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 12px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.15s ease;
      margin-bottom: 4px;
    }

    .assignee-option:last-child {
      margin-bottom: 0;
    }

    .assignee-option:hover {
      background-color: var(--divider-color, rgba(0, 0, 0, 0.08));
    }

    .assignee-option.selected {
      background-color: color-mix(in srgb, var(--primary-color) 15%, transparent);
    }

    .option-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 600;
      color: white;
      background-color: var(--primary-color);
      flex-shrink: 0;
    }

    .option-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .option-info {
      flex: 1;
      min-width: 0;
    }

    .option-name {
      font-size: 14px;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .option-email {
      font-size: 12px;
      color: var(--secondary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .option-check {
      --mdc-icon-size: 20px;
      color: var(--primary-color);
    }

    .actions {
      display: flex;
      gap: 8px;
      padding: 8px 12px 4px;
      border-top: 1px solid var(--divider-color);
      margin-top: 8px;
    }

    .btn {
      flex: 1;
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 500;
      transition: all 0.15s ease;
    }

    .btn-save {
      background: var(--primary-color);
      color: var(--text-primary-color, white);
    }

    .btn-save:hover {
      opacity: 0.9;
    }

    .btn-cancel {
      background: var(--divider-color, rgba(0, 0, 0, 0.12));
      color: var(--primary-text-color);
    }

    .btn-cancel:hover {
      background: var(--divider-color, rgba(0, 0, 0, 0.2));
    }
  `;

  protected render(): TemplateResult {
    return html`
      <div class="${this.compact ? 'compact' : ''}">
        ${this._renderDisplay()}
        ${this._isOpen ? this._renderDropdown() : ''}
      </div>
    `;
  }

  private _renderDisplay(): TemplateResult {
    const isEmpty = !this.value || this.value.length === 0;

    if (isEmpty) {
      return html`
        <div
          class="assignees-display empty ${this._isOpen ? 'open' : ''}"
          @click=${this._toggleDropdown}
          title="Add assignees"
        >
          <ha-icon icon="mdi:account-plus" class="add-icon"></ha-icon>
          <span>Add assignees</span>
        </div>
      `;
    }

    return html`
      <div
        class="assignees-display ${this._isOpen ? 'open' : ''}"
        @click=${this._toggleDropdown}
        title="${this.value.map(a => a.username).join(', ')}"
      >
        ${this.value.map(assignee => this._renderAvatar(assignee))}
        <div class="add-assignee">
          <ha-icon icon="mdi:plus" class="add-icon"></ha-icon>
        </div>
      </div>
    `;
  }

  private _renderAvatar(assignee: Assignee): TemplateResult {
    const initials = assignee.initials || this._getInitials(assignee.username);

    return html`
      <div
        class="assignee-avatar"
        style="${assignee.color ? `background-color: ${assignee.color}` : ''}"
        title="${assignee.username}"
      >
        ${assignee.profilePicture ? html`
          <img src="${assignee.profilePicture}" alt="${assignee.username}" />
        ` : html`
          <span>${initials}</span>
        `}
      </div>
    `;
  }

  private _renderDropdown(): TemplateResult {
    return html`
      <div class="dropdown" @click=${(e: Event) => e.stopPropagation()}>
        <div class="dropdown-header">Select Assignees</div>

        ${this.available.length > 0 ? html`
          ${this.available.map(assignee => this._renderOption(assignee))}
        ` : html`
          <div style="padding: 12px; text-align: center; color: var(--secondary-text-color);">
            No assignees available
          </div>
        `}

        <div class="actions">
          <button class="btn btn-save" @click=${this._save}>Done</button>
          <button class="btn btn-cancel" @click=${this._cancel}>Cancel</button>
        </div>
      </div>
    `;
  }

  private _renderOption(assignee: Assignee): TemplateResult {
    const isSelected = this._selectedIds.has(assignee.id);
    const initials = assignee.initials || this._getInitials(assignee.username);

    return html`
      <div
        class="assignee-option ${isSelected ? 'selected' : ''}"
        @click=${() => this._toggleAssignee(assignee.id)}
      >
        <div
          class="option-avatar"
          style="${assignee.color ? `background-color: ${assignee.color}` : ''}"
        >
          ${assignee.profilePicture ? html`
            <img src="${assignee.profilePicture}" alt="${assignee.username}" />
          ` : html`
            <span>${initials}</span>
          `}
        </div>

        <div class="option-info">
          <div class="option-name">${assignee.username}</div>
          ${assignee.email ? html`
            <div class="option-email">${assignee.email}</div>
          ` : ''}
        </div>

        ${isSelected ? html`
          <ha-icon class="option-check" icon="mdi:check"></ha-icon>
        ` : ''}
      </div>
    `;
  }

  private _getInitials(name: string): string {
    return name
      .split(/\s+/)
      .map(part => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  private _toggleDropdown(): void {
    if (!this._isOpen) {
      // Opening - initialize selected IDs from current value
      this._selectedIds = new Set(this.value.map(a => a.id));
    }

    this._isOpen = !this._isOpen;

    if (this._isOpen) {
      // Close on outside click
      setTimeout(() => {
        const closeOnOutsideClick = (e: Event) => {
          if (!this.shadowRoot?.contains(e.target as Node)) {
            this._save();
            document.removeEventListener('click', closeOnOutsideClick);
          }
        };
        document.addEventListener('click', closeOnOutsideClick);
      }, 0);
    }
  }

  private _toggleAssignee(id: number): void {
    if (this._selectedIds.has(id)) {
      this._selectedIds.delete(id);
    } else {
      this._selectedIds.add(id);
    }

    // Force re-render
    this.requestUpdate();
  }

  private _save(): void {
    const oldValue = this.value;
    const newValue = this.available.filter(a => this._selectedIds.has(a.id));

    // Check if value changed
    const oldIds = new Set(oldValue.map(a => a.id));
    const newIds = this._selectedIds;
    const changed = oldIds.size !== newIds.size ||
      ![...oldIds].every(id => newIds.has(id));

    if (changed) {
      this.value = newValue;
      this.dispatchEvent(new CustomEvent('value-changed', {
        detail: { value: newValue, oldValue },
        bubbles: true,
        composed: true,
      }));
    }

    this._isOpen = false;
  }

  private _cancel(): void {
    this._selectedIds = new Set(this.value.map(a => a.id));
    this._isOpen = false;
  }

  connectedCallback(): void {
    super.connectedCallback();

    // Close dropdown on escape
    this._handleKeyDown = this._handleKeyDown.bind(this);
    document.addEventListener('keydown', this._handleKeyDown);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._handleKeyDown);
  }

  private _handleKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Escape' && this._isOpen) {
      this._cancel();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'editable-assignees': EditableAssignees;
  }
}
