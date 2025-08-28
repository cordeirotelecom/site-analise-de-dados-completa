"""
Rotas para Análise de Dados
"""

from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import pandas as pd
import numpy as np
from scipy import stats
from sklearn.cluster import KMeans, DBSCAN, AgglomerativeClustering
from sklearn.decomposition import PCA, FactorAnalysis
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score
import json

from app.database.conexao import obter_db
from app.modelos.dataset import Dataset
from app.modelos.analise import Analise, TipoAnalise, StatusAnalise
from app.servicos.analise_estatistica import (
    AnalisadorEstatistico, 
    executar_analise_clustering, 
    executar_analise_fatorial,
    executar_analise_correlacao
)
from app.servicos.analise_estatistica import AnalisadorEstatistico
from app.servicos.visualizacao import GeradorVisualizacao

router = APIRouter()

class SolicitacaoAnalise(BaseModel):
    dataset_id: int
    tipo_analise: str
    parametros: Optional[Dict[str, Any]] = {}
    colunas_selecionadas: Optional[List[str]] = []

@router.post("/descritiva")
async def analise_descritiva(
    solicitacao: SolicitacaoAnalise,
    background_tasks: BackgroundTasks,
    db: Session = Depends(obter_db)
):
    """
    Executa análise estatística descritiva completa
    """
    dataset = db.query(Dataset).filter(Dataset.id == solicitacao.dataset_id).first()
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset não encontrado")
    
    # Criar registro de análise
    analise = Analise(
        nome=f"Análise Descritiva - {dataset.nome}",
        tipo=TipoAnalise.DESCRITIVA,
        status=StatusAnalise.PROCESSANDO,
        parametros=solicitacao.parametros,
        projeto_id=dataset.projeto_id,
        dataset_id=dataset.id
    )
    db.add(analise)
    db.commit()
    db.refresh(analise)
    
    # Executar análise em background
    background_tasks.add_task(
        executar_analise_descritiva,
        analise.id,
        dataset.caminho_arquivo,
        dataset.tipo_arquivo,
        solicitacao.colunas_selecionadas
    )
    
    return {
        "analise_id": analise.id,
        "status": "iniciada",
        "mensagem": "Análise descritiva iniciada. Use o ID para verificar o progresso."
    }

@router.post("/correlacao")
async def analise_correlacao(
    solicitacao: SolicitacaoAnalise,
    background_tasks: BackgroundTasks,
    db: Session = Depends(obter_db)
):
    """
    Executa análise de correlação entre variáveis
    """
    dataset = db.query(Dataset).filter(Dataset.id == solicitacao.dataset_id).first()
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset não encontrado")
    
    analise = Analise(
        nome=f"Análise de Correlação - {dataset.nome}",
        tipo=TipoAnalise.CORRELACAO,
        status=StatusAnalise.PROCESSANDO,
        parametros=solicitacao.parametros,
        projeto_id=dataset.projeto_id,
        dataset_id=dataset.id
    )
    db.add(analise)
    db.commit()
    db.refresh(analise)
    
    background_tasks.add_task(
        executar_analise_correlacao,
        analise.id,
        dataset.caminho_arquivo,
        dataset.tipo_arquivo,
        solicitacao.colunas_selecionadas,
        solicitacao.parametros.get("metodo", "pearson")
    )
    
    return {
        "analise_id": analise.id,
        "status": "iniciada",
        "mensagem": "Análise de correlação iniciada."
    }

@router.post("/clustering")
async def analise_clustering(
    solicitacao: SolicitacaoAnalise,
    background_tasks: BackgroundTasks,
    db: Session = Depends(obter_db)
):
    """
    Executa análise de clustering (agrupamento)
    """
    dataset = db.query(Dataset).filter(Dataset.id == solicitacao.dataset_id).first()
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset não encontrado")
    
    analise = Analise(
        nome=f"Análise de Clustering - {dataset.nome}",
        tipo=TipoAnalise.CLUSTERING,
        status=StatusAnalise.PROCESSANDO,
        parametros=solicitacao.parametros,
        projeto_id=dataset.projeto_id,
        dataset_id=dataset.id
    )
    db.add(analise)
    db.commit()
    db.refresh(analise)
    
    background_tasks.add_task(
        executar_analise_clustering,
        analise.id,
        dataset.caminho_arquivo,
        dataset.tipo_arquivo,
        solicitacao.colunas_selecionadas,
        solicitacao.parametros
    )
    
    return {
        "analise_id": analise.id,
        "status": "iniciada",
        "mensagem": "Análise de clustering iniciada."
    }

