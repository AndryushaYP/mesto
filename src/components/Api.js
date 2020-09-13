export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
    this._name = config.name;
    this._link = config.link;
  }

  getAllCardsList() {
    return fetch(this._url, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Server failed!");
    });
  }

  addCard({link, name}) {
    return fetch(this._url, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ link: link, name: name }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Server failed!");
    });
  }

  getUserData() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-15/users/me', {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Server failed!");
    });
  }

  changeUserData({name, about}) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-15/users/me', {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({name: name, about: about}),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Server failed!");
    });
  }

  changeUserAvatar({avatar}) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-15/users/me/avatar', {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({avatar: avatar}),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Server failed!");
    });
  }

  deleteCard(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-15/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Server failed!");
    });
  }

  addLikeCard() {}

  deleteLikeCard() {}
}
