var taskIdCounter = 0;
var formEl = document.querySelector('#task-form');
var tasksToDoEl = document.querySelector('#tasks-to-do');

var taskFormHandler = function(event) { // this callback function *must* be placed before event listener
  event.preventDefault(); // stops browser's default refresh page behavior
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  if (!taskNameInput || !taskTypeInput) { //if not ___ NOR not ___
    alert("fill out task form.");
    return false;
  }

  formEl.reset(); // form resets

  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };

  createTaskEl(taskDataObj);
}

var createTaskEl = function(taskDataObj) {
  var listItemEl = document.createElement('li'); // <li>
  listItemEl.className = 'task-item'; // <li class='task-item'>

  listItemEl.setAttribute("data-task-id", taskIdCounter); // <li class='task-item' data-task-id='taskIdCounter(0)'>

  var taskInfoEl = document.createElement("div"); // <div>
  taskInfoEl.className = "task-info"; // <div class='task-info'>
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>"; // <div><h3>...</><span>...</></div>
  listItemEl.appendChild(taskInfoEl); // <li><div>...</></li>

  tasksToDoEl.appendChild(listItemEl); // <ul><li>...</></ul>

  // increase task counter for next unique id
  taskIdCounter++;
};

var createTaskActions = function(taskId) {
  var actionContainerEl = document.createElement("div"); // <div>
  actionContainerEl.className = "task-actions"; // <div class='task-actions'>

  var editButtonEl = document.createElement("button"); // <button>
  editButtonEl.textContent = "edit"; // <button>edit</>
  editButtonEl.className = "btn edit-btn"; // <button class="btn edit-btn">edit</>
  editButtonEl.setAttribute("data-task-id", taskId); // <button class="btn edit-btn" data-task-id="taskId()">edit</>
  
  actionContainerEl.appendChild(editButtonEl); // <div...><button...>edit</></>

  // delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(deleteButtonEl);
  return actionContainerEl;
};
// 'submit' reacts to <button type='submit> & hitting enter via keyboard
formEl.addEventListener('submit', taskFormHandler); // event listener *must* be placed after callback function
