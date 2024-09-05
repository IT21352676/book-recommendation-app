import React from 'react';
import { Container, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Quotes
const quotes = [
  "“A room without books is like a body without a soul.” – Marcus Tullius Cicero",
  "“So many books, so little time.” – Frank Zappa",
  "“The only thing you absolutely have to know is the way to the library.” – Albert Einstein",
  "“Books are a uniquely portable magic.” – Stephen King",
  "“The best advice I ever got was that knowledge is power and to keep reading.” – David Bailey",
  "“There is no friend as loyal as a book.” – Ernest Hemingway",
  "“Reading is a discount ticket to everywhere.” – Mary Schmich",
  "“Books are a mirror of the soul.” – Virginia Woolf",
  "“Books are a uniquely portable magic.” – Stephen King",
  "“A book is a dream that you hold in your hands.” – Neil Gaiman",
  "“To read is to voyage through time.” – Carl Sagan",
  "“The world was hers for the reading.” – Betty Smith",
  "“Books are the quietest and most constant of friends.” – Charles W. Eliot",
  "“A great book is a friend that never lets you down.” – Unknown",
  "“Books give a soul to the universe, wings to the mind, flight to the imagination.” – Plato",
  "“I cannot live without books.” – Thomas Jefferson",
  "“Reading is to the mind what exercise is to the body.” – Joseph Addison",
  "“Books are a uniquely portable magic.” – Stephen King",
  "“A book is a gift you can open again and again.” – Garrison Keillor",
  "“Books are a way to escape reality, and return to reality changed.” – Unknown"
];

// Quotes positions
const positions = [
  { top: '10%', left: '20%' },
  { top: '10%', right: '0%' },
  { bottom: '5%', left: '10%' },
  { bottom: '5%', right: '0%' },
  { top: '27%', left: '32%' },
  { top: '30%', right: '30%' },
  { bottom: '0%', left: '30%' },
  { bottom: '0%', right: '20%' },
  { top: '70%', left: '20%' },
  { top: '15%', right: '40%' },
  { top: '22%', left: '72%' },
  { top: '10%', right: '23%' },
  { bottom: '10%', left: '40%' },
  { bottom: '20%', right: '25%' },
  { top: '42%', left: '25%' },
  { top: '40%', right: '5%' },
  { bottom: '65%', left: '10%' },
  { bottom: '40%', right: '-5%' },
  { top: '57%', left: '15%' },
  { top: '70%', right: '5%' }
];

const HomePage = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/login');
  };

  return (
    <Container maxWidth="none" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
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

      {/* Mapping the quotes*/}
      {quotes.map((quote, index) => {
        const position = positions[index % positions.length];
        return (
          <Paper
            key={index}
            elevation={2}
            sx={{
              position: 'absolute',
              top: position.top,
              left: position.left,
              right: position.right,
              bottom: position.bottom,
              padding: '20px',
              borderRadius: 2,
              backgroundColor: '#fff3e0',
              boxShadow: 3,
              maxWidth: '250px',
              textAlign: 'center',
              transform: 'translate(-50%, -50%)',
              zIndex: 0
            }}
          >
            <Typography variant="body1" sx={{ fontStyle: 'italic', color: '#3e2723' }}>
              {quote}
            </Typography>
          </Paper>
        );
      })}
    </Container>
  );
};

export default HomePage;
