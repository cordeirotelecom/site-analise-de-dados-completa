import { useState, useEffect } from 'react';
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
}

const DataAnalysisPro: React.FC<DataAnalysisProps> = ({ data }) => {
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisType, setAnalysisType] = useState<string>('descriptive');
  const [autoAnalysis, setAutoAnalysis] = useState(true);

  // Dados de demonstração se não houver dados
  const demoData = {
    files: [{
      name: 'Dados de Exemplo',
      data: [
        { idade: 25, salario: 3500, categoria: 'Junior', departamento: 'TI' },
        { idade: 30, salario: 5500, categoria: 'Pleno', departamento: 'TI' },
        { idade: 35, salario: 7500, categoria: 'Senior', departamento: 'TI' },
        { idade: 28, salario: 4200, categoria: 'Pleno', departamento: 'Marketing' },
        { idade: 32, salario: 6800, categoria: 'Senior', departamento: 'Marketing' },
        { idade: 26, salario: 3800, categoria: 'Junior', departamento: 'Vendas' },
        { idade: 29, salario: 5200, categoria: 'Pleno', departamento: 'Vendas' },
        { idade: 38, salario: 8500, categoria: 'Senior', departamento: 'TI' },
      ],
      stats: { rows: 8, columns: 4 }
    }]
  };

  const currentData = data || demoData;
  const dataset = currentData.files?.[0]?.data || demoData.files[0].data;

  // Obter colunas numéricas e categóricas
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

  // Análise estatística descritiva
  const performDescriptiveAnalysis = (column: string) => {
    const values = dataset.map((row: any) => row[column]).filter((val: any) => typeof val === 'number');
    
    if (values.length === 0) return null;

    const sum = values.reduce((a: number, b: number) => a + b, 0);
    const mean = sum / values.length;
    const sortedValues = [...values].sort((a, b) => a - b);
    const median = sortedValues.length % 2 === 0 
      ? (sortedValues[sortedValues.length / 2 - 1] + sortedValues[sortedValues.length / 2]) / 2
      : sortedValues[Math.floor(sortedValues.length / 2)];
    
    const variance = values.reduce((sum: number, val: number) => sum + Math.pow(val - mean, 2), 0) / values.length;
    const stdDev = Math.sqrt(variance);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min;

    // Quartis
    const q1 = sortedValues[Math.floor(sortedValues.length * 0.25)];
    const q3 = sortedValues[Math.floor(sortedValues.length * 0.75)];
    const iqr = q3 - q1;

    // Outliers (regra 1.5 * IQR)
    const outliers = values.filter((val: number) => val < q1 - 1.5 * iqr || val > q3 + 1.5 * iqr);

    return {
      count: values.length,
      mean: Number(mean.toFixed(2)),
      median: Number(median.toFixed(2)),
      mode: getModeValue(values),
      stdDev: Number(stdDev.toFixed(2)),
      variance: Number(variance.toFixed(2)),
      min,
      max,
      range,
      q1,
      q3,
      iqr: Number(iqr.toFixed(2)),
      outliers: outliers.length,
      skewness: calculateSkewness(values, mean, stdDev),
      kurtosis: calculateKurtosis(values, mean, stdDev)
    };
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
      percentage: Number(((count / total) * 100).toFixed(1))
    }));

    frequencies.sort((a, b) => b.count - a.count);

    return {
      total,
      uniqueValues: frequencies.length,
      mostFrequent: frequencies[0],
      leastFrequent: frequencies[frequencies.length - 1],
      distribution: frequencies
    };
  };

  // Análise de correlação
  const performCorrelationAnalysis = () => {
    const correlations: { [key: string]: { [key: string]: number } } = {};
    
    numericColumns.forEach(col1 => {
      correlations[col1] = {};
      numericColumns.forEach(col2 => {
        const values1 = dataset.map((row: any) => row[col1]);
        const values2 = dataset.map((row: any) => row[col2]);
        correlations[col1][col2] = calculateCorrelation(values1, values2);
      });
    });

    return correlations;
  };

  // Funções auxiliares
  const getModeValue = (values: number[]) => {
    const frequency: { [key: string]: number } = {};
    values.forEach(val => {
      frequency[val] = (frequency[val] || 0) + 1;
    });
    
    const maxFreq = Math.max(...Object.values(frequency));
    const modes = Object.keys(frequency).filter(key => frequency[key] === maxFreq);
    return modes.length === 1 ? Number(modes[0]) : null;
  };

  const calculateSkewness = (values: number[], mean: number, stdDev: number) => {
    const n = values.length;
    const skewness = values.reduce((sum, val) => sum + Math.pow((val - mean) / stdDev, 3), 0) / n;
    return Number(skewness.toFixed(3));
  };

  const calculateKurtosis = (values: number[], mean: number, stdDev: number) => {
    const n = values.length;
    const kurtosis = values.reduce((sum, val) => sum + Math.pow((val - mean) / stdDev, 4), 0) / n - 3;
    return Number(kurtosis.toFixed(3));
  };

  const calculateCorrelation = (x: number[], y: number[]) => {
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
    const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0);

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    
    return denominator === 0 ? 0 : Number((numerator / denominator).toFixed(3));
  };

  // Executar análise
  const runAnalysis = async () => {
    setIsAnalyzing(true);
    const results: AnalysisResult[] = [];

    try {
      // Simular tempo de processamento
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Análise descritiva para colunas numéricas
      numericColumns.forEach(column => {
        const stats = performDescriptiveAnalysis(column);
        if (stats) {
          results.push({
            type: 'descriptive',
            title: `Estatística Descritiva - ${column}`,
            description: `Análise estatística completa da variável ${column}`,
            value: stats,
            interpretation: getDescriptiveInterpretation(stats),
            recommendation: getDescriptiveRecommendation(stats)
          });
        }
      });

      // Análise de frequência para colunas categóricas
      categoricalColumns.forEach(column => {
        const freq = performFrequencyAnalysis(column);
        results.push({
          type: 'frequency',
          title: `Análise de Frequência - ${column}`,
          description: `Distribuição de frequências da variável ${column}`,
          value: freq,
          interpretation: getFrequencyInterpretation(freq),
          recommendation: getFrequencyRecommendation(freq)
        });
      });

      // Análise de correlação
      if (numericColumns.length > 1) {
        const correlations = performCorrelationAnalysis();
        results.push({
          type: 'correlation',
          title: 'Matriz de Correlação',
          description: 'Correlações entre variáveis numéricas',
          value: correlations,
          interpretation: getCorrelationInterpretation(correlations),
          recommendation: getCorrelationRecommendation(correlations)
        });
      }

      setAnalysisResults(results);
    } catch (error) {
      console.error('Erro na análise:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Interpretações automáticas
  const getDescriptiveInterpretation = (stats: any) => {
    let interpretation = `A variável apresenta média de ${stats.mean} e mediana de ${stats.median}. `;
    
    if (Math.abs(stats.mean - stats.median) > stats.stdDev * 0.5) {
      interpretation += "A diferença entre média e mediana sugere assimetria na distribuição. ";
    } else {
      interpretation += "A proximidade entre média e mediana indica distribuição relativamente simétrica. ";
    }

    if (stats.outliers > 0) {
      interpretation += `Foram identificados ${stats.outliers} valores outliers. `;
    }

    if (Math.abs(stats.skewness) > 1) {
      interpretation += `A assimetria de ${stats.skewness} indica distribuição ${stats.skewness > 0 ? 'positivamente' : 'negativamente'} assimétrica.`;
    }

    return interpretation;
  };

  const getDescriptiveRecommendation = (stats: any) => {
    let recommendation = "";
    
    if (stats.outliers > 0) {
      recommendation += "Considere investigar os valores outliers. ";
    }
    
    if (stats.stdDev > stats.mean * 0.5) {
      recommendation += "Alta variabilidade: considere técnicas de normalização. ";
    }
    
    if (Math.abs(stats.skewness) > 1) {
      recommendation += "Para análises paramétricas, considere transformações dos dados.";
    }

    return recommendation || "Dados adequados para análises estatísticas padrão.";
  };

  const getFrequencyInterpretation = (freq: any) => {
    const entropy = -freq.distribution.reduce((sum: number, item: any) => {
      const p = item.percentage / 100;
      return sum + (p * Math.log2(p));
    }, 0);

    let interpretation = `A variável possui ${freq.uniqueValues} valores únicos. `;
    interpretation += `O valor mais frequente é "${freq.mostFrequent.value}" (${freq.mostFrequent.percentage}%). `;
    
    if (freq.uniqueValues === freq.total) {
      interpretation += "Todos os valores são únicos (alta cardinalidade). ";
    } else if (freq.uniqueValues / freq.total < 0.1) {
      interpretation += "Baixa cardinalidade - poucos valores distintos. ";
    }

    interpretation += `Entropia: ${entropy.toFixed(2)} (medida de diversidade).`;

    return interpretation;
  };

  const getFrequencyRecommendation = (freq: any) => {
    if (freq.uniqueValues === freq.total) {
      return "Alta cardinalidade pode indicar variável identificadora. Considere agrupamentos.";
    } else if (freq.uniqueValues < 5) {
      return "Baixa cardinalidade é adequada para análises categóricas e visualizações.";
    } else {
      return "Cardinalidade moderada. Considere análises de segmentação.";
    }
  };

  const getCorrelationInterpretation = (correlations: any) => {
    const strongCorrelations: string[] = [];
    
    Object.keys(correlations).forEach(col1 => {
      Object.keys(correlations[col1]).forEach(col2 => {
        if (col1 !== col2) {
          const corr = Math.abs(correlations[col1][col2]);
          if (corr > 0.7) {
            strongCorrelations.push(`${col1} ↔ ${col2} (${correlations[col1][col2]})`);
          }
        }
      });
    });

    if (strongCorrelations.length > 0) {
      return `Correlações fortes identificadas: ${strongCorrelations.join(', ')}. Correlações > 0.7 indicam relacionamentos lineares significativos.`;
    } else {
      return "Não foram identificadas correlações fortes (> 0.7) entre as variáveis numéricas.";
    }
  };

  const getCorrelationRecommendation = (correlations: any) => {
    const strongCorrelations = Object.keys(correlations).some(col1 =>
      Object.keys(correlations[col1]).some(col2 =>
        col1 !== col2 && Math.abs(correlations[col1][col2]) > 0.7
      )
    );

    if (strongCorrelations) {
      return "Correlações fortes podem indicar multicolinearidade. Considere análise de componentes principais ou seleção de variáveis.";
    } else {
      return "Variáveis apresentam baixa correlação, adequadas para modelos de regressão múltipla.";
    }
  };

  // Auto análise quando dados carregados
  useEffect(() => {
    if (data && autoAnalysis) {
      runAnalysis();
    }
  }, [data, autoAnalysis]);

  const exportResults = () => {
    const resultsText = analysisResults.map(result => 
      `${result.title}\n${result.description}\n${result.interpretation}\n${result.recommendation}\n\n`
    ).join('');

    const blob = new Blob([resultsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analise-dados-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!data) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            🔬 Demonstração de Análise de Dados
          </Typography>
          <Typography variant="body1">
            Carregue seus dados na aba "Upload de Dados" para realizar análises estatísticas personalizadas.
            Enquanto isso, explore as funcionalidades com dados de exemplo.
          </Typography>
        </Alert>
        
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
          📊 Análise Estatística Avançada
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Cabeçalho */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
          🔬 Análise Estatística Profissional
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Análise estatística completa com interpretações automáticas e recomendações especializadas.
        </Typography>

        {!data && (
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>Modo Demonstração:</strong> Carregue seus dados para análises personalizadas.
            </Typography>
          </Alert>
        )}

        {/* Informações do Dataset */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6} sm={3}>
            <Card variant="outlined" sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h6" color="primary">
                {dataset.length}
              </Typography>
              <Typography variant="body2">Registros</Typography>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card variant="outlined" sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h6" color="success.main">
                {numericColumns.length}
              </Typography>
              <Typography variant="body2">Variáveis Numéricas</Typography>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card variant="outlined" sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h6" color="info.main">
                {categoricalColumns.length}
              </Typography>
              <Typography variant="body2">Variáveis Categóricas</Typography>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card variant="outlined" sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h6" color="warning.main">
                {analysisResults.length}
              </Typography>
              <Typography variant="body2">Análises Realizadas</Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Controles */}
        <Card sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={autoAnalysis}
                    onChange={(e) => setAutoAnalysis(e.target.checked)}
                  />
                }
                label="Análise Automática"
              />
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Tipo de Análise</InputLabel>
                <Select
                  value={analysisType}
                  onChange={(e) => setAnalysisType(e.target.value)}
                >
                  <MenuItem value="descriptive">Estatística Descritiva</MenuItem>
                  <MenuItem value="correlation">Análise de Correlação</MenuItem>
                  <MenuItem value="frequency">Análise de Frequência</MenuItem>
                  <MenuItem value="all">Análise Completa</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                startIcon={<PlayArrow />}
                onClick={runAnalysis}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? 'Analisando...' : 'Executar Análise'}
              </Button>
              <Button
                variant="outlined"
                startIcon={<Download />}
                onClick={exportResults}
                disabled={analysisResults.length === 0}
              >
                Exportar Resultados
              </Button>
              <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={() => setAnalysisResults([])}
              >
                Limpar
              </Button>
            </Stack>
          </Box>
        </Card>
      </Box>

      {/* Progresso da Análise */}
      {isAnalyzing && (
        <Card sx={{ mb: 3, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            🔄 Processando Análise Estatística...
          </Typography>
          <LinearProgress sx={{ mb: 2 }} />
          <Typography variant="body2" color="text.secondary">
            Executando análises estatísticas avançadas. Isso pode levar alguns segundos.
          </Typography>
        </Card>
      )}

      {/* Resultados das Análises */}
      {analysisResults.length > 0 && (
        <Grid container spacing={3}>
          {analysisResults.map((result, index) => (
            <Grid item xs={12} key={index}>
              <Accordion defaultExpanded={index === 0}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {result.type === 'descriptive' && <Calculate color="primary" />}
                    {result.type === 'frequency' && <TableChart color="secondary" />}
                    {result.type === 'correlation' && <CompareArrows color="success" />}
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {result.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {result.description}
                      </Typography>
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3}>
                    {/* Valores/Resultados */}
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                        📊 Resultados
                      </Typography>
                      {result.type === 'descriptive' && (
                        <TableContainer component={Paper} variant="outlined">
                          <Table size="small">
                            <TableBody>
                              {Object.entries(result.value).map(([key, value]) => (
                                <TableRow key={key}>
                                  <TableCell sx={{ fontWeight: 500 }}>
                                    {key === 'count' ? 'Contagem' :
                                     key === 'mean' ? 'Média' :
                                     key === 'median' ? 'Mediana' :
                                     key === 'mode' ? 'Moda' :
                                     key === 'stdDev' ? 'Desvio Padrão' :
                                     key === 'variance' ? 'Variância' :
                                     key === 'min' ? 'Mínimo' :
                                     key === 'max' ? 'Máximo' :
                                     key === 'range' ? 'Amplitude' :
                                     key === 'q1' ? 'Q1 (25%)' :
                                     key === 'q3' ? 'Q3 (75%)' :
                                     key === 'iqr' ? 'IQR' :
                                     key === 'outliers' ? 'Outliers' :
                                     key === 'skewness' ? 'Assimetria' :
                                     key === 'kurtosis' ? 'Curtose' : key}
                                  </TableCell>
                                  <TableCell>
                                    {typeof value === 'number' ? value.toLocaleString() : String(value)}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      )}
                      
                      {result.type === 'frequency' && (
                        <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 300 }}>
                          <Table size="small">
                            <TableBody>
                              {result.value.distribution.slice(0, 10).map((item: any, idx: number) => (
                                <TableRow key={idx}>
                                  <TableCell>{item.value}</TableCell>
                                  <TableCell>{item.count}</TableCell>
                                  <TableCell>{item.percentage}%</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      )}

                      {result.type === 'correlation' && (
                        <TableContainer component={Paper} variant="outlined">
                          <Table size="small">
                            <TableBody>
                              {Object.entries(result.value).map(([col1, correlations]: [string, any]) => (
                                Object.entries(correlations).map(([col2, corrValue]) => {
                                  const corr = Number(corrValue);
                                  return col1 !== col2 && (
                                    <TableRow key={`${col1}-${col2}`}>
                                      <TableCell>{col1} ↔ {col2}</TableCell>
                                      <TableCell>
                                        <Chip 
                                          label={corr.toFixed(3)} 
                                          color={Math.abs(corr) > 0.7 ? 'error' : Math.abs(corr) > 0.5 ? 'warning' : 'default'}
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

                    {/* Interpretações */}
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                        🧠 Interpretação
                      </Typography>
                      <Alert severity="info" sx={{ mb: 2 }}>
                        <Typography variant="body2">
                          {result.interpretation}
                        </Typography>
                      </Alert>
                      
                      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                        💡 Recomendação
                      </Typography>
                      <Alert severity="success">
                        <Typography variant="body2">
                          {result.recommendation}
                        </Typography>
                      </Alert>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Resumo Geral */}
      {analysisResults.length > 0 && (
        <Card sx={{ mt: 4, p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Insights />
            Resumo Geral da Análise
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Análise Concluída:</strong> {analysisResults.length} análises realizadas com sucesso.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Dataset:</strong> {dataset.length} registros, {numericColumns.length} variáveis numéricas, {categoricalColumns.length} variáveis categóricas.
          </Typography>
          <Typography variant="body1">
            <strong>Próximos Passos:</strong> Explore as visualizações na próxima aba e considere as recomendações específicas de cada análise.
          </Typography>
        </Card>
      )}
    </Box>
  );
};

export default DataAnalysisPro;
