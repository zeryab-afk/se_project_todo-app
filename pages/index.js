import Todo from '../components/Todo.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import TodoCounter from '../components/TodoCounter.js';
import { initialTodos, validationConfig, selectors } from '../utils/constants.js';

// Initialize Todo Counter
const todoCounter = new TodoCounter(initialTodos, selectors.counterSelector);

// Initialize Todo Section
const todoSection = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = new Todo(item);
    const todoElement = todo.generateElement(document.querySelector('#todo-template'));
    todoSection.addItem(todoElement);
  },
  containerSelector: selectors.todoContainer
});

// Initialize Form Validator
const formValidator = new FormValidator(validationConfig, document.querySelector('#add-todo-form'));
formValidator.enableValidation();

// Initialize PopupWithForm
const addTodoPopup = new PopupWithForm(selectors.addTodoPopup, (formData) => {
  const todo = new Todo({
    name: formData.name,
    date: formData.date ? new Date(formData.date) : new Date(),
    completed: false
  });
  
  const todoElement = todo.generateElement(document.querySelector('#todo-template'));
  todoSection.addItem(todoElement);
  todoCounter.updateTotal(true);
});
addTodoPopup.setEventListeners();

// Event Listeners
document.querySelector('.button_action_add').addEventListener('click', () => {
  addTodoPopup.open();
});

// Render initial todos
todoSection.renderItems();
