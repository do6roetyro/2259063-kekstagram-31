import { debounce } from '../util.js';
import { handleFilterButtonClick } from './handle-filter-button.js';

const RERENDER_DELAY = 500;
const filtersWrapper = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');

const showFiltersForPreviewPanel = () => {
  filtersWrapper.classList.remove('img-filters--inactive');
};

const debounceHandleFilterButtonClick = debounce(handleFilterButtonClick, RERENDER_DELAY);

const checkActiveButton = (buttons, evt) => {
  buttons.forEach((filterButton) => {
    filterButton.classList.remove('img-filters__button--active');
  });
  evt.target.classList.add('img-filters__button--active');
};

const changeFilterForPreview = (buttons, data) => {
  buttons.forEach((button) => {
    button.addEventListener('click', (evt) => {
      checkActiveButton(buttons, evt);
      debounceHandleFilterButtonClick(data, evt);
    });
  });
};

export { showFiltersForPreviewPanel, changeFilterForPreview, filterButtons };
