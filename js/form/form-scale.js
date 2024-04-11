import { uploadPicturePreviev } from './form-modal.js';

const SCALE = {
  INTERVAL: 25,
  MIN: 25,
  MAX: 100
};

const scaleControl = document.querySelector('.scale');
const increaseScaleControlButton = scaleControl.querySelector('.scale__control--bigger');
const decreaseScaleControlButton = scaleControl.querySelector('.scale__control--smaller');
const scaleControlValue = scaleControl.querySelector('.scale__control--value');
let defaultScale = SCALE.MAX;

const changeScale = (direction) => {
  if (direction === 'increase' && defaultScale < SCALE.MAX) {
    defaultScale += SCALE.INTERVAL;
  } else if (direction === 'decrease' && defaultScale > SCALE.MIN) {
    defaultScale -= SCALE.INTERVAL;
  }

  uploadPicturePreviev.style.transform = `scale(${defaultScale / SCALE.MAX})`;
  scaleControlValue.value = `${defaultScale}%`;
};

const increaseScaleHandler = () => {
  changeScale('increase');
};

const decreaseScaleHandler = () => {
  changeScale('decrease');
};

const addScaleEventHandlers = () => {
  increaseScaleControlButton.addEventListener('click', increaseScaleHandler);
  decreaseScaleControlButton.addEventListener('click', decreaseScaleHandler);
};

const removeScaleEventHandlers = () => {
  increaseScaleControlButton.removeEventListener('click', increaseScaleHandler);
  decreaseScaleControlButton.removeEventListener('click', decreaseScaleHandler);
};

// сброс масштаба до дефолтного
const resetScale = () => {
  defaultScale = SCALE.MAX;
  uploadPicturePreviev.style.transform = `scale(${defaultScale / SCALE.MAX})`;
  scaleControlValue.value = `${defaultScale}%`;
};

export { removeScaleEventHandlers, addScaleEventHandlers, resetScale };
