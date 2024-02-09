import { initialCards } from './components/cards.js';
import { deleteCard, createCard, likeCardToggle } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import './pages/index.css';

// ---Темплейт карточки---
const cardContainer = document.querySelector('.places__list');

// ---функция вставки карточек---

function addCard(item) {
  cardContainer.append(item);
}
// ---Вывод на карточек из массива на страницу---

initialCards.forEach(function (item) {
  addCard(createCard(item, deleteCard, openImg, likeCardToggle));
});

// ---Функция добавления новой карточки на страницу---

const formElementAdd = document.forms.new_place;
const titleInput = formElementAdd.place;
const srcInput = formElementAdd.link;

function openImg(evt) {
  const image = popupImage.querySelector('.popup__image');
  const caption = popupImage.querySelector('.popup__caption');

  const imageSrc = evt.target.src;
  const imageText = evt.target.getAttribute('alt');

  image.src = imageSrc;
  image.alt = imageText;
  caption.textContent = imageText;

  openModal(popupImage);
}

formElementAdd.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const newCardData = {
    name: titleInput.value,
    link: srcInput.value
  };

  cardContainer.prepend(createCard(newCardData, deleteCard, openImg, likeCardToggle));

  closeModal(popupAdd);
  formElementAdd.reset();
});

// ---Функция Редактирования профиля---

const formElementEdit = document.edit_profile;
const nameeInput = formElementEdit.namee;
const jobInput = formElementEdit.description;
const nameProfileElement = document.querySelector('.profile__title');
const jobProfileElement = document.querySelector('.profile__description');

function handleFormSubmitEdit(evt) {
  evt.preventDefault();

  nameProfileElement.textContent = nameeInput.value;
  jobProfileElement.textContent = jobInput.value;

  closeModal(popupEdit);

  formElementEdit.reset();
}

formElementEdit.addEventListener('submit', handleFormSubmitEdit);

// ---Навесили слушатели на формы---

const popupImage = document.querySelector('.popup_type_image');
const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAddX = popupAdd.querySelector('.popup__close');
const popupEditX = popupEdit.querySelector('.popup__close');

addButton.addEventListener('click', () => {
  openModal(popupAdd);
});

popupAddX.addEventListener('click', () => {
  closeModal(popupAdd);
});

editButton.addEventListener('click', () => {
  openModal(popupEdit);

  nameeInput.value = nameProfileElement.textContent;
  jobInput.value = jobProfileElement.textContent;
});

popupEditX.addEventListener('click', () => {
  closeModal(popupEdit);
});

const popupImageX = popupImage.querySelector('.popup__close');
popupImageX.addEventListener('click', () => {
  closeModal(popupImage);
});
// валидация

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

function hasInvalidInput(inputList) {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
}

function showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(inputErrorClass);
}

function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
  inputElement.classList.remove(inputErrorClass);
}

function checkInputValidity(formElement, inputElement, inputErrorClass, errorClass, errorMessage) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}

function toggleButtonState(inputList, submitButtonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    submitButtonElement.disabled = true;
    submitButtonElement.classList.add(inactiveButtonClass);
  } else {
    submitButtonElement.disabled = false;
    submitButtonElement.classList.remove(inactiveButtonClass);
  }
}

function setEventListeners(
  formElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
) {
  const inputList = Array.from(document.querySelectorAll(inputSelector));
  const submitButtonElement = document.querySelector(submitButtonSelector);

  toggleButtonState(inputList, submitButtonElement, inactiveButtonClass);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formSelector, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, submitButtonElement, inactiveButtonClass);
    });
  });
}

function enableValidation(
  formElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
) {
  const formList = Array.from(document.querySelectorAll(formElement));

  formList.forEach(form => {
    form.addEventListener('submit', evt => {
      evt.preventDefault();
    });
  });

  setEventListeners(
    formElement,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
  );
}

enableValidation(
  validationConfig.formSelector,
  validationConfig.inputSelector,
  validationConfig.submitButtonSelector,
  validationConfig.inactiveButtonClass,
  validationConfig.inputErrorClass,
  validationConfig.errorClass
);

addButton.classList.add(validationConfig.inactiveButtonClass);
