import { LitElement, html, css } from '../../../utilities/lit.js'

class CustomHeader extends LitElement {
    static properties = {
        isChristmas: { type: String }
    }

    static styles = css`
        h1 {
            margin: 5px;
            color: #fff;
            font-size: 3rem;
        }
    `

    constructor () {
        super();
        this.isChristmas = 'false'
    }

    connectedCallback() {
        super.connectedCallback();
        // Listen for the custom event
        window.addEventListener('checkbox-update', (event) => {
            this.isChristmas = event.detail.value
        });
    }

    render() {
        return html`
            <h1>${this.isChristmas === 'true' ? 'Ho Ho Ho! What shall the elves watch?' : 'Brunch time! What to watch?'}</h1>
        `;
    }
}

customElements.define('custom-header', CustomHeader);