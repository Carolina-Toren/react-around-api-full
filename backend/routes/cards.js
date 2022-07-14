const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { validateURL } = require('../helpers/validator');

const router = express.Router();
const {
  getAllCards,
  createCard,
  deleteCard,
  dislikeCard,
  likeCard,
} = require('../controllers/cards');

router.get('/', getAllCards);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(validateURL),
    }),
  }),
  createCard,
);

router.delete(
  '/:cardId',
  deleteCard,
  celebrate({
    params: Joi.object()
      .keys({
        cardId: Joi.string().hex().length(24),
      })
      .unknown(true),
  }),
);

router.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }),
  likeCard,
);

router.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }),
  dislikeCard,
);

module.exports = router;
