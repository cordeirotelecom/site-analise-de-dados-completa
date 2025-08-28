"""
Rotas para Dashboard e Visualizações
"""

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import pandas as pd
import json

from app.database.conexao import obter_db
from app.modelos.dataset import Dataset
from app.modelos.analise import Analise
from app.servicos.visualizacao import GeradorVisualizacao

router = APIRouter()

class SolicitacaoDashboard(BaseModel):
    dataset_id: int
    tipo_dashboard: str  # "geral", "correlacao", "distribuicao", "series_temporal"
    parametros: Optional[Dict[str, Any]] = {}

@router.post("/gerar")
async def gerar_dashboard(
    solicitacao: SolicitacaoDashboard,
    db: Session = Depends(obter_db)
):
    """
    Gera dashboard baseado no tipo solicitado
    """
    dataset = db.query(Dataset).filter(Dataset.id == solicitacao.dataset_id).first()
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset não encontrado")
    
    try:
        # Carregar dados
        df = carregar_dataframe(dataset.caminho_arquivo, dataset.tipo_arquivo)
        
        # Gerar visualizações
        gerador = GeradorVisualizacao()
        
        if solicitacao.tipo_dashboard == "geral":
            graficos = gerador.graficos_descritivos(df)
            
        elif solicitacao.tipo_dashboard == "correlacao":
            df_numeric = df.select_dtypes(include=['number'])
            if len(df_numeric.columns) < 2:
                raise HTTPException(
                    status_code=400,
                    detail="Dashboard de correlação requer pelo menos 2 variáveis numéricas"
                )
            matriz_corr = df_numeric.corr()
            graficos = gerador.heatmap_correlacao(matriz_corr)
            
        elif solicitacao.tipo_dashboard == "series_temporal":
            coluna_data = solicitacao.parametros.get("coluna_data")
            colunas_valores = solicitacao.parametros.get("colunas_valores", [])
            
            if not coluna_data:
                raise HTTPException(
                    status_code=400,
                    detail="Para dashboard temporal, especifique 'coluna_data' nos parâmetros"
                )
            
            graficos = gerador.grafico_series_temporais(df, coluna_data, colunas_valores)
            
        else:
            raise HTTPException(
                status_code=400,
                detail=f"Tipo de dashboard '{solicitacao.tipo_dashboard}' não suportado"
            )
        
        return {
            "dashboard_id": f"dash_{dataset.id}_{solicitacao.tipo_dashboard}",
            "tipo": solicitacao.tipo_dashboard,
            "graficos": graficos,
            "dataset_nome": dataset.nome,
            "data_geracao": "2025-01-01T00:00:00"  # Usar timestamp real
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erro ao gerar dashboard: {str(e)}"
        )

@router.get("/dataset/{dataset_id}/resumo")
async def obter_resumo_visual(
    dataset_id: int,
    db: Session = Depends(obter_db)
):
    """
    Obtém resumo visual rápido do dataset
    """
    dataset = db.query(Dataset).filter(Dataset.id == dataset_id).first()
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset não encontrado")
    
    try:
        df = carregar_dataframe(dataset.caminho_arquivo, dataset.tipo_arquivo)
        
        # Estatísticas básicas
        resumo = {
            "total_linhas": len(df),
            "total_colunas": len(df.columns),
            "colunas_numericas": len(df.select_dtypes(include=['number']).columns),
            "colunas_categoricas": len(df.select_dtypes(include=['object']).columns),
            "valores_ausentes": int(df.isnull().sum().sum()),
            "porcentagem_ausentes": round((df.isnull().sum().sum() / (len(df) * len(df.columns))) * 100, 2)
        }
        
        # Gráfico simples de valores ausentes
        gerador = GeradorVisualizacao()
        grafico_ausentes = gerador._grafico_valores_ausentes(df)
        
        return {
            "resumo": resumo,
            "grafico_valores_ausentes": grafico_ausentes
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erro ao gerar resumo: {str(e)}"
        )

@router.get("/analise/{analise_id}/visualizacoes")
async def obter_visualizacoes_analise(
    analise_id: int,
    db: Session = Depends(obter_db)
):
    """
    Obtém visualizações de uma análise específica
    """
    analise = db.query(Analise).filter(Analise.id == analise_id).first()
    if not analise:
        raise HTTPException(status_code=404, detail="Análise não encontrada")
    
    if not analise.graficos:
        raise HTTPException(
            status_code=404,
            detail="Análise não possui visualizações geradas"
        )
    
    return {
        "analise_id": analise.id,
        "tipo_analise": analise.tipo.value,
        "graficos": analise.graficos,
        "data_criacao": analise.data_criacao
    }

