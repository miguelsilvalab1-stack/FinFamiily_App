import { useMemo } from 'react';
import { groupByCategory, formatCurrency } from '../../utils/helpers';

export const CategorySummary = ({ transactions }) => {
  const summaries = useMemo(() => {
    const receitas = groupByCategory(transactions.filter(t => t.tipo === 'receita'));
    const despesas = groupByCategory(transactions.filter(t => t.tipo === 'despesa'));

    const totalReceitas = receitas.reduce((sum, cat) => sum + cat.total, 0);
    const totalDespesas = despesas.reduce((sum, cat) => sum + cat.total, 0);

    return {
      receitas,
      despesas,
      totalReceitas,
      totalDespesas,
      saldo: totalReceitas - totalDespesas
    };
  }, [transactions]);

  const CategoryList = ({ title, items, total, color }) => (
    <div className="mb-6">
      <h3 className="font-heading text-lg font-bold mb-3 flex items-center gap-2">
        <span>{title}</span>
        <span className={`text-sm font-normal ${color}`}>
          {formatCurrency(total)}
        </span>
      </h3>
      {items.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm">Sem dados</p>
      ) : (
        <div className="space-y-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {item.categoria}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {item.count} {item.count === 1 ? 'transação' : 'transações'}
                </p>
              </div>
              <div className="text-right">
                <p className={`font-bold ${color}`}>
                  {formatCurrency(item.total)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {((item.total / total) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="card">
      <h2 className="font-heading text-xl font-bold mb-6">Resumo por Categoria</h2>

      {/* Receitas */}
      <CategoryList
        title="📥 Receitas"
        items={summaries.receitas}
        total={summaries.totalReceitas}
        color="text-income"
      />

      {/* Despesas */}
      <CategoryList
        title="📤 Despesas"
        items={summaries.despesas}
        total={summaries.totalDespesas}
        color="text-expense"
      />

      {/* Totais */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Receitas</p>
            <p className="font-bold text-income">{formatCurrency(summaries.totalReceitas)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Despesas</p>
            <p className="font-bold text-expense">{formatCurrency(summaries.totalDespesas)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Saldo</p>
            <p className={`font-bold text-lg ${summaries.saldo >= 0 ? 'text-income' : 'text-expense'}`}>
              {formatCurrency(summaries.saldo)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
