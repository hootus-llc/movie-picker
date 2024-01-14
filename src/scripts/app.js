import { brunchMovies } from '../constants/brunchMovies.js'
import { christmasMovies } from '../constants/christmasMovies.js'

// let movieTitle = '';
// const doc = document
// let results = doc.querySelectorAll('p')[0]
// let resultsContainer = doc.querySelectorAll('.results')[0]
// results.style.display = 'none';
// let buttonText = doc.querySelectorAll('button')[1]
// let hOne = doc.querySelector('h1');
// let hTwo = doc.querySelector('h2');
// let selectorIndex = 0;
// let isBrunchMovies = true;

// let newList;
// buttonText.innerText = 'Brunch Movies!'
// hOne.innerText = 'Gettin Crunked! Brunch Time!'
// hTwo.innerText = 'Whoop whoop!'
// newList = brunchMovies;

// const toggleTheme = () => {
//     buttonText.innerText = isBrunchMovies ? 'Brunch Movies!' : 'Shake Santa\'s Bag!'
//     hOne.innerText = isBrunchMovies ? 'Gettin Crunked! Brunch Time!' : 'Ho ho ho! Let\'s Watch a Christmas Movie!'
//     hTwo.innerText = isBrunchMovies ? 'Whoop whoop!' : 'What jolly film will it be?'
//     let precip = doc.querySelector('.raindrop') || doc.querySelector('.snowflake')
//     precip.className = isBrunchMovies ? 'raindrop' : 'snowflake'
//     isBrunchMovies = !isBrunchMovies;
//     newList = isBrunchMovies ? christmasMovies : brunchMovies;
//     results.style.display = 'none'
// }


// const buttonGenerator = () => {
//     results.style.display = 'block'
//     selectMovie = newList.length ? Math.floor(Math.random() * newList.length) : Math.floor(Math.random() * christmasMovies.length)
//     newList = shuffle(newList)
//     newList = newList.filter(value => {
//         movieTitle = newList[selectMovie]
//         return movieTitle !== value
//     })
//     movieTitle = newList.length > 0 ? movieTitle : 'Your list is empty!'
//     results.innerHTML = movieTitle
//     results.style.fontSize = '35px'
//     results.style.fontWeight = 700
//     results.style.color = 'red'
//     resultsContainer.classList.add('resultsBorder')
    
//     let buttonCounter = newList.length
//     buttonText.innerText = newList.length > 0 ? `${buttonCounter} Remaining` : newList.length === 0 ? 'No More Films' : 'Pick One'
//     if (newList.length === 0) {
//         buttonText.disabled = true
//         buttonText.style.color = 'dark gray'
//         buttonText.style.backgroundColor = 'gray'
//         buttonText.style.cursor = 'not-allowed'
//     }

// }

// function shuffle(array) {
//     let currentIndex = array.length,  randomIndex;
  
//     // While there remain elements to shuffle.
//     while (currentIndex != 0) {
  
//       // Pick a remaining element.
//       randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex--;
  
//       // And swap it with the current element.
//       [array[currentIndex], array[randomIndex]] = [
//         array[randomIndex], array[currentIndex]];
//     }
  
//     return array;
//   }

// document.addEventListener('DOMContentLoaded', function () {
//   const snowfall = document.getElementById('snowfall');

//   // Function to generate a random number between min and max
//   function getRandomNumber(min, max) {
//     return Math.random() * (max - min) + min;
//   }

//   // Function to create a snowflake
//   function createSnowflake() {
//     const snowflake = document.createElement('div');
//     snowflake.className = isBrunchMovies ? 'raindrop' : 'snowflake';
//     snowfall.appendChild(snowflake);

//     const size = getRandomNumber(1, 5);
//     const duration = getRandomNumber(6, 12);
//     const position = getRandomNumber(0, 100);

//     snowflake.style.width = `${size}px`;
//     snowflake.style.height = `${size}px`;
//     snowflake.style.left = `${position}%`;
//     snowflake.style.animationDuration = `${duration}s`;
//   }

//   // Function to generate multiple snowflakes
//   function generateSnowflakes(count) {
//     for (let i = 0; i < count; i++) {
//       createSnowflake();
//     }
//   }

//   // Generate snowflakes on page load
//   generateSnowflakes(100);

//   // Button click event handler
//   window.buttonGenerator = function () {
//     // Clear existing snowflakes
//     snowfall.innerHTML = '';
//     // Generate new random snowflakes
//     generateSnowflakes(50);
//   };

//   const lightsContainer = document.getElementById('lights-container');

//   function createLight(top, left, color, delay) {
//     const light = document.createElement('div');
//     light.className = 'light synchronize'; // Add 'synchronize' class
//     light.style.top = `${top}px`;
//     light.style.left = `${left}px`;
//     light.style.backgroundColor = color;
//     light.style.animationDelay = `${delay}s`; // Set animation delay
//     lightsContainer.appendChild(light);
//   }

//   function generateLights() {
//     const numLights = 60;

//     // Top border
//     for (let i = 0; i < numLights; i++) {
//       const delay = Math.random() * 4; // Random delay up to 4 seconds
//       createLight(0, (i / numLights) * window.innerWidth, getRandomColor(), delay);
//     }

//     // Bottom border
//     for (let i = 0; i < numLights; i++) {
//       const delay = Math.random() * 4; // Random delay up to 4 seconds
//       createLight(window.innerHeight - 12, (i / numLights) * window.innerWidth, getRandomColor(), delay);
//     }

//     // Left border
//     for (let i = 0; i < numLights; i++) {
//       const delay = Math.random() * 4; // Random delay up to 4 seconds
//       createLight((i / numLights) * window.innerHeight, 0, getRandomColor(), delay);
//     }

//     // Right border
//     for (let i = 0; i < numLights; i++) {
//       const delay = Math.random() * 4; // Random delay up to 4 seconds
//       createLight((i / numLights) * window.innerHeight, window.innerWidth - 12, getRandomColor(), delay);
//     }
//   }

//   // Initial lights generation
//   generateLights();

//   // Update lights on window resize
//   window.addEventListener('resize', function () {
//     // Remove existing lights
//     lightsContainer.innerHTML = '';

//     // Regenerate lights
//     generateLights();
//   });
// });

// function getRandomColor() {
//   const red = Math.floor(Math.random() * 256);
//   const green = Math.floor(Math.random() * 256);
//   const blue = Math.floor(Math.random() * 256);
//   return `rgb(${red}, ${green}, ${blue})`;
// }