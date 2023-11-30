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
