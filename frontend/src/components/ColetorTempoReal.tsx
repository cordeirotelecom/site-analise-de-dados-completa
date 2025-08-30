import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Switch,
  FormControlLabel,
  Chip,
  LinearProgress,
  Alert,
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
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Stop as StopIcon,
  Pause as PauseIcon,
  Settings as SettingsIcon,
  Schedule as ScheduleIcon,
  Storage as StorageIcon,
  TrendingUp as TrendingUpIcon,
  Notifications as NotificationsIcon,
  Download as DownloadIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { apiPublicaServiceV2 } from '../services/ApiPublicaServiceV2';

interface ColetorConfig {
  id: string;
  nome: string;
  api: string;
  parametros: any;
  intervalo: number; // em minutos
  ativo: boolean;
  ultimaColeta?: string;
  proximaColeta?: string;
  totalColetado: number;
  status: 'ativo' | 'pausado' | 'erro' | 'configurando';
}

interface DadosColetados {
  id: string;
  coletorId: string;
  timestamp: string;
  dados: any;
  tamanho: number;
  tempoResposta: number;
  status: 'sucesso' | 'erro';
  erro?: string;
}

const ColetorTempoReal: React.FC = () => {
  const [coletores, setColetores] = useState<ColetorConfig[]>([]);
  const [dadosColetados, setDadosColetados] = useState<DadosColetados[]>([]);
  const [modalConfig, setModalConfig] = useState(false);
  const [coletorEditando, setColetorEditando] = useState<ColetorConfig | null>(null);
  const [novoColetorConfig, setNovoColetorConfig] = useState<Partial<ColetorConfig>>({
    nome: '',
    api: '',
    parametros: {},
    intervalo: 30,
    ativo: false
  });
  const [estatisticas, setEstatisticas] = useState({
    totalColetores: 0,
    coletoresAtivos: 0,
    totalDados: 0,
    ultimaAtividade: ''
  });

  const intervalosRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  useEffect(() => {
    // Carregar coletores salvos do localStorage
    const coletoresSalvos = localStorage.getItem('coletores_tempo_real');
    if (coletoresSalvos) {
      const coletoresCarregados = JSON.parse(coletoresSalvos);
      setColetores(coletoresCarregados);
      
      // Reativar coletores que estavam ativos
      coletoresCarregados.forEach((coletor: ColetorConfig) => {
        if (coletor.ativo) {
          iniciarColetor(coletor);
        }
      });
    }

    // Carregar dados coletados do localStorage
    const dadosSalvos = localStorage.getItem('dados_coletados_tempo_real');
    if (dadosSalvos) {
      setDadosColetados(JSON.parse(dadosSalvos));
    }

    return () => {
      // Limpar todos os intervalos ao desmontar
      intervalosRef.current.forEach(interval => clearInterval(interval));
    };
  }, []);

  useEffect(() => {
    // Salvar coletores no localStorage sempre que mudarem
    localStorage.setItem('coletores_tempo_real', JSON.stringify(coletores));
    atualizarEstatisticas();
  }, [coletores]);

  useEffect(() => {
    // Salvar dados coletados no localStorage
    localStorage.setItem('dados_coletados_tempo_real', JSON.stringify(dadosColetados));
  }, [dadosColetados]);

  const atualizarEstatisticas = () => {
    const agora = new Date();
    setEstatisticas({
      totalColetores: coletores.length,
      coletoresAtivos: coletores.filter(c => c.ativo).length,
      totalDados: dadosColetados.length,
      ultimaAtividade: dadosColetados.length > 0 ? 
        dadosColetados[dadosColetados.length - 1].timestamp : 
        'Nenhuma coleta realizada'
    });
  };

  const iniciarColetor = (coletor: ColetorConfig) => {
    if (intervalosRef.current.has(coletor.id)) {
      clearInterval(intervalosRef.current.get(coletor.id)!);
    }

    const executarColeta = async () => {
      try {
        console.log(`Executando coleta para: ${coletor.nome}`);
        
        const inicio = Date.now();
        let resultado;

        // Executar a API correspondente
        switch (coletor.api) {
          case 'ibge_municipios':
            resultado = await apiPublicaServiceV2.buscarMunicipios(coletor.parametros.uf);
            break;
          case 'ibge_estados':
            resultado = await apiPublicaServiceV2.buscarEstados();
            break;
          case 'bacen_selic':
            resultado = await apiPublicaServiceV2.buscarTaxaSelic();
            break;
          case 'bacen_ipca':
            resultado = await apiPublicaServiceV2.buscarIPCA();
            break;
          case 'bacen_cambio':
            resultado = await apiPublicaServiceV2.buscarCambioDolar();
            break;
          case 'viacep':
            resultado = await apiPublicaServiceV2.buscarCEP(coletor.parametros.cep || '01001000');
            break;
          case 'covid_brasil':
            resultado = await apiPublicaServiceV2.buscarDadosCovid(coletor.parametros.uf);
            break;
          default:
            throw new Error(`API ${coletor.api} não implementada`);
        }

        const tempoResposta = Date.now() - inicio;

        // Salvar dados coletados
        const novoDado: DadosColetados = {
          id: `coleta_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          coletorId: coletor.id,
          timestamp: new Date().toISOString(),
          dados: resultado.data,
          tamanho: JSON.stringify(resultado.data || {}).length,
          tempoResposta,
          status: resultado.success ? 'sucesso' : 'erro',
          erro: resultado.error
        };

        setDadosColetados(prev => [...prev, novoDado].slice(-1000)); // Manter apenas 1000 últimos registros

        // Atualizar informações do coletor
        setColetores(prev => prev.map(c => 
          c.id === coletor.id 
            ? { 
                ...c, 
                ultimaColeta: new Date().toLocaleString('pt-BR'),
                proximaColeta: new Date(Date.now() + c.intervalo * 60000).toLocaleString('pt-BR'),
                totalColetado: c.totalColetado + 1,
                status: resultado.success ? 'ativo' : 'erro'
              }
            : c
        ));

      } catch (error: any) {
        console.error(`Erro na coleta ${coletor.nome}:`, error);
        
        // Registrar erro
        const dadoErro: DadosColetados = {
          id: `erro_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          coletorId: coletor.id,
          timestamp: new Date().toISOString(),
          dados: null,
          tamanho: 0,
          tempoResposta: 0,
          status: 'erro',
          erro: error.message
        };

        setDadosColetados(prev => [...prev, dadoErro].slice(-1000));

        // Atualizar status do coletor
        setColetores(prev => prev.map(c => 
          c.id === coletor.id 
            ? { ...c, status: 'erro' }
            : c
        ));
      }
    };

    // Executar primeira coleta imediatamente
    executarColeta();

    // Programar coletas futuras
    const intervalo = setInterval(executarColeta, coletor.intervalo * 60000);
    intervalosRef.current.set(coletor.id, intervalo);

    console.log(`Coletor ${coletor.nome} iniciado com intervalo de ${coletor.intervalo} minutos`);
  };

  const pararColetor = (coletorId: string) => {
    if (intervalosRef.current.has(coletorId)) {
      clearInterval(intervalosRef.current.get(coletorId)!);
      intervalosRef.current.delete(coletorId);
    }

    setColetores(prev => prev.map(c => 
      c.id === coletorId 
        ? { ...c, ativo: false, status: 'pausado' }
        : c
    ));
  };

  const alternarColetor = (coletorId: string) => {
    const coletor = coletores.find(c => c.id === coletorId);
    if (!coletor) return;

    if (coletor.ativo) {
      pararColetor(coletorId);
    } else {
      setColetores(prev => prev.map(c => 
        c.id === coletorId 
          ? { ...c, ativo: true, status: 'ativo' }
          : c
      ));
      
      // Iniciar coletor após atualizar estado
      setTimeout(() => {
        const coletorAtualizado = coletores.find(c => c.id === coletorId);
        if (coletorAtualizado) {
          iniciarColetor({ ...coletorAtualizado, ativo: true, status: 'ativo' });
        }
      }, 100);
    }
  };

  const criarColetor = () => {
    if (!novoColetorConfig.nome || !novoColetorConfig.api) return;

    const novoColetor: ColetorConfig = {
      id: `coletor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      nome: novoColetorConfig.nome,
      api: novoColetorConfig.api,
      parametros: novoColetorConfig.parametros || {},
      intervalo: novoColetorConfig.intervalo || 30,
      ativo: false,
      totalColetado: 0,
      status: 'configurando'
    };

    setColetores(prev => [...prev, novoColetor]);
    setModalConfig(false);
    setNovoColetorConfig({
      nome: '',
      api: '',
      parametros: {},
      intervalo: 30,
      ativo: false
    });
  };

  const editarColetor = (coletor: ColetorConfig) => {
    setColetorEditando(coletor);
    setNovoColetorConfig(coletor);
    setModalConfig(true);
  };

  const salvarEdicao = () => {
    if (!coletorEditando || !novoColetorConfig.nome || !novoColetorConfig.api) return;

    // Parar coletor se estiver ativo
    if (coletorEditando.ativo) {
      pararColetor(coletorEditando.id);
    }

    setColetores(prev => prev.map(c => 
      c.id === coletorEditando.id 
        ? { 
            ...c, 
            nome: novoColetorConfig.nome!,
            api: novoColetorConfig.api!,
            parametros: novoColetorConfig.parametros!,
            intervalo: novoColetorConfig.intervalo!,
            status: 'configurando'
          }
        : c
    ));

    setModalConfig(false);
    setColetorEditando(null);
    setNovoColetorConfig({
      nome: '',
      api: '',
      parametros: {},
      intervalo: 30,
      ativo: false
    });
  };

  const excluirColetor = (coletorId: string) => {
    pararColetor(coletorId);
    setColetores(prev => prev.filter(c => c.id !== coletorId));
    setDadosColetados(prev => prev.filter(d => d.coletorId !== coletorId));
  };

  const exportarDados = (coletorId?: string) => {
    const dadosParaExportar = coletorId 
      ? dadosColetados.filter(d => d.coletorId === coletorId)
      : dadosColetados;

    const dadosCompletos = {
      coletores: coletorId ? coletores.filter(c => c.id === coletorId) : coletores,
      dados: dadosParaExportar,
      estatisticas,
      exportadoEm: new Date().toISOString()
    };

    const json = JSON.stringify(dadosCompletos, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `coleta_tempo_real_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const limparDados = () => {
    setDadosColetados([]);
    localStorage.removeItem('dados_coletados_tempo_real');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo':
        return 'success';
      case 'erro':
        return 'error';
      case 'pausado':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ativo':
        return <CheckIcon />;
      case 'erro':
        return <ErrorIcon />;
      case 'pausado':
        return <WarningIcon />;
      default:
        return <SettingsIcon />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <ScheduleIcon /> Coletor de Dados em Tempo Real
      </Typography>

      {/* Estatísticas */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="primary">
                {estatisticas.totalColetores}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total de Coletores
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="success.main">
                {estatisticas.coletoresAtivos}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Coletores Ativos
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="info.main">
                {estatisticas.totalDados.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Dados Coletados
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Button
                variant="contained"
                fullWidth
                startIcon={<SettingsIcon />}
                onClick={() => setModalConfig(true)}
              >
                Novo Coletor
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Lista de Coletores */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Coletores Configurados</Typography>
            <Box>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={() => exportarDados()}
                sx={{ mr: 1 }}
              >
                Exportar Todos
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={limparDados}
              >
                Limpar Dados
              </Button>
            </Box>
          </Box>

          {coletores.length === 0 ? (
            <Alert severity="info">
              Nenhum coletor configurado. Crie um novo coletor para começar a coleta automatizada de dados.
            </Alert>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>API</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Intervalo</TableCell>
                    <TableCell>Última Coleta</TableCell>
                    <TableCell>Total Coletado</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {coletores.map((coletor) => (
                    <TableRow key={coletor.id}>
                      <TableCell>{coletor.nome}</TableCell>
                      <TableCell>{coletor.api}</TableCell>
                      <TableCell>
                        <Chip
                          icon={getStatusIcon(coletor.status)}
                          label={coletor.status}
                          color={getStatusColor(coletor.status) as any}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{coletor.intervalo} min</TableCell>
                      <TableCell>{coletor.ultimaColeta || 'Nunca'}</TableCell>
                      <TableCell>{coletor.totalColetado.toLocaleString()}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={coletor.ativo}
                                onChange={() => alternarColetor(coletor.id)}
                                size="small"
                              />
                            }
                            label=""
                          />
                          <Tooltip title="Editar">
                            <IconButton size="small" onClick={() => editarColetor(coletor)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Exportar dados">
                            <IconButton size="small" onClick={() => exportarDados(coletor.id)}>
                              <DownloadIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Excluir">
                            <IconButton size="small" color="error" onClick={() => excluirColetor(coletor.id)}>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Dados Coletados Recentes */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">
            Dados Coletados Recentes ({dadosColetados.length.toLocaleString()})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>Coletor</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Tempo Resposta</TableCell>
                  <TableCell>Tamanho</TableCell>
                  <TableCell>Registros</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dadosColetados.slice(-50).reverse().map((dado) => {
                  const coletor = coletores.find(c => c.id === dado.coletorId);
                  return (
                    <TableRow key={dado.id}>
                      <TableCell>{new Date(dado.timestamp).toLocaleString('pt-BR')}</TableCell>
                      <TableCell>{coletor?.nome || 'Coletor removido'}</TableCell>
                      <TableCell>
                        <Chip
                          label={dado.status}
                          color={dado.status === 'sucesso' ? 'success' : 'error'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{dado.tempoResposta}ms</TableCell>
                      <TableCell>{(dado.tamanho / 1024).toFixed(1)} KB</TableCell>
                      <TableCell>
                        {Array.isArray(dado.dados) ? dado.dados.length : (dado.dados ? 1 : 0)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>

      {/* Modal de Configuração */}
      <Dialog open={modalConfig} onClose={() => setModalConfig(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {coletorEditando ? 'Editar Coletor' : 'Novo Coletor de Dados'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                label="Nome do Coletor"
                fullWidth
                value={novoColetorConfig.nome || ''}
                onChange={(e) => setNovoColetorConfig({ ...novoColetorConfig, nome: e.target.value })}
                placeholder="Ex: Coleta IBGE Municípios SP"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>API para Coleta</InputLabel>
                <Select
                  value={novoColetorConfig.api || ''}
                  onChange={(e) => setNovoColetorConfig({ ...novoColetorConfig, api: e.target.value })}
                  label="API para Coleta"
                >
                  <MenuItem value="ibge_municipios">IBGE - Municípios</MenuItem>
                  <MenuItem value="ibge_estados">IBGE - Estados</MenuItem>
                  <MenuItem value="bacen_selic">Banco Central - Taxa Selic</MenuItem>
                  <MenuItem value="bacen_ipca">Banco Central - IPCA</MenuItem>
                  <MenuItem value="bacen_cambio">Banco Central - Câmbio USD</MenuItem>
                  <MenuItem value="viacep">ViaCEP - Consulta CEP</MenuItem>
                  <MenuItem value="covid_brasil">COVID-19 Brasil</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography gutterBottom>Intervalo de Coleta (minutos)</Typography>
              <Slider
                value={novoColetorConfig.intervalo || 30}
                onChange={(_, value) => setNovoColetorConfig({ ...novoColetorConfig, intervalo: value as number })}
                min={1}
                max={1440}
                step={1}
                marks={[
                  { value: 1, label: '1min' },
                  { value: 30, label: '30min' },
                  { value: 60, label: '1h' },
                  { value: 360, label: '6h' },
                  { value: 1440, label: '24h' }
                ]}
                valueLabelDisplay="auto"
              />
            </Grid>

            {/* Parâmetros específicos por API */}
            {novoColetorConfig.api === 'ibge_municipios' && (
              <Grid item xs={12}>
                <TextField
                  label="UF (opcional)"
                  fullWidth
                  value={novoColetorConfig.parametros?.uf || ''}
                  onChange={(e) => setNovoColetorConfig({ 
                    ...novoColetorConfig, 
                    parametros: { ...novoColetorConfig.parametros, uf: e.target.value }
                  })}
                  placeholder="Ex: SP, RJ, MG"
                />
              </Grid>
            )}

            {novoColetorConfig.api === 'viacep' && (
              <Grid item xs={12}>
                <TextField
                  label="CEP"
                  fullWidth
                  value={novoColetorConfig.parametros?.cep || ''}
                  onChange={(e) => setNovoColetorConfig({ 
                    ...novoColetorConfig, 
                    parametros: { ...novoColetorConfig.parametros, cep: e.target.value }
                  })}
                  placeholder="Ex: 01001000"
                />
              </Grid>
            )}

            {novoColetorConfig.api === 'covid_brasil' && (
              <Grid item xs={12}>
                <TextField
                  label="UF (opcional)"
                  fullWidth
                  value={novoColetorConfig.parametros?.uf || ''}
                  onChange={(e) => setNovoColetorConfig({ 
                    ...novoColetorConfig, 
                    parametros: { ...novoColetorConfig.parametros, uf: e.target.value }
                  })}
                  placeholder="Ex: SP, RJ, MG"
                />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalConfig(false)}>Cancelar</Button>
          <Button 
            variant="contained" 
            onClick={coletorEditando ? salvarEdicao : criarColetor}
            disabled={!novoColetorConfig.nome || !novoColetorConfig.api}
          >
            {coletorEditando ? 'Salvar' : 'Criar Coletor'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ColetorTempoReal;
