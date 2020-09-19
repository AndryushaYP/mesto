export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element, isArray) {
    if (isArray) {
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }

  renderItems(renderedItems) {
    renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
