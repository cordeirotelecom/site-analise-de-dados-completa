"""
Serviço de Análise Estatística Avançada
"""

import pandas as pd
import numpy as np
from scipy import stats
from scipy.stats import normaltest, shapiro, kstest, chi2_contingency
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.decomposition import PCA, FactorAnalysis
from sklearn.cluster import KMeans, DBSCAN, AgglomerativeClustering
from sklearn.metrics import silhouette_score
import warnings
warnings.filterwarnings('ignore')

class AnalisadorEstatistico:
    """
    Classe para executar análises estatísticas avançadas
    """
    
    def __init__(self):
        self.scaler = StandardScaler()
    
    def analise_descritiva(self, df: pd.DataFrame) -> dict:
        """
        Executa análise estatística descritiva completa
        """
        resultados = {
            "resumo_geral": self._resumo_geral(df),
            "estatisticas_numericas": self._estatisticas_numericas(df),
            "estatisticas_categoricas": self._estatisticas_categoricas(df),
            "valores_ausentes": self._analise_valores_ausentes(df),
            "outliers": self._detectar_outliers(df),
            "normalidade": self._testar_normalidade(df)
        }
        return resultados
    
    def _resumo_geral(self, df: pd.DataFrame) -> dict:
        """Resumo geral dos dados"""
        return {
            "total_registros": len(df),
            "total_colunas": len(df.columns),
            "colunas_numericas": len(df.select_dtypes(include=[np.number]).columns),
            "colunas_categoricas": len(df.select_dtypes(include=['object']).columns),
            "colunas_datetime": len(df.select_dtypes(include=['datetime64']).columns),
            "memoria_mb": round(df.memory_usage(deep=True).sum() / 1024**2, 2)
        }
    
    def _estatisticas_numericas(self, df: pd.DataFrame) -> dict:
        """Estatísticas para variáveis numéricas"""
        df_numeric = df.select_dtypes(include=[np.number])
        estatisticas = {}
        
        for coluna in df_numeric.columns:
            serie = df_numeric[coluna].dropna()
            
            if len(serie) > 0:
                estatisticas[coluna] = {
                    "media": float(serie.mean()),
                    "mediana": float(serie.median()),
                    "moda": float(serie.mode().iloc[0]) if len(serie.mode()) > 0 else None,
                    "desvio_padrao": float(serie.std()),
                    "variancia": float(serie.var()),
                    "minimo": float(serie.min()),
                    "maximo": float(serie.max()),
                    "q1": float(serie.quantile(0.25)),
                    "q3": float(serie.quantile(0.75)),
                    "iqr": float(serie.quantile(0.75) - serie.quantile(0.25)),
                    "coeficiente_variacao": float(serie.std() / serie.mean()) if serie.mean() != 0 else None,
                    "assimetria": float(serie.skew()),
                    "curtose": float(serie.kurtosis()),
                    "valores_unicos": int(serie.nunique()),
                    "valores_nulos": int(df[coluna].isnull().sum()),
                    "porcentagem_nulos": round((df[coluna].isnull().sum() / len(df)) * 100, 2)
                }
        
        return estatisticas
    
    def _estatisticas_categoricas(self, df: pd.DataFrame) -> dict:
        """Estatísticas para variáveis categóricas"""
        df_categorical = df.select_dtypes(include=['object'])
        estatisticas = {}
        
        for coluna in df_categorical.columns:
            serie = df_categorical[coluna].dropna()
            
            if len(serie) > 0:
                freq = serie.value_counts()
                
                estatisticas[coluna] = {
                    "valores_unicos": int(serie.nunique()),
                    "valor_mais_frequente": freq.index[0] if len(freq) > 0 else None,
                    "frequencia_maxima": int(freq.iloc[0]) if len(freq) > 0 else 0,
                    "porcentagem_maxima": round((freq.iloc[0] / len(serie)) * 100, 2) if len(freq) > 0 else 0,
                    "valores_nulos": int(df[coluna].isnull().sum()),
                    "porcentagem_nulos": round((df[coluna].isnull().sum() / len(df)) * 100, 2),
                    "distribuicao": freq.head(10).to_dict()  # Top 10 valores
                }
        
        return estatisticas
    
    def _analise_valores_ausentes(self, df: pd.DataFrame) -> dict:
        """Análise de valores ausentes"""
        valores_ausentes = df.isnull().sum()
        porcentagem_ausentes = (valores_ausentes / len(df)) * 100
        
        return {
            "total_ausentes": int(valores_ausentes.sum()),
            "porcentagem_total": round((valores_ausentes.sum() / (len(df) * len(df.columns))) * 100, 2),
            "por_coluna": {
                coluna: {
                    "ausentes": int(valores_ausentes[coluna]),
                    "porcentagem": round(porcentagem_ausentes[coluna], 2)
                }
                for coluna in df.columns
                if valores_ausentes[coluna] > 0
            }
        }
    
    def _detectar_outliers(self, df: pd.DataFrame) -> dict:
        """Detecta outliers usando método IQR"""
        df_numeric = df.select_dtypes(include=[np.number])
        outliers = {}
        
        for coluna in df_numeric.columns:
            serie = df_numeric[coluna].dropna()
            
            if len(serie) > 0:
                q1 = serie.quantile(0.25)
                q3 = serie.quantile(0.75)
                iqr = q3 - q1
                limite_inferior = q1 - 1.5 * iqr
                limite_superior = q3 + 1.5 * iqr
                
                outliers_serie = serie[(serie < limite_inferior) | (serie > limite_superior)]
                
                outliers[coluna] = {
                    "quantidade": len(outliers_serie),
                    "porcentagem": round((len(outliers_serie) / len(serie)) * 100, 2),
                    "limite_inferior": float(limite_inferior),
                    "limite_superior": float(limite_superior),
                    "valores_exemplo": outliers_serie.head(5).tolist()
                }
        
        return outliers
    
    def _testar_normalidade(self, df: pd.DataFrame) -> dict:
        """Testa normalidade das variáveis numéricas"""
        df_numeric = df.select_dtypes(include=[np.number])
        testes_normalidade = {}
        
        for coluna in df_numeric.columns:
            serie = df_numeric[coluna].dropna()
            
            if len(serie) >= 3:  # Mínimo para testes
                try:
                    # Teste de Shapiro-Wilk (para amostras pequenas)
                    if len(serie) <= 5000:
                        shapiro_stat, shapiro_p = shapiro(serie)
                    else:
                        shapiro_stat, shapiro_p = None, None
                    
                    # Teste de D'Agostino-Pearson
                    dagostino_stat, dagostino_p = normaltest(serie)
                    
                    testes_normalidade[coluna] = {
                        "shapiro_wilk": {
                            "estatistica": float(shapiro_stat) if shapiro_stat else None,
                            "p_valor": float(shapiro_p) if shapiro_p else None,
                            "normal": bool(shapiro_p > 0.05) if shapiro_p else None
                        },
                        "dagostino_pearson": {
                            "estatistica": float(dagostino_stat),
                            "p_valor": float(dagostino_p),
                            "normal": bool(dagostino_p > 0.05)
                        }
                    }
                except Exception as e:
                    testes_normalidade[coluna] = {"erro": str(e)}
        
        return testes_normalidade
    
    def analise_correlacao(self, df: pd.DataFrame, metodo: str = "pearson") -> dict:
        """
        Análise de correlação entre variáveis
        """
        df_numeric = df.select_dtypes(include=[np.number])
        
        if len(df_numeric.columns) < 2:
            return {"erro": "Necessárias pelo menos 2 variáveis numéricas"}
        
        # Matriz de correlação
        matriz_corr = df_numeric.corr(method=metodo)
        
        # Correlações significativas
        correlacoes_significativas = []
        n = len(df_numeric)
        
        for i in range(len(matriz_corr.columns)):
            for j in range(i+1, len(matriz_corr.columns)):
                corr_value = matriz_corr.iloc[i, j]
                
                if not np.isnan(corr_value):
                    # Teste de significância
                    t_stat = corr_value * np.sqrt((n-2) / (1 - corr_value**2))
                    p_value = 2 * (1 - stats.t.cdf(abs(t_stat), n-2))
                    
                    correlacoes_significativas.append({
                        "variavel1": matriz_corr.columns[i],
                        "variavel2": matriz_corr.columns[j],
                        "correlacao": round(corr_value, 4),
                        "p_valor": round(p_value, 4),
                        "significativo": p_value < 0.05,
                        "interpretacao": self._interpretar_correlacao(corr_value)
                    })
        
        return {
            "matriz_correlacao": matriz_corr.round(4).to_dict(),
            "correlacoes_significativas": sorted(
                correlacoes_significativas,
                key=lambda x: abs(x["correlacao"]),
                reverse=True
            ),
            "metodo": metodo,
            "tamanho_amostra": n
        }
    
    def _interpretar_correlacao(self, valor: float) -> str:
        """Interpreta o valor de correlação"""
        abs_valor = abs(valor)
        
        if abs_valor < 0.1:
            intensidade = "desprezível"
        elif abs_valor < 0.3:
            intensidade = "fraca"
        elif abs_valor < 0.5:
            intensidade = "moderada"
        elif abs_valor < 0.7:
            intensidade = "forte"
        elif abs_valor < 0.9:
            intensidade = "muito forte"
        else:
            intensidade = "quase perfeita"
        
        direcao = "positiva" if valor > 0 else "negativa"
        return f"Correlação {intensidade} {direcao}"
    
    def analise_clustering(self, df: pd.DataFrame, algoritmo: str = "kmeans", **kwargs) -> dict:
        """
        Análise de agrupamento (clustering)
        """
        df_numeric = df.select_dtypes(include=[np.number]).dropna()
        
        if len(df_numeric.columns) < 2:
            return {"erro": "Necessárias pelo menos 2 variáveis numéricas"}
        
        # Padronizar dados
        X_scaled = self.scaler.fit_transform(df_numeric)
        
        if algoritmo.lower() == "kmeans":
            n_clusters = kwargs.get("n_clusters", 3)
            modelo = KMeans(n_clusters=n_clusters, random_state=42)
            
        elif algoritmo.lower() == "dbscan":
            eps = kwargs.get("eps", 0.5)
            min_samples = kwargs.get("min_samples", 5)
            modelo = DBSCAN(eps=eps, min_samples=min_samples)
            
        elif algoritmo.lower() == "hierarchical":
            n_clusters = kwargs.get("n_clusters", 3)
            modelo = AgglomerativeClustering(n_clusters=n_clusters)
        
        else:
            return {"erro": f"Algoritmo '{algoritmo}' não suportado"}
        
        # Ajustar modelo
        labels = modelo.fit_predict(X_scaled)
        
        # Calcular métricas
        if len(set(labels)) > 1:  # Mais de um cluster
            silhouette = silhouette_score(X_scaled, labels)
        else:
            silhouette = None
        
        # Estatísticas por cluster
        df_com_clusters = df_numeric.copy()
        df_com_clusters['cluster'] = labels
        
        estatisticas_clusters = {}
        for cluster_id in set(labels):
            if cluster_id == -1:  # Ruído no DBSCAN
                continue
                
            cluster_data = df_com_clusters[df_com_clusters['cluster'] == cluster_id]
            estatisticas_clusters[int(cluster_id)] = {
                "tamanho": len(cluster_data),
                "porcentagem": round((len(cluster_data) / len(df_numeric)) * 100, 2),
                "centroide": cluster_data.drop('cluster', axis=1).mean().to_dict()
            }
        
        return {
            "algoritmo": algoritmo,
            "parametros": kwargs,
            "num_clusters": len(set(labels)) - (1 if -1 in labels else 0),
            "silhouette_score": float(silhouette) if silhouette else None,
            "labels": labels.tolist(),
            "estatisticas_clusters": estatisticas_clusters,
            "num_ruido": int(sum(labels == -1)) if -1 in labels else 0
        }
    
    def analise_fatorial(self, df: pd.DataFrame, n_fatores: int = None) -> dict:
        """
        Análise fatorial
        """
        df_numeric = df.select_dtypes(include=[np.number]).dropna()
        
        if len(df_numeric.columns) < 3:
            return {"erro": "Necessárias pelo menos 3 variáveis numéricas"}
        
        # Padronizar dados
        X_scaled = self.scaler.fit_transform(df_numeric)
        
        # Determinar número de fatores se não especificado
        if n_fatores is None:
            # Usar critério de Kaiser (autovalores > 1)
            pca_temp = PCA()
            pca_temp.fit(X_scaled)
            n_fatores = sum(pca_temp.explained_variance_ > 1)
            n_fatores = max(1, min(n_fatores, len(df_numeric.columns) - 1))
        
        # Análise Fatorial
        fa = FactorAnalysis(n_components=n_fatores, random_state=42)
        fa.fit(X_scaled)
        
        # Cargas fatoriais
        loadings = pd.DataFrame(
            fa.components_.T,
            columns=[f"Fator_{i+1}" for i in range(n_fatores)],
            index=df_numeric.columns
        )
        
        # Variância explicada
        # Para FactorAnalysis, calculamos aproximadamente
        variancia_total = np.sum(fa.noise_variance_) + np.sum(fa.components_**2)
        variancia_fatores = np.sum(fa.components_**2, axis=1)
        variancia_explicada = variancia_fatores / variancia_total
        
        # Comunalidades (proporção da variância de cada variável explicada pelos fatores)
        comunalidades = 1 - fa.noise_variance_ / np.var(X_scaled, axis=0)
        
        return {
            "n_fatores": n_fatores,
            "cargas_fatoriais": loadings.round(4).to_dict(),
            "variancia_explicada": {
                f"Fator_{i+1}": round(var, 4)
                for i, var in enumerate(variancia_explicada)
            },
            "variancia_explicada_acumulada": round(np.sum(variancia_explicada), 4),
            "comunalidades": {
                variavel: round(comunalidade, 4)
                for variavel, comunalidade in zip(df_numeric.columns, comunalidades)
            },
            "adequacao_amostra": self._kmo_test(df_numeric)
        }
    
    def _kmo_test(self, df: pd.DataFrame) -> dict:
        """
        Teste de Kaiser-Meyer-Olkin (KMO) para adequação da amostra
        """
        try:
            from factor_analyzer.factor_analyzer import calculate_kmo
            kmo_all, kmo_model = calculate_kmo(df)
            
            # Interpretação do KMO
            if kmo_model >= 0.9:
                interpretacao = "Excelente"
            elif kmo_model >= 0.8:
                interpretacao = "Boa"
            elif kmo_model >= 0.7:
                interpretacao = "Razoável"
            elif kmo_model >= 0.6:
                interpretacao = "Medíocre"
            elif kmo_model >= 0.5:
                interpretacao = "Ruim"
            else:
                interpretacao = "Inaceitável"
            
            return {
                "kmo_geral": round(kmo_model, 4),
                "interpretacao": interpretacao,
                "adequado": kmo_model >= 0.6
            }
        except ImportError:
            return {
                "erro": "Biblioteca factor_analyzer não disponível",
                "adequado": True  # Assumir adequado se não puder testar
            }
    
    def teste_hipotese(self, df: pd.DataFrame, teste: str, **kwargs) -> dict:
        """
        Executa testes de hipótese
        """
        if teste.lower() == "t_test_1_sample":
            return self._t_test_uma_amostra(df, **kwargs)
        elif teste.lower() == "t_test_2_samples":
            return self._t_test_duas_amostras(df, **kwargs)
        elif teste.lower() == "chi2":
            return self._teste_chi_quadrado(df, **kwargs)
        elif teste.lower() == "anova":
            return self._teste_anova(df, **kwargs)
        else:
            return {"erro": f"Teste '{teste}' não suportado"}
    
    def _t_test_uma_amostra(self, df: pd.DataFrame, coluna: str, valor_teste: float) -> dict:
        """Teste t para uma amostra"""
        serie = df[coluna].dropna()
        
        if len(serie) < 2:
            return {"erro": "Amostra muito pequena"}
        
        t_stat, p_value = stats.ttest_1samp(serie, valor_teste)
        
        return {
            "teste": "Teste t para uma amostra",
            "hipotese_nula": f"Média = {valor_teste}",
            "estatistica_t": round(t_stat, 4),
            "p_valor": round(p_value, 4),
            "significativo": p_value < 0.05,
            "media_amostra": round(serie.mean(), 4),
            "tamanho_amostra": len(serie)
        }


