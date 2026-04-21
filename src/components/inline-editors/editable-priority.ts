import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

const PRIORITY_OPTIONS = [
  { value: 1, label: 'Urgent', icon: 'mdi:flag', color: '#f44336' },
  { value: 2, label: 'High', icon: 'mdi:chevron-double-up', color: '#ff9800' },
  { value: 3, label: 'Normal', icon: 'mdi:equal', color: '#2196f3' },
  { value: 4, label: 'Low', icon: 'mdi:chevron-double-down', color: '#9e9e9e' },
  { value: null, label: 'No Priority', icon: 'mdi:dots-horizontal', color: 'var(--disabled-text-color)' },
];

/**
 * Editable priority component for inline editing
 * Displays priority icon that opens a dropdown when clicked
 */
@customElement('editable-priority')
export class EditablePriority extends LitElement {
  @property({ type: Number }) value: number | null = null;
  @property({ type: Boolean }) showLabel = false;
  @property({ type: Boolean }) compact = false;

  @state() private _isOpen = false;

  static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }

    .priority-display {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.15s ease;
      user-select: none;
    }

    .priority-display:hover {
      background-color: var(--divider-color, rgba(0, 0, 0, 0.08));
      transform: translateY(-1px);
    }

    .priority-display.open {
      background-color: var(--divider-color, rgba(0, 0, 0, 0.12));
    }

    .priority-icon {
      --mdc-icon-size: 18px;
      flex-shrink: 0;
    }

    .priority-label {
      font-size: 13px;
      font-weight: 500;
      white-space: nowrap;
    }

    .compact .priority-icon {
      --mdc-icon-size: 14px;
    }

    .compact .priority-label {
      font-size: 11px;
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
      min-width: 180px;
      overflow: hidden;
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

    .priority-option {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 12px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.15s ease;
      margin-bottom: 4px;
    }

    .priority-option:last-child {
      margin-bottom: 0;
    }

    .priority-option:hover {
      background-color: var(--divider-color, rgba(0, 0, 0, 0.08));
      transform: translateX(2px);
    }

    .priority-option.selected {
      background-color: color-mix(in srgb, var(--primary-color) 15%, transparent);
    }

    .option-icon {
      --mdc-icon-size: 20px;
      flex-shrink: 0;
    }

    .option-label {
      flex: 1;
      font-size: 14px;
      font-weight: 500;
    }

    .option-check {
      --mdc-icon-size: 16px;
      color: var(--primary-color);
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
    const option = PRIORITY_OPTIONS.find(o => o.value === this.value) || PRIORITY_OPTIONS[4];

    return html`
      <div
        class="priority-display ${this._isOpen ? 'open' : ''}"
        @click=${this._toggleDropdown}
        title="${option.label}"
      >
        <ha-icon
          class="priority-icon"
          icon="${option.icon}"
          style="color: ${option.color}"
        ></ha-icon>
        ${this.showLabel ? html`
          <span class="priority-label" style="color: ${option.color}">
            ${option.label}
          </span>
        ` : ''}
      </div>
    `;
  }

  private _renderDropdown(): TemplateResult {
    return html`
      <div class="dropdown" @click=${(e: Event) => e.stopPropagation()}>
        ${PRIORITY_OPTIONS.map(option => this._renderOption(option))}
      </div>
    `;
  }

  private _renderOption(option: typeof PRIORITY_OPTIONS[0]): TemplateResult {
    const isSelected = option.value === this.value;

    return html`
      <div
        class="priority-option ${isSelected ? 'selected' : ''}"
        @click=${() => this._selectPriority(option.value)}
      >
        <ha-icon
          class="option-icon"
          icon="${option.icon}"
          style="color: ${option.color}"
        ></ha-icon>
        <span class="option-label">${option.label}</span>
        ${isSelected ? html`
          <ha-icon class="option-check" icon="mdi:check"></ha-icon>
        ` : ''}
      </div>
    `;
  }

  private _toggleDropdown(): void {
    this._isOpen = !this._isOpen;

    if (this._isOpen) {
      // Close on outside click
      setTimeout(() => {
        const closeOnOutsideClick = (e: Event) => {
          if (!this.shadowRoot?.contains(e.target as Node)) {
            this._isOpen = false;
            document.removeEventListener('click', closeOnOutsideClick);
          }
        };
        document.addEventListener('click', closeOnOutsideClick);
      }, 0);
    }
  }

  private _selectPriority(priority: number | null): void {
    const oldValue = this.value;

    if (oldValue !== priority) {
      this.value = priority;
      this.dispatchEvent(new CustomEvent('value-changed', {
        detail: { value: priority, oldValue },
        bubbles: true,
        composed: true,
      }));
    }

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
      this._isOpen = false;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'editable-priority': EditablePriority;
  }
}
