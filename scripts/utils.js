import { popupList } from "./constants.js";
import { Card } from "./card.js";
import { cardList } from "./constants.js";

export const modalOpen = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeModalPressEsc);
};

export const modalClose = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeModalPressEsc);
};

export const closeModalPressEsc = (evt) => {
  if (evt.key === "Escape") {
    popupList.forEach((popupElement) => {
      modalClose(popupElement);
    });
  }
};

export const renderCard = (config, elCard) => {
  const card = new Card(config, elCard);
  const cardElement = card.generateCard();
  cardList.prepend(cardElement);
};