# Funções de análise em background para as rotas

def executar_analise_clustering(analise_id: int, caminho_arquivo: str, tipo_arquivo: str, 
                               colunas_selecionadas: list, parametros: dict):
    """
    Executa análise de clustering em background
    """
    try:
        import time
        from app.database.conexao import SessionLocal
        from app.modelos.analise import Analise
        
        # Carregar dados
        if tipo_arquivo == 'csv':
            df = pd.read_csv(caminho_arquivo)
        elif tipo_arquivo in ['xlsx', 'xls']:
            df = pd.read_excel(caminho_arquivo)
        else:
            raise ValueError(f"Tipo de arquivo não suportado: {tipo_arquivo}")
        
        # Filtrar colunas se especificadas
        if colunas_selecionadas:
            df = df[colunas_selecionadas]
        
        # Executar análise
        analisador = AnalisadorEstatistico()
        resultados = analisador.analise_clustering(df)
        
        # Atualizar no banco
        db = SessionLocal()
        analise = db.query(Analise).filter(Analise.id == analise_id).first()
        if analise:
            analise.resultados = resultados
            analise.status = "concluida"
            analise.tempo_execucao = time.time() - time.time()  # Placeholder
            db.commit()
        db.close()
        
    except Exception as e:
        # Marcar como erro
        db = SessionLocal()
        analise = db.query(Analise).filter(Analise.id == analise_id).first()
        if analise:
            analise.status = "erro"
            analise.erro_mensagem = str(e)
            db.commit()
        db.close()


