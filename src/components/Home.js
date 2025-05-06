import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useCurrency } from '../context/CurrencyContext';

function Home() {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(5.5);
  const [loanTerm, setLoanTerm] = useState(5);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [amortization, setAmortization] = useState([]);
  const { convertCurrency, currency, setCurrency } = useCurrency();

  const calculateMonthlyPayment = () => {
    const principal = loanAmount;
    const monthlyRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTerm * 12;
    
    const payment = principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    setMonthlyPayment(payment.toFixed(2));
    generateAmortizationSchedule(principal, monthlyRate, numberOfPayments, payment);
  };

  const generateAmortizationSchedule = (principal, monthlyRate, numberOfPayments, payment) => {
    let schedule = [];
    let balance = principal;
    
    for (let i = 1; i <= numberOfPayments; i++) {
      const interest = balance * monthlyRate;
      const principalPaid = payment - interest;
      balance -= principalPaid;
      
      schedule.push({
        month: i,
        principal: principalPaid > 0 ? principalPaid : 0,
        interest: interest > 0 ? interest : 0,
        balance: balance > 0 ? balance : 0
      });
    }
    
    setAmortization(schedule);
  };

  const handleReset = () => {
    setMonthlyPayment(0);
    setAmortization([]);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography 
        variant="h4" 
        gutterBottom
        sx={{ mb: 4 }}
      >
        Loan Calculator Dashboard
      </Typography>
      
      <Box component="form" sx={{ mb: 4 }}>
        <Grid container direction="row" spacing={2}>
          <Grid item xs>
            <FormControl fullWidth>
              <TextField
                label="Loan Amount"
                type="text"
                value={loanAmount}
                onChange={(e) => setLoanAmount(parseFloat(e.target.value) || 0)}
                name="amount"
                fullWidth
                inputProps={{
                  style: {
                    WebkitAppearance: 'none',
                    MozAppearance: 'textfield'
                  }
                }}
              />
            </FormControl>
          </Grid>
          
          <Grid item xs>
            <FormControl fullWidth>
              <TextField
                label="Interest Rate (%)"
                type="text"
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                name="rate"
                fullWidth
                inputProps={{
                  style: {
                    WebkitAppearance: 'none',
                    MozAppearance: 'textfield'
                  }
                }}
              />
            </FormControl>
          </Grid>
          
          <Grid item xs>
            <FormControl fullWidth>
              <TextField
                label="Term (Years)"
                type="text"
                value={loanTerm}
                onChange={(e) => setLoanTerm(parseFloat(e.target.value) || 0)}
                name="term"
                fullWidth
                inputProps={{
                  style: {
                    WebkitAppearance: 'none',
                    MozAppearance: 'textfield'
                  }
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      
      <Button 
        variant="contained" 
        onClick={calculateMonthlyPayment}
        sx={{ 
          mt: 1, 
          mb: 3, 
          bgcolor: '#1976d2', 
          '&:hover': { bgcolor: '#1565c0' },
          textTransform: 'uppercase'
        }}
      >
        Calculate
      </Button>
      
      {monthlyPayment > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
            Monthly EMI: ${monthlyPayment}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{ mr: 2 }}>
              <Typography variant="body2" sx={{ mb: 0.5 }}>Currency</Typography>
              <FormControl size="small" sx={{ minWidth: 80 }}>
                <Select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                  <MenuItem value="INR">INR</MenuItem>
                  <MenuItem value="GBP">GBP</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
              Converted EMI: {convertCurrency(monthlyPayment)} {currency}
            </Typography>
            
            <Button 
              variant="outlined" 
              color="secondary" 
              onClick={handleReset}
              sx={{ textTransform: 'uppercase' }}
            >
              Reset Table
            </Button>
          </Box>
          
          <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
            Amortization Schedule ({currency})
          </Typography>
          
          <TableContainer sx={{ maxHeight: 400 }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ py: 2 }}>Month</TableCell>
                  <TableCell sx={{ py: 2 }}>Principal</TableCell>
                  <TableCell sx={{ py: 2 }}>Interest</TableCell>
                  <TableCell sx={{ py: 2 }}>Remaining Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {amortization.map((row) => (
                  <TableRow key={row.month}>
                    <TableCell sx={{ py: 1.5 }}>{row.month}</TableCell>
                    <TableCell sx={{ py: 1.5 }}>{convertCurrency(row.principal).toFixed(2)} {currency}</TableCell>
                    <TableCell sx={{ py: 1.5 }}>{convertCurrency(row.interest).toFixed(2)} {currency}</TableCell>
                    <TableCell sx={{ py: 1.5 }}>{convertCurrency(row.balance).toFixed(2)} {currency}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
}

export default Home;