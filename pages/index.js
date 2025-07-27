import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { initialTodos } from '../utils/constants.js';
import Todo from '../components/Todo.js';

// DOM elements
const todoList = document.querySelector('.todo-app__list');
const addTodoButton = document.querySelector('.todo-app__add-button');
const todoForm = document.querySelector('.form');
const formPopup = document.querySelector('.popup');
const formInput = document.querySelector('.form__input');
const formDueDate = document.querySelector('.form__due-date');
const counterCompleted = document.querySelector('.todo-app__counter span:first-child');
const counterTotal = document.querySelector('.todo-app__counter span:last-child');

// Render initial todos
function renderTodos() {
  todoList.innerHTML = '';
  initialTodos.forEach(todoData => {
    const todo = new Todo(todoData, '#todo-template');
    const todoElement = todo.getView();
    todoList.append(todoElement);
  });
  updateCounter();
}

// Update counter
function updateCounter() {
  const total = document.querySelectorAll('.todo-item').length;
  const completed = document.querySelectorAll('.todo-item[data-completed="true"]').length;
  counterCompleted.textContent = completed;
  counterTotal.textContent = total;
}

// Initialize app
renderTodos();

// Add new todo
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const newTodoData = {
    id: uuidv4(),
    name: formInput.value,
    completed: false,
    dueDate: formDueDate.value ? new Date(formDueDate.value).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }) : ''
  };
  
  initialTodos.unshift(newTodoData);
  renderTodos();
  
  formInput.value = '';
  formDueDate.value = '';
  closePopup();
});

// Popup handlers
addTodoButton.addEventListener('click', openPopup);

function openPopup() {
  formPopup.classList.add('popup_opened');
}

function closePopup() {
  formPopup.classList.remove('popup_opened');
}