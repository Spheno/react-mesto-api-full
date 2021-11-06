const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Неверно заполнены поля формы');
      }
      next(err);
    })
    .catch(next);
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточки с таким id не существует');
      }
      if (card.owner.toString() === req.user._id) {
        Card.deleteOne(card)
          .then(() => res.send({ data: card }));
      } else {
        throw new ForbiddenError('Можно удалять только свои карточки');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError('Запрашиваемая карточка не найдена');
      }
      next(err);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card) {
        return res.send({ data: card });
      }
      throw new NotFoundError('Карточки с таким id не существует');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Переданы некорректные данные для постановки лайка.');
      }
      if (err.name === 'CastError') {
        throw new ValidationError('Запрашиваемая карточка не найдена');
      }
      next(err);
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card) {
        return res.send({ data: card });
      }
      throw new NotFoundError('Карточки с таким id не существует');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Переданы некорректные данные для удаления лайка.');
      }
      if (err.name === 'CastError') {
        throw new ValidationError('Запрашиваемая карточка не найдена.');
      }
      next(err);
    })
    .catch(next);
};
