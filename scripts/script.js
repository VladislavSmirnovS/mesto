const editButton = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_profile");
const popupElement = document.querySelector(".popup_element");
const popupPicture = document.querySelector(".popup_picture");
const closeButton = document.querySelectorAll(".popup__button-close");
const inputName = document.querySelector(".profile__info-name");
const inputProfession = document.querySelector(".profile__info-profession");
const popupInputName = document.querySelector("#popup-name");
const popupInputProfession = document.querySelector("#popup-profession");
const popupInputPlace = document.querySelector("#popup-place");
const popupInputLink = document.querySelector("#popup-link");
const formSubmitProfile = document.querySelector(".popup__form_profile");
const formSubmitElement = document.querySelector(".popup__form_element");
const addButton = document.querySelector(".profile__button-add");
const popupImage = document.querySelector(".popup__image ");
const popupCaption = document.querySelector(".popup__caption");
const postsElement = document.querySelector(".elements");
const globalPopup = document.querySelectorAll(".popup");
const elementTemplate = document.querySelector("#element-template").content;
const popupContaiener = document.querySelectorAll(".popup__overlay");
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

const createPost = (data) => {
  const postElement = elementTemplate.querySelector(".element").cloneNode(true);
  postElement.querySelector(".element__picture").src = data.link;
  postElement.querySelector(".element__title").textContent = data.name;
  postElement.querySelector(".element__picture").alt = data.name;
  postElement
    .querySelector(".element__like")
    .addEventListener("click", (event) => {
      event.target.classList.toggle("element__like_active");
    });
  postElement
    .querySelector(".element__remove")
    .addEventListener("click", (event) => {
      event.target.closest(".element").remove();
    });
  postElement
    .querySelector(".element__big-picture")
    .addEventListener("click", (event) => {
      popupImage.src = event.target.src;
      popupImage.alt = event.target
        .closest(".element")
        .querySelector(".element__title").textContent;
      popupCaption.textContent = event.target
        .closest(".element")
        .querySelector(".element__title").textContent;
      openPopup(popupPicture);
    });
  return postElement;
};

initialCards.forEach((data) => {
  postsElement.prepend(createPost(data));
});

popupContaiener.forEach((item) =>
  item.addEventListener("mousedown", (evt) => {
    evt.stopPropagation();
  })
);

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  popup.addEventListener("mousedown", (evt) => {
    closePopup(evt.target.closest(".popup"));
  });
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      const popupList = document.querySelectorAll(".popup");
      popupList.forEach((evt) => {
        evt.classList.remove("popup_opened");
      });
    }
  });
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
};

const openProfilePopup = (popup) => {
  openPopup(popup);
  popupInputName.value = inputName.textContent;
  popupInputProfession.value = inputProfession.textContent;
};

function submitProfileForm(evt) {
  evt.preventDefault();
  inputName.textContent = popupInputName.value;
  inputProfession.textContent = popupInputProfession.value;
  closePopup(popupProfile);
}

function submitElementForm(evt) {
  evt.preventDefault();
  postsElement.prepend(
    createPost({ name: popupInputPlace.value, link: popupInputLink.value })
  );
  popupInputLink.value = "";
  popupInputPlace.value = "";
  closePopup(popupElement);
}

formSubmitProfile.addEventListener("submit", submitProfileForm);
formSubmitElement.addEventListener("submit", submitElementForm);
editButton.addEventListener("click", () => {
  openProfilePopup(popupProfile);
});
addButton.addEventListener("click", () => {
  openPopup(popupElement);
});
closeButton.forEach((item) => {
  item.addEventListener("click", (event) => {
    closePopup(event.target.closest(".popup"));
  });
});
