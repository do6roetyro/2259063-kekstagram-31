import { setValidateMessageState } from './form-modal.js';

const showValidateMessage = (value) => {
  const validateMessageTemplate = document.querySelector(`#${value}`).content.querySelector(`.${value}`);
  const validateMessage = validateMessageTemplate.cloneNode(true);
  document.body.append(validateMessage);
  const validateMessageButton = document.querySelector(`.${value}__button`);
  const validateMessageInner = validateMessage.querySelector(`.${value}__inner`);

  const validateMessageButtonClickHandler = () => {
    closeValidateMessage();
  };

  const documentKeydownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
      closeValidateMessage();
    }
  };

  const documentClickHandler = (evt) => {
    if (!validateMessageInner.contains(evt.target)) {
      closeValidateMessage();
    }
  };

  function closeValidateMessage() {
    validateMessage.remove();
    setValidateMessageState(false);
    document.removeEventListener('keydown', documentKeydownHandler);
    document.removeEventListener('click', documentClickHandler);
    validateMessageButton.removeEventListener('click', validateMessageButtonClickHandler);
  }

  validateMessageButton.addEventListener('click', validateMessageButtonClickHandler);
  document.addEventListener('keydown', documentKeydownHandler);
  document.addEventListener('click', documentClickHandler);

  setValidateMessageState(true);
};

export { showValidateMessage };
