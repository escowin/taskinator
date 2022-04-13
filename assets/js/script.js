var formEl = document.querySelector('#task-form');
var tasksToDoEl = document.querySelector('#tasks-to-do');

var taskFormHandler = function(event) { // this callback function *must* be placed before event listener
  event.preventDefault(); // stops browser's default refresh page behavior
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };

  createTaskEl(taskDataObj);
}

var createTaskEl = function(taskDataObj) {
  var listItemEl = document.createElement('li'); // create <li>
  listItemEl.className = 'task-item'; // <li class='task-item'>

  var taskInfoEl = document.createElement("div"); // create <div>
  taskInfoEl.className = "task-info"; // <div class='task-info'>
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>"; // <div><h3>...</><span>...</></div>

  listItemEl.appendChild(taskInfoEl); // <li><div>...</></li>
  tasksToDoEl.appendChild(listItemEl); // <ul><li>...</></ul>
}

// 'submit' reacts to <button type='submit> & hitting enter via keyboard
formEl.addEventListener('submit', taskFormHandler); // event listener *must* be placed after callback function
