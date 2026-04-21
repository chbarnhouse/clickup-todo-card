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
      padding: 6px 14px 6px 6px;
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
      padding: 4px 10px 4px 4px;
    }

    /* Modal styles */
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 999;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.2s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .modal-content {
      background: var(--card-background-color);
      border-radius: var(--ha-card-border-radius, 12px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      max-width: 400px;
      max-height: 80vh;
      overflow-y: auto;
      padding: 24px;
      animation: slideUp 0.2s ease;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .modal-header {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 16px;
      color: var(--primary-text-color);
    }

    .status-options {
      display: flex;
      flex-direction: column;
      gap: 8px;
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
      </div>
      ${this._isOpen ? this._renderModal() : ''}
    `;
  }

  private _renderDisplay(): TemplateResult {
    return html`
      <div
        class="status-display"
        @click=${this._openModal}
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

  private _renderModal(): TemplateResult {
    return html`
      <div class="modal-backdrop" @click=${this._closeModal}>
        <div class="modal-content" @click=${(e: Event) => e.stopPropagation()}>
          <div class="modal-header">Change Status</div>
          <div class="status-options">
            ${this.options.map(option => this._renderOption(option))}
          </div>
        </div>
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

  private _openModal(): void {
    this._isOpen = true;

    // Close on ESC key
    setTimeout(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          this._closeModal();
          document.removeEventListener('keydown', handleEscape);
        }
      };
      document.addEventListener('keydown', handleEscape);
    }, 0);
  }

  private _closeModal(): void {
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
