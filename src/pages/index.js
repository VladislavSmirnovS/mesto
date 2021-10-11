import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWIthForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  editButton,
  formSubmitProfile,
  formSubmitElement,
  addButton,
  userName,
  userAbout,
  nameInput,
  jobInput,
  picturesTemplateSelector,
  initialCards,
  config,
} from "../utils/constant.js";

const validFormCard = new FormValidator(config, formSubmitElement);
validFormCard.enableValidation();
const validFormProfile = new FormValidator(config, formSubmitProfile);
validFormProfile.enableValidation();

const cardsList = new Section(
  {
    initialCards,
    renderer: (data) => {
      newCardMaker(data, handleCardClick, cardsList);
    },
  },
  ".elements"
);

cardsList.renderItems(initialCards);

function handleCardClick(link, name) {
  popupTypePicture.open(link, name);
}

const popupTypePicture = new PopupWithImage(".popup_picture");
popupTypePicture.setEventListeners();

function newCardMaker(data) {
  const newCard = new Card(data, handleCardClick, picturesTemplateSelector);
  const cardElement = newCard.createCard();
  cardsList.addItem(cardElement);
}

const user = new UserInfo({
  userNameElement: userName,
  userInfoElement: userAbout,
});

const popupTypeEdit = new PopupWIthForm({
  popupSelector: ".popup_profile",
  handleFormSubmit: (data) => {
    user.setUserInfo(data);
    popupTypeEdit.close();
  },
});
popupTypeEdit.setEventListeners();

editButton.addEventListener("click", () => {
  const userData = user.getUserInfo();

  nameInput.value = userData.name;
  jobInput.value = userData.about;
  popupTypeEdit.open();
});

const popupAdd = new PopupWIthForm({
  popupSelector: ".popup_element",
  handleFormSubmit: (data) => {
    newCardMaker(data, handleCardClick, picturesTemplateSelector);
    popupAdd.close();
  },
});

popupAdd.setEventListeners();

addButton.addEventListener("click", () => {
  validFormCard.disableSubmitButton();
  popupAdd.open();
});
