import React, { useState, useCallback, useRef } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Button, Stepper, Step,
  StepLabel, StepContent, Paper, Alert, Accordion, AccordionSummary,
  AccordionDetails, TextField, FormControl, InputLabel, Select,
  MenuItem, Tabs, Tab, Dialog, DialogTitle, DialogContent,
  DialogActions, List, ListItem, ListItemText, Chip, Stack,
  LinearProgress, CircularProgress, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton, Tooltip,
  FormControlLabel, Switch, Divider
} from '@mui/material';
import {
  ExpandMore, PlayArrow, Download, Assessment, Code, Science,
  TrendingUp, Analytics, Info, Warning, CheckCircle, Error,
  Description, PictureAsPdf, TableChart, BarChart, Timeline,
  Lightbulb, School, Psychology, Quiz
} from '@mui/icons-material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface AnalysisTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  estimatedTime: string;
  steps: AnalysisStep[];
  requirements: string[];
  learningObjectives: string[];
  scientificMethod: string[];
}

interface AnalysisStep {
  id: number;
  title: string;
  type: 'teoria' | 'pratica' | 'interpretacao' | 'validacao';
  description: string;
  theory: string;
  code: string;
  explanation: string;
  expectedOutput: string;
  commonErrors: string[];
  tips: string[];
  validation: string;
}

interface AnalysisResult {
  stepId: number;
  success: boolean;
  output: any;
  errors: string[];
  executionTime: number;
  memoryUsage?: number;
}

