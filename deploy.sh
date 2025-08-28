#!/bin/bash

# 🚀 SCRIPT DE DEPLOY AUTOMATIZADO - DataScience Pro
# Desenvolvido com técnica de planejamento de gestão sistêmica para desenvolvimento harmônico sustentável

echo "🧠 DataScience Pro - Deploy Automatizado"
echo "=========================================="

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ Erro: package.json não encontrado. Execute este script no diretório frontend/"
    exit 1
fi

echo "📋 Verificando pré-requisitos..."

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado"
    exit 1
fi

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm não está instalado"
    exit 1
fi

echo "✅ Node.js $(node --version) e npm $(npm --version) encontrados"

echo "📦 Instalando dependências..."
npm ci --production=false

echo "🔍 Verificando tipos TypeScript..."
npm run type-check

echo "🏗️ Construindo aplicação para produção..."
npm run build

echo "📊 Analisando bundle size..."
if [ -d "dist" ]; then
    echo "📁 Arquivos gerados:"
    du -sh dist/*
    echo ""
    
    # Verificar se os arquivos principais existem
    if [ -f "dist/index.html" ]; then
        echo "✅ index.html criado"
    else
        echo "❌ index.html não encontrado"
        exit 1
    fi
    
    if [ -d "dist/assets" ]; then
        echo "✅ Assets criados"
        echo "📁 Arquivos JavaScript:"
        find dist/assets -name "*.js" -exec basename {} \; | head -5
        echo "📁 Arquivos CSS:"
        find dist/assets -name "*.css" -exec basename {} \; | head -5
    else
        echo "⚠️ Diretório assets não encontrado"
    fi
else
    echo "❌ Diretório dist não foi criado"
    exit 1
fi

echo ""
echo "🎉 BUILD CONCLUÍDO COM SUCESSO!"
echo "================================"
echo ""
echo "📋 Próximos passos para deploy no Netlify:"
echo "1. 🌐 Acesse: https://app.netlify.com"
echo "2. 🔑 Faça login com GitHub"
echo "3. ➕ Clique em 'Add new site'"
echo "4. 📂 Escolha 'Import an existing project'"
echo "5. 🐙 Selecione 'Deploy with GitHub'"
echo "6. 🎯 Procure: site-analise-de-dados-completa"
echo "7. ⚙️ Configurações automáticas:"
echo "   - Build command: cd frontend && npm ci && npm run build"
echo "   - Publish directory: frontend/dist"
echo "   - Node version: 18"
echo "8. 🚀 Clique em 'Deploy site'"
echo ""
echo "⏱️ Tempo estimado de deploy: 2-3 minutos"
echo "🌍 URL será gerada automaticamente"
echo ""
echo "🌱 Desenvolvido com gestão sistêmica para desenvolvimento harmônico sustentável"
echo "© 2025 DataScience Pro - Plataforma Científica Avançada"
