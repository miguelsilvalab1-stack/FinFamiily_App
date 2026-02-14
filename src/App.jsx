import { useState, useEffect } from 'react';
import { Header } from './components/Layout/Header';
import { BottomNav } from './components/Layout/BottomNav';
import { Dashboard } from './components/Dashboard/Dashboard';
import { TransactionForm } from './components/Transaction/TransactionForm';
import { TransactionList } from './components/Transaction/TransactionList';
import { Reports } from './components/Reports/Reports';
import { Settings } from './components/Settings/Settings';
import { useTransactions } from './hooks/useTransactions';
import { storage } from './utils/storage';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [quickAddType, setQuickAddType] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions();

  // Initialize theme
  useEffect(() => {
    const settings = storage.getSettings();
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleSubmit = (transactionData) => {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, transactionData);
      setEditingTransaction(null);
      setActiveTab('transacoes');
    } else {
      addTransaction(transactionData);
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setActiveTab('registar');
  };

  const handleDelete = (id) => {
    if (confirm('Tem a certeza que deseja apagar esta transação?')) {
      deleteTransaction(id);
    }
  };

  const handleCancelEdit = () => {
    setEditingTransaction(null);
    setQuickAddType(null);
    setActiveTab('transacoes');
  };

  const handleQuickAdd = (tipo) => {
    setQuickAddType(tipo);
    setActiveTab('registar');
  };

  const getPageTitle = () => {
    if (showSettings) return 'Definições';

    switch (activeTab) {
      case 'dashboard':
        return 'FinFamília';
      case 'registar':
        return editingTransaction ? 'Editar Transação' : 'Registar Transação';
      case 'transacoes':
        return 'Transações';
      case 'relatorios':
        return 'Relatórios';
      default:
        return 'FinFamília';
    }
  };

  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-24">
      <Header
        title={getPageTitle()}
        showSettings={!showSettings}
        onSettingsClick={handleSettingsClick}
      />

      <main className="container mx-auto px-4 py-6">
        {showSettings ? (
          <Settings />
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <Dashboard
                transactions={transactions}
                onQuickAdd={handleQuickAdd}
              />
            )}

            {activeTab === 'registar' && (
              <div className="card">
                <TransactionForm
                  onSubmit={handleSubmit}
                  initialData={editingTransaction || (quickAddType ? { tipo: quickAddType } : null)}
                  onCancel={editingTransaction || quickAddType ? handleCancelEdit : null}
                />
              </div>
            )}

            {activeTab === 'transacoes' && (
              <TransactionList
                transactions={transactions}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}

            {activeTab === 'relatorios' && (
              <Reports transactions={transactions} />
            )}
          </>
        )}
      </main>

      {!showSettings && <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />}
    </div>
  );
}

export default App;
