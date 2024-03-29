const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const helmet = require('helmet');

const mongoose = require('mongoose');

const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const NotFoundError = require('./errors/notFoundError');

require('dotenv').config();

const app = express();
const { PORT = 3000 } = process.env;

const router = require('./routes/index');

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(helmet());

app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use('/', router);
app.use(errorLogger);

app.use(errors());

app.get('*', () => {
  throw new NotFoundError('OOPS! page not found');
});

app.use((err, req, res, next) => {
  res.status(err.statusCode).send({
    message:
      err.statusCode === 500 ? 'An error occurred on the server' : err.message,
  });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
