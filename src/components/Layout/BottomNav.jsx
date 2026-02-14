export const BottomNav = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard', label: 'Início', icon: '🏠' },
    { id: 'registar', label: 'Registar', icon: '➕', highlighted: true },
    { id: 'transacoes', label: 'Transações', icon: '📋' },
    { id: 'relatorios', label: 'Relatórios', icon: '📊' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50">
      <div className="container mx-auto px-2">
        <div className="flex items-end justify-around">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center py-3 px-4 transition-all ${
                tab.highlighted
                  ? 'relative -top-4'
                  : ''
              }`}
            >
              {tab.highlighted ? (
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary text-white scale-110'
                      : 'bg-secondary text-white hover:scale-105'
                  }`}
                >
                  {tab.icon}
                </div>
              ) : (
                <>
                  <span className="text-2xl mb-1">{tab.icon}</span>
                  <span
                    className={`text-xs font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'text-primary dark:text-secondary-light'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {tab.label}
                  </span>
                </>
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};
