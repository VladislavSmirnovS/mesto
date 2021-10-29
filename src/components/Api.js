export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getUserInfo() {
    return fetch("https://nomoreparties.co/v1/cohort-29/users/me", {
      headers: this._headers,
    }).then(this._getResponseData);
  }

  getCards() {
    return fetch("https://nomoreparties.co/v1/cohort-29/cards", {
      headers: this._headers,
    }).then(this._getResponseData);
  }

  setUserInfo(data) {
    return fetch("https://nomoreparties.co/v1/cohort-29/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._getResponseData);
  }

  createCard(newCard) {
    return fetch("https://nomoreparties.co/v1/cohort-29/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link,
      }),
    }).then(this._getResponseData);
  }

  deleteCard(id) {
    return fetch(`https://nomoreparties.co/v1/cohort-29/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  likeCard(id) {
    return fetch(`https://nomoreparties.co/v1/cohort-29/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  dislikeCard(id) {
    return fetch(`https://nomoreparties.co/v1/cohort-29/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  setAvatar(link) {
    return fetch("https://nomoreparties.co/v1/cohort-29/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: link.link }),
    }).then(this._getResponseData);
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}
