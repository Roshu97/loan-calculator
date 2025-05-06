import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

function NotFound() {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          py: 4
        }}>
          <Typography variant="h1" sx={{ mb: 2, fontSize: { xs: '4rem', md: '6rem' } }}>
            404
          </Typography>
          <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
            Page Not Found
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, textAlign: 'center', color: 'text.secondary' }}>
            The page you are looking for doesn't exist or has been moved.
          </Typography>
          <Button variant="contained" component={Link} to="/" size="large">
            Go to Home Page
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default NotFound;