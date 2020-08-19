export class FormValidator {
  constructor(formElement, config) {
    this._formElement = formElement;
    this._inputSelector = config.inputSelector;
    this._formSelector = config.formSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
  }

  _showInputError(input) {
    const errorElement = this._formElement.querySelector(`#${input.name}-error`);
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = input.validationMessage;

    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(input) {
    const errorElement = this._formElement.querySelector(`#${input.name}-error`);
    input.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _setEventListener() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));

    const buttonSubmit = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState(inputList, buttonSubmit);

    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState(inputList, buttonSubmit);
      });
    });
  }

  _hasInvalidInput(inputList) {
    return inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonSubmit) {
    if (this._hasInvalidInput(inputList)) {
      buttonSubmit.classList.add(this._inactiveButtonClass);
      buttonSubmit.disabled = true;
    } else {
      buttonSubmit.classList.remove(this._inactiveButtonClass);
      buttonSubmit.disabled = false;
    }
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListener();
  }
}
