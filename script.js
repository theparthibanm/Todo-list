document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const clearBtn = document.getElementById('clear-btn');
  
    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Render tasks
    function renderTasks() {
      todoList.innerHTML = '';
      tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${task}</span>
          <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        todoList.appendChild(li);
      });
    }
  
    // Add task
    todoForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const taskText = todoInput.value.trim();
      if (taskText !== '') {
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        todoInput.value = '';
      }
    });
  
    // Delete task
    todoList.addEventListener('click', function(e) {
      if (e.target.classList.contains('delete-btn')) {
        const index = e.target.getAttribute('data-index');
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
      }
    });
  
    // Clear all tasks
    clearBtn.addEventListener('click', function() {
      localStorage.removeItem('tasks');
      tasks.length = 0;
      renderTasks();
    });
  
    // Initial render
    renderTasks();
  });
  