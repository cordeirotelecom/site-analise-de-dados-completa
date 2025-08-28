@echo off
echo ========================================
echo   DataScience Pro - Demo Launcher
echo ========================================
echo.

echo [1/4] Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js não encontrado! Instale em: https://nodejs.org
    pause
    exit /b 1
) else (
    echo ✅ Node.js encontrado
)

echo.
echo [2/4] Verificando Python...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python não encontrado! Instale em: https://python.org
    pause
    exit /b 1
) else (
    echo ✅ Python encontrado
)

echo.
echo [3/4] Instalando dependências do Frontend...
cd frontend
call npm install --silent
if %errorlevel% neq 0 (
    echo ❌ Erro na instalação do frontend
    pause
    exit /b 1
) else (
    echo ✅ Frontend configurado
)

echo.
echo [4/4] Iniciando aplicação...
echo.
echo 🚀 DataScience Pro iniciando em:
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:8000 (quando disponível)
echo.
echo ⚡ Pressione Ctrl+C para parar a aplicação
echo.

start /b npm run dev

echo 🌐 Abrindo navegador...
timeout /t 3 /nobreak >nul
start http://localhost:3000

echo.
echo 📱 Aplicação rodando! Pressione qualquer tecla para parar...
pause >nul

echo.
echo 🛑 Parando aplicação...
taskkill /f /im node.exe >nul 2>&1
taskkill /f /im python.exe >nul 2>&1

echo ✅ Aplicação parada. Obrigado por usar o DataScience Pro!
pause
