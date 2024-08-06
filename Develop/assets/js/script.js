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
    .addClass('card project-card draggable my-3')
    .attr('data-project-id', generateTaskId.id);
  const cardHeader = $('<div>').addId('taskTitle').text(project.taskTitle);

  const cardBody = $('<div>').addClass('taskForm');

  const cardDescription = $('<p>').addId('taskDescription').text(project.taskDescription);

  const cardDueDate = $('<p>').addId('taskDeadline').text(project.taskDeadline);

  const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('data-project-id', project.id);
  cardDeleteBtn.on('click', handleDeleteProject);

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

  // ? Return the card so it can be appended to the correct lane.
  return taskCard;
}


// Button to call functions when clicked
addTask.on('click', createTaskCard(), {
    
})

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
