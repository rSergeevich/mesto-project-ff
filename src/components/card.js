import { cardDelete, likeCard } from './api';

// ---Функция удаления карточки---
const templateElem = document.querySelector('#card-template').content;

// ---Функция создания карточки---
function createCard(cardData, removeCard, userData, openImg, likeCardToggle) {
  const cardElem = templateElem.querySelector('.places__item').cloneNode(true);

  const cardImage = cardElem.querySelector('.card__image');
  const cardTitle = cardElem.querySelector('.card__title');
  const deleteCardButton = cardElem.querySelector('.card__delete-button');
  const likeBtn = cardElem.querySelector('.card__like-button');
  const counter = cardElem.querySelector('.card__like-counter');

  if (cardData.owner._id !== userData._id) {
    cardElem.removeChild(deleteCardButton);
  }

  if (cardData.likes.find(({ _id }) => _id === userData._id)) {
    likeBtn.classList.add('card__like-button_is-active');
  }

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  counter.textContent = cardData.likes.length;
  cardTitle.textContent = cardData.name;

  deleteCardButton.addEventListener('click', () => removeCard(cardElem, cardData._id));

  cardImage.addEventListener('click', openImg);

  const cardLike = cardElem.querySelector('.card__like-button');
  cardLike.addEventListener('click', () => likeCardToggle(likeBtn, cardData, counter));

  return cardElem;
}

function likeCardToggle(likeBtn, cardData, counter) {
  if (!likeBtn.classList.contains('card__like-button_is-active')) {
    likeCard(cardData._id, 'PUT')
      .then(res => {
        counter.textContent = res.likes.length;
        likeBtn.classList.toggle('card__like-button_is-active');
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    likeCard(cardData._id, 'DELETE')
      .then(res => {
        counter.textContent = res.likes.length;
        likeBtn.classList.toggle('card__like-button_is-active');
      })
      .catch(err => {
        console.log(err);
      });
  }
}

function removeCard(card, cardId) {
  cardDelete(cardId)
    .then(res => {
      card.remove();
    })
    .catch(err => {
      console.log(err);
    });
}

// ---Функция создания новой карточки---

export { removeCard, createCard, likeCardToggle };
