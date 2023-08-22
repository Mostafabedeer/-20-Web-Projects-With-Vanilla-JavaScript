const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// const dummyTransactions = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 2, text: "Salary", amount: 300 },
//   { id: 3, text: "Book", amount: -10 },
//   { id: 4, text: "Camera", amount: 150 },
// ];
const localStorageTarnsactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTarnsactions : [];

//create transaction

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(transaction);
    addTransactionsDom(transaction);
    updateValues();
    setToLocal();
    text.value = "";
    amount.value = "";
  }
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}
//add transaction to dom list
function addTransactionsDom(transaction) {
  //Get sign
  const sign = transaction.amount < 0 ? "-" : "+";
  const el = document.createElement("li");
  //Add class based on value
  el.classList.add(transaction.amount < 0 ? "minus" : "plus");
  el.innerHTML = `
  ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> 
  <button class="delete-btn" onclick='removeTransaction(${
    transaction.id
  })'>x</button>
  `;
  list.appendChild(el);
}

//Update balance , income and expense
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts
    .reduce((curVal, amountVal) => (curVal += amountVal), 0)
    .toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((curVal, itemVal) => (curVal += itemVal), 0)
    .toFixed(2);
  const expense = (
    amounts
      .filter((item) => item < 0)
      .reduce((curVal, itemVal) => (curVal += itemVal), 0) * -1
  ).toFixed(2);
  balance.innerText = `${total}`;
  money_minus.innerText = `$${expense}`;
  money_plus.innerText = `$${income}`;
}
//remove the transaction by id
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  setToLocal();
  init();
}

//Set transacitons to local sotrage
function setToLocal() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}
//init app
function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionsDom);
  updateValues();
}

init();

form.addEventListener("submit", addTransaction);
