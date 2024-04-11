import { openUploadPicture } from './form/form-modal.js';
import { closeUploadPictureHandler } from './form/form-modal.js';
import { getData } from './api/get-data.js';
import { setPictureFormSubmit } from './form/form-validate.js';
import { openPicture } from './picture/open-picture.js';
import { renderPictures } from './picture/render-pictures.js';
import { changeFilterForPreview, filterButtons } from './filters/filters.js';


openUploadPicture();
setPictureFormSubmit(closeUploadPictureHandler);
getData().then((data) => {
  openPicture(renderPictures(data), data);
  changeFilterForPreview(filterButtons, data);
});
