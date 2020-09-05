import { titlePopupOpenImage, urlPopupOpenImage, popupImage } from "./constants.js";
import { modalOpen } from "./utils.js";

export class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__list-item")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__caption").textContent = this._name;
    this._element.querySelector(".card__button-like");
    const buttonDelete = this._element.querySelector(".card__delete");
    this._setEventListener(buttonDelete);

    return this._element;
  }

  _setEventListener(buttonDelete) {
    this._element.querySelector(".card__button-like").addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__button-like_active");
    });

    this._element.querySelector(".card__delete").addEventListener("click", function () {
      const listItem = buttonDelete.closest(".cards__list-item");
      listItem.remove();
    });

    this._element.querySelector(".card__image").addEventListener("click", () => {

      this._handleCardClick({name: this._name, link: this._link})
      
    });
  }
}
