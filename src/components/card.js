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
    const cardImage = this._element.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._element.querySelector(".card__caption").textContent = this._name;
    const buttonLike = this._element.querySelector(".card__button-like");
    const buttonDelete = this._element.querySelector(".card__delete");
    this._setEventListener(buttonDelete, cardImage, buttonLike);

    return this._element;
  }

  _setEventListener(buttonDelete, cardImage, buttonLike) {
    buttonLike.addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__button-like_active");
    });

    buttonDelete.addEventListener("click", function () {
      const listItem = buttonDelete.closest(".cards__list-item");
      listItem.remove();
    });

    cardImage.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }
}
