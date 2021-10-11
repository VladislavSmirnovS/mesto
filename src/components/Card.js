export default class Card {
  constructor(data, handleCardClick, templateSelector) {
    this._link = data.link;
    this._name = data.name;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const postElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return postElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._likeCard();
      });
    this._element
      .querySelector(".element__remove")
      .addEventListener("click", (event) => {
        this._removeCard(event);
      });
    this._element
      .querySelector(".element__big-picture")
      .addEventListener("click", () => {
        this._handleCardClick(this._link, this._name);
      });
  }

  _likeCard = () => {
    this._element
      .querySelector(".element__like")
      .classList.toggle("element__like_active");
  };

  _removeCard = () => {
    this._element.remove();
  };

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".element__picture").src = this._link;
    this._element.querySelector(".element__title").textContent = this._name;
    this._element.querySelector(".element__picture").alt = this._name;
    return this._element;
  }
}
