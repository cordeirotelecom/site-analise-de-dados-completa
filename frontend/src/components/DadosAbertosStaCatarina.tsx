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
                  <MenuItem value="">Todos os Municípios</MenuItem>
                  <MenuItem value="Abdon Batista">Abdon Batista</MenuItem>
                  <MenuItem value="Abelardo Luz">Abelardo Luz</MenuItem>
                  <MenuItem value="Agrolândia">Agrolândia</MenuItem>
                  <MenuItem value="Agronômica">Agronômica</MenuItem>
                  <MenuItem value="Água Doce">Água Doce</MenuItem>
                  <MenuItem value="Águas de Chapecó">Águas de Chapecó</MenuItem>
                  <MenuItem value="Águas Frias">Águas Frias</MenuItem>
                  <MenuItem value="Águas Mornas">Águas Mornas</MenuItem>
                  <MenuItem value="Alfredo Wagner">Alfredo Wagner</MenuItem>
                  <MenuItem value="Alto Bela Vista">Alto Bela Vista</MenuItem>
                  <MenuItem value="Anchieta">Anchieta</MenuItem>
                  <MenuItem value="Angelina">Angelina</MenuItem>
                  <MenuItem value="Anita Garibaldi">Anita Garibaldi</MenuItem>
                  <MenuItem value="Anitápolis">Anitápolis</MenuItem>
                  <MenuItem value="Antônio Carlos">Antônio Carlos</MenuItem>
                  <MenuItem value="Apiúna">Apiúna</MenuItem>
                  <MenuItem value="Arabutã">Arabutã</MenuItem>
                  <MenuItem value="Araquari">Araquari</MenuItem>
                  <MenuItem value="Araranguá">Araranguá</MenuItem>
                  <MenuItem value="Armazém">Armazém</MenuItem>
                  <MenuItem value="Arroio Trinta">Arroio Trinta</MenuItem>
                  <MenuItem value="Arvoredo">Arvoredo</MenuItem>
                  <MenuItem value="Ascurra">Ascurra</MenuItem>
                  <MenuItem value="Atalanta">Atalanta</MenuItem>
                  <MenuItem value="Aurora">Aurora</MenuItem>
                  <MenuItem value="Balneário Arroio do Silva">Balneário Arroio do Silva</MenuItem>
                  <MenuItem value="Balneário Barra do Sul">Balneário Barra do Sul</MenuItem>
                  <MenuItem value="Balneário Camboriú">Balneário Camboriú</MenuItem>
                  <MenuItem value="Balneário Gaivota">Balneário Gaivota</MenuItem>
                  <MenuItem value="Bandeirante">Bandeirante</MenuItem>
                  <MenuItem value="Barra Bonita">Barra Bonita</MenuItem>
                  <MenuItem value="Barra Velha">Barra Velha</MenuItem>
                  <MenuItem value="Bela Vista do Toldo">Bela Vista do Toldo</MenuItem>
                  <MenuItem value="Belmonte">Belmonte</MenuItem>
                  <MenuItem value="Benedito Novo">Benedito Novo</MenuItem>
                  <MenuItem value="Biguaçu">Biguaçu</MenuItem>
                  <MenuItem value="Blumenau">Blumenau</MenuItem>
                  <MenuItem value="Bocaina do Sul">Bocaina do Sul</MenuItem>
                  <MenuItem value="Bom Jardim da Serra">Bom Jardim da Serra</MenuItem>
                  <MenuItem value="Bom Jesus">Bom Jesus</MenuItem>
                  <MenuItem value="Bom Jesus do Oeste">Bom Jesus do Oeste</MenuItem>
                  <MenuItem value="Bom Retiro">Bom Retiro</MenuItem>
                  <MenuItem value="Bombinhas">Bombinhas</MenuItem>
                  <MenuItem value="Botuverá">Botuverá</MenuItem>
                  <MenuItem value="Braço do Norte">Braço do Norte</MenuItem>
                  <MenuItem value="Braço do Trombudo">Braço do Trombudo</MenuItem>
                  <MenuItem value="Brunópolis">Brunópolis</MenuItem>
                  <MenuItem value="Brusque">Brusque</MenuItem>
                  <MenuItem value="Caçador">Caçador</MenuItem>
                  <MenuItem value="Caibi">Caibi</MenuItem>
                  <MenuItem value="Calmon">Calmon</MenuItem>
                  <MenuItem value="Camboriú">Camboriú</MenuItem>
                  <MenuItem value="Campo Alegre">Campo Alegre</MenuItem>
                  <MenuItem value="Campo Belo do Sul">Campo Belo do Sul</MenuItem>
                  <MenuItem value="Campo Erê">Campo Erê</MenuItem>
                  <MenuItem value="Campos Novos">Campos Novos</MenuItem>
                  <MenuItem value="Canelinha">Canelinha</MenuItem>
                  <MenuItem value="Canoinhas">Canoinhas</MenuItem>
                  <MenuItem value="Capão Alto">Capão Alto</MenuItem>
                  <MenuItem value="Capinzal">Capinzal</MenuItem>
                  <MenuItem value="Capivari de Baixo">Capivari de Baixo</MenuItem>
                  <MenuItem value="Catanduvas">Catanduvas</MenuItem>
                  <MenuItem value="Caxambu do Sul">Caxambu do Sul</MenuItem>
                  <MenuItem value="Celso Ramos">Celso Ramos</MenuItem>
                  <MenuItem value="Cerro Negro">Cerro Negro</MenuItem>
                  <MenuItem value="Chapadão do Lageado">Chapadão do Lageado</MenuItem>
                  <MenuItem value="Chapecó">Chapecó</MenuItem>
                  <MenuItem value="Cocal do Sul">Cocal do Sul</MenuItem>
                  <MenuItem value="Concórdia">Concórdia</MenuItem>
                  <MenuItem value="Cordilheira Alta">Cordilheira Alta</MenuItem>
                  <MenuItem value="Coronel Freitas">Coronel Freitas</MenuItem>
                  <MenuItem value="Coronel Martins">Coronel Martins</MenuItem>
                  <MenuItem value="Correia Pinto">Correia Pinto</MenuItem>
                  <MenuItem value="Corupá">Corupá</MenuItem>
                  <MenuItem value="Criciúma">Criciúma</MenuItem>
                  <MenuItem value="Cunha Porã">Cunha Porã</MenuItem>
                  <MenuItem value="Cunhataí">Cunhataí</MenuItem>
                  <MenuItem value="Curitibanos">Curitibanos</MenuItem>
                  <MenuItem value="Descanso">Descanso</MenuItem>
                  <MenuItem value="Dionísio Cerqueira">Dionísio Cerqueira</MenuItem>
                  <MenuItem value="Dona Emma">Dona Emma</MenuItem>
                  <MenuItem value="Doutor Pedrinho">Doutor Pedrinho</MenuItem>
                  <MenuItem value="Entre Rios">Entre Rios</MenuItem>
                  <MenuItem value="Ermo">Ermo</MenuItem>
                  <MenuItem value="Erval Velho">Erval Velho</MenuItem>
                  <MenuItem value="Faxinal dos Guedes">Faxinal dos Guedes</MenuItem>
                  <MenuItem value="Flor do Sertão">Flor do Sertão</MenuItem>
                  <MenuItem value="Florianópolis">Florianópolis</MenuItem>
                  <MenuItem value="Formosa do Sul">Formosa do Sul</MenuItem>
                  <MenuItem value="Forquilhinha">Forquilhinha</MenuItem>
                  <MenuItem value="Fraiburgo">Fraiburgo</MenuItem>
                  <MenuItem value="Frei Rogério">Frei Rogério</MenuItem>
                  <MenuItem value="Galvão">Galvão</MenuItem>
                  <MenuItem value="Garopaba">Garopaba</MenuItem>
                  <MenuItem value="Garuva">Garuva</MenuItem>
                  <MenuItem value="Gaspar">Gaspar</MenuItem>
                  <MenuItem value="Governador Celso Ramos">Governador Celso Ramos</MenuItem>
                  <MenuItem value="Grão Pará">Grão Pará</MenuItem>
                  <MenuItem value="Gravatal">Gravatal</MenuItem>
                  <MenuItem value="Guabiruba">Guabiruba</MenuItem>
                  <MenuItem value="Guaraciaba">Guaraciaba</MenuItem>
                  <MenuItem value="Guaramirim">Guaramirim</MenuItem>
                  <MenuItem value="Guarujá do Sul">Guarujá do Sul</MenuItem>
                  <MenuItem value="Guatambú">Guatambú</MenuItem>
                  <MenuItem value="Herval d'Oeste">Herval d'Oeste</MenuItem>
                  <MenuItem value="Ibiam">Ibiam</MenuItem>
                  <MenuItem value="Ibicaré">Ibicaré</MenuItem>
                  <MenuItem value="Ibirama">Ibirama</MenuItem>
                  <MenuItem value="Içara">Içara</MenuItem>
                  <MenuItem value="Ilhota">Ilhota</MenuItem>
                  <MenuItem value="Imaruí">Imaruí</MenuItem>
                  <MenuItem value="Imbituba">Imbituba</MenuItem>
                  <MenuItem value="Imbuia">Imbuia</MenuItem>
                  <MenuItem value="Indaial">Indaial</MenuItem>
                  <MenuItem value="Iomerê">Iomerê</MenuItem>
                  <MenuItem value="Ipira">Ipira</MenuItem>
                  <MenuItem value="Iporã do Oeste">Iporã do Oeste</MenuItem>
                  <MenuItem value="Ipuaçu">Ipuaçu</MenuItem>
                  <MenuItem value="Ipumirim">Ipumirim</MenuItem>
                  <MenuItem value="Iraceminha">Iraceminha</MenuItem>
                  <MenuItem value="Irani">Irani</MenuItem>
                  <MenuItem value="Irati">Irati</MenuItem>
                  <MenuItem value="Irineópolis">Irineópolis</MenuItem>
                  <MenuItem value="Itá">Itá</MenuItem>
                  <MenuItem value="Itaiópolis">Itaiópolis</MenuItem>
                  <MenuItem value="Itajaí">Itajaí</MenuItem>
                  <MenuItem value="Itapema">Itapema</MenuItem>
                  <MenuItem value="Itapiranga">Itapiranga</MenuItem>
                  <MenuItem value="Itapoá">Itapoá</MenuItem>
                  <MenuItem value="Ituporanga">Ituporanga</MenuItem>
                  <MenuItem value="Jaborá">Jaborá</MenuItem>
                  <MenuItem value="Jacinto Machado">Jacinto Machado</MenuItem>
                  <MenuItem value="Jaguaruna">Jaguaruna</MenuItem>
                  <MenuItem value="Jaraguá do Sul">Jaraguá do Sul</MenuItem>
                  <MenuItem value="Jardinópolis">Jardinópolis</MenuItem>
                  <MenuItem value="Joaçaba">Joaçaba</MenuItem>
                  <MenuItem value="Joinville">Joinville</MenuItem>
                  <MenuItem value="José Boiteux">José Boiteux</MenuItem>
                  <MenuItem value="Jupiá">Jupiá</MenuItem>
                  <MenuItem value="Lacerdópolis">Lacerdópolis</MenuItem>
                  <MenuItem value="Lages">Lages</MenuItem>
                  <MenuItem value="Laguna">Laguna</MenuItem>
                  <MenuItem value="Lajeado Grande">Lajeado Grande</MenuItem>
                  <MenuItem value="Laurentino">Laurentino</MenuItem>
                  <MenuItem value="Lauro Müller">Lauro Müller</MenuItem>
                  <MenuItem value="Lebon Régis">Lebon Régis</MenuItem>
                  <MenuItem value="Leoberto Leal">Leoberto Leal</MenuItem>
                  <MenuItem value="Lindóia do Sul">Lindóia do Sul</MenuItem>
                  <MenuItem value="Lontras">Lontras</MenuItem>
                  <MenuItem value="Luiz Alves">Luiz Alves</MenuItem>
                  <MenuItem value="Luzerna">Luzerna</MenuItem>
                  <MenuItem value="Macieira">Macieira</MenuItem>
                  <MenuItem value="Mafra">Mafra</MenuItem>
                  <MenuItem value="Major Gercino">Major Gercino</MenuItem>
                  <MenuItem value="Major Vieira">Major Vieira</MenuItem>
                  <MenuItem value="Maracajá">Maracajá</MenuItem>
                  <MenuItem value="Maravilha">Maravilha</MenuItem>
                  <MenuItem value="Marema">Marema</MenuItem>
                  <MenuItem value="Massaranduba">Massaranduba</MenuItem>
                  <MenuItem value="Matos Costa">Matos Costa</MenuItem>
                  <MenuItem value="Meleiro">Meleiro</MenuItem>
                  <MenuItem value="Mirim Doce">Mirim Doce</MenuItem>
                  <MenuItem value="Modelo">Modelo</MenuItem>
                  <MenuItem value="Mondaí">Mondaí</MenuItem>
                  <MenuItem value="Monte Carlo">Monte Carlo</MenuItem>
                  <MenuItem value="Monte Castelo">Monte Castelo</MenuItem>
                  <MenuItem value="Morro da Fumaça">Morro da Fumaça</MenuItem>
                  <MenuItem value="Morro Grande">Morro Grande</MenuItem>
                  <MenuItem value="Navegantes">Navegantes</MenuItem>
                  <MenuItem value="Nova Erechim">Nova Erechim</MenuItem>
                  <MenuItem value="Nova Itaberaba">Nova Itaberaba</MenuItem>
                  <MenuItem value="Nova Trento">Nova Trento</MenuItem>
                  <MenuItem value="Nova Veneza">Nova Veneza</MenuItem>
                  <MenuItem value="Novo Horizonte">Novo Horizonte</MenuItem>
                  <MenuItem value="Orleans">Orleans</MenuItem>
                  <MenuItem value="Otacílio Costa">Otacílio Costa</MenuItem>
                  <MenuItem value="Ouro">Ouro</MenuItem>
                  <MenuItem value="Ouro Verde">Ouro Verde</MenuItem>
                  <MenuItem value="Paial">Paial</MenuItem>
                  <MenuItem value="Painel">Painel</MenuItem>
                  <MenuItem value="Palhoça">Palhoça</MenuItem>
                  <MenuItem value="Palma Sola">Palma Sola</MenuItem>
                  <MenuItem value="Palmeira">Palmeira</MenuItem>
                  <MenuItem value="Palmitos">Palmitos</MenuItem>
                  <MenuItem value="Papanduva">Papanduva</MenuItem>
                  <MenuItem value="Paraíso">Paraíso</MenuItem>
                  <MenuItem value="Passo de Torres">Passo de Torres</MenuItem>
                  <MenuItem value="Passos Maia">Passos Maia</MenuItem>
                  <MenuItem value="Paulo Lopes">Paulo Lopes</MenuItem>
                  <MenuItem value="Pedras Grandes">Pedras Grandes</MenuItem>
                  <MenuItem value="Penha">Penha</MenuItem>
                  <MenuItem value="Peritiba">Peritiba</MenuItem>
                  <MenuItem value="Pescaria Brava">Pescaria Brava</MenuItem>
                  <MenuItem value="Petrolândia">Petrolândia</MenuItem>
                  <MenuItem value="Balneário Piçarras">Balneário Piçarras</MenuItem>
                  <MenuItem value="Pinhalzinho">Pinhalzinho</MenuItem>
                  <MenuItem value="Pinheiro Preto">Pinheiro Preto</MenuItem>
                  <MenuItem value="Piratuba">Piratuba</MenuItem>
                  <MenuItem value="Planalto Alegre">Planalto Alegre</MenuItem>
                  <MenuItem value="Pomerode">Pomerode</MenuItem>
                  <MenuItem value="Ponte Alta">Ponte Alta</MenuItem>
                  <MenuItem value="Ponte Alta do Norte">Ponte Alta do Norte</MenuItem>
                  <MenuItem value="Ponte Serrada">Ponte Serrada</MenuItem>
                  <MenuItem value="Porto Belo">Porto Belo</MenuItem>
                  <MenuItem value="Porto União">Porto União</MenuItem>
                  <MenuItem value="Pouso Redondo">Pouso Redondo</MenuItem>
                  <MenuItem value="Praia Grande">Praia Grande</MenuItem>
                  <MenuItem value="Presidente Castello Branco">Presidente Castello Branco</MenuItem>
                  <MenuItem value="Presidente Getúlio">Presidente Getúlio</MenuItem>
                  <MenuItem value="Presidente Nereu">Presidente Nereu</MenuItem>
                  <MenuItem value="Princesa">Princesa</MenuItem>
                  <MenuItem value="Quilombo">Quilombo</MenuItem>
                  <MenuItem value="Rancho Queimado">Rancho Queimado</MenuItem>
                  <MenuItem value="Rio das Antas">Rio das Antas</MenuItem>
                  <MenuItem value="Rio do Campo">Rio do Campo</MenuItem>
                  <MenuItem value="Rio do Oeste">Rio do Oeste</MenuItem>
                  <MenuItem value="Rio do Sul">Rio do Sul</MenuItem>
                  <MenuItem value="Rio dos Cedros">Rio dos Cedros</MenuItem>
                  <MenuItem value="Rio Fortuna">Rio Fortuna</MenuItem>
                  <MenuItem value="Rio Negrinho">Rio Negrinho</MenuItem>
                  <MenuItem value="Rio Rufino">Rio Rufino</MenuItem>
                  <MenuItem value="Riqueza">Riqueza</MenuItem>
                  <MenuItem value="Rodeio">Rodeio</MenuItem>
                  <MenuItem value="Romelândia">Romelândia</MenuItem>
                  <MenuItem value="Salete">Salete</MenuItem>
                  <MenuItem value="Saltinho">Saltinho</MenuItem>
                  <MenuItem value="Salto Veloso">Salto Veloso</MenuItem>
                  <MenuItem value="Sangão">Sangão</MenuItem>
                  <MenuItem value="Santa Cecília">Santa Cecília</MenuItem>
                  <MenuItem value="Santa Helena">Santa Helena</MenuItem>
                  <MenuItem value="Santa Rosa de Lima">Santa Rosa de Lima</MenuItem>
                  <MenuItem value="Santa Rosa do Sul">Santa Rosa do Sul</MenuItem>
                  <MenuItem value="Santa Terezinha">Santa Terezinha</MenuItem>
                  <MenuItem value="Santa Terezinha do Progresso">Santa Terezinha do Progresso</MenuItem>
                  <MenuItem value="Santiago do Sul">Santiago do Sul</MenuItem>
                  <MenuItem value="Santo Amaro da Imperatriz">Santo Amaro da Imperatriz</MenuItem>
                  <MenuItem value="São Bento do Sul">São Bento do Sul</MenuItem>
                  <MenuItem value="São Bernardino">São Bernardino</MenuItem>
                  <MenuItem value="São Bonifácio">São Bonifácio</MenuItem>
                  <MenuItem value="São Carlos">São Carlos</MenuItem>
                  <MenuItem value="São Cristóvão do Sul">São Cristóvão do Sul</MenuItem>
                  <MenuItem value="São Domingos">São Domingos</MenuItem>
                  <MenuItem value="São Francisco do Sul">São Francisco do Sul</MenuItem>
                  <MenuItem value="São João Batista">São João Batista</MenuItem>
                  <MenuItem value="São João do Itaperiú">São João do Itaperiú</MenuItem>
                  <MenuItem value="São João do Oeste">São João do Oeste</MenuItem>
                  <MenuItem value="São João do Sul">São João do Sul</MenuItem>
                  <MenuItem value="São Joaquim">São Joaquim</MenuItem>
                  <MenuItem value="São José">São José</MenuItem>
                  <MenuItem value="São José do Cedro">São José do Cedro</MenuItem>
                  <MenuItem value="São José do Cerrito">São José do Cerrito</MenuItem>
                  <MenuItem value="São Lourenço do Oeste">São Lourenço do Oeste</MenuItem>
                  <MenuItem value="São Ludgero">São Ludgero</MenuItem>
                  <MenuItem value="São Martinho">São Martinho</MenuItem>
                  <MenuItem value="São Miguel da Boa Vista">São Miguel da Boa Vista</MenuItem>
                  <MenuItem value="São Miguel do Oeste">São Miguel do Oeste</MenuItem>
                  <MenuItem value="São Pedro de Alcântara">São Pedro de Alcântara</MenuItem>
                  <MenuItem value="Saudades">Saudades</MenuItem>
                  <MenuItem value="Schroeder">Schroeder</MenuItem>
                  <MenuItem value="Seara">Seara</MenuItem>
                  <MenuItem value="Serra Alta">Serra Alta</MenuItem>
                  <MenuItem value="Siderópolis">Siderópolis</MenuItem>
                  <MenuItem value="Sombrio">Sombrio</MenuItem>
                  <MenuItem value="Sul Brasil">Sul Brasil</MenuItem>
                  <MenuItem value="Taió">Taió</MenuItem>
                  <MenuItem value="Tangará">Tangará</MenuItem>
                  <MenuItem value="Tigrinhos">Tigrinhos</MenuItem>
                  <MenuItem value="Tijucas">Tijucas</MenuItem>
                  <MenuItem value="Timbé do Sul">Timbé do Sul</MenuItem>
                  <MenuItem value="Timbó">Timbó</MenuItem>
                  <MenuItem value="Timbó Grande">Timbó Grande</MenuItem>
                  <MenuItem value="Três Barras">Três Barras</MenuItem>
                  <MenuItem value="Treviso">Treviso</MenuItem>
                  <MenuItem value="Treze de Maio">Treze de Maio</MenuItem>
                  <MenuItem value="Treze Tílias">Treze Tílias</MenuItem>
                  <MenuItem value="Trombudo Central">Trombudo Central</MenuItem>
                  <MenuItem value="Tubarão">Tubarão</MenuItem>
                  <MenuItem value="Tunápolis">Tunápolis</MenuItem>
                  <MenuItem value="Turvo">Turvo</MenuItem>
                  <MenuItem value="União do Oeste">União do Oeste</MenuItem>
                  <MenuItem value="Urubici">Urubici</MenuItem>
                  <MenuItem value="Urupema">Urupema</MenuItem>
                  <MenuItem value="Urussanga">Urussanga</MenuItem>
                  <MenuItem value="Vargeão">Vargeão</MenuItem>
                  <MenuItem value="Vargem">Vargem</MenuItem>
                  <MenuItem value="Vargem Bonita">Vargem Bonita</MenuItem>
                  <MenuItem value="Vidal Ramos">Vidal Ramos</MenuItem>
                  <MenuItem value="Videira">Videira</MenuItem>
                  <MenuItem value="Vitor Meireles">Vitor Meireles</MenuItem>
                  <MenuItem value="Witmarsum">Witmarsum</MenuItem>
                  <MenuItem value="Xanxerê">Xanxerê</MenuItem>
                  <MenuItem value="Xavantina">Xavantina</MenuItem>
                  <MenuItem value="Xaxim">Xaxim</MenuItem>
                  <MenuItem value="Zortéa">Zortéa</MenuItem>
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

      {/* Catálogo Completo de Datasets SC */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <AssessmentIcon sx={{ mr: 2, color: 'primary.main' }} />
            <Typography variant="h5" component="h2">
              Catálogo Completo de Datasets de Santa Catarina
            </Typography>
          </Box>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Explore centenas de datasets oficiais de órgãos públicos, institutos de pesquisa e organizações de Santa Catarina.
          </Typography>

          <Tabs
            value={tabValue}
            onChange={(_, newValue) => setTabValue(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab icon={<HealthIcon />} label="Saúde Pública" />
            <Tab icon={<SchoolIcon />} label="Educação" />
            <Tab icon={<BusinessIcon />} label="Governo & Administração" />
            <Tab icon={<EconomyIcon />} label="Economia & Finanças" />
            <Tab icon={<MapIcon />} label="Geografia & Ambiente" />
            <Tab icon={<PeopleIcon />} label="Demografia & Social" />
            <Tab icon={<BusIcon />} label="Infraestrutura" />
            <Tab icon={<AssessmentIcon />} label="Estatísticas Regionais" />
          </Tabs>

          {/* Datasets de Saúde Pública */}
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={2}>
              {[
                {
                  titulo: 'Sistema Estadual de Saúde SC',
                  descricao: 'Dados completos dos estabelecimentos de saúde, profissionais e serviços em Santa Catarina',
                  fonte: 'Secretaria de Estado da Saúde - SES/SC',
                  formato: 'JSON, CSV, API REST',
                  link: 'https://www.saude.sc.gov.br/index.php/informacoes-gerais-documentos/dados-abertos',
                  categoria: 'Saúde Pública',
                  atualizacao: 'Diária'
                },
                {
                  titulo: 'CNES Santa Catarina',
                  descricao: 'Cadastro Nacional de Estabelecimentos de Saúde com dados específicos de SC',
                  fonte: 'DATASUS - Ministério da Saúde',
                  formato: 'CSV, DBF, API',
                  link: 'https://cnes.datasus.gov.br/',
                  categoria: 'Infraestrutura de Saúde',
                  atualizacao: 'Mensal'
                },
                {
                  titulo: 'DIVE/SC - Vigilância Epidemiológica',
                  descricao: 'Sistema de notificação de doenças e agravos de notificação compulsória',
                  fonte: 'Diretoria de Vigilância Epidemiológica',
                  formato: 'JSON, Excel, CSV',
                  link: 'https://www.dive.sc.gov.br/conteudos/dados-abertos',
                  categoria: 'Epidemiologia',
                  atualizacao: 'Semanal'
                },
                {
                  titulo: 'HEMOSC - Doação de Sangue',
                  descricao: 'Dados de doação de sangue, estoque de hemocomponentes e demanda por região',
                  fonte: 'Centro de Hematologia e Hemoterapia de SC',
                  formato: 'JSON, CSV',
                  link: 'https://www.hemosc.org.br/dados-abertos',
                  categoria: 'Hemoterapia',
                  atualizacao: 'Diária'
                },
                {
                  titulo: 'Programa Estadual de Imunizações',
                  descricao: 'Cobertura vacinal por município, faixa etária e tipo de imunobiológico',
                  fonte: 'SES/SC - Coordenação PEI',
                  formato: 'CSV, JSON, Dashboard',
                  link: 'https://www.saude.sc.gov.br/index.php/informacoes-gerais-documentos/programa-estadual-de-imunizacoes',
                  categoria: 'Imunização',
                  atualizacao: 'Quinzenal'
                },
                {
                  titulo: 'Rede de Atenção Psicossocial SC',
                  descricao: 'CAPS, residências terapêuticas e serviços de saúde mental por região',
                  fonte: 'SES/SC - Área Técnica Saúde Mental',
                  formato: 'JSON, Excel',
                  link: 'https://www.saude.sc.gov.br/index.php/informacoes-gerais-documentos/saude-mental',
                  categoria: 'Saúde Mental',
                  atualizacao: 'Trimestral'
                },
                {
                  titulo: 'CEREST/SC - Saúde do Trabalhador',
                  descricao: 'Acidentes de trabalho, doenças ocupacionais e ações de vigilância',
                  fonte: 'Centro de Referência em Saúde do Trabalhador',
                  formato: 'CSV, PDF, API',
                  link: 'https://www.saude.sc.gov.br/index.php/informacoes-gerais-documentos/saude-do-trabalhador',
                  categoria: 'Saúde Ocupacional',
                  atualizacao: 'Mensal'
                },
                {
                  titulo: 'SisReg SC - Central de Regulação',
                  descricao: 'Fila de espera para consultas especializadas e procedimentos',
                  fonte: 'SES/SC - Sistema de Regulação',
                  formato: 'JSON, Dashboard',
                  link: 'https://www.saude.sc.gov.br/index.php/informacoes-gerais-documentos/central-de-regulacao',
                  categoria: 'Regulação',
                  atualizacao: 'Tempo Real'
                }
              ].map((dataset, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                          {dataset.titulo}
                        </Typography>
                        <Chip label={dataset.categoria} size="small" color="primary" />
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {dataset.descricao}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <BusinessIcon fontSize="small" color="action" />
                          <Typography variant="caption">{dataset.fonte}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <InfoIcon fontSize="small" color="action" />
                          <Typography variant="caption">{dataset.formato}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <RefreshIcon fontSize="small" color="action" />
                          <Typography variant="caption">Atualização: {dataset.atualizacao}</Typography>
                        </Box>
                      </Box>
                    </CardContent>
                    
                    <Box sx={{ p: 2, pt: 0 }}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<GetAppIcon />}
                        href={dataset.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Acessar Dataset
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          {/* Datasets de Educação */}
          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={2}>
              {[
                {
                  titulo: 'Sistema Estadual de Educação SC',
                  descricao: 'Dados completos de todas as escolas estaduais, municipais e privadas de Santa Catarina',
                  fonte: 'Secretaria de Estado da Educação - SED/SC',
                  formato: 'JSON, CSV, API REST',
                  link: 'https://www.sed.sc.gov.br/secretaria/dados-abertos',
                  categoria: 'Educação Básica',
                  atualizacao: 'Semestral'
                },
                {
                  titulo: 'Censo Escolar Santa Catarina',
                  descricao: 'Microdados do Censo Escolar com informações detalhadas das escolas catarinenses',
                  fonte: 'INEP - Instituto Nacional de Estudos e Pesquisas',
                  formato: 'CSV, TXT, SAS, SPSS',
                  link: 'https://www.gov.br/inep/pt-br/acesso-a-informacao/dados-abertos/microdados/censo-escolar',
                  categoria: 'Censo Educacional',
                  atualizacao: 'Anual'
                },
                {
                  titulo: 'SAEB - Sistema de Avaliação da Educação Básica SC',
                  descricao: 'Resultados de proficiência e questionários contextuais das escolas de SC',
                  fonte: 'INEP - Avaliações Educacionais',
                  formato: 'CSV, JSON, Dashboard',
                  link: 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/saeb',
                  categoria: 'Avaliação Educacional',
                  atualizacao: 'Bienal'
                },
                {
                  titulo: 'ENEM Santa Catarina',
                  descricao: 'Microdados do ENEM com recorte específico para estudantes catarinenses',
                  fonte: 'INEP - Exames e Avaliações',
                  formato: 'CSV, TXT, API',
                  link: 'https://www.gov.br/inep/pt-br/acesso-a-informacao/dados-abertos/microdados/enem',
                  categoria: 'Exames Nacionais',
                  atualizacao: 'Anual'
                },
                {
                  titulo: 'Universidade Federal de Santa Catarina',
                  descricao: 'Dados acadêmicos, pesquisa, extensão e gestão da UFSC',
                  fonte: 'UFSC - Dados Abertos',
                  formato: 'JSON, CSV, XML',
                  link: 'https://dados.ufsc.br/',
                  categoria: 'Ensino Superior',
                  atualizacao: 'Mensal'
                },
                {
                  titulo: 'UDESC - Dados Abertos',
                  descricao: 'Informações acadêmicas e administrativas da Universidade do Estado de SC',
                  fonte: 'Universidade do Estado de Santa Catarina',
                  formato: 'JSON, CSV',
                  link: 'https://www.udesc.br/dados-abertos',
                  categoria: 'Ensino Superior Estadual',
                  atualizacao: 'Mensal'
                },
                {
                  titulo: 'IFC - Instituto Federal Catarinense',
                  descricao: 'Dados dos cursos técnicos, superiores e de qualificação profissional',
                  fonte: 'Instituto Federal Catarinense',
                  formato: 'JSON, Excel',
                  link: 'https://ifc.edu.br/dados-abertos/',
                  categoria: 'Educação Profissional',
                  atualizacao: 'Semestral'
                },
                {
                  titulo: 'IFSC - Instituto Federal de Santa Catarina',
                  descricao: 'Informações sobre educação profissional e tecnológica em SC',
                  fonte: 'Instituto Federal de Santa Catarina',
                  formato: 'CSV, JSON, API',
                  link: 'https://www.ifsc.edu.br/dados-abertos',
                  categoria: 'Educação Tecnológica',
                  atualizacao: 'Semestral'
                }
              ].map((dataset, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                          {dataset.titulo}
                        </Typography>
                        <Chip label={dataset.categoria} size="small" color="secondary" />
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {dataset.descricao}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <BusinessIcon fontSize="small" color="action" />
                          <Typography variant="caption">{dataset.fonte}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <InfoIcon fontSize="small" color="action" />
                          <Typography variant="caption">{dataset.formato}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <RefreshIcon fontSize="small" color="action" />
                          <Typography variant="caption">Atualização: {dataset.atualizacao}</Typography>
                        </Box>
                      </Box>
                    </CardContent>
                    
                    <Box sx={{ p: 2, pt: 0 }}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<GetAppIcon />}
                        href={dataset.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Acessar Dataset
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          {/* Governo & Administração */}
          <TabPanel value={tabValue} index={2}>
            <Grid container spacing={2}>
              {[
                {
                  titulo: 'Portal da Transparência SC',
                  descricao: 'Dados financeiros, orçamentários e de execução do governo estadual',
                  fonte: 'Governo do Estado de Santa Catarina',
                  formato: 'CSV, JSON, API REST',
                  link: 'https://www.transparencia.sc.gov.br/dados-abertos',
                  categoria: 'Transparência Pública',
                  atualizacao: 'Diária'
                },
                {
                  titulo: 'Assembléia Legislativa SC',
                  descricao: 'Proposições, votações, presença e gastos dos deputados estaduais',
                  fonte: 'ALESC - Assembléia Legislativa',
                  formato: 'JSON, XML, CSV',
                  link: 'https://www.alesc.sc.gov.br/dados-abertos',
                  categoria: 'Poder Legislativo',
                  atualizacao: 'Diária'
                },
                {
                  titulo: 'Tribunal de Contas SC',
                  descricao: 'Auditorias, fiscalizações e julgamentos de contas públicas',
                  fonte: 'TCE/SC - Tribunal de Contas',
                  formato: 'CSV, PDF, API',
                  link: 'https://www.tce.sc.gov.br/dados-abertos',
                  categoria: 'Controle Externo',
                  atualizacao: 'Semanal'
                },
                {
                  titulo: 'Ministério Público SC',
                  descricao: 'Ações ministeriais, inquéritos e processos do MPSC',
                  fonte: 'MPSC - Ministério Público',
                  formato: 'JSON, CSV',
                  link: 'https://www.mpsc.mp.br/dados-abertos',
                  categoria: 'Ministério Público',
                  atualizacao: 'Mensal'
                },
                {
                  titulo: 'Tribunal de Justiça SC',
                  descricao: 'Processos judiciais, decisões e estatísticas do TJSC',
                  fonte: 'TJSC - Tribunal de Justiça',
                  formato: 'XML, JSON, API',
                  link: 'https://www.tjsc.jus.br/dados-abertos',
                  categoria: 'Poder Judiciário',
                  atualizacao: 'Diária'
                },
                {
                  titulo: 'Controladoria Geral do Estado',
                  descricao: 'Ouvidoria, corregedoria e controle interno do estado',
                  fonte: 'CGE/SC - Controladoria Geral',
                  formato: 'CSV, JSON',
                  link: 'https://www.cge.sc.gov.br/dados-abertos',
                  categoria: 'Controle Interno',
                  atualizacao: 'Mensal'
                },
                {
                  titulo: 'JUCESC - Junta Comercial SC',
                  descricao: 'Registro de empresas, alterações societárias e falências',
                  fonte: 'JUCESC - Junta Comercial',
                  formato: 'CSV, API',
                  link: 'https://www.jucesc.sc.gov.br/dados-abertos',
                  categoria: 'Registro Comercial',
                  atualizacao: 'Diária'
                },
                {
                  titulo: 'Secretaria da Fazenda SC',
                  descricao: 'Arrecadação tributária, ICMS e incentivos fiscais por município',
                  fonte: 'SEF/SC - Secretaria da Fazenda',
                  formato: 'Excel, CSV, JSON',
                  link: 'https://www.sef.sc.gov.br/dados-abertos',
                  categoria: 'Finanças Públicas',
                  atualizacao: 'Mensal'
                }
              ].map((dataset, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                          {dataset.titulo}
                        </Typography>
                        <Chip label={dataset.categoria} size="small" color="success" />
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {dataset.descricao}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <BusinessIcon fontSize="small" color="action" />
                          <Typography variant="caption">{dataset.fonte}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <InfoIcon fontSize="small" color="action" />
                          <Typography variant="caption">{dataset.formato}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <RefreshIcon fontSize="small" color="action" />
                          <Typography variant="caption">Atualização: {dataset.atualizacao}</Typography>
                        </Box>
                      </Box>
                    </CardContent>
                    
                    <Box sx={{ p: 2, pt: 0 }}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<GetAppIcon />}
                        href={dataset.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Acessar Dataset
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          {/* Economia & Finanças */}
          <TabPanel value={tabValue} index={3}>
            <Grid container spacing={2}>
              {[
                {
                  titulo: 'SEBRAE/SC - Dados Empresariais',
                  descricao: 'Estatísticas de micro e pequenas empresas, empreendedorismo e inovação em SC',
                  fonte: 'SEBRAE Santa Catarina',
                  formato: 'Excel, PDF, Dashboard',
                  link: 'https://www.sebrae.com.br/sites/PortalSebrae/ufs/sc/bis/dados-economicos',
                  categoria: 'Empreendedorismo',
                  atualizacao: 'Trimestral'
                },
                {
                  titulo: 'FIESC - Indicadores Industriais',
                  descricao: 'Produção industrial, exportações e emprego no setor industrial catarinense',
                  fonte: 'Federação das Indústrias de SC',
                  formato: 'CSV, Excel, API',
                  link: 'https://www.fiesc.com.br/observatorio-da-industria',
                  categoria: 'Indústria',
                  atualizacao: 'Mensal'
                },
                {
                  titulo: 'FACISC - Comércio e Serviços',
                  descricao: 'Dados do setor de comércio e serviços de Santa Catarina',
                  fonte: 'Federação das Associações Comerciais de SC',
                  formato: 'Excel, PDF',
                  link: 'https://www.facisc.org.br/dados-economicos',
                  categoria: 'Comércio e Serviços',
                  atualizacao: 'Mensal'
                },
                {
                  titulo: 'IBGE/SC - Produto Interno Bruto',
                  descricao: 'PIB municipal e setorial de todos os municípios catarinenses',
                  fonte: 'Instituto Brasileiro de Geografia e Estatística',
                  formato: 'CSV, JSON, SIDRA API',
                  link: 'https://sidra.ibge.gov.br/territorio#/N6/N1001',
                  categoria: 'PIB Municipal',
                  atualizacao: 'Anual'
                },
                {
                  titulo: 'Banco Central - Sistema Financeiro SC',
                  descricao: 'Agências bancárias, crédito e indicadores financeiros por município',
                  fonte: 'Banco Central do Brasil',
                  formato: 'CSV, JSON, API',
                  link: 'https://dadosabertos.bcb.gov.br/',
                  categoria: 'Sistema Financeiro',
                  atualizacao: 'Mensal'
                },
                {
                  titulo: 'MDIC - Comércio Exterior SC',
                  descricao: 'Exportações e importações por produto, país e município',
                  fonte: 'Ministério do Desenvolvimento, Indústria e Comércio',
                  formato: 'CSV, Excel, API',
                  link: 'http://comexstat.mdic.gov.br/pt/geral',
                  categoria: 'Comércio Exterior',
                  atualizacao: 'Mensal'
                },
                {
                  titulo: 'CAGED/SC - Emprego Formal',
                  descricao: 'Admissões e demissões no mercado formal de trabalho catarinense',
                  fonte: 'Cadastro Geral de Empregados e Desempregados',
                  formato: 'CSV, Excel',
                  link: 'http://bi.mte.gov.br/bgcaged/',
                  categoria: 'Mercado de Trabalho',
                  atualizacao: 'Mensal'
                },
                {
                  titulo: 'RAIS/SC - Relação Anual',
                  descricao: 'Dados anuais de vínculos empregatícios, salários e características dos trabalhadores',
                  fonte: 'Relação Anual de Informações Sociais',
                  formato: 'CSV, TXT, Microdados',
                  link: 'http://bi.mte.gov.br/bgcaged/rais.php',
                  categoria: 'Vínculos Empregatícios',
                  atualizacao: 'Anual'
                }
              ].map((dataset, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                          {dataset.titulo}
                        </Typography>
                        <Chip label={dataset.categoria} size="small" color="warning" />
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {dataset.descricao}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <BusinessIcon fontSize="small" color="action" />
                          <Typography variant="caption">{dataset.fonte}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <InfoIcon fontSize="small" color="action" />
                          <Typography variant="caption">{dataset.formato}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <RefreshIcon fontSize="small" color="action" />
                          <Typography variant="caption">Atualização: {dataset.atualizacao}</Typography>
                        </Box>
                      </Box>
                    </CardContent>
                    
                    <Box sx={{ p: 2, pt: 0 }}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<GetAppIcon />}
                        href={dataset.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Acessar Dataset
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          {/* Geografia & Ambiente */}
          <TabPanel value={tabValue} index={4}>
            <Grid container spacing={2}>
              {[
                {
                  titulo: 'IMA/SC - Instituto do Meio Ambiente',
                  descricao: 'Licenças ambientais, qualidade do ar, água e monitoramento ambiental',
                  fonte: 'Instituto do Meio Ambiente de SC',
                  formato: 'CSV, JSON, Shapefiles',
                  link: 'https://www.ima.sc.gov.br/dados-abertos',
                  categoria: 'Meio Ambiente',
                  atualizacao: 'Mensal'
                },
                {
                  titulo: 'EPAGRI/CIRAM - Dados Meteorológicos',
                  descricao: 'Dados históricos e em tempo real de estações meteorológicas de SC',
                  fonte: 'EPAGRI - Centro de Informações de Recursos Ambientais',
                  formato: 'CSV, JSON, API',
                  link: 'https://ciram.epagri.sc.gov.br/index.php?option=com_content&view=article&id=669',
                  categoria: 'Meteorologia',
                  atualizacao: 'Diária'
                },
                {
                  titulo: 'SDS/SC - Recursos Hídricos',
                  descricao: 'Outorgas, qualidade da água e monitoramento de recursos hídricos',
                  fonte: 'Secretaria de Desenvolvimento Sustentável',
                  formato: 'CSV, Shapefiles, PDF',
                  link: 'https://www.sds.sc.gov.br/index.php/biblioteca/recursos-hidricos',
                  categoria: 'Recursos Hídricos',
                  atualizacao: 'Trimestral'
                },
                {
                  titulo: 'IBGE/SC - Cartografia Digital',
                  descricao: 'Malhas territoriais, divisões político-administrativas e bases cartográficas',
                  fonte: 'Instituto Brasileiro de Geografia e Estatística',
                  formato: 'Shapefiles, KML, GeoJSON',
                  link: 'https://downloads.ibge.gov.br/downloads_geociencias.htm',
                  categoria: 'Cartografia',
                  atualizacao: 'Anual'
                },
                {
                  titulo: 'INPE - Desmatamento SC',
                  descricao: 'Dados de desmatamento, queimadas e cobertura vegetal da Mata Atlântica',
                  fonte: 'Instituto Nacional de Pesquisas Espaciais',
                  formato: 'Shapefiles, CSV, API',
                  link: 'http://www.obt.inpe.br/OBT/assuntos/programas/amazonia/prodes',
                  categoria: 'Desmatamento',
                  atualizacao: 'Anual'
                },
                {
                  titulo: 'ANM - Mineração SC',
                  descricao: 'Dados de mineração, jazidas e licenças de lavra em Santa Catarina',
                  fonte: 'Agência Nacional de Mineração',
                  formato: 'CSV, Shapefiles, API',
                  link: 'https://dados.gov.br/dados/organizacoes/visualizar/agencia-nacional-de-mineracao-anm',
                  categoria: 'Mineração',
                  atualizacao: 'Mensal'
                },
                {
                  titulo: 'SIGSC - Sistema de Informações Geográficas',
                  descricao: 'Infraestrutura de dados espaciais do estado de Santa Catarina',
                  fonte: 'Governo do Estado de SC',
                  formato: 'WMS, WFS, Shapefiles',
                  link: 'https://sigsc.sc.gov.br/',
                  categoria: 'SIG Estadual',
                  atualizacao: 'Contínua'
                },
                {
                  titulo: 'FATMA - Qualidade Ambiental',
                  descricao: 'Monitoramento da qualidade do ar, água e solo catarinense',
                  fonte: 'Fundação do Meio Ambiente (histórico)',
                  formato: 'CSV, PDF, Excel',
                  link: 'https://www.ima.sc.gov.br/index.php/legislacao/leis',
                  categoria: 'Qualidade Ambiental',
                  atualizacao: 'Mensal'
                }
              ].map((dataset, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                          {dataset.titulo}
                        </Typography>
                        <Chip label={dataset.categoria} size="small" color="info" />
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {dataset.descricao}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <BusinessIcon fontSize="small" color="action" />
                          <Typography variant="caption">{dataset.fonte}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <InfoIcon fontSize="small" color="action" />
                          <Typography variant="caption">{dataset.formato}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <RefreshIcon fontSize="small" color="action" />
                          <Typography variant="caption">Atualização: {dataset.atualizacao}</Typography>
                        </Box>
                      </Box>
                    </CardContent>
                    
                    <Box sx={{ p: 2, pt: 0 }}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<GetAppIcon />}
                        href={dataset.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Acessar Dataset
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          {/* Demografia & Social */}
          <TabPanel value={tabValue} index={5}>
            <Grid container spacing={2}>
              {[
                {
                  titulo: 'Censo Demográfico 2022 - SC',
                  descricao: 'Dados populacionais detalhados por município, setor censitário e domicílio',
                  fonte: 'Instituto Brasileiro de Geografia e Estatística',
                  formato: 'CSV, TXT, API SIDRA',
                  link: 'https://sidra.ibge.gov.br/pesquisa/censo-demografico/demografico-2022',
                  categoria: 'Demografia',
                  atualizacao: 'Decenal'
                },
                {
                  titulo: 'PNAD Contínua - Santa Catarina',
                  descricao: 'Pesquisa Nacional por Amostra de Domicílios com dados trimestrais de SC',
                  fonte: 'Instituto Brasileiro de Geografia e Estatística',
                  formato: 'CSV, Microdados, API',
                  link: 'https://www.ibge.gov.br/estatisticas/sociais/trabalho/17270-pnad-continua.html',
                  categoria: 'Trabalho e Renda',
                  atualizacao: 'Trimestral'
                },
                {
                  titulo: 'Registro Civil - SC',
                  descricao: 'Nascimentos, óbitos, casamentos e divórcios registrados em cartórios',
                  fonte: 'Instituto Brasileiro de Geografia e Estatística',
                  formato: 'CSV, SIDRA API',
                  link: 'https://sidra.ibge.gov.br/pesquisa/registro-civil',
                  categoria: 'Registro Civil',
                  atualizacao: 'Anual'
                },
                {
                  titulo: 'Estimativas Populacionais SC',
                  descricao: 'Projeções e estimativas populacionais por município catarinense',
                  fonte: 'Instituto Brasileiro de Geografia e Estatística',
                  formato: 'CSV, Excel, API',
                  link: 'https://sidra.ibge.gov.br/tabela/6579',
                  categoria: 'Projeções Demográficas',
                  atualizacao: 'Anual'
                },
                {
                  titulo: 'SUAS/SC - Assistência Social',
                  descricao: 'CRAS, CREAS e programas socioassistenciais de Santa Catarina',
                  fonte: 'Sistema Único de Assistência Social',
                  formato: 'CSV, Excel',
                  link: 'https://www.sst.sc.gov.br/informacoes/assistencia-social',
                  categoria: 'Assistência Social',
                  atualizacao: 'Mensal'
                },
                {
                  titulo: 'Cadastro Único - SC',
                  descricao: 'Famílias inscritas no CadÚnico e beneficiários de programas sociais',
                  fonte: 'Ministério da Cidadania',
                  formato: 'CSV, Dashboard',
                  link: 'https://aplicacoes.mds.gov.br/sagirmps/portal-serie-historica/',
                  categoria: 'Programas Sociais',
                  atualizacao: 'Mensal'
                },
                {
                  titulo: 'Bolsa Família/Auxílio Brasil SC',
                  descricao: 'Beneficiários e valores pagos dos programas de transferência de renda',
                  fonte: 'Ministério da Cidadania',
                  formato: 'CSV, Portal da Transparência',
                  link: 'http://www.portaltransparencia.gov.br/download-de-dados/bolsa-familia-pagamentos',
                  categoria: 'Transferência de Renda',
                  atualizacao: 'Mensal'
                },
                {
                  titulo: 'Segurança Pública SC',
                  descricao: 'Ocorrências criminais, violência e estatísticas de segurança pública',
                  fonte: 'Secretaria de Segurança Pública - SSP/SC',
                  formato: 'CSV, Excel, Dashboard',
                  link: 'https://www.ssp.sc.gov.br/index.php/transparencia/dados-abertos',
                  categoria: 'Segurança Pública',
                  atualizacao: 'Mensal'
                }
              ].map((dataset, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                          {dataset.titulo}
                        </Typography>
                        <Chip label={dataset.categoria} size="small" color="error" />
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {dataset.descricao}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <BusinessIcon fontSize="small" color="action" />
                          <Typography variant="caption">{dataset.fonte}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <InfoIcon fontSize="small" color="action" />
                          <Typography variant="caption">{dataset.formato}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <RefreshIcon fontSize="small" color="action" />
                          <Typography variant="caption">Atualização: {dataset.atualizacao}</Typography>
                        </Box>
                      </Box>
                    </CardContent>
                    
                    <Box sx={{ p: 2, pt: 0 }}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<GetAppIcon />}
                        href={dataset.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Acessar Dataset
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          {/* Infraestrutura */}
          <TabPanel value={tabValue} index={6}>
            <Grid container spacing={2}>
              {[
                {
                  titulo: 'DEINFRA/SC - Departamento de Infraestrutura',
                  descricao: 'Rodovias estaduais, pontes, obras públicas e infraestrutura viária',
                  fonte: 'Departamento Estadual de Infraestrutura',
                  formato: 'CSV, Shapefiles, API',
                  link: 'https://www.deinfra.sc.gov.br/transparencia/dados-abertos',
                  categoria: 'Infraestrutura Viária',
                  atualizacao: 'Mensal'
                },
                {
                  titulo: 'ANTT - Transporte Terrestre SC',
                  descricao: 'Linhas de ônibus interestaduais, empresas e frotas autorizadas',
                  fonte: 'Agência Nacional de Transportes Terrestres',
                  formato: 'CSV, JSON, API',
                  link: 'https://dados.antt.gov.br/dataset',
                  categoria: 'Transporte Rodoviário',
                  atualizacao: 'Mensal'
                },
                {
                  titulo: 'ANAC - Aviação Civil SC',
                  descricao: 'Aeroportos, movimentação de passageiros e dados de aviação civil',
                  fonte: 'Agência Nacional de Aviação Civil',
                  formato: 'CSV, Excel, API',
                  link: 'https://www.anac.gov.br/assuntos/dados-e-estatisticas/dados-abertos',
                  categoria: 'Aviação Civil',
                  atualizacao: 'Mensal'
                },
                {
                  titulo: 'ANTAQ - Portos SC',
                  descricao: 'Movimentação portuária, cargas e estatísticas dos portos catarinenses',
                  fonte: 'Agência Nacional de Transportes Aquaviários',
                  formato: 'CSV, Excel, Dashboard',
                  link: 'http://web.antaq.gov.br/anuario/',
                  categoria: 'Transporte Aquaviário',
                  atualizacao: 'Mensal'
                },
                {
                  titulo: 'ANEEL - Energia Elétrica SC',
                  descricao: 'Geração, transmissão, distribuição e consumo de energia elétrica',
                  fonte: 'Agência Nacional de Energia Elétrica',
                  formato: 'CSV, JSON, API',
                  link: 'https://dadosabertos.aneel.gov.br/',
                  categoria: 'Energia Elétrica',
                  atualizacao: 'Mensal'
                },
                {
                  titulo: 'ANATEL - Telecomunicações SC',
                  descricao: 'Infraestrutura de telecomunicações, internet e telefonia móvel',
                  fonte: 'Agência Nacional de Telecomunicações',
                  formato: 'CSV, Excel, API',
                  link: 'https://sistemas.anatel.gov.br/dados-abertos',
                  categoria: 'Telecomunicações',
                  atualizacao: 'Mensal'
                },
                {
                  titulo: 'SANEPAR - Saneamento SC',
                  descricao: 'Abastecimento de água e tratamento de esgoto nos municípios atendidos',
                  fonte: 'Companhia de Saneamento do Paraná (atua em SC)',
                  formato: 'CSV, Excel',
                  link: 'https://site.sanepar.com.br/transparencia/dados-abertos',
                  categoria: 'Saneamento Básico',
                  atualizacao: 'Trimestral'
                },
                {
                  titulo: 'Sistema Nacional de Saneamento',
                  descricao: 'Dados de abastecimento de água, esgotamento sanitário e resíduos sólidos',
                  fonte: 'Ministério do Desenvolvimento Regional',
                  formato: 'Excel, CSV, API',
                  link: 'http://app4.mdr.gov.br/serieHistorica/',
                  categoria: 'Saneamento Nacional',
                  atualizacao: 'Anual'
                }
              ].map((dataset, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                          {dataset.titulo}
                        </Typography>
                        <Chip label={dataset.categoria} size="small" />
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {dataset.descricao}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <BusinessIcon fontSize="small" color="action" />
                          <Typography variant="caption">{dataset.fonte}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <InfoIcon fontSize="small" color="action" />
                          <Typography variant="caption">{dataset.formato}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <RefreshIcon fontSize="small" color="action" />
                          <Typography variant="caption">Atualização: {dataset.atualizacao}</Typography>
                        </Box>
                      </Box>
                    </CardContent>
                    
                    <Box sx={{ p: 2, pt: 0 }}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<GetAppIcon />}
                        href={dataset.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Acessar Dataset
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          {/* Estatísticas Regionais */}
          <TabPanel value={tabValue} index={7}>
            <Grid container spacing={2}>
              {[
                {
                  titulo: 'IBGE/SC - Cidades e Estados',
                  descricao: 'Portal completo com todas as estatísticas municipais e regionais de SC',
                  fonte: 'Instituto Brasileiro de Geografia e Estatística',
                  formato: 'JSON, CSV, API, Dashboard',
                  link: 'https://cidades.ibge.gov.br/brasil/sc',
                  categoria: 'Portal Oficial',
                  atualizacao: 'Contínua'
                },
                {
                  titulo: 'Atlas do Desenvolvimento Humano',
                  descricao: 'Índice de Desenvolvimento Humano Municipal e indicadores socioeconômicos',
                  fonte: 'PNUD, IPEA e Fundação João Pinheiro',
                  formato: 'CSV, Excel, API',
                  link: 'http://www.atlasbrasil.org.br/consulta/planilha',
                  categoria: 'Desenvolvimento Humano',
                  atualizacao: 'Decenal'
                },
                {
                  titulo: 'FIRJAN - Índice de Desenvolvimento Municipal',
                  descricao: 'IFDM com dados de emprego, renda, educação e saúde por município',
                  fonte: 'Federação das Indústrias do Estado do Rio de Janeiro',
                  formato: 'Excel, CSV, Dashboard',
                  link: 'https://www.firjan.com.br/ifdm/',
                  categoria: 'Índices Municipais',
                  atualizacao: 'Anual'
                },
                {
                  titulo: 'Ranking de Competitividade dos Municípios',
                  descricao: 'Análise comparativa da competitividade dos municípios catarinenses',
                  fonte: 'Centro de Liderança Pública',
                  formato: 'Excel, PDF',
                  link: 'https://www.clp.org.br/ranking-de-competitividade-dos-municipios/',
                  categoria: 'Competitividade',
                  atualizacao: 'Bienal'
                },
                {
                  titulo: 'Índice de Sustentabilidade Municipal',
                  descricao: 'Avaliação da sustentabilidade ambiental, social e econômica dos municípios',
                  fonte: 'Observatório da Sustentabilidade',
                  formato: 'Excel, Dashboard',
                  link: 'https://www.cidadessustentaveis.org.br/observatorio',
                  categoria: 'Sustentabilidade',
                  atualizacao: 'Anual'
                },
                {
                  titulo: 'CNM - Confederação Nacional de Municípios',
                  descricao: 'Estudos técnicos e dados municipais específicos de Santa Catarina',
                  fonte: 'Confederação Nacional de Municípios',
                  formato: 'PDF, Excel, Estudos',
                  link: 'https://www.cnm.org.br/biblioteca/estudos-tecnicos',
                  categoria: 'Estudos Municipais',
                  atualizacao: 'Irregular'
                },
                {
                  titulo: 'Observatório Social do Brasil - SC',
                  descricao: 'Monitoramento da gestão pública municipal e controle social',
                  fonte: 'Observatório Social do Brasil',
                  formato: 'PDF, Relatórios, Dashboard',
                  link: 'https://osbrasil.org.br/santa-catarina/',
                  categoria: 'Controle Social',
                  atualizacao: 'Semestral'
                },
                {
                  titulo: 'Portal ODM - Objetivos de Desenvolvimento',
                  descricao: 'Acompanhamento dos Objetivos de Desenvolvimento Sustentável nos municípios',
                  fonte: 'Portal ODM Brasil',
                  formato: 'Dashboard, CSV',
                  link: 'http://www.portalodm.com.br/',
                  categoria: 'ODS Municipal',
                  atualizacao: 'Anual'
                }
              ].map((dataset, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                          {dataset.titulo}
                        </Typography>
                        <Chip label={dataset.categoria} size="small" color="default" />
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {dataset.descricao}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <BusinessIcon fontSize="small" color="action" />
                          <Typography variant="caption">{dataset.fonte}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <InfoIcon fontSize="small" color="action" />
                          <Typography variant="caption">{dataset.formato}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <RefreshIcon fontSize="small" color="action" />
                          <Typography variant="caption">Atualização: {dataset.atualizacao}</Typography>
                        </Box>
                      </Box>
                    </CardContent>
                    
                    <Box sx={{ p: 2, pt: 0 }}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<GetAppIcon />}
                        href={dataset.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Acessar Dataset
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>
        </CardContent>
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
