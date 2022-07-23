// dom elements
var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// logic  | + <li class="task-item">new task</li>; <ul><li.../></ul>
var createTaskHandler = function() {
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.textContent = "new task";
  tasksToDoEl.appendChild(listItemEl);
}

// event listener | click <#save-task>, invoke createTaskHandler
buttonEl.addEventListener("click", createTaskHandler);