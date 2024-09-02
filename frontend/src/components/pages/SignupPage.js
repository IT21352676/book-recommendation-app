import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper, Box, Alert, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signup } from './api'; // Assuming you have an API call set up for signup

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    try {
      await signup(email, password);
      navigate('/login'); // Redirect to login after successful signup
    } catch (error) {
      setError('Sign up failed');
    }
  };

  return (
    <Container 
      maxWidth="xs" 
      sx={{ 
        height: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#0f7fa',
      }}
    >
      <Paper 
        elevation={4} 
        sx={{ 
          padding: '40px', 
          borderRadius: 2, 
          textAlign: 'center',
          width: '100%'
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#3e2723' }}>
          Sign Up for Booknest
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: '20px' }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: '20px' }}
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ marginBottom: '20px' }}
          />
          {error && (
            <Alert severity="error" sx={{ marginBottom: '20px' }}>
              {error}
            </Alert>
          )}
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{ paddingY: '10px', backgroundColor: '#8d6e63', '&:hover': { backgroundColor: '#6d4c41' } }}
          >
            Sign Up
          </Button>
        </form>
        <Box sx={{ marginTop: '20px' }}>
          <Typography variant="body2">
            Already have an account?{' '}
            <Link 
              component="button" 
              variant="body2" 
              onClick={() => navigate('/login')}
              sx={{ color: '#8d6e63', textDecoration: 'none' }}
            >
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignupPage;
