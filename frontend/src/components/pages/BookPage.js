import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, TextField, Button, Paper, Box, Alert, List, ListItem, ListItemText, IconButton, Modal, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Edit, Delete, Search, Add } from '@mui/icons-material';
import { getBooks, addBook, updateBook, deleteBook, getRecommendations} from './api'; // Ensure path is correct

import { useNavigate } from 'react-router-dom';
import BookIcon from '@mui/icons-material/Book';

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import LogoutIcon from '@mui/icons-material/Logout';


const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [formValues, setFormValues] = useState({ title: '', author: '', description: '' });
  const [error, setError] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [recommendationError, setRecommendationError] = useState('');
  const [readingHistory, setReadingHistory] = useState('');
  // const [reviews, setReviews] = useState([]);
  // const [reviewError, setReviewError] = useState('');
  // const [newReview, setNewReview] = useState('');

  const navigate = useNavigate();


  // Navigate to review page
  const handleSeeReviews = () => {
    navigate('/reviews'); // Go to review page
  };

  const handleBack = () => {
    navigate('/login'); // Go to review page
  };



  // Get all books
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await getBooks();
        setBooks(response.data);
      } catch (error) {
        setError('Failed to fetch books');
      }
    };

    fetchAllBooks();
  }, []);

  // Search for books
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await getBooks();
      setBooks(response.data.filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase())));
    } catch (error) {
      setError('Failed to search books');
    }
  };

  // Add and update a book
  const handleAddOrUpdateBook = async (e) => {
    e.preventDefault();
    try {
      if (selectedBook) {
        await updateBook(selectedBook._id, formValues);
      } else {
        await addBook(formValues);
      }
      setShowDialog(false);
      setFormValues({ title: '', author: '', description: '' });
      setSelectedBook(null);
      const response = await getBooks();
      setBooks(response.data);
    } catch (error) {
      setError('Failed to add or update book');
    }
  };

  // Delete a book
  const handleDeleteBook = async (bookId) => {
    try {
      await deleteBook(bookId);
      // Refresh the book list after deletion
      const response = await getBooks();
      setBooks(response.data);
    } catch (error) {
      setError('Failed to delete book');
    }
  };

  // Pop up dialog window
  const openDialog = (book = null) => {
    if (book) {
      setSelectedBook(book);
      setFormValues({ title: book.title, author: book.author, description: book.description });
    } else {
      setSelectedBook(null);
      setFormValues({ title: '', author: '', description: '' });
    }
    setShowDialog(true);
  };

  // Get recomendations
  const handleGetRecommendations = async () => {
    try {
      const response = await getRecommendations({
        readingHistory: books.map(book => book.title),
      });
      
      setRecommendations(response.data.recommendations);
      setRecommendationError('');
    } catch (error) {
      setRecommendationError('Failed to get recommendations');
    }
  };

  // const handleAddReview = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await addReview(selectedBook._id, { content: newReview });
  //     setNewReview('');
  //     fetchReviews(selectedBook._id);
  //   } catch (error) {
  //     setReviewError('Failed to add review');
  //   }
  // };

  // const fetchReviews = async (bookId) => {
  //   try {
  //     const response = await getReviews(bookId);
  //     setReviews(response.data);
  //   } catch (error) {
  //     setReviewError('Failed to fetch reviews');
  //   }
  // };


  return (
  
    <Container maxWidth="none">
      <Grid maxWidth="md"
      sx={{
        paddingY: '20px',
        marginLeft: 'auto', // Align the container to the left side
        marginRight: 'auto',
      }}>

      <Box sx={{ display: 'flex', justifyContent: 'right', marginBottom:5 }}> <Button
      onClick={handleBack}
      variant="contained"
      color="primary"
      startIcon={<LogoutIcon />}
      sx={{ paddingX: 5, backgroundColor: '#8d6e63', '&:hover': { backgroundColor: '#6d4c41' } }}>
            Log Out
      </Button>
      </Box>

      {/*Search book part*/}   
      <Paper sx={{ padding: '40px', marginBottom: '20px' }}>
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
          Books Collection
        </Typography>
        
        <form onSubmit={handleSearch}>
          <TextField
            label="Search by Title"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ marginBottom: '10px' }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              startIcon={<Search />}
              sx={{ paddingX: 5, backgroundColor: '#8d6e63', '&:hover': { backgroundColor: '#6d4c41' } }}
            >
              Search
            </Button>
          </Box>
        </form>
        
      </Paper>

      {error && <Alert severity="error" sx={{ marginBottom: '20px' }}>{error}</Alert>}



      {/* Book list part */}  
<Paper sx={{ padding: '40px', marginBottom: '20px' }}>
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Typography 
      variant="h6" 
      gutterBottom
      sx={{ 
        fontWeight: 'bold', 
        color: '#3e2723', 
        fontSize: '1.5rem',
        textAlign: 'center', 
        marginBottom: '20px'
      }}
    >
      Book List
    </Typography>
    <Box sx={{ justifyContent: 'right', marginBottom:5 }}>
    <Button 
      variant="contained" 
      color="primary" 
      onClick={() => openDialog()} 
      startIcon={<Add />} // Add "+" icon
      sx={{ paddingX: 3, backgroundColor: '#8d6e63', '&:hover': { backgroundColor: '#6d4c41' } }}
    >
      Add
    </Button>
    </Box>
  </Box>

  {/* Scrollable list container */}
  <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}> {/* Set height and enable scrolling */}
    <List>
      {books.map((book) => (
        <ListItem key={book._id} divider>
          <ListItemText
            primary={
              <Typography component="span" sx={{ display: 'flex', alignItems: 'center', color: '#3e2723', fontWeight: 'bold' }}>
                <BookIcon sx={{ fontSize: 20, marginRight: 1 }} />
                {book.title}
              </Typography>
            }
            secondary={
              <React.Fragment>
                <span>Author: {book.author}</span>
                <br />
                <span>Description: {book.description}</span>
              </React.Fragment>
            }
          />
          <IconButton onClick={() => openDialog(book)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDeleteBook(book._id)}>
            <Delete />
          </IconButton>
        </ListItem>
      ))}
    </List>
  </Box>
