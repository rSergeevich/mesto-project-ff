// const cardTemplate = document.querySelector('#card-template').content;
// const cardContainer = document.querySelector('.places__list');

// initialCards.forEach(function (item) {
//   const cardElem = cardTemplate.cloneNode(true);
//   cardElem.querySelector('card__image').src = item.link;
//   cardElem.querySelector('card__image').alt = item.name;
//   cardElem.querySelector('card__title').textContent = item.name;

//   cardContainer.append(cardElem);
// });

// console.log(initialCards);

const addButton = document.querySelector('.profile__add-button');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const closeAddButton = popupAddNewCard.querySelector('.popup__close');

addButton.addEventListener('click', function openPopup() {
  popupAddNewCard.classList.add('popup_is-opened');
});

closeAddButton.addEventListener('click', function closePopup() {
  popupAddNewCard.classList.remove('popup_is-opened');
});

const containerList = document.querySelector('.places__list');
const savePlaceButton = popupAddNewCard.querySelector('.popup__button');

const nameInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');
const templateElem = document.querySelector('#card-template').content;
const cardElem = templateElem.querySelector('.places__item').cloneNode(true);

savePlaceButton.addEventListener('click', function createCard() {
  cardElem.querySelector('.card__image').alt = nameInput.value;
  cardElem.querySelector('.card__image').src = urlInput.textContent;
  cardElem.querySelector('.card__title').textContent = nameInput.value;

  containerList.append(cardElem);
});

// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
