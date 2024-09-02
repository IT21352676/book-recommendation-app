import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import BookPage from './components/pages/BookPage';
import SignupPage from './components/pages/SignupPage';
import ReviewPage from './components/pages/ReviewPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/books" element={<BookPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/reviews" element={<ReviewPage />} />
      </Routes>
    </Router>
  );
}

export default App;