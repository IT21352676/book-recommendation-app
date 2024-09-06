import React from 'react';
import { Container, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/login');
  };

  return (
    <Container className="background-page" maxWidth="none" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
       {/*Site name and start here content*/}
      <Paper
        elevation={4}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px',
          textAlign: 'center',
          borderRadius: 2,
          position: 'relative',
          backgroundColor: '#f5f5f5',
          zIndex: 1,
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#3e2723' }}>
          Welcome to BookNest
        </Typography>
        <Typography variant="h6" component="p" gutterBottom sx={{ marginBottom: '20px', color: '#5d4037' }}>
          Your personal book assistant
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          size="large" 
          onClick={handleStartClick}
          sx={{ paddingX: 5, backgroundColor: '#8d6e63', '&:hover': { backgroundColor: '#6d4c41' } }}
        >
          Start Here
        </Button>
      </Paper>
      
    </Container>
  );
};

export default HomePage;
