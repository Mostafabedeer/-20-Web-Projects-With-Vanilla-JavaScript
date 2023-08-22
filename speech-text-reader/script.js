const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const textarea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");
const textBox = document.getElementById("text-box");

const data = [
  {
    image: "img/drink.jpg",
    text: "I'm Thirsty",
  },
  {
    image: "img/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "img/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "img/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "img/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "img/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "img/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "img/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "img/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "img/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "img/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "img/grandma.jpg",
    text: "I Want To Go To Grandmas",
  },
];

data.forEach(createBox);

// Create speech boxes

function createBox(item) {
  const box = document.createElement("div");
  const { image, text } = item;
  box.classList.add("box");
  box.innerHTML = `
  <img src='${image}' alt='${text}'/>
  <p class='info'>${text}</p>
  `;

  //@todo - speak event

  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();
    //Add active effect

    box.classList.add("active");
    setTimeout(() => {
      box.classList.remove("active");
    }, 800);
  });

  main.appendChild(box);
}

//Store voices
let voices = [];
function getVoices() {
  voices = speechSynthesis.getVoices();
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.innerHTML = `
    ${voice.name} ${voice.lang}
    `;
    voicesSelect.appendChild(option);
  });
}
//Init speech synth
const message = new SpeechSynthesisUtterance();

//Set Text

function setTextMessage(text) {
  message.text = text;
}

//Set voice

function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}
//Speak Text
function speakText() {
  speechSynthesis.speak(message);
}
//Toggle text box

toggleBtn.addEventListener("click", () => {
  textBox.classList.toggle("show");
});

closeBtn.addEventListener("click", () => {
  textBox.classList.remove("show");
});
//voices changed
speechSynthesis.addEventListener("voiceschanged", getVoices);

//change voice
voicesSelect.addEventListener("change", setVoice);

//Read text
readBtn.addEventListener("click", () => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();
