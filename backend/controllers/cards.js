const Card = require('../models/card');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((cardsData) => {
      if (!cardsData) {
        throw new NotFoundError('No cards to display');
      }
      res.status(200).send(cardsData);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link, owner = req.user._id } = req.body;
  Card.create({ name, link, owner })

    .then((newCard) => {
      if (!newCard) {
        throw new BadRequestError('Bad request');
      }
      res.status(200).send(newCard);
    })

    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById({ _id: cardId })
    .then((card) => {
      if (!card.owner._id.equals(req.user._id)) {
        throw new Error('Access to the requested resource is forbidden');
      }
      Card.deleteOne({ _id: cardId }).then(() => {
        res.status(200).json('card has been deleted successfully');
      });
    })
    .catch((err) => {
      if (err.name === 'Error') {
        throw new NotFoundError('No card matching id found');
      } else if (err.name === 'CastError') {
        throw new BadRequestError('Bad request');
      }
      next(err);
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('No card with matching id found');
      }
      res.status(200).send(card);
    })

    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Bad request');
      }
      next(err);
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('No card with matching id found');
      }
      res.status(200).send(card);
    })

    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Bad request');
      }
      next(err);
    })
    .catch(next);
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  dislikeCard,
  likeCard,
};
