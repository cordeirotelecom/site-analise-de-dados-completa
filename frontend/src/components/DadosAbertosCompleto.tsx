import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
  Stack,
  LinearProgress,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Badge,
  Avatar,
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Api,
  Storage,
  Download,
  Visibility,
  Refresh,
  Search,
  FilterList,
  CheckCircle,
  Error,
  Warning,
  Info,
  OpenInNew,
  Code,
  DataObject,
  Public,
  CloudDownload,
  Speed,
  Security,
  ExpandMore,
  PlayArrow,
  Stop,
  Settings,
  Timeline,
  Assessment,
  MonitorHeart,
} from '@mui/icons-material';

interface APIInfo {
  id: string;
  nome: string;
  descricao: string;
  url: string;
  categoria: string;
  status: 'ativo' | 'inativo' | 'manutencao' | 'limitado';
  ultimaVerificacao: string;
  tempoResposta: number;
  limiteTaxa: string;
  autenticacao: 'nenhuma' | 'api_key' | 'oauth' | 'bearer';
  documentacao: string;
  formato: string[];
  qualidade: number;
  popularidade: number;
  endpoints: number;
  dadosExemplo: any;
  tags: string[];
  provider: string;
  versao: string;
  uptime: number;
}

interface DatasetInfo {
  id: string;
  nome: string;
  descricao: string;
  fonte: string;
  categoria: string;
  tamanho: string;
  formato: string;
  ultimaAtualizacao: string;
  downloads: number;
  qualidade: number;
  licenca: string;
  url: string;
  tags: string[];
  preview: any[];
}

