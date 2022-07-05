const express = require('express');

const router = express.Router();
const {
  getAllCards,
  createCard,
  deleteCard,
  dislikeCard,
  likeCard,
} = require('../controllers/cards');

router.get('/', getAllCards);

router.post('/', createCard);

router.delete('/:cardId', deleteCard);

router.put('/:cardId/likes', likeCard);

router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
