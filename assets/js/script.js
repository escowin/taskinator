var taskIdCounter = 0;

// dom elements
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// logic  | gather user-input data, package data as object
var taskFormHandler = function(event) {
  event.preventDefault();

  // select <element [attribute]>, get value
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // prevent empty string submissions
  if (!taskNameInput || !taskTypeInput) {
    alert("fill out task form");
    return false;
  }

  // reset <form.../> after submission
  formEl.reset();

  // package selected data as object
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };

  // send object as argument to createTaskEl
  createTaskEl(taskDataObj);
};

// logic  | use taskDataObj{} to display <task item>
var createTaskEl = function(taskDataObj) {
  // + <li... />
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  // + <div... />, append
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info"
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  listItemEl.appendChild(taskInfoEl);

  // append | <li><#task-actions.../></li>, <ul><li... /></ul>
  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);
  tasksToDoEl.appendChild(listItemEl);

  // increase data-task-id value for each new task
  taskIdCounter++;
};

// logic  | + <div class="task-actions">...</div>
var createTaskActions = function(taskId) {
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  // + edit button  | <div><button... /></div>
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(editButtonEl);

  // + delete button  | <div><button... /></div>
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(deleteButtonEl);

  // + select dropdown | <div><select... /></div>
  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(statusSelectEl);
  
  // + option | <select><options... /></select>
  var statusChoices = ["to do", "in progress", "completed"];
  for (var i = 0; i < statusChoices.length; i++) {
    var statusOptionsEl = document.createElement("option");
    statusOptionsEl.textContent = statusChoices[i];
    statusOptionsEl.setAttribute("value", statusChoices[i]);
    statusSelectEl.appendChild(statusOptionsEl);
  }

  return actionContainerEl;
};

// event listener | submit <#task-form>, invoke createTaskHandler
// submit listens for either:
//    1. clicks on <... type="submit">
//    2. pressing enter on keyboard
formEl.addEventListener("submit", taskFormHandler);