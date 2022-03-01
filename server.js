'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const Book = require('./Models/Book');

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;


app.get('/books', getBooks);

app.get('/', (req, res) => {
  res.status(200).send('Hello from our server');
});

async function getBooks(req, res, next) {
  try {
    let bookResults = await Book.find({email: req.query.email});
    console.log(bookResults);
    res.status(200).send(bookResults);
  } catch (error) {
    next(error);
  }
}



app.get('*', (req, res) => {
  res.status(404).send('Object Not Found');
});

app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
