export default class Todo {
  constructor(data, handleCheck, handleDelete) { // <<< Changed to separate handlers
    this.id = data.id || crypto.randomUUID();
    this.name = data.name;
    this.completed = data.completed || false;
    this.date = new Date(data.date);
    this._handleCheck = handleCheck; // <<< New handler
    this._handleDelete = handleDelete; // <<< New handler
  }

  generateElement(template) {
    const element = template.content.querySelector('.todo').cloneNode(true);
    const checkbox = element.querySelector('.todo__completed');
    const nameEl = element.querySelector('.todo__name');
    const dateEl = element.querySelector('.todo__date');
    const deleteBtn = element.querySelector('.todo__delete-btn');

    checkbox.checked = this.completed;
    checkbox.id = `todo-${this.id}`;
    element.querySelector('.todo__label').setAttribute('for', `todo-${this.id}`);
    nameEl.textContent = this.name;

    if (!isNaN(this.date)) {
      dateEl.textContent = `Due: ${this.date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })}`;
    }

    checkbox.addEventListener('change', () => {
      this.completed = checkbox.checked;
      this._handleCheck(this.completed); // <<< Using new handler
    });

    deleteBtn.addEventListener('click', () => {
      this._handleDelete(this.completed); // <<< Using new handler
      element.remove();
    });

    return element;
  }
}
