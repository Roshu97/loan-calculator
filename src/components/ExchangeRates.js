import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';

function ExchangeRates() {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const API_KEY = "6af1b49b7b615ae2f39153ac";
    
    fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Error fetching rates: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data && data.conversion_rates) {
          setRates(data.conversion_rates);
          setError(null);
        } else {
          throw new Error("Invalid API response format");
        }
      })
      .catch((err) => {
        const errorMessage = err.message.includes('Failed to fetch') 
          ? 'Network error: Please check your internet connection'
          : `Error fetching exchange rates: ${err.message}`;
        setError(errorMessage);
      
        setRates({
          "USD": 1.0000,
          "EUR": 0.9250,
          "GBP": 0.7950,
          "JPY": 151.6500,
          "CNY": 7.2300,
          "AUD": 1.5510,
          "CAD": 1.3600,
          "CHF": 0.8900,
          "HKD": 7.8200,
          "NZD": 1.6700,
          "SGD": 1.3500,
          "INR": 83.4500,
          "MXN": 17.2000,
          "BRL": 5.0400,
          "RUB": 92.5000,
          "ZAR": 19.2000,
          "AED": 3.6725,
          "SAR": 3.7500,
          "KRW": 1350.0000,
          "PLN": 4.0200
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>Loading exchange rates...</Typography>
      </Container>
    );
  }

  const sortedRates = Object.entries(rates).sort((a, b) => a[0].localeCompare(b[0]));
  const paginatedRates = sortedRates.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Container maxWidth="md">
      <Typography variant="h5" component="h1" sx={{ my: 3 }}>Live Exchange Rates (Base: USD)</Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      )}
      
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table aria-label="Exchange rates table">
            <TableHead>
              <TableRow>
                <TableCell>Currency</TableCell>
                <TableCell align="right">Rate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRates.map(([code, rate]) => (
                <TableRow key={code}>
                  <TableCell>{code}</TableCell>
                  <TableCell align="right">{rate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={sortedRates.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
}

export default ExchangeRates;
