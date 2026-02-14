# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**FinFamília** is a Progressive Web App (PWA) for family financial management built with React and Tailwind CSS. The app allows users to track expenses and income, visualize financial data, and export reports to Excel. All data is stored locally in the browser's localStorage, requiring no backend or user authentication.

## Key Technical Constraints

- **Language**: All UI text must be in Portuguese (Portugal)
- **Data Storage**: localStorage only (no backend, no database)
- **PWA Requirements**: Must work offline with service worker and manifest.json
- **Export Format**: Excel files with 3 sheets using SheetJS (xlsx library)
- **Mobile-First**: Primary interface designed for smartphones

## Development Phases

The project follows a structured 5-phase development plan defined in `plano-app-financas.md`. **Always develop phase by phase** and wait for user confirmation before proceeding to the next phase:

1. **Fase 1**: Base structure, data layer, transaction form, transaction list, default categories
2. **Fase 2**: Dashboard with balance, charts (circular and bar), bottom navigation
3. **Fase 3**: Reports screen with date filters, Excel export (3 sheets), professional formatting
4. **Fase 4**: Category management, JSON backup/restore, light/dark theme, PWA configuration
5. **Fase 5**: Production build, deployment, mobile installation instructions

## Data Structure

### Transaction Object
```json
{
  "id": "uuid",
  "tipo": "despesa" | "receita",
  "valor": 150.00,
  "categoria": "Alimentação",
  "subcategoria": "Supermercado",
  "descricao": "Compras semanais Continente",
  "data": "2026-02-13",
  "criado_em": "2026-02-13T10:30:00Z"
}
```

### Default Categories
The app includes predefined categories and subcategories for both "Receitas" (income) and "Despesas" (expenses). These are defined in `plano-app-financas.md` lines 41-64 and should be implemented in `src/data/defaultCategories.js`.

## Project Structure

```
src/
├── App.jsx                           # Main app component with routing
├── index.jsx                         # Entry point
├── components/
│   ├── Layout/                       # Bottom nav + header
│   ├── Dashboard/                    # Balance card, charts, quick actions
│   ├── Transaction/                  # Form, list, item components
│   ├── Reports/                      # Reports screen + export button
│   └── Settings/                     # Settings + category manager
├── hooks/
│   ├── useTransactions.js            # Transaction CRUD operations
│   └── useCategories.js              # Category management
├── utils/
│   ├── storage.js                    # localStorage abstraction
│   ├── exportExcel.js                # Excel export with SheetJS
│   └── helpers.js                    # Date formatting, calculations
├── data/
│   └── defaultCategories.js          # Predefined categories structure
└── styles/
    └── globals.css                   # Tailwind imports + custom styles
```

## Color Palette

Follow the defined color scheme for consistency:
- Primary: `#1B4332` (dark green)
- Secondary: `#2D6A4F` (medium green)
- Income: `#40916C` (positive green)
- Expenses: `#E63946` (red)
- Light background: `#F8F9FA`
- Dark background: `#1A1A2E`
- Light text: `#212529`
- Dark text: `#E9ECEF`

## Excel Export Requirements

The exported Excel file must contain exactly 3 sheets:
1. **Transações**: Complete transaction list with columns: Data, Tipo, Categoria, Subcategoria, Descrição, Valor
2. **Resumo por Categoria**: Totals of expenses and income by category
3. **Resumo Mensal**: Monthly totals of income, expenses, and balance

Filename format: `financas_YYYY-MM.xlsx`

## Navigation Structure

Bottom navigation bar with 4 tabs:
1. 🏠 Dashboard
2. ➕ Registar (highlighted center button)
3. 📋 Transações
4. 📊 Relatórios

Settings accessible via ⚙️ icon in top-right corner.

## Important Implementation Notes

- Use React hooks for state management (no Redux/Context unless complexity requires it)
- Implement custom hooks (`useTransactions`, `useCategories`) to abstract localStorage operations
- All dates should use ISO format (YYYY-MM-DD) for consistency
- Transaction IDs should be generated using UUID or timestamp-based unique identifiers
- Charts should use a lightweight library compatible with React (e.g., recharts)
- Service worker should implement cache-first strategy for app shell
- Form validation must prevent negative values and enforce required fields

## Development Workflow

When starting a new phase:
1. Read the relevant section in `plano-app-financas.md`
2. Implement all features for that phase
3. Test functionality (especially localStorage persistence and data display)
4. Wait for user confirmation before proceeding to next phase

## PWA Manifest

The manifest.json must include:
- App name: "FinFamília"
- Start URL: "/"
- Display mode: "standalone"
- Theme color: `#1B4332`
- Icons: 192x192 and 512x512 PNG files
