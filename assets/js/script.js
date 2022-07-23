// dom elements
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// logic  | + tasks to document
var createTaskHandler = function(event) {
  event.preventDefault();

  // select <element [attribute]>, get value
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;
  
  // + <li class"task-item"></li>
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  // + <div class="task-info"><h3>...</h3></div>
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info"
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";

  // append <ul><li><div... /></li></ul>
  listItemEl.appendChild(taskInfoEl);
  tasksToDoEl.appendChild(listItemEl);

  console.dir(listItemEl);
}

// event listener | submit <#task-form>, invoke createTaskHandler
// submit listens for either:
//    1. clicks on <... type="submit">
//    2. pressing enter on keyboard
formEl.addEventListener("submit", createTaskHandler);