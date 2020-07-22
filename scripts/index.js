const cardTemplate = document.querySelector('#card-template').content;

const mainPopup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_type_edit');

const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_open-image');

const buttonEdit = document.querySelector('.profile__button_edit');
const buttonAdd = document.querySelector('.profile__button_add');
const buttonCloseFormAdd = popupAdd.querySelector('.popup__button-close');
const buttonCloseFormEdit = popupEdit.querySelector('.popup__button-close');
const buttonClosePopupOpenImage = popupImage.querySelector('.popup__button-close');

const nameInput = document.querySelector('.popup__info_name');
const professionInput = document.querySelector('.popup__info_profession');
const titleInput = popupAdd.querySelector('.popup__info_title');
const linkInput = popupAdd.querySelector('.popup__info_link');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

function toggleModal (popup) {

    popup.classList.toggle('popup_opened');

}


const titlePopupOpenImage = popupImage.querySelector('.popup__caption');
const urlPopupOpenImage = popupImage.querySelector('.popup__image');

buttonEdit.addEventListener('click', () => toggleModal(popupEdit));
buttonAdd.addEventListener('click', () => toggleModal(popupAdd));
buttonCloseFormAdd.addEventListener('click', () => toggleModal(popupAdd));
buttonCloseFormEdit.addEventListener('click', () => toggleModal(popupEdit));
buttonClosePopupOpenImage.addEventListener('click', () => toggleModal(popupImage));

function formSubmitHandler (evt) {

    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = professionInput.value;
    toggleModal(popupEdit);

}

popupEdit.addEventListener('submit', formSubmitHandler);

//Лайк

function likeCard(evt) {
    evt.target.classList.toggle('card__button_active');
}
    
// Функция добавления карточки

function addCard(evt) {
    
    evt.preventDefault();
    
    const cardElement = cardTemplate.cloneNode(true);

    const cardImage =  cardElement.querySelector('.card__image');
    cardImage.src = linkInput.value;
    const cardTitle = cardElement.querySelector('.card__caption');
    cardTitle.textContent = titleInput.value;

    const buttonLike = cardElement.querySelector('.card__button');

    buttonLike.addEventListener('click', likeCard);

    const buttonDelete = cardElement.querySelector('.card__delete');

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
    toggleModal(popupAdd);
}

popupAdd.addEventListener('submit', addCard);



const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const cardList = document.querySelector('.cards__list');

initialCards.forEach((data) => {

    const cardElement = cardTemplate.cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__caption');
    const buttonLike = cardElement.querySelector('.card__button');
    const buttonDelete = cardElement.querySelector('.card__delete');
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

    cardImage.src = data.link;
    cardTitle.textContent = data.name;
  
    cardList.prepend(cardElement);
});