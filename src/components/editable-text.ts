import { LitElement, html, css, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';

/**
 * Inline text editor component for ClickUp Todo Card
 *
 * Features:
 * - Click to edit mode
 * - Auto-focus on edit
 * - Save on Enter or blur
 * - Cancel on Escape
 * - Show pencil icon on hover when not editing
 * - Supports multiline text (textarea)
 * - Validates empty input
 *
 * @fires save - Dispatched when the value is saved with new value in detail
 * @fires cancel - Dispatched when edit is cancelled
 *
 * @example
 * ```html
 * <editable-text
 *   .value=${'Task name'}
 *   .placeholder=${'Enter task name'}
 *   @save=${(e) => this.handleSave(e.detail.value)}
 *   @cancel=${() => this.handleCancel()}
 * ></editable-text>
 * ```
 */
@customElement('editable-text')
export class EditableText extends LitElement {
  /**
   * Current text value
   */
  @property({ type: String })
  public value = '';

  /**
   * Placeholder text when empty
   */
  @property({ type: String })
  public placeholder = 'Click to edit';

  /**
   * Whether to use textarea (multiline) instead of input
   */
  @property({ type: Boolean })
  public multiline = false;

  /**
   * Whether the text is required (cannot be empty)
   */
  @property({ type: Boolean })
  public required = false;

  /**
   * Custom class to apply to the text display
   */
  @property({ type: String })
  public textClass = '';

  /**
   * Whether to show the edit icon on hover
   */
  @property({ type: Boolean })
  public showEditIcon = true;

  /**
   * Maximum length of input (0 = no limit)
   */
  @property({ type: Number })
  public maxLength = 0;

  /**
   * Whether currently in edit mode
   */
  @state()
  private _isEditing = false;

  /**
   * Current edit value (may differ from saved value while editing)
   */
  @state()
  private _editValue = '';

  /**
   * Whether the component is being hovered
   */
  @state()
  private _isHovered = false;

  /**
   * Reference to the input/textarea element
   */
  @query('#edit-input')
  private _inputElement?: HTMLInputElement | HTMLTextAreaElement;

  /**
   * Enter edit mode
   */
  private _enterEditMode(): void {
    if (this._isEditing) {
      return;
    }

    this._editValue = this.value;
    this._isEditing = true;

    // Focus the input after render
    this.updateComplete.then(() => {
      if (this._inputElement) {
        this._inputElement.focus();
        // Select all text for easy replacement
        this._inputElement.select();
      }
    });
  }

  /**
   * Save the current edit value
   */
  private _save(): void {
    if (!this._isEditing) {
      return;
    }

    const trimmedValue = this._editValue.trim();

    // Validate required field
    if (this.required && !trimmedValue) {
      // Don't save empty value for required fields
      // Could show error message here
      return;
    }

    // Only dispatch save if value changed
    if (trimmedValue !== this.value) {
      this.dispatchEvent(
        new CustomEvent('save', {
          detail: { value: trimmedValue },
          bubbles: true,
          composed: true,
        })
      );
    }

    this._isEditing = false;
  }

  /**
   * Cancel editing and revert to original value
   */
  private _cancel(): void {
    if (!this._isEditing) {
      return;
    }

    this._editValue = this.value;
    this._isEditing = false;

    this.dispatchEvent(
      new CustomEvent('cancel', {
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Handle input changes
   */
  private _handleInput(e: InputEvent): void {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    this._editValue = target.value;
  }

  /**
   * Handle key presses
   */
  private _handleKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Enter' && !this.multiline) {
      // Save on Enter (for single-line input)
      e.preventDefault();
      this._save();
    } else if (e.key === 'Enter' && this.multiline && (e.ctrlKey || e.metaKey)) {
      // Save on Ctrl+Enter or Cmd+Enter (for multiline)
      e.preventDefault();
      this._save();
    } else if (e.key === 'Escape') {
      // Cancel on Escape
      e.preventDefault();
      this._cancel();
    }
  }

  /**
   * Handle blur (save when clicking outside)
   */
  private _handleBlur(): void {
    // Small delay to allow click events to process first
    setTimeout(() => {
      if (this._isEditing) {
        this._save();
      }
    }, 100);
  }

  /**
   * Handle mouse enter
   */
  private _handleMouseEnter(): void {
    this._isHovered = true;
  }

  /**
   * Handle mouse leave
   */
  private _handleMouseLeave(): void {
    this._isHovered = false;
  }

  protected render(): TemplateResult {
    if (this._isEditing) {
      return this._renderEditMode();
    }

    return this._renderDisplayMode();
  }

  /**
   * Render display mode (showing text with edit icon)
   */
  private _renderDisplayMode(): TemplateResult {
    const displayValue = this.value || this.placeholder;
    const isEmpty = !this.value;

    return html`
      <div
        class="display-mode ${this.textClass} ${isEmpty ? 'empty' : ''}"
        @click=${this._enterEditMode}
        @mouseenter=${this._handleMouseEnter}
        @mouseleave=${this._handleMouseLeave}
      >
        <span class="text-content">${displayValue}</span>
        ${this.showEditIcon && this._isHovered
          ? html`<ha-icon class="edit-icon" icon="mdi:pencil"></ha-icon>`
          : ''}
      </div>
    `;
  }

  /**
   * Render edit mode (showing input/textarea)
   */
  private _renderEditMode(): TemplateResult {
    const inputAttrs = {
      id: 'edit-input',
      class: 'edit-input',
      placeholder: this.placeholder,
      maxlength: this.maxLength > 0 ? this.maxLength : undefined,
    };

    if (this.multiline) {
      return html`
        <textarea
          ...${inputAttrs}
          .value=${this._editValue}
          @input=${this._handleInput}
          @keydown=${this._handleKeyDown}
          @blur=${this._handleBlur}
          rows="3"
        ></textarea>
      `;
    }

    return html`
      <input
        ...${inputAttrs}
        type="text"
        .value=${this._editValue}
        @input=${this._handleInput}
        @keydown=${this._handleKeyDown}
        @blur=${this._handleBlur}
      />
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
        width: 100%;
      }

      .display-mode {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 4px 8px;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s ease;
        min-height: 32px;
      }

      .display-mode:hover {
        background-color: var(--secondary-background-color, #f0f0f0);
      }

      .display-mode.empty {
        color: var(--secondary-text-color, #888);
        font-style: italic;
      }

      .text-content {
        flex: 1;
        word-break: break-word;
        white-space: pre-wrap;
      }

      .edit-icon {
        color: var(--secondary-text-color, #888);
        --mdc-icon-size: 16px;
        flex-shrink: 0;
      }

      .edit-input,
      textarea {
        width: 100%;
        padding: 8px;
        border: 2px solid var(--primary-color);
        border-radius: 4px;
        font-family: inherit;
        font-size: inherit;
        background-color: var(--card-background-color, white);
        color: var(--primary-text-color, black);
        box-sizing: border-box;
      }

      .edit-input:focus,
      textarea:focus {
        outline: none;
        border-color: var(--accent-color, var(--primary-color));
      }

      textarea {
        resize: vertical;
        min-height: 64px;
      }

      input::placeholder,
      textarea::placeholder {
        color: var(--secondary-text-color, #888);
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'editable-text': EditableText;
  }
}
