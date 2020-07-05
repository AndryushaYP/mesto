const myPopup = document.querySelector('.popup');
const buttonEdit = document.querySelector('.profile__button_edit');
const popupButtonClose = document.querySelector('.popup__button-close');
const nameInput = document.querySelector('.popup__info_name');
const professionInput = document.querySelector('.popup__info_profession');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

function popupOpenOrClose () {
    myPopup.classList.toggle('popup_opened');
    nameInput.value = profileTitle.textContent;
    professionInput.value = profileSubtitle.textContent;
}

buttonEdit.addEventListener('click', popupOpenOrClose);
popupButtonClose.addEventListener('click', popupOpenOrClose);

const popupForm = document.querySelector('.popup__container');

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = professionInput.value;
    myPopup.classList.remove('popup_opened');
}

popupForm.addEventListener('submit', formSubmitHandler);