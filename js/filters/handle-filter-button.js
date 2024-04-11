import { renderPictures } from '../picture/render-pictures.js';
import { getRandomElementsFromArray, removeElements } from '../util.js';
import { openPicture } from '../picture/open-picture.js';

const AMOUNT_FOR_RANDOM_FILTER = 10;

const renderDefault = (data) => {
  removeElements('.picture');
  openPicture(renderPictures(data), data);
};

const renderRandom = (data) => {
  removeElements('.picture');
  const randomData = getRandomElementsFromArray(data, AMOUNT_FOR_RANDOM_FILTER);
  openPicture(renderPictures(randomData), randomData);
};

const renderSorted = (data) => {
  removeElements('.picture');
  const sortedData = data.slice().sort((a, b) => b.comments.length - a.comments.length);
  openPicture(renderPictures(sortedData), sortedData);
};

const handleFilterButtonClick = (data, evt) => {
  if (evt.target.id === 'filter-default') {
    renderDefault(data);
  }

  if (evt.target.id === 'filter-random') {
    renderRandom(data);
  }

  if (evt.target.id === 'filter-discussed') {
    renderSorted(data);
  }
};

export { handleFilterButtonClick };
