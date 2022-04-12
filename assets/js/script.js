var buttonEl = document.querySelector('#save-task');
var tasksToDoEl = document.querySelector('#tasks-to-do');

buttonEl.addEventListener('click', function() { // user click:
  var listItemEl = document.createElement('li'); // create new task item
  listItemEl.className = 'task-item'; // style new task item
  listItemEl.textContent = 'new task'; // add text
  tasksToDoEl.appendChild(listItemEl); // append element to task list
});