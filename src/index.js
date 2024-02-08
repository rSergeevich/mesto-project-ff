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

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  inputElement.classList.add('popup__error_visible');
}
showInputError();

// function showInputError(form, input, errorMessage) {
//   const errorElement = form.querySelector(`.${input.id}-error`);
//   input.classList.add('popup__input_type_error');
//   errorElement.textContent = errorMessage;
// }

// function hideInputError(form, input) {
//   const errorElement = form.querySelector(`.${input.id}-error`);
//   // console.log(errorElement);
//   input.classList.remove('popup__input_type_error');
//   errorElement.textContent = '';
// }

// function checkInputValidaty(form, input) {
//   if (!input.validity.valid) {
//     showInputError(form, input, input.validationMessage);
//   } else {
//     hideInputError(form, input);
//   }
// }

// function setEventListeners(form) {
//   const inputList = Array.from(document.querySelectorAll('.popup__input'));

//   inputList.forEach(input => {
//     input.addEventListener('input', function () {
//       checkInputValidaty(form, input);
//     });
//   });
// }

// function goValidation() {
//   const formList = Array.from(document.querySelectorAll('.popup__form'));

//   formList.forEach(form => {
//     form.addEventListener('submit', function (evt) {
//       evt.preventDefault();
//     });
//   });

//   formList.forEach(form => {
//     setEventListeners(form);
//   });
// }

// goValidation();
