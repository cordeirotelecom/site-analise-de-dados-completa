import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Alert,
  TextField,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Stack,
  Tabs,
  Tab,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  ExpandMore,
  Storage,
  Speed,
  Memory,
  CloudQueue,
  Analytics,
  TrendingUp,
  Assessment,
  Computer,
  DataThresholding,
  BarChart,
  Timeline,
  Download,
  PlayArrow,
  Stop,
  Settings,
  Refresh
} from '@mui/icons-material';

interface DataCluster {
  id: string;
  nome: string;
  tipo: 'hadoop' | 'spark' | 'kafka' | 'elasticsearch';
  status: 'online' | 'offline' | 'processando';
  nodes: number;
  memoria: string;
  armazenamento: string;
  processamento: number;
  dados: {
    volumeTotal: string;
    volumeProcessado: string;
    taxaTransferencia: string;
    latencia: string;
  };
}

interface JobBigData {
  id: string;
  nome: string;
  tipo: 'etl' | 'analise' | 'ml' | 'streaming';
  cluster: string;
  status: 'executando' | 'concluido' | 'falha' | 'aguardando';
  progresso: number;
  tempoInicio: Date;
  tempoEstimado: string;
  dadosProcessados: string;
  resultado?: any;
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
      id={`bigdata-tabpanel-${index}`}
      aria-labelledby={`bigdata-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const BigDataAnalytics: React.FC = () => {
  const [clusters, setClusters] = useState<DataCluster[]>([]);
  const [jobs, setJobs] = useState<JobBigData[]>([]);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [novoJob, setNovoJob] = useState({
    nome: '',
    tipo: 'analise' as const,
    cluster: '',
    configuracao: {}
  });

  useEffect(() => {
    carregarClusters();
    carregarJobs();
    
    if (autoRefresh) {
      const interval = setInterval(() => {
        atualizarStatus();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const carregarClusters = () => {
    const clustersExemplo: DataCluster[] = [
      {
        id: '1',
        nome: 'Cluster Hadoop Principal',
        tipo: 'hadoop',
        status: 'online',
        nodes: 12,
        memoria: '256 GB',
        armazenamento: '48 TB',
        processamento: 85,
        dados: {
          volumeTotal: '127 TB',
          volumeProcessado: '98 TB',
          taxaTransferencia: '2.3 GB/s',
          latencia: '12ms'
        }
      },
      {
        id: '2',
        nome: 'Spark Analytics Engine',
        tipo: 'spark',
        status: 'online',
        nodes: 8,
        memoria: '512 GB',
        armazenamento: '24 TB',
        processamento: 67,
        dados: {
          volumeTotal: '89 TB',
          volumeProcessado: '72 TB',
          taxaTransferencia: '4.1 GB/s',
          latencia: '8ms'
        }
      },
      {
        id: '3',
        nome: 'Kafka Streaming',
        tipo: 'kafka',
        status: 'processando',
        nodes: 6,
        memoria: '128 GB',
        armazenamento: '12 TB',
        processamento: 92,
        dados: {
          volumeTotal: '156 TB',
          volumeProcessado: '144 TB',
          taxaTransferencia: '1.8 GB/s',
          latencia: '3ms'
        }
      },
      {
        id: '4',
        nome: 'ElasticSearch Cluster',
        tipo: 'elasticsearch',
        status: 'online',
        nodes: 15,
        memoria: '384 GB',
        armazenamento: '72 TB',
        processamento: 43,
        dados: {
          volumeTotal: '234 TB',
          volumeProcessado: '178 TB',
          taxaTransferencia: '3.7 GB/s',
          latencia: '5ms'
        }
      }
    ];

    setClusters(clustersExemplo);
  };

  const carregarJobs = () => {
    const jobsExemplo: JobBigData[] = [
      {
        id: '1',
        nome: 'Análise de Sentimentos - Redes Sociais',
        tipo: 'analise',
        cluster: 'Spark Analytics Engine',
        status: 'executando',
        progresso: 78,
        tempoInicio: new Date(Date.now() - 3600000),
        tempoEstimado: '23 min',
        dadosProcessados: '12.4 TB'
      },
      {
        id: '2',
        nome: 'ETL - Dados Governamentais SC',
        tipo: 'etl',
        cluster: 'Cluster Hadoop Principal',
        status: 'concluido',
        progresso: 100,
        tempoInicio: new Date(Date.now() - 7200000),
        tempoEstimado: '0 min',
        dadosProcessados: '8.7 TB'
      },
      {
        id: '3',
        nome: 'ML - Predição Econômica',
        tipo: 'ml',
        cluster: 'Spark Analytics Engine',
        status: 'executando',
        progresso: 34,
        tempoInicio: new Date(Date.now() - 1800000),
        tempoEstimado: '45 min',
        dadosProcessados: '5.2 TB'
      },
      {
        id: '4',
        nome: 'Stream - Dados Tempo Real',
        tipo: 'streaming',
        cluster: 'Kafka Streaming',
        status: 'executando',
        progresso: 100,
        tempoInicio: new Date(Date.now() - 86400000),
        tempoEstimado: 'Contínuo',
        dadosProcessados: '234.5 TB'
      }
    ];

    setJobs(jobsExemplo);
  };

  const atualizarStatus = () => {
    // Simular atualização de status dos jobs
    setJobs(prev => prev.map(job => {
      if (job.status === 'executando' && job.tipo !== 'streaming') {
        const novoProgresso = Math.min(100, job.progresso + Math.random() * 5);
        return {
          ...job,
          progresso: novoProgresso,
          status: novoProgresso >= 100 ? 'concluido' : 'executando'
        };
      }
      return job;
    }));

    // Simular atualização de processamento dos clusters
    setClusters(prev => prev.map(cluster => ({
      ...cluster,
      processamento: Math.max(10, Math.min(100, cluster.processamento + (Math.random() - 0.5) * 10))
    })));
  };

  const executarNovoJob = async () => {
    setLoading(true);
    
    try {
      const job: JobBigData = {
        id: Date.now().toString(),
        nome: novoJob.nome,
        tipo: novoJob.tipo,
        cluster: novoJob.cluster,
        status: 'executando',
        progresso: 0,
        tempoInicio: new Date(),
        tempoEstimado: '60 min',
        dadosProcessados: '0 GB'
      };

      setJobs(prev => [job, ...prev]);
      setDialogOpen(false);
      setNovoJob({ nome: '', tipo: 'analise', cluster: '', configuracao: {} });

    } catch (error) {
      console.error('Erro ao executar job:', error);
    } finally {
      setLoading(false);
    }
  };

  const pararJob = (jobId: string) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, status: 'falha' as const }
        : job
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': case 'concluido': return 'success';
      case 'executando': case 'processando': return 'warning';
      case 'offline': case 'falha': return 'error';
      case 'aguardando': return 'info';
      default: return 'default';
    }
  };

  const getClusterIcon = (tipo: string) => {
    switch (tipo) {
      case 'hadoop': return <Storage />;
      case 'spark': return <Speed />;
      case 'kafka': return <Timeline />;
      case 'elasticsearch': return <Memory />;
      default: return <Computer />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          🔥 BigData Analytics Platform
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
              />
            }
            label="Auto Refresh"
          />
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={() => atualizarStatus()}
          >
            Atualizar
          </Button>
          <Button
            variant="contained"
            startIcon={<PlayArrow />}
            onClick={() => setDialogOpen(true)}
          >
            Novo Job
          </Button>
        </Box>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        Plataforma para processamento e análise de grandes volumes de dados em tempo real. 
        Suporte a Hadoop, Spark, Kafka e ElasticSearch para análises avançadas.
      </Alert>

      {/* Estatísticas Gerais */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                <Storage sx={{ mr: 1, verticalAlign: 'middle' }} />
                Total de Dados
              </Typography>
              <Typography variant="h4" color="primary">
                {clusters.reduce((sum, c) => sum + parseFloat(c.dados.volumeTotal), 0).toFixed(1)} TB
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Armazenados
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                <Computer sx={{ mr: 1, verticalAlign: 'middle' }} />
                Clusters Ativos
              </Typography>
              <Typography variant="h4" color="success.main">
                {clusters.filter(c => c.status === 'online').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                de {clusters.length} total
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                <Analytics sx={{ mr: 1, verticalAlign: 'middle' }} />
                Jobs Executando
              </Typography>
              <Typography variant="h4" color="warning.main">
                {jobs.filter(j => j.status === 'executando').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Em processamento
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                <Speed sx={{ mr: 1, verticalAlign: 'middle' }} />
                Taxa Média
              </Typography>
              <Typography variant="h4" color="info.main">
                2.9 GB/s
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Transferência
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
          <Tab label="Clusters" />
          <Tab label="Jobs em Execução" />
          <Tab label="Monitoramento" />
          <Tab label="Configurações" />
        </Tabs>
      </Box>

      {/* Tab 1: Clusters */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={2}>
          {clusters.map((cluster) => (
            <Grid item xs={12} md={6} key={cluster.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">
                      {getClusterIcon(cluster.tipo)}
                      <Box component="span" sx={{ ml: 1 }}>{cluster.nome}</Box>
                    </Typography>
                    <Chip 
                      label={cluster.status} 
                      color={getStatusColor(cluster.status)}
                      size="small"
                    />
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Nodes</Typography>
                      <Typography variant="h6">{cluster.nodes}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Memória</Typography>
                      <Typography variant="h6">{cluster.memoria}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Armazenamento</Typography>
                      <Typography variant="h6">{cluster.armazenamento}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Volume Total</Typography>
                      <Typography variant="h6">{cluster.dados.volumeTotal}</Typography>
                    </Grid>
                  </Grid>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Utilização do Processamento: {cluster.processamento}%
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={cluster.processamento} 
                      sx={{ mt: 1 }}
                    />
                  </Box>

                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">
                      Taxa: {cluster.dados.taxaTransferencia}
                    </Typography>
                    <Typography variant="body2">
                      Latência: {cluster.dados.latencia}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Tab 2: Jobs */}
      <TabPanel value={tabValue} index={1}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome do Job</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Cluster</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Progresso</TableCell>
                <TableCell>Dados Processados</TableCell>
                <TableCell>Tempo Estimado</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>
                    <Typography variant="subtitle2">{job.nome}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Iniciado: {job.tempoInicio.toLocaleTimeString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={job.tipo} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>{job.cluster}</TableCell>
                  <TableCell>
                    <Chip 
                      label={job.status} 
                      color={getStatusColor(job.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ width: 100 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={job.progresso} 
                      />
                      <Typography variant="caption">
                        {job.progresso}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{job.dadosProcessados}</TableCell>
                  <TableCell>{job.tempoEstimado}</TableCell>
                  <TableCell>
                    {job.status === 'executando' && (
                      <Tooltip title="Parar Job">
                        <IconButton
                          size="small"
                          onClick={() => pararJob(job.id)}
                          color="error"
                        >
                          <Stop />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* Tab 3: Monitoramento */}
      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Alert severity="success">
              Todos os sistemas estão operacionais. Monitoramento em tempo real ativo.
            </Alert>
          </Grid>
          
          {clusters.map((cluster) => (
            <Grid item xs={12} md={6} key={cluster.id}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="h6">{cluster.nome}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">CPU</Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={cluster.processamento} 
                        color={cluster.processamento > 80 ? 'error' : 'primary'}
                      />
                      <Typography variant="caption">{cluster.processamento}%</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Memória</Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={65} 
                        color="info"
                      />
                      <Typography variant="caption">65%</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Disco</Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={45} 
                        color="success"
                      />
                      <Typography variant="caption">45%</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Rede</Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={30} 
                        color="warning"
                      />
                      <Typography variant="caption">30%</Typography>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Tab 4: Configurações */}
      <TabPanel value={tabValue} index={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Configurações Gerais</Typography>
                <Stack spacing={2}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Auto-scaling habilitado"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Monitoramento em tempo real"
                  />
                  <FormControlLabel
                    control={<Switch />}
                    label="Alertas por email"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Backup automático"
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Limites de Recursos</Typography>
                <Stack spacing={2}>
                  <TextField
                    label="CPU Máximo (%)"
                    type="number"
                    defaultValue={90}
                    fullWidth
                  />
                  <TextField
                    label="Memória Máxima (GB)"
                    type="number"
                    defaultValue={1024}
                    fullWidth
                  />
                  <TextField
                    label="Armazenamento Máximo (TB)"
                    type="number"
                    defaultValue={500}
                    fullWidth
                  />
                  <TextField
                    label="Jobs Simultâneos"
                    type="number"
                    defaultValue={10}
                    fullWidth
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Dialog Novo Job */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Executar Novo Job BigData</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome do Job"
                value={novoJob.nome}
                onChange={(e) => setNovoJob(prev => ({ ...prev, nome: e.target.value }))}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Job</InputLabel>
                <Select
                  value={novoJob.tipo}
                  label="Tipo de Job"
                  onChange={(e) => setNovoJob(prev => ({ ...prev, tipo: e.target.value as any }))}
                >
                  <MenuItem value="etl">ETL - Extract, Transform, Load</MenuItem>
                  <MenuItem value="analise">Análise de Dados</MenuItem>
                  <MenuItem value="ml">Machine Learning</MenuItem>
                  <MenuItem value="streaming">Streaming em Tempo Real</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Cluster</InputLabel>
                <Select
                  value={novoJob.cluster}
                  label="Cluster"
                  onChange={(e) => setNovoJob(prev => ({ ...prev, cluster: e.target.value }))}
                >
                  {clusters.filter(c => c.status === 'online').map((cluster) => (
                    <MenuItem key={cluster.id} value={cluster.nome}>
                      {cluster.nome} ({cluster.tipo})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
          <Button 
            onClick={executarNovoJob} 
            variant="contained"
            disabled={!novoJob.nome || !novoJob.cluster || loading}
          >
            Executar Job
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BigDataAnalytics;
