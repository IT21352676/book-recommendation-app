const mongoose = require('mongoose');
// Book Model
const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String },
  description: { type: String },
});

module.exports = mongoose.model('Book', BookSchema);
