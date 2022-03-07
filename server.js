'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const Book = require('./Models/Book');
const verifyUser = require('./auth');

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;


app.get('/books', getBooks);
app.post('/books', postBooks);
app.put('/books/:id', putBook);
//add delete
app.delete('/books/:id', deleteBook);

app.get('/', (req, res) => {
  res.status(200).send('Hello from our server');
});

async function getBooks(req, res, next) {
  verifyUser(req, async (error, user) => {
    if (error) {
      console.error(error);
      res.send('Invalid Token');
    } else {
      try {
        let bookResults = await Book.find({ email: user.email });
        // console.log(bookResults);
        res.status(200).send(bookResults);
      } catch (error) {
        next(error);
      }
    }
  });
}

async function postBooks(req, res, next) {
  try {
    let createdBook = await Book.create({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      email: req.body.email
    });
    res.status(200).send(createdBook);
  } catch (error) {
    next(error);
  }
}

async function putBook(req, res, next) {
  try {
    let bookId = req.params.id;
    let updatedBook = await Book.findByIdAndUpdate(bookId, req.body, { new: true, overwrite: true });
    res.status(200).send(updatedBook);
  } catch (error) {
    next(error);
  }
}
//add delete
async function deleteBook(req, res, next) {
  let bookId = req.params.id;
  let userEmail = req.query.email;
  console.log(bookId);
  try {

    let obj = await Book.find({
      _id: bookId,
      email: userEmail
    });
    if (userEmail === obj.email) {

      await Book.findByIdAndDelete(bookId);
      res.status(200).send('sBook was succsfiully deleted');
    }
    res.status(500).send('Book not deleted: Book does not exist in the database OR you do not have permission to delete this book.');
  } catch (error) {
    next(error);
  }
}

app.get('*', (req, res) => {
  res.status(404).send('Object Not Found');
});

app.use((error, req, res) => {
  res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

