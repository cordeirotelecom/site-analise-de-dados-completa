import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
  Snackbar,
  Alert,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Divider,
  Stack,
  LinearProgress,
  Badge,
  Avatar
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Launch as LaunchIcon,
  Download as DownloadIcon,
  Api as ApiIcon,
  Public as PublicIcon,
  LocationOn as LocationIcon,
  School as SchoolIcon,
  LocalHospital as HealthIcon,
  AccountBalance as GovernmentIcon,
  Language as GlobalIcon,
  Assessment as DataIcon,
  Star as StarIcon,
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Code as CodeIcon,
  PlayArrow as PlayIcon,
  GetApp as GetAppIcon,
  Info as InfoIcon,
  Business as BusinessIcon,
  Nature as NatureIcon,
  Security as SecurityIcon,
  MonetizationOn as EconomyIcon
} from '@mui/icons-material';
import { 
  catalogoDadosAbertos, 
  type PortalDadosAbertos, 
  type APIEndpoint 
} from '../services/CatalogoDadosAbertos';
import axios from 'axios';

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
      id={`portal-tabpanel-${index}`}
      aria-labelledby={`portal-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const CatalogoDadosAbertosCompleto: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [portais, setPortais] = useState<PortalDadosAbertos[]>([]);
  const [portaisFiltrados, setPortaisFiltrados] = useState<PortalDadosAbertos[]>([]);
  const [apis, setApis] = useState<APIEndpoint[]>([]);
  const [filtros, setFiltros] = useState({
    busca: '',
    categoria: '',
    regiao: '',
    tema: '',
    qualidade: '',
    comAPI: false,
    semAutenticacao: false
  });
  const [estatisticas, setEstatisticas] = useState<any>(null);
  const [modalAPI, setModalAPI] = useState(false);
  const [apiSelecionada, setApiSelecionada] = useState<APIEndpoint | null>(null);
  const [parametrosAPI, setParametrosAPI] = useState<any>({});
  const [resultadoAPI, setResultadoAPI] = useState<any>(null);
  const [carregandoAPI, setCarregandoAPI] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' as any });

  useEffect(() => {
    carregarDados();
  }, []);

  useEffect(() => {
    aplicarFiltros();
  }, [filtros, portais]);

  const carregarDados = () => {
    const todosPortais = catalogoDadosAbertos.obterTodosPortais();
    const apisEstruturadas = catalogoDadosAbertos.obterAPIsEstruturadas();
    const stats = catalogoDadosAbertos.obterEstatisticas();
    
    setPortais(todosPortais);
    setPortaisFiltrados(todosPortais);
    setApis(apisEstruturadas);
    setEstatisticas(stats);
  };

  const aplicarFiltros = () => {
    let resultado = [...portais];

    if (filtros.busca) {
      resultado = resultado.filter(portal =>
        portal.nome.toLowerCase().includes(filtros.busca.toLowerCase()) ||
        portal.descricao.toLowerCase().includes(filtros.busca.toLowerCase()) ||
        portal.temas.some(tema => tema.toLowerCase().includes(filtros.busca.toLowerCase()))
      );
    }

    if (filtros.categoria) {
      resultado = resultado.filter(portal => portal.categoria === filtros.categoria);
    }

    if (filtros.regiao) {
      resultado = resultado.filter(portal => 
        portal.regiao.toLowerCase().includes(filtros.regiao.toLowerCase())
      );
    }

    if (filtros.tema) {
      resultado = resultado.filter(portal =>
        portal.temas.some(tema => tema.toLowerCase().includes(filtros.tema.toLowerCase()))
      );
    }

    if (filtros.qualidade) {
      resultado = resultado.filter(portal => portal.qualidade === filtros.qualidade);
    }

    if (filtros.comAPI) {
      resultado = resultado.filter(portal => portal.api);
    }

    if (filtros.semAutenticacao) {
      resultado = resultado.filter(portal => !portal.autenticacao);
    }

    setPortaisFiltrados(resultado);
  };

  const limparFiltros = () => {
    setFiltros({
      busca: '',
      categoria: '',
      regiao: '',
      tema: '',
      qualidade: '',
      comAPI: false,
      semAutenticacao: false
    });
  };

  const executarAPI = async () => {
    if (!apiSelecionada) return;

    setCarregandoAPI(true);
    try {
      // Construir URL com parâmetros
      let url = apiSelecionada.url;
      const params = new URLSearchParams();

      apiSelecionada.parametros.forEach(param => {
        if (parametrosAPI[param.nome]) {
          params.append(param.nome, parametrosAPI[param.nome]);
        } else if (param.obrigatorio) {
          params.append(param.nome, param.exemplo);
        }
      });

      if (params.toString()) {
        url += (url.includes('?') ? '&' : '?') + params.toString();
      }

      const response = await axios.get(url, { 
        timeout: 10000,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'DataSciencePro/2.0'
        }
      });

      setResultadoAPI({
        url: url,
        status: response.status,
        data: response.data,
        timestamp: new Date().toISOString()
      });

      setSnackbar({
        open: true,
        message: 'API executada com sucesso!',
        severity: 'success'
      });

    } catch (error: any) {
      console.error('Erro na API:', error);
      setResultadoAPI({
        url: apiSelecionada.url,
        status: error.response?.status || 0,
        error: error.message,
        timestamp: new Date().toISOString()
      });

      setSnackbar({
        open: true,
        message: `Erro na API: ${error.message}`,
        severity: 'error'
      });
    } finally {
      setCarregandoAPI(false);
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

  const obterIconeCategoria = (categoria: string) => {
    switch (categoria) {
      case 'municipal': return <LocationIcon />;
      case 'estadual': return <BusinessIcon />;
      case 'federal': return <GovernmentIcon />;
      case 'internacional': return <GlobalIcon />;
      default: return <PublicIcon />;
    }
  };

  const obterIconeTema = (tema: string) => {
    const temaLower = tema.toLowerCase();
    if (temaLower.includes('saúde')) return <HealthIcon />;
    if (temaLower.includes('educação')) return <SchoolIcon />;
    if (temaLower.includes('economia')) return <EconomyIcon />;
    if (temaLower.includes('meio ambiente')) return <NatureIcon />;
    if (temaLower.includes('segurança')) return <SecurityIcon />;
    return <DataIcon />;
  };

  const obterCorStatus = (status: string) => {
    switch (status) {
      case 'ativo': return 'success';
      case 'manutencao': return 'warning';
      case 'indisponivel': return 'error';
      default: return 'default';
    }
  };

  const obterCorQualidade = (qualidade: string) => {
    switch (qualidade) {
      case 'alta': return 'success';
      case 'media': return 'warning';
      case 'baixa': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <PublicIcon /> Catálogo Completo de Dados Abertos
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Explore portais de dados abertos de São José/SC, Florianópolis, Santa Catarina, Brasil e mundo. 
        Acesse APIs funcionais com filtros avançados, documentação completa e exemplos práticos.
      </Typography>

      {/* Estatísticas Gerais */}
      {estatisticas && (
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="primary" gutterBottom>
                  {estatisticas.total_portais}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Portais Catalogados
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="success.main" gutterBottom>
                  {estatisticas.com_api}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Com API Disponível
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="info.main" gutterBottom>
                  {estatisticas.sem_autenticacao}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Acesso Livre
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="warning.main" gutterBottom>
                  {estatisticas.qualidade_alta}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Alta Qualidade
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Filtros Avançados */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FilterIcon /> Filtros Avançados
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Buscar portais"
                value={filtros.busca}
                onChange={(e) => setFiltros({ ...filtros, busca: e.target.value })}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />
                }}
                placeholder="Nome, descrição, tema..."
              />
            </Grid>
            
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Categoria</InputLabel>
                <Select
                  value={filtros.categoria}
                  onChange={(e) => setFiltros({ ...filtros, categoria: e.target.value })}
                  label="Categoria"
                >
                  <MenuItem value="">Todas</MenuItem>
                  <MenuItem value="municipal">Municipal</MenuItem>
                  <MenuItem value="estadual">Estadual</MenuItem>
                  <MenuItem value="federal">Federal</MenuItem>
                  <MenuItem value="internacional">Internacional</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Região</InputLabel>
                <Select
                  value={filtros.regiao}
                  onChange={(e) => setFiltros({ ...filtros, regiao: e.target.value })}
                  label="Região"
                >
                  <MenuItem value="">Todas</MenuItem>
                  <MenuItem value="Santa Catarina">Santa Catarina</MenuItem>
                  <MenuItem value="São Paulo">São Paulo</MenuItem>
                  <MenuItem value="Brasil">Brasil</MenuItem>
                  <MenuItem value="Mundial">Mundial</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Tema</InputLabel>
                <Select
                  value={filtros.tema}
                  onChange={(e) => setFiltros({ ...filtros, tema: e.target.value })}
                  label="Tema"
                >
                  <MenuItem value="">Todos</MenuItem>
                  <MenuItem value="Saúde">Saúde</MenuItem>
                  <MenuItem value="Educação">Educação</MenuItem>
                  <MenuItem value="Economia">Economia</MenuItem>
                  <MenuItem value="Meio Ambiente">Meio Ambiente</MenuItem>
                  <MenuItem value="Transporte">Transporte</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Qualidade</InputLabel>
                <Select
                  value={filtros.qualidade}
                  onChange={(e) => setFiltros({ ...filtros, qualidade: e.target.value })}
                  label="Qualidade"
                >
                  <MenuItem value="">Todas</MenuItem>
                  <MenuItem value="alta">Alta</MenuItem>
                  <MenuItem value="media">Média</MenuItem>
                  <MenuItem value="baixa">Baixa</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={() => setFiltros({ ...filtros, comAPI: !filtros.comAPI })}
              color={filtros.comAPI ? 'primary' : 'inherit'}
            >
              Apenas com API
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<CheckIcon />}
              onClick={() => setFiltros({ ...filtros, semAutenticacao: !filtros.semAutenticacao })}
              color={filtros.semAutenticacao ? 'primary' : 'inherit'}
            >
              Acesso Livre
            </Button>

            <Button onClick={limparFiltros} color="secondary">
              Limpar Filtros
            </Button>

            <Typography variant="body2" color="text.secondary">
              {portaisFiltrados.length} de {portais.length} portais
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      {/* Navegação por categorias */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={(_, newValue) => setTabValue(newValue)}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab icon={<LocationIcon />} label="Santa Catarina" />
            <Tab icon={<BusinessIcon />} label="Estados" />
            <Tab icon={<GovernmentIcon />} label="Federal" />
            <Tab icon={<GlobalIcon />} label="Internacional" />
            <Tab icon={<ApiIcon />} label="APIs Testáveis" />
          </Tabs>
        </Box>

        {/* Painel Santa Catarina */}
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom>
            Portais de Dados Abertos - Santa Catarina
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Dados oficiais de municípios catarinenses e do governo estadual.
          </Typography>

          <Grid container spacing={3}>
            {portaisFiltrados
              .filter(portal => portal.regiao.includes('Santa Catarina') || portal.regiao.includes('SC'))
              .map((portal) => (
                <Grid item xs={12} lg={6} key={portal.id}>
                  <Card sx={{ height: '100%', position: 'relative' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        {obterIconeCategoria(portal.categoria)}
                        <Typography variant="h6">{portal.nome}</Typography>
                        <Chip
                          label={portal.status}
                          color={obterCorStatus(portal.status) as any}
                          size="small"
                        />
                      </Box>

                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {portal.descricao}
                      </Typography>

                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                        <Chip label={portal.categoria} size="small" variant="outlined" />
                        <Chip label={portal.regiao} size="small" variant="outlined" />
                        <Chip
                          label={`Qualidade: ${portal.qualidade}`}
                          color={obterCorQualidade(portal.qualidade) as any}
                          size="small"
                        />
                      </Box>

                      <Typography variant="caption" display="block" sx={{ mb: 1 }}>
                        <strong>Temas:</strong> {portal.temas.join(', ')}
                      </Typography>

                      <Typography variant="caption" display="block" sx={{ mb: 1 }}>
                        <strong>Formatos:</strong> {portal.formatos.join(', ')}
                      </Typography>

                      <Typography variant="caption" display="block" sx={{ mb: 2 }}>
                        <strong>Última atualização:</strong> {portal.ultimaAtualizacao}
                      </Typography>

                      <Stack direction="row" spacing={1}>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<LaunchIcon />}
                          href={portal.url}
                          target="_blank"
                        >
                          Visitar Portal
                        </Button>

                        {portal.api && (
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<ApiIcon />}
                            href={portal.api}
                            target="_blank"
                          >
                            Documentação API
                          </Button>
                        )}

                        <Tooltip title="Exportar informações">
                          <IconButton
                            size="small"
                            onClick={() => exportarDados(portal, portal.nome)}
                          >
                            <DownloadIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>

                      {portal.api && (
                        <Chip
                          icon={<ApiIcon />}
                          label="API Disponível"
                          color="primary"
                          size="small"
                          sx={{ position: 'absolute', top: 8, right: 8 }}
                        />
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </TabPanel>

        {/* Demais painéis simplificados */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>Portais Estaduais</Typography>
          <Grid container spacing={3}>
            {portaisFiltrados
              .filter(portal => portal.categoria === 'estadual')
              .map((portal) => (
                <Grid item xs={12} md={6} key={portal.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        {obterIconeCategoria(portal.categoria)}
                        <Typography variant="h6">{portal.nome}</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {portal.regiao} - {portal.descricao}
                      </Typography>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<LaunchIcon />}
                        href={portal.url}
                        target="_blank"
                      >
                        Acessar Portal
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>Portais Federais</Typography>
          <Grid container spacing={3}>
            {portaisFiltrados
              .filter(portal => portal.categoria === 'federal')
              .map((portal) => (
                <Grid item xs={12} md={6} key={portal.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        {obterIconeCategoria(portal.categoria)}
                        <Typography variant="h6">{portal.nome}</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {portal.descricao}
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<LaunchIcon />}
                          href={portal.url}
                          target="_blank"
                        >
                          Portal
                        </Button>
                        {portal.api && (
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<ApiIcon />}
                            href={portal.api}
                            target="_blank"
                          >
                            API
                          </Button>
                        )}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom>Portais Internacionais</Typography>
          <Grid container spacing={3}>
            {portaisFiltrados
              .filter(portal => portal.categoria === 'internacional')
              .map((portal) => (
                <Grid item xs={12} md={6} key={portal.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        {obterIconeCategoria(portal.categoria)}
                        <Typography variant="h6">{portal.nome}</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {portal.regiao} - {portal.descricao}
                      </Typography>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<LaunchIcon />}
                        href={portal.url}
                        target="_blank"
                      >
                        Acessar Portal
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </TabPanel>

        {/* Painel APIs Testáveis */}
        <TabPanel value={tabValue} index={4}>
          <Typography variant="h6" gutterBottom>
            APIs Testáveis e Funcionais
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            APIs estruturadas que você pode testar diretamente com parâmetros personalizados.
          </Typography>

          <Grid container spacing={3}>
            {apis.map((api) => (
              <Grid item xs={12} key={api.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6">{api.nome}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {api.descricao}
                        </Typography>
                        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                          <strong>Portal:</strong> {api.portal}
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        startIcon={<PlayIcon />}
                        onClick={() => {
                          setApiSelecionada(api);
                          setParametrosAPI({});
                          setResultadoAPI(null);
                          setModalAPI(true);
                        }}
                      >
                        Testar API
                      </Button>
                    </Box>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                      <Chip label={api.metodo} color="primary" size="small" />
                      {api.paginacao && <Chip label="Paginação" size="small" />}
                      <Chip label={`${api.parametros.length} parâmetros`} size="small" />
                    </Box>

                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>URL:</strong> <code>{api.url}</code>
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Filtros disponíveis:</strong> {api.filtros_disponiveis.join(', ')}
                    </Typography>

                    <Typography variant="body2">
                      <strong>Exemplo:</strong> <code>{api.exemplo}</code>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </Card>

      {/* Modal de Teste de API */}
      <Dialog open={modalAPI} onClose={() => setModalAPI(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          Testar API: {apiSelecionada?.nome}
        </DialogTitle>
        <DialogContent>
          {apiSelecionada && (
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {apiSelecionada.descricao}
              </Typography>

              <Typography variant="h6" gutterBottom>Parâmetros</Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {apiSelecionada.parametros.map((param) => (
                  <Grid item xs={12} md={6} key={param.nome}>
                    <TextField
                      fullWidth
                      label={param.nome}
                      type={param.tipo === 'number' ? 'number' : 'text'}
                      required={param.obrigatorio}
                      value={parametrosAPI[param.nome] || ''}
                      onChange={(e) => setParametrosAPI({
                        ...parametrosAPI,
                        [param.nome]: e.target.value
                      })}
                      placeholder={param.exemplo}
                      helperText={param.descricao}
                    />
                  </Grid>
                ))}
              </Grid>

              {carregandoAPI && <LinearProgress sx={{ mb: 2 }} />}

              {resultadoAPI && (
                <Box>
                  <Typography variant="h6" gutterBottom>Resultado</Typography>
                  <Alert
                    severity={resultadoAPI.error ? 'error' : 'success'}
                    sx={{ mb: 2 }}
                  >
                    Status: {resultadoAPI.status} | 
                    URL: {resultadoAPI.url} | 
                    Timestamp: {new Date(resultadoAPI.timestamp).toLocaleString('pt-BR')}
                  </Alert>

                  <Paper sx={{ p: 2, maxHeight: 400, overflow: 'auto', backgroundColor: '#f5f5f5' }}>
                    <pre style={{ margin: 0, fontSize: '12px' }}>
                      {JSON.stringify(resultadoAPI.data || resultadoAPI.error, null, 2)}
                    </pre>
                  </Paper>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalAPI(false)}>Fechar</Button>
          {resultadoAPI && (
            <Button
              startIcon={<DownloadIcon />}
              onClick={() => exportarDados(resultadoAPI, `api_${apiSelecionada?.nome}`)}
            >
              Exportar Resultado
            </Button>
          )}
          <Button
            variant="contained"
            startIcon={<PlayIcon />}
            onClick={executarAPI}
            disabled={carregandoAPI}
          >
            {carregandoAPI ? 'Executando...' : 'Executar API'}
          </Button>
        </DialogActions>
      </Dialog>

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

export default CatalogoDadosAbertosCompleto;
