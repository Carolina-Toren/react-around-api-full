const express = require('express');

const bodyParser = require('body-parser');

const helmet = require('helmet')

const mongoose = require('mongoose');


const app = express();
const { PORT = 3000 } = process.env;

const router = require('./routes/index');

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(helmet())

app.use((req, res, next) => {
  req.user = {
    _id: '625939cb974bf31a86ec94a9',
  };

  next();
});

app.use(bodyParser.json());

app.use('/', router);

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
