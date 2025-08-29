import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  ExpandMore,
  Analytics,
  TrendingUp,
  DataArray,
  CheckCircle,
  PlayArrow,
  Download,
  Science,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`advanced-tabpanel-${index}`}
      aria-labelledby={`advanced-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const AnaliseAvancada: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  // Metodologias Científicas Avançadas
  const metodologiasAvancadas = [
    {
      id: 'mineracao_dados',
      nome: 'Mineração de Dados Automatizada',
      categoria: 'Descoberta de Padrões',
      complexidade: 'Avançada',
      descricao: 'Descoberta automática de padrões e insights em grandes conjuntos de dados',
      etapas: [
        'Coleta abrangente de dados (estratégia "pega tudo")',
        'Preparação e limpeza automática',
        'Criação de novas variáveis derivadas',
        'Discretização inteligente (tercis automáticos)',
        'Análise multivariada combinada'
      ],
      aplicacao: 'Análise exploratória, descoberta de padrões ocultos',
      exemplo: 'Descobrir fatores de risco para COVID-19 usando dados meteorológicos',
      codigo: `
# Pipeline Completo de Mineração de Dados
import pandas as pd
import numpy as np
from sklearn.preprocessing import KBinsDiscretizer
from sklearn.cluster import KMeans
from sklearn.decomposition import FactorAnalysis
from scipy.stats import pearsonr
import matplotlib.pyplot as plt
import seaborn as sns

class MineradorDados:
    def __init__(self, dados):
        self.dados = dados.copy()
        self.variaveis_criadas = []
        self.discretizadas = {}
        
    def preparar_dados(self):
        """Etapa 1: Preparação automática dos dados"""
        # Limpeza básica
        self.dados = self.dados.dropna(thresh=len(self.dados.columns)*0.7)
        
        # Detectar e tratar outliers automaticamente
        for col in self.dados.select_dtypes(include=[np.number]).columns:
            Q1 = self.dados[col].quantile(0.25)
            Q3 = self.dados[col].quantile(0.75)
            IQR = Q3 - Q1
            limite_inferior = Q1 - 1.5 * IQR
            limite_superior = Q3 + 1.5 * IQR
            
            # Substituir outliers por valores limites
            self.dados[col] = np.clip(self.dados[col], limite_inferior, limite_superior)
            
        print(f"Dados preparados: {self.dados.shape}")
        return self.dados
        
    def criar_variaveis_derivadas(self):
        """Etapa 2: Criação automática de variáveis derivadas"""
        numericas = self.dados.select_dtypes(include=[np.number]).columns
        
        for col in numericas:
            if 'umidade' in col.lower():
                # Criar variável complementar (secura)
                nova_col = f"secura_{col}"
                self.dados[nova_col] = 100 - self.dados[col]
                self.variaveis_criadas.append(nova_col)
                
            if 'temperatura' in col.lower():
                # Criar índice de calor
                nova_col = f"indice_calor_{col}"
                self.dados[nova_col] = self.dados[col] ** 2
                self.variaveis_criadas.append(nova_col)
                
            # Criar variáveis de lag (t-1, t-2) para análise temporal
            if len(self.dados) > 2:
                lag1_col = f"{col}_lag1"
                lag2_col = f"{col}_lag2"
                self.dados[lag1_col] = self.dados[col].shift(1)
                self.dados[lag2_col] = self.dados[col].shift(2)
                self.variaveis_criadas.extend([lag1_col, lag2_col])
                
        print(f"Criadas {len(self.variaveis_criadas)} novas variáveis")
        return self.variaveis_criadas
        
    def discretizar_automatico(self, variavel, n_classes=3):
        """Etapa 3: Discretização automática em tercis"""
        if variavel not in self.dados.columns:
            return None
            
        dados_var = self.dados[variavel].dropna()
        
        # Calcular tercis automaticamente
        tercil_1 = np.percentile(dados_var, 33.33)
        tercil_2 = np.percentile(dados_var, 66.67)
        
        # Arredondar para números "apresentáveis"
        tercil_1_round = round(tercil_1, 0) if tercil_1 > 10 else round(tercil_1, 1)
        tercil_2_round = round(tercil_2, 0) if tercil_2 > 10 else round(tercil_2, 1)
        
        # Criar variável categórica
        nova_col = f"{variavel}_categorica"
        condicoes = [
            self.dados[variavel] <= tercil_1_round,
            (self.dados[variavel] > tercil_1_round) & (self.dados[variavel] <= tercil_2_round),
            self.dados[variavel] > tercil_2_round
        ]
        escolhas = [
            f"{variavel} < {tercil_1_round}",
            f"{tercil_1_round} < {variavel} < {tercil_2_round}",
            f"{variavel} > {tercil_2_round}"
        ]
        
        self.dados[nova_col] = np.select(condicoes, escolhas, default=np.nan)
        self.discretizadas[variavel] = nova_col
        
        # Verificar distribuição das classes
        distribuicao = self.dados[nova_col].value_counts(normalize=True) * 100
        print(f"Distribuição da variável {nova_col}:")
        for categoria, percentual in distribuicao.items():
            print(f"  {categoria}: {percentual:.1f}%")
            
        return nova_col
        
    def analise_correlacao_automatica(self):
        """Etapa 4: Análise de correlação automática"""
        numericas = self.dados.select_dtypes(include=[np.number]).columns
        matriz_corr = self.dados[numericas].corr()
        
        # Encontrar correlações fortes (|r| > 0.7)
        correlacoes_fortes = []
        for i in range(len(matriz_corr.columns)):
            for j in range(i+1, len(matriz_corr.columns)):
                corr = matriz_corr.iloc[i, j]
                if abs(corr) > 0.7:
                    correlacoes_fortes.append({
                        'var1': matriz_corr.columns[i],
                        'var2': matriz_corr.columns[j],
                        'correlacao': corr,
                        'interpretacao': self._interpretar_correlacao(corr)
                    })
                    
        return correlacoes_fortes, matriz_corr
        
    def analise_cluster_automatica(self, n_clusters=3):
        """Etapa 5: Análise de cluster automática"""
        numericas = self.dados.select_dtypes(include=[np.number]).columns
        dados_numericos = self.dados[numericas].fillna(self.dados[numericas].mean())
        
        # K-means automático
        kmeans = KMeans(n_clusters=n_clusters, random_state=42)
        clusters = kmeans.fit_predict(dados_numericos)
        
        self.dados['cluster'] = clusters
        
        # Caracterizar clusters
        caracteristicas = []
        for cluster_id in range(n_clusters):
            mask = self.dados['cluster'] == cluster_id
            stats = self.dados[mask][numericas].mean()
            caracteristicas.append({
                'cluster': cluster_id,
                'tamanho': mask.sum(),
                'percentual': (mask.sum() / len(self.dados)) * 100,
                'caracteristicas': stats.sort_values(ascending=False).head(3)
            })
            
        return caracteristicas
        
    def analise_fatorial_automatica(self, n_fatores=3):
        """Etapa 6: Análise fatorial automática"""
        numericas = self.dados.select_dtypes(include=[np.number]).columns
        dados_numericos = self.dados[numericas].fillna(self.dados[numericas].mean())
        
        # Análise fatorial
        fa = FactorAnalysis(n_components=n_fatores, random_state=42)
        fa.fit(dados_numericos)
        
        # Factor loadings
        loadings = pd.DataFrame(
            fa.components_.T,
            index=numericas,
            columns=[f'Fator_{i+1}' for i in range(n_fatores)]
        )
        
        # Identificar variáveis dominantes em cada fator
        fatores_interpretados = []
        for i, fator in enumerate(loadings.columns):
            vars_dominantes = loadings[fator].abs().sort_values(ascending=False).head(3)
            fatores_interpretados.append({
                'fator': fator,
                'variaveis_principais': vars_dominantes.index.tolist(),
                'loadings': vars_dominantes.values
            })
            
        return loadings, fatores_interpretados
        
    def _interpretar_correlacao(self, r):
        """Interpretar força da correlação"""
        abs_r = abs(r)
        if abs_r >= 0.9:
            forca = "muito forte"
        elif abs_r >= 0.7:
            forca = "forte"
        elif abs_r >= 0.5:
            forca = "moderada"
        elif abs_r >= 0.3:
            forca = "fraca"
        else:
            forca = "muito fraca"
            
        direcao = "positiva" if r > 0 else "negativa"
        return f"Correlação {forca} {direcao} (r = {r:.3f})"
        
    def executar_pipeline_completo(self):
        """Executar todo o pipeline de mineração"""
        print("=== PIPELINE DE MINERAÇÃO DE DADOS ===")
        
        # Etapa 1: Preparação
        print("\\n1. Preparando dados...")
        self.preparar_dados()
        
        # Etapa 2: Criação de variáveis
        print("\\n2. Criando variáveis derivadas...")
        self.criar_variaveis_derivadas()
        
        # Etapa 3: Discretização
        print("\\n3. Discretizando variáveis numéricas...")
        numericas = self.dados.select_dtypes(include=[np.number]).columns[:5]  # Primeiras 5
        for col in numericas:
            self.discretizar_automatico(col)
            
        # Etapa 4: Correlações
        print("\\n4. Analisando correlações...")
        correlacoes_fortes, matriz_corr = self.analise_correlacao_automatica()
        
        # Etapa 5: Clusters
        print("\\n5. Executando análise de cluster...")
        caracteristicas_clusters = self.analise_cluster_automatica()
        
        # Etapa 6: Análise fatorial
        print("\\n6. Executando análise fatorial...")
        loadings, fatores = self.analise_fatorial_automatica()
        
        print("\\n=== PIPELINE CONCLUÍDO ===")
        
        return {
            'dados_processados': self.dados,
            'variaveis_criadas': self.variaveis_criadas,
            'correlacoes_fortes': correlacoes_fortes,
            'clusters': caracteristicas_clusters,
            'fatores': fatores
        }

# Exemplo de uso:
# minerador = MineradorDados(seus_dados)
# resultados = minerador.executar_pipeline_completo()
      `
    },
    {
      id: 'analise_preditiva',
      nome: 'Análise Preditiva Automática',
      categoria: 'Predição',
      complexidade: 'Avançada',
      descricao: 'Criação automática de modelos preditivos com validação e interpretação',
      etapas: [
        'Criação de variáveis de output (target)',
        'Seleção automática de features',
        'Treinamento de múltiplos algoritmos',
        'Validação cruzada automática',
        'Interpretação dos resultados'
      ],
      aplicacao: 'Previsão de eventos, classificação, regressão',
      exemplo: 'Prever taxa de mortalidade no dia seguinte baseado em dados climáticos',
      codigo: `
# Sistema de Análise Preditiva Automática
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.svm import SVR, SVC
from sklearn.metrics import accuracy_score, r2_score, mean_squared_error
from sklearn.preprocessing import StandardScaler, LabelEncoder
import pandas as pd
import numpy as np

class AnalisePreditiva:
    def __init__(self, dados):
        self.dados = dados.copy()
        self.modelos_treinados = {}
        self.resultados = {}
        
    def criar_variavel_target_temporal(self, variavel_base, lag=1):
        """Criar variável target para previsão temporal"""
        target_col = f"{variavel_base}_T{lag}"
        
        # Criar target como valor futuro da variável
        self.dados[target_col] = self.dados[variavel_base].shift(-lag)
        
        # Remover linhas sem target (final da série)
        self.dados = self.dados.dropna(subset=[target_col])
        
        print(f"Variável target criada: {target_col}")
        print(f"Objetivo: Prever {variavel_base} {lag} período(s) à frente")
        
        return target_col
        
    def preparar_dados_preditivos(self, target_col, excluir_vars=None):
        """Preparar dados para modelagem preditiva"""
        if excluir_vars is None:
            excluir_vars = []
            
        # Separar features e target
        features_cols = [col for col in self.dados.columns 
                        if col != target_col and col not in excluir_vars]
        
        # Apenas variáveis numéricas para o modelo
        X = self.dados[features_cols].select_dtypes(include=[np.number])
        y = self.dados[target_col]
        
        # Remover linhas com valores faltantes
        dados_completos = pd.concat([X, y], axis=1).dropna()
        X = dados_completos[X.columns]
        y = dados_completos[target_col]
        
        # Dividir em treino e teste
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        # Padronizar features
        scaler = StandardScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        X_test_scaled = scaler.transform(X_test)
        
        return X_train, X_test, y_train, y_test, X_train_scaled, X_test_scaled, scaler
        
    def treinar_modelos_automaticos(self, X_train, X_test, y_train, y_test, 
                                   X_train_scaled, X_test_scaled, tipo='regressao'):
        """Treinar múltiplos modelos automaticamente"""
        resultados = {}
        
        if tipo == 'regressao':
            modelos = {
                'Random Forest': RandomForestRegressor(n_estimators=100, random_state=42),
                'Linear Regression': LinearRegression(),
                'SVR': SVR(kernel='rbf')
            }
            metrica_principal = 'R²'
            
        else:  # classificação
            modelos = {
                'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42),
                'Logistic Regression': LogisticRegression(random_state=42, max_iter=1000),
                'SVC': SVC(kernel='rbf', random_state=42)
            }
            metrica_principal = 'Acurácia'
            
        for nome, modelo in modelos.items():
            print(f"\\nTreinando {nome}...")
            
            # Usar dados escalados para SVM e Logistic, normais para Random Forest
            if nome in ['SVR', 'SVC', 'Logistic Regression']:
                modelo.fit(X_train_scaled, y_train)
                y_pred = modelo.predict(X_test_scaled)
                X_val = X_train_scaled
            else:
                modelo.fit(X_train, y_train)
                y_pred = modelo.predict(X_test)
                X_val = X_train
                
            # Calcular métricas
            if tipo == 'regressao':
                r2 = r2_score(y_test, y_pred)
                rmse = np.sqrt(mean_squared_error(y_test, y_pred))
                cv_scores = cross_val_score(modelo, X_val, y_train, cv=5, scoring='r2')
                
                resultados[nome] = {
                    'modelo': modelo,
                    'R²': r2,
                    'RMSE': rmse,
                    'CV_R²_medio': cv_scores.mean(),
                    'CV_R²_std': cv_scores.std(),
                    'predicoes': y_pred
                }
                
                print(f"  R² no teste: {r2:.3f}")
                print(f"  RMSE: {rmse:.3f}")
                print(f"  CV R² médio: {cv_scores.mean():.3f} ± {cv_scores.std():.3f}")
                
            else:  # classificação
                acc = accuracy_score(y_test, y_pred)
                cv_scores = cross_val_score(modelo, X_val, y_train, cv=5, scoring='accuracy')
                
                resultados[nome] = {
                    'modelo': modelo,
                    'Acurácia': acc,
                    'CV_Acurácia_media': cv_scores.mean(),
                    'CV_Acurácia_std': cv_scores.std(),
                    'predicoes': y_pred
                }
                
                print(f"  Acurácia no teste: {acc:.3f}")
                print(f"  CV Acurácia média: {cv_scores.mean():.3f} ± {cv_scores.std():.3f}")
                
        # Identificar melhor modelo
        if tipo == 'regressao':
            melhor_modelo = max(resultados.keys(), key=lambda x: resultados[x]['R²'])
            melhor_score = resultados[melhor_modelo]['R²']
        else:
            melhor_modelo = max(resultados.keys(), key=lambda x: resultados[x]['Acurácia'])
            melhor_score = resultados[melhor_modelo]['Acurácia']
            
        print(f"\\n🏆 Melhor modelo: {melhor_modelo} ({metrica_principal}: {melhor_score:.3f})")
        
        return resultados, melhor_modelo
        
    def interpretar_importancia_features(self, modelo, feature_names):
        """Interpretar importância das features"""
        if hasattr(modelo, 'feature_importances_'):
            importancias = modelo.feature_importances_
            
            # Criar DataFrame ordenado por importância
            df_importancias = pd.DataFrame({
                'Feature': feature_names,
                'Importância': importancias
            }).sort_values('Importância', ascending=False)
            
            print("\\n📊 Importância das Features:")
            for idx, row in df_importancias.head(10).iterrows():
                print(f"  {row['Feature']}: {row['Importância']:.3f}")
                
            return df_importancias
            
        elif hasattr(modelo, 'coef_'):
            coeficientes = np.abs(modelo.coef_)
            if len(coeficientes.shape) > 1:
                coeficientes = coeficientes[0]
                
            df_coef = pd.DataFrame({
                'Feature': feature_names,
                'Coeficiente_Abs': coeficientes
            }).sort_values('Coeficiente_Abs', ascending=False)
            
            print("\\n📊 Magnitude dos Coeficientes:")
            for idx, row in df_coef.head(10).iterrows():
                print(f"  {row['Feature']}: {row['Coeficiente_Abs']:.3f}")
                
            return df_coef
            
        return None
        
    def gerar_relatorio_preditivo(self, target_col, resultados, melhor_modelo):
        """Gerar relatório completo da análise preditiva"""
        print("\\n" + "="*60)
        print("📋 RELATÓRIO DE ANÁLISE PREDITIVA")
        print("="*60)
        
        print(f"\\n🎯 Variável Target: {target_col}")
        print(f"🏆 Melhor Modelo: {melhor_modelo}")
        
        print("\\n📈 Comparação de Modelos:")
        for nome, resultado in resultados.items():
            if 'R²' in resultado:
                print(f"  {nome:<20} R²: {resultado['R²']:.3f} (CV: {resultado['CV_R²_medio']:.3f}±{resultado['CV_R²_std']:.3f})")
            else:
                print(f"  {nome:<20} Acc: {resultado['Acurácia']:.3f} (CV: {resultado['CV_Acurácia_media']:.3f}±{resultado['CV_Acurácia_std']:.3f})")
                
        print("\\n💡 Interpretação dos Resultados:")
        melhor_resultado = resultados[melhor_modelo]
        
        if 'R²' in melhor_resultado:
            r2 = melhor_resultado['R²']
            if r2 > 0.8:
                interpretacao = "Excelente capacidade preditiva"
            elif r2 > 0.6:
                interpretacao = "Boa capacidade preditiva"
            elif r2 > 0.4:
                interpretacao = "Capacidade preditiva moderada"
            else:
                interpretacao = "Capacidade preditiva limitada"
                
            print(f"  R² = {r2:.3f}: {interpretacao}")
            print(f"  O modelo explica {r2*100:.1f}% da variação na variável target")
            
        else:
            acc = melhor_resultado['Acurácia']
            if acc > 0.9:
                interpretacao = "Excelente capacidade de classificação"
            elif acc > 0.8:
                interpretacao = "Boa capacidade de classificação"
            elif acc > 0.7:
                interpretacao = "Capacidade de classificação moderada"
            else:
                interpretacao = "Capacidade de classificação limitada"
                
            print(f"  Acurácia = {acc:.3f}: {interpretacao}")
            print(f"  O modelo classifica corretamente {acc*100:.1f}% dos casos")
            
        return {
            'target': target_col,
            'melhor_modelo': melhor_modelo,
            'resultados': resultados
        }
        
    def executar_analise_preditiva_completa(self, variavel_base, lag=1):
        """Executar análise preditiva completa"""
        print("=== ANÁLISE PREDITIVA AUTOMÁTICA ===")
        
        # Etapa 1: Criar variável target
        print("\\n1. Criando variável target...")
        target_col = self.criar_variavel_target_temporal(variavel_base, lag)
        
        # Etapa 2: Preparar dados
        print("\\n2. Preparando dados...")
        X_train, X_test, y_train, y_test, X_train_scaled, X_test_scaled, scaler = self.preparar_dados_preditivos(target_col)
        
        # Determinar tipo de problema
        n_unique = len(self.dados[target_col].unique())
        tipo = 'classificacao' if n_unique < 10 else 'regressao'
        print(f"Tipo de problema detectado: {tipo}")
        
        # Etapa 3: Treinar modelos
        print("\\n3. Treinando modelos...")
        resultados, melhor_modelo = self.treinar_modelos_automaticos(
            X_train, X_test, y_train, y_test, X_train_scaled, X_test_scaled, tipo
        )
        
        # Etapa 4: Interpretar importância
        print("\\n4. Analisando importância das features...")
        modelo_obj = resultados[melhor_modelo]['modelo']
        importancias = self.interpretar_importancia_features(modelo_obj, X_train.columns)
        
        # Etapa 5: Gerar relatório
        print("\\n5. Gerando relatório...")
        relatorio = self.gerar_relatorio_preditivo(target_col, resultados, melhor_modelo)
        
        return relatorio

# Exemplo de uso:
# analisador = AnalisePreditiva(seus_dados)
# relatorio = analisador.executar_analise_preditiva_completa('taxa_mortalidade', lag=1)
      `
    }
  ];

  // Técnicas de Análise Multivariada
  const tecnicasMultivariadas = [
    {
      nome: 'Análise de Cluster Hierárquico (Dendrograma)',
      objetivo: 'Identificar grupos naturais nos dados baseado em similaridade',
      quando_usar: 'Exploração inicial, identificar padrões de agrupamento',
      interpretacao: 'Altura dos ramos indica distância/similaridade entre grupos',
      codigo: `
# Análise de Cluster Hierárquico
from scipy.cluster.hierarchy import dendrogram, linkage
from scipy.spatial.distance import pdist
import matplotlib.pyplot as plt

# Calcular matriz de distâncias
distances = pdist(dados_numericos, metric='euclidean')

# Linkage usando método Ward (minimiza variância intra-cluster)
linkage_matrix = linkage(distances, method='ward')

# Plotar dendrograma
plt.figure(figsize=(12, 8))
dendro = dendrogram(linkage_matrix, labels=dados.index, leaf_rotation=90)
plt.title('Dendrograma - Análise de Cluster Hierárquico')
plt.xlabel('Amostras')
plt.ylabel('Distância Euclidiana')
plt.show()

# Interpretar número ideal de clusters
# Procurar por "joelhos" no dendrograma (saltos grandes na altura)
      `
    },
    {
      nome: 'K-Means Clustering',
      objetivo: 'Agrupar dados em K clusters pré-definidos',
      quando_usar: 'Após dendrograma, para confirmar agrupamentos',
      interpretacao: 'Centroides representam perfil médio de cada cluster',
      codigo: `
# K-Means Clustering
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

# Método do cotovelo para escolher K ideal
inercias = []
silhouette_scores = []
k_range = range(2, 11)

for k in k_range:
    kmeans = KMeans(n_clusters=k, random_state=42)
    kmeans.fit(dados_numericos)
    inercias.append(kmeans.inertia_)
    silhouette_scores.append(silhouette_score(dados_numericos, kmeans.labels_))

# Plotar métricas
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

ax1.plot(k_range, inercias, 'bo-')
ax1.set_xlabel('Número de Clusters (K)')
ax1.set_ylabel('Inércia')
ax1.set_title('Método do Cotovelo')

ax2.plot(k_range, silhouette_scores, 'ro-')
ax2.set_xlabel('Número de Clusters (K)')
ax2.set_ylabel('Score de Silhouette')
ax2.set_title('Score de Silhouette')

plt.tight_layout()
plt.show()

# K-Means final com K ideal
k_ideal = k_range[np.argmax(silhouette_scores)]
kmeans_final = KMeans(n_clusters=k_ideal, random_state=42)
clusters = kmeans_final.fit_predict(dados_numericos)

# Adicionar clusters aos dados
dados['cluster'] = clusters

# Caracterizar cada cluster
for i in range(k_ideal):
    print(f"\\nCluster {i}:")
    cluster_data = dados[dados['cluster'] == i]
    print(f"  Tamanho: {len(cluster_data)} ({len(cluster_data)/len(dados)*100:.1f}%)")
    print("  Características principais:")
    for col in dados_numericos.columns:
        media_cluster = cluster_data[col].mean()
        media_geral = dados[col].mean()
        if abs(media_cluster - media_geral) > dados[col].std() * 0.5:
            diferenca = "acima" if media_cluster > media_geral else "abaixo"
            print(f"    {col}: {diferenca} da média ({media_cluster:.2f} vs {media_geral:.2f})")
      `
    },
    {
      nome: 'Análise Fatorial',
      objetivo: 'Reduzir dimensionalidade identificando fatores latentes',
      quando_usar: 'Muitas variáveis correlacionadas, buscar estrutura subjacente',
      interpretacao: 'Factor loadings mostram correlação variável-fator',
      codigo: `
# Análise Fatorial
from sklearn.decomposition import FactorAnalysis
from factor_analyzer import FactorAnalyzer
import pandas as pd

# Verificar adequação dos dados para análise fatorial
from factor_analyzer.factor_analyzer import calculate_kmo, calculate_bartlett_sphericity

# Teste de Kaiser-Meyer-Olkin (KMO)
kmo_all, kmo_model = calculate_kmo(dados_numericos)
print(f"KMO: {kmo_model:.3f}")
if kmo_model > 0.6:
    print("✅ Dados adequados para análise fatorial (KMO > 0.6)")
else:
    print("❌ Dados não adequados para análise fatorial (KMO < 0.6)")

# Teste de esfericidade de Bartlett
chi_square_value, p_value = calculate_bartlett_sphericity(dados_numericos)
print(f"Teste de Bartlett: p-valor = {p_value:.3e}")
if p_value < 0.05:
    print("✅ Correlações significativas entre variáveis (p < 0.05)")

# Determinar número ideal de fatores
fa = FactorAnalyzer(rotation=None)
fa.fit(dados_numericos)
eigenvalues, _ = fa.get_eigenvalues()

# Critério de Kaiser (eigenvalues > 1)
n_fatores_kaiser = sum(eigenvalues > 1)
print(f"\\nNúmero de fatores pelo critério de Kaiser: {n_fatores_kaiser}")

# Plotar scree plot
plt.figure(figsize=(10, 6))
plt.plot(range(1, len(eigenvalues) + 1), eigenvalues, 'bo-')
plt.axhline(y=1, color='r', linestyle='--', label='Eigenvalue = 1')
plt.xlabel('Fator')
plt.ylabel('Eigenvalue')
plt.title('Scree Plot - Seleção do Número de Fatores')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()

# Análise fatorial final
n_fatores = min(n_fatores_kaiser, 5)  # Máximo 5 fatores para interpretabilidade
fa_final = FactorAnalyzer(n_factors=n_fatores, rotation='varimax')
fa_final.fit(dados_numericos)

# Factor loadings
loadings = pd.DataFrame(
    fa_final.loadings_,
    index=dados_numericos.columns,
    columns=[f'Fator_{i+1}' for i in range(n_fatores)]
)

print("\\n📊 Factor Loadings (rotação Varimax):")
print(loadings.round(3))

# Interpretar fatores
print("\\n💡 Interpretação dos Fatores:")
for i, fator in enumerate(loadings.columns):
    print(f"\\n{fator}:")
    # Variáveis com loading alto (|loading| > 0.6)
    vars_altas = loadings[loadings[fator].abs() > 0.6][fator]
    if len(vars_altas) > 0:
        print("  Variáveis principais:")
        for var, loading in vars_altas.sort_values(key=abs, ascending=False).items():
            sinal = "+" if loading > 0 else "-"
            print(f"    {sinal} {var}: {loading:.3f}")
    else:
        # Se nenhuma variável tem loading > 0.6, mostrar as 3 maiores
        top_vars = loadings[fator].abs().sort_values(ascending=False).head(3)
        print("  Variáveis com maiores loadings:")
        for var in top_vars.index:
            loading = loadings.loc[var, fator]
            sinal = "+" if loading > 0 else "-"
            print(f"    {sinal} {var}: {loading:.3f}")

# Calcular scores dos fatores
scores = fa_final.transform(dados_numericos)
scores_df = pd.DataFrame(
    scores,
    index=dados_numericos.index,
    columns=[f'Score_Fator_{i+1}' for i in range(n_fatores)]
)

# Adicionar scores aos dados originais
for col in scores_df.columns:
    dados[col] = scores_df[col]

print(f"\\n✅ Scores dos fatores adicionados aos dados como: {list(scores_df.columns)}")
      `
    }
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1f2937', mb: 2 }}>
          🔬 Metodologias Científicas Avançadas
        </Typography>
        <Typography variant="body1" sx={{ color: '#6b7280', mb: 3, maxWidth: 1000 }}>
          Sistema automatizado de mineração de dados e análise preditiva que supera o CBA e outras ferramentas.
          Implementação completa com explicação passo-a-passo de metodologias científicas avançadas.
        </Typography>
        
        <Alert severity="success" sx={{ mb: 3 }}>
          <strong>Superior ao CBA:</strong> Análise automática completa com interpretação científica,
          criação automática de variáveis derivadas, discretização inteligente e validação cruzada.
        </Alert>
      </Box>

      {/* Tabs Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
          <Tab label="Mineração Automática" icon={<DataArray />} />
          <Tab label="Análise Preditiva" icon={<TrendingUp />} />
          <Tab label="Técnicas Multivariadas" icon={<Analytics />} />
          <Tab label="Pipeline Completo" icon={<Science />} />
        </Tabs>
      </Box>

      {/* Tab 1: Mineração de Dados */}
      <TabPanel value={tabValue} index={0}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          🔍 Mineração de Dados Automatizada
        </Typography>
        
        <Grid container spacing={3}>
          {metodologiasAvancadas.filter(m => m.id === 'mineracao_dados').map((metodologia, index) => (
            <Grid item xs={12} key={index}>
              <Card sx={{ border: '1px solid #e5e7eb' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <DataArray sx={{ mr: 2, color: '#2563eb' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {metodologia.nome}
                    </Typography>
                    <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
                      <Chip label={metodologia.categoria} size="small" color="primary" />
                      <Chip label={metodologia.complexidade} size="small" variant="outlined" />
                    </Box>
                  </Box>
                  
                  <Typography variant="body2" sx={{ color: '#6b7280', mb: 3 }}>
                    {metodologia.descricao}
                  </Typography>

                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                    📋 Etapas do Pipeline Automático:
                  </Typography>
                  <List dense>
                    {metodologia.etapas.map((etapa, i) => (
                      <ListItem key={i}>
                        <ListItemIcon>
                          <CheckCircle sx={{ fontSize: 16, color: '#10b981' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={etapa}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                    💡 Exemplo de Aplicação:
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280', mb: 3, fontStyle: 'italic' }}>
                    {metodologia.exemplo}
                  </Typography>

                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        💻 Código Completo do Pipeline
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Paper sx={{ p: 2, backgroundColor: '#1f2937', color: '#f9fafb', overflow: 'auto' }}>
                        <pre style={{ fontSize: '0.75rem', margin: 0, whiteSpace: 'pre-wrap' }}>
                          {metodologia.codigo}
                        </pre>
                      </Paper>
                      
                      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                        <Button
                          variant="contained"
                          startIcon={<PlayArrow />}
                          onClick={() => navigator.clipboard.writeText(metodologia.codigo)}
                        >
                          Copiar Código
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<Download />}
                        >
                          Download Script
                        </Button>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Tab 2: Análise Preditiva */}
      <TabPanel value={tabValue} index={1}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          🎯 Análise Preditiva Automática
        </Typography>
        
        <Grid container spacing={3}>
          {metodologiasAvancadas.filter(m => m.id === 'analise_preditiva').map((metodologia, index) => (
            <Grid item xs={12} key={index}>
              <Card sx={{ border: '1px solid #e5e7eb' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TrendingUp sx={{ mr: 2, color: '#10b981' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {metodologia.nome}
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" sx={{ color: '#6b7280', mb: 3 }}>
                    {metodologia.descricao}
                  </Typography>

                  <Alert severity="info" sx={{ mb: 3 }}>
                    <strong>Diferencial:</strong> Criação automática de variáveis target temporais (T+1, T+2),
                    seleção automática do melhor algoritmo e interpretação dos resultados.
                  </Alert>

                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                    🔄 Pipeline Preditivo:
                  </Typography>
                  <List dense>
                    {metodologia.etapas.map((etapa, i) => (
                      <ListItem key={i}>
                        <ListItemIcon>
                          <CheckCircle sx={{ fontSize: 16, color: '#10b981' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={etapa}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        🧠 Sistema de Análise Preditiva Completo
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Paper sx={{ p: 2, backgroundColor: '#1f2937', color: '#f9fafb', overflow: 'auto' }}>
                        <pre style={{ fontSize: '0.75rem', margin: 0, whiteSpace: 'pre-wrap' }}>
                          {metodologia.codigo}
                        </pre>
                      </Paper>
                    </AccordionDetails>
                  </Accordion>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Tab 3: Técnicas Multivariadas */}
      <TabPanel value={tabValue} index={2}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          📊 Técnicas de Análise Multivariada
        </Typography>
        
        <Grid container spacing={3}>
          {tecnicasMultivariadas.map((tecnica, index) => (
            <Grid item xs={12} key={index}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Analytics sx={{ mr: 2, color: '#2563eb' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {tecnica.nome}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        🎯 Objetivo:
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {tecnica.objetivo}
                      </Typography>

                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        📅 Quando usar:
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {tecnica.quando_usar}
                      </Typography>

                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        📖 Interpretação:
                      </Typography>
                      <Typography variant="body2">
                        {tecnica.interpretacao}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        💻 Implementação Python:
                      </Typography>
                      <Paper sx={{ p: 2, backgroundColor: '#1f2937', color: '#f9fafb', overflow: 'auto' }}>
                        <pre style={{ fontSize: '0.7rem', margin: 0, whiteSpace: 'pre-wrap' }}>
                          {tecnica.codigo}
                        </pre>
                      </Paper>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Tab 4: Pipeline Completo */}
      <TabPanel value={tabValue} index={3}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          🔄 Pipeline Científico Completo
        </Typography>
        
        <Alert severity="warning" sx={{ mb: 3 }}>
          <strong>Metodologia Científica:</strong> Pipeline baseado nas melhores práticas de mineração de dados,
          seguindo a estratégia "pega tudo" para coleta e preparação sistemática dos dados.
        </Alert>

        <Card sx={{ border: '1px solid #e5e7eb', mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              📋 Workflow Científico Automatizado
            </Typography>
            
            <Stepper activeStep={activeStep} orientation="vertical">
              <Step>
                <StepLabel>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    1. Coleta Abrangente de Dados
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Estratégia "pega tudo": Colete todos os dados disponíveis, mesmo os que parecem irrelevantes.
                    Dados que não parecem úteis inicialmente podem revelar padrões importantes.
                  </Typography>
                  
                  <Paper sx={{ p: 2, backgroundColor: '#f8fafc', mb: 2 }}>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      # Fontes de dados recomendadas:
                      <br />• IBGE: Demografia, economia, geografia
                      <br />• DATASUS: Saúde pública, mortalidade
                      <br />• INMET: Dados meteorológicos
                      <br />• Secretarias municipais/estaduais
                      <br />• Universidades e institutos de pesquisa
                    </Typography>
                  </Paper>

                  <Button onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                    Próximo
                  </Button>
                </StepContent>
              </Step>

              <Step>
                <StepLabel>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    2. Preparação e Limpeza
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    "A preparação de dados é a chave do sucesso". Organização sistemática:
                    evitar células mescladas, nomes sem espaços, uniformizar formatos decimais.
                  </Typography>
                  
                  <List dense>
                    <ListItem>
                      <ListItemIcon><CheckCircle sx={{ fontSize: 16, color: '#10b981' }} /></ListItemIcon>
                      <ListItemText primary="Detecção automática de outliers (método IQR)" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><CheckCircle sx={{ fontSize: 16, color: '#10b981' }} /></ListItemIcon>
                      <ListItemText primary="Tratamento de valores faltantes" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><CheckCircle sx={{ fontSize: 16, color: '#10b981' }} /></ListItemIcon>
                      <ListItemText primary="Padronização de formatos" />
                    </ListItem>
                  </List>

                  <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                    Voltar
                  </Button>
                  <Button onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                    Próximo
                  </Button>
                </StepContent>
              </Step>

              <Step>
                <StepLabel>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    3. Criação de Variáveis Derivadas
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Criação automática de novas variáveis: complementares (secura = 100 - umidade),
                    lags temporais, índices acumulados, transformações matemáticas.
                  </Typography>
                  
                  <Alert severity="info" sx={{ mb: 2 }}>
                    <strong>Regra de Ouro:</strong> "Se vocês tiver lá na banca defendendo e não apresentar 
                    nenhuma variável que vocês criaram, eu vou dar paulada." - Sempre crie variáveis derivadas!
                  </Alert>

                  <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                    Voltar
                  </Button>
                  <Button onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                    Próximo
                  </Button>
                </StepContent>
              </Step>

              <Step>
                <StepLabel>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    4. Discretização Inteligente
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Discretização automática em tercis com arredondamento "apresentável" para comunicação pública.
                    Verificação automática da distribuição das classes.
                  </Typography>

                  <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                    Voltar
                  </Button>
                  <Button onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                    Próximo
                  </Button>
                </StepContent>
              </Step>

              <Step>
                <StepLabel>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    5. Análise Multivariada Combinada
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Execução automática de: análise de correlação, cluster hierárquico, K-means,
                    análise fatorial. Comparação de resultados para validação cruzada.
                  </Typography>

                  <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                    Voltar
                  </Button>
                  <Button onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                    Próximo
                  </Button>
                </StepContent>
              </Step>

              <Step>
                <StepLabel>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    6. Modelagem Preditiva
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Criação automática de variáveis target (T+1), treinamento de múltiplos algoritmos,
                    validação cruzada e seleção do melhor modelo baseado em métricas.
                  </Typography>

                  <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                    Voltar
                  </Button>
                  <Button onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                    Finalizar
                  </Button>
                </StepContent>
              </Step>
            </Stepper>
            
            {activeStep === 6 && (
              <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  🎉 Pipeline Científico Completo!
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Você agora tem acesso a um sistema completo de análise que supera ferramentas tradicionais
                  como CBA, oferecendo automação inteligente e interpretação científica rigorosa.
                </Typography>
                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                  Recomeçar Tutorial
                </Button>
                <Button variant="contained" sx={{ mt: 1 }}>
                  Executar Pipeline
                </Button>
              </Paper>
            )}
          </CardContent>
        </Card>

        {/* Comparação com CBA */}
        <Card sx={{ border: '1px solid #e5e7eb' }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              🆚 Comparação: DataScience Pro vs CBA
            </Typography>
            
            <TableContainer component={Paper} sx={{ border: '1px solid #e5e7eb' }}>
              <Table>
                <TableHead sx={{ backgroundColor: '#f8fafc' }}>
                  <TableRow>
                    <TableCell><strong>Aspecto</strong></TableCell>
                    <TableCell><strong>CBA Tradicional</strong></TableCell>
                    <TableCell><strong>DataScience Pro</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Preparação de Dados</TableCell>
                    <TableCell>Manual, formatação TXT</TableCell>
                    <TableCell>✅ Automática com validação</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Criação de Variáveis</TableCell>
                    <TableCell>Manual no Excel</TableCell>
                    <TableCell>✅ Automática + derivadas inteligentes</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Discretização</TableCell>
                    <TableCell>Manual por tercis</TableCell>
                    <TableCell>✅ Automática com arredondamento</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Análise Multivariada</TableCell>
                    <TableCell>Limitada ao Statistica</TableCell>
                    <TableCell>✅ 6+ técnicas integradas</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Modelos Preditivos</TableCell>
                    <TableCell>Regras de associação apenas</TableCell>
                    <TableCell>✅ ML completo + interpretação</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Interpretação</TableCell>
                    <TableCell>Manual</TableCell>
                    <TableCell>✅ Automática + científica</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Reprodutibilidade</TableCell>
                    <TableCell>Baixa (muitos passos manuais)</TableCell>
                    <TableCell>✅ Alta (pipeline automatizado)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </TabPanel>
    </Box>
  );
};

export default AnaliseAvancada;
