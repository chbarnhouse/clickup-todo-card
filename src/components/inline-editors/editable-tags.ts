import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';

export interface Tag {
  name: string;
  tag_fg?: string;
  tag_bg?: string;
}

/**
 * Editable tags component for inline editing
 * Displays tags as chips with ability to add/remove
 */
@customElement('editable-tags')
export class EditableTags extends LitElement {
  @property({ type: Array }) value: Tag[] = [];
  @property({ type: Boolean }) compact = false;

  @state() private _isAdding = false;
  @state() private _newTagName = '';

  @query('input') private _input?: HTMLInputElement;

  static styles = css`
    :host {
      display: inline-block;
    }

    .tags-container {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
      padding: 2px;
    }

    .tag {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      border-radius: 12px;
      background-color: var(--primary-color);
      color: white;
      font-size: 11px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s ease;
      user-select: none;
    }

    .tag:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }

    .compact .tag {
      padding: 2px 6px;
      font-size: 10px;
      border-radius: 10px;
    }

    .tag-remove {
      --mdc-icon-size: 14px;
      cursor: pointer;
      opacity: 0.7;
      transition: opacity 0.15s ease;
    }

    .tag-remove:hover {
      opacity: 1;
    }

    .compact .tag-remove {
      --mdc-icon-size: 12px;
    }

    .add-tag-button {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      border-radius: 12px;
      border: 1px dashed var(--divider-color);
      background: transparent;
      color: var(--secondary-text-color);
      font-size: 11px;
      cursor: pointer;
      transition: all 0.15s ease;
      user-select: none;
    }

    .add-tag-button:hover {
      border-color: var(--primary-color);
      color: var(--primary-color);
      background: color-mix(in srgb, var(--primary-color) 10%, transparent);
    }

    .compact .add-tag-button {
      padding: 2px 6px;
      font-size: 10px;
      border-radius: 10px;
    }

    .add-icon {
      --mdc-icon-size: 14px;
    }

    .compact .add-icon {
      --mdc-icon-size: 12px;
    }

    .add-tag-input-container {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: var(--card-background-color);
      border: 2px solid var(--primary-color);
      border-radius: 12px;
      padding: 4px 8px;
      animation: fadeIn 0.15s ease;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .compact .add-tag-input-container {
      padding: 2px 6px;
      border-radius: 10px;
    }

    input {
      border: none;
      background: transparent;
      color: var(--primary-text-color);
      font-family: inherit;
      font-size: 11px;
      outline: none;
      width: 80px;
    }

    .compact input {
      font-size: 10px;
      width: 60px;
    }

    input::placeholder {
      color: var(--secondary-text-color);
    }

    .input-actions {
      display: flex;
      gap: 2px;
    }

    .input-btn {
      --mdc-icon-size: 16px;
      cursor: pointer;
      opacity: 0.7;
      transition: all 0.15s ease;
      color: var(--primary-text-color);
    }

    .input-btn:hover {
      opacity: 1;
      transform: scale(1.1);
    }

    .compact .input-btn {
      --mdc-icon-size: 14px;
    }

    .input-btn.save {
      color: var(--success-color, #4caf50);
    }

    .input-btn.cancel {
      color: var(--error-color, #f44336);
    }
  `;

  protected render(): TemplateResult {
    return html`
      <div class="tags-container ${this.compact ? 'compact' : ''}">
        ${this.value.map((tag, index) => this._renderTag(tag, index))}
        ${this._isAdding ? this._renderAddInput() : this._renderAddButton()}
      </div>
    `;
  }

  private _renderTag(tag: Tag, index: number): TemplateResult {
    const bgColor = tag.tag_bg || 'var(--primary-color)';
    const fgColor = tag.tag_fg || 'white';

    return html`
      <div
        class="tag"
        style="background-color: ${bgColor}; color: ${fgColor};"
        title="${tag.name}"
      >
        <span>${tag.name}</span>
        <ha-icon
          class="tag-remove"
          icon="mdi:close"
          @click=${() => this._removeTag(index)}
        ></ha-icon>
      </div>
    `;
  }

  private _renderAddButton(): TemplateResult {
    return html`
      <div class="add-tag-button" @click=${this._startAdding}>
        <ha-icon class="add-icon" icon="mdi:tag-plus"></ha-icon>
        <span>Add tag</span>
      </div>
    `;
  }

  private _renderAddInput(): TemplateResult {
    return html`
      <div class="add-tag-input-container">
        <input
          type="text"
          placeholder="Tag name"
          .value=${this._newTagName}
          @input=${this._handleInput}
          @keydown=${this._handleKeyDown}
          @blur=${this._handleBlur}
        />
        <div class="input-actions">
          <ha-icon
            class="input-btn save"
            icon="mdi:check"
            @click=${this._addTag}
            title="Add (Enter)"
          ></ha-icon>
          <ha-icon
            class="input-btn cancel"
            icon="mdi:close"
            @click=${this._cancelAdding}
            title="Cancel (Esc)"
          ></ha-icon>
        </div>
      </div>
    `;
  }

  private _startAdding(): void {
    this._isAdding = true;
    this._newTagName = '';

    // Focus input after render
    requestAnimationFrame(() => {
      this._input?.focus();
    });
  }

  private _handleInput(e: Event): void {
    const target = e.target as HTMLInputElement;
    this._newTagName = target.value;
  }

  private _handleKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      e.preventDefault();
      this._addTag();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      this._cancelAdding();
    }
  }

  private _handleBlur(): void {
    // Delay to allow click on buttons
    setTimeout(() => {
      if (this._isAdding && this._newTagName.trim()) {
        this._addTag();
      } else if (this._isAdding) {
        this._cancelAdding();
      }
    }, 200);
  }

  private _addTag(): void {
    const tagName = this._newTagName.trim();

    if (!tagName) {
      this._cancelAdding();
      return;
    }

    // Check if tag already exists
    if (this.value.some(t => t.name.toLowerCase() === tagName.toLowerCase())) {
      this._cancelAdding();
      return;
    }

    const oldValue = this.value;
    const newTag: Tag = { name: tagName };
    const newValue = [...this.value, newTag];

    this.value = newValue;
    this.dispatchEvent(new CustomEvent('value-changed', {
      detail: { value: newValue, oldValue },
      bubbles: true,
      composed: true,
    }));

    this._newTagName = '';
    this._isAdding = false;
  }

  private _removeTag(index: number): void {
    const oldValue = this.value;
    const newValue = this.value.filter((_, i) => i !== index);

    this.value = newValue;
    this.dispatchEvent(new CustomEvent('value-changed', {
      detail: { value: newValue, oldValue },
      bubbles: true,
      composed: true,
    }));
  }

  private _cancelAdding(): void {
    this._isAdding = false;
    this._newTagName = '';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'editable-tags': EditableTags;
  }
}
