# 🚀 SCRIPT DE DEPLOY AUTOMATIZADO - DataScience Pro (Windows PowerShell)
# Desenvolvido com técnica de planejamento de gestão sistêmica para desenvolvimento harmônico sustentável

Write-Host "🧠 DataScience Pro - Deploy Automatizado" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# Verificar se estamos no diretório correto
if (-not (Test-Path "frontend\package.json")) {
    Write-Host "❌ Erro: frontend\package.json não encontrado." -ForegroundColor Red
    Write-Host "Execute este script no diretório raiz do projeto" -ForegroundColor Red
    exit 1
}

Write-Host "📋 Verificando pré-requisitos..." -ForegroundColor Yellow

# Verificar Node.js
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js $nodeVersion encontrado" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js não está instalado" -ForegroundColor Red
    exit 1
}

# Verificar npm
try {
    $npmVersion = npm --version
    Write-Host "✅ npm $npmVersion encontrado" -ForegroundColor Green
} catch {
    Write-Host "❌ npm não está instalado" -ForegroundColor Red
    exit 1
}

# Entrar no diretório frontend
Set-Location "frontend"

Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
npm ci --production=false

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao instalar dependências" -ForegroundColor Red
    exit 1
}

Write-Host "🔍 Verificando tipos TypeScript..." -ForegroundColor Yellow
npm run type-check

Write-Host "🏗️ Construindo aplicação para produção..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro durante o build" -ForegroundColor Red
    exit 1
}

Write-Host "📊 Analisando resultado do build..." -ForegroundColor Yellow

if (Test-Path "dist") {
    Write-Host "📁 Arquivos gerados:" -ForegroundColor Cyan
    
    # Verificar arquivos principais
    if (Test-Path "dist\index.html") {
        Write-Host "✅ index.html criado" -ForegroundColor Green
    } else {
        Write-Host "❌ index.html não encontrado" -ForegroundColor Red
        exit 1
    }
    
    if (Test-Path "dist\assets") {
        Write-Host "✅ Assets criados" -ForegroundColor Green
        
        $jsFiles = Get-ChildItem "dist\assets\*.js" | Select-Object -First 5
        $cssFiles = Get-ChildItem "dist\assets\*.css" | Select-Object -First 5
        
        Write-Host "📁 Arquivos JavaScript:" -ForegroundColor Cyan
        $jsFiles | ForEach-Object { Write-Host "  - $($_.Name)" }
        
        Write-Host "📁 Arquivos CSS:" -ForegroundColor Cyan
        $cssFiles | ForEach-Object { Write-Host "  - $($_.Name)" }
    } else {
        Write-Host "⚠️ Diretório assets não encontrado" -ForegroundColor Yellow
    }
    
    # Mostrar tamanho do build
    $distSize = (Get-ChildItem -Recurse "dist" | Measure-Object -Property Length -Sum).Sum / 1MB
    Write-Host "📏 Tamanho total do build: $([math]::Round($distSize, 2)) MB" -ForegroundColor Cyan
    
} else {
    Write-Host "❌ Diretório dist não foi criado" -ForegroundColor Red
    exit 1
}

# Voltar ao diretório raiz
Set-Location ".."

Write-Host ""
Write-Host "🎉 BUILD CONCLUÍDO COM SUCESSO!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos passos para deploy no Netlify:" -ForegroundColor Cyan
Write-Host "1. 🌐 Acesse: https://app.netlify.com" -ForegroundColor White
Write-Host "2. 🔑 Faça login com GitHub" -ForegroundColor White
Write-Host "3. ➕ Clique em 'Add new site'" -ForegroundColor White
Write-Host "4. 📂 Escolha 'Import an existing project'" -ForegroundColor White
Write-Host "5. 🐙 Selecione 'Deploy with GitHub'" -ForegroundColor White
Write-Host "6. 🎯 Procure: site-analise-de-dados-completa" -ForegroundColor White
Write-Host "7. ⚙️ Configurações automáticas:" -ForegroundColor White
Write-Host "   - Build command: cd frontend && npm ci && npm run build" -ForegroundColor Gray
Write-Host "   - Publish directory: frontend/dist" -ForegroundColor Gray
Write-Host "   - Node version: 18" -ForegroundColor Gray
Write-Host "8. 🚀 Clique em 'Deploy site'" -ForegroundColor White
Write-Host ""
Write-Host "⏱️ Tempo estimado de deploy: 2-3 minutos" -ForegroundColor Yellow
Write-Host "🌍 URL será gerada automaticamente" -ForegroundColor Yellow
Write-Host ""
Write-Host "🌱 Desenvolvido com gestão sistêmica para desenvolvimento harmônico sustentável" -ForegroundColor Green
Write-Host "© 2025 DataScience Pro - Plataforma Científica Avançada" -ForegroundColor Green

# Abrir o Netlify no navegador
Write-Host ""
$openBrowser = Read-Host "Deseja abrir o Netlify no navegador agora? (s/n)"
if ($openBrowser -eq "s" -or $openBrowser -eq "S" -or $openBrowser -eq "sim") {
    Start-Process "https://app.netlify.com/start"
    Write-Host "🌐 Netlify aberto no navegador!" -ForegroundColor Green
}
