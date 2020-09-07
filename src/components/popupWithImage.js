import { Popup } from "./Popup.js";
import { titlePopupOpenImage, urlPopupOpenImage } from "../utils/constants.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(cardData) {
    titlePopupOpenImage.textContent = cardData.name;
    urlPopupOpenImage.src = cardData.link;
    urlPopupOpenImage.alt = cardData.name;
    super.open();
  }
}
