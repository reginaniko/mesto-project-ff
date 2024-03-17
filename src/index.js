import { initialCards } from "./components/cards.js";
import { openModal, closeModal } from "./components/modal.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import "./pages/index.css";

// DOM узлы
const cardsContainer = document.querySelector(".places__list");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popups = document.querySelectorAll(".popup");
const popupEditProfile = document.querySelector(".popup_type_edit");
const formElement = popupEditProfile.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const editProfileForm = document.forms["edit-profile"];
const editProfileFormNameInput = editProfileForm.elements.name;
const editProfileFormDescriptionInput = editProfileForm.elements.description;
const editProfileFormSaveButton = document.querySelector(".popup__button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupCardImage = document.querySelector(".popup_type_image");
const popupCloseButton = document.querySelector(".popup__close");
const profileAddButton = document.querySelector(".profile__add-button");
const popupImage = popupCardImage.querySelector(".popup__image");
const popupImageCaption = popupCardImage.querySelector(".popup__caption");
const createCardPopup = document.querySelector(".popup_type_new-card");
const createCardForm = document.querySelector('[name="new-place"]');
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardUrlInput = document.querySelector(".popup__input_type_url");

// Вывести карточки на страницу
function renderCards(cardsArray) {
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
    cardsContainer.append(newCard);
  });
}

//Открытие попапа с картинкой
function openImage(evt) {
  if (evt.target.classList.contains("card__image")) {
    popupImage.src = evt.target.src;
    popupImageCaption.textContent = evt.target
      .closest(".card")
      .querySelector(".card__title").textContent;
    openModal(popupCardImage);
  }
}

//Слушатель закрытия попапа нажатием за пределы
popups.forEach((popup) => {
  popup.addEventListener("click", function (evt) {
    if (
      !evt.target.matches(
        ".popup__content, .popup__input, .popup__image, .button"
      )
    ) {
      console.log("ЧТО ПРОИЗОШЛО", evt);
      closeModal(popup);
    }
  });
});

//Слушатель ввода текста в форму редактирования профиля
profileEditButton.addEventListener("click", function (evt) {
  openModal(popupEditProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

//Слушатель открытия формы создания карточки
profileAddButton.addEventListener("click", function () {
  openModal(popupNewCard);
});

//Хэндлер редактирования имени и информации о себе
function handleFormSubmit(evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newJob = jobInput.value;
  profileTitle.textContent = newName;
  profileDescription.textContent = newJob;
  closeModal(popupEditProfile);
}

//Хэндлер добавления новой карточки
function handleAddNewCard(evt) {
  evt.preventDefault();

  const newName = cardNameInput.value;
  const newUrl = cardUrlInput.value;
  const newCard = createCard(newName, newUrl, deleteCard, likeCard, openImage);

  cardsContainer.prepend(newCard);
  closeModal(createCardPopup);
  evt.target.reset();
}

//Слушатель сабмита формы редактирования профиля
formElement.addEventListener("submit", handleFormSubmit);

//Слушатель сабмита новой карточки
createCardForm.addEventListener("submit", handleAddNewCard);

renderCards(initialCards);