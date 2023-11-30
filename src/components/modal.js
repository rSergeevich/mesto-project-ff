// ---Функция открытия попапа карточки---
const popupImage = document.querySelector('.popup_type_image');
const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAddX = popupAdd.querySelector('.popup__close');
const popupEditX = popupEdit.querySelector('.popup__close');

function openImg(evt) {
  const image = popupImage.querySelector('.popup__image');
  const popupImageX = popupImage.querySelector('.popup__close');
  const caption = popupImage.querySelector('.popup__caption');

  const imageSrc = evt.target.src;
  const imageText = evt.target.getAttribute('alt');

  image.src = imageSrc;
  caption.textContent = imageText;

  openModal(popupImage);

  popupImageX.addEventListener('click', () => {
    closeModal(popupImage);
  });
}

function openModal(popup) {
  popup.classList.add('popup_is-animated');

  setTimeout(() => {
    popup.classList.add('popup_is-opened');
    popup.classList.remove('popup_is-animated');
  }, 0);

  document.addEventListener('keydown', closeModalByEsc);
  document.addEventListener('mousedown', closeModalByOverlay);
}

function closeModal(popup) {
  popup.classList.add('popup_is-animated');

  setTimeout(() => {
    popup.classList.remove('popup_is-opened');
  }, 0);

  setTimeout(() => {
    popup.classList.remove('popup_is-animated');
  }, 500);

  document.removeEventListener('keydown', closeModalByEsc);
  document.removeEventListener('mousedown', closeModalByOverlay);
}

function closeModalByOverlay(evt) {
  if (evt.target == popupAdd || evt.target == popupEdit || evt.target == popupImage) {
    closeModal(popupAdd);
    closeModal(popupEdit);
    closeModal(popupImage);
  }
}

function closeModalByEsc(evt) {
  if (evt.key === 'Escape') {
    closeModal(popupAdd);
    closeModal(popupEdit);
    closeModal(popupImage);
  }
}

export {
  popupImage,
  openImg,
  openModal,
  closeModal,
  closeModalByEsc,
  closeModalByOverlay,
  addButton,
  editButton,
  popupAddX,
  popupEditX,
  popupAdd,
  popupEdit
};
