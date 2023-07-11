const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

//  possible words for the game
const words = [
  "soccer",
  "basketball",
  "pool",
  "pickleball",
  "pontiac",
  "noah",
  "garbage",
  "construction",
  "zebra",
  "giraffe",
  "boat",
  "swimming",
  "five",
  "four",
  "patrol",
  "excavator",
  "loving",
  "southwest",
  "orange",
  "purple",
  "candy",
];

// init word
let randomWord;

// init score
let score = 0;

// init time
let time = 10;

// set difficulty to value in ls or medium
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// set difficulty select value
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";
    
// focus on text on start
text.focus();

// generate random word from array
const getRandomWord = () => {
  return words[Math.floor(Math.random() * words.length)];
};

// add word to DOM
const addWordToDOM = () => {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
};

// update score
const updateScore = () => {
  score++;
  scoreEl.innerHTML = score;
};

// update time
const updateTime = () => {
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    // end game
    gameOver();
  }
};

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// game over, show end screen
const gameOver = () => {
  endgameEl.innerHTML = `
        <h1>Out of Time</h1>
        <p>Final Score: ${score}</p>
        <button onclick="location.reload()">Reload</button>
    `;

  endgameEl.style.display = "flex";
};

addWordToDOM();

// event listeners

// typing
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // clear
    e.target.value = "";

    if (difficulty === "hard") time += 2;
    if (difficulty === "medium") time += 3;
    if (difficulty === "easy") time += 5;

    updateTime();
  }
});

// settings button click
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

// settings select
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
