var buttonEl = document.querySelector('#save-task');
var tasksToDoEl = document.querySelector('#tasks-to-do');

var createTaskHandler = function() { // this callback function *must* be placed before event listener
  var listItemEl = document.createElement('li'); // new <li></li>
  listItemEl.className = 'task-item'; // <li class='task-item'></li>
  listItemEl.textContent = 'new task.'; // <li class='task-item'> new task.</li>
  tasksToDoEl.appendChild(listItemEl); // append new <li></li> to task list <ul></ul>
}

buttonEl.addEventListener('click', createTaskHandler); // event listener *must* be placed after callback function
