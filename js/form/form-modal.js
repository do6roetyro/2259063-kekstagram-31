import { removeScaleEventHandlers, addScaleEventHandlers } from './form-scale.js';
import { addEffectFieldsetEventHandler, removeEffectFieldsetEventHandler, resetEffectSlider } from './form-effects-slider.js';
import { uploadForm, pristine } from './form-validate.js';
import { uploadPicture} from './form-upload-picture.js';


const uploadPictureInput = document.querySelector('.img-upload__input');
const uploadPictureOverlay = document.querySelector('.img-upload__overlay');
const uploadOverlaycloseButton = uploadPictureOverlay.querySelector('.img-upload__cancel');
const uploadPicturePreviev = document.querySelector('.img-upload__preview img');
const uploadEffectsPreviev = document.querySelectorAll('.effects__preview');

let isValidateMessageShown = false;

const uploadPictureHandler = () => {
  uploadPictureOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', uploadPictureKeyDownHandler);
  addScaleEventHandlers();
  addEffectFieldsetEventHandler();
  uploadPicture(uploadPictureInput, uploadPicturePreviev, uploadEffectsPreviev);
};

const closeUploadPictureHandler = () => {
  uploadPictureOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', uploadPictureKeyDownHandler);
  removeScaleEventHandlers();
  removeEffectFieldsetEventHandler();
  resetEffectSlider();
  uploadForm.reset();
  pristine.reset();
};

function uploadPictureKeyDownHandler(evt) {
  if (evt.key === 'Escape' && !isValidateMessageShown) {
    closeUploadPictureHandler();
  }
}

function setValidateMessageState(value) {
  isValidateMessageShown = value;
}

const openUploadPicture = () => {
  uploadPictureInput.addEventListener('change', uploadPictureHandler);
  uploadOverlaycloseButton.addEventListener('click', closeUploadPictureHandler);
};

export { uploadPicturePreviev, openUploadPicture, uploadPictureHandler, closeUploadPictureHandler, setValidateMessageState };
