import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ExchangeRates from './components/ExchangeRates';
import './App.css';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function Home() {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(5);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [amortization, setAmortization] = useState([]);
  const [currency, setCurrency] = useState('USD');

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
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>Loan Calculator Dashboard</Typography>
        <Box>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1">Loan Amount</Typography>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
                min="0"
                required
                style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1">Interest Rate (%)</Typography>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                min="0"
                step="0.1"
                required
                style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1">Term (Years)</Typography>
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(parseFloat(e.target.value))}
                min="1"
                required
                style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
              />
            </Box>
          </Box>
          <Button variant="contained" sx={{ mt: 2 }} onClick={calculateMonthlyPayment}>Calculate</Button>
        </Box>
        {monthlyPayment > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Monthly EMI: ${monthlyPayment}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <FormControl>
                <InputLabel id="currency-label">Currency</InputLabel>
                <Select
                  labelId="currency-label"
                  value={currency}
                  label="Currency"
                  onChange={(e) => setCurrency(e.target.value)}
                  sx={{ minWidth: 100 }}
                >
                  <MenuItem value={'USD'}>USD</MenuItem>
                  <MenuItem value={'EUR'}>EUR</MenuItem>
                  <MenuItem value={'INR'}>INR</MenuItem>
                  <MenuItem value={'GBP'}>GBP</MenuItem>
                  <MenuItem value={'JPY'}>JPY</MenuItem>
                  <MenuItem value={'AUD'}>AUD</MenuItem>
                  <MenuItem value={'CAD'}>CAD</MenuItem>
                </Select>
              </FormControl>
              <Button variant="outlined" color="secondary" onClick={handleReset} sx={{ ml: 'auto' }}>RESET TABLE</Button>
            </Box>
            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Month</TableCell>
                    <TableCell>Principal</TableCell>
                    <TableCell>Interest</TableCell>
                    <TableCell>Remaining Balance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {amortization.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{row.month}</TableCell>
                      <TableCell>{row.principal.toFixed(2)} {currency}</TableCell>
                      <TableCell>{row.interest.toFixed(2)} {currency}</TableCell>
                      <TableCell>{row.balance.toFixed(2)} {currency}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

function About() {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>About This App</Typography>
      <Typography>This is a sample Loan Calculator app built with React and Material UI.</Typography>
    </Container>
  );
}

function ErrorPage() {
  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
        Something went wrong in the application.
      </Typography>
      <Button variant="outlined" component={Link} to="/">
        GO HOME
      </Button>
    </Box>
  );
}

function App() {
  const [mode, setMode] = useState('light');
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = createTheme({ palette: { mode } });
  const handleThemeChange = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  const location = useLocation();

  const hideAppBarRoutes = ['/error', '/error_page'];
  const shouldHideAppBar = hideAppBarRoutes.includes(location.pathname);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'HOME', path: '/' },
    { text: 'EXCHANGE RATES (LIVE)', path: '/exchange-rates' },
    { text: 'ABOUT', path: '/about' },
    { text: 'ERROR PAGE', path: '/error' }
  ];

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem 
          button 
          key={item.text} 
          component={Link} 
          to={item.path}
          onClick={handleDrawerToggle}
          selected={location.pathname === item.path}
        >
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        {!shouldHideAppBar && (
          <AppBar position="static">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Loan Calculator
              </Typography>
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.text}
                    color="inherit"
                    component={Link}
                    to={item.path}
                    sx={{ 
                      bgcolor: location.pathname === item.path ? 'primary.dark' : 'transparent',
                      mx: 0.5
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
                <Switch 
                  checked={mode === 'dark'} 
                  onChange={handleThemeChange} 
                  color="default" 
                  sx={{ ml: 2 }} 
                />
              </Box>
              <Box sx={{ display: { sm: 'none' } }}>
                <Switch 
                  checked={mode === 'dark'} 
                  onChange={handleThemeChange} 
                  color="default"
                />
              </Box>
            </Toolbar>
          </AppBar>
        )}
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
        <Box sx={{ p: 3 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exchange-rates" element={<ExchangeRates />} />
            <Route path="/about" element={<About />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
