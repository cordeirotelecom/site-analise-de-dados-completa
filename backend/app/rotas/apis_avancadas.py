"""
Rotas avançadas para APIs de dados públicos e multi-upload
"""

from fastapi import APIRouter, HTTPException, UploadFile, File, Form, Depends
from fastapi.responses import JSONResponse
from typing import List, Dict, Any, Optional
import pandas as pd
import json
from sqlalchemy.orm import Session
import tempfile
import os
from pathlib import Path

from ..database.conexao import get_db
from ..servicos.apis_dados_publicos import criar_coletor_dados
from ..servicos.processador_multi_arquivos import criar_processador_arquivos
from ..servicos.sistema_tags_analise import criar_sistema_tags, NivelExperiencia
from ..modelos.dataset import Dataset
from ..modelos.projeto import Projeto

router = APIRouter(prefix="/api/v2", tags=["Funcionalidades Avançadas"])

@router.get("/dados-publicos/municipios-sc")
async def obter_municipios_sc():
    """Obtém lista de todos os municípios de Santa Catarina"""
    try:
        coletor = criar_coletor_dados()
        municipios_df = coletor.buscar_municipios_sc()
        
        if municipios_df.empty:
            raise HTTPException(status_code=404, detail="Nenhum município encontrado")
        
        return {
            "success": True,
            "data": municipios_df.to_dict('records'),
            "total": len(municipios_df),
            "fonte": "IBGE"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar municípios: {str(e)}")

@router.get("/dados-publicos/dataset-completo-sc")
async def obter_dataset_completo_sc(
    municipios: Optional[str] = None,  # Lista de municípios separados por vírgula
    salvar_projeto: bool = False,
    nome_projeto: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Gera dataset completo com todos os indicadores de SC"""
    try:
        coletor = criar_coletor_dados()
        
        # Parse da lista de municípios
        lista_municipios = None
        if municipios:
            lista_municipios = [m.strip() for m in municipios.split(',')]
        
        # Gera o dataset completo
        dataset_completo = coletor.gerar_dataset_completo_sc(lista_municipios)
        
        if dataset_completo.empty:
            raise HTTPException(status_code=404, detail="Nenhum dado encontrado")
        
        resultado = {
            "success": True,
            "data": dataset_completo.to_dict('records'),
            "metadados": {
                "total_municipios": len(dataset_completo),
                "total_variaveis": len(dataset_completo.columns),
                "colunas": dataset_completo.columns.tolist(),
                "tipos_dados": dataset_completo.dtypes.astype(str).to_dict(),
                "municipios_filtrados": lista_municipios,
                "fonte": "IBGE, SES-SC, SSP-SC, INEP, FATMA"
            }
        }
        
        # Salva como projeto se solicitado
        if salvar_projeto and nome_projeto:
            try:
                # Cria novo projeto
                novo_projeto = Projeto(
                    nome=nome_projeto,
                    descricao=f"Dataset completo de SC com {len(dataset_completo)} municípios",
                    usuario_id=1  # TODO: Pegar do usuário autenticado
                )
                db.add(novo_projeto)
                db.flush()
                
                # Salva dataset
                dataset_path = f"dados/projetos/{novo_projeto.id}_dataset_sc.csv"
                os.makedirs(os.path.dirname(dataset_path), exist_ok=True)
                dataset_completo.to_csv(dataset_path, index=False)
                
                # Cria registro do dataset
                novo_dataset = Dataset(
                    nome="Dataset Completo SC",
                    arquivo_path=dataset_path,
                    projeto_id=novo_projeto.id,
                    linhas=len(dataset_completo),
                    colunas=len(dataset_completo.columns)
                )
                db.add(novo_dataset)
                db.commit()
                
                resultado["projeto_criado"] = {
                    "id": novo_projeto.id,
                    "nome": novo_projeto.nome,
                    "dataset_id": novo_dataset.id
                }
                
            except Exception as e:
                db.rollback()
                print(f"Erro ao salvar projeto: {e}")
        
        return resultado
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao gerar dataset: {str(e)}")

@router.get("/dados-publicos/comparativo-regioes-sc")
async def obter_comparativo_regioes_sc():
    """Gera comparativo entre regiões de Santa Catarina"""
    try:
        coletor = criar_coletor_dados()
        comparativo_df = coletor.gerar_comparativo_regioes()
        
        return {
            "success": True,
            "data": comparativo_df.to_dict('index'),
            "metadados": {
                "total_regioes": len(comparativo_df),
                "indicadores": comparativo_df.columns.tolist(),
                "fonte": "IBGE, SES-SC, SSP-SC"
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao gerar comparativo: {str(e)}")

@router.post("/upload/multiplos-arquivos")
async def upload_multiplos_arquivos(
    arquivos: List[UploadFile] = File(...),
    opcoes_csv: Optional[str] = Form(None),  # JSON com opções para CSV
    opcoes_excel: Optional[str] = Form(None),  # JSON com opções para Excel
    criar_projeto: bool = Form(False),
    nome_projeto: Optional[str] = Form(None),
    combinar_dados: bool = Form(False),
    metodo_combinacao: str = Form("concat"),  # concat, merge, union
    db: Session = Depends(get_db)
):
    """Upload e processamento de múltiplos arquivos simultaneamente"""
    try:
        if len(arquivos) > 20:  # Limite de segurança
            raise HTTPException(status_code=400, detail="Máximo de 20 arquivos por upload")
        
        # Parse das opções
        opcoes_processamento = {}
        if opcoes_csv:
            opcoes_processamento['csv'] = json.loads(opcoes_csv)
        if opcoes_excel:
            opcoes_processamento['excel'] = json.loads(opcoes_excel)
        
        # Salva arquivos temporariamente
        arquivos_paths = []
        temp_dir = tempfile.mkdtemp()
        
        for arquivo in arquivos:
            arquivo_path = os.path.join(temp_dir, arquivo.filename)
            with open(arquivo_path, "wb") as f:
                content = await arquivo.read()
                f.write(content)
            arquivos_paths.append(arquivo_path)
        
        # Processa arquivos
        processador = criar_processador_arquivos()
        resultado_processamento = processador.processar_multiplos_arquivos(
            arquivos_paths, opcoes_processamento
        )
        
        # Combina datasets se solicitado
        dataset_combinado = None
        if combinar_dados and resultado_processamento['dataframes']:
            dataset_combinado = processador.combinar_dataframes(
                resultado_processamento['dataframes'], 
                metodo_combinacao
            )
        
        # Gera relatório
        relatorio = processador.gerar_relatorio_processamento(resultado_processamento)
        
        # Prepara resposta
        resposta = {
            "success": True,
            "resumo": resultado_processamento['resumo'],
            "arquivos_processados": resultado_processamento['arquivos_processados'],
            "erros": resultado_processamento['erros'],
            "relatorio": relatorio,
            "datasets": {}
        }
        
        # Converte DataFrames para dicionários (amostra)
        for nome, df in resultado_processamento['dataframes'].items():
            resposta["datasets"][nome] = {
                "amostra": df.head(10).to_dict('records'),
                "metadados": resultado_processamento['metadados'].get(nome, {}),
                "qualidade": resultado_processamento['qualidade'].get(nome, {})
            }
        
        if dataset_combinado is not None and not dataset_combinado.empty:
            resposta["dataset_combinado"] = {
                "amostra": dataset_combinado.head(10).to_dict('records'),
                "linhas": len(dataset_combinado),
                "colunas": len(dataset_combinado.columns),
                "metodo": metodo_combinacao
            }
        
        # Cria projeto se solicitado
        if criar_projeto and nome_projeto and resultado_processamento['dataframes']:
            try:
                novo_projeto = Projeto(
                    nome=nome_projeto,
                    descricao=f"Projeto multi-arquivo com {len(resultado_processamento['dataframes'])} datasets",
                    usuario_id=1  # TODO: Pegar do usuário autenticado
                )
                db.add(novo_projeto)
                db.flush()
                
                # Salva cada dataset
                datasets_salvos = []
                for nome, df in resultado_processamento['dataframes'].items():
                    dataset_path = f"dados/projetos/{novo_projeto.id}_{nome}.csv"
                    os.makedirs(os.path.dirname(dataset_path), exist_ok=True)
                    df.to_csv(dataset_path, index=False)
                    
                    dataset = Dataset(
                        nome=nome,
                        arquivo_path=dataset_path,
                        projeto_id=novo_projeto.id,
                        linhas=len(df),
                        colunas=len(df.columns)
                    )
                    db.add(dataset)
                    datasets_salvos.append(nome)
                
                # Salva dataset combinado se existe
                if dataset_combinado is not None:
                    dataset_path = f"dados/projetos/{novo_projeto.id}_combinado.csv"
                    dataset_combinado.to_csv(dataset_path, index=False)
                    
                    dataset = Dataset(
                        nome="Dataset Combinado",
                        arquivo_path=dataset_path,
                        projeto_id=novo_projeto.id,
                        linhas=len(dataset_combinado),
                        colunas=len(dataset_combinado.columns)
                    )
                    db.add(dataset)
                    datasets_salvos.append("Dataset Combinado")
                
                db.commit()
                
                resposta["projeto_criado"] = {
                    "id": novo_projeto.id,
                    "nome": novo_projeto.nome,
                    "datasets": datasets_salvos
                }
                
            except Exception as e:
                db.rollback()
                print(f"Erro ao criar projeto: {e}")
        
        # Limpa arquivos temporários
        import shutil
        shutil.rmtree(temp_dir, ignore_errors=True)
        
        return resposta
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro no upload múltiplo: {str(e)}")

@router.post("/analise/recomendacoes")
async def recomendar_analises(
    projeto_id: int,
    objetivo: Optional[str] = None,
    nivel_usuario: str = "intermediario",
    tempo_disponivel: Optional[int] = None,
    db: Session = Depends(get_db)
):
    """Recomenda análises baseadas nos dados e perfil do usuário"""
    try:
        # Busca projeto e dataset
        projeto = db.query(Projeto).filter(Projeto.id == projeto_id).first()
        if not projeto:
            raise HTTPException(status_code=404, detail="Projeto não encontrado")
        
        dataset = db.query(Dataset).filter(Dataset.projeto_id == projeto_id).first()
        if not dataset:
            raise HTTPException(status_code=404, detail="Dataset não encontrado no projeto")
        
        # Carrega dados
        try:
            df = pd.read_csv(dataset.arquivo_path)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Erro ao carregar dataset: {e}")
        
        # Converte nível do usuário
        nivel_map = {
            "iniciante": NivelExperiencia.INICIANTE,
            "intermediario": NivelExperiencia.INTERMEDIARIO,
            "avancado": NivelExperiencia.AVANCADO,
            "especialista": NivelExperiencia.ESPECIALISTA
        }
        nivel_enum = nivel_map.get(nivel_usuario.lower(), NivelExperiencia.INTERMEDIARIO)
        
        # Gera recomendações
        sistema_tags = criar_sistema_tags()
        recomendacoes = sistema_tags.recomendar_analises(
            df, objetivo, nivel_enum, tempo_disponivel
        )
        
        # Prepara resposta
        recomendacoes_formatadas = []
        for config in recomendacoes:
            recomendacoes_formatadas.append({
                "id": config.id,
                "nome": config.nome,
                "descricao": config.descricao,
                "tipo": config.tipo_analise.value,
                "complexidade": config.complexidade,
                "tempo_estimado": config.tempo_estimado_min,
                "objetivo": config.objetivo,
                "interpretacao": config.interpretacao,
                "limitacoes": config.limitacoes,
                "pressupostos": config.pressupostos,
                "metodos": [m.value for m in config.metodos],
                "visualizacoes": [v.value for v in config.visualizacoes]
            })
        
        return {
            "success": True,
            "recomendacoes": recomendacoes_formatadas,
            "dados_analisados": {
                "linhas": len(df),
                "colunas": len(df.columns),
                "colunas_numericas": len(df.select_dtypes(include=['number']).columns),
                "colunas_categoricas": len(df.select_dtypes(include=['object']).columns)
            },
            "parametros": {
                "objetivo": objetivo,
                "nivel_usuario": nivel_usuario,
                "tempo_disponivel": tempo_disponivel
            }
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao gerar recomendações: {str(e)}")

@router.get("/analise/configuracoes")
async def listar_configuracoes_analise():
    """Lista todas as configurações de análise disponíveis por categoria"""
    try:
        sistema_tags = criar_sistema_tags()
        configuracoes_por_categoria = sistema_tags.listar_analises_por_categoria()
        
        resultado = {}
        for tipo_analise, configuracoes in configuracoes_por_categoria.items():
            resultado[tipo_analise.value] = [
                {
                    "id": config.id,
                    "nome": config.nome,
                    "descricao": config.descricao,
                    "complexidade": config.complexidade,
                    "tempo_estimado": config.tempo_estimado_min,
                    "nivel_minimo": config.nivel_minimo.value,
                    "metodos_count": len(config.metodos),
                    "visualizacoes_count": len(config.visualizacoes)
                }
                for config in configuracoes
            ]
        
        return {
            "success": True,
            "categorias": resultado,
            "total_configuracoes": sum(len(configs) for configs in resultado.values())
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao listar configurações: {str(e)}")

@router.get("/analise/roadmap")
async def gerar_roadmap_aprendizado(nivel_atual: str = "iniciante"):
    """Gera roadmap de aprendizado baseado no nível atual do usuário"""
    try:
        nivel_map = {
            "iniciante": NivelExperiencia.INICIANTE,
            "intermediario": NivelExperiencia.INTERMEDIARIO,
            "avancado": NivelExperiencia.AVANCADO,
            "especialista": NivelExperiencia.ESPECIALISTA
        }
        nivel_enum = nivel_map.get(nivel_atual.lower(), NivelExperiencia.INICIANTE)
        
        sistema_tags = criar_sistema_tags()
        roadmap = sistema_tags.gerar_roadmap_analises(nivel_enum)
        
        roadmap_formatado = []
        for i, config in enumerate(roadmap, 1):
            roadmap_formatado.append({
                "ordem": i,
                "id": config.id,
                "nome": config.nome,
                "descricao": config.descricao,
                "tipo": config.tipo_analise.value,
                "complexidade": config.complexidade,
                "tempo_estimado": config.tempo_estimado_min,
                "nivel_requerido": config.nivel_minimo.value,
                "objetivo": config.objetivo
            })
        
        return {
            "success": True,
            "roadmap": roadmap_formatado,
            "nivel_atual": nivel_atual,
            "total_etapas": len(roadmap_formatado)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao gerar roadmap: {str(e)}")

@router.post("/analise/executar-configuracao")
async def executar_analise_configurada(
    projeto_id: int,
    configuracao_id: str,
    parametros_personalizados: Optional[Dict[str, Any]] = None,
    db: Session = Depends(get_db)
):
    """Executa uma análise usando configuração pré-definida"""
    try:
        # Busca projeto e dataset
        projeto = db.query(Projeto).filter(Projeto.id == projeto_id).first()
        if not projeto:
            raise HTTPException(status_code=404, detail="Projeto não encontrado")
        
        dataset = db.query(Dataset).filter(Dataset.projeto_id == projeto_id).first()
        if not dataset:
            raise HTTPException(status_code=404, detail="Dataset não encontrado")
        
        # Busca configuração
        sistema_tags = criar_sistema_tags()
        config = sistema_tags.obter_configuracao(configuracao_id)
        if not config:
            raise HTTPException(status_code=404, detail="Configuração não encontrada")
        
        # Carrega dados
        df = pd.read_csv(dataset.arquivo_path)
        
        # TODO: Implementar execução real das análises baseada na configuração
        # Por agora, retorna estrutura de resposta
        
        return {
            "success": True,
            "analise_executada": {
                "configuracao": config.nome,
                "tipo": config.tipo_analise.value,
                "metodos_aplicados": [m.value for m in config.metodos],
                "visualizacoes_geradas": [v.value for v in config.visualizacoes]
            },
            "dados": {
                "linhas_analisadas": len(df),
                "colunas_analisadas": len(df.columns)
            },
            "parametros": parametros_personalizados or {},
            "tempo_execucao": config.tempo_estimado_min,
            "message": "Análise configurada com sucesso! Implementação detalhada em desenvolvimento."
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao executar análise: {str(e)}")
