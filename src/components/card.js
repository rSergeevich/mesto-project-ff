// ---Функция удаления карточки---
const templateElem = document.querySelector('#card-template').content;

function deleteCard(evt) {
  const cardRemove = evt.target.closest('.places__item');
  cardRemove.remove();
}

function likeCardToggle(evt) {
  const cardLike = evt.target.closest('.card__like-button');
  cardLike.classList.toggle('card__like-button_is-active');
}

// ---Функция создания карточки---
function createCard(cardData, deleteCard, openImg, likeCardToggle) {
  const cardElem = templateElem.querySelector('.places__item').cloneNode(true);

  const cardImage = cardElem.querySelector('.card__image');
  const cardTitle = cardElem.querySelector('.card__title');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  const deleteCardButton = cardElem.querySelector('.card__delete-button');
  deleteCardButton.addEventListener('click', deleteCard);

  cardImage.addEventListener('click', openImg);

  const cardLike = cardElem.querySelector('.card__like-button');
  cardLike.addEventListener('click', likeCardToggle);

  return cardElem;
}

// ---Функция создания новой карточки---

export { deleteCard, createCard, likeCardToggle };
