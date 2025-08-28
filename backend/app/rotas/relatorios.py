"""
Rotas para Geração de Relatórios
"""

from fastapi import APIRouter, HTTPException, Depends, Response
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import pandas as pd
import numpy as np
from datetime import datetime
import os
import tempfile

from app.database.conexao import obter_db
from app.modelos.dataset import Dataset
from app.modelos.analise import Analise
from app.servicos.gerador_relatorios import GeradorRelatorios

router = APIRouter()

class SolicitacaoRelatorio(BaseModel):
    analise_ids: List[int]
    formato: str  # "pdf", "html", "docx", "latex"
    tipo_relatorio: str  # "cientifico", "executivo", "tecnico"
    incluir_graficos: bool = True
    incluir_codigo: bool = False
    titulo_personalizado: Optional[str] = None
    autor: Optional[str] = "DataScience Pro"
    parametros_extras: Optional[Dict[str, Any]] = {}

@router.post("/gerar")
async def gerar_relatorio(
    solicitacao: SolicitacaoRelatorio,
    db: Session = Depends(obter_db)
):
    """
    Gera relatório baseado nas análises selecionadas
    """
    # Validar análises
    analises = db.query(Analise).filter(Analise.id.in_(solicitacao.analise_ids)).all()
    
    if len(analises) != len(solicitacao.analise_ids):
        ids_encontrados = [a.id for a in analises]
        ids_nao_encontrados = [id for id in solicitacao.analise_ids if id not in ids_encontrados]
        raise HTTPException(
            status_code=404,
            detail=f"Análises não encontradas: {ids_nao_encontrados}"
        )
    
    # Verificar se todas as análises estão concluídas
    analises_incompletas = [a.id for a in analises if a.status.value != "concluida"]
    if analises_incompletas:
        raise HTTPException(
            status_code=400,
            detail=f"Análises ainda não concluídas: {analises_incompletas}"
        )
    
    try:
        # Gerar relatório
        gerador = GeradorRelatorios()
        
        if solicitacao.tipo_relatorio == "cientifico":
            relatorio = gerador.gerar_artigo_cientifico(analises, solicitacao)
        elif solicitacao.tipo_relatorio == "executivo":
            relatorio = gerador.gerar_relatorio_executivo(analises, solicitacao)
        elif solicitacao.tipo_relatorio == "tecnico":
            relatorio = gerador.gerar_relatorio_tecnico(analises, solicitacao)
        else:
            raise HTTPException(
                status_code=400,
                detail=f"Tipo de relatório '{solicitacao.tipo_relatorio}' não suportado"
            )
        
        return {
            "relatorio_id": f"rel_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
            "formato": solicitacao.formato,
            "tipo": solicitacao.tipo_relatorio,
            "conteudo": relatorio,
            "analises_incluidas": len(analises),
            "data_geracao": datetime.now().isoformat()
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erro ao gerar relatório: {str(e)}"
        )

@router.get("/analise/{analise_id}/relatorio-rapido")
async def gerar_relatorio_rapido(
    analise_id: int,
    formato: str = "html",
    db: Session = Depends(obter_db)
):
    """
    Gera relatório rápido para uma única análise
    """
    analise = db.query(Analise).filter(Analise.id == analise_id).first()
    
    if not analise:
        raise HTTPException(status_code=404, detail="Análise não encontrada")
    
    if analise.status.value != "concluida":
        raise HTTPException(
            status_code=400,
            detail="Análise ainda não concluída"
        )
    
    try:
        gerador = GeradorRelatorios()
        relatorio = gerador.gerar_relatorio_simples(analise, formato)
        
        return {
            "relatorio": relatorio,
            "analise_id": analise.id,
            "tipo_analise": analise.tipo.value,
            "formato": formato
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erro ao gerar relatório: {str(e)}"
        )

