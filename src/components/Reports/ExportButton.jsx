import { useState } from 'react';
import { exportToExcel } from '../../utils/exportExcel';

export const ExportButton = ({ transactions, disabled = false }) => {
  const [exporting, setExporting] = useState(false);

  const handleExport = () => {
    if (transactions.length === 0) {
      alert('Não há transações para exportar.');
      return;
    }

    setExporting(true);

    try {
      const filename = exportToExcel(transactions);

      // Feedback visual
      setTimeout(() => {
        setExporting(false);
        alert(`Ficheiro exportado com sucesso: ${filename}`);
      }, 500);
    } catch (error) {
      console.error('Erro ao exportar:', error);
      setExporting(false);
      alert('Erro ao exportar ficheiro. Tente novamente.');
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={disabled || exporting || transactions.length === 0}
      className="btn-primary w-full flex items-center justify-center gap-2"
    >
      {exporting ? (
        <>
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>A exportar...</span>
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Exportar para Excel</span>
        </>
      )}
    </button>
  );
};
