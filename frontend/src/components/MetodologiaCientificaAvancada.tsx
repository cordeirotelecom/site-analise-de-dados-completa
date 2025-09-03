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

  // ===== FUNÇÕES DE DOWNLOAD MELHORADAS =====
  
  const downloadTemplateWord = () => {
    const templateDoc = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8"/>
    <title>Template de Relatório Científico - DataScience Pro</title>
    <style>
        body { font-family: 'Times New Roman', serif; line-height: 1.6; margin: 1in; }
        h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
        h2 { color: #34495e; margin-top: 30px; }
        h3 { color: #7f8c8d; }
        .header { text-align: center; margin-bottom: 40px; }
        .section { margin-bottom: 25px; }
        .checklist { background: #f8f9fa; padding: 15px; border-left: 4px solid #28a745; }
        .formula { background: #e8f5e8; padding: 10px; font-family: 'Courier New', monospace; }
        table { border-collapse: collapse; width: 100%; margin: 15px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .footer { margin-top: 50px; border-top: 1px solid #ddd; padding-top: 20px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>RELATÓRIO DE ANÁLISE CIENTÍFICA</h1>
        <h2>Template Profissional - DataScience Pro</h2>
        <p><strong>Data:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
    </div>

    <div class="section">
        <h2>1. RESUMO EXECUTIVO</h2>
        <p><strong>Objetivo:</strong> [Descreva brevemente o objetivo principal da análise]</p>
        <p><strong>Métodos:</strong> [Principais métodos estatísticos utilizados]</p>
        <p><strong>Principais Achados:</strong> [3-4 descobertas mais importantes]</p>
        <p><strong>Conclusão:</strong> [Conclusão principal em 1-2 frases]</p>
        <p><strong>Recomendações:</strong> [Principais recomendações práticas]</p>
    </div>

    <div class="section">
        <h2>2. INTRODUÇÃO E CONTEXTO</h2>
        <h3>2.1 Problema de Pesquisa</h3>
        <p>[Descreva o problema que motivou esta análise]</p>
        
        <h3>2.2 Objetivos</h3>
        <p><strong>Objetivo Geral:</strong> [Objetivo principal]</p>
        <p><strong>Objetivos Específicos:</strong></p>
        <ul>
            <li>[Objetivo específico 1]</li>
            <li>[Objetivo específico 2]</li>
            <li>[Objetivo específico 3]</li>
        </ul>

        <h3>2.3 Hipóteses</h3>
        <p><strong>H₀ (Hipótese Nula):</strong> [Hipótese nula]</p>
        <p><strong>H₁ (Hipótese Alternativa):</strong> [Hipótese alternativa]</p>
    </div>

    <div class="section">
        <h2>3. METODOLOGIA</h2>
        <h3>3.1 Dados</h3>
        <table>
            <tr><th>Característica</th><th>Descrição</th></tr>
            <tr><td>Fonte dos Dados</td><td>[Origem dos dados]</td></tr>
            <tr><td>Período de Coleta</td><td>[Data início - Data fim]</td></tr>
            <tr><td>Tamanho da Amostra</td><td>[N = X observações]</td></tr>
            <tr><td>Variáveis Principais</td><td>[Liste as variáveis-chave]</td></tr>
            <tr><td>Tipo de Estudo</td><td>[Transversal/Longitudinal/Experimental]</td></tr>
        </table>

        <h3>3.2 Métodos Estatísticos</h3>
        <ul>
            <li><strong>[Método 1]:</strong> [Justificativa para escolha]</li>
            <li><strong>[Método 2]:</strong> [Justificativa para escolha]</li>
            <li><strong>[Método 3]:</strong> [Justificativa para escolha]</li>
        </ul>

        <div class="checklist">
            <h3>3.3 Pressupostos Verificados</h3>
            <p>☐ Normalidade dos resíduos (Teste: ______)</p>
            <p>☐ Homocedasticidade (Teste: ______)</p>
            <p>☐ Independência das observações</p>
            <p>☐ Ausência de multicolinearidade (VIF < 5)</p>
            <p>☐ Linearidade (quando aplicável)</p>
        </div>
    </div>

    <div class="section">
        <h2>4. ANÁLISE EXPLORATÓRIA</h2>
        <h3>4.1 Estatísticas Descritivas</h3>
        <table>
            <tr><th>Variável</th><th>Média</th><th>Mediana</th><th>Desvio Padrão</th><th>Min</th><th>Max</th></tr>
            <tr><td>[Variável 1]</td><td>[Valor]</td><td>[Valor]</td><td>[Valor]</td><td>[Valor]</td><td>[Valor]</td></tr>
            <tr><td>[Variável 2]</td><td>[Valor]</td><td>[Valor]</td><td>[Valor]</td><td>[Valor]</td><td>[Valor]</td></tr>
        </table>

        <h3>4.2 Visualizações Principais</h3>
        <p>[Descreva os gráficos principais: histogramas, boxplots, scatter plots]</p>

        <h3>4.3 Correlações</h3>
        <p>[Lista de correlações significativas encontradas]</p>
    </div>

    <div class="section">
        <h2>5. RESULTADOS</h2>
        <h3>5.1 Análise Principal</h3>
        <div class="formula">
            <p><strong>Teste Estatístico:</strong> [Nome do teste]</p>
            <p><strong>Estatística:</strong> [Valor] (df = [graus de liberdade])</p>
            <p><strong>P-valor:</strong> [Valor] (α = 0.05)</p>
            <p><strong>Intervalo de Confiança:</strong> 95% IC [limite inferior, limite superior]</p>
            <p><strong>Tamanho do Efeito:</strong> [Valor e interpretação]</p>
        </div>

        <h3>5.2 Análises Complementares</h3>
        <p>[Resultados de análises adicionais]</p>

        <h3>5.3 Validação</h3>
        <p><strong>Validação Cruzada:</strong> [Resultados]</p>
        <p><strong>Testes de Robustez:</strong> [Resultados]</p>
    </div>

    <div class="section">
        <h2>6. DISCUSSÃO</h2>
        <h3>6.1 Interpretação dos Resultados</h3>
        <p>[Explique o que os resultados significam em termos práticos e teóricos]</p>

        <h3>6.2 Limitações</h3>
        <ul>
            <li>[Limitação metodológica 1]</li>
            <li>[Limitação dos dados 2]</li>
            <li>[Limitação de generalização 3]</li>
        </ul>

        <h3>6.3 Comparação com Literatura</h3>
        <p>[Compare seus achados com estudos anteriores]</p>
    </div>

    <div class="section">
        <h2>7. CONCLUSÕES</h2>
        <h3>7.1 Principais Descobertas</h3>
        <ol>
            <li>[Descoberta 1 com evidência estatística]</li>
            <li>[Descoberta 2 com evidência estatística]</li>
            <li>[Descoberta 3 com evidência estatística]</li>
        </ol>

        <h3>7.2 Implicações Práticas</h3>
        <p>[Como os resultados podem ser aplicados na prática]</p>

        <h3>7.3 Recomendações</h3>
        <ul>
            <li>[Recomendação prática 1]</li>
            <li>[Recomendação prática 2]</li>
            <li>[Recomendação para pesquisas futuras]</li>
        </ul>
    </div>

    <div class="section">
        <h2>8. REFERÊNCIAS</h2>
        <p>[1] Referência acadêmica 1</p>
        <p>[2] Referência acadêmica 2</p>
        <p>[3] Referência de metodologia estatística</p>
    </div>

    <div class="footer">
        <h2>ANEXOS</h2>
        <p><strong>Anexo A:</strong> Código R/Python completo</p>
        <p><strong>Anexo B:</strong> Tabelas detalhadas</p>
        <p><strong>Anexo C:</strong> Gráficos adicionais</p>
        <p><strong>Anexo D:</strong> Dados brutos (quando permitido)</p>
        
        <hr/>
        <p><strong>Informações Técnicas:</strong></p>
        <p>Software: DataScience Pro | Versão: 2.0 | Analista: [Nome] | Data: ${new Date().toLocaleDateString('pt-BR')}</p>
    </div>
</body>
</html>
`;

    const blob = new Blob([templateDoc], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Template_Relatorio_Cientifico_Profissional.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadChecklistPDF = () => {
    const checklistContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>Checklist de Qualidade Científica</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        .header { background: #3498db; color: white; padding: 20px; text-align: center; margin-bottom: 30px; }
        .section { margin-bottom: 25px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
        .checklist-item { margin: 10px 0; padding: 8px; background: #f8f9fa; border-left: 4px solid #28a745; }
        .priority-high { border-left-color: #dc3545; }
        .priority-medium { border-left-color: #ffc107; }
        .priority-low { border-left-color: #28a745; }
        .checkbox { margin-right: 10px; }
        h2 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px; }
        h3 { color: #34495e; }
        .score-box { background: #e8f5e8; padding: 15px; text-align: center; border-radius: 8px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>📋 CHECKLIST DE QUALIDADE CIENTÍFICA</h1>
        <h2>DataScience Pro - Versão Profissional</h2>
        <p>Garantia de Rigor Metodológico em Análise de Dados</p>
    </div>

    <div class="section">
        <h2>🎯 ANTES DE COMEÇAR</h2>
        <div class="checklist-item priority-high">
            <input type="checkbox" class="checkbox"> <strong>[CRÍTICO]</strong> Objetivos claramente definidos e mensuráveis
        </div>
        <div class="checklist-item priority-high">
            <input type="checkbox" class="checkbox"> <strong>[CRÍTICO]</strong> Hipóteses específicas e testáveis formuladas
        </div>
        <div class="checklist-item priority-medium">
            <input type="checkbox" class="checkbox"> <strong>[IMPORTANTE]</strong> Literatura relevante revisada
        </div>
        <div class="checklist-item priority-medium">
            <input type="checkbox" class="checkbox"> <strong>[IMPORTANTE]</strong> Tamanho de amostra adequado calculado
        </div>
    </div>

    <div class="section">
        <h2>📊 QUALIDADE DOS DADOS</h2>
        <div class="checklist-item priority-high">
            <input type="checkbox" class="checkbox"> <strong>[CRÍTICO]</strong> Dados representativos da população-alvo
        </div>
        <div class="checklist-item priority-high">
            <input type="checkbox" class="checkbox"> <strong>[CRÍTICO]</strong> Dados limpos e inconsistências removidas
        </div>
        <div class="checklist-item priority-medium">
            <input type="checkbox" class="checkbox"> <strong>[IMPORTANTE]</strong> Outliers identificados e tratados apropriadamente
        </div>
        <div class="checklist-item priority-medium">
            <input type="checkbox" class="checkbox"> <strong>[IMPORTANTE]</strong> Dados faltantes tratados adequadamente
        </div>
        <div class="checklist-item priority-low">
            <input type="checkbox" class="checkbox"> <strong>[DESEJÁVEL]</strong> Fonte dos dados documentada e confiável
        </div>
    </div>

    <div class="section">
        <h2>🔬 METODOLOGIA ESTATÍSTICA</h2>
        <div class="checklist-item priority-high">
            <input type="checkbox" class="checkbox"> <strong>[CRÍTICO]</strong> Métodos apropriados para o tipo de dados
        </div>
        <div class="checklist-item priority-high">
            <input type="checkbox" class="checkbox"> <strong>[CRÍTICO]</strong> Pressupostos dos testes verificados
        </div>
        <div class="checklist-item priority-medium">
            <input type="checkbox" class="checkbox"> <strong>[IMPORTANTE]</strong> Nível de significância definido a priori (α = 0.05)
        </div>
        <div class="checklist-item priority-medium">
            <input type="checkbox" class="checkbox"> <strong>[IMPORTANTE]</strong> Poder estatístico adequado (β ≥ 0.80)
        </div>
        <div class="checklist-item priority-low">
            <input type="checkbox" class="checkbox"> <strong>[DESEJÁVEL]</strong> Análises de sensibilidade realizadas
        </div>
    </div>

    <div class="section">
        <h2>📈 ANÁLISE E RESULTADOS</h2>
        <div class="checklist-item priority-high">
            <input type="checkbox" class="checkbox"> <strong>[CRÍTICO]</strong> Análise exploratória completa realizada
        </div>
        <div class="checklist-item priority-high">
            <input type="checkbox" class="checkbox"> <strong>[CRÍTICO]</strong> Tamanhos de efeito reportados (não só p-valores)
        </div>
        <div class="checklist-item priority-medium">
            <input type="checkbox" class="checkbox"> <strong>[IMPORTANTE]</strong> Intervalos de confiança incluídos
        </div>
        <div class="checklist-item priority-medium">
            <input type="checkbox" class="checkbox"> <strong>[IMPORTANTE]</strong> Gráficos informativos e bem legendados
        </div>
        <div class="checklist-item priority-low">
            <input type="checkbox" class="checkbox"> <strong>[DESEJÁVEL]</strong> Validação cruzada realizada
        </div>
    </div>

    <div class="section">
        <h2>📝 INTERPRETAÇÃO E COMUNICAÇÃO</h2>
        <div class="checklist-item priority-high">
            <input type="checkbox" class="checkbox"> <strong>[CRÍTICO]</strong> Resultados interpretados corretamente
        </div>
        <div class="checklist-item priority-high">
            <input type="checkbox" class="checkbox"> <strong>[CRÍTICO]</strong> Limitações claramente identificadas
        </div>
        <div class="checklist-item priority-medium">
            <input type="checkbox" class="checkbox"> <strong>[IMPORTANTE]</strong> Conclusões suportadas pelos dados
        </div>
        <div class="checklist-item priority-medium">
            <input type="checkbox" class="checkbox"> <strong>[IMPORTANTE]</strong> Linguagem clara e acessível
        </div>
        <div class="checklist-item priority-low">
            <input type="checkbox" class="checkbox"> <strong>[DESEJÁVEL]</strong> Implicações práticas discutidas
        </div>
    </div>

    <div class="section">
        <h2>🔄 REPRODUTIBILIDADE</h2>
        <div class="checklist-item priority-high">
            <input type="checkbox" class="checkbox"> <strong>[CRÍTICO]</strong> Código documentado e comentado
        </div>
        <div class="checklist-item priority-medium">
            <input type="checkbox" class="checkbox"> <strong>[IMPORTANTE]</strong> Versões de software documentadas
        </div>
        <div class="checklist-item priority-medium">
            <input type="checkbox" class="checkbox"> <strong>[IMPORTANTE]</strong> Dados disponíveis (quando permitido)
        </div>
        <div class="checklist-item priority-low">
            <input type="checkbox" class="checkbox"> <strong>[DESEJÁVEL]</strong> Análise replicável por terceiros
        </div>
    </div>

    <div class="score-box">
        <h2>📊 PONTUAÇÃO DE QUALIDADE</h2>
        <p><strong>CRÍTICOS:</strong> ___/10 (Obrigatórios para publicação)</p>
        <p><strong>IMPORTANTES:</strong> ___/10 (Fortemente recomendados)</p>
        <p><strong>DESEJÁVEIS:</strong> ___/6 (Aumentam qualidade)</p>
        <h3>SCORE TOTAL: ___/26</h3>
        <p>🏆 23-26: Excelente | 🥈 18-22: Bom | 🥉 15-17: Aceitável | ❌ <15: Precisa melhorar</p>
    </div>

    <div class="section">
        <h2>🚨 PERGUNTAS CRÍTICAS DE AUTOCRÍTICA</h2>
        <ol>
            <li><strong>Os dados são realmente representativos?</strong> [SIM/NÃO/PARCIAL]</li>
            <li><strong>O tamanho da amostra é adequado?</strong> [SIM/NÃO/INCERTO]</li>
            <li><strong>Há vieses na coleta ou análise?</strong> [NÃO/TALVEZ/SIM]</li>
            <li><strong>Os resultados são praticamente significativos?</strong> [SIM/NÃO/INCERTO]</li>
            <li><strong>As conclusões são generalizáveis?</strong> [SIM/LIMITADA/NÃO]</li>
            <li><strong>Um colega chegaria às mesmas conclusões?</strong> [SIM/PROVÁVEL/INCERTO]</li>
        </ol>
    </div>

    <div style="margin-top: 30px; border-top: 2px solid #3498db; padding-top: 20px;">
        <p><strong>📅 Data de Avaliação:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
        <p><strong>🔧 Ferramenta:</strong> DataScience Pro v2.0</p>
        <p><strong>👤 Avaliador:</strong> ________________</p>
        <p><strong>📊 Projeto:</strong> ________________</p>
    </div>
</body>
</html>
`;

    const blob = new Blob([checklistContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Checklist_Qualidade_Cientifica.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadCodigoR = () => {
    const codigoR = `# ===============================================
# TEMPLATE DE CÓDIGO R PARA ANÁLISE CIENTÍFICA
# DataScience Pro - Versão 2.0
# Data: ${new Date().toLocaleDateString('pt-BR')}
# ===============================================

# CONFIGURAÇÃO INICIAL
# =====================
library(tidyverse)    # Manipulação de dados
library(ggplot2)      # Visualizações
library(corrplot)     # Matriz de correlação
library(psych)        # Estatísticas descritivas
library(car)          # Testes de pressupostos
library(broom)        # Tidy outputs
library(plotly)       # Gráficos interativos
library(knitr)        # Relatórios
library(VIM)          # Dados faltantes

# Configurar seed para reprodutibilidade
set.seed(123)

# CARREGAMENTO E PREPARAÇÃO DOS DADOS
# ===================================

# Carregar dados
# dados <- read.csv("seu_arquivo.csv", stringsAsFactors = FALSE)
# dados <- read_excel("seu_arquivo.xlsx")

# Exemplo com dados simulados
dados <- data.frame(
  id = 1:1000,
  variavel_x = rnorm(1000, mean = 50, sd = 10),
  variavel_y = rnorm(1000, mean = 100, sd = 15),
  categoria = sample(c("A", "B", "C"), 1000, replace = TRUE),
  tratamento = sample(c("Controle", "Experimental"), 1000, replace = TRUE)
)

# ANÁLISE EXPLORATÓRIA
# ====================

# 1. Estrutura dos dados
str(dados)
summary(dados)

# 2. Verificar dados faltantes
sapply(dados, function(x) sum(is.na(x)))
VIM::aggr(dados, col = c('navyblue','red'), numbers = TRUE)

# 3. Estatísticas descritivas
descritivas <- dados %>%
  select_if(is.numeric) %>%
  psych::describe()

print(descritivas)

# 4. Visualizações exploratórias
# Histogramas
dados %>%
  select_if(is.numeric) %>%
  gather(key = "variavel", value = "valor") %>%
  ggplot(aes(x = valor)) +
  geom_histogram(bins = 30, fill = "steelblue", alpha = 0.7) +
  facet_wrap(~variavel, scales = "free") +
  theme_minimal() +
  labs(title = "Distribuição das Variáveis Numéricas")

# Boxplots
dados %>%
  select_if(is.numeric) %>%
  gather(key = "variavel", value = "valor") %>%
  ggplot(aes(y = valor)) +
  geom_boxplot(fill = "lightblue", alpha = 0.7) +
  facet_wrap(~variavel, scales = "free") +
  theme_minimal() +
  labs(title = "Boxplots das Variáveis Numéricas")

# 5. Matriz de correlação
cor_matrix <- cor(dados[sapply(dados, is.numeric)], use = "complete.obs")
corrplot(cor_matrix, method = "color", type = "upper", 
         order = "hclust", tl.cex = 0.8, tl.col = "black")

# TESTES DE PRESSUPOSTOS
# ======================

# 1. Teste de normalidade
shapiro_test <- dados %>%
  select_if(is.numeric) %>%
  map_df(~ broom::tidy(shapiro.test(.)), .id = "variavel")

print("Testes de Normalidade (Shapiro-Wilk):")
print(shapiro_test)

# 2. Q-Q Plots
dados %>%
  select_if(is.numeric) %>%
  gather(key = "variavel", value = "valor") %>%
  ggplot(aes(sample = valor)) +
  stat_qq() +
  stat_qq_line(color = "red") +
  facet_wrap(~variavel, scales = "free") +
  theme_minimal() +
  labs(title = "Q-Q Plots para Verificação de Normalidade")

# 3. Teste de homocedasticidade (se aplicável)
# leveneTest(variavel_y ~ categoria, data = dados)

# ANÁLISES ESTATÍSTICAS PRINCIPAIS
# =================================

# 1. Teste t para duas amostras
t_test_result <- t.test(variavel_y ~ tratamento, data = dados)
print("Teste t para duas amostras:")
print(t_test_result)

# Calcular tamanho do efeito (Cohen's d)
cohens_d <- (mean(dados$variavel_y[dados$tratamento == "Experimental"]) - 
             mean(dados$variavel_y[dados$tratamento == "Controle"])) / 
            sqrt(((length(dados$variavel_y[dados$tratamento == "Experimental"]) - 1) * 
                  var(dados$variavel_y[dados$tratamento == "Experimental"]) + 
                  (length(dados$variavel_y[dados$tratamento == "Controle"]) - 1) * 
                  var(dados$variavel_y[dados$tratamento == "Controle"])) / 
                 (length(dados$variavel_y) - 2))

print(paste("Cohen's d:", round(cohens_d, 3)))

# 2. ANOVA (se mais de 2 grupos)
anova_result <- aov(variavel_y ~ categoria, data = dados)
summary(anova_result)

# Testes post-hoc
TukeyHSD(anova_result)

# 3. Regressão linear
modelo_linear <- lm(variavel_y ~ variavel_x + categoria, data = dados)
summary(modelo_linear)

# Diagnósticos do modelo
par(mfrow = c(2, 2))
plot(modelo_linear)
par(mfrow = c(1, 1))

# 4. Verificar multicolinearidade
vif_values <- car::vif(modelo_linear)
print("Fatores de Inflação da Variância (VIF):")
print(vif_values)

# VISUALIZAÇÕES DOS RESULTADOS
# =============================

# 1. Gráfico de barras com erro padrão
dados_summary <- dados %>%
  group_by(tratamento) %>%
  summarise(
    media = mean(variavel_y),
    se = sd(variavel_y) / sqrt(n()),
    .groups = 'drop'
  )

ggplot(dados_summary, aes(x = tratamento, y = media, fill = tratamento)) +
  geom_col(alpha = 0.7) +
  geom_errorbar(aes(ymin = media - se, ymax = media + se), 
                width = 0.2, color = "black") +
  theme_minimal() +
  labs(title = "Média da Variável Y por Tratamento",
       y = "Média da Variável Y",
       x = "Grupo de Tratamento") +
  theme(legend.position = "none")

# 2. Scatter plot com linha de regressão
ggplot(dados, aes(x = variavel_x, y = variavel_y)) +
  geom_point(alpha = 0.6, color = "steelblue") +
  geom_smooth(method = "lm", color = "red", se = TRUE) +
  theme_minimal() +
  labs(title = "Relação entre Variável X e Y",
       x = "Variável X",
       y = "Variável Y") +
  annotate("text", x = Inf, y = Inf, 
           label = paste("R² =", round(summary(modelo_linear)$r.squared, 3)),
           hjust = 1.1, vjust = 1.1)

# VALIDAÇÃO DO MODELO
# ===================

# Divisão treino/teste
set.seed(123)
indices_treino <- sample(nrow(dados), 0.7 * nrow(dados))
dados_treino <- dados[indices_treino, ]
dados_teste <- dados[-indices_treino, ]

# Modelo no conjunto de treino
modelo_treino <- lm(variavel_y ~ variavel_x + categoria, data = dados_treino)

# Predições no conjunto de teste
predicoes <- predict(modelo_treino, dados_teste)

# Métricas de avaliação
rmse <- sqrt(mean((dados_teste$variavel_y - predicoes)^2))
mae <- mean(abs(dados_teste$variavel_y - predicoes))
r2_teste <- cor(dados_teste$variavel_y, predicoes)^2

print("Métricas de Validação:")
print(paste("RMSE:", round(rmse, 3)))
print(paste("MAE:", round(mae, 3)))
print(paste("R² no teste:", round(r2_teste, 3)))

# RELATÓRIO RESUMIDO
# ==================

cat("\\n=== RESUMO DA ANÁLISE ===\\n")
cat("Data da análise:", Sys.Date(), "\\n")
cat("Tamanho da amostra:", nrow(dados), "\\n")
cat("Variáveis analisadas:", ncol(dados), "\\n\\n")

cat("PRINCIPAIS RESULTADOS:\\n")
cat("- Teste t p-valor:", format.pval(t_test_result$p.value), "\\n")
cat("- Cohen's d:", round(cohens_d, 3), "\\n")
cat("- R² do modelo:", round(summary(modelo_linear)$r.squared, 3), "\\n")
cat("- RMSE validação:", round(rmse, 3), "\\n")

# SALVAR RESULTADOS
# =================

# Salvar gráficos
ggsave("distribuicoes.png", width = 12, height = 8, dpi = 300)
ggsave("correlacoes.png", width = 10, height = 8, dpi = 300)

# Salvar tabelas
write.csv(descritivas, "estatisticas_descritivas.csv", row.names = TRUE)
write.csv(broom::tidy(modelo_linear), "resultados_regressao.csv", row.names = FALSE)

# Salvar workspace
save.image("analise_completa.RData")

cat("\\n✅ Análise concluída! Arquivos salvos.\\n")
`;

    const blob = new Blob([codigoR], { type: 'text/plain; charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Template_Analise_Cientifica.R';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadCodigoPython = () => {
    const codigoPython = `"""
===============================================
TEMPLATE DE CÓDIGO PYTHON PARA ANÁLISE CIENTÍFICA
DataScience Pro - Versão 2.0
Data: ${new Date().toLocaleDateString('pt-BR')}
===============================================
"""

# IMPORTS NECESSÁRIOS
# ===================
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import scipy.stats as stats
from scipy.stats import shapiro, levene, ttest_ind, f_oneway
import statsmodels.api as sm
from statsmodels.stats.multicomp import pairwise_tukeyhsd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from sklearn.preprocessing import StandardScaler
import warnings
warnings.filterwarnings('ignore')

# Configurar seed para reprodutibilidade
np.random.seed(123)

# CONFIGURAÇÃO DE VISUALIZAÇÕES
# =============================
plt.style.use('seaborn-v0_8')
sns.set_palette("husl")

# CRIAÇÃO/CARREGAMENTO DOS DADOS
# ==============================

# Carregar dados
# dados = pd.read_csv('seu_arquivo.csv')
# dados = pd.read_excel('seu_arquivo.xlsx')

# Exemplo com dados simulados
n = 1000
dados = pd.DataFrame({
    'id': range(1, n+1),
    'variavel_x': np.random.normal(50, 10, n),
    'variavel_y': np.random.normal(100, 15, n),
    'categoria': np.random.choice(['A', 'B', 'C'], n),
    'tratamento': np.random.choice(['Controle', 'Experimental'], n)
})

print("📊 ESTRUTURA DOS DADOS")
print("=" * 50)
print(f"Shape: {dados.shape}")
print(f"\\nTipos de dados:")
print(dados.dtypes)
print(f"\\nPrimeiras 5 linhas:")
print(dados.head())

# ANÁLISE EXPLORATÓRIA
# ====================

print("\\n📈 ANÁLISE EXPLORATÓRIA")
print("=" * 50)

# 1. Dados faltantes
print("Dados faltantes por coluna:")
print(dados.isnull().sum())

# 2. Estatísticas descritivas
print("\\nEstatísticas descritivas:")
descritivas = dados.describe()
print(descritivas)

# 3. Visualizações exploratórias
fig, axes = plt.subplots(2, 2, figsize=(15, 10))
fig.suptitle('Análise Exploratória dos Dados', fontsize=16)

# Histogramas
dados[['variavel_x', 'variavel_y']].hist(bins=30, ax=axes[0])
axes[0, 0].set_title('Distribuição da Variável X')
axes[0, 1].set_title('Distribuição da Variável Y')

# Boxplots
sns.boxplot(data=dados, x='categoria', y='variavel_y', ax=axes[1, 0])
axes[1, 0].set_title('Variável Y por Categoria')

# Scatter plot
axes[1, 1].scatter(dados['variavel_x'], dados['variavel_y'], alpha=0.6)
axes[1, 1].set_xlabel('Variável X')
axes[1, 1].set_ylabel('Variável Y')
axes[1, 1].set_title('Relação X vs Y')

plt.tight_layout()
plt.savefig('analise_exploratoria.png', dpi=300, bbox_inches='tight')
plt.show()

# 4. Matriz de correlação
correlacao = dados.select_dtypes(include=[np.number]).corr()
plt.figure(figsize=(10, 8))
sns.heatmap(correlacao, annot=True, cmap='coolwarm', center=0,
            square=True, linewidths=0.5)
plt.title('Matriz de Correlação')
plt.savefig('matriz_correlacao.png', dpi=300, bbox_inches='tight')
plt.show()

# TESTES DE PRESSUPOSTOS
# ======================

print("\\n🔬 TESTES DE PRESSUPOSTOS")
print("=" * 50)

# 1. Teste de normalidade
def teste_normalidade(dados_col, nome_var):
    estatistica, p_valor = shapiro(dados_col)
    print(f"{nome_var}:")
    print(f"  Estatística: {estatistica:.4f}")
    print(f"  P-valor: {p_valor:.6f}")
    print(f"  Interpretação: {'Normal' if p_valor > 0.05 else 'Não-normal'}")
    return p_valor > 0.05

print("Testes de Normalidade (Shapiro-Wilk):")
normalidade_x = teste_normalidade(dados['variavel_x'], 'Variável X')
normalidade_y = teste_normalidade(dados['variavel_y'], 'Variável Y')

# 2. Q-Q Plots
fig, axes = plt.subplots(1, 2, figsize=(12, 5))
stats.probplot(dados['variavel_x'], dist="norm", plot=axes[0])
axes[0].set_title('Q-Q Plot - Variável X')
stats.probplot(dados['variavel_y'], dist="norm", plot=axes[1])
axes[1].set_title('Q-Q Plot - Variável Y')
plt.tight_layout()
plt.savefig('qq_plots.png', dpi=300, bbox_inches='tight')
plt.show()

# 3. Teste de homocedasticidade
grupos = [dados[dados['categoria'] == cat]['variavel_y'] for cat in dados['categoria'].unique()]
estatistica_levene, p_valor_levene = levene(*grupos)
print(f"\\nTeste de Levene (Homocedasticidade):")
print(f"  Estatística: {estatistica_levene:.4f}")
print(f"  P-valor: {p_valor_levene:.6f}")
print(f"  Interpretação: {'Variâncias iguais' if p_valor_levene > 0.05 else 'Variâncias diferentes'}")

# ANÁLISES ESTATÍSTICAS PRINCIPAIS
# =================================

print("\\n📊 ANÁLISES ESTATÍSTICAS")
print("=" * 50)

# 1. Teste t para duas amostras independentes
grupo_controle = dados[dados['tratamento'] == 'Controle']['variavel_y']
grupo_experimental = dados[dados['tratamento'] == 'Experimental']['variavel_y']

t_stat, p_valor_t = ttest_ind(grupo_controle, grupo_experimental)
print(f"Teste t para duas amostras:")
print(f"  Estatística t: {t_stat:.4f}")
print(f"  P-valor: {p_valor_t:.6f}")
print(f"  Interpretação: {'Diferença significativa' if p_valor_t < 0.05 else 'Sem diferença significativa'}")

# Tamanho do efeito (Cohen's d)
cohens_d = (grupo_experimental.mean() - grupo_controle.mean()) / np.sqrt(((len(grupo_experimental)-1)*grupo_experimental.var() + (len(grupo_controle)-1)*grupo_controle.var()) / (len(grupo_experimental) + len(grupo_controle) - 2))
print(f"  Cohen's d: {cohens_d:.4f}")
efeito = 'pequeno' if abs(cohens_d) < 0.5 else 'médio' if abs(cohens_d) < 0.8 else 'grande'
print(f"  Tamanho do efeito: {efeito}")

# 2. ANOVA (para mais de 2 grupos)
grupos_categoria = [dados[dados['categoria'] == cat]['variavel_y'] for cat in dados['categoria'].unique()]
f_stat, p_valor_anova = f_oneway(*grupos_categoria)
print(f"\\nANOVA:")
print(f"  Estatística F: {f_stat:.4f}")
print(f"  P-valor: {p_valor_anova:.6f}")
print(f"  Interpretação: {'Diferença entre grupos' if p_valor_anova < 0.05 else 'Sem diferença entre grupos'}")

# Teste post-hoc (Tukey)
if p_valor_anova < 0.05:
    tukey_result = pairwise_tukeyhsd(dados['variavel_y'], dados['categoria'])
    print(f"\\nTeste post-hoc (Tukey):")
    print(tukey_result)

# 3. Regressão Linear
X = dados[['variavel_x']]
y = dados['variavel_y']

# Adicionar constante para intercepto
X_const = sm.add_constant(X)
modelo = sm.OLS(y, X_const).fit()

print(f"\\nRegressão Linear:")
print(modelo.summary())

# VISUALIZAÇÕES DOS RESULTADOS
# =============================

print("\\n📈 GERANDO VISUALIZAÇÕES")
print("=" * 50)

# 1. Comparação entre grupos
plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
sns.barplot(data=dados, x='tratamento', y='variavel_y', 
           capsize=0.1, errwidth=2, alpha=0.8)
plt.title('Média da Variável Y por Tratamento')
plt.ylabel('Variável Y')

plt.subplot(1, 2, 2)
sns.boxplot(data=dados, x='categoria', y='variavel_y')
plt.title('Distribuição da Variável Y por Categoria')
plt.ylabel('Variável Y')

plt.tight_layout()
plt.savefig('comparacao_grupos.png', dpi=300, bbox_inches='tight')
plt.show()

# 2. Regressão
plt.figure(figsize=(10, 6))
plt.scatter(dados['variavel_x'], dados['variavel_y'], alpha=0.6, label='Dados')
x_range = np.linspace(dados['variavel_x'].min(), dados['variavel_x'].max(), 100)
y_pred = modelo.params[0] + modelo.params[1] * x_range
plt.plot(x_range, y_pred, 'r-', linewidth=2, label=f'Regressão (R² = {modelo.rsquared:.3f})')
plt.xlabel('Variável X')
plt.ylabel('Variável Y')
plt.title('Regressão Linear: Y = f(X)')
plt.legend()
plt.grid(True, alpha=0.3)
plt.savefig('regressao_linear.png', dpi=300, bbox_inches='tight')
plt.show()

# VALIDAÇÃO DO MODELO
# ===================

print("\\n✅ VALIDAÇÃO DO MODELO")
print("=" * 50)

# Divisão treino/teste
X_treino, X_teste, y_treino, y_teste = train_test_split(
    X, y, test_size=0.3, random_state=123
)

# Modelo scikit-learn para validação
modelo_sklearn = LinearRegression()
modelo_sklearn.fit(X_treino, y_treino)

# Predições
y_pred_treino = modelo_sklearn.predict(X_treino)
y_pred_teste = modelo_sklearn.predict(X_teste)

# Métricas
rmse_treino = np.sqrt(mean_squared_error(y_treino, y_pred_treino))
rmse_teste = np.sqrt(mean_squared_error(y_teste, y_pred_teste))
mae_teste = mean_absolute_error(y_teste, y_pred_teste)
r2_teste = r2_score(y_teste, y_pred_teste)

print(f"Métricas de Validação:")
print(f"  RMSE Treino: {rmse_treino:.3f}")
print(f"  RMSE Teste: {rmse_teste:.3f}")
print(f"  MAE Teste: {mae_teste:.3f}")
print(f"  R² Teste: {r2_teste:.3f}")

# Validação cruzada
cv_scores = cross_val_score(modelo_sklearn, X, y, cv=5, 
                           scoring='neg_mean_squared_error')
rmse_cv = np.sqrt(-cv_scores)
print(f"  RMSE CV (5-fold): {rmse_cv.mean():.3f} ± {rmse_cv.std():.3f}")

# RELATÓRIO FINAL
# ===============

print("\\n" + "="*60)
print("📋 RESUMO EXECUTIVO DA ANÁLISE")
print("="*60)

print(f"📅 Data da análise: {pd.Timestamp.now().strftime('%d/%m/%Y %H:%M')}")
print(f"📊 Tamanho da amostra: {len(dados):,} observações")
print(f"🔢 Variáveis analisadas: {dados.shape[1]} variáveis")

print(f"\\n🔍 PRINCIPAIS RESULTADOS:")
print(f"   • Teste t p-valor: {p_valor_t:.6f}")
print(f"   • Cohen's d: {cohens_d:.3f} (efeito {efeito})")
print(f"   • ANOVA p-valor: {p_valor_anova:.6f}")
print(f"   • R² regressão: {modelo.rsquared:.3f}")
print(f"   • RMSE validação: {rmse_teste:.3f}")

print(f"\\n📊 INTERPRETAÇÃO:")
if p_valor_t < 0.05:
    print(f"   ✅ Encontrada diferença significativa entre tratamentos")
else:
    print(f"   ❌ Não há evidência de diferença entre tratamentos")

if modelo.rsquared > 0.5:
    print(f"   ✅ Modelo de regressão com boa capacidade explicativa")
else:
    print(f"   ⚠️  Modelo de regressão com baixa capacidade explicativa")

# SALVAR RESULTADOS
# =================

print(f"\\n💾 SALVANDO RESULTADOS...")

# Salvar estatísticas descritivas
descritivas.to_csv('estatisticas_descritivas.csv')

# Salvar resultados da regressão
resultados_regressao = pd.DataFrame({
    'parametro': ['intercepto', 'variavel_x'],
    'coeficiente': modelo.params,
    'erro_padrao': modelo.bse,
    'p_valor': modelo.pvalues
})
resultados_regressao.to_csv('resultados_regressao.csv', index=False)

# Salvar métricas de validação
metricas = pd.DataFrame({
    'metrica': ['RMSE_treino', 'RMSE_teste', 'MAE_teste', 'R2_teste', 'RMSE_CV_media'],
    'valor': [rmse_treino, rmse_teste, mae_teste, r2_teste, rmse_cv.mean()]
})
metricas.to_csv('metricas_validacao.csv', index=False)

print(f"✅ Análise concluída! Arquivos salvos:")
print(f"   📁 estatisticas_descritivas.csv")
print(f"   📁 resultados_regressao.csv") 
print(f"   📁 metricas_validacao.csv")
print(f"   🖼️  analise_exploratoria.png")
print(f"   🖼️  matriz_correlacao.png")
print(f"   🖼️  comparacao_grupos.png")
print(f"   🖼️  regressao_linear.png")

print(f"\\n🎯 PRÓXIMOS PASSOS SUGERIDOS:")
print(f"   1. Verificar pressupostos adicionais se necessário")
print(f"   2. Considerar transformações de dados se apropriado")
print(f"   3. Explorar modelos mais complexos se R² baixo")
print(f"   4. Validar resultados com dados independentes")
print(f"   5. Documentar limitações e interpretações")
`;

    const blob = new Blob([codigoPython], { type: 'text/plain; charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Template_Analise_Cientifica.py';
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
                  📊 Relatório Científico HTML
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Template profissional em HTML com formatação acadêmica. Pode ser aberto no Word ou navegador.
                </Typography>
                
                <List dense>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Formatação profissional pronta" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Tabelas e fórmulas estilizadas" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Seções metodológicas completas" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Compatível com Word/Google Docs" />
                  </ListItem>
                </List>

                <Button
                  variant="contained"
                  startIcon={<Download />}
                  fullWidth
                  onClick={downloadTemplateWord}
                  sx={{ mt: 2 }}
                >
                  Download Template HTML
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🎯 Checklist Interativo
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Checklist completo com sistema de pontuação para garantir qualidade científica.
                </Typography>
                
                <List dense>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Sistema de pontuação integrado" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Categorias por prioridade" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Perguntas de autocrítica" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Versão impressa disponível" />
                  </ListItem>
                </List>

                <Button
                  variant="contained"
                  startIcon={<Download />}
                  fullWidth
                  onClick={downloadChecklistPDF}
                  sx={{ mt: 2 }}
                  color="secondary"
                >
                  Download Checklist
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  💻 Código R Completo
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Script R completo com análise exploratória, testes e validação seguindo boas práticas.
                </Typography>
                
                <List dense>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Análise exploratória automatizada" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Testes de pressupostos" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Validação cruzada" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Relatório automático" />
                  </ListItem>
                </List>

                <Button
                  variant="contained"
                  startIcon={<Download />}
                  fullWidth
                  onClick={downloadCodigoR}
                  sx={{ mt: 2 }}
                  color="info"
                >
                  Download Código R
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🐍 Código Python Completo
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Script Python científico com pandas, scipy, sklearn e visualizações profissionais.
                </Typography>
                
                <List dense>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Bibliotecas científicas modernas" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Visualizações com seaborn/matplotlib" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Machine Learning integrado" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Métricas e validação" />
                  </ListItem>
                </List>

                <Button
                  variant="contained"
                  startIcon={<Download />}
                  fullWidth
                  onClick={downloadCodigoPython}
                  sx={{ mt: 2 }}
                  color="warning"
                >
                  Download Código Python
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  📚 Template Markdown (Original)
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Versão simples em formato Markdown para usuários avançados.
                </Typography>

                <Button
                  variant="outlined"
                  startIcon={<Download />}
                  onClick={downloadRelatorioTemplateDetalhado}
                  sx={{ mr: 2, mb: 1 }}
                >
                  Download Template .MD
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<Download />}
                  onClick={downloadGuiaCompleto}
                  sx={{ mb: 1 }}
                >
                  Download Guia Completo .MD
                </Button>
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
