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
  "Leetcode",
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

const levels = {
  Easy: 7,
  Medium: 5,
  Hard: 3,
};

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

inputWord.onpaste = () => false;

localStorage.setItem("gameLevels", JSON.stringify(levels));
const savedLevels = JSON.parse(localStorage.getItem("gameLevels"));

let selectedLevel = "Easy";
let selectedTime = savedLevels[selectedLevel];

level.innerHTML = selectedLevel;
second.innerHTML = selectedTime;
timeLeft.innerHTML = selectedTime;
scoreTotal.innerHTML = words.length;

levelSelect.addEventListener("change", (e) => {
  selectedLevel = e.target.value;
  selectedTime = savedLevels[selectedLevel];
  level.innerHTML = selectedLevel;
  second.innerHTML = selectedTime;
  timeLeft.innerHTML = selectedTime;
});

startButton.addEventListener("click", () => {
  startButton.remove();
  inputWord.focus();
  upComingWords.classList.remove("hidden");
  upComingWords.classList.add("flex");
  inputWord.classList.remove("hidden");
  game.classList.toggle("mt-5");
  message.classList.remove("hidden");
  levelSelection.classList.add("hidden");
  generateWord();
});

function generateWord() {
  const randomWord = words[Math.floor(Math.random() * words.length)];
  word.innerHTML = randomWord;
  const wordIndex = words.indexOf(randomWord);
  words.splice(wordIndex, 1);

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
    upComingWords.appendChild(div);
  }

  startPlay();
}

function startPlay() {
  timeLeft.innerHTML = selectedTime;
  let start = setInterval(() => {
    timeLeft.innerHTML--;

    if (timeLeft.innerHTML == "0") {
      clearInterval(start);

      if (word.innerHTML.toLowerCase() === inputWord.value.toLowerCase()) {
        inputWord.value = "";
        scoreGot.innerHTML++;

        if (words.length > 0) {
          generateWord();
        } else {
          Swal.fire({
            icon: "success",
            title: "Congratulations!",
            text: "You completed all words!",
            confirmButtonText: "Play Again",
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "index.html";
            }
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Game Over",
          text: "You entered the wrong word or ran out of time!",
          confirmButtonText: "Try Again",
        }).then(() => {
          window.location.href = "index.html";
        });
      }
    }
  }, 1000);
}
