var formEl = document.querySelector('#task-form');
var tasksToDoEl = document.querySelector('#tasks-to-do');

var createTaskHandler = function() { // this callback function *must* be placed before event listener
  event.preventDefault(); // stops browser's default refresh page behavior

  var listItemEl = document.createElement('li'); // new <li></li>
  listItemEl.className = 'task-item'; // <li class='task-item'></li>
  listItemEl.textContent = 'new task.'; // <li class='task-item'> new task.</li>
  tasksToDoEl.appendChild(listItemEl); // append new <li></li> to task list that's within <ul></ul>
}

// 'submit' reacts to <button type='submit> & hitting enter via keyboard
formEl.addEventListener('submit', createTaskHandler); // event listener *must* be placed after callback function
