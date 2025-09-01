import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  LinearProgress,
  Alert,
  Tab,
  Tabs,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress
} from '@mui/material';
import {
  Psychology,
  TrendingUp,
  Analytics,
  Timeline,
  AutoAwesome,
  DataUsage,
  ModelTraining,
  ExpandMore,
  PlayArrow,
  Stop,
  Settings,
  Download,
  Visibility,
  Info,
  Warning,
  CheckCircle,
  Error as ErrorIcon,
  Speed,
  Memory,
  CloudQueue,
  Storage,
  Architecture,
  Engineering,
  Science,
  Insights,
  Assessment,
  BarChart,
  ShowChart,
  ScatterPlot,
  Functions,
  Calculate,
  DataObject
} from '@mui/icons-material';

interface ModeloIA {
  id: string;
  nome: string;
  tipo: 'regressao' | 'classificacao' | 'clustering' | 'time_series' | 'deep_learning';
  status: 'treinando' | 'pronto' | 'erro' | 'otimizando';
  acuracia: number;
  ultimoTreino: string;
  dataset: string;
  parametros: Record<string, any>;
  predicoes: number;
  confiabilidade: number;
}

interface PredicaoResultado {
  id: string;
  modelo: string;
  entrada: any;
  resultado: any;
  confianca: number;
  tempo: string;
  explicacao: string[];
}

interface MetricasPerformance {
  acuracia: number;
  precisao: number;
  recall: number;
  f1Score: number;
  mse: number;
  mae: number;
  r2: number;
  tempoResposta: string;
}

