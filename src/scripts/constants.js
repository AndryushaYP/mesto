//Формы
export const editForm = document.querySelector(".popup__form_type_edit");
export const addForm = document.querySelector(".popup__form_type_add");
//Модалки
export const popupList = document.querySelectorAll(".popup");
export const popupEdit = document.querySelector(".popup_type_edit");
export const popupAdd = document.querySelector(".popup_type_add");
export const popupImage = document.querySelector(".popup_type_open-image");
//Кнопки
export const buttonClose = document.querySelectorAll(".popup__button-close");
export const buttonEdit = document.querySelector(".profile__button_edit");
export const buttonAdd = document.querySelector(".profile__button_add");
export const buttonCloseFormAdd = popupAdd.querySelector(".popup__button-close");
export const buttonCloseFormEdit = popupEdit.querySelector(".popup__button-close");
export const buttonCloseImage = popupImage.querySelector(".popup__button-close");
//Поля
export const nameInput = document.querySelector(".popup__input_name");
export const professionInput = document.querySelector(".popup__input_profession");
export const titleInput = popupAdd.querySelector(".popup__input_title");
export const linkInput = popupAdd.querySelector(".popup__input_link");
//Профиль
export const profileTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");

export const titlePopupOpenImage = popupImage.querySelector(".popup__caption");
export const urlPopupOpenImage = popupImage.querySelector(".popup__image");

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const myObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};