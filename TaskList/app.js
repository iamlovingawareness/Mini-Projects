// Define UI variables

const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".collection");
const filter = document.querySelector("#filter");
const clearBtn = document.querySelector(".clear-tasks");

loadEventListeners();

function loadEventListeners() {
  // Load DOM
  document.addEventListener("DOMContentLoaded", loadTasks);
  // Add task form
  form.addEventListener("submit", addTask);
  //Delete Tasks
  taskList.addEventListener("click", deleteTask);
  // Clear Tasks
  clearBtn.addEventListener("click", removeTasks);
  // Filter Tasks
  filter.addEventListener("keyup", filterTasks);
}

// Function to retrieve Local Storage Items as a List

function retrieveLocal() {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  return tasks;
}

// load Tasks from LS
function loadTasks() {
  let tasks = retrieveLocal();

  tasks.forEach(function (task) {
    createLi(task);
  });
}

function createLi(value) {
  //   Create List Item From Scratch
  let li = document.createElement("li");
  li.className = "collection-item";
  //   Create Text Node
  li.appendChild(document.createTextNode(value));
  //   Create new link element
  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  //   Add icon html
  link.innerHTML = '<i class="fad fa-times-circle"></i>';
  li.appendChild(link);

  taskList.appendChild(li);
}
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  }
  createLi(taskInput.value);
  // Store Task to LS

  storeTasktoLocalStorage(taskInput.value);

  taskInput.value = "";
  e.preventDefault();
}
// Store Tasks to Local Storage
function storeTasktoLocalStorage(value) {
  let tasks = retrieveLocal();

  tasks.push(value);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Delete Tasks

function deleteTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure ?")) {
      e.target.parentElement.parentElement.remove();
      deleteFromStorage(e.target.parentElement.parentElement);
    }
  }

  e.preventDefault();
}

function deleteFromStorage(taskItem) {
  let tasks = retrieveLocal();
  let index = tasks.indexOf(taskItem.textContent);

  if (index != -1) {
    tasks.splice(index, 1);
  }
  // Re push tasks to Local Storage

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear all Tasks

function removeTasks(e) {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  clearTasksfromLS();
}

// Clear every task from LS
function clearTasksfromLS() {
  localStorage.clear();
}

// FIlter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
