import React, { createContext, useState, useContext, useEffect } from 'react';

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        if (!response.ok) {
          throw new Error('Failed to fetch exchange rates');
        }
        const data = await response.json();
        setExchangeRates(data.rates);
        setError(null);
      } catch (err) {
        setError('Error fetching exchange rates');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  const convertCurrency = (amount, from = 'USD', to = currency) => {
    if (!exchangeRates || !exchangeRates[from] || !exchangeRates[to]) {
      return amount;
    }
    
    // Convert to USD first (base currency)
    const amountInUSD = from === 'USD' ? amount : amount / exchangeRates[from];
    // Then convert from USD to target currency
    return to === 'USD' ? amountInUSD : amountInUSD * exchangeRates[to];
  };

  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      setCurrency, 
      exchangeRates, 
      loading, 
      error, 
      convertCurrency 
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);