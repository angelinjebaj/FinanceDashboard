import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const initialTransactions = [
  { id: '1', date: '2026-04-01', description: 'Salary', category: 'Income', type: 'income', amount: 5000, method: 'Direct Deposit', notes: 'Monthly salary' },
  { id: '2', date: '2026-04-02', description: 'Grocery Store', category: 'Food', type: 'expense', amount: 120, method: 'Credit Card', notes: 'Weekly groceries' },
  { id: '3', date: '2026-04-03', description: 'Electric Bill', category: 'Utilities', type: 'expense', amount: 85, method: 'Bank Transfer', notes: 'March bill' },
  { id: '4', date: '2026-04-04', description: 'Internet', category: 'Utilities', type: 'expense', amount: 60, method: 'Credit Card', notes: 'Monthly subscription' },
  { id: '5', date: '2026-04-04', description: 'Restaurant', category: 'Food', type: 'expense', amount: 45, method: 'Debit Card', notes: 'Dinner with friends' },
  { id: '6', date: '2026-04-05', description: 'Side Hustle', category: 'Income', type: 'income', amount: 300, method: 'PayPal', notes: 'Freelance work' },
];

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [role, setRole] = useState('Admin'); // 'Admin' or 'Viewer'

  // Helper functions
  const addTransaction = (transaction) => {
    if (role !== 'Admin') return;
    setTransactions([{ ...transaction, id: Date.now().toString() }, ...transactions]);
  };

  const deleteTransaction = (id) => {
    if (role !== 'Admin') return;
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const editTransaction = (id, updatedTransaction) => {
    if (role !== 'Admin') return;
    setTransactions(transactions.map(t => t.id === id ? { ...updatedTransaction, id } : t));
  };

  return (
    <AppContext.Provider value={{
      transactions,
      role,
      setRole,
      addTransaction,
      deleteTransaction,
      editTransaction
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
