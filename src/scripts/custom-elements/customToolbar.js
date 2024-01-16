import { LitElement, html, css } from '../../../utilities/lit.js';

class MinimalToolbar extends LitElement {
  static properties = {
    buttonTitle: { type: String },
    randomGenerator: { type: HTMLElement },
    movieList: { type: HTMLElement }
  };

  constructor() {
    super();
    this.buttonTitle = 'Pick4Me';
    this.randomGenerator = document.querySelector('.random-generator');
    this.movieList = document.querySelector('.movie-list');
    this.randomGenerator.hidden = true;
  }

  static styles = css`
    :host {
      display: block;
      font-family: 'Arial', sans-serif;
    }

    .toolbar {
      background-color: #333;
      color: #fff;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    }

    .toolbar h1 {
      margin: 0;
      font-size: 1rem;
    }

    .toolbar button {
      background-color: transparent;
      text-decoration: underline;
      color: #fff;
      border: none;
      width: 5rem;
      padding: 8px 8px;
      cursor: pointer;
      font-size: 1rem;
      border-radius: 4px;
    }

  `;

  render() {
    return html`
      <div class="toolbar">
        <h1>Movies</h1>
        <div>
          <button @click=${this.handleButtonClick}>${this.buttonTitle}</button>
        </div>
      </div>
    `;
  }

  handleButtonClick() {
    if (this.randomGenerator.hidden) {
      this.randomGenerator.hidden = false;
      this.movieList.hidden = true;
      this.buttonTitle = 'Scroll';
    } else {
      this.randomGenerator.hidden = true;
      this.movieList.hidden = false;
      this.buttonTitle = 'Pick4Me';
    }
  }
}

customElements.define('custom-toolbar', MinimalToolbar);
