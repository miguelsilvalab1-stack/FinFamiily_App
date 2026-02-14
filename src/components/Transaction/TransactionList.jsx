import { useState, useMemo } from 'react';
import { TransactionItem } from './TransactionItem';
import {
  filterByType,
  filterByCategory,
  searchTransactions,
  calculateTotal,
  formatCurrency,
  getCurrentMonth,
  filterByMonth
} from '../../utils/helpers';
import { useCategories } from '../../hooks/useCategories';

export const TransactionList = ({ transactions, onEdit, onDelete }) => {
  const { categories } = useCategories();
  const [filters, setFilters] = useState({
    tipo: 'todas',
    categoria: 'todas',
    mes: getCurrentMonth(),
    search: ''
  });

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    result = filterByMonth(result, filters.mes);
    result = filterByType(result, filters.tipo);
    result = filterByCategory(result, filters.categoria);
    result = searchTransactions(result, filters.search);

    return result.sort((a, b) => new Date(b.data) - new Date(a.data));
  }, [transactions, filters]);

  const total = useMemo(() => {
    return calculateTotal(filteredTransactions);
  }, [filteredTransactions]);

  const allCategories = useMemo(() => {
    const receitas = categories.receita?.map(c => c.categoria) || [];
    const despesas = categories.despesa?.map(c => c.categoria) || [];
    return [...new Set([...receitas, ...despesas])];
  }, [categories]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="card">
        <h2 className="font-heading text-xl font-bold mb-4">Filtros</h2>

        <div className="space-y-4">
          {/* Search */}
          <div>
            <input
              type="text"
              placeholder="Pesquisar por descrição..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="input-field"
            />
          </div>

          {/* Month */}
          <div>
            <label className="label">Mês</label>
            <input
              type="month"
              value={filters.mes}
              onChange={(e) => handleFilterChange('mes', e.target.value)}
              className="input-field"
            />
          </div>

          {/* Type */}
          <div>
            <label className="label">Tipo</label>
            <select
              value={filters.tipo}
              onChange={(e) => handleFilterChange('tipo', e.target.value)}
              className="input-field"
            >
              <option value="todas">Todas</option>
              <option value="receita">Receitas</option>
              <option value="despesa">Despesas</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="label">Categoria</label>
            <select
              value={filters.categoria}
              onChange={(e) => handleFilterChange('categoria', e.target.value)}
              className="input-field"
            >
              <option value="todas">Todas</option>
              {allCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="card bg-gradient-to-r from-primary to-secondary text-white">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm opacity-90">Total Filtrado</p>
            <p className="text-3xl font-bold">{formatCurrency(Math.abs(total))}</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">Transações</p>
            <p className="text-3xl font-bold">{filteredTransactions.length}</p>
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="space-y-4">
        {filteredTransactions.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              Nenhuma transação encontrada
            </p>
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};
