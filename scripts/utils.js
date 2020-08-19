import { popupList } from "./constants.js";

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