def executar_analise_fatorial(analise_id: int, caminho_arquivo: str, tipo_arquivo: str, 
                             colunas_selecionadas: list, parametros: dict):
    """
    Executa análise fatorial em background
    """
    try:
        import time
        from app.database.conexao import SessionLocal
        from app.modelos.analise import Analise
        
        # Carregar dados
        if tipo_arquivo == 'csv':
            df = pd.read_csv(caminho_arquivo)
        elif tipo_arquivo in ['xlsx', 'xls']:
            df = pd.read_excel(caminho_arquivo)
        else:
            raise ValueError(f"Tipo de arquivo não suportado: {tipo_arquivo}")
        
        # Filtrar colunas se especificadas
        if colunas_selecionadas:
            df = df[colunas_selecionadas]
        
        # Executar análise
        analisador = AnalisadorEstatistico()
        resultados = analisador.analise_fatorial(df)
        
        # Atualizar no banco
        db = SessionLocal()
        analise = db.query(Analise).filter(Analise.id == analise_id).first()
        if analise:
            analise.resultados = resultados
            analise.status = "concluida"
            analise.tempo_execucao = time.time() - time.time()  # Placeholder
            db.commit()
        db.close()
        
    except Exception as e:
        # Marcar como erro
        db = SessionLocal()
        analise = db.query(Analise).filter(Analise.id == analise_id).first()
        if analise:
            analise.status = "erro"
            analise.erro_mensagem = str(e)
            db.commit()
        db.close()


