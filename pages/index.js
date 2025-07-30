import Todo from '../components/Todo.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import TodoCounter from '../components/TodoCounter.js';
import { initialTodos, validationConfig, selectors } from '../utils/constants.js';

// Initialize Todo Counter
const todoCounter = new TodoCounter(initialTodos, selectors.counterSelector);

// Handler functions
const handleCheck = (completed) => {
  if (completed) {
    todoCounter.updateCompleted(true);
  } else {
    todoCounter.updateCompleted(false);
  }
};

const handleDelete = (completed) => {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
};

// Render function to avoid duplication
const renderTodo = (item) => {
  const todo = new Todo(item, handleCheck, handleDelete);
  const todoElement = todo.generateElement(document.querySelector('#todo-template'));
  todoSection.addItem(todoElement);
};

// Initialize Todo Section
const todoSection = new Section({
  items: initialTodos,
  renderer: renderTodo, // <<< Using the render function
  containerSelector: selectors.todoContainer
});

// Initialize Form Validator
const formValidator = new FormValidator(validationConfig, document.querySelector('#add-todo-form'));
formValidator.enableValidation();

// Initialize PopupWithForm
const addTodoPopup = new PopupWithForm(selectors.addTodoPopup, (formData) => {
  renderTodo({ // <<< Using the render function
    name: formData.name,
    date: formData.date ? new Date(formData.date) : '', // <<< Fixed date handling
    completed: false
  });
  todoCounter.updateTotal(true);
  formValidator.resetValidation(); // <<< Added form reset
});
addTodoPopup.setEventListeners();

// Event Listeners
document.querySelector('.button_action_add').addEventListener('click', () => {
  addTodoPopup.open();
});

// Render initial todos
todoSection.renderItems();
