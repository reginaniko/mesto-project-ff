// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, objConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(objConfig.inputErrorClass);
  errorElement.classList.add(objConfig.errorClass);
  errorElement.textContent = errorMessage;
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, objConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(objConfig.inputErrorClass);
  errorElement.classList.remove(objConfig.errorClass);
  errorElement.textContent = "";
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, objConfig) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      objConfig
    );
  } else {
    hideInputError(formElement, inputElement, objConfig);
  }
};

//Функция откючения кнопки сабмита
const disableSubmitButton = (buttonElement, objConfig) => {
  buttonElement.classList.add(objConfig.inactiveButtonClass);
  buttonElement.disabled = true;
};

//Функция очистки валидации полей при повторном открытии формы
//и деактивации кнопки сабмита
const clearValidation = (formElement, objConfig) => {
  const inputElements = Array.from(
    formElement.querySelectorAll(objConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    objConfig.submitButtonSelector
  );
  disableSubmitButton(buttonElement, objConfig);
  inputElements.forEach((inputElement) => {
    hideInputError(formElement, inputElement, objConfig);
    inputElement.value = "";
  });
};

// Функция добавления обработчиков всем полям формы
const setEventListeners = (formElement, objConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(objConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    objConfig.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, objConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, objConfig);
      toggleButtonState(inputList, buttonElement, objConfig);
    });
  });
};

//Функция добавления обработчиков всем формам страницы
const enableValidation = (objConfig) => {
  const formList = Array.from(
    document.querySelectorAll(objConfig.formSelector)
  );

  formList.forEach((formElement) => {
    setEventListeners(formElement, objConfig);
  });
};

// Функция проверки наличия невалидного поля
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Функция смены состояния кнопки на основе валидности полей ввода
const toggleButtonState = (inputList, buttonElement, objConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(objConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(objConfig.inactiveButtonClass);
  }
};

export { enableValidation, clearValidation };
