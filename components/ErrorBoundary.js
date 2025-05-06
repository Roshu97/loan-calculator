import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ 
          minHeight: '80vh', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          p: 3
        }}>
          <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
            Something went wrong in the application.
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, textAlign: 'center', color: 'text.secondary' }}>
            We apologize for the inconvenience. Please try refreshing the page or return to the home page.
          </Typography>
          <Button variant="contained" component={Link} to="/">
            GO HOME
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;