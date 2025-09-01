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
  Divider,
  Stack,
  LinearProgress,
  Badge,
  Avatar,
  CircularProgress
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  LocationOn as LocationIcon,
  LocalHospital as HealthIcon,
  School as SchoolIcon,
  DirectionsBus as BusIcon,
  TrendingUp as EconomyIcon,
  Map as MapIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  People as PeopleIcon,
  Business as BusinessIcon,
  Assessment as AssessmentIcon,
  GetApp as GetAppIcon,
  Info as InfoIcon,
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import {
  apiSantaCatarina,
  type DadosSaudePublica,
  type DadosEducacao,
  type DadosTransporte,
  type DadosEconomicos
} from '../services/APISantaCatarinaService';

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
      id={`sc-tabpanel-${index}`}
      aria-labelledby={`sc-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const DadosAbertosStaCatarina: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [carregando, setCarregando] = useState(false);
  const [filtros, setFiltros] = useState({
    municipio: '',
    busca: '',
    tipo: ''
  });

  // Estados dos dados
  const [dadosSaude, setDadosSaude] = useState<DadosSaudePublica[]>([]);
  const [dadosEducacao, setDadosEducacao] = useState<DadosEducacao[]>([]);
  const [dadosTransporte, setDadosTransporte] = useState<DadosTransporte[]>([]);
  const [dadosEconomia, setDadosEconomia] = useState<DadosEconomicos[]>([]);
  const [estatisticas, setEstatisticas] = useState<any>(null);
  const [statusAPI, setStatusAPI] = useState<any>(null);

  // Estados da interface
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' as any });
  const [modalExport, setModalExport] = useState(false);
  const [dadosExport, setDadosExport] = useState<any>(null);

  useEffect(() => {
    carregarTodosDados();
    verificarStatusAPI();
  }, []);

  const carregarTodosDados = async () => {
    setCarregando(true);
    try {
      const [saude, educacao, transporte, economia, stats] = await Promise.allSettled([
        apiSantaCatarina.obterEstabelecimentosSaude(),
        apiSantaCatarina.obterEscolas(),
        apiSantaCatarina.obterLinhasTransporte(),
        apiSantaCatarina.obterIndicadoresEconomicos(),
        apiSantaCatarina.obterEstatisticasGerais()
      ]);

      if (saude.status === 'fulfilled') {
        setDadosSaude(saude.value.dados);
      }
      if (educacao.status === 'fulfilled') {
        setDadosEducacao(educacao.value.dados);
      }
      if (transporte.status === 'fulfilled') {
        setDadosTransporte(transporte.value.dados);
      }
      if (economia.status === 'fulfilled') {
        setDadosEconomia(economia.value.dados);
      }
      if (stats.status === 'fulfilled') {
        setEstatisticas(stats.value);
      }

      setSnackbar({
        open: true,
        message: 'Dados carregados com sucesso!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setSnackbar({
        open: true,
        message: 'Erro ao carregar dados. Usando dados de exemplo.',
        severity: 'warning'
      });
    } finally {
      setCarregando(false);
    }
  };

  const verificarStatusAPI = async () => {
    try {
      const status = await apiSantaCatarina.verificarStatus();
      setStatusAPI(status);
    } catch (error) {
      console.error('Erro ao verificar status:', error);
    }
  };

  const carregarDadosMunicipio = async (municipio: string) => {
    setCarregando(true);
    try {
      let dados;
      if (municipio === 'São José') {
        dados = await apiSantaCatarina.obterDadosSaoJose();
      } else if (municipio === 'Florianópolis') {
        dados = await apiSantaCatarina.obterDadosFlorianopolis();
      } else {
        // Buscar dados gerais com filtro de município
        const [saude, educacao, transporte, economia] = await Promise.all([
          apiSantaCatarina.obterEstabelecimentosSaude({ municipio }),
          apiSantaCatarina.obterEscolas({ municipio }),
          apiSantaCatarina.obterLinhasTransporte({ municipio }),
          apiSantaCatarina.obterIndicadoresEconomicos({ municipio })
        ]);
        dados = {
          saude: saude.dados,
          educacao: educacao.dados,
          transporte: transporte.dados,
          economia: economia.dados
        };
      }

      setDadosSaude(dados.saude);
      setDadosEducacao(dados.educacao);
      setDadosTransporte(dados.transporte);
      setDadosEconomia(dados.economia);

    } catch (error) {
      console.error('Erro ao carregar dados do município:', error);
    } finally {
      setCarregando(false);
    }
  };

  const buscarPorTexto = async () => {
    if (!filtros.busca) return;
    
    setCarregando(true);
    try {
      const resultados = await apiSantaCatarina.buscarPorTexto(filtros.busca, filtros.tipo);
      
      // Separar resultados por categoria
      const saudeResultados = resultados.filter(r => r.categoria === 'saude');
      const educacaoResultados = resultados.filter(r => r.categoria === 'educacao');
      
      setDadosSaude(saudeResultados);
      setDadosEducacao(educacaoResultados);

    } catch (error) {
      console.error('Erro na busca:', error);
    } finally {
      setCarregando(false);
    }
  };

  const exportarDados = async (tipo: string) => {
    try {
      const json = await apiSantaCatarina.exportarDados(tipo, 'json');
      const csv = await apiSantaCatarina.exportarDados(tipo, 'csv');
      
      setDadosExport({ json, csv, tipo });
      setModalExport(true);
    } catch (error) {
      console.error('Erro ao exportar:', error);
    }
  };

  const downloadArquivo = (conteudo: string, nome: string, tipo: string) => {
    const blob = new Blob([conteudo], { 
      type: tipo === 'json' ? 'application/json' : 'text/csv' 
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${nome}_${new Date().toISOString().split('T')[0]}.${tipo}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const filtrarDados = (dados: any[], termoBusca: string, municipioFiltro: string) => {
    return dados.filter(item => {
      const matchBusca = !termoBusca || 
        Object.values(item).some(valor => 
          String(valor).toLowerCase().includes(termoBusca.toLowerCase())
        );
      
      const matchMunicipio = !municipioFiltro || 
        item.municipio?.toLowerCase().includes(municipioFiltro.toLowerCase());
      
      return matchBusca && matchMunicipio;
    });
  };

  const obterCorStatus = (status: string) => {
    switch (status) {
      case 'online': return 'success';
      case 'instavel': return 'warning';
      case 'offline': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <LocationIcon /> Dados Abertos de Santa Catarina
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Explore dados oficiais de saúde, educação, transporte e economia dos municípios catarinenses.
        Dados em tempo real com APIs funcionais e filtros avançados.
      </Typography>

      {/* Status da API */}
      {statusAPI && (
        <Card sx={{ mb: 3, bgcolor: statusAPI.status === 'online' ? 'success.light' : 'warning.light' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {statusAPI.status === 'online' ? <CheckIcon /> : <WarningIcon />}
              <Typography variant="h6">
                Status da API: {statusAPI.status}
              </Typography>
              <Chip
                label={`${statusAPI.tempo_resposta}ms`}
                color={statusAPI.tempo_resposta < 1000 ? 'success' : 'warning'}
                size="small"
              />
              <Typography variant="body2">
                {statusAPI.endpoints_funcionais}/{statusAPI.endpoints_testados} endpoints funcionais
              </Typography>
              <Button
                size="small"
                startIcon={<RefreshIcon />}
                onClick={verificarStatusAPI}
              >
                Atualizar
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Estatísticas Gerais */}
      {estatisticas && (
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <HealthIcon color="primary" />
                  <Typography variant="h4" color="primary">
                    {estatisticas.total_estabelecimentos_saude}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Estabelecimentos de Saúde
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <SchoolIcon color="success" />
                  <Typography variant="h4" color="success.main">
                    {estatisticas.total_escolas}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Instituições de Ensino
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <BusIcon color="info" />
                  <Typography variant="h4" color="info.main">
                    {estatisticas.total_linhas_transporte}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Linhas de Transporte
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <BusinessIcon color="warning" />
                  <Typography variant="h4" color="warning.main">
                    {estatisticas.municipios_ativos.length}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Municípios Ativos
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Filtros */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FilterIcon /> Filtros e Busca
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Buscar"
                value={filtros.busca}
                onChange={(e) => setFiltros({ ...filtros, busca: e.target.value })}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />
                }}
                placeholder="Nome, endereço, especialidade..."
              />
            </Grid>
            
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Município</InputLabel>
                <Select
                  value={filtros.municipio}
                  onChange={(e) => {
                    setFiltros({ ...filtros, municipio: e.target.value });
                    if (e.target.value) {
                      carregarDadosMunicipio(e.target.value);
                    }
                  }}
                  label="Município"
                >
                  <MenuItem value="">Todos</MenuItem>
                  <MenuItem value="São José">São José</MenuItem>
                  <MenuItem value="Florianópolis">Florianópolis</MenuItem>
                  <MenuItem value="Joinville">Joinville</MenuItem>
                  <MenuItem value="Blumenau">Blumenau</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Tipo</InputLabel>
                <Select
                  value={filtros.tipo}
                  onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
                  label="Tipo"
                >
                  <MenuItem value="">Todos</MenuItem>
                  <MenuItem value="saude">Saúde</MenuItem>
                  <MenuItem value="educacao">Educação</MenuItem>
                  <MenuItem value="transporte">Transporte</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  startIcon={<SearchIcon />}
                  onClick={buscarPorTexto}
                  disabled={carregando}
                >
                  Buscar
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<RefreshIcon />}
                  onClick={carregarTodosDados}
                  disabled={carregando}
                >
                  Atualizar
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {carregando && <LinearProgress sx={{ mb: 3 }} />}

      {/* Navegação por áreas */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={(_, newValue) => setTabValue(newValue)}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab icon={<HealthIcon />} label="Saúde" />
            <Tab icon={<SchoolIcon />} label="Educação" />
            <Tab icon={<BusIcon />} label="Transporte" />
            <Tab icon={<EconomyIcon />} label="Economia" />
          </Tabs>
        </Box>

        {/* Painel Saúde */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Estabelecimentos de Saúde</Typography>
            <Button
              startIcon={<GetAppIcon />}
              onClick={() => exportarDados('saude')}
            >
              Exportar Dados
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Município</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Especialidades</TableCell>
                  <TableCell>Contato</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtrarDados(dadosSaude, filtros.busca, filtros.municipio)
                  .slice(0, 10)
                  .map((estabelecimento) => (
                    <TableRow key={estabelecimento.id}>
                      <TableCell>
                        <Typography variant="subtitle2">
                          {estabelecimento.nome_estabelecimento}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {estabelecimento.endereco}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={estabelecimento.municipio} size="small" />
                      </TableCell>
                      <TableCell>{estabelecimento.tipo_estabelecimento}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {estabelecimento.especialidades.slice(0, 2).map((esp, index) => (
                            <Chip key={index} label={esp} size="small" variant="outlined" />
                          ))}
                          {estabelecimento.especialidades.length > 2 && (
                            <Tooltip title={estabelecimento.especialidades.slice(2).join(', ')}>
                              <Chip 
                                label={`+${estabelecimento.especialidades.length - 2}`} 
                                size="small" 
                              />
                            </Tooltip>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        {estabelecimento.telefone && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <PhoneIcon fontSize="small" />
                            <Typography variant="caption">
                              {estabelecimento.telefone}
                            </Typography>
                          </Box>
                        )}
                      </TableCell>
                      <TableCell>
                        {estabelecimento.latitude && estabelecimento.longitude && (
                          <Tooltip title="Ver no mapa">
                            <IconButton
                              size="small"
                              href={`https://maps.google.com/?q=${estabelecimento.latitude},${estabelecimento.longitude}`}
                              target="_blank"
                            >
                              <MapIcon />
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

        {/* Painel Educação */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Instituições de Ensino</Typography>
            <Button
              startIcon={<GetAppIcon />}
              onClick={() => exportarDados('educacao')}
            >
              Exportar Dados
            </Button>
          </Box>

          <Grid container spacing={3}>
            {filtrarDados(dadosEducacao, filtros.busca, filtros.municipio)
              .slice(0, 6)
              .map((escola) => (
                <Grid item xs={12} md={6} key={escola.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <SchoolIcon />
                        <Typography variant="h6">{escola.nome_escola}</Typography>
                        <Chip label={escola.tipo} size="small" />
                      </Box>

                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {escola.endereco}
                      </Typography>

                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                        {escola.modalidade.map((mod, index) => (
                          <Chip key={index} label={mod} size="small" variant="outlined" />
                        ))}
                      </Box>

                      <Stack spacing={1}>
                        {escola.numero_alunos && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PeopleIcon fontSize="small" />
                            <Typography variant="caption">
                              {escola.numero_alunos} alunos
                            </Typography>
                          </Box>
                        )}
                        
                        {escola.telefone && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PhoneIcon fontSize="small" />
                            <Typography variant="caption">
                              {escola.telefone}
                            </Typography>
                          </Box>
                        )}

                        {escola.email && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <EmailIcon fontSize="small" />
                            <Typography variant="caption">
                              {escola.email}
                            </Typography>
                          </Box>
                        )}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </TabPanel>

        {/* Painel Transporte */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Linhas de Transporte</Typography>
            <Button
              startIcon={<GetAppIcon />}
              onClick={() => exportarDados('transporte')}
            >
              Exportar Dados
            </Button>
          </Box>

          <List>
            {filtrarDados(dadosTransporte, filtros.busca, filtros.municipio)
              .slice(0, 10)
              .map((linha, index) => (
                <React.Fragment key={linha.id}>
                  <ListItem>
                    <ListItemIcon>
                      <BusIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1">{linha.linha}</Typography>
                          <Chip 
                            label={linha.status} 
                            color={linha.status === 'ativo' ? 'success' : 'warning'}
                            size="small" 
                          />
                          {linha.tarifa && (
                            <Chip label={`R$ ${linha.tarifa.toFixed(2)}`} size="small" />
                          )}
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2">
                            {linha.origem} → {linha.destino}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Horários: {linha.horarios.slice(0, 3).join(', ')}
                            {linha.horarios.length > 3 && ` +${linha.horarios.length - 3} mais`}
                          </Typography>
                          {linha.empresa && (
                            <Typography variant="caption" display="block">
                              Empresa: {linha.empresa}
                            </Typography>
                          )}
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < dadosTransporte.length - 1 && <Divider />}
                </React.Fragment>
              ))}
          </List>
        </TabPanel>

        {/* Painel Economia */}
        <TabPanel value={tabValue} index={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Indicadores Econômicos</Typography>
            <Button
              startIcon={<GetAppIcon />}
              onClick={() => exportarDados('economia')}
            >
              Exportar Dados
            </Button>
          </Box>

          <Grid container spacing={3}>
            {filtrarDados(dadosEconomia, filtros.busca, filtros.municipio)
              .map((indicador) => (
                <Grid item xs={12} md={6} key={`${indicador.municipio}-${indicador.ano}`}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <EconomyIcon />
                        <Typography variant="h6">{indicador.municipio}</Typography>
                        <Chip label={indicador.ano} size="small" />
                      </Box>

                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            População
                          </Typography>
                          <Typography variant="h6">
                            {indicador.populacao?.toLocaleString('pt-BR')}
                          </Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Empregos Formais
                          </Typography>
                          <Typography variant="h6">
                            {indicador.emprego_formal.toLocaleString('pt-BR')}
                          </Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Empresas Ativas
                          </Typography>
                          <Typography variant="h6">
                            {indicador.empresas_ativas.toLocaleString('pt-BR')}
                          </Typography>
                        </Grid>

                        {indicador.indicadores.pib_per_capita && (
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              PIB per capita
                            </Typography>
                            <Typography variant="h6">
                              R$ {indicador.indicadores.pib_per_capita.toLocaleString('pt-BR')}
                            </Typography>
                          </Grid>
                        )}
                      </Grid>

                      {Object.keys(indicador.indicadores).length > 1 && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Outros indicadores:
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {Object.entries(indicador.indicadores)
                              .filter(([key]) => key !== 'pib_per_capita')
                              .map(([key, value]) => (
                                <Chip 
                                  key={key}
                                  label={`${key}: ${value}`}
                                  size="small"
                                  variant="outlined"
                                />
                              ))}
                          </Box>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </TabPanel>
      </Card>

      {/* Modal de Exportação */}
      <Dialog open={modalExport} onClose={() => setModalExport(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Exportar Dados - {dadosExport?.tipo}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Escolha o formato para download dos dados:
          </Typography>
          
          <Stack spacing={2}>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={() => {
                downloadArquivo(dadosExport.json, dadosExport.tipo, 'json');
                setModalExport(false);
              }}
            >
              Download JSON
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={() => {
                downloadArquivo(dadosExport.csv, dadosExport.tipo, 'csv');
                setModalExport(false);
              }}
            >
              Download CSV
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalExport(false)}>Fechar</Button>
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

export default DadosAbertosStaCatarina;
