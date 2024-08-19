// Select the input where the text is entered
const textTask = document.querySelector('#text-task');

// Select the button for adding tasks
const addElement = document.querySelector('#add-task');

// Select the parent element for the task list
const taskList = document.querySelector('#task-list');

// Select the parent element for the completed tasks list
const completedTaskList = document.querySelector('#completed-task-list');

// Select the element for the completed tasks counter
const counterTask = document.querySelector('#counter-task');

// Function to update the completed tasks counter
const updateCounterTask = () => {
    const count = completedTaskList.children.length;
    counterTask.innerHTML = count;
};

// Function to add a new task to the normal task list
const addTask = () => {
    // Check if the input text is empty or contains only spaces
    if (textTask.value.trim() === '') {
        return;
    }

    // Create a new element to be added to the list
    const newItemList = document.createElement('li');

    // Associate the class new-item so the element doesn't have bullet points
    newItemList.classList.add('new-item');

    // Create the checkbox
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('title', 'restore task');
    checkBox.id = "style-check";

    // Add the text to the new element
    const textNode = document.createElement('span');
    textNode.textContent = textTask.value; 
    // Add a new class for the span element
    textNode.classList.add('text-task-decoration'); 

    // Add the checkbox and text to the new element
    newItemList.appendChild(checkBox);
    newItemList.appendChild(textNode);

    // Function to move tasks to the completed tasks list
    const moveTask = () => {
        textNode.classList.add('cut-text');
        completedTaskList.appendChild(newItemList);

        // Create a delete button for each element
        const removeButton = document.createElement('button');
        removeButton.id="style-remove-button";
        removeButton.setAttribute('title', 'delete task');
        newItemList.appendChild(removeButton);

        // Function to delete tasks from the completed list
        const removeItemFinished = () => {
            newItemList.remove(); // Remove the element directly
            updateCounterTask();
        };

        // Function to restore checked tasks
        const restoreItem = () => {
            textNode.classList.remove('cut-text');
            taskList.appendChild(newItemList);
            checkBox.checked = false; // Uncheck the checkbox

            // Remove the delete button if it exists
            if (removeButton) {
                removeButton.remove();
            }

            checkBox.removeEventListener('click', restoreItem);
            checkBox.addEventListener('click', moveTask);

            updateCounterTask();
        };

        checkBox.removeEventListener('click', moveTask);
        checkBox.addEventListener('click', restoreItem);
        removeButton.addEventListener('click', removeItemFinished);

        updateCounterTask();
    };

    checkBox.addEventListener('click', moveTask);
    
    // Append the newly created element to the parent ul
    taskList.appendChild(newItemList);

    // Clear the input box after adding the new element
    textTask.value = '';
};

// Add event listeners for adding tasks by clicking the button or pressing Enter
addElement.addEventListener('click', addTask);
textTask.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { 
        event.preventDefault(); 
        addTask(); 
    }
});

// Select the arrow to hide/show the completed tasks list
const arrow = document.querySelector('.arrow-line');

const hideList = () => {
    completedTaskList.classList.toggle('unhide-tasks'); 
    arrow.classList.toggle('arrow-line-up');
}

arrow.addEventListener('click', hideList);
