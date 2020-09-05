import { Popup } from "./popup.js";

export class PopupWithForm extends Popup {
  constructor({popupSelector, formSubmitHandler}) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  setEventListeners() {
    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitHandler(this._getInputValues());

      this.close();
    })
    super.setEventListeners();
  }

  close() {
    this._popupSelector.querySelector('.popup__form').reset();
    /*this._popupSelector.querySelector(".popup__button").disabled = true;
    this._popupSelector.querySelector(".popup__button").classList.add("popup__button_disabled");*/
    super.close();
  }
}
