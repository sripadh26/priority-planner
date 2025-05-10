const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

window.onload = loadTasks;

addBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    createTask(taskText);
    taskInput.value = '';
    saveTasks();
  }
});

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addBtn.click();
});

function createTask(text, completed = false) {
  const li = document.createElement('li');
  li.className = 'task-item';
  if (completed) li.classList.add('completed');

  const contentDiv = document.createElement('div');
  contentDiv.className = 'task-content';

  const circle = document.createElement('span');
  circle.className = 'check-circle';
  circle.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  const spanText = document.createElement('span');
  spanText.className = 'task-text';
  spanText.textContent = text;

  contentDiv.appendChild(circle);
  contentDiv.appendChild(spanText);

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.addEventListener('click', () => {
    li.remove();
    saveTasks();
  });

  li.appendChild(contentDiv);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('.task-item').forEach((item) => {
    tasks.push({
      text: item.querySelector('.task-text').textContent,
      completed: item.classList.contains('completed'),
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const stored = localStorage.getItem('tasks');
  if (stored) {
    JSON.parse(stored).forEach(task =>
      createTask(task.text, task.completed)
    );
  }
}
