const SHOWED_COMMENTS_INTERVAL = 5;
let isHandlerOn = false;

const showMoreComments = (commentList, defaultCounter, button, counter) => {
  let interval = defaultCounter;
  if (commentList.length <= interval) {
    counter.textContent = commentList.length;
    button.classList.add('hidden');
  } else {
    button.classList.remove('hidden');
  }

  if (commentList.length > interval) {
    for (let i = interval; i < commentList.length; i++) {
      commentList[i].classList.add('hidden');
    }
  }

  const ShowMoreCommentsHandler = () => {
    const remainingComments = commentList.length - interval;
    const commentsToShow = Math.min(5, remainingComments);

    for (let j = interval; j < interval + commentsToShow; j++) {
      commentList[j].classList.remove('hidden');
    }
    interval += commentsToShow;
    counter.textContent = interval;

    if (interval >= commentList.length) {
      button.classList.add('hidden');
      interval = SHOWED_COMMENTS_INTERVAL;
      counter.textContent = commentList.length;
    }
    isHandlerOn = true;
  };

  if (!isHandlerOn) {
    button.addEventListener('click', ShowMoreCommentsHandler);
  }
};

export { showMoreComments, SHOWED_COMMENTS_INTERVAL };
