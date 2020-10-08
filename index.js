// console.log("Js file working properly");
showNotes();
let addBtn = document.getElementById("add-btn");
// console.log(addBtn)
addBtn.addEventListener("click", function (e) {
  let valTxt = document.getElementById("addTxt");
  // console.log(valTxt)
  // console.log(valTxt.value)
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }
  noteObj.push(valTxt.value);
  localStorage.setItem("notes", JSON.stringify(noteObj));
  valTxt.value = "";
  showNotes();
});

function showNotes() {
  let notess = localStorage.getItem("notes");
  if (notess == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notess);
  }
  let html = "";
  noteObj.forEach(function (element, index) {
    html += `
        <div class="noteCard my-2 mx-2 card" style="width:18rem;">
            <div class="card-body">
                <h5 class="card-titel">${index + 1}</h5>
                <p class="card-text">${element}</p>
                <button id="${index}" onclick="deletenote(this.id)" class="btn btn-primary">Delete</button>
            </div>
        </div>       
        `;
  });
  let notesEle = document.getElementById("root");
  if (notesEle.length != 0) {
    notesEle.innerHTML = html;
  }
}

function deletenote(index) {
  console.log("deleted Note ", index);
  let availNotes = localStorage.getItem("notes");
  if (availNotes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(availNotes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  //   console.log("input fired Serching ....." + inputVal);
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardText = element.getElementsByTagName("p")[0].innerText.toLowerCase();
    if (cardText.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
    // console.log(cardText)
  });
});
