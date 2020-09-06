import {
  myObject,
  initialCards,
  editForm,
  addForm,
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

import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/card.js";
import { Section } from "../components/section.js";
import { PopupWithImage } from "../components/popupWithImage.js";
import { PopupWithForm } from "../components/popupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import '../pages/index.css';

const editFormValidator = new FormValidator(editForm, myObject);
const addFormValidator = new FormValidator(addForm, myObject);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

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

const openPopupEdit = new PopupWithForm({
  popupSelector: popupEdit,
  formSubmitHandler: (formData) => {
    userInfo.setUserInfo(formData);
  },
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

const imagePopup = new PopupWithImage(popupImage);

const userInfo = new UserInfo({
  nameSelector: profileTitle,
  profileInfoSelector: profileSubtitle,
});

buttonEdit.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();

  nameInput.value = currentUserInfo.name;
  professionInput.value = currentUserInfo.profession;

  openPopupEdit.open();
});

buttonAdd.addEventListener("click", () => openPopupAdd.open());

openPopupAdd.setEventListeners();
openPopupEdit.setEventListeners();
imagePopup.setEventListeners();

сardList.renderItems();
