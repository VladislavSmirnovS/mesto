let openButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let closeButton = document.querySelector(".popup__button-close");
let inputName = document.querySelector(".profile__info-name");
let inputProfession = document.querySelector(".profile__info-profession");
let popupInputName = document.querySelector("#popup_name");
let popupInputProfession = document.querySelector("#popup_profession");
let formSubmit = document.querySelector(".popup__form");


function togglePopup() {
  if (!popup.classList.contains('popup_opened')) {
    popupInputName.value = inputName.textContent; 
    popupInputProfession .value = inputProfession.textContent; 
  }
  popup.classList.toggle('popup_opened')
}


function formSubmitHandler(evt) {
  evt.preventDefault();
  inputName.textContent = popupInputName.value;
  inputProfession.textContent = popupInputProfession.value;
  togglePopup();
}

formSubmit.addEventListener("submit", formSubmitHandler);
openButton.addEventListener("click", togglePopup);
closeButton.addEventListener("click", togglePopup);