@router.post("/personalizado")
async def criar_grafico_personalizado(
    config: Dict[str, Any],
    db: Session = Depends(obter_db)
):
    """
    Cria gráfico personalizado baseado em configuração
    """
    try:
        dataset_id = config.get("dataset_id")
        tipo_grafico = config.get("tipo_grafico")
        parametros = config.get("parametros", {})
        
        if not dataset_id or not tipo_grafico:
            raise HTTPException(
                status_code=400,
                detail="dataset_id e tipo_grafico são obrigatórios"
            )
        
        dataset = db.query(Dataset).filter(Dataset.id == dataset_id).first()
        if not dataset:
            raise HTTPException(status_code=404, detail="Dataset não encontrado")
        
        df = carregar_dataframe(dataset.caminho_arquivo, dataset.tipo_arquivo)
        gerador = GeradorVisualizacao()
        
        # Implementar diferentes tipos de gráficos personalizados
        if tipo_grafico == "scatter":
            x_col = parametros.get("x")
            y_col = parametros.get("y")
            color_col = parametros.get("color")
            
            if not x_col or not y_col:
                raise HTTPException(
                    status_code=400,
                    detail="Gráfico scatter requer parâmetros 'x' e 'y'"
                )
            
            import plotly.express as px
            fig = px.scatter(
                df, x=x_col, y=y_col, color=color_col,
                title=f"Gráfico de Dispersão: {x_col} vs {y_col}",
                template="plotly_white"
            )
            
            grafico = fig.to_json()
            
        elif tipo_grafico == "histogram":
            coluna = parametros.get("coluna")
            bins = parametros.get("bins", 30)
            
            if not coluna:
                raise HTTPException(
                    status_code=400,
                    detail="Gráfico histogram requer parâmetro 'coluna'"
                )
            
            import plotly.express as px
            fig = px.histogram(
                df, x=coluna, nbins=bins,
                title=f"Histograma de {coluna}",
                template="plotly_white"
            )
            
            grafico = fig.to_json()
            
        else:
            raise HTTPException(
                status_code=400,
                detail=f"Tipo de gráfico '{tipo_grafico}' não suportado"
            )
        
        return {
            "tipo_grafico": tipo_grafico,
            "grafico": grafico,
            "parametros": parametros
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erro ao criar gráfico: {str(e)}"
        )

@router.get("/templates")
async def listar_templates_dashboard():
    """
    Lista templates disponíveis para dashboards
    """
    templates = [
        {
            "id": "analise_exploratoria",
            "nome": "Análise Exploratória Completa",
            "descricao": "Dashboard com histogramas, boxplots, correlações e estatísticas descritivas",
            "tipos_grafico": ["histogram", "boxplot", "heatmap", "bar"]
        },
        {
            "id": "correlacao_avancada",
            "nome": "Análise de Correlação Avançada",
            "descricao": "Foco em correlações entre variáveis com diferentes visualizações",
            "tipos_grafico": ["heatmap", "scatter", "pairplot"]
        },
        {
            "id": "series_temporal",
            "nome": "Análise de Séries Temporais",
            "descricao": "Visualizações específicas para dados temporais",
            "tipos_grafico": ["line", "decomposition", "trend"]
        },
        {
            "id": "machine_learning",
            "nome": "Resultados de Machine Learning",
            "descricao": "Visualizações de performance e resultados de modelos",
            "tipos_grafico": ["confusion_matrix", "roc_curve", "feature_importance"]
        }
    ]
    
    return {
        "templates": templates,
        "total": len(templates)
    }

def carregar_dataframe(caminho_arquivo: str, tipo_arquivo: str) -> pd.DataFrame:
    """Carrega DataFrame baseado no tipo de arquivo"""
    if tipo_arquivo == "csv":
        return pd.read_csv(caminho_arquivo)
    elif tipo_arquivo == "excel":
        return pd.read_excel(caminho_arquivo)
    elif tipo_arquivo == "json":
        return pd.read_json(caminho_arquivo)
    elif tipo_arquivo == "parquet":
        return pd.read_parquet(caminho_arquivo)
    else:
        raise ValueError(f"Tipo de arquivo não suportado: {tipo_arquivo}")
