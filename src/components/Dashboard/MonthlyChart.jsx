import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { groupByMonth, formatCurrency, getMonthName } from '../../utils/helpers';

export const MonthlyChart = ({ transactions }) => {
  const monthlyData = useMemo(() => {
    const grouped = groupByMonth(transactions);

    // Get last 6 months
    const sortedData = grouped
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-6);

    return sortedData.map(item => {
      const [year, month] = item.month.split('-');
      return {
        month: `${getMonthName(parseInt(month) - 1)} ${year.slice(2)}`,
        Receitas: item.receitas,
        Despesas: item.despesas,
        Saldo: item.saldo
      };
    });
  }, [transactions]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-gray-900 dark:text-white mb-2">
            {label}
          </p>
          {payload.map((entry, index) => (
            <p
              key={index}
              className="text-sm"
              style={{ color: entry.color }}
            >
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (monthlyData.length === 0) {
    return (
      <div className="card text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">
          Sem dados para mostrar
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="font-heading text-xl font-bold mb-4">
        Evolução Mensal (últimos 6 meses)
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="month"
            tick={{ fill: '#6B7280', fontSize: 12 }}
          />
          <YAxis
            tick={{ fill: '#6B7280', fontSize: 12 }}
            tickFormatter={(value) => `${value}€`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="Receitas" fill="#40916C" radius={[8, 8, 0, 0]} />
          <Bar dataKey="Despesas" fill="#E63946" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
