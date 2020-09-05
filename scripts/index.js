import {
  myObject,
  initialCards,
  editForm,
  addForm,
  popupList,
  popupEdit,
  popupAdd,
  popupImage,
  buttonEdit,
  buttonAdd,
  buttonCloseFormAdd,
  buttonCloseFormEdit,
  buttonCloseImage,
  nameInput,
  professionInput,
  titleInput,
  linkInput,
  profileTitle,
  profileSubtitle,
} from "./constants.js";

import { modalOpen, modalClose } from "./utils.js";

import { FormValidator } from "./FormValidator.js";

import { Card } from "./card.js";
import { Section } from "./section.js";
import { Popup } from "./popup.js";
import { PopupWithImage } from "./popupWithImage.js";
import { PopupWithForm } from "./popupWithForm.js";
import { UserInfo} from './UserInfo.js';

// Создаём экземпляр класса section

const imagePopup = new PopupWithImage(popupImage);
const сardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(
        {
          data: item,
          handleCardClick: (cardData) => {
            imagePopup.open(cardData);
          },
        },
        "#card-template"
      );
      const cardElement = card.generateCard();
      сardList.addItems(cardElement);
    },
  },
  ".cards__list"
);
// рендерим карточки
сardList.renderItems();

//Экземпляр класаа картинка

////////////////

const editFormValidator = new FormValidator(editForm, myObject);
const addFormValidator = new FormValidator(addForm, myObject);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

const openPopupEdit = new PopupWithForm({
  popupSelector: popupEdit,
  formSubmitHandler: (formData) => {
    console.log(formData);
    const userInfo = new UserInfo({
      nameSelector: profileTitle,
      profileInfoSelector: profileSubtitle
    })
    userInfo.setUserInfo(formData);
  },
});

buttonEdit.addEventListener("click", () => openPopupEdit.open());

const openPopupAdd = new PopupWithForm({
  popupSelector: popupAdd,
  formSubmitHandler: (formData) => {
    const cardsContainer = document.querySelector(".cards__list");
    const card = new Card(
      {data: formData,
        handleCardClick: (formData) => {
          imagePopup.open(formData);
        },
      },
      "#card-template"
    );
    const cardElement = card.generateCard();
    cardsContainer.prepend(cardElement);
  },
});

buttonAdd.addEventListener("click", () => openPopupAdd.open());

openPopupAdd.setEventListeners();
openPopupEdit.setEventListeners();
imagePopup.setEventListeners();

popupList.forEach((popupElement) => {
  popupElement.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget) {
      popupElement.classList.remove("popup_opened");
    }
  });
});

/*function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = professionInput.value;
  modalClose(popupEdit);
}*/

/*popupEdit.addEventListener("submit", formSubmitHandler);

function addCardHandler(evt) {
  evt.preventDefault();

  const cardsContainer = document.querySelector(".cards__list");
  const card = new Card(
    { name: titleInput.value, link: linkInput.value, handleCardClick: () => {} },
    "#card-template"
  );
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);

  modalClose(popupAdd);
  popupAdd.querySelector(".popup__button").disabled = true;
  popupAdd.querySelector(".popup__button").classList.add("popup__button_disabled");
  document.forms.add.reset();
}
popupAdd.addEventListener("submit", addCardHandler);*/
