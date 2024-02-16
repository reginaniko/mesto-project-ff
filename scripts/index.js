// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// DOM узлы
const cardsContainer = document.querySelector(".places__list");

// Функция создания карточки
function createCard(name, link, deleteFunction) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = "Фотография места: " + name;
  deleteButton.addEventListener("click", deleteFunction);

  return cardElement;
}

// Функция удаления карточки
function deleteCard(event) {
  const cardDeleteButton = event.target;
  const cardItem = cardDeleteButton.closest(".places__item");
  cardItem.remove();
}

// Вывести карточки на страницу
function renderCards(cardsArray) {
  if (!Array.isArray(cardsArray)) {
    console.log("Invalid cards array provided.");
    return;
  }

  cardsArray.forEach((card) => {
    const newCard = createCard(card.name, card.link, deleteCard);
    cardsContainer.append(newCard);
  });
}

renderCards(initialCards);
