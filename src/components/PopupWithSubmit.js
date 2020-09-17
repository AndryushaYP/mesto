import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup {
  constructor({ popupSelector, formConfirmationHandler }) {
    super(popupSelector);
    this._formConfirmationHandler = formConfirmationHandler;
  }

  setSubmitAction(submitAction) {
    this._formConfirmationHandler = submitAction;
  }

  setEventListeners() {
    this._popupSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formConfirmationHandler();
      super.close();
    });
    
    super.setEventListeners();
  }
}
