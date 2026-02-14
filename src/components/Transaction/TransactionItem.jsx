import { formatDate, formatCurrency } from '../../utils/helpers';

export const TransactionItem = ({ transaction, onEdit, onDelete }) => {
  const isReceita = transaction.tipo === 'receita';

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{isReceita ? '📥' : '📤'}</span>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {transaction.categoria}
              </h3>
              {transaction.subcategoria && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {transaction.subcategoria}
                </p>
              )}
            </div>
          </div>

          {transaction.descricao && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              {transaction.descricao}
            </p>
          )}

          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            {formatDate(transaction.data)}
          </p>
        </div>

        <div className="text-right ml-4">
          <p
            className={`text-xl font-bold ${
              isReceita ? 'text-income' : 'text-expense'
            }`}
          >
            {isReceita ? '+' : '-'} {formatCurrency(transaction.valor)}
          </p>

          <div className="flex gap-2 mt-3">
            <button
              onClick={() => onEdit(transaction)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(transaction.id)}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Apagar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
