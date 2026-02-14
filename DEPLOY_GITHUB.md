# 🚀 Deploy no GitHub Pages - Passo a Passo

## ✅ Pré-requisitos Concluídos

- [x] gh-pages instalado
- [x] Scripts de deploy adicionados ao package.json
- [x] Base path configurado no vite.config.js

---

## 📋 Passo a Passo

### 1️⃣ Inicializar Git (se ainda não fizeste)

```bash
git init
git add .
git commit -m "Initial commit - FinFamília v1.0.0"
```

### 2️⃣ Criar Repositório no GitHub

1. **Vai a GitHub:** https://github.com
2. **Clica em "New repository"** (botão verde)
3. **Preenche:**
   - **Nome:** `FinFamiily_App`
   - **Descrição:** `App de Gestão Financeira Familiar - PWA`
   - **Visibilidade:** Public (ou Private, mas Public é necessário para GitHub Pages gratuito)
   - **NÃO marques** "Initialize with README" (já temos)
4. **Clica em "Create repository"**

### 3️⃣ Conectar ao Repositório GitHub

Copia os comandos que o GitHub mostra (ou usa estes, substituindo [USERNAME]):

```bash
git remote add origin https://github.com/[USERNAME]/FinFamiily_App.git
git branch -M main
git push -u origin main
```

**⚠️ IMPORTANTE:** Substitui `[USERNAME]` pelo teu username do GitHub!

### 4️⃣ Atualizar package.json com teu Username

Edita o ficheiro `package.json` e substitui `[USERNAME]` na linha da `homepage`:

```json
"homepage": "https://[SEU_USERNAME].github.io/FinFamiily_App"
```

Por exemplo, se o teu username for `joaosilva`:
```json
"homepage": "https://joaosilva.github.io/FinFamiily_App"
```

### 5️⃣ Fazer o Deploy

```bash
npm run deploy
```

Este comando vai:
1. Criar o build de produção (`npm run build`)
2. Fazer deploy da pasta `dist/` para o branch `gh-pages`

**Aguarda:** Pode demorar 1-2 minutos.

### 6️⃣ Configurar GitHub Pages

1. **Vai ao repositório no GitHub**
2. **Clica em "Settings"** (tab no topo)
3. **Scroll até "Pages"** (menu lateral esquerdo)
4. **Em "Source":**
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. **Clica em "Save"**

### 7️⃣ Aguardar Deploy

- GitHub vai processar o deploy (1-5 minutos)
- Verás uma mensagem: "Your site is ready to be published at..."
- Quando ficar verde: "Your site is published at..."

### 8️⃣ Testar a App

Abre o URL:
```
https://[USERNAME].github.io/FinFamiily_App/
```

**✅ Deve estar a funcionar!**

---

## 🔄 Fazer Updates (no futuro)

Sempre que fizeres alterações:

```bash
# 1. Commit das alterações
git add .
git commit -m "Descrição das alterações"
git push

# 2. Deploy no GitHub Pages
npm run deploy
```

Aguarda 1-2 minutos e as alterações estarão online!

---

## 🐛 Resolução de Problemas

### "Page not found" (404)
- Verifica que o branch `gh-pages` existe
- Confirma que GitHub Pages está configurado para usar `gh-pages`
- Aguarda alguns minutos (pode demorar)

### Assets não carregam (CSS, JS)
- Verifica que `base: '/FinFamiily_App/'` está no `vite.config.js`
- Verifica que `homepage` está correto no `package.json`
- Rebuild: `npm run deploy`

### "remote: Permission denied"
- Verifica que estás autenticado no GitHub
- Pode ser necessário configurar SSH ou Personal Access Token

### Service Worker não funciona
- GitHub Pages só funciona com HTTPS (já está configurado)
- Limpa cache do browser e recarrega

---

## 📱 Instalar como PWA

Depois do deploy:

1. **Abre a URL no telemóvel**
2. **iPhone:** Safari > Partilhar > Adicionar ao Ecrã Inicial
3. **Android:** Chrome > Menu > Instalar aplicação

---

## 🎯 URL Final

A tua app ficará disponível em:

```
https://[USERNAME].github.io/FinFamiily_App/
```

---

## ✅ Checklist Final

- [ ] Repositório criado no GitHub
- [ ] Username atualizado no package.json (homepage)
- [ ] Git remote configurado
- [ ] Push inicial feito (`git push`)
- [ ] Deploy executado (`npm run deploy`)
- [ ] GitHub Pages configurado (Settings > Pages)
- [ ] Site publicado e acessível
- [ ] PWA funciona (instalar no telemóvel)
- [ ] Service Worker registado (DevTools > Application)

---

## 🎊 Parabéns!

A tua app **FinFamília** está agora online e acessível para qualquer pessoa! 🚀

Partilha o link com amigos e família!

---

**Desenvolvido com ❤️ e publicado no GitHub Pages**
