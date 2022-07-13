const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BadRequestError = require('../errors/badRequestError');
const UnauthorizedError = require('../errors/unauthorizedError');
const NotFoundError = require('../errors/notFoundError');
const UserExistsError = require('../errors/userExistsError');

require('dotenv').config();

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        throw new NotFoundError('No users to display');
      }
      res.status(200).send(users);
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Bad request.');
      }
      if (err.name === 'Not Found') {
        throw new NotFoundError('No user with matching id found');
      }
      next(err);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  User.findOne({ email })
    .then((emailExists) => {
      if (emailExists) {
        throw new UserExistsError('User is already exists');
      } else {
        bcrypt
          .hash(password, 10)
          .then((hash) =>
            User.create({
              name,
              about,
              avatar,
              email,
              password: hash,
            })
          )
          .then((user) => {
            res.status(201).send(user);
          })
          .catch((err) => {
            if (err.name === 'ValidationError') {
              throw new BadRequestError('Validation failed.');
            }
          });
      }
    })
    .catch(next);
};

const updatedUserProfile = (req, res, next) => {
  const id = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        throw new NotFoundError('No user with matching id found');
      }
      res.status(200).send(updatedUser);
    })
    .catch(next);
};

const updatedUserAvatar = (req, res, next) => {
  const id = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .then((avatar) => {
      if (!avatar) {
        throw new NotFoundError('User not found');
      }
      res.status(200).send(avatar);
    })

    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new BadRequestError('Bad request');
      }
      const { NODE_ENV, JWT_SECRET } = process.env;
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' }
      );
      res.status(200).send({
        token,
        user: {
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        },
      });
    })

    .catch((err) => {
      if (err.name === 'Error') {
        throw new UnauthorizedError('Incorrect email or password');
      }
      next(err);
    })
    .catch(next);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updatedUserProfile,
  updatedUserAvatar,
  login,
};
