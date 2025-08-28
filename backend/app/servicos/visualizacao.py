"""
Serviço de Geração de Visualizações
"""

import pandas as pd
import numpy as np
import plotly.graph_objects as go
import plotly.express as px
from plotly.subplots import make_subplots
import plotly.figure_factory as ff
import json
from typing import Dict, List, Any

class GeradorVisualizacao:
    """
    Classe para gerar visualizações interativas usando Plotly
    """
    
    def __init__(self):
        self.theme = "plotly_white"
        self.color_palette = px.colors.qualitative.Set3
    
    def graficos_descritivos(self, df: pd.DataFrame) -> Dict[str, Any]:
        """
        Gera gráficos descritivos para o dataset
        """
        graficos = {
            "histogramas": self._gerar_histogramas(df),
            "boxplots": self._gerar_boxplots(df),
            "distribuicao_categoricas": self._gerar_barras_categoricas(df),
            "matriz_correlacao": self._gerar_matriz_correlacao(df),
            "resumo_valores_ausentes": self._grafico_valores_ausentes(df)
        }
        
        return graficos
    
    def _gerar_histogramas(self, df: pd.DataFrame) -> Dict[str, str]:
        """Gera histogramas para variáveis numéricas"""
        df_numeric = df.select_dtypes(include=[np.number])
        histogramas = {}
        
        for coluna in df_numeric.columns:
            fig = px.histogram(
                df_numeric, 
                x=coluna,
                title=f"Distribuição de {coluna}",
                template=self.theme,
                marginal="box"  # Adiciona boxplot marginal
            )
            
            # Adicionar linha da média
            media = df_numeric[coluna].mean()
            fig.add_vline(
                x=media, 
                line_dash="dash", 
                line_color="red",
                annotation_text=f"Média: {media:.2f}"
            )
            
            fig.update_layout(
                showlegend=False,
                height=400
            )
            
            histogramas[coluna] = fig.to_json()
        
        return histogramas
    
    def _gerar_boxplots(self, df: pd.DataFrame) -> Dict[str, str]:
        """Gera boxplots para variáveis numéricas"""
        df_numeric = df.select_dtypes(include=[np.number])
        
        if len(df_numeric.columns) == 0:
            return {}
        
        # Boxplot combinado para todas as variáveis (normalizadas)
        df_normalized = (df_numeric - df_numeric.mean()) / df_numeric.std()
        
        fig = go.Figure()
        
        for i, coluna in enumerate(df_normalized.columns):
            fig.add_trace(go.Box(
                y=df_normalized[coluna],
                name=coluna,
                boxpoints='outliers',
                marker_color=self.color_palette[i % len(self.color_palette)]
            ))
        
        fig.update_layout(
            title="Boxplots Comparativos (Dados Normalizados)",
            yaxis_title="Valores Normalizados",
            template=self.theme,
            height=500
        )
        
        return {"boxplots_combinados": fig.to_json()}
    
    def _gerar_barras_categoricas(self, df: pd.DataFrame) -> Dict[str, str]:
        """Gera gráficos de barras para variáveis categóricas"""
        df_categorical = df.select_dtypes(include=['object'])
        graficos_barras = {}
        
        for coluna in df_categorical.columns:
            # Contar frequências
            freq = df_categorical[coluna].value_counts().head(20)  # Top 20
            
            fig = px.bar(
                x=freq.index,
                y=freq.values,
                title=f"Distribuição de {coluna}",
                template=self.theme,
                color=freq.values,
                color_continuous_scale="viridis"
            )
            
            fig.update_layout(
                xaxis_title=coluna,
                yaxis_title="Frequência",
                showlegend=False,
                height=400
            )
            
            # Rotacionar labels se necessário
            if len(max(freq.index.astype(str), key=len)) > 10:
                fig.update_xaxes(tickangle=45)
            
            graficos_barras[coluna] = fig.to_json()
        
        return graficos_barras
    
    def _gerar_matriz_correlacao(self, df: pd.DataFrame) -> str:
        """Gera heatmap da matriz de correlação"""
        df_numeric = df.select_dtypes(include=[np.number])
        
        if len(df_numeric.columns) < 2:
            return ""
        
        correlation_matrix = df_numeric.corr()
        
        fig = px.imshow(
            correlation_matrix,
            text_auto=True,
            aspect="auto",
            title="Matriz de Correlação",
            template=self.theme,
            color_continuous_scale="RdBu_r",
            zmin=-1,
            zmax=1
        )
        
        fig.update_layout(height=600)
        
        return fig.to_json()
    
    def _grafico_valores_ausentes(self, df: pd.DataFrame) -> str:
        """Gera gráfico de valores ausentes"""
        valores_ausentes = df.isnull().sum()
        valores_ausentes = valores_ausentes[valores_ausentes > 0].sort_values(ascending=True)
        
        if len(valores_ausentes) == 0:
            # Criar gráfico vazio se não há valores ausentes
            fig = go.Figure()
            fig.add_annotation(
                text="Nenhum valor ausente encontrado!",
                xref="paper", yref="paper",
                x=0.5, y=0.5,
                showarrow=False,
                font=dict(size=20)
            )
            fig.update_layout(
                title="Análise de Valores Ausentes",
                template=self.theme,
                height=300
            )
            return fig.to_json()
        
        porcentagem = (valores_ausentes / len(df)) * 100
        
        fig = go.Figure(data=[
            go.Bar(
                x=valores_ausentes.values,
                y=valores_ausentes.index,
                orientation='h',
                text=[f"{v} ({p:.1f}%)" for v, p in zip(valores_ausentes.values, porcentagem.values)],
                textposition='auto',
                marker_color='coral'
            )
        ])
        
        fig.update_layout(
            title="Valores Ausentes por Coluna",
            xaxis_title="Número de Valores Ausentes",
            yaxis_title="Colunas",
            template=self.theme,
            height=max(300, len(valores_ausentes) * 30)
        )
        
        return fig.to_json()
    
    def heatmap_correlacao(self, matriz_correlacao: pd.DataFrame) -> Dict[str, str]:
        """Gera heatmap específico para matriz de correlação"""
        fig = px.imshow(
            matriz_correlacao,
            text_auto=True,
            aspect="auto",
            title="Matriz de Correlação",
            template=self.theme,
            color_continuous_scale="RdBu_r",
            zmin=-1,
            zmax=1
        )
        
        fig.update_layout(
            height=600,
            width=800
        )
        
        return {"heatmap_correlacao": fig.to_json()}
    
    def grafico_clustering(self, df: pd.DataFrame, labels: List[int], algoritmo: str) -> Dict[str, str]:
        """Gera visualizações para resultados de clustering"""
        df_numeric = df.select_dtypes(include=[np.number])
        
        if len(df_numeric.columns) < 2:
            return {}
        
        graficos = {}
        
        # Scatter plot 2D (primeiras duas variáveis)
        if len(df_numeric.columns) >= 2:
            fig = px.scatter(
                x=df_numeric.iloc[:, 0],
                y=df_numeric.iloc[:, 1],
                color=[str(label) for label in labels],
                title=f"Clustering - {algoritmo}",
                labels={
                    'x': df_numeric.columns[0],
                    'y': df_numeric.columns[1],
                    'color': 'Cluster'
                },
                template=self.theme
            )
            
            graficos["scatter_2d"] = fig.to_json()
        
        # Se temos 3+ variáveis, fazer PCA para visualização
        if len(df_numeric.columns) >= 3:
            from sklearn.decomposition import PCA
            from sklearn.preprocessing import StandardScaler
            
            scaler = StandardScaler()
            data_scaled = scaler.fit_transform(df_numeric)
            
            pca = PCA(n_components=2)
            data_pca = pca.fit_transform(data_scaled)
            
            fig = px.scatter(
                x=data_pca[:, 0],
                y=data_pca[:, 1],
                color=[str(label) for label in labels],
                title=f"Clustering - {algoritmo} (PCA)",
                labels={
                    'x': f'PC1 ({pca.explained_variance_ratio_[0]:.1%} var)',
                    'y': f'PC2 ({pca.explained_variance_ratio_[1]:.1%} var)',
                    'color': 'Cluster'
                },
                template=self.theme
            )
            
            graficos["scatter_pca"] = fig.to_json()
        
        return graficos
    
    def grafico_analise_fatorial(self, loadings: pd.DataFrame, variancia_explicada: Dict) -> Dict[str, str]:
        """Gera visualizações para análise fatorial"""
        graficos = {}
        
        # Gráfico de cargas fatoriais (Loading Plot)
        if len(loadings.columns) >= 2:
            fig = px.scatter(
                x=loadings.iloc[:, 0],
                y=loadings.iloc[:, 1],
                text=loadings.index,
                title="Cargas Fatoriais - Fatores 1 e 2",
                labels={
                    'x': loadings.columns[0],
                    'y': loadings.columns[1]
                },
                template=self.theme
            )
            
            # Adicionar linhas de referência
            fig.add_hline(y=0, line_dash="dash", line_color="gray")
            fig.add_vline(x=0, line_dash="dash", line_color="gray")
            
            # Adicionar círculo de correlação
            theta = np.linspace(0, 2*np.pi, 100)
            x_circle = np.cos(theta)
            y_circle = np.sin(theta)
            
            fig.add_trace(go.Scatter(
                x=x_circle, y=y_circle,
                mode='lines',
                line=dict(color='gray', dash='dash'),
                showlegend=False,
                name='Círculo de Correlação'
            ))
            
            fig.update_traces(textposition="middle right")
            fig.update_layout(height=600)
            
            graficos["loading_plot"] = fig.to_json()
        
        # Gráfico de variância explicada
        fatores = list(variancia_explicada.keys())
        variancias = list(variancia_explicada.values())
        
        fig = go.Figure(data=[
            go.Bar(x=fatores, y=variancias, name="Variância Explicada"),
            go.Scatter(
                x=fatores, 
                y=np.cumsum(variancias),
                mode='lines+markers',
                name="Variância Acumulada",
                yaxis='y2'
            )
        ])
        
        fig.update_layout(
            title="Variância Explicada por Fator",
            xaxis_title="Fatores",
            yaxis_title="Variância Explicada",
            yaxis2=dict(
                title="Variância Acumulada",
                overlaying='y',
                side='right'
            ),
            template=self.theme,
            height=400
        )
        
        graficos["variancia_explicada"] = fig.to_json()
        
        return graficos
    
    def dashboard_completo(self, df: pd.DataFrame, resultados_analise: Dict) -> str:
        """Gera dashboard completo com múltiplos gráficos"""
        
        # Criar subplots
        fig = make_subplots(
            rows=3, cols=2,
            subplot_titles=[
                "Resumo dos Dados",
                "Valores Ausentes",
                "Distribuição das Variáveis",
                "Correlações Principais",
                "Outliers Detectados",
                "Normalidade"
            ],
            specs=[
                [{"type": "table"}, {"type": "bar"}],
                [{"colspan": 2}, None],
                [{"type": "box"}, {"type": "bar"}]
            ]
        )
        
        # 1. Tabela resumo
        resumo = resultados_analise.get("resumo_geral", {})
        fig.add_trace(
            go.Table(
                header=dict(values=["Métrica", "Valor"]),
                cells=dict(values=[
                    list(resumo.keys()),
                    list(resumo.values())
                ])
            ),
            row=1, col=1
        )
        
        # 2. Valores ausentes
        valores_ausentes = df.isnull().sum()
        valores_ausentes = valores_ausentes[valores_ausentes > 0]
        
        if len(valores_ausentes) > 0:
            fig.add_trace(
                go.Bar(
                    x=valores_ausentes.index,
                    y=valores_ausentes.values,
                    name="Valores Ausentes"
                ),
                row=1, col=2
            )
        
        # 3. Heatmap de correlação (spanning)
        df_numeric = df.select_dtypes(include=[np.number])
        if len(df_numeric.columns) >= 2:
            corr_matrix = df_numeric.corr()
            fig.add_trace(
                go.Heatmap(
                    z=corr_matrix.values,
                    x=corr_matrix.columns,
                    y=corr_matrix.columns,
                    colorscale="RdBu_r",
                    zmid=0
                ),
                row=2, col=1
            )
        
        fig.update_layout(
            height=1200,
            title="Dashboard de Análise de Dados",
            template=self.theme
        )
        
        return fig.to_json()
    
    def grafico_series_temporais(self, df: pd.DataFrame, coluna_data: str, colunas_valores: List[str]) -> Dict[str, str]:
        """Gera gráficos para análise de séries temporais"""
        graficos = {}
        
        if coluna_data not in df.columns:
            return {"erro": f"Coluna de data '{coluna_data}' não encontrada"}
        
        # Converter coluna de data
        df_temp = df.copy()
        df_temp[coluna_data] = pd.to_datetime(df_temp[coluna_data])
        df_temp = df_temp.sort_values(coluna_data)
        
        # Gráfico de linha temporal
        fig = go.Figure()
        
        for i, coluna in enumerate(colunas_valores):
            if coluna in df_temp.columns:
                fig.add_trace(go.Scatter(
                    x=df_temp[coluna_data],
                    y=df_temp[coluna],
                    mode='lines+markers',
                    name=coluna,
                    line=dict(color=self.color_palette[i % len(self.color_palette)])
                ))
        
        fig.update_layout(
            title="Análise de Séries Temporais",
            xaxis_title="Data",
            yaxis_title="Valor",
            template=self.theme,
            height=500
        )
        
        graficos["series_temporal"] = fig.to_json()
        
        # Decomposição sazonal (se possível)
        if len(colunas_valores) == 1 and len(df_temp) > 24:
            try:
                from statsmodels.tsa.seasonal import seasonal_decompose
                
                coluna = colunas_valores[0]
                series = df_temp.set_index(coluna_data)[coluna].dropna()
                
                if len(series) > 24:
                    decomposicao = seasonal_decompose(series, model='additive', period=12)
                    
                    fig_decomp = make_subplots(
                        rows=4, cols=1,
                        subplot_titles=['Original', 'Tendência', 'Sazonalidade', 'Resíduo']
                    )
                    
                    fig_decomp.add_trace(
                        go.Scatter(x=series.index, y=series.values, name='Original'),
                        row=1, col=1
                    )
                    fig_decomp.add_trace(
                        go.Scatter(x=decomposicao.trend.index, y=decomposicao.trend.values, name='Tendência'),
                        row=2, col=1
                    )
                    fig_decomp.add_trace(
                        go.Scatter(x=decomposicao.seasonal.index, y=decomposicao.seasonal.values, name='Sazonalidade'),
                        row=3, col=1
                    )
                    fig_decomp.add_trace(
                        go.Scatter(x=decomposicao.resid.index, y=decomposicao.resid.values, name='Resíduo'),
                        row=4, col=1
                    )
                    
                    fig_decomp.update_layout(
                        height=800,
                        title="Decomposição da Série Temporal",
                        template=self.theme
                    )
                    
                    graficos["decomposicao"] = fig_decomp.to_json()
                    
            except ImportError:
                pass  # statsmodels não disponível
        
        return graficos