@router.post("/download/{relatorio_id}")
async def download_relatorio(
    relatorio_id: str,
    formato: str,
    conteudo: str
):
    """
    Download do relatório em formato específico
    """
    try:
        if formato.lower() == "pdf":
            # Converter HTML para PDF
            import pdfkit
            
            # Configurar opções do PDF
            options = {
                'page-size': 'A4',
                'margin-top': '0.75in',
                'margin-right': '0.75in',
                'margin-bottom': '0.75in',
                'margin-left': '0.75in',
                'encoding': "UTF-8",
                'no-outline': None
            }
            
            pdf_content = pdfkit.from_string(conteudo, False, options=options)
            
            return Response(
                content=pdf_content,
                media_type="application/pdf",
                headers={"Content-Disposition": f"attachment; filename={relatorio_id}.pdf"}
            )
            
        elif formato.lower() == "html":
            return Response(
                content=conteudo,
                media_type="text/html",
                headers={"Content-Disposition": f"attachment; filename={relatorio_id}.html"}
            )
            
        elif formato.lower() == "docx":
            # Converter para DOCX
            from docx import Document
            import io
            
            doc = Document()
            
            # Parsear HTML básico e adicionar ao documento
            # Esta é uma implementação simplificada
            paragrafos = conteudo.split('\n')
            for paragrafo in paragrafos:
                if paragrafo.strip():
                    doc.add_paragraph(paragrafo.strip())
            
            # Salvar em buffer
            buffer = io.BytesIO()
            doc.save(buffer)
            buffer.seek(0)
            
            return Response(
                content=buffer.getvalue(),
                media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                headers={"Content-Disposition": f"attachment; filename={relatorio_id}.docx"}
            )
            
        else:
            raise HTTPException(
                status_code=400,
                detail=f"Formato '{formato}' não suportado"
            )
            
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erro ao gerar download: {str(e)}"
        )

@router.get("/templates")
async def listar_templates_relatorio():
    """
    Lista templates disponíveis para relatórios
    """
    templates = [
        {
            "id": "artigo_cientifico",
            "nome": "Artigo Científico",
            "descricao": "Formato acadêmico com introdução, metodologia, resultados e conclusões",
            "secoes": [
                "resumo", "introducao", "metodologia", "resultados", 
                "discussao", "conclusoes", "referencias"
            ]
        },
        {
            "id": "relatorio_executivo",
            "nome": "Relatório Executivo",
            "descricao": "Formato resumido focado em insights de negócio",
            "secoes": [
                "resumo_executivo", "principais_achados", "recomendacoes", "proximos_passos"
            ]
        },
        {
            "id": "relatorio_tecnico",
            "nome": "Relatório Técnico",
            "descricao": "Formato detalhado com especificações técnicas e código",
            "secoes": [
                "overview", "dados", "metodologia", "implementacao", 
                "resultados", "validacao", "anexos"
            ]
        },
        {
            "id": "dashboard_report",
            "nome": "Relatório de Dashboard",
            "descricao": "Formato visual com foco em gráficos e visualizações",
            "secoes": [
                "overview", "visualizacoes", "insights", "metricas_chave"
            ]
        }
    ]
    
    return {
        "templates": templates,
        "formatos_suportados": ["html", "pdf", "docx", "latex"],
        "total": len(templates)
    }

@router.post("/comparar-analises")
async def gerar_relatorio_comparativo(
    analise_ids: List[int],
    db: Session = Depends(obter_db)
):
    """
    Gera relatório comparativo entre múltiplas análises
    """
    analises = db.query(Analise).filter(Analise.id.in_(analise_ids)).all()
    
    if len(analises) < 2:
        raise HTTPException(
            status_code=400,
            detail="São necessárias pelo menos 2 análises para comparação"
        )
    
    try:
        gerador = GeradorRelatorios()
        relatorio = gerador.gerar_relatorio_comparativo(analises)
        
        return {
            "relatorio_comparativo": relatorio,
            "analises_comparadas": len(analises),
            "tipos_analise": [a.tipo.value for a in analises]
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erro ao gerar relatório comparativo: {str(e)}"
        )

@router.get("/metricas-plataforma")
async def obter_metricas_plataforma(
    db: Session = Depends(obter_db)
):
    """
    Obtém métricas gerais da plataforma para relatórios
    """
    try:
        # Contar datasets
        total_datasets = db.query(Dataset).count()
        
        # Contar análises por tipo
        from sqlalchemy import func
        analises_por_tipo = db.query(
            Analise.tipo,
            func.count(Analise.id)
        ).group_by(Analise.tipo).all()
        
        # Contar análises por status
        analises_por_status = db.query(
            Analise.status,
            func.count(Analise.id)
        ).group_by(Analise.status).all()
        
        # Tempo médio de execução
        tempo_medio = db.query(func.avg(Analise.tempo_execucao)).scalar()
        
        return {
            "total_datasets": total_datasets,
            "total_analises": db.query(Analise).count(),
            "analises_por_tipo": {
                tipo.value: count for tipo, count in analises_por_tipo
            },
            "analises_por_status": {
                status.value: count for status, count in analises_por_status
            },
            "tempo_medio_execucao": round(tempo_medio or 0, 2),
            "data_consulta": datetime.now().isoformat()
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erro ao obter métricas: {str(e)}"
        )
