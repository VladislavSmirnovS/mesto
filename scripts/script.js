let openButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let closeButton = document.querySelector(".popup__button-close");
let inputName = document.querySelector(".profile__info-name");
let inputProfession = document.querySelector(".profile__info-profession");
let popupInputName = document.querySelector(".popup__name");
let popupInputProfession = document.querySelector(".popup__profession");
let saveButton = document.querySelector(".popup__button-save");
let formSubmit = document.querySelector(".popup__form");

function openPopup() {
  popup.classList.toggle("popup_opened");
  popupInputName.value = inputName.textContent;
  popupInputProfession.value = inputProfession.innerText;
}

function closePopup() {
  popup.classList.toggle("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  inputName.textContent = popupInputName.value;
  inputProfession.textContent = popupInputProfession.value;
  closePopup();
}

formSubmit.addEventListener("submit", formSubmitHandler);
openButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
