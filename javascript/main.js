// Array of words used in the typing game
const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "LeetCode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

// Object that maps levels of difficulty to time limits (in seconds)
const levelsTime = {
  Easy: 7,
  Medium: 5,
  Hard: 3,
};

// DOM elements required for the game
const level = document.querySelector(".level");
const second = document.querySelector(".seconds");
const startButton = document.querySelector(".start");
const word = document.querySelector(".word");
const inputWord = document.querySelector(".input");
const upComingWords = document.querySelector(".upcoming-words");
const timeLeft = document.querySelector(".time-left");
const scoreGot = document.querySelector(".got");
const scoreTotal = document.querySelector(".total");
const game = document.querySelector(".game");
const message = document.querySelector(".message");
const levelSelection = document.querySelector(".level-selection");
const levelSelect = document.getElementById("level-select");

// Prevent pasting in the input field to avoid cheating
inputWord.onpaste = () => false;

// Store levels and times in localStorage
localStorage.setItem("gameLevels", JSON.stringify(levelsTime));
const savedLevels = JSON.parse(localStorage.getItem("gameLevels"));

// Set default game level to "Easy"
let selectedLevel = "Easy";
let selectedTime = savedLevels[selectedLevel];

// Display initial level and time on the page
level.innerHTML = selectedLevel;
second.innerHTML = selectedTime;
timeLeft.innerHTML = selectedTime;
scoreTotal.innerHTML = words.length; // Total score is the number of words

// Event listener for level selection (Easy, Medium, Hard)
levelSelect.addEventListener("change", (e) => {
  selectedLevel = e.target.value; // Update selected level
  selectedTime = savedLevels[selectedLevel]; // Update time limit
  level.innerHTML = selectedLevel;
  second.innerHTML = selectedTime;
  timeLeft.innerHTML = selectedTime;
});

// Event listener to start the game when the start button is clicked
startButton.addEventListener("click", () => {
  startButton.remove(); // Remove start button from the view
  inputWord.focus(); // Focus on the input field
  upComingWords.classList.remove("hidden"); // Show upcoming words
  upComingWords.classList.add("flex");
  inputWord.classList.remove("hidden"); // Show input field
  message.classList.remove("hidden"); // Show the message
  levelSelection.classList.add("hidden"); // Hide the level selection
  generateWord(); // Generate the first word for the game
});

// Function to generate a random word from the `words` array
function generateWord() {
  const randomWord = words[Math.floor(Math.random() * words.length)];
  word.innerHTML = randomWord; // Display the randomly chosen word
  const wordIndex = words.indexOf(randomWord);
  words.splice(wordIndex, 1); // Remove the word from the list to avoid repetition

  // Display upcoming words in the game UI
  upComingWords.innerHTML = "";
  for (let i = 0; i < words.length; i++) {
    const div = document.createElement("div");
    const text = document.createTextNode(words[i]);
    div.appendChild(text);
    div.classList.add(
      "text-orange-300",
      "bg-indigo-900",
      "m-1",
      "p-2",
      "rounded-md",
      "flex"
    );
    upComingWords.appendChild(div); // Add each upcoming word to the DOM
  }

  startPlay(); // Start the gameplay
}

// Function to start the gameplay and countdown timer
function startPlay() {
  timeLeft.innerHTML = selectedTime; // Set the initial time
  let start = setInterval(() => {
    timeLeft.innerHTML--; // Decrement time every second

    if (timeLeft.innerHTML == "0") {
      // Check if time has run out
      clearInterval(start); // Stop the timer

      // Check if the player typed the correct word
      if (word.innerHTML.toLowerCase() === inputWord.value.toLowerCase()) {
        inputWord.value = ""; // Clear input field
        scoreGot.innerHTML++; // Increment the score

        if (words.length > 0) {
          // Check if there are more words left
          generateWord(); // Generate a new word
        } else {
          // Show success message when all words are completed
          Swal.fire({
            icon: "success",
            title: "Congratulations!",
            text: "You completed all words!",
            confirmButtonText: "Play Again",
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "index.html"; // Restart the game
            }
          });
        }
      } else {
        // Show error message if the word was typed incorrectly or time ran out
        Swal.fire({
          icon: "error",
          title: "Game Over",
          text: "You entered the wrong word or ran out of time!",
          confirmButtonText: "Try Again",
        }).then(() => {
          window.location.href = "index.html"; // Restart the game
        });
      }
    }
  }, 1000); // Countdown interval set to 1 second
}