const ScientificAnalysisWorkbench: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<AnalysisTemplate | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showValidation, setShowValidation] = useState(true);
  const [reportData, setReportData] = useState<any>({});
  const reportRef = useRef<HTMLDivElement>(null);

  // Templates de análise científica
  const analysisTemplates: AnalysisTemplate[] = [
    {
      id: 'descriptive_analysis',
      name: 'Análise Estatística Descritiva Completa',
      description: 'Tutorial completo de análise descritiva: medidas de tendência central, dispersão, distribuição e visualização',
      category: 'Estatística Básica',
      difficulty: 'Iniciante',
      estimatedTime: '45-60 minutos',
      requirements: [
        'Conhecimento básico de matemática',
        'Familiaridade com conceitos de média e mediana',
        'Dataset com variáveis numéricas'
      ],
      learningObjectives: [
        'Compreender medidas de tendência central',
        'Calcular e interpretar medidas de dispersão',
        'Identificar padrões de distribuição',
        'Criar visualizações interpretativas',
        'Redigir conclusões baseadas em evidências'
      ],
      scientificMethod: [
        'Formulação de hipóteses sobre os dados',
        'Coleta e verificação da qualidade dos dados',
        'Aplicação de métodos estatísticos apropriados',
        'Interpretação crítica dos resultados',
        'Validação das conclusões'
      ],
      steps: [
        {
          id: 1,
          title: 'Fundamentação Teórica',
          type: 'teoria',
          description: 'Vamos entender os conceitos fundamentais da estatística descritiva antes de aplicá-los',
          theory: `
## Estatística Descritiva: Fundamentos Científicos

### 1. Medidas de Tendência Central
- **Média Aritmética (μ)**: Σx/n - Representa o valor central dos dados
- **Mediana**: Valor que divide os dados ao meio quando ordenados
- **Moda**: Valor que aparece com maior frequência

### 2. Medidas de Dispersão
- **Desvio Padrão (σ)**: √(Σ(x-μ)²/n) - Mede a variabilidade dos dados
- **Variância (σ²)**: Quadrado do desvio padrão
- **Coeficiente de Variação**: σ/μ × 100 - Dispersão relativa

### 3. Medidas de Posição
- **Quartis**: Dividem os dados em 4 partes iguais
- **Percentis**: Dividem os dados em 100 partes iguais
- **Amplitude Interquartílica (IQR)**: Q3 - Q1

### 4. Distribuição dos Dados
- **Assimetria**: Medida de simetria da distribuição
- **Curtose**: Medida do achatamento da distribuição
          `,
          code: `
// Implementação das medidas estatísticas fundamentais
class StatisticalAnalysis {
  constructor(data) {
    this.data = data.filter(x => !isNaN(x) && x !== null);
    this.n = this.data.length;
    this.sortedData = [...this.data].sort((a, b) => a - b);
  }
  
  // Medidas de tendência central
  mean() {
    return this.data.reduce((sum, x) => sum + x, 0) / this.n;
  }
  
  median() {
    const mid = Math.floor(this.n / 2);
    return this.n % 2 === 0 
      ? (this.sortedData[mid - 1] + this.sortedData[mid]) / 2
      : this.sortedData[mid];
  }
  
  mode() {
    const freq = {};
    this.data.forEach(x => freq[x] = (freq[x] || 0) + 1);
    const maxFreq = Math.max(...Object.values(freq));
    return Object.keys(freq).filter(x => freq[x] === maxFreq).map(Number);
  }
  
  // Medidas de dispersão
  variance() {
    const mean = this.mean();
    return this.data.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / this.n;
  }
  
  standardDeviation() {
    return Math.sqrt(this.variance());
  }
  
  coefficientOfVariation() {
    return (this.standardDeviation() / this.mean()) * 100;
  }
}

// Exemplo de uso
const data = [23, 25, 28, 29, 30, 32, 35, 36, 38, 40];
const analysis = new StatisticalAnalysis(data);

console.log('Resultados da Análise Descritiva:');
console.log('Média:', analysis.mean().toFixed(2));
console.log('Mediana:', analysis.median());
console.log('Desvio Padrão:', analysis.standardDeviation().toFixed(2));
          `,
          explanation: 'Este código implementa as fórmulas matemáticas das medidas estatísticas. A classe StatisticalAnalysis encapsula todos os métodos necessários para uma análise descritiva completa.',
          expectedOutput: 'Média: 31.60, Mediana: 31.00, Desvio Padrão: 5.64',
          commonErrors: [
            'Não filtrar valores nulos ou inválidos',
            'Confundir desvio padrão populacional com amostral',
            'Não ordenar os dados antes de calcular a mediana'
          ],
          tips: [
            'Sempre verifique a qualidade dos dados antes de calcular',
            'Use toFixed() para controlar casas decimais',
            'Implemente validações para evitar divisão por zero'
          ],
          validation: 'Compare os resultados com ferramentas conhecidas (Excel, R, Python) usando os mesmos dados'
        },
        {
          id: 2,
          title: 'Implementação Prática e Coleta de Dados',
          type: 'pratica',
          description: 'Agora vamos implementar a análise com dados reais e coletar as estatísticas',
          theory: `
## Boas Práticas na Análise de Dados

### 1. Verificação da Qualidade dos Dados
- Identificar valores ausentes (missing values)
- Detectar outliers usando métodos estatísticos
- Verificar a consistência dos tipos de dados
- Avaliar a representatividade da amostra

### 2. Tratamento de Outliers
- **Método IQR**: Valores fora de Q1 - 1.5×IQR ou Q3 + 1.5×IQR
- **Método Z-Score**: |z| > 3 indica outlier potencial
- **Análise Visual**: Box plots e scatter plots para identificação

### 3. Interpretação Contextual
- Considerar o domínio do problema
- Avaliar a significância prática vs. estatística
- Documentar limitações e premissas
          `,
          code: `
// Análise completa com validação e tratamento de outliers
class ComprehensiveAnalysis extends StatisticalAnalysis {
  constructor(data, context = {}) {
    super(data);
    this.context = context;
    this.outliers = this.detectOutliers();
    this.cleanData = this.removeOutliers();
  }
  
  // Detecção de outliers pelo método IQR
  detectOutliers() {
    const q1 = this.percentile(25);
    const q3 = this.percentile(75);
    const iqr = q3 - q1;
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;
    
    return this.data.filter(x => x < lowerBound || x > upperBound);
  }
  
  percentile(p) {
    const index = (p / 100) * (this.n - 1);
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    const weight = index % 1;
    
    return this.sortedData[lower] * (1 - weight) + this.sortedData[upper] * weight;
  }
  
  // Relatório completo de qualidade dos dados
  dataQualityReport() {
    return {
      totalRecords: this.data.length,
      outliers: this.outliers,
      outliersPercentage: (this.outliers.length / this.data.length * 100).toFixed(2),
      range: {
        min: Math.min(...this.data),
        max: Math.max(...this.data)
      },
      quartiles: {
        q1: this.percentile(25),
        q2: this.median(),
        q3: this.percentile(75)
      }
    };
  }
  
  // Interpretação automatizada
  interpretResults() {
    const mean = this.mean();
    const median = this.median();
    const std = this.standardDeviation();
    const cv = this.coefficientOfVariation();
    
    const interpretations = [];
    
    // Assimetria
    if (Math.abs(mean - median) > std * 0.5) {
      interpretations.push(
        mean > median 
          ? 'Distribuição com assimetria positiva (cauda à direita)'
          : 'Distribuição com assimetria negativa (cauda à esquerda)'
      );
    } else {
      interpretations.push('Distribuição aproximadamente simétrica');
    }
    
    // Variabilidade
    if (cv < 15) {
      interpretations.push('Baixa variabilidade dos dados (CV < 15%)');
    } else if (cv > 30) {
      interpretations.push('Alta variabilidade dos dados (CV > 30%)');
    } else {
      interpretations.push('Variabilidade moderada dos dados');
    }
    
    return interpretations;
  }
}

// Execução da análise
const educationData = [5.2, 5.8, 6.1, 6.3, 5.9, 7.2, 4.8, 5.5, 6.7, 5.1, 8.9, 6.0];
const analysis = new ComprehensiveAnalysis(educationData, { 
  variable: 'IDEB', 
  unit: 'Índice (0-10)' 
});

const results = {
  quality: analysis.dataQualityReport(),
  statistics: {
    mean: analysis.mean().toFixed(2),
    median: analysis.median().toFixed(2),
    std: analysis.standardDeviation().toFixed(2),
    cv: analysis.coefficientOfVariation().toFixed(2)
  },
  interpretations: analysis.interpretResults()
};

console.log('Relatório de Análise:', JSON.stringify(results, null, 2));
          `,
          explanation: 'Esta implementação adiciona validação de qualidade e interpretação automática. O método IQR é padrão para detecção de outliers, e as interpretações ajudam na compreensão dos resultados.',
          expectedOutput: 'Relatório completo com estatísticas, outliers detectados e interpretações automáticas',
          commonErrors: [
            'Não considerar o contexto ao interpretar outliers',
            'Remover outliers sem justificativa científica',
            'Ignorar a assimetria da distribuição'
          ],
          tips: [
            'Outliers podem ser dados válidos ou erros - investigue sempre',
            'Use visualizações para confirmar a interpretação',
            'Documente todas as decisões de tratamento de dados'
          ],
          validation: 'Confirme outliers visualmente com box plots e verifique se fazem sentido no contexto'
        },
        {
          id: 3,
          title: 'Visualização e Comunicação dos Resultados',
          type: 'interpretacao',
          description: 'Criamos visualizações eficazes e comunicamos os resultados de forma clara e científica',
          theory: `
## Princípios de Visualização Científica

### 1. Escolha do Gráfico Apropriado
- **Histograma**: Distribuição de frequências
- **Box Plot**: Medidas de posição e outliers
- **Scatter Plot**: Relações entre variáveis
- **Bar Chart**: Comparações entre categorias

### 2. Elementos Essenciais
- Título descritivo e informativo
- Eixos claramente rotulados com unidades
- Legenda quando necessário
- Fonte dos dados
- Notas metodológicas

### 3. Interpretação Visual
- Identificar padrões e tendências
- Reconhecer anomalias e outliers
- Avaliar a distribuição dos dados
- Comunicar insights de forma clara
          `,
          code: `
// Sistema de visualização e relatório automático
class VisualizationEngine {
  constructor(analysis, context) {
    this.analysis = analysis;
    this.context = context;
  }
  
  generateHistogramData(bins = 10) {
    const min = Math.min(...this.analysis.data);
    const max = Math.max(...this.analysis.data);
    const binWidth = (max - min) / bins;
    
    const histogram = Array(bins).fill(0).map((_, i) => ({
      range: \`\${(min + i * binWidth).toFixed(1)}-\${(min + (i + 1) * binWidth).toFixed(1)}\`,
      count: 0,
      midpoint: min + (i + 0.5) * binWidth
    }));
    
    this.analysis.data.forEach(value => {
      const binIndex = Math.min(Math.floor((value - min) / binWidth), bins - 1);
      histogram[binIndex].count++;
    });
    
    return histogram;
  }
  
  generateBoxPlotData() {
    const q1 = this.analysis.percentile(25);
    const median = this.analysis.median();
    const q3 = this.analysis.percentile(75);
    const iqr = q3 - q1;
    
    return {
      q1,
      median,
      q3,
      lowerWhisker: Math.max(Math.min(...this.analysis.data), q1 - 1.5 * iqr),
      upperWhisker: Math.min(Math.max(...this.analysis.data), q3 + 1.5 * iqr),
      outliers: this.analysis.outliers
    };
  }
  
  generateSummaryReport() {
    const stats = {
      mean: this.analysis.mean(),
      median: this.analysis.median(),
      std: this.analysis.standardDeviation(),
      cv: this.analysis.coefficientOfVariation()
    };
    
    return {
      title: \`Análise Estatística Descritiva - \${this.context.variable || 'Variável'}\`,
      metadata: {
        dataPoints: this.analysis.n,
        analysisDate: new Date().toLocaleDateString('pt-BR'),
        outliers: this.analysis.outliers.length
      },
      statistics: stats,
      interpretation: {
        centralTendency: \`A \${this.context.variable} apresenta média de \${stats.mean.toFixed(2)} e mediana de \${stats.median.toFixed(2)}\`,
        variability: \`O coeficiente de variação de \${stats.cv.toFixed(1)}% indica \${stats.cv < 15 ? 'baixa' : stats.cv > 30 ? 'alta' : 'moderada'} variabilidade\`,
        distribution: stats.mean > stats.median ? 'assimétrica positiva' : stats.mean < stats.median ? 'assimétrica negativa' : 'aproximadamente simétrica'
      },
      recommendations: this.generateRecommendations(stats)
    };
  }
  
  generateRecommendations(stats) {
    const recommendations = [];
    
    if (this.analysis.outliers.length > 0) {
      recommendations.push(\`Investigar \${this.analysis.outliers.length} valor(es) outlier(s) identificado(s)\`);
    }
    
    if (stats.cv > 30) {
      recommendations.push('Considerar estratificação dos dados devido à alta variabilidade');
    }
    
    if (this.analysis.n < 30) {
      recommendations.push('Aumentar o tamanho da amostra para maior robustez estatística');
    }
    
    return recommendations;
  }
}

// Geração do relatório
const visualEngine = new VisualizationEngine(analysis, { variable: 'IDEB' });
const report = visualEngine.generateSummaryReport();
const histogramData = visualEngine.generateHistogramData();
const boxPlotData = visualEngine.generateBoxPlotData();

console.log('Relatório Final:', JSON.stringify(report, null, 2));
console.log('Dados do Histograma:', histogramData);
console.log('Dados do Box Plot:', boxPlotData);
          `,
          explanation: 'Este código gera visualizações e relatórios automáticos. O sistema cria interpretações baseadas em critérios estatísticos estabelecidos e gera recomendações práticas.',
          expectedOutput: 'Relatório estruturado com interpretações, recomendações e dados para visualização',
          commonErrors: [
            'Não contextualizar as interpretações',
            'Usar visualizações inadequadas para o tipo de dados',
            'Omitir informações metodológicas importantes'
          ],
          tips: [
            'Sempre inclua contexto nas interpretações',
            'Use múltiplas visualizações para confirmar padrões',
            'Documente limitações e premissas da análise'
          ],
          validation: 'Verifique se as interpretações são consistentes com a teoria estatística e o contexto do problema'
        }
      ]
    },
    {
      id: 'correlation_analysis',
      name: 'Análise de Correlação e Regressão Linear',
      description: 'Estudo aprofundado de relações entre variáveis: correlação, regressão linear simples e múltipla',
      category: 'Estatística Inferencial',
      difficulty: 'Intermediário',
      estimatedTime: '60-90 minutos',
      requirements: [
        'Conhecimento de estatística descritiva',
        'Conceitos básicos de álgebra linear',
        'Datasets com pelo menos duas variáveis numéricas'
      ],
      learningObjectives: [
        'Calcular e interpretar coeficientes de correlação',
        'Construir modelos de regressão linear',
        'Avaliar a qualidade do ajuste (R²)',
        'Interpretar significância estatística',
        'Identificar limitações e premissas'
      ],
      scientificMethod: [
        'Formulação de hipóteses sobre relações',
        'Verificação de premissas da regressão',
        'Estimação de parâmetros',
        'Testes de significância',
        'Validação do modelo'
      ],
      steps: [
        // Steps para análise de correlação seriam definidos aqui
      ]
    }
  ];

  const executeStep = useCallback(async (step: AnalysisStep) => {
    setLoading(true);
    const startTime = Date.now();
    
    try {
      // Simular execução do código
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const executionTime = Date.now() - startTime;
      const result: AnalysisResult = {
        stepId: step.id,
        success: true,
        output: generateMockOutput(step.id),
        errors: [],
        executionTime
      };
      
      setAnalysisResults(prev => [...prev, result]);
      setReportData(prev => ({ ...prev, [step.id]: result.output }));
      
    } catch (error) {
      const result: AnalysisResult = {
        stepId: step.id,
        success: false,
        output: null,
        errors: [error.message || 'Erro desconhecido'],
        executionTime: Date.now() - startTime
      };
      
      setAnalysisResults(prev => [...prev, result]);
    } finally {
      setLoading(false);
    }
  }, []);

  const generateMockOutput = (stepId: number) => {
    const outputs = {
      1: {
        conceptsUnderstood: ['Medidas de tendência central', 'Medidas de dispersão'],
        theoryScore: 95,
        readinessForPractice: true
      },
      2: {
        dataQuality: { valid: 85, outliers: 3, missing: 0 },
        statistics: { mean: 31.6, median: 31.0, std: 5.64, cv: 17.8 },
        interpretations: ['Distribuição aproximadamente simétrica', 'Variabilidade moderada']
      },
      3: {
        visualizations: ['histogram', 'boxplot', 'summary_table'],
        insights: ['Padrão normal de distribuição', 'Poucos outliers identificados'],
        reportGenerated: true
      }
    };
    return outputs[stepId] || {};
  };

  const generatePDFReport = useCallback(async () => {
    if (!reportRef.current) return;
    
    setLoading(true);
    try {
      const canvas = await html2canvas(reportRef.current);
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save('relatorio-analise-cientifica.pdf');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        🔬 Bancada de Análise Científica
      </Typography>
      
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
        Ambiente de aprendizado com metodologia científica rigorosa e templates validados
      </Typography>

      <Grid container spacing={3}>
        {/* Seletor de Templates */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📚 Templates de Análise
              </Typography>
              
              {analysisTemplates.map((template) => (
                <Card 
                  key={template.id}
                  sx={{ 
                    mb: 2, 
                    cursor: 'pointer',
                    border: selectedTemplate?.id === template.id ? 2 : 1,
                    borderColor: selectedTemplate?.id === template.id ? 'primary.main' : 'grey.300'
                  }}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                      <Science color="primary" />
                      <Chip 
                        label={template.difficulty} 
                        size="small" 
                        color={
                          template.difficulty === 'Iniciante' ? 'success' :
                          template.difficulty === 'Intermediário' ? 'warning' : 'error'
                        }
                      />
                    </Stack>
                    
                    <Typography variant="subtitle1" fontWeight="bold">
                      {template.name}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {template.description}
                    </Typography>
                    
                    <Typography variant="caption" display="block">
                      ⏱️ {template.estimatedTime}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Área Principal de Análise */}
        <Grid item xs={12} md={8}>
          {selectedTemplate ? (
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                  <Science color="primary" />
                  <Typography variant="h5" fontWeight="bold">
                    {selectedTemplate.name}
                  </Typography>
                  <Chip label={selectedTemplate.category} color="primary" />
                </Stack>

                <Tabs value={0} sx={{ mb: 3 }}>
                  <Tab label="🎯 Objetivos" />
                  <Tab label="📋 Pré-requisitos" />
                  <Tab label="🔬 Método Científico" />
                  <Tab label="📊 Execução" />
                </Tabs>

                {/* Objetivos de Aprendizado */}
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Lightbulb color="warning" />
                      <Typography variant="h6">Objetivos de Aprendizado</Typography>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {selectedTemplate.learningObjectives.map((objective, index) => (
                        <ListItem key={index}>
                          <ListItemText 
                            primary={objective}
                            secondary={`Objetivo ${index + 1} de ${selectedTemplate.learningObjectives.length}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>

                {/* Método Científico */}
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Psychology color="info" />
                      <Typography variant="h6">Método Científico Aplicado</Typography>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stepper orientation="vertical">
                      {selectedTemplate.scientificMethod.map((step, index) => (
                        <Step key={index} active>
                          <StepLabel>
                            <Typography variant="body1" fontWeight="bold">
                              {step}
                            </Typography>
                          </StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </AccordionDetails>
                </Accordion>

                {/* Execução dos Passos */}
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    📝 Execução Passo a Passo
                  </Typography>
                  
                  <Stepper activeStep={currentStep} orientation="vertical">
                    {selectedTemplate.steps.map((step, index) => (
                      <Step key={step.id}>
                        <StepLabel>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            {step.type === 'teoria' && <School color="info" />}
                            {step.type === 'pratica' && <Code color="success" />}
                            {step.type === 'interpretacao' && <Assessment color="warning" />}
                            {step.type === 'validacao' && <CheckCircle color="primary" />}
                            
                            <Typography variant="subtitle1" fontWeight="bold">
                              {step.title}
                            </Typography>
                          </Stack>
                        </StepLabel>
                        
                        <StepContent>
                          <Typography variant="body1" sx={{ mb: 2 }}>
                            {step.description}
                          </Typography>

                          {/* Teoria */}
                          {step.theory && (
                            <Accordion>
                              <AccordionSummary expandIcon={<ExpandMore />}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                  <Info color="info" />
                                  <Typography variant="subtitle2">
                                    Fundamentação Teórica
                                  </Typography>
                                </Stack>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Paper sx={{ p: 2, bgcolor: 'info.light', color: 'info.contrastText' }}>
                                  <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
                                    {step.theory}
                                  </Typography>
                                </Paper>
                              </AccordionDetails>
                            </Accordion>
                          )}

                          {/* Código */}
                          <Accordion>
                            <AccordionSummary expandIcon={<ExpandMore />}>
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <Code color="primary" />
                                <Typography variant="subtitle2">
                                  Implementação
                                </Typography>
                              </Stack>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                                <Typography variant="body2" component="pre" sx={{ 
                                  fontFamily: 'monospace', 
                                  fontSize: '0.85rem',
                                  whiteSpace: 'pre-wrap',
                                  overflow: 'auto'
                                }}>
                                  {step.code}
                                </Typography>
                              </Paper>
                              
                              <Alert severity="info" sx={{ mt: 2 }}>
                                <Typography variant="body2">
                                  <strong>Explicação:</strong> {step.explanation}
                                </Typography>
                              </Alert>
                              
                              <Alert severity="success" sx={{ mt: 1 }}>
                                <Typography variant="body2">
                                  <strong>Resultado Esperado:</strong> {step.expectedOutput}
                                </Typography>
                              </Alert>
                            </AccordionDetails>
                          </Accordion>

                          {/* Dicas e Erros Comuns */}
                          <Grid container spacing={2} sx={{ mt: 2 }}>
                            <Grid item xs={12} md={6}>
                              <Paper sx={{ p: 2, bgcolor: 'warning.light' }}>
                                <Typography variant="subtitle2" gutterBottom>
                                  ⚠️ Erros Comuns
                                </Typography>
                                <List dense>
                                  {step.commonErrors.map((error, i) => (
                                    <ListItem key={i} sx={{ py: 0 }}>
                                      <ListItemText 
                                        primary={error}
                                        primaryTypographyProps={{ variant: 'body2' }}
                                      />
                                    </ListItem>
                                  ))}
                                </List>
                              </Paper>
                            </Grid>
                            
                            <Grid item xs={12} md={6}>
                              <Paper sx={{ p: 2, bgcolor: 'success.light' }}>
                                <Typography variant="subtitle2" gutterBottom>
                                  💡 Dicas Importantes
                                </Typography>
                                <List dense>
                                  {step.tips.map((tip, i) => (
                                    <ListItem key={i} sx={{ py: 0 }}>
                                      <ListItemText 
                                        primary={tip}
                                        primaryTypographyProps={{ variant: 'body2' }}
                                      />
                                    </ListItem>
                                  ))}
                                </List>
                              </Paper>
                            </Grid>
                          </Grid>

                          {/* Resultados da Execução */}
                          {analysisResults.find(r => r.stepId === step.id) && (
                            <Paper sx={{ p: 2, mt: 2, bgcolor: 'success.light' }}>
                              <Typography variant="subtitle2" gutterBottom>
                                ✅ Resultados da Execução
                              </Typography>
                              <Typography variant="body2" component="pre">
                                {JSON.stringify(analysisResults.find(r => r.stepId === step.id)?.output, null, 2)}
                              </Typography>
                            </Paper>
                          )}

                          {/* Controles */}
                          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                            <Button
                              variant="contained"
                              startIcon={loading ? <CircularProgress size={20} /> : <PlayArrow />}
                              onClick={() => executeStep(step)}
                              disabled={loading}
                            >
                              {loading ? 'Executando...' : 'Executar Passo'}
                            </Button>
                            
                            <Button
                              variant="outlined"
                              onClick={() => setCurrentStep(index + 1)}
                              disabled={index === selectedTemplate.steps.length - 1}
                            >
                              Próximo
                            </Button>
                            
                            <Button
                              variant="outlined"
                              onClick={() => setCurrentStep(index - 1)}
                              disabled={index === 0}
                            >
                              Anterior
                            </Button>
                          </Stack>

                          {/* Validação */}
                          {showValidation && (
                            <Alert severity="info" sx={{ mt: 2 }}>
                              <Typography variant="body2">
                                <strong>Validação:</strong> {step.validation}
                              </Typography>
                            </Alert>
                          )}
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>
                </Box>

                {/* Controles de Relatório */}
                <Divider sx={{ my: 3 }} />
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    startIcon={<PictureAsPdf />}
                    onClick={generatePDFReport}
                    disabled={analysisResults.length === 0}
                  >
                    Gerar Relatório PDF
                  </Button>
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={showValidation}
                        onChange={(e) => setShowValidation(e.target.checked)}
                      />
                    }
                    label="Mostrar validações"
                  />
                </Stack>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 8 }}>
                <Science sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Selecione um template de análise
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Escolha um dos templates científicos ao lado para começar sua análise
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>

      {/* Área oculta para geração de relatório */}
      <Box ref={reportRef} sx={{ display: 'none' }}>
        {/* Conteúdo do relatório seria renderizado aqui */}
      </Box>
    </Box>
  );
};

export default ScientificAnalysisWorkbench;
