export class Card {
  constructor(
    { data, handleCardClick, handleLikeClick, handleLikeRemove, handleDeleteClick },
    cardSelector
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._owner = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleLikeRemove = handleLikeRemove;
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
    if (this._owner != "013c4b1d0e352de63c67d87b") {
      buttonDelete.remove();
    }
    this._setEventListener(buttonDelete, cardImage, buttonLike);
    return this._element;
  }

  updateLike(data) {
    this.likeCounts = data.likes;
    this.isLiked = data.likes.some((elId) => elId._id === "013c4b1d0e352de63c67d87b");
    this._renderBtn(this.isLiked);
    this._element.querySelector(".like__counter").textContent = this.likeCounts.length;
    return this.isLiked;
  }

  _likeCheck(isLiked) {
    if (!isLiked) {
      this._handleLikeClick(this._cardId);
    } else {
      this._handleLikeRemove(this._cardId);
    }
  }

  _renderBtn(isLiked) {
    if (isLiked) {
      this._element.querySelector(".card__button-like").classList.add("card__button-like_active");
    } else {
      this._element
        .querySelector(".card__button-like")
        .classList.remove("card__button-like_active");
    }
  }

  remove() {
    this._element.remove();
  }

  _setEventListener(buttonDelete, cardImage, buttonLike) {
    buttonLike.addEventListener("click", () => {
      this._likeCheck(this.isLiked);
    });

    buttonDelete.addEventListener("click", () => {
      this._handleDeleteClick(this._cardId);
    });

    cardImage.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }
}
