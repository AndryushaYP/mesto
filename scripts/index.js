import {
  myObject,
  initialCards,
  cardList,
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

initialCards.forEach((item) => {
  const card = new Card(item, ".cards__list-item");
  const cardElement = card.generateCard();
  cardList.prepend(cardElement);
});

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

buttonEdit.addEventListener("click", () => modalOpen(popupEdit));
buttonAdd.addEventListener("click", () => modalOpen(popupAdd));

buttonCloseFormAdd.addEventListener("click", () => modalClose(popupAdd));
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
  const card = new Card({ name: titleInput.value, link: linkInput.value }, ".cards__list-item");
  const cardElement = card.generateCard();
  cardList.prepend(cardElement);
  modalClose(popupAdd);
  popupAdd.querySelector(".popup__button").disabled = true;
  popupAdd.querySelector(".popup__button").classList.add("popup__button_disabled");
  document.forms.add.reset();
}
popupAdd.addEventListener("submit", addCardHandler);
