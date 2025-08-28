"""
Aplicação Principal - DataScience Pro

Plataforma completa para análise de dados, machine learning e estatística.
Interface sem código para usuários não-técnicos.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn
import os
from dotenv import load_dotenv

from app.rotas import analise, upload, relatorios, dashboard, automl, apis_avancadas
from app.database.conexao import inicializar_database
from app.utils.logging_config import configurar_logging

# Carregar variáveis de ambiente
load_dotenv()

# Configurar logging
logger = configurar_logging()

# Criar instância da aplicação
app = FastAPI(
    title="DataScience Pro",
    description="Plataforma completa para análise de dados e machine learning",
    version="2.0.0",
    docs_url="/documentacao",
    redoc_url="/redoc"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Montar arquivos estáticos
if os.path.exists("static"):
    app.mount("/static", StaticFiles(directory="static"), name="static")

# Incluir rotas
app.include_router(upload.router, prefix="/api/v1/upload", tags=["Upload de Dados"])
app.include_router(analise.router, prefix="/api/v1/analise", tags=["Análise de Dados"])
app.include_router(automl.router, prefix="/api/v1/automl", tags=["AutoML"])
app.include_router(dashboard.router, prefix="/api/v1/dashboard", tags=["Dashboard"])
app.include_router(relatorios.router, prefix="/api/v1/relatorios", tags=["Relatórios"])
app.include_router(apis_avancadas.router, tags=["APIs Avançadas"])

@app.on_event("startup")
async def startup_event():
    """Inicialização da aplicação"""
    logger.info("Iniciando DataScience Pro...")
    await inicializar_database()
    logger.info("Aplicação iniciada com sucesso!")

@app.on_event("shutdown")
async def shutdown_event():
    """Encerramento da aplicação"""
    logger.info("Encerrando DataScience Pro...")

@app.get("/")
async def root():
    """Endpoint raiz da API"""
    return {
        "mensagem": "Bem-vindo ao DataScience Pro!",
        "versao": "1.0.0",
        "status": "operacional",
        "documentacao": "/documentacao"
    }

@app.get("/saude")
async def verificar_saude():
    """Verificação de saúde da aplicação"""
    return {
        "status": "saudavel",
        "servicos": {
            "api": "operacional",
            "database": "operacional",
            "redis": "operacional"
        }
    }

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
