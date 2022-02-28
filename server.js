'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const db = mongoose.connection;

mongoose.connect(process.env.DB_URL);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/', (req, res) => {
  res.status(200).send('Hello from our server');
});





app.get('*', (req, res) => {
  res.status(404).send('Object Not Found');
});

app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
