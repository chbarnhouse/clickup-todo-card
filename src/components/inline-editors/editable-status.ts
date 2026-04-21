import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export interface StatusOption {
  name: string;
  color: string;
  type: 'open' | 'closed' | 'custom';
}

/**
 * Editable status component for inline editing
 * Displays status badge that opens a dropdown when clicked
 */
@customElement('editable-status')
export class EditableStatus extends LitElement {
  @property({ type: Object }) value: StatusOption | null = null;
  @property({ type: Array }) options: StatusOption[] = [];
  @property({ type: Boolean }) compact = false;

  @state() private _isOpen = false;

  static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }

    .status-display {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      transition: all 0.15s ease;
      user-select: none;
    }

    .status-display:hover .status-badge {
      transform: translateY(-1px);
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
    }

    .status-display.open .status-badge {
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      font-size: 11px;
      font-weight: 600;
      padding: 6px 14px;
      border-radius: 16px;
      background: var(--status-color, var(--primary-color));
      color: white;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: all 0.2s ease;
    }

    .compact .status-badge {
      font-size: 10px;
      padding: 3px 8px;
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
      min-width: 200px;
      max-height: 400px;
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

    .status-option {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 12px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.15s ease;
      margin-bottom: 4px;
    }

    .status-option:last-child {
      margin-bottom: 0;
    }

    .status-option:hover {
      background-color: var(--divider-color, rgba(0, 0, 0, 0.08));
      transform: translateX(2px);
    }

    .status-option.selected {
      background-color: color-mix(in srgb, var(--primary-color) 15%, transparent);
    }

    .option-badge {
      display: inline-flex;
      align-items: center;
      font-size: 10px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 12px;
      background: var(--option-color);
      color: white;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      flex-shrink: 0;
    }

    .option-check {
      --mdc-icon-size: 16px;
      color: var(--primary-color);
      margin-left: auto;
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
    return html`
      <div
        class="status-display ${this._isOpen ? 'open' : ''}"
        @click=${this._toggleDropdown}
        title="${this.value?.name || 'No Status'}"
      >
        <span
          class="status-badge"
          style="--status-color: ${this.value?.color || 'var(--disabled-text-color)'}"
        >
          ${this.value?.name || 'NO STATUS'}
        </span>
      </div>
    `;
  }

  private _renderDropdown(): TemplateResult {
    return html`
      <div class="dropdown" @click=${(e: Event) => e.stopPropagation()}>
        ${this.options.map(option => this._renderOption(option))}
      </div>
    `;
  }

  private _renderOption(option: StatusOption): TemplateResult {
    const isSelected = option.name === this.value?.name;

    return html`
      <div
        class="status-option ${isSelected ? 'selected' : ''}"
        @click=${() => this._selectStatus(option)}
      >
        <span
          class="option-badge"
          style="--option-color: ${option.color}"
        >
          ${option.name}
        </span>
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

  private _selectStatus(status: StatusOption): void {
    const oldValue = this.value;

    if (oldValue?.name !== status.name) {
      this.value = status;
      this.dispatchEvent(new CustomEvent('value-changed', {
        detail: { value: status, oldValue },
        bubbles: true,
        composed: true,
      }));
    }

    this._isOpen = false;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'editable-status': EditableStatus;
  }
}
