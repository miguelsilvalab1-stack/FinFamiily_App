// Generate unique ID
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Date formatting
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export const formatDateLong = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

export const getMonthName = (monthIndex) => {
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  return months[monthIndex];
};

export const getCurrentMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

export const getMonthStart = (yearMonth) => {
  return `${yearMonth}-01`;
};

export const getMonthEnd = (yearMonth) => {
  const [year, month] = yearMonth.split('-').map(Number);
  const lastDay = new Date(year, month, 0).getDate();
  return `${yearMonth}-${String(lastDay).padStart(2, '0')}`;
};

// Currency formatting
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR'
  }).format(value);
};

export const parseCurrency = (value) => {
  if (typeof value === 'number') return value;
  const cleaned = value.replace(/[^\d,-]/g, '').replace(',', '.');
  return parseFloat(cleaned) || 0;
};

// Transaction calculations
export const calculateTotal = (transactions, type = null) => {
  return transactions
    .filter(t => !type || t.tipo === type)
    .reduce((sum, t) => sum + parseFloat(t.valor), 0);
};

export const calculateBalance = (transactions) => {
  const receitas = calculateTotal(transactions, 'receita');
  const despesas = calculateTotal(transactions, 'despesa');
  return receitas - despesas;
};

export const groupByCategory = (transactions) => {
  const grouped = {};

  transactions.forEach(transaction => {
    const { categoria, valor, tipo } = transaction;
    if (!grouped[categoria]) {
      grouped[categoria] = {
        categoria,
        tipo,
        total: 0,
        count: 0
      };
    }
    grouped[categoria].total += parseFloat(valor);
    grouped[categoria].count += 1;
  });

  return Object.values(grouped).sort((a, b) => b.total - a.total);
};

export const groupByMonth = (transactions) => {
  const grouped = {};

  transactions.forEach(transaction => {
    const monthKey = transaction.data.substring(0, 7); // YYYY-MM
    if (!grouped[monthKey]) {
      grouped[monthKey] = {
        month: monthKey,
        receitas: 0,
        despesas: 0,
        saldo: 0
      };
    }

    if (transaction.tipo === 'receita') {
      grouped[monthKey].receitas += parseFloat(transaction.valor);
    } else {
      grouped[monthKey].despesas += parseFloat(transaction.valor);
    }
  });

  Object.values(grouped).forEach(month => {
    month.saldo = month.receitas - month.despesas;
  });

  return Object.values(grouped).sort((a, b) => a.month.localeCompare(b.month));
};

// Date filtering
export const filterByDateRange = (transactions, startDate, endDate) => {
  return transactions.filter(t => {
    return t.data >= startDate && t.data <= endDate;
  });
};

export const filterByMonth = (transactions, yearMonth) => {
  const startDate = getMonthStart(yearMonth);
  const endDate = getMonthEnd(yearMonth);
  return filterByDateRange(transactions, startDate, endDate);
};

export const filterByType = (transactions, tipo) => {
  if (!tipo || tipo === 'todas') return transactions;
  return transactions.filter(t => t.tipo === tipo);
};

export const filterByCategory = (transactions, categoria) => {
  if (!categoria || categoria === 'todas') return transactions;
  return transactions.filter(t => t.categoria === categoria);
};

// Search
export const searchTransactions = (transactions, searchTerm) => {
  if (!searchTerm) return transactions;

  const term = searchTerm.toLowerCase();
  return transactions.filter(t =>
    t.descricao?.toLowerCase().includes(term) ||
    t.categoria.toLowerCase().includes(term) ||
    t.subcategoria?.toLowerCase().includes(term)
  );
};

// Validation
export const validateTransaction = (transaction) => {
  const errors = {};

  if (!transaction.tipo) {
    errors.tipo = 'Selecione o tipo de transação';
  }

  if (!transaction.valor || transaction.valor <= 0) {
    errors.valor = 'Insira um valor válido';
  }

  if (!transaction.categoria) {
    errors.categoria = 'Selecione uma categoria';
  }

  if (!transaction.data) {
    errors.data = 'Selecione uma data';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
