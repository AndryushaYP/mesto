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
  buttonSubmitAvatar,
  avatarOverlay,
  popupConfirm,
} from "../utils/constants.js";

import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithSubmit } from "../components/PopupWithSubmit.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import "../pages/index.css";

const editFormValidator = new FormValidator(editForm, myObject);
const addFormValidator = new FormValidator(addForm, myObject);
const avatarFormValidator = new FormValidator(avatarForm, myObject);

avatarFormValidator.enableValidation();
editFormValidator.enableValidation();
addFormValidator.enableValidation();

const popupConfirmForm = new PopupWithSubmit({
  popupSelector: popupConfirm,
  formConfirmationHandler: () => {},
});

const createCard = (item) => {
  const card = new Card(
    {
      data: item,
      handleCardClick: (cardData) => {
        imagePopup.open(cardData);
      },
      handleLikeClick: (id) => {
        api
          .addLikeCard(id)
          .then((res) => {
            card.updateLike(res);

            console.log(res.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      handleLikeRemove: (id) => {
        api
          .deleteLikeCard(id)
          .then((res) => {
            card.updateLike(res);
          })
          .catch((err) => {
            console.log(err);
          });
      },

      handleDeleteClick: (id) => {
        popupConfirmForm.setSubmitAction(() => {
          api
            .deleteCard(id)
            .then((res) => {
              card.remove();
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        });
        popupConfirmForm.open();
      },
    },
    "#card-template"
  );

  const cardElement = card.generateCard();

  document.querySelector(".cards__list").prepend(cardElement);
  card.updateLike(item);
};

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-15/cards",
  headers: {
    authorization: "a0bff86e-f64d-4da1-b51a-ea82a126a932",
    "Content-Type": "application/json",
  },
});

api
  .getAllCardsList()
  .then((data) => {
    console.log(data);
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
  })
  .catch((err) => {
    console.log(err);
  });

api
  .getUserData()
  .then((data) => {
    console.log(data._id);
    userInfo.setUserInfo(data);
  })
  .catch((err) => {
    console.log(err);
  });

const popupEditForm = new PopupWithForm({
  popupSelector: popupEdit,
  buttonSelector: buttonSubmitEdit,
  formSubmitHandler: (formData) => {
    api
      .changeUserData(formData)
      .then((formData) => {
        userInfo.setUserInfo(formData);
      })
      .catch((err) => {
        console.log(err);
      }).finally(() => {
        popupEditForm.renderLoading(false)
      });

    popupEditForm.close();
    editFormValidator.buttonSubmitBlock(buttonSubmitEdit);
  },
});

const avatarEditForm = new PopupWithForm({
  popupSelector: popupAvatar,
  buttonSelector: buttonSubmitAvatar,
  formSubmitHandler: (formData) => {
    api
      .changeUserAvatar(formData)
      .then((formData) => {
        userInfo.setUserInfo(formData);
      })
      .catch((err) => {
        console.log(err);
      }).finally(() => {
        avatarEditForm.renderLoading(false)
      });
    avatarFormValidator.buttonSubmitBlock(buttonSubmitAvatar);
    avatarEditForm.close();
  },
});

avatarOverlay.addEventListener("click", () => {
  avatarEditForm.open();
});

const popupAddForm = new PopupWithForm({
  popupSelector: popupAdd,
  buttonSelector: buttonSubmitAdd,
  formSubmitHandler: (cardData) => {
    console.log(cardData);
    api
      .addCard(cardData)
      .then((cardData) => {
        console.log(cardData.owner._id);
        createCard(cardData);
      })
      .catch((err) => {
        console.log(err);
      }).finally(() => {
        popupAddForm.renderLoading(false);
      });
    addFormValidator.buttonSubmitBlock(buttonSubmitAdd);
    popupAddForm.close();
  },
});

const imagePopup = new PopupWithImage(popupImage);

const userInfo = new UserInfo({
  nameSelector: profileTitle,
  profileInfoSelector: profileSubtitle,
  avatarSelector: avatarIcon,
});

buttonEdit.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();

  nameInput.value = currentUserInfo.name;
  professionInput.value = currentUserInfo.about;

  popupEditForm.open();
});

buttonAdd.addEventListener("click", () => {
  popupAddForm.open();
});

popupConfirmForm.setEventListeners();
avatarEditForm.setEventListeners();
popupAddForm.setEventListeners();
popupEditForm.setEventListeners();
imagePopup.setEventListeners();