import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Grid, Paper, Rating, Box } from '@mui/material';
import { getReviews, addReview } from './api';
import axios from 'axios';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    bookName: '',
    UserName: '',
    rating: 0,
    genre: '',
  });

  useEffect(() => {
    // Fetch all reviews when the page loads
    getReviews()
      .then(response => setReviews(response.data))
      .catch(error => console.error('Error fetching reviews:', error));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleRatingChange = (event, newValue) => {
    setNewReview({ ...newReview, rating: newValue });
  };

  const handleSubmit = () => {
    addReview(newReview)
      .then(response => {
        setReviews([...reviews, response.data]);
        setNewReview({ bookName: '', UserName: '', rating: 0, genre: '' });
      })
      .catch(error => console.error('Error adding review:', error));
  };

  return (
    <Container maxWidth="md" sx={{ paddingY: '20px' }}>
      
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ padding: '16px' }}>

          <Typography 
          variant="h4" 
          component="h1"
          gutterBottom 
          sx={{ 
            fontWeight: 'bold', 
            color: '#3e2723', 
            fontSize: '2rem', 
            textAlign: 'center', 
            marginBottom: '20px'
          }}
        >
            Reviews
        </Typography>

        <Typography 
            variant="h6" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold', 
              color: '#3e2723', 
              fontSize: '1.5rem',
              marginBottom: '20px'
            }}
          >
            Add a Review
          </Typography>
            <TextField
              label="Book Name"
              name="bookName"
              value={newReview.bookName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Your Name"
              name="YourName"
              value={newReview.UserName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <Typography component="legend">Rating</Typography>
            <Rating
              name="rating"
              value={newReview.rating}
              onChange={handleRatingChange}
            />
            <TextField
              label="Genre"
              name="genre"
              value={newReview.genre}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <Box 
            sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginTop: 2,
            marginBottom: 5,// Adjust as needed for spacing from top
            }}
            >
            <Button 
            variant="contained" 
            color="primary"  
            onClick={handleSubmit} 
            sx={{ 
            paddingX: 5, 
            backgroundColor: '#8d6e63', 
            '&:hover': { backgroundColor: '#6d4c41' } 
            }}
            >
            Add Review
                </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sx={{ marginTop: '20px' }}>
        <Paper sx={{ padding: '16px' }}>
        <Typography 
            variant="h6" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold', 
              color: '#3e2723', 
              fontSize: '1.5rem',
              marginBottom: '20px'
            }}
          >
            All Reviews
          </Typography>
          {reviews.map((review, index) => (
            <Paper 
            key={index} 
            sx={{ 
              padding: '16px', 
              marginBottom: '10px', 
              backgroundColor: 'rgba(166, 127, 116, 0.3)' // Light brown with 80% opacity
            }}
          >
              <Typography variant="h6">{review.bookName}</Typography>
              <Typography variant="body1">By: {review.UserName}</Typography>
              <Rating value={review.rating} readOnly />
              <Typography variant="body2">Genre: {review.genre}</Typography>
            </Paper>
          ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ReviewPage;
