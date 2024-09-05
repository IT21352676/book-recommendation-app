import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Grid, Paper, Rating, Box } from '@mui/material';
import { getReviews, addReview } from './api';
import PersonIcon from '@mui/icons-material/Person';
import BookIcon from '@mui/icons-material/Book';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    bookName: '',
    UserName: '',
    rating: 0,
    genre: '',
  });

  // Get all reviews
  useEffect(() => {
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

  // Add a review
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
          <Paper sx={{ padding: '16px', marginBottom: '20px'}}>

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
              name="UserName"
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
            marginBottom: 5,
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
        


        <Paper sx={{ padding: '40px'}}>    
      <Typography variant="h6" style={{ marginTop: '20px' }}>
        How The Use Commands To Bot

      </Typography>
      <Typography variant="body1">
        <ul>
          <li><strong>!addreview "Book Title" "Your Name" "Rating 1-5" "Genre"</strong> - Add a review to book.</li>
          <li><strong>!listreviews</strong> - List all reviews.</li>
          <li><strong>!deletereview "Book Title" "Your Name"</strong> - Delete a your review.</li>
        </ul>
      </Typography>

      <Typography variant="h6" style={{ marginTop: '20px', fontSize: '1.1rem' }}>
        Example :- <strong>@book-recomendation-app !addreview "Book Title" "Your Name" "4" "Genre"</strong>

      </Typography>
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
              backgroundColor: 'rgba(166, 127, 116, 0.3)'
            }}
          >
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', color: '#3e2723', fontWeight:'bold', marginBottom:1}}>
              <BookIcon sx={{ fontSize: 20, marginRight: 1, color: '#3e2723' }} />
                {review.bookName}
              </Typography>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', marginBottom:1}}>
              <PersonIcon sx={{ fontSize: 20, marginRight: 1, color: '#3e2723' }} />
                By: {review.UserName}
              </Typography >
              <Rating value={review.rating} readOnly sx={{marginBottom:1}}/>
              <Typography variant="body2" sx={{marginBottom:1}}>Genre: {review.genre}</Typography>
            </Paper>
          ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ReviewPage;
