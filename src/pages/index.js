import {
  myObject,
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
  avatarIcon, 
  avatarForm, 
  popupAvatar,
  buttonSubmitAvatar
} from "../utils/constants.js";

import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import "../pages/index.css";

const editFormValidator = new FormValidator(editForm, myObject);
const addFormValidator = new FormValidator(addForm, myObject);
const avatarFormValidator = new FormValidator(avatarForm, myObject);

avatarFormValidator.enableValidation();
editFormValidator.enableValidation();
addFormValidator.enableValidation();

const createCard = (item) => {
  const card = new Card(
    {
      data: item,
      handleCardClick: (cardData) => {
        imagePopup.open(cardData);
      },
      handleLikeClick: () => {

      },
      handleDeleteClick: (id) => {
        api.deleteCard(id).then(res => {
          console.log(res)
          card.remove();
        })
      }
    },
    "#card-template"
  );

  const cardElement = card.generateCard();
  document.querySelector(".cards__list").prepend(cardElement);
};

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-15/cards",
  headers: {
    authorization: "a0bff86e-f64d-4da1-b51a-ea82a126a932",
    "Content-Type": "application/json",
  },
});

api.getAllCardsList().then((data) => {
  console.log(data)
  const cardList = new Section(
    {
      data: data,

      renderer: (item) => {
        createCard(item);
      },
    },
    ".cards__list"
  );
  cardList.renderItems();
});

api.getUserData().then((data) => {
  console.log(data)
  profileTitle.textContent = data.name;
  profileSubtitle.textContent = data.about;
  avatarIcon.src = data.avatar;
})

const popupEditForm = new PopupWithForm({
  popupSelector: popupEdit,
  formSubmitHandler: (formData) => {
    api.changeUserData(formData).then((formData) => {
      userInfo.setUserInfo(formData);
    })
    
    popupEditForm.close();
    editFormValidator.buttonSubmitBlock(buttonSubmitEdit);
  },
});

const avatarEditForm = new PopupWithForm({
  popupSelector: popupAvatar,
  formSubmitHandler: (formData) => {
    api.changeUserAvatar(formData).then((formData) => {
      userInfo.setUserInfo(formData);
    })
    avatarFormValidator.buttonSubmitBlock(buttonSubmitAvatar);
    avatarEditForm.close();
  },
})

avatarIcon.addEventListener("click", () => {
  avatarEditForm.open();
});

const popupAddForm = new PopupWithForm({
  popupSelector: popupAdd,
  formSubmitHandler: (cardData) => {
    console.log(cardData);
    api.addCard(cardData).then((cardData) => { //Сохраняем карточку на сервер
      console.log(cardData.owner._id)
      createCard(cardData);
    });
    addFormValidator.buttonSubmitBlock(buttonSubmitAdd);
    popupAddForm.close();
  },
});

const imagePopup = new PopupWithImage(popupImage);

const userInfo = new UserInfo({
  nameSelector: profileTitle,
  profileInfoSelector: profileSubtitle,
  avatarSelector: avatarIcon
});

//////////////////


//////////////////

buttonEdit.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();

  nameInput.value = currentUserInfo.name;
  professionInput.value = currentUserInfo.about;

  popupEditForm.open();
});

buttonAdd.addEventListener("click", () => {
  popupAddForm.open();
});

avatarEditForm.setEventListeners();
popupAddForm.setEventListeners();
popupEditForm.setEventListeners();
imagePopup.setEventListeners();
