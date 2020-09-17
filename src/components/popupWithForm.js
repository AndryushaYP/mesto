import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ popupSelector, buttonSelector, formSubmitHandler }) {
    super(popupSelector);
    this._buttonSelector = buttonSelector;
    this._formSubmitHandler = formSubmitHandler;
    this._formElement = this._popupSelector.querySelector(".popup__form");
    this._inputList = this._popupSelector.querySelectorAll(".popup__input");
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonSelector.textContent = "Сохранение ...";
    } else {
      this._buttonSelector.textContent = this._buttonSelector.value;
    }
  }
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => (this._formValues[input.name] = input.value));
    return this._formValues;
  }

  setEventListeners() {
    this._popupSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      this._formSubmitHandler(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    this._formElement.reset();
    super.close();
  }
}
