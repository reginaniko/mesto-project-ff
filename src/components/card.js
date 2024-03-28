import {
  deleteCardRequest,
  likeCardRequest,
  deleteLikeCardRequest,
} from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;

// Функция клонирования темплейта карточки
function getCardTemplate() {
  return cardTemplate.querySelector(".places__item").cloneNode(true);
}

// Функция создания карточки
function createCard(
  objCard,
  currentUserId,
  deleteFunction,
  likeFunction,
  openImageFunction
) {
  const cardElement = getCardTemplate();
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count");

  cardTitle.textContent = objCard.name;
  cardImage.src = objCard.link;
  cardImage.alt = "Фотография места: " + objCard.name;
  likeCount.textContent = objCard.likes.length;
  cardImage.addEventListener("click", openImageFunction);

  //Проверка на лайки юзером и обновление счетчика лайков
  const currentUserLiked = objCard.likes.some(
    (like) => like._id === currentUserId
  );
  if (currentUserLiked) {
    likeFunction({ target: likeButton });
  }

  likeButton.addEventListener("click", () => {
    if (likeButton.classList.contains("card__like-button_is-active")) {
      deleteLikeCardRequest(objCard._id)
        .then((res) => {
          likeFunction({ target: likeButton });
          likeCount.textContent = res.likes.length;
        })
        .catch((error) => {
          console.error("Ошибка при удалении лайка:", error);
        });
    } else {
      likeCardRequest(objCard._id)
        .then((res) => {
          likeFunction({ target: likeButton });
          likeCount.textContent = res.likes.length;
        })
        .catch((error) => {
          console.error("Ошибка при лайке:", error);
        });
    }
  });

  // Проверка на автора карточки для отображения кнопки удаления
  if (objCard.owner._id === currentUserId) {
    deleteButton.addEventListener("click", (event) => {
      deleteFunction(event, objCard._id);
    });
  } else {
    deleteButton.remove();
  }

  return cardElement;
}

// Функция удаления карточки
function deleteCard(event, cardId) {
  const cardDeleteButton = event.target;
  const cardItem = cardDeleteButton.closest(".places__item");
  deleteCardRequest(cardId).then(() => {
    cardItem.remove();
  });
}

// Функция лайка карточки
function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeCard };
