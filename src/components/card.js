export class Card {
  constructor({ data, handleCardClick, handleLikeClick, handleDeleteClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._myId = data._id;
    this._owner = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
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
    if(this._owner != '013c4b1d0e352de63c67d87b'){
      buttonDelete.remove();
    }
    this._setEventListener(buttonDelete, cardImage, buttonLike);

    return this._element;
  }

  remove() {
    this._element.remove();
  }

  _setEventListener(buttonDelete, cardImage, buttonLike) {
    buttonLike.addEventListener("click", function (evt) {
      this._handleLikeClick();
      evt.target.classList.toggle("card__button-like_active");
    });

    buttonDelete.addEventListener("click", () => {
      this._handleDeleteClick(this._myId);
      this.remove();
    });

    cardImage.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }
}