</Paper>

      {/*Discord bot part*/}   
      <Paper sx={{ padding: '40px', marginBottom: '20px' }}>   
      <Typography variant="h6" sx={{ 
            fontWeight: 'bold', 
            color: '#3e2723', 
            textAlign: 'center', 
            marginBottom: '20px'
          }}>
        Invite Our Discord Bot to Your Server
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Button
        variant="contained"
        color="primary"
        href="https://discord.com/oauth2/authorize?client_id=1280239916034429093&permissions=8&integration_type=0&scope=bot"  // Discord bot (book-recomendation-app) invite link
        target="_blank"
        sx={{ paddingX: 5, backgroundColor: '#8d6e63', '&:hover': { backgroundColor: '#6d4c41' } }}>
        Invite Bot
      </Button>
      </Box> 
      <Typography variant="h6" style={{ marginTop: '40px' }}>
        After Adding The Bot To Your Discord Server
      </Typography>
      <Typography variant="body1">
        <ul>
          <li><strong>@book-recomendation-app</strong> - Please remember to mention the bot before using any commands to ensure it receives your request.</li>
          </ul>
      </Typography>
      <Typography variant="h6" style={{ marginTop: '20px' }}>
        How The Use Commands To Bot
      </Typography>
      <Typography variant="body1">
        <ul>
          <li><strong>!addbook "Title" "Author" "Description"</strong> - Add a book to your library.</li>
          <li><strong>!listbooks</strong> - List all books in your library.</li>
          <li><strong>!editbook "Current Title" "New Title" "New Author" "New Description"</strong> - Edit a book in your library.</li>
          <li><strong>!deletebook "Title"</strong> - Delete a book from your library.</li>
        </ul>
      </Typography>
      <Typography variant="h6" style={{ marginTop: '20px' }}>
        Example :- <strong>@book-recomendation-app !addbook "Title" "Author" "Description"</strong>
      </Typography>
    </Paper>


    {/*Review page navigate part*/}   
    <Paper sx={{ padding: '40px', marginBottom: '20px' }}>
    <Typography variant="h6" sx={{ 
            fontWeight: 'bold', 
            color: '#3e2723', 
            textAlign: 'center', 
            marginBottom: '20px',
            fontSize: '1.1rem'
          }}>
        "Explore and share your thoughts on the books you love. Discover reviews and contribute your own!"
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Button
      onClick={handleSeeReviews}
      variant="contained"
      color="primary"
      endIcon={<ChatBubbleOutlineIcon />}
      sx={{ paddingX: 5, backgroundColor: '#8d6e63', '&:hover': { backgroundColor: '#6d4c41' } }}>
            See Reviews
          </Button>
          </Box>
          </Paper>

     

      
      {/*Get recomendation part*/}  
      <Paper sx={{ padding: '40px', marginBottom: '20px' }}>
        <Typography 
          variant="h6" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold', 
            color: '#3e2723', 
            fontSize: '1.5rem', 
            textAlign: 'center', 
            marginBottom: '20px'
          }}
        >
          Get Recommendations
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleGetRecommendations}
            sx={{ paddingX: 5, backgroundColor: '#8d6e63', '&:hover': { backgroundColor: '#6d4c41' } }}
          >
            Get Recommendations
          </Button>
        </Box>
        {recommendationError && <Alert severity="error" sx={{ marginTop: '30px' }}>{recommendationError}</Alert>}
        {recommendations.length > 0 && (
          <Paper sx={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h6" gutterBottom>Recommended Books</Typography>
            <List>
              {recommendations.map((rec, index) => (
                <ListItem key={index} divider>
                  <ListItemText primary={rec} />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
        <Typography 
          variant="h6" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold', 
            color: '#3e2723', 
            fontSize: '1rem', 
            textAlign: 'center', 
            marginBottom: '20px', 
            marginTop: '20px'
          }}
        >
          Or
        </Typography>
        <TextField
            label="Enter keywords to get recommendation"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={readingHistory}
            onChange={(e) => setReadingHistory(e.target.value)}
            sx={{ marginBottom: '10px' }}
          />
      </Paper>

      <Modal
        open={showDialog}
        onClose={() => setShowDialog(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Paper 
          elevation={4} 
          sx={{ 
            padding: '20px', 
            borderRadius: 2, 
            width: '80%',
            maxWidth: '500px',
            margin: 'auto',
            marginTop: '10%',
          }}
        >
          <DialogTitle id="modal-title">{selectedBook ? 'Update Book' : 'Add New Book'}</DialogTitle>
          <DialogContent>
            <form onSubmit={handleAddOrUpdateBook}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                required
                value={formValues.title}
                onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
                sx={{ marginBottom: '20px' }}
              />
              <TextField
                label="Author"
                variant="outlined"
                fullWidth
                required
                value={formValues.author}
                onChange={(e) => setFormValues({ ...formValues, author: e.target.value })}
                sx={{ marginBottom: '20px' }}
              />
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={formValues.description}
                onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                sx={{ marginBottom: '20px' }}
              />
              <DialogActions>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary"
                >
                  {selectedBook ? 'Update' : 'Add'}
                </Button>
                <Button 
                  onClick={() => setShowDialog(false)}
                  color="secondary"
                >
                  Cancel
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Paper>
      </Modal>
      </Grid>
    </Container>
    


  



  );
};

export default BooksPage;
