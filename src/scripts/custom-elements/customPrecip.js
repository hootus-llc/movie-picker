import { LitElement, css, html } from '../../../utilities/lit.js';

class PrecipElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: fixed;
      top: 40;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none; /* Allows interaction with elements beneath */
      z-index: 9999; /* Ensure the rain is on top of other elements */
      overflow: hidden;
    }

    .stream {
      position: absolute;
      top: 0;
      color: #fff; /* Matrix green color */
      font-size: 16px;
      white-space: nowrap;
      animation: fall linear infinite;
    }

    @keyframes fall {
      to {
        transform: translateY(100vh);
      }
    }
  `;

  render() {
    const numStreams = 200;
    return html`
      ${Array.from({ length: numStreams }, (_, index) => {
        const delay = Math.random() * 5 + 's'; // Varying delays
        const streamWidth = Math.random() * 1.5 + 0.5 + 'px'; // Varying stream widths
        const streamSpeed = Math.random() * 2 + 2 + 's'; // Varying stream speeds
        return html`
          <div class="stream" style="left: ${index * (100 / numStreams)}%; animation-delay: ${delay}; width: ${streamWidth}; animation-duration: ${streamSpeed}">
            ${this.generateRandomCharacters(1)}
          </div>
        `;
      })}
    `;
  }

  generateRandomCharacters(length) {
    const characters = '*';
    return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
  }
}


customElements.define('custom-precip', PrecipElement);
