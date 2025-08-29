const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

document.addEventListener('DOMContentLoaded', loadTasks);

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  createTaskElement(taskText);
  saveTask(taskText);

  taskInput.value = '';
}

function createTaskElement(text, completed = false) {
  const li = document.createElement('li');
  if (completed) li.classList.add('completed');

  li.textContent = text;

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    updateLocalStorage();
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '🗑️';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    li.remove();
    updateLocalStorage();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTask(task) {
  const tasks = getTasks();
  tasks.push({ text: task, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(t => createTaskElement(t.text, t.completed));
}

function updateLocalStorage() {
  const tasks = [];
  document.querySelectorAll('#task-list li').forEach(li => {
    tasks.push({
      text: li.childNodes[0].textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
