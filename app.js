const myButton = document.querySelector(".x-button");
const myButton1 = document.querySelector(".x-button1");
const element = document.querySelector(".buttonMain");
const input = document.querySelector("input");
const arrow = document.querySelector(".arrow-button");
const arrow1 = document.querySelector(".arrow-button1");
const myList = document.querySelector(".myList");

// Arrow button
arrow.addEventListener("click", () => {
  arrow1.style.display = "block";
  arrow.style.display = "none";
  sortListDir();
});
arrow1.addEventListener("click", () => {
  arrow1.style.display = "none";
  arrow.style.display = "block";
  sortListDir();
});
arrow.addEventListener("mouseover", (e) => {
  e.target.style.backgroundImage = 'url("img/blackReverseIcon.svg")';
  e.target.style.backgroundRepeat = "no-repeat";
  e.target.style.backgroundSize = "cover";
});
arrow.addEventListener("mouseout", (e) => {
  e.target.style.backgroundImage = 'url("img/grayReverseIcon.svg")';
});
arrow1.addEventListener("mouseover", (e) => {
  e.target.style.backgroundImage = 'url("img/blackReverseIcon1.svg")';
  e.target.style.backgroundRepeat = "no-repeat";
  e.target.style.backgroundSize = "cover";
});
arrow1.addEventListener("mouseout", (e) => {
  e.target.style.backgroundImage = 'url("img/grayReverseIcon1.svg")';
});

// Function of removed list item
function deleteX() {
  const btn = document.querySelectorAll(".x-button1");
  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", () => {
      btn[i].parentElement.remove();
      let ul = document.getElementById("myDIV");
      if (ul.childElementCount == 0) {
        myList.style.display = "none";
        input.style.display = "block";
        myButton.style.display = "block";
        myButton.style.marginTop = "2vw";
        input.style.marginTop = "1vw";
        input.style.borderTop = "0.087vw solid #C4C4C4";
        input.style.borderTopLeftRadius = "0.6vw";
        input.style.borderTopRightRadius = "0.6vw";
      }
    });
  }
}

// Function of sort
function sortListDir() {
  var list,
    i,
    switching,
    b,
    shouldSwitch,
    dir,
    switchcount = 0;
  list = document.getElementById("myDIV");
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    b = list.getElementsByTagName("LI");
    for (i = 0; i < b.length - 1; i++) {
      shouldSwitch = false;
      if (dir == "asc") {
        if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (b[i].innerHTML.toLowerCase() < b[i + 1].innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;

      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

// Execute code by pressing Enter
document.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    if (
      input.value == "" ||
      input.value == " " ||
      input.value == "  " ||
      input.value == "   "
    ) {
      alert("Sahəni doldurun");
    } else {
      li = document.createElement("li");
      let btnn = document.createElement("button");
      btnn.classList.add("x-button1");
      li.innerHTML = input.value;
      li.classList.add("draggable");
      var attr = document.createAttribute("draggable");
      attr.value = "true";
      li.setAttributeNode(attr);
      addEventsDragAndDrop(li);
      addEventsDragAndDrop(btnn);
      li.append(btnn);
      document.querySelector("ul").append(li);
      add1.style.display = "block";
      add.style.display = "none";
      y.style.display = "block";
      input.value = "";
      myList.style.display = "block";
      input.style.display = "none";
      myButton.style.display = "none";
      input.style.borderTop = "block";
      input.style.borderTopLeftRadius = "0";
      input.style.borderTopRightRadius = "0";
      input.style.marginTop = "-0.5vw";
      myList.style.borderBottom = "block";
      myList.scrollTop = myList.scrollHeight;
    }
  }
  deleteX();
});

// ADD button
let add = document.querySelector(".buttonMain");
let add1 = document.querySelector(".buttonMain1");
let y = document.getElementById("myDIV");

add.addEventListener("click", () => {
  input.style.borderTop = "0.087vw solid #C4C4C4";
  myButton.style.marginTop = "2.75vw";
});

add1.addEventListener("click", () => {
  if (y.childElementCount > 0) {
    input.style.display = "block";
    myButton.style.display = "block";
    input.style.borderTop = "none";
    myButton.style.marginTop = "0.434vw";
  } else {
    input.style.display = "block";
    myButton.style.display = "block";
    input.style.border = "1px solid #c4c4c4";
  }
});

// Function of Drag and Drop
let remove = document.querySelector(".draggable");

function dragStart(e) {
  this.style.opacity = "0.4";
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", this.innerHTML);
  deleteX();
}

function dragEnter(e) {
  this.classList.add("over");
  deleteX();
}

function dragLeave(e) {
  e.stopPropagation();
  this.classList.remove("over");
  deleteX();
}

function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  return false;
  deleteX();
}

function dragDrop(e) {
  if (dragSrcEl != this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData("text/html");
  }
  return false;
  deleteX();
}

function dragEnd(e) {
  var listItens = document.querySelectorAll(".draggable");
  [].forEach.call(listItens, function (item) {
    item.classList.remove("over");
  });
  this.style.opacity = "1";
  deleteX();
}

function addEventsDragAndDrop(el) {
  el.addEventListener("dragstart", dragStart, false);
  el.addEventListener("dragenter", dragEnter, false);
  el.addEventListener("dragover", dragOver, false);
  el.addEventListener("dragleave", dragLeave, false);
  el.addEventListener("drop", dragDrop, false);
  el.addEventListener("dragend", dragEnd, false);
}

var listItens = document.querySelectorAll(".draggable");
[].forEach.call(listItens, function (item) {
  addEventsDragAndDrop(item);
});

myButton.addEventListener("click", () => {
  document.getElementById("myInput").value = "";
});
