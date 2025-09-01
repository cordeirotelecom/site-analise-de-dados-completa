import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  LinearProgress,
  Tooltip,
  IconButton,
  Snackbar,
  SelectChangeEvent,
} from '@mui/material';
import {
  Public,
  Download,
  Search,
  FilterList,
  TrendingUp,
  Security,
  School,
  LocalHospital,
  Business,
  LocationCity,
  ExpandMore,
  Analytics,
  Visibility,
  Info,
  Refresh,
  CloudDownload,
  Assessment,
  DataUsage,
  ShowChart,
  TableChart,
  Speed,
  CheckCircle,
  Error,
  Warning,
  Timeline,
  BarChart,
  PieChart,
} from '@mui/icons-material';
import { apiPublicaService, DatasetInfo, ApiResponse } from '../services/ApiPublicaService';

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
      id={`api-tabpanel-${index}`}
      aria-labelledby={`api-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

interface DataPreview {
  columns: string[];
  rows: any[];
  totalRecords: number;
  sampleSize: number;
}

const DadosAbertosAvancado = () => {
  const [tabValue, setTabValue] = useState(0);
  const [datasets, setDatasets] = useState<DatasetInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState<string>('');
  const [dadosCarregados, setDadosCarregados] = useState<any[]>([]);
  const [dataPreview, setDataPreview] = useState<DataPreview | null>(null);
  const [filtroCategoria, setFiltroCategoria] = useState<string>('');
  const [filtroFonte, setFiltroFonte] = useState<string>('');
  const [busca, setBusca] = useState<string>('');
  const [dialogAberto, setDialogAberto] = useState(false);
  const [datasetDetalhes, setDatasetDetalhes] = useState<DatasetInfo | null>(null);
  const [progresso, setProgresso] = useState<number>(0);
  const [mensagem, setMensagem] = useState<string>('');
  const [tipoMensagem, setTipoMensagem] = useState<'success' | 'error' | 'warning' | 'info'>('info');
  const [snackbarAberto, setSnackbarAberto] = useState(false);

  // Estados para diferentes APIs
  const [tipoIBGE, setTipoIBGE] = useState<string>('municipios');
  const [tipoDataSUS, setTipoDataSUS] = useState<string>('mortalidade');
  const [tipoINMET, setTipoINMET] = useState<string>('temperatura');
  const [indicadorBacen, setIndicadorBacen] = useState<string>('selic');
  const [tipoTransparencia, setTipoTransparencia] = useState<string>('gastos');

  useEffect(() => {
    carregarDatasetsDisponiveis();
  }, []);

  const carregarDatasetsDisponiveis = async () => {
    setLoading(true);
    try {
      const response = await apiPublicaService.listarDatasetsDisponiveis();
      if (response.success && response.data) {
        setDatasets(response.data);
        mostrarMensagem('Datasets carregados com sucesso!', 'success');
      } else {
        mostrarMensagem('Erro ao carregar datasets: ' + response.message, 'error');
      }
    } catch (error: any) {
      mostrarMensagem('Erro inesperado: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const mostrarMensagem = (msg: string, tipo: 'success' | 'error' | 'warning' | 'info') => {
    setMensagem(msg);
    setTipoMensagem(tipo);
    setSnackbarAberto(true);
  };

  const carregarDadosAPI = async (fonte: string, tipo: string, parametros?: any) => {
    setLoading(true);
    setProgresso(0);
    
    try {
      let response: ApiResponse<any[]>;
      
      // Simular progresso
      const intervalProgresso = setInterval(() => {
        setProgresso(prev => Math.min(prev + 10, 90));
      }, 200);

      switch (fonte) {
        case 'IBGE':
          response = await apiPublicaService.buscarDadosIBGE(tipo as any, parametros);
          break;
        case 'DATASUS':
          response = await apiPublicaService.buscarDadosDataSUS(tipo as any, parametros);
          break;
        case 'INMET':
          response = await apiPublicaService.buscarDadosINMET(tipo as any, parametros?.periodo);
          break;
        case 'Banco Central':
          response = await apiPublicaService.buscarDadosBacen(tipo as any);
          break;
        case 'CNJ':
          response = await apiPublicaService.buscarDadosCNJ(tipo as any);
          break;
        case 'ANEEL':
          response = await apiPublicaService.buscarDadosANEEL(tipo as any);
          break;
        case 'Transparência':
          response = await apiPublicaService.buscarDadosTransparencia(tipo as any);
          break;
        default:
          response = {
            success: false,
            message: 'Fonte não reconhecida'
          };
          break;
      }

      clearInterval(intervalProgresso);
      setProgresso(100);

      if (response.success && response.data) {
        setDadosCarregados(response.data);
        gerarPreviewDados(response.data);
        mostrarMensagem(response.message || 'Dados carregados com sucesso!', 'success');
      } else {
        mostrarMensagem(response.message || 'Erro ao carregar dados', 'error');
      }
    } catch (error: any) {
      mostrarMensagem('Erro inesperado: ' + error.message, 'error');
    } finally {
      setLoading(false);
      setTimeout(() => setProgresso(0), 1000);
    }
  };

  const gerarPreviewDados = (dados: any[]) => {
    if (dados.length === 0) {
      setDataPreview(null);
      return;
    }

    const sample = dados.slice(0, 10);
    const columns = Object.keys(dados[0]);
    
    setDataPreview({
      columns,
      rows: sample,
      totalRecords: dados.length,
      sampleSize: sample.length
    });
  };

  const datasetsCategorizados = datasets.reduce((acc, dataset) => {
    if (!acc[dataset.categoria]) {
      acc[dataset.categoria] = [];
    }
    acc[dataset.categoria].push(dataset);
    return acc;
  }, {} as Record<string, DatasetInfo[]>);

  const categorias = Object.keys(datasetsCategorizados);
  const fontes = [...new Set(datasets.map(d => d.fonte))];

  const datasetsFiltrados = datasets.filter(dataset => {
    const matchBusca = !busca || dataset.nome.toLowerCase().includes(busca.toLowerCase()) ||
                      dataset.descricao.toLowerCase().includes(busca.toLowerCase());
    const matchCategoria = !filtroCategoria || dataset.categoria === filtroCategoria;
    const matchFonte = !filtroFonte || dataset.fonte === filtroFonte;
    
    return matchBusca && matchCategoria && matchFonte;
  });

  const exportarDados = (formato: 'csv' | 'json' | 'excel') => {
    if (dadosCarregados.length === 0) {
      mostrarMensagem('Nenhum dado para exportar', 'warning');
      return;
    }

    let conteudo = '';
    let nomeArquivo = '';
    let mimeType = '';

    switch (formato) {
      case 'csv': {
        const headers = Object.keys(dadosCarregados[0]).join(',');
        const rows = dadosCarregados.map(row => 
          Object.values(row).map(val => 
            typeof val === 'string' && val.includes(',') ? `"${val}"` : val
          ).join(',')
        );
        conteudo = [headers, ...rows].join('\n');
        nomeArquivo = 'dados_exportados.csv';
        mimeType = 'text/csv';
        break;
      }
      case 'json': {
        conteudo = JSON.stringify(dadosCarregados, null, 2);
        nomeArquivo = 'dados_exportados.json';
        mimeType = 'application/json';
        break;
      }
      default:
        mostrarMensagem('Formato não suportado ainda', 'warning');
        return;
    }

    const blob = new Blob([conteudo], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = nomeArquivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    mostrarMensagem(`Dados exportados como ${formato.toUpperCase()}`, 'success');
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1f2937', mb: 2 }}>
          🌐 APIs de Dados Públicos Avançadas
        </Typography>
        <Typography variant="body1" sx={{ color: '#6b7280', mb: 3, maxWidth: 1000 }}>
          Sistema completo de integração com APIs oficiais brasileiras. Acesso automático a dados do IBGE, 
          DATASUS, INMET, Banco Central, CNJ, ANEEL e Portal da Transparência com tratamento de erros robusto.
        </Typography>
        
        <Alert severity="success" sx={{ mb: 3 }}>
          <strong>🚀 Funcionalidades Avançadas:</strong> Retry automático, cache inteligente, validação de dados,
          exportação em múltiplos formatos e análise automática integrada.
        </Alert>
      </Box>

      {/* Progress Bar */}
      {progresso > 0 && (
        <Box sx={{ mb: 3 }}>
          <LinearProgress variant="determinate" value={progresso} />
          <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
            Carregando dados... {progresso}%
          </Typography>
        </Box>
      )}

      {/* Tabs Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
          <Tab label="Explorar Datasets" icon={<Search />} />
          <Tab label="APIs Específicas" icon={<Public />} />
          <Tab label="Dados Carregados" icon={<TableChart />} />
          <Tab label="Análise Automática" icon={<Analytics />} />
        </Tabs>
      </Box>

      {/* Tab 1: Explorar Datasets */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {/* Filtros */}
          <Grid item xs={12}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>🔍 Filtros e Busca</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Buscar datasets"
                      value={busca}
                      onChange={(e) => setBusca(e.target.value)}
                      InputProps={{
                        startAdornment: <Search sx={{ mr: 1, color: '#6b7280' }} />
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel>Categoria</InputLabel>
                      <Select
                        value={filtroCategoria}
                        onChange={(e: SelectChangeEvent) => setFiltroCategoria(e.target.value)}
                      >
                        <MenuItem value="">Todas</MenuItem>
                        {categorias.map(cat => (
                          <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel>Fonte</InputLabel>
                      <Select
                        value={filtroFonte}
                        onChange={(e: SelectChangeEvent) => setFiltroFonte(e.target.value)}
                      >
                        <MenuItem value="">Todas</MenuItem>
                        {fontes.map(fonte => (
                          <MenuItem key={fonte} value={fonte}>{fonte}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Lista de Datasets */}
          <Grid item xs={12}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Grid container spacing={2}>
                {datasetsFiltrados.map((dataset, index) => (
                  <Grid item xs={12} md={6} lg={4} key={dataset.id}>
                    <Card sx={{ 
                      height: '100%', 
                      cursor: 'pointer',
                      border: '1px solid #e5e7eb',
                      '&:hover': { boxShadow: 4 }
                    }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Public sx={{ mr: 1, color: '#2563eb' }} />
                          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                            {dataset.nome}
                          </Typography>
                        </Box>
                        
                        <Typography variant="body2" sx={{ color: '#6b7280', mb: 2, fontSize: '0.875rem' }}>
                          {dataset.descricao}
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                          <Chip label={dataset.categoria} size="small" color="primary" />
                          <Chip label={dataset.fonte} size="small" variant="outlined" />
                          <Chip 
                            label={dataset.qualidade} 
                            size="small" 
                            color={dataset.qualidade === 'Alta' ? 'success' : 'default'}
                          />
                        </Box>

                        <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
                          📊 {dataset.tamanho} • 🔄 {dataset.frequencia}
                        </Typography>
                        
                        <Typography variant="caption" sx={{ display: 'block', mb: 2 }}>
                          📅 Atualizado em: {new Date(dataset.ultimaAtualizacao).toLocaleDateString('pt-BR')}
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            size="small"
                            variant="contained"
                            startIcon={<Download />}
                            onClick={() => {
                              setDatasetDetalhes(dataset);
                              setDialogAberto(true);
                            }}
                          >
                            Carregar
                          </Button>
                          <Tooltip title="Ver detalhes">
                            <IconButton 
                              size="small"
                              onClick={() => {
                                setDatasetDetalhes(dataset);
                                setDialogAberto(true);
                              }}
                            >
                              <Info />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </TabPanel>

      {/* Tab 2: APIs Específicas */}
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          {/* IBGE */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationCity sx={{ mr: 2, color: '#2563eb' }} />
                  <Typography variant="h6">IBGE - Geografia e Demografia</Typography>
                </Box>
                
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Tipo de Dados</InputLabel>
                  <Select
                    value={tipoIBGE}
                    onChange={(e: SelectChangeEvent) => setTipoIBGE(e.target.value)}
                  >
                    <MenuItem value="municipios">Municípios</MenuItem>
                    <MenuItem value="estados">Estados</MenuItem>
                    <MenuItem value="populacao">População</MenuItem>
                    <MenuItem value="pib">PIB Municipal</MenuItem>
                    <MenuItem value="censos">Dados Censitários</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<CloudDownload />}
                  onClick={() => carregarDadosAPI('IBGE', tipoIBGE)}
                  disabled={loading}
                >
                  Carregar Dados IBGE
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* DATASUS */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocalHospital sx={{ mr: 2, color: '#10b981' }} />
                  <Typography variant="h6">DATASUS - Saúde Pública</Typography>
                </Box>
                
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Tipo de Dados</InputLabel>
                  <Select
                    value={tipoDataSUS}
                    onChange={(e: SelectChangeEvent) => setTipoDataSUS(e.target.value)}
                  >
                    <MenuItem value="mortalidade">Mortalidade</MenuItem>
                    <MenuItem value="nascimentos">Nascimentos</MenuItem>
                    <MenuItem value="internacoes">Internações</MenuItem>
                    <MenuItem value="vacinas">Vacinação</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<CloudDownload />}
                  onClick={() => carregarDadosAPI('DATASUS', tipoDataSUS)}
                  disabled={loading}
                  sx={{ backgroundColor: '#10b981' }}
                >
                  Carregar Dados DATASUS
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* INMET */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ShowChart sx={{ mr: 2, color: '#f59e0b' }} />
                  <Typography variant="h6">INMET - Meteorologia</Typography>
                </Box>
                
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Tipo de Dados</InputLabel>
                  <Select
                    value={tipoINMET}
                    onChange={(e: SelectChangeEvent) => setTipoINMET(e.target.value)}
                  >
                    <MenuItem value="temperatura">Temperatura</MenuItem>
                    <MenuItem value="chuva">Precipitação</MenuItem>
                    <MenuItem value="umidade">Umidade</MenuItem>
                    <MenuItem value="vento">Vento</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<CloudDownload />}
                  onClick={() => carregarDadosAPI('INMET', tipoINMET)}
                  disabled={loading}
                  sx={{ backgroundColor: '#f59e0b' }}
                >
                  Carregar Dados INMET
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Banco Central */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TrendingUp sx={{ mr: 2, color: '#dc2626' }} />
                  <Typography variant="h6">Banco Central - Economia</Typography>
                </Box>
                
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Indicador</InputLabel>
                  <Select
                    value={indicadorBacen}
                    onChange={(e: SelectChangeEvent) => setIndicadorBacen(e.target.value)}
                  >
                    <MenuItem value="selic">Taxa Selic</MenuItem>
                    <MenuItem value="ipca">IPCA</MenuItem>
                    <MenuItem value="pib">PIB</MenuItem>
                    <MenuItem value="cambio">Câmbio USD</MenuItem>
                    <MenuItem value="taxa_desemprego">Desemprego</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<CloudDownload />}
                  onClick={() => carregarDadosAPI('Banco Central', indicadorBacen)}
                  disabled={loading}
                  sx={{ backgroundColor: '#dc2626' }}
                >
                  Carregar Dados Bacen
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Tab 3: Dados Carregados */}
      <TabPanel value={tabValue} index={2}>
        {dataPreview ? (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">
                📊 Dados Carregados ({dataPreview.totalRecords.toLocaleString('pt-BR')} registros)
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  startIcon={<Download />}
                  onClick={() => exportarDados('csv')}
                >
                  CSV
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Download />}
                  onClick={() => exportarDados('json')}
                >
                  JSON
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Analytics />}
                  onClick={() => setTabValue(3)}
                >
                  Analisar
                </Button>
              </Box>
            </Box>

            <Alert severity="info" sx={{ mb: 2 }}>
              Mostrando os primeiros {dataPreview.sampleSize} registros de {dataPreview.totalRecords} total
            </Alert>

            <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {dataPreview.columns.map((col, index) => (
                      <TableCell key={index} sx={{ fontWeight: 600, backgroundColor: '#f8fafc' }}>
                        {col}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataPreview.rows.map((row, index) => (
                    <TableRow key={index}>
                      {dataPreview.columns.map((col, colIndex) => (
                        <TableCell key={colIndex}>
                          {typeof row[col] === 'object' ? JSON.stringify(row[col]) : String(row[col] || '-')}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ) : (
          <Alert severity="info">
            Nenhum dado carregado ainda. Use as abas "Explorar Datasets" ou "APIs Específicas" para carregar dados.
          </Alert>
        )}
      </TabPanel>

      {/* Tab 4: Análise Automática */}
      <TabPanel value={tabValue} index={3}>
        {dadosCarregados.length > 0 ? (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Alert severity="success" sx={{ mb: 3 }}>
                🎯 <strong>Análise Automática Disponível:</strong> {dadosCarregados.length.toLocaleString('pt-BR')} registros prontos para análise
              </Alert>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <BarChart sx={{ mr: 2, color: '#2563eb' }} />
                    <Typography variant="h6">Análise Descritiva</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Estatísticas descritivas automáticas, detecção de outliers e análise de distribuições.
                  </Typography>
                  <Button variant="contained" fullWidth startIcon={<Analytics />}>
                    Executar Análise Descritiva
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Timeline sx={{ mr: 2, color: '#10b981' }} />
                    <Typography variant="h6">Análise Temporal</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Detecção automática de tendências, sazonalidade e análise de séries temporais.
                  </Typography>
                  <Button variant="contained" fullWidth startIcon={<ShowChart />} sx={{ backgroundColor: '#10b981' }}>
                    Executar Análise Temporal
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PieChart sx={{ mr: 2, color: '#f59e0b' }} />
                    <Typography variant="h6">Análise Multivariada</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Correlações, clusters automáticos e análise de componentes principais.
                  </Typography>
                  <Button variant="contained" fullWidth startIcon={<Analytics />} sx={{ backgroundColor: '#f59e0b' }}>
                    Executar Análise Multivariada
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Speed sx={{ mr: 2, color: '#dc2626' }} />
                    <Typography variant="h6">Machine Learning</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Modelos preditivos automáticos, classificação e regressão com validação.
                  </Typography>
                  <Button variant="contained" fullWidth startIcon={<Assessment />} sx={{ backgroundColor: '#dc2626' }}>
                    Executar ML Automático
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        ) : (
          <Alert severity="warning">
            Carregue dados primeiro para executar análises automáticas.
          </Alert>
        )}
      </TabPanel>

      {/* Dialog de Detalhes do Dataset */}
      <Dialog 
        open={dialogAberto} 
        onClose={() => setDialogAberto(false)}
        maxWidth="md"
        fullWidth
      >
        {datasetDetalhes && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Public sx={{ mr: 2 }} />
                {datasetDetalhes.nome}
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {datasetDetalhes.descricao}
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Fonte:</Typography>
                  <Typography variant="body2">{datasetDetalhes.fonte}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Categoria:</Typography>
                  <Typography variant="body2">{datasetDetalhes.categoria}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Tamanho:</Typography>
                  <Typography variant="body2">{datasetDetalhes.tamanho}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Frequência:</Typography>
                  <Typography variant="body2">{datasetDetalhes.frequencia}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Cobertura:</Typography>
                  <Typography variant="body2">{datasetDetalhes.cobertura}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Qualidade:</Typography>
                  <Chip label={datasetDetalhes.qualidade} size="small" color={datasetDetalhes.qualidade === 'Alta' ? 'success' : 'default'} />
                </Grid>
              </Grid>

              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>Formatos Disponíveis:</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {datasetDetalhes.formato.map(fmt => (
                  <Chip key={fmt} label={fmt} size="small" variant="outlined" />
                ))}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogAberto(false)}>
                Fechar
              </Button>
              <Button 
                variant="contained" 
                startIcon={<Download />}
                onClick={() => {
                  // Lógica para carregar dados específicos baseado no dataset
                  setDialogAberto(false);
                  // Implementar carregamento baseado no ID do dataset
                }}
              >
                Carregar Dataset
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Snackbar para mensagens */}
      <Snackbar
        open={snackbarAberto}
        autoHideDuration={6000}
        onClose={() => setSnackbarAberto(false)}
      >
        <Alert 
          onClose={() => setSnackbarAberto(false)} 
          severity={tipoMensagem}
          variant="filled"
        >
          {mensagem}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DadosAbertosAvancado;
