const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

getRandomUser();
getRandomUser();
getRandomUser();
let data = [];

// Fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}
//Add new user to data
function addData(newUserObj) {
  data.push(newUserObj);
  updateDom();
}

//Update Dom
function updateDom(providedData = data) {
  //Clear the main
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

//Double money !!!

function doubleMoney() {
  data = data.map((item) => {
    return { ...item, money: item.money * 2 };
  });

  updateDom();
}

//Sort from the highest
function sortHighest() {
  data = data.sort((a, b) => b.money - a.money);

  updateDom();
}

function showMillionaires() {
  data = data.filter((item) => item.money > 1000000);
  updateDom();
}

// Calculate the whole money!!!!

function calculateWealth() {
  money = data.reduce((prenum, curnum) => prenum + curnum.money, 0);
  const element = document.createElement("div");
  element.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    money
  )}</strong></h3>`;
  main.appendChild(element);
}

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//Events lisenters

addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortHighest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);
