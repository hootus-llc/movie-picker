import { LitElement, html, css } from '../../../utilities/lit.js';

class CustomLights extends LitElement {
  static properties = {
    numLights: { type: Number },
  };

  static styles = css`
    .lights-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: -1;
    }
    
    .light {
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        animation: flicker 1s infinite;
    }
    
    .light.synchronize {
        animation: synchronize 5s linear infinite, flicker 1s infinite;
    }
    
    @keyframes flicker {
        0%, 100% {
        opacity: 1;
        }
        50% {
        opacity: 0.5;
        }
    }
  `;

constructor() {
    super();
    this.numLights = 100;
  }

  firstUpdated() {
    this.generateLights();
    window.addEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.generateLights();
  };

  render() {
    return html`
        <div id="lights-container">
            ${this.renderLights().map(lightHtml => lightHtml)} 
        </div>
    `;
  }
  

  renderLights() {
    return Array.from({ length: this.numLights }, (_, i) => this.createLightHtml(i));
  }

  createLightHtml(index) {
    const numLights = this.numLights;
    const delay = Math.random() * 4;
    let top, left;

    if (index < numLights / 4) {
        // Top border
        top = 0;
        left = (index / (numLights / 4)) * window.innerWidth;
    } else if (index < numLights / 2) {
        // Bottom border
        top = window.innerHeight - 12;
        left = ((index - numLights / 4) / (numLights / 4)) * window.innerWidth;
    } else if (index < (3 * numLights) / 4) {
        // Left border
        top = ((index - numLights / 2) / (numLights / 4)) * window.innerHeight;
        left = 0;
    } else {
        // Right border
        top = ((index - 3 * numLights / 4) / (numLights / 4)) * window.innerHeight;
        left = window.innerWidth - 12;
    }

    const color = this.getRandomColor();
    return html`
        <div class="light synchronize" style=${this.getLightStyles(top, left, color, delay)}></div>
    `;
  }


  getLightStyles(top, left, color, delay) {
    return `
      top: ${top}px;
      left: ${left}px;
      background-color: ${color};
      animation-delay: ${delay}s;
    `;
  }

  getRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
  }

  generateLights() {
    const lightsContainer = this.shadowRoot.getElementById('lights-container');
    lightsContainer.innerHTML = ''; // Clear existing lights

    const numLights = 60;

    // Top border
    for (let i = 0; i < numLights; i++) {
      const delay = Math.random() * 4; // Random delay up to 4 seconds
      lightsContainer.appendChild(this.createLightElement(0, (i / numLights) * window.innerWidth, this.getRandomColor(), delay));
    }

    // Bottom border
    for (let i = 0; i < numLights; i++) {
      const delay = Math.random() * 4; // Random delay up to 4 seconds
      lightsContainer.appendChild(this.createLightElement(window.innerHeight - 12, (i / numLights) * window.innerWidth, this.getRandomColor(), delay));
    }

    // Left border
    for (let i = 0; i < numLights; i++) {
      const delay = Math.random() * 4; // Random delay up to 4 seconds
      lightsContainer.appendChild(this.createLightElement((i / numLights) * window.innerHeight, 0, this.getRandomColor(), delay));
    }

    // Right border
    for (let i = 0; i < numLights; i++) {
      const delay = Math.random() * 4; // Random delay up to 4 seconds
      lightsContainer.appendChild(this.createLightElement((i / numLights) * window.innerHeight, window.innerWidth - 12, this.getRandomColor(), delay));
    }
  }

  createLightElement(top, left, color, delay) {
    const light = document.createElement('div');
    light.classList.add('light', 'synchronize');
    light.style.cssText = `
      top: ${top}px;
      left: ${left}px;
      background-color: ${color};
      animation-delay: ${delay}s;
    `;
    return light;
  }
  
}

customElements.define('custom-lights', CustomLights);
