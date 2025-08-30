import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Chip,
  LinearProgress,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Snackbar
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  PlayArrow as PlayIcon,
  Stop as StopIcon,
  Refresh as RefreshIcon,
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Speed as SpeedIcon,
  Storage as StorageIcon,
  Api as ApiIcon,
  Download as DownloadIcon,
  Code as CodeIcon
} from '@mui/icons-material';
import { apiPublicaServiceV2 } from '../services/ApiPublicaServiceV2';

interface TesteAPI {
  api: string;
  status: 'Sucesso' | 'Erro';
  tempoResposta: string;
  registros: number;
  erro?: string;
}

interface LogEntrada {
  timestamp: string;
  api: string;
  acao: string;
  status: 'sucesso' | 'erro';
  detalhes: string;
  tempoResposta?: number;
}

const MonitoramentoAPIs: React.FC = () => {
  const [testesAPI, setTestesAPI] = useState<TesteAPI[]>([]);
  const [carregandoTeste, setCarregandoTeste] = useState(false);
  const [datasets, setDatasets] = useState<any[]>([]);
  const [estatisticasCache, setEstatisticasCache] = useState<any>(null);
  const [logs, setLogs] = useState<LogEntrada[]>([]);
  const [modalExemplo, setModalExemplo] = useState(false);
  const [apiSelecionada, setApiSelecionada] = useState('');
  const [parametrosTeste, setParametrosTeste] = useState<any>({});
  const [resultadoTeste, setResultadoTeste] = useState<any>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' as any });

  useEffect(() => {
    carregarDatasets();
    atualizarEstatisticasCache();
  }, []);

  const carregarDatasets = async () => {
    try {
      const response = await apiPublicaServiceV2.listarDatasetsDisponiveis();
      if (response.success && response.data) {
        setDatasets(response.data);
        adicionarLog('Sistema', 'Carregar Datasets', 'sucesso', `${response.data.length} datasets carregados`);
      }
    } catch (error: any) {
      adicionarLog('Sistema', 'Carregar Datasets', 'erro', error.message);
    }
  };

  const executarTestesConectividade = async () => {
    setCarregandoTeste(true);
    setTestesAPI([]);
    
    try {
      const response = await apiPublicaServiceV2.testarConectividadeAPIs();
      if (response.success && response.data) {
        setTestesAPI(response.data);
        adicionarLog('Sistema', 'Teste Conectividade', 'sucesso', `${response.data.length} APIs testadas`);
        setSnackbar({ 
          open: true, 
          message: 'Testes de conectividade concluídos com sucesso!', 
          severity: 'success' 
        });
      }
    } catch (error: any) {
      adicionarLog('Sistema', 'Teste Conectividade', 'erro', error.message);
      setSnackbar({ 
        open: true, 
        message: 'Erro ao executar testes de conectividade', 
        severity: 'error' 
      });
    } finally {
      setCarregandoTeste(false);
      atualizarEstatisticasCache();
    }
  };

  const testarAPIEspecifica = async () => {
    if (!apiSelecionada) return;

    setCarregandoTeste(true);
    const inicio = Date.now();

    try {
      let resultado;
      
      switch (apiSelecionada) {
        case 'ibge_municipios':
          resultado = await apiPublicaServiceV2.buscarMunicipios(parametrosTeste.uf);
          break;
        case 'ibge_estados':
          resultado = await apiPublicaServiceV2.buscarEstados();
          break;
        case 'ibge_populacao':
          resultado = await apiPublicaServiceV2.buscarDadosPopulacao(parametrosTeste.ano || '2022');
          break;
        case 'bacen_selic':
          resultado = await apiPublicaServiceV2.buscarTaxaSelic(parametrosTeste.periodo);
          break;
        case 'bacen_ipca':
          resultado = await apiPublicaServiceV2.buscarIPCA(parametrosTeste.periodo);
          break;
        case 'bacen_cambio':
          resultado = await apiPublicaServiceV2.buscarCambioDolar(parametrosTeste.periodo);
          break;
        case 'viacep':
          resultado = await apiPublicaServiceV2.buscarCEP(parametrosTeste.cep || '01001000');
          break;
        case 'covid_brasil':
          resultado = await apiPublicaServiceV2.buscarDadosCovid(parametrosTeste.uf);
          break;
        case 'clima_tempo':
          resultado = await apiPublicaServiceV2.buscarClimaAtual(parametrosTeste.cidade || 'São Paulo');
          break;
        default:
          throw new Error('API não implementada');
      }

      const tempoResposta = Date.now() - inicio;
      setResultadoTeste({ ...resultado, tempoResposta });
      
      adicionarLog(
        apiSelecionada, 
        'Teste Individual', 
        resultado.success ? 'sucesso' : 'erro',
        resultado.message || '',
        tempoResposta
      );

      setSnackbar({ 
        open: true, 
        message: resultado.success ? 'Teste executado com sucesso!' : 'Erro no teste da API', 
        severity: resultado.success ? 'success' : 'error' 
      });

    } catch (error: any) {
      const tempoResposta = Date.now() - inicio;
      setResultadoTeste({ success: false, error: error.message, tempoResposta });
      adicionarLog(apiSelecionada, 'Teste Individual', 'erro', error.message, tempoResposta);
      setSnackbar({ 
        open: true, 
        message: 'Erro ao executar teste da API', 
        severity: 'error' 
      });
    } finally {
      setCarregandoTeste(false);
      atualizarEstatisticasCache();
    }
  };

  const atualizarEstatisticasCache = () => {
    const stats = apiPublicaServiceV2.obterEstatisticasCache();
    setEstatisticasCache(stats);
  };

  const limparCache = () => {
    apiPublicaServiceV2.limparCache();
    atualizarEstatisticasCache();
    adicionarLog('Sistema', 'Limpar Cache', 'sucesso', 'Cache limpo com sucesso');
    setSnackbar({ 
      open: true, 
      message: 'Cache limpo com sucesso!', 
      severity: 'success' 
    });
  };

  const adicionarLog = (api: string, acao: string, status: 'sucesso' | 'erro', detalhes: string, tempoResposta?: number) => {
    const novoLog: LogEntrada = {
      timestamp: new Date().toLocaleString('pt-BR'),
      api,
      acao,
      status,
      detalhes,
      tempoResposta
    };
    
    setLogs(logsAnteriores => [novoLog, ...logsAnteriores.slice(0, 49)]); // Manter apenas 50 logs
  };

  const exportarDados = (dados: any, nome: string) => {
    const json = JSON.stringify(dados, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${nome}_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Sucesso':
      case 'Ativo':
        return 'success';
      case 'Erro':
      case 'Indisponível':
        return 'error';
      case 'Teste':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Sucesso':
      case 'Ativo':
        return <CheckIcon />;
      case 'Erro':
      case 'Indisponível':
        return <ErrorIcon />;
      case 'Teste':
        return <WarningIcon />;
      default:
        return <ApiIcon />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <ApiIcon /> Monitoramento de APIs Públicas
      </Typography>

      {/* Painel de Controle */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SpeedIcon /> Testes de Performance
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={carregandoTeste ? <StopIcon /> : <PlayIcon />}
                  onClick={executarTestesConectividade}
                  disabled={carregandoTeste}
                  sx={{ mb: 1 }}
                >
                  {carregandoTeste ? 'Testando...' : 'Testar Todas as APIs'}
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<CodeIcon />}
                  onClick={() => setModalExemplo(true)}
                >
                  Teste Personalizado
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <StorageIcon /> Estatísticas do Cache
              </Typography>
              {estatisticasCache && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    <strong>Itens em cache:</strong> {estatisticasCache.itens}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Tamanho aproximado:</strong> {(estatisticasCache.tamanhoAproximado / 1024).toFixed(1)} KB
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<RefreshIcon />}
                    onClick={limparCache}
                    sx={{ mt: 1 }}
                  >
                    Limpar Cache
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Resumo dos Datasets</Typography>
              <Typography variant="h3" color="primary">
                {datasets.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                APIs disponíveis
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Ativos: {datasets.filter(d => d.status === 'Ativo').length} |
                Teste: {datasets.filter(d => d.status === 'Teste').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Resultados dos Testes */}
      {carregandoTeste && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>Executando testes de conectividade...</Typography>
          <LinearProgress />
        </Box>
      )}

      {testesAPI.length > 0 && (
        <Accordion defaultExpanded sx={{ mb: 3 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Resultados dos Testes de Conectividade</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>API</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Tempo de Resposta</TableCell>
                    <TableCell>Registros</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {testesAPI.map((teste, index) => (
                    <TableRow key={index}>
                      <TableCell>{teste.api}</TableCell>
                      <TableCell>
                        <Chip
                          icon={getStatusIcon(teste.status)}
                          label={teste.status}
                          color={getStatusColor(teste.status) as any}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{teste.tempoResposta}</TableCell>
                      <TableCell>{teste.registros.toLocaleString()}</TableCell>
                      <TableCell>
                        <Tooltip title="Exportar dados">
                          <IconButton
                            size="small"
                            onClick={() => exportarDados(teste, teste.api)}
                          >
                            <DownloadIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Lista de Datasets */}
      <Accordion sx={{ mb: 3 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Datasets Disponíveis ({datasets.length})</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {datasets.map((dataset) => (
              <Grid item xs={12} md={6} lg={4} key={dataset.id}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                        {dataset.nome}
                      </Typography>
                      <Chip
                        icon={getStatusIcon(dataset.status)}
                        label={dataset.status}
                        color={getStatusColor(dataset.status) as any}
                        size="small"
                      />
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {dataset.descricao}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                      <Chip label={dataset.categoria} size="small" variant="outlined" />
                      <Chip label={dataset.fonte} size="small" variant="outlined" />
                      <Chip label={dataset.frequencia} size="small" variant="outlined" />
                    </Box>
                    
                    <Typography variant="caption" display="block">
                      <strong>Tamanho:</strong> {dataset.tamanho}
                    </Typography>
                    <Typography variant="caption" display="block">
                      <strong>Atualização:</strong> {dataset.ultimaAtualizacao}
                    </Typography>
                    <Typography variant="caption" display="block">
                      <strong>Autenticação:</strong> {dataset.autenticacao ? 'Necessária' : 'Não necessária'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Logs de Atividade */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Logs de Atividade ({logs.length})</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>API</TableCell>
                  <TableCell>Ação</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Tempo</TableCell>
                  <TableCell>Detalhes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell>{log.timestamp}</TableCell>
                    <TableCell>{log.api}</TableCell>
                    <TableCell>{log.acao}</TableCell>
                    <TableCell>
                      <Chip
                        label={log.status}
                        color={log.status === 'sucesso' ? 'success' : 'error'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {log.tempoResposta ? `${log.tempoResposta}ms` : '-'}
                    </TableCell>
                    <TableCell>{log.detalhes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>

      {/* Modal de Teste Personalizado */}
      <Dialog open={modalExemplo} onClose={() => setModalExemplo(false)} maxWidth="md" fullWidth>
        <DialogTitle>Teste Personalizado de API</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Selecionar API</InputLabel>
                <Select
                  value={apiSelecionada}
                  onChange={(e) => setApiSelecionada(e.target.value)}
                  label="Selecionar API"
                >
                  {datasets.map((dataset) => (
                    <MenuItem key={dataset.id} value={dataset.id}>
                      {dataset.nome} ({dataset.fonte})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Parâmetros específicos por API */}
            {apiSelecionada === 'ibge_municipios' && (
              <Grid item xs={12}>
                <TextField
                  label="UF (opcional)"
                  fullWidth
                  value={parametrosTeste.uf || ''}
                  onChange={(e) => setParametrosTeste({ ...parametrosTeste, uf: e.target.value })}
                  placeholder="Ex: SP, RJ, MG"
                />
              </Grid>
            )}

            {apiSelecionada === 'ibge_populacao' && (
              <Grid item xs={12}>
                <TextField
                  label="Ano"
                  fullWidth
                  value={parametrosTeste.ano || '2022'}
                  onChange={(e) => setParametrosTeste({ ...parametrosTeste, ano: e.target.value })}
                  placeholder="Ex: 2022, 2021, 2020"
                />
              </Grid>
            )}

            {(apiSelecionada === 'bacen_selic' || apiSelecionada === 'bacen_ipca' || apiSelecionada === 'bacen_cambio') && (
              <>
                <Grid item xs={6}>
                  <TextField
                    label="Data Início"
                    type="date"
                    fullWidth
                    value={parametrosTeste.dataInicio || ''}
                    onChange={(e) => setParametrosTeste({ 
                      ...parametrosTeste, 
                      periodo: { 
                        ...parametrosTeste.periodo, 
                        inicio: e.target.value 
                      } 
                    })}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Data Fim"
                    type="date"
                    fullWidth
                    value={parametrosTeste.dataFim || ''}
                    onChange={(e) => setParametrosTeste({ 
                      ...parametrosTeste, 
                      periodo: { 
                        ...parametrosTeste.periodo, 
                        fim: e.target.value 
                      } 
                    })}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </>
            )}

            {apiSelecionada === 'viacep' && (
              <Grid item xs={12}>
                <TextField
                  label="CEP"
                  fullWidth
                  value={parametrosTeste.cep || ''}
                  onChange={(e) => setParametrosTeste({ ...parametrosTeste, cep: e.target.value })}
                  placeholder="Ex: 01001000"
                />
              </Grid>
            )}

            {apiSelecionada === 'covid_brasil' && (
              <Grid item xs={12}>
                <TextField
                  label="UF (opcional)"
                  fullWidth
                  value={parametrosTeste.uf || ''}
                  onChange={(e) => setParametrosTeste({ ...parametrosTeste, uf: e.target.value })}
                  placeholder="Ex: SP, RJ, MG"
                />
              </Grid>
            )}

            {apiSelecionada === 'clima_tempo' && (
              <Grid item xs={12}>
                <TextField
                  label="Cidade"
                  fullWidth
                  value={parametrosTeste.cidade || ''}
                  onChange={(e) => setParametrosTeste({ ...parametrosTeste, cidade: e.target.value })}
                  placeholder="Ex: São Paulo, Rio de Janeiro"
                />
              </Grid>
            )}

            {resultadoTeste && (
              <Grid item xs={12}>
                <Alert 
                  severity={resultadoTeste.success ? 'success' : 'error'}
                  sx={{ mt: 2 }}
                >
                  <Typography variant="body2">
                    <strong>Status:</strong> {resultadoTeste.success ? 'Sucesso' : 'Erro'}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Tempo de resposta:</strong> {resultadoTeste.tempoResposta}ms
                  </Typography>
                  <Typography variant="body2">
                    <strong>Mensagem:</strong> {resultadoTeste.message || resultadoTeste.error}
                  </Typography>
                  {resultadoTeste.data && (
                    <Typography variant="body2">
                      <strong>Registros:</strong> {Array.isArray(resultadoTeste.data) ? resultadoTeste.data.length : 1}
                    </Typography>
                  )}
                </Alert>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalExemplo(false)}>Fechar</Button>
          <Button 
            variant="contained" 
            onClick={testarAPIEspecifica}
            disabled={!apiSelecionada || carregandoTeste}
            startIcon={carregandoTeste ? <StopIcon /> : <PlayIcon />}
          >
            {carregandoTeste ? 'Testando...' : 'Executar Teste'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para notificações */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          severity={snackbar.severity} 
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MonitoramentoAPIs;
