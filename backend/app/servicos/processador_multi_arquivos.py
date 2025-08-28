"""
Sistema Avançado de Upload Multi-Arquivos
Suporte completo para diversos formatos e processamento inteligente
"""

import os
import pandas as pd
import numpy as np
from typing import List, Dict, Any, Optional, Tuple
from pathlib import Path
import json
from datetime import datetime
import zipfile
# import rarfile  # Comentado temporariamente
import openpyxl
from sqlalchemy.orm import Session
import chardet
import xml.etree.ElementTree as ET
from io import StringIO, BytesIO

class ProcessadorMultiArquivos:
    """
    Processador avançado para múltiplos formatos de arquivo
    """
    
    FORMATOS_SUPORTADOS = {
        'tabular': ['.csv', '.xlsx', '.xls', '.tsv', '.txt', '.json', '.xml'],
        'estatistico': ['.sav', '.dta', '.sas7bdat', '.por'],
        'compactado': ['.zip', '.rar', '.7z'],
        'texto': ['.txt', '.md', '.doc', '.docx'],
        'imagem': ['.png', '.jpg', '.jpeg', '.gif', '.bmp'],
        'outros': ['.pdf', '.html', '.sql']
    }
    
    def __init__(self, diretorio_upload: str = "dados/uploads"):
        self.diretorio_upload = Path(diretorio_upload)
        self.diretorio_upload.mkdir(parents=True, exist_ok=True)
        self.arquivos_processados = []
        self.metadados = {}
        
    def detectar_encoding(self, arquivo_path: str) -> str:
        """Detecta automaticamente o encoding do arquivo"""
        try:
            with open(arquivo_path, 'rb') as f:
                raw_data = f.read(10000)  # Lê primeiros 10KB
                resultado = chardet.detect(raw_data)
                return resultado.get('encoding', 'utf-8')
        except:
            return 'utf-8'
    
    def processar_csv(self, arquivo_path: str, **kwargs) -> pd.DataFrame:
        """Processamento inteligente de arquivos CSV"""
        encoding = self.detectar_encoding(arquivo_path)
        
        # Tenta diferentes separadores
        separadores = [',', ';', '\t', '|']
        for sep in separadores:
            try:
                df = pd.read_csv(
                    arquivo_path, 
                    encoding=encoding, 
                    sep=sep,
                    low_memory=False,
                    **kwargs
                )
                if len(df.columns) > 1:  # Se tem mais de uma coluna, provavelmente é o separador correto
                    return df
            except:
                continue
        
        # Se nenhum separador funcionou, tenta leitura padrão
        return pd.read_csv(arquivo_path, encoding=encoding, **kwargs)
    
    def processar_excel(self, arquivo_path: str, **kwargs) -> Dict[str, pd.DataFrame]:
        """Processa arquivos Excel com múltiplas planilhas"""
        try:
            # Lê todas as planilhas
            excel_file = pd.ExcelFile(arquivo_path)
            planilhas = {}
            
            for nome_planilha in excel_file.sheet_names:
                try:
                    df = pd.read_excel(arquivo_path, sheet_name=nome_planilha, **kwargs)
                    if not df.empty:
                        planilhas[nome_planilha] = df
                except Exception as e:
                    print(f"Erro ao processar planilha {nome_planilha}: {e}")
            
            return planilhas
        except Exception as e:
            print(f"Erro ao processar Excel: {e}")
            return {}
    
    def processar_json(self, arquivo_path: str) -> pd.DataFrame:
        """Processa arquivos JSON de forma inteligente"""
        try:
            with open(arquivo_path, 'r', encoding=self.detectar_encoding(arquivo_path)) as f:
                data = json.load(f)
            
            # Se é uma lista de objetos
            if isinstance(data, list):
                return pd.DataFrame(data)
            
            # Se é um objeto com arrays
            elif isinstance(data, dict):
                # Procura a maior lista/array no JSON
                maior_lista = None
                maior_tamanho = 0
                
                for key, value in data.items():
                    if isinstance(value, list) and len(value) > maior_tamanho:
                        maior_lista = key
                        maior_tamanho = len(value)
                
                if maior_lista:
                    return pd.DataFrame(data[maior_lista])
                else:
                    # Tenta converter o objeto diretamente
                    return pd.DataFrame([data])
            
            return pd.DataFrame()
        except Exception as e:
            print(f"Erro ao processar JSON: {e}")
            return pd.DataFrame()
    
    def processar_xml(self, arquivo_path: str) -> pd.DataFrame:
        """Processa arquivos XML convertendo para DataFrame"""
        try:
            tree = ET.parse(arquivo_path)
            root = tree.getroot()
            
            # Extrai todos os elementos filhos como registros
            registros = []
            for elemento in root:
                registro = {}
                for sub_elemento in elemento:
                    registro[sub_elemento.tag] = sub_elemento.text
                registros.append(registro)
            
            return pd.DataFrame(registros)
        except Exception as e:
            print(f"Erro ao processar XML: {e}")
            return pd.DataFrame()
    
    def extrair_arquivos_compactados(self, arquivo_path: str) -> List[str]:
        """Extrai arquivos de formatos compactados"""
        arquivos_extraidos = []
        diretorio_extracao = self.diretorio_upload / f"extraido_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        diretorio_extracao.mkdir(exist_ok=True)
        
        try:
            extensao = Path(arquivo_path).suffix.lower()
            
            if extensao == '.zip':
                with zipfile.ZipFile(arquivo_path, 'r') as zip_ref:
                    zip_ref.extractall(diretorio_extracao)
            
            elif extensao == '.rar':
                # with rarfile.RarFile(arquivo_path, 'r') as rar_ref:
                #     rar_ref.extractall(diretorio_extracao)
                print("Suporte a RAR temporariamente desabilitado")
            
            # Lista arquivos extraídos
            for root, dirs, files in os.walk(diretorio_extracao):
                for file in files:
                    arquivos_extraidos.append(os.path.join(root, file))
            
        except Exception as e:
            print(f"Erro ao extrair arquivo compactado: {e}")
        
        return arquivos_extraidos
    
    def gerar_metadados_arquivo(self, arquivo_path: str, df: pd.DataFrame = None) -> Dict[str, Any]:
        """Gera metadados completos do arquivo"""
        arquivo = Path(arquivo_path)
        metadados = {
            'nome_arquivo': arquivo.name,
            'tamanho_bytes': arquivo.stat().st_size,
            'tamanho_mb': round(arquivo.stat().st_size / (1024 * 1024), 2),
            'extensao': arquivo.suffix.lower(),
            'data_modificacao': datetime.fromtimestamp(arquivo.stat().st_mtime).isoformat(),
            'data_processamento': datetime.now().isoformat(),
            'encoding_detectado': self.detectar_encoding(arquivo_path) if arquivo.suffix in ['.csv', '.txt'] else None
        }
        
        if df is not None and not df.empty:
            metadados.update({
                'linhas': len(df),
                'colunas': len(df.columns),
                'colunas_nomes': df.columns.tolist(),
                'tipos_dados': df.dtypes.astype(str).to_dict(),
                'valores_nulos': df.isnull().sum().to_dict(),
                'memoria_mb': round(df.memory_usage(deep=True).sum() / (1024 * 1024), 2),
                'amostra_dados': df.head(3).to_dict('records') if len(df) > 0 else []
            })
            
            # Estatísticas para colunas numéricas
            colunas_numericas = df.select_dtypes(include=[np.number]).columns
            if len(colunas_numericas) > 0:
                metadados['estatisticas_numericas'] = df[colunas_numericas].describe().to_dict()
            
            # Contagem de valores únicos para colunas categóricas
            colunas_categoricas = df.select_dtypes(include=['object']).columns
            if len(colunas_categoricas) > 0:
                metadados['valores_unicos'] = {
                    col: df[col].nunique() for col in colunas_categoricas
                }
        
        return metadados
    
    def validar_qualidade_dados(self, df: pd.DataFrame) -> Dict[str, Any]:
        """Valida a qualidade dos dados importados"""
        qualidade = {
            'pontuacao_geral': 0,
            'issues': [],
            'recomendacoes': [],
            'metricas': {}
        }
        
        if df.empty:
            qualidade['issues'].append("Dataset vazio")
            return qualidade
        
        # Calcula métricas de qualidade
        total_cells = df.shape[0] * df.shape[1]
        missing_cells = df.isnull().sum().sum()
        missing_rate = (missing_cells / total_cells) * 100
        
        duplicated_rows = df.duplicated().sum()
        duplicate_rate = (duplicated_rows / len(df)) * 100
        
        qualidade['metricas'] = {
            'taxa_valores_ausentes': round(missing_rate, 2),
            'linhas_duplicadas': duplicated_rows,
            'taxa_duplicacao': round(duplicate_rate, 2),
            'colunas_com_valores_unicos': len([col for col in df.columns if df[col].nunique() == len(df)]),
            'colunas_constantes': len([col for col in df.columns if df[col].nunique() <= 1])
        }
        
        # Avaliação de qualidade
        pontos = 100
        
        if missing_rate > 50:
            qualidade['issues'].append(f"Alta taxa de valores ausentes: {missing_rate:.1f}%")
            pontos -= 30
        elif missing_rate > 20:
            qualidade['issues'].append(f"Taxa moderada de valores ausentes: {missing_rate:.1f}%")
            pontos -= 15
        
        if duplicate_rate > 10:
            qualidade['issues'].append(f"Alta taxa de duplicação: {duplicate_rate:.1f}%")
            pontos -= 20
        
        if qualidade['metricas']['colunas_constantes'] > 0:
            qualidade['issues'].append(f"{qualidade['metricas']['colunas_constantes']} colunas com valores constantes")
            pontos -= 10
        
        # Recomendações
        if missing_rate > 5:
            qualidade['recomendacoes'].append("Considerar imputação de valores ausentes")
        
        if duplicate_rate > 1:
            qualidade['recomendacoes'].append("Remover ou investigar linhas duplicadas")
        
        if qualidade['metricas']['colunas_constantes'] > 0:
            qualidade['recomendacoes'].append("Remover colunas com valores constantes")
        
        qualidade['pontuacao_geral'] = max(0, pontos)
        
        return qualidade
    
    def processar_multiplos_arquivos(self, arquivos_paths: List[str], opcoes_processamento: Dict = None) -> Dict[str, Any]:
        """
        Processa múltiplos arquivos e retorna resultados consolidados
        """
        if opcoes_processamento is None:
            opcoes_processamento = {}
        
        resultado = {
            'arquivos_processados': [],
            'dataframes': {},
            'metadados': {},
            'qualidade': {},
            'erros': [],
            'resumo': {
                'total_arquivos': len(arquivos_paths),
                'processados_sucesso': 0,
                'total_linhas': 0,
                'total_colunas': 0
            }
        }
        
        for arquivo_path in arquivos_paths:
            try:
                arquivo = Path(arquivo_path)
                extensao = arquivo.suffix.lower()
                nome_base = arquivo.stem
                
                print(f"🔄 Processando: {arquivo.name}")
                
                # Extrai arquivos compactados primeiro
                if extensao in self.FORMATOS_SUPORTADOS['compactado']:
                    arquivos_extraidos = self.extrair_arquivos_compactados(arquivo_path)
                    # Processa recursivamente os arquivos extraídos
                    for arquivo_extraido in arquivos_extraidos:
                        sub_resultado = self.processar_multiplos_arquivos([arquivo_extraido], opcoes_processamento)
                        # Merge dos resultados
                        resultado['dataframes'].update(sub_resultado['dataframes'])
                        resultado['metadados'].update(sub_resultado['metadados'])
                        resultado['qualidade'].update(sub_resultado['qualidade'])
                    continue
                
                # Processa arquivo baseado na extensão
                dataframes = {}
                
                if extensao == '.csv':
                    df = self.processar_csv(arquivo_path, **opcoes_processamento.get('csv', {}))
                    dataframes[nome_base] = df
                
                elif extensao in ['.xlsx', '.xls']:
                    planilhas = self.processar_excel(arquivo_path, **opcoes_processamento.get('excel', {}))
                    for nome_planilha, df in planilhas.items():
                        dataframes[f"{nome_base}_{nome_planilha}"] = df
                
                elif extensao == '.json':
                    df = self.processar_json(arquivo_path)
                    dataframes[nome_base] = df
                
                elif extensao == '.xml':
                    df = self.processar_xml(arquivo_path)
                    dataframes[nome_base] = df
                
                elif extensao == '.txt':
                    df = self.processar_csv(arquivo_path, **opcoes_processamento.get('txt', {}))
                    dataframes[nome_base] = df
                
                # Gera metadados e validação para cada DataFrame
                for nome_df, df in dataframes.items():
                    if not df.empty:
                        resultado['dataframes'][nome_df] = df
                        resultado['metadados'][nome_df] = self.gerar_metadados_arquivo(arquivo_path, df)
                        resultado['qualidade'][nome_df] = self.validar_qualidade_dados(df)
                        
                        # Atualiza resumo
                        resultado['resumo']['total_linhas'] += len(df)
                        resultado['resumo']['total_colunas'] += len(df.columns)
                
                resultado['arquivos_processados'].append(arquivo.name)
                resultado['resumo']['processados_sucesso'] += 1
                
                print(f"✅ Processado: {arquivo.name}")
                
            except Exception as e:
                erro_msg = f"Erro ao processar {arquivo_path}: {str(e)}"
                resultado['erros'].append(erro_msg)
                print(f"❌ {erro_msg}")
        
        # Calcula médias do resumo
        if resultado['resumo']['processados_sucesso'] > 0:
            resultado['resumo']['media_linhas_por_arquivo'] = resultado['resumo']['total_linhas'] // resultado['resumo']['processados_sucesso']
            resultado['resumo']['media_colunas_por_arquivo'] = resultado['resumo']['total_colunas'] // resultado['resumo']['processados_sucesso']
        
        return resultado
    
    def combinar_dataframes(self, dataframes: Dict[str, pd.DataFrame], metodo: str = 'concat') -> pd.DataFrame:
        """
        Combina múltiplos DataFrames de diferentes formas
        """
        if not dataframes:
            return pd.DataFrame()
        
        dfs_list = list(dataframes.values())
        
        if metodo == 'concat':
            # Concatenação vertical (empilha os dados)
            return pd.concat(dfs_list, ignore_index=True, sort=False)
        
        elif metodo == 'merge':
            # Merge baseado em colunas comuns
            resultado = dfs_list[0]
            for df in dfs_list[1:]:
                # Encontra colunas comuns
                colunas_comuns = list(set(resultado.columns) & set(df.columns))
                if colunas_comuns:
                    resultado = resultado.merge(df, on=colunas_comuns, how='outer')
                else:
                    # Se não há colunas comuns, faz join por índice
                    resultado = resultado.join(df, rsuffix='_right')
            return resultado
        
        elif metodo == 'union':
            # União de datasets com mesma estrutura
            return pd.concat(dfs_list, ignore_index=True).drop_duplicates()
        
        return pd.DataFrame()
    
    def gerar_relatorio_processamento(self, resultado: Dict[str, Any]) -> str:
        """Gera relatório detalhado do processamento"""
        relatorio = []
        relatorio.append("# RELATÓRIO DE PROCESSAMENTO DE ARQUIVOS")
        relatorio.append("=" * 50)
        relatorio.append("")
        
        # Resumo geral
        resumo = resultado['resumo']
        relatorio.append("## RESUMO GERAL")
        relatorio.append(f"📁 Total de arquivos: {resumo['total_arquivos']}")
        relatorio.append(f"✅ Processados com sucesso: {resumo['processados_sucesso']}")
        relatorio.append(f"❌ Erros: {len(resultado['erros'])}")
        relatorio.append(f"📊 Total de linhas: {resumo['total_linhas']:,}")
        relatorio.append(f"📋 Total de colunas: {resumo['total_colunas']}")
        relatorio.append("")
        
        # Detalhes por arquivo
        relatorio.append("## DETALHES POR ARQUIVO")
        for nome, metadados in resultado['metadados'].items():
            qualidade = resultado['qualidade'].get(nome, {})
            relatorio.append(f"### {nome}")
            relatorio.append(f"- Linhas: {metadados.get('linhas', 0):,}")
            relatorio.append(f"- Colunas: {metadados.get('colunas', 0)}")
            relatorio.append(f"- Tamanho: {metadados.get('tamanho_mb', 0)} MB")
            relatorio.append(f"- Qualidade: {qualidade.get('pontuacao_geral', 0)}/100")
            
            if qualidade.get('issues'):
                relatorio.append("- Issues: " + "; ".join(qualidade['issues']))
            relatorio.append("")
        
        # Erros
        if resultado['erros']:
            relatorio.append("## ERROS ENCONTRADOS")
            for erro in resultado['erros']:
                relatorio.append(f"❌ {erro}")
            relatorio.append("")
        
        return "\n".join(relatorio)

def criar_processador_arquivos():
    """Factory function para criar o processador"""
    return ProcessadorMultiArquivos()
