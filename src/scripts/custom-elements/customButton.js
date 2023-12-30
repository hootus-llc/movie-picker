import { LitElement, css, html } from '../../../utilities/lit.js';
import { brunchMovies } from '../../constants/brunchMovies.js'
import { christmasMovies } from '../../constants/christmasMovies.js'
let movieList;

class CustomButton extends LitElement {
  static properties = {
    isChristmas: { type: String }
  }

  static styles = css`
    .wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }

    .checkbox {
      display: flex;
      flex-direction: column;
      margin-left: 15px;
      align-items: center;
      
      label {
        color: white;
      }
    }

    button {
      background-color: #ff4d4da5;
      padding: 2vw 5vw; /* Adjust padding using vw units for responsiveness */
      font-size: 1.25rem;
      cursor: pointer;
      color: white;
      border: none;
      border-radius: 10px;
      transition: background-color 0.3s ease-in-out;
      box-shadow: 0 0 5px rgba(255, 0, 0, 0.4), 0 0 10px rgba(0, 255, 0, 0.4), 0 0 15px rgba(0, 0, 255, 0.4);
    }
    
    button:hover {
      background-color: #ff666669;
    }

    input {
      height: 25px;
      width: 25px;
    }
  `;

  constructor () {
    super();
    this.isChristmas = 'false';
  }

  render() {
    return html`
      <div class="wrapper">
        <button @click="${this.handleClick}">${this.isChristmas === 'true' ? 'Shake Santas Bag!' : 'Brunch Movies!'}</button>
        <div class="checkbox">
          <label for='check'>Holiday Vibe</label>
          <input type="checkbox" name='check' @change="${this.handleCheckboxChange}" />
        </div>
      </div>
    `;
  }

  handleClick() {
    if (this.isChristmas === 'false') {
      const generatedValue = buttonGenerator(brunchMovies).title;
  
      this.dispatchEvent(
        new CustomEvent('send-value', {
          detail: { value: buttonGenerator(brunchMovies).title },
          bubbles: true,
          composed: true,
        })
      );
    } else {
      const generatedValue = buttonGenerator(christmasMovies).title;
  
      this.dispatchEvent(
        new CustomEvent('send-value', {
          detail: { value: buttonGenerator(christmasMovies).title },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  handleCheckboxChange(event) {
    this.isChristmas = event.target.checked ? 'true' : 'false';
    this.dispatchEvent(
      new CustomEvent('checkbox-update', {
        detail: { value: this.isChristmas },
        bubbles: true,
        composed: true
      })
    )
    this.requestUpdate(); // Trigger a re-render to reflect the change
  }
}

customElements.define('custom-button', CustomButton);

const buttonGenerator = (movies) => {
    movieList = shuffle(movies)
    let movieTitle = ''
    const selectAMovie = Math.floor(Math.random() * movieList.length)
    movieList = movieList.filter(value => {
        movieTitle = movieList[selectAMovie]
        return movieTitle !== value
    })
    return { title: movieTitle, movieList }
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }