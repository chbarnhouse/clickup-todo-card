// Minimal test card to verify loading
console.log('%c CLICKUP TEST CARD LOADED ', 'background: green; color: white; font-size: 20px;');

// Register card
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'custom:clickup-todo-card',
  name: 'ClickUp Todo Card',
  description: 'Test version - minimal implementation',
  preview: false,
});

console.log('Card registered in customCards array');

// Create minimal custom element
class ClickUpTestCard extends HTMLElement {
  setConfig(config: any) {
    console.log('ClickUp card setConfig called with:', config);
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
    }
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <ha-card>
          <div style="padding: 16px;">
            <h2>ClickUp Todo Card - Test Version</h2>
            <p>If you can see this, the card is loading!</p>
            <p>Entity: ${config.entity || 'Not configured'}</p>
          </div>
        </ha-card>
      `;
    }
  }

  getCardSize() {
    return 3;
  }

  static getConfigElement() {
    console.log('getConfigElement called');
    return document.createElement('clickup-todo-card-editor-test');
  }

  static getStubConfig() {
    console.log('getStubConfig called');
    return {
      type: 'custom:clickup-todo-card',
      entity: '',
    };
  }
}

// Editor
class ClickUpTestCardEditor extends HTMLElement {
  private _config: any = {};

  setConfig(config: any) {
    console.log('Editor setConfig called');
    this._config = config;
    this.render();
  }

  render() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
    }
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <div style="padding: 16px;">
          <h3>ClickUp Todo Card Configuration</h3>
          <label>
            Entity:
            <input
              type="text"
              value="${this._config.entity || ''}"
              style="width: 100%; padding: 8px; margin-top: 4px;"
              placeholder="todo.clickup_..."
            />
          </label>
          <p style="font-size: 12px; color: #666; margin-top: 8px;">
            Enter a todo entity ID from your ClickUp integration
          </p>
        </div>
      `;

      const input = this.shadowRoot.querySelector('input');
      if (input) {
        input.addEventListener('input', (e) => {
          this._config.entity = (e.target as HTMLInputElement).value;
          const event = new CustomEvent('config-changed', {
            detail: { config: this._config },
            bubbles: true,
            composed: true,
          });
          this.dispatchEvent(event);
        });
      }
    }
  }
}

customElements.define('clickup-todo-card', ClickUpTestCard);
customElements.define('clickup-todo-card-editor-test', ClickUpTestCardEditor);

console.log('Custom elements defined');
