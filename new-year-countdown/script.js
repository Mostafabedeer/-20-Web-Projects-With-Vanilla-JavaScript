const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minuts");
const seconds = document.getElementById("seconds");
const countdown = document.getElementById("countdown");
const year = document.getElementById("year");
const loading = document.getElementById("loading");

const currentYear = new Date().getFullYear();
const NewYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);
year.innerText = currentYear + 1;

//Update the countdown
function upataCountDown() {
  const currenTime = new Date();
  //It's give us the num of mileseconds
  const diff = NewYearTime - currenTime;
  const d = Math.floor(diff / 1000 / 60 / 60 / 24);
  const h = Math.floor(diff / 1000 / 60 / 60) % 24;
  const m = Math.floor(diff / 1000 / 60) % 60;
  const s = Math.floor(diff / 1000) % 60;

  //Set value into the dom
  days.innerText = d;
  hours.innerText = h < 10 ? "0" + h : h;
  minutes.innerText = m < 10 ? "0" + m : m;
  seconds.innerText = s < 10 ? "0" + s : s;
}

//Run every second
setInterval(upataCountDown, 1000);

//Run spinner in one second
setTimeout(() => {
  loading.remove();
  countdown.style.display = "flex";
}, 1000);
