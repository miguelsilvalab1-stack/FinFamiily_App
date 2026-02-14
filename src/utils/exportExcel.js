import * as XLSX from 'xlsx';
import { formatDate, formatCurrency, groupByCategory, groupByMonth } from './helpers';

export const exportToExcel = (transactions, filters = {}) => {
  const workbook = XLSX.utils.book_new();

  // Folha 1: Transações
  const transactionsSheet = createTransactionsSheet(transactions);
  XLSX.utils.book_append_sheet(workbook, transactionsSheet, 'Transações');

  // Folha 2: Resumo por Categoria
  const categorySheet = createCategorySheet(transactions);
  XLSX.utils.book_append_sheet(workbook, categorySheet, 'Resumo por Categoria');

  // Folha 3: Resumo Mensal
  const monthlySheet = createMonthlySheet(transactions);
  XLSX.utils.book_append_sheet(workbook, monthlySheet, 'Resumo Mensal');

  // Gerar nome do ficheiro
  const date = new Date();
  const filename = `financas_${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}.xlsx`;

  // Exportar
  XLSX.writeFile(workbook, filename);

  return filename;
};

// Folha 1: Lista completa de transações
const createTransactionsSheet = (transactions) => {
  const data = transactions
    .sort((a, b) => new Date(b.data) - new Date(a.data))
    .map(t => ({
      'Data': formatDate(t.data),
      'Tipo': t.tipo === 'receita' ? 'Receita' : 'Despesa',
      'Categoria': t.categoria,
      'Subcategoria': t.subcategoria || '-',
      'Descrição': t.descricao || '-',
      'Valor': t.valor
    }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  // Larguras das colunas
  const colWidths = [
    { wch: 12 },  // Data
    { wch: 10 },  // Tipo
    { wch: 20 },  // Categoria
    { wch: 25 },  // Subcategoria
    { wch: 40 },  // Descrição
    { wch: 12 }   // Valor
  ];
  worksheet['!cols'] = colWidths;

  // Formatar coluna de valores como moeda
  const range = XLSX.utils.decode_range(worksheet['!ref']);
  for (let row = 1; row <= range.e.r; row++) {
    const cellAddress = XLSX.utils.encode_cell({ r: row, c: 5 }); // Coluna F (Valor)
    if (worksheet[cellAddress]) {
      worksheet[cellAddress].z = '#,##0.00€';
      worksheet[cellAddress].t = 'n';
    }
  }

  return worksheet;
};

// Folha 2: Totais por categoria
const createCategorySheet = (transactions) => {
  const receitas = groupByCategory(transactions.filter(t => t.tipo === 'receita'));
  const despesas = groupByCategory(transactions.filter(t => t.tipo === 'despesa'));

  const data = [];

  // Receitas
  data.push({ 'Tipo': 'RECEITAS', 'Categoria': '', 'Total': '', 'Quantidade': '' });
  receitas.forEach(cat => {
    data.push({
      'Tipo': '',
      'Categoria': cat.categoria,
      'Total': cat.total,
      'Quantidade': cat.count
    });
  });
  const totalReceitas = receitas.reduce((sum, cat) => sum + cat.total, 0);
  data.push({
    'Tipo': '',
    'Categoria': 'TOTAL RECEITAS',
    'Total': totalReceitas,
    'Quantidade': receitas.reduce((sum, cat) => sum + cat.count, 0)
  });

  // Linha em branco
  data.push({ 'Tipo': '', 'Categoria': '', 'Total': '', 'Quantidade': '' });

  // Despesas
  data.push({ 'Tipo': 'DESPESAS', 'Categoria': '', 'Total': '', 'Quantidade': '' });
  despesas.forEach(cat => {
    data.push({
      'Tipo': '',
      'Categoria': cat.categoria,
      'Total': cat.total,
      'Quantidade': cat.count
    });
  });
  const totalDespesas = despesas.reduce((sum, cat) => sum + cat.total, 0);
  data.push({
    'Tipo': '',
    'Categoria': 'TOTAL DESPESAS',
    'Total': totalDespesas,
    'Quantidade': despesas.reduce((sum, cat) => sum + cat.count, 0)
  });

  // Linha em branco
  data.push({ 'Tipo': '', 'Categoria': '', 'Total': '', 'Quantidade': '' });

  // Saldo
  data.push({
    'Tipo': '',
    'Categoria': 'SALDO',
    'Total': totalReceitas - totalDespesas,
    'Quantidade': ''
  });

  const worksheet = XLSX.utils.json_to_sheet(data);

  // Larguras das colunas
  const colWidths = [
    { wch: 15 },  // Tipo
    { wch: 30 },  // Categoria
    { wch: 15 },  // Total
    { wch: 12 }   // Quantidade
  ];
  worksheet['!cols'] = colWidths;

  // Formatar coluna de valores como moeda
  const range = XLSX.utils.decode_range(worksheet['!ref']);
  for (let row = 1; row <= range.e.r; row++) {
    const cellAddress = XLSX.utils.encode_cell({ r: row, c: 2 }); // Coluna C (Total)
    if (worksheet[cellAddress] && typeof worksheet[cellAddress].v === 'number') {
      worksheet[cellAddress].z = '#,##0.00€';
      worksheet[cellAddress].t = 'n';
    }
  }

  return worksheet;
};

// Folha 3: Resumo mensal
const createMonthlySheet = (transactions) => {
  const monthly = groupByMonth(transactions);

  const data = monthly.map(m => {
    const [year, month] = m.month.split('-');
    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    return {
      'Mês': `${monthNames[parseInt(month) - 1]} ${year}`,
      'Receitas': m.receitas,
      'Despesas': m.despesas,
      'Saldo': m.saldo
    };
  });

  // Adicionar totais
  const totalReceitas = monthly.reduce((sum, m) => sum + m.receitas, 0);
  const totalDespesas = monthly.reduce((sum, m) => sum + m.despesas, 0);
  const totalSaldo = totalReceitas - totalDespesas;

  data.push({
    'Mês': '',
    'Receitas': '',
    'Despesas': '',
    'Saldo': ''
  });

  data.push({
    'Mês': 'TOTAL',
    'Receitas': totalReceitas,
    'Despesas': totalDespesas,
    'Saldo': totalSaldo
  });

  const worksheet = XLSX.utils.json_to_sheet(data);

  // Larguras das colunas
  const colWidths = [
    { wch: 20 },  // Mês
    { wch: 15 },  // Receitas
    { wch: 15 },  // Despesas
    { wch: 15 }   // Saldo
  ];
  worksheet['!cols'] = colWidths;

  // Formatar colunas de valores como moeda
  const range = XLSX.utils.decode_range(worksheet['!ref']);
  for (let row = 1; row <= range.e.r; row++) {
    for (let col = 1; col <= 3; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
      if (worksheet[cellAddress] && typeof worksheet[cellAddress].v === 'number') {
        worksheet[cellAddress].z = '#,##0.00€';
        worksheet[cellAddress].t = 'n';
      }
    }
  }

  return worksheet;
};
