var taskIdCounter = 0;

// dom elements
var pageContentEl = document.querySelector("#page-content");
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

// array holds tasks for saving
var tasks = [];

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

  var isEdit = formEl.hasAttribute("data-task-id");

  // has data attribute, get task id, call complete edit function.
  // no data attribute, create object as normal, pass to createTaskEl
  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  } else {
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
      status: "to do"
    };

    createTaskEl(taskDataObj);
  }
};

var completeEditTask = function(taskName, taskType, taskId) {
  // find | <li class="task-item" data-task-id="...">
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  // set | new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  // loop through tasks array & task object w/ new content
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].name = taskName;
      tasks[i].type = taskType;
    }
  };

  alert("task updated");

  // reset | remove data-task-id & text string from <form>
  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "add task";

  // invoke | push to local storage
  saveTasks();
};

// logic  | use taskDataObj{} to display <task item>
var createTaskEl = function(taskDataObj) {
  // + |  <li... />
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  // + |  <div... />, append
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info"
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  listItemEl.appendChild(taskInfoEl);

  // append | <ul><li><#task-actions.../></li></ul>
  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);
  tasksToDoEl.appendChild(listItemEl);

  // push | sync gui/dom with taskDataObj by pushing id value into object array
  taskDataObj.id = taskIdCounter;
  tasks.push(taskDataObj);

  // increase data-task-id value for each new task
  taskIdCounter++;

  // invoke | push to local storage
  saveTasks();
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
// get | <button class="..." data-task-id="">
var taskButtonHandler = function(event) {
  // get | target element from event
  var targetEl = event.target;

  // click | edit button
  if (targetEl.matches(".edit-btn")) {
    var taskId = event.target.getAttribute("data-task-id");
    editTask(taskId);
  }
  // click | delete button
  if (event.target.matches(".delete-btn")) {
    var taskId = event.target.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};

// logic | edit <li... />
var editTask = function(taskId) {
  // get | <.task-list-item... />
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  // get | <h3 class="task-name">... </h3>, <span class="task-type">... </span>
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  var taskType = taskSelected.querySelector("span.task-type").textContent;

  // logic | load task name & type values in <form>
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;
  // logic | <button id="save-task"> string changes from "add task" to "save task"
  document.querySelector("#save-task").textContent = "save task";
  // logic | <form> assigned corresponding data-task-id of selected <li.../>
  formEl.setAttribute("data-task-id", taskId);
}

// logic | delete <li... />
var deleteTask = function(taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();

  // create | new array, holds updates list of tasks
  var updatedTaskArr = [];

  // loop | current tasks. if tasks[i] doesn't match taskId value, keep & push value into new array
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id !== parseInt(taskId)) {
      updatedTaskArr.push(tasks[i]);
    }
  }

  // reassign | tasks array to be the same as updatedTaskArr
  tasks = updatedTaskArr;
  // invoke | push to local storage
  saveTasks();
};

var taskStatusChangeHandler = function(event) {
  // get | task item id
  var taskId = event.target.getAttribute("data-task-id");
  // get | current value, convert to lowercase
  var statusValue = event.target.value.toLowerCase();
  // find | parent element, <li...>
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // append | based on selected status value, <li> moves to corresponding <ul id="...">
  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }

  // update | task's in tasks array
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].status = statusValue;
    }
  }
  // invoke | push to local storage
  saveTasks();
};

// localStorage | persistent memory
// - save: send object-array value to localStorage, convert value to string.
var saveTasks = function() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// - retrieve: get string value from localStorage, convert to object-array, display on page.
var loadTasks = function() {
  var savedTasks = localStorage.getItem("tasks");
  if (!savedTasks) {
    return false;
  }
  console.log("found saved task");

  // parse | convert string into object-array, iterate through array index, pass to createTaskEl() as argument.
  savedTasks = JSON.parse(savedTasks);
  for (i = 0; i < savedTasks.length; i++) {
    createTaskEl(savedTasks[i]);
  }
};

// event listeners
formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);

loadTasks();