@router.post("/analise-fatorial")
async def analise_fatorial(
    solicitacao: SolicitacaoAnalise,
    background_tasks: BackgroundTasks,
    db: Session = Depends(obter_db)
):
    """
    Executa análise fatorial
    """
    dataset = db.query(Dataset).filter(Dataset.id == solicitacao.dataset_id).first()
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset não encontrado")
    
    analise = Analise(
        nome=f"Análise Fatorial - {dataset.nome}",
        tipo=TipoAnalise.ANALISE_FATORIAL,
        status=StatusAnalise.PROCESSANDO,
        parametros=solicitacao.parametros,
        projeto_id=dataset.projeto_id,
        dataset_id=dataset.id
    )
    db.add(analise)
    db.commit()
    db.refresh(analise)
    
    background_tasks.add_task(
        executar_analise_fatorial,
        analise.id,
        dataset.caminho_arquivo,
        dataset.tipo_arquivo,
        solicitacao.colunas_selecionadas,
        solicitacao.parametros
    )
    
    return {
        "analise_id": analise.id,
        "status": "iniciada",
        "mensagem": "Análise fatorial iniciada."
    }

@router.get("/status/{analise_id}")
async def verificar_status_analise(
    analise_id: int,
    db: Session = Depends(obter_db)
):
    """
    Verifica o status de uma análise
    """
    analise = db.query(Analise).filter(Analise.id == analise_id).first()
    if not analise:
        raise HTTPException(status_code=404, detail="Análise não encontrada")
    
    return {
        "id": analise.id,
        "nome": analise.nome,
        "tipo": analise.tipo.value,
        "status": analise.status.value,
        "data_criacao": analise.data_criacao,
        "data_conclusao": analise.data_conclusao,
        "tempo_execucao": analise.tempo_execucao
    }

@router.get("/resultados/{analise_id}")
async def obter_resultados_analise(
    analise_id: int,
    db: Session = Depends(obter_db)
):
    """
    Obtém os resultados de uma análise concluída
    """
    analise = db.query(Analise).filter(Analise.id == analise_id).first()
    if not analise:
        raise HTTPException(status_code=404, detail="Análise não encontrada")
    
    if analise.status != StatusAnalise.CONCLUIDA:
        raise HTTPException(
            status_code=400,
            detail=f"Análise ainda não concluída. Status atual: {analise.status.value}"
        )
    
    return {
        "id": analise.id,
        "nome": analise.nome,
        "tipo": analise.tipo.value,
        "resultados": analise.resultados,
        "graficos": analise.graficos,
        "relatorio": analise.relatorio,
        "tempo_execucao": analise.tempo_execucao,
        "data_conclusao": analise.data_conclusao
    }

# Funções auxiliares para execução em background

async def executar_analise_descritiva(
    analise_id: int,
    caminho_arquivo: str,
    tipo_arquivo: str,
    colunas_selecionadas: List[str]
):
    """Executa análise descritiva em background"""
    from app.database.conexao import SessionLocal
    
    db = SessionLocal()
    try:
        # Carregar dados
        df = carregar_dataframe(caminho_arquivo, tipo_arquivo)
        
        if colunas_selecionadas:
            df = df[colunas_selecionadas]
        
        # Executar análise
        analisador = AnalisadorEstatistico()
        resultados = analisador.analise_descritiva(df)
        
        # Gerar visualizações
        gerador_viz = GeradorVisualizacao()
        graficos = gerador_viz.graficos_descritivos(df)
        
        # Gerar relatório
        relatorio = gerar_relatorio_descritivo(resultados, df)
        
        # Atualizar banco
        analise = db.query(Analise).filter(Analise.id == analise_id).first()
        analise.status = StatusAnalise.CONCLUIDA
        analise.resultados = resultados
        analise.graficos = graficos
        analise.relatorio = relatorio
        db.commit()
        
    except Exception as e:
        # Marcar como erro
        analise = db.query(Analise).filter(Analise.id == analise_id).first()
        analise.status = StatusAnalise.ERRO
        analise.resultados = {"erro": str(e)}
        db.commit()
    finally:
        db.close()

