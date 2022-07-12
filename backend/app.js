const express = require('express');

const bodyParser = require('body-parser');

const helmet = require('helmet');

const mongoose = require('mongoose');

const cors = require('cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { errorHandler } = require('./middlewares/errorHandler');

const app = express();
const { PORT = 3000 } = process.env;

const router = require('./routes/index');

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(helmet());

app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());
app.use(requestLogger);

app.use('/', router);
app.use(errorLogger);

app.use(errorHandler);

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
