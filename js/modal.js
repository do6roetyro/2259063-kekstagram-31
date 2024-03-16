import { commentsShowCount, commentsList } from './picture/open-picture';

const modalBigPicture = document.querySelector('.big-picture');
const modalCloseButton = modalBigPicture.querySelector('.cancel');

const openModal = () => {
  modalBigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', keyDownHandler);

  if (commentsList.length < 5) {
    commentsShowCount.textContent = commentsList.length;
  } else {
    commentsShowCount.textContent = 5;
  }
};

const closeModal = () => {
  commentsList.innerHTML = '';
  modalBigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', keyDownHandler);
};

function keyDownHandler(evt) {
  if (evt.key === 'Escape') {
    closeModal();
  }
}

modalCloseButton.addEventListener('click', closeModal);

export { modalBigPicture, openModal, closeModal, keyDownHandler };
