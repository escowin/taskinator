// dom elements
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// logic  | + <li class="task-item">new task</li>; <ul><li.../></ul>
var createTaskHandler = function(event) {
  // prevents browser refresh
  event.preventDefault();

  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.textContent = "new task";
  tasksToDoEl.appendChild(listItemEl);
}

// event listener | submit <#task-form>, invoke createTaskHandler
// submit listens for either:
//    1. mouse clicks on <... type="submit">
//    2. pressing enter on keyboard
formEl.addEventListener("submit", createTaskHandler);