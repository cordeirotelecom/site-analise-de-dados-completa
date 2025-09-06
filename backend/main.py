"""
DataScience Pro - Backend Principal
Sistema completo de análise de dados com FastAPI
"""

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
import uvicorn
import pandas as pd
import numpy as np
import json
import io
from typing import List, Dict, Any, Optional
from datetime import datetime
import logging

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Criar aplicação FastAPI
app = FastAPI(
    title="DataScience Pro API",
    description="API completa para análise de dados científicos",
    version="3.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, especificar domínios específicos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Variável global para armazenar dados carregados
dados_sessao = {}

@app.get("/")
async def root():
    """Endpoint raiz com informações da API"""
    return {
        "message": "DataScience Pro API v3.0",
        "status": "online",
        "timestamp": datetime.now().isoformat(),
        "endpoints": {
            "upload": "/api/upload",
            "analyze": "/api/analyze",
            "docs": "/api/docs",
            "health": "/api/health"
        }
    }

@app.get("/api/health")
async def health_check():
    """Verificação de saúde da API"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "version": "3.0.0"
    }

@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    """
    Upload e processamento de arquivos de dados
    Suporta CSV, JSON, Excel
    """
    try:
        logger.info(f"Recebendo arquivo: {file.filename}")
        
        # Ler conteúdo do arquivo
        content = await file.read()
        
        # Processar baseado no tipo de arquivo
        if file.filename.endswith('.csv'):
            df = pd.read_csv(io.StringIO(content.decode('utf-8')))
        elif file.filename.endswith('.json'):
            data = json.loads(content.decode('utf-8'))
            df = pd.DataFrame(data)
        elif file.filename.endswith(('.xlsx', '.xls')):
            df = pd.read_excel(io.BytesIO(content))
        else:
            raise HTTPException(
                status_code=400, 
                detail="Formato de arquivo não suportado. Use CSV, JSON ou Excel."
            )
        
        # Análise básica dos dados
        analysis = {
            "filename": file.filename,
            "rows": len(df),
            "columns": len(df.columns),
            "column_names": df.columns.tolist(),
            "data_types": df.dtypes.astype(str).to_dict(),
            "null_counts": df.isnull().sum().to_dict(),
            "preview": df.head(10).to_dict('records'),
            "statistics": {}
        }
        
        # Estatísticas para colunas numéricas
        numeric_columns = df.select_dtypes(include=[np.number]).columns
        for col in numeric_columns:
            analysis["statistics"][col] = {
                "mean": float(df[col].mean()),
                "median": float(df[col].median()),
                "std": float(df[col].std()),
                "min": float(df[col].min()),
                "max": float(df[col].max()),
                "quartiles": df[col].quantile([0.25, 0.5, 0.75]).to_dict()
            }
        
        # Salvar dados na sessão (em produção, usar database)
        session_id = f"data_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        dados_sessao[session_id] = {
            "dataframe": df,
            "analysis": analysis,
            "uploaded_at": datetime.now().isoformat()
        }
        
        analysis["session_id"] = session_id
        
        logger.info(f"Arquivo processado com sucesso: {file.filename}")
        return analysis
        
    except Exception as e:
        logger.error(f"Erro ao processar arquivo: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro ao processar arquivo: {str(e)}")

@app.post("/api/analyze/{session_id}")
async def analyze_data(session_id: str, analysis_type: str = "descriptive"):
    """
    Executar análise específica nos dados carregados
    """
    try:
        if session_id not in dados_sessao:
            raise HTTPException(status_code=404, detail="Sessão não encontrada")
        
        df = dados_sessao[session_id]["dataframe"]
        
        if analysis_type == "descriptive":
            result = {
                "type": "descriptive",
                "summary": df.describe().to_dict(),
                "correlation_matrix": df.corr().to_dict() if len(df.select_dtypes(include=[np.number]).columns) > 1 else {},
                "value_counts": {}
            }
            
            # Value counts para colunas categóricas
            categorical_columns = df.select_dtypes(include=['object']).columns
            for col in categorical_columns[:5]:  # Limitar a 5 colunas
                result["value_counts"][col] = df[col].value_counts().head(10).to_dict()
                
        elif analysis_type == "correlation":
            numeric_df = df.select_dtypes(include=[np.number])
            if len(numeric_df.columns) < 2:
                raise HTTPException(status_code=400, detail="Pelo menos 2 colunas numéricas necessárias")
            
            result = {
                "type": "correlation",
                "correlation_matrix": numeric_df.corr().to_dict(),
                "strong_correlations": []
            }
            
            # Identificar correlações fortes
            corr_matrix = numeric_df.corr()
            for i in range(len(corr_matrix.columns)):
                for j in range(i+1, len(corr_matrix.columns)):
                    corr_value = corr_matrix.iloc[i, j]
                    if abs(corr_value) > 0.7:
                        result["strong_correlations"].append({
                            "var1": corr_matrix.columns[i],
                            "var2": corr_matrix.columns[j],
                            "correlation": float(corr_value)
                        })
        
        elif analysis_type == "outliers":
            numeric_df = df.select_dtypes(include=[np.number])
            result = {
                "type": "outliers",
                "outliers_by_column": {}
            }
            
            for col in numeric_df.columns:
                Q1 = numeric_df[col].quantile(0.25)
                Q3 = numeric_df[col].quantile(0.75)
                IQR = Q3 - Q1
                lower_bound = Q1 - 1.5 * IQR
                upper_bound = Q3 + 1.5 * IQR
                
                outliers = numeric_df[(numeric_df[col] < lower_bound) | (numeric_df[col] > upper_bound)][col]
                result["outliers_by_column"][col] = {
                    "count": len(outliers),
                    "percentage": (len(outliers) / len(numeric_df)) * 100,
                    "values": outliers.tolist()[:20]  # Limitar a 20 valores
                }
        
        else:
            raise HTTPException(status_code=400, detail="Tipo de análise não suportado")
        
        result["timestamp"] = datetime.now().isoformat()
        return result
        
    except Exception as e:
        logger.error(f"Erro na análise: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro na análise: {str(e)}")

@app.get("/api/sessions")
async def list_sessions():
    """Listar todas as sessões ativas"""
    sessions = []
    for session_id, data in dados_sessao.items():
        sessions.append({
            "session_id": session_id,
            "filename": data["analysis"]["filename"],
            "rows": data["analysis"]["rows"],
            "columns": data["analysis"]["columns"],
            "uploaded_at": data["uploaded_at"]
        })
    return {"sessions": sessions}

@app.delete("/api/sessions/{session_id}")
async def delete_session(session_id: str):
    """Deletar uma sessão específica"""
    if session_id not in dados_sessao:
        raise HTTPException(status_code=404, detail="Sessão não encontrada")
    
    del dados_sessao[session_id]
    return {"message": f"Sessão {session_id} deletada com sucesso"}

# Endpoints específicos de Santa Catarina
@app.get("/api/sc/municipios")
async def get_municipios_sc():
    """Obter lista de municípios de Santa Catarina"""
    # Dados simulados - em produção, conectar com API do IBGE
    municipios = [
        {"codigo": "4205407", "nome": "Florianópolis", "populacao": 516524},
        {"codigo": "4209102", "nome": "Joinville", "populacao": 597658},
        {"codigo": "4202404", "nome": "Blumenau", "populacao": 366418},
        {"codigo": "4216602", "nome": "São José", "populacao": 254128},
        {"codigo": "4204202", "nome": "Criciúma", "populacao": 217075}
    ]
    return municipios

@app.get("/api/sc/saude/{municipio}")
async def get_dados_saude(municipio: str):
    """Obter dados de saúde de um município específico"""
    # Dados simulados
    dados_saude = {
        "municipio": municipio,
        "hospitais": 8,
        "leitos": 1250,
        "medicos_por_mil": 6.5,
        "postos_saude": 25,
        "timestamp": datetime.now().isoformat()
    }
    return dados_saude

if __name__ == "__main__":
    logger.info("Iniciando DataScience Pro Backend...")
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
