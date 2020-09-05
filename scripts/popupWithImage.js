import { Popup } from "./popup.js";
import { titlePopupOpenImage, urlPopupOpenImage } from "./constants.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(cardData) {
    titlePopupOpenImage.textContent = cardData.name;
    urlPopupOpenImage.src = cardData.link;
    super.open();
  }
}
