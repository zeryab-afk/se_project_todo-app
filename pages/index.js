import Todo from '../components/Todo.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import TodoCounter from '../components/TodoCounter.js';
import { initialTodos, validationConfig, selectors } from '../utils/constants.js';

// Initialize Todo Counter
const todoCounter = new TodoCounter(initialTodos, selectors.counterSelector);

// Create counter update handler
const handleCounterUpdate = (action) => {
  switch (action) {
    case 'incrementCompleted':
      todoCounter.updateCompleted(true);
      break;
    case 'decrementCompleted':
      todoCounter.updateCompleted(false);
      break;
    case 'incrementTotal':
      todoCounter.updateTotal(true);
      break;
    case 'decrementTotal':
      todoCounter.updateTotal(false);
      break;
  }
};

// Initialize Todo Section with counter integration
const todoSection = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = new Todo(item, handleCounterUpdate); // <<< Added counter callback
    const todoElement = todo.generateElement(document.querySelector('#todo-template'));
    todoSection.addItem(todoElement);
  },
  containerSelector: selectors.todoContainer
});

// Initialize Form Validator
const formValidator = new FormValidator(validationConfig, document.querySelector('#add-todo-form'));
formValidator.enableValidation();

// Initialize PopupWithForm with counter updates
const addTodoPopup = new PopupWithForm(selectors.addTodoPopup, (formData) => {
  const todo = new Todo({
    name: formData.name,
    date: formData.date ? new Date(formData.date) : new Date(),
    completed: false
  }, handleCounterUpdate); // <<< Added counter callback
  
  const todoElement = todo.generateElement(document.querySelector('#todo-template'));
  todoSection.addItem(todoElement);
  handleCounterUpdate('incrementTotal'); // <<< Updated to use handler
});
addTodoPopup.setEventListeners();

// Event Listeners
document.querySelector('.button_action_add').addEventListener('click', () => {
  addTodoPopup.open();
});

// Render initial todos
todoSection.renderItems();
