import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export interface StatusOption {
  name?: string;
  status?: string;  // ClickUp uses 'status' instead of 'name'
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
      display: flex;
      margin: 0;
      padding: 0;
    }

    .status-display {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      user-select: none;
      margin: 0;
      padding: 0;
    }

    .status-display:hover .status-badge {
      opacity: 0.85;
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      justify-content: flex-start;
      font-size: inherit;
      font-weight: inherit;
      padding: 0;
      border-radius: 0;
      background: transparent;
      color: inherit;
      text-transform: uppercase;
      letter-spacing: inherit;
      white-space: nowrap;
      transition: opacity 0.15s ease;
      line-height: inherit;
      position: relative;
    }

    .compact .status-badge {
      font-size: inherit;
      padding: 0;
      border-radius: 0;
      letter-spacing: inherit;
    }

    /* Dialog styling */
    ha-dialog {
      --mdc-dialog-min-width: 380px;
      --mdc-dialog-max-width: 480px;
      --mdc-dialog-box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      --mdc-shape-medium: 20px;
    }

    .status-options {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 20px;
      max-height: 60vh;
      overflow-y: auto;
    }

    .status-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .group-label {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--secondary-text-color);
      padding: 0 4px 4px 4px;
      border-bottom: 1px solid var(--divider-color);
    }

    .status-option {
      display: flex;
      align-items: center;
      padding: 0;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
      border: 2px solid transparent;
      background: transparent;
      position: relative;
      min-height: 48px;
      overflow: hidden;
    }

    .status-option:hover {
      transform: translateX(4px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .status-option:active {
      transform: translateX(2px);
    }

    .status-option.selected {
      border-color: rgba(255, 255, 255, 0.3);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2), 0 0 0 2px rgba(255, 255, 255, 0.2);
    }

    .status-option.selected::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 12px;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 50%;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
      z-index: 2;
    }

    .status-option.selected::before {
      content: '✓';
      position: absolute;
      top: 50%;
      right: 12px;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      color: var(--option-color);
      font-size: 14px;
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
      justify-content: flex-start;
      font-size: 11px;
      font-weight: 700;
      padding: 14px 44px 14px 18px;
      width: 100%;
      background: var(--option-color);
      color: white;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      text-align: left;
      line-height: 1.3;
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
    const statusName = this.value?.name || this.value?.status || 'NO STATUS';
    const statusTitle = this.value?.name || this.value?.status || 'No Status';

    return html`
      <div
        class="status-display"
        @click=${this._openDialog}
        title="${statusTitle}"
      >
        <span
          class="status-badge"
          style="--status-color: ${this.value?.color || 'var(--disabled-text-color)'}"
        >
          ${statusName}
        </span>
      </div>
    `;
  }

  private _renderDialog(): TemplateResult {
    // Group statuses by type with ClickUp-style categorization
    const grouped = {
      notStarted: [] as StatusOption[],
      active: [] as StatusOption[],
      done: [] as StatusOption[],
      closed: [] as StatusOption[]
    };

    this.options.forEach(option => {
      const type = option.type || 'custom';
      const statusName = (option.name || option.status || '').toLowerCase();

      // Check for done/complete keywords first (regardless of type)
      if (statusName.includes('complete') || statusName.includes('done') || statusName === 'finished') {
        grouped.done.push(option);
      }
      // Check for closed keywords
      else if (statusName.includes('cancel') || statusName.includes('archive') || (type === 'closed' && !statusName.includes('complete'))) {
        grouped.closed.push(option);
      }
      // Check for open/not started
      else if (type === 'open' || statusName.includes('to do') || statusName.includes('todo') || statusName.includes('backlog')) {
        grouped.notStarted.push(option);
      }
      // Everything else goes to active
      else {
        grouped.active.push(option);
      }
    });

    return html`
      <ha-dialog
        .open=${this._isOpen}
        @closed=${this._closeDialog}
        .heading=${'Change Status'}
      >
        <div class="status-options">
          ${grouped.notStarted.length > 0 ? html`
            <div class="status-group">
              <div class="group-label">Not Started</div>
              ${grouped.notStarted.map(option => this._renderOption(option))}
            </div>
          ` : ''}
          ${grouped.active.length > 0 ? html`
            <div class="status-group">
              <div class="group-label">Active</div>
              ${grouped.active.map(option => this._renderOption(option))}
            </div>
          ` : ''}
          ${grouped.done.length > 0 ? html`
            <div class="status-group">
              <div class="group-label">Done</div>
              ${grouped.done.map(option => this._renderOption(option))}
            </div>
          ` : ''}
          ${grouped.closed.length > 0 ? html`
            <div class="status-group">
              <div class="group-label">Closed</div>
              ${grouped.closed.map(option => this._renderOption(option))}
            </div>
          ` : ''}
        </div>
      </ha-dialog>
    `;
  }

  private _renderOption(option: StatusOption): TemplateResult {
    const optionName = option.name || option.status || '';
    const valueName = this.value?.name || this.value?.status || '';
    const isSelected = optionName === valueName;

    return html`
      <div
        class="status-option ${isSelected ? 'selected' : ''}"
        @click=${() => this._selectStatus(option)}
      >
        <span
          class="option-badge"
          style="--option-color: ${option.color}"
        >
          ${optionName}
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
    const oldName = oldValue?.name || oldValue?.status || '';
    const newName = status.name || status.status || '';

    if (oldName !== newName) {
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
