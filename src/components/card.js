export class Card {
  constructor(
    { data, handleCardClick, handleLikeClick, handleLikeRemove, handleDeleteClick },
    cardSelector
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._likesCount = data.likes.length;
    this._myId = data._id;
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
    /*this.renderCount(this._likes);*/
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
    this.renderBtn(this.isLiked);
    this._element.querySelector(".like__counter").textContent = this.likeCounts.length;
    /*this.changeCount(this.likeCounts, this.isLiked);*/
    return this.isLiked;
  }

  likeProof(isLiked) {
    if (!isLiked) {
      this._handleLikeClick(this._myId);
    } else {
      this._handleLikeRemove(this._myId);
    }
  }
  /*renderCount(likeEl) {
    const likeCount = this._element.querySelector(".like__counter");
    likeCount.textContent = likeEl.length;
  }*/

  /*changeCount(arrLength, isLiked) {
    
    if (!isLiked) {
      this._element.querySelector(".like__counter").textContent = arrLength.length;
    } else {
      this._element.querySelector(".like__counter").textContent = arrLength.length;
    }
  }*/

  renderBtn(isLiked) {
    if (isLiked) {
      this._element.querySelector(".card__button-like").classList.add("card__button-like_active");
    } else {
      this._element
        .querySelector(".card__button-like")
        .classList.remove("card__button-like_active");
    }
  }

  /*isLiked(item){
    if(item) {
      this._element.querySelector(".card__button-like").addEventListener('click', () => {
        this._element.querySelector(".card__button-like").classList.remove("card__button-like_active");
      this._element.querySelector('.like__counter').textContent = this._likes.length - 1;
      this._handleLikeRemove(this._myId);
      })
      
    } else {
      this._element.querySelector(".card__button-like").addEventListener('click', () => {
        this._element.querySelector(".card__button-like").classList.add("card__button-like_active");
      this._element.querySelector('.like__counter').textContent = this._likes.length + 1;
      this._handleLikeClick(this._myId);
      })
      
    }
  }*/

  remove() {
    this._element.remove();
  }

  _setEventListener(buttonDelete, cardImage, buttonLike) {
    buttonLike.addEventListener("click", () => {
      this.likeProof(this.isLiked);
      console.log(this.isLiked);
    });

    buttonDelete.addEventListener("click", () => {
      this._handleDeleteClick(this._myId);
    });

    cardImage.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }
}
