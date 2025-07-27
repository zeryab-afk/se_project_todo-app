import Todo from '../components/Todo.js';
import FormValidator from '../components/FormValidator.js';
import { initialTodos, validationConfig } from '../utils/constants.js';

const addTodoButton = document.querySelector('.button_action_add');
const addTodoPopup = document.querySelector('#add-todo-popup');
const addTodoForm = addTodoPopup.querySelector('.popup__form');
const addTodoCloseBtn = addTodoPopup.querySelector('.popup__close');
const todoTemplate = document.querySelector('#todo-template');
const todosList = document.querySelector('.todos__list');

const openModal = (modal) => modal.classList.add('popup_visible');
const closeModal = (modal) => modal.classList.remove('popup_visible');

// Initialize form validator
const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();

// Event Listeners
addTodoButton.addEventListener('click', () => openModal(addTodoPopup));
addTodoCloseBtn.addEventListener('click', () => closeModal(addTodoPopup));

addTodoForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  const name = formData.get('name');
  const dateInput = formData.get('date');

  const date = dateInput ? new Date(dateInput) : new Date();
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const todo = new Todo({ name, date });
  todosList.append(todo.generateElement(todoTemplate));
  
  addTodoForm.reset();
  formValidator.resetValidation();
  closeModal(addTodoPopup);
});

// Render initial todos
initialTodos.forEach(item => {
  const todo = new Todo(item);
  todosList.append(todo.generateElement(todoTemplate));
});
