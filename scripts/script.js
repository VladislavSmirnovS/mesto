let editButton = document.querySelector(".profile__edit-button");
let popupProfile = document.querySelector(".popup_profile");
let popup = document.querySelector(".popup__container");
let popupElement= document.querySelector(".popup_element");
let popupPicture=document.querySelector(".popup_picture")
let closeButton = document.querySelectorAll(".popup__button-close");
let inputName = document.querySelector(".profile__info-name");
let inputProfession = document.querySelector(".profile__info-profession");
let popupInputName = document.querySelector("#popup-name");
let popupInputProfession = document.querySelector("#popup-profession");
let popupInputPlace = document.querySelector("#popup-place");
let popupInputLink = document.querySelector("#popup-link");
let formSubmit = document.querySelectorAll(".popup__form");
let addButton = document.querySelector(".profile__button-add");
let popupImage = document.querySelector(".popup__image ")
let popupCaption = document.querySelector(".popup__caption")
const postsElement = document.querySelector('.elements')
const elementTemplate = document.querySelector('#element-template').content;

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const addPost= data=>{
  const postElement = elementTemplate.querySelector('.element').cloneNode(true);
  postElement.querySelector('.element__picture').src = data.link;
  postElement.querySelector('.element__title').textContent = data.name;
  postElement.querySelector('.element__picture').alt= data.name;
  postElement.querySelector('.element__like').addEventListener('click' ,(event) => {event.target.classList.toggle('element__like_active')} );
  postElement.querySelector('.element__remove').addEventListener('click', (event) => {event.target.closest('.element').remove()} );
  postElement.querySelector('.element__big-picture').addEventListener('click', (event)=>{
    popupImage.src = event.target.src;
    popupImage.alt=event.target.closest('.element').querySelector('.element__title').textContent;
    popupCaption.textContent=event.target.closest('.element').querySelector('.element__title').textContent;
    openPopup(popupPicture);
  })
 return postElement 
};

initialCards.forEach(data => {
  postsElement.prepend(addPost(data))});

const openPopup = popup => {
  popup.classList.add('popup_opened')
}
const closePopup = popup => {
  popup.classList.remove('popup_opened')
}

const openProfilePopup = popup => {
  const name = document.querySelector('#popup-name')
  const job = document.querySelector('#popup-profession')
  openPopup(popup)
  name.value = inputName.textContent
  job.value = inputProfession.textContent
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  inputName.textContent = popupInputName.value;
  inputProfession.textContent = popupInputProfession.value;
  closePopup(popupProfile);
}

function formSubmitElement(evt) {
  evt.preventDefault();
  const postElement = elementTemplate.querySelector('.element').cloneNode(true);
  postElement.querySelector('.element__picture').src = popupInputLink.value;
  postElement.querySelector('.element__title').textContent = popupInputPlace.value;
  postElement.querySelector('.element__picture').alt= popupInputPlace.value;
  postElement.querySelector('.element__like').addEventListener('click' ,(event) => {event.target.classList.toggle('element__like_active')} );
  postElement.querySelector('.element__remove').addEventListener('click', (event) => {event.target.closest('.element').remove()} );
  postsElement.prepend(postElement);
  closePopup(popupElement);
}

formSubmit[0].addEventListener("submit", formSubmitHandler);
formSubmit[1].addEventListener("submit", formSubmitElement);
editButton.addEventListener('click', () => {openProfilePopup(popupProfile)})
closeButton[0].addEventListener("click", () =>{closePopup(popupProfile)});
closeButton[1].addEventListener("click", () =>{closePopup(popupElement)}); 
closeButton[2].addEventListener("click", () =>{closePopup(popupPicture)}); 
addButton.addEventListener("click",  () =>{openPopup(popupElement)});

