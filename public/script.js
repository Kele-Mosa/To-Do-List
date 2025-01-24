document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const taskDate = document.getElementById('taskDate');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');

    // Set the minimum date for the date input
    setMinDate();

    function setMinDate() {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const dd = String(today.getDate()).padStart(2, '0');
        taskDate.setAttribute('min', `${yyyy}-${mm}-${dd}`);
    }

    // Load tasks from localStorage on page load
    loadTasks();

    // Add event listener to the Add button
    addButton.addEventListener('click', addTask);

    // Add event listener to the Enter key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Function to add a task
    function addTask() {
        const taskText = taskInput.value.trim();
        const dueDate = taskDate.value;

        // Validate task input
        if (taskText === '') {
            alert('Please enter a task');
            return;
        }

        // Validate due date input
        if (dueDate === '') {
            alert('Please select a due date');
            return;
        }

        const task = {
            text: taskText,
            date: dueDate,
            completed: false,
        };

        // Save task to localStorage
        saveTaskToLocalStorage(task);

        // Render task on the page
        renderTask(task);

        // Clear input fields
        taskInput.value = '';
        taskDate.value = '';
    }

    // Function to render a task
    function renderTask(task) {
        const listItem = document.createElement('li');

        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            listItem.classList.toggle('completed', checkbox.checked);
            task.completed = checkbox.checked;
            updateTaskInLocalStorage(task);
        });

        // Create task description
        const taskSpan = document.createElement('span');
        taskSpan.textContent = `${task.text} (Due: ${task.date})`;
        taskSpan.classList.add('task');

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(listItem);
            deleteTaskFromLocalStorage(task);
        });

        // Create edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit');
        editButton.addEventListener('click', () => {
            editTask(task, taskSpan, taskInput, taskDate);
        });

        // Append elements to the list item
        listItem.appendChild(checkbox);
        listItem.appendChild(taskSpan);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        // Mark completed tasks
        if (task.completed) {
            listItem.classList.add('completed');
        }

        // Add list item to the task list
        taskList.appendChild(listItem);
    }

    // Function to save a task to localStorage
    function saveTaskToLocalStorage(task) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to update a task in localStorage
    function updateTaskInLocalStorage(updatedTask) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskIndex = tasks.findIndex(
            (task) => task.text === updatedTask.text && task.date === updatedTask.date
        );
        if (taskIndex !== -1) {
            tasks[taskIndex] = updatedTask;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    // Function to delete a task from localStorage
    function deleteTaskFromLocalStorage(taskToDelete) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const filteredTasks = tasks.filter(
            (task) => task.text !== taskToDelete.text || task.date !== taskToDelete.date
        );
        localStorage.setItem('tasks', JSON.stringify(filteredTasks));
    }

    // Function to load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach((task) => renderTask(task));
    }

    // Function to edit a task
    function editTask(task, taskSpan, taskInput, taskDate) {
        // Prompt user for new task text and due date
        const newTaskText = prompt('Edit Task:', task.text);
        if (newTaskText === null || newTaskText.trim() === '') {
            return; // User canceled or entered an empty task
        }

        const newDueDate = prompt('Edit Due Date (YYYY-MM-DD):', task.date);
        if (newDueDate === null || newDueDate.trim() === '') {
            return; // User canceled or entered an empty due date
        }

        // Update the task object
        task.text = newTaskText.trim();
        task.date = newDueDate.trim();

        // Update the task display
        taskSpan.textContent = `${task.text} (Due: ${task.date})`;

        // Update localStorage
        updateTaskInLocalStorage(task);
    }
});
