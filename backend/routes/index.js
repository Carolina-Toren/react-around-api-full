const router = require('express').Router();
const userRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');
const { celebrate, Joi } = require('celebrate');

const { createUser, login } = require('../controllers/users');

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser
);

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login
);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardsRouter);

module.exports = router;
