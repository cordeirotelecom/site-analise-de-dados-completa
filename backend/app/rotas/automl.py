"""
Rotas para AutoML (Machine Learning Automatizado)
"""

from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.linear_model import LogisticRegression, LinearRegression
from sklearn.svm import SVC, SVR
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import joblib
import os

from app.database.conexao import obter_db
from app.modelos.dataset import Dataset
from app.modelos.analise import Analise, TipoAnalise, StatusAnalise

router = APIRouter()

# Diretório para salvar modelos
MODELS_DIR = "modelos_treinados"
if not os.path.exists(MODELS_DIR):
    os.makedirs(MODELS_DIR)

class SolicitacaoAutoML(BaseModel):
    dataset_id: int
    variavel_alvo: str
    tipo_problema: str  # "classificacao" ou "regressao"
    variaveis_preditoras: Optional[List[str]] = []
    test_size: Optional[float] = 0.2
    algoritmos: Optional[List[str]] = ["random_forest", "logistic_regression", "svm"]
    parametros_avancados: Optional[Dict[str, Any]] = {}

class PredicaoRequest(BaseModel):
    modelo_id: int
    dados: Dict[str, Any]

@router.post("/treinar")
async def treinar_modelo_automl(
    solicitacao: SolicitacaoAutoML,
    background_tasks: BackgroundTasks,
    db: Session = Depends(obter_db)
):
    """
    Inicia treinamento automatizado de modelo de machine learning
    """
    dataset = db.query(Dataset).filter(Dataset.id == solicitacao.dataset_id).first()
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset não encontrado")
    
    # Validar tipo de problema
    if solicitacao.tipo_problema not in ["classificacao", "regressao"]:
        raise HTTPException(
            status_code=400,
            detail="Tipo de problema deve ser 'classificacao' ou 'regressao'"
        )
    
    # Criar registro de análise
    tipo_analise = TipoAnalise.CLASSIFICACAO if solicitacao.tipo_problema == "classificacao" else TipoAnalise.REGRESSAO
    
    analise = Analise(
        nome=f"AutoML {solicitacao.tipo_problema.title()} - {dataset.nome}",
        tipo=tipo_analise,
        status=StatusAnalise.PROCESSANDO,
        parametros=solicitacao.dict(),
        projeto_id=dataset.projeto_id,
        dataset_id=dataset.id
    )
    db.add(analise)
    db.commit()
    db.refresh(analise)
    
    # Executar treinamento em background
    background_tasks.add_task(
        executar_automl,
        analise.id,
        dataset.caminho_arquivo,
        dataset.tipo_arquivo,
        solicitacao
    )
    
    return {
        "analise_id": analise.id,
        "status": "iniciado",
        "mensagem": "Treinamento AutoML iniciado. Use o ID para verificar o progresso."
    }

@router.get("/modelos")
async def listar_modelos(
    projeto_id: Optional[int] = None,
    db: Session = Depends(obter_db)
):
    """
    Lista todos os modelos treinados
    """
    query = db.query(Analise).filter(
        Analise.tipo.in_([TipoAnalise.CLASSIFICACAO, TipoAnalise.REGRESSAO]),
        Analise.status == StatusAnalise.CONCLUIDA
    )
    
    if projeto_id:
        query = query.filter(Analise.projeto_id == projeto_id)
    
    modelos = query.all()
    
    return [
        {
            "id": modelo.id,
            "nome": modelo.nome,
            "tipo": modelo.tipo.value,
            "acuracia": modelo.resultados.get("melhor_modelo", {}).get("metricas", {}).get("accuracy"),
            "data_treinamento": modelo.data_conclusao,
            "tempo_execucao": modelo.tempo_execucao
        }
        for modelo in modelos
    ]

@router.get("/modelo/{modelo_id}")
async def obter_detalhes_modelo(
    modelo_id: int,
    db: Session = Depends(obter_db)
):
    """
    Obtém detalhes completos de um modelo treinado
    """
    modelo = db.query(Analise).filter(Analise.id == modelo_id).first()
    
    if not modelo:
        raise HTTPException(status_code=404, detail="Modelo não encontrado")
    
    if modelo.status != StatusAnalise.CONCLUIDA:
        raise HTTPException(
            status_code=400,
            detail="Modelo ainda não foi treinado com sucesso"
        )
    
    return {
        "id": modelo.id,
        "nome": modelo.nome,
        "tipo": modelo.tipo.value,
        "parametros": modelo.parametros,
        "resultados": modelo.resultados,
        "data_treinamento": modelo.data_conclusao,
        "tempo_execucao": modelo.tempo_execucao
    }

