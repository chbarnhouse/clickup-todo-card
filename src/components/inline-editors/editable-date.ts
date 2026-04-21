import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';

/**
 * Editable date component for inline editing
 * Displays a formatted date that becomes a date picker when clicked
 */
@customElement('editable-date')
export class EditableDate extends LitElement {
  @property({ type: Object }) value: Date | null = null;
  @property({ type: String }) label = 'Date';
  @property({ type: String }) icon = 'mdi:calendar';
  @property({ type: Boolean }) compact = false;
  @property({ type: Boolean }) allowNull = true;
  @property({ type: String }) dateType: 'start' | 'due' = 'due';

  @state() private _editing = false;
  @state() private _tempValue = '';

  @query('input[type="date"]') private _input?: HTMLInputElement;

  static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }

    .date-display {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.15s ease;
      user-select: none;
      font-size: 13px;
    }

    .date-display:hover {
      background-color: var(--divider-color, rgba(0, 0, 0, 0.08));
      transform: translateY(-1px);
    }

    .date-display.editing {
      background-color: var(--divider-color, rgba(0, 0, 0, 0.12));
    }

    .date-display.empty {
      color: var(--secondary-text-color);
      font-style: italic;
    }

    .date-display.overdue {
      color: var(--error-color, #f44336);
    }

    .date-display.upcoming {
      color: var(--warning-color, #ff9800);
    }

    .compact .date-display {
      padding: 2px 6px;
      font-size: 11px;
    }

    .date-icon {
      --mdc-icon-size: 16px;
    }

    .compact .date-icon {
      --mdc-icon-size: 14px;
    }

    .edit-popup {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      background: var(--card-background-color);
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-card-border-radius, 12px);
      box-shadow: 0 4px 16px color-mix(in srgb, var(--shadow-color, #000) 25%, transparent);
      z-index: 100;
      padding: 12px;
      min-width: 200px;
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

    .edit-content {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    input[type="date"] {
      width: 100%;
      padding: 8px;
      border: 2px solid var(--primary-color);
      border-radius: 4px;
      background: var(--card-background-color);
      color: var(--primary-text-color);
      font-family: inherit;
      font-size: 14px;
      box-sizing: border-box;
      outline: none;
    }

    .actions {
      display: flex;
      gap: 8px;
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

    .btn-clear {
      background: var(--error-color, #f44336);
      color: white;
    }

    .btn-clear:hover {
      opacity: 0.9;
    }
  `;

  protected render(): TemplateResult {
    return html`
      <div class="${this.compact ? 'compact' : ''}">
        ${this._renderDisplay()}
        ${this._editing ? this._renderEditPopup() : ''}
      </div>
    `;
  }

  private _renderDisplay(): TemplateResult {
    const dateClass = this._getDateClass();
    const isEmpty = !this.value;

    return html`
      <div
        class="date-display ${this._editing ? 'editing' : ''} ${dateClass} ${isEmpty ? 'empty' : ''}"
        @click=${this._startEditing}
        title="${isEmpty ? `Add ${this.label}` : this._formatDate(this.value!)}"
      >
        <ha-icon class="date-icon" icon="${this.icon}"></ha-icon>
        <span>${isEmpty ? `Add ${this.label}` : this._formatDateShort(this.value!)}</span>
      </div>
    `;
  }

  private _renderEditPopup(): TemplateResult {
    return html`
      <div class="edit-popup" @click=${(e: Event) => e.stopPropagation()}>
        <div class="edit-content">
          <input
            type="date"
            .value=${this._tempValue}
            @change=${this._handleDateChange}
            @keydown=${this._handleKeyDown}
          />

          <div class="actions">
            <button class="btn btn-save" @click=${this._save}>Save</button>
            <button class="btn btn-cancel" @click=${this._cancel}>Cancel</button>
            ${this.allowNull && this.value ? html`
              <button class="btn btn-clear" @click=${this._clear}>Clear</button>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  private _getDateClass(): string {
    if (!this.value || this.dateType !== 'due') {
      return '';
    }

    const now = new Date();
    const diff = this.value.getTime() - now.getTime();
    const daysUntil = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (daysUntil < 0) {
      return 'overdue';
    } else if (daysUntil <= 3) {
      return 'upcoming';
    }

    return '';
  }

  private _formatDate(date: Date): string {
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  private _formatDateShort(date: Date): string {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const diff = dateOnly.getTime() - today.getTime();
    const daysUntil = Math.round(diff / (1000 * 60 * 60 * 24));

    if (daysUntil === 0) {
      return 'Today';
    } else if (daysUntil === 1) {
      return 'Tomorrow';
    } else if (daysUntil === -1) {
      return 'Yesterday';
    } else if (daysUntil > 0 && daysUntil <= 7) {
      return date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
    } else if (daysUntil < 0 && daysUntil >= -7) {
      return date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
    }

    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  }

  private _dateToInputValue(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private _inputValueToDate(value: string): Date {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  private _startEditing(): void {
    this._tempValue = this.value ? this._dateToInputValue(this.value) : '';
    this._editing = true;

    // Focus input after render
    requestAnimationFrame(() => {
      this._input?.focus();
    });

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

    this.dispatchEvent(new CustomEvent('edit-start'));
  }

  private _handleDateChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this._tempValue = target.value;
  }

  private _handleKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      e.preventDefault();
      this._save();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      this._cancel();
    }
  }

  private _save(): void {
    const oldValue = this.value;
    let newValue: Date | null = null;

    if (this._tempValue) {
      newValue = this._inputValueToDate(this._tempValue);
    }

    // Only dispatch if value changed
    const oldTime = oldValue?.getTime();
    const newTime = newValue?.getTime();

    if (oldTime !== newTime) {
      this.value = newValue;
      this.dispatchEvent(new CustomEvent('value-changed', {
        detail: { value: newValue, oldValue },
        bubbles: true,
        composed: true,
      }));
    }

    this._editing = false;
    this.dispatchEvent(new CustomEvent('edit-end'));
  }

  private _clear(): void {
    const oldValue = this.value;

    if (oldValue !== null) {
      this.value = null;
      this.dispatchEvent(new CustomEvent('value-changed', {
        detail: { value: null, oldValue },
        bubbles: true,
        composed: true,
      }));
    }

    this._editing = false;
    this.dispatchEvent(new CustomEvent('edit-end'));
  }

  private _cancel(): void {
    this._tempValue = this.value ? this._dateToInputValue(this.value) : '';
    this._editing = false;
    this.dispatchEvent(new CustomEvent('edit-cancel'));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'editable-date': EditableDate;
  }
}
