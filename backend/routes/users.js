const express = require('express');

const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updatedUserAvatar,
  updatedUserProfile,
} = require('../controllers/users');

router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.post('/', createUser);

router.patch('/me', updatedUserProfile);

router.patch('/me/avatar', updatedUserAvatar);

module.exports = router;
