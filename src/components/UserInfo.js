export class UserInfo {
  constructor({ nameSelector, profileInfoSelector, avatarSelector, id }) {
    this._nameSelector = nameSelector;
    this._profileinfoSelector = profileInfoSelector;
    this._avatarSelector = avatarSelector;
    this._id = id;
  }

  getUserId() {
    return { _id: this._id };
  }

  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      about: this._profileinfoSelector.textContent,
      avatar: this._avatarSelector.src,
    };
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._nameSelector.textContent = name;
    this._profileinfoSelector.textContent = about;
    this._avatarSelector.src = avatar;
    this._id = _id;
  }
}
