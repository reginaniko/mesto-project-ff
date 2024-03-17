export { createCard, deleteCard, likeCard };

// Функция создания карточки
function createCard(
  name,
  link,
  deleteFunction,
  likeFunction,
  openImageFunction
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = "Фотография места: " + name;
  deleteButton.addEventListener("click", deleteFunction);
  likeButton.addEventListener("click", likeFunction);
  cardImage.addEventListener("click", openImageFunction);

  return cardElement;
}

// Функция удаления карточки
function deleteCard(event) {
  const cardDeleteButton = event.target;
  const cardItem = cardDeleteButton.closest(".places__item");
  cardItem.remove();
}

//Функция лайка карточки
function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
