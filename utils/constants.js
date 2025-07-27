export const initialTodos = [
  {
    id: "1",
    name: "Read the sprint's theory",
    completed: true,
    dueDate: "Nov 22, 2023"
  },
  {
    id: "2",
    name: "Read project instructions",
    completed: false,
    dueDate: "Nov 22, 2023"
  },
  {
    id: "3",
    name: "Complete project",
    completed: false,
    dueDate: "Nov 22, 2023"
  }
];

export const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible"
};