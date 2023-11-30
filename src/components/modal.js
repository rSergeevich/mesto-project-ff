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
  if (evt.target.classList.contains('popup')) {
    closeModal(evt.target);
  }
}

function closeModalByEsc(evt) {
  if (evt.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  }
}

export { openModal, closeModal, closeModalByEsc, closeModalByOverlay };
