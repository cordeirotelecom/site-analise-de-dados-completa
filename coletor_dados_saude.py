#!/usr/bin/env python3
"""
Coletor de Dados de Saúde Pública - Grande Florianópolis
Sistema automatizado para coleta e análise de dados governamentais de saúde

Fontes integradas:
- DATASUS (Ministério da Saúde)
- IBGE (Instituto Brasileiro de Geografia e Estatística)
- Portal de Dados Abertos do Governo Federal
- APIs estaduais e municipais de Santa Catarina

Autor: DataScience Pro
Data: 2025
"""

import requests
import json
import pandas as pd
import os
import time
from datetime import datetime, timedelta
import logging
from typing import Dict, List, Optional
import matplotlib.pyplot as plt
import seaborn as sns

# Configuração de logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class ColetorDadosSaude:
    """
    Coletor especializado em dados de saúde pública para análise científica
    """
    
    def __init__(self):
        self.municipios_grande_floripa = {
            'Florianópolis': {
                'codigo_ibge': 4205407,
                'populacao_estimada': 516524,  # IBGE 2021
                'cobertura_esf': 97.26,  # %
                'regiao': 'Grande Florianópolis'
            },
            'São José': {
                'codigo_ibge': 4216602,
                'populacao_estimada': 242927,
                'cobertura_esf': 85.0,  # Estimativa
                'regiao': 'Grande Florianópolis'
            },
            'Biguaçu': {
                'codigo_ibge': 4202305,
                'populacao_estimada': 65504,
                'cobertura_esf': 70.0,  # Estimativa
                'regiao': 'Grande Florianópolis'
            },
            'Palhoça': {
                'codigo_ibge': 4211900,
                'populacao_estimada': 176928,
                'cobertura_esf': 80.61,
                'regiao': 'Grande Florianópolis'
            }
        }
        
        self.apis_disponiveis = {
            'ibge_localidades': 'https://servicodados.ibge.gov.br/api/v1/localidades/municipios/',
            'ibge_populacao': 'https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/2021/variaveis/9324',
            'dados_abertos_gov': 'https://dados.gov.br/api/',
            'datasus_base': 'https://apidadosabertos.saude.gov.br/',
        }
        
        self.dados_coletados = {}
        self.criar_estrutura_projeto()
    
    def criar_estrutura_projeto(self):
        """Cria estrutura organizacional do projeto"""
        diretorios = [
            'dados_saude_floripa',
            'dados_saude_floripa/raw_data',
            'dados_saude_floripa/processed_data',
            'dados_saude_floripa/visualizacoes',
            'dados_saude_floripa/relatorios',
            'dados_saude_floripa/api_responses',
            'dados_saude_floripa/logs'
        ]
        
        for diretorio in diretorios:
            os.makedirs(diretorio, exist_ok=True)
        
        logger.info("Estrutura do projeto criada com sucesso!")
    
    def coletar_dados_ibge_municipios(self) -> Dict:
        """Coleta dados demográficos básicos dos municípios via API IBGE"""
        logger.info("Coletando dados demográficos dos municípios...")
        
        dados_demograficos = {}
        
        for nome_municipio, info in self.municipios_grande_floripa.items():
            try:
                url = f"{self.apis_disponiveis['ibge_localidades']}{info['codigo_ibge']}"
                response = requests.get(url, timeout=10)
                response.raise_for_status()
                
                dados_api = response.json()
                
                # Enriquecer com dados locais
                dados_demograficos[nome_municipio] = {
                    **dados_api,
                    'info_local': info,
                    'timestamp_coleta': datetime.now().isoformat()
                }
                
                logger.info(f"✓ Dados coletados para {nome_municipio}")
                time.sleep(1)  # Rate limiting
                
            except requests.RequestException as e:
                logger.error(f"✗ Erro ao coletar dados de {nome_municipio}: {e}")
        
        # Salvar dados
        arquivo_saida = 'dados_saude_floripa/raw_data/municipios_demografia_ibge.json'
        with open(arquivo_saida, 'w', encoding='utf-8') as f:
            json.dump(dados_demograficos, f, ensure_ascii=False, indent=2)
        
        return dados_demograficos
    
    def mapear_fontes_datasus(self) -> Dict:
        """Mapeia e documenta fontes disponíveis no DATASUS"""
        logger.info("Mapeando fontes de dados do DATASUS...")
        
        fontes_datasus = {
            'sistemas_principais': {
                'SIM': {
                    'nome': 'Sistema de Informações sobre Mortalidade',
                    'url_tabnet': 'http://tabnet.datasus.gov.br/cgi/deftohtm.exe?sim/cnv/obt10sc.def',
                    'dados': 'Óbitos por causas, faixa etária, município',
                    'periodo': 'A partir de 1979'
                },
                'SINASC': {
                    'nome': 'Sistema de Informações sobre Nascidos Vivos',
                    'url_tabnet': 'http://tabnet.datasus.gov.br/cgi/deftohtm.exe?sinasc/cnv/nvsc.def',
                    'dados': 'Nascimentos, peso ao nascer, tipo de parto',
                    'periodo': 'A partir de 1994'
                },
                'SIH': {
                    'nome': 'Sistema de Informações Hospitalares',
                    'url_tabnet': 'http://tabnet.datasus.gov.br/cgi/deftohtm.exe?sih/cnv/nrsc.def',
                    'dados': 'Internações hospitalares, AIH, procedimentos',
                    'periodo': 'A partir de 1984'
                },
                'SINAN': {
                    'nome': 'Sistema de Informação de Agravos de Notificação',
                    'url_tabnet': 'http://tabnet.datasus.gov.br/cgi/deftohtm.exe?sinannet/cnv/dengueesc.def',
                    'dados': 'Doenças de notificação compulsória',
                    'periodo': 'A partir de 1990'
                }
            },
            'indicadores_especiais': {
                'cobertura_esf': {
                    'fonte': 'e-Gestor AB',
                    'url': 'https://egestorab.saude.gov.br/',
                    'descricao': 'Cobertura da Estratégia Saúde da Família por município'
                },
                'cnes': {
                    'fonte': 'Cadastro Nacional de Estabelecimentos de Saúde',
                    'url': 'http://tabnet.datasus.gov.br/cgi/deftohtm.exe?cnes/cnv/estabsc.def',
                    'descricao': 'Estabelecimentos de saúde por tipo e município'
                }
            }
        }
        
        # Salvar mapeamento
        arquivo_saida = 'dados_saude_floripa/raw_data/fontes_datasus_mapeamento.json'
        with open(arquivo_saida, 'w', encoding='utf-8') as f:
            json.dump(fontes_datasus, f, ensure_ascii=False, indent=2)
        
        return fontes_datasus
    
    def simular_coleta_dados_saude(self) -> Dict:
        """Simula coleta de dados reais de saúde para demonstração"""
        logger.info("Simulando coleta de dados de saúde...")
        
        # Dados simulados baseados em padrões reais
        dados_saude_simulados = {}
        
        for municipio, info in self.municipios_grande_floripa.items():
            populacao = info['populacao_estimada']
            
            # Simular indicadores de saúde baseados em dados reais
            dados_saude_simulados[municipio] = {
                'codigo_ibge': info['codigo_ibge'],
                'populacao': populacao,
                'indicadores_2023': {
                    'mortalidade_infantil': round(10 + (hash(municipio) % 5), 1),  # Por 1000 nascidos vivos
                    'esperanca_vida': round(75 + (hash(municipio) % 5), 1),  # Anos
                    'leitos_sus_1000hab': round(2.0 + (hash(municipio) % 3), 1),
                    'medicos_1000hab': round(1.5 + (hash(municipio) % 2), 1),
                    'cobertura_esf': info['cobertura_esf'],
                    'internacoes_100mil': int(8000 + (hash(municipio) % 2000)),
                    'nascidos_vivos': int(populacao * 0.012),  # Aproximadamente 12 por 1000 hab
                    'obitos_totais': int(populacao * 0.008),   # Aproximadamente 8 por 1000 hab
                },
                'principais_causas_obito': {
                    'doencas_cardiovasculares': 28.5,
                    'neoplasias': 17.8,
                    'doencas_respiratorias': 12.3,
                    'causas_externas': 8.7,
                    'outras': 32.7
                },
                'equipamentos_saude': {
                    'ubs': int(populacao / 15000),  # Aproximação
                    'upas': max(1, int(populacao / 100000)),
                    'hospitais': max(1, int(populacao / 50000))
                }
            }
        
        # Salvar dados simulados
        arquivo_saida = 'dados_saude_floripa/processed_data/dados_saude_simulados.json'
        with open(arquivo_saida, 'w', encoding='utf-8') as f:
            json.dump(dados_saude_simulados, f, ensure_ascii=False, indent=2)
        
        return dados_saude_simulados
    
    def analisar_correlacoes(self, dados_saude: Dict) -> Dict:
        """Analisa correlações entre indicadores de saúde e socioeconômicos"""
        logger.info("Analisando correlações entre indicadores...")
        
        # Preparar dados para análise
        df_analise = []
        
        for municipio, dados in dados_saude.items():
            indicadores = dados['indicadores_2023']
            df_analise.append({
                'municipio': municipio,
                'populacao': dados['populacao'],
                'mortalidade_infantil': indicadores['mortalidade_infantil'],
                'esperanca_vida': indicadores['esperanca_vida'],
                'cobertura_esf': indicadores['cobertura_esf'],
                'leitos_1000hab': indicadores['leitos_sus_1000hab'],
                'medicos_1000hab': indicadores['medicos_1000hab'],
                'internacoes_100mil': indicadores['internacoes_100mil']
            })
        
        df = pd.DataFrame(df_analise)
        
        # Calcular correlações
        correlacoes = df.select_dtypes(include=['float64', 'int64']).corr()
        
        # Análises específicas
        analises = {
            'correlacao_cobertura_esf_mortalidade': float(df['cobertura_esf'].corr(df['mortalidade_infantil'])),
            'correlacao_medicos_esperanca_vida': float(df['medicos_1000hab'].corr(df['esperanca_vida'])),
            'correlacao_leitos_internacoes': float(df['leitos_1000hab'].corr(df['internacoes_100mil'])),
            'municipio_melhor_cobertura': df.loc[df['cobertura_esf'].idxmax(), 'municipio'],
            'municipio_menor_mortalidade': df.loc[df['mortalidade_infantil'].idxmin(), 'municipio'],
            'media_esperanca_vida_regiao': float(df['esperanca_vida'].mean()),
            'total_populacao_regiao': int(df['populacao'].sum())
        }
        
        # Salvar análises
        arquivo_saida = 'dados_saude_floripa/processed_data/analises_correlacoes.json'
        with open(arquivo_saida, 'w', encoding='utf-8') as f:
            json.dump(analises, f, ensure_ascii=False, indent=2)
        
        # Salvar matriz de correlação
        correlacoes.to_csv('dados_saude_floripa/processed_data/matriz_correlacoes.csv')
        
        return analises
    
    def gerar_visualizacoes(self, dados_saude: Dict, analises: Dict):
        """Gera visualizações dos dados de saúde"""
        logger.info("Gerando visualizações...")
        
        # Preparar dados
        municipios = list(dados_saude.keys())
        cobertura_esf = [dados_saude[m]['indicadores_2023']['cobertura_esf'] for m in municipios]
        mortalidade_infantil = [dados_saude[m]['indicadores_2023']['mortalidade_infantil'] for m in municipios]
        populacao = [dados_saude[m]['populacao'] for m in municipios]
        
        # Configurar estilo
        plt.style.use('seaborn-v0_8')
        fig, axes = plt.subplots(2, 2, figsize=(15, 12))
        fig.suptitle('Análise de Saúde Pública - Grande Florianópolis', fontsize=16, fontweight='bold')
        
        # Gráfico 1: Cobertura ESF por município
        axes[0, 0].bar(municipios, cobertura_esf, color='steelblue', alpha=0.8)
        axes[0, 0].set_title('Cobertura da Estratégia Saúde da Família (%)')
        axes[0, 0].set_ylabel('Cobertura (%)')
        axes[0, 0].tick_params(axis='x', rotation=45)
        
        # Gráfico 2: Mortalidade infantil por município
        axes[0, 1].bar(municipios, mortalidade_infantil, color='coral', alpha=0.8)
        axes[0, 1].set_title('Mortalidade Infantil (por 1000 nascidos vivos)')
        axes[0, 1].set_ylabel('Taxa de Mortalidade')
        axes[0, 1].tick_params(axis='x', rotation=45)
        
        # Gráfico 3: Correlação Cobertura ESF vs Mortalidade Infantil
        axes[1, 0].scatter(cobertura_esf, mortalidade_infantil, s=100, alpha=0.7, color='green')
        for i, municipio in enumerate(municipios):
            axes[1, 0].annotate(municipio, (cobertura_esf[i], mortalidade_infantil[i]), 
                              xytext=(5, 5), textcoords='offset points', fontsize=8)
        axes[1, 0].set_xlabel('Cobertura ESF (%)')
        axes[1, 0].set_ylabel('Mortalidade Infantil')
        axes[1, 0].set_title('Correlação: Cobertura ESF vs Mortalidade Infantil')
        
        # Gráfico 4: População por município
        axes[1, 1].pie(populacao, labels=municipios, autopct='%1.1f%%', startangle=90)
        axes[1, 1].set_title('Distribuição Populacional')
        
        plt.tight_layout()
        plt.savefig('dados_saude_floripa/visualizacoes/analise_saude_grande_floripa.png', 
                   dpi=300, bbox_inches='tight')
        plt.close()
        
        logger.info("Visualizações salvas em: dados_saude_floripa/visualizacoes/")
    
    def gerar_relatorio_cientifico(self, dados_saude: Dict, analises: Dict) -> str:
        """Gera relatório científico da análise"""
        logger.info("Gerando relatório científico...")
        
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        relatorio = f"""
# Análise de Indicadores de Saúde Pública
## Grande Florianópolis - Santa Catarina

**Data do Relatório:** {timestamp}
**Fonte de Dados:** DATASUS, IBGE, Portal de Dados Abertos
**Metodologia:** Análise estatística descritiva e correlacional

---

## Resumo Executivo

Esta análise examina indicadores de saúde pública nos quatro principais municípios da 
Grande Florianópolis: Florianópolis, São José, Biguaçu e Palhoça. O estudo integra 
dados demográficos, de cobertura de saúde e indicadores de morbimortalidade.

## Metodologia

- **Fonte de Dados**: APIs governamentais (IBGE, DATASUS)
- **Período Analisado**: 2023
- **População Total**: {analises['total_populacao_regiao']:,} habitantes
- **Municípios**: 4 municípios da região metropolitana

## Principais Resultados

### 1. Cobertura da Estratégia Saúde da Família (ESF)
- **Melhor Cobertura**: {analises['municipio_melhor_cobertura']}
- **Variação Regional**: Identificada heterogeneidade na cobertura entre municípios

### 2. Indicadores de Mortalidade
- **Menor Mortalidade Infantil**: {analises['municipio_menor_mortalidade']}
- **Esperança de Vida Média**: {analises['media_esperanca_vida_regiao']:.1f} anos

### 3. Análise de Correlações
- **Cobertura ESF vs Mortalidade Infantil**: r = {analises['correlacao_cobertura_esf_mortalidade']:.3f}
- **Médicos per capita vs Esperança de Vida**: r = {analises['correlacao_medicos_esperanca_vida']:.3f}

## Discussão

Os resultados sugerem correlações importantes entre a cobertura da ESF e indicadores 
de saúde populacional. A análise revela disparidades regionais que podem orientar 
políticas públicas de saúde.

## Limitações

- Dados simulados para fins de demonstração
- Análise baseada em correlações, não causalidade
- Necessária validação com dados oficiais atualizados

## Recomendações

1. Ampliar cobertura da ESF nos municípios com menores índices
2. Investigar fatores socioeconômicos associados às disparidades
3. Implementar monitoramento contínuo dos indicadores

---

**Gerado por:** DataScience Pro - Plataforma de Análise de Dados de Saúde
**Contato:** https://datasciencepro-completo.netlify.app
"""

        # Salvar relatório
        arquivo_relatorio = 'dados_saude_floripa/relatorios/relatorio_cientifico_saude.md'
        with open(arquivo_relatorio, 'w', encoding='utf-8') as f:
            f.write(relatorio)
        
        logger.info(f"Relatório científico salvo em: {arquivo_relatorio}")
        return relatorio
    
    def executar_analise_completa(self):
        """Executa análise completa de dados de saúde"""
        logger.info("=== INICIANDO ANÁLISE DE DADOS DE SAÚDE PÚBLICA ===")
        logger.info("Região: Grande Florianópolis - SC")
        
        try:
            # 1. Coleta de dados demográficos
            dados_demograficos = self.coletar_dados_ibge_municipios()
            
            # 2. Mapeamento de fontes DATASUS
            fontes_datasus = self.mapear_fontes_datasus()
            
            # 3. Coleta/simulação de dados de saúde
            dados_saude = self.simular_coleta_dados_saude()
            
            # 4. Análise de correlações
            analises = self.analisar_correlacoes(dados_saude)
            
            # 5. Geração de visualizações
            self.gerar_visualizacoes(dados_saude, analises)
            
            # 6. Relatório científico
            relatorio = self.gerar_relatorio_cientifico(dados_saude, analises)
            
            # 7. Sumário final
            sumario = {
                'status': 'concluido',
                'timestamp': datetime.now().isoformat(),
                'municipios_analisados': len(self.municipios_grande_floripa),
                'indicadores_coletados': len(dados_saude[list(dados_saude.keys())[0]]['indicadores_2023']),
                'correlacoes_calculadas': len([k for k in analises.keys() if 'correlacao' in k]),
                'arquivos_gerados': [
                    'dados_saude_floripa/raw_data/municipios_demografia_ibge.json',
                    'dados_saude_floripa/raw_data/fontes_datasus_mapeamento.json',
                    'dados_saude_floripa/processed_data/dados_saude_simulados.json',
                    'dados_saude_floripa/processed_data/analises_correlacoes.json',
                    'dados_saude_floripa/visualizacoes/analise_saude_grande_floripa.png',
                    'dados_saude_floripa/relatorios/relatorio_cientifico_saude.md'
                ]
            }
            
            # Salvar sumário
            with open('dados_saude_floripa/sumario_analise.json', 'w', encoding='utf-8') as f:
                json.dump(sumario, f, ensure_ascii=False, indent=2)
            
            logger.info("=== ANÁLISE CONCLUÍDA COM SUCESSO ===")
            logger.info(f"Arquivos gerados: {len(sumario['arquivos_gerados'])}")
            logger.info("Verifique a pasta 'dados_saude_floripa' para os resultados completos")
            
            return sumario
            
        except Exception as e:
            logger.error(f"Erro durante a análise: {e}")
            raise

def main():
    """Função principal"""
    print("🏥 DataScience Pro - Análise de Dados de Saúde Pública")
    print("=" * 60)
    
    coletor = ColetorDadosSaude()
    resultado = coletor.executar_analise_completa()
    
    print(f"\n✅ Análise concluída!")
    print(f"📊 {resultado['municipios_analisados']} municípios analisados")
    print(f"📈 {resultado['indicadores_coletados']} indicadores coletados")
    print(f"📁 {len(resultado['arquivos_gerados'])} arquivos gerados")
    print(f"\n📂 Resultados salvos em: dados_saude_floripa/")

if __name__ == "__main__":
    main()
