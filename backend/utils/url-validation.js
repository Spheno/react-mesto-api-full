const validator = require('validator');

const isUrl = (v) => {
  const result = validator.isURL(v);
  if (!result) {
    throw new Error('Неверно заполнены поля формы.');
  } else {
    return v;
  }
};

module.exports = isUrl;
