document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');

    function renderTasks() {
        taskList.innerHTML = '';
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${task}</span>
                <button class="editButton">Edit</button>
                <button class="deleteButton">Delete</button>
            `;
            taskList.appendChild(listItem);
        });
    }

    renderTasks();

    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function addTask() {
        const newTask = taskInput.value.trim();
        if (newTask !== '') {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.push(newTask);
            saveTasks(tasks);
            taskInput.value = '';
        }
    }

    function editTask(index) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const editedTask = prompt('Edit task:', tasks[index]);
        if (editedTask !== null) {
            tasks[index] = editedTask;
            saveTasks(tasks);
        }
    }

    function deleteTask(index) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.splice(index, 1);
        saveTasks(tasks);
    }

    taskList.addEventListener('click', (event) => {
        if (event.target.classList.contains('editButton')) {
            const listItem = event.target.closest('li');
            const index = Array.from(listItem.parentElement.children).indexOf(listItem);
            editTask(index);
        } else if (event.target.classList.contains('deleteButton')) {
            const listItem = event.target.closest('li');
            const index = Array.from(listItem.parentElement.children).indexOf(listItem);
            deleteTask(index);
        }
    });

    addTaskButton.addEventListener('click', addTask);
});

