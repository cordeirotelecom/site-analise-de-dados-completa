import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Alert,
  LinearProgress,
  Chip,
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  IconButton,
  Tooltip,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Badge,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from '@mui/material';
import {
  CloudUpload,
  Science,
  Assessment,
  TrendingUp,
  ExpandMore,
  CheckCircle,
  PlayArrow,
  Download,
  Visibility,
  Analytics,
  DataArray,
  Psychology,
  AutoAwesome,
  FilePresent,
  Timeline,
  BarChart,
  ScatterPlot,
  ShowChart,
  ArrowBack,
  School,
  Info,
  HelpOutline,
  QuestionAnswer,
  EmojiObjects,
  Assignment,
  Engineering,
  TipsAndUpdates,
  MenuBook,
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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface AnaliseConfig {
  tipo: string;
  metodo: string;
  validacao: string;
  parametros: { [key: string]: any };
}

interface PassoMetodologia {
  id: string;
  titulo: string;
  descricao: string;
  status: 'pendente' | 'executando' | 'concluido' | 'erro';
  resultado?: any;
  explicacao?: string;
  codigo?: string;
  tempo?: number;
}

interface MetodoAnalise {
  id: string;
  nome: string;
  descricao: string;
  quando_usar: string[];
  vantagens: string[];
  limitacoes: string[];
  exemplo_pratico: string;
  complexidade: 'Básico' | 'Intermediário' | 'Avançado';
  tipo_dados: string[];
  tamanho_amostra: string;
  interpretacao: string;
}

const MetodologiaCientificaAvancada: React.FC<{ onBackToHome?: () => void }> = ({ onBackToHome }) => {
  const [tabValue, setTabValue] = useState(0);
  const [arquivoSelecionado, setArquivoSelecionado] = useState<File | null>(null);
  const [analiseConfig, setAnaliseConfig] = useState<AnaliseConfig>({
    tipo: '',
    metodo: '',
    validacao: '',
    parametros: {}
  });
  const [dialogGuia, setDialogGuia] = useState(false);
  const [metodoSelecionado, setMetodoSelecionado] = useState<MetodoAnalise | null>(null);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [tutorialRespostas, setTutorialRespostas] = useState<{[key: string]: string}>({
    objetivo: '',
    dados: '',
    tamanho: '',
    interpretabilidade: ''
  });
  const [passoTutorial, setPassoTutorial] = useState(0);
  const [recomendacoes, setRecomendacoes] = useState<MetodoAnalise[]>([]);

  const metodosAnalise: MetodoAnalise[] = [
    {
      id: 'regressao_linear',
      nome: 'Regressão Linear',
      descricao: 'Modela a relação linear entre variáveis dependentes e independentes',
      quando_usar: [
        'Prever valores numéricos contínuos',
        'Identificar relações lineares entre variáveis',
        'Análise de tendências temporais',
        'Estimar impacto de fatores sobre resultado'
      ],
      vantagens: [
        'Fácil interpretação dos coeficientes',
        'Rápida execução computacional',
        'Boa baseline para problemas de regressão',
        'Permite análise de significância estatística'
      ],
      limitacoes: [
        'Assume relação linear entre variáveis',
        'Sensível a outliers',
        'Requer independência dos resíduos',
        'Pode sofrer com multicolinearidade'
      ],
      exemplo_pratico: 'Prever preço de imóveis baseado em área, localização e número de quartos',
      complexidade: 'Básico',
      tipo_dados: ['Numérico contínuo', 'Categórico (dummy)'],
      tamanho_amostra: 'Mínimo 30 observações, ideal >100',
      interpretacao: 'Coeficientes indicam mudança na variável dependente por unidade da independente'
    },
    {
      id: 'regressao_logistica',
      nome: 'Regressão Logística',
      descricao: 'Modela probabilidade de ocorrência de eventos binários ou categóricos',
      quando_usar: [
        'Problemas de classificação binária',
        'Prever probabilidade de eventos',
        'Análise de fatores de risco',
        'Diagnóstico médico (sim/não)'
      ],
      vantagens: [
        'Fornece probabilidades interpretáveis',
        'Não assume distribuição normal',
        'Robusto a outliers na variável dependente',
        'Coeficientes têm interpretação clara'
      ],
      limitacoes: [
        'Assume relação linear entre logit e preditores',
        'Sensível a outliers extremos',
        'Requer amostras grandes para categorias raras',
        'Pode sofrer com separação completa'
      ],
      exemplo_pratico: 'Prever se cliente irá cancelar assinatura baseado em comportamento de uso',
      complexidade: 'Intermediário',
      tipo_dados: ['Binário', 'Categórico', 'Numérico'],
      tamanho_amostra: 'Mínimo 50 eventos por preditor',
      interpretacao: 'Odds ratio indica quantas vezes mais provável é o evento'
    },
    {
      id: 'random_forest',
      nome: 'Random Forest',
      descricao: 'Ensemble de árvores de decisão para classificação e regressão robusta',
      quando_usar: [
        'Dados com muitas variáveis',
        'Relações não-lineares complexas',
        'Dados com ruído e outliers',
        'Quando interpretabilidade não é crítica'
      ],
      vantagens: [
        'Lida bem com dados faltantes',
        'Reduz overfitting das árvores',
        'Fornece importância das variáveis',
        'Funciona com dados mistos'
      ],
      limitacoes: [
        'Menos interpretável que árvores simples',
        'Pode overfit com muito ruído',
        'Memória intensivo para grandes datasets',
        'Viés para variáveis categóricas com muitos níveis'
      ],
      exemplo_pratico: 'Classificar emails como spam/não-spam usando múltiplas características',
      complexidade: 'Intermediário',
      tipo_dados: ['Numérico', 'Categórico', 'Texto processado'],
      tamanho_amostra: 'Funciona bem com qualquer tamanho',
      interpretacao: 'Importância das features e probabilidades de classe'
    },
    {
      id: 'kmeans',
      nome: 'K-Means Clustering',
      descricao: 'Agrupa observações em k clusters baseado em similaridade',
      quando_usar: [
        'Segmentação de clientes',
        'Identificar padrões ocultos',
        'Redução de dados',
        'Análise exploratória de grupos'
      ],
      vantagens: [
        'Simples de implementar e entender',
        'Computacionalmente eficiente',
        'Funciona bem com clusters esféricos',
        'Escalável para grandes datasets'
      ],
      limitacoes: [
        'Precisa definir número de clusters',
        'Sensível à inicialização',
        'Assume clusters esféricos',
        'Afetado por escala das variáveis'
      ],
      exemplo_pratico: 'Segmentar clientes por padrão de compra (valor, frequência, recência)',
      complexidade: 'Básico',
      tipo_dados: ['Numérico contínuo'],
      tamanho_amostra: 'Ideal >100 observações',
      interpretacao: 'Centroides dos clusters e distâncias dos pontos'
    },
    {
      id: 'pca',
      nome: 'Análise de Componentes Principais (PCA)',
      descricao: 'Reduz dimensionalidade preservando máxima variância dos dados',
      quando_usar: [
        'Muitas variáveis correlacionadas',
        'Visualização de dados multidimensionais',
        'Redução de ruído',
        'Pré-processamento para ML'
      ],
      vantagens: [
        'Remove redundância entre variáveis',
        'Reduz curse of dimensionality',
        'Facilita visualização',
        'Elimina multicolinearidade'
      ],
      limitacoes: [
        'Componentes podem ser difíceis de interpretar',
        'Assume relações lineares',
        'Todos dados devem ser numéricos',
        'Sensível à escala das variáveis'
      ],
      exemplo_pratico: 'Reduzir 50 indicadores econômicos para 5 fatores principais',
      complexidade: 'Intermediário',
      tipo_dados: ['Numérico contínuo'],
      tamanho_amostra: 'Mínimo 3x número de variáveis',
      interpretacao: 'Variância explicada por componente e loadings das variáveis'
    },
    {
      id: 'anova',
      nome: 'Análise de Variância (ANOVA)',
      descricao: 'Testa se médias de grupos são estatisticamente diferentes',
      quando_usar: [
        'Comparar médias de 3+ grupos',
        'Testar efeito de fatores categóricos',
        'Experimentos controlados',
        'A/B/C testing'
      ],
      vantagens: [
        'Controla erro Tipo I em múltiplas comparações',
        'Testa múltiplos fatores simultaneamente',
        'Identifica interações entre fatores',
        'Base estatística sólida'
      ],
      limitacoes: [
        'Assume normalidade dos resíduos',
        'Requer homocedasticidade',
        'Sensível a outliers',
        'Grupos devem ser independentes'
      ],
      exemplo_pratico: 'Comparar eficácia de 4 tratamentos médicos diferentes',
      complexidade: 'Intermediário',
      tipo_dados: ['Numérico contínuo (dependente)', 'Categórico (independente)'],
      tamanho_amostra: 'Mínimo 15-20 por grupo',
      interpretacao: 'F-statistic e p-value para significância das diferenças'
    },
    {
      id: 'teste_qui_quadrado',
      nome: 'Teste Qui-Quadrado',
      descricao: 'Testa independência entre variáveis categóricas',
      quando_usar: [
        'Testar associação entre categorias',
        'Validar independência de variáveis',
        'Análise de contingência',
        'Goodness-of-fit testing'
      ],
      vantagens: [
        'Não assume distribuição específica',
        'Fácil de calcular e interpretar',
        'Funciona com dados categóricos',
        'Amplamente aceito'
      ],
      limitacoes: [
        'Requer frequências esperadas ≥5',
        'Sensível ao tamanho da amostra',
        'Não indica direção da associação',
        'Assume observações independentes'
      ],
      exemplo_pratico: 'Testar se gênero está associado à preferência de produto',
      complexidade: 'Básico',
      tipo_dados: ['Categórico'],
      tamanho_amostra: 'Frequência esperada ≥5 em cada célula',
      interpretacao: 'Chi-square statistic e p-value para independência'
    },
    {
      id: 'correlacao_pearson',
      nome: 'Correlação de Pearson',
      descricao: 'Mede força e direção da relação linear entre variáveis',
      quando_usar: [
        'Identificar relações lineares',
        'Análise exploratória inicial',
        'Seleção de variáveis',
        'Validar pressupostos de modelos'
      ],
      vantagens: [
        'Fácil interpretação (-1 a +1)',
        'Amplamente conhecido',
        'Rápido de calcular',
        'Indica direção da relação'
      ],
      limitacoes: [
        'Apenas relações lineares',
        'Sensível a outliers',
        'Assume distribuição bivariada normal',
        'Correlação ≠ causalidade'
      ],
      exemplo_pratico: 'Medir relação entre temperatura e vendas de sorvete',
      complexidade: 'Básico',
      tipo_dados: ['Numérico contínuo'],
      tamanho_amostra: 'Mínimo 30 observações',
      interpretacao: 'r próximo de ±1 = forte correlação, próximo de 0 = fraca'
    }
  ];

  const guiaSelecaoMetodo = [
    {
      pergunta: "Qual é o seu objetivo principal?",
      opcoes: [
        { texto: "Prever valores numéricos", metodos: ['regressao_linear', 'random_forest'] },
        { texto: "Classificar em categorias", metodos: ['regressao_logistica', 'random_forest'] },
        { texto: "Encontrar grupos/padrões", metodos: ['kmeans', 'pca'] },
        { texto: "Testar diferenças entre grupos", metodos: ['anova', 'teste_qui_quadrado'] },
        { texto: "Medir relações entre variáveis", metodos: ['correlacao_pearson', 'regressao_linear'] }
      ]
    },
    {
      pergunta: "Que tipo de dados você possui?",
      opcoes: [
        { texto: "Apenas numéricos", metodos: ['regressao_linear', 'correlacao_pearson', 'pca', 'kmeans'] },
        { texto: "Apenas categóricos", metodos: ['teste_qui_quadrado', 'regressao_logistica'] },
        { texto: "Mistos (numéricos + categóricos)", metodos: ['random_forest', 'regressao_logistica', 'anova'] }
      ]
    },
    {
      pergunta: "Qual o tamanho da sua amostra?",
      opcoes: [
        { texto: "Pequena (<100)", metodos: ['correlacao_pearson', 'teste_qui_quadrado'] },
        { texto: "Média (100-1000)", metodos: ['regressao_linear', 'regressao_logistica', 'anova'] },
        { texto: "Grande (>1000)", metodos: ['random_forest', 'kmeans', 'pca'] }
      ]
    }
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = event.target.files?.[0];
    if (arquivo) {
      setArquivoSelecionado(arquivo);
    }
  }, []);

  const downloadRelatorioTemplateDetalhado = () => {
    const templateRelatorio = `
# RELATÓRIO DE ANÁLISE CIENTÍFICA
## Template Detalhado - DataScience Pro

### 1. RESUMO EXECUTIVO
[Resumo conciso dos principais achados e conclusões]

### 2. INTRODUÇÃO E OBJETIVOS
**Contexto do Problema:**
[Descreva o problema que motivou a análise]

**Objetivos Específicos:**
• Objetivo 1: [Descreva]
• Objetivo 2: [Descreva]
• Objetivo 3: [Descreva]

**Hipóteses a Testar:**
• H₀: [Hipótese nula]
• H₁: [Hipótese alternativa]

### 3. METODOLOGIA
**Dados Utilizados:**
• Fonte: [Origem dos dados]
• Período: [Período de coleta]
• Tamanho da amostra: [N = X observações]
• Variáveis principais: [Liste as variáveis]

**Métodos Estatísticos Aplicados:**
• [Método 1]: Justificativa para escolha
• [Método 2]: Justificativa para escolha

**Pressupostos Verificados:**
☐ Normalidade dos resíduos
☐ Homocedasticidade
☐ Independência das observações
☐ Ausência de multicolinearidade

### 4. ANÁLISE EXPLORATÓRIA
**Estatísticas Descritivas:**
[Insira tabela com médias, medianas, desvios padrão]

**Distribuição das Variáveis:**
[Comente sobre a distribuição de cada variável]

**Correlações Relevantes:**
[Liste correlações significativas]

### 5. RESULTADOS PRINCIPAIS
**Análise [Nome do Método]:**
• Estatística do teste: [Valor]
• p-value: [Valor]
• Intervalo de confiança: [95% IC: X - Y]
• Tamanho do efeito: [Valor e interpretação]

**Validação dos Resultados:**
• Validação cruzada: [Resultados]
• Testes de robustez: [Resultados]

### 6. INTERPRETAÇÃO E DISCUSSÃO
**Interpretação dos Resultados:**
[Explique o que os resultados significam em termos práticos]

**Limitações do Estudo:**
• [Limitação 1]
• [Limitação 2]
• [Limitação 3]

**Comparação com Literatura:**
[Se aplicável, compare com outros estudos]

### 7. CONCLUSÕES E RECOMENDAÇÕES
**Principais Conclusões:**
• [Conclusão 1]
• [Conclusão 2]
• [Conclusão 3]

**Recomendações Práticas:**
• [Recomendação 1]
• [Recomendação 2]

**Próximos Passos:**
• [Sugestão para pesquisas futuras]

### 8. ANEXOS
**Anexo A:** Código R/Python utilizado
**Anexo B:** Tabelas detalhadas
**Anexo C:** Gráficos adicionais

---
**Referências:**
[Liste referências relevantes]

**Informações Técnicas:**
• Software utilizado: DataScience Pro
• Data da análise: ${new Date().toLocaleDateString('pt-BR')}
• Tempo de processamento: [X minutos]
• Reproducibilidade: Código disponível nos anexos
`;

    const blob = new Blob([templateRelatorio], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Template_Relatorio_Cientifico_Detalhado.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Função para processar respostas do tutorial e gerar recomendações
  const processarTutorial = () => {
    const { objetivo, dados, tamanho, interpretabilidade } = tutorialRespostas;
    
    let metodosRecomendados: MetodoAnalise[] = [];
    
    // Lógica de recomendação baseada nas respostas
    if (objetivo === 'previsao' && dados === 'numericos') {
      metodosRecomendados.push(...metodosAnalise.filter(m => 
        ['regressao_linear', 'random_forest'].includes(m.id)
      ));
    } else if (objetivo === 'classificacao') {
      metodosRecomendados.push(...metodosAnalise.filter(m => 
        ['regressao_logistica', 'random_forest'].includes(m.id)
      ));
    } else if (objetivo === 'agrupamento') {
      metodosRecomendados.push(...metodosAnalise.filter(m => 
        ['kmeans', 'pca'].includes(m.id)
      ));
    } else if (objetivo === 'comparacao') {
      metodosRecomendados.push(...metodosAnalise.filter(m => 
        ['anova', 'teste_qui_quadrado'].includes(m.id)
      ));
    } else if (objetivo === 'relacoes') {
      metodosRecomendados.push(...metodosAnalise.filter(m => 
        ['correlacao_pearson', 'regressao_linear'].includes(m.id)
      ));
    }

    // Filtrar por tamanho da amostra
    if (tamanho === 'pequena') {
      metodosRecomendados = metodosRecomendados.filter(m => 
        ['correlacao_pearson', 'teste_qui_quadrado'].includes(m.id)
      );
    }

    // Filtrar por interpretabilidade
    if (interpretabilidade === 'alta') {
      metodosRecomendados = metodosRecomendados.filter(m => 
        !['random_forest'].includes(m.id)
      );
    }

    setRecomendacoes(metodosRecomendados);
  };

  const perguntasTutorial = [
    {
      titulo: "Qual é o seu objetivo principal?",
      campo: "objetivo",
      opcoes: [
        { valor: "previsao", texto: "Prever valores numéricos (ex: preço, vendas)" },
        { valor: "classificacao", texto: "Classificar em categorias (ex: spam/não spam)" },
        { valor: "agrupamento", texto: "Encontrar grupos/padrões nos dados" },
        { valor: "comparacao", texto: "Comparar grupos ou testar diferenças" },
        { valor: "relacoes", texto: "Medir relações entre variáveis" }
      ]
    },
    {
      titulo: "Que tipo de dados você possui?",
      campo: "dados",
      opcoes: [
        { valor: "numericos", texto: "Principalmente numéricos (idades, preços, medidas)" },
        { valor: "categoricos", texto: "Principalmente categóricos (sim/não, tipos, categorias)" },
        { valor: "mistos", texto: "Mistos (numéricos e categóricos)" },
        { valor: "texto", texto: "Dados de texto (comentários, descrições)" }
      ]
    },
    {
      titulo: "Qual o tamanho da sua amostra?",
      campo: "tamanho",
      opcoes: [
        { valor: "pequena", texto: "Pequena (menos de 100 observações)" },
        { valor: "media", texto: "Média (100 a 1.000 observações)" },
        { valor: "grande", texto: "Grande (mais de 1.000 observações)" },
        { valor: "muito_grande", texto: "Muito grande (mais de 100.000 observações)" }
      ]
    },
    {
      titulo: "Quão importante é a interpretabilidade?",
      campo: "interpretabilidade",
      opcoes: [
        { valor: "alta", texto: "Muito importante - preciso explicar como o modelo funciona" },
        { valor: "media", texto: "Moderadamente importante - equilíbrio entre precisão e interpretação" },
        { valor: "baixa", texto: "Pouco importante - foco na precisão do resultado" }
      ]
    }
  ];

  const proximoPassoTutorial = () => {
    if (passoTutorial < perguntasTutorial.length - 1) {
      setPassoTutorial(passoTutorial + 1);
    } else {
      processarTutorial();
    }
  };

  const anteriorPassoTutorial = () => {
    if (passoTutorial > 0) {
      setPassoTutorial(passoTutorial - 1);
    }
  };

  const reiniciarTutorial = () => {
    setPassoTutorial(0);
    setTutorialRespostas({
      objetivo: '',
      dados: '',
      tamanho: '',
      interpretabilidade: ''
    });
    setRecomendacoes([]);
  };

  const fecharTutorial = () => {
    setDialogGuia(false);
    reiniciarTutorial();
  };

  const downloadGuiaCompleto = () => {
    const guiaCompleto = `
# GUIA COMPLETO DE METODOLOGIA CIENTÍFICA
## DataScience Pro - Versão Avançada

### ÍNDICE
1. Introdução à Metodologia Científica
2. Escolha de Métodos Estatísticos
3. Pressupostos e Validações
4. Interpretação de Resultados
5. Boas Práticas na Análise de Dados
6. Estrutura de Relatórios Científicos
7. Checklist de Qualidade

---

### 1. INTRODUÇÃO À METODOLOGIA CIENTÍFICA

A metodologia científica em ciência de dados envolve um processo sistemático para:
- **Formular hipóteses** testáveis e específicas
- **Coletar dados** de forma representativa e não enviesada
- **Aplicar métodos** estatísticos apropriados
- **Interpretar resultados** com rigor e cautela
- **Comunicar descobertas** de forma clara e reprodutível

#### Etapas do Processo Científico:
1. **Observação**: Identificar padrões ou problemas nos dados
2. **Pergunta de Pesquisa**: Formular questões específicas e mensuráveis
3. **Hipótese**: Propor explicações testáveis
4. **Experimentação/Análise**: Coletar e analisar dados
5. **Conclusão**: Interpretar resultados e tirar conclusões
6. **Replicação**: Verificar se os resultados são reprodutíveis

---

### 2. ESCOLHA DE MÉTODOS ESTATÍSTICOS

#### Para Dados Numéricos:
**Análise Descritiva:**
- Média, mediana, moda
- Desvio padrão, quartis
- Distribuição dos dados

**Análise Inferencial:**
- Teste t para comparação de médias
- ANOVA para múltiplos grupos
- Regressão linear para relações

#### Para Dados Categóricos:
- Frequências e proporções
- Teste qui-quadrado
- Teste exato de Fisher

#### Para Análise Multivariada:
- PCA (Análise de Componentes Principais)
- Análise de Clusters
- Regressão múltipla

---

### 3. PRESSUPOSTOS E VALIDAÇÕES

#### Antes de Aplicar Testes Estatísticos:
**Normalidade:**
- Teste Shapiro-Wilk (n < 50)
- Teste Kolmogorov-Smirnov (n > 50)
- Inspeção visual com Q-Q plots

**Homocedasticidade:**
- Teste de Levene
- Gráfico de resíduos vs valores preditos

**Independência:**
- Verificar aleatoriedade da amostra
- Teste Durbin-Watson para séries temporais

**Linearidade (para regressão):**
- Gráficos de dispersão
- Análise de resíduos

---

### 4. INTERPRETAÇÃO DE RESULTADOS

#### P-valores:
- **p < 0.001**: Evidência muito forte contra H₀
- **0.001 ≤ p < 0.01**: Evidência forte contra H₀
- **0.01 ≤ p < 0.05**: Evidência moderada contra H₀
- **p ≥ 0.05**: Evidência insuficiente contra H₀

#### Tamanho do Efeito:
- **Cohen's d**: 0.2 (pequeno), 0.5 (médio), 0.8 (grande)
- **R²**: Proporção da variância explicada
- **Eta²**: Para ANOVA

#### Intervalos de Confiança:
- 95% IC: [limite inferior, limite superior]
- Interpretação: "Estamos 95% confiantes de que o verdadeiro valor está neste intervalo"

---

### 5. BOAS PRÁTICAS NA ANÁLISE DE DADOS

#### Preparação dos Dados:
1. **Limpeza**: Remover dados inconsistentes
2. **Outliers**: Identificar e tratar valores extremos
3. **Dados Faltantes**: Escolher estratégia apropriada
4. **Transformações**: Log, raiz quadrada, padronização

#### Análise Exploratória:
1. **Visualizações**: Histogramas, boxplots, scatter plots
2. **Estatísticas Descritivas**: Resumir dados numericamente
3. **Correlações**: Matriz de correlação
4. **Padrões**: Identificar tendências e sazonalidades

#### Validação:
1. **Divisão dos Dados**: Treino/validação/teste
2. **Validação Cruzada**: k-fold cross validation
3. **Métricas**: Precisão, recall, F1-score, RMSE
4. **Teste em Dados Novos**: Verificar generalização

---

### 6. ESTRUTURA DE RELATÓRIOS CIENTÍFICOS

#### Seções Obrigatórias:
1. **Resumo/Abstract**: Síntese de 150-300 palavras
2. **Introdução**: Contexto e objetivos
3. **Metodologia**: Dados e métodos utilizados
4. **Resultados**: Achados principais com evidências
5. **Discussão**: Interpretação e limitações
6. **Conclusões**: Síntese das descobertas
7. **Referências**: Literatura consultada

#### Elementos de Qualidade:
- **Transparência**: Código e dados disponíveis
- **Reprodutibilidade**: Outros podem replicar
- **Rigor**: Métodos apropriados e bem aplicados
- **Clareza**: Linguagem acessível e precisa

---

### 7. CHECKLIST DE QUALIDADE

#### Antes de Finalizar a Análise:
☐ Objetivos claramente definidos
☐ Hipóteses testáveis formuladas
☐ Dados apropriados para os objetivos
☐ Pressupostos dos testes verificados
☐ Métodos estatísticos corretos aplicados
☐ Resultados interpretados adequadamente
☐ Limitações identificadas e discutidas
☐ Conclusões suportadas pelos dados
☐ Código documentado e reprodutível
☐ Gráficos informativos e bem legendados

#### Perguntas de Autocrítica:
1. Os dados são representativos da população de interesse?
2. O tamanho da amostra é adequado para detectar efeitos relevantes?
3. Há vieses na coleta ou análise dos dados?
4. Os resultados são praticamente significativos, não apenas estatisticamente?
5. As conclusões são generalizáveis além desta amostra?

---

### REFERÊNCIAS RECOMENDADAS

**Livros:**
- "Statistics for Data Science" - James, Witten, Hastie, Tibshirani
- "The Elements of Statistical Learning" - Hastie, Tibshirani, Friedman
- "Practical Statistics for Data Scientists" - Bruce & Bruce

**Artigos:**
- "Statistical tests, P values, confidence intervals, and power" - Greenland et al.
- "The ASA's statement on p-values" - Wasserstein & Lazar

**Recursos Online:**
- Khan Academy Statistics
- Coursera Statistics Courses
- R Documentation (r-project.org)

---

**Gerado por:** DataScience Pro
**Data:** ${new Date().toLocaleDateString('pt-BR')}
**Versão:** 2.0 Avançada
`;

    const blob = new Blob([guiaCompleto], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Guia_Metodologia_Cientifica_Completo.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1400, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        {onBackToHome && (
          <IconButton 
            onClick={onBackToHome} 
            sx={{ mr: 2 }}
            size="large"
          >
            <ArrowBack />
          </IconButton>
        )}
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 2 }}>
            <Science color="primary" sx={{ fontSize: 40 }} />
            Metodologia Científica Avançada
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Guia completo para seleção e aplicação de métodos estatísticos e de machine learning
          </Typography>
        </Box>
      </Box>

      {/* Navigation Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
          <Tab icon={<MenuBook />} label="Guia de Métodos" />
          <Tab icon={<TipsAndUpdates />} label="Seletor Inteligente" />
          <Tab icon={<Engineering />} label="Análise Prática" />
          <Tab icon={<Assignment />} label="Templates" />
        </Tabs>
      </Box>

      {/* Tab 1: Guia de Métodos */}
      <TabPanel value={tabValue} index={0}>
        <Box sx={{ mb: 3 }}>
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              📚 Biblioteca de Métodos Estatísticos
            </Typography>
            Explore nossa coleção completa de métodos com explicações detalhadas sobre quando e como usar cada um.
          </Alert>

          <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              startIcon={<Download />}
              onClick={downloadGuiaCompleto}
              color="primary"
            >
              Download Guia Completo
            </Button>
            <Button
              variant="outlined"
              startIcon={<School />}
              onClick={() => setDialogGuia(true)}
            >
              Tutorial Interativo
            </Button>
          </Box>

          <Grid container spacing={3}>
            {metodosAnalise.map((metodo) => (
              <Grid item xs={12} md={6} key={metodo.id}>
                <Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.02)' } }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        {metodo.nome}
                      </Typography>
                      <Chip 
                        label={metodo.complexidade} 
                        color={
                          metodo.complexidade === 'Básico' ? 'success' :
                          metodo.complexidade === 'Intermediário' ? 'warning' : 'error'
                        }
                        size="small"
                      />
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {metodo.descricao}
                    </Typography>

                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="subtitle2">Quando Usar</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <List dense>
                          {metodo.quando_usar.map((item, idx) => (
                            <ListItem key={idx}>
                              <ListItemIcon>
                                <CheckCircle color="success" fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary={item} />
                            </ListItem>
                          ))}
                        </List>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="subtitle2">Vantagens & Limitações</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant="subtitle2" color="success.main" gutterBottom>
                          ✅ Vantagens:
                        </Typography>
                        <List dense>
                          {metodo.vantagens.map((item, idx) => (
                            <ListItem key={idx}>
                              <ListItemText primary={item} />
                            </ListItem>
                          ))}
                        </List>
                        
                        <Typography variant="subtitle2" color="error.main" gutterBottom>
                          ⚠️ Limitações:
                        </Typography>
                        <List dense>
                          {metodo.limitacoes.map((item, idx) => (
                            <ListItem key={idx}>
                              <ListItemText primary={item} />
                            </ListItem>
                          ))}
                        </List>
                      </AccordionDetails>
                    </Accordion>

                    <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        💡 Exemplo Prático:
                      </Typography>
                      <Typography variant="body2">
                        {metodo.exemplo_pratico}
                      </Typography>
                    </Box>

                    <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {metodo.tipo_dados.map((tipo) => (
                        <Chip key={tipo} label={tipo} size="small" variant="outlined" />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </TabPanel>

      {/* Tab 2: Seletor Inteligente */}
      <TabPanel value={tabValue} index={1}>
        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            🎯 Seletor Inteligente de Métodos
          </Typography>
          Responda as perguntas abaixo para receber recomendações personalizadas dos melhores métodos para sua análise.
        </Alert>

        <Grid container spacing={4}>
          {guiaSelecaoMetodo.map((pergunta, perguntaIdx) => (
            <Grid item xs={12} md={4} key={perguntaIdx}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    {pergunta.pergunta}
                  </Typography>
                  
                  <List>
                    {pergunta.opcoes.map((opcao, opcaoIdx) => (
                      <ListItem 
                        key={opcaoIdx}
                        button
                        onClick={() => {
                          // Lógica para destacar métodos recomendados
                          console.log('Métodos recomendados:', opcao.metodos);
                        }}
                        sx={{ 
                          border: 1, 
                          borderColor: 'grey.300', 
                          borderRadius: 1, 
                          mb: 1,
                          '&:hover': { bgcolor: 'primary.light', color: 'white' }
                        }}
                      >
                        <ListItemIcon>
                          <EmojiObjects color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={opcao.texto}
                          secondary={`Recomenda: ${opcao.metodos.length} métodos`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Card sx={{ bgcolor: 'info.light' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📊 Matriz de Decisão Rápida
              </Typography>
              
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Objetivo</strong></TableCell>
                      <TableCell><strong>Dados Numéricos</strong></TableCell>
                      <TableCell><strong>Dados Categóricos</strong></TableCell>
                      <TableCell><strong>Dados Mistos</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell><strong>Previsão</strong></TableCell>
                      <TableCell>Regressão Linear</TableCell>
                      <TableCell>Regressão Logística</TableCell>
                      <TableCell>Random Forest</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Classificação</strong></TableCell>
                      <TableCell>Regressão Logística</TableCell>
                      <TableCell>Qui-Quadrado</TableCell>
                      <TableCell>Random Forest</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Agrupamento</strong></TableCell>
                      <TableCell>K-Means, PCA</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>Pré-processamento + K-Means</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Comparação</strong></TableCell>
                      <TableCell>ANOVA</TableCell>
                      <TableCell>Qui-Quadrado</TableCell>
                      <TableCell>ANOVA Multi-fatorial</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Relações</strong></TableCell>
                      <TableCell>Correlação de Pearson</TableCell>
                      <TableCell>Qui-Quadrado</TableCell>
                      <TableCell>Regressão Múltipla</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      </TabPanel>

      {/* Tab 3: Análise Prática */}
      <TabPanel value={tabValue} index={2}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            🔬 Workspace de Análise Prática
          </Typography>
          Configure e execute análises seguindo as melhores práticas científicas.
        </Alert>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  📁 Upload de Dados
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <input
                    accept=".csv,.xlsx,.xls"
                    style={{ display: 'none' }}
                    id="upload-file"
                    type="file"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="upload-file">
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<CloudUpload />}
                      fullWidth
                      sx={{ py: 2 }}
                    >
                      Selecionar Arquivo de Dados
                    </Button>
                  </label>
                </Box>

                {arquivoSelecionado && (
                  <Alert severity="success">
                    Arquivo selecionado: {arquivoSelecionado.name}
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  ⚙️ Configuração da Análise
                </Typography>
                
                <Stack spacing={2}>
                  <FormControl fullWidth>
                    <InputLabel>Tipo de Análise</InputLabel>
                    <Select
                      value={analiseConfig.tipo}
                      onChange={(e) => setAnaliseConfig(prev => ({...prev, tipo: e.target.value}))}
                    >
                      <MenuItem value="descritiva">Análise Descritiva</MenuItem>
                      <MenuItem value="inferencial">Análise Inferencial</MenuItem>
                      <MenuItem value="preditiva">Modelagem Preditiva</MenuItem>
                      <MenuItem value="exploratoria">Análise Exploratória</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>Método Principal</InputLabel>
                    <Select
                      value={analiseConfig.metodo}
                      onChange={(e) => setAnaliseConfig(prev => ({...prev, metodo: e.target.value}))}
                    >
                      {metodosAnalise.map(metodo => (
                        <MenuItem key={metodo.id} value={metodo.id}>
                          {metodo.nome}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>Validação</InputLabel>
                    <Select
                      value={analiseConfig.validacao}
                      onChange={(e) => setAnaliseConfig(prev => ({...prev, validacao: e.target.value}))}
                    >
                      <MenuItem value="holdout">Hold-out (70/30)</MenuItem>
                      <MenuItem value="kfold">K-Fold Cross-Validation</MenuItem>
                      <MenuItem value="bootstrap">Bootstrap</MenuItem>
                      <MenuItem value="none">Sem Validação</MenuItem>
                    </Select>
                  </FormControl>

                  <Button
                    variant="contained"
                    startIcon={<PlayArrow />}
                    fullWidth
                    disabled={!arquivoSelecionado || !analiseConfig.tipo || !analiseConfig.metodo}
                  >
                    Iniciar Análise Científica
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Fluxo de Trabalho */}
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📋 Fluxo de Trabalho Científico
            </Typography>
            
            <Stepper orientation="vertical">
              {[
                'Definição do Problema e Objetivos',
                'Coleta e Validação dos Dados',
                'Análise Exploratória de Dados',
                'Seleção e Aplicação do Método',
                'Validação e Testes de Robustez',
                'Interpretação e Documentação'
              ].map((etapa, index) => (
                <Step key={index} active={true}>
                  <StepLabel>{etapa}</StepLabel>
                  <StepContent>
                    <Typography variant="body2" color="text.secondary">
                      {index === 0 && "Formule hipóteses claras e defina métricas de sucesso"}
                      {index === 1 && "Verifique qualidade, completude e adequação dos dados"}
                      {index === 2 && "Entenda a distribuição, correlações e padrões nos dados"}
                      {index === 3 && "Escolha método adequado e aplique seguindo pressupostos"}
                      {index === 4 && "Valide resultados com técnicas apropriadas"}
                      {index === 5 && "Interprete resultados e documente todo o processo"}
                    </Typography>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Tab 4: Templates */}
      <TabPanel value={tabValue} index={3}>
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            📄 Templates e Modelos
          </Typography>
          Baixe templates prontos para documentar suas análises seguindo padrões científicos.
        </Alert>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  📊 Relatório Científico Completo
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Template detalhado seguindo padrões acadêmicos com todas as seções necessárias.
                </Typography>
                
                <List dense>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Estrutura acadêmica completa" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Seções para metodologia e resultados" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Checklists de validação" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Espaços para código e anexos" />
                  </ListItem>
                </List>

                <Button
                  variant="contained"
                  startIcon={<Download />}
                  fullWidth
                  onClick={downloadRelatorioTemplateDetalhado}
                  sx={{ mt: 2 }}
                >
                  Download Template Detalhado
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🎯 Checklist de Qualidade
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Lista de verificação para garantir rigor científico em suas análises.
                </Typography>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="subtitle2">📋 Checklist Completo</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box>
                      <Typography variant="subtitle2" gutterBottom color="primary">
                        Preparação dos Dados:
                      </Typography>
                      <List dense>
                        {[
                          'Verificar qualidade e completude dos dados',
                          'Tratar valores faltantes adequadamente',
                          'Identificar e tratar outliers',
                          'Verificar distribuições das variáveis',
                          'Testar pressupostos do método escolhido'
                        ].map((item, idx) => (
                          <ListItem key={idx}>
                            <ListItemIcon>
                              <input type="checkbox" />
                            </ListItemIcon>
                            <ListItemText primary={item} />
                          </ListItem>
                        ))}
                      </List>

                      <Typography variant="subtitle2" gutterBottom color="primary" sx={{ mt: 2 }}>
                        Execução da Análise:
                      </Typography>
                      <List dense>
                        {[
                          'Justificar escolha do método',
                          'Definir nível de significância',
                          'Executar testes de validação',
                          'Calcular intervalos de confiança',
                          'Verificar robustez dos resultados'
                        ].map((item, idx) => (
                          <ListItem key={idx}>
                            <ListItemIcon>
                              <input type="checkbox" />
                            </ListItemIcon>
                            <ListItemText primary={item} />
                          </ListItem>
                        ))}
                      </List>

                      <Typography variant="subtitle2" gutterBottom color="primary" sx={{ mt: 2 }}>
                        Documentação:
                      </Typography>
                      <List dense>
                        {[
                          'Documentar todo o processo',
                          'Incluir código reproduzível',
                          'Discutir limitações',
                          'Apresentar conclusões claras',
                          'Sugerir próximos passos'
                        ].map((item, idx) => (
                          <ListItem key={idx}>
                            <ListItemIcon>
                              <input type="checkbox" />
                            </ListItemIcon>
                            <ListItemText primary={item} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  📚 Recursos Adicionais
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button variant="outlined" fullWidth startIcon={<FilePresent />}>
                      Template LaTeX
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button variant="outlined" fullWidth startIcon={<Analytics />}>
                      Guia de Visualização
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button variant="outlined" fullWidth startIcon={<Psychology />}>
                      Casos de Uso
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button variant="outlined" fullWidth startIcon={<School />}>
                      Tutoriais
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Dialog Tutorial */}
      <Dialog open={dialogGuia} onClose={fecharTutorial} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <School color="primary" />
            Tutorial Interativo: Escolha do Método Ideal
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2 }}>
            {recomendacoes.length === 0 ? (
              <>
                <Typography variant="h6" gutterBottom color="primary">
                  🎯 Tutorial Personalizado - Passo {passoTutorial + 1} de {perguntasTutorial.length}
                </Typography>
                
                <LinearProgress 
                  variant="determinate" 
                  value={(passoTutorial / perguntasTutorial.length) * 100} 
                  sx={{ mb: 3 }}
                />

                {passoTutorial < perguntasTutorial.length && (
                  <>
                    <Typography variant="h6" gutterBottom>
                      {perguntasTutorial[passoTutorial].titulo}
                    </Typography>
                    
                    <FormControl component="fieldset" fullWidth sx={{ mt: 2 }}>
                      <RadioGroup
                        value={tutorialRespostas[perguntasTutorial[passoTutorial].campo] || ''}
                        onChange={(e) => setTutorialRespostas(prev => ({
                          ...prev,
                          [perguntasTutorial[passoTutorial].campo]: e.target.value
                        }))}
                      >
                        {perguntasTutorial[passoTutorial].opcoes.map((opcao) => (
                          <FormControlLabel
                            key={opcao.valor}
                            value={opcao.valor}
                            control={<Radio />}
                            label={opcao.texto}
                            sx={{ mb: 1 }}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </>
                )}
              </>
            ) : (
              <>
                <Typography variant="h6" gutterBottom color="primary">
                  🎯 Recomendações Personalizadas
                </Typography>
                
                <Alert severity="success" sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    ✅ Análise Completa!
                  </Typography>
                  Com base nas suas respostas, encontramos os métodos mais adequados para seu projeto.
                </Alert>

                <Grid container spacing={2}>
                  {recomendacoes.map((metodo, index) => (
                    <Grid item xs={12} key={metodo.id}>
                      <Card sx={{ 
                        border: index === 0 ? '2px solid' : '1px solid',
                        borderColor: index === 0 ? 'success.main' : 'divider',
                        position: 'relative'
                      }}>
                        {index === 0 && (
                          <Chip
                            label="🏆 RECOMENDADO"
                            color="success"
                            size="small"
                            sx={{ 
                              position: 'absolute',
                              top: 8,
                              right: 8,
                              fontWeight: 'bold'
                            }}
                          />
                        )}
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {metodo.nome}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {metodo.descricao}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            <Chip 
                              label={metodo.complexidade} 
                              size="small"
                              color={
                                metodo.complexidade === 'Básico' ? 'success' :
                                metodo.complexidade === 'Intermediário' ? 'warning' : 'error'
                              }
                            />
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                <Alert severity="info" sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    💡 Próximos Passos:
                  </Typography>
                  <Typography variant="body2">
                    1. Comece com o método recomendado<br/>
                    2. Verifique os pressupostos necessários<br/>
                    3. Implemente e valide os resultados<br/>
                    4. Se necessário, experimente métodos alternativos
                  </Typography>
                </Alert>
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          {recomendacoes.length === 0 ? (
            <>
              <Button 
                onClick={anteriorPassoTutorial}
                disabled={passoTutorial === 0}
              >
                Anterior
              </Button>
              <Button onClick={fecharTutorial}>Cancelar</Button>
              <Button 
                variant="contained" 
                onClick={proximoPassoTutorial}
                disabled={!tutorialRespostas[perguntasTutorial[passoTutorial]?.campo]}
              >
                {passoTutorial < perguntasTutorial.length - 1 ? 'Próximo' : 'Ver Recomendações'}
              </Button>
            </>
          ) : (
            <>
              <Button onClick={reiniciarTutorial}>
                Refazer Tutorial
              </Button>
              <Button onClick={fecharTutorial}>Fechar</Button>
              <Button variant="contained" onClick={downloadGuiaCompleto}>
                Download Guia Completo
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MetodologiaCientificaAvancada;
