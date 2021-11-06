const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUsers, getUserById, updateUserProfile, updateUserAvatar, getUser } = require('../controllers/users');
const isUrl = require('../utils/url-validation');

router.get('/', getUsers);
router.get('/me', getUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(isUrl),
  }),
}), updateUserAvatar);

module.exports = router;
