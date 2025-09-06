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

  // ==========================================
  // SEÇÃO: PYTHON & PANDAS FUNDAMENTAIS
  // ==========================================
  const topicosPythonPandas: Topico[] = [
    {
      id: 'python-fundamentos-datascience',
      titulo: 'Python Fundamentais para Data Science',
      nivel: 'Iniciante',
      tempo: '90 min',
      descricao: 'Domine Python essencial para análise de dados: estruturas, bibliotecas, manipulação de dados e melhores práticas.',
      passos: [
        {
          numero: 1,
          titulo: 'Configuração do Ambiente Python',
          descricao: 'Setup completo do ambiente Python para Data Science com as bibliotecas essenciais.',
          codigo: `# ==========================================
# SETUP PYTHON PARA DATA SCIENCE (2025)
# ==========================================

# 1. INSTALAÇÃO ANACONDA (Recomendado)
# Download: https://www.anaconda.com/products/distribution
# Inclui: Python + Jupyter + 250+ pacotes científicos

# 2. VERIFICAR INSTALAÇÃO
import sys
print(f"Python version: {sys.version}")
print(f"Python executable: {sys.executable}")

# 3. BIBLIOTECAS ESSENCIAIS
import pandas as pd           # Manipulação de dados
import numpy as np           # Computação numérica
import matplotlib.pyplot as plt  # Visualização básica
import seaborn as sns        # Visualização estatística
import plotly.express as px  # Visualização interativa
import scipy.stats as stats  # Estatística
import sklearn              # Machine Learning
import warnings
warnings.filterwarnings('ignore')

# 4. CONFIGURAÇÕES INICIAIS
pd.set_option('display.max_columns', None)  # Mostrar todas colunas
pd.set_option('display.max_rows', 100)     # Limitar linhas
pd.set_option('display.width', 1000)      # Largura da exibição
pd.set_option('display.precision', 2)      # Precisão decimal

# 5. VERIFICAR VERSÕES
print("\\n=== VERSÕES DAS BIBLIOTECAS ===")
print(f"Pandas: {pd.__version__}")
print(f"NumPy: {np.__version__}")
print(f"Matplotlib: {plt.matplotlib.__version__}")
print(f"Seaborn: {sns.__version__}")

# 6. JUPYTER EXTENSIONS (Opcional)
# pip install jupyter_contrib_nbextensions
# jupyter contrib nbextension install --user
# jupyter nbextension enable --py widgetsnbextension`,
          dica: 'Use Anaconda para uma instalação completa e fácil. Evita conflitos de dependências.',
          resultado: 'Ambiente Python configurado e pronto para Data Science'
        },
        {
          numero: 2,
          titulo: 'Estruturas de Dados Python Essenciais',
          descricao: 'Listas, dicionários, sets e tuplas aplicados em análise de dados.',
          codigo: `# ==========================================
# ESTRUTURAS DE DADOS PARA DATA SCIENCE
# ==========================================

# 1. LISTAS - Sequências ordenadas mutáveis
vendas_mensais = [15000, 18000, 22000, 19000, 25000, 30000]
produtos = ['Notebook', 'Mouse', 'Teclado', 'Monitor']

# Operações úteis
print(f"Total vendas: R$ {sum(vendas_mensais):,.2f}")
print(f"Média mensal: R$ {np.mean(vendas_mensais):,.2f}")
print(f"Mês com maior venda: {vendas_mensais.index(max(vendas_mensais)) + 1}")

# List comprehensions (muito úteis!)
vendas_trimestre = [venda for venda in vendas_mensais if venda > 20000]
vendas_percentual = [venda / sum(vendas_mensais) * 100 for venda in vendas_mensais]

# 2. DICIONÁRIOS - Mapeamento chave-valor
dados_cliente = {
    'nome': 'João Silva',
    'idade': 35,
    'cidade': 'São Paulo',
    'compras': [1200, 800, 1500],
    'ativo': True
}

# Criando dicionário de vendas por região
vendas_regiao = {
    'Norte': 45000,
    'Nordeste': 67000,
    'Centro-Oeste': 38000,
    'Sudeste': 125000,
    'Sul': 89000
}

# Análises com dicionários
print(f"\\nRegião com maior venda: {max(vendas_regiao, key=vendas_regiao.get)}")
print(f"Total nacional: R$ {sum(vendas_regiao.values()):,.2f}")

# 3. SETS - Conjuntos únicos
clientes_janeiro = {'João', 'Maria', 'Pedro', 'Ana', 'Carlos'}
clientes_fevereiro = {'Maria', 'Pedro', 'Lucas', 'Carla', 'João'}

# Análise de intersecção
clientes_fieis = clientes_janeiro.intersection(clientes_fevereiro)
novos_clientes = clientes_fevereiro.difference(clientes_janeiro)
clientes_perdidos = clientes_janeiro.difference(clientes_fevereiro)

print(f"\\nClientes fiéis: {clientes_fieis}")
print(f"Novos clientes: {novos_clientes}")
print(f"Clientes perdidos: {clientes_perdidos}")

# 4. TUPLAS - Sequências imutáveis
coordenadas_lojas = [
    ('Loja Centro', -23.5505, -46.6333),
    ('Loja Norte', -23.4858, -46.6544),
    ('Loja Sul', -23.6821, -46.6875)
]

# Desempacotamento de tuplas
for nome, lat, lon in coordenadas_lojas:
    print(f"{nome}: Lat {lat}, Lon {lon}")`,
          dica: 'List comprehensions são 2-3x mais rápidas que loops tradicionais. Use-as sempre que possível!',
          resultado: 'Domínio das estruturas fundamentais para manipulação de dados'
        },
        {
          numero: 3,
          titulo: 'NumPy - Arrays Numéricos Eficientes',
          descricao: 'NumPy é a base de todas bibliotecas científicas Python. Arrays são 50x mais rápidos que listas.',
          codigo: `# ==========================================
# NUMPY - COMPUTAÇÃO NUMÉRICA EFICIENTE
# ==========================================

import numpy as np
import time

# 1. CRIAÇÃO DE ARRAYS
# Arrays 1D
vendas = np.array([1000, 1200, 800, 1500, 2000])
print(f"Vendas: {vendas}")
print(f"Tipo: {vendas.dtype}")

# Arrays 2D (matriz)
vendas_matriz = np.array([
    [1000, 1200, 800],   # Janeiro
    [1100, 1300, 900],   # Fevereiro
    [1200, 1400, 1000]   # Março
])
print(f"\\nShape da matriz: {vendas_matriz.shape}")
print(f"Vendas por mês:\\n{vendas_matriz}")

# 2. OPERAÇÕES VETORIZADAS (MUITO RÁPIDAS!)
# Comparação de performance
lista_python = list(range(1000000))
array_numpy = np.arange(1000000)

# Operação com lista Python
start = time.time()
resultado_lista = [x * 2 for x in lista_python]
tempo_lista = time.time() - start

# Operação com NumPy
start = time.time()
resultado_numpy = array_numpy * 2
tempo_numpy = time.time() - start

print(f"\\n=== PERFORMANCE COMPARISON ===")
print(f"Lista Python: {tempo_lista:.4f} segundos")
print(f"NumPy Array: {tempo_numpy:.4f} segundos")
print(f"NumPy é {tempo_lista/tempo_numpy:.1f}x mais rápido!")

# 3. OPERAÇÕES ESTATÍSTICAS
vendas_anuais = np.random.normal(1500, 300, 12)  # 12 meses

print(f"\\n=== ESTATÍSTICAS VENDAS ANUAIS ===")
print(f"Média: R$ {np.mean(vendas_anuais):.2f}")
print(f"Mediana: R$ {np.median(vendas_anuais):.2f}")
print(f"Desvio padrão: R$ {np.std(vendas_anuais):.2f}")
print(f"Mínimo: R$ {np.min(vendas_anuais):.2f}")
print(f"Máximo: R$ {np.max(vendas_anuais):.2f}")
print(f"Percentil 25: R$ {np.percentile(vendas_anuais, 25):.2f}")
print(f"Percentil 75: R$ {np.percentile(vendas_anuais, 75):.2f}")

# 4. INDEXAÇÃO E FATIAMENTO
dados = np.arange(20).reshape(4, 5)
print(f"\\nMatriz original:\\n{dados}")

# Seleções específicas
print(f"Primeira linha: {dados[0]}")
print(f"Última coluna: {dados[:, -1]}")
print(f"Submatriz 2x2: \\n{dados[1:3, 2:4]}")

# Indexação booleana (MUITO ÚTIL!)
vendas_produto = np.array([800, 1200, 600, 1800, 900, 2000, 1100])
vendas_altas = vendas_produto[vendas_produto > 1000]
print(f"\\nVendas > 1000: {vendas_altas}")

# 5. BROADCASTING - Operações entre arrays de shapes diferentes
precos = np.array([[100], [200], [300]])  # 3x1
descontos = np.array([0.1, 0.15, 0.2])    # 1x3

# Broadcasting automático
precos_finais = precos * (1 - descontos)
print(f"\\nPreços com desconto:\\n{precos_finais}")

# 6. FUNÇÕES MATEMÁTICAS AVANÇADAS
angulos = np.linspace(0, 2*np.pi, 100)
seno = np.sin(angulos)
cosseno = np.cos(angulos)

# Operações de álgebra linear
matriz_a = np.random.randn(3, 3)
matriz_b = np.random.randn(3, 3)

produto_matricial = np.dot(matriz_a, matriz_b)
determinante = np.linalg.det(matriz_a)
autovalores = np.linalg.eigvals(matriz_a)

print(f"\\nDeterminante: {determinante:.3f}")
print(f"Autovalores: {autovalores}")`,
          dica: 'NumPy arrays são imutáveis em tamanho mas permitem operações vetorizadas extremamente rápidas.',
          resultado: 'Computação numérica eficiente com arrays multidimensionais'
        }
      ],
      exemplos: [
        {
          titulo: 'Análise de Performance: Lista vs NumPy',
          codigo: `import numpy as np
import time

# Criar dados grandes
n = 1000000
lista = list(range(n))
array = np.arange(n)

# Teste: soma de todos elementos
start = time.time()
soma_lista = sum(lista)
tempo_lista = time.time() - start

start = time.time()
soma_array = np.sum(array)
tempo_array = time.time() - start

print(f"Lista: {tempo_lista:.4f}s")
print(f"NumPy: {tempo_array:.4f}s")
print(f"Speedup: {tempo_lista/tempo_array:.1f}x")`,
          explicacao: 'NumPy é implementado em C, resultando em performance muito superior',
          saida: 'Lista: 0.0234s\\nNumPy: 0.0008s\\nSpeedup: 29.3x'
        }
      ],
      exercicios: ['Criar arrays com dados de vendas', 'Calcular métricas estatísticas', 'Implementar operações vetorizadas'],
      recursos: ['NumPy Documentation', 'NumPy Tutorial', 'Scientific Python Lectures']
    },
    {
      id: 'pandas-filtering-masterclass',
      titulo: 'Pandas - Masterclass de Filtragem de Dados',
      nivel: 'Intermediário',
      tempo: '120 min',
      descricao: 'Domine todas as técnicas de filtragem no Pandas: boolean indexing, query(), isin(), filtros complexos e performance.',
      passos: [
        {
          numero: 1,
          titulo: 'DataFrame Básico e Primeiros Filtros',
          descricao: 'Criação de DataFrames e filtros fundamentais usando boolean indexing.',
          codigo: `# ==========================================
# PANDAS FILTERING - GUIA COMPLETO 2025
# ==========================================

import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# 1. CRIANDO DATASET EXEMPLO REALISTA
np.random.seed(42)

n_records = 50000
data = {
    'cliente_id': np.random.randint(1000, 9999, n_records),
    'nome': [f'Cliente_{i}' for i in range(n_records)],
    'idade': np.random.randint(18, 80, n_records),
    'cidade': np.random.choice(['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 
                                'Porto Alegre', 'Salvador', 'Fortaleza'], n_records),
    'estado': np.random.choice(['SP', 'RJ', 'MG', 'RS', 'BA', 'CE'], n_records),
    'valor_compra': np.random.exponential(500, n_records),
    'categoria': np.random.choice(['Eletrônicos', 'Roupas', 'Casa', 'Esportes', 'Livros'], n_records),
    'data_compra': pd.date_range('2024-01-01', periods=n_records, freq='H'),
    'desconto': np.random.uniform(0, 0.3, n_records),
    'ativo': np.random.choice([True, False], n_records, p=[0.8, 0.2])
}

df = pd.DataFrame(data)
print(f"Dataset criado com {len(df):,} registros")
print(f"Memória utilizada: {df.memory_usage(deep=True).sum() / 1024**2:.1f} MB")

# 2. INFORMAÇÕES BÁSICAS DO DATASET
print("\\n=== INFORMAÇÕES DO DATASET ===")
print(df.info())
print("\\n=== PRIMEIRAS 5 LINHAS ===")
print(df.head())

# 3. FILTROS BÁSICOS COM BOOLEAN INDEXING
print("\\n=== FILTROS BÁSICOS ===")

# Filtro simples: clientes acima de 30 anos
clientes_30_plus = df[df['idade'] > 30]
print(f"Clientes > 30 anos: {len(clientes_30_plus):,}")

# Filtro por valor: compras acima de R$ 1000
compras_altas = df[df['valor_compra'] > 1000]
print(f"Compras > R$ 1000: {len(compras_altas):,}")

# Filtro por string: clientes de São Paulo
clientes_sp = df[df['cidade'] == 'São Paulo']
print(f"Clientes de SP: {len(clientes_sp):,}")

# Filtro por boolean: apenas clientes ativos
clientes_ativos = df[df['ativo'] == True]
print(f"Clientes ativos: {len(clientes_ativos):,}")`,
          dica: 'Boolean indexing é a forma mais básica e intuitiva de filtrar dados no Pandas.',
          resultado: 'DataFrame filtrado com condições simples'
        },
        {
          numero: 2,
          titulo: 'Filtros Avançados e Múltiplas Condições',
          descricao: 'Combine múltiplas condições usando operadores lógicos (&, |, ~) e parênteses.',
          codigo: `# ==========================================
# FILTROS AVANÇADOS - MÚLTIPLAS CONDIÇÕES
# ==========================================

# 4. OPERADORES LÓGICOS (& = AND, | = OR, ~ = NOT)
print("\\n=== FILTROS COM MÚLTIPLAS CONDIÇÕES ===")

# AND (&): Clientes jovens de SP com compras altas
jovens_sp_compras_altas = df[
    (df['idade'] < 30) & 
    (df['cidade'] == 'São Paulo') & 
    (df['valor_compra'] > 800)
]
print(f"Jovens SP com compras > R$ 800: {len(jovens_sp_compras_altas):,}")

# OR (|): Clientes de SP ou RJ
clientes_sp_rj = df[
    (df['cidade'] == 'São Paulo') | 
    (df['cidade'] == 'Rio de Janeiro')
]
print(f"Clientes SP ou RJ: {len(clientes_sp_rj):,}")

# NOT (~): Clientes não ativos
clientes_inativos = df[~df['ativo']]
print(f"Clientes inativos: {len(clientes_inativos):,}")

# 5. FILTROS POR FAIXAS DE VALORES
print("\\n=== FILTROS POR FAIXAS ===")

# Between: idades entre 25 e 40 anos
clientes_25_40 = df[df['idade'].between(25, 40)]
print(f"Clientes entre 25-40 anos: {len(clientes_25_40):,}")

# Percentis: compras no top 10%
p90 = df['valor_compra'].quantile(0.9)
top_10_percent = df[df['valor_compra'] >= p90]
print(f"Top 10% compras (≥ R$ {p90:.2f}): {len(top_10_percent):,}")

# Outliers: usando IQR (Interquartile Range)
Q1 = df['valor_compra'].quantile(0.25)
Q3 = df['valor_compra'].quantile(0.75)
IQR = Q3 - Q1
limite_inferior = Q1 - 1.5 * IQR
limite_superior = Q3 + 1.5 * IQR

outliers = df[
    (df['valor_compra'] < limite_inferior) | 
    (df['valor_compra'] > limite_superior)
]
print(f"Outliers detectados: {len(outliers):,}")

# 6. FILTROS COM ISIN() - MÚLTIPLOS VALORES
print("\\n=== FILTROS COM ISIN() ===")

# Múltiplas cidades
cidades_interesse = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte']
clientes_principais_cidades = df[df['cidade'].isin(cidades_interesse)]
print(f"Clientes em cidades principais: {len(clientes_principais_cidades):,}")

# Múltiplas categorias
categorias_tech = ['Eletrônicos', 'Livros']
compras_tech = df[df['categoria'].isin(categorias_tech)]
print(f"Compras tech: {len(compras_tech):,}")

# 7. FILTROS POR DATA/TEMPO
print("\\n=== FILTROS TEMPORAIS ===")

# Últimos 30 dias
data_limite = df['data_compra'].max() - timedelta(days=30)
compras_recentes = df[df['data_compra'] >= data_limite]
print(f"Compras últimos 30 dias: {len(compras_recentes):,}")

# Por mês específico
janeiro_2024 = df[
    (df['data_compra'].dt.year == 2024) & 
    (df['data_compra'].dt.month == 1)
]
print(f"Compras janeiro 2024: {len(janeiro_2024):,}")

# Por dia da semana (0=Segunda, 6=Domingo)
fins_de_semana = df[df['data_compra'].dt.dayofweek.isin([5, 6])]
print(f"Compras fim de semana: {len(fins_de_semana):,}")`,
          dica: 'Sempre use parênteses ao combinar condições! df[(cond1) & (cond2)] evita erros.',
          resultado: 'Filtros complexos com múltiplas condições lógicas'
        },
        {
          numero: 3,
          titulo: 'Método query() - SQL-like Syntax',
          descricao: 'Use query() para filtros mais legíveis, especialmente com múltiplas condições.',
          codigo: `# ==========================================
# MÉTODO QUERY() - SINTAXE SQL-LIKE
# ==========================================

# 8. QUERY() - SINTAXE MAIS LIMPA E LEGÍVEL
print("\\n=== USANDO QUERY() METHOD ===")

# Equivalente ao boolean indexing, mas mais legível
jovens_sp_query = df.query("idade < 30 and cidade == 'São Paulo'")
print(f"Jovens SP (query): {len(jovens_sp_query):,}")

# Múltiplas condições complexas
filtro_complexo = df.query("""
    idade between 25 and 45 and
    valor_compra > 500 and
    cidade in ['São Paulo', 'Rio de Janeiro'] and
    ativo == True and
    categoria != 'Livros'
""")
print(f"Filtro complexo: {len(filtro_complexo):,}")

# Usando variáveis externas com @
idade_minima = 35
valor_minimo = 1000
cidades_target = ['São Paulo', 'Belo Horizonte']

filtro_com_variaveis = df.query("""
    idade >= @idade_minima and
    valor_compra >= @valor_minimo and
    cidade in @cidades_target
""")
print(f"Filtro com variáveis: {len(filtro_com_variaveis):,}")

# 9. PERFORMANCE: QUERY() vs BOOLEAN INDEXING
import time

# Filtro complexo - boolean indexing
start_time = time.time()
resultado_bool = df[
    (df['idade'] > 30) & 
    (df['valor_compra'] > 500) & 
    (df['cidade'].isin(['São Paulo', 'Rio de Janeiro']))
]
tempo_bool = time.time() - start_time

# Mesmo filtro - query()
start_time = time.time()
resultado_query = df.query("""
    idade > 30 and 
    valor_compra > 500 and 
    cidade in ['São Paulo', 'Rio de Janeiro']
""")
tempo_query = time.time() - start_time

print(f"\\n=== COMPARAÇÃO DE PERFORMANCE ===")
print(f"Boolean indexing: {tempo_bool:.4f}s")
print(f"Query method: {tempo_query:.4f}s")
print(f"Resultados iguais: {len(resultado_bool) == len(resultado_query)}")

# 10. FILTROS COM EXPRESSÕES REGULARES
print("\\n=== FILTROS COM REGEX ===")

# Nomes que começam com determinada letra
nomes_com_c = df[df['nome'].str.startswith('Cliente_1')]
print(f"Nomes que começam com 'Cliente_1': {len(nomes_com_c):,}")

# Usando contains para busca parcial
# (Simularemos emails para exemplo)
df['email'] = df['nome'].str.lower() + '@' + df['cidade'].str.replace(' ', '').str.lower() + '.com'
emails_gmail = df[df['email'].str.contains('@saulo|@rio', case=False)]
print(f"Emails com 'saulo' ou 'rio': {len(emails_gmail):,}")

# Regex mais complexo: CEPs (simulados)
df['cep'] = np.random.randint(10000, 99999, len(df)).astype(str) + '-' + np.random.randint(100, 999, len(df)).astype(str)
ceps_sp = df[df['cep'].str.match(r'^[0-1]\\d{4}-\\d{3}$')]  # CEPs que começam com 0 ou 1
print(f"CEPs padrão SP: {len(ceps_sp):,}")`,
          dica: 'query() é mais legível para filtros complexos e permite usar variáveis externas com @.',
          resultado: 'Filtros SQL-like mais legíveis e maintíveis'
        },
        {
          numero: 4,
          titulo: 'Filtros Avançados e Otimização de Performance',
          descricao: 'Técnicas avançadas: groupby + filter, filtros com apply, e otimizações para datasets grandes.',
          codigo: `# ==========================================
# FILTROS AVANÇADOS E PERFORMANCE
# ==========================================

# 11. GROUPBY + FILTER - FILTROS BASEADOS EM GRUPOS
print("\\n=== GROUPBY + FILTER ===")

# Clientes com compras acima da média do seu estado
def filter_above_state_avg(group):
    avg_valor = group['valor_compra'].mean()
    return group[group['valor_compra'] > avg_valor]

clientes_acima_media_estado = df.groupby('estado').apply(filter_above_state_avg).reset_index(drop=True)
print(f"Clientes acima da média do estado: {len(clientes_acima_media_estado):,}")

# Top 10% clientes por cidade
def top_10_percent_city(group):
    threshold = group['valor_compra'].quantile(0.9)
    return group[group['valor_compra'] >= threshold]

top_clientes_cidade = df.groupby('cidade').apply(top_10_percent_city).reset_index(drop=True)
print(f"Top 10% por cidade: {len(top_clientes_cidade):,}")

# 12. FILTROS COM APPLY() E LAMBDA
print("\\n=== FILTROS COM APPLY() ===")

# Função customizada para classificar clientes
def classificar_cliente(row):
    if row['idade'] < 30 and row['valor_compra'] > 800:
        return 'Jovem Premium'
    elif row['idade'] >= 30 and row['valor_compra'] > 1200:
        return 'Adulto Premium'
    elif row['valor_compra'] < 200:
        return 'Econômico'
    else:
        return 'Padrão'

# Aplicar classificação
df['classificacao'] = df.apply(classificar_cliente, axis=1)

# Filtrar por classificação
clientes_premium = df[df['classificacao'].str.contains('Premium')]
print(f"Clientes Premium: {len(clientes_premium):,}")

# 13. FILTROS COM WHERE() - PRESERVA SHAPE
print("\\n=== USANDO WHERE() ===")

# where() substitui valores não atendidos por NaN
vendas_altas_where = df['valor_compra'].where(df['valor_compra'] > 1000)
print(f"Valores > 1000 (com NaN): {vendas_altas_where.count():,} de {len(df):,}")

# Combinar where() com dropna()
vendas_altas_clean = df['valor_compra'].where(df['valor_compra'] > 1000).dropna()
print(f"Valores > 1000 (sem NaN): {len(vendas_altas_clean):,}")

# 14. OTIMIZAÇÕES DE PERFORMANCE
print("\\n=== OTIMIZAÇÕES DE PERFORMANCE ===")

# Categorical data para colunas repetitivas
df_optimized = df.copy()
for col in ['cidade', 'estado', 'categoria']:
    df_optimized[col] = df_optimized[col].astype('category')

print(f"Memória original: {df.memory_usage(deep=True).sum() / 1024**2:.1f} MB")
print(f"Memória otimizada: {df_optimized.memory_usage(deep=True).sum() / 1024**2:.1f} MB")

# Index para consultas frequentes
df_indexed = df.set_index('cliente_id')
start_time = time.time()
cliente_especifico = df_indexed.loc[1234] if 1234 in df_indexed.index else None
tempo_indexed = time.time() - start_time

start_time = time.time()
cliente_filter = df[df['cliente_id'] == 1234]
tempo_filter = time.time() - start_time

print(f"Busca com index: {tempo_indexed:.6f}s")
print(f"Busca com filter: {tempo_filter:.6f}s")

# 15. SAMPLE E NLARGEST/NSMALLEST
print("\\n=== SAMPLING E ORDENAÇÃO ===")

# Amostra aleatória
amostra = df.sample(n=1000, random_state=42)
print(f"Amostra aleatória: {len(amostra):,} registros")

# Top N registros
top_10_vendas = df.nlargest(10, 'valor_compra')[['nome', 'valor_compra', 'cidade']]
print("\\nTop 10 vendas:")
print(top_10_vendas.to_string(index=False))

# Bottom N registros
bottom_5_vendas = df.nsmallest(5, 'valor_compra')[['nome', 'valor_compra', 'categoria']]
print("\\nBottom 5 vendas:")
print(bottom_5_vendas.to_string(index=False))

# 16. FILTROS AVANÇADOS COM EVAL()
print("\\n=== USANDO EVAL() PARA PERFORMANCE ===")

# eval() é mais rápido para expressões complexas
start_time = time.time()
resultado_normal = df[(df['valor_compra'] > 500) & (df['idade'] > 25) & (df['desconto'] < 0.2)]
tempo_normal = time.time() - start_time

start_time = time.time()
resultado_eval = df[df.eval('valor_compra > 500 and idade > 25 and desconto < 0.2')]
tempo_eval = time.time() - start_time

print(f"Filtro normal: {tempo_normal:.4f}s")
print(f"Filtro eval(): {tempo_eval:.4f}s")
print(f"Speedup: {tempo_normal/tempo_eval:.1f}x")`,
          dica: 'Para datasets grandes (>100MB), use eval() e query() para melhor performance.',
          resultado: 'Filtros otimizados para máxima performance em grandes datasets'
        }
      ],
      exemplos: [
        {
          titulo: 'Filtro de Clientes Premium por Estado',
          codigo: `# Clientes premium: Top 20% em valor e idade > 35
def find_premium_customers(df):
    threshold = df['valor_compra'].quantile(0.8)
    return df.query(f'''
        valor_compra >= {threshold} and 
        idade > 35 and 
        ativo == True
    ''').groupby('estado').size()

premium_by_state = find_premium_customers(df)
print(premium_by_state.sort_values(ascending=False))`,
          explicacao: 'Combina percentis, filtros múltiplos e agregação por grupo',
          saida: 'SP    245\\nRJ    189\\nMG    156\\n...'
        },
        {
          titulo: 'Análise de Sazonalidade com Filtros',
          codigo: `# Vendas por trimestre e categoria
df['trimestre'] = df['data_compra'].dt.quarter
vendas_trimestre = df.groupby(['trimestre', 'categoria'])['valor_compra'].agg([
    'count', 'sum', 'mean'
]).round(2)

# Filtrar apenas categorias com > 1000 vendas
categorias_populares = vendas_trimestre[vendas_trimestre['count'] > 1000]
print(categorias_populares)`,
          explicacao: 'Filtros temporais combinados com agregações condicionais',
          saida: 'trimestre categoria     count    sum      mean\\n1        Eletrônicos  1234   567890.5  460.23'
        }
      ],
      exercicios: [
        'Filtrar clientes premium por região',
        'Identificar outliers em vendas',
        'Análise temporal de padrões de compra',
        'Segmentação de clientes multicriterial'
      ],
      recursos: [
        'Pandas Filtering Documentation',
        'Boolean Indexing Guide',
        'Query Method Tutorial',
        'Performance Optimization Tips'
      ]
    },
    {
      id: 'pandas-performance-avancado',
      titulo: 'Pandas Performance e Big Data Manipulation',
      nivel: 'Avançado',
      tempo: '180 min',
      descricao: 'Técnicas avançadas para manipular datasets grandes com Pandas: chunking, dtypes optimization, parallel processing e integração com Dask.',
      passos: [
        {
          numero: 1,
          titulo: 'Otimização de Memória e Dtypes',
          descricao: 'Reduza o uso de memória em até 90% com otimização de tipos de dados e técnicas de compression.',
          codigo: `# ==========================================
# PANDAS PERFORMANCE - OTIMIZAÇÃO AVANÇADA
# ==========================================

import pandas as pd
import numpy as np
import sys
from datetime import datetime
import gc

# 1. ANÁLISE DE MEMÓRIA DETALHADA
def analyze_memory_usage(df, name="DataFrame"):
    """Analisa uso detalhado de memória"""
    print(f"\\n=== ANÁLISE DE MEMÓRIA: {name} ===")
    
    # Memória total
    total_memory = df.memory_usage(deep=True).sum()
    print(f"Memória total: {total_memory / 1024**2:.2f} MB")
    
    # Por coluna
    memory_per_col = df.memory_usage(deep=True)
    for col, memory in memory_per_col.items():
        if col != 'Index':
            print(f"{col}: {memory / 1024**2:.2f} MB ({df[col].dtype})")
    
    # Estatísticas gerais
    print(f"Shape: {df.shape}")
    print(f"Memória por linha: {total_memory / len(df):.2f} bytes")

# Criar dataset exemplo grande
np.random.seed(42)
n_rows = 1000000

# Dataset não otimizado
data_raw = {
    'id': range(n_rows),
    'category': np.random.choice(['A', 'B', 'C', 'D', 'E'] * 100, n_rows),
    'subcategory': np.random.choice([f'Sub_{i}' for i in range(50)], n_rows),
    'value': np.random.normal(1000, 200, n_rows),
    'quantity': np.random.randint(1, 1000, n_rows),
    'price': np.random.exponential(50, n_rows),
    'date': pd.date_range('2020-01-01', periods=n_rows, freq='min'),
    'is_premium': np.random.choice([True, False], n_rows),
    'rating': np.random.uniform(1, 5, n_rows),
    'region': np.random.choice(['North', 'South', 'East', 'West'], n_rows)
}

df_raw = pd.DataFrame(data_raw)
analyze_memory_usage(df_raw, "DataFrame Original")

# 2. OTIMIZAÇÃO DE DTYPES
def optimize_dtypes(df):
    """Otimiza tipos de dados automaticamente"""
    df_optimized = df.copy()
    
    for col in df_optimized.columns:
        col_type = df_optimized[col].dtype
        
        # Otimizar inteiros
        if col_type == 'int64':
            min_val = df_optimized[col].min()
            max_val = df_optimized[col].max()
            
            if min_val >= 0:  # Unsigned
                if max_val < 255:
                    df_optimized[col] = df_optimized[col].astype('uint8')
                elif max_val < 65535:
                    df_optimized[col] = df_optimized[col].astype('uint16')
                elif max_val < 4294967295:
                    df_optimized[col] = df_optimized[col].astype('uint32')
            else:  # Signed
                if min_val > -128 and max_val < 127:
                    df_optimized[col] = df_optimized[col].astype('int8')
                elif min_val > -32768 and max_val < 32767:
                    df_optimized[col] = df_optimized[col].astype('int16')
                elif min_val > -2147483648 and max_val < 2147483647:
                    df_optimized[col] = df_optimized[col].astype('int32')
        
        # Otimizar floats
        elif col_type == 'float64':
            df_optimized[col] = pd.to_numeric(df_optimized[col], downcast='float')
        
        # Otimizar strings para categorias
        elif col_type == 'object':
            unique_count = df_optimized[col].nunique()
            total_count = len(df_optimized[col])
            
            # Se < 50% valores únicos, converter para category
            if unique_count / total_count < 0.5:
                df_optimized[col] = df_optimized[col].astype('category')
    
    return df_optimized

# Aplicar otimizações
df_optimized = optimize_dtypes(df_raw)
analyze_memory_usage(df_optimized, "DataFrame Otimizado")

# Calcular economia
original_memory = df_raw.memory_usage(deep=True).sum()
optimized_memory = df_optimized.memory_usage(deep=True).sum()
savings = (1 - optimized_memory / original_memory) * 100

print(f"\\n💾 ECONOMIA DE MEMÓRIA: {savings:.1f}%")
print(f"Redução: {(original_memory - optimized_memory) / 1024**2:.2f} MB")

# 3. CHUNKING PARA DATASETS GRANDES
def process_large_file_chunked(filepath, chunk_size=10000):
    """Processa arquivo grande em chunks"""
    
    # Estatísticas agregadas
    total_rows = 0
    sum_values = 0
    chunk_results = []
    
    # Processar em chunks
    for chunk_num, chunk in enumerate(pd.read_csv(filepath, chunksize=chunk_size)):
        print(f"Processando chunk {chunk_num + 1}...")
        
        # Otimizar chunk
        chunk_optimized = optimize_dtypes(chunk)
        
        # Processar chunk
        chunk_stats = {
            'chunk': chunk_num,
            'rows': len(chunk_optimized),
            'avg_value': chunk_optimized['value'].mean(),
            'max_value': chunk_optimized['value'].max(),
            'memory_mb': chunk_optimized.memory_usage(deep=True).sum() / 1024**2
        }
        
        chunk_results.append(chunk_stats)
        total_rows += len(chunk_optimized)
        sum_values += chunk_optimized['value'].sum()
        
        # Liberar memória
        del chunk_optimized
        gc.collect()
    
    # Resultado final
    final_stats = pd.DataFrame(chunk_results)
    overall_avg = sum_values / total_rows
    
    print(f"\\n📊 PROCESSAMENTO COMPLETO:")
    print(f"Total de linhas: {total_rows:,}")
    print(f"Média geral: {overall_avg:.2f}")
    print(f"Chunks processados: {len(chunk_results)}")
    
    return final_stats

# Salvar dataset para exemplo de chunking
df_raw.to_csv('large_dataset.csv', index=False)
chunk_stats = process_large_file_chunked('large_dataset.csv', chunk_size=100000)`,
          dica: 'Otimização de dtypes pode reduzir memória em 50-90%. Use category para strings repetitivas.',
          resultado: 'Redução significativa no uso de memória e tempo de processamento'
        },
        {
          numero: 2,
          titulo: 'Processamento Paralelo com Pandas',
          descricao: 'Use multiprocessing, Dask e Modin para paralelizar operações Pandas em múltiplos cores.',
          codigo: `# ==========================================
# PROCESSAMENTO PARALELO COM PANDAS
# ==========================================

import multiprocessing as mp
from concurrent.futures import ProcessPoolExecutor
import time

# 1. MULTIPROCESSING NATIVO
def process_group(group_data):
    """Função para processar grupo em paralelo"""
    group_name, data = group_data
    
    # Simulação de processamento pesado
    result = {
        'group': group_name,
        'count': len(data),
        'mean_value': data['value'].mean(),
        'std_value': data['value'].std(),
        'sum_quantity': data['quantity'].sum(),
        'premium_ratio': data['is_premium'].mean()
    }
    
    return result

# Comparação: Serial vs Paralelo
def parallel_groupby_comparison(df, n_cores=None):
    """Compara processamento serial vs paralelo"""
    
    if n_cores is None:
        n_cores = mp.cpu_count()
    
    # Processamento Serial
    print("\\n⏱️ PROCESSAMENTO SERIAL...")
    start_time = time.time()
    
    serial_results = []
    for name, group in df.groupby('category'):
        result = process_group((name, group))
        serial_results.append(result)
    
    serial_time = time.time() - start_time
    
    # Processamento Paralelo
    print(f"\\n🚀 PROCESSAMENTO PARALELO ({n_cores} cores)...")
    start_time = time.time()
    
    # Dividir grupos entre processos
    groups = [(name, group) for name, group in df.groupby('category')]
    
    with ProcessPoolExecutor(max_workers=n_cores) as executor:
        parallel_results = list(executor.map(process_group, groups))
    
    parallel_time = time.time() - start_time
    
    # Comparação
    speedup = serial_time / parallel_time
    print(f"\\n📈 RESULTADOS:")
    print(f"Tempo serial: {serial_time:.2f}s")
    print(f"Tempo paralelo: {parallel_time:.2f}s")
    print(f"Speedup: {speedup:.2f}x")
    
    return pd.DataFrame(parallel_results)

# Executar comparação
results_df = parallel_groupby_comparison(df_optimized)
print("\\nResultados processamento:")
print(results_df)

# 2. DASK - PANDAS PARALELO AUTOMÁTICO
# pip install dask[complete]

try:
    import dask.dataframe as dd
    from dask.distributed import Client
    
    # Configurar cliente Dask
    client = Client(processes=True, n_workers=4, threads_per_worker=2)
    print(f"\\n🔗 Dask Client: {client.dashboard_link}")
    
    # Converter para Dask DataFrame
    df_dask = dd.from_pandas(df_optimized, npartitions=4)
    
    print(f"\\n📊 DASK DATAFRAME:")
    print(f"Partições: {df_dask.npartitions}")
    print(f"Colunas: {len(df_dask.columns)}")
    
    # Operações Dask (lazy evaluation)
    start_time = time.time()
    
    # Operações complexas em paralelo
    result_dask = df_dask.groupby('category').agg({
        'value': ['mean', 'std', 'sum'],
        'quantity': 'sum',
        'price': 'mean',
        'is_premium': 'mean'
    }).compute()  # .compute() executa o pipeline
    
    dask_time = time.time() - start_time
    
    print(f"\\n⚡ Dask computation time: {dask_time:.2f}s")
    print("Resultados Dask:")
    print(result_dask.head())
    
    # Comparar com Pandas puro
    start_time = time.time()
    result_pandas = df_optimized.groupby('category').agg({
        'value': ['mean', 'std', 'sum'],
        'quantity': 'sum',
        'price': 'mean',
        'is_premium': 'mean'
    })
    pandas_time = time.time() - start_time
    
    print(f"\\n🐼 Pandas time: {pandas_time:.2f}s")
    print(f"Dask vs Pandas: {pandas_time/dask_time:.2f}x")
    
except ImportError:
    print("\\n⚠️ Dask não instalado. Execute: pip install dask[complete]")

# 3. MODIN - DROP-IN REPLACEMENT
# pip install modin[ray] ou modin[dask]

try:
    import modin.pandas as mpd
    import ray
    
    # Inicializar Ray
    ray.init()
    
    # Converter para Modin (API idêntica ao Pandas)
    df_modin = mpd.DataFrame(df_optimized)
    
    print(f"\\n🚀 MODIN DATAFRAME:")
    print(f"Shape: {df_modin.shape}")
    
    # Operações automáticamente paralelas
    start_time = time.time()
    
    result_modin = df_modin.groupby('category').agg({
        'value': ['mean', 'std'],
        'quantity': 'sum'
    })
    
    modin_time = time.time() - start_time
    
    print(f"⚡ Modin time: {modin_time:.2f}s")
    print("Resultados Modin:")
    print(result_modin.head())
    
except ImportError:
    print("\\n⚠️ Modin não instalado. Execute: pip install modin[ray]")

# 4. SWIFTER - PARALELIZAÇÃO AUTOMÁTICA DO APPLY
# pip install swifter

try:
    import swifter
    
    # Função pesada para demonstração
    def heavy_computation(row):
        # Simulação de processamento complexo
        result = 0
        for i in range(1000):
            result += row['value'] * np.sin(i) + row['quantity'] * np.cos(i)
        return result
    
    # Comparar apply normal vs swifter
    sample_df = df_optimized.sample(10000)  # Amostra menor para demo
    
    print("\\n⏱️ APPLY NORMAL...")
    start_time = time.time()
    result_normal = sample_df.apply(heavy_computation, axis=1)
    normal_time = time.time() - start_time
    
    print("\\n🚀 SWIFTER APPLY...")
    start_time = time.time()
    result_swifter = sample_df.swifter.apply(heavy_computation, axis=1)
    swifter_time = time.time() - start_time
    
    print(f"\\n📊 COMPARAÇÃO APPLY:")
    print(f"Normal apply: {normal_time:.2f}s")
    print(f"Swifter apply: {swifter_time:.2f}s")
    print(f"Speedup: {normal_time/swifter_time:.2f}x")
    
except ImportError:
    print("\\n⚠️ Swifter não instalado. Execute: pip install swifter")

# 5. BEST PRACTICES PARA PERFORMANCE

def pandas_performance_tips():
    """Dicas avançadas de performance"""
    
    print("\\n🎯 PANDAS PERFORMANCE BEST PRACTICES:")
    print("\\n1. 🗂️ DTYPES OPTIMIZATION:")
    print("   • Use category para strings repetitivas")
    print("   • Downcasting automático: pd.to_numeric(downcast='integer')")
    print("   • int8/16/32 em vez de int64 quando possível")
    
    print("\\n2. 🔍 INDEXING EFICIENTE:")
    print("   • set_index() para consultas frequentes por coluna")
    print("   • MultiIndex para consultas hierárquicas")
    print("   • loc[] é mais rápido que iloc[] para labels")
    
    print("\\n3. 💾 MEMÓRIA E I/O:")
    print("   • Parquet > CSV (10x mais rápido, 50% menor)")
    print("   • usecols no read_csv para carregar apenas colunas necessárias")
    print("   • chunksize para arquivos grandes")
    print("   • compression='gzip' para economizar espaço")
    
    print("\\n4. ⚡ OPERAÇÕES VECTORIZADAS:")
    print("   • Evite loops Python, use operações pandas/numpy")
    print("   • .map() > .apply() para mapeamentos simples")
    print("   • pd.cut() e pd.qcut() para binning")
    print("   • pd.get_dummies() > manual encoding")
    
    print("\\n5. 🔄 PARALLEL PROCESSING:")
    print("   • Dask para datasets > RAM")
    print("   • Modin para drop-in replacement")
    print("   • multiprocessing para apply pesados")
    print("   • swifter para paralelização automática")

pandas_performance_tips()`,
          dica: 'Para datasets > 1GB, considere Dask ou Modin. Para apply pesados, use multiprocessing.',
          resultado: 'Processamento paralelo eficiente com speedups de 2-10x'
        },
        {
          numero: 3,
          titulo: 'Integração Pandas com Bases de Dados',
          descricao: 'Conecte Pandas com PostgreSQL, MongoDB, APIs REST e otimize operações de leitura/escrita.',
          codigo: `# ==========================================
# PANDAS + DATABASES INTEGRATION
# ==========================================

import pandas as pd
import sqlalchemy
from sqlalchemy import create_engine
import requests
import json

# 1. POSTGRESQL INTEGRATION
def setup_postgres_connection():
    """Configurar conexão PostgreSQL otimizada"""
    
    # String de conexão
    connection_string = "postgresql://user:password@localhost:5432/database"
    
    # Engine com pool de conexões
    engine = create_engine(
        connection_string,
        pool_size=20,          # Conexões no pool
        max_overflow=30,       # Conexões extras se necessário
        pool_pre_ping=True,    # Verificar conexão antes de usar
        echo=False             # Log de SQL queries (debug)
    )
    
    return engine

# Exemplo com dados sintéticos (simulando PostgreSQL)
engine = create_engine('sqlite:///exemplo.db')  # SQLite para demonstração

# Criar tabela exemplo
sample_data = {
    'id': range(1, 10001),
    'nome': [f'Cliente_{i}' for i in range(1, 10001)],
    'valor_compra': np.random.exponential(500, 10000),
    'data_compra': pd.date_range('2024-01-01', periods=10000, freq='H'),
    'categoria': np.random.choice(['A', 'B', 'C'], 10000)
}

df_sample = pd.DataFrame(sample_data)

# 2. OPERAÇÕES OTIMIZADAS DE ESCRITA
def optimized_database_write(df, table_name, engine, method='bulk'):
    """Escrita otimizada para banco de dados"""
    
    if method == 'bulk':
        # Bulk insert (mais rápido)
        df.to_sql(
            table_name, 
            engine, 
            if_exists='replace',
            index=False,
            method='multi',      # Insert múltiplo
            chunksize=1000       # Chunks para não sobrecarregar
        )
        
    elif method == 'upsert':
        # UPSERT (inserir ou atualizar)
        # Requer SQL customizado para cada banco
        temp_table = f"{table_name}_temp"
        
        # Criar tabela temporária
        df.to_sql(temp_table, engine, if_exists='replace', index=False)
        
        # SQL de merge (exemplo PostgreSQL)
        upsert_sql = f"""
        INSERT INTO {table_name} 
        SELECT * FROM {temp_table}
        ON CONFLICT (id) DO UPDATE SET
            valor_compra = EXCLUDED.valor_compra,
            data_compra = EXCLUDED.data_compra
        """
        
        with engine.connect() as conn:
            conn.execute(upsert_sql)
            conn.execute(f"DROP TABLE {temp_table}")

# Executar escrita
print("\\n💾 ESCREVENDO NO BANCO...")
start_time = time.time()
optimized_database_write(df_sample, 'vendas', engine)
write_time = time.time() - start_time
print(f"Tempo de escrita: {write_time:.2f}s")

# 3. LEITURA OTIMIZADA COM QUERIES
def optimized_database_read(engine, query, chunk_size=10000):
    """Leitura otimizada com chunking"""
    
    # Para queries grandes, usar chunking
    chunks = []
    
    for chunk_df in pd.read_sql_query(
        query, 
        engine, 
        chunksize=chunk_size,
        parse_dates=['data_compra']  # Parse automático de datas
    ):
        # Processar chunk se necessário
        chunk_processed = chunk_df.copy()
        chunks.append(chunk_processed)
    
    # Concatenar todos os chunks
    result = pd.concat(chunks, ignore_index=True)
    return result

# Queries otimizadas
queries = {
    'vendas_categoria_a': """
        SELECT * FROM vendas 
        WHERE categoria = 'A' 
        AND valor_compra > 500
        ORDER BY data_compra DESC
    """,
    'agregacao_mensal': """
        SELECT 
            strftime('%Y-%m', data_compra) as mes,
            categoria,
            COUNT(*) as total_vendas,
            AVG(valor_compra) as valor_medio,
            SUM(valor_compra) as valor_total
        FROM vendas
        GROUP BY mes, categoria
        ORDER BY mes, categoria
    """
}

# Executar queries
for name, query in queries.items():
    print(f"\\n📊 EXECUTANDO: {name}")
    start_time = time.time()
    result = optimized_database_read(engine, query)
    query_time = time.time() - start_time
    
    print(f"Linhas retornadas: {len(result):,}")
    print(f"Tempo execução: {query_time:.2f}s")
    print(result.head())

# 4. MONGODB INTEGRATION
def mongodb_pandas_integration():
    """Integração com MongoDB"""
    
    try:
        import pymongo
        from pymongo import MongoClient
        
        # Conectar MongoDB
        client = MongoClient('mongodb://localhost:27017/')
        db = client['analytics']
        collection = db['vendas']
        
        # DataFrame para MongoDB
        def df_to_mongo(df, collection):
            # Converter DataFrame para dicionários
            records = df.to_dict('records')
            
            # Insert em batch
            result = collection.insert_many(records)
            return len(result.inserted_ids)
        
        # MongoDB para DataFrame
        def mongo_to_df(collection, query={}, projection=None):
            # Query MongoDB
            cursor = collection.find(query, projection)
            
            # Converter para DataFrame
            data = list(cursor)
            df = pd.DataFrame(data)
            
            # Remover _id se não necessário
            if '_id' in df.columns:
                df = df.drop('_id', axis=1)
            
            return df
        
        # Exemplo de uso
        sample_records = df_sample.sample(1000)
        inserted_count = df_to_mongo(sample_records, collection)
        print(f"\\n🍃 MongoDB: {inserted_count} registros inseridos")
        
        # Query com agregação
        pipeline = [
            {"$match": {"categoria": "A"}},
            {"$group": {
                "_id": "$categoria",
                "total_vendas": {"$sum": 1},
                "valor_medio": {"$avg": "$valor_compra"}
            }}
        ]
        
        agg_result = list(collection.aggregate(pipeline))
        agg_df = pd.DataFrame(agg_result)
        print("Agregação MongoDB:")
        print(agg_df)
        
    except ImportError:
        print("\\n⚠️ PyMongo não instalado. Execute: pip install pymongo")

mongodb_pandas_integration()

# 5. API REST INTEGRATION
def fetch_data_from_api(url, params=None, batch_size=1000):
    """Buscar dados de API REST em batches"""
    
    all_data = []
    page = 1
    
    while True:
        # Parâmetros da requisição
        api_params = {
            'page': page,
            'limit': batch_size,
            **(params or {})
        }
        
        try:
            response = requests.get(url, params=api_params, timeout=30)
            response.raise_for_status()
            
            data = response.json()
            
            # Assumindo que a API retorna {'data': [...]}
            if 'data' in data:
                records = data['data']
                if not records:  # Sem mais dados
                    break
                    
                all_data.extend(records)
                page += 1
                
                print(f"Página {page-1}: {len(records)} registros")
                
            else:
                break
                
        except requests.exceptions.RequestException as e:
            print(f"Erro na requisição: {e}")
            break
    
    # Converter para DataFrame
    if all_data:
        df = pd.DataFrame(all_data)
        return df
    else:
        return pd.DataFrame()

# Exemplo com API pública (JSONPlaceholder)
print("\\n🌐 BUSCANDO DADOS DA API...")
api_url = "https://jsonplaceholder.typicode.com/posts"

try:
    response = requests.get(api_url)
    if response.status_code == 200:
        api_data = response.json()
        df_api = pd.DataFrame(api_data)
        
        print(f"Dados da API: {len(df_api)} registros")
        print("Colunas:", df_api.columns.tolist())
        print(df_api.head())
        
        # Análise rápida
        print("\\n📈 ANÁLISE DOS DADOS:")
        print(f"Posts por usuário:")
        user_posts = df_api['userId'].value_counts().head()
        print(user_posts)
        
except Exception as e:
    print(f"Erro ao acessar API: {e}")

# 6. CACHE E PERSISTENCE INTELIGENTE
class DataManager:
    """Gerenciador de dados com cache inteligente"""
    
    def __init__(self, cache_dir='./cache'):
        self.cache_dir = cache_dir
        import os
        os.makedirs(cache_dir, exist_ok=True)
    
    def cached_query(self, query_name, query_func, max_age_hours=24):
        """Execute query com cache inteligente"""
        import pickle
        import os
        from datetime import datetime, timedelta
        
        cache_file = f"{self.cache_dir}/{query_name}.pkl"
        
        # Verificar se cache existe e é válido
        if os.path.exists(cache_file):
            file_time = datetime.fromtimestamp(os.path.getmtime(cache_file))
            max_age = timedelta(hours=max_age_hours)
            
            if datetime.now() - file_time < max_age:
                print(f"📋 Usando cache para {query_name}")
                with open(cache_file, 'rb') as f:
                    return pickle.load(f)
        
        # Executar query e salvar cache
        print(f"🔄 Executando query {query_name}")
        result = query_func()
        
        with open(cache_file, 'wb') as f:
            pickle.dump(result, f)
        
        return result
    
    def clear_cache(self):
        """Limpar todo o cache"""
        import os
        import glob
        
        cache_files = glob.glob(f"{self.cache_dir}/*.pkl")
        for file in cache_files:
            os.remove(file)
        
        print(f"🗑️ Cache limpo: {len(cache_files)} arquivos removidos")

# Exemplo de uso do cache
dm = DataManager()

def expensive_query():
    """Simular query pesada"""
    time.sleep(2)  # Simular demora
    return df_sample.groupby('categoria').agg({
        'valor_compra': ['count', 'mean', 'sum']
    })

# Primeira execução (sem cache)
result1 = dm.cached_query('vendas_por_categoria', expensive_query)

# Segunda execução (com cache)
result2 = dm.cached_query('vendas_por_categoria', expensive_query)

print("\\nResultado da query:")
print(result1)`,
          dica: 'Use connection pooling para databases e cache inteligente para queries pesadas.',
          resultado: 'Integração eficiente entre Pandas e sistemas de dados externos'
        }
      ],
      exemplos: [
        {
          titulo: 'Pipeline ETL Completo com Performance',
          codigo: `# ETL Pipeline otimizado
def etl_pipeline(source_file, target_db):
    # Extract (com otimizações)
    df = pd.read_csv(source_file, 
                     dtype={'category': 'category'},
                     parse_dates=['date'],
                     chunksize=50000)
    
    processed_chunks = []
    for chunk in df:
        # Transform
        chunk_clean = chunk.dropna()
        chunk_clean['value_log'] = np.log1p(chunk_clean['value'])
        
        processed_chunks.append(chunk_clean)
    
    # Load
    final_df = pd.concat(processed_chunks)
    final_df.to_sql('processed_data', target_db, 
                    if_exists='replace', method='multi')
    
    return len(final_df)`,
          explicacao: 'Pipeline ETL com chunking, otimização de tipos e bulk loading',
          saida: 'Processamento eficiente de arquivos multi-GB'
        }
      ],
      exercicios: [
        'Otimize dataset de 1GB+ reduzindo memória em 80%',
        'Implemente processamento paralelo com Dask',
        'Crie pipeline ETL com cache inteligente',
        'Integre Pandas com PostgreSQL usando bulk operations'
      ],
      recursos: [
        'Pandas Performance Guide',
        'Dask Documentation',
        'Modin Performance Comparison',
        'Database Integration Best Practices'
      ]
    }
  ];

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
          titulo: 'Ecossistema Hadoop - Guia Completo 2025',
          descricao: 'Apache Hadoop continua sendo fundamental no ecossistema BigData moderno. Embora tecnologias como Spark tenham ganhado popularidade, Hadoop permanece essencial para armazenamento distribuído (HDFS) e gerenciamento de recursos (YARN). Empresas como Netflix, Facebook, LinkedIn e Yahoo ainda utilizam Hadoop em produção para processar petabytes de dados diariamente.',
          codigo: `# ==========================================
# HADOOP: GUIA COMPLETO E ATUAL (2025)
# ==========================================

# 🔍 HADOOP AINDA É RELEVANTE EM 2025?
# SIM! Aqui está o porquê:
# ✅ HDFS continua sendo o padrão para armazenamento distribuído
# ✅ YARN é usado por Spark, Flink, Storm e outras ferramentas
# ✅ Ecossistema maduro com ferramentas robustas
# ✅ Suporte enterprise consolidado (Cloudera, Hortonworks/CDP)
# ✅ Integração nativa com cloud (AWS EMR, Azure HDInsight, GCP Dataproc)

# 📊 CASOS DE USO ATUAIS (2025):
# 1. Data Lakes empresariais
# 2. ETL/ELT em grande escala
# 3. Arquivamento de dados históricos
# 4. Processamento batch de logs
# 5. Machine Learning em datasets massivos
# 6. Data Warehousing distribuído

# 🏗️ ARQUITETURA DETALHADA DO HADOOP:

# 1. HDFS (Hadoop Distributed File System)
# ================================================
# - Sistema de arquivos distribuído tolerante a falhas
# - Projetado para hardware commodity (baixo custo)
# - Armazena arquivos grandes (GB a TB) divididos em blocos
# - Bloco padrão: 128MB (configurável até 1GB)
# - Replicação padrão: 3 cópias por bloco

# Componentes HDFS:
# • NameNode: Metadados e estrutura do filesystem
# • DataNodes: Armazenamento real dos dados
# • Secondary NameNode: Checkpoint dos metadados

# Comando básicos HDFS:
hdfs dfs -ls /                    # Listar diretório raiz
hdfs dfs -mkdir /user/dados       # Criar diretório
hdfs dfs -put local.txt /user/    # Upload arquivo
hdfs dfs -get /user/dados.txt .   # Download arquivo
hdfs dfs -rm -r /user/temp        # Remover recursivo

# 2. YARN (Yet Another Resource Negotiator)
# ================================================
# - Gerenciador de recursos e agendador de jobs
# - Permite múltiplas aplicações no mesmo cluster
# - Separação entre recursos e aplicações

# Componentes YARN:
# • ResourceManager: Gerencia recursos globalmente
# • NodeManager: Gerencia recursos em cada nó
# • ApplicationMaster: Coordena aplicação específica
# • Container: Unidade de recurso (CPU, memória)

# 3. MAPREDUCE 2.0 (MRv2)
# ================================================
# - Framework de processamento distribuído
# - Roda sobre YARN
# - Paradigma: Map → Shuffle → Reduce

# Exemplo MapReduce - Contagem de Palavras:
# MAP PHASE:
def mapper(linha):
    palavras = linha.split()
    for palavra in palavras:
        emit(palavra, 1)  # Emite (palavra, 1)

# REDUCE PHASE:
def reducer(palavra, lista_valores):
    count = sum(lista_valores)
    emit(palavra, count)  # Emite (palavra, total)

# 🛠️ INSTALAÇÃO DETALHADA DO HADOOP (2025)
# ================================================

# OPÇÃO 1: INSTALAÇÃO STANDALONE (Desenvolvimento)
# ------------------------------------------------
# 1. Pré-requisitos:
sudo apt update
sudo apt install openjdk-8-jdk
echo 'export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64' >> ~/.bashrc

# 2. Download Hadoop:
wget https://archive.apache.org/dist/hadoop/common/hadoop-3.3.6/hadoop-3.3.6.tar.gz
tar -xzf hadoop-3.3.6.tar.gz
sudo mv hadoop-3.3.6 /opt/hadoop

# 3. Configuração básica:
echo 'export HADOOP_HOME=/opt/hadoop' >> ~/.bashrc
echo 'export HADOOP_CONF_DIR=$HADOOP_HOME/etc/hadoop' >> ~/.bashrc
echo 'export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin' >> ~/.bashrc
source ~/.bashrc

# 4. Configurar JAVA_HOME no Hadoop:
echo 'export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64' >> $HADOOP_HOME/etc/hadoop/hadoop-env.sh

# 5. Testar instalação:
hadoop version

# OPÇÃO 2: CLUSTER PSEUDO-DISTRIBUÍDO
# ------------------------------------------------
# Simula cluster em uma máquina para desenvolvimento

# 1. Configurar SSH sem senha:
ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
chmod 0600 ~/.ssh/authorized_keys

# 2. Configurar core-site.xml:
<configuration>
    <property>
        <name>fs.defaultFS</name>
        <value>hdfs://localhost:9000</value>
    </property>
</configuration>

# 3. Configurar hdfs-site.xml:
<configuration>
    <property>
        <name>dfs.replication</name>
        <value>1</value>
    </property>
    <property>
        <name>dfs.namenode.name.dir</name>
        <value>file:///opt/hadoop/data/namenode</value>
    </property>
    <property>
        <name>dfs.datanode.data.dir</name>
        <value>file:///opt/hadoop/data/datanode</value>
    </property>
</configuration>

# 4. Formatar NameNode:
hdfs namenode -format

# 5. Iniciar serviços:
start-dfs.sh
start-yarn.sh

# 6. Verificar serviços:
jps  # Deve mostrar: NameNode, DataNode, ResourceManager, NodeManager

# OPÇÃO 3: CLUSTER DISTRIBUÍDO (Produção)
# ------------------------------------------------
# Para ambiente real com múltiplos servidores

# Arquitetura recomendada:
# • 1 Master Node: NameNode + ResourceManager
# • 2+ Worker Nodes: DataNode + NodeManager
# • 1 Secondary NameNode (opcional, separado)

# Configuração masters file:
echo "master.hadoop.local" > $HADOOP_HOME/etc/hadoop/masters

# Configuração workers file:
echo "worker1.hadoop.local" > $HADOOP_HOME/etc/hadoop/workers
echo "worker2.hadoop.local" >> $HADOOP_HOME/etc/hadoop/workers
echo "worker3.hadoop.local" >> $HADOOP_HOME/etc/hadoop/workers

# 🐳 OPÇÃO 4: HADOOP COM DOCKER (Recomendado para desenvolvimento)
# ----------------------------------------------------------------
# Mais rápido e limpo para desenvolvimento

# 1. Docker Compose para Hadoop:
version: '3'
services:
  namenode:
    image: bde2020/hadoop-namenode:2.0.0-hadoop3.2.1-java8
    container_name: namenode
    ports:
      - "9870:9870"  # Web UI
      - "9000:9000"  # HDFS
    environment:
      - CLUSTER_NAME=test
    volumes:
      - hadoop_namenode:/hadoop/dfs/name

  datanode:
    image: bde2020/hadoop-datanode:2.0.0-hadoop3.2.1-java8
    container_name: datanode
    ports:
      - "9864:9864"
    environment:
      - SERVICE_PRECONDITION=namenode:9870
    volumes:
      - hadoop_datanode:/hadoop/dfs/data

  resourcemanager:
    image: bde2020/hadoop-resourcemanager:2.0.0-hadoop3.2.1-java8
    container_name: resourcemanager
    ports:
      - "8088:8088"
    environment:
      - SERVICE_PRECONDITION=namenode:9870

# 2. Iniciar cluster:
docker-compose up -d

# 3. Acessar Web UIs:
# • NameNode: http://localhost:9870
# • ResourceManager: http://localhost:8088

# 🚀 PROJETOS PRÁTICOS COM HADOOP (2025)
# =======================================

# PROJETO 1: ANÁLISE DE LOGS DE SERVIDOR WEB
# -------------------------------------------
# Objetivo: Analisar logs do Apache/Nginx para insights

# 1. Preparar dados:
# Upload logs para HDFS
hdfs dfs -put /var/log/apache2/access.log /user/logs/

# 2. Código MapReduce (Java):
public class LogAnalyzer {
    // Mapper: Extrai IPs e códigos de status
    public static class LogMapper extends Mapper<Object, Text, Text, IntWritable> {
        public void map(Object key, Text value, Context context) {
            String line = value.toString();
            String[] parts = line.split(" ");
            if (parts.length > 8) {
                String ip = parts[0];
                String status = parts[8];
                context.write(new Text(ip + "\\t" + status), new IntWritable(1));
            }
        }
    }
    
    // Reducer: Conta ocorrências
    public static class LogReducer extends Reducer<Text, IntWritable, Text, IntWritable> {
        public void reduce(Text key, Iterable<IntWritable> values, Context context) {
            int sum = 0;
            for (IntWritable value : values) {
                sum += value.get();
            }
            context.write(key, new IntWritable(sum));
        }
    }
}

# 3. Executar job:
hadoop jar log-analyzer.jar LogAnalyzer /user/logs/access.log /user/output/

# PROJETO 2: ETL DE DADOS DE VENDAS
# ----------------------------------
# Objetivo: Processar dados de vendas em grande escala

# 1. Estrutura dos dados CSV:
# data,produto,quantidade,preco,regiao
# 2025-01-01,Produto A,10,100.50,Sul
# 2025-01-01,Produto B,5,200.00,Norte

# 2. MapReduce para agregação por região:
public class SalesAnalyzer {
    // Calcular vendas totais por região
    public static class SalesMapper extends Mapper<Object, Text, Text, DoubleWritable> {
        public void map(Object key, Text value, Context context) {
            String[] fields = value.toString().split(",");
            if (fields.length == 5 && !fields[0].equals("data")) {
                String regiao = fields[4];
                double quantidade = Double.parseDouble(fields[2]);
                double preco = Double.parseDouble(fields[3]);
                double total = quantidade * preco;
                context.write(new Text(regiao), new DoubleWritable(total));
            }
        }
    }
}

# PROJETO 3: MACHINE LEARNING COM HADOOP
# ---------------------------------------
# Integração com Mahout para algoritmos ML

# 1. Instalar Mahout:
wget https://archive.apache.org/dist/mahout/0.13.0/apache-mahout-distribution-0.13.0.tar.gz

# 2. Clustering com K-Means:
mahout kmeans -i /user/data/vectors -c /user/output/clusters -o /user/output/kmeans -x 20 -k 5

# 🌐 HADOOP NA CLOUD (2025)
# ==========================

# AWS EMR (Elastic MapReduce):
# • Hadoop como serviço gerenciado
# • Suporte a Spark, Hive, HBase, Presto
# • Auto-scaling baseado em carga
# • Integração com S3, DynamoDB, Redshift

# Azure HDInsight:
# • Hadoop no Azure
# • Suporte a Storm, Kafka, Interactive Query
# • Integração com Azure Data Lake, Cosmos DB
# • Segurança enterprise (Active Directory)

# Google Cloud Dataproc:
# • Hadoop no GCP
# • Clusters efêmeros (cria/destrói conforme necessidade)
# • Integração com BigQuery, Cloud Storage
# • Preemptible instances para reduzir custos

# 🔧 FERRAMENTAS MODERNAS DO ECOSSISTEMA HADOOP
# ==============================================

# Data Processing:
# • Spark: Processamento em memória (100x mais rápido que MapReduce)
# • Flink: Streaming em tempo real
# • Storm: Processamento de streams
# • Tez: DAG execution engine

# Data Storage:
# • HBase: Banco NoSQL sobre HDFS
# • Kudu: Storage para analytics
# • Parquet: Formato colunar otimizado
# • Avro: Serialização de dados

# Data Access:
# • Hive: SQL sobre Hadoop
# • Pig: Linguagem de alto nível para ETL
# • Impala: SQL analytics em tempo real
# • Presto: Query engine distribuído

# Data Governance:
# • Atlas: Governança e metadados
# • Ranger: Segurança e políticas
# • Knox: Gateway de segurança

# Workflow:
# • Oozie: Workflow scheduler
# • Airflow: Modern workflow orchestration
# • NiFi: Data flow management

# 📈 QUANDO USAR HADOOP EM 2025?
# ===============================

# ✅ USE HADOOP QUANDO:
# • Dados > 1TB e crescendo constantemente
# • Necessidade de armazenamento distribuído confiável
# • Budget limitado (hardware commodity)
# • Processamento batch é suficiente
# • Compliance requer dados on-premise
# • Já possui expertise Hadoop na equipe
# • Necessita de ecossistema maduro e estável

# ❌ NÃO USE HADOOP QUANDO:
# • Dados < 100GB
# • Necessidade de low-latency/real-time
# • Equipe pequena sem expertise
# • Queries ad-hoc frequentes
# • Cloud-first é preferência
# • Orçamento para soluções managed (Snowflake, BigQuery)

# 🆚 HADOOP vs ALTERNATIVAS MODERNAS
# ===================================

# Hadoop vs Spark:
# • Spark: Mais rápido, melhor para iterativo/ML
# • Hadoop: Mais estável, melhor para batch puro

# Hadoop vs Cloud Data Warehouses:
# • Cloud DW: Menos complexidade, mais performance
# • Hadoop: Mais controle, menor custo por TB

# Hadoop vs Data Lakes modernos:
# • Delta Lake/Iceberg: Melhor governança, ACID
# • Hadoop: Mais maduro, ecossistema estabelecido

# 💰 ESTIMATIVA DE CUSTOS (2025)
# ===============================

# Cluster on-premise (10 nós):
# • Hardware: $50,000 - $100,000
# • Energia: $5,000/ano
# • Manutenção: $10,000/ano
# • Pessoal: $200,000/ano

# Cloud managed (EMR/HDInsight):
# • 10 nós m5.xlarge: ~$2,000/mês
# • Storage S3: ~$500/mês por 100TB
# • Sem custos de manutenção/pessoal especializado

# 🎯 ROADMAP DE APRENDIZADO HADOOP
# =================================

# Iniciante (1-2 meses):
# 1. Instalar Hadoop standalone
# 2. Aprender comandos HDFS básicos
# 3. Executar job MapReduce exemplo
# 4. Usar Hive para queries SQL

# Intermediário (3-6 meses):
# 1. Configurar cluster pseudo-distribuído
# 2. Desenvolver MapReduce customizado
# 3. Integrar com Spark/Hive
# 4. Monitoramento e tuning

# Avançado (6+ meses):
# 1. Cluster distribuído em produção
# 2. Segurança Kerberos
# 3. HA (High Availability)
# 4. Disaster Recovery
# 5. Performance tuning avançado`,
          dica: 'Em 2025, Hadoop é mais relevante como plataforma de storage (HDFS) e orquestração (YARN) do que como engine de processamento. Combine Hadoop com Spark para obter o melhor dos dois mundos: storage robusto e processamento rápido.',
          resultado: 'Domínio completo do ecossistema Hadoop moderno e suas aplicações práticas em 2025'
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
          titulo: 'Apache Spark - Arquitetura e APIs Completas (2025)',
          descricao: 'Apache Spark revolucionou o processamento de BigData. Com processamento em memória, Spark é até 100x mais rápido que MapReduce. Em 2025, é THE standard para analytics modernos, usado por 80%+ das empresas Fortune 500.',
          codigo: `# ==========================================
# APACHE SPARK: GUIA ULTRA-COMPLETO 2025
# ==========================================

# 🚀 POR QUE SPARK DOMINA O MERCADO EM 2025?
# ==========================================
# ✅ 100x mais rápido que Hadoop MapReduce (processamento em memória)
# ✅ APIs unificadas: SQL, Streaming, ML, Graph processing
# ✅ Suporte multi-linguagem: Python, Scala, Java, R, SQL
# ✅ Roda em qualquer lugar: Cloud, Kubernetes, Hadoop, Standalone
# ✅ Ecosystem maduro: Delta Lake, MLflow, Koalas
# ✅ Community ativa: 1000+ contribuidores, 25,000+ commits

# 📊 CASOS DE USO REAIS (2025):
# • Netflix: Recomendações em tempo real (300+ TB/dia)
# • Uber: Otimização de rotas e preços dinâmicos
# • Spotify: Sistema de recomendação musical
# • Airbnb: Fraud detection e pricing optimization
# • Apple: Analytics de App Store (petabytes)

# 🏗️ ARQUITETURA DETALHADA DO SPARK
# ==================================

# 1. SPARK CORE (Engine Principal)
# --------------------------------
# • RDDs (Resilient Distributed Datasets)
# • DAG (Directed Acyclic Graph) Scheduler
# • Task Scheduler & Cluster Manager Interface
# • Memory Management & Fault Recovery

# Componentes:
# • Driver Program: Coordena execução
# • Cluster Manager: Aloca recursos (YARN, K8s, Mesos)
# • Executors: Processam dados em workers
# • SparkContext: Ponto de entrada para Spark

# 2. SPARK SQL (Analytics + BI)
# -----------------------------
# • DataFrame API (estruturada como tabela)
# • Catalyst Query Optimizer (otimizações automáticas)
# • Tungsten Execution Engine (código nativo)
# • Suporte a Hive, JDBC, ODBC

# Exemplo DataFrame avançado:
from pyspark.sql import SparkSession
from pyspark.sql.functions import *
from pyspark.sql.types import *

# Criar Spark Session otimizada
spark = SparkSession.builder \\
    .appName("BigDataAnalytics2025") \\
    .config("spark.sql.adaptive.enabled", "true") \\
    .config("spark.sql.adaptive.coalescePartitions.enabled", "true") \\
    .config("spark.serializer", "org.apache.spark.serializer.KryoSerializer") \\
    .getOrCreate()

# Schema explícito para performance
schema = StructType([
    StructField("id", IntegerType(), True),
    StructField("timestamp", TimestampType(), True),
    StructField("user_id", StringType(), True),
    StructField("event_type", StringType(), True),
    StructField("value", DoubleType(), True),
    StructField("metadata", MapType(StringType(), StringType()), True)
])

# Carregar dados com otimizações
df = spark.read \\
    .option("multiline", "true") \\
    .option("mode", "PERMISSIVE") \\
    .schema(schema) \\
    .json("s3a://big-data-lake/events/")

# Operações SQL avançadas
result = df \\
    .filter(col("timestamp") >= "2025-01-01") \\
    .withColumn("date", date_format("timestamp", "yyyy-MM-dd")) \\
    .withColumn("hour", hour("timestamp")) \\
    .groupBy("date", "hour", "event_type") \\
    .agg(
        count("*").alias("total_events"),
        sum("value").alias("total_value"),
        avg("value").alias("avg_value"),
        stddev("value").alias("stddev_value")
    ) \\
    .orderBy("date", "hour")

# Window functions para analytics avançadas
from pyspark.sql.window import Window

window_spec = Window \\
    .partitionBy("user_id") \\
    .orderBy("timestamp") \\
    .rowsBetween(-7, 0)  # Janela de 7 dias

df_with_trends = df \\
    .withColumn("rolling_avg", avg("value").over(window_spec)) \\
    .withColumn("rolling_sum", sum("value").over(window_spec)) \\
    .withColumn("rank", row_number().over(window_spec))

# 3. SPARK STREAMING (Real-time)
# ------------------------------
# • Structured Streaming (recomendado para 2025)
# • Micro-batch processing com latência baixa
# • Exactly-once semantics
# • Suporte a Kafka, Kinesis, EventHubs

# Streaming moderno com Structured Streaming:
# Ler stream do Kafka
kafka_df = spark \\
    .readStream \\
    .format("kafka") \\
    .option("kafka.bootstrap.servers", "kafka1:9092,kafka2:9092") \\
    .option("subscribe", "user-events") \\
    .option("startingOffsets", "latest") \\
    .load()

# Processar JSON do Kafka
parsed_df = kafka_df \\
    .select(from_json(col("value").cast("string"), schema).alias("data")) \\
    .select("data.*")

# Analytics em tempo real
streaming_query = parsed_df \\
    .groupBy(window("timestamp", "1 minute"), "event_type") \\
    .count() \\
    .writeStream \\
    .outputMode("update") \\
    .format("console") \\
    .trigger(processingTime="10 seconds") \\
    .start()

# 4. MLLIB (Machine Learning)
# ---------------------------
# • Algoritmos distribuídos escaláveis
# • Pipelines ML para produção
# • Feature engineering automático
# • Model selection e hyperparameter tuning

# Pipeline ML completo:
from pyspark.ml import Pipeline
from pyspark.ml.feature import VectorAssembler, StandardScaler, StringIndexer
from pyspark.ml.classification import RandomForestClassifier
from pyspark.ml.evaluation import MulticlassClassificationEvaluator
from pyspark.ml.tuning import CrossValidator, ParamGridBuilder

# Preparar features
feature_cols = ["age", "income", "credit_score", "previous_purchases"]
assembler = VectorAssembler(inputCols=feature_cols, outputCol="features")
scaler = StandardScaler(inputCol="features", outputCol="scaled_features")
indexer = StringIndexer(inputCol="category", outputCol="label")

# Modelo
rf = RandomForestClassifier(featuresCol="scaled_features", labelCol="label")

# Pipeline completo
pipeline = Pipeline(stages=[assembler, scaler, indexer, rf])

# Cross-validation com grid search
paramGrid = ParamGridBuilder() \\
    .addGrid(rf.numTrees, [50, 100, 200]) \\
    .addGrid(rf.maxDepth, [5, 10, 15]) \\
    .build()

evaluator = MulticlassClassificationEvaluator(
    labelCol="label", 
    predictionCol="prediction", 
    metricName="accuracy"
)

cv = CrossValidator(
    estimator=pipeline,
    estimatorParamMaps=paramGrid,
    evaluator=evaluator,
    numFolds=5
)

# Treinar modelo
cv_model = cv.fit(train_df)
predictions = cv_model.transform(test_df)

# 5. GRAPHX (Graph Processing)
# ----------------------------
# • Processamento de grafos distribuído
# • Algoritmos como PageRank, Connected Components
# • Social network analysis, fraud detection

# Análise de rede social:
from pyspark.sql import Row

# Criar grafo de usuários e conexões
vertices = spark.createDataFrame([
    Row(id=1, name="Alice", age=25),
    Row(id=2, name="Bob", age=30),
    Row(id=3, name="Charlie", age=35)
])

edges = spark.createDataFrame([
    Row(src=1, dst=2, relationship="friend"),
    Row(src=2, dst=3, relationship="colleague")
])

# 🛠️ INSTALAÇÃO E CONFIGURAÇÃO DETALHADA
# =======================================

# OPÇÃO 1: INSTALAÇÃO LOCAL (Desenvolvimento)
# -------------------------------------------
# 1. Pré-requisitos:
# • Java 8/11 (obrigatório)
# • Python 3.7+ (para PySpark)
# • Scala 2.12+ (opcional)

# Download e instalação:
wget https://archive.apache.org/dist/spark/spark-3.5.0/spark-3.5.0-bin-hadoop3.tgz
tar -xzf spark-3.5.0-bin-hadoop3.tgz
sudo mv spark-3.5.0-bin-hadoop3 /opt/spark

# Configurar variáveis de ambiente:
echo 'export SPARK_HOME=/opt/spark' >> ~/.bashrc
echo 'export PATH=$PATH:$SPARK_HOME/bin:$SPARK_HOME/sbin' >> ~/.bashrc
echo 'export PYSPARK_PYTHON=python3' >> ~/.bashrc
source ~/.bashrc

# Instalar PySpark:
pip install pyspark==3.5.0 findspark jupyter

# OPÇÃO 2: DOCKER (Recomendado)
# -----------------------------
# Dockerfile personalizado:
FROM apache/spark:3.5.0-scala2.12-java11-python3-ubuntu

USER root

# Instalar dependências Python
RUN pip install --no-cache-dir \\
    pandas numpy matplotlib seaborn \\
    scikit-learn plotly jupyter \\
    delta-spark mlflow koalas

# Configurar Jupyter
RUN jupyter notebook --generate-config
COPY jupyter_notebook_config.py /root/.jupyter/

EXPOSE 8888 4040 8080

CMD ["pyspark"]

# Docker Compose para cluster:
version: '3.8'
services:
  spark-master:
    image: apache/spark:3.5.0
    container_name: spark-master
    ports:
      - "8080:8080"  # Master Web UI
      - "7077:7077"  # Master Port
    environment:
      - SPARK_MODE=master
    command: ["spark-class", "org.apache.spark.deploy.master.Master"]

  spark-worker:
    image: apache/spark:3.5.0
    depends_on:
      - spark-master
    environment:
      - SPARK_MODE=worker
      - SPARK_MASTER_URL=spark://spark-master:7077
      - SPARK_WORKER_MEMORY=4G
      - SPARK_WORKER_CORES=2
    command: ["spark-class", "org.apache.spark.deploy.worker.Worker", "spark://spark-master:7077"]

# OPÇÃO 3: CLOUD MANAGED SERVICES
# -------------------------------
# AWS EMR:
aws emr create-cluster \\
    --name "Spark-Cluster-2025" \\
    --applications Name=Spark Name=Hadoop Name=Hive Name=JupyterHub \\
    --ec2-attributes KeyName=my-key-pair \\
    --instance-type m5.xlarge \\
    --instance-count 5 \\
    --use-default-roles

# Azure HDInsight:
az hdinsight create \\
    --name mysparkcluster \\
    --resource-group myResourceGroup \\
    --type Spark \\
    --component-version Spark=3.1 \\
    --http-password myPassword \\
    --ssh-password myPassword

# Google Dataproc:
gcloud dataproc clusters create my-spark-cluster \\
    --enable-autoscaling \\
    --max-workers=10 \\
    --secondary-worker-type=preemptible \\
    --image-version=2.1-debian11

# 🚀 PROJETOS PRÁTICOS AVANÇADOS (2025)
# =====================================

# PROJETO 1: SISTEMA DE RECOMENDAÇÃO DISTRIBUÍDO
# ----------------------------------------------
# Replicar sistema similar ao Netflix/Spotify

# 1. Dados de exemplo (1B+ ratings):
from pyspark.ml.recommendation import ALS
from pyspark.sql.functions import explode, split

# Carregar dados massivos
ratings = spark.read.csv("ratings_1b.csv", header=True, inferSchema=True)
movies = spark.read.csv("movies_100k.csv", header=True, inferSchema=True)

# Preparar dados para ALS
als_data = ratings.select("userId", "movieId", "rating")

# Algoritmo ALS (Alternating Least Squares)
als = ALS(
    maxIter=10,
    regParam=0.1,
    userCol="userId",
    itemCol="movieId",
    ratingCol="rating",
    coldStartStrategy="drop",
    nonnegative=True
)

# Treinar modelo
model = als.fit(als_data)

# Gerar recomendações para todos usuários
user_recs = model.recommendForAllUsers(10)

# Batch scoring para novos usuários
new_user_ratings = spark.createDataFrame([
    (999999, 1, 5.0),  # Usuário novo avaliou filme 1
    (999999, 50, 4.0)  # Usuário novo avaliou filme 50
], ["userId", "movieId", "rating"])

new_recommendations = model.transform(new_user_ratings)

# PROJETO 2: FRAUD DETECTION EM TEMPO REAL
# -----------------------------------------
# Sistema de detecção de fraude para transações financeiras

# Stream de transações do Kafka
transactions = spark \\
    .readStream \\
    .format("kafka") \\
    .option("kafka.bootstrap.servers", "localhost:9092") \\
    .option("subscribe", "financial-transactions") \\
    .load()

# Schema das transações
transaction_schema = StructType([
    StructField("transaction_id", StringType(), True),
    StructField("user_id", StringType(), True),
    StructField("amount", DoubleType(), True),
    StructField("merchant", StringType(), True),
    StructField("location", StringType(), True),
    StructField("timestamp", TimestampType(), True)
])

# Parse JSON e feature engineering
parsed_transactions = transactions \\
    .select(from_json(col("value").cast("string"), transaction_schema).alias("data")) \\
    .select("data.*")

# Features para detecção de fraude
features_df = parsed_transactions \\
    .withColumn("hour", hour("timestamp")) \\
    .withColumn("day_of_week", dayofweek("timestamp")) \\
    .withColumn("amount_log", log10("amount"))

# Aplicar modelo ML em tempo real (previamente treinado)
fraud_predictions = loaded_model.transform(features_df) \\
    .filter(col("fraud_probability") > 0.8)  # Alto risco

# Salvar alertas
fraud_alerts = fraud_predictions \\
    .writeStream \\
    .format("delta") \\
    .option("path", "/fraud-alerts/") \\
    .option("checkpointLocation", "/checkpoints/fraud/") \\
    .trigger(processingTime="5 seconds") \\
    .start()

# PROJETO 3: ETL COMPLEXO COM DELTA LAKE
# --------------------------------------
# Pipeline de dados moderno com versionamento

# Instalar Delta Lake
# pip install delta-spark

from delta.tables import DeltaTable
from delta import configure_spark_with_delta_pip

# Configurar Spark com Delta
builder = SparkSession.builder \\
    .appName("DeltaLakeETL") \\
    .config("spark.sql.extensions", "io.delta.sql.DeltaSparkSessionExtension") \\
    .config("spark.sql.catalog.spark_catalog", "org.apache.spark.sql.delta.catalog.DeltaCatalog")

spark = configure_spark_with_delta_pip(builder).getOrCreate()

# Bronze layer: dados brutos
bronze_df = spark.read.json("raw_data/")
bronze_df.write.format("delta").mode("overwrite").save("/delta/bronze/")

# Silver layer: dados limpos
silver_df = spark.read.format("delta").load("/delta/bronze/") \\
    .filter(col("quality_check").isNotNull()) \\
    .dropDuplicates(["id"]) \\
    .fillna({"missing_column": "default_value"})

silver_df.write.format("delta").mode("append").save("/delta/silver/")

# Gold layer: dados agregados para analytics
gold_df = silver_df \\
    .groupBy("category", "date") \\
    .agg(
        sum("revenue").alias("total_revenue"),
        count("*").alias("transaction_count"),
        avg("amount").alias("avg_amount")
    )

gold_df.write.format("delta").mode("overwrite").save("/delta/gold/")

# Time travel com Delta Lake
historical_data = spark.read.format("delta") \\
    .option("versionAsOf", 5) \\
    .load("/delta/silver/")

# Merge (UPSERT) operation
delta_table = DeltaTable.forPath(spark, "/delta/silver/")
delta_table.alias("target").merge(
    new_data.alias("source"),
    "target.id = source.id"
).whenMatchedUpdate(set={
    "updated_at": "source.updated_at",
    "value": "source.value"
}).whenNotMatchedInsert(values={
    "id": "source.id",
    "value": "source.value",
    "created_at": "source.created_at"
}).execute()

# 📈 PERFORMANCE TUNING AVANÇADO (2025)
# =====================================

# 1. CONFIGURAÇÕES CRÍTICAS:
spark.conf.set("spark.sql.adaptive.enabled", "true")
spark.conf.set("spark.sql.adaptive.coalescePartitions.enabled", "true")
spark.conf.set("spark.sql.adaptive.skewJoin.enabled", "true")
spark.conf.set("spark.sql.cbo.enabled", "true")  # Cost-based optimizer
spark.conf.set("spark.serializer", "org.apache.spark.serializer.KryoSerializer")

# 2. OTIMIZAÇÃO DE MEMÓRIA:
# • spark.executor.memory: 70% da RAM disponível
# • spark.executor.memoryFraction: 0.8 (para cache)
# • spark.sql.adaptive.coalescePartitions.minPartitionNum: núcleos * 2

# 3. CACHE INTELIGENTE:
# Cache DataFrames frequentemente acessados
df.cache()
df.persist(StorageLevel.MEMORY_AND_DISK_SER)

# Limpar cache não utilizado
spark.catalog.clearCache()

# 4. PARTICIONAMENTO OTIMIZADO:
# Particionar por colunas frequentemente filtradas
df.write.partitionBy("year", "month").mode("overwrite").parquet("partitioned_data/")

# Z-ordering para Delta Lake (otimização de co-localização)
delta_table.optimize().executeZOrderBy("customer_id", "date")

# 🌐 SPARK NA CLOUD (2025)
# ========================

# DATABRICKS (Líder de mercado):
# • Unity Catalog para governança
# • Delta Live Tables para pipelines
# • MLflow integrado
# • Auto Loader para ingestão
# • Photon engine (3x mais rápido)

# AMAZON EMR:
# • EMR Serverless (sem infraestrutura)
# • Spot instances para reduzir custos
# • Lake Formation para governança
# • Glue Catalog integrado

# AZURE SYNAPSE:
# • Spark Pools otimizados
# • Power BI integrado
# • Azure ML nativo
# • Dedicated SQL pools

# GOOGLE DATAPROC:
# • Preemptible instances (80% economia)
# • BigQuery integration
# • AI Platform notebooks
# • Vertex AI pipelines

# 💰 OTIMIZAÇÃO DE CUSTOS
# ======================

# 1. SPOT INSTANCES:
# Use spot/preemptible instances para workloads batch
# Economia: 50-90% vs on-demand

# 2. AUTO-SCALING:
# Configure auto-scaling baseado em carga
# Evita over-provisioning

# 3. COMPRESSÃO E FORMATOS:
# Use Parquet com compressão Snappy/ZSTD
# Delta Lake para otimização automática

# 4. CACHE ESTRATÉGICO:
# Cache apenas dados críticos
# Use storage levels apropriados

# 🎯 SPARK vs ALTERNATIVAS (2025)
# ===============================

# Spark vs Dask:
# • Spark: Melhor para ETL/batch, ecosystem maduro
# • Dask: Melhor para Python nativo, pandas scaling

# Spark vs Ray:
# • Spark: SQL analytics, batch processing
# • Ray: ML distribuído, reinforcement learning

# Spark vs Presto/Trino:
# • Spark: ETL, ML, streaming
# • Presto: SQL queries, federation

# 📊 MONITORAMENTO E DEBUGGING
# =============================

# Spark UI (localhost:4040):
# • Jobs, stages, tasks
# • Storage tab para cache
# • SQL tab para query plans
# • Streaming tab para monitoring

# Spark History Server:
spark-class org.apache.spark.deploy.history.HistoryServer

# Logging customizado:
import logging
logging.getLogger("pyspark").setLevel(logging.ERROR)

# Métricas customizadas:
from pyspark.util import AccumulatorParam

class ListAccumulatorParam(AccumulatorParam):
    def zero(self, value):
        return []
    
    def addInPlace(self, val1, val2):
        return val1 + val2

errors = spark.sparkContext.accumulator(0)
processed = spark.sparkContext.accumulator(0)`,
          dica: 'Em 2025, Spark não é apenas uma ferramenta de BigData, mas uma plataforma completa de analytics. Combine com Delta Lake, MLflow e Kubernetes para máxima eficiência.',
          resultado: 'Domínio completo do Apache Spark moderno e suas aplicações em produção'
        },
        {
          numero: 3,
          titulo: 'RDDs e DataFrames Avançados',
          descricao: 'Estruturas de dados fundamentais: RDDs para controle baixo nível e DataFrames para SQL.',
          codigo: `# DATAFRAMES: API de alto nível (recomendado)
from pyspark.sql import SparkSession
from pyspark.sql.functions import *

spark = SparkSession.builder.appName("DataFrameExamples").getOrCreate()

# Carregar dados
df = spark.read.csv("vendas_massivas.csv", header=True, inferSchema=True)

# Transformações (lazy evaluation)
vendas_altas = df.filter(df.vendas > 5000)
vendas_por_regiao = vendas_altas.groupBy("regiao").sum("vendas")

# Ações (executam o pipeline)
resultado = vendas_por_regiao.collect()
vendas_por_regiao.write.parquet("resultado_vendas.parquet")

# RDDs: API de baixo nível para controle total
rdd = spark.sparkContext.textFile("logs_massivos.txt")
words = rdd.flatMap(lambda line: line.split())
word_counts = words.map(lambda word: (word, 1)).reduceByKey(lambda a, b: a + b)
top_words = word_counts.top(10)`,
          dica: 'Use DataFrames por padrão. RDDs são necessários apenas para casos específicos de baixo nível.',
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
      id: 'databricks-lakehouse-completo',
      titulo: 'Databricks - Plataforma Lakehouse Completa',
      nivel: 'Avançado',
      tempo: '150 min',
      descricao: 'Domine a plataforma Databricks: Unity Catalog, Delta Live Tables, MLflow, AutoML e arquitetura Lakehouse moderna.',
      passos: [
        {
          numero: 1,
          titulo: 'Introdução ao Databricks e Lakehouse',
          descricao: 'Databricks combina data lake e data warehouse em uma única plataforma, eliminando silos de dados.',
          codigo: `# ==========================================
# DATABRICKS LAKEHOUSE - GUIA COMPLETO 2025
# ==========================================

# 🏛️ O QUE É LAKEHOUSE?
# Arquitetura que combina:
# ✅ Flexibilidade de Data Lakes (qualquer formato)
# ✅ Performance de Data Warehouses (ACID, schema)
# ✅ Governança empresarial (segurança, auditoria)
# ✅ Analytics e ML em uma plataforma única

# 🚀 POR QUE DATABRICKS EM 2025?
# ✅ Líder no Gartner Magic Quadrant
# ✅ 7000+ empresas clientes (Shell, H&M, Condé Nast)
# ✅ Criadores do Apache Spark, Delta Lake, MLflow
# ✅ Performance 5x superior vs competidores
# ✅ Redução de 70% nos custos de infraestrutura

# 📊 CASOS DE USO REAIS:
# • Shell: Analytics de 50PB+ de dados geológicos
# • Regeneron: Descoberta de medicamentos com ML
# • ABInBev: Otimização de supply chain global
# • Comcast: Streaming analytics para 31M+ clientes

# 🏗️ ARQUITETURA DATABRICKS

# 1. CONTROL PLANE (Gerenciado pela Databricks)
# • Web Application (notebooks, clusters, jobs)
# • Cluster Manager (auto-scaling, configuração)
# • Jobs Scheduler (workflows, pipelines)
# • DBFS (Databricks File System)

# 2. DATA PLANE (Na sua cloud)
# • Compute clusters (Spark workers)
# • Storage (S3, ADLS, GCS)
# • Network (VPC, subnets, security groups)

# 3. UNITY CATALOG (Governança unificada)
# • Metastore central cross-cloud
# • Fine-grained access control
# • Data lineage automático
# • Auditoria completa

# 📝 PRIMEIROS PASSOS NO DATABRICKS

# Conectar ao workspace
import databricks.sql as sql
from databricks import sql

# Configuração de conexão
connection = sql.connect(
    server_hostname="<workspace-url>",
    http_path="/sql/1.0/warehouses/<warehouse-id>",
    access_token="<personal-access-token>"
)

# Query básica
cursor = connection.cursor()
cursor.execute("SELECT current_database(), current_version()")
result = cursor.fetchall()
print(f"Database: {result[0][0]}, Version: {result[0][1]}")

# DBUTILS - Utilitários do Databricks
# %python (em notebook Databricks)
# Listar arquivos
dbutils.fs.ls("/databricks-datasets/")

# Copiar arquivos
dbutils.fs.cp("/databricks-datasets/COVID/", "/FileStore/covid-data/", True)

# Informações do cluster
print(f"Cluster ID: {spark.conf.get('spark.databricks.clusterUsageTags.clusterId')}")
print(f"Spark Version: {spark.version}")
print(f"Workers: {spark.sparkContext.defaultParallelism}")`,
          dica: 'Databricks oferece 14 dias de trial gratuito. Perfeito para testar todas as funcionalidades.',
          resultado: 'Compreensão da arquitetura Lakehouse e setup inicial'
        },
        {
          numero: 2,
          titulo: 'Delta Lake - Storage Layer Moderno',
          descricao: 'Delta Lake traz ACID transactions, time travel e otimizações automáticas para data lakes.',
          codigo: `# ==========================================
# DELTA LAKE - STORAGE LAYER NEXT-GEN
# ==========================================

# 🔄 CARACTERÍSTICAS DO DELTA LAKE:
# ✅ ACID Transactions (atomicidade, consistência)
# ✅ Time Travel (versioning automático)
# ✅ Schema Evolution (mudanças sem downtime)
# ✅ Merge Operations (UPSERT nativo)
# ✅ Auto-optimization (Z-ordering, compaction)

import delta
from delta.tables import DeltaTable
from pyspark.sql import SparkSession

# Spark com Delta Lake configurado
spark = SparkSession.builder \\
    .appName("DeltaLakeDemo") \\
    .config("spark.sql.extensions", "io.delta.sql.DeltaSparkSessionExtension") \\
    .config("spark.sql.catalog.spark_catalog", "org.apache.spark.sql.delta.catalog.DeltaCatalog") \\
    .getOrCreate()

# 1. CRIAR TABELA DELTA
# Dados de exemplo: transações financeiras
import pandas as pd
from datetime import datetime, timedelta

# Gerar dados sintéticos
data = {
    'transaction_id': range(1, 10001),
    'customer_id': np.random.randint(1, 1000, 10000),
    'amount': np.random.exponential(100, 10000),
    'transaction_type': np.random.choice(['credit', 'debit', 'transfer'], 10000),
    'timestamp': pd.date_range('2024-01-01', periods=10000, freq='5min'),
    'status': np.random.choice(['completed', 'pending', 'failed'], 10000, p=[0.8, 0.15, 0.05])
}

df = spark.createDataFrame(pd.DataFrame(data))

# Salvar como tabela Delta
df.write.format("delta").mode("overwrite").save("/delta/transactions")

# Registrar como tabela SQL
spark.sql("""
    CREATE TABLE transactions
    USING DELTA
    LOCATION '/delta/transactions'
""")

# 2. OPERAÇÕES DELTA LAKE

# Ler tabela Delta
transactions = spark.read.format("delta").load("/delta/transactions")
print(f"Total transactions: {transactions.count():,}")

# SQL nativo no Delta
spark.sql("""
    SELECT transaction_type, 
           COUNT(*) as count,
           AVG(amount) as avg_amount,
           SUM(amount) as total_amount
    FROM transactions 
    WHERE status = 'completed'
    GROUP BY transaction_type
""").show()

# 3. TIME TRAVEL - VERSIONAMENTO AUTOMÁTICO
# Versões disponíveis
spark.sql("DESCRIBE HISTORY transactions").show()

# Ler versão específica
version_0 = spark.read.format("delta").option("versionAsOf", 0).load("/delta/transactions")

# Ler timestamp específico
timestamp_data = spark.read.format("delta") \\
    .option("timestampAsOf", "2025-01-01 00:00:00") \\
    .load("/delta/transactions")

# 4. MERGE OPERATIONS (UPSERT)
# Novos dados para merge
new_data = spark.createDataFrame(pd.DataFrame({
    'transaction_id': [10001, 10002, 5000],  # 5000 já existe
    'customer_id': [999, 998, 123],
    'amount': [250.0, 180.0, 350.0],
    'transaction_type': ['credit', 'debit', 'transfer'],
    'timestamp': [datetime.now()] * 3,
    'status': ['completed', 'pending', 'completed']
}))

# Delta table reference
delta_table = DeltaTable.forPath(spark, "/delta/transactions")

# MERGE operation
delta_table.alias("target").merge(
    new_data.alias("source"),
    "target.transaction_id = source.transaction_id"
).whenMatchedUpdate(set={
    "amount": "source.amount",
    "status": "source.status",
    "timestamp": "source.timestamp"
}).whenNotMatchedInsert(values={
    "transaction_id": "source.transaction_id",
    "customer_id": "source.customer_id",
    "amount": "source.amount",
    "transaction_type": "source.transaction_type",
    "timestamp": "source.timestamp",
    "status": "source.status"
}).execute()

# 5. SCHEMA EVOLUTION
# Adicionar nova coluna sem quebrar pipelines existentes
new_schema_df = transactions.withColumn("region", lit("US"))
new_schema_df.write.format("delta") \\
    .mode("append") \\
    .option("mergeSchema", "true") \\
    .save("/delta/transactions")

# 6. OTIMIZAÇÕES AUTOMÁTICAS
# OPTIMIZE - Compacta arquivos pequenos
spark.sql("OPTIMIZE transactions")

# Z-ORDER - Otimiza consultas por colunas específicas
spark.sql("OPTIMIZE transactions ZORDER BY (customer_id, transaction_type)")

# VACUUM - Remove arquivos antigos (7 dias padrão)
spark.sql("VACUUM transactions RETAIN 24 HOURS")

# 7. STREAMING COM DELTA LAKE
# Write stream
streaming_df = spark.readStream \\
    .format("delta") \\
    .load("/delta/raw_transactions")

query = streaming_df \\
    .writeStream \\
    .format("delta") \\
    .outputMode("append") \\
    .option("checkpointLocation", "/delta/checkpoints/") \\
    .start("/delta/processed_transactions")

# Read stream
processed_stream = spark.readStream \\
    .format("delta") \\
    .load("/delta/processed_transactions")

# 8. CHANGE DATA FEED (CDC)
# Habilitar CDC na tabela
spark.sql("ALTER TABLE transactions SET TBLPROPERTIES (delta.enableChangeDataFeed = true)")

# Ler mudanças desde versão específica
changes = spark.read.format("delta") \\
    .option("readChangeDataFeed", "true") \\
    .option("startingVersion", 2) \\
    .load("/delta/transactions")

changes.show()`,
          dica: 'Delta Lake resolve 90% dos problemas de data lakes tradicionais. Use sempre que possível.',
          resultado: 'Storage layer robusto com ACID, versionamento e otimizações'
        },
        {
          numero: 3,
          titulo: 'Unity Catalog - Governança de Dados',
          descricao: 'Unity Catalog é o sistema de governança unificado para metadados, segurança e lineage.',
          codigo: `# ==========================================
# UNITY CATALOG - GOVERNANÇA UNIFICADA
# ==========================================

# 🏛️ HIERARQUIA DO UNITY CATALOG:
# Metastore → Catalog → Schema → Table/View/Function

# 📋 PRINCIPAIS FUNCIONALIDADES:
# ✅ Fine-grained access control (linha/coluna)
# ✅ Data lineage automático
# ✅ Auditoria completa
# ✅ Cross-cloud compatibility
# ✅ Delta Sharing (compartilhamento seguro)

# 1. SETUP INICIAL DO UNITY CATALOG
# (Executar como admin do workspace)

# Criar Metastore (uma vez por região)
spark.sql("""
    CREATE METASTORE enterprise_metastore
    LOCATION 's3://my-unity-catalog-bucket/metastore/'
""")

# Atribuir workspace ao metastore
# (Via UI Admin Console ou API)

# 2. ESTRUTURA HIERÁRQUICA

# Criar Catalog
spark.sql("CREATE CATALOG sales_analytics")
spark.sql("USE CATALOG sales_analytics")

# Criar Schema
spark.sql("CREATE SCHEMA bronze COMMENT 'Raw data layer'")
spark.sql("CREATE SCHEMA silver COMMENT 'Cleaned data layer'")
spark.sql("CREATE SCHEMA gold COMMENT 'Business analytics layer'")

# 3. TABELAS GERENCIADAS vs EXTERNAS

# Tabela Gerenciada (Unity Catalog gerencia storage)
spark.sql("""
    CREATE TABLE sales_analytics.bronze.raw_transactions (
        transaction_id BIGINT,
        customer_id BIGINT,
        amount DECIMAL(10,2),
        transaction_date DATE,
        status STRING
    ) USING DELTA
    TBLPROPERTIES ('delta.enableChangeDataFeed' = 'true')
""")

# Tabela Externa (você gerencia storage)
spark.sql("""
    CREATE TABLE sales_analytics.bronze.external_data
    USING DELTA
    LOCATION 's3://my-bucket/external-data/'
""")

# 4. CONTROLE DE ACESSO GRANULAR

# Grants em diferentes níveis
# Catalog level
spark.sql("GRANT USE CATALOG ON CATALOG sales_analytics TO data_analysts")

# Schema level
spark.sql("GRANT CREATE TABLE ON SCHEMA sales_analytics.silver TO data_engineers")

# Table level
spark.sql("GRANT SELECT ON TABLE sales_analytics.gold.customer_metrics TO business_users")

# Column level (mascaramento)
spark.sql("""
    GRANT SELECT(customer_id, purchase_amount) 
    ON TABLE sales_analytics.gold.customer_details 
    TO junior_analysts
""")

# Row level (filtros automáticos)
spark.sql("""
    CREATE ROW FILTER customer_region_filter
    AS (region = current_user_region())
    ON sales_analytics.gold.customer_data
""")

# 5. DATA LINEAGE E DESCOBERTA

# Ver lineage de uma tabela (via UI ou API)
# GET /api/2.1/unity-catalog/lineage/table/{full_name}

# Descobrir dados por tags
spark.sql("ALTER TABLE transactions SET TAGS ('PII' = 'true', 'Department' = 'Finance')")

# Buscar tabelas por tags
spark.sql("""
    SELECT table_name, table_schema, table_catalog
    FROM information_schema.tables
    WHERE table_name LIKE '%customer%'
""")

# 6. DELTA SHARING - COMPARTILHAMENTO SEGURO

# Criar Share (provedor)
spark.sql("CREATE SHARE customer_analytics_share")

# Adicionar tabela ao share
spark.sql("""
    ALTER SHARE customer_analytics_share 
    ADD TABLE sales_analytics.gold.customer_metrics
""")

# Criar Recipient (consumidor)
spark.sql("""
    CREATE RECIPIENT partner_company
    USING ID 'partner-company-id'
""")

# Conceder acesso
spark.sql("GRANT SELECT ON SHARE customer_analytics_share TO RECIPIENT partner_company")

# Consumir shared data (lado do recipient)
spark.sql("""
    CREATE CATALOG shared_data
    USING SHARE
    LOCATION 'databricks-share://provider/customer_analytics_share'
""")

# 7. AUDITORIA E MONITORAMENTO

# Logs de auditoria (via System Tables)
audit_logs = spark.sql("""
    SELECT event_time, user_identity, action_name, request_params
    FROM system.audit.workspace_audit_logs
    WHERE action_name IN ('READ_TABLE', 'WRITE_TABLE')
    AND event_time >= current_date() - INTERVAL 7 DAYS
    ORDER BY event_time DESC
""")

# Uso de dados
usage_stats = spark.sql("""
    SELECT table_name, query_count, bytes_read
    FROM system.usage.table_usage
    WHERE usage_date >= current_date() - INTERVAL 30 DAYS
    GROUP BY table_name
    ORDER BY query_count DESC
""")

# 8. FUNCTIONS E VOLUMES (Unity Catalog 2.0+)

# Criar função catalogada
spark.sql("""
    CREATE FUNCTION sales_analytics.common.calculate_discount(
        amount DECIMAL(10,2), 
        customer_tier STRING
    )
    RETURNS DECIMAL(10,2)
    LANGUAGE SQL
    DETERMINISTIC
    RETURN CASE 
        WHEN customer_tier = 'PREMIUM' THEN amount * 0.15
        WHEN customer_tier = 'GOLD' THEN amount * 0.10
        ELSE amount * 0.05
    END
""")

# Usar função
spark.sql("""
    SELECT customer_id, amount,
           sales_analytics.common.calculate_discount(amount, tier) as discount
    FROM transactions t
    JOIN customers c ON t.customer_id = c.id
""")

# Volumes para dados não-tabulares
spark.sql("""
    CREATE VOLUME sales_analytics.bronze.raw_files
    COMMENT 'Volume for CSV, JSON, and binary files'
""")

# 9. BEST PRACTICES

# Naming convention
# {environment}_{domain}_{purpose}
# ex: prod_sales_customer_360

# Tagging strategy
spark.sql("""
    ALTER TABLE customer_data SET TAGS (
        'data_classification' = 'PII',
        'retention_period' = '7_years',
        'owner' = 'data_team',
        'cost_center' = 'analytics'
    )
""")

# Automation via Jobs
spark.sql("""
    CREATE JOB governance_automation
    AS SELECT 
        COUNT(*) as daily_audit_count
    FROM system.audit.workspace_audit_logs
    WHERE event_date = current_date()
""")`,
          dica: 'Unity Catalog elimina silos de dados e traz governança enterprise-grade. Essential para organizações.',
          resultado: 'Governança completa de dados com segurança e auditoria'
        },
        {
          numero: 4,
          titulo: 'MLflow - MLOps e Experimentos',
          descricao: 'MLflow gerencia o ciclo completo de ML: experimentos, modelos, deploy e monitoramento.',
          codigo: `# ==========================================
# MLFLOW - MLOPS PLATFORM COMPLETO
# ==========================================

# 🤖 COMPONENTES DO MLFLOW:
# ✅ Tracking: Experimentos e métricas
# ✅ Projects: Reprodução de código
# ✅ Models: Gerenciamento e deploy
# ✅ Registry: Versionamento de modelos

import mlflow
import mlflow.sklearn
import mlflow.spark
from mlflow.tracking import MlflowClient
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score

# 1. CONFIGURAÇÃO DO MLFLOW

# Configurar tracking URI (Databricks gerencia automaticamente)
mlflow.set_tracking_uri("databricks")

# Definir experimento
experiment_name = "/Users/email@company.com/customer_churn_prediction"
mlflow.set_experiment(experiment_name)

# 2. TRACKING DE EXPERIMENTOS

# Dados de exemplo: predição de churn
np.random.seed(42)
n_customers = 10000

data = {
    'customer_id': range(1, n_customers + 1),
    'tenure_months': np.random.randint(1, 72, n_customers),
    'monthly_charges': np.random.normal(70, 20, n_customers),
    'total_charges': np.random.exponential(1000, n_customers),
    'contract_type': np.random.choice(['Month-to-month', 'One year', 'Two year'], n_customers),
    'payment_method': np.random.choice(['Credit card', 'Bank transfer', 'Electronic check'], n_customers),
    'internet_service': np.random.choice(['DSL', 'Fiber optic', 'No'], n_customers),
    'num_services': np.random.randint(1, 8, n_customers),
    'churn': np.random.choice([0, 1], n_customers, p=[0.75, 0.25])
}

df = pd.DataFrame(data)

# Feature engineering
df['avg_monthly_charges'] = df['total_charges'] / df['tenure_months']
df['charges_per_service'] = df['monthly_charges'] / df['num_services']

# Encoding categóricas
df_encoded = pd.get_dummies(df, columns=['contract_type', 'payment_method', 'internet_service'])

# Preparar dados
X = df_encoded.drop(['customer_id', 'churn'], axis=1)
y = df_encoded['churn']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3. EXPERIMENTO COM MLFLOW TRACKING

with mlflow.start_run(run_name="random_forest_v1") as run:
    # Hiperparâmetros
    n_estimators = 100
    max_depth = 10
    min_samples_split = 5
    
    # Log parâmetros
    mlflow.log_param("n_estimators", n_estimators)
    mlflow.log_param("max_depth", max_depth)
    mlflow.log_param("min_samples_split", min_samples_split)
    mlflow.log_param("train_size", len(X_train))
    mlflow.log_param("test_size", len(X_test))
    
    # Treinar modelo
    model = RandomForestClassifier(
        n_estimators=n_estimators,
        max_depth=max_depth,
        min_samples_split=min_samples_split,
        random_state=42
    )
    model.fit(X_train, y_train)
    
    # Predictions
    y_pred = model.predict(X_test)
    y_pred_proba = model.predict_proba(X_test)[:, 1]
    
    # Métricas
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred)
    recall = recall_score(y_test, y_pred)
    
    # Log métricas
    mlflow.log_metric("accuracy", accuracy)
    mlflow.log_metric("precision", precision)
    mlflow.log_metric("recall", recall)
    
    # Feature importance
    feature_importance = pd.DataFrame({
        'feature': X.columns,
        'importance': model.feature_importances_
    }).sort_values('importance', ascending=False)
    
    # Log artifacts
    feature_importance.to_csv("feature_importance.csv", index=False)
    mlflow.log_artifact("feature_importance.csv")
    
    # Log modelo
    mlflow.sklearn.log_model(
        model, 
        "random_forest_model",
        registered_model_name="customer_churn_predictor"
    )
    
    print(f"Run ID: {run.info.run_id}")
    print(f"Accuracy: {accuracy:.3f}")

# 4. COMPARAÇÃO DE EXPERIMENTOS

# Múltiplos experimentos com diferentes hiperparâmetros
hyperparams_grid = [
    {"n_estimators": 50, "max_depth": 5},
    {"n_estimators": 100, "max_depth": 10},
    {"n_estimators": 200, "max_depth": 15},
]

for i, params in enumerate(hyperparams_grid):
    with mlflow.start_run(run_name=f"rf_experiment_{i+1}"):
        model = RandomForestClassifier(**params, random_state=42)
        model.fit(X_train, y_train)
        
        y_pred = model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        
        mlflow.log_params(params)
        mlflow.log_metric("accuracy", accuracy)
        mlflow.sklearn.log_model(model, "model")

# 5. MODEL REGISTRY

client = MlflowClient()

# Listar versões do modelo
model_versions = client.search_model_versions("name='customer_churn_predictor'")
print(f"Total versions: {len(model_versions)}")

# Promover modelo para staging
latest_version = model_versions[0].version
client.transition_model_version_stage(
    name="customer_churn_predictor",
    version=latest_version,
    stage="Staging"
)

# Adicionar descrição
client.update_model_version(
    name="customer_churn_predictor",
    version=latest_version,
    description="Random Forest model for customer churn prediction. Trained on 10k customers."
)

# 6. MODEL SERVING

# Carregar modelo do registry
model_uri = f"models:/customer_churn_predictor/{latest_version}"
loaded_model = mlflow.sklearn.load_model(model_uri)

# Fazer predições
sample_data = X_test.iloc[:5]
predictions = loaded_model.predict(sample_data)
probabilities = loaded_model.predict_proba(sample_data)

print("Sample predictions:")
for i, (pred, prob) in enumerate(zip(predictions, probabilities)):
    print(f"Customer {i+1}: Churn={pred}, Probability={prob[1]:.3f}")

# 7. MODEL ENDPOINT (Databricks)
# Via UI ou API REST

# Criar endpoint
endpoint_config = {
    "name": "churn-predictor-endpoint",
    "config": {
        "served_models": [{
            "model_name": "customer_churn_predictor",
            "model_version": latest_version,
            "workload_size": "Small",
            "scale_to_zero_enabled": True
        }]
    }
}

# Invocar endpoint
import requests
import json

endpoint_url = "https://<workspace-url>/serving-endpoints/churn-predictor-endpoint/invocations"
headers = {"Authorization": f"Bearer {token}"}

payload = {
    "dataframe_records": sample_data.to_dict('records')
}

response = requests.post(endpoint_url, headers=headers, json=payload)
predictions = response.json()

# 8. A/B TESTING DE MODELOS

# Deploy múltiplas versões
endpoint_config_ab = {
    "name": "churn-predictor-ab-test",
    "config": {
        "served_models": [
            {
                "model_name": "customer_churn_predictor",
                "model_version": "1",
                "workload_size": "Small",
                "scale_to_zero_enabled": True,
                "traffic_percentage": 70
            },
            {
                "model_name": "customer_churn_predictor", 
                "model_version": "2",
                "workload_size": "Small",
                "scale_to_zero_enabled": True,
                "traffic_percentage": 30
            }
        ]
    }
}

# 9. MONITORING E ALERTAS

# Log custom metrics para monitoramento
with mlflow.start_run():
    # Simular drift detection
    drift_score = np.random.uniform(0, 1)
    mlflow.log_metric("data_drift_score", drift_score)
    
    if drift_score > 0.7:
        mlflow.log_metric("drift_alert", 1)
        # Trigger retraining pipeline
        
# 10. MLFLOW PROJECTS (Reprodutibilidade)

# MLproject file
mlproject_content = """
name: customer_churn_prediction

conda_env: conda.yaml

entry_points:
  main:
    parameters:
      n_estimators: {type: int, default: 100}
      max_depth: {type: int, default: 10}
    command: "python train.py --n_estimators {n_estimators} --max_depth {max_depth}"
"""

# Executar projeto
mlflow.run(".", parameters={"n_estimators": 150, "max_depth": 12})`,
          dica: 'MLflow é essencial para MLOps em escala. Use model registry para governança de modelos.',
          resultado: 'Pipeline completo de MLOps com tracking, deploy e monitoramento'
        }
      ],
      exemplos: [
        {
          titulo: 'Pipeline End-to-End com Databricks',
          codigo: `# Pipeline completo: Ingestão → Transformação → ML → Deploy
# 1. Auto Loader (ingestão)
df_raw = spark.readStream.format("cloudFiles") \\
    .option("cloudFiles.format", "json") \\
    .load("/mnt/data-lake/raw/")

# 2. Delta Live Tables (transformação)
@dlt.table
def bronze_transactions():
    return spark.readStream.table("raw_transactions")

@dlt.table  
def silver_transactions():
    return dlt.read_stream("bronze_transactions") \\
        .filter(col("amount") > 0) \\
        .withColumn("processed_date", current_date())

# 3. MLflow (modelo)
with mlflow.start_run():
    model = train_model(silver_data)
    mlflow.log_model(model, "fraud_detector")`,
          explicacao: 'Pipeline completo com ingestão automática, transformação e ML',
          saida: 'Pipeline produção com monitoramento automático'
        }
      ],
      exercicios: [
        'Configure Unity Catalog com governança completa',
        'Implemente pipeline Delta Live Tables',
        'Deploy modelo ML com MLflow e endpoints',
        'Configure A/B testing para modelos'
      ],
      recursos: [
        'Databricks Lakehouse Fundamentals',
        'Delta Lake Deep Dive',
        'MLflow Documentation',
        'Unity Catalog Best Practices'
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
    { label: 'Python & Pandas', topicos: topicosPythonPandas, icon: <CodeIcon /> },
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
