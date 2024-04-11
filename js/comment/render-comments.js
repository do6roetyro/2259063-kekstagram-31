import { createCommentsList } from '../comment/create-comments-list.js';

const renderComments = (dataArr, index, commentsLayout) => {
  const commentsData = dataArr[index].comments;
  commentsLayout.append(createCommentsList(commentsData));

  return commentsLayout;
};

export { renderComments };
