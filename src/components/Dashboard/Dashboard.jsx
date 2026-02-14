import { useMemo } from 'react';
import {
  calculateTotal,
  calculateBalance,
  formatCurrency,
  filterByMonth,
  getCurrentMonth
} from '../../utils/helpers';
import { ExpenseChart } from './ExpenseChart';
import { MonthlyChart } from './MonthlyChart';

export const Dashboard = ({ transactions, onQuickAdd }) => {
  const currentMonthTransactions = useMemo(() => {
    return filterByMonth(transactions, getCurrentMonth());
  }, [transactions]);

  const receitas = useMemo(() => {
    return calculateTotal(currentMonthTransactions, 'receita');
  }, [currentMonthTransactions]);

  const despesas = useMemo(() => {
    return calculateTotal(currentMonthTransactions, 'despesa');
  }, [currentMonthTransactions]);

  const saldo = useMemo(() => {
    return calculateBalance(currentMonthTransactions);
  }, [currentMonthTransactions]);

  return (
    <div className="space-y-6">
      {/* Saldo Principal */}
      <div className="card bg-gradient-to-br from-primary via-primary-light to-secondary text-white">
        <div className="text-center">
          <p className="text-sm opacity-90 mb-2">Saldo do Mês</p>
          <p className="text-5xl font-bold mb-4">{formatCurrency(saldo)}</p>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-white/20 rounded-lg p-3">
              <p className="text-xs opacity-90">Receitas</p>
              <p className="text-xl font-bold">{formatCurrency(receitas)}</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <p className="text-xs opacity-90">Despesas</p>
              <p className="text-xl font-bold">{formatCurrency(despesas)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Resumo */}
      <div className="card">
        <h2 className="font-heading text-xl font-bold mb-4">Resumo</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Total de Transações</span>
            <span className="font-bold">{currentMonthTransactions.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Receitas</span>
            <span className="font-bold text-income">{formatCurrency(receitas)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Despesas</span>
            <span className="font-bold text-expense">{formatCurrency(despesas)}</span>
          </div>
          <div className="border-t pt-3 flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300 font-semibold">Poupança</span>
            <span className={`font-bold text-xl ${saldo >= 0 ? 'text-income' : 'text-expense'}`}>
              {formatCurrency(saldo)}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onQuickAdd('despesa')}
          className="card hover:shadow-lg transition-shadow bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-2 border-red-200 dark:border-red-800"
        >
          <div className="text-center">
            <span className="text-4xl mb-2 block">📤</span>
            <p className="font-semibold text-red-900 dark:text-red-200">
              + Despesa
            </p>
          </div>
        </button>

        <button
          onClick={() => onQuickAdd('receita')}
          className="card hover:shadow-lg transition-shadow bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-2 border-green-200 dark:border-green-800"
        >
          <div className="text-center">
            <span className="text-4xl mb-2 block">📥</span>
            <p className="font-semibold text-green-900 dark:text-green-200">
              + Receita
            </p>
          </div>
        </button>
      </div>

      {/* Charts */}
      {transactions.length > 0 && (
        <>
          <ExpenseChart transactions={currentMonthTransactions} />
          <MonthlyChart transactions={transactions} />
        </>
      )}

      {/* Info Card */}
      {transactions.length === 0 && (
        <div className="card bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
            👋 Bem-vindo ao FinFamília!
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Comece por registar a sua primeira transação clicando nos botões acima ou no botão ➕ abaixo.
          </p>
        </div>
      )}
    </div>
  );
};
