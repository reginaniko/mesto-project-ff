const authConfig = {
  baseURL: "https://nomoreparties.co/v1/wff-cohort-9",
  headers: {
    authorization: "f17e78ba-e2f9-4d36-87d8-8eea624a98c7",
    "Content-Type": "application/json",
  },
};

const handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  };
  
//Редактирование данных пользователя
const editProfile = (nameValue, aboutValue) => {
  return fetch(`${authConfig.baseURL}/users/me`, {
    method: "PATCH",
    headers: authConfig.headers,
    body: JSON.stringify({
      name: nameValue,
      about: aboutValue,
    }),
  }).then(handleResponse);
};

//Запрос на добавление карочки
const postNewCard = (obj) => {
  return fetch(`${authConfig.baseURL}/cards`, {
    method: "POST",
    headers: authConfig.headers,
    body: JSON.stringify(obj),
  }).then(handleResponse);
};

//Запрос удаления карточки
const deleteCardRequest = (cardId) => {
  return fetch(`${authConfig.baseURL}/cards/${cardId} `, {
    method: "DELETE",
    headers: authConfig.headers,
  }).then(handleResponse);
};

//Запрос на постановку лайка на карточке
const likeCardRequest = (cardId) => {
  return fetch(`${authConfig.baseURL}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: authConfig.headers,
  }).then(handleResponse);
};

//Запрос на удаление лайка на карточке
const deleteLikeCardRequest = (cardId) => {
  return fetch(`${authConfig.baseURL}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: authConfig.headers,
  }).then(handleResponse);
};

//Запрос обновления аватара пользователя
const updateUserAvatarRequest = (imgUrl) => {
  return fetch(`${authConfig.baseURL}/users/me/avatar`, {
    method: "PATCH",
    headers: authConfig.headers,
    body: JSON.stringify({
      avatar: imgUrl,
    }),
  }).then(handleResponse);
};

//Запрос загрузки профиля
const getUserRequest = () => {
  return fetch(`${authConfig.baseURL}/users/me`, {
    method: "GET",
    headers: authConfig.headers,
  }).then(handleResponse);
};

//Запрос получения карточек
const getCardsRequest = () => {
  return fetch(`${authConfig.baseURL}/cards`, {
    method: "GET",
    headers: authConfig.headers,
  }).then(handleResponse);
};

export {
  editProfile,
  postNewCard,
  deleteCardRequest,
  likeCardRequest,
  deleteLikeCardRequest,
  updateUserAvatarRequest,
  getUserRequest,
  getCardsRequest,
};
