export default class Todo {
  constructor(data) {  // Removed selector parameter as it's not needed
    this.id = data.id || crypto.randomUUID();  // Changed to regular id and added UUID generation
    this.name = data.name;
    this.completed = data.completed || false;
    this.date = new Date(data.date);  // Changed dueDate to date to match your index.js
  }

  generateElement(template) {  // Renamed from getView to match your index.js calls
    const element = template.content.querySelector('.todo').cloneNode(true);  // Changed selector to match your HTML
    const checkbox = element.querySelector('.todo__completed');  // Updated selectors to match your HTML
    const nameEl = element.querySelector('.todo__name');
    const dateEl = element.querySelector('.todo__date');
    const deleteBtn = element.querySelector('.todo__delete-btn');

    // Set element properties
    checkbox.checked = this.completed;
    checkbox.id = `todo-${this.id}`;
    element.querySelector('.todo__label').setAttribute('for', `todo-${this.id}`);
    nameEl.textContent = this.name;

    // Format and display date
    if (!isNaN(this.date)) {
      dateEl.textContent = `Due: ${this.date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })}`;
    }

    // Add event listeners
    checkbox.addEventListener('change', () => {
      this.completed = checkbox.checked;
    });

    deleteBtn.addEventListener('click', () => {
      element.remove();
    });

    return element;
  }
}