const DadosAbertosCompleto: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [apis, setApis] = useState<APIInfo[]>([]);
  const [datasets, setDatasets] = useState<DatasetInfo[]>([]);
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [dialogAberto, setDialogAberto] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState<APIInfo | DatasetInfo | null>(null);
  const [monitoramentoAtivo, setMonitoramentoAtivo] = useState(false);
  const [testesExecutando, setTestesExecutando] = useState<string[]>([]);

  // APIs Brasileiras Reais
  useEffect(() => {
    const apisExemplo: APIInfo[] = [
      {
        id: '1',
        nome: 'Portal da Transparência',
        descricao: 'API oficial do Portal da Transparência do Governo Federal brasileiro com dados sobre gastos públicos.',
        url: 'http://api.portaldatransparencia.gov.br/api-de-dados',
        categoria: 'Governo',
        status: 'ativo',
        ultimaVerificacao: '2024-12-15T10:30:00Z',
        tempoResposta: 250,
        limiteTaxa: '1000 req/hora',
        autenticacao: 'api_key',
        documentacao: 'http://api.portaldatransparencia.gov.br/swagger-ui.html',
        formato: ['JSON', 'XML'],
        qualidade: 4,
        popularidade: 5,
        endpoints: 15,
        dadosExemplo: {
          despesa: {
            valor: 50000.00,
            orgao: 'Ministério da Educação',
            data: '2024-12-01'
          }
        },
        tags: ['transparência', 'gastos públicos', 'governo', 'despesas'],
        provider: 'CGU',
        versao: 'v1',
        uptime: 99.2
      },
      {
        id: '2',
        nome: 'IBGE - API de Localidades',
        descricao: 'API do IBGE para consulta de informações geográficas do Brasil (estados, municípios, distritos).',
        url: 'https://servicodados.ibge.gov.br/api/docs/localidades',
        categoria: 'Geografia',
        status: 'ativo',
        ultimaVerificacao: '2024-12-15T11:15:00Z',
        tempoResposta: 150,
        limiteTaxa: 'Sem limite',
        autenticacao: 'nenhuma',
        documentacao: 'https://servicodados.ibge.gov.br/api/docs',
        formato: ['JSON'],
        qualidade: 5,
        popularidade: 5,
        endpoints: 8,
        dadosExemplo: {
          municipio: {
            id: 3550308,
            nome: 'São Paulo',
            uf: 'SP'
          }
        },
        tags: ['geografia', 'municípios', 'estados', 'ibge'],
        provider: 'IBGE',
        versao: 'v1',
        uptime: 99.8
      },
      {
        id: '3',
        nome: 'CEP - Via CEP',
        descricao: 'API gratuita para consulta de informações de endereços através do CEP.',
        url: 'https://viacep.com.br/ws/',
        categoria: 'Endereços',
        status: 'ativo',
        ultimaVerificacao: '2024-12-15T09:45:00Z',
        tempoResposta: 120,
        limiteTaxa: '300 req/min',
        autenticacao: 'nenhuma',
        documentacao: 'https://viacep.com.br/',
        formato: ['JSON', 'XML', 'JSONP'],
        qualidade: 5,
        popularidade: 5,
        endpoints: 4,
        dadosExemplo: {
          cep: '01310-100',
          logradouro: 'Avenida Paulista',
          bairro: 'Bela Vista',
          localidade: 'São Paulo'
        },
        tags: ['cep', 'endereços', 'correios', 'localização'],
        provider: 'Via CEP',
        versao: 'v1',
        uptime: 99.5
      },
      {
        id: '4',
        nome: 'Banco Central - Taxa SELIC',
        descricao: 'API do Banco Central para consulta de dados econômicos e financeiros.',
        url: 'https://api.bcb.gov.br/dados/serie',
        categoria: 'Financeiro',
        status: 'ativo',
        ultimaVerificacao: '2024-12-15T12:00:00Z',
        tempoResposta: 300,
        limiteTaxa: '1000 req/dia',
        autenticacao: 'nenhuma',
        documentacao: 'https://dadosabertos.bcb.gov.br/',
        formato: ['JSON', 'CSV'],
        qualidade: 5,
        popularidade: 4,
        endpoints: 20,
        dadosExemplo: {
          selic: {
            data: '2024-12-01',
            valor: 10.75
          }
        },
        tags: ['economia', 'selic', 'banco central', 'juros'],
        provider: 'BCB',
        versao: 'v1',
        uptime: 99.9
      },
      {
        id: '5',
        nome: 'COVID-19 Brasil API',
        descricao: 'API com dados atualizados sobre COVID-19 no Brasil por estado e município.',
        url: 'https://covid19-brazil-api.now.sh',
        categoria: 'Saúde',
        status: 'limitado',
        ultimaVerificacao: '2024-12-15T08:30:00Z',
        tempoResposta: 800,
        limiteTaxa: '100 req/hora',
        autenticacao: 'nenhuma',
        documentacao: 'https://github.com/devarthurribeiro/covid19-brazil-api',
        formato: ['JSON'],
        qualidade: 3,
        popularidade: 4,
        endpoints: 6,
        dadosExemplo: {
          estado: 'SP',
          casos: 5000000,
          mortes: 180000
        },
        tags: ['covid', 'saúde', 'pandemia', 'estatísticas'],
        provider: 'Comunidade',
        versao: 'v1',
        uptime: 95.5
      },
      {
        id: '6',
        nome: 'CNPJs Brasil',
        descricao: 'API para consulta de informações de empresas brasileiras através do CNPJ.',
        url: 'https://www.receitaws.com.br/v1/cnpj/',
        categoria: 'Empresarial',
        status: 'ativo',
        ultimaVerificacao: '2024-12-15T13:20:00Z',
        tempoResposta: 400,
        limiteTaxa: '3 req/min',
        autenticacao: 'nenhuma',
        documentacao: 'https://receitaws.com.br/',
        formato: ['JSON'],
        qualidade: 4,
        popularidade: 4,
        endpoints: 1,
        dadosExemplo: {
          cnpj: '11.222.333/0001-81',
          nome: 'Empresa Exemplo LTDA',
          situacao: 'ATIVA'
        },
        tags: ['cnpj', 'empresas', 'receita federal', 'dados cadastrais'],
        provider: 'ReceitaWS',
        versao: 'v1',
        uptime: 98.2
      }
    ];
    setApis(apisExemplo);

    // Datasets exemplo
    const datasetsExemplo: DatasetInfo[] = [
      {
        id: '1',
        nome: 'Microdados ENEM 2023',
        descricao: 'Microdados completos do Exame Nacional do Ensino Médio 2023 com notas e informações socioeconômicas.',
        fonte: 'INEP/MEC',
        categoria: 'Educação',
        tamanho: '2.5 GB',
        formato: 'CSV',
        ultimaAtualizacao: '2024-03-15',
        downloads: 15000,
        qualidade: 5,
        licenca: 'Domínio Público',
        url: 'https://www.gov.br/inep/pt-br/acesso-a-informacao/dados-abertos/microdados/enem',
        tags: ['enem', 'educação', 'notas', 'socioeconômico'],
        preview: [
          { participante: 1, nota_cn: 520.5, nota_ch: 600.2, nota_lc: 580.0, nota_mt: 650.8 },
          { participante: 2, nota_cn: 480.2, nota_ch: 590.5, nota_lc: 620.1, nota_mt: 700.3 }
        ]
      },
      {
        id: '2',
        nome: 'Cadastro Nacional de Estabelecimentos de Saúde',
        descricao: 'Base de dados com informações de todos os estabelecimentos de saúde do Brasil.',
        fonte: 'CNES/Ministério da Saúde',
        categoria: 'Saúde',
        tamanho: '150 MB',
        formato: 'CSV',
        ultimaAtualizacao: '2024-12-01',
        downloads: 8500,
        qualidade: 4,
        licenca: 'Domínio Público',
        url: 'http://cnes2.datasus.gov.br/',
        tags: ['saúde', 'estabelecimentos', 'sus', 'hospitais'],
        preview: [
          { estabelecimento: 'Hospital Geral', municipio: 'São Paulo', tipo: 'Público' },
          { estabelecimento: 'UBS Central', municipio: 'Rio de Janeiro', tipo: 'Público' }
        ]
      },
      {
        id: '3',
        nome: 'Base de Legislação Federal',
        descricao: 'Conjunto completo de leis, decretos e normas federais brasileiras.',
        fonte: 'Senado Federal',
        categoria: 'Jurídico',
        tamanho: '800 MB',
        formato: 'XML',
        ultimaAtualizacao: '2024-12-10',
        downloads: 3200,
        qualidade: 5,
        licenca: 'CC BY',
        url: 'https://www.lexml.gov.br/',
        tags: ['legislação', 'leis', 'decretos', 'jurídico'],
        preview: [
          { tipo: 'Lei', numero: '14.133/2021', ementa: 'Nova Lei de Licitações' },
          { tipo: 'Decreto', numero: '10.024/2019', ementa: 'Regulamenta a licitação' }
        ]
      }
    ];
    setDatasets(datasetsExemplo);
  }, []);

  const categorias = ['todos', 'Governo', 'Geografia', 'Endereços', 'Financeiro', 'Saúde', 'Empresarial', 'Educação', 'Jurídico'];
  const statusOptions = ['todos', 'ativo', 'inativo', 'manutencao', 'limitado'];

  const apisFiltradas = apis.filter(api => {
    const matchCategoria = filtroCategoria === 'todos' || api.categoria === filtroCategoria;
    const matchStatus = filtroStatus === 'todos' || api.status === filtroStatus;
    const matchBusca = busca === '' || 
      api.nome.toLowerCase().includes(busca.toLowerCase()) ||
      api.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      api.tags.some(tag => tag.toLowerCase().includes(busca.toLowerCase()));
    
    return matchCategoria && matchStatus && matchBusca;
  });

  const datasetsFiltrados = datasets.filter(dataset => {
    const matchCategoria = filtroCategoria === 'todos' || dataset.categoria === filtroCategoria;
    const matchBusca = busca === '' || 
      dataset.nome.toLowerCase().includes(busca.toLowerCase()) ||
      dataset.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      dataset.tags.some(tag => tag.toLowerCase().includes(busca.toLowerCase()));
    
    return matchCategoria && matchBusca;
  });

  const getStatusColor = (status: string): "primary" | "secondary" | "error" | "info" | "success" | "warning" => {
    switch (status) {
      case 'ativo': return 'success';
      case 'inativo': return 'error';
      case 'manutencao': return 'warning';
      case 'limitado': return 'info';
      default: return 'primary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ativo': return <CheckCircle />;
      case 'inativo': return <Error />;
      case 'manutencao': return <Warning />;
      case 'limitado': return <Info />;
      default: return <Info />;
    }
  };

  const testarAPI = async (api: APIInfo) => {
    setTestesExecutando([...testesExecutando, api.id]);
    
    // Simular teste de API
    setTimeout(() => {
      setTestesExecutando(testesExecutando.filter(id => id !== api.id));
      
      // Atualizar status da API
      const apisAtualizadas = apis.map(a => 
        a.id === api.id 
          ? { ...a, ultimaVerificacao: new Date().toISOString(), tempoResposta: Math.random() * 500 + 100 }
          : a
      );
      setApis(apisAtualizadas);
    }, 2000);
  };

  const executarMonitoramento = () => {
    setMonitoramentoAtivo(!monitoramentoAtivo);
    
    if (!monitoramentoAtivo) {
      // Simular monitoramento em tempo real
      const interval = setInterval(() => {
        setApis(apisAntigas => 
          apisAntigas.map(api => ({
            ...api,
            tempoResposta: Math.max(50, api.tempoResposta + (Math.random() - 0.5) * 100),
            uptime: Math.max(90, api.uptime + (Math.random() - 0.5) * 2),
            ultimaVerificacao: new Date().toISOString()
          }))
        );
      }, 5000);

      // Cleanup function seria chamada quando o componente desmonta
      setTimeout(() => {
        clearInterval(interval);
        setMonitoramentoAtivo(false);
      }, 30000);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Api sx={{ mr: 2, color: 'primary.main' }} />
          APIs & Datasets Brasileiros
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Central completa de APIs governamentais e datasets públicos brasileiros com monitoramento em tempo real.
        </Typography>
        
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Switch
                checked={monitoramentoAtivo}
                onChange={executarMonitoramento}
                color="primary"
              />
            }
            label="Monitoramento em Tempo Real"
          />
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={() => window.location.reload()}
          >
            Atualizar Tudo
          </Button>
        </Stack>
      </Box>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
          <Tab label="APIs Governamentais" icon={<Api />} />
          <Tab label="Datasets Públicos" icon={<Storage />} />
          <Tab label="Monitoramento" icon={<MonitorHeart />} />
          <Tab label="Documentação" icon={<Code />} />
        </Tabs>
      </Paper>

      {/* Filtros */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            placeholder="Buscar APIs e datasets..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Categoria</InputLabel>
            <Select
              value={filtroCategoria}
              label="Categoria"
              onChange={(e) => setFiltroCategoria(e.target.value)}
            >
              {categorias.map(categoria => (
                <MenuItem key={categoria} value={categoria}>
                  {categoria === 'todos' ? 'Todas as categorias' : categoria}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {tabValue === 0 && (
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={filtroStatus}
                label="Status"
                onChange={(e) => setFiltroStatus(e.target.value)}
              >
                {statusOptions.map(status => (
                  <MenuItem key={status} value={status}>
                    {status === 'todos' ? 'Todos os status' : status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
        <Grid item xs={12} md={2}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<FilterList />}
            sx={{ height: '56px' }}
            onClick={() => {
              setBusca('');
              setFiltroCategoria('todos');
              setFiltroStatus('todos');
            }}
          >
            Limpar Filtros
          </Button>
        </Grid>
      </Grid>

      {/* Content */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          {apisFiltradas.map((api) => (
            <Grid item xs={12} md={6} lg={4} key={api.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {api.nome}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                        <Chip
                          icon={getStatusIcon(api.status)}
                          label={api.status}
                          size="small"
                          color={getStatusColor(api.status)}
                        />
                        <Chip
                          label={api.categoria}
                          size="small"
                          variant="outlined"
                        />
                      </Stack>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" color="primary">
                        {api.tempoResposta.toFixed(0)}ms
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Resposta
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {api.descricao}
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      <strong>Provider:</strong> {api.provider}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Autenticação:</strong> {api.autenticacao}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Limite:</strong> {api.limiteTaxa}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Uptime:</strong> {api.uptime.toFixed(1)}%
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    {api.tags.map((tag, index) => (
                      <Chip 
                        key={index} 
                        label={tag} 
                        size="small" 
                        sx={{ mr: 0.5, mb: 0.5 }} 
                      />
                    ))}
                  </Box>
                  
                  <Typography variant="caption" color="text.secondary">
                    Última verificação: {new Date(api.ultimaVerificacao).toLocaleString()}
                  </Typography>
                </CardContent>
                
                <Divider />
                
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Stack direction="row" spacing={1}>
                    <Tooltip title="Testar API">
                      <IconButton 
                        size="small" 
                        onClick={() => testarAPI(api)}
                        disabled={testesExecutando.includes(api.id)}
                      >
                        {testesExecutando.includes(api.id) ? (
                          <CircularProgress size={20} />
                        ) : (
                          <PlayArrow />
                        )}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Ver detalhes">
                      <IconButton 
                        size="small" 
                        onClick={() => setItemSelecionado(api)}
                      >
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Documentação">
                      <IconButton 
                        size="small"
                        component="a"
                        href={api.documentacao}
                        target="_blank"
                      >
                        <Code />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                  
                  <Button
                    variant="contained"
                    size="small"
                    endIcon={<OpenInNew />}
                    component="a"
                    href={api.url}
                    target="_blank"
                  >
                    Acessar
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {tabValue === 1 && (
        <Grid container spacing={3}>
          {datasetsFiltrados.map((dataset) => (
            <Grid item xs={12} md={6} lg={4} key={dataset.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {dataset.nome}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                        <Chip
                          label={dataset.categoria}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                        <Chip
                          label={dataset.formato}
                          size="small"
                          variant="outlined"
                        />
                      </Stack>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" color="primary">
                        {dataset.qualidade}/5
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Qualidade
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {dataset.descricao}
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      <strong>Fonte:</strong> {dataset.fonte}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Tamanho:</strong> {dataset.tamanho}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Downloads:</strong> {dataset.downloads.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Licença:</strong> {dataset.licenca}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    {dataset.tags.map((tag, index) => (
                      <Chip 
                        key={index} 
                        label={tag} 
                        size="small" 
                        sx={{ mr: 0.5, mb: 0.5 }} 
                      />
                    ))}
                  </Box>
                  
                  <Typography variant="caption" color="text.secondary">
                    Atualizado em {dataset.ultimaAtualizacao}
                  </Typography>
                </CardContent>
                
                <Divider />
                
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Stack direction="row" spacing={1}>
                    <Tooltip title="Visualizar preview">
                      <IconButton 
                        size="small" 
                        onClick={() => setItemSelecionado(dataset)}
                      >
                        <DataObject />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Ver detalhes">
                      <IconButton 
                        size="small" 
                        onClick={() => setItemSelecionado(dataset)}
                      >
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                  
                  <Button
                    variant="contained"
                    size="small"
                    endIcon={<CloudDownload />}
                    component="a"
                    href={dataset.url}
                    target="_blank"
                  >
                    Download
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {tabValue === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Alert severity="info" sx={{ mb: 3 }}>
              {monitoramentoAtivo 
                ? 'Monitoramento ativo - As métricas são atualizadas automaticamente a cada 5 segundos.'
                : 'Ative o monitoramento para acompanhar as APIs em tempo real.'
              }
            </Alert>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Status das APIs
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                {['ativo', 'limitado', 'manutencao', 'inativo'].map(status => {
                  const count = apis.filter(api => api.status === status).length;
                  const percentage = (count / apis.length) * 100;
                  
                  return (
                    <Box key={status} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                          {getStatusIcon(status)}
                          <Box sx={{ ml: 1 }}>{status} ({count})</Box>
                        </Typography>
                        <Typography variant="body2">
                          {percentage.toFixed(1)}%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={percentage} 
                        color={getStatusColor(status)}
                      />
                    </Box>
                  );
                })}
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Performance Médias
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Speed />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Tempo de Resposta Médio"
                    secondary={`${(apis.reduce((acc, api) => acc + api.tempoResposta, 0) / apis.length).toFixed(0)}ms`}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Timeline />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Uptime Médio"
                    secondary={`${(apis.reduce((acc, api) => acc + api.uptime, 0) / apis.length).toFixed(1)}%`}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Assessment />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Qualidade Média"
                    secondary={`${(apis.reduce((acc, api) => acc + api.qualidade, 0) / apis.length).toFixed(1)}/5`}
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>API</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Tempo Resposta</TableCell>
                    <TableCell>Uptime</TableCell>
                    <TableCell>Última Verificação</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {apis.map((api) => (
                    <TableRow key={api.id}>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" fontWeight="bold">
                            {api.nome}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {api.categoria}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={getStatusIcon(api.status)}
                          label={api.status}
                          size="small"
                          color={getStatusColor(api.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {api.tempoResposta.toFixed(0)}ms
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {api.uptime.toFixed(1)}%
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption">
                          {new Date(api.ultimaVerificacao).toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton 
                          size="small" 
                          onClick={() => testarAPI(api)}
                          disabled={testesExecutando.includes(api.id)}
                        >
                          {testesExecutando.includes(api.id) ? (
                            <CircularProgress size={16} />
                          ) : (
                            <PlayArrow />
                          )}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}

      {tabValue === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Alert severity="info" sx={{ mb: 3 }}>
              Documentação completa para usar APIs e datasets brasileiros em seus projetos.
            </Alert>
          </Grid>
          
          {[
            {
              titulo: 'Como Usar APIs Governamentais',
              conteudo: 'Guia passo a passo para integrar APIs do governo brasileiro.',
              itens: [
                'Obtenha chave de API quando necessário',
                'Configure autenticação adequada',
                'Respeite limites de taxa',
                'Implemente tratamento de erros',
                'Cache respostas quando apropriado'
              ]
            },
            {
              titulo: 'Boas Práticas com Datasets',
              conteudo: 'Orientações para trabalhar com datasets públicos.',
              itens: [
                'Verifique a licença de uso',
                'Valide a qualidade dos dados',
                'Documente fonte e versão',
                'Implemente versionamento',
                'Mantenha backups seguros'
              ]
            },
            {
              titulo: 'Monitoramento e Performance',
              conteudo: 'Como monitorar APIs e otimizar performance.',
              itens: [
                'Configure alertas de status',
                'Monitore tempo de resposta',
                'Implemente retry automático',
                'Use cache inteligente',
                'Mantenha logs detalhados'
              ]
            }
          ].map((secao, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="h6">{secao.titulo}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {secao.conteudo}
                  </Typography>
                  
                  <List dense>
                    {secao.itens.map((item, itemIndex) => (
                      <ListItem key={itemIndex} sx={{ py: 0.5 }}>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Dialog de Detalhes */}
      <Dialog
        open={Boolean(itemSelecionado)}
        onClose={() => setItemSelecionado(null)}
        maxWidth="md"
        fullWidth
      >
        {itemSelecionado && (
          <>
            <DialogTitle>
              {'url' in itemSelecionado ? itemSelecionado.nome : (itemSelecionado as DatasetInfo).nome}
            </DialogTitle>
            <DialogContent>
              {'url' in itemSelecionado ? (
                // API details
                <Box>
                  <Typography variant="body1" gutterBottom>
                    {(itemSelecionado as APIInfo).descricao}
                  </Typography>
                  
                  <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                    Exemplo de Resposta:
                  </Typography>
                  <Paper sx={{ p: 2, bgcolor: 'grey.100' }}>
                    <pre style={{ margin: 0, fontSize: '12px' }}>
                      {JSON.stringify((itemSelecionado as APIInfo).dadosExemplo, null, 2)}
                    </pre>
                  </Paper>
                </Box>
              ) : (
                // Dataset details with preview
                <Box>
                  <Typography variant="body1" gutterBottom>
                    {(itemSelecionado as DatasetInfo).descricao}
                  </Typography>
                  
                  <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                    Preview dos Dados:
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          {Object.keys((itemSelecionado as DatasetInfo).preview[0] || {}).map(key => (
                            <TableCell key={key}>{key}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {(itemSelecionado as DatasetInfo).preview.map((row, index) => (
                          <TableRow key={index}>
                            {Object.values(row).map((value, valueIndex) => (
                              <TableCell key={valueIndex}>{String(value)}</TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setItemSelecionado(null)}>
                Fechar
              </Button>
              <Button
                variant="contained"
                component="a"
                href={'url' in itemSelecionado ? (itemSelecionado as APIInfo).url : (itemSelecionado as DatasetInfo).url}
                target="_blank"
                endIcon={<OpenInNew />}
              >
                Acessar
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default DadosAbertosCompleto;
