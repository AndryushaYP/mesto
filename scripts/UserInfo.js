export class UserInfo {
  constructor({ nameSelector, profileInfoSelector }) {
    this._nameSelector = nameSelector;
    this._profileinfoSelector = profileInfoSelector;
  }

  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      profession: this._profileinfoSelector.textContent,
    };
  }

  setUserInfo({ name, profession }) {
    this._nameSelector.textContent = name;
    this._profileinfoSelector.textContent = profession;
  }
}
