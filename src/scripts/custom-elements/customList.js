import { html, css, LitElement } from '../../../utilities/lit.js';
import { brunchMovies } from '../../constants/brunchMovies.js';
import { christmasMovies } from '../../constants/christmasMovies.js';
import { fetchData } from '../../services/fetchMovie.js';

class CustomList extends LitElement {
  static properties = {
    brunchMovies: { type: Array },
    christmasMovies: { type: Array },
    movies: { type: Array },
    isChristmas: { type: Boolean },
  };

  static styles = css`
    .container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding: 1rem;
        max-height: 22rem;
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
        justify-content: space-around;
        flex-direction: column;
    }

    h1 {
        margin: 0;
        font-size: 1rem;
        color: #f7f7f7;
    }

    h2 {
        margin: 0;
        font-size: 0.9rem;
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
  `;

  constructor() {
    super();
    this.isChristmas = false;
    this.getMovieData(this.isChristmas);
    this.movies = [];
  }

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener('checkbox-update', async (event) => {
      this.isChristmas = event.detail.value;
      await this.getMovieData(this.isChristmas);
      this.requestUpdate();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // Remove the event listener when the element is disconnected
    this.removeEventListener('checkbox-update');
  }

  render() {
    if (this.movies.length > 0) {

        return html`
        <div class="container">
            ${this.movies.map(
                (movie) => 
                html`
                <div class="movie-card">
                    ${movie && movie.Poster && html`<img src="${movie.Poster}" alt="${movie.Title}" />`}
                    <div class="movie-details">
                            <div class="movie-major-details">
                                <h1>${movie.Title}</h1>
                                <h1>${movie.Rated}</h1>
                            </div>
                            <div class="movie-small-details">
                                ${movie.Year && html`<h2>${movie.Year}</h2>`}
                                ${movie.Runtime && html`<h2>${movie.Runtime}</h2>`}
                            </div>
                    </div>
                </div>
                `
            )}
        </div>
        `;
    } else {
        this.getMovieData(this.isChristmas)
    }
  }

  async getMovieData(isChristmas) {
    this.movies = [];
    if(isChristmas === 'true' || isChristmas === true) {
        this.movies = await this.findData(christmasMovies);
    } else {
        this.movies = await this.findData(brunchMovies);
    }
  }

  async findData(movies) {
    let findMovies = [];
    for (let i = 0; i < movies.length; i++) {
      const movie = movies[i];
      const localMovie = JSON.parse(localStorage.getItem(movie));
      if (localMovie !== null && Object.keys(localMovie).length > 0) {
        findMovies.push(localMovie);
      } else {
        try {
            const fetchedMovie = await fetchData(movie);
            findMovies.push(fetchedMovie)
        } catch (error) {
            console.log('Something happened...', error);
            findMovies.push({ "Title": movie });
        }
      }
    }
    return findMovies;
  }
}

customElements.define('custom-list', CustomList);
