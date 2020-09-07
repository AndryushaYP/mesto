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
  buttonSubmitEdit,
  buttonSubmitAdd,
} from "../utils/constants.js";

import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import "../pages/index.css";

const editFormValidator = new FormValidator(editForm, myObject);
const addFormValidator = new FormValidator(addForm, myObject);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

const createCard = (item) => {
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
};

const cardList = new Section(
  {
    data: initialCards,

    renderer: (item) => {
      createCard(item);
    },
  },
  ".cards__list"
);

const popupEditForm = new PopupWithForm({
  popupSelector: popupEdit,
  formSubmitHandler: (formData) => {
    userInfo.setUserInfo(formData);
    popupEditForm.close();
    editFormValidator.buttonSubmitBlock(buttonSubmitEdit);
  },
});

const popupAddForm = new PopupWithForm({
  popupSelector: popupAdd,
  formSubmitHandler: (item) => {
    addFormValidator.buttonSubmitBlock(buttonSubmitAdd);
    createCard(item);
    popupAddForm.close();
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

  popupEditForm.open();
});

buttonAdd.addEventListener("click", () => {
  popupAddForm.open();
});

popupAddForm.setEventListeners();
popupEditForm.setEventListeners();
imagePopup.setEventListeners();

cardList.renderItems();
