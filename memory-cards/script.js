const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const addContainer = document.getElementById("add-container");

// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Store card data
const cardsData = getCardsData();
// const cardsData = [
//   {
//     question: "What must a variable begin with?",
//     answer: "A letter, $ or _",
//   },
//   {
//     question: "What is a variable?",
//     answer: "Container for a piece of data",
//   },
//   {
//     question: "Example of Case Sensitive Variable",
//     answer: "thisIsAVariable",
//   },
// ];

//Create all Cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

//Create card to dom

function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");
  if (index === 0) {
    card.classList.add("active");
  }
  card.innerHTML = `
  <div class="inner-card">
          <div class="inner-card-front">
            <p>${data.question}</p>
          </div>
          <div class="inner-card-back">
            <p>${data.answer}</p>
          </div>
        </div>
  `;

  //toggle with answer and question
  card.addEventListener("click", () => {
    card.classList.toggle("show-answer");
  });
  //add to dom cards
  cardsEl.push(card);
  cardsContainer.appendChild(card);

  //update the current text
  updateCurrentText();
}
function updateCurrentText() {
  currentEl.innerText = `
  ${currentActiveCard + 1}/${cardsEl.length}
  `;
}

//get cards from loca storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}
//set card to local storage
function setCardsData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
}

createCards();

//Event listeners

//show add container
showBtn.addEventListener("click", () => {
  addContainer.classList.add("show");
});

//Hide add container
hideBtn.addEventListener("click", () => {
  addContainer.classList.remove("show");
});

//Next button
nextBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card left";
  currentActiveCard += 1;
  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }
  cardsEl[currentActiveCard].className = "card active";
  updateCurrentText();
});
//prev button
prevBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card right";
  currentActiveCard -= 1;
  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }
  cardsEl[currentActiveCard].className = "card active";
  updateCurrentText();
});

//Add new card

addCardBtn.addEventListener("click", () => {
  const question = questionEl.value;
  const answer = answerEl.value;
  console.log(question, answer);
  if (question.trim() && answer.trim()) {
    const card = { question, answer };
    cardsData.push(card);
    setCardsData(cardsData);
    addContainer.classList.remove("show");
    questionEl.value = "";
    answerEl.value = "";
  } else {
    alert("please enter question and answer .. ");
  }
});

//Clear Cards

clearBtn.addEventListener("click", () => {
  localStorage.clear();
  cardsContainer.innerHTML = "";
  window.location.reload();
});
