//Функция открытия попапа
function openModal(el) {
  el.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEsc);
}

//Функция закрытия попапа
function closeModal(el) {
  el.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEsc);
}

//Функция закрытия попапа кликом на Esc
function closeByEsc(evt) {
  if (evt.code === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

export { openModal, closeModal, closeByEsc };
