const express = require('express');
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

require('dotenv').config();
const { validateURL } = require('../helpers/validator');

const router = express.Router();

const {
  getAllUsers,
  getUserById,
  updatedUserAvatar,
  updatedUserProfile,
} = require('../controllers/users');

router.get('/', getAllUsers);

//
router.get(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id:
      Joi.string().required()
        .hex().length(24),
    }),
  }),
  getUserById,
);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
      avatar: Joi.string().custom(validateURL),
    }),
  }),
  updatedUserProfile,
  auth,
);

router.get('/me', getUserById);

router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().custom(validateURL),
    }),
  }),
  updatedUserAvatar,
);

module.exports = router;
