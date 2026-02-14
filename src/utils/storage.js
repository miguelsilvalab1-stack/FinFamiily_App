const STORAGE_KEYS = {
  TRANSACTIONS: 'finfamilia_transactions',
  CATEGORIES: 'finfamilia_categories',
  SETTINGS: 'finfamilia_settings'
};

export const storage = {
  // Transactions
  getTransactions() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Erro ao ler transações:', error);
      return [];
    }
  },

  saveTransactions(transactions) {
    try {
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
      return true;
    } catch (error) {
      console.error('Erro ao guardar transações:', error);
      return false;
    }
  },

  addTransaction(transaction) {
    const transactions = this.getTransactions();
    transactions.push(transaction);
    return this.saveTransactions(transactions);
  },

  updateTransaction(id, updatedTransaction) {
    const transactions = this.getTransactions();
    const index = transactions.findIndex(t => t.id === id);
    if (index !== -1) {
      transactions[index] = { ...transactions[index], ...updatedTransaction };
      return this.saveTransactions(transactions);
    }
    return false;
  },

  deleteTransaction(id) {
    const transactions = this.getTransactions();
    const filtered = transactions.filter(t => t.id !== id);
    return this.saveTransactions(filtered);
  },

  // Categories
  getCategories() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Erro ao ler categorias:', error);
      return null;
    }
  },

  saveCategories(categories) {
    try {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
      return true;
    } catch (error) {
      console.error('Erro ao guardar categorias:', error);
      return false;
    }
  },

  // Settings
  getSettings() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : { theme: 'light' };
    } catch (error) {
      console.error('Erro ao ler definições:', error);
      return { theme: 'light' };
    }
  },

  saveSettings(settings) {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      return true;
    } catch (error) {
      console.error('Erro ao guardar definições:', error);
      return false;
    }
  },

  // Backup/Restore
  exportData() {
    return {
      transactions: this.getTransactions(),
      categories: this.getCategories(),
      settings: this.getSettings(),
      exportDate: new Date().toISOString()
    };
  },

  importData(data) {
    try {
      if (data.transactions) this.saveTransactions(data.transactions);
      if (data.categories) this.saveCategories(data.categories);
      if (data.settings) this.saveSettings(data.settings);
      return true;
    } catch (error) {
      console.error('Erro ao importar dados:', error);
      return false;
    }
  },

  clearAll() {
    localStorage.removeItem(STORAGE_KEYS.TRANSACTIONS);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
  }
};