async def executar_analise_correlacao(
    analise_id: int,
    caminho_arquivo: str,
    tipo_arquivo: str,
    colunas_selecionadas: List[str],
    metodo: str = "pearson"
):
    """Executa análise de correlação em background"""
    from app.database.conexao import SessionLocal
    
    db = SessionLocal()
    try:
        df = carregar_dataframe(caminho_arquivo, tipo_arquivo)
        
        if colunas_selecionadas:
            df = df[colunas_selecionadas]
        
        # Selecionar apenas colunas numéricas
        df_numeric = df.select_dtypes(include=[np.number])
        
        # Calcular matriz de correlação
        matriz_correlacao = df_numeric.corr(method=metodo)
        
        # Encontrar correlações mais fortes
        correlacoes_fortes = []
        for i in range(len(matriz_correlacao.columns)):
            for j in range(i+1, len(matriz_correlacao.columns)):
                corr_value = matriz_correlacao.iloc[i, j]
                if abs(corr_value) > 0.5:  # correlações acima de 0.5
                    correlacoes_fortes.append({
                        "variavel1": matriz_correlacao.columns[i],
                        "variavel2": matriz_correlacao.columns[j],
                        "correlacao": round(corr_value, 3),
                        "interpretacao": interpretar_correlacao(corr_value)
                    })
        
        resultados = {
            "matriz_correlacao": matriz_correlacao.to_dict(),
            "correlacoes_fortes": correlacoes_fortes,
            "metodo": metodo,
            "num_variaveis": len(df_numeric.columns)
        }
        
        # Gerar visualizações
        gerador_viz = GeradorVisualizacao()
        graficos = gerador_viz.heatmap_correlacao(matriz_correlacao)
        
        # Atualizar banco
        analise = db.query(Analise).filter(Analise.id == analise_id).first()
        analise.status = StatusAnalise.CONCLUIDA
        analise.resultados = resultados
        analise.graficos = graficos
        db.commit()
        
    except Exception as e:
        analise = db.query(Analise).filter(Analise.id == analise_id).first()
        analise.status = StatusAnalise.ERRO
        analise.resultados = {"erro": str(e)}
        db.commit()
    finally:
        db.close()

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

def interpretar_correlacao(valor: float) -> str:
    """Interpreta o valor de correlação"""
    abs_valor = abs(valor)
    if abs_valor < 0.1:
        return "Correlação desprezível"
    elif abs_valor < 0.3:
        return "Correlação fraca"
    elif abs_valor < 0.5:
        return "Correlação moderada"
    elif abs_valor < 0.7:
        return "Correlação forte"
    elif abs_valor < 0.9:
        return "Correlação muito forte"
    else:
        return "Correlação quase perfeita"

def gerar_relatorio_descritivo(resultados: dict, df: pd.DataFrame) -> str:
    """Gera relatório em markdown da análise descritiva"""
    relatorio = f"""
# Relatório de Análise Descritiva

## Resumo dos Dados
- **Total de registros**: {len(df):,}
- **Total de variáveis**: {len(df.columns)}
- **Variáveis numéricas**: {len(df.select_dtypes(include=[np.number]).columns)}
- **Variáveis categóricas**: {len(df.select_dtypes(include=['object']).columns)}

## Estatísticas Descritivas

### Medidas de Tendência Central e Dispersão
"""
    
    for coluna, stats in resultados.get("estatisticas_numericas", {}).items():
        relatorio += f"""
#### {coluna}
- **Média**: {stats.get('media', 'N/A'):.2f}
- **Mediana**: {stats.get('mediana', 'N/A'):.2f}
- **Desvio Padrão**: {stats.get('desvio_padrao', 'N/A'):.2f}
- **Mínimo**: {stats.get('minimo', 'N/A'):.2f}
- **Máximo**: {stats.get('maximo', 'N/A'):.2f}
- **Valores ausentes**: {stats.get('valores_nulos', 0)}%
"""
    
    return relatorio
