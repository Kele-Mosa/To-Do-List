// const { response } = require("express");
// const { createDiffieHellmanGroup } = require("node:crypto");
// const { todo } = require("node:test");

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const taskDate = document.getElementById('taskDate');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');
    

    addButton.addEventListener('click', addTask);
    
    
    taskInput.addEventListener('keypress',(event) => {
        const taskText = taskInput.value.trim();
        if (event.key === 'Enter') {
            addTask();
        }
    });

       function addTask(){
        const taskText = taskInput.value.trim();
        const dueDate = taskDate.value;
       

        if (taskText === ''){
            alert('Please enetr a task')
            return
        }

        if(dueDate === '') {
            alert('Please selecte a due date');
            return;
        }

        const listItem = documentcreateElement('li');

        // Create checkbox
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', () =>{
            listItem.classList.toggle('completed', checkbox.checked);

        });

        const taskSpan = document.createElement('span');
        taskSpan.textContent = `${taskText} (Due: ${dueDate})`;
        taskSpan.classList.add('task');

// Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', () => {
        taskList.removeChild(listItem);
    });

// Append elements to list item
listItem.appendChild(checkbox);
listItem.appendChild(taskSpan);
listItem.appendChild(deleteButton);

// Add list item to task list
taskList.appendChild(listItem);

// Clear input field
taskInput.value = '';
    taskDate.value = '';
       }
});