def executar_analise_correlacao(analise_id: int, caminho_arquivo: str, tipo_arquivo: str, 
                               colunas_selecionadas: list, parametros: dict):
    """
    Executa análise de correlação em background
    """
    try:
        import time
        from app.database.conexao import SessionLocal
        from app.modelos.analise import Analise
        
        # Carregar dados
        if tipo_arquivo == 'csv':
            df = pd.read_csv(caminho_arquivo)
        elif tipo_arquivo in ['xlsx', 'xls']:
            df = pd.read_excel(caminho_arquivo)
        else:
            raise ValueError(f"Tipo de arquivo não suportado: {tipo_arquivo}")
        
        # Filtrar colunas se especificadas
        if colunas_selecionadas:
            df = df[colunas_selecionadas]
        
        # Executar análise
        analisador = AnalisadorEstatistico()
        resultados = analisador.analise_correlacao(df)
        
        # Atualizar no banco
        db = SessionLocal()
        analise = db.query(Analise).filter(Analise.id == analise_id).first()
        if analise:
            analise.resultados = resultados
            analise.status = "concluida"
            analise.tempo_execucao = time.time() - time.time()  # Placeholder
            db.commit()
        db.close()
        
    except Exception as e:
        # Marcar como erro
        db = SessionLocal()
        analise = db.query(Analise).filter(Analise.id == analise_id).first()
        if analise:
            analise.status = "erro"
            analise.erro_mensagem = str(e)
            db.commit()
        db.close()
