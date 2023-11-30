import { openImg } from './modal';
// ---Функция удаления карточки---
const templateElem = document.querySelector('#card-template').content;

function deleteCard(evt) {
  const cardRemove = evt.target.closest('.places__item');
  cardRemove.remove();
}

// ---Функция создания карточки---
function createCard(item, deleteCard) {
  const cardElem = templateElem.querySelector('.places__item').cloneNode(true);

  cardElem.querySelector('.card__image').src = item.link;
  cardElem.querySelector('.card__image').alt = item.name;
  cardElem.querySelector('.card__title').textContent = item.name;

  const deleteCardButton = cardElem.querySelector('.card__delete-button');
  deleteCardButton.addEventListener('click', deleteCard);

  const cardImage = cardElem.querySelector('.card__image');
  cardImage.addEventListener('click', openImg);

  const cardLike = cardElem.querySelector('.card__like-button');
  cardLike.addEventListener('click', () => {
    cardLike.classList.toggle('card__like-button_is-active');
  });

  return cardElem;
}

// ---Функция создания новой карточки---

function createNewCard(title, link) {
  const newCardElem = templateElem.querySelector('.places__item').cloneNode(true);

  newCardElem.querySelector('.card__image').src = link;
  newCardElem.querySelector('.card__image').alt = title;
  newCardElem.querySelector('.card__title').textContent = title;

  newCardElem.querySelector('.card__delete-button').addEventListener('click', deleteCard);

  newCardElem.querySelector('.card__image').addEventListener('click', openImg);

  const cardLike = newCardElem.querySelector('.card__like-button');
  cardLike.addEventListener('click', () => {
    cardLike.classList.toggle('card__like-button_is-active');
  });

  return newCardElem;
}

export { templateElem, deleteCard, createCard, createNewCard };
