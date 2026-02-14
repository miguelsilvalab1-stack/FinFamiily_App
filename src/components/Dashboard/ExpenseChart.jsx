import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { groupByCategory, formatCurrency } from '../../utils/helpers';

const COLORS = [
  '#E63946', '#F1FAEE', '#A8DADC', '#457B9D', '#1D3557',
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
  '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739'
];

export const ExpenseChart = ({ transactions }) => {
  const expenseData = useMemo(() => {
    const expenses = transactions.filter(t => t.tipo === 'despesa');
    const grouped = groupByCategory(expenses);

    return grouped.map((item, index) => ({
      name: item.categoria,
      value: item.total,
      color: COLORS[index % COLORS.length]
    }));
  }, [transactions]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-gray-900 dark:text-white">
            {payload[0].name}
          </p>
          <p className="text-expense font-bold">
            {formatCurrency(payload[0].value)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {((payload[0].value / expenseData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  if (expenseData.length === 0) {
    return (
      <div className="card text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">
          Sem despesas para mostrar
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="font-heading text-xl font-bold mb-4">
        Despesas por Categoria
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={expenseData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              percent > 0.05 ? `${name} ${(percent * 100).toFixed(0)}%` : ''
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {expenseData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {expenseData.slice(0, 6).map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
