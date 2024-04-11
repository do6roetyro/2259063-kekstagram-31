import { sendData } from '../api/send-data.js';
import { resetEffectSlider } from './form-effects-slider.js';
import { resetScale } from './form-scale.js';
import { showValidateMessage } from './show-validate-message.js';

const HASHTAGS_MAX_VALUE = 5;
const DESCRIPTION_MAX_LENGTH = 140;
const REGEXP_HASHTAG_FORMAT = /^#[a-zа-яё0-9]{1,19}$/i;

const uploadForm = document.querySelector('.img-upload__form');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
}
);
const inputHashtag = uploadForm.querySelector('#hashtags');
const inputDescription = uploadForm.querySelector('#description');

function uploadFormInputsKeyDownHandler(evt, input) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
    input.blur();
  }
}

inputHashtag.addEventListener('keydown', (evt) => {
  uploadFormInputsKeyDownHandler(evt, inputHashtag);
});

inputDescription.addEventListener('keydown', (evt) => {
  uploadFormInputsKeyDownHandler(evt, inputDescription);
});

const validateHashtagsFormat = (value) => {
  if (value.trim() === '') {
    return true;
  } else {
    const hashtags = value.split(/\s+/);
    let isFirstTagValid = false;

    for (let i = 0; i < hashtags.length; i++) {
      const tag = hashtags[i];

      if (tag.trim() !== '') {
        if (!REGEXP_HASHTAG_FORMAT.test(tag)) {
          return false;
        }
        if (!isFirstTagValid) {
          isFirstTagValid = true;
        }
      }
    }

    return isFirstTagValid;
  }
};

const validateHashtagsCount = (value) => {
  const hashtags = value.split(' ').filter((tag) => tag.trim() !== '');
  return hashtags.length <= HASHTAGS_MAX_VALUE;
};

const validateHashtagsUnique = (value) => {
  const hashtags = value.split(' ').filter((tag) => tag.trim() !== '');
  const uniqueHashtags = new Set(hashtags.map((tag) => tag.toLowerCase()));
  return hashtags.length === uniqueHashtags.size;
};

const validateDescriptionLength = (value) => value.length <= DESCRIPTION_MAX_LENGTH;

pristine.addValidator(inputHashtag, validateHashtagsFormat, 'Хэштег должен начинаться с символа # и содержать только буквы и цифры, длиной от 1 до 20 символов (включая #)');
pristine.addValidator(inputHashtag, validateHashtagsCount, 'Максимальное количество хэштегов - 5');
pristine.addValidator(inputHashtag, validateHashtagsUnique, 'Имеются повторяющиеся хэштеги');
pristine.addValidator(inputDescription, validateDescriptionLength, 'Превышено максимальное кол-во символов - 140');

const setPictureFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      const submitButton = uploadForm.querySelector('.img-upload__submit');

      submitButton.disabled = true;

      sendData(new FormData(evt.target))
        .then(() => {
          uploadForm.reset();
          resetEffectSlider();
          resetScale();
          showValidateMessage('success');
          onSuccess();
          submitButton.disabled = false;
        })
        .catch(() => {
          showValidateMessage('error');
          submitButton.disabled = false;
        });
    }
  });
};

export { setPictureFormSubmit, uploadForm, pristine };
