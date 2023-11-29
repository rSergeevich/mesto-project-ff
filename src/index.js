import { initialCards } from './cards.js';
import './pages/index.css';

// @todo: Темплейт карточки
const cardContainer = document.querySelector('.places__list');
const templateElem = document.querySelector('#card-template').content;

// @todo: Функция удаления карточки
function deleteCard(evt) {
  const cardRemove = evt.target.closest('.places__item');
  cardRemove.remove();
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    console.log('я нашел ескейп');
  }
  document.removeEventListener('keydown', closePopupEsc);
}

function openImage(evt) {
  const popupImage = document.querySelector('.popup_type_image');
  const image = popupImage.querySelector('.popup__image');
  const caption = popupImage.querySelector('.popup__caption');

  const imageSrc = evt.target.src;
  const imageText = evt.target.getAttribute('alt');

  image.src = imageSrc;
  caption.textContent = imageText;

  popupImage.classList.add('popup_is-opened');

  const closeButtonImage = popupImage.querySelector('.popup__close');

  closeButtonImage.addEventListener('click', function closeImagePopup() {
    popupImage.classList.remove('popup_is-opened');
  });
  popupImage.addEventListener('click', function (evt) {
    if (evt.currentTarget === evt.target) {
      popupImage.classList.remove('popup_is-opened');
    }
  });
  document.addEventListener('keydown', closePopupEsc);
}
// @todo: Функция создания карточки
function createCard(item, deleteCard, openImage) {
  const cardElem = templateElem.querySelector('.places__item').cloneNode(true);

  cardElem.querySelector('.card__image').src = item.link;
  cardElem.querySelector('.card__image').alt = item.name;
  cardElem.querySelector('.card__title').textContent = item.name;

  const deleteCardButton = cardElem.querySelector('.card__delete-button');
  deleteCardButton.addEventListener('click', deleteCard);

  const cardImage = cardElem.querySelector('.card__image');
  cardImage.addEventListener('click', openImage);

  return cardElem;
}

// @todo: функция вставки карточки на страниц

function addCard(item) {
  cardContainer.append(item);
}

// @todo: Вывести карточки на страницу, используем цикл forEach

initialCards.forEach(function (item) {
  addCard(createCard(item, deleteCard, openImage));
});

const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');

function openPopup() {
  function openPopup() {
  const popup = document.querySelectorAll('.popup');
  const closeButton = popup.querySelector('.popup__close');
  closeButton.addEventListener('click', closePopup);
  popup.classList.add('popup_is-opened');
}

addButton.addEventListener('click', openPopup);

editButton.addEventListener('click', openPopup);

// popupAddNewCard.addEventListener('click', function (evt) {
//   if (evt.currentTarget === evt.target) {
//     popupAddNewCard.classList.remove('popup_is-opened');
//   }
// });

// popupEditProfile.addEventListener('click', function (evt) {
//   if (evt.currentTarget === evt.target) {
//     popupEditProfile.classList.remove('popup_is-opened');
//   }
// });
