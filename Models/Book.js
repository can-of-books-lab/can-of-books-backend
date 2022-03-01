'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema ({
  title: {type: String, required: false},
  description: {type: String, required: false},
  status: {type: Boolean, required: false},
  email: {type: String, required: false}
});

const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;
