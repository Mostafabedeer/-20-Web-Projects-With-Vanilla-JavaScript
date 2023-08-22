const word = document.getElementById("word");
const text = document.getElementById("text");
const endGameEl = document.getElementById("end-game-container");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const diffcultySelect = document.getElementById("difficulty");
//--------------------------------------------------------------

// List of words for game
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "football",
  "chess",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

//Init word
let randomWord;

//Init score
let score = 0;

//Init time
let time = 10;

//Init difficulty
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";
diffcultySelect.value = difficulty;

//Focus at the text
text.focus();

//Set the timedown
const timeDown = setInterval(updateTime, 1000);

//Get random word
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

//Add word to Dom
function addToDom() {
  randomWord = getRandomWord();
  word.innerText = randomWord;
}

addToDom();

//Update the score

function updateScore() {
  score++;
  scoreEl.innerText = score;
}

//Update the time

function updateTime() {
  time--;
  timeEl.innerText = time + "s";

  if (time === 0) {
    clearInterval(timeDown);

    //end game
    gameOver();
  }
}

//End Game

function gameOver() {
  endGameEl.innerHTML = `
  <h1>Time run out</h1>
  <p>Your final score is ${score}</p>
  <button onclick='location.reload()'>Play Again!</button>
  `;
  endGameEl.style.display = "flex";
}

//Event listeners

text.addEventListener("input", (e) => {
  const insertedText = e.target.value.trim();
  if (insertedText === randomWord) {
    addToDom();
    updateScore();

    //Clear
    e.target.value = "";
    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }
    updateTime();
  }
});

settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
