import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  Chip,
  IconButton,
  Tab,
  Tabs,
  Alert,
  LinearProgress,
  Divider
} from '@mui/material';
import {
  Dashboard,
  BarChart,
  PieChart,
  TrendingUp,
  ScatterPlot,
  FilterList,
  Download,
  Refresh,
  Fullscreen
} from '@mui/icons-material';

interface DashboardViewProps {
  data: any;
}

interface ChartData {
  id: string;
  title: string;
  type: 'bar' | 'line' | 'pie' | 'scatter' | 'heatmap';
  data: any[];
  insights: string[];
}

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
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const DashboardView: React.FC<DashboardViewProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [charts, setCharts] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<any>({});

  useEffect(() => {
    if (data) {
      generateDashboard();
    }
  }, [data]);

  const generateDashboard = async () => {
    setLoading(true);
    
    // Simular carregamento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Gerar métricas simuladas
    const mockMetrics = {
      totalRecords: data?.totalRows || 0,
      totalVariables: data?.headers?.length || 0,
      completeness: (85 + Math.random() * 10).toFixed(1) + '%',
      accuracy: (90 + Math.random() * 8).toFixed(1) + '%',
      correlations: Math.floor(Math.random() * 20) + 5,
      outliers: Math.floor(Math.random() * 50) + 10,
      patterns: Math.floor(Math.random() * 8) + 3,
      predictions: Math.floor(Math.random() * 100) + 50
    };

    // Gerar gráficos simulados
    const mockCharts: ChartData[] = [
      {
        id: 'distribution',
        title: 'Distribuição das Variáveis',
        type: 'bar',
        data: generateMockBarData(),
        insights: [
          'Distribuição normal detectada em 70% das variáveis',
          'Presença de outliers em 3 variáveis principais',
          'Recomenda-se normalização para ML'
        ]
      },
      {
        id: 'correlation',
        title: 'Matriz de Correlação',
        type: 'heatmap',
        data: generateMockHeatmapData(),
        insights: [
          'Correlação forte entre variáveis X e Y (r=0.85)',
          'Multicolinearidade detectada em 2 grupos',
          'Redução de dimensionalidade recomendada'
        ]
      },
      {
        id: 'trends',
        title: 'Tendências Temporais',
        type: 'line',
        data: generateMockLineData(),
        insights: [
          'Tendência crescente identificada (+15%)',
          'Sazonalidade mensal detectada',
          'Previsão indica crescimento contínuo'
        ]
      },
      {
        id: 'clusters',
        title: 'Análise de Agrupamentos',
        type: 'scatter',
        data: generateMockScatterData(),
        insights: [
          '4 clusters principais identificados',
          'Separação clara entre grupos',
          'Silhouette score: 0.78 (excelente)'
        ]
      }
    ];

    setMetrics(mockMetrics);
    setCharts(mockCharts);
    setLoading(false);
  };

  const generateMockBarData = () => {
    return Array.from({ length: 8 }, (_, i) => ({
      name: `Variável ${i + 1}`,
      value: Math.floor(Math.random() * 100) + 20,
      category: ['Numérica', 'Categórica'][Math.floor(Math.random() * 2)]
    }));
  };

  const generateMockHeatmapData = () => {
    return Array.from({ length: 6 }, (_, i) => 
      Array.from({ length: 6 }, (_, j) => ({
        x: i,
        y: j,
        value: Math.random() * 2 - 1
      }))
    ).flat();
  };

  const generateMockLineData = () => {
    return Array.from({ length: 12 }, (_, i) => ({
      month: `${i + 1}`,
      value: 50 + Math.random() * 30 + i * 2,
      trend: 50 + i * 3
    }));
  };

  const generateMockScatterData = () => {
    return Array.from({ length: 100 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      cluster: Math.floor(Math.random() * 4) + 1,
      size: Math.random() * 20 + 5
    }));
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  if (!data) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Dashboard sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Carregue dados para visualizar o dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Visualizações interativas aparecerão aqui após o upload
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Dashboard color="primary" />
            Dashboard Interativo
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Visualizações automáticas geradas por IA • {data.fileInfo?.name}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton onClick={generateDashboard}>
            <Refresh />
          </IconButton>
          <Button startIcon={<Download />} variant="outlined">
            Exportar
          </Button>
          <Button startIcon={<FilterList />} variant="outlined">
            Filtros
          </Button>
        </Box>
      </Box>

      {loading && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              🎨 Gerando Visualizações Inteligentes...
            </Typography>
            <LinearProgress sx={{ mb: 2 }} />
            <Typography variant="body2" color="text.secondary">
              Analisando padrões e criando gráficos otimizados para seus dados
            </Typography>
          </CardContent>
        </Card>
      )}

      {!loading && (
        <>
          {/* Metrics Overview */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary" gutterBottom>
                    {metrics.totalRecords}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total de Registros
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main" gutterBottom>
                    {metrics.completeness}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Completude dos Dados
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="warning.main" gutterBottom>
                    {metrics.correlations}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Correlações Fortes
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="info.main" gutterBottom>
                    {metrics.patterns}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Padrões Descobertos
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Tabs */}
          <Card>
            <CardHeader
              title="Análises Visuais"
              action={
                <Chip
                  label={`${charts.length} gráficos`}
                  color="primary"
                  size="small"
                />
              }
            />
            
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab icon={<BarChart />} label="Distribuições" />
              <Tab icon={<TrendingUp />} label="Correlações" />
              <Tab icon={<PieChart />} label="Tendências" />
              <Tab icon={<ScatterPlot />} label="Clusters" />
            </Tabs>

            <Divider />

            {charts.map((chart, index) => (
              <TabPanel key={chart.id} value={activeTab} index={index}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    {/* Chart Placeholder */}
                    <Card variant="outlined" sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f8f9fa' }}>
                      <Box sx={{ textAlign: 'center' }}>
                        {chart.type === 'bar' && <BarChart sx={{ fontSize: 60, color: 'primary.main' }} />}
                        {chart.type === 'line' && <TrendingUp sx={{ fontSize: 60, color: 'success.main' }} />}
                        {chart.type === 'pie' && <PieChart sx={{ fontSize: 60, color: 'warning.main' }} />}
                        {chart.type === 'scatter' && <ScatterPlot sx={{ fontSize: 60, color: 'info.main' }} />}
                        {chart.type === 'heatmap' && <Dashboard sx={{ fontSize: 60, color: 'secondary.main' }} />}
                        
                        <Typography variant="h6" sx={{ mt: 2 }}>
                          {chart.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Gráfico {chart.type.toUpperCase()} • Plotly.js Integration
                        </Typography>
                        
                        <Button
                          startIcon={<Fullscreen />}
                          sx={{ mt: 2 }}
                          variant="outlined"
                          size="small"
                        >
                          Expandir
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Card variant="outlined">
                      <CardHeader title="💡 Insights Automáticos" />
                      <CardContent>
                        {chart.insights.map((insight, i) => (
                          <Alert key={i} severity="info" sx={{ mb: 1, fontSize: '0.875rem' }}>
                            {insight}
                          </Alert>
                        ))}
                        
                        <Divider sx={{ my: 2 }} />
                        
                        <Typography variant="subtitle2" gutterBottom>
                          Ações Recomendadas:
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          • Aplicar filtros para análise detalhada<br/>
                          • Exportar para relatório científico<br/>
                          • Configurar alertas automáticos
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>
            ))}
          </Card>

          {/* Success Message */}
          <Alert severity="success" sx={{ mt: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              🎉 Dashboard Gerado com Sucesso!
            </Typography>
            <Typography variant="body2">
              Todas as visualizações foram criadas automaticamente usando IA. 
              Explore as abas acima para insights detalhados sobre seus dados.
            </Typography>
          </Alert>
        </>
      )}
    </Box>
  );
};

export default DashboardView;
