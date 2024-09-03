const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Add a new book
router.post('/', async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get a book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send('Book not found');
    res.json(book);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update a book
router.put('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).send('Book not found');
    res.json(book);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Delete a book
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).send('Book not found');
    res.send('Book deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
});


router.delete('/title/:title', async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ title: req.params.title });
    if (!book) return res.status(404).send('Book not found');
    res.send('Book deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put('/title/:title', async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      { title: req.params.title }, // Find book by title
      
      req.body, // Update with data from request body
      { new: true } // Return the updated document
    );
    if (!book) return res.status(404).send('Book not found');
    res.json(book);
  } catch (error) {
    res.status(400).send(error.message);
  }
});



module.exports = router;
