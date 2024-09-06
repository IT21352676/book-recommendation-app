import React, { useState, useEffect, useRef } from 'react';
import { Container, Grid, Typography, TextField, Button, Paper, Box, Alert, List, ListItem, ListItemText, IconButton, Modal, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Edit, Delete, Search, Add } from '@mui/icons-material';
import { getBooks, addBook, updateBook, deleteBook, getRecommendations} from './api'; // Ensure path is correct

import { useNavigate } from 'react-router-dom';
import BookIcon from '@mui/icons-material/Book';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

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
  
  // Create a ref to scroll to the book list after search
  const bookListRef = useRef(null);

  const navigate = useNavigate();

  // Navigate to review page
  const handleSeeReviews = () => {
    navigate('/reviews'); // Go to review page
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

  // Search for books and scroll to book list
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await getBooks();
      const filteredBooks = response.data.filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase()));
      setBooks(filteredBooks);

      // Scroll to book list when search is completed
      if (filteredBooks.length > 0 && bookListRef.current) {
        bookListRef.current.scrollIntoView({ behavior: 'smooth' });
      }
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

  // Get recommendations
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

  return (
    <Container maxWidth="ls">
      <Grid maxWidth="md"
        sx={{
          paddingY: '20px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
        
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
            }}>
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

        {/*Book list part*/}
        <Paper sx={{ padding: '40px', marginBottom: '20px' }} ref={bookListRef}>
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
              }}>
              Book List
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => openDialog()} 
              startIcon={<Add />} // Add "+" icon
              sx={{ paddingX: 5, backgroundColor: '#8d6e63', '&:hover': { backgroundColor: '#6d4c41' } }}>
              Add New Book
            </Button>
          </Box>
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
        </Paper>
        
        {/* Other sections... */}
        
      </Grid>
    </Container>
  );
};

export default BooksPage;
