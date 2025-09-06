import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
  TextField,
  Switch,
  FormControlLabel,
  Tooltip,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Badge,
  LinearProgress,
} from '@mui/material';
import {
  ExpandMore,
  FilterList,
  Analytics,
  TrendingUp,
  Assessment,
  PieChart,
  BarChart,
  ShowChart,
  TableChart,
  Download,
  Refresh,
  Info,
  Warning,
  CheckCircle,
  Error,
  Insights,
  Functions,
  Calculate,
  Timeline,
  Speed,
  DataUsage,
  Psychology,
  School,
  LightbulbOutlined,
} from '@mui/icons-material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  ArcElement,
  PointElement,
} from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import AutomatedReport from './AutomatedReport';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  ChartTooltip,
  Legend
);

interface DataAnalysisDashboardProps {
  data: any[];
  analysis: any;
  fileName: string;
}

const DataAnalysisDashboard: React.FC<DataAnalysisDashboardProps> = ({
  data,
  analysis,
  fileName
}) => {
  const [selectedColumn, setSelectedColumn] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterValue, setFilterValue] = useState<string>('');
  const [showOnlyProblems, setShowOnlyProblems] = useState(false);
  const [chartType, setChartType] = useState<string>('bar');
  const [currentView, setCurrentView] = useState<string>('overview');

  // Análises computadas
  const computedAnalysis = useMemo(() => {
    if (!data || data.length === 0) return null;

    const numericColumns = analysis?.columns?.filter((col: any) => 
      col.type === 'numeric' || col.type === 'integer'
    ) || [];
    
    const categoricalColumns = analysis?.columns?.filter((col: any) => 
      col.type === 'text' || col.type === 'categorical'
    ) || [];

    const dateColumns = analysis?.columns?.filter((col: any) => 
      col.type === 'date' || col.type === 'datetime'
    ) || [];

    // Estatísticas descritivas
    const statistics = numericColumns.map((col: any) => {
      const values = data.map(row => row[col.name]).filter(v => 
        v !== null && v !== undefined && !isNaN(Number(v))
      ).map(Number);

      if (values.length === 0) return { name: col.name, error: 'Sem dados numéricos válidos' };

      const sorted = values.sort((a, b) => a - b);
      const sum = values.reduce((a, b) => a + b, 0);
      const mean = sum / values.length;
      const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length;
      const stdDev = Math.sqrt(variance);
      
      return {
        name: col.name,
        count: values.length,
        mean: mean.toFixed(2),
        median: sorted[Math.floor(sorted.length / 2)].toFixed(2),
        min: Math.min(...values).toFixed(2),
        max: Math.max(...values).toFixed(2),
        stdDev: stdDev.toFixed(2),
        q1: sorted[Math.floor(sorted.length * 0.25)].toFixed(2),
        q3: sorted[Math.floor(sorted.length * 0.75)].toFixed(2),
        outliers: values.filter(v => {
          const q1 = sorted[Math.floor(sorted.length * 0.25)];
          const q3 = sorted[Math.floor(sorted.length * 0.75)];
          const iqr = q3 - q1;
          return v < q1 - 1.5 * iqr || v > q3 + 1.5 * iqr;
        }).length
      };
    });

    // Distribuições categóricas
    const categoryDistributions = categoricalColumns.map((col: any) => {
      const values = data.map(row => row[col.name]).filter(v => v !== null && v !== undefined);
      const distribution = values.reduce((acc: any, val: any) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      }, {});

      const sorted = Object.entries(distribution).sort(([,a], [,b]) => (b as number) - (a as number));
      
      return {
        name: col.name,
        totalValues: values.length,
        uniqueValues: Object.keys(distribution).length,
        distribution: Object.fromEntries(sorted),
        top5: sorted.slice(0, 5),
        entropy: calculateEntropy(Object.values(distribution) as number[])
      };
    });

    // Correlações (apenas para colunas numéricas)
    const correlations = calculateCorrelations(data, numericColumns.map((col: any) => col.name));

    // Detecção de anomalias
    const anomalies = detectAnomalies(data, numericColumns.map((col: any) => col.name));

    // Padrões temporais (se existirem colunas de data)
    const temporalPatterns = dateColumns.length > 0 ? 
      analyzeTemporalPatterns(data, dateColumns[0].name) : null;

    return {
      statistics,
      categoryDistributions,
      correlations,
      anomalies,
      temporalPatterns,
      numericColumns,
      categoricalColumns,
      dateColumns
    };
  }, [data, analysis]);

  // Função auxiliar para calcular entropia
  const calculateEntropy = (values: number[]): number => {
    const total = values.reduce((a, b) => a + b, 0);
    if (total === 0) return 0;
    
    return -values.reduce((entropy, count) => {
      if (count === 0) return entropy;
      const probability = count / total;
      return entropy - probability * Math.log2(probability);
    }, 0);
  };

  // Função para calcular correlações
  const calculateCorrelations = (data: any[], numericCols: string[]) => {
    if (numericCols.length < 2) return [];

    const correlations: any[] = [];
    
    for (let i = 0; i < numericCols.length; i++) {
      for (let j = i + 1; j < numericCols.length; j++) {
        const col1 = numericCols[i];
        const col2 = numericCols[j];
        
        const pairs = data.map(row => [
          Number(row[col1]), 
          Number(row[col2])
        ]).filter(([a, b]) => !isNaN(a) && !isNaN(b));

        if (pairs.length < 2) continue;

        const correlation = calculatePearsonCorrelation(pairs);
        correlations.push({
          col1,
          col2,
          correlation: correlation.toFixed(3),
          strength: getCorrelationStrength(Math.abs(correlation)),
          direction: correlation > 0 ? 'Positiva' : 'Negativa'
        });
      }
    }

    return correlations.sort((a, b) => Math.abs(b.correlation) - Math.abs(a.correlation));
  };

  const calculatePearsonCorrelation = (pairs: number[][]): number => {
    const n = pairs.length;
    if (n === 0) return 0;

    const sumX = pairs.reduce((sum, [x]) => sum + x, 0);
    const sumY = pairs.reduce((sum, [, y]) => sum + y, 0);
    const sumXY = pairs.reduce((sum, [x, y]) => sum + x * y, 0);
    const sumX2 = pairs.reduce((sum, [x]) => sum + x * x, 0);
    const sumY2 = pairs.reduce((sum, [, y]) => sum + y * y, 0);

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

    return denominator === 0 ? 0 : numerator / denominator;
  };

  const getCorrelationStrength = (value: number): string => {
    if (value >= 0.7) return 'Forte';
    if (value >= 0.3) return 'Moderada';
    if (value >= 0.1) return 'Fraca';
    return 'Muito Fraca';
  };

  // Detecção de anomalias usando Z-Score
  const detectAnomalies = (data: any[], numericCols: string[]) => {
    const anomalies: any[] = [];

    numericCols.forEach(col => {
      const values = data.map(row => Number(row[col])).filter(v => !isNaN(v));
      if (values.length === 0) return;

      const mean = values.reduce((a, b) => a + b, 0) / values.length;
      const stdDev = Math.sqrt(values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length);

      if (stdDev === 0) return;

      data.forEach((row, index) => {
        const value = Number(row[col]);
        if (isNaN(value)) return;

        const zScore = Math.abs((value - mean) / stdDev);
        if (zScore > 3) { // Z-Score > 3 é considerado anomalia
          anomalies.push({
            row: index + 1,
            column: col,
            value,
            zScore: zScore.toFixed(2),
            type: 'Outlier Estatístico'
          });
        }
      });
    });

    return anomalies;
  };

  // Análise de padrões temporais
  const analyzeTemporalPatterns = (data: any[], dateCol: string) => {
    const dates = data.map(row => new Date(row[dateCol])).filter(d => !isNaN(d.getTime()));
    if (dates.length === 0) return null;

    const sortedDates = dates.sort((a, b) => a.getTime() - b.getTime());
    const timeSpan = sortedDates[sortedDates.length - 1].getTime() - sortedDates[0].getTime();
    const daysDifference = timeSpan / (1000 * 60 * 60 * 24);

    // Distribuição por dia da semana
    const weekdayDistribution = dates.reduce((acc: any, date) => {
      const weekday = date.toLocaleDateString('pt-BR', { weekday: 'long' });
      acc[weekday] = (acc[weekday] || 0) + 1;
      return acc;
    }, {});

    // Distribuição por mês
    const monthDistribution = dates.reduce((acc: any, date) => {
      const month = date.toLocaleDateString('pt-BR', { month: 'long' });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    return {
      totalRecords: dates.length,
      timeSpanDays: Math.floor(daysDifference),
      earliestDate: sortedDates[0].toLocaleDateString('pt-BR'),
      latestDate: sortedDates[sortedDates.length - 1].toLocaleDateString('pt-BR'),
      weekdayDistribution,
      monthDistribution,
      averageRecordsPerDay: (dates.length / daysDifference).toFixed(2)
    };
  };

  // Geração de gráficos
  const generateChartData = (column: string, chartType: string) => {
    if (!computedAnalysis || !selectedColumn) return null;

    const colAnalysis = analysis?.columns?.find((col: any) => col.name === column);
    if (!colAnalysis) return null;

    if (colAnalysis.type === 'numeric' || colAnalysis.type === 'integer') {
      // Histograma para dados numéricos
      const values = data.map(row => Number(row[column])).filter(v => !isNaN(v));
      const min = Math.min(...values);
      const max = Math.max(...values);
      const binCount = Math.min(20, Math.max(5, Math.sqrt(values.length)));
      const binSize = (max - min) / binCount;
      
      const bins = Array.from({ length: binCount }, (_, i) => ({
        range: `${(min + i * binSize).toFixed(1)}-${(min + (i + 1) * binSize).toFixed(1)}`,
        count: 0
      }));

      values.forEach(value => {
        const binIndex = Math.min(Math.floor((value - min) / binSize), binCount - 1);
        bins[binIndex].count++;
      });

      return {
        labels: bins.map(b => b.range),
        datasets: [{
          label: `Distribuição de ${column}`,
          data: bins.map(b => b.count),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      };
    } else {
      // Gráfico de barras para dados categóricos
      const distribution = computedAnalysis.categoryDistributions.find(d => d.name === column);
      if (!distribution) return null;

      const entries = Object.entries(distribution.distribution).slice(0, 10);
      
      return {
        labels: entries.map(([key]) => key),
        datasets: [{
          label: `Distribuição de ${column}`,
          data: entries.map(([, value]) => value),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 205, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(199, 199, 199, 0.6)',
            'rgba(83, 102, 255, 0.6)',
            'rgba(255, 99, 255, 0.6)',
            'rgba(99, 255, 132, 0.6)'
          ],
          borderWidth: 1
        }]
      };
    }
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Análise de ${selectedColumn || 'Dados'}`
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const renderOverview = () => (
    <Grid container spacing={3}>
      {/* Cards de Resumo */}
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="primary">
              {data?.length?.toLocaleString() || 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total de Registros
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="secondary">
              {analysis?.totalColumns || 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Colunas
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="success.main">
              {analysis?.dataQuality || 0}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Qualidade dos Dados
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="warning.main">
              {computedAnalysis?.anomalies?.length || 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Anomalias Detectadas
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Distribuição de Tipos de Dados */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <DataUsage color="primary" />
              Tipos de Dados
            </Typography>
            
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <Functions color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Numéricos" 
                  secondary={`${computedAnalysis?.numericColumns?.length || 0} colunas`}
                />
                <Chip label={computedAnalysis?.numericColumns?.length || 0} color="primary" size="small" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <TableChart color="secondary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Categóricos" 
                  secondary={`${computedAnalysis?.categoricalColumns?.length || 0} colunas`}
                />
                <Chip label={computedAnalysis?.categoricalColumns?.length || 0} color="secondary" size="small" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Timeline color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Data/Tempo" 
                  secondary={`${computedAnalysis?.dateColumns?.length || 0} colunas`}
                />
                <Chip label={computedAnalysis?.dateColumns?.length || 0} color="success" size="small" />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>

      {/* Resumo de Qualidade */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Speed color="primary" />
              Qualidade dos Dados
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Score Geral de Qualidade
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={analysis?.dataQuality || 0} 
                sx={{ mt: 1, height: 8, borderRadius: 4 }}
              />
              <Typography variant="caption" color="text.secondary">
                {analysis?.dataQuality || 0}% - {
                  (analysis?.dataQuality || 0) >= 80 ? 'Excelente' :
                  (analysis?.dataQuality || 0) >= 60 ? 'Boa' :
                  (analysis?.dataQuality || 0) >= 40 ? 'Regular' : 'Ruim'
                }
              </Typography>
            </Box>

            {analysis?.suggestedActions?.length > 0 && (
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="caption">
                  <strong>Ações Recomendadas:</strong> {analysis.suggestedActions.length} melhorias identificadas
                </Typography>
              </Alert>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Padrões Temporais */}
      {computedAnalysis?.temporalPatterns && (
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Timeline color="primary" />
                Análise Temporal
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="primary">
                    Período dos Dados
                  </Typography>
                  <Typography variant="body2">
                    De {computedAnalysis.temporalPatterns.earliestDate} até {computedAnalysis.temporalPatterns.latestDate}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {computedAnalysis.temporalPatterns.timeSpanDays} dias de dados
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="primary">
                    Frequência
                  </Typography>
                  <Typography variant="body2">
                    {computedAnalysis.temporalPatterns.averageRecordsPerDay} registros/dia
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="primary">
                    Total de Registros
                  </Typography>
                  <Typography variant="body2">
                    {computedAnalysis.temporalPatterns.totalRecords.toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  );

  const renderStatistics = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Calculate color="primary" />
          Estatísticas Descritivas
        </Typography>
      </Grid>

      {computedAnalysis?.statistics?.map((stat: any, index: number) => (
        <Grid item xs={12} key={index}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                {stat.name}
              </Typography>
              
              {stat.error ? (
                <Alert severity="warning">
                  {stat.error}
                </Alert>
              ) : (
                <Grid container spacing={2}>
                  <Grid item xs={6} md={2}>
                    <Typography variant="caption" color="text.secondary">
                      Contagem
                    </Typography>
                    <Typography variant="h6">
                      {stat.count}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={2}>
                    <Typography variant="caption" color="text.secondary">
                      Média
                    </Typography>
                    <Typography variant="h6">
                      {stat.mean}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={2}>
                    <Typography variant="caption" color="text.secondary">
                      Mediana
                    </Typography>
                    <Typography variant="h6">
                      {stat.median}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={2}>
                    <Typography variant="caption" color="text.secondary">
                      Desvio Padrão
                    </Typography>
                    <Typography variant="h6">
                      {stat.stdDev}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={2}>
                    <Typography variant="caption" color="text.secondary">
                      Min - Max
                    </Typography>
                    <Typography variant="h6">
                      {stat.min} - {stat.max}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={2}>
                    <Typography variant="caption" color="text.secondary">
                      Outliers
                    </Typography>
                    <Typography variant="h6" color={stat.outliers > 0 ? 'warning.main' : 'success.main'}>
                      {stat.outliers}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography variant="caption" color="text.secondary">
                      Quartis: Q1={stat.q1}, Q3={stat.q3}
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const renderCorrelations = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TrendingUp color="primary" />
          Análise de Correlações
        </Typography>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>Como interpretar:</strong> Correlações próximas de +1 indicam relação positiva forte, 
            próximas de -1 indicam relação negativa forte, e próximas de 0 indicam pouca ou nenhuma relação linear.
          </Typography>
        </Alert>
      </Grid>

      {computedAnalysis?.correlations?.length === 0 ? (
        <Grid item xs={12}>
          <Alert severity="warning">
            Não há correlações para calcular. São necessárias pelo menos 2 colunas numéricas.
          </Alert>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Variável 1</TableCell>
                  <TableCell>Variável 2</TableCell>
                  <TableCell align="center">Correlação</TableCell>
                  <TableCell align="center">Força</TableCell>
                  <TableCell align="center">Direção</TableCell>
                  <TableCell align="center">Interpretação</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {computedAnalysis?.correlations?.map((corr: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{corr.col1}</TableCell>
                    <TableCell>{corr.col2}</TableCell>
                    <TableCell align="center">
                      <Chip 
                        label={corr.correlation}
                        color={
                          Math.abs(corr.correlation) >= 0.7 ? 'error' :
                          Math.abs(corr.correlation) >= 0.3 ? 'warning' : 'default'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">{corr.strength}</TableCell>
                    <TableCell align="center">
                      <Chip 
                        label={corr.direction}
                        color={corr.direction === 'Positiva' ? 'success' : 'info'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title={getCorrelationInterpretation(corr.correlation, corr.col1, corr.col2)}>
                        <IconButton size="small">
                          <Info fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
    </Grid>
  );

  const getCorrelationInterpretation = (correlation: number, col1: string, col2: string): string => {
    const absCorr = Math.abs(correlation);
    const direction = correlation > 0 ? 'aumenta' : 'diminui';
    
    if (absCorr >= 0.7) {
      return `Relação muito forte: quando ${col1} aumenta, ${col2} ${direction} significativamente.`;
    } else if (absCorr >= 0.3) {
      return `Relação moderada: existe uma tendência de ${col2} ${direction === 'aumenta' ? 'aumentar' : 'diminuir'} quando ${col1} aumenta.`;
    } else {
      return `Relação fraca: pouca ou nenhuma relação linear entre ${col1} e ${col2}.`;
    }
  };

  const renderAnomalies = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Warning color="warning" />
          Detecção de Anomalias
        </Typography>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>Método Z-Score:</strong> Valores com Z-Score &gt; 3 são considerados anomalias estatísticas. 
            Isso significa que estão a mais de 3 desvios padrão da média.
          </Typography>
        </Alert>
      </Grid>

      {computedAnalysis?.anomalies?.length === 0 ? (
        <Grid item xs={12}>
          <Alert severity="success">
            <Typography variant="body2">
              ✅ Nenhuma anomalia estatística detectada nos dados!
            </Typography>
          </Alert>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Linha</TableCell>
                  <TableCell>Coluna</TableCell>
                  <TableCell align="right">Valor</TableCell>
                  <TableCell align="center">Z-Score</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell align="center">Ação Recomendada</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {computedAnalysis?.anomalies?.map((anomaly: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{anomaly.row}</TableCell>
                    <TableCell>{anomaly.column}</TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" color="error">
                        {anomaly.value}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip 
                        label={anomaly.zScore}
                        color="error"
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{anomaly.type}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Investigar se é erro de digitação ou valor legítimo">
                        <IconButton size="small" color="warning">
                          <Psychology fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
    </Grid>
  );

  const renderVisualizations = () => {
    const chartData = selectedColumn ? generateChartData(selectedColumn, chartType) : null;

    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BarChart color="primary" />
            Visualizações Interativas
          </Typography>
        </Grid>

        {/* Controles */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Selecionar Coluna</InputLabel>
            <Select
              value={selectedColumn}
              onChange={(e) => setSelectedColumn(e.target.value)}
              label="Selecionar Coluna"
            >
              {analysis?.columns?.map((col: any) => (
                <MenuItem key={col.name} value={col.name}>
                  {col.name} ({col.type})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Tipo de Gráfico</InputLabel>
            <Select
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              label="Tipo de Gráfico"
            >
              <MenuItem value="bar">Barras</MenuItem>
              <MenuItem value="line">Linha</MenuItem>
              <MenuItem value="pie">Pizza</MenuItem>
              <MenuItem value="doughnut">Rosca</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Gráfico */}
        {chartData && selectedColumn && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ height: 400 }}>
                  {chartType === 'bar' && <Bar data={chartData} options={chartOptions} />}
                  {chartType === 'line' && <Line data={chartData} options={chartOptions} />}
                  {chartType === 'pie' && <Pie data={chartData} options={chartOptions} />}
                  {chartType === 'doughnut' && <Doughnut data={chartData} options={chartOptions} />}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}

        {!selectedColumn && (
          <Grid item xs={12}>
            <Alert severity="info">
              Selecione uma coluna para visualizar os dados em gráfico.
            </Alert>
          </Grid>
        )}
      </Grid>
    );
  };

  const renderReport = () => (
    <AutomatedReport
      data={data}
      analysis={analysis}
      fileName={fileName}
    />
  );

  const viewComponents = {
    overview: renderOverview,
    statistics: renderStatistics,
    correlations: renderCorrelations,
    anomalies: renderAnomalies,
    visualizations: renderVisualizations,
    report: renderReport
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Insights color="primary" />
        Dashboard de Análise de Dados
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Análise completa dos dados de <strong>{fileName}</strong> com estatísticas descritivas, 
        correlações, detecção de anomalias e visualizações interativas.
      </Typography>

      {/* Navegação */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={1}>
          {[
            { key: 'overview', label: 'Visão Geral', icon: <Assessment /> },
            { key: 'statistics', label: 'Estatísticas', icon: <Calculate /> },
            { key: 'correlations', label: 'Correlações', icon: <TrendingUp /> },
            { key: 'anomalies', label: 'Anomalias', icon: <Warning /> },
            { key: 'visualizations', label: 'Gráficos', icon: <BarChart /> },
            { key: 'report', label: 'Relatório', icon: <Assessment /> }
          ].map((view) => (
            <Grid item key={view.key}>
              <Button
                variant={currentView === view.key ? 'contained' : 'outlined'}
                startIcon={view.icon}
                onClick={() => setCurrentView(view.key)}
                size="small"
              >
                {view.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Conteúdo */}
      {viewComponents[currentView as keyof typeof viewComponents]()}
    </Box>
  );
};

export default DataAnalysisDashboard;
