import { LitElement, html, css } from '../../../utilities/lit.js';

class CustomResults extends LitElement {
    static properties = {
        movieTitle: { type: String },
        movie: { type: Object }
    }

    static styles = css`
        .container {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            max-height: 20rem;
            overflow-y: auto;
            scrollbar-width: thin; /* For Firefox */
            scrollbar-color: transparent transparent; /* For Firefox */
        }

        .container::-webkit-scrollbar {
            width: 0.5em;
        }

        .container::-webkit-scrollbar-thumb {
            background-color: transparent;
        }

        .container::-webkit-scrollbar-thumb:hover {
            background-color: #ccc;
        }
        .movie-card {
            width: calc(33.33% - 1rem);
            margin: 0.5rem;
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s ease-in-out;
        }

        .movie-card:hover {
            transform: scale(1.05);
        }

        img {
            width: 100%;
            height: auto;
        }

        .movie-details {
            padding: 1rem; /* Reduce padding */
            align-content: center;
            justify-content: space-between;
            display: flex;
        }

        .movie-major-details {
            display: flex;
            align-items: flex-start;
            flex-direction: column;

            h1 {
                margin: 4px;
            }
        }

        .movie-small-details {
            display: flex;
            align-items: flex-end;
            flex-direction: column;
            justify-content: space-around;
        }

        h1 {
            font-size: 0.8rem; /* Reduce font size */
            color: #f7f7f7;
        }

        h2 {
            margin: 0;
            font-size: 0.7rem; /* Reduce font size */
            color: #f7f7f7;
        }
        @media (max-width: 768px) {
           .movie-card {
                width: calc(50% - 1rem);
            }
        }

        @media (max-width: 480px) {
            .movie-card {
                width: 100%;
            }
        }
    `
    constructor() {
        super();
        this.movieTitle = null;
        this.movie = null;
    }

    connectedCallback() {
        super.connectedCallback();
        // Listen for the custom event
        window.addEventListener('send-value', (event) => {
            this.movieTitle = event.detail.value;
            this.movie = JSON.parse(localStorage.getItem(this.movieTitle))
        });

        window.addEventListener('checkbox-update', (event) => {
            this.movieTitle = null;
            this.movie = null;
        })
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        // Remove the event listener when the element is disconnected
        this.removeEventListener('send-value');
        this.removeEventListener('checkbox-update');
    }

    render() {
        if (this.movie) {
            return html`
            <div class="container">
                <div class="movie-card">
                    ${this.movie && this.movie.Poster && html`<img src="${this.movie.Poster}" alt="${this.movie.Title}" />`}
                    <div class="movie-details">
                        <div class="movie-major-details">
                            <h1>${this.movie.Title}</h1>
                            <h1>${this.movie.Rated}</h1>
                        </div>
                        <div class="movie-small-details">
                            ${this.movie.Year && html`<h2>${this.movie.Year}</h2>`}
                            ${this.movie.Runtime && html`<h2>${this.movie.Runtime}</h2>`}
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
    }
}

customElements.define('custom-results', CustomResults)
