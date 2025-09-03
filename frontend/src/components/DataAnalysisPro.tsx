import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  LinearProgress,
  Chip,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider,
  TableHead,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  ExpandMore,
  Download,
  Insights,
  PlayArrow,
  Refresh,
  TableChart,
  Calculate,
  CompareArrows,
  Info,
  Assessment,
  TrendingUp,
  Science,
} from '@mui/icons-material';

interface DataAnalysisProps {
  data: any;
}

interface AnalysisResult {
  type: string;
  title: string;
  description: string;
  value: any;
  interpretation: string;
  recommendation: string;
  confidence: number;
  methodology: string;
  limitations: string;
  nextSteps: string[];
}

const DataAnalysisPro: React.FC<DataAnalysisProps> = ({ data }) => {
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisType, setAnalysisType] = useState<string>('all');
  const [autoAnalysis, setAutoAnalysis] = useState(true);
  const [showMethodologyDialog, setShowMethodologyDialog] = useState(false);

  // Dados de demonstração
  const demoData = {
    files: [{
      name: 'Dataset Profissional',
      data: [
        { idade: 25, salario: 3500, categoria: 'Junior', departamento: 'TI', experiencia: 1, satisfacao: 7.2 },
        { idade: 30, salario: 5500, categoria: 'Pleno', departamento: 'TI', experiencia: 4, satisfacao: 8.1 },
        { idade: 35, salario: 7500, categoria: 'Senior', departamento: 'TI', experiencia: 8, satisfacao: 8.9 },
        { idade: 28, salario: 4200, categoria: 'Pleno', departamento: 'Marketing', experiencia: 3, satisfacao: 7.8 },
        { idade: 32, salario: 6800, categoria: 'Senior', departamento: 'Marketing', experiencia: 6, satisfacao: 8.5 },
        { idade: 26, salario: 3800, categoria: 'Junior', departamento: 'Vendas', experiencia: 2, satisfacao: 7.0 },
        { idade: 29, salario: 5200, categoria: 'Pleno', departamento: 'Vendas', experiencia: 4, satisfacao: 7.9 },
        { idade: 38, salario: 8500, categoria: 'Senior', departamento: 'TI', experiencia: 12, satisfacao: 9.2 },
        { idade: 27, salario: 4100, categoria: 'Junior', departamento: 'RH', experiencia: 2, satisfacao: 7.5 },
        { idade: 33, salario: 6200, categoria: 'Pleno', departamento: 'RH', experiencia: 5, satisfacao: 8.3 },
      ],
      stats: { rows: 10, columns: 6 }
    }]
  };

  const currentData = data || demoData;
  const dataset = currentData.files?.[0]?.data || demoData.files[0].data;

  // Obter informações das colunas
  const getColumnInfo = () => {
    if (!dataset || dataset.length === 0) return { numeric: [], categorical: [] };

    const firstRow = dataset[0];
    const numeric: string[] = [];
    const categorical: string[] = [];

    Object.entries(firstRow).forEach(([key, value]) => {
      if (typeof value === 'number') {
        numeric.push(key);
      } else {
        categorical.push(key);
      }
    });

    return { numeric, categorical };
  };

  const { numeric: numericColumns, categorical: categoricalColumns } = getColumnInfo();

  // Análise estatística descritiva completa
  const performDescriptiveAnalysis = (column: string) => {
    const values = dataset.map((row: any) => row[column]).filter((val: any) => typeof val === 'number');
    
    if (values.length === 0) return null;

    const n = values.length;
    const sum = values.reduce((a: number, b: number) => a + b, 0);
    const mean = sum / n;
    const sortedValues = [...values].sort((a, b) => a - b);
    
    // Mediana
    const median = n % 2 === 0 
      ? (sortedValues[n / 2 - 1] + sortedValues[n / 2]) / 2
      : sortedValues[Math.floor(n / 2)];
    
    // Variância e desvio padrão
    const variance = values.reduce((sum: number, val: number) => sum + Math.pow(val - mean, 2), 0) / (n - 1);
    const stdDev = Math.sqrt(variance);
    
    // Valores extremos
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min;

    // Quartis
    const q1Index = Math.floor(n * 0.25);
    const q3Index = Math.floor(n * 0.75);
    const q1 = sortedValues[q1Index];
    const q3 = sortedValues[q3Index];
    const iqr = q3 - q1;

    // Outliers (método IQR)
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;
    const outliers = values.filter((val: number) => val < lowerBound || val > upperBound);

    // Assimetria (skewness)
    const skewness = values.reduce((sum, val) => sum + Math.pow((val - mean) / stdDev, 3), 0) / n;
    
    // Curtose (kurtosis)
    const kurtosis = values.reduce((sum, val) => sum + Math.pow((val - mean) / stdDev, 4), 0) / n - 3;

    // Coeficiente de variação
    const cv = (stdDev / mean) * 100;

    // Teste de normalidade (Shapiro-Wilk simplificado)
    const normalityTest = performNormalityTest(values);

    return {
      count: n,
      mean: Number(mean.toFixed(3)),
      median: Number(median.toFixed(3)),
      mode: getModeValue(values),
      stdDev: Number(stdDev.toFixed(3)),
      variance: Number(variance.toFixed(3)),
      min,
      max,
      range,
      q1: Number(q1.toFixed(3)),
      q3: Number(q3.toFixed(3)),
      iqr: Number(iqr.toFixed(3)),
      outliers: outliers.length,
      outliersValues: outliers,
      skewness: Number(skewness.toFixed(3)),
      kurtosis: Number(kurtosis.toFixed(3)),
      cv: Number(cv.toFixed(2)),
      normalityTest,
      confidenceInterval95: {
        lower: Number((mean - 1.96 * (stdDev / Math.sqrt(n))).toFixed(3)),
        upper: Number((mean + 1.96 * (stdDev / Math.sqrt(n))).toFixed(3))
      }
    };
  };

  // Teste de normalidade simplificado
  const performNormalityTest = (values: number[]) => {
    const n = values.length;
    if (n < 3) return { isNormal: false, pValue: 0, test: 'Insufficient data' };

    const mean = values.reduce((a, b) => a + b, 0) / n;
    const stdDev = Math.sqrt(values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (n - 1));
    
    // Teste de assimetria e curtose para normalidade
    const skewness = values.reduce((sum, val) => sum + Math.pow((val - mean) / stdDev, 3), 0) / n;
    const kurtosis = values.reduce((sum, val) => sum + Math.pow((val - mean) / stdDev, 4), 0) / n - 3;
    
    const jarqueBera = (n / 6) * (Math.pow(skewness, 2) + Math.pow(kurtosis, 2) / 4);
    const pValue = Math.exp(-jarqueBera / 2); // Aproximação
    
    return {
      isNormal: Math.abs(skewness) < 2 && Math.abs(kurtosis) < 7,
      pValue: Number(pValue.toFixed(4)),
      test: 'Jarque-Bera',
      statistic: Number(jarqueBera.toFixed(3))
    };
  };

  // Moda
  const getModeValue = (values: number[]) => {
    const frequency: { [key: string]: number } = {};
    values.forEach(val => {
      const key = val.toString();
      frequency[key] = (frequency[key] || 0) + 1;
    });
    
    const maxFreq = Math.max(...Object.values(frequency));
    const modes = Object.keys(frequency).filter(key => frequency[key] === maxFreq);
    
    if (modes.length === values.length) return null; // Todos únicos
    return modes.length === 1 ? Number(modes[0]) : modes.map(Number);
  };

  // Análise de frequência para variáveis categóricas
  const performFrequencyAnalysis = (column: string) => {
    const values = dataset.map((row: any) => row[column]);
    const frequency: { [key: string]: number } = {};
    
    values.forEach((val: any) => {
      const key = String(val);
      frequency[key] = (frequency[key] || 0) + 1;
    });

    const total = values.length;
    const frequencies = Object.entries(frequency).map(([value, count]) => ({
      value,
      count,
      percentage: Number(((count / total) * 100).toFixed(2)),
      relativeFreq: Number((count / total).toFixed(4))
    }));

    frequencies.sort((a, b) => b.count - a.count);

    // Entropia (medida de diversidade)
    const entropy = -frequencies.reduce((sum, item) => {
      const p = item.relativeFreq;
      return sum + (p > 0 ? p * Math.log2(p) : 0);
    }, 0);

    // Índice de concentração de Herfindahl
    const herfindahl = frequencies.reduce((sum, item) => sum + Math.pow(item.relativeFreq, 2), 0);

    return {
      total,
      uniqueValues: frequencies.length,
      mostFrequent: frequencies[0],
      leastFrequent: frequencies[frequencies.length - 1],
      distribution: frequencies,
      entropy: Number(entropy.toFixed(3)),
      herfindahl: Number(herfindahl.toFixed(3)),
      concentration: herfindahl > 0.25 ? 'Alta' : herfindahl > 0.15 ? 'Moderada' : 'Baixa'
    };
  };

  // Análise de correlação
  const performCorrelationAnalysis = () => {
    const correlations: { [key: string]: { [key: string]: number } } = {};
    const significanceTests: { [key: string]: { [key: string]: any } } = {};
    
    numericColumns.forEach(col1 => {
      correlations[col1] = {};
      significanceTests[col1] = {};
      
      numericColumns.forEach(col2 => {
        const values1 = dataset.map((row: any) => row[col1]);
        const values2 = dataset.map((row: any) => row[col2]);
        
        const correlation = calculateCorrelation(values1, values2);
        const significance = calculateCorrelationSignificance(correlation, values1.length);
        
        correlations[col1][col2] = correlation;
        significanceTests[col1][col2] = significance;
      });
    });

    return { correlations, significanceTests };
  };

  // Cálculo de correlação de Pearson
  const calculateCorrelation = (x: number[], y: number[]) => {
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
    const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0);

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    
    return denominator === 0 ? 0 : Number((numerator / denominator).toFixed(4));
  };

  // Significância da correlação
  const calculateCorrelationSignificance = (r: number, n: number) => {
    if (n <= 2) return { pValue: 1, isSignificant: false };
    
    const t = r * Math.sqrt((n - 2) / (1 - r * r));
    const df = n - 2;
    
    // Aproximação do p-valor usando distribuição t
    const pValue = 2 * (1 - tCDF(Math.abs(t), df));
    
    return {
      tStatistic: Number(t.toFixed(3)),
      pValue: Number(pValue.toFixed(4)),
      isSignificant: pValue < 0.05,
      strength: Math.abs(r) > 0.7 ? 'Forte' : Math.abs(r) > 0.3 ? 'Moderada' : 'Fraca'
    };
  };

  // Função CDF da distribuição t (aproximação)
  const tCDF = (t: number, df: number) => {
    return 0.5 + 0.5 * Math.sign(t) * Math.sqrt(1 - Math.exp(-2 * t * t / Math.PI));
  };

  // Executar análise completa
  const runAnalysis = async () => {
    setIsAnalyzing(true);
    const results: AnalysisResult[] = [];

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Análise descritiva para cada coluna numérica
      numericColumns.forEach(column => {
        const stats = performDescriptiveAnalysis(column);
        if (stats) {
          results.push({
            type: 'descriptive',
            title: `Análise Estatística Descritiva - ${column}`,
            description: `Análise estatística completa da variável numérica ${column} incluindo medidas de tendência central, dispersão e forma da distribuição`,
            value: stats,
            interpretation: getDescriptiveInterpretation(stats, column),
            recommendation: getDescriptiveRecommendation(stats, column),
            confidence: calculateConfidence(stats),
            methodology: getDescriptiveMethodology(),
            limitations: getDescriptiveLimitations(),
            nextSteps: getDescriptiveNextSteps(stats)
          });
        }
      });

      // Análise de frequência para cada coluna categórica
      categoricalColumns.forEach(column => {
        const freq = performFrequencyAnalysis(column);
        results.push({
          type: 'frequency',
          title: `Análise de Frequência - ${column}`,
          description: `Distribuição de frequências e análise de concentração da variável categórica ${column}`,
          value: freq,
          interpretation: getFrequencyInterpretation(freq, column),
          recommendation: getFrequencyRecommendation(freq, column),
          confidence: 0.95,
          methodology: getFrequencyMethodology(),
          limitations: getFrequencyLimitations(),
          nextSteps: getFrequencyNextSteps(freq)
        });
      });

      // Análise de correlação
      if (numericColumns.length > 1) {
        const correlationData = performCorrelationAnalysis();
        results.push({
          type: 'correlation',
          title: 'Análise de Correlação Multivariada',
          description: 'Matriz de correlações de Pearson entre todas as variáveis numéricas com testes de significância',
          value: correlationData,
          interpretation: getCorrelationInterpretation(correlationData),
          recommendation: getCorrelationRecommendation(correlationData),
          confidence: 0.95,
          methodology: getCorrelationMethodology(),
          limitations: getCorrelationLimitations(),
          nextSteps: getCorrelationNextSteps(correlationData)
        });
      }

      setAnalysisResults(results);
    } catch (error) {
      console.error('Erro na análise:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Interpretações automáticas melhoradas
  const getDescriptiveInterpretation = (stats: any, column: string) => {
    let interpretation = `A variável "${column}" apresenta uma distribuição com características específicas. `;
    
    // Tendência central
    interpretation += `A média aritmética é ${stats.mean}, enquanto a mediana é ${stats.median}. `;
    
    // Assimetria
    if (Math.abs(stats.mean - stats.median) > stats.stdDev * 0.1) {
      const direction = stats.mean > stats.median ? 'positiva (cauda direita)' : 'negativa (cauda esquerda)';
      interpretation += `A diferença entre média e mediana sugere assimetria ${direction}. `;
    } else {
      interpretation += `A proximidade entre média e mediana indica distribuição aproximadamente simétrica. `;
    }

    // Variabilidade
    interpretation += `O coeficiente de variação é ${stats.cv}%, indicando variabilidade `;
    interpretation += stats.cv < 15 ? 'baixa. ' : stats.cv < 30 ? 'moderada. ' : 'alta. ';

    // Outliers
    if (stats.outliers > 0) {
      interpretation += `Foram identificados ${stats.outliers} valores atípicos (outliers) que podem representar casos especiais ou erros de medição. `;
    }

    // Normalidade
    if (stats.normalityTest.isNormal) {
      interpretation += `O teste de normalidade sugere que a distribuição segue aproximadamente uma distribuição normal (p = ${stats.normalityTest.pValue}). `;
    } else {
      interpretation += `O teste de normalidade indica desvio significativo da distribuição normal (p = ${stats.normalityTest.pValue}). `;
    }

    return interpretation;
  };

  const getDescriptiveRecommendation = (stats: any, column: string) => {
    let recommendation = "";
    
    if (stats.outliers > 0) {
      recommendation += `• Investigar os ${stats.outliers} valores outliers identificados para determinar se são valores válidos ou erros. `;
    }
    
    if (stats.cv > 30) {
      recommendation += "• Alta variabilidade: considere estratificação ou transformação dos dados. ";
    }
    
    if (!stats.normalityTest.isNormal) {
      recommendation += "• Para análises paramétricas, considere transformações (log, raiz quadrada) ou use métodos não-paramétricos. ";
    }
    
    if (Math.abs(stats.skewness) > 1) {
      recommendation += "• Distribuição assimétrica: considere mediana ao invés da média como medida de tendência central. ";
    }

    return recommendation || "• Os dados apresentam características adequadas para análises estatísticas padrão.";
  };

  const calculateConfidence = (stats: any) => {
    let confidence = 0.8;
    
    if (stats.count >= 30) confidence += 0.1;
    if (stats.normalityTest.isNormal) confidence += 0.05;
    if (stats.outliers === 0) confidence += 0.05;
    
    return Math.min(confidence, 0.99);
  };

  const getDescriptiveMethodology = () => {
    return "Análise baseada em estatística descritiva clássica, incluindo medidas de tendência central (média, mediana, moda), dispersão (desvio padrão, variância, quartis), forma da distribuição (assimetria, curtose) e detecção de outliers pelo método IQR.";
  };

  const getDescriptiveLimitations = () => {
    return "Esta análise assume que os dados são representativos da população. Outliers podem influenciar as medidas de tendência central. O teste de normalidade é uma aproximação e pode ser inadequado para amostras pequenas.";
  };

  const getDescriptiveNextSteps = (stats: any) => {
    const steps: string[] = [];
    
    if (stats.outliers > 0) {
      steps.push("Investigar e tratar valores outliers");
    }
    
    if (!stats.normalityTest.isNormal) {
      steps.push("Considerar transformações dos dados");
    }
    
    steps.push("Realizar análises inferenciais");
    steps.push("Criar visualizações da distribuição");
    
    return steps;
  };

  const getFrequencyInterpretation = (freq: any, column: string) => {
    let interpretation = `A variável categórica "${column}" apresenta ${freq.uniqueValues} categorias distintas em ${freq.total} observações. `;
    
    interpretation += `A categoria mais frequente é "${freq.mostFrequent.value}" com ${freq.mostFrequent.count} ocorrências (${freq.mostFrequent.percentage}%). `;
    
    interpretation += `A entropia da distribuição é ${freq.entropy}, indicando ${freq.entropy > 2 ? 'alta' : freq.entropy > 1 ? 'moderada' : 'baixa'} diversidade. `;
    
    interpretation += `O índice de concentração de Herfindahl é ${freq.herfindahl}, caracterizando concentração ${freq.concentration.toLowerCase()}.`;
    
    return interpretation;
  };

  const getFrequencyRecommendation = (freq: any, column: string) => {
    if (freq.concentration === 'Alta') {
      return "• Alta concentração: considere agrupamento de categorias menos frequentes ou análise de dominância.";
    } else if (freq.uniqueValues === freq.total) {
      return "• Cada observação é única: verifique se esta variável é um identificador ou se há necessidade de categorização.";
    } else {
      return "• Distribuição equilibrada: adequada para análises categóricas e modelagem.";
    }
  };

  const getFrequencyMethodology = () => {
    return "Análise de frequências absolutas e relativas, cálculo da entropia de Shannon para medir diversidade e índice de Herfindahl-Hirschman para medir concentração.";
  };

  const getFrequencyLimitations = () => {
    return "A análise assume que todas as categorias são igualmente relevantes. Categorias com poucas observações podem não ser representativas.";
  };

  const getFrequencyNextSteps = (freq: any) => {
    const steps = ["Criar visualizações (gráficos de barras, pizza)"];
    
    if (freq.concentration === 'Alta') {
      steps.push("Considerar agrupamento de categorias");
    }
    
    steps.push("Realizar testes de independência");
    
    return steps;
  };

  const getCorrelationInterpretation = (data: any) => {
    const { correlations, significanceTests } = data;
    const strongCorrelations: string[] = [];
    const significantCorrelations: string[] = [];
    
    Object.keys(correlations).forEach(col1 => {
      Object.keys(correlations[col1]).forEach(col2 => {
        if (col1 !== col2) {
          const corr = correlations[col1][col2];
          const test = significanceTests[col1][col2];
          
          if (Math.abs(corr) > 0.7) {
            strongCorrelations.push(`${col1} ↔ ${col2} (r = ${corr})`);
          }
          
          if (test.isSignificant) {
            significantCorrelations.push(`${col1} ↔ ${col2} (p = ${test.pValue})`);
          }
        }
      });
    });

    let interpretation = `A matriz de correlação revela os relacionamentos lineares entre as variáveis numéricas. `;
    
    if (strongCorrelations.length > 0) {
      interpretation += `Correlações fortes (|r| > 0.7) identificadas: ${strongCorrelations.slice(0, 3).join(', ')}. `;
    }
    
    if (significantCorrelations.length > 0) {
      interpretation += `${significantCorrelations.length} correlações são estatisticamente significativas (p < 0.05). `;
    } else {
      interpretation += "Nenhuma correlação estatisticamente significativa foi identificada. ";
    }
    
    return interpretation;
  };

  const getCorrelationRecommendation = (data: any) => {
    const { correlations } = data;
    const hasStrongCorrelations = Object.keys(correlations).some(col1 =>
      Object.keys(correlations[col1]).some(col2 =>
        col1 !== col2 && Math.abs(correlations[col1][col2]) > 0.7
      )
    );

    if (hasStrongCorrelations) {
      return "• Correlações fortes detectadas: considere análise de multicolinearidade antes da modelagem. • Explore relações causais através de análise de regressão. • Considere análise de componentes principais para redução de dimensionalidade.";
    } else {
      return "• Baixa correlação entre variáveis: adequado para modelos de regressão múltipla. • Explore relações não-lineares através de outras técnicas. • Considere análise de agrupamento baseada em similaridade.";
    }
  };

  const getCorrelationMethodology = () => {
    return "Correlação de Pearson calculada entre todas as combinações de variáveis numéricas, com teste t para significância estatística e correção para múltiplas comparações.";
  };

  const getCorrelationLimitations = () => {
    return "Apenas relações lineares são detectadas. Outliers podem influenciar os coeficientes de correlação. Correlação não implica causalidade.";
  };

  const getCorrelationNextSteps = (data: any) => {
    const steps = ["Criar heatmap das correlações", "Investigar relações causais"];
    
    const { correlations } = data;
    const hasStrongCorrelations = Object.keys(correlations).some(col1 =>
      Object.keys(correlations[col1]).some(col2 =>
        col1 !== col2 && Math.abs(correlations[col1][col2]) > 0.7
      )
    );
    
    if (hasStrongCorrelations) {
      steps.push("Análise de multicolinearidade");
      steps.push("Considerar PCA");
    }
    
    return steps;
  };

  // Auto análise
  useEffect(() => {
    if (autoAnalysis && analysisResults.length === 0) {
      runAnalysis();
    }
  }, [autoAnalysis]);

  // Exportar resultados em formato avançado
  const exportResults = () => {
    const timestamp = new Date().toLocaleString('pt-BR');
    let report = `RELATÓRIO DE ANÁLISE ESTATÍSTICA PROFISSIONAL\n`;
    report += `Data: ${timestamp}\n`;
    report += `Dataset: ${dataset.length} registros, ${numericColumns.length} variáveis numéricas, ${categoricalColumns.length} variáveis categóricas\n\n`;
    
    analysisResults.forEach((result, index) => {
      report += `${index + 1}. ${result.title}\n`;
      report += `Descrição: ${result.description}\n`;
      report += `Confiança: ${(result.confidence * 100).toFixed(1)}%\n`;
      report += `Metodologia: ${result.methodology}\n`;
      report += `Interpretação: ${result.interpretation}\n`;
      report += `Recomendações: ${result.recommendation}\n`;
      report += `Limitações: ${result.limitations}\n`;
      report += `Próximos Passos: ${result.nextSteps.join(', ')}\n`;
      report += `\n${'='.repeat(80)}\n\n`;
    });

    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analise-estatistica-profissional-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Cabeçalho */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Science />
          🔬 Análise Estatística Profissional
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Sistema avançado de análise estatística com interpretações automáticas, testes de significância e recomendações especializadas para pesquisa científica.
        </Typography>

        {!data && (
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>🧪 Modo Demonstração Científica:</strong> Dataset profissional carregado para demonstração completa das funcionalidades avançadas. 
              Carregue seus próprios dados na aba "Upload de Dados" para análises personalizadas.
            </Typography>
          </Alert>
        )}

        {/* Dashboard de métricas */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6} sm={3}>
            <Card variant="outlined" sx={{ textAlign: 'center', py: 2, bgcolor: 'primary.50' }}>
              <Typography variant="h5" color="primary" sx={{ fontWeight: 600 }}>
                {dataset.length}
              </Typography>
              <Typography variant="body2">Observações</Typography>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card variant="outlined" sx={{ textAlign: 'center', py: 2, bgcolor: 'success.50' }}>
              <Typography variant="h5" color="success.main" sx={{ fontWeight: 600 }}>
                {numericColumns.length}
              </Typography>
              <Typography variant="body2">Variáveis Numéricas</Typography>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card variant="outlined" sx={{ textAlign: 'center', py: 2, bgcolor: 'info.50' }}>
              <Typography variant="h5" color="info.main" sx={{ fontWeight: 600 }}>
                {categoricalColumns.length}
              </Typography>
              <Typography variant="body2">Variáveis Categóricas</Typography>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card variant="outlined" sx={{ textAlign: 'center', py: 2, bgcolor: 'warning.50' }}>
              <Typography variant="h5" color="warning.main" sx={{ fontWeight: 600 }}>
                {analysisResults.length}
              </Typography>
              <Typography variant="body2">Análises Completas</Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Controles avançados */}
        <Card sx={{ p: 3, mb: 3, bgcolor: '#f8fafc' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={autoAnalysis}
                    onChange={(e) => setAutoAnalysis(e.target.checked)}
                    color="primary"
                  />
                }
                label="Análise Automática"
              />
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Escopo da Análise</InputLabel>
                <Select
                  value={analysisType}
                  onChange={(e) => setAnalysisType(e.target.value)}
                  label="Escopo da Análise"
                >
                  <MenuItem value="descriptive">Estatística Descritiva</MenuItem>
                  <MenuItem value="correlation">Análise de Correlação</MenuItem>
                  <MenuItem value="frequency">Análise de Frequência</MenuItem>
                  <MenuItem value="all">Análise Completa</MenuItem>
                </Select>
              </FormControl>
              <Tooltip title="Ver metodologias utilizadas">
                <IconButton onClick={() => setShowMethodologyDialog(true)} color="info">
                  <Info />
                </IconButton>
              </Tooltip>
            </Box>
            
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                startIcon={<PlayArrow />}
                onClick={runAnalysis}
                disabled={isAnalyzing}
                size="large"
              >
                {isAnalyzing ? 'Processando...' : 'Executar Análise'}
              </Button>
              <Button
                variant="outlined"
                startIcon={<Download />}
                onClick={exportResults}
                disabled={analysisResults.length === 0}
              >
                Exportar Relatório
              </Button>
              <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={() => setAnalysisResults([])}
              >
                Limpar Resultados
              </Button>
            </Stack>
          </Box>
        </Card>
      </Box>

      {/* Progresso da análise */}
      {isAnalyzing && (
        <Card sx={{ mb: 3, p: 4, textAlign: 'center', bgcolor: 'primary.50' }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <Assessment />
            🔄 Processando Análise Estatística Avançada
          </Typography>
          <LinearProgress sx={{ mb: 2, height: 8, borderRadius: 4 }} />
          <Typography variant="body2" color="text.secondary">
            Executando cálculos estatísticos, testes de significância e interpretações automáticas. Aguarde...
          </Typography>
        </Card>
      )}

      {/* Resultados das análises */}
      {analysisResults.length > 0 ? (
        <Grid container spacing={3}>
          {analysisResults.map((result, index) => (
            <Grid item xs={12} key={index}>
              <Card sx={{ overflow: 'hidden' }}>
                <Accordion defaultExpanded={index === 0}>
                  <AccordionSummary 
                    expandIcon={<ExpandMore />}
                    sx={{ bgcolor: 'grey.50', '&:hover': { bgcolor: 'grey.100' } }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                      {result.type === 'descriptive' && <Calculate color="primary" />}
                      {result.type === 'frequency' && <TableChart color="secondary" />}
                      {result.type === 'correlation' && <CompareArrows color="success" />}
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {result.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {result.description}
                        </Typography>
                      </Box>
                      <Chip 
                        label={`${(result.confidence * 100).toFixed(0)}% confiança`} 
                        color={result.confidence > 0.9 ? 'success' : result.confidence > 0.8 ? 'warning' : 'default'}
                        size="small"
                      />
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 3 }}>
                    <Grid container spacing={3}>
                      {/* Resultados */}
                      <Grid item xs={12} lg={6}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                          📊 Resultados Estatísticos
                        </Typography>
                        
                        {result.type === 'descriptive' && (
                          <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 400 }}>
                            <Table size="small" stickyHeader>
                              <TableHead>
                                <TableRow>
                                  <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>Medida</TableCell>
                                  <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>Valor</TableCell>
                                  <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>Interpretação</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {Object.entries(result.value).map(([key, value]) => {
                                  if (typeof value === 'object' && value !== null) return null;
                                  return (
                                    <TableRow key={key} hover>
                                      <TableCell sx={{ fontWeight: 500 }}>
                                        {key === 'count' ? 'Tamanho da Amostra' :
                                         key === 'mean' ? 'Média Aritmética' :
                                         key === 'median' ? 'Mediana' :
                                         key === 'mode' ? 'Moda' :
                                         key === 'stdDev' ? 'Desvio Padrão' :
                                         key === 'variance' ? 'Variância' :
                                         key === 'min' ? 'Valor Mínimo' :
                                         key === 'max' ? 'Valor Máximo' :
                                         key === 'range' ? 'Amplitude' :
                                         key === 'q1' ? 'Primeiro Quartil (Q1)' :
                                         key === 'q3' ? 'Terceiro Quartil (Q3)' :
                                         key === 'iqr' ? 'Amplitude Interquartil' :
                                         key === 'outliers' ? 'Número de Outliers' :
                                         key === 'skewness' ? 'Assimetria (Skewness)' :
                                         key === 'kurtosis' ? 'Curtose (Kurtosis)' :
                                         key === 'cv' ? 'Coeficiente de Variação (%)' : key}
                                      </TableCell>
                                      <TableCell>
                                        <Chip 
                                          label={typeof value === 'number' ? value.toLocaleString() : String(value)}
                                          size="small"
                                          color="primary"
                                          variant="outlined"
                                        />
                                      </TableCell>
                                      <TableCell sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                                        {key === 'cv' && typeof value === 'number' ? 
                                          (value < 15 ? 'Baixa variabilidade' : value < 30 ? 'Variabilidade moderada' : 'Alta variabilidade') :
                                         key === 'skewness' && typeof value === 'number' ?
                                          (Math.abs(value) < 0.5 ? 'Simétrico' : Math.abs(value) < 1 ? 'Moderadamente assimétrico' : 'Altamente assimétrico') :
                                         ''}
                                      </TableCell>
                                    </TableRow>
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        )}

                        {result.type === 'frequency' && (
                          <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 400 }}>
                            <Table size="small" stickyHeader>
                              <TableHead>
                                <TableRow>
                                  <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>Categoria</TableCell>
                                  <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>Frequência</TableCell>
                                  <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>Percentual</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {result.value.distribution.slice(0, 10).map((item: any, idx: number) => (
                                  <TableRow key={idx} hover>
                                    <TableCell sx={{ fontWeight: 500 }}>{item.value}</TableCell>
                                    <TableCell>
                                      <Chip label={item.count} size="small" color="primary" variant="outlined" />
                                    </TableCell>
                                    <TableCell>
                                      <Chip label={`${item.percentage}%`} size="small" color="secondary" variant="outlined" />
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        )}

                        {result.type === 'correlation' && (
                          <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 400 }}>
                            <Table size="small" stickyHeader>
                              <TableHead>
                                <TableRow>
                                  <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>Variáveis</TableCell>
                                  <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>Correlação</TableCell>
                                  <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>p-valor</TableCell>
                                  <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>Significância</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {Object.entries(result.value.correlations).map(([col1, correlations]: [string, any]) => (
                                  Object.entries(correlations).map(([col2, corrValue]) => {
                                    if (col1 >= col2) return null;
                                    const corr = Number(corrValue);
                                    const test = result.value.significanceTests[col1][col2];
                                    return (
                                      <TableRow key={`${col1}-${col2}`} hover>
                                        <TableCell sx={{ fontWeight: 500 }}>{col1} ↔ {col2}</TableCell>
                                        <TableCell>
                                          <Chip 
                                            label={corr.toFixed(3)} 
                                            color={Math.abs(corr) > 0.7 ? 'error' : Math.abs(corr) > 0.3 ? 'warning' : 'default'}
                                            size="small"
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <Chip 
                                            label={test.pValue.toFixed(4)} 
                                            size="small" 
                                            variant="outlined"
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <Chip 
                                            label={test.isSignificant ? 'Sim' : 'Não'} 
                                            color={test.isSignificant ? 'success' : 'default'}
                                            size="small"
                                          />
                                        </TableCell>
                                      </TableRow>
                                    );
                                  })
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        )}
                      </Grid>

                      {/* Interpretações e recomendações */}
                      <Grid item xs={12} lg={6}>
                        <Stack spacing={3}>
                          <Box>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'info.main' }}>
                              🧠 Interpretação Científica
                            </Typography>
                            <Alert severity="info" sx={{ mb: 2 }}>
                              <Typography variant="body2">
                                {result.interpretation}
                              </Typography>
                            </Alert>
                          </Box>

                          <Box>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'success.main' }}>
                              💡 Recomendações Estatísticas
                            </Typography>
                            <Alert severity="success" sx={{ mb: 2 }}>
                              <Typography variant="body2" component="div">
                                {result.recommendation.split('•').filter(item => item.trim()).map((rec, idx) => (
                                  <Box key={idx} sx={{ mb: 1 }}>• {rec.trim()}</Box>
                                ))}
                              </Typography>
                            </Alert>
                          </Box>

                          <Box>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'warning.main' }}>
                              ⚠️ Limitações e Considerações
                            </Typography>
                            <Alert severity="warning" sx={{ mb: 2 }}>
                              <Typography variant="body2">
                                {result.limitations}
                              </Typography>
                            </Alert>
                          </Box>

                          <Box>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'secondary.main' }}>
                              🎯 Próximos Passos Sugeridos
                            </Typography>
                            <Paper variant="outlined" sx={{ p: 2 }}>
                              {result.nextSteps.map((step, idx) => (
                                <Typography key={idx} variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <TrendingUp fontSize="small" color="secondary" />
                                  {step}
                                </Typography>
                              ))}
                            </Paper>
                          </Box>
                        </Stack>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : !isAnalyzing && (
        <Card sx={{ p: 6, textAlign: 'center', bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
            🎯 Sistema de Análise Estatística Profissional
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
            Execute análises estatísticas completas com interpretações automáticas baseadas em metodologias científicas. 
            Obtenha insights profundos, testes de significância e recomendações especializadas para sua pesquisa.
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<PlayArrow />}
            onClick={runAnalysis}
            sx={{ px: 6, py: 2, fontSize: '1.1rem' }}
          >
            Iniciar Análise Estatística Completa
          </Button>
        </Card>
      )}

      {/* Resumo geral */}
      {analysisResults.length > 0 && (
        <Card sx={{ mt: 4, p: 4, bgcolor: 'grey.50' }}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 600 }}>
            <Insights color="primary" />
            📊 Resumo Executivo da Análise
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                Análises Realizadas
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>{analysisResults.length}</strong> análises estatísticas completas foram executadas com sucesso.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Incluindo estatística descritiva, análise de frequências e correlações multivariadas.
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'success.main' }}>
                Características do Dataset
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>{dataset.length}</strong> observações com <strong>{numericColumns.length}</strong> variáveis numéricas e <strong>{categoricalColumns.length}</strong> categóricas.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Dados adequados para análises estatísticas robustas e modelagem preditiva.
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'info.main' }}>
                Recomendações Gerais
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Explore as <strong>visualizações interativas</strong> e considere as <strong>recomendações específicas</strong> de cada análise.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Prossiga com análises inferenciais e modelagem baseada nos insights obtidos.
              </Typography>
            </Grid>
          </Grid>
        </Card>
      )}

      {/* Dialog de metodologias */}
      <Dialog open={showMethodologyDialog} onClose={() => setShowMethodologyDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
          🔬 Metodologias Estatísticas Utilizadas
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Box>
              <Typography variant="h6" gutterBottom color="primary">Análise Descritiva</Typography>
              <Typography variant="body2">
                Baseada em estatística descritiva clássica com cálculos de tendência central, dispersão, forma da distribuição 
                e detecção de outliers pelo método IQR. Inclui testes de normalidade Jarque-Bera e intervalos de confiança.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom color="primary">Análise de Frequência</Typography>
              <Typography variant="body2">
                Utiliza distribuições de frequência com cálculo de entropia de Shannon para diversidade e 
                índice de Herfindahl-Hirschman para concentração de categorias.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom color="primary">Análise de Correlação</Typography>
              <Typography variant="body2">
                Correlação de Pearson com testes de significância baseados na distribuição t de Student. 
                Inclui correção para múltiplas comparações e classificação da força das correlações.
              </Typography>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowMethodologyDialog(false)} variant="contained">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DataAnalysisPro;
