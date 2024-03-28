import { openModal, closeModal } from "./components/modal.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  editProfile,
  postNewCard,
  updateUserAvatarRequest,
  getUserRequest,
  getCardsRequest,
} from "./components/api.js";
import "./pages/index.css";

// DOM узлы
// Главная страница
const cardsContainer = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");
const userAvatar = document.querySelector(".profile__image");

//Окно редактирования профиля
const popupEditProfile = document.querySelector(".popup_type_edit");
const editProfileForm = document.forms["edit-profile"];
const editProfileNameInput = document.querySelector(".popup__input_type_name");
const editProfileJobInput = document.querySelector(
  ".popup__input_type_description"
);

//Окно создания карточки
const popupCreateCard = document.querySelector(".popup_type_new-card");
const createCardForm = document.forms["new-place"];
const createCardNameInput = document.querySelector(
  ".popup__input_type_card-name"
);
const createCardUrlInput = document.querySelector(".popup__input_type_url");

//Окно редактирования аватара пользователя
const popupEditAvatar = document.querySelector(".popup_type_edit_avatar");
const editAvatarForm = document.forms["edit-profile-img"];
const editAvatarUrlInput = editAvatarForm.querySelector(
  ".popup__input_type_url"
);

//Окно с изображением карточки
const popupCardImage = document.querySelector(".popup_type_image");
const cardImagePopupImage = popupCardImage.querySelector(".popup__image");
const cardImagePopupImageCaption =
  popupCardImage.querySelector(".popup__caption");

//Объект конфигурации валидации полей
const objValidationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Вывести карточки на страницу
function renderCards(card, method, ownerId) {
  cardsContainer[method](
    createCard(card, ownerId, deleteCard, likeCard, openImage)
  );
}

//Открытие попапа с картинкой
function openImage(evt) {
  if (evt.target.classList.contains("card__image")) {
    cardImagePopupImage.src = evt.target.src;
    cardImagePopupImageCaption.textContent = cardImagePopupImage.alt =
      evt.target.closest(".card").querySelector(".card__title").textContent;
    openModal(popupCardImage);
  }
}

//Слушатель закрытия попапа нажатием за пределы / нажатием на крестик + добавление анимации попапам
popups.forEach((popup) => {
  addStyle(popup, "popup_is-animated");
  popup.addEventListener("mousedown", function (evt) {
    if (evt.target.classList.contains("popup_is-opened")) {
      closeModal(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closeModal(popup);
    }
  });
});

//Функция добавления стиля элементу
function addStyle(element, style) {
  element.classList.add(style);
}

//Функция получения профиля
const getProfile = () => {
  //Получаем данные пользователя
  getUserRequest().then((userData) => {
    //Получаем ID пользователя
    const currentUserID = userData._id;

    //Обновляем информацию пользователя
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    userAvatar.style.backgroundImage = `url(${userData.avatar})`;

    //Рендерим карточки
    getCardsRequest().then((data) => {
      data.forEach((el) => renderCards(el, "prepend", currentUserID));
    });
  });
};

//Слушатель ввода текста в форму редактирования профиля
profileEditButton.addEventListener("click", function (evt) {
  clearValidation(editProfileForm, objValidationConfig);
  openModal(popupEditProfile);
  editProfileNameInput.value = profileTitle.textContent;
  editProfileJobInput.value = profileDescription.textContent;
});

//Слушатель открытия формы создания карточки
addNewCardButton.addEventListener("click", function () {
  openModal(popupCreateCard);
  clearValidation(createCardForm, objValidationConfig);
});

//Слушатель открытия формы редактирования аватара пользователя
userAvatar.addEventListener("click", () => {
  clearValidation(editAvatarForm, objValidationConfig);
  openModal(popupEditAvatar);
});

//Хэндлер редактирования имени и информации о себе
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const button = editProfileForm.querySelector(".button");
  button.textContent = "Сохранение...";
  const newName = editProfileNameInput.value;
  const newJob = editProfileJobInput.value;
  editProfile(editProfileNameInput.value, editProfileJobInput.value)
    .then(() => {
      profileTitle.textContent = newName;
      profileDescription.textContent = newJob;
      button.textContent = "Сохранить";
      closeModal(popupEditProfile);
    })
    .catch((error) => {
      console.error("Ошибка при сабмите обновления профиля: ", error);
    });
}

//Хэндлер редактирования аватара пользователя
function handleProfileAvatarSubmit(evt) {
  evt.preventDefault();
  editAvatarForm.elements.button.textContent = "Сохранение...";
  updateUserAvatarRequest(editAvatarUrlInput.value)
    .then(() => {
      userAvatar.style.backgroundImage = `url(${editAvatarUrlInput.value})`;
      editAvatarForm.elements.button.textContent = "Сохранить";
      closeModal(popupEditAvatar);
    })
    .catch((error) => {
      console.error("Ошибка при сабмите обновления аватара: ", error);
    });
}

//Хэндлер добавления новой карточки
function handleAddNewCard(evt) {
  evt.preventDefault();
  const button = createCardForm.querySelector(".button");
  button.textContent = "Сохранение...";
  const newName = createCardNameInput.value;
  const newUrl = createCardUrlInput.value;
  const obj = {
    name: newName,
    link: newUrl,
    likes: [],
  };

  postNewCard(obj)
    .then((newCard) => {
      cardsContainer.prepend(
        createCard(newCard, newCard.owner._id, deleteCard, likeCard, openImage)
      );
      button.textContent = "Сохранить";
    })
    .catch((err) => console.log("Ошибка при добавлении новой карточки: ", err));
  closeModal(popupCreateCard);
  evt.target.reset();
}

//Слушатель сабмита формы редактирования профиля
editProfileForm.addEventListener("submit", handleProfileFormSubmit);

//Слушатель сабмита новой карточки
createCardForm.addEventListener("submit", handleAddNewCard);

//Слушатель сабмита обновления аватара
editAvatarForm.addEventListener("submit", handleProfileAvatarSubmit);

enableValidation(objValidationConfig);

getProfile();
