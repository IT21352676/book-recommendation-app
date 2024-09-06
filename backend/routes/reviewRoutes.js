const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Add a new review
router.post('/', async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


// Delete a review by bookName and userName
router.delete('/:bookName/:UserName', async (req, res) => {
  const { bookName, UserName } = req.params;

  try {
    const review = await Review.findOneAndDelete({ bookName, UserName });
    
    if (!review) return res.status(404).send('Review not found');
    
    res.send('Review deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
});



module.exports = router;
