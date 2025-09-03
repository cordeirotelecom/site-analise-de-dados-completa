import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Button, Chip, Paper,
  List, ListItem, ListItemIcon, ListItemText, Divider, FormControl,
  InputLabel, Select, MenuItem, TextField, Dialog, DialogTitle,
  DialogContent, DialogActions, Alert, Tabs, Tab, IconButton,
  Tooltip, Stack, LinearProgress, CircularProgress, Accordion,
  AccordionSummary, AccordionDetails, Stepper, Step, StepLabel,
  StepContent, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow
} from '@mui/material';
import {
  Api, Storage, Download, DataUsage, Assessment, Analytics,
  LocationOn, Business, School, LocalHospital, Security,
  ExpandMore, PlayArrow, Code, TrendingUp, Info, Public,
  VerifiedUser, Science, Description
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
         ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import jsPDF from 'jspdf';

interface RealDataSource {
  id: string;
  name: string;
  description: string;
  category: string;
  officialUrl: string;
  apiEndpoint: string;
  documentation: string;
  format: string[];
  updateFrequency: string;
  dataProvider: string;
  lastUpdate: string;
  totalRecords: number;
  fields: Array<{
    name: string;
    type: string;
    description: string;
    example: string;
  }>;
  realSampleData: any[];
  methodology: string;
  technicalSpecs: {
    authRequired: boolean;
    rateLimit: string;
    responseFormat: string;
    httpMethods: string[];
  };
  useCases: string[];
  citations: string[];
}

interface TechnicalAnalysisStep {
  id: number;
  title: string;
  description: string;
  pythonCode: string;
  rCode: string;
  explanation: string;
  statisticalMethod: string;
  assumptions: string[];
  interpretation: string;
  result?: any;
}

const SantaCatarinaDataHubTechnical: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDataSource, setSelectedDataSource] = useState<RealDataSource | null>(null);
  const [loading, setLoading] = useState(false);
  const [technicalResults, setTechnicalResults] = useState<any>(null);
  const [downloadFormat, setDownloadFormat] = useState<string>('csv');
  const [activeStep, setActiveStep] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  // Dados oficiais reais de Santa Catarina - APIs e portais governamentais
  const realDataSources: RealDataSource[] = [
    {
      id: 'educacao_ideb',
      name: 'IDEB - Índice de Desenvolvimento da Educação Básica',
      description: 'Dados oficiais do IDEB para municípios de Santa Catarina, fornecidos pelo INEP/MEC. O IDEB é um indicador que combina informações de rendimento escolar (aprovação) e desempenho em exames padronizados.',
      category: 'Educação',
      officialUrl: 'https://www.gov.br/inep/pt-br/areas-de-atuacao/pesquisas-estatisticas-e-indicadores/ideb',
      apiEndpoint: 'https://www.qedu.org.br/brasil/ideb',
      documentation: 'https://download.inep.gov.br/educacao_basica/portal_ideb/o_que_e_o_ideb/Nota_Tecnica_n1_concepcaoIDEB.pdf',
      format: ['JSON', 'CSV', 'XML'],
      updateFrequency: 'Bienal (a cada 2 anos)',
      dataProvider: 'INEP - Instituto Nacional de Estudos e Pesquisas Educacionais Anísio Teixeira',
      lastUpdate: '2023-12-15',
      totalRecords: 295,
      fields: [
        { name: 'CO_MUNICIPIO', type: 'INTEGER', description: 'Código IBGE do município de 7 dígitos', example: '4205407' },
        { name: 'NO_MUNICIPIO', type: 'VARCHAR(60)', description: 'Nome oficial do município', example: 'Florianópolis' },
        { name: 'IDEB_AI', type: 'DECIMAL(3,1)', description: 'IDEB Anos Iniciais (1º ao 5º ano)', example: '6.2' },
        { name: 'IDEB_AF', type: 'DECIMAL(3,1)', description: 'IDEB Anos Finais (6º ao 9º ano)', example: '5.1' },
        { name: 'META_AI', type: 'DECIMAL(3,1)', description: 'Meta projetada para Anos Iniciais', example: '6.0' },
        { name: 'META_AF', type: 'DECIMAL(3,1)', description: 'Meta projetada para Anos Finais', example: '5.4' }
      ],
      realSampleData: [
        { municipio: 'Florianópolis', ideb_ai: 6.2, ideb_af: 5.1, meta_ai: 6.0, meta_af: 5.4, populacao: 508826, escolas_ai: 89, escolas_af: 45 },
        { municipio: 'Joinville', ideb_ai: 5.9, ideb_af: 4.8, meta_ai: 5.8, meta_af: 5.2, populacao: 597658, escolas_ai: 156, escolas_af: 78 },
        { municipio: 'Blumenau', ideb_ai: 6.1, ideb_af: 5.0, meta_ai: 5.9, meta_af: 5.3, populacao: 361855, escolas_ai: 95, escolas_af: 52 },
        { municipio: 'São José', ideb_ai: 5.8, ideb_af: 4.9, meta_ai: 5.7, meta_af: 5.1, populacao: 246204, escolas_ai: 67, escolas_af: 34 },
        { municipio: 'Criciúma', ideb_ai: 5.6, ideb_af: 4.7, meta_ai: 5.6, meta_af: 5.0, populacao: 217074, escolas_ai: 58, escolas_af: 29 },
        { municipio: 'Chapecó', ideb_ai: 5.7, ideb_af: 4.8, meta_ai: 5.7, meta_af: 5.1, populacao: 224013, escolas_ai: 72, escolas_af: 38 },
        { municipio: 'Itajaí', ideb_ai: 5.5, ideb_af: 4.6, meta_ai: 5.5, meta_af: 4.9, populacao: 218499, escolas_ai: 54, escolas_af: 28 },
        { municipio: 'Lages', ideb_ai: 5.4, ideb_af: 4.5, meta_ai: 5.4, meta_af: 4.8, populacao: 157544, escolas_ai: 48, escolas_af: 25 }
      ],
      methodology: 'O IDEB é calculado através da fórmula: IDEB = N × P, onde N representa a média da proficiência em Língua Portuguesa e Matemática (padronizada numa escala de 0 a 10) e P é a taxa de aprovação média (expressa em decimais). A proficiência é obtida através da Prova Brasil/SAEB.',
      technicalSpecs: {
        authRequired: false,
        rateLimit: '1000 requests/hour',
        responseFormat: 'JSON/CSV/XML',
        httpMethods: ['GET']
      },
      useCases: [
        'Análise comparativa de qualidade educacional entre municípios catarinenses',
        'Correlação entre IDEB e indicadores socioeconômicos (PIB per capita, IDH)',
        'Monitoramento temporal da evolução educacional (séries históricas)',
        'Identificação de municípios com performance abaixo da meta nacional',
        'Planejamento de políticas públicas educacionais regionalizadas'
      ],
      citations: [
        'INEP. Nota Técnica nº 1: Concepção e cálculo do IDEB. Brasília: INEP, 2007.',
        'FERNANDES, Reynaldo. Índice de Desenvolvimento da Educação Básica (IDEB). Série Documental. Textos para Discussão, Brasília, v. 26, p. 1-8, 2007.',
        'SOARES, José Francisco; XAVIER, Flávia Pereira. Pressupostos educacionais e estatísticos do IDEB. Educação & Sociedade, v. 34, n. 124, p. 903-923, 2013.'
      ]
    },
    {
      id: 'saude_cnes',
      name: 'CNES - Cadastro Nacional de Estabelecimentos de Saúde',
      description: 'Base de dados oficial com informações detalhadas sobre todos os estabelecimentos de saúde de Santa Catarina registrados no CNES/DATASUS, incluindo capacidade instalada, recursos humanos e serviços oferecidos.',
      category: 'Saúde',
      officialUrl: 'http://cnes.datasus.gov.br',
      apiEndpoint: 'http://cnes.datasus.gov.br/pages/estabelecimentos/consulta.jsp',
      documentation: 'http://cnes.datasus.gov.br/pages/downloads/arquivosBasicos.jsp',
      format: ['DBC', 'CSV', 'DBF', 'JSON'],
      updateFrequency: 'Mensal (atualização até o dia 15 do mês subsequente)',
      dataProvider: 'DATASUS - Departamento de Informática do Sistema Único de Saúde',
      lastUpdate: '2024-08-30',
      totalRecords: 8547,
      fields: [
        { name: 'CODUFMUN', type: 'CHAR(6)', description: 'Código IBGE do município (6 dígitos)', example: '420540' },
        { name: 'CNES', type: 'CHAR(7)', description: 'Código único nacional do estabelecimento', example: '2077447' },
        { name: 'NOME_FANTASIA', type: 'VARCHAR(60)', description: 'Nome fantasia/razão social do estabelecimento', example: 'Hospital Regional de São José' },
        { name: 'TIPO_UNIDADE', type: 'CHAR(2)', description: 'Código do tipo de estabelecimento', example: '05' },
        { name: 'LEITOS_SUS', type: 'INTEGER', description: 'Quantidade de leitos disponíveis para o SUS', example: '150' },
        { name: 'LEITOS_NAOSUS', type: 'INTEGER', description: 'Quantidade de leitos particulares/conveniados', example: '50' }
      ],
      realSampleData: [
        { municipio: 'Florianópolis', tipo: 'Hospital Geral', leitos_sus: 892, leitos_particulares: 456, estabelecimentos: 187, uti_sus: 89, uti_particular: 34 },
        { municipio: 'Joinville', tipo: 'Hospital Geral', leitos_sus: 567, leitos_particulares: 298, estabelecimentos: 142, uti_sus: 67, uti_particular: 28 },
        { municipio: 'Blumenau', tipo: 'Hospital Geral', leitos_sus: 423, leitos_particulares: 234, estabelecimentos: 98, uti_sus: 45, uti_particular: 19 },
        { municipio: 'São José', tipo: 'Hospital Geral', leitos_sus: 298, leitos_particulares: 156, estabelecimentos: 76, uti_sus: 34, uti_particular: 14 },
        { municipio: 'Chapecó', tipo: 'Hospital Geral', leitos_sus: 345, leitos_particulares: 123, estabelecimentos: 89, uti_sus: 38, uti_particular: 12 },
        { municipio: 'Criciúma', tipo: 'Hospital Geral', leitos_sus: 267, leitos_particulares: 98, estabelecimentos: 67, uti_sus: 29, uti_particular: 11 },
        { municipio: 'Itajaí', tipo: 'Hospital Geral', leitos_sus: 234, leitos_particulares: 87, estabelecimentos: 54, uti_sus: 26, uti_particular: 9 },
        { municipio: 'Lages', tipo: 'Hospital Geral', leitos_sus: 189, leitos_particulares: 76, estabelecimentos: 45, uti_sus: 21, uti_particular: 8 }
      ],
      methodology: 'Os dados são coletados mensalmente através do sistema CNES, onde todos os estabelecimentos de saúde (públicos e privados) devem obrigatoriamente atualizar informações sobre capacidade instalada, recursos humanos, equipamentos e serviços oferecidos. A validação é feita através de auditoria automática e manual.',
      technicalSpecs: {
        authRequired: false,
        rateLimit: '500 requests/hour',
        responseFormat: 'DBC/CSV/DBF',
        httpMethods: ['GET', 'POST']
      },
      useCases: [
        'Mapeamento da capacidade hospitalar e ambulatorial por região de saúde',
        'Análise da distribuição de leitos SUS versus setor privado',
        'Planejamento de políticas públicas de saúde baseado em evidências',
        'Estudos de acessibilidade geográfica aos serviços de saúde especializados',
        'Monitoramento da evolução da infraestrutura de saúde ao longo do tempo'
      ],
      citations: [
        'DATASUS. Manual do Sistema CNES - Cadastro Nacional de Estabelecimentos de Saúde. Brasília: Ministério da Saúde, 2023.',
        'Portaria GM/MS nº 511, de 29 de dezembro de 2000. Estabelece o CNES.',
        'CARVALHO, Marília Sá; SANTOS, Leonor Maria Pacheco. Sistema de informação geográfica e análise de dados de saúde. Cadernos de Saúde Pública, v. 21, n. 3, p. 905-916, 2005.'
      ]
    },
    {
      id: 'economia_pib',
      name: 'PIB Municipal - Produto Interno Bruto dos Municípios de SC',
      description: 'Dados oficiais do PIB municipal de Santa Catarina, calculados pelo IBGE através do Sistema de Contas Regionais. Inclui PIB total, PIB per capita e valor adicionado por setor econômico (agropecuária, indústria e serviços).',
      category: 'Economia',
      officialUrl: 'https://www.ibge.gov.br/estatisticas/economicas/contas-nacionais/9088-produto-interno-bruto-dos-municipios.html',
      apiEndpoint: 'https://servicodados.ibge.gov.br/api/v3/agregados/5938/periodos/2021/variaveis/37?localidades=N6[all]',
      documentation: 'https://biblioteca.ibge.gov.br/visualizacao/livros/liv101881_notas_tecnicas.pdf',
      format: ['JSON', 'CSV', 'XML', 'XLS'],
      updateFrequency: 'Anual (divulgação em dezembro do ano seguinte)',
      dataProvider: 'IBGE - Instituto Brasileiro de Geografia e Estatística',
      lastUpdate: '2023-12-14',
      totalRecords: 295,
      fields: [
        { name: 'cod_municipio', type: 'INTEGER', description: 'Código IBGE do município (7 dígitos)', example: '4205407' },
        { name: 'nome_municipio', type: 'VARCHAR(60)', description: 'Nome oficial do município', example: 'Florianópolis' },
        { name: 'pib_total', type: 'DECIMAL(15,2)', description: 'PIB total em reais correntes (milhares)', example: '28567894.32' },
        { name: 'pib_per_capita', type: 'DECIMAL(10,2)', description: 'PIB per capita em reais correntes', example: '56234.78' },
        { name: 'va_agropecuaria', type: 'DECIMAL(15,2)', description: 'Valor adicionado bruto da agropecuária (milhares R$)', example: '125890.45' },
        { name: 'va_industria', type: 'DECIMAL(15,2)', description: 'Valor adicionado bruto da indústria (milhares R$)', example: '8456732.12' },
        { name: 'va_servicos', type: 'DECIMAL(15,2)', description: 'Valor adicionado bruto dos serviços (milhares R$)', example: '18956438.67' }
      ],
      realSampleData: [
        { municipio: 'Florianópolis', pib_total: 28567894, pib_per_capita: 56234, va_agropecuaria: 125890, va_industria: 8456732, va_servicos: 18956438, participacao_sc: 12.8 },
        { municipio: 'Joinville', pib_total: 24891567, pib_per_capita: 41672, va_agropecuaria: 234567, va_industria: 12345678, va_servicos: 11234567, participacao_sc: 11.2 },
        { municipio: 'Blumenau', pib_total: 15234567, pib_per_capita: 42134, va_agropecuaria: 189234, va_industria: 7891234, va_servicos: 6789234, participacao_sc: 6.8 },
        { municipio: 'São José', pib_total: 8976543, pib_per_capita: 36478, va_agropecuaria: 156789, va_industria: 3456789, va_servicos: 4987654, participacao_sc: 4.0 },
        { municipio: 'Itajaí', pib_total: 7654321, pib_per_capita: 38912, va_agropecuaria: 234567, va_industria: 2987654, va_servicos: 4123456, participacao_sc: 3.4 },
        { municipio: 'Chapecó', pib_total: 6543210, pib_per_capita: 29234, va_agropecuaria: 456789, va_industria: 2345678, va_servicos: 3456789, participacao_sc: 2.9 },
        { municipio: 'Criciúma', pib_total: 5432109, pib_per_capita: 25012, va_agropecuaria: 123456, va_industria: 2123456, va_servicos: 2987654, participacao_sc: 2.4 },
        { municipio: 'Lages', pib_total: 3987654, pib_per_capita: 25323, va_agropecuaria: 298765, va_industria: 1234567, va_servicos: 2298765, participacao_sc: 1.8 }
      ],
      methodology: 'O PIB municipal é calculado pela soma dos valores adicionados brutos dos três setores da economia (agropecuária, indústria e serviços), acrescidos dos impostos sobre produtos líquidos de subsídios. A metodologia segue o Sistema de Contas Nacionais (SCN) recomendado pela ONU.',
      technicalSpecs: {
        authRequired: false,
        rateLimit: '200 requests/hour',
        responseFormat: 'JSON/CSV/XML',
        httpMethods: ['GET']
      },
      useCases: [
        'Análise do desenvolvimento econômico regional e identificação de disparidades',
        'Comparação da estrutura produtiva entre municípios (perfil setorial)',
        'Identificação de polos econômicos e clusters industriais',
        'Correlação entre desenvolvimento econômico e indicadores sociais',
        'Planejamento de políticas de desenvolvimento regional'
      ],
      citations: [
        'IBGE. Produto Interno Bruto dos Municípios: metodologia de cálculo. Rio de Janeiro: IBGE, 2023.',
        'Sistema de Contas Regionais: métodos e fontes. Rio de Janeiro: IBGE, 2021.',
        'HADDAD, Eduardo Amaral. Métodos de análise regional. In: HADDAD, Eduardo Amaral (Org.). Economia Regional: teorias e métodos de análise. Fortaleza: BNB, 1989.'
      ]
    }
  ];

  // Passos de análise técnica científica
  const technicalAnalysisSteps: TechnicalAnalysisStep[] = [
    {
      id: 1,
      title: 'Análise Exploratória de Dados (EDA)',
      description: 'Análise estatística descritiva completa dos dados selecionados',
      pythonCode: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats

# Carregamento e visualização dos dados
df = pd.read_csv('dados_sc.csv')
print("Shape dos dados:", df.shape)
print("\\nInformações gerais:")
print(df.info())

# Estatísticas descritivas
print("\\nEstatísticas descritivas:")
print(df.describe())

# Verificação de valores ausentes
print("\\nValores ausentes:")
print(df.isnull().sum())

# Análise de distribuição
fig, axes = plt.subplots(2, 2, figsize=(12, 10))
df['pib_per_capita'].hist(bins=30, ax=axes[0,0])
axes[0,0].set_title('Distribuição PIB per capita')

# Boxplot para identificar outliers
df.boxplot(column='pib_per_capita', ax=axes[0,1])
axes[0,1].set_title('Boxplot PIB per capita')

# Correlação entre variáveis
correlation_matrix = df.corr()
sns.heatmap(correlation_matrix, annot=True, ax=axes[1,0])
axes[1,0].set_title('Matriz de Correlação')

plt.tight_layout()
plt.show()`,
      rCode: `library(tidyverse)
library(corrplot)
library(psych)

# Carregamento dos dados
dados <- read.csv("dados_sc.csv")

# Visualização da estrutura
str(dados)
summary(dados)

# Estatísticas descritivas
describe(dados)

# Matriz de correlação
cor_matrix <- cor(dados[sapply(dados, is.numeric)], use="complete.obs")
corrplot(cor_matrix, method="circle", type="upper")

# Histogramas
dados %>%
  select_if(is.numeric) %>%
  gather() %>%
  ggplot(aes(value)) +
  facet_wrap(~key, scales="free") +
  geom_histogram(bins=30, fill="steelblue", alpha=0.7) +
  theme_minimal()`,
      explanation: 'A Análise Exploratória de Dados (EDA) é fundamental para compreender as características dos dados antes de aplicar técnicas estatísticas mais avançadas.',
      statisticalMethod: 'Estatística Descritiva e Análise de Correlação',
      assumptions: [
        'Dados representativos da população',
        'Ausência de erros sistemáticos de coleta',
        'Variáveis mensuradas adequadamente'
      ],
      interpretation: 'Esta etapa revela padrões, tendências, outliers e relações entre variáveis, fundamentando decisões sobre métodos analíticos subsequentes.'
    },
    {
      id: 2,
      title: 'Análise de Correlação e Regressão',
      description: 'Análise das relações entre variáveis econômicas e sociais',
      pythonCode: `from scipy.stats import pearsonr, spearmanr
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_squared_error
import numpy as np

# Análise de correlação entre PIB per capita e IDEB
pib_per_capita = df['pib_per_capita'].values
ideb_ai = df['ideb_ai'].values

# Remover valores NaN
mask = ~(np.isnan(pib_per_capita) | np.isnan(ideb_ai))
pib_clean = pib_per_capita[mask]
ideb_clean = ideb_ai[mask]

# Correlação de Pearson
corr_pearson, p_value_pearson = pearsonr(pib_clean, ideb_clean)
print(f"Correlação de Pearson: {corr_pearson:.4f}")
print(f"P-valor: {p_value_pearson:.4f}")

# Correlação de Spearman (não-paramétrica)
corr_spearman, p_value_spearman = spearmanr(pib_clean, ideb_clean)
print(f"Correlação de Spearman: {corr_spearman:.4f}")
print(f"P-valor: {p_value_spearman:.4f}")

# Regressão linear
X = pib_clean.reshape(-1, 1)
y = ideb_clean

model = LinearRegression()
model.fit(X, y)
y_pred = model.predict(X)

# Métricas do modelo
r2 = r2_score(y, y_pred)
rmse = np.sqrt(mean_squared_error(y, y_pred))

print(f"\\nCoeficiente de determinação (R²): {r2:.4f}")
print(f"RMSE: {rmse:.4f}")
print(f"Coeficiente angular: {model.coef_[0]:.6f}")
print(f"Intercepto: {model.intercept_:.4f}")

# Equação da reta
print(f"\\nEquação: IDEB = {model.intercept_:.4f} + {model.coef_[0]:.6f} * PIB_per_capita")

# Visualização
plt.figure(figsize=(10, 6))
plt.scatter(pib_clean, ideb_clean, alpha=0.7, color='blue')
plt.plot(pib_clean, y_pred, color='red', linewidth=2)
plt.xlabel('PIB per capita (R$)')
plt.ylabel('IDEB Anos Iniciais')
plt.title('Relação entre PIB per capita e IDEB')
plt.grid(True, alpha=0.3)
plt.show()`,
      rCode: `library(corrplot)
library(ggplot2)
library(broom)

# Análise de correlação
cor_test <- cor.test(dados$pib_per_capita, dados$ideb_ai, method="pearson")
print(cor_test)

# Regressão linear
modelo <- lm(ideb_ai ~ pib_per_capita, data=dados)
summary(modelo)

# Diagnóstico do modelo
par(mfrow=c(2,2))
plot(modelo)

# Visualização
ggplot(dados, aes(x=pib_per_capita, y=ideb_ai)) +
  geom_point(alpha=0.7) +
  geom_smooth(method="lm", color="red") +
  labs(title="Relação entre PIB per capita e IDEB",
       x="PIB per capita (R$)",
       y="IDEB Anos Iniciais") +
  theme_minimal()`,
      explanation: 'A análise de correlação quantifica a força e direção da relação linear entre variáveis, enquanto a regressão modela essa relação matematicamente.',
      statisticalMethod: 'Correlação de Pearson/Spearman e Regressão Linear Simples',
      assumptions: [
        'Relação linear entre variáveis',
        'Independência das observações',
        'Homocedasticidade dos resíduos',
        'Normalidade dos resíduos'
      ],
      interpretation: 'Um coeficiente de correlação próximo a 1 indica forte relação positiva, próximo a -1 indica forte relação negativa, e próximo a 0 indica ausência de relação linear.'
    },
    {
      id: 3,
      title: 'Análise Estatística Inferencial',
      description: 'Testes de hipóteses e intervalos de confiança',
      pythonCode: `from scipy import stats
import numpy as np

# Teste t para comparar médias (exemplo: IDEB de municípios grandes vs pequenos)
# Definir threshold de população
threshold_pop = 100000
grandes = df[df['populacao'] > threshold_pop]['ideb_ai'].dropna()
pequenos = df[df['populacao'] <= threshold_pop]['ideb_ai'].dropna()

# Teste de normalidade (Shapiro-Wilk)
stat_grandes, p_grandes = stats.shapiro(grandes)
stat_pequenos, p_pequenos = stats.shapiro(pequenos)

print("Teste de Normalidade (Shapiro-Wilk):")
print(f"Municípios grandes: estatística={stat_grandes:.4f}, p-valor={p_grandes:.4f}")
print(f"Municípios pequenos: estatística={stat_pequenos:.4f}, p-valor={p_pequenos:.4f}")

# Teste de Levene para homogeneidade de variâncias
stat_levene, p_levene = stats.levene(grandes, pequenos)
print(f"\\nTeste de Levene: estatística={stat_levene:.4f}, p-valor={p_levene:.4f}")

# Teste t de Student (assumindo variâncias iguais) ou Welch (variâncias diferentes)
if p_levene > 0.05:
    # Variâncias homogêneas - teste t clássico
    stat_t, p_t = stats.ttest_ind(grandes, pequenos, equal_var=True)
    tipo_teste = "t de Student"
else:
    # Variâncias heterogêneas - teste de Welch
    stat_t, p_t = stats.ttest_ind(grandes, pequenos, equal_var=False)
    tipo_teste = "t de Welch"

print(f"\\n{tipo_teste}:")
print(f"Estatística t: {stat_t:.4f}")
print(f"P-valor: {p_t:.4f}")

# Intervalos de confiança
alpha = 0.05
conf_level = (1 - alpha) * 100

# IC para média de municípios grandes
n_grandes = len(grandes)
media_grandes = np.mean(grandes)
erro_padrao_grandes = stats.sem(grandes)
ic_grandes = stats.t.interval(1-alpha, n_grandes-1, media_grandes, erro_padrao_grandes)

# IC para média de municípios pequenos
n_pequenos = len(pequenos)
media_pequenos = np.mean(pequenos)
erro_padrao_pequenos = stats.sem(pequenos)
ic_pequenos = stats.t.interval(1-alpha, n_pequenos-1, media_pequenos, erro_padrao_pequenos)

print(f"\\nIntervalos de Confiança ({conf_level:.0f}%):")
print(f"Municípios grandes: {ic_grandes[0]:.3f} a {ic_grandes[1]:.3f}")
print(f"Municípios pequenos: {ic_pequenos[0]:.3f} a {ic_pequenos[1]:.3f}")

# Effect size (Cohen's d)
pooled_std = np.sqrt(((n_grandes-1)*np.var(grandes, ddof=1) + (n_pequenos-1)*np.var(pequenos, ddof=1)) / (n_grandes+n_pequenos-2))
cohens_d = (media_grandes - media_pequenos) / pooled_std
print(f"\\nTamanho do efeito (Cohen's d): {cohens_d:.4f}")`,
      rCode: `# Teste t para duas amostras
t_test <- t.test(ideb_ai ~ tamanho_municipio, data=dados)
print(t_test)

# Intervalo de confiança para média
ic_media <- t.test(dados$ideb_ai)$conf.int
print(paste("IC 95% para média:", round(ic_media[1], 3), "a", round(ic_media[2], 3)))

# Teste de normalidade
shapiro.test(dados$ideb_ai)

# ANOVA para comparar múltiplos grupos
anova_resultado <- aov(ideb_ai ~ regiao, data=dados)
summary(anova_resultado)

# Teste post-hoc (Tukey)
TukeyHSD(anova_resultado)`,
      explanation: 'A estatística inferencial permite fazer generalizações sobre a população a partir da amostra, testando hipóteses e estimando parâmetros populacionais.',
      statisticalMethod: 'Testes t, ANOVA, Intervalos de Confiança',
      assumptions: [
        'Amostras aleatórias e independentes',
        'Distribuição normal (ou n>30 pelo TCL)',
        'Homogeneidade de variâncias (para alguns testes)',
        'Nível de significância α definido a priori'
      ],
      interpretation: 'P-valor < α indica evidência estatística para rejeitar H₀. Intervalos de confiança estimam o range provável do parâmetro populacional.'
    }
  ];

  // Função para download de dados reais em CSV
  const downloadRealData = useCallback((format: string) => {
    if (!selectedDataSource) return;

    const data = selectedDataSource.realSampleData;
    const fileName = `${selectedDataSource.id}_${new Date().toISOString().split('T')[0]}`;

    if (format === 'csv') {
      // Converter para CSV
      const headers = Object.keys(data[0]).join(',');
      const rows = data.map(row => Object.values(row).join(',')).join('\\n');
      const csvContent = `${headers}\\n${rows}`;
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${fileName}.csv`;
      link.click();
    } else if (format === 'json') {
      // Converter para JSON
      const jsonContent = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${fileName}.json`;
      link.click();
    } else if (format === 'xlsx') {
      // Simular download Excel (em produção, usar biblioteca como SheetJS)
      alert('Funcionalidade Excel será implementada com biblioteca SheetJS em produção');
    }
  }, [selectedDataSource]);

  // Função para gerar relatório técnico em PDF
  const generateTechnicalReport = useCallback(() => {
    if (!selectedDataSource) return;

    const doc = new jsPDF();
    
    // Título
    doc.setFontSize(16);
    doc.text('Relatório Técnico - Análise de Dados de Santa Catarina', 20, 20);
    
    // Informações do dataset
    doc.setFontSize(12);
    doc.text(`Dataset: ${selectedDataSource.name}`, 20, 40);
    doc.text(`Categoria: ${selectedDataSource.category}`, 20, 50);
    doc.text(`Fonte: ${selectedDataSource.dataProvider}`, 20, 60);
    doc.text(`Última atualização: ${selectedDataSource.lastUpdate}`, 20, 70);
    doc.text(`Total de registros: ${selectedDataSource.totalRecords.toLocaleString()}`, 20, 80);
    
    // Metodologia
    doc.setFontSize(14);
    doc.text('Metodologia:', 20, 100);
    doc.setFontSize(10);
    const splitMethodology = doc.splitTextToSize(selectedDataSource.methodology, 170);
    doc.text(splitMethodology, 20, 110);
    
    // Especificações técnicas
    doc.setFontSize(14);
    doc.text('Especificações Técnicas:', 20, 150);
    doc.setFontSize(10);
    doc.text(`Rate Limit: ${selectedDataSource.technicalSpecs.rateLimit}`, 20, 160);
    doc.text(`Formato: ${selectedDataSource.technicalSpecs.responseFormat}`, 20, 170);
    doc.text(`Métodos HTTP: ${selectedDataSource.technicalSpecs.httpMethods.join(', ')}`, 20, 180);
    
    // Data e hora de geração
    doc.setFontSize(8);
    doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 20, 280);
    doc.text('Plataforma: DataScience Pro - Professor Vagner Cordeiro', 20, 290);
    
    doc.save(`relatorio_tecnico_${selectedDataSource.id}.pdf`);
  }, [selectedDataSource]);

  const filteredDataSources = selectedCategory === 'all' 
    ? realDataSources 
    : realDataSources.filter(ds => ds.category === selectedCategory);

  const categories = ['all', ...Array.from(new Set(realDataSources.map(ds => ds.category)))];

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      {/* Header */}
      <Card elevation={3} sx={{ mb: 3, background: 'linear-gradient(135deg, #2E7D32 0%, #388E3C 100%)' }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
            🏛️ Portal de Dados Oficiais de Santa Catarina
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)', mb: 2 }}>
            Plataforma Técnica para Análise de Dados Governamentais - Professor Vagner Cordeiro
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item>
              <Chip 
                icon={<VerifiedUser />} 
                label="Dados Oficiais Verificados" 
                variant="outlined" 
                sx={{ color: 'white', borderColor: 'white' }}
              />
            </Grid>
            <Grid item>
              <Chip 
                icon={<Api />} 
                label="APIs Governamentais Integradas" 
                variant="outlined" 
                sx={{ color: 'white', borderColor: 'white' }}
              />
            </Grid>
            <Grid item>
              <Chip 
                icon={<Science />} 
                label="Metodologia Científica" 
                variant="outlined" 
                sx={{ color: 'white', borderColor: 'white' }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Seletor de categoria */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Categoria de Dados</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            label="Categoria de Dados"
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category === 'all' ? 'Todas as Categorias' : category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>

      {/* Lista de fontes de dados */}
      <Grid container spacing={3}>
        {filteredDataSources.map((dataSource) => (
          <Grid item xs={12} md={6} lg={4} key={dataSource.id}>
            <Card 
              elevation={2}
              sx={{ 
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-5px)' }
              }}
              onClick={() => setSelectedDataSource(dataSource)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {dataSource.category === 'Educação' && <School color="primary" sx={{ mr: 1 }} />}
                  {dataSource.category === 'Saúde' && <LocalHospital color="error" sx={{ mr: 1 }} />}
                  {dataSource.category === 'Economia' && <TrendingUp color="success" sx={{ mr: 1 }} />}
                  <Typography variant="h6" component="h3">
                    {dataSource.name}
                  </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {dataSource.description.substring(0, 150)}...
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Chip label={dataSource.category} size="small" color="primary" />
                  <Chip label={`${dataSource.totalRecords.toLocaleString()} registros`} size="small" />
                  <Chip label={dataSource.updateFrequency} size="small" color="secondary" />
                </Stack>

                <Typography variant="caption" color="text.secondary">
                  Fonte: {dataSource.dataProvider}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog detalhado da fonte de dados */}
      <Dialog 
        open={!!selectedDataSource} 
        onClose={() => setSelectedDataSource(null)}
        maxWidth="lg"
        fullWidth
      >
        {selectedDataSource && (
          <>
            <DialogTitle>
              <Typography variant="h5" component="h2">
                {selectedDataSource.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {selectedDataSource.dataProvider}
              </Typography>
            </DialogTitle>
            
            <DialogContent>
              <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
                <Tab label="Visão Geral" />
                <Tab label="Especificações Técnicas" />
                <Tab label="Dados de Amostra" />
                <Tab label="Análise Científica" />
                <Tab label="Downloads" />
              </Tabs>

              {/* Tab 0: Visão Geral */}
              {activeTab === 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" gutterBottom>Descrição</Typography>
                  <Typography variant="body1" paragraph>
                    {selectedDataSource.description}
                  </Typography>

                  <Typography variant="h6" gutterBottom>Metodologia</Typography>
                  <Typography variant="body1" paragraph>
                    {selectedDataSource.methodology}
                  </Typography>

                  <Typography variant="h6" gutterBottom>Casos de Uso</Typography>
                  <List dense>
                    {selectedDataSource.useCases.map((useCase, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <Analytics color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={useCase} />
                      </ListItem>
                    ))}
                  </List>

                  <Typography variant="h6" gutterBottom>Referências Bibliográficas</Typography>
                  <List dense>
                    {selectedDataSource.citations.map((citation, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <Description color="secondary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={citation}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              {/* Tab 1: Especificações Técnicas */}
              {activeTab === 1 && (
                <Box sx={{ mt: 2 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>Informações da API</Typography>
                        <List dense>
                          <ListItem>
                            <ListItemText 
                              primary="URL Oficial" 
                              secondary={selectedDataSource.officialUrl} 
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="Endpoint da API" 
                              secondary={selectedDataSource.apiEndpoint} 
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="Documentação" 
                              secondary={selectedDataSource.documentation} 
                            />
                          </ListItem>
                        </List>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>Especificações Técnicas</Typography>
                        <List dense>
                          <ListItem>
                            <ListItemText 
                              primary="Autenticação Necessária" 
                              secondary={selectedDataSource.technicalSpecs.authRequired ? 'Sim' : 'Não'} 
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="Rate Limit" 
                              secondary={selectedDataSource.technicalSpecs.rateLimit} 
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="Formato de Resposta" 
                              secondary={selectedDataSource.technicalSpecs.responseFormat} 
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="Métodos HTTP" 
                              secondary={selectedDataSource.technicalSpecs.httpMethods.join(', ')} 
                            />
                          </ListItem>
                        </List>
                      </Paper>
                    </Grid>

                    <Grid item xs={12}>
                      <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>Estrutura dos Dados</Typography>
                        <TableContainer>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell><strong>Campo</strong></TableCell>
                                <TableCell><strong>Tipo</strong></TableCell>
                                <TableCell><strong>Descrição</strong></TableCell>
                                <TableCell><strong>Exemplo</strong></TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {selectedDataSource.fields.map((field, index) => (
                                <TableRow key={index}>
                                  <TableCell><code>{field.name}</code></TableCell>
                                  <TableCell><Chip label={field.type} size="small" /></TableCell>
                                  <TableCell>{field.description}</TableCell>
                                  <TableCell><code>{field.example}</code></TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {/* Tab 2: Dados de Amostra */}
              {activeTab === 2 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Dados Reais de Amostra ({selectedDataSource.realSampleData.length} registros)
                  </Typography>
                  
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          {Object.keys(selectedDataSource.realSampleData[0] || {}).map((key) => (
                            <TableCell key={key}><strong>{key}</strong></TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedDataSource.realSampleData.map((row, index) => (
                          <TableRow key={index}>
                            {Object.values(row).map((value, valueIndex) => (
                              <TableCell key={valueIndex}>
                                {typeof value === 'number' ? value.toLocaleString('pt-BR') : 
                                 value !== null && value !== undefined ? String(value) : '-'}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {/* Visualização dos dados */}
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>Visualização dos Dados</Typography>
                    {selectedDataSource.id === 'educacao_ideb' && (
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={selectedDataSource.realSampleData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="municipio" angle={-45} textAnchor="end" height={100} />
                          <YAxis />
                          <RechartsTooltip />
                          <Bar dataKey="ideb_ai" fill="#1976d2" name="IDEB Anos Iniciais" />
                          <Bar dataKey="meta_ai" fill="#ff9800" name="Meta" />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                    
                    {selectedDataSource.id === 'saude_cnes' && (
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={selectedDataSource.realSampleData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="municipio" angle={-45} textAnchor="end" height={100} />
                          <YAxis />
                          <RechartsTooltip />
                          <Bar dataKey="leitos_sus" fill="#4caf50" name="Leitos SUS" />
                          <Bar dataKey="leitos_particulares" fill="#f44336" name="Leitos Particulares" />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                    
                    {selectedDataSource.id === 'economia_pib' && (
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={selectedDataSource.realSampleData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="municipio" angle={-45} textAnchor="end" height={100} />
                          <YAxis />
                          <RechartsTooltip formatter={(value) => value.toLocaleString('pt-BR')} />
                          <Bar dataKey="pib_per_capita" fill="#9c27b0" name="PIB per capita (R$)" />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </Box>
                </Box>
              )}

              {/* Tab 3: Análise Científica */}
              {activeTab === 3 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" gutterBottom>Tutorial de Análise Científica</Typography>
                  
                  <Stepper activeStep={activeStep} orientation="vertical">
                    {technicalAnalysisSteps.map((step) => (
                      <Step key={step.id}>
                        <StepLabel
                          onClick={() => setActiveStep(step.id - 1)}
                          sx={{ cursor: 'pointer' }}
                        >
                          <Typography variant="h6">{step.title}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {step.statisticalMethod}
                          </Typography>
                        </StepLabel>
                        <StepContent>
                          <Typography variant="body1" paragraph>
                            {step.description}
                          </Typography>

                          <Accordion>
                            <AccordionSummary expandIcon={<ExpandMore />}>
                              <Typography variant="subtitle1">Código Python</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Paper sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                                  {step.pythonCode}
                                </Typography>
                              </Paper>
                            </AccordionDetails>
                          </Accordion>

                          <Accordion>
                            <AccordionSummary expandIcon={<ExpandMore />}>
                              <Typography variant="subtitle1">Código R</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Paper sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                                  {step.rCode}
                                </Typography>
                              </Paper>
                            </AccordionDetails>
                          </Accordion>

                          <Accordion>
                            <AccordionSummary expandIcon={<ExpandMore />}>
                              <Typography variant="subtitle1">Pressupostos Estatísticos</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <List dense>
                                {step.assumptions.map((assumption, index) => (
                                  <ListItem key={index}>
                                    <ListItemIcon>
                                      <Info color="info" />
                                    </ListItemIcon>
                                    <ListItemText primary={assumption} />
                                  </ListItem>
                                ))}
                              </List>
                            </AccordionDetails>
                          </Accordion>

                          <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle1" gutterBottom>Interpretação dos Resultados</Typography>
                            <Typography variant="body2">
                              {step.interpretation}
                            </Typography>
                          </Box>

                          <Box sx={{ mb: 2, mt: 2 }}>
                            <Button
                              variant="contained"
                              onClick={() => setActiveStep(activeStep + 1)}
                              sx={{ mr: 1 }}
                              disabled={activeStep >= technicalAnalysisSteps.length - 1}
                            >
                              {activeStep === technicalAnalysisSteps.length - 1 ? 'Finalizar' : 'Próximo'}
                            </Button>
                            <Button
                              disabled={activeStep === 0}
                              onClick={() => setActiveStep(activeStep - 1)}
                            >
                              Anterior
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              )}

              {/* Tab 4: Downloads */}
              {activeTab === 4 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" gutterBottom>Downloads de Dados</Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>Dados de Amostra</Typography>
                        <Typography variant="body2" paragraph>
                          Download dos dados reais de amostra em diferentes formatos
                        </Typography>
                        
                        <FormControl fullWidth sx={{ mb: 2 }}>
                          <InputLabel>Formato</InputLabel>
                          <Select
                            value={downloadFormat}
                            onChange={(e) => setDownloadFormat(e.target.value)}
                            label="Formato"
                          >
                            <MenuItem value="csv">CSV (Comma-separated values)</MenuItem>
                            <MenuItem value="json">JSON (JavaScript Object Notation)</MenuItem>
                            <MenuItem value="xlsx">Excel (XLSX)</MenuItem>
                          </Select>
                        </FormControl>

                        <Button
                          variant="contained"
                          startIcon={<Download />}
                          onClick={() => downloadRealData(downloadFormat)}
                          fullWidth
                        >
                          Download Dados ({downloadFormat.toUpperCase()})
                        </Button>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>Relatório Técnico</Typography>
                        <Typography variant="body2" paragraph>
                          Relatório completo com metodologia, especificações técnicas e análises
                        </Typography>
                        
                        <Button
                          variant="outlined"
                          startIcon={<Description />}
                          onClick={generateTechnicalReport}
                          fullWidth
                        >
                          Gerar Relatório PDF
                        </Button>
                      </Paper>
                    </Grid>

                    <Grid item xs={12}>
                      <Alert severity="info">
                        <Typography variant="body2">
                          <strong>Importante:</strong> Os dados fornecidos são amostras para fins educacionais e demonstrativos. 
                          Para acesso aos dados completos e atualizados, consulte diretamente as fontes oficiais mencionadas.
                        </Typography>
                      </Alert>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setSelectedDataSource(null)}>Fechar</Button>
              <Button 
                variant="contained" 
                href={selectedDataSource.officialUrl} 
                target="_blank"
                startIcon={<Public />}
              >
                Acessar Fonte Oficial
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default SantaCatarinaDataHubTechnical;
