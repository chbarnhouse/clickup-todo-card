import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';

/**
 * Editable text component for inline editing
 * Displays text that becomes an input field when clicked
 */
@customElement('editable-text')
export class EditableText extends LitElement {
  @property({ type: String }) value = '';
  @property({ type: Boolean }) editing = false;
  @property({ type: String }) placeholder = 'Click to edit';
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean }) multiline = false;
  @property({ type: Number }) maxLength?: number;

  @state() private _tempValue = '';
  @state() private _error = '';

  @query('input, textarea') private _input?: HTMLInputElement | HTMLTextAreaElement;

  static styles = css`
    :host {
      display: block;
      position: relative;
    }

    .display-mode {
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 4px;
      transition: background-color 0.15s ease;
      min-height: 20px;
      word-break: break-word;
    }

    .display-mode:hover {
      background-color: var(--divider-color, rgba(0, 0, 0, 0.08));
    }

    .display-mode.empty {
      color: var(--secondary-text-color);
      font-style: italic;
    }

    .edit-mode {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    input, textarea {
      width: 100%;
      padding: 4px 8px;
      border: 2px solid var(--primary-color);
      border-radius: 4px;
      background: var(--card-background-color);
      color: var(--primary-text-color);
      font-family: inherit;
      font-size: inherit;
      box-sizing: border-box;
      outline: none;
    }

    input.error, textarea.error {
      border-color: var(--error-color, #f44336);
    }

    textarea {
      resize: vertical;
      min-height: 60px;
    }

    .error-message {
      color: var(--error-color, #f44336);
      font-size: 12px;
      padding: 0 8px;
    }

    .actions {
      display: flex;
      gap: 8px;
      padding: 4px 0;
    }

    .btn {
      padding: 4px 12px;
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
      transform: translateY(-1px);
    }

    .btn-cancel {
      background: var(--divider-color, rgba(0, 0, 0, 0.12));
      color: var(--primary-text-color);
    }

    .btn-cancel:hover {
      background: var(--divider-color, rgba(0, 0, 0, 0.2));
    }

    .hint {
      font-size: 11px;
      color: var(--secondary-text-color);
      padding: 0 8px;
    }
  `;

  protected render(): TemplateResult {
    if (this.editing) {
      return this._renderEditMode();
    }

    return this._renderDisplayMode();
  }

  private _renderDisplayMode(): TemplateResult {
    const isEmpty = !this.value || this.value.trim() === '';

    return html`
      <div
        class="display-mode ${isEmpty ? 'empty' : ''}"
        @click=${this._startEditing}
        title="Click to edit"
      >
        ${isEmpty ? this.placeholder : this.value}
      </div>
    `;
  }

  private _renderEditMode(): TemplateResult {
    const hasError = this._error !== '';

    return html`
      <div class="edit-mode">
        ${this.multiline ? html`
          <textarea
            class="${hasError ? 'error' : ''}"
            .value=${this._tempValue}
            placeholder=${this.placeholder}
            maxlength=${this.maxLength || ''}
            @input=${this._handleInput}
            @keydown=${this._handleKeyDown}
            @blur=${this._handleBlur}
          ></textarea>
        ` : html`
          <input
            type="text"
            class="${hasError ? 'error' : ''}"
            .value=${this._tempValue}
            placeholder=${this.placeholder}
            maxlength=${this.maxLength || ''}
            @input=${this._handleInput}
            @keydown=${this._handleKeyDown}
            @blur=${this._handleBlur}
          />
        `}

        ${hasError ? html`
          <div class="error-message">${this._error}</div>
        ` : ''}

        <div class="actions">
          <button class="btn btn-save" @click=${this._save}>Save</button>
          <button class="btn btn-cancel" @click=${this._cancel}>Cancel</button>
        </div>

        <div class="hint">Press Enter to save, Esc to cancel</div>
      </div>
    `;
  }

  private _startEditing(): void {
    this._tempValue = this.value;
    this._error = '';
    this.editing = true;

    // Focus input after render
    requestAnimationFrame(() => {
      this._input?.focus();
      this._input?.select();
    });

    this.dispatchEvent(new CustomEvent('edit-start'));
  }

  private _handleInput(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    this._tempValue = target.value;
    this._error = '';

    // Validate in real-time
    if (this.required && !this._tempValue.trim()) {
      this._error = 'This field is required';
    }
  }

  private _handleKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Enter' && !this.multiline) {
      e.preventDefault();
      this._save();
    } else if (e.key === 'Enter' && e.ctrlKey && this.multiline) {
      e.preventDefault();
      this._save();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      this._cancel();
    }
  }

  private _handleBlur(): void {
    // Delay to allow click on buttons
    setTimeout(() => {
      if (this.editing) {
        this._save();
      }
    }, 200);
  }

  private _validate(): boolean {
    if (this.required && !this._tempValue.trim()) {
      this._error = 'This field is required';
      return false;
    }

    return true;
  }

  private _save(): void {
    if (!this._validate()) {
      return;
    }

    const oldValue = this.value;
    const newValue = this._tempValue.trim();

    // Only dispatch if value changed
    if (oldValue !== newValue) {
      this.value = newValue;
      this.dispatchEvent(new CustomEvent('value-changed', {
        detail: { value: newValue, oldValue },
        bubbles: true,
        composed: true,
      }));
    }

    this.editing = false;
    this.dispatchEvent(new CustomEvent('edit-end'));
  }

  private _cancel(): void {
    this._tempValue = this.value;
    this._error = '';
    this.editing = false;
    this.dispatchEvent(new CustomEvent('edit-cancel'));
  }

  /**
   * Public API: Start editing programmatically
   */
  public startEditing(): void {
    this._startEditing();
  }

  /**
   * Public API: Cancel editing programmatically
   */
  public cancelEditing(): void {
    this._cancel();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'editable-text': EditableText;
  }
}
