export class UserInfo {
  constructor({ nameSelector, profileInfoSelector, avatarSelector }) {
    this._nameSelector = nameSelector;
    this._profileinfoSelector = profileInfoSelector;
    this._avatarSelector = avatarSelector;
  }

  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      about: this._profileinfoSelector.textContent,
      avatar: this._avatarSelector.src
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._nameSelector.textContent = name;
    this._profileinfoSelector.textContent = about;
    this._avatarSelector.src = avatar;
  }
}
