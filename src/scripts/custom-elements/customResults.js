import { LitElement, html, css } from '../../../utilities/lit.js';

class CustomResults extends LitElement {
    static properties = {
        movieTitle: { type: String } // Change this to _movieTitle
    }

    static styles = css`
        .results {
            position: relative;
            display: inline-block;
            width: 70%; /* Adjust the width percentage as needed */
            max-width: 400px; /* Add a max-width for larger screens */
            padding: 10px;
            margin: 0 auto; /* Center the element */
        }
        p {
            border-radius: 10px;
            color: white;
            padding: 15px;
            font-size: 1.5rem;
            box-shadow: 0 0 5px rgba(255, 0, 0, 0.4), 0 0 10px rgba(0, 255, 0, 0.4), 0 0 15px rgba(0, 0, 255, 0.4);
            transition: box-shadow 0.5s ease-in-out;
        }
    `
    constructor() {
        super();
        this.movieTitle = null;
    }

    connectedCallback() {
        super.connectedCallback();
        // Listen for the custom event
        window.addEventListener('send-value', (event) => {
            this.movieTitle = event.detail.value
        });

        window.addEventListener('checkbox-update', (event) => {
            this.movieTitle = null;
        })
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        // Remove the event listener when the element is disconnected
        this.removeEventListener('send-value', this.handleValueReceived);
    }

    render() {
        if (this.movieTitle) {
            return html`
                <div class="results">
                    <p>${this.movieTitle}</p>    
                </div>
            `;
        }
    }
}

customElements.define('custom-results', CustomResults)