@router.post("/prever")
async def fazer_predicao(
    predicao: PredicaoRequest,
    db: Session = Depends(obter_db)
):
    """
    Faz predição usando um modelo treinado
    """
    modelo = db.query(Analise).filter(Analise.id == predicao.modelo_id).first()
    
    if not modelo:
        raise HTTPException(status_code=404, detail="Modelo não encontrado")
    
    if modelo.status != StatusAnalise.CONCLUIDA:
        raise HTTPException(
            status_code=400,
            detail="Modelo ainda não foi treinado com sucesso"
        )
    
    try:
        # Carregar modelo salvo
        caminho_modelo = os.path.join(MODELS_DIR, f"modelo_{modelo.id}.joblib")
        
        if not os.path.exists(caminho_modelo):
            raise HTTPException(
                status_code=404,
                detail="Arquivo do modelo não encontrado"
            )
        
        modelo_ml = joblib.load(caminho_modelo)
        scaler = None
        
        # Carregar scaler se existir
        caminho_scaler = os.path.join(MODELS_DIR, f"scaler_{modelo.id}.joblib")
        if os.path.exists(caminho_scaler):
            scaler = joblib.load(caminho_scaler)
        
        # Preparar dados para predição
        variaveis_preditoras = modelo.parametros.get("variaveis_preditoras", [])
        
        # Verificar se todas as variáveis necessárias estão presentes
        for var in variaveis_preditoras:
            if var not in predicao.dados:
                raise HTTPException(
                    status_code=400,
                    detail=f"Variável '{var}' é obrigatória para a predição"
                )
        
        # Criar DataFrame com os dados
        dados_predicao = pd.DataFrame([predicao.dados])
        dados_predicao = dados_predicao[variaveis_preditoras]
        
        # Aplicar normalização se necessário
        if scaler:
            dados_predicao_scaled = scaler.transform(dados_predicao)
        else:
            dados_predicao_scaled = dados_predicao
        
        # Fazer predição
        predicao_resultado = modelo_ml.predict(dados_predicao_scaled)[0]
        
        # Obter probabilidades se for classificação
        probabilidades = None
        if hasattr(modelo_ml, 'predict_proba'):
            prob = modelo_ml.predict_proba(dados_predicao_scaled)[0]
            classes = modelo_ml.classes_
            probabilidades = {str(classe): float(prob_valor) for classe, prob_valor in zip(classes, prob)}
        
        return {
            "predicao": predicao_resultado,
            "probabilidades": probabilidades,
            "dados_entrada": predicao.dados,
            "modelo_usado": modelo.nome
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erro ao fazer predição: {str(e)}"
        )

@router.post("/avaliar/{modelo_id}")
async def avaliar_modelo(
    modelo_id: int,
    dados_teste: Dict[str, Any],
    db: Session = Depends(obter_db)
):
    """
    Avalia o modelo com novos dados de teste
    """
    modelo = db.query(Analise).filter(Analise.id == modelo_id).first()
    
    if not modelo:
        raise HTTPException(status_code=404, detail="Modelo não encontrado")
    
    # Implementar avaliação com novos dados
    # Esta função seria expandida para aceitar um novo dataset de teste
    
    return {
        "mensagem": "Funcionalidade de avaliação em desenvolvimento",
        "modelo_id": modelo_id
    }

