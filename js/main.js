const RANDOM_TEXT =
  'Всё отлично! В целом всё неплохо, но не всё. Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально. Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше. Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше. Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!';

const NAMES = [
  'Alice',
  'Bob',
  'Charlie',
  'David',
  'Emily',
  'Frank',
  'Grace',
  'Henry',
  'Ivy',
  'Jack',
  'Katherine',
  'Leo',
  'Mia',
  'Nathan',
  'Olivia',
  'Paul',
  'Quinn',
  'Rachel',
  'Sam',
  'Taylor',
  'Ursula',
  'Victor',
  'Wendy',
  'Xander',
  'Yasmine',
];

const PHOTO_DESCRIPTIONS = [
  'Загадочный закат на горизонте.',
  'Улицы города, озаренные ночными огоньками.',
  'Детали природы в крупном плане.',
  'Мост через туманный реку.',
  'Теплые оттенки заката над океаном.',
  'Горы, покрытые первым снегом.',
  'Абстрактные формы и цвета в искусстве уличной граффити.',
  'Портрет с множеством ярких красок.',
  'Городской пейзаж с высоты птичьего полета.',
  'Парк с весенними цветами в полном расцвете.',
  'Замёрзшее озеро с льдом, как зеркало.',
  'Архитектурные детали старого здания.',
  'Природа в объективе макро-объектива.',
  'Силуэты людей на фоне заходящего солнца.',
  'Графичные линии и геометрия в городском ландшафте.',
  'Магический взгляд в глазах животного.',
  'Космический пейзаж с планетами и звездами.',
  'Оригинальная композиция с использованием тени.',
  'Приключенческая поездка на велосипеде.',
  'Игра света и тени в архитектурном ансамбле.',
  'Мистический лес с туманом.',
  'Провинциальный городской пейзаж с аутентичными домами.',
  'Закатные оттенки на пустынном пляже.',
  'Арт-объект в городском пространстве.',
  'Граффити на стене с интересным сюжетом.',
];

const MAX_USERS = 25;
const MIN_USERS = 1;
const MAX_LIKES = 200;
const MIN_LIKES = 15;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;

const getRandomIntegerInterval = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomInteger = () =>
  Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER + 1));

const getRandomIdfromRangeGenerator = (min, max) => {
  const inUseId = [];

  return () => {
    let currentId = getRandomIntegerInterval(min, max);
    inUseId.length >= max - min + 1
      ? (console.error('Все уникальные ID заняты'), null)
      : inUseId;
    while (inUseId.includes(currentId)) {
      currentId = getRandomIntegerInterval(min, max);
    }
    inUseId.push(currentId);
    return currentId;
  };
};

const getUserId = getRandomIdfromRangeGenerator(MIN_USERS, MAX_USERS);
const getUserPhoto = getRandomIdfromRangeGenerator(MIN_USERS, MAX_USERS);
const getRandomArrayElement = (elements) =>
  elements[getRandomIntegerInterval(0, elements.length - 1)];

// функция для генерации текста комментария
const getCommentMessage = (text) => {
  const textArray = text.split(/[.!?]+ /);
  return getRandomArrayElement(textArray);
};

const createComment = () => ({
  id: getRandomInteger(),
  avatar: `img/avatar-${getRandomIntegerInterval(1, 6)}.svg`,
  message: getCommentMessage(RANDOM_TEXT),
  name: getRandomArrayElement(NAMES),
});

const createUser = () => {
  const addComment = Array.from(
    { length: getRandomIntegerInterval(MIN_COMMENTS, MAX_COMMENTS) },
    createComment
  );
  return {
    id: getUserId(),
    url: `photos/${getUserPhoto()}.jpg`,
    description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
    likes: getRandomIntegerInterval(MIN_LIKES, MAX_LIKES),
    comments: addComment,
  };
};

const addUser = Array.from({ length: MAX_USERS }, createUser);

console.log(addUser);
