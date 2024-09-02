import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, Paper } from '@mui/material';
import { getReviews, addReview, deleteReview } from './api'; // Adjust import paths as needed

const ReviewPage = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [userId] = useState(''); // Replace with actual user ID from context or props

  useEffect(() => {
    if (bookId) {
      const fetchReviews = async () => {
        try {
          const response = await getReviews(bookId);
          setReviews(response.data);
        } catch (error) {
          console.error('Failed to fetch reviews:', error);
        }
      };

      fetchReviews();
    }
  }, [bookId]);

  const handleAddReview = async () => {
    if (!rating || !comment) {
      alert('Please enter both rating and comment.');
      return;
    }

    console.log('Adding review for bookId:', bookId); // Debugging line

    try {
      const newReview = { rating: parseInt(rating), comment, userId };
      await addReview(bookId, newReview); // Ensure bookId is defined
      setRating('');
      setComment('');
      // Refetch reviews after adding a new one
      const response = await getReviews(bookId);
      setReviews(response.data);
    } catch (error) {
      console.error('Failed to add review:', error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      setReviews(reviews.filter(review => review._id !== reviewId));
    } catch (error) {
      console.error('Failed to delete review:', error);
    }
  };

  if (!bookId) {
    return <Typography variant="h6">Book ID is missing</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Book Reviews</Typography>
      <Paper style={{ padding: 16 }}>
        <TextField
          label="Rating"
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          fullWidth
        />
        <TextField
          label="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          fullWidth
          multiline
          rows={4}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddReview}
          style={{ marginTop: 16 }}
        >
          Add Review
        </Button>
      </Paper>
      <List>
        {reviews.map(review => (
          <ListItem key={review._id}>
            <ListItemText
              primary={`Rating: ${review.rating}`}
              secondary={review.comment}
            />
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleDeleteReview(review._id)}
            >
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ReviewPage;
