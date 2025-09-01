import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Alert,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Article,
  FileDownload,
  Assessment,
  TrendingUp,
  Science,
  BarChart,
  PictureAsPdf,
  Description,
  Analytics,
  AutoAwesome,
  ExpandMore,
  Visibility,
  Share,
  Edit,
  Delete,
  Add,
  FilterList,
  Search,
  GetApp,
  MenuBook,
} from '@mui/icons-material';

interface RelatorioItem {
  id: string;
  titulo: string;
  tipo: string;
  categoria: string;
  dataGeracao: string;
  status: 'completo' | 'processando' | 'erro';
  tamanho: string;
  descricao: string;
  tags: string[];
  autor: string;
  downloads: number;
}

const RelatoriosCientificos: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [relatorios, setRelatorios] = useState<RelatorioItem[]>([]);
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [busca, setBusca] = useState('');
  const [dialogAberto, setDialogAberto] = useState(false);
  const [relatorioSelecionado, setRelatorioSelecionado] = useState<RelatorioItem | null>(null);
  const [gerandoRelatorio, setGerandoRelatorio] = useState(false);
  const [novoRelatorio, setNovoRelatorio] = useState({
    titulo: '',
    tipo: '',
    categoria: '',
    descricao: '',
    template: ''
  });

  // Dados de exemplo para relatórios
  useEffect(() => {
    const relatoriosExemplo: RelatorioItem[] = [
      {
        id: '1',
        titulo: 'Análise Estatística Descritiva - Vendas Q4 2024',
        tipo: 'Estatístico',
        categoria: 'Vendas',
        dataGeracao: '2024-12-15',
        status: 'completo',
        tamanho: '2.4 MB',
        descricao: 'Relatório completo com análise descritiva dos dados de vendas do Q4 2024, incluindo medidas de tendência central, dispersão e distribuição.',
        tags: ['estatística', 'vendas', 'Q4', 'descritiva'],
        autor: 'Dr. Ana Silva',
        downloads: 127
      },
      {
        id: '2',
        titulo: 'Modelo Preditivo - Previsão de Demanda',
        tipo: 'Machine Learning',
        categoria: 'Previsão',
        dataGeracao: '2024-12-14',
        status: 'completo',
        tamanho: '5.1 MB',
        descricao: 'Desenvolvimento e validação de modelo de Machine Learning para previsão de demanda usando Random Forest e XGBoost.',
        tags: ['ML', 'previsão', 'random forest', 'xgboost'],
        autor: 'Prof. Carlos Santos',
        downloads: 89
      },
      {
        id: '3',
        titulo: 'Teste de Hipóteses - A/B Testing Campanha Marketing',
        tipo: 'Hipóteses',
        categoria: 'Marketing',
        dataGeracao: '2024-12-13',
        status: 'completo',
        tamanho: '1.8 MB',
        descricao: 'Análise estatística de teste A/B para campanha de marketing, incluindo teste t, qui-quadrado e análise de significância.',
        tags: ['teste hipóteses', 'A/B testing', 'marketing', 'significância'],
        autor: 'Dra. Maria Oliveira',
        downloads: 156
      },
      {
        id: '4',
        titulo: 'Análise de Correlação - Fatores de Satisfação',
        tipo: 'Correlacional',
        categoria: 'Satisfação',
        dataGeracao: '2024-12-12',
        status: 'processando',
        tamanho: '0 MB',
        descricao: 'Análise de correlação entre diversos fatores que influenciam a satisfação do cliente.',
        tags: ['correlação', 'satisfação', 'cliente', 'fatores'],
        autor: 'Dr. João Costa',
        downloads: 0
      },
      {
        id: '5',
        titulo: 'Regressão Linear Múltipla - Preços Imobiliários',
        tipo: 'Regressão',
        categoria: 'Imobiliário',
        dataGeracao: '2024-12-11',
        status: 'completo',
        tamanho: '3.2 MB',
        descricao: 'Modelo de regressão linear múltipla para predição de preços imobiliários baseado em características do imóvel.',
        tags: ['regressão', 'imobiliário', 'preços', 'predição'],
        autor: 'Dra. Paula Ferreira',
        downloads: 203
      },
      {
        id: '6',
        titulo: 'Análise de Séries Temporais - Vendas Mensais',
        tipo: 'Temporal',
        categoria: 'Vendas',
        dataGeracao: '2024-12-10',
        status: 'completo',
        tamanho: '4.7 MB',
        descricao: 'Análise completa de séries temporais das vendas mensais, incluindo decomposição, sazonalidade e previsão.',
        tags: ['séries temporais', 'vendas', 'sazonalidade', 'previsão'],
        autor: 'Dr. Roberto Lima',
        downloads: 98
      }
    ];
    setRelatorios(relatoriosExemplo);
  }, []);

  const tipos = ['todos', 'Estatístico', 'Machine Learning', 'Hipóteses', 'Correlacional', 'Regressão', 'Temporal'];
  const categorias = ['todos', 'Vendas', 'Marketing', 'Previsão', 'Satisfação', 'Imobiliário'];

  const relatoriosFiltrados = relatorios.filter(relatorio => {
    const matchTipo = filtroTipo === 'todos' || relatorio.tipo === filtroTipo;
    const matchCategoria = filtroCategoria === 'todos' || relatorio.categoria === filtroCategoria;
    const matchBusca = busca === '' || 
      relatorio.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      relatorio.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      relatorio.tags.some(tag => tag.toLowerCase().includes(busca.toLowerCase()));
    
    return matchTipo && matchCategoria && matchBusca;
  });

  const handleGerarRelatorio = () => {
    setGerandoRelatorio(true);
    
    // Simular geração de relatório
    setTimeout(() => {
      const novoId = (relatorios.length + 1).toString();
      const novoRelatorioItem: RelatorioItem = {
        id: novoId,
        titulo: novoRelatorio.titulo,
        tipo: novoRelatorio.tipo,
        categoria: novoRelatorio.categoria,
        dataGeracao: new Date().toISOString().split('T')[0],
        status: 'completo',
        tamanho: '2.1 MB',
        descricao: novoRelatorio.descricao,
        tags: [novoRelatorio.tipo.toLowerCase(), novoRelatorio.categoria.toLowerCase()],
        autor: 'Usuário Atual',
        downloads: 0
      };
      
      setRelatorios([novoRelatorioItem, ...relatorios]);
      setGerandoRelatorio(false);
      setDialogAberto(false);
      setNovoRelatorio({
        titulo: '',
        tipo: '',
        categoria: '',
        descricao: '',
        template: ''
      });
    }, 3000);
  };

  const handleVisualizarRelatorio = (relatorio: RelatorioItem) => {
    setRelatorioSelecionado(relatorio);
  };

  const handleDownloadRelatorio = (relatorio: RelatorioItem) => {
    const timestamp = new Date().toLocaleDateString('pt-BR');
    const timeStr = new Date().toLocaleTimeString('pt-BR');
    
    // Conteúdo completo e profissional baseado no tipo de relatório
    let conteudoRelatorio = '';
    
    if (relatorio.tipo === 'PDF') {
      // Template LaTeX científico completo
      conteudoRelatorio = `\\documentclass[12pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[brazil]{babel}
\\usepackage{amsmath,amsfonts,amssymb}
\\usepackage{graphicx}
\\usepackage{booktabs}
\\usepackage{hyperref}
\\usepackage{geometry}
\\geometry{left=3cm,right=2cm,top=3cm,bottom=2cm}

\\title{${relatorio.titulo}}
\\author{Prof. Vagner Cordeiro\\\\DataScience Pro Platform}
\\date{${timestamp}}

\\begin{document}

\\maketitle

\\begin{abstract}
Este relatório apresenta uma análise completa dos dados utilizando metodologias científicas rigorosas. ${relatorio.descricao}
\\end{abstract}

\\section{Introdução}
\\label{sec:introducao}

A análise de dados é fundamental para a tomada de decisões baseada em evidências. Este relatório foi gerado automaticamente pela plataforma DataScience Pro, seguindo padrões internacionais de qualidade científica.

\\subsection{Objetivos}
\\begin{itemize}
    \\item Realizar análise exploratória dos dados
    \\item Aplicar métodos estatísticos apropriados
    \\item Gerar insights acionáveis
    \\item Validar hipóteses científicas
\\end{itemize}

\\section{Metodologia}
\\label{sec:metodologia}

\\subsection{Coleta de Dados}
Os dados foram coletados seguindo protocolos rigorosos de qualidade, garantindo representatividade e confiabilidade das informações.

\\subsection{Análise Estatística}
Foram aplicadas as seguintes técnicas:
\\begin{enumerate}
    \\item Estatística descritiva
    \\item Testes de normalidade
    \\item Análise de correlação
    \\item Testes de hipóteses
    \\item Modelagem preditiva
\\end{enumerate}

\\section{Resultados}
\\label{sec:resultados}

\\subsection{Análise Descritiva}
\\begin{table}[h]
\\centering
\\begin{tabular}{@{}lcc@{}}
\\toprule
Variável & Média & Desvio Padrão \\\\
\\midrule
Variável 1 & 5.23 & 1.45 \\\\
Variável 2 & 8.91 & 2.33 \\\\
Variável 3 & 12.67 & 3.21 \\\\
\\bottomrule
\\end{tabular}
\\caption{Estatísticas descritivas das principais variáveis}
\\end{table}

\\subsection{Correlações}
A matriz de correlação revela relacionamentos significativos entre as variáveis estudadas (p < 0.05).

\\section{Discussão}
\\label{sec:discussao}

Os resultados obtidos demonstram padrões consistentes com a literatura científica existente. As correlações identificadas sugerem relações causais que merecem investigação adicional.

\\section{Limitações}
\\label{sec:limitacoes}

\\begin{itemize}
    \\item Tamanho amostral pode limitar generalizações
    \\item Variáveis confundidoras não foram controladas
    \\item Análise temporal limitada
\\end{itemize}

\\section{Conclusões}
\\label{sec:conclusoes}

Este estudo fornece evidências robustas para as hipóteses testadas. Recomenda-se:
\\begin{enumerate}
    \\item Expansão da amostra
    \\item Estudos longitudinais
    \\item Validação externa dos resultados
\\end{enumerate}

\\section{Referências}
\\label{sec:referencias}

\\begin{thebibliography}{9}
\\bibitem{r1} Smith, J. et al. (2023). Advanced Data Analysis Methods. Journal of Data Science, 15(3), 45-67.
\\bibitem{r2} Johnson, A. (2022). Statistical Modeling in Practice. Academic Press.
\\bibitem{r3} Brown, M. & Davis, K. (2021). Modern Approaches to Data Mining. Nature Methods, 18, 123-134.
\\end{thebibliography}

\\appendix
\\section{Código R}
\\label{sec:codigo}

\\begin{verbatim}
# Análise estatística completa
library(tidyverse)
library(corrplot)
library(ggplot2)

# Carregar dados
data <- read.csv("dados.csv")

# Estatística descritiva
summary(data)

# Correlações
cor_matrix <- cor(data[numeric_vars])
corrplot(cor_matrix, method="circle")

# Teste de normalidade
shapiro.test(data$variavel1)

# Modelo linear
modelo <- lm(y ~ x1 + x2 + x3, data=data)
summary(modelo)
\\end{verbatim}

\\end{document}`;
    } else if (relatorio.categoria === 'Análise Exploratória') {
      conteudoRelatorio = `# ${relatorio.titulo}
## 📊 Relatório de Análise Exploratória de Dados

**📅 Data:** ${timestamp} ${timeStr}
**👨‍🎓 Analista:** Prof. Vagner Cordeiro
**🏢 Plataforma:** DataScience Pro
**📋 Categoria:** ${relatorio.categoria}

---

## 🎯 **QUANDO USAR ESTE MODELO:**

✅ **Use para:**
- Primeira análise de um novo dataset
- Identificar padrões nos dados
- Detectar outliers e anomalias
- Preparar dados para modelagem
- Gerar hipóteses iniciais

❌ **NÃO use para:**
- Análises confirmatórias
- Relatórios finais de pesquisa
- Apresentações executivas formais

---

## 📋 **SUMÁRIO EXECUTIVO**

${relatorio.descricao}

**Principais Descobertas:**
- ✅ Identificação de 3 clusters distintos nos dados
- ⚠️ Presença de 5% de valores outliers
- 📈 Correlação forte entre variáveis X e Y (r=0.85)
- 📊 Distribuição normal confirmada para variável principal

---

## 🔍 **1. VISÃO GERAL DOS DADOS**

### 📊 Dimensões do Dataset
- **Registros:** 1.245 observações
- **Variáveis:** 15 colunas
- **Período:** Janeiro 2023 - Dezembro 2023
- **Completude:** 98.5% (sem valores missing críticos)

### 🏷️ Tipos de Variáveis
| Tipo | Quantidade | Exemplos |
|------|------------|----------|
| Numéricas | 8 | idade, salário, pontuação |
| Categóricas | 5 | departamento, categoria, região |
| Data/Tempo | 2 | data_admissão, última_avaliação |

---

## 📈 **2. ANÁLISE DESCRITIVA**

### 📊 Estatísticas das Variáveis Numéricas

| Variável | Média | Mediana | Desvio Padrão | Min | Max | Outliers |
|----------|-------|---------|---------------|-----|-----|----------|
| Idade | 32.4 | 31.0 | 8.2 | 22 | 58 | 3 |
| Salário | R$ 5.650 | R$ 5.200 | R$ 2.100 | R$ 2.800 | R$ 15.000 | 12 |
| Experiência | 5.8 anos | 5.0 anos | 3.4 anos | 1 | 20 | 5 |

### 🏷️ Distribuição das Variáveis Categóricas

**Departamento:**
- TI: 35% (435 funcionários)
- Marketing: 25% (311 funcionários)  
- Vendas: 20% (249 funcionários)
- Outros: 20% (250 funcionários)

---

## 🔗 **3. ANÁLISE DE CORRELAÇÕES**

### 🌡️ Matriz de Correlação (Principais)
\`\`\`
               Salário  Experiência  Idade  Satisfação
Salário         1.00      0.85      0.67      0.34
Experiência     0.85      1.00      0.72      0.28
Idade           0.67      0.72      1.00      0.15
Satisfação      0.34      0.28      0.15      1.00
\`\`\`

### 🔍 **Interpretação:**
- **Forte correlação:** Salário ↔ Experiência (0.85)
- **Correlação moderada:** Experiência ↔ Idade (0.72)
- **Correlação fraca:** Satisfação com outras variáveis

---

## ⚠️ **4. DETECÇÃO DE ANOMALIAS**

### 🚨 Outliers Identificados
1. **Salários extremos:** 12 casos acima de R$ 12.000
2. **Idade atípica:** 3 funcionários com mais de 55 anos
3. **Experiência inconsistente:** 5 casos de alta experiência com baixa idade

### 🧹 **Recomendações de Limpeza:**
- Investigar salários outliers (possíveis executivos?)
- Validar dados de experiência vs idade
- Considerar transformação log para salários

---

## 📊 **5. PADRÕES E INSIGHTS**

### ✨ **Descobertas Principais:**

1. **🎯 Segmentação Natural:**
   - Junior (22-28 anos): R$ 3.500 média
   - Pleno (29-35 anos): R$ 5.800 média  
   - Senior (36+ anos): R$ 8.200 média

2. **📈 Tendências Temporais:**
   - Crescimento salarial médio: 8% ao ano
   - Rotatividade maior em Q1 e Q3
   - Pico de contratações em Q2

3. **🏢 Diferenças Departamentais:**
   - TI: maiores salários (+25% da média)
   - Marketing: maior satisfação (8.2/10)
   - Vendas: maior rotatividade (15% ao ano)

---

## 🔮 **6. HIPÓTESES PARA INVESTIGAÇÃO**

### 🧪 **Hipóteses Geradas:**
1. **H1:** Experiência é o principal preditor de salário
2. **H2:** Satisfação varia significativamente por departamento  
3. **H3:** Existe viés de gênero nos salários
4. **H4:** Funcionários admitidos em Q2 têm maior retenção

### 🔬 **Testes Recomendados:**
- ANOVA para diferenças salariais por departamento
- Regressão múltipla para fatores do salário
- Teste qui-quadrado para independência categóricas
- Análise de sobrevivência para rotatividade

---

## 📋 **7. CHECKLIST DE QUALIDADE DOS DADOS**

### ✅ **Aprovado:**
- [x] Sem valores missing críticos
- [x] Formatos consistentes
- [x] Distribuições plausíveis
- [x] Chaves únicas válidas

### ⚠️ **Atenção:**
- [ ] Outliers precisam investigação
- [ ] Algumas datas inconsistentes
- [ ] Encoding de caracteres especiais

---

## 🎯 **8. PRÓXIMOS PASSOS RECOMENDADOS**

### 📅 **Curto Prazo (1-2 semanas):**
1. Limpeza de outliers identificados
2. Validação de dados suspeitos
3. Criação de variáveis derivadas
4. Análise de missing patterns

### 📅 **Médio Prazo (1 mês):**
1. Análise confirmatória das hipóteses
2. Modelagem preditiva inicial
3. Análise de segmentação avançada
4. Dashboard interativo

### 📅 **Longo Prazo (3 meses):**
1. Modelo de retenção de funcionários
2. Sistema de alertas de anomalias
3. Relatório automatizado mensal
4. Integração com sistema HR

---

## 🛠️ **FERRAMENTAS E CÓDIGOS UTILIZADOS**

### 🐍 **Python - Análise Exploratória**
\`\`\`python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats

# Carregar dados
df = pd.read_csv('dados.csv')

# Informações básicas
print(df.info())
print(df.describe())

# Matriz de correlação
correlation_matrix = df.corr()
plt.figure(figsize=(10, 8))
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm')
plt.title('Matriz de Correlação')
plt.show()

# Detecção de outliers (IQR)
def detect_outliers(df, column):
    Q1 = df[column].quantile(0.25)
    Q3 = df[column].quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR
    outliers = df[(df[column] < lower_bound) | (df[column] > upper_bound)]
    return outliers

# Aplicar para cada variável numérica
numeric_columns = df.select_dtypes(include=[np.number]).columns
for col in numeric_columns:
    outliers = detect_outliers(df, col)
    print(f"Outliers em {col}: {len(outliers)}")
\`\`\`

### 📊 **R - Estatísticas Avançadas**
\`\`\`r
library(tidyverse)
library(corrplot)
library(VIM)
library(mice)

# Carregar dados
dados <- read.csv("dados.csv")

# Análise de missing
VIM::aggr(dados, col=c('navyblue','red'), 
          numbers=TRUE, sortVars=TRUE)

# Teste de normalidade
shapiro.test(dados$salario)

# ANOVA
resultado_anova <- aov(salario ~ departamento, data=dados)
summary(resultado_anova)

# Correlação com significância
cor.test(dados$salario, dados$experiencia)
\`\`\`

---

## 📚 **GLOSSÁRIO E DEFINIÇÕES**

**📖 Termos Técnicos:**
- **Outlier:** Valor que se desvia significativamente do padrão
- **Correlação:** Medida de associação linear entre variáveis (-1 a +1)
- **IQR:** Amplitude interquartil (Q3 - Q1)
- **p-valor:** Probabilidade de observar resultado por acaso
- **ANOVA:** Análise de variância entre grupos

**📊 Métricas:**
- **Média:** Tendência central aritmética
- **Mediana:** Valor central da distribuição
- **Desvio Padrão:** Medida de dispersão dos dados
- **Coeficiente de Variação:** Dispersão relativa (%)

---

## ⚖️ **LIMITAÇÕES E CONSIDERAÇÕES**

### ⚠️ **Limitações do Estudo:**
1. **Temporal:** Análise limitada a 1 ano
2. **Amostral:** Dados de uma única organização
3. **Variáveis:** Algumas variáveis não coletadas
4. **Causalidade:** Correlação não implica causalidade

### 🔍 **Vieses Potenciais:**
- Viés de seleção na coleta
- Viés de sobrevivência (funcionários ativos)
- Viés de confirmação na interpretação

---

## 📞 **CONTATO E SUPORTE**

**📧 Analista Responsável:** Prof. Vagner Cordeiro
**🌐 Plataforma:** DataScience Pro
**📅 Data de Geração:** ${timestamp}
**⏰ Horário:** ${timeStr}

**📋 Para dúvidas sobre:**
- Metodologia utilizada
- Interpretação dos resultados  
- Códigos e ferramentas
- Próximos passos recomendados

---

*💡 Este relatório foi gerado automaticamente pela plataforma DataScience Pro seguindo as melhores práticas de análise exploratória de dados.*`;

    } else {
      // Template genérico melhorado
      conteudoRelatorio = `# ${relatorio.titulo}

## 📊 **GUIA DE UTILIZAÇÃO DESTE TEMPLATE**

### ✅ **QUANDO USAR:**
- Análises de dados científicas
- Relatórios corporativos
- Documentação de projetos
- Apresentações técnicas

### 📋 **COMO CUSTOMIZAR:**
1. Substitua os dados de exemplo pelos seus
2. Ajuste as seções conforme necessário
3. Adicione gráficos e tabelas específicas
4. Revise as conclusões e recomendações

---

**📅 Data:** ${timestamp}
**👨‍🎓 Autor:** Prof. Vagner Cordeiro  
**🏢 Organização:** DataScience Pro
**📂 Tipo:** ${relatorio.tipo}
**🏷️ Categoria:** ${relatorio.categoria}

---

## 🎯 **RESUMO EXECUTIVO**

${relatorio.descricao}

### 🔑 **Pontos-Chave:**
- ✅ Análise de [X] registros
- 📊 [Y] variáveis analisadas  
- 🎯 [Z] insights principais
- 💡 [W] recomendações

---

## 📋 **SUMÁRIO**

1. [Introdução](#introdução)
2. [Metodologia](#metodologia)
3. [Análise de Dados](#análise)
4. [Resultados](#resultados)
5. [Discussão](#discussão)
6. [Limitações](#limitações)
7. [Conclusões](#conclusões)
8. [Recomendações](#recomendações)
9. [Anexos](#anexos)

---

## 🚀 **1. INTRODUÇÃO**

### 🎯 **Objetivos**
- Objetivo principal: [Descrever o objetivo principal]
- Objetivos específicos:
  - [ ] Objetivo específico 1
  - [ ] Objetivo específico 2
  - [ ] Objetivo específico 3

### ❓ **Questões de Pesquisa**
1. [Questão principal de pesquisa]
2. [Questão secundária 1]
3. [Questão secundária 2]

### 🔬 **Hipóteses**
- **H1:** [Hipótese principal]
- **H2:** [Hipótese secundária]
- **H0:** [Hipótese nula]

---

## 🔬 **2. METODOLOGIA**

### 📊 **Coleta de Dados**
- **Fonte:** [Origem dos dados]
- **Período:** [Período de coleta]
- **Amostra:** [Tamanho e características]
- **Método:** [Método de amostragem]

### 🛠️ **Ferramentas Utilizadas**
- **Linguagem:** Python/R
- **Bibliotecas:** pandas, numpy, matplotlib, seaborn
- **Software:** Jupyter Notebook, RStudio
- **Plataforma:** DataScience Pro

### 📈 **Métodos Estatísticos**
1. **Análise Descritiva**
   - Medidas de tendência central
   - Medidas de dispersão
   - Distribuições de frequência

2. **Análise Inferencial**
   - Testes de hipóteses
   - Intervalos de confiança
   - Análise de correlação

3. **Modelagem**
   - Regressão linear/logística
   - Árvores de decisão
   - Validação cruzada

---

## 📊 **3. ANÁLISE DE DADOS**

### 📋 **Características dos Dados**

| Métrica | Valor |
|---------|--------|
| Total de Registros | [N] |
| Variáveis Numéricas | [X] |
| Variáveis Categóricas | [Y] |
| Missing Values | [Z%] |
| Período Analisado | [Período] |

### 🔍 **Análise Exploratória**

#### 📊 **Estatísticas Descritivas**
\`\`\`
Variável 1:
- Média: [valor]
- Mediana: [valor] 
- Desvio Padrão: [valor]
- Mínimo: [valor]
- Máximo: [valor]
\`\`\`

#### 🔗 **Correlações Principais**
- Variável A ↔ Variável B: r = 0.XX (p < 0.05)
- Variável C ↔ Variável D: r = 0.XX (p < 0.01)

### ⚠️ **Qualidade dos Dados**
- ✅ Sem valores missing críticos
- ✅ Formatos consistentes
- ⚠️ [X] outliers identificados
- ⚠️ [Y] inconsistências menores

---

## 🎯 **4. RESULTADOS**

### 📈 **Descobertas Principais**

#### ✨ **Insight 1: [Título]**
- **Descrição:** [Descrição detalhada]
- **Evidência:** [Dados que suportam]
- **Significância:** p < 0.05
- **Impacto:** [Impacto prático]

#### 🔍 **Insight 2: [Título]**
- **Descrição:** [Descrição detalhada]
- **Evidência:** [Dados que suportam]
- **Significância:** p < 0.01
- **Impacto:** [Impacto prático]

### 📊 **Resultados dos Testes**

| Teste | Estatística | p-valor | Resultado |
|-------|-------------|---------|-----------|
| Teste t | t = X.XX | p < 0.05 | Rejeita H0 |
| ANOVA | F = Y.YY | p < 0.01 | Significativo |
| Chi-quadrado | χ² = Z.ZZ | p > 0.05 | Não significativo |

---

## 💬 **5. DISCUSSÃO**

### 🔍 **Interpretação dos Resultados**
[Discussão detalhada dos resultados encontrados, comparação com literatura existente, implicações teóricas e práticas]

### 🔗 **Relação com Literatura**
- Resultado X corrobora estudos de [Autor, Ano]
- Resultado Y contradiz findings de [Autor, Ano]
- Nova evidência para [área específica]

### 💡 **Implicações Práticas**
1. **Para gestores:** [Implicação específica]
2. **Para pesquisadores:** [Implicação específica]  
3. **Para políticas:** [Implicação específica]

---

## ⚠️ **6. LIMITAÇÕES**

### 🚧 **Limitações Metodológicas**
- Desenho transversal limita inferência causal
- Amostra não probabilística
- Variáveis confundidoras não controladas

### 📊 **Limitações dos Dados**
- Missing values em variáveis importantes
- Período limitado de observação
- Possível viés de seleção

### 🔬 **Limitações Analíticas**
- Pressupostos de normalidade não atendidos
- Multicolinearidade entre variáveis
- Poder estatístico limitado para subgrupos

---

## ✅ **7. CONCLUSÕES**

### 🎯 **Principais Achados**
1. **[Conclusão 1]:** [Evidência suportiva]
2. **[Conclusão 2]:** [Evidência suportiva]
3. **[Conclusão 3]:** [Evidência suportiva]

### ❓ **Respostas às Questões de Pesquisa**
- **Q1:** [Resposta baseada em evidências]
- **Q2:** [Resposta baseada em evidências]
- **Q3:** [Resposta baseada em evidências]

### 🎯 **Validação de Hipóteses**
- **H1:** ✅ Confirmada (p < 0.05)
- **H2:** ❌ Rejeitada (p > 0.05)
- **H3:** ⚠️ Parcialmente confirmada

---

## 💡 **8. RECOMENDAÇÕES**

### 📅 **Curto Prazo (1-3 meses)**
1. **[Recomendação 1]**
   - Ação: [Ação específica]
   - Responsável: [Quem]
   - Prazo: [Quando]
   - KPI: [Como medir]

### 📅 **Médio Prazo (3-6 meses)**
2. **[Recomendação 2]**
   - Ação: [Ação específica]
   - Responsável: [Quem]
   - Prazo: [Quando]
   - KPI: [Como medir]

### 📅 **Longo Prazo (6-12 meses)**
3. **[Recomendação 3]**
   - Ação: [Ação específica]
   - Responsável: [Quem]
   - Prazo: [Quando]
   - KPI: [Como medir]

---

## 📚 **9. ANEXOS**

### 📊 **Anexo A: Códigos Utilizados**

#### 🐍 **Python**
\`\`\`python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats

# Carregar dados
df = pd.read_csv('dados.csv')

# Estatísticas descritivas
print(df.describe())

# Correlações
correlation_matrix = df.corr()
sns.heatmap(correlation_matrix, annot=True)
plt.show()

# Teste t
from scipy.stats import ttest_ind
statistic, pvalue = ttest_ind(group1, group2)
print(f"t-statistic: {statistic}, p-value: {pvalue}")
\`\`\`

#### 📊 **R**
\`\`\`r
# Carregar bibliotecas
library(tidyverse)
library(corrplot)

# Carregar dados  
dados <- read.csv("dados.csv")

# Análise descritiva
summary(dados)

# Correlações
cor_matrix <- cor(dados[sapply(dados, is.numeric)])
corrplot(cor_matrix, method="circle")

# ANOVA
resultado <- aov(variavel_dependente ~ variavel_independente, data=dados)
summary(resultado)
\`\`\`

### 📈 **Anexo B: Gráficos Adicionais**
[Espaço para gráficos complementares]

### 📊 **Anexo C: Tabelas Detalhadas**
[Espaço para tabelas com dados completos]

---

## 📞 **CONTATO**

**📧 Analista:** Prof. Vagner Cordeiro
**🏢 Organização:** DataScience Pro
**🌐 Website:** [URL da plataforma]
**📱 LinkedIn:** [Perfil LinkedIn]

**📅 Data de Geração:** ${timestamp}
**⏰ Horário:** ${timeStr}
**🔄 Versão:** 1.0

---

*✨ Relatório gerado automaticamente pela plataforma DataScience Pro usando as melhores práticas de análise científica de dados.*

## 📋 **CHECKLIST DE REVISÃO**

Antes de finalizar, verifique:
- [ ] Todos os dados foram atualizados
- [ ] Gráficos estão legíveis e informativos
- [ ] Conclusões são suportadas por evidências
- [ ] Limitações foram adequadamente discutidas
- [ ] Recomendações são específicas e acionáveis
- [ ] Formatação está consistente
- [ ] Referências estão completas
- [ ] Anexos estão organizados

---

**🔚 FIM DO RELATÓRIO**`;
    }

    // Criar e fazer download do arquivo
    const blob = new Blob([conteudoRelatorio], { 
      type: relatorio.tipo === 'PDF' ? 'text/plain' : 'text/markdown'
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    // Nome do arquivo baseado no tipo
    const fileExtension = relatorio.tipo === 'PDF' ? '.tex' : '.md';
    const fileName = `${relatorio.titulo.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}${fileExtension}`;
    link.download = fileName;
    
    // Forçar download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Mostrar notificação de sucesso
    alert(`✅ Relatório "${relatorio.titulo}" baixado com sucesso!\n\n📁 Arquivo: ${fileName}\n📊 Tipo: ${relatorio.tipo}\n📝 Formato: ${fileExtension.toUpperCase()}\n\n💡 Este template inclui:\n• Guia completo de utilização\n• Códigos Python e R\n• Metodologia científica\n• Exemplos práticos`);

    // Incrementar contador de downloads
    setRelatorios(prev => 
      prev.map(r => 
        r.id === relatorio.id 
          ? { ...r, downloads: r.downloads + 1 }
          : r
      )
    );
  };

  const templates = [
    {
      id: 'template-1',
      nome: 'Análise Estatística Descritiva Completa',
      descricao: 'Template profissional para análise exploratória de dados com metodologia científica rigorosa',
      categoria: 'Estatística',
      icone: 'BarChart',
      secoes: [
        '1. Resumo Executivo',
        '2. Introdução e Objetivos',
        '3. Metodologia Estatística',
        '4. Descrição dos Dados',
        '5. Análise Univariada',
        '6. Análise Bivariada e Multivariada',
        '7. Testes de Normalidade e Outliers',
        '8. Visualizações e Gráficos',
        '9. Interpretação dos Resultados',
        '10. Limitações do Estudo',
        '11. Conclusões e Recomendações',
        '12. Referências Bibliográficas'
      ],
      incluiCodigo: true,
      formatoSaida: ['PDF', 'HTML', 'LaTeX', 'Word'],
      tempoEstimado: '15-20 minutos',
      complexidade: 'Intermediário'
    },
    {
      id: 'template-2',
      nome: 'Relatório de Machine Learning Avançado',
      descricao: 'Template completo para documentação de projetos de ML seguindo padrões acadêmicos',
      categoria: 'Machine Learning',
      icone: 'Analytics',
      secoes: [
        '1. Abstract/Resumo',
        '2. Definição do Problema',
        '3. Revisão da Literatura',
        '4. Coleta e Preparação dos Dados',
        '5. Análise Exploratória dos Dados (EDA)',
        '6. Feature Engineering',
        '7. Seleção do Modelo',
        '8. Treinamento e Hiperparâmetros',
        '9. Validação e Métricas',
        '10. Análise de Erros',
        '11. Interpretabilidade do Modelo',
        '12. Deployment e Monitoramento',
        '13. Conclusões e Trabalhos Futuros',
        '14. Código Fonte e Reprodutibilidade'
      ],
      incluiCodigo: true,
      formatoSaida: ['PDF', 'HTML', 'Jupyter Notebook'],
      tempoEstimado: '25-30 minutos',
      complexidade: 'Avançado'
    },
    {
      id: 'template-3',
      nome: 'Teste de Hipóteses Científico',
      descricao: 'Template para testes estatísticos seguindo metodologia científica rigorosa',
      categoria: 'Inferência Estatística',
      icone: 'Science',
      secoes: [
        '1. Resumo',
        '2. Formulação das Hipóteses',
        '3. Definição das Variáveis',
        '4. Metodologia Estatística',
        '5. Pressupostos do Teste',
        '6. Cálculo da Estatística de Teste',
        '7. P-valor e Significância',
        '8. Tamanho do Efeito',
        '9. Poder Estatístico',
        '10. Intervalos de Confiança',
        '11. Interpretação dos Resultados',
        '12. Discussão e Limitações'
      ],
      incluiCodigo: true,
      formatoSaida: ['PDF', 'HTML', 'LaTeX'],
      tempoEstimado: '10-15 minutos',
      complexidade: 'Intermediário'
    },
    {
      id: 'template-4',
      nome: 'Análise de Séries Temporais',
      descricao: 'Template especializado para análise temporal com previsões e sazonalidade',
      categoria: 'Séries Temporais',
      icone: 'TrendingUp',
      secoes: [
        '1. Introdução e Contexto',
        '2. Descrição da Série Temporal',
        '3. Análise de Tendência',
        '4. Análise de Sazonalidade',
        '5. Detecção de Outliers',
        '6. Decomposição da Série',
        '7. Testes de Estacionariedade',
        '8. Modelagem (ARIMA, SARIMA, etc.)',
        '9. Validação do Modelo',
        '10. Previsões e Intervalos',
        '11. Avaliação da Qualidade',
        '12. Conclusões e Projeções'
      ],
      incluiCodigo: true,
      formatoSaida: ['PDF', 'HTML', 'R Markdown'],
      tempoEstimado: '20-25 minutos',
      complexidade: 'Avançado'
    },
    {
      id: 'template-5',
      nome: 'Relatório Executivo de BI',
      descricao: 'Template para relatórios executivos com dashboards e KPIs',
      categoria: 'Business Intelligence',
      icone: 'Assessment',
      secoes: [
        '1. Sumário Executivo',
        '2. KPIs Principais',
        '3. Análise de Performance',
        '4. Benchmarking',
        '5. Tendências Identificadas',
        '6. Análise de Segmentação',
        '7. Recomendações Estratégicas',
        '8. Plano de Ação',
        '9. Métricas de Acompanhamento',
        '10. Apêndices e Dados Técnicos'
      ],
      incluiCodigo: false,
      formatoSaida: ['PDF', 'PowerPoint', 'HTML'],
      tempoEstimado: '10-15 minutos',
      complexidade: 'Básico'
    },
    {
      id: 'template-6',
      nome: 'Análise de Correlação e Regressão',
      descricao: 'Template para estudos de correlação e modelos de regressão',
      categoria: 'Análise de Relacionamentos',
      icone: 'TrendingUp',
      secoes: [
        '1. Objetivos do Estudo',
        '2. Variáveis de Interesse',
        '3. Análise de Correlação',
        '4. Matriz de Correlação',
        '5. Pressupostos da Regressão',
        '6. Modelo de Regressão',
        '7. Diagnóstico de Resíduos',
        '8. Multicolinearidade',
        '9. Validação do Modelo',
        '10. Interpretação dos Coeficientes',
        '11. R² e Qualidade do Ajuste',
        '12. Predições e Intervalos'
      ],
      incluiCodigo: true,
      formatoSaida: ['PDF', 'HTML', 'LaTeX'],
      tempoEstimado: '15-20 minutos',
      complexidade: 'Intermediário'
    },
    {
      id: 'template-7',
      nome: 'Estudo de Caso Científico',
      descricao: 'Template para documentação completa de estudos de caso em ciência de dados',
      categoria: 'Estudo de Caso',
      icone: 'Article',
      secoes: [
        '1. Abstract',
        '2. Introdução',
        '3. Contexto do Problema',
        '4. Revisão da Literatura',
        '5. Metodologia',
        '6. Coleta de Dados',
        '7. Análise e Resultados',
        '8. Discussão',
        '9. Implicações Práticas',
        '10. Limitações',
        '11. Conclusões',
        '12. Referências',
        '13. Anexos'
      ],
      incluiCodigo: true,
      formatoSaida: ['PDF', 'LaTeX', 'Word'],
      tempoEstimado: '30-40 minutos',
      complexidade: 'Avançado'
    },
    {
      id: 'template-8',
      nome: 'Análise de Experimentos (A/B Testing)',
      descricao: 'Template para documentação de experimentos e testes A/B',
      categoria: 'Experimentação',
      icone: 'Science',
      secoes: [
        '1. Desenho Experimental',
        '2. Hipóteses de Pesquisa',
        '3. Métricas e KPIs',
        '4. Randomização',
        '5. Tamanho da Amostra',
        '6. Coleta de Dados',
        '7. Análise Estatística',
        '8. Significância Estatística',
        '9. Significância Prática',
        '10. Análise de Subgrupos',
        '11. Limitações e Vieses',
        '12. Recomendações'
      ],
      incluiCodigo: true,
      formatoSaida: ['PDF', 'HTML', 'R Markdown'],
      tempoEstimado: '20-25 minutos',
      complexidade: 'Avançado'
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Article sx={{ mr: 2, color: 'primary.main' }} />
          Relatórios Científicos
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Centro completo para geração, gerenciamento e compartilhamento de relatórios científicos e técnicos.
        </Typography>
      </Box>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
          <Tab label="Meus Relatórios" icon={<Assessment />} />
          <Tab label="Gerar Novo" icon={<Add />} />
          <Tab label="Templates" icon={<Description />} />
          <Tab label="Tutoriais Passo a Passo" icon={<MenuBook />} />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      {tabValue === 0 && (
        <Box>
          {/* Filtros e Busca */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Buscar relatórios..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Tipo</InputLabel>
                <Select
                  value={filtroTipo}
                  label="Tipo"
                  onChange={(e) => setFiltroTipo(e.target.value)}
                >
                  {tipos.map(tipo => (
                    <MenuItem key={tipo} value={tipo}>
                      {tipo === 'todos' ? 'Todos os tipos' : tipo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Categoria</InputLabel>
                <Select
                  value={filtroCategoria}
                  label="Categoria"
                  onChange={(e) => setFiltroCategoria(e.target.value)}
                >
                  {categorias.map(categoria => (
                    <MenuItem key={categoria} value={categoria}>
                      {categoria === 'todos' ? 'Todas as categorias' : categoria}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<Add />}
                onClick={() => setDialogAberto(true)}
                sx={{ height: '56px' }}
              >
                Novo Relatório
              </Button>
            </Grid>
          </Grid>

          {/* Lista de Relatórios */}
          <Grid container spacing={3}>
            {relatoriosFiltrados.map((relatorio) => (
              <Grid item xs={12} md={6} lg={4} key={relatorio.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Chip 
                        label={relatorio.tipo} 
                        size="small" 
                        color="primary" 
                        variant="outlined" 
                      />
                      <Chip 
                        label={relatorio.status} 
                        size="small" 
                        color={relatorio.status === 'completo' ? 'success' : relatorio.status === 'processando' ? 'warning' : 'error'}
                      />
                    </Box>
                    
                    <Typography variant="h6" gutterBottom>
                      {relatorio.titulo}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {relatorio.descricao}
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      {relatorio.tags.map((tag, index) => (
                        <Chip 
                          key={index} 
                          label={tag} 
                          size="small" 
                          sx={{ mr: 0.5, mb: 0.5 }} 
                        />
                      ))}
                    </Box>
                    
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                      Por {relatorio.autor} • {relatorio.dataGeracao} • {relatorio.tamanho}
                    </Typography>
                    
                    <Typography variant="caption" color="text.secondary">
                      {relatorio.downloads} downloads
                    </Typography>
                  </CardContent>
                  
                  <Divider />
                  
                  <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Visualizar">
                        <IconButton 
                          size="small" 
                          onClick={() => handleVisualizarRelatorio(relatorio)}
                          disabled={relatorio.status !== 'completo'}
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Download">
                        <IconButton 
                          size="small"
                          disabled={relatorio.status !== 'completo'}
                          onClick={() => handleDownloadRelatorio(relatorio)}
                        >
                          <GetApp />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Compartilhar">
                        <IconButton 
                          size="small"
                          disabled={relatorio.status !== 'completo'}
                        >
                          <Share />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                    
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Editar">
                        <IconButton size="small">
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Excluir">
                        <IconButton size="small" color="error">
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Box>
                  
                  {relatorio.status === 'processando' && (
                    <LinearProgress />
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
          
          {relatoriosFiltrados.length === 0 && (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Assessment sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                Nenhum relatório encontrado
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Tente ajustar os filtros ou criar um novo relatório.
              </Typography>
              <Button variant="contained" startIcon={<Add />} onClick={() => setDialogAberto(true)}>
                Criar Primeiro Relatório
              </Button>
            </Paper>
          )}
        </Box>
      )}

      {tabValue === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Criar Novo Relatório
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Título do Relatório"
                    value={novoRelatorio.titulo}
                    onChange={(e) => setNovoRelatorio({...novoRelatorio, titulo: e.target.value})}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Tipo de Análise</InputLabel>
                    <Select
                      value={novoRelatorio.tipo}
                      label="Tipo de Análise"
                      onChange={(e) => setNovoRelatorio({...novoRelatorio, tipo: e.target.value})}
                    >
                      <MenuItem value="Estatístico">Análise Estatística</MenuItem>
                      <MenuItem value="Machine Learning">Machine Learning</MenuItem>
                      <MenuItem value="Hipóteses">Teste de Hipóteses</MenuItem>
                      <MenuItem value="Correlacional">Análise Correlacional</MenuItem>
                      <MenuItem value="Regressão">Análise de Regressão</MenuItem>
                      <MenuItem value="Temporal">Séries Temporais</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Categoria</InputLabel>
                    <Select
                      value={novoRelatorio.categoria}
                      label="Categoria"
                      onChange={(e) => setNovoRelatorio({...novoRelatorio, categoria: e.target.value})}
                    >
                      <MenuItem value="Vendas">Vendas</MenuItem>
                      <MenuItem value="Marketing">Marketing</MenuItem>
                      <MenuItem value="Previsão">Previsão</MenuItem>
                      <MenuItem value="Satisfação">Satisfação</MenuItem>
                      <MenuItem value="Imobiliário">Imobiliário</MenuItem>
                      <MenuItem value="Financeiro">Financeiro</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Descrição"
                    value={novoRelatorio.descricao}
                    onChange={(e) => setNovoRelatorio({...novoRelatorio, descricao: e.target.value})}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<AutoAwesome />}
                    onClick={handleGerarRelatorio}
                    disabled={!novoRelatorio.titulo || !novoRelatorio.tipo || !novoRelatorio.categoria}
                  >
                    Gerar Relatório
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Dicas de Boas Práticas
              </Typography>
              
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <Science fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Metodologia Clara"
                    secondary="Descreva detalhadamente os métodos utilizados"
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <BarChart fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Visualizações"
                    secondary="Inclua gráficos e tabelas explicativas"
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <TrendingUp fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Resultados Objetivos"
                    secondary="Apresente conclusões baseadas em evidências"
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Assessment fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Reprodutibilidade"
                    secondary="Documente todos os passos para reprodução"
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      )}

      {tabValue === 2 && (
        <Box>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Templates Profissionais
          </Typography>
          
          <Grid container spacing={3}>
            {templates.map((template, index) => (
              <Grid item xs={12} md={6} lg={4} key={template.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      transition: 'transform 0.2s ease-in-out'
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {template.icone === 'BarChart' && <BarChart color="primary" />}
                      {template.icone === 'Analytics' && <Analytics color="primary" />}
                      {template.icone === 'Science' && <Science color="primary" />}
                      {template.icone === 'TrendingUp' && <TrendingUp color="primary" />}
                      {template.icone === 'Assessment' && <Assessment color="primary" />}
                      {template.icone === 'Article' && <Article color="primary" />}
                      {template.icone === 'ScatterPlot' && <BarChart color="primary" />}
                      <Typography variant="h6" sx={{ ml: 1 }}>
                        {template.nome}
                      </Typography>
                    </Box>
                    
                    <Chip 
                      label={template.categoria} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {template.descricao}
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
                        <Chip 
                          label={`⏱️ ${template.tempoEstimado}`} 
                          size="small" 
                          variant="outlined"
                        />
                        <Chip 
                          label={`📊 ${template.complexidade}`} 
                          size="small" 
                          variant="outlined"
                          color={template.complexidade === 'Básico' ? 'success' : 
                                 template.complexidade === 'Intermediário' ? 'warning' : 'error'}
                        />
                      </Stack>
                      
                      {template.incluiCodigo && (
                        <Chip 
                          label="💻 Inclui Código" 
                          size="small" 
                          color="info"
                          variant="outlined"
                        />
                      )}
                    </Box>
                    
                    <Typography variant="subtitle2" gutterBottom>
                      Formatos de Saída:
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
                      {template.formatoSaida.map((formato, idx) => (
                        <Chip 
                          key={idx}
                          label={formato} 
                          size="small" 
                          variant="filled"
                          color="secondary"
                        />
                      ))}
                    </Stack>
                    
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="subtitle2">
                          Ver Seções ({template.secoes.length})
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <List dense>
                          {template.secoes.map((secao, secaoIndex) => (
                            <ListItem key={secaoIndex} sx={{ py: 0.25 }}>
                              <ListItemText 
                                primary={secao}
                                primaryTypographyProps={{ variant: 'body2' }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </AccordionDetails>
                    </Accordion>
                  </CardContent>
                  
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Stack direction="row" spacing={1}>
                      <Button 
                        variant="contained" 
                        fullWidth
                        onClick={() => {
                          setNovoRelatorio({
                            ...novoRelatorio,
                            template: template.id,
                            tipo: template.categoria
                          });
                          setTabValue(1);
                        }}
                      >
                        Usar Template
                      </Button>
                      <Tooltip title="Visualizar Preview">
                        <IconButton>
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Paper sx={{ mt: 4, p: 3, bgcolor: 'primary.50' }}>
            <Typography variant="h6" gutterBottom>
              💡 Dica Pro: Templates Personalizados
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Precisa de um template específico para sua área? Nossa IA pode gerar templates customizados 
              baseados em suas necessidades específicas de pesquisa.
            </Typography>
            <Button variant="outlined" startIcon={<AutoAwesome />}>
              Solicitar Template Personalizado
            </Button>
          </Paper>
        </Box>
      )}

      {tabValue === 3 && (
        <Box>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            📚 Tutoriais Passo a Passo Completos
          </Typography>
          
          <Alert severity="success" sx={{ mb: 4 }}>
            <strong>Aprenda a criar relatórios científicos profissionais!</strong><br/>
            Tutoriais detalhados com exemplos práticos, códigos e explicações científicas.
          </Alert>

          <Grid container spacing={3}>
            {[
              {
                id: 'estrutura-relatorio',
                titulo: '📋 Como Estruturar um Relatório Científico Completo',
                descricao: 'Aprenda a organizar um relatório seguindo rigorosamente os padrões acadêmicos internacionais.',
                nivel: 'Fundamental',
                tempo: '15 minutos',
                passos: [
                  {
                    numero: 1,
                    titulo: 'Título e Cabeçalho',
                    conteudo: 'O título deve ser específico, descritivo e conter as palavras-chave principais. Deve responder: O QUE foi estudado, ONDE e QUANDO.',
                    exemplo: '❌ Ruim: "Análise de Dados"\n✅ Bom: "Análise Multivariada de Fatores Socioeconômicos Associados ao Desempenho Escolar em Municípios de Santa Catarina (2020-2023)"',
                    dica: 'Use entre 10-15 palavras. Evite abreviações e jargões.'
                  },
                  {
                    numero: 2,
                    titulo: 'Resumo Executivo (Abstract)',
                    conteudo: 'Seção mais importante! Em 150-250 palavras, apresente: Objetivo, Metodologia, Principais Resultados e Conclusão.',
                    exemplo: 'ESTRUTURA:\n• Contexto (1-2 frases)\n• Objetivo (1 frase)\n• Metodologia (2-3 frases)\n• Resultados principais (2-3 frases)\n• Conclusão e implicações (1-2 frases)',
                    dica: 'Escreva o resumo por último, quando já souber todos os resultados.'
                  },
                  {
                    numero: 3,
                    titulo: 'Introdução e Fundamentação Teórica',
                    conteudo: 'Contextualize o problema, apresente a revisão da literatura e estabeleça a justificativa científica.',
                    exemplo: 'SEQUÊNCIA LÓGICA:\n1. Contextualização ampla do tema\n2. Revisão da literatura (O que já sabemos?)\n3. Identificação da lacuna (O que não sabemos?)\n4. Justificativa (Por que é importante?)\n5. Objetivos claros (O que vamos fazer?)',
                    dica: 'Use pelo menos 15-20 referências científicas atuais (últimos 5 anos).'
                  },
                  {
                    numero: 4,
                    titulo: 'Metodologia Científica Detalhada',
                    conteudo: 'Descreva EXATAMENTE como o estudo foi conduzido para garantir reprodutibilidade.',
                    exemplo: 'INCLUA OBRIGATORIAMENTE:\n• Tipo de estudo (observacional, experimental, etc.)\n• População e amostra (critérios de inclusão/exclusão)\n• Coleta de dados (quando, onde, como)\n• Variáveis estudadas (definição operacional)\n• Métodos estatísticos (testes, nível de significância)\n• Software utilizado (versão)',
                    dica: 'Outro pesquisador deve conseguir reproduzir exatamente seu estudo.'
                  },
                  {
                    numero: 5,
                    titulo: 'Resultados com Evidências',
                    conteudo: 'Apresente APENAS os resultados, sem interpretações. Use tabelas e gráficos profissionais.',
                    exemplo: 'ESTRUTURA DOS RESULTADOS:\n• Estatísticas descritivas primeiro\n• Resultados das análises principais\n• Resultados de análises secundárias\n• Use p-valores, intervalos de confiança\n• Gráficos com barras de erro\n• Tabelas bem formatadas',
                    dica: 'NUNCA misture resultados com discussão nesta seção.'
                  },
                  {
                    numero: 6,
                    titulo: 'Discussão Científica',
                    conteudo: 'AGORA sim interprete os resultados, compare com literatura e discuta limitações.',
                    exemplo: 'FLUXO DA DISCUSSÃO:\n1. Reafirme os principais achados\n2. Compare com estudos similares\n3. Explique possíveis mecanismos\n4. Discuta limitações honestamente\n5. Implicações práticas\n6. Sugestões para estudos futuros',
                    dica: 'Seja autocrítico. Discussão robusta inclui limitações e incertezas.'
                  },
                  {
                    numero: 7,
                    titulo: 'Conclusões e Recomendações',
                    conteudo: 'Resuma os principais achados e suas implicações práticas. Seja objetivo e direto.',
                    exemplo: 'ELEMENTOS DAS CONCLUSÕES:\n• Retome os objetivos\n• Confirme/rejeite hipóteses\n• Destaque achados principais\n• Limitações importantes\n• Recomendações práticas\n• Sugestões de pesquisa',
                    dica: 'Não inclua informações novas que não foram discutidas antes.'
                  }
                ],
                recursos: [
                  'Template LaTeX científico',
                  'Checklist de qualidade',
                  'Exemplos de relatórios aprovados',
                  'Lista de journals por área'
                ]
              },
              {
                id: 'visualizacao-dados',
                titulo: '📊 Visualização de Dados para Relatórios Científicos',
                descricao: 'Crie gráficos que comunicam efetivamente seus resultados e insights científicos.',
                nivel: 'Intermediário',
                tempo: '20 minutos',
                passos: [
                  {
                    numero: 1,
                    titulo: 'Princípios de Design de Gráficos Científicos',
                    conteudo: 'Gráficos científicos devem priorizar clareza, precisão e honestidade na representação dos dados.',
                    exemplo: 'PRINCÍPIOS FUNDAMENTAIS:\n• Simplicidade (remova elementos desnecessários)\n• Precisão (barras de erro, intervalos de confiança)\n• Contexto (títulos descritivos, legendas completas)\n• Acessibilidade (cores para daltônicos)\n• Proporcionalidade (escalas apropriadas)',
                    dica: 'Regra de ouro: seu gráfico deve ser compreensível sem ler o texto.'
                  },
                  {
                    numero: 2,
                    titulo: 'Escolha do Tipo de Gráfico Adequado',
                    conteudo: 'Cada tipo de dado requer um tipo específico de visualização para máxima efetividade.',
                    exemplo: 'GUIA DE SELEÇÃO:\n• Comparar categorias → Gráfico de barras\n• Mostrar tendência temporal → Gráfico de linha\n• Mostrar correlação → Scatter plot\n• Mostrar distribuição → Histograma ou boxplot\n• Mostrar composição → Gráfico de pizza (só se <6 categorias)\n• Mostrar outliers → Boxplot com pontos',
                    dica: 'NUNCA use gráfico de pizza para mais de 5 categorias.'
                  },
                  {
                    numero: 3,
                    titulo: 'Formatação Profissional',
                    conteudo: 'A formatação adequada distingue um gráfico amador de um profissional.',
                    exemplo: 'CHECKLIST DE FORMATAÇÃO:\n✓ Título descritivo e específico\n✓ Eixos rotulados com unidades\n✓ Legenda clara e posicionada adequadamente\n✓ Cores contrastantes e acessíveis\n✓ Tamanho de fonte legível (mín. 10pt)\n✓ Resolução alta (300 DPI para impressão)\n✓ Formato vetorial quando possível',
                    dica: 'Use no máximo 4-5 cores diferentes em um gráfico.'
                  },
                  {
                    numero: 4,
                    titulo: 'Barras de Erro e Intervalos de Confiança',
                    conteudo: 'Elementos essenciais para mostrar a incerteza estatística de seus resultados.',
                    exemplo: 'TIPOS DE BARRAS DE ERRO:\n• Desvio padrão (variabilidade dos dados)\n• Erro padrão (precisão da média)\n• Intervalo de confiança 95% (mais comum)\n• Percentis (para dados não-normais)\n\nUSE SEMPRE que apresentar médias ou proporções!',
                    dica: 'Explique na legenda que tipo de barra de erro está usando.'
                  },
                  {
                    numero: 5,
                    titulo: 'Código Python para Gráficos Científicos',
                    conteudo: 'Exemplos práticos de código para criar visualizações profissionais.',
                    exemplo: `# Gráfico de barras com barras de erro
import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns

# Configurar estilo científico
plt.style.use('seaborn-v0_8-whitegrid')
sns.set_palette("colorblind")

# Dados exemplo
grupos = ['Controle', 'Tratamento A', 'Tratamento B']
medias = [75.2, 82.1, 78.9]
erros = [3.1, 2.8, 3.5]  # Erro padrão

# Criar gráfico
fig, ax = plt.subplots(figsize=(8, 6))
bars = ax.bar(grupos, medias, yerr=erros, capsize=5, 
              color=['#1f77b4', '#ff7f0e', '#2ca02c'],
              alpha=0.8, edgecolor='black', linewidth=0.5)

# Formatação profissional
ax.set_ylabel('Escore de Performance (média ± EP)', fontsize=12)
ax.set_title('Comparação de Performance entre Grupos\\n(n=30 por grupo)', 
             fontsize=14, fontweight='bold')
ax.set_ylim(0, 100)

# Adicionar valores nas barras
for bar, media, erro in zip(bars, medias, erros):
    ax.text(bar.get_x() + bar.get_width()/2, media + erro + 1,
            f'{media:.1f}', ha='center', va='bottom', fontweight='bold')

plt.tight_layout()
plt.savefig('performance_grupos.png', dpi=300, bbox_inches='tight')
plt.show()`,
                    dica: 'Sempre salve em alta resolução (300 DPI) para publicações.'
                  }
                ],
                recursos: [
                  'Biblioteca de cores científicas',
                  'Templates de gráficos em Python/R',
                  'Checklist de qualidade visual',
                  'Exemplos de gráficos publicados'
                ]
              },
              {
                id: 'metodologia-estatistica',
                titulo: '🧮 Documentação de Metodologia Estatística',
                descricao: 'Como documentar corretamente todos os aspectos estatísticos de sua análise.',
                nivel: 'Avançado',
                tempo: '25 minutos',
                passos: [
                  {
                    numero: 1,
                    titulo: 'Justificativa da Escolha do Teste',
                    conteudo: 'Explique POR QUE escolheu cada teste estatístico baseado nas características dos dados.',
                    exemplo: 'EXEMPLO DE JUSTIFICATIVA:\n"Utilizou-se o teste t de Student para amostras independentes para comparar as médias entre os grupos, pois:\n• Os dados apresentaram distribuição normal (Shapiro-Wilk, p>0,05)\n• As variâncias eram homogêneas (Levene, p=0,23)\n• As observações eram independentes\n• Variável dependente contínua"',
                    dica: 'Sempre teste e reporte os pressupostos de cada teste.'
                  },
                  {
                    numero: 2,
                    titulo: 'Pressupostos e Validações',
                    conteudo: 'Documente TODOS os testes de pressupostos realizados e seus resultados.',
                    exemplo: 'PRESSUPOSTOS COMUNS:\n• Normalidade → Shapiro-Wilk, Kolmogorov-Smirnov\n• Homocedasticidade → Levene, Bartlett\n• Independência → Durbin-Watson\n• Linearidade → Gráficos de resíduos\n• Multicolinearidade → VIF, correlações\n\nREPORTE: "A normalidade foi testada usando Shapiro-Wilk (W=0,96, p=0,12)"',
                    dica: 'Se pressupostos forem violados, use testes alternativos (não-paramétricos).'
                  },
                  {
                    numero: 3,
                    titulo: 'Poder Estatístico e Tamanho do Efeito',
                    conteudo: 'Calcule e reporte o poder do teste e tamanhos de efeito para dar contexto aos resultados.',
                    exemplo: 'TAMANHOS DE EFEITO:\n• Cohen\'s d para diferenças de médias\n• Eta-quadrado (η²) para ANOVA\n• R² para regressão\n• Odds ratio para variáveis categóricas\n\n"A diferença entre grupos foi estatisticamente significativa (p<0,001) com tamanho de efeito grande (d=0,85, IC95%: 0,42-1,28)"',
                    dica: 'Significância estatística ≠ Relevância prática. Sempre reporte tamanho do efeito.'
                  },
                  {
                    numero: 4,
                    titulo: 'Múltiplas Comparações',
                    conteudo: 'Quando fizer múltiplos testes, ajuste os p-valores para controlar erro Tipo I.',
                    exemplo: 'MÉTODOS DE CORREÇÃO:\n• Bonferroni (conservador)\n• Holm-Bonferroni (menos conservador)\n• Benjamini-Hochberg (para FDR)\n• Tukey (para ANOVA)\n\n"Os p-valores foram ajustados pelo método de Benjamini-Hochberg para controlar a taxa de descoberta falsa (FDR < 0,05)"',
                    dica: 'Se fizer 10 testes, chance de erro Tipo I = 1-(0,95)^10 = 40%!'
                  },
                  {
                    numero: 5,
                    titulo: 'Modelo Estatístico Completo',
                    conteudo: 'Documente o modelo matemático utilizado com todas as variáveis e interações.',
                    exemplo: 'EXEMPLO DE MODELO DE REGRESSÃO:\n\nY = β₀ + β₁X₁ + β₂X₂ + β₃(X₁×X₂) + ε\n\nOnde:\n• Y = variável dependente (escore de performance)\n• X₁ = idade (anos)\n• X₂ = grupo (0=controle, 1=tratamento)\n• X₁×X₂ = interação idade-grupo\n• ε = erro residual ~ N(0,σ²)',
                    dica: 'Defina claramente cada variável e suas unidades de medida.'
                  }
                ],
                recursos: [
                  'Calculator de poder estatístico',
                  'Tabela de tamanhos de efeito',
                  'Scripts para teste de pressupostos',
                  'Guia de interpretação de p-valores'
                ]
              }
            ].map((tutorial, index) => (
              <Grid item xs={12} key={tutorial.id}>
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        {tutorial.titulo}
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <Chip 
                          label={tutorial.nivel} 
                          size="small" 
                          color={tutorial.nivel === 'Fundamental' ? 'success' : 
                                 tutorial.nivel === 'Intermediário' ? 'warning' : 'error'}
                        />
                        <Chip 
                          label={tutorial.tempo} 
                          size="small" 
                          variant="outlined"
                        />
                      </Stack>
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      {tutorial.descricao}
                    </Typography>

                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          📖 Ver Tutorial Completo ({tutorial.passos.length} passos)
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box>
                          {tutorial.passos.map((passo, passoIndex) => (
                            <Box key={passoIndex} sx={{ mb: 4 }}>
                              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                                Passo {passo.numero}: {passo.titulo}
                              </Typography>
                              
                              <Typography variant="body1" sx={{ mb: 2 }}>
                                {passo.conteudo}
                              </Typography>
                              
                              <Paper sx={{ p: 2, bgcolor: 'grey.50', mb: 2 }}>
                                <Typography variant="subtitle2" gutterBottom>
                                  💡 Exemplo Prático:
                                </Typography>
                                <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                                  {passo.exemplo}
                                </Typography>
                              </Paper>
                              
                              <Alert severity="info" sx={{ mb: 2 }}>
                                <strong>Dica Pro:</strong> {passo.dica}
                              </Alert>
                              
                              {passoIndex < tutorial.passos.length - 1 && <Divider sx={{ mt: 3 }} />}
                            </Box>
                          ))}
                          
                          <Paper sx={{ p: 3, bgcolor: 'primary.50', mt: 4 }}>
                            <Typography variant="h6" gutterBottom>
                              📚 Recursos Adicionais
                            </Typography>
                            <Grid container spacing={2}>
                              {tutorial.recursos.map((recurso, recursoIndex) => (
                                <Grid item xs={12} sm={6} key={recursoIndex}>
                                  <Chip 
                                    label={recurso} 
                                    variant="outlined" 
                                    sx={{ width: '100%', justifyContent: 'flex-start' }}
                                    icon={<GetApp sx={{ fontSize: 16 }} />}
                                  />
                                </Grid>
                              ))}
                            </Grid>
                          </Paper>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Paper sx={{ p: 4, mt: 4, bgcolor: 'success.50' }}>
            <Typography variant="h6" gutterBottom>
              🎯 Checklist Final: Relatório Científico de Qualidade
            </Typography>
            <Grid container spacing={2}>
              {[
                '✅ Título específico e descritivo',
                '✅ Resumo de 150-250 palavras',
                '✅ Introdução com revisão da literatura',
                '✅ Metodologia reproduzível',
                '✅ Resultados apenas com fatos',
                '✅ Discussão interpretativa',
                '✅ Limitações mencionadas',
                '✅ Conclusões objetivas',
                '✅ Referências atualizadas',
                '✅ Gráficos com barras de erro',
                '✅ Pressupostos testados',
                '✅ Tamanhos de efeito reportados'
              ].map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Typography variant="body2" sx={{ p: 1 }}>
                    {item}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Box>
      )}

      {/* Dialog para geração de relatório */}
      <Dialog 
        open={gerandoRelatorio} 
        maxWidth="sm" 
        fullWidth
        disableEscapeKeyDown
      >
        <DialogTitle>
          Gerando Relatório...
        </DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <LinearProgress sx={{ mb: 2 }} />
            <Typography variant="body1" gutterBottom>
              Processando análise estatística...
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Isso pode levar alguns minutos dependendo da complexidade dos dados.
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default RelatoriosCientificos;
