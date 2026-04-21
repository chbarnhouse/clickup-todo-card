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
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      filter: brightness(1.05);
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 700;
      padding: 7px 14px 7px 36px;
      border-radius: 20px;
      background: var(--status-color, var(--primary-color));
      color: white;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      min-height: 32px;
      white-space: nowrap;
      position: relative;
    }

    .compact .status-badge {
      font-size: 9px;
      padding: 5px 12px 5px 30px;
      min-height: 26px;
      letter-spacing: 0.6px;
    }

    /* Dialog styling */
    ha-dialog {
      --mdc-dialog-min-width: 460px;
      --mdc-dialog-max-width: 560px;
      --mdc-dialog-box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      --mdc-shape-medium: 20px;
    }

    .status-options {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      padding: 20px;
      max-width: 100%;
    }

    @media (max-width: 500px) {
      .status-options {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .status-option {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0;
      border-radius: 16px;
      cursor: pointer;
      transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
      border: 2px solid transparent;
      background: transparent;
      position: relative;
      min-height: 60px;
      overflow: hidden;
    }

    .status-option:hover {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    }

    .status-option:active {
      transform: translateY(0) scale(0.98);
    }

    .status-option.selected {
      border-color: rgba(255, 255, 255, 0.3);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2), 0 0 0 2px rgba(255, 255, 255, 0.2);
    }

    .status-option.selected::after {
      content: '';
      position: absolute;
      top: 6px;
      right: 6px;
      width: 22px;
      height: 22px;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 50%;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
      z-index: 2;
    }

    .status-option.selected::before {
      content: '✓';
      position: absolute;
      top: 6px;
      right: 6px;
      width: 22px;
      height: 22px;
      color: var(--option-color);
      font-size: 16px;
      font-weight: 900;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 3;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .option-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 700;
      padding: 16px 12px;
      width: 100%;
      height: 100%;
      background: var(--option-color);
      color: white;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      text-align: center;
      line-height: 1.3;
      word-wrap: break-word;
      transition: filter 0.15s ease;
    }

    .status-option:hover .option-badge {
      filter: brightness(1.1);
    }

    .status-option.selected .option-badge {
      filter: brightness(1.15);
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
