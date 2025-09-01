import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Tab,
  Tabs,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  Stack,
  LinearProgress,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  ExpandMore,
  Functions,
  School,
  Assessment,
  CheckCircle,
  PlayArrow,
  Psychology,
  Timeline,
  TrendingUp,
  BarChart,
  PieChart,
  ScatterPlot,
  ShowChart,
  Analytics,
  Science,
  Calculate,
  Insights,
  AutoAwesome,
  Lightbulb,
  MenuBook,
  Quiz,
  Code as CodeIcon,
  PlayCircleOutline,
  Close,
  ArrowBack,
  Visibility,
  AccessTime,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface Topico {
  id: string;
  titulo: string;
  nivel: 'Iniciante' | 'Intermediário' | 'Avançado';
  tempo: string;
  descricao: string;
  passos: PassoTutorial[];
  exemplos: ExemploCode[];
  exercicios: string[];
  recursos: string[];
}

interface PassoTutorial {
  numero: number;
  titulo: string;
  descricao: string;
  codigo?: string;
  imagem?: string;
  dica: string;
  resultado?: string;
}

interface ExemploCode {
  titulo: string;
  codigo: string;
  explicacao: string;
  saida: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const CentroAprendizadoCompleto: React.FC<{ onBackToHome?: () => void }> = ({ onBackToHome }) => {
  const [tabValue, setTabValue] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [dialogAberto, setDialogAberto] = useState(false);
  const [topicoSelecionado, setTopicoSelecionado] = useState<Topico | null>(null);
  const [progresso, setProgresso] = useState<{ [key: string]: number }>({});

  const topicosEstatistica: Topico[] = [
    {
      id: 'estatistica-descritiva',
      titulo: 'Estatística Descritiva Completa',
      nivel: 'Iniciante',
      tempo: '45 min',
      descricao: 'Domine as medidas de tendência central, dispersão e distribuição de dados com exemplos práticos e interpretações detalhadas.',
      passos: [
        {
          numero: 1,
          titulo: 'Preparação e Exploração Inicial dos Dados',
          descricao: 'Primeiro, vamos importar bibliotecas essenciais e carregar nosso dataset de vendas. É fundamental entender a estrutura dos dados antes de qualquer análise.',
          codigo: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats

# Configurar estilo dos gráficos
plt.style.use('seaborn')
sns.set_palette("husl")

# Carregar dados
dados = pd.read_csv('vendas.csv')

# Exploração inicial
print("Informações básicas do dataset:")
print(dados.info())
print("\\nPrimeiras 5 linhas:")
print(dados.head())
print("\\nEstatísticas básicas:")
print(dados.describe())`,
          dica: '💡 Sempre use info() e describe() primeiro - eles revelam missing values, tipos de dados e estatísticas básicas que orientam sua análise.',
          resultado: 'Visão geral completa do dataset: 1000 registros, 5 colunas, sem valores faltantes'
        },
        {
          numero: 2,
          titulo: 'Medidas de Tendência Central Detalhadas',
          descricao: 'Calcule e interprete média, mediana e moda. Cada medida tem seu contexto ideal de uso.',
          codigo: `# Média aritmética
media = dados['vendas'].mean()
print(f"📊 Média: R$ {media:,.2f}")

# Mediana (50º percentil)
mediana = dados['vendas'].median()
print(f"📊 Mediana: R$ {mediana:,.2f}")

# Moda (valor mais frequente)
moda = dados['vendas'].mode()
print(f"📊 Moda: R$ {moda[0]:,.2f}")

# Média ponderada (se houver pesos)
if 'peso' in dados.columns:
    media_ponderada = np.average(dados['vendas'], weights=dados['peso'])
    print(f"📊 Média Ponderada: R$ {media_ponderada:,.2f}")

# Comparação e interpretação
print("\\n🔍 INTERPRETAÇÃO:")
print(f"Diferença Média-Mediana: R$ {abs(media - mediana):,.2f}")
if media > mediana:
    print("↗️ Distribuição assimétrica à direita (valores altos puxam a média)")
elif media < mediana:
    print("↙️ Distribuição assimétrica à esquerda")
else:
    print("⚖️ Distribuição aproximadamente simétrica")`,
          dica: '📈 Use mediana quando há outliers; média quando a distribuição é normal; moda para dados categóricos.',
          resultado: 'Média: R$ 85.420,00 | Mediana: R$ 82.000,00 | Distribuição ligeiramente assimétrica à direita'
        },
        {
          numero: 3,
          titulo: 'Medidas de Dispersão e Variabilidade',
          descricao: 'Entenda como seus dados se espalham usando várias medidas de dispersão.',
          codigo: `# Amplitude (range)
amplitude = dados['vendas'].max() - dados['vendas'].min()
print(f"📏 Amplitude: R$ {amplitude:,.2f}")

# Amplitude interquartil (IQR)
q1 = dados['vendas'].quantile(0.25)
q3 = dados['vendas'].quantile(0.75)
iqr = q3 - q1
print(f"📏 IQR (Q3-Q1): R$ {iqr:,.2f}")

# Desvio padrão e variância
desvio = dados['vendas'].std()
variancia = dados['vendas'].var()
print(f"📊 Desvio Padrão: R$ {desvio:,.2f}")
print(f"📊 Variância: R$ {variancia:,.2f}")

# Coeficiente de variação
cv = (desvio / media) * 100
print(f"📊 Coeficiente de Variação: {cv:.2f}%")

# Detecção de outliers usando IQR
limite_inferior = q1 - 1.5 * iqr
limite_superior = q3 + 1.5 * iqr
outliers = dados[(dados['vendas'] < limite_inferior) | 
                 (dados['vendas'] > limite_superior)]
print(f"\\n🚨 Outliers detectados: {len(outliers)} registros")

# Interpretação da variabilidade
print("\\n🔍 INTERPRETAÇÃO DA VARIABILIDADE:")
if cv < 15:
    print("✅ Baixa variabilidade - dados homogêneos")
elif cv < 30:
    print("⚠️ Variabilidade moderada")
else:
    print("🚨 Alta variabilidade - dados heterogêneos")`,
          dica: '🎯 IQR é mais robusto que amplitude. CV permite comparar variabilidade entre diferentes escalas.',
          resultado: 'Desvio: R$ 15.200 | CV: 17.8% | 23 outliers detectados | Variabilidade moderada'
        },
        {
          numero: 4,
          titulo: 'Análise de Distribuição e Forma',
          descricao: 'Avalie a forma da distribuição usando assimetria e curtose.',
          codigo: `# Assimetria (skewness)
assimetria = stats.skew(dados['vendas'])
print(f"📐 Assimetria: {assimetria:.3f}")

# Curtose
curtose = stats.kurtosis(dados['vendas'])
print(f"📐 Curtose: {curtose:.3f}")

# Percentis importantes
percentis = [5, 10, 25, 50, 75, 90, 95]
valores_percentis = dados['vendas'].quantile([p/100 for p in percentis])
print("\\n📊 PERCENTIS:")
for p, v in zip(percentis, valores_percentis):
    print(f"P{p}: R$ {v:,.2f}")

# Teste de normalidade
statistic, p_value = stats.normaltest(dados['vendas'])
print(f"\\n🧪 TESTE DE NORMALIDADE:")
print(f"Estatística: {statistic:.3f}")
print(f"P-valor: {p_value:.6f}")

# Interpretação da assimetria
print("\\n🔍 INTERPRETAÇÃO DA FORMA:")
if abs(assimetria) < 0.5:
    print("⚖️ Distribuição aproximadamente simétrica")
elif assimetria > 0.5:
    print("↗️ Assimetria positiva (cauda à direita)")
else:
    print("↙️ Assimetria negativa (cauda à esquerda)")

# Interpretação da curtose
if abs(curtose) < 0.5:
    print("📊 Curtose normal (mesocúrtica)")
elif curtose > 0.5:
    print("📈 Distribuição mais pontiaguda (leptocúrtica)")
else:
    print("📉 Distribuição mais achatada (platicúrtica)")

# Interpretação do teste de normalidade
if p_value > 0.05:
    print("✅ Distribuição provavelmente normal (p > 0.05)")
else:
    print("❌ Distribuição não-normal (p ≤ 0.05)")`,
          dica: '📊 Normalidade é crucial para muitos testes estatísticos. Use gráficos Q-Q para visualizar.',
          resultado: 'Assimetria: 0.284 | Curtose: -0.142 | Distribuição ligeiramente assimétrica, não-normal'
        },
        {
          numero: 5,
          titulo: 'Visualizações Avançadas e Interpretação',
          descricao: 'Crie visualizações profissionais que comunicam insights efetivamente.',
          codigo: `# Configurar subplot com múltiplos gráficos
fig, axes = plt.subplots(2, 3, figsize=(18, 12))
fig.suptitle('Análise Estatística Descritiva Completa', fontsize=16, fontweight='bold')

# 1. Histograma com curva de densidade
axes[0,0].hist(dados['vendas'], bins=30, alpha=0.7, density=True, color='skyblue')
dados['vendas'].plot.density(ax=axes[0,0], color='red', linewidth=2)
axes[0,0].set_title('Distribuição com Densidade')
axes[0,0].set_xlabel('Vendas (R$)')
axes[0,0].axvline(media, color='green', linestyle='--', label=f'Média: {media:.0f}')
axes[0,0].axvline(mediana, color='orange', linestyle='--', label=f'Mediana: {mediana:.0f}')
axes[0,0].legend()

# 2. Box plot detalhado
box = axes[0,1].boxplot(dados['vendas'], patch_artist=True)
box['boxes'][0].set_facecolor('lightblue')
axes[0,1].set_title('Box Plot com Quartis')
axes[0,1].set_ylabel('Vendas (R$)')
# Adicionar valores dos quartis
axes[0,1].text(1.1, q1, f'Q1: {q1:.0f}', va='center')
axes[0,1].text(1.1, mediana, f'Q2: {mediana:.0f}', va='center')
axes[0,1].text(1.1, q3, f'Q3: {q3:.0f}', va='center')

# 3. Q-Q plot para normalidade
stats.probplot(dados['vendas'], dist="norm", plot=axes[0,2])
axes[0,2].set_title('Q-Q Plot (Normalidade)')

# 4. Gráfico de violino
axes[1,0].violinplot(dados['vendas'])
axes[1,0].set_title('Violin Plot')
axes[1,0].set_ylabel('Vendas (R$)')

# 5. Estatísticas resumidas
info_texto = f"""RESUMO ESTATÍSTICO

Tendência Central:
• Média: R$ {media:,.0f}
• Mediana: R$ {mediana:,.0f}
• Moda: R$ {moda[0]:,.0f}

Dispersão:
• Desvio Padrão: R$ {desvio:,.0f}
• IQR: R$ {iqr:,.0f}
• CV: {cv:.1f}%

Forma:
• Assimetria: {assimetria:.3f}
• Curtose: {curtose:.3f}
• Outliers: {len(outliers)}

Normalidade:
• P-valor: {p_value:.4f}
"""
axes[1,1].text(0.1, 0.9, info_texto, transform=axes[1,1].transAxes, 
               fontsize=10, verticalalignment='top', fontfamily='monospace',
               bbox=dict(boxstyle="round,pad=0.3", facecolor="lightgray"))
axes[1,1].set_title('Resumo Estatístico')
axes[1,1].axis('off')

# 6. Gráfico de percentis
percentis_plot = np.arange(1, 100)
valores_plot = [dados['vendas'].quantile(p/100) for p in percentis_plot]
axes[1,2].plot(percentis_plot, valores_plot, linewidth=2)
axes[1,2].set_title('Função de Distribuição Empírica')
axes[1,2].set_xlabel('Percentil')
axes[1,2].set_ylabel('Valor (R$)')
axes[1,2].grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Salvar o relatório
fig.savefig('analise_estatistica_descritiva.png', dpi=300, bbox_inches='tight')
print("\\n💾 Gráficos salvos como 'analise_estatistica_descritiva.png'")`,
          dica: '🎨 Use cores consistentes e adicione anotações para facilitar a interpretação dos gráficos.',
          resultado: 'Dashboard completo com 6 visualizações interpretadas e relatório estatístico detalhado'
        }
      ],
      exemplos: [
        {
          titulo: 'Análise Completa de Vendas',
          codigo: `# Dataset de exemplo
vendas = [120, 85, 90, 78, 156, 92, 88, 145, 67, 134]

# Estatísticas resumidas
print("=== ANÁLISE DESCRITIVA ===")
print(f"Média: {np.mean(vendas):.2f}")
print(f"Mediana: {np.median(vendas):.2f}")
print(f"Desvio Padrão: {np.std(vendas):.2f}")
print(f"Mínimo: {min(vendas)}")
print(f"Máximo: {max(vendas)}")`,
          explicacao: 'Este exemplo mostra como calcular todas as estatísticas básicas de uma vez.',
          saida: 'Média: 105.50, Mediana: 91.00, Desvio Padrão: 29.85, Mínimo: 67, Máximo: 156'
        }
      ],
      exercicios: [
        'Calcule a média e mediana de um dataset de temperaturas',
        'Identifique outliers usando o método IQR',
        'Compare distribuições usando histogramas'
      ],
      recursos: [
        'Documentação Pandas',
        'Tutorial NumPy',
        'Matplotlib Gallery'
      ]
    },
    {
      id: 'teste-hipoteses',
      titulo: 'Teste de Hipóteses',
      nivel: 'Intermediário',
      tempo: '45 min',
      descricao: 'Aprenda a formular e testar hipóteses estatísticas para tomar decisões baseadas em dados.',
      passos: [
        {
          numero: 1,
          titulo: 'Formulação de Hipóteses',
          descricao: 'Defina hipótese nula (H₀) e alternativa (H₁) claramente.',
          codigo: `# Exemplo: Teste se a média de vendas é igual a 100
# H₀: μ = 100 (hipótese nula)
# H₁: μ ≠ 100 (hipótese alternativa)

import scipy.stats as stats
import numpy as np

# Dados de amostra
vendas = [95, 102, 98, 105, 92, 108, 96, 101, 99, 104]
media_hipotetica = 100`,
          dica: 'A hipótese nula sempre assume "não há diferença" ou "não há efeito".',
          resultado: 'Hipóteses formuladas e dados preparados'
        },
        {
          numero: 2,
          titulo: 'Escolha do Teste Estatístico',
          descricao: 'Selecione o teste apropriado baseado no tipo de dados e questão de pesquisa.',
          codigo: `# Para uma amostra e teste de média:
# - Teste t de uma amostra (dados normais)
# - Teste de Wilcoxon (dados não-normais)

# Verificar normalidade primeiro
shapiro_stat, shapiro_p = stats.shapiro(vendas)
print(f"Teste Shapiro-Wilk p-value: {shapiro_p}")

if shapiro_p > 0.05:
    print("Dados aparentam ser normais - usar teste t")
else:
    print("Dados não-normais - usar teste não-paramétrico")`,
          dica: 'Sempre verifique os pressupostos do teste antes de aplicá-lo.',
          resultado: 'Teste Shapiro-Wilk p-value: 0.234 - Dados normais'
        },
        {
          numero: 3,
          titulo: 'Execução do Teste',
          descricao: 'Execute o teste estatístico e calcule o p-valor.',
          codigo: `# Teste t de uma amostra
t_estatistica, p_valor = stats.ttest_1samp(vendas, media_hipotetica)

print(f"Estatística t: {t_estatistica:.4f}")
print(f"P-valor: {p_valor:.4f}")

# Nível de significância
alpha = 0.05
print(f"Nível de significância: {alpha}")`,
          dica: 'O p-valor representa a probabilidade de obter os dados observados se H₀ fosse verdadeira.',
          resultado: 'Estatística t: 0.5477, P-valor: 0.5962'
        },
        {
          numero: 4,
          titulo: 'Interpretação dos Resultados',
          descricao: 'Compare p-valor com nível de significância e tire conclusões.',
          codigo: `# Decisão estatística
if p_valor < alpha:
    decisao = "Rejeitar H₀"
    conclusao = "Há evidência de que a média é diferente de 100"
else:
    decisao = "Não rejeitar H₀"
    conclusao = "Não há evidência suficiente de que a média é diferente de 100"

print(f"Decisão: {decisao}")
print(f"Conclusão: {conclusao}")

# Intervalo de confiança
ic = stats.t.interval(0.95, len(vendas)-1, 
                     loc=np.mean(vendas), 
                     scale=stats.sem(vendas))
print(f"IC 95%: [{ic[0]:.2f}, {ic[1]:.2f}]")`,
          dica: 'Sempre forneça uma interpretação prática, não apenas estatística.',
          resultado: 'Decisão: Não rejeitar H₀. IC 95%: [97.34, 102.66]'
        }
      ],
      exemplos: [
        {
          titulo: 'Teste A/B para Site',
          codigo: `# Comparar taxa de conversão entre duas versões
grupo_a = [0.12, 0.15, 0.11, 0.14, 0.13]  # Taxa de conversão A
grupo_b = [0.16, 0.18, 0.15, 0.19, 0.17]  # Taxa de conversão B

# Teste t independente
t_stat, p_val = stats.ttest_ind(grupo_a, grupo_b)
print(f"P-valor: {p_val:.4f}")

if p_val < 0.05:
    print("Diferença significativa entre grupos")
else:
    print("Não há diferença significativa")`,
          explicacao: 'Exemplo prático de teste A/B para comparar performance de duas versões.',
          saida: 'P-valor: 0.0156 - Diferença significativa entre grupos'
        }
      ],
      exercicios: [
        'Teste se a média de salários é igual a R$ 5000',
        'Compare vendas antes e depois de uma campanha',
        'Teste de qui-quadrado para independência'
      ],
      recursos: [
        'SciPy Stats Documentation',
        'Estatística Inferencial',
        'Testes Não-Paramétricos'
      ]
    },
    {
      id: 'regressao-linear',
      titulo: 'Análise de Regressão',
      nivel: 'Intermediário',
      tempo: '60 min',
      descricao: 'Aprenda a modelar relações entre variáveis e fazer previsões usando regressão linear.',
      passos: [
        {
          numero: 1,
          titulo: 'Preparação dos Dados',
          descricao: 'Carregue e prepare os dados para análise de regressão.',
          codigo: `import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_squared_error
import matplotlib.pyplot as plt

# Criar dados de exemplo
np.random.seed(42)
area = np.random.normal(100, 30, 100)  # Área das casas
preco = 50000 + 800 * area + np.random.normal(0, 10000, 100)  # Preço

dados = pd.DataFrame({'area': area, 'preco': preco})
print(dados.head())`,
          dica: 'Sempre explore seus dados visualmente antes de modelar.',
          resultado: 'Dataset com 100 observações de área e preço'
        },
        {
          numero: 2,
          titulo: 'Análise Exploratória',
          descricao: 'Visualize a relação entre variáveis e verifique pressupostos.',
          codigo: `# Gráfico de dispersão
plt.figure(figsize=(10, 6))
plt.scatter(dados['area'], dados['preco'], alpha=0.6)
plt.xlabel('Área (m²)')
plt.ylabel('Preço (R$)')
plt.title('Relação entre Área e Preço')
plt.show()

# Correlação
correlacao = dados['area'].corr(dados['preco'])
print(f"Correlação: {correlacao:.3f}")`,
          dica: 'Uma correlação próxima de 1 indica relação linear forte.',
          resultado: 'Correlação: 0.892 - Relação linear forte'
        },
        {
          numero: 3,
          titulo: 'Ajuste do Modelo',
          descricao: 'Ajuste o modelo de regressão linear aos dados.',
          codigo: `# Separar variáveis
X = dados[['area']]  # Variável independente
y = dados['preco']   # Variável dependente

# Dividir em treino e teste
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)

# Ajustar modelo
modelo = LinearRegression()
modelo.fit(X_train, y_train)

# Coeficientes
print(f"Intercepto: {modelo.intercept_:.2f}")
print(f"Coeficiente área: {modelo.coef_[0]:.2f}")`,
          dica: 'O coeficiente representa quanto Y muda para cada unidade de X.',
          resultado: 'Intercepto: 48523.45, Coeficiente área: 801.23'
        },
        {
          numero: 4,
          titulo: 'Avaliação do Modelo',
          descricao: 'Avalie a qualidade do modelo usando métricas apropriadas.',
          codigo: `# Previsões
y_pred = modelo.predict(X_test)

# Métricas
r2 = r2_score(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))

print(f"R²: {r2:.3f}")
print(f"RMSE: {rmse:.2f}")

# Gráfico de resíduos
residuos = y_test - y_pred
plt.figure(figsize=(10, 6))
plt.scatter(y_pred, residuos)
plt.xlabel('Valores Preditos')
plt.ylabel('Resíduos')
plt.title('Análise de Resíduos')
plt.axhline(y=0, color='r', linestyle='--')
plt.show()`,
          dica: 'R² próximo de 1 indica boa explicação da variabilidade.',
          resultado: 'R²: 0.796, RMSE: 11234.56'
        }
      ],
      exemplos: [
        {
          titulo: 'Previsão de Vendas',
          codigo: `# Modelo para prever vendas baseado em investimento em marketing
marketing = [1000, 1500, 2000, 2500, 3000]
vendas = [15000, 22000, 28000, 35000, 42000]

# Modelo simples
X = np.array(marketing).reshape(-1, 1)
y = np.array(vendas)

modelo = LinearRegression().fit(X, y)
print(f"Equação: Vendas = {modelo.intercept_:.0f} + {modelo.coef_[0]:.2f} * Marketing")

# Previsão para R$ 4000 em marketing
previsao = modelo.predict([[4000]])
print(f"Previsão para R$ 4000: R$ {previsao[0]:.0f}")`,
          explicacao: 'Exemplo prático de como usar regressão para previsão de vendas.',
          saida: 'Equação: Vendas = 1400 + 13.20 * Marketing. Previsão: R$ 54200'
        }
      ],
      exercicios: [
        'Modelo para prever salário baseado em experiência',
        'Regressão múltipla com mais variáveis',
        'Validação cruzada do modelo'
      ],
      recursos: [
        'Scikit-learn Documentation',
        'Pressupostos da Regressão',
        'Interpretação de Coeficientes'
      ]
    }
  ];

  const topicosMachineLearning: Topico[] = [
    {
      id: 'intro-ml',
      titulo: 'Introdução ao Machine Learning',
      nivel: 'Iniciante',
      tempo: '45 min',
      descricao: 'Conceitos fundamentais de aprendizado de máquina e tipos de problemas.',
      passos: [
        {
          numero: 1,
          titulo: 'Tipos de Aprendizado',
          descricao: 'Entenda as diferenças entre aprendizado supervisionado, não-supervisionado e por reforço.',
          codigo: `# Tipos de Machine Learning:

# 1. Supervisionado - tem dados de entrada e saída conhecidos
# Exemplos: Classificação, Regressão
classificacao = ["spam", "não-spam"]  # Variável alvo categórica
regressao = [100, 150, 200]  # Variável alvo numérica

# 2. Não-supervisionado - apenas dados de entrada
# Exemplos: Clustering, Redução de dimensionalidade
dados_clustering = [[1, 2], [1.5, 1.8], [5, 8], [8, 8]]

# 3. Por reforço - aprende através de recompensas
# Exemplo: Jogos, robótica`,
          dica: 'Escolha o tipo baseado no problema que você quer resolver.',
          resultado: 'Conceitos fundamentais definidos'
        },
        {
          numero: 2,
          titulo: 'Pipeline de ML',
          descricao: 'Aprenda o fluxo típico de um projeto de machine learning.',
          codigo: `# Pipeline típico de ML:

# 1. Coleta e preparação de dados
import pandas as pd
dados = pd.read_csv('dataset.csv')

# 2. Análise exploratória
print(dados.info())
print(dados.describe())

# 3. Pré-processamento
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()

# 4. Divisão treino/teste
from sklearn.model_selection import train_test_split

# 5. Treinamento do modelo
from sklearn.ensemble import RandomForestClassifier

# 6. Avaliação
from sklearn.metrics import accuracy_score`,
          dica: 'Sempre siga este pipeline para projetos organizados.',
          resultado: 'Pipeline estruturado definido'
        }
      ],
      exemplos: [
        {
          titulo: 'Classificação Simples',
          codigo: `from sklearn.datasets import make_classification
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Criar dataset exemplo
X, y = make_classification(n_samples=1000, n_features=4, random_state=42)

# Dividir dados
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Treinar modelo
modelo = RandomForestClassifier(random_state=42)
modelo.fit(X_train, y_train)

# Avaliar
previsoes = modelo.predict(X_test)
acuracia = accuracy_score(y_test, previsoes)
print(f"Acurácia: {acuracia:.3f}")`,
          explicacao: 'Exemplo completo de classificação usando Random Forest.',
          saida: 'Acurácia: 0.925'
        }
      ],
      exercicios: [
        'Classificar emails como spam ou não-spam',
        'Prever preços de casas (regressão)',
        'Agrupar clientes (clustering)'
      ],
      recursos: [
        'Scikit-learn Tutorials',
        'Kaggle Learn',
        'Machine Learning Mastery'
      ]
    }
  ];

  const topicosVisualizacao: Topico[] = [
    {
      id: 'matplotlib-basico',
      titulo: 'Matplotlib Básico',
      nivel: 'Iniciante',
      tempo: '40 min',
      descricao: 'Crie gráficos profissionais com Matplotlib.',
      passos: [
        {
          numero: 1,
          titulo: 'Gráficos de Linha',
          descricao: 'Crie gráficos de linha para mostrar tendências ao longo do tempo.',
          codigo: `import matplotlib.pyplot as plt
import numpy as np

# Dados exemplo
x = np.linspace(0, 10, 100)
y = np.sin(x)

# Gráfico básico
plt.figure(figsize=(10, 6))
plt.plot(x, y, label='sen(x)', linewidth=2)
plt.xlabel('X')
plt.ylabel('Y')
plt.title('Gráfico de Seno')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()`,
          dica: 'Use figsize para controlar o tamanho do gráfico.',
          resultado: 'Gráfico de linha profissional'
        }
      ],
      exemplos: [
        {
          titulo: 'Dashboard de Vendas',
          codigo: `# Criar dashboard com múltiplos gráficos
fig, axes = plt.subplots(2, 2, figsize=(15, 10))

# Gráfico 1: Vendas por mês
meses = ['Jan', 'Fev', 'Mar', 'Abr']
vendas = [1000, 1200, 900, 1400]
axes[0,0].bar(meses, vendas)
axes[0,0].set_title('Vendas por Mês')

# Gráfico 2: Pizza categorias
categorias = ['A', 'B', 'C']
valores = [30, 40, 30]
axes[0,1].pie(valores, labels=categorias)
axes[0,1].set_title('Distribuição por Categoria')

plt.tight_layout()
plt.show()`,
          explicacao: 'Como criar um dashboard com múltiplos gráficos.',
          saida: 'Dashboard interativo com 4 gráficos'
        }
      ],
      exercicios: [
        'Criar gráfico de barras para vendas por região',
        'Fazer histograma de distribuição de idades',
        'Gráfico de dispersão para correlação'
      ],
      recursos: [
        'Matplotlib Gallery',
        'Seaborn Examples',
        'Plotly Documentation'
      ]
    }
  ];

  // Tópicos de BigData
  const topicosBigData: Topico[] = [
    {
      id: 'bigdata-fundamentos',
      titulo: 'Fundamentos de BigData',
      nivel: 'Iniciante',
      tempo: '45 min',
      descricao: 'Compreenda os conceitos fundamentais de BigData: Volume, Velocidade, Variedade e Veracidade (4 Vs).',
      passos: [
        {
          numero: 1,
          titulo: 'O que é BigData?',
          descricao: 'BigData refere-se a conjuntos de dados que são tão grandes, rápidos ou complexos que são difíceis ou impossíveis de processar usando métodos tradicionais.',
          codigo: `# Os 4 Vs do BigData:
# 1. VOLUME - Quantidade massiva de dados
#    Exemplos: Terabytes, Petabytes, Exabytes
#    Fontes: Sensores IoT, redes sociais, transações

# 2. VELOCIDADE - Velocidade de geração e processamento
#    Exemplos: Streaming em tempo real, processamento batch
#    Tecnologias: Apache Kafka, Apache Storm

# 3. VARIEDADE - Diferentes tipos de dados
#    Estruturados: Bancos relacionais (SQL)
#    Semi-estruturados: JSON, XML
#    Não-estruturados: Texto, imagem, vídeo

# 4. VERACIDADE - Qualidade e confiabilidade dos dados
#    Dados inconsistentes, ruído, viés
#    Necessidade de limpeza e validação`,
          dica: 'BigData não é apenas sobre tamanho - é sobre complexidade e necessidade de novas tecnologias.',
          resultado: 'Compreensão dos fundamentos e desafios do BigData'
        },
        {
          numero: 2,
          titulo: 'Ecossistema Hadoop',
          descricao: 'Apache Hadoop é a plataforma mais popular para BigData, oferecendo armazenamento distribuído e processamento paralelo.',
          codigo: `# Componentes principais do Hadoop:

# 1. HDFS (Hadoop Distributed File System)
# - Sistema de arquivos distribuído
# - Armazena dados em múltiplos nós
# - Tolerância a falhas com replicação

# 2. MapReduce
# - Modelo de programação para processamento paralelo
# - Map: Processa dados em paralelo
# - Reduce: Agrega resultados

# 3. YARN (Yet Another Resource Negotiator)
# - Gerenciador de recursos
# - Permite múltiplos frameworks no mesmo cluster

# Exemplo conceitual de MapReduce:
# Problema: Contar palavras em um documento grande
# Map: Cada nó conta palavras em sua parte
# Shuffle: Agrupa palavras iguais
# Reduce: Soma contagens finais`,
          dica: 'Hadoop democratizou o BigData ao usar hardware commodity em vez de supercomputadores.',
          resultado: 'Compreensão da arquitetura distribuída do Hadoop'
        }
      ],
      exemplos: [
        {
          titulo: 'Processamento MapReduce Simples',
          codigo: `# Pseudocódigo MapReduce para contagem de palavras
# Entrada: ["hello world", "hello bigdata", "world of data"]

# FASE MAP:
def map_function(linha):
    palavras = linha.split()
    for palavra in palavras:
        emit(palavra, 1)  # (chave, valor)

# FASE SHUFFLE (automática):
# hello: [1, 1]
# world: [1, 1] 
# bigdata: [1]
# of: [1]
# data: [1]

# FASE REDUCE:
def reduce_function(palavra, lista_valores):
    total = sum(lista_valores)
    emit(palavra, total)

# RESULTADO FINAL:
# hello: 2, world: 2, bigdata: 1, of: 1, data: 1`,
          explicacao: 'MapReduce divide o problema em tarefas menores que podem ser executadas em paralelo.',
          saida: 'Contagem distribuída de palavras em grande escala'
        }
      ],
      exercicios: [
        'Configure um cluster Hadoop local usando Docker',
        'Implemente um job MapReduce para análise de logs',
        'Compare performance entre processamento tradicional e distribuído'
      ],
      recursos: [
        'Apache Hadoop Documentation',
        'Hadoop: The Definitive Guide',
        'Cloudera Training'
      ]
    },
    {
      id: 'spark-fundamentos',
      titulo: 'Apache Spark - Processamento Rápido',
      nivel: 'Intermediário', 
      tempo: '60 min',
      descricao: 'Domine o Apache Spark para processamento ultra-rápido de BigData com APIs em Python, Scala e SQL.',
      passos: [
        {
          numero: 1,
          titulo: 'Por que Spark?',
          descricao: 'Spark é até 100x mais rápido que Hadoop MapReduce devido ao processamento em memória.',
          codigo: `# Vantagens do Apache Spark:

# 1. VELOCIDADE
# - Processamento em memória (RAM)
# - Até 100x mais rápido que MapReduce
# - Otimizações automáticas de query

# 2. FACILIDADE DE USO
# - APIs em Python (PySpark), Scala, Java, R
# - Interface SQL familiar
# - Notebooks interativos

# 3. GENERALIDADE
# - Spark SQL: Consultas SQL
# - Spark Streaming: Dados em tempo real
# - MLlib: Machine Learning
# - GraphX: Processamento de grafos

# 4. EXECUÇÃO EM QUALQUER LUGAR
# - Standalone, Hadoop YARN, Kubernetes
# - Cloud: AWS EMR, Azure HDInsight, GCP Dataproc`,
          dica: 'Spark mantém dados na memória entre operações, eliminando escritas desnecessárias no disco.',
          resultado: 'Compreensão das vantagens competitivas do Spark'
        },
        {
          numero: 2,
          titulo: 'RDDs e DataFrames',
          descricao: 'Estruturas de dados fundamentais do Spark: RDDs (baixo nível) e DataFrames (alto nível).',
          codigo: `# EXEMPLO PRÁTICO COM PYSPARK:

from pyspark.sql import SparkSession

# Inicializar Spark
spark = SparkSession.builder \\
    .appName("BigDataAnalysis") \\
    .getOrCreate()

# DATAFRAMES (recomendado)
# Carregar dados (CSV, JSON, Parquet, etc.)
df = spark.read.csv("vendas_grandes.csv", header=True, inferSchema=True)

# Operações SQL familiares
df.select("produto", "vendas").show()
df.filter(df.vendas > 1000).count()
df.groupBy("categoria").sum("vendas").show()

# TRANSFORMAÇÕES (lazy evaluation)
vendas_altas = df.filter(df.vendas > 5000)
vendas_por_regiao = vendas_altas.groupBy("regiao").sum("vendas")

# AÇÕES (executam o pipeline)
resultado = vendas_por_regiao.collect()
vendas_por_regiao.write.parquet("resultado_vendas.parquet")`,
          dica: 'Spark usa avaliação preguiçosa - transformações só são executadas quando uma ação é chamada.',
          resultado: 'Processamento eficiente de datasets massivos'
        }
      ],
      exemplos: [
        {
          titulo: 'Análise de Logs Web em Grande Escala',
          codigo: `# Análise de 1TB de logs de servidor web
from pyspark.sql import SparkSession
from pyspark.sql.functions import *

spark = SparkSession.builder.appName("LogAnalysis").getOrCreate()

# Carregar logs (formato Apache Common Log)
logs = spark.read.text("/data/access_logs/")

# Parse dos logs usando regex
log_pattern = r'(\\S+) \\S+ \\S+ \\[(.*?)\\] "(.*?)" (\\d+) (\\d+)'
parsed_logs = logs.select(
    regexp_extract('value', log_pattern, 1).alias('ip'),
    regexp_extract('value', log_pattern, 2).alias('timestamp'),
    regexp_extract('value', log_pattern, 3).alias('request'),
    regexp_extract('value', log_pattern, 4).cast('int').alias('status'),
    regexp_extract('value', log_pattern, 5).cast('int').alias('size')
)

# Análises em tempo recorde:
# 1. Top 10 IPs com mais acessos
top_ips = parsed_logs.groupBy('ip').count().orderBy(desc('count')).limit(10)

# 2. Códigos de erro mais frequentes
errors = parsed_logs.filter(col('status') >= 400).groupBy('status').count()

# 3. Páginas mais acessadas
requests = parsed_logs.select(split(col('request'), ' ')[1].alias('url'))
top_pages = requests.groupBy('url').count().orderBy(desc('count')).limit(20)

# Salvar resultados
top_ips.write.parquet("/output/top_ips")
errors.write.parquet("/output/errors")
top_pages.write.parquet("/output/top_pages")`,
          explicacao: 'Spark processa terabytes de logs em minutos usando paralelização automática.',
          saida: 'Insights de tráfego web processados em escala massiva'
        }
      ],
      exercicios: [
        'Configure Spark local e processe um dataset de 1GB+',
        'Implemente pipeline ETL completo com Spark SQL',
        'Compare Spark vs Pandas em datasets grandes'
      ],
      recursos: [
        'Spark: The Definitive Guide',
        'PySpark Tutorial',
        'Databricks Academy'
      ]
    },
    {
      id: 'streaming-tempo-real',
      titulo: 'Streaming e Dados em Tempo Real',
      nivel: 'Avançado',
      tempo: '75 min', 
      descricao: 'Processe dados em tempo real com Apache Kafka, Spark Streaming e arquiteturas Lambda.',
      passos: [
        {
          numero: 1,
          titulo: 'Apache Kafka - Streaming de Dados',
          descricao: 'Kafka é a plataforma líder para streaming de dados, usado por Netflix, LinkedIn, Uber.',
          codigo: `# KAFKA: PLATAFORMA DE STREAMING DISTRIBUÍDA

# Conceitos Fundamentais:
# 1. TOPICS: Canais de dados categorizados
# 2. PRODUCERS: Aplicações que enviam dados
# 3. CONSUMERS: Aplicações que consomem dados
# 4. BROKERS: Servidores Kafka que armazenam dados
# 5. PARTITIONS: Divisão dos topics para paralelismo

# Exemplo: Sistema de Monitoramento IoT
from kafka import KafkaProducer, KafkaConsumer
import json
import time

# PRODUCER (Sensor IoT)
producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda x: json.dumps(x).encode('utf-8')
)

# Simulando dados de sensores
for i in range(1000):
    sensor_data = {
        'sensor_id': f'sensor_{i%10}',
        'temperature': 20 + (i % 30),
        'humidity': 40 + (i % 40),
        'timestamp': time.time()
    }
    producer.send('iot_sensors', sensor_data)
    time.sleep(0.1)  # 10 mensagens/segundo

# CONSUMER (Sistema de Monitoramento)
consumer = KafkaConsumer(
    'iot_sensors',
    bootstrap_servers=['localhost:9092'],
    value_deserializer=lambda m: json.loads(m.decode('utf-8'))
)

for message in consumer:
    data = message.value
    # Alertas em tempo real
    if data['temperature'] > 40:
        print(f"🚨 ALERTA: Sensor {data['sensor_id']} - Temp: {data['temperature']}°C")`,
          dica: 'Kafka garante que dados nunca sejam perdidos e podem ser reprocessados quando necessário.',
          resultado: 'Sistema de streaming resiliente e escalável'
        },
        {
          numero: 2,
          titulo: 'Spark Streaming - Processamento Contínuo',
          descricao: 'Combine Kafka + Spark para processar streams de dados com baixa latência.',
          codigo: `# SPARK STRUCTURED STREAMING com Kafka
from pyspark.sql import SparkSession
from pyspark.sql.functions import *
from pyspark.sql.types import *

spark = SparkSession.builder \\
    .appName("IoTStreamProcessing") \\
    .getOrCreate()

# Schema dos dados IoT
schema = StructType([
    StructField("sensor_id", StringType()),
    StructField("temperature", DoubleType()),
    StructField("humidity", DoubleType()),
    StructField("timestamp", DoubleType())
])

# Conectar ao Kafka
kafka_stream = spark \\
    .readStream \\
    .format("kafka") \\
    .option("kafka.bootstrap.servers", "localhost:9092") \\
    .option("subscribe", "iot_sensors") \\
    .load()

# Parse JSON e aplicar schema
iot_data = kafka_stream.select(
    from_json(col("value").cast("string"), schema).alias("data")
).select("data.*")

# PROCESSAMENTO EM TEMPO REAL:
# 1. Agregações por janela de tempo
temp_avg = iot_data \\
    .withWatermark("timestamp", "10 seconds") \\
    .groupBy(
        window(col("timestamp"), "1 minute"),
        col("sensor_id")
    ) \\
    .agg(
        avg("temperature").alias("avg_temp"),
        max("temperature").alias("max_temp"),
        count("*").alias("readings")
    )

# 2. Detectar anomalias
anomalies = iot_data.filter(
    (col("temperature") > 45) | (col("humidity") > 90)
)

# 3. Salvar resultados continuamente
query1 = temp_avg.writeStream \\
    .outputMode("append") \\
    .format("parquet") \\
    .option("path", "/output/temperature_aggregates") \\
    .option("checkpointLocation", "/checkpoints/temp") \\
    .start()

query2 = anomalies.writeStream \\
    .outputMode("append") \\
    .format("console") \\
    .start()

# Manter streams rodando
query1.awaitTermination()`,
          dica: 'Structured Streaming garante exactly-once semantics mesmo com falhas de sistema.',
          resultado: 'Pipeline de dados em tempo real tolerante a falhas'
        }
      ],
      exemplos: [
        {
          titulo: 'Dashboard de Vendas em Tempo Real',
          codigo: `# PIPELINE COMPLETO: E-commerce em Tempo Real
# Kafka -> Spark Streaming -> Dashboard

# 1. PRODUTOR: Eventos de venda
from kafka import KafkaProducer
import json, random, time
from datetime import datetime

producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda x: json.dumps(x).encode()
)

# Simular vendas de e-commerce
produtos = ['Smartphone', 'Laptop', 'Tablet', 'Smartwatch', 'Fones']
regioes = ['Norte', 'Sul', 'Sudeste', 'Nordeste', 'Centro-Oeste']

while True:
    venda = {
        'venda_id': f'v_{int(time.time())}_{random.randint(1000,9999)}',
        'produto': random.choice(produtos),
        'preco': round(random.uniform(100, 5000), 2),
        'quantidade': random.randint(1, 5),
        'regiao': random.choice(regioes),
        'timestamp': datetime.now().isoformat()
    }
    
    producer.send('vendas_tempo_real', venda)
    time.sleep(random.uniform(0.1, 2))  # Vendas irregulares

# 2. PROCESSADOR: Spark Streaming
from pyspark.sql import SparkSession
from pyspark.sql.functions import *

spark = SparkSession.builder.appName("VendasTempoReal").getOrCreate()

vendas_stream = spark \\
    .readStream \\
    .format("kafka") \\
    .option("kafka.bootstrap.servers", "localhost:9092") \\
    .option("subscribe", "vendas_tempo_real") \\
    .load()

# Parse e transformações
vendas_df = vendas_stream.select(
    from_json(col("value").cast("string"), vendas_schema).alias("venda")
).select("venda.*")

# KPIs em tempo real
kpis_tempo_real = vendas_df \\
    .withWatermark("timestamp", "30 seconds") \\
    .groupBy(window(col("timestamp"), "1 minute")) \\
    .agg(
        sum(col("preco") * col("quantidade")).alias("receita_total"),
        count("*").alias("total_vendas"),
        avg(col("preco")).alias("ticket_medio"),
        countDistinct("produto").alias("produtos_vendidos")
    )

# Top produtos por região (últimos 5 minutos)
top_produtos = vendas_df \\
    .withWatermark("timestamp", "30 seconds") \\
    .groupBy(
        window(col("timestamp"), "5 minutes"),
        col("regiao"), 
        col("produto")
    ) \\
    .agg(
        sum(col("quantidade")).alias("qtd_vendida"),
        sum(col("preco") * col("quantidade")).alias("receita")
    )

# Output para dashboard
kpis_query = kpis_tempo_real.writeStream \\
    .outputMode("append") \\
    .format("memory") \\
    .queryName("kpis_vendas") \\
    .start()

produtos_query = top_produtos.writeStream \\
    .outputMode("append") \\
    .format("memory") \\
    .queryName("top_produtos") \\
    .start()`,
          explicacao: 'Sistema completo de analytics em tempo real para e-commerce com latência sub-segundo.',
          saida: 'Dashboard atualizado em tempo real com KPIs de vendas'
        }
      ],
      exercicios: [
        'Implemente pipeline Kafka + Spark para análise de sentimentos em tempo real',
        'Crie sistema de alertas baseado em thresholds dinâmicos',
        'Compare arquiteturas Lambda vs Kappa para streaming'
      ],
      recursos: [
        'Kafka: The Definitive Guide',
        'Stream Processing with Apache Spark',
        'Confluent Developer Courses'
      ]
    }
  ];

  const categorias = [
    { label: 'Estatística', topicos: topicosEstatistica, icon: <Functions /> },
    { label: 'Machine Learning', topicos: topicosMachineLearning, icon: <Psychology /> },
    { label: 'Visualização', topicos: topicosVisualizacao, icon: <BarChart /> },
    { label: 'BigData', topicos: topicosBigData, icon: <Analytics /> }
  ];

  const handleNext = (topicoId: string) => {
    setActiveStep((prevStep) => prevStep + 1);
    setProgresso(prev => ({
      ...prev,
      [topicoId]: Math.min((prev[topicoId] || 0) + 25, 100)
    }));
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const verDetalhes = (topico: Topico) => {
    setTopicoSelecionado(topico);
    setDialogAberto(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Botão de navegação */}
      {onBackToHome && (
        <Box sx={{ mb: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={onBackToHome}
            sx={{ mb: 2 }}
          >
            ← Voltar para Página Inicial
          </Button>
        </Box>
      )}

      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <School sx={{ mr: 2, color: 'primary.main' }} />
          Centro de Aprendizado Completo
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Tutoriais passo a passo, exemplos práticos e exercícios para dominar análise de dados e machine learning.
        </Typography>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          💡 <strong>Dica:</strong> Siga os tutoriais na ordem sugerida e pratique com os exercícios para melhor aprendizado.
        </Alert>
      </Box>

      {/* Tabs de Categorias */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
          {categorias.map((categoria, index) => (
            <Tab
              key={index}
              label={categoria.label}
              icon={categoria.icon}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Paper>

      {/* Conteúdo das Tabs */}
      {categorias.map((categoria, categoriaIndex) => (
        <TabPanel key={categoriaIndex} value={tabValue} index={categoriaIndex}>
          <Grid container spacing={3}>
            {categoria.topicos.map((topico) => (
              <Grid item xs={12} md={6} lg={4} key={topico.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        {topico.titulo}
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <Chip
                          label={topico.nivel}
                          size="small"
                          color={
                            topico.nivel === 'Iniciante' ? 'success' :
                            topico.nivel === 'Intermediário' ? 'warning' : 'error'
                          }
                        />
                        <Chip
                          label={topico.tempo}
                          size="small"
                          variant="outlined"
                          icon={<AccessTime />}
                        />
                      </Stack>
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      {topico.descricao}
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" gutterBottom>
                        <strong>Progresso:</strong> {progresso[topico.id] || 0}%
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={progresso[topico.id] || 0}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                    
                    <List dense>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon>
                          <MenuBook sx={{ fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText primary={`${topico.passos.length} passos tutoriais`} />
                      </ListItem>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon>
                          <CodeIcon sx={{ fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText primary={`${topico.exemplos.length} exemplos de código`} />
                      </ListItem>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon>
                          <Quiz sx={{ fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText primary={`${topico.exercicios.length} exercícios`} />
                      </ListItem>
                    </List>
                  </CardContent>
                  
                  <Divider />
                  
                  <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Visibility />}
                      onClick={() => verDetalhes(topico)}
                    >
                      Ver Detalhes
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<PlayCircleOutline />}
                      onClick={() => {
                        setTopicoSelecionado(topico);
                        setActiveStep(0);
                        setDialogAberto(true);
                      }}
                    >
                      Iniciar Tutorial
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      ))}

      {/* Dialog do Tutorial */}
      <Dialog
        open={dialogAberto}
        onClose={() => setDialogAberto(false)}
        maxWidth="lg"
        fullWidth
        fullScreen
      >
        {topicoSelecionado && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5">
                {topicoSelecionado.titulo}
              </Typography>
              <IconButton onClick={() => setDialogAberto(false)}>
                <Close />
              </IconButton>
            </DialogTitle>
            
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Stepper activeStep={activeStep} orientation="vertical">
                    {topicoSelecionado.passos.map((passo, index) => (
                      <Step key={index}>
                        <StepLabel>
                          <Typography variant="h6">{passo.titulo}</Typography>
                        </StepLabel>
                        <StepContent>
                          <Typography variant="body1" sx={{ mb: 2 }}>
                            {passo.descricao}
                          </Typography>
                          
                          {passo.codigo && (
                            <Paper sx={{ p: 2, bgcolor: 'grey.900', color: 'white', mb: 2 }}>
                              <pre style={{ margin: 0, fontSize: '14px', whiteSpace: 'pre-wrap' }}>
                                {passo.codigo}
                              </pre>
                            </Paper>
                          )}
                          
                          <Alert severity="info" sx={{ mb: 2 }}>
                            <strong>💡 Dica:</strong> {passo.dica}
                          </Alert>
                          
                          {passo.resultado && (
                            <Alert severity="success" sx={{ mb: 2 }}>
                              <strong>✅ Resultado:</strong> {passo.resultado}
                            </Alert>
                          )}
                          
                          <Box sx={{ mb: 1 }}>
                            <div>
                              <Button
                                variant="contained"
                                onClick={() => handleNext(topicoSelecionado.id)}
                                sx={{ mt: 1, mr: 1 }}
                              >
                                {index === topicoSelecionado.passos.length - 1 ? 'Finalizar' : 'Próximo'}
                              </Button>
                              <Button
                                disabled={index === 0}
                                onClick={handleBack}
                                sx={{ mt: 1, mr: 1 }}
                              >
                                Voltar
                              </Button>
                            </div>
                          </Box>
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, mb: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      📚 Recursos Adicionais
                    </Typography>
                    <List dense>
                      {topicoSelecionado.recursos.map((recurso, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <Lightbulb sx={{ fontSize: 16 }} />
                          </ListItemIcon>
                          <ListItemText primary={recurso} />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                  
                  <Paper sx={{ p: 2, mb: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      🎯 Exercícios
                    </Typography>
                    <List dense>
                      {topicoSelecionado.exercicios.map((exercicio, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <Quiz sx={{ fontSize: 16 }} />
                          </ListItemIcon>
                          <ListItemText primary={exercicio} />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                  
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      💻 Exemplos de Código
                    </Typography>
                    {topicoSelecionado.exemplos.map((exemplo, index) => (
                      <Accordion key={index}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Typography variant="subtitle2">{exemplo.titulo}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography variant="body2" sx={{ mb: 2 }}>
                            {exemplo.explicacao}
                          </Typography>
                          <Paper sx={{ p: 1, bgcolor: 'grey.100', mb: 1 }}>
                            <pre style={{ margin: 0, fontSize: '12px' }}>
                              {exemplo.codigo}
                            </pre>
                          </Paper>
                          <Alert severity="success" sx={{ mt: 1 }}>
                            <strong>Saída:</strong> {exemplo.saida}
                          </Alert>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </Paper>
                </Grid>
              </Grid>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default CentroAprendizadoCompleto;
