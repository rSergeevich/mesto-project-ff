import { initialCards } from './components/cards.js';
import { deleteCard, createCard, createNewCard } from './components/card.js';
import {
  openModal,
  closeModal,
  addButton,
  editButton,
  popupAddX,
  popupEditX,
  popupAdd,
  popupEdit
} from './components/modal.js';
import './pages/index.css';

// ---Темплейт карточки---
const cardContainer = document.querySelector('.places__list');

// ---функция вставки карточек---

function addCard(item) {
  cardContainer.append(item);
}
// ---Вывод на карточек из массива на страницу---

initialCards.forEach(function (item) {
  addCard(createCard(item, deleteCard));
});

// ---Функция добавления новой карточки на страницу---

const formElementAdd = document.forms[1];
const titleInput = formElementAdd.place;
const srcInput = formElementAdd.link;

formElementAdd.addEventListener('submit', function (evt) {
  evt.preventDefault();

  cardContainer.prepend(createNewCard(titleInput.value, srcInput.value));

  closeModal(popupAdd);
  titleInput.value = '';
  srcInput.value = '';
});
popupAddX;
// ---Функция Редактирования профиля---

const formElement = document.forms[0];
const nameeInput = formElement.namee;
const jobInput = formElement.description;
const nameProfileElement = document.querySelector('.profile__title');
const jobProfileElement = document.querySelector('.profile__description');

function handleFormSubmit(evt) {
  evt.preventDefault();

  nameProfileElement.textContent = nameeInput.value;
  jobProfileElement.textContent = jobInput.value;

  closeModal(popupEdit);

  jobInput.value = '';
  nameeInput.value = '';
}

formElement.addEventListener('submit', handleFormSubmit);

// ---Навесили слушатели на формы---

addButton.addEventListener('click', () => {
  openModal(popupAdd);
});

popupAddX.addEventListener('click', () => {
  closeModal(popupAdd);
});

editButton.addEventListener('click', () => {
  openModal(popupEdit);
});

popupEditX.addEventListener('click', () => {
  closeModal(popupEdit);
});
