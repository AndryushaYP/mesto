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

const сardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template");
      const cardElement = card.generateCard();
      сardList.addItems(cardElement);
    },
  },
  ".cards__list"
);

сardList.renderItems();

const editFormValidator = new FormValidator(editForm, myObject);
const addFormValidator = new FormValidator(addForm, myObject);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

popupList.forEach((popupElement) => {
  popupElement.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget) {
      modalClose(popupElement);
    }
  });
});

const openPopupEdit = new Popup(popupEdit);
buttonEdit.addEventListener("click", () => openPopupEdit.open());

const openPopupAdd = new Popup(popupAdd);
buttonAdd.addEventListener("click", () => openPopupAdd.open());

buttonCloseFormAdd.addEventListener("click", () => openPopupAdd.setEventListeners());
buttonCloseFormEdit.addEventListener("click", () => modalClose(popupEdit));
buttonCloseImage.addEventListener("click", () => modalClose(popupImage));

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = professionInput.value;
  modalClose(popupEdit);
}

popupEdit.addEventListener("submit", formSubmitHandler);

function addCardHandler(evt) {
  evt.preventDefault();

  const cardsContainer = document.querySelector(".cards__list");
  const card = new Card({ name: titleInput.value, link: linkInput.value }, "#card-template");
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);

  modalClose(popupAdd);
  popupAdd.querySelector(".popup__button").disabled = true;
  popupAdd.querySelector(".popup__button").classList.add("popup__button_disabled");
  document.forms.add.reset();
}
popupAdd.addEventListener("submit", addCardHandler);
