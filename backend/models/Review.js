const mongoose = require('mongoose');
// Review Model
const ReviewSchema = new mongoose.Schema({
  bookName: { type: String, required: true },
  UserName: { type: String, required: true },
  rating: { type: Number, required: true },
  genre: { type: String, required: true },
});
 

module.exports = mongoose.model('Review', ReviewSchema);

