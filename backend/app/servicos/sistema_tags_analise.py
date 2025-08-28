"""
Sistema Avançado de Tags para Análises
Permite seleção inteligente de tipos de análise e métodos estatísticos
"""

from enum import Enum
from typing import Dict, List, Optional, Any, Tuple
from dataclasses import dataclass
import pandas as pd
import numpy as np

class TipoAnalise(Enum):
    """Tipos principais de análise disponíveis"""
    DESCRITIVA = "descritiva"
    EXPLORATORIA = "exploratoria"
    PREDITIVA = "preditiva"
    PRESCRITIVA = "prescritiva"
    DIAGNOSTICA = "diagnostica"
    COMPARATIVA = "comparativa"
    CORRELACIONAL = "correlacional"
    CAUSAL = "causal"
    TEMPORAL = "temporal"
    ESPACIAL = "espacial"

class MetodoEstatistico(Enum):
    """Métodos estatísticos específicos"""
    # Estatística Descritiva
    ESTATISTICAS_BASICAS = "estatisticas_basicas"
    DISTRIBUICAO_FREQUENCIAS = "distribuicao_frequencias"
    MEDIDAS_POSICAO = "medidas_posicao"
    MEDIDAS_DISPERSAO = "medidas_dispersao"
    
    # Testes de Hipóteses
    TESTE_T = "teste_t"
    TESTE_CHI_QUADRADO = "teste_chi_quadrado"
    ANOVA = "anova"
    TESTE_NORMALIDADE = "teste_normalidade"
    TESTE_WILCOXON = "teste_wilcoxon"
    TESTE_MANN_WHITNEY = "teste_mann_whitney"
    TESTE_KRUSKAL_WALLIS = "teste_kruskal_wallis"
    
    # Correlação e Regressão
    CORRELACAO_PEARSON = "correlacao_pearson"
    CORRELACAO_SPEARMAN = "correlacao_spearman"
    REGRESSAO_LINEAR = "regressao_linear"
    REGRESSAO_MULTIPLA = "regressao_multipla"
    REGRESSAO_LOGISTICA = "regressao_logistica"
    REGRESSAO_POLINOMIAL = "regressao_polinomial"
    
    # Machine Learning
    CLUSTERING = "clustering"
    CLASSIFICACAO = "classificacao"
    REGRESSAO_ML = "regressao_ml"
    REDUCAO_DIMENSIONALIDADE = "reducao_dimensionalidade"
    DETECCAO_ANOMALIAS = "deteccao_anomalias"
    
    # Análise de Séries Temporais
    DECOMPOSICAO_TEMPORAL = "decomposicao_temporal"
    PREVISAO_ARIMA = "previsao_arima"
    SUAVIZACAO_EXPONENCIAL = "suavizacao_exponencial"
    SAZONALIDADE = "sazonalidade"
    
    # Análise Multivariada
    PCA = "pca"
    ANALISE_FATORIAL = "analise_fatorial"
    ANALISE_DISCRIMINANTE = "analise_discriminante"
    ANALISE_CORRESPONDENCIA = "analise_correspondencia"

class TipoVisualizacao(Enum):
    """Tipos de visualização disponíveis"""
    HISTOGRAMA = "histograma"
    BOXPLOT = "boxplot"
    SCATTERPLOT = "scatterplot"
    HEATMAP = "heatmap"
    BARPLOT = "barplot"
    LINEPLOT = "lineplot"
    VIOLINPLOT = "violinplot"
    PAIRPLOT = "pairplot"
    DENDROGRAMA = "dendrograma"
    MAPA_CALOR_CORRELACAO = "mapa_calor_correlacao"
    GRAFICO_RESIDUOS = "grafico_residuos"
    CURVA_ROC = "curva_roc"
    MATRIZ_CONFUSAO = "matriz_confusao"
    GRAFICO_IMPORTANCIA = "grafico_importancia"

class NivelExperiencia(Enum):
    """Nível de experiência do usuário"""
    INICIANTE = "iniciante"
    INTERMEDIARIO = "intermediario"
    AVANCADO = "avancado"
    ESPECIALISTA = "especialista"

