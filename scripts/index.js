// @todo: Темплейт карточки
const cardContainer = document.querySelector('.places__list');
const templateElem = document.querySelector('#card-template').content;

initialCards.forEach(function createCard(item) {
  const cardElem = templateElem.cloneNode(true);

  const deleteCardButton = cardElem.querySelector('.card__delete-button');

  deleteCardButton.addEventListener('click', function () {
    const cardItem = deleteCardButton.closest('.places__item');
    cardItem.remove();
  });

  cardElem.querySelector('.card__image').src = item.link;
  cardElem.querySelector('.card__image').alt = item.name;
  cardElem.querySelector('.card__title').textContent = item.name;

  cardContainer.append(cardElem);
});

const addButton = document.querySelector('.profile__add-button');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const closeAddButton = popupAddNewCard.querySelector('.popup__close');

addButton.addEventListener('click', function openPopup() {
  popupAddNewCard.classList.add('popup_is-opened');
});

closeAddButton.addEventListener('click', function closePopup() {
  popupAddNewCard.classList.remove('popup_is-opened');
});

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
