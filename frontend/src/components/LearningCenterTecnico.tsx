import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
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
} from '@mui/material';
import {
  ExpandMore,
  Functions,
  School,
  Assessment,
  CheckCircle,
  PlayArrow,
  Psychology,
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
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const LearningCenterTecnico: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const metodosEstatisticos = [
    {
      nome: 'Coeficiente de Correlação de Pearson',
      formula: 'r = Σ[(xi - x̄)(yi - ȳ)] / √[Σ(xi - x̄)²Σ(yi - ȳ)²]',
      quando: 'Medir a força e direção da relação linear entre duas variáveis contínuas',
      interpretacao: [
        'r = 1: Correlação positiva perfeita',
        '0.7 ≤ |r| < 1: Correlação forte',
        '0.3 ≤ |r| < 0.7: Correlação moderada',
        '0 < |r| < 0.3: Correlação fraca',
        'r = 0: Sem correlação linear'
      ],
      exemplo: 'Correlação entre PIB municipal e IDEB das escolas',
      codigo: `# Exemplo em Python
import pandas as pd
from scipy.stats import pearsonr

# Calcular correlação
correlation, p_value = pearsonr(dados['pib'], dados['ideb'])
print(f'Correlação: {correlation:.3f}')
print(f'P-valor: {p_value:.3f}')

# Interpretação automática
if abs(correlation) >= 0.7:
    forca = "forte"
elif abs(correlation) >= 0.3:
    forca = "moderada"
else:
    forca = "fraca"
    
print(f'Correlação {forca} {"positiva" if correlation > 0 else "negativa"}')`
    },
    {
      nome: 'Teste t de Student',
      formula: 't = (x̄ - μ) / (s / √n)',
      quando: 'Comparar médias de dois grupos ou testar se uma média difere de um valor específico',
      interpretacao: [
        'H₀: μ₁ = μ₂ (não há diferença entre as médias)',
        'H₁: μ₁ ≠ μ₂ (há diferença entre as médias)',
        'p < 0.05: Rejeitar H₀ (diferença significativa)',
        'p ≥ 0.05: Não rejeitar H₀ (diferença não significativa)'
      ],
      exemplo: 'Comparar o IDEB entre escolas públicas e privadas',
      codigo: `# Teste t independente
from scipy.stats import ttest_ind

# Separar grupos
publicas = dados[dados['tipo'] == 'publica']['ideb']
privadas = dados[dados['tipo'] == 'privada']['ideb']

# Executar teste
t_stat, p_value = ttest_ind(publicas, privadas)

print(f'Estatística t: {t_stat:.3f}')
print(f'P-valor: {p_value:.3f}')

# Interpretação
if p_value < 0.05:
    print('Diferença estatisticamente significativa (p < 0.05)')
else:
    print('Diferença não significativa (p ≥ 0.05)')`
    },
    {
      nome: 'Análise de Regressão Linear',
      formula: 'y = β₀ + β₁x + ε',
      quando: 'Modelar a relação entre uma variável dependente e uma ou mais independentes',
      interpretacao: [
        'β₀: Intercepto (valor de y quando x = 0)',
        'β₁: Coeficiente angular (mudança em y por unidade de x)',
        'R²: Proporção da variância explicada pelo modelo',
        'p-valor dos coeficientes: Significância estatística'
      ],
      exemplo: 'Prever o PIB municipal baseado na população',
      codigo: `# Regressão linear simples
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score
import matplotlib.pyplot as plt

# Preparar dados
X = dados[['populacao']].values
y = dados['pib'].values

# Treinar modelo
modelo = LinearRegression()
modelo.fit(X, y)

# Fazer predições
y_pred = modelo.predict(X)

# Métricas
r2 = r2_score(y, y_pred)
print(f'R²: {r2:.3f}')
print(f'Intercepto: {modelo.intercept_:.2f}')
print(f'Coeficiente: {modelo.coef_[0]:.2f}')

# Interpretação
print(f'Para cada 1000 habitantes, o PIB aumenta em média R$ {modelo.coef_[0]*1000:.0f}')`
    },
    {
      nome: 'Análise de Variância (ANOVA)',
      formula: 'F = MSbetween / MSwithin',
      quando: 'Comparar médias de três ou mais grupos simultaneamente',
      interpretacao: [
        'H₀: μ₁ = μ₂ = μ₃ = ... (todas as médias são iguais)',
        'H₁: Pelo menos uma média é diferente',
        'F alto: Maior variabilidade entre grupos',
        'p < 0.05: Pelo menos um grupo difere significativamente'
      ],
      exemplo: 'Comparar IDEB entre diferentes regiões do país',
      codigo: `# ANOVA one-way
from scipy.stats import f_oneway

# Separar grupos por região
norte = dados[dados['regiao'] == 'Norte']['ideb']
nordeste = dados[dados['regiao'] == 'Nordeste']['ideb']
sudeste = dados[dados['regiao'] == 'Sudeste']['ideb']
sul = dados[dados['regiao'] == 'Sul']['ideb']
centro_oeste = dados[dados['regiao'] == 'Centro-Oeste']['ideb']

# Executar ANOVA
f_stat, p_value = f_oneway(norte, nordeste, sudeste, sul, centro_oeste)

print(f'Estatística F: {f_stat:.3f}')
print(f'P-valor: {p_value:.3f}')

if p_value < 0.05:
    print('Há diferenças significativas entre as regiões')
    # Pós-teste para identificar quais grupos diferem
    from scipy.stats import tukey_hsd
    res = tukey_hsd(norte, nordeste, sudeste, sul, centro_oeste)
    print(res)`
    }
  ];

  const tutoriaisCompletos = [
    {
      titulo: 'Análise Exploratória de Dados Passo-a-Passo',
      descricao: 'Guia completo para explorar datasets públicos',
      duracao: '45 min',
      nivel: 'Iniciante',
      etapas: [
        {
          nome: 'Carregamento e Inspeção Inicial',
          conteudo: `
import pandas as pd
import numpy as np

# Carregar dados
df = pd.read_csv('municipios_ibge.csv')

# Inspeção inicial
print(f"Dimensões: {df.shape}")
print(f"Colunas: {list(df.columns)}")
print(f"Tipos de dados:")
print(df.dtypes)
print(f"\\nPrimeiras 5 linhas:")
print(df.head())
          `,
          explicacao: 'Sempre comece inspecionando a estrutura dos dados: quantas linhas e colunas, que tipos de dados, presença de valores faltantes.'
        },
        {
          nome: 'Limpeza e Tratamento de Dados',
          conteudo: `
# Verificar valores faltantes
print("Valores faltantes por coluna:")
print(df.isnull().sum())

# Verificar duplicatas
print(f"\\nDuplicatas: {df.duplicated().sum()}")

# Tratar valores faltantes
df['populacao'].fillna(df['populacao'].median(), inplace=True)

# Remover outliers (método IQR)
Q1 = df['pib'].quantile(0.25)
Q3 = df['pib'].quantile(0.75)
IQR = Q3 - Q1
df = df[~((df['pib'] < (Q1 - 1.5 * IQR)) | (df['pib'] > (Q3 + 1.5 * IQR)))]
          `,
          explicacao: 'A limpeza é crucial. Trate valores faltantes, remova duplicatas e identifique outliers que podem distorcer as análises.'
        },
        {
          nome: 'Estatísticas Descritivas',
          conteudo: `
# Estatísticas básicas
print("Estatísticas descritivas:")
print(df.describe())

# Medidas de tendência central
print(f"\\nMédia do PIB: {df['pib'].mean():.2f}")
print(f"Mediana do PIB: {df['pib'].median():.2f}")
print(f"Moda da região: {df['regiao'].mode()[0]}")

# Medidas de dispersão
print(f"\\nDesvio padrão do PIB: {df['pib'].std():.2f}")
print(f"Coeficiente de variação: {(df['pib'].std()/df['pib'].mean())*100:.1f}%")
          `,
          explicacao: 'Estatísticas descritivas revelam padrões centrais e de dispersão nos dados, fundamentais para qualquer análise posterior.'
        },
        {
          nome: 'Visualizações Exploratórias',
          conteudo: `
import matplotlib.pyplot as plt
import seaborn as sns

# Configurar estilo
plt.style.use('seaborn-v0_8')
fig, axes = plt.subplots(2, 2, figsize=(15, 10))

# Histograma
axes[0,0].hist(df['pib'], bins=30, alpha=0.7)
axes[0,0].set_title('Distribuição do PIB Municipal')
axes[0,0].set_xlabel('PIB (em milhões)')

# Box plot
df.boxplot(column='pib', by='regiao', ax=axes[0,1])
axes[0,1].set_title('PIB por Região')

# Scatter plot
axes[1,0].scatter(df['populacao'], df['pib'], alpha=0.6)
axes[1,0].set_xlabel('População')
axes[1,0].set_ylabel('PIB')
axes[1,0].set_title('PIB vs População')

# Mapa de calor de correlações
corr_matrix = df.select_dtypes(include=[np.number]).corr()
sns.heatmap(corr_matrix, annot=True, ax=axes[1,1])
axes[1,1].set_title('Matriz de Correlação')

plt.tight_layout()
plt.show()
          `,
          explicacao: 'Visualizações revelam padrões que números isolados não mostram: distribuições, outliers, correlações e tendências.'
        }
      ]
    },
    {
      titulo: 'Machine Learning Aplicado a Dados Públicos',
      descricao: 'Implementação prática de algoritmos de ML',
      duracao: '60 min',
      nivel: 'Intermediário',
      etapas: [
        {
          nome: 'Preparação dos Dados',
          conteudo: `
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder

# Definir variáveis
features = ['populacao', 'area', 'densidade']
target = 'categoria_pib'  # 'baixo', 'medio', 'alto'

X = df[features]
y = df[target]

# Codificar variável categórica
le = LabelEncoder()
y_encoded = le.fit_transform(y)

# Dividir em treino e teste
X_train, X_test, y_train, y_test = train_test_split(
    X, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded
)

# Normalizar features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print(f"Treino: {X_train.shape[0]} amostras")
print(f"Teste: {X_test.shape[0]} amostras")
          `,
          explicacao: 'Preparação adequada é fundamental: divisão treino/teste, normalização e codificação de variáveis categóricas.'
        },
        {
          nome: 'Treinamento de Modelos',
          conteudo: `
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix

# Definir modelos
modelos = {
    'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42),
    'SVM': SVC(kernel='rbf', random_state=42),
    'Regressão Logística': LogisticRegression(random_state=42, max_iter=1000)
}

# Treinar e avaliar cada modelo
resultados = {}
for nome, modelo in modelos.items():
    # Treinar
    modelo.fit(X_train_scaled, y_train)
    
    # Predizer
    y_pred = modelo.predict(X_test_scaled)
    
    # Avaliar
    from sklearn.metrics import accuracy_score, f1_score
    acc = accuracy_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred, average='weighted')
    
    resultados[nome] = {'Acurácia': acc, 'F1-Score': f1}
    
    print(f"\\n{nome}:")
    print(f"Acurácia: {acc:.3f}")
    print(f"F1-Score: {f1:.3f}")

# Melhor modelo
melhor_modelo = max(resultados, key=lambda x: resultados[x]['Acurácia'])
print(f"\\nMelhor modelo: {melhor_modelo}")
          `,
          explicacao: 'Compare múltiplos algoritmos para encontrar o melhor para seus dados. Use métricas apropriadas para o problema.'
        }
      ]
    }
  ];

  const fundamentosEstatistica = [
    {
      conceito: 'Distribuição Normal',
      definicao: 'Distribuição simétrica em forma de sino, onde aproximadamente 68% dos dados estão dentro de 1 desvio padrão da média.',
      aplicacao: 'Teste de normalidade é pré-requisito para muitos testes paramétricos como t-test e ANOVA.',
      teste: `
from scipy.stats import shapiro, normaltest
from scipy import stats

# Teste de Shapiro-Wilk (n < 5000)
stat, p_value = shapiro(dados['variavel'])
if p_value > 0.05:
    print('Dados seguem distribuição normal')
else:
    print('Dados não seguem distribuição normal')

# Transformação para normalizar
dados_log = np.log(dados['variavel'] + 1)  # +1 para evitar log(0)
dados_sqrt = np.sqrt(dados['variavel'])
      `
    },
    {
      conceito: 'Significância Estatística',
      definicao: 'P-valor ≤ α (geralmente 0.05) indica que a diferença observada é estatisticamente significativa.',
      aplicacao: 'Determina se rejeitar ou não a hipótese nula em testes de hipóteses.',
      teste: `
# Interpretação do p-valor
def interpretar_p_valor(p_value, alpha=0.05):
    if p_value <= 0.001:
        return f"p = {p_value:.3f} - Evidência muito forte contra H₀"
    elif p_value <= 0.01:
        return f"p = {p_value:.3f} - Evidência forte contra H₀"
    elif p_value <= alpha:
        return f"p = {p_value:.3f} - Evidência moderada contra H₀"
    else:
        return f"p = {p_value:.3f} - Evidência insuficiente contra H₀"
      `
    },
    {
      conceito: 'Tamanho do Efeito',
      definicao: 'Medida da magnitude prática de uma diferença, independente da significância estatística.',
      aplicacao: 'Complementa o p-valor para avaliar se a diferença é praticamente relevante.',
      teste: `
# Cohen's d para tamanho do efeito
def cohens_d(grupo1, grupo2):
    n1, n2 = len(grupo1), len(grupo2)
    s = np.sqrt(((n1-1)*grupo1.var() + (n2-1)*grupo2.var()) / (n1+n2-2))
    return (grupo1.mean() - grupo2.mean()) / s

d = cohens_d(grupo_tratamento, grupo_controle)

# Interpretação
if abs(d) < 0.2:
    interpretacao = "Efeito pequeno"
elif abs(d) < 0.8:
    interpretacao = "Efeito médio"
else:
    interpretacao = "Efeito grande"
    
print(f"Cohen's d = {d:.3f} ({interpretacao})")
      `
    }
  ];

  const exemplosReais = [
    {
      titulo: 'Análise de Desempenho Educacional por Região',
      objetivo: 'Investigar se há diferenças significativas no IDEB entre regiões do Brasil',
      dataset: 'Microdados IDEB 2021 - INEP',
      link: 'https://www.gov.br/inep/pt-br/acesso-a-informacao/dados-abertos/microdados',
      metodologia: [
        'Análise exploratória dos dados',
        'Teste de normalidade (Shapiro-Wilk)',
        'ANOVA one-way para comparar regiões',
        'Teste post-hoc de Tukey para pares específicos',
        'Cálculo do tamanho do efeito (eta²)'
      ],
      resultados: 'Diferenças significativas encontradas (F=45.2, p<0.001), com região Sul apresentando maiores médias.',
      codigo_exemplo: `
# Carregar dados IDEB
ideb = pd.read_csv('ideb_municipios_2021.csv')

# Análise por região
por_regiao = ideb.groupby('regiao')['ideb'].agg(['mean', 'std', 'count'])
print(por_regiao)

# ANOVA
from scipy.stats import f_oneway
grupos = [ideb[ideb['regiao']==r]['ideb'] for r in ideb['regiao'].unique()]
f_stat, p_valor = f_oneway(*grupos)

print(f'F = {f_stat:.2f}, p = {p_valor:.3f}')
      `
    },
    {
      titulo: 'Correlação entre PIB e Indicadores de Saúde',
      objetivo: 'Analisar a relação entre desenvolvimento econômico e indicadores de saúde municipal',
      dataset: 'PIB Municipal (IBGE) + Dados SUS (DATASUS)',
      link: 'https://sidra.ibge.gov.br/tabela/5938',
      metodologia: [
        'Junção de datasets por código IBGE',
        'Limpeza e tratamento de outliers',
        'Análise de correlação de Pearson',
        'Regressão linear múltipla',
        'Validação de pressupostos da regressão'
      ],
      resultados: 'Correlação moderada positiva (r=0.64, p<0.001) entre PIB per capita e cobertura ESF.',
      codigo_exemplo: `
# Merge dos datasets
dados_completos = pib_municipal.merge(indicadores_saude, on='codigo_ibge')

# Correlação
from scipy.stats import pearsonr
r, p = pearsonr(dados_completos['pib_per_capita'], dados_completos['cobertura_esf'])

print(f'Correlação PIB vs Cobertura ESF: r = {r:.3f}, p = {p:.3f}')

# Regressão múltipla
from sklearn.linear_model import LinearRegression
X = dados_completos[['pib_per_capita', 'populacao', 'densidade']]
y = dados_completos['cobertura_esf']

modelo = LinearRegression().fit(X, y)
print(f'R² = {modelo.score(X, y):.3f}')
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
          📚 Centro Técnico de Conhecimento
        </Typography>
        <Typography variant="body1" sx={{ color: '#6b7280', mb: 3, maxWidth: 900 }}>
          Aprenda estatística e ciência de dados na prática. Cada método é explicado com fundamentação matemática,
          código Python real e exemplos usando datasets públicos brasileiros.
        </Typography>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          <strong>Metodologia:</strong> Cada análise inclui explicação teórica, implementação prática, 
          interpretação dos resultados e quando usar cada método.
        </Alert>
      </Box>

      {/* Tabs Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
          <Tab label="Métodos Estatísticos" icon={<Functions />} />
          <Tab label="Tutoriais Práticos" icon={<School />} />
          <Tab label="Fundamentos" icon={<Psychology />} />
          <Tab label="Casos Reais" icon={<Assessment />} />
        </Tabs>
      </Box>

      {/* Tab 1: Métodos Estatísticos */}
      <TabPanel value={tabValue} index={0}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          🔬 Métodos Estatísticos Explicados
        </Typography>
        <Grid container spacing={3}>
          {metodosEstatisticos.map((metodo, index) => (
            <Grid item xs={12} key={index}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Functions sx={{ mr: 2, color: '#2563eb' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {metodo.nome}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        📐 Fórmula:
                      </Typography>
                      <Paper sx={{ p: 2, mb: 2, backgroundColor: '#f8fafc' }}>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>
                          {metodo.formula}
                        </Typography>
                      </Paper>

                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        🎯 Quando usar:
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {metodo.quando}
                      </Typography>

                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        📊 Interpretação:
                      </Typography>
                      <List dense>
                        {metodo.interpretacao.map((item, i) => (
                          <ListItem key={i}>
                            <ListItemIcon>
                              <CheckCircle sx={{ fontSize: 16, color: '#10b981' }} />
                            </ListItemIcon>
                            <ListItemText 
                              primary={item}
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        ))}
                      </List>

                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        💡 Exemplo prático:
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#6b7280', fontStyle: 'italic' }}>
                        {metodo.exemplo}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        💻 Código Python:
                      </Typography>
                      <Paper sx={{ p: 2, backgroundColor: '#1f2937', color: '#f9fafb', overflow: 'auto' }}>
                        <pre style={{ fontSize: '0.85rem', margin: 0, whiteSpace: 'pre-wrap' }}>
                          {metodo.codigo}
                        </pre>
                      </Paper>
                      
                      <Button
                        variant="contained"
                        startIcon={<PlayArrow />}
                        sx={{ mt: 2 }}
                        onClick={() => navigator.clipboard.writeText(metodo.codigo)}
                      >
                        Copiar Código
                      </Button>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Tab 2: Tutoriais Práticos */}
      <TabPanel value={tabValue} index={1}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          🎓 Tutoriais Passo-a-Passo
        </Typography>
        <Grid container spacing={4}>
          {tutoriaisCompletos.map((tutorial, index) => (
            <Grid item xs={12} key={index}>
              <Card sx={{ border: '1px solid #e5e7eb' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <School sx={{ mr: 2, color: '#2563eb' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {tutorial.titulo}
                    </Typography>
                    <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
                      <Chip label={tutorial.nivel} size="small" color="primary" />
                      <Chip label={tutorial.duracao} size="small" variant="outlined" />
                    </Box>
                  </Box>
                  
                  <Typography variant="body2" sx={{ color: '#6b7280', mb: 3 }}>
                    {tutorial.descricao}
                  </Typography>

                  <Stepper activeStep={activeStep} orientation="vertical">
                    {tutorial.etapas.map((etapa, stepIndex) => (
                      <Step key={stepIndex}>
                        <StepLabel>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {etapa.nome}
                          </Typography>
                        </StepLabel>
                        <StepContent>
                          <Typography variant="body2" sx={{ mb: 2 }}>
                            {etapa.explicacao}
                          </Typography>
                          
                          <Paper sx={{ p: 2, backgroundColor: '#1f2937', color: '#f9fafb', mb: 2 }}>
                            <pre style={{ fontSize: '0.8rem', margin: 0, whiteSpace: 'pre-wrap' }}>
                              {etapa.conteudo}
                            </pre>
                          </Paper>

                          <Box sx={{ mb: 2 }}>
                            <Button
                              variant="contained"
                              onClick={handleNext}
                              sx={{ mt: 1, mr: 1 }}
                              disabled={stepIndex === tutorial.etapas.length - 1}
                            >
                              {stepIndex === tutorial.etapas.length - 1 ? 'Finalizar' : 'Próximo'}
                            </Button>
                            <Button
                              disabled={stepIndex === 0}
                              onClick={handleBack}
                              sx={{ mt: 1, mr: 1 }}
                            >
                              Voltar
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>
                  
                  {activeStep === tutorial.etapas.length && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                      <Typography>Tutorial completo! Parabéns!</Typography>
                      <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Recomeçar
                      </Button>
                    </Paper>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Tab 3: Fundamentos */}
      <TabPanel value={tabValue} index={2}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          🧠 Fundamentos da Estatística
        </Typography>
        <Grid container spacing={3}>
          {fundamentosEstatistica.map((fundamento, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ height: '100%', border: '1px solid #e5e7eb' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1f2937' }}>
                    {fundamento.conceito}
                  </Typography>
                  
                  <Typography variant="body2" sx={{ mb: 2, color: '#6b7280' }}>
                    <strong>Definição:</strong> {fundamento.definicao}
                  </Typography>
                  
                  <Typography variant="body2" sx={{ mb: 2, color: '#6b7280' }}>
                    <strong>Aplicação:</strong> {fundamento.aplicacao}
                  </Typography>

                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Exemplo em Python:
                  </Typography>
                  <Paper sx={{ p: 2, backgroundColor: '#1f2937', color: '#f9fafb' }}>
                    <pre style={{ fontSize: '0.75rem', margin: 0, whiteSpace: 'pre-wrap' }}>
                      {fundamento.teste}
                    </pre>
                  </Paper>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Tab 4: Casos Reais */}
      <TabPanel value={tabValue} index={3}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          🎯 Estudos de Caso com Dados Reais
        </Typography>
        <Grid container spacing={4}>
          {exemplosReais.map((caso, index) => (
            <Grid item xs={12} key={index}>
              <Card sx={{ border: '1px solid #e5e7eb' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1f2937' }}>
                    {caso.titulo}
                  </Typography>
                  
                  <Typography variant="body2" sx={{ mb: 2, color: '#6b7280' }}>
                    <strong>Objetivo:</strong> {caso.objetivo}
                  </Typography>
                  
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <strong>Dataset:</strong> {caso.dataset} 
                    <Button
                      size="small"
                      href={caso.link}
                      target="_blank"
                      sx={{ ml: 1, textTransform: 'none' }}
                    >
                      Acessar dados
                    </Button>
                  </Typography>

                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Metodologia aplicada:
                  </Typography>
                  <List dense>
                    {caso.metodologia.map((metodo, i) => (
                      <ListItem key={i}>
                        <ListItemIcon>
                          <CheckCircle sx={{ fontSize: 16, color: '#10b981' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={metodo}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Alert severity="success" sx={{ my: 2 }}>
                    <strong>Resultados:</strong> {caso.resultados}
                  </Alert>

                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        Ver código de exemplo
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Paper sx={{ p: 2, backgroundColor: '#1f2937', color: '#f9fafb' }}>
                        <pre style={{ fontSize: '0.8rem', margin: 0, whiteSpace: 'pre-wrap' }}>
                          {caso.codigo_exemplo}
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
    </Box>
  );
};

export default LearningCenterTecnico;
