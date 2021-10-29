export default class Card {
  constructor(
    data,
    handleCardClick,
    { handleLikeClick, handleCardDelete },
    myId,
    templateSelector
  ) {
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._myId = myId;
    this._ownerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._templateSelector = templateSelector;
    this._handleCardDelete = handleCardDelete;
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
      .addEventListener("click", () => this._handleLikeClick());
    this._element
      .querySelector(".element__remove")
      .addEventListener("click", () => {
        this._handleCardDelete();
      });
    this._element
      .querySelector(".element__big-picture")
      .addEventListener("click", () => {
        this._handleCardClick(this._link, this._name);
      });
  }

  isLiked() {
    return this._isLiked;
  }

  likeCard(data) {
    this._isLiked =
      data.likes.filter((item) => {
        return item._id == this._myId;
      }).length > 0;
    this._element.querySelector(".element__like-counter").textContent =
      data.likes.length;
    if (this._isLiked) {
      this._element
        .querySelector(".element__like")
        .classList.add("element__like_active");
    } else {
      this._element
        .querySelector(".element__like")
        .classList.remove("element__like_active");
    }
  }

  removeCard = () => {
    this._element.remove();
  };

  _getDelete() {
    if (this._ownerId === this._myId) {
      this._element
        .querySelector(".element__remove")
        .classList.add("element__remove_active");
    }
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".element__picture").src = this._link;
    this._element.querySelector(".element__title").textContent = this._name;
    this._element.querySelector(".element__picture").alt = this._name;
    this._element.querySelector(".element__like-counter").textContent =
      this._likes.length;
    this._getDelete();
    return this._element;
  }
}
