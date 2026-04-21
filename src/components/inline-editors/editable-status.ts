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
    .status-options {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 8px;
    }

    .status-option {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.15s ease;
      border: 2px solid transparent;
    }

    .status-option:hover {
      background-color: rgba(0, 0, 0, 0.05);
      transform: translateX(4px);
    }

    .status-option.selected {
      background-color: color-mix(in srgb, var(--primary-color) 10%, transparent);
      border-color: var(--primary-color);
    }

    .option-badge {
      display: inline-flex;
      align-items: center;
      font-size: 11px;
      font-weight: 600;
      padding: 6px 14px;
      border-radius: 12px;
      background: var(--option-color);
      color: white;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      flex-shrink: 0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .option-check {
      --mdc-icon-size: 20px;
      color: var(--primary-color);
      margin-left: auto;
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
        ${isSelected ? html`
          <ha-icon class="option-check" icon="mdi:check"></ha-icon>
        ` : ''}
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
