import { useState } from 'react';

export const useLoanCalculator = (initialAmount = 100000, initialRate = 5, initialTerm = 30) => {
  const [loanAmount, setLoanAmount] = useState(initialAmount);
  const [interestRate, setInterestRate] = useState(initialRate);
  const [loanTerm, setLoanTerm] = useState(initialTerm);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [amortization, setAmortization] = useState([]);

  const calculateMonthlyPayment = () => {
    const principal = loanAmount;
    const monthlyRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTerm * 12;
    
    if (monthlyRate === 0 || numberOfPayments === 0) {
      const payment = principal / numberOfPayments;
      setMonthlyPayment(payment.toFixed(2));
      generateAmortizationSchedule(principal, 0, numberOfPayments, payment);
      return;
    }
    
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

  const resetCalculator = () => {
    setMonthlyPayment(0);
    setAmortization([]);
  };

  return {
    loanAmount,
    setLoanAmount,
    interestRate,
    setInterestRate,
    loanTerm,
    setLoanTerm,
    monthlyPayment,
    amortization,
    calculateMonthlyPayment,
    resetCalculator
  };
};