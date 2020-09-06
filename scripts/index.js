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
  nameInput,
  professionInput,
  profileTitle,
  profileSubtitle,
} from "./constants.js";

import { FormValidator } from "./FormValidator.js";

import { Card } from "./card.js";
import { Section } from "./section.js";
import { PopupWithImage } from "./popupWithImage.js";
import { PopupWithForm } from "./popupWithForm.js";
import { UserInfo } from "./UserInfo.js";

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

const userInfo = new UserInfo({
  nameSelector: profileTitle,
  profileInfoSelector: profileSubtitle,
});

const openPopupEdit = new PopupWithForm({
  popupSelector: popupEdit,
  formSubmitHandler: (formData) => {
    userInfo.setUserInfo(formData);
  },
});

buttonEdit.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();

  nameInput.value = currentUserInfo.name;
  professionInput.value = currentUserInfo.profession;

  openPopupEdit.open();
});

const openPopupAdd = new PopupWithForm({
  popupSelector: popupAdd,
  formSubmitHandler: (formData) => {
    const cardsContainer = document.querySelector(".cards__list");
    const card = new Card(
      {
        data: formData,
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
