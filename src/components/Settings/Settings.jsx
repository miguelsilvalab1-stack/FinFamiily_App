import { useState, useEffect } from 'react';
import { CategoryManager } from './CategoryManager';
import { storage } from '../../utils/storage';

export const Settings = () => {
  const [activeSection, setActiveSection] = useState('geral');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const settings = storage.getSettings();
    setTheme(settings.theme || 'light');
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    storage.saveSettings({ theme: newTheme });

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleExportData = () => {
    try {
      const data = storage.exportData();
      const dataStr = JSON.stringify(data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });

      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `finfamilia_backup_${new Date().toISOString().split('T')[0]}.json`;
      link.click();

      URL.revokeObjectURL(url);
      alert('Backup exportado com sucesso!');
    } catch (error) {
      console.error('Erro ao exportar:', error);
      alert('Erro ao exportar dados.');
    }
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);

        if (confirm('Tem a certeza que deseja importar estes dados? Os dados atuais serão substituídos.')) {
          const success = storage.importData(data);
          if (success) {
            alert('Dados importados com sucesso! A página será recarregada.');
            window.location.reload();
          } else {
            alert('Erro ao importar dados.');
          }
        }
      } catch (error) {
        console.error('Erro ao importar:', error);
        alert('Ficheiro inválido. Por favor, selecione um backup válido.');
      }
    };
    reader.readAsText(file);
  };

  const handleClearAllData = () => {
    if (confirm('ATENÇÃO: Isto irá apagar TODOS os dados (transações, categorias, definições). Esta ação não pode ser revertida. Tem a certeza?')) {
      if (confirm('Última confirmação: deseja mesmo apagar tudo?')) {
        storage.clearAll();
        alert('Todos os dados foram apagados. A página será recarregada.');
        window.location.reload();
      }
    }
  };

  const sections = [
    { id: 'geral', label: 'Geral', icon: '⚙️' },
    { id: 'categorias', label: 'Categorias', icon: '📂' },
    { id: 'dados', label: 'Dados', icon: '💾' },
    { id: 'sobre', label: 'Sobre', icon: 'ℹ️' }
  ];

  return (
    <div className="space-y-6">
      {/* Section Tabs */}
      <div className="card">
        <div className="grid grid-cols-4 gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`py-3 px-2 rounded-lg font-medium transition-all text-sm ${
                activeSection === section.id
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              <div className="text-xl mb-1">{section.icon}</div>
              <div>{section.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Geral */}
      {activeSection === 'geral' && (
        <div className="card">
          <h2 className="font-heading text-xl font-bold mb-6">Definições Gerais</h2>

          {/* Theme Toggle */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Tema</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleThemeChange('light')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  theme === 'light'
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
                }`}
              >
                <div className="text-3xl mb-2">☀️</div>
                <div className="font-medium">Claro</div>
              </button>
              <button
                onClick={() => handleThemeChange('dark')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  theme === 'dark'
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
                }`}
              >
                <div className="text-3xl mb-2">🌙</div>
                <div className="font-medium">Escuro</div>
              </button>
            </div>
          </div>

          {/* App Info */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="font-semibold mb-2">Informação da App</h3>
            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <p>Versão: 1.0.0</p>
              <p>Armazenamento: localStorage (browser)</p>
              <p>PWA: Instalável</p>
            </div>
          </div>
        </div>
      )}

      {/* Categorias */}
      {activeSection === 'categorias' && (
        <div className="card">
          <h2 className="font-heading text-xl font-bold mb-6">Gestão de Categorias</h2>
          <CategoryManager />
        </div>
      )}

      {/* Dados */}
      {activeSection === 'dados' && (
        <div className="space-y-4">
          <div className="card">
            <h2 className="font-heading text-xl font-bold mb-6">Gestão de Dados</h2>

            {/* Export */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Exportar Backup</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Exporta todos os dados (transações, categorias, definições) para um ficheiro JSON.
              </p>
              <button onClick={handleExportData} className="btn-primary w-full">
                📥 Exportar Backup (JSON)
              </button>
            </div>

            {/* Import */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Importar Backup</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Importa dados de um ficheiro de backup. Os dados atuais serão substituídos.
              </p>
              <label className="btn-outline w-full cursor-pointer block text-center">
                📤 Importar Backup (JSON)
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportData}
                  className="hidden"
                />
              </label>
            </div>

            {/* Clear All */}
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg">
              <h3 className="font-semibold text-red-900 dark:text-red-200 mb-2">
                ⚠️ Zona de Perigo
              </h3>
              <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                Apaga TODOS os dados permanentemente. Esta ação não pode ser revertida.
              </p>
              <button
                onClick={handleClearAllData}
                className="btn-outline w-full text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
              >
                🗑️ Apagar Todos os Dados
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sobre */}
      {activeSection === 'sobre' && (
        <div className="card">
          <h2 className="font-heading text-xl font-bold mb-6">Sobre o FinFamília</h2>

          <div className="text-center mb-6">
            <div className="text-6xl mb-4">💰</div>
            <h3 className="font-heading text-2xl font-bold mb-2">FinFamília</h3>
            <p className="text-gray-600 dark:text-gray-400">Versão 1.0.0</p>
          </div>

          <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
            <p>
              <strong className="text-gray-900 dark:text-white">FinFamília</strong> é uma aplicação
              Progressive Web App (PWA) para gestão financeira familiar.
            </p>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Funcionalidades:
              </h4>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Registo de receitas e despesas</li>
                <li>Categorias personalizáveis</li>
                <li>Gráficos e visualizações</li>
                <li>Relatórios detalhados</li>
                <li>Exportação para Excel</li>
                <li>Backup e restauro de dados</li>
                <li>Funciona offline</li>
                <li>Tema claro e escuro</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Tecnologias:
              </h4>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>React 18</li>
                <li>Tailwind CSS</li>
                <li>Recharts</li>
                <li>SheetJS (xlsx)</li>
                <li>localStorage</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-center">
                Desenvolvido com ❤️ em Portugal 🇵🇹
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