@dataclass
class ConfiguracaoAnalise:
    """Configuração completa para uma análise"""
    id: str
    nome: str
    descricao: str
    tipo_analise: TipoAnalise
    metodos: List[MetodoEstatistico]
    visualizacoes: List[TipoVisualizacao]
    nivel_minimo: NivelExperiencia
    objetivo: str
    interpretacao: str
    limitacoes: List[str]
    pressupostos: List[str]
    tempo_estimado_min: int
    complexidade: int  # 1-10

class SistemaTagsAnalise:
    """
    Sistema inteligente de tags para seleção de análises
    """
    
    def __init__(self):
        self.configuracoes = self._inicializar_configuracoes()
        self.tags_personalizadas = {}
        
    def _inicializar_configuracoes(self) -> Dict[str, ConfiguracaoAnalise]:
        """Inicializa todas as configurações de análise disponíveis"""
        configs = {}
        
        # ====================== ANÁLISES BÁSICAS ======================
        configs["estatisticas_descritivas"] = ConfiguracaoAnalise(
            id="estatisticas_descritivas",
            nome="Estatísticas Descritivas Básicas",
            descricao="Análise descritiva completa com medidas de tendência central, dispersão e forma",
            tipo_analise=TipoAnalise.DESCRITIVA,
            metodos=[
                MetodoEstatistico.ESTATISTICAS_BASICAS,
                MetodoEstatistico.MEDIDAS_POSICAO,
                MetodoEstatistico.MEDIDAS_DISPERSAO,
                MetodoEstatistico.DISTRIBUICAO_FREQUENCIAS
            ],
            visualizacoes=[
                TipoVisualizacao.HISTOGRAMA,
                TipoVisualizacao.BOXPLOT,
                TipoVisualizacao.BARPLOT
            ],
            nivel_minimo=NivelExperiencia.INICIANTE,
            objetivo="Compreender as características básicas dos dados",
            interpretacao="Fornece uma visão geral da distribuição, centro e variabilidade dos dados",
            limitacoes=["Não fornece informações sobre relações entre variáveis"],
            pressupostos=["Dados quantitativos para medidas numéricas"],
            tempo_estimado_min=5,
            complexidade=2
        )
        
        configs["analise_exploratoria"] = ConfiguracaoAnalise(
            id="analise_exploratoria",
            nome="Análise Exploratória de Dados (EDA)",
            descricao="Exploração abrangente dos dados com correlações e padrões",
            tipo_analise=TipoAnalise.EXPLORATORIA,
            metodos=[
                MetodoEstatistico.ESTATISTICAS_BASICAS,
                MetodoEstatistico.CORRELACAO_PEARSON,
                MetodoEstatistico.TESTE_NORMALIDADE,
                MetodoEstatistico.DETECCAO_ANOMALIAS
            ],
            visualizacoes=[
                TipoVisualizacao.HISTOGRAMA,
                TipoVisualizacao.SCATTERPLOT,
                TipoVisualizacao.HEATMAP,
                TipoVisualizacao.PAIRPLOT,
                TipoVisualizacao.BOXPLOT
            ],
            nivel_minimo=NivelExperiencia.INICIANTE,
            objetivo="Descobrir padrões, tendências e anomalias nos dados",
            interpretacao="Revela estrutura dos dados e prepara para análises mais avançadas",
            limitacoes=["Não estabelece causalidade"],
            pressupostos=["Dados limpos e estruturados"],
            tempo_estimado_min=15,
            complexidade=3
        )
        
        # ====================== TESTES DE HIPÓTESES ======================
        configs["comparacao_grupos"] = ConfiguracaoAnalise(
            id="comparacao_grupos",
            nome="Comparação entre Grupos",
            descricao="Compara médias ou distribuições entre diferentes grupos",
            tipo_analise=TipoAnalise.COMPARATIVA,
            metodos=[
                MetodoEstatistico.TESTE_T,
                MetodoEstatistico.ANOVA,
                MetodoEstatistico.TESTE_MANN_WHITNEY,
                MetodoEstatistico.TESTE_KRUSKAL_WALLIS
            ],
            visualizacoes=[
                TipoVisualizacao.BOXPLOT,
                TipoVisualizacao.VIOLINPLOT,
                TipoVisualizacao.BARPLOT
            ],
            nivel_minimo=NivelExperiencia.INTERMEDIARIO,
            objetivo="Determinar se existem diferenças significativas entre grupos",
            interpretacao="Identifica se as diferenças observadas são estatisticamente significativas",
            limitacoes=["Requer amostras adequadas", "Pressupõe independência"],
            pressupostos=["Normalidade (para testes paramétricos)", "Independência das observações"],
            tempo_estimado_min=10,
            complexidade=4
        )
        
        # ====================== ANÁLISE DE CORRELAÇÃO ======================
        configs["analise_correlacao"] = ConfiguracaoAnalise(
            id="analise_correlacao",
            nome="Análise de Correlação",
            descricao="Investiga relações lineares e não-lineares entre variáveis",
            tipo_analise=TipoAnalise.CORRELACIONAL,
            metodos=[
                MetodoEstatistico.CORRELACAO_PEARSON,
                MetodoEstatistico.CORRELACAO_SPEARMAN
            ],
            visualizacoes=[
                TipoVisualizacao.SCATTERPLOT,
                TipoVisualizacao.MAPA_CALOR_CORRELACAO,
                TipoVisualizacao.PAIRPLOT
            ],
            nivel_minimo=NivelExperiencia.INTERMEDIARIO,
            objetivo="Identificar e quantificar relações entre variáveis",
            interpretacao="Mostra força e direção das associações lineares",
            limitacoes=["Correlação não implica causalidade", "Apenas relações lineares (Pearson)"],
            pressupostos=["Linearidade (Pearson)", "Normalidade bivariada"],
            tempo_estimado_min=8,
            complexidade=3
        )
        
        # ====================== REGRESSÃO ======================
        configs["regressao_linear"] = ConfiguracaoAnalise(
            id="regressao_linear",
            nome="Análise de Regressão Linear",
            descricao="Modela relação linear entre variável dependente e independentes",
            tipo_analise=TipoAnalise.PREDITIVA,
            metodos=[
                MetodoEstatistico.REGRESSAO_LINEAR,
                MetodoEstatistico.REGRESSAO_MULTIPLA
            ],
            visualizacoes=[
                TipoVisualizacao.SCATTERPLOT,
                TipoVisualizacao.GRAFICO_RESIDUOS,
                TipoVisualizacao.LINEPLOT
            ],
            nivel_minimo=NivelExperiencia.INTERMEDIARIO,
            objetivo="Predizer valores e entender relações causais",
            interpretacao="Quantifica o impacto de cada variável independente",
            limitacoes=["Assume linearidade", "Sensível a outliers"],
            pressupostos=["Linearidade", "Independência", "Homocedasticidade", "Normalidade dos resíduos"],
            tempo_estimado_min=20,
            complexidade=5
        )
        
        # ====================== MACHINE LEARNING ======================
        configs["clustering"] = ConfiguracaoAnalise(
            id="clustering",
            nome="Análise de Agrupamento",
            descricao="Identifica grupos naturais nos dados sem supervisão",
            tipo_analise=TipoAnalise.EXPLORATORIA,
            metodos=[
                MetodoEstatistico.CLUSTERING,
                MetodoEstatistico.PCA,
                MetodoEstatistico.REDUCAO_DIMENSIONALIDADE
            ],
            visualizacoes=[
                TipoVisualizacao.SCATTERPLOT,
                TipoVisualizacao.DENDROGRAMA,
                TipoVisualizacao.HEATMAP
            ],
            nivel_minimo=NivelExperiencia.AVANCADO,
            objetivo="Descobrir segmentos ou grupos homogêneos",
            interpretacao="Revela estrutura latente e padrões de agrupamento",
            limitacoes=["Número de clusters pode ser subjetivo", "Sensível à escala"],
            pressupostos=["Distância euclidiana apropriada", "Clusters esféricos (K-means)"],
            tempo_estimado_min=25,
            complexidade=6
        )
        
        configs["classificacao"] = ConfiguracaoAnalise(
            id="classificacao",
            nome="Modelo de Classificação",
            descricao="Prediz categorias baseado em características dos dados",
            tipo_analise=TipoAnalise.PREDITIVA,
            metodos=[
                MetodoEstatistico.CLASSIFICACAO,
                MetodoEstatistico.REGRESSAO_LOGISTICA
            ],
            visualizacoes=[
                TipoVisualizacao.MATRIZ_CONFUSAO,
                TipoVisualizacao.CURVA_ROC,
                TipoVisualizacao.GRAFICO_IMPORTANCIA
            ],
            nivel_minimo=NivelExperiencia.AVANCADO,
            objetivo="Predizer categorias de novas observações",
            interpretacao="Classifica observações em classes predefinidas",
            limitacoes=["Requer dados balanceados", "Pode sofrer overfitting"],
            pressupostos=["Representatividade da amostra", "Independência"],
            tempo_estimado_min=30,
            complexidade=7
        )
        
        # ====================== ANÁLISE TEMPORAL ======================
        configs["series_temporais"] = ConfiguracaoAnalise(
            id="series_temporais",
            nome="Análise de Séries Temporais",
            descricao="Analisa padrões temporais e faz previsões",
            tipo_analise=TipoAnalise.TEMPORAL,
            metodos=[
                MetodoEstatistico.DECOMPOSICAO_TEMPORAL,
                MetodoEstatistico.PREVISAO_ARIMA,
                MetodoEstatistico.SAZONALIDADE,
                MetodoEstatistico.SUAVIZACAO_EXPONENCIAL
            ],
            visualizacoes=[
                TipoVisualizacao.LINEPLOT,
                TipoVisualizacao.HISTOGRAMA
            ],
            nivel_minimo=NivelExperiencia.AVANCADO,
            objetivo="Identificar padrões temporais e prever valores futuros",
            interpretacao="Decompõe série em tendência, sazonalidade e ruído",
            limitacoes=["Requer dados sequenciais", "Sensível a mudanças estruturais"],
            pressupostos=["Estacionariedade", "Observações equidistantes no tempo"],
            tempo_estimado_min=35,
            complexidade=8
        )
        
        # ====================== ANÁLISE MULTIVARIADA ======================
        configs["analise_multivariada"] = ConfiguracaoAnalise(
            id="analise_multivariada",
            nome="Análise Multivariada Avançada",
            descricao="Técnicas para análise simultânea de múltiplas variáveis",
            tipo_analise=TipoAnalise.EXPLORATORIA,
            metodos=[
                MetodoEstatistico.PCA,
                MetodoEstatistico.ANALISE_FATORIAL,
                MetodoEstatistico.ANALISE_DISCRIMINANTE
            ],
            visualizacoes=[
                TipoVisualizacao.SCATTERPLOT,
                TipoVisualizacao.HEATMAP,
                TipoVisualizacao.GRAFICO_IMPORTANCIA
            ],
            nivel_minimo=NivelExperiencia.ESPECIALISTA,
            objetivo="Reduzir dimensionalidade e identificar fatores latentes",
            interpretacao="Simplifica estrutura de dados complexos",
            limitacoes=["Interpretação pode ser complexa", "Perda de informação"],
            pressupostos=["Linearidade", "Multicolinearidade controlada"],
            tempo_estimado_min=40,
            complexidade=9
        )
        
        return configs
    
    def recomendar_analises(self, 
                          df: pd.DataFrame, 
                          objetivo: str = None, 
                          nivel_usuario: NivelExperiencia = NivelExperiencia.INTERMEDIARIO,
                          tempo_disponivel: int = None) -> List[ConfiguracaoAnalise]:
        """
        Recomenda análises baseadas nos dados e perfil do usuário
        """
        recomendacoes = []
        
        # Analisa características dos dados
        n_rows, n_cols = df.shape
        numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
        categorical_cols = df.select_dtypes(include=['object', 'category']).columns.tolist()
        
        # Detecta se há coluna temporal
        temporal_cols = []
        for col in df.columns:
            if df[col].dtype == 'datetime64[ns]' or 'data' in col.lower() or 'time' in col.lower():
                temporal_cols.append(col)
        
        # Lógica de recomendação baseada em características
        for config in self.configuracoes.values():
            score = 0
            
            # Filtro por nível de experiência
            if config.nivel_minimo.value > nivel_usuario.value:
                continue
            
            # Filtro por tempo disponível
            if tempo_disponivel and config.tempo_estimado_min > tempo_disponivel:
                continue
            
            # Pontuação baseada em características dos dados
            if config.tipo_analise == TipoAnalise.DESCRITIVA:
                score += 10  # Sempre relevante
            
            if config.tipo_analise == TipoAnalise.EXPLORATORIA and n_cols > 3:
                score += 8
            
            if config.tipo_analise == TipoAnalise.TEMPORAL and temporal_cols:
                score += 15
            
            if config.tipo_analise == TipoAnalise.COMPARATIVA and categorical_cols:
                score += 7
            
            if config.tipo_analise == TipoAnalise.CORRELACIONAL and len(numeric_cols) > 1:
                score += 8
            
            if config.tipo_analise == TipoAnalise.PREDITIVA and len(numeric_cols) > 2:
                score += 6
            
            # Bonificação para análises adequadas ao tamanho dos dados
            if n_rows < 100 and config.complexidade <= 4:
                score += 3
            elif n_rows > 1000 and config.complexidade >= 6:
                score += 5
            
            # Ajuste baseado no objetivo declarado
            if objetivo:
                objetivo_lower = objetivo.lower()
                if any(palavra in objetivo_lower for palavra in ['prever', 'predizer', 'forecast']):
                    if config.tipo_analise == TipoAnalise.PREDITIVA:
                        score += 10
                
                if any(palavra in objetivo_lower for palavra in ['comparar', 'diferença', 'grupo']):
                    if config.tipo_analise == TipoAnalise.COMPARATIVA:
                        score += 10
                
                if any(palavra in objetivo_lower for palavra in ['correlação', 'relação', 'associação']):
                    if config.tipo_analise == TipoAnalise.CORRELACIONAL:
                        score += 10
            
            if score > 5:  # Threshold mínimo
                recomendacoes.append((config, score))
        
        # Ordena por score e retorna top recomendações
        recomendacoes.sort(key=lambda x: x[1], reverse=True)
        return [config for config, score in recomendacoes[:8]]
    
    def criar_tag_personalizada(self, 
                              nome: str,
                              descricao: str,
                              metodos: List[MetodoEstatistico],
                              visualizacoes: List[TipoVisualizacao]) -> str:
        """Cria uma tag de análise personalizada"""
        tag_id = f"custom_{nome.lower().replace(' ', '_')}"
        
        self.tags_personalizadas[tag_id] = ConfiguracaoAnalise(
            id=tag_id,
            nome=nome,
            descricao=descricao,
            tipo_analise=TipoAnalise.EXPLORATORIA,
            metodos=metodos,
            visualizacoes=visualizacoes,
            nivel_minimo=NivelExperiencia.INTERMEDIARIO,
            objetivo="Análise personalizada pelo usuário",
            interpretacao="Configuração customizada",
            limitacoes=["Definidas pelo usuário"],
            pressupostos=["Definidos pelo usuário"],
            tempo_estimado_min=20,
            complexidade=5
        )
        
        return tag_id
    
    def obter_configuracao(self, analise_id: str) -> Optional[ConfiguracaoAnalise]:
        """Obtém configuração de análise por ID"""
        return self.configuracoes.get(analise_id) or self.tags_personalizadas.get(analise_id)
    
    def listar_analises_por_categoria(self) -> Dict[TipoAnalise, List[ConfiguracaoAnalise]]:
        """Lista análises agrupadas por categoria"""
        categorias = {}
        
        for config in self.configuracoes.values():
            if config.tipo_analise not in categorias:
                categorias[config.tipo_analise] = []
            categorias[config.tipo_analise].append(config)
        
        return categorias
    
    def gerar_roadmap_analises(self, nivel_atual: NivelExperiencia) -> List[ConfiguracaoAnalise]:
        """Gera um roadmap de aprendizado baseado no nível atual"""
        roadmap = []
        
        # Ordena análises por complexidade
        todas_analises = sorted(self.configuracoes.values(), key=lambda x: x.complexidade)
        
        for config in todas_analises:
            # Inclui análises do nível atual e um pouco acima
            if (config.nivel_minimo.value <= nivel_atual.value + 1 and 
                config.complexidade <= nivel_atual.value * 2 + 3):
                roadmap.append(config)
        
        return roadmap[:10]  # Top 10 recomendações

# Factory function
def criar_sistema_tags():
    """Cria uma instância do sistema de tags"""
    return SistemaTagsAnalise()
