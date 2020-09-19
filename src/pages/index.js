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
  buttonSubmitConfirm,
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

const api = new Api({
  // Экземпляр класса АПИ
  url: "https://mesto.nomoreparties.co/v1/cohort-15/cards",
  headers: {
    authorization: "a0bff86e-f64d-4da1-b51a-ea82a126a932",
    "Content-Type": "application/json",
  },
});

Promise.all([api.getUserData(), api.getAllCardsList()])
  .then((res) => {
    const [dataUser, cardData] = res;
    userInfo.setUserInfo(dataUser);

    cardList.renderItems(cardData);
  })
  .catch((err) => {
    console.log(err);
  });

const cardList = new Section(
  {
    renderer: (item) => {
      createCard(item);
    },
  },
  ".cards__list"
);

const popupEditForm = new PopupWithForm({
  // Экземпляр класса для редактирования профиля
  popupSelector: popupEdit,
  buttonSelector: buttonSubmitEdit,
  formSubmitHandler: (formData) => {
    api
      .changeUserData(formData)
      .then((formData) => {
        userInfo.setUserInfo(formData);
        popupEditForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditForm.renderLoading(false);
      });

    editFormValidator.buttonSubmitBlock(buttonSubmitEdit);
  },
});

const popupAddForm = new PopupWithForm({
  /// Экземпляр класса для добавления карточки
  popupSelector: popupAdd,
  buttonSelector: buttonSubmitAdd,
  formSubmitHandler: (cardData) => {
    console.log(cardData);
    api
      .addCard(cardData)
      .then((cardData) => {
        console.log(cardData.owner._id);

        createCard(cardData);

        popupAddForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAddForm.renderLoading(false);
      });
    addFormValidator.buttonSubmitBlock(buttonSubmitAdd);
  },
});

const avatarEditForm = new PopupWithForm({
  // Экземпляр класса для изменения аватара
  popupSelector: popupAvatar,
  buttonSelector: buttonSubmitAvatar,
  formSubmitHandler: (formData) => {
    api
      .changeUserAvatar(formData)
      .then((formData) => {
        userInfo.setUserInfo(formData);
        avatarEditForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        avatarEditForm.renderLoading(false);
      });
    avatarFormValidator.buttonSubmitBlock(buttonSubmitAvatar);
  },
});

const popupConfirmForm = new PopupWithSubmit({
  //Экземпляр попапа подтверждения
  popupSelector: popupConfirm,
  buttonSelector: buttonSubmitConfirm,
  formConfirmationHandler: () => {},
});

const createCard = (item) => {
  //функция создания экземпляра класса Card
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
              popupConfirmForm.close();
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            }).finally(() => {
              popupConfirmForm.renderLoading(false);
            });
        });
        popupConfirmForm.open();
      },
    },
    userInfo.getUserId(),

    "#card-template"
  );

  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
  card.updateLike(item);
};

avatarOverlay.addEventListener("click", () => {
  avatarEditForm.open();
});

const imagePopup = new PopupWithImage(popupImage);

const userInfo = new UserInfo({
  // Экземпляр ЮзерИнфо
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
