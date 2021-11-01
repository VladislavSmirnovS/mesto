import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWIthForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  editButton,
  formSubmitProfile,
  formSubmitElement,
  formSubmitAvatar,
  addButton,
  userName,
  userAbout,
  nameInput,
  jobInput,
  picturesTemplateSelector,
  avatar,
  config,
} from "../utils/constant.js";

const validFormCard = new FormValidator(config, formSubmitElement);
validFormCard.enableValidation();
const validFormProfile = new FormValidator(config, formSubmitProfile);
validFormProfile.enableValidation();
const validFormAvatar = new FormValidator(config, formSubmitAvatar);
validFormAvatar.enableValidation();

let myId = null;

const cardsList = new Section(
  {
    renderer: (data) => {
      newCardMaker(data, myId);
    },
  },
  ".elements"
);

function handleLikeClick(card, data) {
  const promise = card.isLiked()
    ? api.dislikeCard(data._id)
    : api.likeCard(data._id);
  promise
    .then((data) => {
      card.likeCard(data);
    })
    .catch((err) => {
      console.log(`${err}`);
    });
}

function handleCardDelete(card, data) {
  popupTypeDelete.setFormSubmitHandler(() => {
    api
      .deleteCard(data._id)
      .then(() => {
        card.removeCard();
        popupTypeDelete.close();
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  });
  popupTypeDelete.open();
}

const popupTypeDelete = new PopupWithSubmit(".popup_confirm");

popupTypeDelete.setEventListeners();

function handleCardClick(link, name) {
  popupTypePicture.open(link, name);
}

const popupTypePicture = new PopupWithImage(".popup_picture");
popupTypePicture.setEventListeners();

function newCardMaker(data, myId) {
  const newCard = new Card(
    data,
    handleCardClick,
    {
      handleLikeClick: () => handleLikeClick(newCard, data),
      handleCardDelete: () => handleCardDelete(newCard, data),
    },
    myId,
    picturesTemplateSelector
  );
  const cardElement = newCard.createCard();
  newCard.likeCard(data);
  cardsList.addItem(cardElement);
}

const user = new UserInfo({
  userNameElement: userName,
  userInfoElement: userAbout,
});

const popupTypeEdit = new PopupWIthForm({
  popupSelector: ".popup_profile",
  handleFormSubmit: (data) => {
    popupTypeEdit.renderLoading(true);
    api
      .setUserInfo(data)
      .then((data) => {
        user.setUserInfo(data);
        popupTypeEdit.close();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        popupTypeEdit.renderLoading(false);
      });
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
    popupAdd.renderLoading(true);
    api
      .createCard(data)
      .then((data) => {
        newCardMaker(data, myId);
        popupAdd.close();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        popupAdd.renderLoading(false);
      });
  },
});

popupAdd.setEventListeners();

addButton.addEventListener("click", () => {
  popupAdd.open();
});

const popupTypeAvatar = new PopupWIthForm({
  popupSelector: ".popup_avatar",
  handleFormSubmit: (data) => {
    renderLoading(true);
    avatar.style.backgroundImage = `url(${data.link})`;
    api
      .setAvatar(data)
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        renderLoading(false);
      });
    popupTypeAvatar.close();
  },
});

popupTypeAvatar.setEventListeners();

avatar.addEventListener("click", () => {
  popupTypeAvatar.open();
});

const api = new Api({
  url: "https://nomoreparties.co/v1/cohort-29",
  headers: {
    Authorization: "0ac03c29-348f-4641-b1c9-55603c5e7c4f",
    "content-type": "application/json",
  },
});

Promise.all([api.getCards(), api.getUserInfo()])
  .then(([cards, userData]) => {
    user.setUserInfo(userData);
    avatar.style.backgroundImage = `url(${userData.avatar})`;
    myId = userData._id;
    cardsList.renderItems(cards);
  })
  .catch((err) => {
    console.log(`${err}`);
  });
