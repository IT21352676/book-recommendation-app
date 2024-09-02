const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true }, // Updated to make comment required
}, { timestamps: true }); // Added timestamps for creation and update times

module.exports = mongoose.model('Review', ReviewSchema);