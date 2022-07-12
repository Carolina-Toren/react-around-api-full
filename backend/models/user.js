const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { default: isURL } = require('validator/lib/isURL');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Carolina Toren',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Web developer',
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        // eslint-disable-next-line no-useless-escape
        return isURL(v);
      },
      message: (props) => `${props.value} is not a valid link!`,
    },
    default:
      'https://i.ibb.co/rmmxV7x/5fba84f2db21f9fd02f700278a95dd68a9c947642f4749ef7c04a7034da0e72f-0.gif',
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isStrongPassword(v);
      },
      message: (props) => `${props.value} is not a valid password!`,
    },
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('Incorrect email or password'));
        }

        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
