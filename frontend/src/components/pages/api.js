import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Set up axios defaults
const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Books
export const getBooks = () => instance.get('/books');
export const addBook = (book) => instance.post('/books', book);
export const updateBook = (bookId, updatedBook) => instance.put(`/books/${bookId}`, updatedBook);
export const deleteBook = (bookId) => instance.delete(`/books/${bookId}`);

// Authentication
export const signup = (email, password) => {
  return instance.post('/auth/signup', { email, password });
};

export const login = (email, password) => {
  return instance.post('/auth/login', { email, password });
};

// Reviews
export const getReviews = (bookId) => {
  return instance.get(`/books/${bookId}/reviews`);
};


export const deleteReview = (reviewId) => {
  return instance.delete(`/reviews/${reviewId}`);
};




// Recommendations
export const getRecommendations = (readingHistory) => {
  return instance.post('/books/recommend', { readingHistory });
};

export const addReview = (bookId, review) => {
  return axios.post(`/api/books/${bookId}/reviews`, review);
};