# 💰 FinFamília

**App de Gestão Financeira Familiar** - PWA (Progressive Web App)

Uma aplicação moderna, intuitiva e 100% privada para gerir as finanças da tua família. Funciona offline, instalável no telemóvel, sem servidores - todos os dados ficam no teu dispositivo!

[![Versão](https://img.shields.io/badge/versão-1.0.0-green.svg)](https://github.com)
[![Licença](https://img.shields.io/badge/licença-MIT-blue.svg)](LICENSE)
[![PWA](https://img.shields.io/badge/PWA-ready-purple.svg)](https://web.dev/progressive-web-apps/)

---

## ✨ Funcionalidades

### 📊 Gestão Financeira Completa
- ✅ **Registo de despesas e receitas** com categorias e subcategorias
- ✅ **Dashboard interativo** com saldo mensal e resumos
- ✅ **Gráficos visuais** (circular por categoria, barras mensais)
- ✅ **Filtros avançados** por data, tipo, categoria e pesquisa
- ✅ **Relatórios detalhados** com filtros de período

### 📤 Exportação e Backup
- ✅ **Exportação para Excel** (3 folhas: Transações, Resumo por Categoria, Resumo Mensal)
- ✅ **Backup completo em JSON** (exportar/importar dados)
- ✅ **Gestão de categorias** personalizadas

### 🎨 Experiência de Utilizador
- ✅ **Tema claro/escuro** com toggle visual
- ✅ **Interface em Português** de Portugal
- ✅ **Design mobile-first** otimizado para smartphones
- ✅ **Animações suaves** e feedback visual

### 📱 PWA (Progressive Web App)
- ✅ **Instalável** no iPhone, Android e Desktop
- ✅ **Funciona offline** com Service Worker
- ✅ **Sem logins** - privacidade total
- ✅ **Dados locais** - localStorage do browser

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|-----------|-----|
| **React 18** | Framework UI |
| **Tailwind CSS** | Estilização |
| **Vite** | Build tool |
| **Recharts** | Gráficos interativos |
| **SheetJS (xlsx)** | Exportação Excel |
| **localStorage** | Armazenamento local |
| **Service Worker** | Funcionalidade offline |

---

## 🚀 Quick Start

### 1. Instalar dependências
```bash
npm install
```

### 2. Iniciar servidor de desenvolvimento
```bash
npm run dev
```
Abre: http://localhost:3001

### 3. Build de produção
```bash
npm run build
```
Pasta de saída: `dist/`

---

## 📱 Instalação Mobile

### 🍎 iPhone/iPad
1. Abre no **Safari**
2. Toca em **Partilhar** (ícone □↑)
3. Seleciona **"Adicionar ao Ecrã Inicial"**
4. Confirma **"Adicionar"**

### 🤖 Android
1. Abre no **Chrome**
2. Toca nos **três pontos** (⋮)
3. Seleciona **"Instalar aplicação"**
4. Confirma **"Instalar"**

📖 **Guia completo:** Ver [INSTALACAO_MOBILE.md](INSTALACAO_MOBILE.md)

---

## 🌐 Deploy

### Opção 1: Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Opção 2: Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Opção 3: GitHub Pages
```bash
npm install --save-dev gh-pages
npm run deploy
```

📖 **Guia completo:** Ver [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 📂 Estrutura do Projeto

```
FinFamiily_App/
├── public/                      # Assets públicos
│   ├── manifest.json           # PWA manifest
│   ├── service-worker.js       # Service Worker
│   ├── icon-192.png           # Ícone PWA 192x192
│   └── icon-512.png           # Ícone PWA 512x512
├── src/
│   ├── components/
│   │   ├── Dashboard/         # Dashboard e gráficos
│   │   ├── Transaction/       # Formulário e lista
│   │   ├── Reports/           # Relatórios e exportação
│   │   ├── Settings/          # Definições e categorias
│   │   └── Layout/            # Header e navegação
│   ├── hooks/
│   │   ├── useTransactions.js # CRUD de transações
│   │   └── useCategories.js   # Gestão de categorias
│   ├── utils/
│   │   ├── storage.js         # localStorage abstraction
│   │   ├── helpers.js         # Formatação e cálculos
│   │   └── exportExcel.js     # Exportação Excel
│   ├── data/
│   │   └── defaultCategories.js # Categorias predefinidas
│   └── styles/
│       └── globals.css        # Tailwind + custom styles
├── GUIA_UTILIZADOR.md         # Guia do utilizador
├── INSTALACAO_MOBILE.md       # Guia instalação mobile
├── DEPLOYMENT.md              # Guia de deployment
└── README.md                  # Este ficheiro
```

---

## 🎨 Paleta de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| Primary | `#1B4332` | Verde-escuro (confiança) |
| Secondary | `#2D6A4F` | Verde-médio |
| Income | `#40916C` | Receitas (verde) |
| Expense | `#E63946` | Despesas (vermelho) |
| Background Light | `#F8F9FA` | Fundo claro |
| Background Dark | `#1A1A2E` | Fundo escuro |

---

## 📖 Documentação

- **[Guia do Utilizador](GUIA_UTILIZADOR.md)** - Como usar a app
- **[Instalação Mobile](INSTALACAO_MOBILE.md)** - iPhone e Android
- **[Deployment](DEPLOYMENT.md)** - Como publicar
- **[CLAUDE.md](CLAUDE.md)** - Instruções para desenvolvimento

---

## 🔐 Privacidade e Segurança

### 100% Privado
- ✅ **Sem servidores** - Tudo no teu dispositivo
- ✅ **Sem contas** - Não há logins
- ✅ **Sem tracking** - Zero analytics
- ✅ **Dados locais** - localStorage do browser
- ✅ **Offline-first** - Funciona sem internet

### Como funciona
Os dados são guardados no **localStorage** do teu browser/telemóvel. Nunca saem do teu dispositivo. Nem nós temos acesso!

⚠️ **Importante:** Faz backups regulares (Definições > Dados > Exportar Backup)

---

## 🤝 Contribuir

Contribuições são bem-vindas!

1. Fork o projeto
2. Cria uma branch (`git checkout -b feature/MinhaFeature`)
3. Commit (`git commit -m 'Adiciona MinhaFeature'`)
4. Push (`git push origin feature/MinhaFeature`)
5. Abre um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Ver [LICENSE](LICENSE) para mais detalhes.

---

## 🙏 Agradecimentos

Desenvolvido com ❤️ em Portugal 🇵🇹

- Design inspirado em princípios de confiança financeira
- Interface em português de Portugal
- Focado em privacidade e simplicidade

---

## 📞 Suporte

Problemas ou dúvidas? Consulta:
- [Guia do Utilizador](GUIA_UTILIZADOR.md)
- [Issues no GitHub](https://github.com/...)

---

**Feito com React + Tailwind CSS + ❤️**
