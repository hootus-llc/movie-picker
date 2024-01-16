import { LitElement, html, css } from '../../../utilities/lit.js';

class CustomHeader extends LitElement {
  static properties = {
    isChristmas: { type: String },
  };

  static styles = css`
    h1 {
      margin: 16px;
      color: #f7f7f7;
      font-size: 2rem;
      text-align: center;
    }

    .header {
        margin: 8px;
    }

    .checkbox {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 8px;

      label {
        margin-right: 16px;
        font-size: 1rem;
        color: #f7f7f7;
      }

      input {
        height: 22px;
        width: 22px;
      }
    }
  `;

  constructor() {
    super();
    this.isChristmas = 'false';
  }

  render() {
    return html`
    <div class="header">
        <h1>
            ${this.isChristmas === 'true'
          ? 'What shall the elves watch?'
          : 'Brunch time! What to watch?'}
        </h1>
    </div>
      <div class="checkbox">
        <label for="check" style="color: #f7f7f7;">Christmas Vibe</label>
        <input type="checkbox" name="check" @change="${this.handleCheckboxChange}" />
      </div>
    `;
  }

  handleCheckboxChange(event) {
    this.isChristmas = event.target.checked ? 'true' : 'false';
    this.dispatchEvent(
      new CustomEvent('checkbox-update', {
        detail: { value: this.isChristmas },
        bubbles: true,
        composed: true,
      })
    );
    this.requestUpdate(); // Trigger a re-render to reflect the change
  }
}

customElements.define('custom-header', CustomHeader);
