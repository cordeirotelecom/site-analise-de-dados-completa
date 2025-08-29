import { useState } from 'react';
import {
  Box,
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
  Paper,
  Tooltip
} from '@mui/material';
import { Download, Settings, Refresh } from '@mui/icons-material';

interface DashboardViewProps {
  data: any;
}

const DashboardView: React.FC<DashboardViewProps> = ({ data }) => {
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
    professional: ['#1a237e', '#1565c0', '#263238', '#90caf9', '#e3eafc'],
    vibrant: ['#1976d2', '#388e3c', '#fbc02d', '#d32f2f', '#7b1fa2'],
    nature: ['#388e3c', '#689f38', '#afb42b', '#fbc02d', '#8d6e63'],
    ocean: ['#01579b', '#0288d1', '#26c6da', '#80cbc4', '#b2ebf2'],
    sunset: ['#ff7043', '#ffa726', '#ffd54f', '#8d6e63', '#6d4c41'],
  };

  const currentColors = colorSchemes[colorScheme as keyof typeof colorSchemes] || colorSchemes.professional;

  // Preparar dados para diferentes tipos de gráfico
  const prepareChartData = () => {
    if (!dataset || dataset.length === 0) return null;

    return {
      labels: dataset.map((item: any) => item.categoria || item.name || Object.values(item)[0]),
      data: dataset.map((item: any) => item.total || item.value || Object.values(item)[1]),
      colors: currentColors
    };
  };

  const chartData = prepareChartData();

  // Renderizar gráfico baseado no tipo - versão simples sem Chart.js
  const renderChart = () => {
    if (!chartData) return null;

    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          📊 Visualização - {currentData.files?.[currentDataset]?.name || 'Dados de Exemplo'}
        </Typography>
        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body2">
            Gráfico do tipo: <strong>{chartType}</strong>
          </Typography>
          <Typography variant="body2">
            Use a aba "Visualizações" para gráficos interativos completos.
          </Typography>
        </Alert>
        
        {/* Tabela de dados simples */}
        <TableContainer component={Paper} sx={{ mt: 3, maxHeight: 300 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell align="right">Valor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataset.slice(0, 5).map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item.categoria || item.name || `Item ${index + 1}`}</TableCell>
                  <TableCell align="right">
                    {(item.total || item.value || Object.values(item)[1] || 0).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

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

  const exportChart = () => {
    alert('Exportação de gráficos estará disponível em breve.');
  };

  if (!data) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            🎯 Demonstração de Visualizações
          </Typography>
          <Typography variant="body1">
            Carregue seus dados na aba "Upload de Dados" para visualizar gráficos personalizados.
            Enquanto isso, explore as funcionalidades com dados de exemplo.
          </Typography>
        </Alert>
        
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
          📊 Dashboard de Visualizações
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 1, md: 4 }, background: '#f5f7fa', minHeight: '100vh' }}>
      {/* Cabeçalho */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 800, color: '#1a237e', letterSpacing: 0.5 }}>
          Dashboard de Visualizações
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, fontSize: 17 }}>
          Visualize e explore seus dados de forma profissional. Personalize as opções para obter insights claros e objetivos.
        </Typography>
        {stats && (
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6} sm={3}>
              <Card elevation={2} sx={{ textAlign: 'center', py: 2, borderRadius: 2, boxShadow: '0 2px 8px #1a237e11' }}>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>{stats.count}</Typography>
                <Typography variant="body2" sx={{ color: '#607d8b' }}>Registros</Typography>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card elevation={2} sx={{ textAlign: 'center', py: 2, borderRadius: 2, boxShadow: '0 2px 8px #1a237e11' }}>
                <Typography variant="h6" color="success.main" sx={{ fontWeight: 700 }}>{stats.sum.toLocaleString()}</Typography>
                <Typography variant="body2" sx={{ color: '#607d8b' }}>Total</Typography>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card elevation={2} sx={{ textAlign: 'center', py: 2, borderRadius: 2, boxShadow: '0 2px 8px #1a237e11' }}>
                <Typography variant="h6" color="info.main" sx={{ fontWeight: 700 }}>{stats.avg.toFixed(1)}</Typography>
                <Typography variant="body2" sx={{ color: '#607d8b' }}>Média</Typography>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card elevation={2} sx={{ textAlign: 'center', py: 2, borderRadius: 2, boxShadow: '0 2px 8px #1a237e11' }}>
                <Typography variant="h6" color="warning.main" sx={{ fontWeight: 700 }}>{stats.max}</Typography>
                <Typography variant="body2" sx={{ color: '#607d8b' }}>Máximo</Typography>
              </Card>
            </Grid>
          </Grid>
        )}
      </Box>

      <Grid container spacing={3}>
        {/* Controles */}
        <Grid item xs={12} lg={3}>
          <Card elevation={3} sx={{ p: 3, borderRadius: 3, background: '#fff', boxShadow: '0 2px 16px #1a237e0a', minWidth: 260 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1a237e', mb: 2 }}>
              <Settings sx={{ mr: 1, color: '#1976d2' }} fontSize="small" /> Configurações
            </Typography>
            {/* Seletor de Dataset */}
            {currentData.files && currentData.files.length > 1 && (
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Dataset</InputLabel>
                <Select
                  value={currentDataset}
                  onChange={(e) => setCurrentDataset(Number(e.target.value))}
                  size="small"
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
            <Typography variant="subtitle2" gutterBottom sx={{ mt: 2, fontWeight: 600, color: '#263238' }}>
              Tipo de Gráfico
            </Typography>
            <ButtonGroup variant="outlined" fullWidth sx={{ mb: 2, flexWrap: 'wrap' }}>
              <Tooltip title="Gráfico de Barras" arrow>
                <Button
                  onClick={() => setChartType('bar')}
                  variant={chartType === 'bar' ? 'contained' : 'outlined'}
                  sx={{ flex: 1, minWidth: '45%', fontWeight: 600 }}
                >
                  Barras
                </Button>
              </Tooltip>
              <Tooltip title="Gráfico de Linha" arrow>
                <Button
                  onClick={() => setChartType('line')}
                  variant={chartType === 'line' ? 'contained' : 'outlined'}
                  sx={{ flex: 1, minWidth: '45%', fontWeight: 600 }}
                >
                  Linha
                </Button>
              </Tooltip>
            </ButtonGroup>
            <ButtonGroup variant="outlined" fullWidth sx={{ mb: 2, flexWrap: 'wrap' }}>
              <Tooltip title="Multi-Barras" arrow>
                <Button
                  onClick={() => setChartType('multibar')}
                  variant={chartType === 'multibar' ? 'contained' : 'outlined'}
                  sx={{ flex: 1, minWidth: '45%', fontWeight: 600 }}
                >
                  Multi-Barras
                </Button>
              </Tooltip>
              <Tooltip title="Pizza" arrow>
                <Button
                  onClick={() => setChartType('pie')}
                  variant={chartType === 'pie' ? 'contained' : 'outlined'}
                  sx={{ flex: 1, minWidth: '45%', fontWeight: 600 }}
                >
                  Pizza
                </Button>
              </Tooltip>
            </ButtonGroup>
            <Tooltip title="Rosquinha" arrow>
              <Button
                onClick={() => setChartType('doughnut')}
                variant={chartType === 'doughnut' ? 'contained' : 'outlined'}
                fullWidth
                sx={{ mb: 2, fontWeight: 600 }}
              >
                Rosquinha
              </Button>
            </Tooltip>
            {/* Esquema de Cores */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Esquema de Cores</InputLabel>
              <Select
                value={colorScheme}
                onChange={(e) => setColorScheme(e.target.value)}
                size="small"
              >
                <MenuItem value="professional">Profissional</MenuItem>
                <MenuItem value="vibrant">Vibrante</MenuItem>
                <MenuItem value="nature">Natureza</MenuItem>
                <MenuItem value="ocean">Oceano</MenuItem>
                <MenuItem value="sunset">Pôr do Sol</MenuItem>
              </Select>
            </FormControl>
            {/* Configurações */}
            <FormControlLabel
              control={
                <Switch
                  checked={showGrid}
                  onChange={(e) => setShowGrid(e.target.checked)}
                  color="primary"
                />
              }
              label="Mostrar Grade"
              sx={{ mb: 2, color: '#263238' }}
            />
            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, color: '#263238' }}>
              Velocidade da Animação: {animationSpeed}ms
            </Typography>
            <Slider
              value={animationSpeed}
              onChange={(_, value) => setAnimationSpeed(value as number)}
              min={0}
              max={2000}
              step={100}
              sx={{ mb: 2, color: '#1976d2' }}
            />
            {/* Ações */}
            <Stack spacing={2}>
              <Button
                variant="contained"
                startIcon={<Download />}
                onClick={exportChart}
                fullWidth
                sx={{ fontWeight: 700, background: '#1976d2', color: '#fff', ':hover': { background: '#1565c0' } }}
              >
                Exportar PNG
              </Button>
              <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={() => window.location.reload()}
                fullWidth
                sx={{ fontWeight: 700 }}
              >
                Atualizar
              </Button>
            </Stack>
          </Card>
        </Grid>
        {/* Área do Gráfico */}
        <Grid item xs={12} lg={9}>
          <Card elevation={3} sx={{ p: 3, minHeight: 500, borderRadius: 3, background: '#fff', boxShadow: '0 2px 16px #1a237e0a' }}>
            <Box sx={{ position: 'relative', height: 450 }}>
              {renderChart()}
            </Box>
          </Card>
          {/* Insights Automáticos */}
          <Card elevation={1} sx={{ mt: 3, p: 3, borderRadius: 3, background: '#f8fafc', boxShadow: '0 1px 4px #1a237e08' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1a237e', mb: 2 }}>
              Insights Automáticos
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Alert severity="info" icon={false} sx={{ borderRadius: 2, fontSize: 15 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1976d2' }}>Análise de Tendência</Typography>
                  <Typography variant="body2" sx={{ color: '#263238' }}>
                    {stats && stats.max > stats.avg * 1.5 
                      ? "Há valores atípicos relevantes nos dados."
                      : "Os dados apresentam distribuição uniforme."
                    }
                  </Typography>
                </Alert>
              </Grid>
              <Grid item xs={12} md={6}>
                <Alert severity="success" icon={false} sx={{ borderRadius: 2, fontSize: 15 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#388e3c' }}>Recomendação</Typography>
                  <Typography variant="body2" sx={{ color: '#263238' }}>
                    {chartType === 'bar' 
                      ? "Considere usar gráfico de linha para tendências."
                      : "Tipo de gráfico adequado para este conjunto de dados."
                    }
                  </Typography>
                </Alert>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardView;
