const mainPopup = document.querySelector('.popup');
const popupEdit = mainPopup.querySelector('.popup__edit');
const popupAdd = mainPopup.querySelector('.popup__add');

const buttonEdit = document.querySelector('.profile__button_edit');
const buttonAdd = document.querySelector('.profile__button_add');
const buttonCloseFormAdd = popupAdd.querySelector('.popup__button-close');
const buttonCloseFormEdit = popupEdit.querySelector('.popup__button-close');

const nameInput = document.querySelector('.popup__info_name');
const professionInput = document.querySelector('.popup__info_profession');
const titleInput = popupAdd.querySelector('.popup__info_title');
const linkInput = popupAdd.querySelector('.popup__info_link');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');


function toggleModal (popup) {

    mainPopup.classList.toggle('popup_opened');
    popup.classList.toggle('popup_opened');

}

buttonEdit.addEventListener('click', () => toggleModal(popupEdit));
buttonAdd.addEventListener('click', () => toggleModal(popupAdd));
buttonCloseFormAdd.addEventListener('click', () => toggleModal(popupAdd));
buttonCloseFormEdit.addEventListener('click', () => toggleModal(popupEdit));

function formSubmitHandler (evt) {

    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = professionInput.value;
    toggleModal(popupEdit);

}

popupEdit.addEventListener('submit', formSubmitHandler);
    

function addCard(evt) {
    
    evt.preventDefault();
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.card__image').src = linkInput.value;
    cardElement.querySelector('.card__caption').textContent = titleInput.value;
  
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

initialCards.forEach((el, i) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.card__image').src = initialCards[i].link;
    cardElement.querySelector('.card__caption').textContent = initialCards[i].name;
  
    cardList.append(cardElement);
});