# Função auxiliar para execução em background
async def executar_automl(
    analise_id: int,
    caminho_arquivo: str,
    tipo_arquivo: str,
    solicitacao: SolicitacaoAutoML
):
    """Executa AutoML em background"""
    from app.database.conexao import SessionLocal
    import time
    
    db = SessionLocal()
    inicio = time.time()
    
    try:
        # Carregar dados
        df = carregar_dataframe(caminho_arquivo, tipo_arquivo)
        
        # Validar variável alvo
        if solicitacao.variavel_alvo not in df.columns:
            raise ValueError(f"Variável alvo '{solicitacao.variavel_alvo}' não encontrada no dataset")
        
        # Preparar dados
        if not solicitacao.variaveis_preditoras:
            # Se não especificadas, usar todas exceto a variável alvo
            variaveis_preditoras = [col for col in df.columns if col != solicitacao.variavel_alvo]
        else:
            variaveis_preditoras = solicitacao.variaveis_preditoras
        
        # Selecionar apenas variáveis numéricas para simplificar
        df_numeric = df[variaveis_preditoras + [solicitacao.variavel_alvo]].select_dtypes(include=[np.number])
        df_clean = df_numeric.dropna()
        
        if len(df_clean) == 0:
            raise ValueError("Nenhum dado válido após limpeza")
        
        X = df_clean[variaveis_preditoras]
        y = df_clean[solicitacao.variavel_alvo]
        
        # Dividir dados
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=solicitacao.test_size, random_state=42
        )
        
        # Normalizar dados
        scaler = StandardScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        X_test_scaled = scaler.transform(X_test)
        
        # Configurar algoritmos
        if solicitacao.tipo_problema == "classificacao":
            algoritmos = {
                "random_forest": RandomForestClassifier(random_state=42),
                "logistic_regression": LogisticRegression(random_state=42, max_iter=1000),
                "svm": SVC(random_state=42, probability=True)
            }
        else:  # regressao
            algoritmos = {
                "random_forest": RandomForestRegressor(random_state=42),
                "linear_regression": LinearRegression(),
                "svm": SVR()
            }
        
        # Filtrar algoritmos solicitados
        algoritmos_usar = {
            nome: algo for nome, algo in algoritmos.items()
            if nome in solicitacao.algoritmos
        }
        
        # Treinar e avaliar modelos
        resultados = {}
        melhor_modelo = None
        melhor_score = -np.inf
        
        for nome, algoritmo in algoritmos_usar.items():
            try:
                # Treinar modelo
                algoritmo.fit(X_train_scaled, y_train)
                
                # Fazer predições
                y_pred = algoritmo.predict(X_test_scaled)
                
                # Calcular métricas
                if solicitacao.tipo_problema == "classificacao":
                    metricas = {
                        "accuracy": float(accuracy_score(y_test, y_pred)),
                        "precision": float(precision_score(y_test, y_pred, average='weighted', zero_division=0)),
                        "recall": float(recall_score(y_test, y_pred, average='weighted', zero_division=0)),
                        "f1_score": float(f1_score(y_test, y_pred, average='weighted', zero_division=0))
                    }
                    score_principal = metricas["accuracy"]
                else:  # regressao
                    metricas = {
                        "r2_score": float(r2_score(y_test, y_pred)),
                        "mean_squared_error": float(mean_squared_error(y_test, y_pred)),
                        "mean_absolute_error": float(mean_absolute_error(y_test, y_pred)),
                        "rmse": float(np.sqrt(mean_squared_error(y_test, y_pred)))
                    }
                    score_principal = metricas["r2_score"]
                
                # Cross-validation
                cv_scores = cross_val_score(algoritmo, X_train_scaled, y_train, cv=5)
                
                resultados[nome] = {
                    "metricas": metricas,
                    "cv_score_medio": float(cv_scores.mean()),
                    "cv_score_std": float(cv_scores.std()),
                    "score_principal": score_principal
                }
                
                # Verificar se é o melhor modelo
                if score_principal > melhor_score:
                    melhor_score = score_principal
                    melhor_modelo = nome
                    
                    # Salvar melhor modelo
                    caminho_modelo = os.path.join(MODELS_DIR, f"modelo_{analise_id}.joblib")
                    caminho_scaler = os.path.join(MODELS_DIR, f"scaler_{analise_id}.joblib")
                    
                    joblib.dump(algoritmo, caminho_modelo)
                    joblib.dump(scaler, caminho_scaler)
                
            except Exception as e:
                resultados[nome] = {"erro": str(e)}
        
        # Preparar resultados finais
        resultados_finais = {
            "algoritmos_testados": resultados,
            "melhor_modelo": {
                "nome": melhor_modelo,
                "metricas": resultados.get(melhor_modelo, {})
            },
            "variaveis_utilizadas": variaveis_preditoras,
            "tamanho_treino": len(X_train),
            "tamanho_teste": len(X_test),
            "tipo_problema": solicitacao.tipo_problema
        }
        
        tempo_execucao = int(time.time() - inicio)
        
        # Atualizar banco
        analise = db.query(Analise).filter(Analise.id == analise_id).first()
        analise.status = StatusAnalise.CONCLUIDA
        analise.resultados = resultados_finais
        analise.tempo_execucao = tempo_execucao
        db.commit()
        
    except Exception as e:
        # Marcar como erro
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
