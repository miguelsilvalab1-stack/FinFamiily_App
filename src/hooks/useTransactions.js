import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { generateId } from '../utils/helpers';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = () => {
    setLoading(true);
    const data = storage.getTransactions();
    setTransactions(data);
    setLoading(false);
  };

  const addTransaction = (transactionData) => {
    const newTransaction = {
      id: generateId(),
      ...transactionData,
      criado_em: new Date().toISOString()
    };

    const success = storage.addTransaction(newTransaction);
    if (success) {
      setTransactions(prev => [...prev, newTransaction]);
    }
    return success;
  };

  const updateTransaction = (id, updates) => {
    const success = storage.updateTransaction(id, updates);
    if (success) {
      setTransactions(prev =>
        prev.map(t => (t.id === id ? { ...t, ...updates } : t))
      );
    }
    return success;
  };

  const deleteTransaction = (id) => {
    const success = storage.deleteTransaction(id);
    if (success) {
      setTransactions(prev => prev.filter(t => t.id !== id));
    }
    return success;
  };

  const getTransactionById = (id) => {
    return transactions.find(t => t.id === id);
  };

  return {
    transactions,
    loading,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionById,
    refreshTransactions: loadTransactions
  };
};
