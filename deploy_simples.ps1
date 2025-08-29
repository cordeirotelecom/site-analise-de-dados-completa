# Script de Deploy Simplificado para Netlify
# DataScience Pro - Plataforma Completa de Análise de Dados

Write-Host "=== DEPLOY NETLIFY - DATASCIENCEPRO ===" -ForegroundColor Cyan
Write-Host ""

# 1. Verificar se estamos no diretório correto
if (!(Test-Path "frontend/package.json")) {
    Write-Host "Erro: Execute este script na raiz do projeto!" -ForegroundColor Red
    exit 1
}

Write-Host "1. Navegando para o frontend..." -ForegroundColor Yellow
Set-Location "frontend"

Write-Host "2. Verificando dependências..." -ForegroundColor Yellow
if (!(Test-Path "node_modules")) {
    Write-Host "Instalando dependências..." -ForegroundColor Yellow
    npm install
}

Write-Host "3. Executando build de produção..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "BUILD CONCLUÍDO COM SUCESSO!" -ForegroundColor Green
    Write-Host ""
    Write-Host "=== PRÓXIMOS PASSOS ===" -ForegroundColor Cyan
    Write-Host "1. Acesse: https://netlify.com" -ForegroundColor White
    Write-Host "2. Clique em 'Add new site' > 'Deploy manually'" -ForegroundColor White
    Write-Host "3. Arraste a pasta 'dist' para o Netlify" -ForegroundColor White
    Write-Host "4. Aguarde o deploy automatico" -ForegroundColor White
    Write-Host ""
    Write-Host "PASTA PARA UPLOAD: frontend/dist" -ForegroundColor Green
    Write-Host ""
    
    # Abrir a pasta dist no Explorer
    if (Test-Path "dist") {
        Write-Host "Abrindo pasta dist no Explorer..." -ForegroundColor Yellow
        Invoke-Item "dist"
    }
    
    # Abrir Netlify no navegador
    Write-Host "Abrindo Netlify no navegador..." -ForegroundColor Yellow
    Start-Process "https://netlify.com/drop"
    
} else {
    Write-Host "ERRO NO BUILD!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "DEPLOY PRONTO! Seu site estará online em instantes!" -ForegroundColor Green
