import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup {
  constructor({ popupSelector, buttonSelector, formConfirmationHandler }) {
    super(popupSelector);
    this._buttonSelector = buttonSelector;
    this._formConfirmationHandler = formConfirmationHandler;
  }

  setSubmitAction(submitAction) {
    this._formConfirmationHandler = submitAction;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonSelector.textContent = "Сохранение ...";
    } else {
      this._buttonSelector.textContent = this._buttonSelector.value;
    }
  }

  setEventListeners() {
    this._popupSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      this._formConfirmationHandler();
      super.close();
    });
    
    super.setEventListeners();
  }
}
