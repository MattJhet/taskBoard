 // Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Grab refrences to important dom elements
const addTask = window.document.getElementsByClassName("btn-success");
// getting form id
const taskForm = $('taskForm')
// TItle in modal
const taskTitle = $('taskTitle');
// Description in modal
const taskDescription = $('taskDescription');
// Secelect deadline in modal
const taskDeadline = $('taskDeadline');

// Todo: create a function to generate a unique task id
function generateTaskId() {
    let taskId = '';
    for (let i = 0; i < num; i++) {
      taskId += getPasswordCharacter();
    }
    return taskId;
}
passwordBtnEl.on('click', function () {
    const newTaskId = taskIdGenerator(15);
    
  });
  

// Todo: create a function to create a task card
function createTaskCard() {
    const taskCard = $('<div>')
    .addClass('card task-card draggable my-3')
    .attr('data-task-id', generateTaskId.id);
  const cardHeader = $('<div>').addId('taskTitle').text(task.taskTitle);

  const cardBody = $('<div>').addClass('taskForm');

  const cardDescription = $('<p>').addId('taskDescription').text(task.taskDescription);

  const cardDueDate = $('<p>').addId('taskDeadline').text(task.taskDeadline);

  const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('data-task-id', task.id);
  cardDeleteBtn.on('click', handleDeleteTask);

    // change task color based on deadline
  if (project.taskDeadline && project.status !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(project.taskDeadline, 'DD/MM/YYYY');

    // If the task is due today, make the card yellow. If it is overdue, make it red.
    if (now.isSame(taskDueDate, 'day')) {
      taskCard.addClass('bg-warning text-white');
        } else if (now.isAfter(taskDueDate)) {
        taskCard.addClass('bg-danger text-white');
        cardDeleteBtn.addClass('border-light');
        }
    }
    cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);

  // gfReturn the card so it can be appended to the correct lane.
  return taskCard;
}


// Button to call functions when clicked
addTask.on('click', createTaskCard(), {
    
})

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const task = readTaskFromStorage();

    // ? Empty existing project cards out of the lanes
    const todoList = $('#todo-cards');
    todoList.empty();
  
    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();
  
    const doneList = $('#done-cards');
    doneList.empty();
  
    // ? Loop through projects and create project cards for each status
    for (let task of task) {
      if (task.status === 'to-do') {
        todoList.append(createTasktCard(task));
      } else if (task.status === 'in-progress') {
        inProgressList.append(createTaskCard(task));
      } else if (task.status === 'done') {
        doneList.append(createProjectCard(task));
      }
    }
  
    // Use JQuery UI to make task cards draggable
    $('.draggable').draggable({
      opacity: 0.7,
      zIndex: 100,
      // This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
      helper: function (e) {
        // Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
        const original = $(e.target).hasClass('ui-draggable')
          ? $(e.target)
          : $(e.target).closest('.ui-draggable');
        // Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
        return original.clone().css({
          width: original.outerWidth(),
        });
      },
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();

    // ? Read user input from the form
    const taskTitle = taskTitle.val().trim();
    const taskDescription = taskDescription.val(); // don't need to trim select input
    const taskDeadline = taskDeadline.val(); // yyyy-mm-dd format
  
    const newTask = {
      // ? Here we use a Web API called `crypto` to generate a random id for our project. This is a unique identifier that we can use to find the project in the array. `crypto` is a built-in module that we can use in the browser and Nodejs.    id: crypto.randomUUID(),
      name: taskTitle,
      type: taskDescription,
      dueDate: taskDeadline,
      status: 'to-do',
    };
  
    // ? Pull the projects from localStorage and push the new project to the array
    const task = readProjectsFromStorage();
    task.push(newTask);
  
    // ? Save the updated projects array to localStorage
    saveTaskToStorage(task);
  
    // ? Print project data back to the screen
    printTaskData();
  
    // ? Clear the form inputs
    taskTitle.val('');
    taskDescription.val('');
    taskDeadline.val('');
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    const taskId = $(this).attr('data-task-id');
    const task = readTaskFromStorage();
  
    // Remove project from the array. There is a method called `filter()` for this that is better suited which we will go over in a later activity. For now, we will use a `forEach()` loop to remove the project.
    task.forEach((task) => {
      if (task.id === taskId) {
        task.splice(task.indexOf(task), 1);
      }
    });
  
    // We will use our helper function to save the projects to localStorage
    saveTaskToStorage(task);
  
    // Here we use our other function to print projects back to the screen
    printTaskData();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    // ? Read projects from localStorage
    const task = readTaskFromStorage();

    // ? Get the project id from the event
    const taskId = ui.draggable[0].dataset.taskId;

    // ? Get the id of the lane that the card was dropped into
    const newStatus = event.target.id;

    for (let task of tasks) {
    // ? Find the project card by the `id` and update the project status.
    if (task.id === taskId) {
        task.status = newStatus;
    }
    }
    // ? Save the updated projects array to localStorage (overwritting the previous one) and render the new project data to the screen.
    localStorage.setItem('task', JSON.stringify(task));
    printTaskData();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
// ? Print project data to the screen on page load if there is any
    printTaskData();

    $('#taskDeadline').datepicker({
    changeMonth: true,
    changeYear: true,
    });

    // ? Make lanes droppable
    $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
    });
});
