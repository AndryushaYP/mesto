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
  buttonSubmit
} from "../utils/constants.js";

import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import '../pages/index.css';

const editFormValidator = new FormValidator(editForm, myObject);
const addFormValidator = new FormValidator(addForm, myObject);
editFormValidator.enableValidation();
addFormValidator.enableValidation();




const cardList = new Section(
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
      cardList.addItem(cardElement);
    },
  },
  ".cards__list"
);

const openPopupEdit = new PopupWithForm({
  popupSelector: popupEdit,
  formSubmitHandler: (formData) => {
    userInfo.setUserInfo(formData);
    openPopupEdit.close();
  },
});

const openPopupAdd = new PopupWithForm({
  popupSelector: popupAdd,
  formSubmitHandler: (formData) => {
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
    cardList.addItem(cardElement);
    openPopupAdd.close();
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

cardList.renderItems();
