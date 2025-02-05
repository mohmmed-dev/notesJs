"use strict";
// My Important Variables
let parentOfAdd = document.querySelector(".add_nodes");
let title_input = document.querySelector(".form #title"); 
let description_input = document.querySelector(".form #description"); 
let colors_input = document.querySelectorAll(".form #colors li"); 
let add_button = document.querySelector(".form #add");
let puls_button = document.querySelector("#plus");
let order_children = document.querySelectorAll(".order > div");
let catch_note = document.querySelector(".catch");
let div_edit = document.querySelector(".buttons");
let editTime = true;
let array_notes = [];
// Add Saved Notes
if(localStorage.getItem("notes_api")) {
  array_notes = JSON.parse(localStorage.getItem("notes_api"));
  add_notes_to_html(array_notes);
};

// Start Writing
puls_button.onclick = function() {
  catch_children(catch_note.children,"flex");
  document.querySelector(".note.active").classList.remove("active");
  show_off();
};
// Change Active In li
colors_input.forEach(li => {
  li.addEventListener("click", () =>  {
    removing_active(colors_input);
    li.classList.add("active");
  });
});
// Add information to Object And Array Then To Page

// Step One Get 
add_button.onclick = function() {
  if(editTime) {
  if(title_input.value !== "" && description_input.value !== "") {
    colors_input.forEach(li => {
    if(li.classList.contains("active")) {
        add_notes_to_arr(title_input.value,description_input.value,li.id);
    };
  });
  description_input.value = "";
    title_input.value = "";
} else {
  if (title_input.value == "") {
    title.style.borderColor = "red"; 
  } else  {
    title.style.borderColor = "#fff"; 
    description_input.style.borderColor = "red"; 
  }
  };
};
};
// Stop Two Set 
function add_notes_to_arr(text,desc,status) {
  let note = {
    id:  Date.now(),
    title: text,
    description: desc,
    importance: status
  }
  array_notes.push(note);
  add_notes_to_local(array_notes);
  add_notes_to_html(array_notes);
};

// Stop Three Array to Html
function add_notes_to_html(notes) {
  order_children.forEach(element => {
    element.innerHTML = "";
    });
  notes.forEach(note => {
    let div_note = document.createElement("div");
    div_note.className = "note";
    div_note.id = note.id;
    div_note.setAttribute("data-order", note.importance);
    div_note.innerHTML = `
    <h2>${note.title}</h2>
    <p>${note.description}</p>`;
    order_children.forEach(element => {
      if(element.classList[0].slice(0,note.importance.length ) == note.importance) {
        element.append(div_note);
      };
    });
  });
  let elements_notes = document.querySelectorAll(".note");
  show_note(elements_notes);
};
// Remove Active
function removing_active(element) {
  element.forEach(ele => {
    ele.classList.remove("active");
  });
};
// Local Handle
function add_notes_to_local(arr) {
   window.localStorage.setItem("notes_api" , JSON.stringify(arr));
};

function removing_form_local(ElementId) {
  array_notes =  array_notes.filter(note => note.id != ElementId.id);
  add_notes_to_local(array_notes);
};

// Active Notes Showing
function show_note(notes) {
  notes.forEach(note => {
    note.addEventListener("click" , () => {
      catch_children(catch_note.children,"none");
      removing_active(notes);
      let cope_element = note.cloneNode(true);
      remove_and_edit(cope_element);
      note.classList.add("active");
      catch_note.appendChild(cope_element);
    });
  });
};

// Catch Children
function catch_children(catch_note_children,value) {
  console.log("me")
  for(let i = 0; i < catch_note_children.length; i++) {
    if(catch_note_children[i].className == "add_nodes") {
      catch_note_children[i].style.display = value;
    } else {
      catch_note_children[i].classList.remove("active");
      catch_note_children[i].remove();
    };
  };
};


// add Removing And Editing
function remove_and_edit(activeNote) {
  div_edit.classList.add("show")
  div_edit.addEventListener("click" , (ele) => {
    if(ele.target.classList.contains('delete')) {
      removing_form_local(activeNote);
      activeNote.remove();
        if(document.querySelector(".note.active") !== null) {
          document.querySelector(".note.active").remove();
        }
      catch_children(catch_note.children,"flex");
      show_off()
    } else if (ele.target.classList.contains('pen')) {
      catch_children(catch_note.children,"flex");
      title_input.value = activeNote.children[0].innerText;
      description_input.value = activeNote.children[1].innerText;
      add_button.value = "Save";
      removing_active(colors_input);
      show_off()
      colors_input.forEach(li => {
          if(li.id === activeNote.dataset.order) {
            li.classList.add("active")
          }
      })
      editTime = false;
      for(let i = 0; i < array_notes.length; i++) {
        add_button.addEventListener("click", () => {
          if(activeNote.id == array_notes[i].id){
            let dateEdit = document.getElementById(activeNote.id);
            dateEdit.children[0].innerText = title_input.value;
            dateEdit.children[1].innerText  = description_input.value;
            array_notes[i].title = title_input.value;
            array_notes[i].description = description_input.value;
            colors_input.forEach(li => {
              if(li.classList.contains("active")) {
                dateEdit.dataset.order  = li.id;
                array_notes[i].importance = li.id;
              }
          })
          add_notes_to_local(array_notes);
          location.reload()
          };
        });
      };
    } else if(ele.target.classList.contains('x')) {
      parentElementOfEditing.remove();
      catch_children(catch_note.children,"flex");
      show_off()
    };
  });
  removing_active_for_editing(activeNote) ;
};

function removing_active_for_editing(element) {
  let x_remove = document.createElement("div");
  x_remove.className = "X"
  x_remove.innerText = `X`;
  element.append(x_remove);
  x_remove.onclick = () => {
    element.remove()
    document.querySelector(".note.active").classList.remove("active");
    catch_children(catch_note.children,"flex");
  };
};

function show_off() {
  div_edit.classList.remove("show");
};