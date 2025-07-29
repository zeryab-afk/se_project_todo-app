export default class Todo {
  constructor(data, handleCounterUpdate) { // <<< Added callback parameter
    this.id = data.id || crypto.randomUUID();
    this.name = data.name;
    this.completed = data.completed || false;
    this.date = new Date(data.date);
    this._handleCounterUpdate = handleCounterUpdate; // <<< Store callback
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
      const wasCompleted = this.completed;
      this.completed = checkbox.checked;
      
      // <<< Added counter updates for checkbox changes
      if (this.completed && !wasCompleted) {
        this._handleCounterUpdate('incrementCompleted');
      } else if (!this.completed && wasCompleted) {
        this._handleCounterUpdate('decrementCompleted');
      }
    });

    deleteBtn.addEventListener('click', () => {
      // <<< Added counter updates for deletion
      if (this.completed) {
        this._handleCounterUpdate('decrementCompleted');
      }
      this._handleCounterUpdate('decrementTotal');
      element.remove();
    });

    return element;
  }
}
