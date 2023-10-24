// @todo: Темплейт карточки
const cardContainer = document.querySelector('.places__list');
const templateElem = document.querySelector('#card-template').content;

// @todo: Функция удаления карточки
function deleteCard(event) {
  const cardRemove = event.target.closest('.places__item');
  cardRemove.remove();
}
// @todo: Функция создания карточки
function createCard(item, deleteCard) {
  const cardElem = templateElem.querySelector('.places__item').cloneNode(true);

  cardElem.querySelector('.card__image').src = item.link;
  cardElem.querySelector('.card__image').alt = item.name;
  cardElem.querySelector('.card__title').textContent = item.name;

  const deleteCardButton = cardElem.querySelector('.card__delete-button');
  deleteCardButton.addEventListener('click', deleteCard);

  return cardElem;
}

// @todo: функция вставки карточки на страниц

function addCard(item) {
  cardContainer.append(item);
}

// @todo: Вывести карточки на страницу, используем цикл forEach

initialCards.forEach(function (item) {
  addCard(createCard(item, deleteCard));
});
