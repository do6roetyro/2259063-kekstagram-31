import { modalBigPicture, openModalBigPicture } from './picture-modal.js';
import { renderComments } from '../comment/render-comments.js';
import { showMoreComments, SHOWED_COMMENTS_INTERVAL } from '../comment/show-more-comments.js';

const bigPicturePreviev = modalBigPicture.querySelector('.big-picture__preview');
const commentsList = bigPicturePreviev.querySelector('.social__comments');
const commentsMoreButton = bigPicturePreviev.querySelector('.comments-loader');
commentsMoreButton.classList.add('hidden');
const commentsShowCount = bigPicturePreviev.querySelector('.social__comment-shown-count');

const openPicture = (gallery, dataArr) => {
  gallery = gallery.querySelectorAll('.picture');
  gallery.forEach((thumbnail, index) => {
    const imageData = dataArr[index];
    const thumbnailUrl = imageData.url;
    const thumbnailAlt = imageData.description;
    const thumbnailComments = imageData.comments.length;
    const thumbnailLikes = imageData.likes;

    // обработчик на клик по миниатюре
    thumbnail.addEventListener('click', () => {
      openModalBigPicture();
      const defaultCounter = SHOWED_COMMENTS_INTERVAL;
      const bigPictureImage = bigPicturePreviev.querySelector('.big-picture__img img');
      const bigPictureLikesCount = bigPicturePreviev.querySelector('.likes-count');
      const bigPictureCommentsCount = bigPicturePreviev.querySelector('.social__comment-total-count');
      const bigPictureDescription = bigPicturePreviev.querySelector('.social__caption');

      bigPictureImage.src = thumbnailUrl;
      bigPictureImage.alt = thumbnailAlt;
      bigPictureLikesCount.textContent = thumbnailLikes;
      bigPictureCommentsCount.textContent = thumbnailComments;
      bigPictureDescription.textContent = thumbnailAlt;

      const userComments = renderComments(dataArr, index, commentsList).children;

      showMoreComments(userComments, defaultCounter, commentsMoreButton, commentsShowCount);
    });
  });
};

export { commentsShowCount, commentsMoreButton, openPicture, bigPicturePreviev, commentsList, };
