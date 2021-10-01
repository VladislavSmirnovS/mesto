import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
const editButton = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_profile");
const popupElement = document.querySelector(".popup_element");
const popupPicture = document.querySelector(".popup_picture");
const popupImage = popupPicture.querySelector(".popup__image");
const popupCaption = popupPicture.querySelector(".popup__caption");
const closeButtons = document.querySelectorAll(".popup__button-close");
const inputName = document.querySelector(".profile__info-name");
const inputProfession = document.querySelector(".profile__info-profession");
const popupInputName = document.querySelector("#popup-name");
const popupInputProfession = document.querySelector("#popup-profession");
const popupInputPlace = document.querySelector("#popup-place");
const popupInputLink = document.querySelector("#popup-link");
const formSubmitProfile = document.querySelector(".popup__form_profile");
const formSubmitElement = document.querySelector(".popup__form_element");
const addButton = document.querySelector(".profile__button-add");
const postsElement = document.querySelector(".elements");
const popupContainers = document.querySelectorAll(".popup__overlay");
const globalPopups = document.querySelectorAll(".popup");
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

initialCards.forEach((item) => {
  createCard(item);
});

popupContainers.forEach((item) =>
  item.addEventListener("mousedown", (evt) => {
    evt.stopPropagation();
  })
);

globalPopups.forEach((item) => {
  item.addEventListener("mousedown", (evt) => {
    closePopup(evt.target.closest(".popup"));
  });
});

function createCard(item) {
  const newCard = new Card(item, handleImageClick);
  postsElement.prepend(newCard.createCard());
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
};

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
};

const openProfilePopup = (popup) => {
  openPopup(popup);
  popupInputName.value = inputName.textContent;
  popupInputProfession.value = inputProfession.textContent;
};

function handleImageClick(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openPopup(popupPicture);
}

function submitProfileForm(evt) {
  evt.preventDefault();

  inputName.textContent = popupInputName.value;
  inputProfession.textContent = popupInputProfession.value;

  closePopup(popupProfile);

  const button = evt.target.querySelector(".popup__button-save");
  button.classList.add("popup__button-save_disabled");
  button.disabled = true;
}

function submitElementForm(evt) {
  evt.preventDefault();
  const value = { name: popupInputPlace.value, link: popupInputLink.value };
  createCard(value);

  closePopup(popupElement);

  const button = evt.target.querySelector(".popup__button-save");
  button.classList.add("popup__button-save_disabled");
  button.disabled = true;
}

formSubmitProfile.addEventListener("submit", submitProfileForm);

formSubmitElement.addEventListener("submit", submitElementForm);

editButton.addEventListener("click", () => {
  openProfilePopup(popupProfile);
});

addButton.addEventListener("click", () => {
  openPopup(popupElement);
});

closeButtons.forEach((item) => {
  item.addEventListener("click", (evt) => {
    closePopup(evt.target.closest(".popup"));
  });
});
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
const validformCard = new FormValidator(config, formSubmitElement);
validformCard.enableValidation();
const validformProfile = new FormValidator(config, formSubmitProfile);
validformProfile.enableValidation();
