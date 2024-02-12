import { initialCards } from './components/cards.js';
import { removeCard, createCard, likeCardToggle } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import {
  getCards,
  getUserData,
  patchProfile,
  postNewCard,
  cardDelete,
  likeCard,
  patchAvatar
} from './components/api.js';
import './pages/index.css';

// ---Темплейт карточки---
const cardContainer = document.querySelector('.places__list');

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
const addSubmit = formElementAdd.querySelector('.popup__button');
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

// функция добавления новой карточки

formElementAdd.addEventListener('submit', function (evt) {
  evt.preventDefault();

  const classicText = 'Сохранить';
  loadingProcess(addSubmit, 'Сохранение...');

  postNewCard({ name: titleInput.value, link: srcInput.value })
    .then(cardData => {
      const card = createCard(cardData, removeCard, cardData.owner, openImg, likeCardToggle);
      cardContainer.prepend(card);
      closeModal(popupAdd);
      titleInput.value = '';
      srcInput.value = '';
    })
    .catch(err => {
      console.log(err);
    })
    .finally(res => {
      loadingProcess(addSubmit, classicText);
    });

  formElementAdd.reset();
});

// ---Функция Редактирования профиля---

const formElementEdit = document.edit_profile;
const editSubmit = formElementEdit.querySelector('.popup__button');
const nameeInput = formElementEdit.namee;
const jobInput = formElementEdit.description;
const nameProfileElement = document.querySelector('.profile__title');
const jobProfileElement = document.querySelector('.profile__description');
const imageProfileElement = document.querySelector('.profile__image');

function handleFormSubmitEdit(evt) {
  evt.preventDefault();

  const classicText = 'Сохранить';
  loadingProcess(editSubmit, 'Сохранение...');

  patchProfile({ name: nameeInput.value, about: jobInput.value })
    .then(data => {
      nameProfileElement.textContent = data.name;
      jobProfileElement.textContent = data.about;
      closeModal(popupEdit);
    })
    .catch(error => console.log(error))
    .finally(res => {
      loadingProcess(editSubmit, classicText);
    });

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
const avatarSubmit = popupAvatar.querySelector('.popup__button_type_avatar');
const avatarInput = popupAvatar.querySelector('.popup__input_type_url');
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

function AvatarEdit(evt) {
  evt.preventDefault();

  const classicText = 'Сохранить';
  loadingProcess(avatarSubmit, 'Сохранение...');

  patchAvatar({ avatar: avatarInput.value })
    .then(data => {
      avatarImage.style.backgroundImage = `url('${data.avatar}')`;
      avatarInput.value = '';
    })
    .catch(err => {
      console.log(err);
    })
    .finally(res => {
      loadingProcess(avatarSubmit, classicText);
    });
  closeModal(popupAvatar);
}

function loadingProcess(button, textStr) {
  button.textContent = textStr;
}

avatarSubmit.addEventListener('click', AvatarEdit);

Promise.all([getUserData(), getCards()]).then(([data, cardArray]) => {
  nameProfileElement.textContent = data.name;
  jobProfileElement.textContent = data.about;
  imageProfileElement.style.backgroundImage = `url("${data.avatar}")`;

  cardArray.forEach(item => {
    const card = createCard(item, removeCard, data, openImg, likeCardToggle);
    cardContainer.append(card);
  });
});
