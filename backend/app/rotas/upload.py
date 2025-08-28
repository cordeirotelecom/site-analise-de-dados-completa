"""
Rotas para Upload de Dados
"""

from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from sqlalchemy.orm import Session
import pandas as pd
import io
import os
from typing import List
import uuid

from app.database.conexao import obter_db
from app.modelos.dataset import Dataset
from app.modelos.projeto import Projeto

router = APIRouter()

UPLOAD_DIR = "uploads"
TIPOS_ARQUIVO_SUPORTADOS = {
    "csv": [".csv"],
    "excel": [".xlsx", ".xls"],
    "json": [".json"],
    "parquet": [".parquet"]
}

# Criar diretório de upload se não existir
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

@router.post("/arquivo")
async def fazer_upload_arquivo(
    arquivo: UploadFile = File(...),
    projeto_id: int = None,
    db: Session = Depends(obter_db)
):
    """
    Upload de arquivo de dados
    Suporta CSV, Excel, JSON e Parquet
    """
    
    # Verificar extensão do arquivo
    extensao = os.path.splitext(arquivo.filename)[1].lower()
    tipo_arquivo = None
    
    for tipo, extensoes in TIPOS_ARQUIVO_SUPORTADOS.items():
        if extensao in extensoes:
            tipo_arquivo = tipo
            break
    
    if not tipo_arquivo:
        raise HTTPException(
            status_code=400,
            detail=f"Tipo de arquivo não suportado. Suportados: {list(TIPOS_ARQUIVO_SUPORTADOS.keys())}"
        )
    
    try:
        # Ler conteúdo do arquivo
        conteudo = await arquivo.read()
        
        # Processar arquivo baseado no tipo
        if tipo_arquivo == "csv":
            df = pd.read_csv(io.BytesIO(conteudo))
        elif tipo_arquivo == "excel":
            df = pd.read_excel(io.BytesIO(conteudo))
        elif tipo_arquivo == "json":
            df = pd.read_json(io.BytesIO(conteudo))
        elif tipo_arquivo == "parquet":
            df = pd.read_parquet(io.BytesIO(conteudo))
        
        # Gerar nome único para arquivo
        nome_arquivo = f"{uuid.uuid4()}_{arquivo.filename}"
        caminho_arquivo = os.path.join(UPLOAD_DIR, nome_arquivo)
        
        # Salvar arquivo no disco
        with open(caminho_arquivo, "wb") as f:
            f.write(conteudo)
        
        # Extrair metadados
        colunas_info = []
        for coluna in df.columns:
            tipo_dados = str(df[coluna].dtype)
            valores_nulos = int(df[coluna].isnull().sum())
            valores_unicos = int(df[coluna].nunique())
            
            coluna_info = {
                "nome": coluna,
                "tipo": tipo_dados,
                "valores_nulos": valores_nulos,
                "valores_unicos": valores_unicos,
                "porcentagem_nulos": round((valores_nulos / len(df)) * 100, 2)
            }
            
            # Adicionar estatísticas para colunas numéricas
            if df[coluna].dtype in ['int64', 'float64']:
                coluna_info.update({
                    "media": float(df[coluna].mean()) if not df[coluna].isnull().all() else None,
                    "mediana": float(df[coluna].median()) if not df[coluna].isnull().all() else None,
                    "desvio_padrao": float(df[coluna].std()) if not df[coluna].isnull().all() else None,
                    "minimo": float(df[coluna].min()) if not df[coluna].isnull().all() else None,
                    "maximo": float(df[coluna].max()) if not df[coluna].isnull().all() else None
                })
            
            colunas_info.append(coluna_info)
        
        # Salvar no banco de dados
        dataset = Dataset(
            nome=arquivo.filename,
            arquivo_original=arquivo.filename,
            caminho_arquivo=caminho_arquivo,
            tipo_arquivo=tipo_arquivo,
            tamanho_arquivo=len(conteudo),
            num_linhas=len(df),
            num_colunas=len(df.columns),
            colunas_info=colunas_info,
            projeto_id=projeto_id or 1  # projeto padrão se não especificado
        )
        
        db.add(dataset)
        db.commit()
        db.refresh(dataset)
        
        return {
            "dataset_id": dataset.id,
            "nome": dataset.nome,
            "linhas": dataset.num_linhas,
            "colunas": dataset.num_colunas,
            "tamanho_mb": round(dataset.tamanho_arquivo / (1024 * 1024), 2),
            "tipo": dataset.tipo_arquivo,
            "colunas_info": dataset.colunas_info,
            "mensagem": "Upload realizado com sucesso!"
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erro ao processar arquivo: {str(e)}"
        )

@router.get("/datasets")
async def listar_datasets(
    projeto_id: int = None,
    db: Session = Depends(obter_db)
):
    """
    Listar todos os datasets do projeto
    """
    query = db.query(Dataset)
    
    if projeto_id:
        query = query.filter(Dataset.projeto_id == projeto_id)
    
    datasets = query.all()
    
    return [
        {
            "id": dataset.id,
            "nome": dataset.nome,
            "linhas": dataset.num_linhas,
            "colunas": dataset.num_colunas,
            "tipo": dataset.tipo_arquivo,
            "data_upload": dataset.data_upload
        }
        for dataset in datasets
    ]

@router.get("/dataset/{dataset_id}")
async def obter_dataset(
    dataset_id: int,
    db: Session = Depends(obter_db)
):
    """
    Obter informações detalhadas de um dataset
    """
    dataset = db.query(Dataset).filter(Dataset.id == dataset_id).first()
    
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset não encontrado")
    
    return {
        "id": dataset.id,
        "nome": dataset.nome,
        "arquivo_original": dataset.arquivo_original,
        "tipo": dataset.tipo_arquivo,
        "linhas": dataset.num_linhas,
        "colunas": dataset.num_colunas,
        "tamanho_mb": round(dataset.tamanho_arquivo / (1024 * 1024), 2),
        "colunas_info": dataset.colunas_info,
        "data_upload": dataset.data_upload
    }

@router.get("/dataset/{dataset_id}/preview")
async def preview_dataset(
    dataset_id: int,
    linhas: int = 10,
    db: Session = Depends(obter_db)
):
    """
    Obter preview das primeiras linhas do dataset
    """
    dataset = db.query(Dataset).filter(Dataset.id == dataset_id).first()
    
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset não encontrado")
    
    try:
        # Carregar dataset baseado no tipo
        if dataset.tipo_arquivo == "csv":
            df = pd.read_csv(dataset.caminho_arquivo)
        elif dataset.tipo_arquivo == "excel":
            df = pd.read_excel(dataset.caminho_arquivo)
        elif dataset.tipo_arquivo == "json":
            df = pd.read_json(dataset.caminho_arquivo)
        elif dataset.tipo_arquivo == "parquet":
            df = pd.read_parquet(dataset.caminho_arquivo)
        
        # Obter preview
        preview_df = df.head(linhas)
        
        return {
            "colunas": preview_df.columns.tolist(),
            "dados": preview_df.to_dict('records'),
            "total_linhas": len(df),
            "linhas_mostradas": len(preview_df)
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erro ao carregar preview: {str(e)}"
        )
