export default class Card {
  constructor(data, handleImageClick, formElement) {
    this._link = data.link;
    this._name = data.name;
    this._handleImageClick = handleImageClick;
    this._formElement = formElement;
  }

  _getTemplate() {
    const postElement = document
      .querySelector(this._formElement)
      .content.cloneNode(true);
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
        this._handleImageClick(this._link, this._name);
      });
  }

  _likeCard = () => {
    this._element
      .querySelector(".element__like")
      .classList.toggle("element__like_active");
    console.log(this._formElement);
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
