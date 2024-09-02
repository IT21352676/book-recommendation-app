const express = require('express');
const router = express.Router();
const Review = require('../models/reviewModel');
const Book = require('../models/bookModel');

// Get all reviews for a specific book
router.get('/books/:bookId/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.params.bookId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews', error });
  }
});

// Add a new review for a specific book
router.post('/books/:bookId/reviews', async (req, res) => {
  try {
    const { rating, comment, userId } = req.body;
    const bookId = req.params.bookId;

    if (!rating || !comment || !userId) {
      return res.status(400).json({ message: 'Rating, comment, and userId are required' });
    }

    const newReview = new Review({
      bookId,
      userId,
      rating,
      comment,
    });

    const savedReview = await newReview.save();

    // Optionally, update the book's review count or rating average here

    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add review', error });
  }
});

// Delete a review
router.delete('/reviews/:reviewId', async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete review', error });
  }
});



module.exports = router;
