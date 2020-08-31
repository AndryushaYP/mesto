import { popupList } from "./constants.js";

export const modalOpen = (popup) => {
  
  document.addEventListener("keydown", closeModalPressEsc);
};

export const modalClose = (popup) => {
  
  document.removeEventListener("keydown", closeModalPressEsc);
};

export const closeModalPressEsc = (evt) => {
  if (evt.key === "Escape") {
    popupList.forEach((popupElement) => {
      modalClose(popupElement);
    });
  }
};