const AnalisePreditivaIA: React.FC = () => {
  const [tabAtiva, setTabAtiva] = useState(0);
  const [modeloSelecionado, setModeloSelecionado] = useState<string>('');
  const [treinandoModelo, setTreinandoModelo] = useState(false);
  const [progresso, setProgresso] = useState(0);
  const [dialogPredicao, setDialogPredicao] = useState(false);
  const [dialogTreino, setDialogTreino] = useState(false);
  const [resultadosPredicao, setResultadosPredicao] = useState<PredicaoResultado[]>([]);

  const [modelos, setModelos] = useState<ModeloIA[]>([
    {
      id: '1',
      nome: 'Preditor de Vendas Avançado',
      tipo: 'regressao',
      status: 'pronto',
      acuracia: 94.7,
      ultimoTreino: '01/09/2025 14:30',
      dataset: 'vendas_historicas_3anos.csv',
      parametros: {
        algoritmo: 'Random Forest',
        features: 15,
        estimators: 200,
        max_depth: 12
      },
      predicoes: 1247,
      confiabilidade: 96.2
    },
    {
      id: '2',
      nome: 'Classificador de Sentimentos',
      tipo: 'classificacao',
      status: 'pronto',
      acuracia: 91.3,
      ultimoTreino: '01/09/2025 10:15',
      dataset: 'reviews_produtos_50k.csv',
      parametros: {
        algoritmo: 'BERT Fine-tuned',
        layers: 12,
        batch_size: 32,
        learning_rate: 0.00002
      },
      predicoes: 892,
      confiabilidade: 89.7
    },
    {
      id: '3',
      nome: 'Detector de Anomalias',
      tipo: 'clustering',
      status: 'otimizando',
      acuracia: 87.9,
      ultimoTreino: '01/09/2025 16:45',
      dataset: 'logs_sistema_realtime.json',
      parametros: {
        algoritmo: 'Isolation Forest',
        contamination: 0.1,
        n_estimators: 100
      },
      predicoes: 2156,
      confiabilidade: 92.4
    },
    {
      id: '4',
      nome: 'Previsão de Séries Temporais',
      tipo: 'time_series',
      status: 'treinando',
      acuracia: 88.5,
      ultimoTreino: '01/09/2025 18:00',
      dataset: 'dados_temporais_iot.csv',
      parametros: {
        algoritmo: 'LSTM + Attention',
        sequence_length: 60,
        hidden_units: 128,
        layers: 3
      },
      predicoes: 445,
      confiabilidade: 85.1
    },
    {
      id: '5',
      nome: 'Reconhecimento de Padrões',
      tipo: 'deep_learning',
      status: 'pronto',
      acuracia: 96.8,
      ultimoTreino: '31/08/2025 22:30',
      dataset: 'imagens_dataset_100k.zip',
      parametros: {
        algoritmo: 'CNN ResNet-50',
        epochs: 100,
        batch_size: 64,
        optimizer: 'Adam'
      },
      predicoes: 678,
      confiabilidade: 94.9
    }
  ]);

  const predicoesRecentes: PredicaoResultado[] = [
    {
      id: '1',
      modelo: 'Preditor de Vendas Avançado',
      entrada: { produto: 'Notebook', mes: 'Setembro', regiao: 'Sudeste' },
      resultado: { vendas_previstas: 1247, tendencia: 'alta', confianca_intervalo: '1180-1314' },
      confianca: 94.7,
      tempo: '01/09/2025 19:30',
      explicacao: [
        'Sazonalidade favorável para eletrônicos',
        'Histórico positivo na região Sudeste',
        'Tendência de mercado crescente',
        'Baixa concorrência no período'
      ]
    },
    {
      id: '2',
      modelo: 'Classificador de Sentimentos',
      entrada: { texto: 'Produto excelente, recomendo muito!' },
      resultado: { sentimento: 'Positivo', polaridade: 0.87, subjetividade: 0.92 },
      confianca: 91.3,
      tempo: '01/09/2025 19:15',
      explicacao: [
        'Palavras-chave positivas identificadas',
        'Expressão de recomendação forte',
        'Ausência de termos negativos',
        'Padrão linguístico otimista'
      ]
    },
    {
      id: '3',
      modelo: 'Detector de Anomalias',
      entrada: { cpu_usage: 85, memory: 78, disk_io: 120 },
      resultado: { anomalia: true, severidade: 'media', tipo: 'spike_performance' },
      confianca: 87.9,
      tempo: '01/09/2025 19:00',
      explicacao: [
        'Uso de CPU acima do padrão normal',
        'Pico de I/O suspeito',
        'Padrão inconsistente com histórico',
        'Possível sobrecarga do sistema'
      ]
    }
  ];

  const metricas: MetricasPerformance = {
    acuracia: 92.3,
    precisao: 89.7,
    recall: 91.4,
    f1Score: 90.5,
    mse: 0.0234,
    mae: 0.1567,
    r2: 0.943,
    tempoResposta: '45ms'
  };

  const treinarModelo = async (modeloId: string) => {
    setTreinandoModelo(true);
    setProgresso(0);

    const etapas = [
      'Carregando dataset...',
      'Pré-processando dados...',
      'Dividindo treino/teste...',
      'Treinando modelo...',
      'Validando performance...',
      'Otimizando hiperparâmetros...',
      'Salvando modelo...'
    ];

    for (let i = 0; i <= 100; i += 14) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgresso(Math.min(i, 100));
    }

    setTreinandoModelo(false);
    setDialogTreino(false);
  };

  const executarPredicao = async () => {
    const novaPredicao: PredicaoResultado = {
      id: Date.now().toString(),
      modelo: modeloSelecionado,
      entrada: { exemplo: 'dados_entrada' },
      resultado: { previsao: 'resultado_exemplo' },
      confianca: Math.random() * 20 + 80, // 80-100%
      tempo: new Date().toLocaleString('pt-BR'),
      explicacao: [
        'Análise baseada em padrões históricos',
        'Correlações identificadas pela IA',
        'Validação cruzada aplicada'
      ]
    };

    setResultadosPredicao([novaPredicao, ...resultadosPredicao]);
    setDialogPredicao(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pronto': return 'success';
      case 'treinando': return 'info';
      case 'otimizando': return 'warning';
      case 'erro': return 'error';
      default: return 'default';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'regressao': return <TrendingUp />;
      case 'classificacao': return <Assessment />;
      case 'clustering': return <ScatterPlot />;
      case 'time_series': return <Timeline />;
      case 'deep_learning': return <Psychology />;
      default: return <Analytics />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Principal */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ 
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #9c27b0, #e1bee7)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          🧠 Análise Preditiva com IA
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Machine Learning avançado para predições precisas e insights inteligentes
        </Typography>
      </Box>

      {/* Estatísticas Principais */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #9c27b0, #ba68c8)',
            color: 'white',
            minHeight: 120
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <ModelTraining sx={{ mr: 1 }} />
                <Typography variant="h6">Modelos Ativos</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {modelos.filter(m => m.status === 'pronto').length}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                de {modelos.length} total
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #4caf50, #81c784)',
            color: 'white',
            minHeight: 120
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Analytics sx={{ mr: 1 }} />
                <Typography variant="h6">Acurácia Média</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {metricas.acuracia}%
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                F1-Score: {metricas.f1Score}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #2196f3, #64b5f6)',
            color: 'white',
            minHeight: 120
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Timeline sx={{ mr: 1 }} />
                <Typography variant="h6">Predições</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {modelos.reduce((acc, m) => acc + m.predicoes, 0)}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Tempo: {metricas.tempoResposta}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #ff9800, #ffb74d)',
            color: 'white',
            minHeight: 120
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AutoAwesome sx={{ mr: 1 }} />
                <Typography variant="h6">IA Score</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                A+
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Performance Excelente
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs de Navegação */}
      <Card sx={{ mb: 4 }}>
        <Tabs 
          value={tabAtiva} 
          onChange={(e, newValue) => setTabAtiva(newValue)}
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab icon={<ModelTraining />} label="Modelos IA" />
          <Tab icon={<Timeline />} label="Predições" />
          <Tab icon={<Assessment />} label="Performance" />
          <Tab icon={<Settings />} label="Configurações" />
        </Tabs>

        {/* Tab 1: Modelos IA */}
        {tabAtiva === 0 && (
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                🤖 Modelos de Machine Learning
              </Typography>
              <Button
                variant="contained"
                startIcon={<PlayArrow />}
                onClick={() => setDialogTreino(true)}
                sx={{ background: 'linear-gradient(45deg, #9c27b0, #ba68c8)' }}
              >
                Treinar Novo Modelo
              </Button>
            </Box>

            {modelos.map((modelo) => (
              <Accordion key={modelo.id} sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', pr: 2 }}>
                    <Box sx={{ mr: 2 }}>
                      {getTipoIcon(modelo.tipo)}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {modelo.nome}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {modelo.parametros.algoritmo} • {modelo.predicoes} predições • {modelo.dataset}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip 
                        label={`${modelo.acuracia}%`} 
                        color="success"
                        size="small"
                      />
                      <Chip 
                        label={modelo.status.toUpperCase()} 
                        color={getStatusColor(modelo.status) as any}
                        size="small"
                      />
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" gutterBottom>
                        <strong>Algoritmo:</strong> {modelo.parametros.algoritmo}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Último Treino:</strong> {modelo.ultimoTreino}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Confiabilidade:</strong> {modelo.confiabilidade}%
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Dataset:</strong> {modelo.dataset}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" gutterBottom>
                        <strong>Parâmetros:</strong>
                      </Typography>
                      <List dense>
                        {Object.entries(modelo.parametros).slice(1).map(([key, value]) => (
                          <ListItem key={key} sx={{ py: 0 }}>
                            <ListItemText 
                              primary={`${key}: ${value}`}
                              primaryTypographyProps={{ variant: 'caption' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                        <Button 
                          startIcon={<PlayArrow />} 
                          size="small" 
                          variant="outlined"
                          onClick={() => {
                            setModeloSelecionado(modelo.nome);
                            setDialogPredicao(true);
                          }}
                        >
                          Usar Modelo
                        </Button>
                        <Button startIcon={<Settings />} size="small" variant="outlined">
                          Configurar
                        </Button>
                        <Button startIcon={<Download />} size="small" variant="outlined">
                          Exportar
                        </Button>
                        <Button startIcon={<Visibility />} size="small" variant="outlined">
                          Visualizar
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))}

            {treinandoModelo && (
              <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                <Typography variant="body1" gutterBottom>
                  Treinando modelo... {progresso}%
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={progresso}
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(45deg, #9c27b0, #ba68c8)'
                    }
                  }}
                />
              </Box>
            )}
          </CardContent>
        )}

        {/* Tab 2: Predições */}
        {tabAtiva === 1 && (
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                🔮 Predições Recentes
              </Typography>
              <Button
                variant="contained"
                startIcon={<Timeline />}
                onClick={() => setDialogPredicao(true)}
                sx={{ background: 'linear-gradient(45deg, #2196f3, #64b5f6)' }}
              >
                Nova Predição
              </Button>
            </Box>

            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.50' }}>
                    <TableCell><strong>Modelo</strong></TableCell>
                    <TableCell><strong>Entrada</strong></TableCell>
                    <TableCell><strong>Resultado</strong></TableCell>
                    <TableCell><strong>Confiança</strong></TableCell>
                    <TableCell><strong>Data/Hora</strong></TableCell>
                    <TableCell><strong>Ações</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[...resultadosPredicao, ...predicoesRecentes].map((predicao) => (
                    <TableRow key={predicao.id} hover>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {predicao.modelo}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption" component="pre">
                          {JSON.stringify(predicao.entrada, null, 1)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption" component="pre">
                          {JSON.stringify(predicao.resultado, null, 1)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CircularProgress
                            variant="determinate"
                            value={predicao.confianca}
                            size={30}
                            sx={{ mr: 1 }}
                          />
                          <Typography variant="body2">
                            {predicao.confianca.toFixed(1)}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {predicao.tempo}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Ver Explicação">
                          <IconButton size="small">
                            <Info />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        )}

        {/* Tab 3: Performance */}
        {tabAtiva === 2 && (
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
              📊 Métricas de Performance
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Métricas de Classificação</Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Acurácia</Typography>
                        <Typography variant="h4" color="success.main">{metricas.acuracia}%</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Precisão</Typography>
                        <Typography variant="h4" color="primary.main">{metricas.precisao}%</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Recall</Typography>
                        <Typography variant="h4" color="secondary.main">{metricas.recall}%</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">F1-Score</Typography>
                        <Typography variant="h4" color="warning.main">{metricas.f1Score}%</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Métricas de Regressão</Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">R² Score</Typography>
                        <Typography variant="h4" color="success.main">{metricas.r2}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">MSE</Typography>
                        <Typography variant="h4" color="error.main">{metricas.mse}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">MAE</Typography>
                        <Typography variant="h4" color="warning.main">{metricas.mae}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Tempo</Typography>
                        <Typography variant="h4" color="info.main">{metricas.tempoResposta}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Comparativo de Modelos</Typography>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell><strong>Modelo</strong></TableCell>
                            <TableCell><strong>Tipo</strong></TableCell>
                            <TableCell><strong>Acurácia</strong></TableCell>
                            <TableCell><strong>Confiabilidade</strong></TableCell>
                            <TableCell><strong>Predições</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {modelos.map((modelo) => (
                            <TableRow key={modelo.id}>
                              <TableCell>{modelo.nome}</TableCell>
                              <TableCell>
                                <Chip 
                                  label={modelo.tipo.replace('_', ' ').toUpperCase()} 
                                  size="small"
                                  variant="outlined"
                                />
                              </TableCell>
                              <TableCell>
                                <Typography 
                                  color={modelo.acuracia > 90 ? 'success.main' : 'warning.main'}
                                  sx={{ fontWeight: 'bold' }}
                                >
                                  {modelo.acuracia}%
                                </Typography>
                              </TableCell>
                              <TableCell>{modelo.confiabilidade}%</TableCell>
                              <TableCell>{modelo.predicoes}</TableCell>
                              <TableCell>
                                <Chip 
                                  label={modelo.status.toUpperCase()} 
                                  color={getStatusColor(modelo.status) as any}
                                  size="small"
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        )}

        {/* Tab 4: Configurações */}
        {tabAtiva === 3 && (
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
              ⚙️ Configurações de IA
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Configurações Gerais</Typography>
                    <Box sx={{ mb: 2 }}>
                      <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Auto-retreinamento"
                      />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Otimização automática"
                      />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <FormControlLabel
                        control={<Switch />}
                        label="Modo debugging"
                      />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Cache de predições"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Limites e Performance</Typography>
                    <Box sx={{ mb: 3 }}>
                      <Typography gutterBottom>Limite de predições/hora</Typography>
                      <Slider
                        defaultValue={1000}
                        min={100}
                        max={10000}
                        step={100}
                        valueLabelDisplay="auto"
                      />
                    </Box>
                    <Box sx={{ mb: 3 }}>
                      <Typography gutterBottom>Timeout (segundos)</Typography>
                      <Slider
                        defaultValue={30}
                        min={5}
                        max={300}
                        step={5}
                        valueLabelDisplay="auto"
                      />
                    </Box>
                    <Box sx={{ mb: 3 }}>
                      <Typography gutterBottom>Confiança mínima (%)</Typography>
                      <Slider
                        defaultValue={80}
                        min={50}
                        max={99}
                        step={1}
                        valueLabelDisplay="auto"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        )}
      </Card>

      {/* Dialog para Nova Predição */}
      <Dialog open={dialogPredicao} onClose={() => setDialogPredicao(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Timeline sx={{ mr: 1 }} />
            Nova Predição com IA
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Selecionar Modelo</InputLabel>
                <Select
                  value={modeloSelecionado}
                  onChange={(e) => setModeloSelecionado(e.target.value)}
                >
                  {modelos.filter(m => m.status === 'pronto').map(modelo => (
                    <MenuItem key={modelo.id} value={modelo.nome}>
                      {modelo.nome} (Acurácia: {modelo.acuracia}%)
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Dados de Entrada (JSON)"
                placeholder='{"feature1": "valor1", "feature2": "valor2"}'
                helperText="Insira os dados no formato JSON para a predição"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogPredicao(false)}>Cancelar</Button>
          <Button 
            variant="contained" 
            startIcon={<Psychology />}
            onClick={executarPredicao}
          >
            Executar Predição
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para Treinar Modelo */}
      <Dialog open={dialogTreino} onClose={() => setDialogTreino(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ModelTraining sx={{ mr: 1 }} />
            Treinar Novo Modelo
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nome do Modelo"
                placeholder="Ex: Preditor de Vendas Q4"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Modelo</InputLabel>
                <Select defaultValue="">
                  <MenuItem value="regressao">Regressão</MenuItem>
                  <MenuItem value="classificacao">Classificação</MenuItem>
                  <MenuItem value="clustering">Clustering</MenuItem>
                  <MenuItem value="time_series">Séries Temporais</MenuItem>
                  <MenuItem value="deep_learning">Deep Learning</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Dataset"
                placeholder="Caminho para o arquivo de dados"
                helperText="Suporte: CSV, JSON, Parquet, Excel"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Algoritmo</InputLabel>
                <Select defaultValue="">
                  <MenuItem value="random_forest">Random Forest</MenuItem>
                  <MenuItem value="gradient_boosting">Gradient Boosting</MenuItem>
                  <MenuItem value="neural_network">Rede Neural</MenuItem>
                  <MenuItem value="svm">SVM</MenuItem>
                  <MenuItem value="lstm">LSTM</MenuItem>
                  <MenuItem value="bert">BERT</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Cross-Validation Folds"
                defaultValue={5}
                inputProps={{ min: 3, max: 10 }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogTreino(false)}>Cancelar</Button>
          <Button 
            variant="contained" 
            startIcon={<PlayArrow />}
            onClick={() => treinarModelo('novo')}
          >
            Iniciar Treinamento
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AnalisePreditivaIA;
