const Card = require('../models/card');
const { createNotFoundError } = require('../canstans/constants');

const getAllCards = (req, res) => {
  Card.find({})
    .orFail(createNotFoundError)
    .then((cardsData) => {
      res.status(200).send(cardsData);
    })

    .catch((err) => {
      if (err.name === 'Not Found') {
        res.status(404).send({ message: `${err.message}` });
        return;
      }
      res.status(500).send({ message: `${err.message}` });
    });
};

const createCard = (req, res) => {
  const { name, link, owner = req.user._id } = req.body;
  Card.create({ name, link, owner })

    .then(() => {
      res.status(200).send('Card created successfully');
    })

    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ messege: `${err.message}` });
        return;
      }
      res.status(500).send({ messege: `${err.message}` });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.deleteOne({ _id: cardId })
    .orFail(createNotFoundError)
    .then(() => {
      res.status(200).send('card has been deleted successfully');
    })

    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: `${err.message}` });
        return;
      }
      if (err.name === 'Not Found') {
        res.status(404).send({ message: `${err.message}` });
      }
      res.status(500).send({ message: `${err.message}` });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(createNotFoundError)

    .then((card) => {
      res.status(200).send(card);
    })

    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: `${err.message}` });
      } if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: `${err.message}` });
      } else {
        res.status(500).send({ message: `${err.message}` });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(createNotFoundError)
    .then((card) => {
      res.status(200).send(card);
    })

    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: `${err.message}` });
      } if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: `${err.message}` });
      } else {
        res.status(500).send({ message: `${err.message}` });
      }
    });
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  dislikeCard,
  likeCard,
};
