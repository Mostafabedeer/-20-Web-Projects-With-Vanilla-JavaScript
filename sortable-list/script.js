const draggableList = document.getElementById("draggable-list");
const checkBtn = document.getElementById("check");

const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffett",
  "Bernard Arnault",
  "Carlos Slim Helu",
  "Amancio Ortega",
  "Larry Ellison",
  "Mark Zuckerberg",
  "Michael Bloomberg",
  "Larry Page",
];

//Store listItems

const listItems = [];

let dragStartIndex;

createList();

//Insert list items into DOM

function createList() {
  [...richestPeople]
    .map((p) => ({ value: p, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      console.log(person);
      const listItem = document.createElement("li");

      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `
  <span class="number">${index + 1}</span>
  <div class="draggable" draggable ="true">
  <p class="person-name">${person}</p>
  <i class="fas fa-grip-lines"></i>
  </div>
  `;
      listItems.push(listItem);
      draggableList.appendChild(listItem);
    });
  addEventListener();
}

function dragStart() {
  // console.log("event: ", "start");
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragOver(e) {
  // console.log("event: ", "over");
  e.preventDefault();
}

function dragDrop() {
  // console.log("event: ", "Drop");
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove("over");
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");
  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function dragEnter() {
  // console.log("event: ", "Enter");
  this.classList.add("over");
}

function dragLeave() {
  // console.log("event: ", "Leave");
  this.classList.remove("over");
}

function checkOrder() {
  listItems.forEach((item, index) => {
    const personName = item.querySelector(".draggable").innerText.trim();
    if (personName !== richestPeople[index]) {
      item.classList.add("wrong");
    } else {
      item.classList.remove("wrong");
      item.classList.add("right");
    }
  });
}

function addEventListener() {
  const draggables = document.querySelectorAll(".draggable");
  const draglistItmes = document.querySelectorAll(".draggable-list li");
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });
  draglistItmes.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

checkBtn.addEventListener("click", checkOrder);
