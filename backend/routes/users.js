const express = require('express');
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updatedUserAvatar,
  updatedUserProfile,
  login,
} = require('../controllers/users');

router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.patch('/me', updatedUserProfile);

router.get('/me', getUserById);

router.patch('/me/avatar', updatedUserAvatar);

module.exports = router;
