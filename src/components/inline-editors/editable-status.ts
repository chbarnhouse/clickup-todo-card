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
    }

    .status-display {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      user-select: none;
    }

    .status-display:hover .status-badge {
      transform: translateY(-1px);
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      font-size: 11px;
      font-weight: 600;
      padding: 6px 16px 6px 38px;
      border-radius: 16px;
      background: var(--status-color, var(--primary-color));
      color: white;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: all 0.2s ease;
      min-height: 28px;
    }

    .compact .status-badge {
      font-size: 10px;
      padding: 4px 12px 4px 32px;
      min-height: 24px;
    }

    /* Dialog content styles */
    ha-dialog {
      --mdc-dialog-min-width: 400px;
      --mdc-dialog-max-width: 500px;
    }

    .status-options {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 12px;
      padding: 16px;
    }

    .status-option {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 16px 12px;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      border: 2px solid transparent;
      background: rgba(0, 0, 0, 0.02);
      position: relative;
      min-height: 80px;
    }

    .status-option:hover {
      background: rgba(0, 0, 0, 0.05);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .status-option.selected {
      background: color-mix(in srgb, var(--primary-color) 8%, transparent);
      border-color: var(--primary-color);
      box-shadow: 0 0 0 1px var(--primary-color);
    }

    .status-option.selected::after {
      content: '';
      position: absolute;
      top: 8px;
      right: 8px;
      width: 20px;
      height: 20px;
      background: var(--primary-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .status-option.selected::before {
      content: '✓';
      position: absolute;
      top: 8px;
      right: 8px;
      width: 20px;
      height: 20px;
      color: white;
      font-size: 14px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
    }

    .option-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 600;
      padding: 8px 16px;
      border-radius: 16px;
      background: var(--option-color);
      color: white;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
      min-height: 32px;
      width: 100%;
      text-align: center;
    }
  `;

  protected render(): TemplateResult {
    return html`
      <div class="${this.compact ? 'compact' : ''}">
        ${this._renderDisplay()}
        ${this._renderDialog()}
      </div>
    `;
  }

  private _renderDisplay(): TemplateResult {
    return html`
      <div
        class="status-display"
        @click=${this._openDialog}
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

  private _renderDialog(): TemplateResult {
    return html`
      <ha-dialog
        .open=${this._isOpen}
        @closed=${this._closeDialog}
        .heading=${'Change Status'}
      >
        <div class="status-options">
          ${this.options.map(option => this._renderOption(option))}
        </div>
      </ha-dialog>
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
      </div>
    `;
  }

  private _openDialog(): void {
    this._isOpen = true;
  }

  private _closeDialog(): void {
    this._isOpen = false;
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
