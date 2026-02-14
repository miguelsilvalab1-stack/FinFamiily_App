import { useState, useMemo } from 'react';
import {
  filterByDateRange,
  formatCurrency,
  calculateTotal,
  calculateBalance,
  getMonthStart,
  getMonthEnd,
  getCurrentMonth,
  groupByCategory
} from '../../utils/helpers';
import { CategorySummary } from './CategorySummary';
import { ExportButton } from './ExportButton';
import { ExpenseChart } from '../Dashboard/ExpenseChart';
import { MonthlyChart } from '../Dashboard/MonthlyChart';

export const Reports = ({ transactions }) => {
  const [periodo, setPeriodo] = useState('mes');
  const [dataInicio, setDataInicio] = useState(getMonthStart(getCurrentMonth()));
  const [dataFim, setDataFim] = useState(getMonthEnd(getCurrentMonth()));

  // Filtrar transações
  const filteredTransactions = useMemo(() => {
    if (periodo === 'mes') {
      const currentMonth = getCurrentMonth();
      return filterByDateRange(
        transactions,
        getMonthStart(currentMonth),
        getMonthEnd(currentMonth)
      );
    } else if (periodo === 'trimestre') {
      const now = new Date();
      const currentQuarter = Math.floor(now.getMonth() / 3);
      const startMonth = currentQuarter * 3;
      const endMonth = startMonth + 2;

      const startDate = `${now.getFullYear()}-${String(startMonth + 1).padStart(2, '0')}-01`;
      const endDateObj = new Date(now.getFullYear(), endMonth + 1, 0);
      const endDate = endDateObj.toISOString().split('T')[0];

      return filterByDateRange(transactions, startDate, endDate);
    } else if (periodo === 'ano') {
      const year = new Date().getFullYear();
      return filterByDateRange(transactions, `${year}-01-01`, `${year}-12-31`);
    } else {
      return filterByDateRange(transactions, dataInicio, dataFim);
    }
  }, [transactions, periodo, dataInicio, dataFim]);

  // Calcular totais
  const receitas = useMemo(() => calculateTotal(filteredTransactions, 'receita'), [filteredTransactions]);
  const despesas = useMemo(() => calculateTotal(filteredTransactions, 'despesa'), [filteredTransactions]);
  const saldo = useMemo(() => calculateBalance(filteredTransactions), [filteredTransactions]);

  // Top 5 categorias
  const topCategorias = useMemo(() => {
    const despesasOnly = filteredTransactions.filter(t => t.tipo === 'despesa');
    const grouped = groupByCategory(despesasOnly);
    return grouped.slice(0, 5);
  }, [filteredTransactions]);

  const handlePeriodoChange = (newPeriodo) => {
    setPeriodo(newPeriodo);

    if (newPeriodo === 'mes') {
      const currentMonth = getCurrentMonth();
      setDataInicio(getMonthStart(currentMonth));
      setDataFim(getMonthEnd(currentMonth));
    }
  };

  return (
    <div className="space-y-6">
      {/* Filtros de Período */}
      <div className="card">
        <h2 className="font-heading text-xl font-bold mb-4">Período</h2>

        <div className="grid grid-cols-4 gap-2 mb-4">
          {['mes', 'trimestre', 'ano', 'personalizado'].map((p) => (
            <button
              key={p}
              onClick={() => handlePeriodoChange(p)}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                periodo === p
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              {p === 'mes' && 'Mês'}
              {p === 'trimestre' && 'Trim.'}
              {p === 'ano' && 'Ano'}
              {p === 'personalizado' && 'Custom'}
            </button>
          ))}
        </div>

        {periodo === 'personalizado' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Data Início</label>
              <input
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="label">Data Fim</label>
              <input
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                className="input-field"
              />
            </div>
          </div>
        )}
      </div>

      {/* Totais */}
      <div className="card bg-gradient-to-br from-primary via-primary-light to-secondary text-white">
        <h2 className="font-heading text-lg font-bold mb-4">Resumo do Período</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-xs opacity-90 mb-1">Receitas</p>
            <p className="text-2xl font-bold">{formatCurrency(receitas)}</p>
          </div>
          <div className="text-center">
            <p className="text-xs opacity-90 mb-1">Despesas</p>
            <p className="text-2xl font-bold">{formatCurrency(despesas)}</p>
          </div>
          <div className="text-center">
            <p className="text-xs opacity-90 mb-1">Saldo</p>
            <p className="text-2xl font-bold">{formatCurrency(saldo)}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/20 text-center">
          <p className="text-xs opacity-90 mb-1">Total de Transações</p>
          <p className="text-xl font-bold">{filteredTransactions.length}</p>
        </div>
      </div>

      {/* Top 5 Categorias */}
      {topCategorias.length > 0 && (
        <div className="card">
          <h2 className="font-heading text-xl font-bold mb-4">
            Top 5 Categorias (Despesas)
          </h2>
          <div className="space-y-3">
            {topCategorias.map((cat, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{cat.categoria}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {cat.count} {cat.count === 1 ? 'transação' : 'transações'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-expense">{formatCurrency(cat.total)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gráficos */}
      {filteredTransactions.length > 0 && (
        <>
          <ExpenseChart transactions={filteredTransactions} />
          <MonthlyChart transactions={transactions} />
        </>
      )}

      {/* Resumo por Categoria */}
      <CategorySummary transactions={filteredTransactions} />

      {/* Botão de Exportação */}
      <div className="card bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-2 border-green-200 dark:border-green-800">
        <h3 className="font-heading text-lg font-bold mb-2 text-gray-900 dark:text-white">
          📊 Exportar Relatório
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Exporte todas as transações para Excel (formato .xlsx) com 3 folhas: Transações, Resumo por Categoria e Resumo Mensal.
        </p>
        <ExportButton transactions={filteredTransactions} />
      </div>

      {filteredTransactions.length === 0 && (
        <div className="card text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            Sem transações no período selecionado
          </p>
        </div>
      )}
    </div>
  );
};
