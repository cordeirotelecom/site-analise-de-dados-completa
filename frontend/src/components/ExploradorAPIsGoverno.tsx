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
  Snackbar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Tabs,
  Tab,
  Divider,
  Stack
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  PlayArrow as PlayIcon,
  Download as DownloadIcon,
  Code as CodeIcon,
  Speed as SpeedIcon,
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Public as PublicIcon,
  AccountBalance as BankIcon,
  LocationOn as LocationIcon,
  School as SchoolIcon,
  Gavel as GavelIcon,
  Visibility as VisibilityIcon,
  DataUsage as DataIcon,
  Timeline as TimelineIcon,
  Map as MapIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import { 
  integradorApisGoverno, 
  type GovernmentAPI, 
  type DadosGovernamentais 
} from '../services/IntegradorApisGoverno';

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

const ExploradorAPIsGoverno: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [apisDisponiveis, setApisDisponiveis] = useState<GovernmentAPI[]>([]);
  const [dadosCarregados, setDadosCarregados] = useState<DadosGovernamentais | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [testeConectividade, setTesteConectividade] = useState<any[]>([]);
  const [modalConsulta, setModalConsulta] = useState(false);
  const [parametrosConsulta, setParametrosConsulta] = useState<any>({});
  const [apiSelecionada, setApiSelecionada] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' as any });

  // Estados específicos para cada seção
  const [dadosIBGE, setDadosIBGE] = useState<any>(null);
  const [dadosBacen, setDadosBacen] = useState<any>(null);
  const [dadosCEP, setDadosCEP] = useState<any>(null);
  const [dadosJudiciarios, setDadosJudiciarios] = useState<any>(null);
  const [dadosTransparencia, setDadosTransparencia] = useState<any>(null);

  useEffect(() => {
    const apis = integradorApisGoverno.obterAPIsDisponiveis();
    setApisDisponiveis(apis);
  }, []);

  const executarTesteConectividade = async () => {
    setCarregando(true);
    try {
      const resultados = await integradorApisGoverno.testarConectividade();
      setTesteConectividade(resultados);
      
      const todosOk = resultados.every(r => r.status === 'OK');
      setSnackbar({
        open: true,
        message: todosOk ? 'Todas as APIs estão funcionando!' : 'Algumas APIs apresentaram problemas',
        severity: todosOk ? 'success' : 'warning'
      });
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: 'Erro ao testar conectividade das APIs',
        severity: 'error'
      });
    } finally {
      setCarregando(false);
    }
  };

  const executarConsultaPersonalizada = async () => {
    if (!apiSelecionada) return;

    setCarregando(true);
    try {
      let resultado;

      switch (apiSelecionada) {
        case 'ibge_municipios_uf':
          resultado = await integradorApisGoverno.buscarMunicipiosPorEstado(parametrosConsulta.uf || 'SP');
          break;
        case 'ibge_regioes':
          resultado = await integradorApisGoverno.buscarTodasRegioes();
          break;
        case 'bacen_selic':
          resultado = await integradorApisGoverno.buscarTaxaSelic(parametrosConsulta.dataInicio, parametrosConsulta.dataFim);
          break;
        case 'bacen_ipca':
          resultado = await integradorApisGoverno.buscarIPCA(parametrosConsulta.dataInicio, parametrosConsulta.dataFim);
          break;
        case 'bacen_dolar':
          resultado = await integradorApisGoverno.buscarDolar(parametrosConsulta.dataInicio, parametrosConsulta.dataFim);
          break;
        case 'viacep':
          resultado = await integradorApisGoverno.buscarEnderecoPorCEP(parametrosConsulta.cep || '01001000');
          break;
        case 'cnj_dados':
          resultado = await integradorApisGoverno.buscarDadosJudiciarios(parametrosConsulta.tribunal);
          break;
        case 'transparencia_gastos':
          resultado = await integradorApisGoverno.buscarGastosPublicos(parametrosConsulta.orgao, parametrosConsulta.ano);
          break;
        default:
          throw new Error('Consulta não implementada');
      }

      setDadosCarregados(resultado);
      setModalConsulta(false);
      setSnackbar({
        open: true,
        message: `${resultado.dados.length} registros carregados com sucesso!`,
        severity: 'success'
      });

    } catch (error: any) {
      setSnackbar({
        open: true,
        message: `Erro na consulta: ${error.message}`,
        severity: 'error'
      });
    } finally {
      setCarregando(false);
    }
  };

  const carregarDadosIBGE = async () => {
    setCarregando(true);
    try {
      const municipiosSP = await integradorApisGoverno.buscarMunicipiosPorEstado('SP');
      const regioes = await integradorApisGoverno.buscarTodasRegioes();
      
      setDadosIBGE({
        municipiosSP,
        regioes,
        carregadoEm: new Date().toLocaleString('pt-BR')
      });

      setSnackbar({
        open: true,
        message: 'Dados do IBGE carregados com sucesso!',
        severity: 'success'
      });
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: `Erro ao carregar dados do IBGE: ${error.message}`,
        severity: 'error'
      });
    } finally {
      setCarregando(false);
    }
  };

  const carregarDadosBacen = async () => {
    setCarregando(true);
    try {
      const selic = await integradorApisGoverno.buscarTaxaSelic();
      const ipca = await integradorApisGoverno.buscarIPCA();
      const dolar = await integradorApisGoverno.buscarDolar();

      setDadosBacen({
        selic: selic.dados.slice(-30), // Últimos 30 registros
        ipca: ipca.dados.slice(-12), // Últimos 12 meses
        dolar: dolar.dados.slice(-30), // Últimos 30 dias
        carregadoEm: new Date().toLocaleString('pt-BR')
      });

      setSnackbar({
        open: true,
        message: 'Dados econômicos carregados com sucesso!',
        severity: 'success'
      });
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: `Erro ao carregar dados econômicos: ${error.message}`,
        severity: 'error'
      });
    } finally {
      setCarregando(false);
    }
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
      case 'OK':
      case 'ativo':
        return 'success';
      case 'ERRO':
      case 'indisponivel':
        return 'error';
      case 'manutencao':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getIconeAPI = (id: string) => {
    switch (id) {
      case 'ibge_localidades':
        return <MapIcon />;
      case 'bacen_series':
        return <TrendingUpIcon />;
      case 'viacep':
        return <LocationIcon />;
      case 'cnj_simulado':
        return <GavelIcon />;
      case 'transparencia_simulado':
        return <VisibilityIcon />;
      default:
        return <PublicIcon />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <PublicIcon /> Explorador de APIs Governamentais
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Acesse dados oficiais do governo brasileiro através de APIs integradas e estruturadas.
        Explore informações geográficas, econômicas, judiciais e de transparência pública.
      </Typography>

      {/* Controles principais */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<SpeedIcon />}
          onClick={executarTesteConectividade}
          disabled={carregando}
        >
          Testar Conectividade
        </Button>
        <Button
          variant="outlined"
          startIcon={<CodeIcon />}
          onClick={() => setModalConsulta(true)}
        >
          Consulta Personalizada
        </Button>
        {dadosCarregados && (
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => exportarDados(dadosCarregados, 'dados_governo')}
          >
            Exportar Dados
          </Button>
        )}
      </Stack>

      {/* Resultado do teste de conectividade */}
      {testeConectividade.length > 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Teste de Conectividade das APIs
            </Typography>
            <Grid container spacing={2}>
              {testeConectividade.map((teste, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper elevation={1} sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      {teste.status === 'OK' ? <CheckIcon color="success" /> : <ErrorIcon color="error" />}
                      <Typography variant="subtitle2">{teste.api}</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Status: <Chip label={teste.status} color={getStatusColor(teste.status) as any} size="small" />
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Tempo: {teste.tempo}ms
                    </Typography>
                    {teste.erro && (
                      <Typography variant="caption" color="error" display="block">
                        {teste.erro}
                      </Typography>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Navegação por categorias */}
      <Card sx={{ mb: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={(_, newValue) => setTabValue(newValue)}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab icon={<MapIcon />} label="IBGE - Geografia" />
            <Tab icon={<TrendingUpIcon />} label="Banco Central" />
            <Tab icon={<LocationIcon />} label="CEP & Endereços" />
            <Tab icon={<GavelIcon />} label="Dados Judiciais" />
            <Tab icon={<VisibilityIcon />} label="Transparência" />
            <Tab icon={<DataIcon />} label="APIs Disponíveis" />
          </Tabs>
        </Box>

        {/* Painel IBGE */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Instituto Brasileiro de Geografia e Estatística
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Dados oficiais sobre divisão territorial, população e estatísticas geográficas.
            </Typography>

            <Button
              variant="contained"
              onClick={carregarDadosIBGE}
              disabled={carregando}
              sx={{ mb: 3 }}
            >
              Carregar Dados do IBGE
            </Button>

            {dadosIBGE && (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Municípios de São Paulo
                      </Typography>
                      <Typography variant="h4" color="primary">
                        {dadosIBGE.municipiosSP.dados.length}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total de municípios
                      </Typography>
                      <Button
                        size="small"
                        startIcon={<DownloadIcon />}
                        onClick={() => exportarDados(dadosIBGE.municipiosSP, 'municipios_sp')}
                        sx={{ mt: 1 }}
                      >
                        Exportar
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Regiões do Brasil
                      </Typography>
                      <Typography variant="h4" color="primary">
                        {dadosIBGE.regioes.dados.length}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Regiões oficiais
                      </Typography>
                      <Button
                        size="small"
                        startIcon={<DownloadIcon />}
                        onClick={() => exportarDados(dadosIBGE.regioes, 'regioes_brasil')}
                        sx={{ mt: 1 }}
                      >
                        Exportar
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}
          </Box>
        </TabPanel>

        {/* Painel Banco Central */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Banco Central do Brasil
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Séries econômicas oficiais: Taxa Selic, IPCA, Câmbio e outros indicadores.
            </Typography>

            <Button
              variant="contained"
              onClick={carregarDadosBacen}
              disabled={carregando}
              sx={{ mb: 3 }}
            >
              Carregar Indicadores Econômicos
            </Button>

            {dadosBacen && (
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Taxa Selic
                      </Typography>
                      <Typography variant="h4" color="primary">
                        {dadosBacen.selic[dadosBacen.selic.length - 1]?.valorFormatado}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Última taxa registrada
                      </Typography>
                      <Typography variant="caption" display="block">
                        {dadosBacen.selic.length} registros disponíveis
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        IPCA
                      </Typography>
                      <Typography variant="h4" color="primary">
                        {dadosBacen.ipca[dadosBacen.ipca.length - 1]?.valorFormatado}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Último índice registrado
                      </Typography>
                      <Typography variant="caption" display="block">
                        {dadosBacen.ipca.length} registros disponíveis
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Dólar (USD/BRL)
                      </Typography>
                      <Typography variant="h4" color="primary">
                        R$ {dadosBacen.dolar[dadosBacen.dolar.length - 1]?.valorFormatado}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Última cotação
                      </Typography>
                      <Typography variant="caption" display="block">
                        {dadosBacen.dolar.length} registros disponíveis
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}

            {/* Códigos de séries do Banco Central */}
            <Accordion sx={{ mt: 3 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Códigos de Séries Disponíveis</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Código</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>Descrição</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {integradorApisGoverno.obterCodigosSeriesBacen().map((serie) => (
                        <TableRow key={serie.codigo}>
                          <TableCell>{serie.codigo}</TableCell>
                          <TableCell>{serie.nome}</TableCell>
                          <TableCell>{serie.descricao}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          </Box>
        </TabPanel>

        {/* Demais painéis simplificados */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>ViaCEP - Consulta de Endereços</Typography>
            <Alert severity="info">
              Use a consulta personalizada para buscar CEPs específicos.
            </Alert>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Dados Judiciais (Simulados)</Typography>
            <Alert severity="info">
              Dados estruturados baseados em estatísticas oficiais do CNJ.
            </Alert>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={4}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Portal da Transparência (Simulado)</Typography>
            <Alert severity="info">
              Dados de gastos públicos estruturados para análise.
            </Alert>
          </Box>
        </TabPanel>

        {/* Painel APIs Disponíveis */}
        <TabPanel value={tabValue} index={5}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              APIs Governamentais Disponíveis
            </Typography>
            <Grid container spacing={3}>
              {apisDisponiveis.map((api) => (
                <Grid item xs={12} md={6} key={api.id}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        {getIconeAPI(api.id)}
                        <Typography variant="h6">{api.nome}</Typography>
                        <Chip
                          label={api.status}
                          color={getStatusColor(api.status) as any}
                          size="small"
                        />
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {api.descricao}
                      </Typography>
                      
                      <Typography variant="caption" display="block" sx={{ mb: 1 }}>
                        <strong>Base URL:</strong> {api.baseUrl}
                      </Typography>
                      
                      <Typography variant="caption" display="block" sx={{ mb: 1 }}>
                        <strong>Endpoints:</strong> {api.endpoints.length}
                      </Typography>
                      
                      <Typography variant="caption" display="block" sx={{ mb: 2 }}>
                        <strong>Autenticação:</strong> {api.autenticacao ? 'Necessária' : 'Não necessária'}
                      </Typography>
                      
                      <Button
                        size="small"
                        variant="outlined"
                        href={api.documentacao}
                        target="_blank"
                        startIcon={<InfoIcon />}
                      >
                        Documentação
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </TabPanel>
      </Card>

      {/* Modal de consulta personalizada */}
      <Dialog open={modalConsulta} onClose={() => setModalConsulta(false)} maxWidth="md" fullWidth>
        <DialogTitle>Consulta Personalizada de API</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Consulta</InputLabel>
                <Select
                  value={apiSelecionada}
                  onChange={(e) => setApiSelecionada(e.target.value)}
                  label="Tipo de Consulta"
                >
                  <MenuItem value="ibge_municipios_uf">IBGE - Municípios por UF</MenuItem>
                  <MenuItem value="ibge_regioes">IBGE - Todas as Regiões</MenuItem>
                  <MenuItem value="bacen_selic">Banco Central - Taxa Selic</MenuItem>
                  <MenuItem value="bacen_ipca">Banco Central - IPCA</MenuItem>
                  <MenuItem value="bacen_dolar">Banco Central - Dólar</MenuItem>
                  <MenuItem value="viacep">ViaCEP - Buscar CEP</MenuItem>
                  <MenuItem value="cnj_dados">CNJ - Dados Judiciais</MenuItem>
                  <MenuItem value="transparencia_gastos">Transparência - Gastos Públicos</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Parâmetros específicos */}
            {(apiSelecionada === 'ibge_municipios_uf') && (
              <Grid item xs={12}>
                <TextField
                  label="UF"
                  fullWidth
                  value={parametrosConsulta.uf || ''}
                  onChange={(e) => setParametrosConsulta({ ...parametrosConsulta, uf: e.target.value })}
                  placeholder="Ex: SP, RJ, MG"
                />
              </Grid>
            )}

            {(apiSelecionada.startsWith('bacen_')) && (
              <>
                <Grid item xs={6}>
                  <TextField
                    label="Data Inicial"
                    type="date"
                    fullWidth
                    value={parametrosConsulta.dataInicio || ''}
                    onChange={(e) => setParametrosConsulta({ ...parametrosConsulta, dataInicio: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Data Final"
                    type="date"
                    fullWidth
                    value={parametrosConsulta.dataFim || ''}
                    onChange={(e) => setParametrosConsulta({ ...parametrosConsulta, dataFim: e.target.value })}
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
                  value={parametrosConsulta.cep || ''}
                  onChange={(e) => setParametrosConsulta({ ...parametrosConsulta, cep: e.target.value })}
                  placeholder="Ex: 01001000"
                />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalConsulta(false)}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={executarConsultaPersonalizada}
            disabled={!apiSelecionada || carregando}
          >
            Executar Consulta
          </Button>
        </DialogActions>
      </Dialog>

      {/* Exibição dos dados carregados */}
      {dadosCarregados && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Dados Carregados - {dadosCarregados.fonte}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Total de registros: {dadosCarregados.dados.length} | 
              Coletado em: {new Date(dadosCarregados.metadata.coletadoEm).toLocaleString('pt-BR')} |
              Qualidade: {dadosCarregados.metadata.qualidade}
            </Typography>
            
            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {dadosCarregados.dados.length > 0 && Object.keys(dadosCarregados.dados[0]).map(key => (
                      <TableCell key={key}>{key}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dadosCarregados.dados.slice(0, 100).map((item, index) => (
                    <TableRow key={index}>
                      {Object.values(item).map((value: any, i) => (
                        <TableCell key={i}>
                          {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            
            {dadosCarregados.dados.length > 100 && (
              <Alert severity="info" sx={{ mt: 2 }}>
                Exibindo apenas os primeiros 100 registros. Use o botão "Exportar Dados" para obter todos os registros.
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Loading */}
      {carregando && (
        <Box sx={{ mt: 2 }}>
          <LinearProgress />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
            Carregando dados...
          </Typography>
        </Box>
      )}

      {/* Snackbar */}
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

export default ExploradorAPIsGoverno;
