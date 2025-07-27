export default class Todo {
  constructor(data, selector) {
    this._name = data.name;
    this._id = data.id;
    this._completed = data.completed;
    this._dueDate = data.dueDate;
    this._selector = selector;
  }

  _getTemplate() {
    return document
      .querySelector(this._selector)
      .content
      .querySelector('.todo-item')
      .cloneNode(true);
  }

  _setEventListeners() {
    this._element.querySelector('.todo-item__checkbox').addEventListener('change', () => {
      this._toggleCompleted();
    });
    
    this._element.querySelector('.todo-item__delete').addEventListener('click', () => {
      this._handleDelete();
    });
  }

  _toggleCompleted() {
    this._completed = !this._completed;
    this._element.dataset.completed = this._completed;
  }

  _handleDelete() {
    this._element.remove();
  }

  getView() {
    this._element = this._getTemplate();
    
    const checkbox = this._element.querySelector('.todo-item__checkbox');
    const title = this._element.querySelector('.todo-item__title');
    const dueDate = this._element.querySelector('.todo-item__due-date');
    
    checkbox.checked = this._completed;
    this._element.dataset.completed = this._completed;
    
    title.textContent = this._name;
    dueDate.textContent = this._dueDate ? `Due: ${this._dueDate}` : '';
    
    this._setEventListeners();
    
    return this._element;
  }
}