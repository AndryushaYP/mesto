export class UserInfo {
  constructor({ nameSelector, profileInfoSelector }) {
    this._nameSelector = nameSelector;
    this._profileinfoSelector = profileInfoSelector;
  }

  getUserInfo(formData) {
    formData.name = this._nameSelector.textContent;
    formData.profession = this._profileinfoSelector.textContent;
  }

  setUserInfo(formData) {
      this._nameSelector.textContent = formData.name;
      this._profileinfoSelector.textContent = formData.profession;
  }
}
