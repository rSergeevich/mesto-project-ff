import { initialCards } from './components/cards.js';
import { deleteCard, createCard, likeCardToggle } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
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

// ---Конфиг---

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

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
const imageProfileElement = document.querySelector('.profile__image');

function handleFormSubmitEdit(evt) {
  evt.preventDefault();

  patchProfile({ name: nameeInput.value, about: jobInput.value })
    .then(data => {
      nameProfileElement.textContent = data.name;
      jobProfileElement.textContent = data.about;
      closeModal(popupEdit);
    })
    .catch(error => console.log(error));

  // nameProfileElement.textContent = nameeInput.value;
  // jobProfileElement.textContent = jobInput.value;

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
const avatarImage = document.querySelector('.profile__image');
const popupAvatar = document.querySelector('.popup_type_avatar');
const popupAvatarX = popupAvatar.querySelector('.popup__close');

avatarImage.addEventListener('click', () => {
  openModal(popupAvatar);

  clearValidation(
    popupAvatar.querySelector(validationConfig.formSelector),
    validationConfig.inputSelector,
    validationConfig.submitButtonSelector,
    validationConfig.inactiveButtonClass,
    validationConfig.inputErrorClass,
    validationConfig.errorClass
  );
});

popupAvatarX.addEventListener('click', () => {
  closeModal(popupAvatar);
});

addButton.addEventListener('click', () => {
  openModal(popupAdd);

  clearValidation(
    popupAdd.querySelector(validationConfig.formSelector),
    validationConfig.inputSelector,
    validationConfig.submitButtonSelector,
    validationConfig.inactiveButtonClass,
    validationConfig.inputErrorClass,
    validationConfig.errorClass
  );
});

popupAddX.addEventListener('click', () => {
  closeModal(popupAdd);
});

editButton.addEventListener('click', () => {
  openModal(popupEdit);

  nameeInput.value = nameProfileElement.textContent;
  jobInput.value = jobProfileElement.textContent;

  clearValidation(
    popupEdit.querySelector(validationConfig.formSelector),
    validationConfig.inputSelector,
    validationConfig.submitButtonSelector,
    validationConfig.inactiveButtonClass,
    validationConfig.inputErrorClass,
    validationConfig.errorClass
  );
});

popupEditX.addEventListener('click', () => {
  closeModal(popupEdit);
});

const popupImageX = popupImage.querySelector('.popup__close');
popupImageX.addEventListener('click', () => {
  closeModal(popupImage);
});

enableValidation(
  validationConfig.formSelector,
  validationConfig.inputSelector,
  validationConfig.submitButtonSelector,
  validationConfig.inactiveButtonClass,
  validationConfig.inputErrorClass,
  validationConfig.errorClass
);

const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-6',
  headers: {
    authorization: '3dc1da83-ee0d-4bed-9320-1010944bf165',
    'Content-Type': 'application/json'
  }
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
}

function getUserData() {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: 'GET',
    headers: apiConfig.headers
  }).then(res => checkResponse(res));
}

function getCards() {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: 'GET',
    headers: apiConfig.headers
  }).then(res => checkResponse(res));
}

function patchProfile(data) {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify(data)
  }).then(res => checkResponse(res));
}

function postNewCard(data) {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify(data)
  }).then(res => checkResponse(res));
}

function cerdDelete(cardId) {
  return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers
  }).then(res => checkResponse(res));
}

function likeCard(Id, method) {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${Id}`, {
    method: method,
    headers: apiConfig.headers
  }).then(res => findError(res));
}

function patchAvatar(url) {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify(url)
  }).then(res => checkResponse(res));
}

Promise.all([getUserData(), getCards()]).then(([data, cardArray]) => {
  nameProfileElement.textContent = data.name;
  jobProfileElement.textContent = data.about;
  imageProfileElement.style.backgroundImage = `url("${data.avatar}")`;

  cardArray.forEach(item => {
    const card = createCard(item, deleteCard, openImg, likeCardToggle);
    addCard(card);
  });
});
