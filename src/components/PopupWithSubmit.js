import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup {
  constructor({ popupSelector, formConfirmationHandler }) {
    super(popupSelector);
    this._formConfirmationHandler = formConfirmationHandler;
  }

  setEventListeners() {
    this._popupSelector.addEvetnListener("submit", () => {
      this._formConfirmationHandler();
    });
    super.setEventListeners();
  }
}
