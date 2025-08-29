import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Alert,
  Slider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  BarChart,
  PieChart,
  ShowChart,
  Analytics,
  Download,
  Settings,
  Refresh,
  Insights,
  TrendingUp,
} from '@mui/icons-material';

interface DashboardViewProps {
  data: any;
}

const DashboardViewSimple: React.FC<DashboardViewProps> = ({ data }) => {
  const [chartType, setChartType] = useState<string>('bar');
  const [colorScheme, setColorScheme] = useState<string>('professional');
  const [showGrid, setShowGrid] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(1000);
  const [currentDataset, setCurrentDataset] = useState(0);

  // Dados de demonstração se não houver dados carregados
  const demoData = {
    files: [{
      name: 'Dados de Exemplo',
      data: [
        { categoria: 'Vendas', q1: 120, q2: 140, q3: 160, q4: 180, total: 600 },
        { categoria: 'Marketing', q1: 80, q2: 90, q3: 100, q4: 110, total: 380 },
        { categoria: 'Suporte', q1: 60, q2: 70, q3: 65, q4: 75, total: 270 },
        { categoria: 'Desenvolvimento', q1: 200, q2: 220, q3: 240, q4: 250, total: 910 },
        { categoria: 'Recursos Humanos', q1: 40, q2: 45, q3: 50, q4: 55, total: 190 },
      ],
      stats: { rows: 5, columns: 6 }
    }]
  };

  const currentData = data || demoData;
  const dataset = currentData.files?.[currentDataset]?.data || demoData.files[0].data;

  // Esquemas de cores profissionais
  const colorSchemes = {
    professional: ['#2563eb', '#0f172a', '#64748b', '#3b82f6', '#1e293b'],
    vibrant: ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6'],
    nature: ['#16a34a', '#84cc16', '#eab308', '#f97316', '#dc2626'],
    ocean: ['#0ea5e9', '#06b6d4', '#14b8a6', '#10b981', '#84cc16'],
    sunset: ['#f59e0b', '#f97316', '#ef4444', '#ec4899', '#8b5cf6'],
  };

  const currentColors = colorSchemes[colorScheme as keyof typeof colorSchemes] || colorSchemes.professional;

  // Estatísticas rápidas
  const getQuickStats = () => {
    if (!dataset || dataset.length === 0) return null;

    const values = dataset.map((item: any) => item.total || item.value || Object.values(item)[1]);
    const sum = values.reduce((a: number, b: number) => a + b, 0);
    const avg = sum / values.length;
    const max = Math.max(...values);
    const min = Math.min(...values);

    return { sum, avg, max, min, count: values.length };
  };

  const stats = getQuickStats();

  // Gráfico de barras simples com CSS
  const renderBarChart = () => {
    if (!dataset || dataset.length === 0) return null;

    const maxValue = Math.max(...dataset.map((item: any) => item.total || item.value || Object.values(item)[1]));

    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom textAlign="center">
          Gráfico de Barras - {currentData.files?.[currentDataset]?.name || 'Dados de Exemplo'}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'end', gap: 2, height: 300, mt: 3 }}>
          {dataset.map((item: any, index: number) => {
            const value = item.total || item.value || Object.values(item)[1];
            const height = (value / maxValue) * 250;
            const color = currentColors[index % currentColors.length];
            
            return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                  gap: 1,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {value}
                </Typography>
                <Box
                  sx={{
                    width: '100%',
                    maxWidth: 60,
                    height: `${height}px`,
                    backgroundColor: color,
                    borderRadius: '4px 4px 0 0',
                    transition: `all ${animationSpeed}ms ease`,
                    '&:hover': {
                      opacity: 0.8,
                      transform: 'scale(1.05)',
                    },
                    animation: `slideUp ${animationSpeed}ms ease`,
                    '@keyframes slideUp': {
                      from: { height: 0 },
                      to: { height: `${height}px` },
                    },
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    textAlign: 'center',
                    transform: 'rotate(-45deg)',
                    whiteSpace: 'nowrap',
                    fontSize: '0.7rem',
                    mt: 1,
                  }}
                >
                  {item.categoria || item.name || `Item ${index + 1}`}
                </Typography>
              </Box>
            );
          })}
        </Box>
        {showGrid && (
          <Box sx={{ borderTop: '1px solid #e0e0e0', mt: 1, pt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Valores em unidades
            </Typography>
          </Box>
        )}
      </Box>
    );
  };

  // Gráfico de linha simples
  const renderLineChart = () => {
    if (!dataset || dataset.length === 0) return null;

    const values = dataset.map((item: any) => item.total || item.value || Object.values(item)[1]);
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);

    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom textAlign="center">
          Gráfico de Linha - {currentData.files?.[currentDataset]?.name || 'Dados de Exemplo'}
        </Typography>
        <Box sx={{ position: 'relative', height: 300, mt: 3 }}>
          <svg width="100%" height="100%" viewBox="0 0 500 250">
            {/* Grade */}
            {showGrid && (
              <g>
                {[0, 1, 2, 3, 4].map(i => (
                  <line
                    key={i}
                    x1="0"
                    y1={i * 50}
                    x2="500"
                    y2={i * 50}
                    stroke="#e0e0e0"
                    strokeWidth="1"
                  />
                ))}
              </g>
            )}
            
            {/* Linha */}
            <polyline
              fill="none"
              stroke={currentColors[0]}
              strokeWidth="3"
              points={values.map((value: number, index: number) => {
                const x = (index / (values.length - 1)) * 450 + 25;
                const y = 250 - ((value - minValue) / (maxValue - minValue)) * 200;
                return `${x},${y}`;
              }).join(' ')}
              style={{
                animation: `drawLine ${animationSpeed}ms ease`,
              }}
            />
            
            {/* Pontos */}
            {values.map((value: number, index: number) => {
              const x = (index / (values.length - 1)) * 450 + 25;
              const y = 250 - ((value - minValue) / (maxValue - minValue)) * 200;
              
              return (
                <g key={index}>
                  <circle
                    cx={x}
                    cy={y}
                    r="6"
                    fill={currentColors[0]}
                    stroke="white"
                    strokeWidth="2"
                  />
                  <text
                    x={x}
                    y={y - 15}
                    textAnchor="middle"
                    fontSize="12"
                    fill="#333"
                  >
                    {value}
                  </text>
                </g>
              );
            })}
          </svg>
        </Box>
      </Box>
    );
  };

  // Gráfico de pizza simples
  const renderPieChart = () => {
    if (!dataset || dataset.length === 0) return null;

    const values = dataset.map((item: any) => item.total || item.value || Object.values(item)[1]);
    const total = values.reduce((a: number, b: number) => a + b, 0);
    let currentAngle = 0;

    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom textAlign="center">
          Gráfico de Pizza - {currentData.files?.[currentDataset]?.name || 'Dados de Exemplo'}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 3 }}>
          <Box sx={{ position: 'relative' }}>
            <svg width="250" height="250" viewBox="0 0 250 250">
              {values.map((value: number, index: number) => {
                const angle = (value / total) * 360;
                const startAngle = currentAngle;
                const endAngle = currentAngle + angle;
                
                const largeArc = angle > 180 ? 1 : 0;
                const x1 = 125 + 100 * Math.cos((startAngle - 90) * Math.PI / 180);
                const y1 = 125 + 100 * Math.sin((startAngle - 90) * Math.PI / 180);
                const x2 = 125 + 100 * Math.cos((endAngle - 90) * Math.PI / 180);
                const y2 = 125 + 100 * Math.sin((endAngle - 90) * Math.PI / 180);
                
                const pathData = [
                  'M', 125, 125,
                  'L', x1, y1,
                  'A', 100, 100, 0, largeArc, 1, x2, y2,
                  'Z'
                ].join(' ');
                
                currentAngle += angle;
                
                return (
                  <path
                    key={index}
                    d={pathData}
                    fill={currentColors[index % currentColors.length]}
                    stroke="white"
                    strokeWidth="2"
                    style={{
                      animation: `fadeIn ${animationSpeed}ms ease ${index * 100}ms both`,
                    }}
                  />
                );
              })}
            </svg>
          </Box>
          
          {/* Legenda */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {dataset.map((item: any, index: number) => {
              const value = item.total || item.value || Object.values(item)[1];
              const percentage = ((value / total) * 100).toFixed(1);
              
              return (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      backgroundColor: currentColors[index % currentColors.length],
                      borderRadius: 1,
                    }}
                  />
                  <Typography variant="body2">
                    {item.categoria || item.name || `Item ${index + 1}`}: {percentage}%
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    );
  };

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return renderLineChart();
      case 'pie':
        return renderPieChart();
      default:
        return renderBarChart();
    }
  };

  const exportChart = () => {
    alert('Funcionalidade de exportação será implementada em breve!');
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Cabeçalho */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
          📊 Dashboard Interativo de Visualizações
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Explore seus dados com gráficos interativos e personalizáveis. Configure cores, tipos e animações.
        </Typography>
        
        {!data && (
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>Modo Demonstração:</strong> Carregue seus dados na aba "Upload" para visualizar seus próprios gráficos.
            </Typography>
          </Alert>
        )}
        
        {stats && (
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6} sm={3}>
              <Card variant="outlined" sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h6" color="primary">
                  {stats.count}
                </Typography>
                <Typography variant="body2">Registros</Typography>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card variant="outlined" sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h6" color="success.main">
                  {stats.sum.toLocaleString()}
                </Typography>
                <Typography variant="body2">Total</Typography>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card variant="outlined" sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h6" color="info.main">
                  {stats.avg.toFixed(1)}
                </Typography>
                <Typography variant="body2">Média</Typography>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card variant="outlined" sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h6" color="warning.main">
                  {stats.max}
                </Typography>
                <Typography variant="body2">Máximo</Typography>
              </Card>
            </Grid>
          </Grid>
        )}
      </Box>

      <Grid container spacing={3}>
        {/* Controles */}
        <Grid item xs={12} lg={3}>
          <Card sx={{ p: 3, height: 'fit-content', position: 'sticky', top: 20 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Settings />
              Configurações do Gráfico
            </Typography>

            {/* Seletor de Dataset */}
            {currentData.files && currentData.files.length > 1 && (
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Dataset</InputLabel>
                <Select
                  value={currentDataset}
                  onChange={(e) => setCurrentDataset(Number(e.target.value))}
                >
                  {currentData.files.map((file: any, index: number) => (
                    <MenuItem key={index} value={index}>
                      {file.name} ({file.stats?.rows} linhas)
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {/* Tipo de Gráfico */}
            <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
              Tipo de Gráfico
            </Typography>
            <ButtonGroup orientation="vertical" fullWidth sx={{ mb: 3 }}>
              <Button
                onClick={() => setChartType('bar')}
                variant={chartType === 'bar' ? 'contained' : 'outlined'}
                startIcon={<BarChart />}
              >
                Barras
              </Button>
              <Button
                onClick={() => setChartType('line')}
                variant={chartType === 'line' ? 'contained' : 'outlined'}
                startIcon={<ShowChart />}
              >
                Linha
              </Button>
              <Button
                onClick={() => setChartType('pie')}
                variant={chartType === 'pie' ? 'contained' : 'outlined'}
                startIcon={<PieChart />}
              >
                Pizza
              </Button>
            </ButtonGroup>

            {/* Esquema de Cores */}
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Esquema de Cores</InputLabel>
              <Select
                value={colorScheme}
                onChange={(e) => setColorScheme(e.target.value)}
              >
                <MenuItem value="professional">🎯 Profissional</MenuItem>
                <MenuItem value="vibrant">🌈 Vibrante</MenuItem>
                <MenuItem value="nature">🌿 Natureza</MenuItem>
                <MenuItem value="ocean">🌊 Oceano</MenuItem>
                <MenuItem value="sunset">🌅 Pôr do Sol</MenuItem>
              </Select>
            </FormControl>

            {/* Configurações */}
            <FormControlLabel
              control={
                <Switch
                  checked={showGrid}
                  onChange={(e) => setShowGrid(e.target.checked)}
                />
              }
              label="Mostrar Grade"
              sx={{ mb: 2 }}
            />

            <Typography variant="subtitle2" gutterBottom>
              Velocidade da Animação: {animationSpeed}ms
            </Typography>
            <Slider
              value={animationSpeed}
              onChange={(_, value) => setAnimationSpeed(value as number)}
              min={0}
              max={2000}
              step={100}
              sx={{ mb: 3 }}
            />

            {/* Ações */}
            <Stack spacing={2}>
              <Button
                variant="outlined"
                startIcon={<Download />}
                onClick={exportChart}
                fullWidth
              >
                Exportar PNG
              </Button>
              <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={() => window.location.reload()}
                fullWidth
              >
                Atualizar
              </Button>
            </Stack>
          </Card>
        </Grid>

        {/* Área do Gráfico */}
        <Grid item xs={12} lg={9}>
          <Card sx={{ minHeight: 500 }}>
            <Box sx={{ position: 'relative' }}>
              {renderChart()}
            </Box>
          </Card>

          {/* Tabela de Dados */}
          <Card sx={{ mt: 3 }}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Analytics />
                Tabela de Dados
              </Typography>
              <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 300 }}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      {Object.keys(dataset[0] || {}).map((key) => (
                        <TableCell key={key} sx={{ fontWeight: 600, backgroundColor: 'grey.100' }}>
                          {key}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataset.map((row: any, index: number) => (
                      <TableRow key={index} sx={{ '&:hover': { backgroundColor: 'grey.50' } }}>
                        {Object.values(row).map((value: any, cellIndex: number) => (
                          <TableCell key={cellIndex}>
                            {typeof value === 'number' ? value.toLocaleString() : String(value)}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Card>

          {/* Insights Automáticos */}
          <Card sx={{ mt: 3, p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Insights />
              Insights Automáticos
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Alert severity="info" icon={<TrendingUp />}>
                  <Typography variant="subtitle2">Análise de Tendência</Typography>
                  <Typography variant="body2">
                    {stats && stats.max > stats.avg * 1.5 
                      ? "Há valores outliers significativos nos dados."
                      : "Os dados apresentam distribuição relativamente uniforme."
                    }
                  </Typography>
                </Alert>
              </Grid>
              <Grid item xs={12} md={6}>
                <Alert severity="success" icon={<Analytics />}>
                  <Typography variant="subtitle2">Recomendação</Typography>
                  <Typography variant="body2">
                    {chartType === 'bar' 
                      ? "Considere usar gráfico de linha para mostrar tendências temporais."
                      : "Bom tipo de gráfico para este conjunto de dados."
                    }
                  </Typography>
                </Alert>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>

      <style>{`
        @keyframes slideUp {
          from { height: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes drawLine {
          from { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
          to { stroke-dasharray: 1000; stroke-dashoffset: 0; }
        }
      `}</style>
    </Box>
  );
};

export default DashboardViewSimple;
