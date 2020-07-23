const mainPopup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_open-image');

const buttonEdit = document.querySelector('.profile__button_edit');
const buttonAdd = document.querySelector('.profile__button_add');
const buttonCloseFormAdd = popupAdd.querySelector('.popup__button-close');
const buttonCloseFormEdit = popupEdit.querySelector('.popup__button-close');
const buttonClose = popupImage.querySelector('.popup__button-close');

const nameInput = document.querySelector('.popup__info_name');
const professionInput = document.querySelector('.popup__info_profession');
const titleInput = popupAdd.querySelector('.popup__info_title');
const linkInput = popupAdd.querySelector('.popup__info_link');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const titlePopupOpenImage = popupImage.querySelector('.popup__caption');
const urlPopupOpenImage = popupImage.querySelector('.popup__image');

const cardList = document.querySelector('.cards__list');

function toggleModal (popup) {

    popup.classList.toggle('popup_opened');

}

buttonEdit.addEventListener('click', () => toggleModal(popupEdit));

buttonAdd.addEventListener('click', function () {

    titleInput.value = '';
    linkInput.value = '';
    toggleModal (popupAdd);

});

buttonCloseFormAdd.addEventListener('click', () => toggleModal(popupAdd));
buttonCloseFormEdit.addEventListener('click', () => toggleModal(popupEdit));
buttonClose.addEventListener('click', () => toggleModal(popupImage));

function formSubmitHandler (evt) {

    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = professionInput.value;
    toggleModal(popupEdit);

}

popupEdit.addEventListener('submit', formSubmitHandler);

function createCard () {

    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__caption');
    const buttonLike = cardElement.querySelector('.card__button-like');
    const buttonDelete = cardElement.querySelector('.card__delete');

    cardImage.src = linkInput.value;
    cardTitle.textContent = titleInput.value;

    buttonLike.addEventListener('click', likeCard);

    buttonDelete.addEventListener('click', function(){
        const listItem = buttonDelete.closest('.cards__list-item');
        listItem.remove();
    });
    
    cardImage.addEventListener('click', function() {
        toggleModal(popupImage);
        titlePopupOpenImage.textContent = cardTitle.textContent;
        urlPopupOpenImage.src = cardImage.src;
    });

    cardList.prepend(cardElement);
}

//Лайк

function likeCard(evt) {
    evt.target.classList.toggle('card__button-like_active');
}
    
// Функция добавления карточки

function addCard(evt) {
    
    evt.preventDefault();

    createCard();

    toggleModal(popupAdd);
}

popupAdd.addEventListener('submit', addCard);

initialCards.forEach((data) => {

    linkInput.value = data.link;
    titleInput.value = data.name;

    createCard();
});