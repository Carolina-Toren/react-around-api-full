const User = require('../models/user');
const { createNotFoundError } = require('../canstans/constants');

const getAllUsers = (req, res) => {
  User.find({})
    .orFail(createNotFoundError)
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      if (err.name === 'Not Found') {
        res.status(404).send({ message: `${err.message}` });
        return;
      }

      res.status(500).send({ message: `${err.message}` });
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail(createNotFoundError)
    .then((user) => res.status(200).send(user))
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

const createUser = (req, res) => {
  User.create(req.body)
    .orFail(createNotFoundError)
    .then(() => res.status(200).send('User created'))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ messege: `${err.message}` });
        return;
      }
      res.status(500).send({ message: `${err.message}` });
    });
};

const updatedUserProfile = (req, res) => {
  const id = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(createNotFoundError)
    .then((updatedUser) => res.status(200).send({ message: `User ${updatedUser.id} was updated successfully` }))

    .catch((err) => {
      if (err.name === 'Not Found') {
        res.status(404).send({ message: `${err.message}` });
        return;
      }

      res.status(500).send({ message: `${err.message}` });
    });
};

const updatedUserAvatar = (req, res) => {
  const id = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(createNotFoundError)
    .then(() => {
      res.status(200).send({ message: 'Avatar updated successfully' });
    })

    .catch((err) => {
      if (err.name === 'Not Found') {
        res.status(404).send({ message: `${err.message}` });
        return;
      }

      res.status(500).send({ message: `${err.message}` });
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updatedUserProfile,
  updatedUserAvatar,
};
