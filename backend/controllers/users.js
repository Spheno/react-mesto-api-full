const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { SALT_ROUND } = require('../utils/constants');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const ConflictError = require('../errors/conflict-err');

require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const { email, password, name, about, avatar } = req.body;
  bcrypt.hash(password, SALT_ROUND)
    .then((hash) => User.create({ email, name, about, avatar, password: hash })
      .then(({ email,
        name,
        about,
        avatar,
        _id }) => res.status(200).send({ email, name, about, avatar, _id }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          throw new ValidationError('Переданы некорректные данные при создании пользователя.');
        }
        if (err.name === 'MongoServerError' && err.code === 11000) {
          throw new ConflictError('Пользователь с таким email уже существует');
        }
      }))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      res.cookie('jwt',
        jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' }),
        { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: 'none', secure: true });
      res.status(200).send({ message: req.cookies.jwt });
    })
    .catch(next);
};

module.exports.logOut = (req, res, next) => {
  try {
    res.clearCookie('jwt', {
      secure: true,
      sameSite: 'none',
    }).send({ message: 'Выход осуществлен' });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.getUser = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => res.send({ data: user }))
    .catch(() => {
      throw new UnauthorizedError('Необходима авторизацияа');
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        return res.send({ data: user });
      }
      throw new NotFoundError('Пользователя с таким id не существует');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError('Неверный Id пользователя');
      }
      next(err);
    })
    .catch(next);
};

module.exports.updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        return res.send({ data: user });
      }
      throw new NotFoundError('Пользователя с таким id не существует');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Переданы некорректные данные при обновлении профиля.');
      }
      if (err.name === 'CastError') {
        throw new ValidationError('Неверный Id пользователя');
      }
      next(err);
    })
    .catch(next);
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        return res.send({ data: user });
      }
      throw new NotFoundError('Пользователя с таким id не существует');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Переданы некорректные данные при обновлении аватара.');
      }
      if (err.name === 'CastError') {
        throw new ValidationError('Неверный Id пользователя');
      }
      next(err);
    })
    .catch(next);
};
