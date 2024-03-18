import { initialCards } from "./components/cards.js";
import { openModal, closeModal } from "./components/modal.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import "./pages/index.css";

// DOM узлы
// Главная страница
const cardsContainer = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");

//Окно редактирования профиля
const popupEditProfile = document.querySelector(".popup_type_edit");
const editProfileForm = document.forms["edit-profile"];
const editProfileNameInput = document.querySelector(".popup__input_type_name");
const editProfileJobInput = document.querySelector(".popup__input_type_description");

//Окно создания карточки
const popupCreateCard = document.querySelector(".popup_type_new-card");
const createCardForm = document.forms["new-place"];
const createCardNameInput = document.querySelector(".popup__input_type_card-name");
const createCardUrlInput = document.querySelector(".popup__input_type_url");

//Окно с изображением карточки
const popupCardImage = document.querySelector(".popup_type_image");
const cardImagePopupImage = popupCardImage.querySelector(".popup__image");
const cardImagePopupImageCaption =
  popupCardImage.querySelector(".popup__caption");

// Вывести карточки на страницу
function renderCards(cardsArray, method) {
  if (!Array.isArray(cardsArray)) {
    console.log("Invalid cards array provided.");
    return;
  }

  cardsArray.forEach((card) => {
    const newCard = createCard(
      card.name,
      card.link,
      deleteCard,
      likeCard,
      openImage
    );
    cardsContainer[method](newCard);
  });
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

//Слушатель ввода текста в форму редактирования профиля
profileEditButton.addEventListener("click", function (evt) {
  openModal(popupEditProfile);
  editProfileNameInput.value = profileTitle.textContent;
  editProfileJobInput.value = profileDescription.textContent;
});

//Слушатель открытия формы создания карточки
addNewCardButton.addEventListener("click", function () {
  openModal(popupCreateCard);
});

//Хэндлер редактирования имени и информации о себе
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const newName = editProfileNameInput.value;
  const newJob = editProfileJobInput.value;
  profileTitle.textContent = newName;
  profileDescription.textContent = newJob;
  closeModal(popupEditProfile);
}

//Хэндлер добавления новой карточки
function handleAddNewCard(evt) {
  evt.preventDefault();
  const newName = createCardNameInput.value;
  const newUrl = createCardUrlInput.value;
  const newCard = createCard(newName, newUrl, deleteCard, likeCard, openImage);
  cardsContainer.prepend(newCard);
  closeModal(popupCreateCard);
  evt.target.reset();
}

//Слушатель сабмита формы редактирования профиля
editProfileForm.addEventListener("submit", handleProfileFormSubmit);

//Слушатель сабмита новой карточки
createCardForm.addEventListener("submit", handleAddNewCard);

renderCards(initialCards, "append");
