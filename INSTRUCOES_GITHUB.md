# 🚀 Instruções para Publicar no GitHub

## 1. Configurar Git (se não estiver configurado)

```bash
# Configure seu nome e email
git config --global user.name "Seu Nome"
git config --global user.email "seuemail@exemplo.com"

# Verifique a configuração
git config --global user.name
git config --global user.email
```

## 2. Fazer Login no GitHub CLI (Opção 1 - Recomendada)

```bash
# Instale o GitHub CLI se não tiver
winget install --id GitHub.cli

# Faça login
gh auth login

# Siga as instruções:
# - Escolha "GitHub.com"
# - Escolha "HTTPS"
# - Escolha "Yes" para autenticar com credenciais
# - Escolha "Login with a web browser"
# - Cole o código que aparecer no navegador
```

## 3. Criar Repositório no GitHub

```bash
# Crie o repositório diretamente pelo CLI
gh repo create site-analise-de-dados-completa --public --description "🚀 Plataforma Completa de Análise de Dados - Substitui SPSS/SAS/Stata com IA e APIs Governamentais"

# Adicione o remote
git remote add origin https://github.com/cordeirotelecom/site-analise-de-dados-completa.git

# Faça o push
git branch -M main
git push -u origin main
```

## 4. Alternativa - Manual pelo Site

Se preferir criar manualmente:

1. Acesse: https://github.com/new
2. Repository name: `site-analise-de-dados-completa`
3. Description: `🚀 Plataforma Completa de Análise de Dados - Substitui SPSS/SAS/Stata com IA e APIs Governamentais`
4. Marque como **Public**
5. **NÃO** adicione README, .gitignore ou license (já temos)
6. Clique em "Create repository"

Depois execute:
```bash
git remote add origin https://github.com/cordeirotelecom/site-analise-de-dados-completa.git
git branch -M main
git push -u origin main
```

## 5. Configurar Netlify

1. Acesse: https://netlify.com
2. Clique em "New site from Git"
3. Conecte com GitHub
4. Selecione o repositório `site-analise-de-dados-completa`
5. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
   - **Base directory**: `frontend`

6. Clique em "Deploy site"

## 6. Configurar Variáveis de Ambiente no Netlify

No painel do Netlify:
1. Vá em Site settings > Environment variables
2. Adicione:
   - `VITE_API_URL`: `https://sua-api.herokuapp.com` (quando deployar o backend)
   - `NODE_VERSION`: `18`

## 7. Deploy do Backend (Opcional - Heroku)

```bash
# Instale Heroku CLI
# Crie conta no Heroku
heroku login

# No diretório backend
cd backend
heroku create seu-app-datasciencepro-api

# Configure variáveis
heroku config:set DATABASE_URL=postgresql://...

# Deploy
git subtree push --prefix backend heroku main
```

## 8. Domínio Personalizado (Opcional)

No Netlify:
1. Vá em Site settings > Domain management
2. Adicione seu domínio personalizado
3. Configure DNS conforme instruções

---

## ✅ Resultado Final

- **GitHub**: https://github.com/cordeirotelecom/site-analise-de-dados-completa
- **Netlify**: https://site-analise-de-dados-completa.netlify.app
- **Domínio**: Seu domínio personalizado (opcional)

## 🔧 Comandos de Manutenção

```bash
# Para fazer updates
git add .
git commit -m "Atualização: descrição"
git push

# Netlify fará deploy automático!
```

## 🆘 Problemas Comuns

1. **Erro de autenticação**: Execute `gh auth login` novamente
2. **Repositório já existe**: Use `gh repo delete` e recrie
3. **Build falha no Netlify**: Verifique logs e dependências
4. **CORS errors**: Configure CORS no backend para o domínio Netlify

---

**Execute os comandos na ordem e seu projeto estará no ar! 🚀**
