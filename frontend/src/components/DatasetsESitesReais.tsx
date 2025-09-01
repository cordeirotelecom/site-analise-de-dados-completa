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
  Link,
  Avatar,
  Badge,
} from '@mui/material';
import {
  Storage,
  Public,
  Download,
  Visibility,
  Star,
  Language,
  Category,
  FilterList,
  Search,
  OpenInNew,
  DataObject,
  Analytics,
  Science,
  Business,
  School,
  HealthAndSafety,
  Nature,
  LocationOn,
  AttachMoney,
  Sports,
  MovieCreation,
  TrendingUp,
} from '@mui/icons-material';

interface DatasetSite {
  id: string;
  nome: string;
  url: string;
  descricao: string;
  categoria: string;
  tipo: 'gratuito' | 'freemium' | 'pago';
  idioma: string;
  qualidade: number;
  popularidade: number;
  ultimaAtualizacao: string;
  tags: string[];
  logo?: string;
  datasetsCount: number;
  formato: string[];
}

interface Dataset {
  id: string;
  nome: string;
  fonte: string;
  categoria: string;
  tamanho: string;
  formato: string;
  descricao: string;
  url: string;
  qualidade: number;
  downloads: number;
  atualizacao: string;
  licenca: string;
  tags: string[];
}

const DatasetsESitesReais: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [sites, setSites] = useState<DatasetSite[]>([]);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [busca, setBusca] = useState('');
  const [dialogAberto, setDialogAberto] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState<DatasetSite | Dataset | null>(null);

  // Dados dos sites de datasets - EXPANDIDO
  useEffect(() => {
    const sitesExemplo: DatasetSite[] = [
      {
        id: '1',
        nome: 'Kaggle',
        url: 'https://www.kaggle.com/datasets',
        descricao: 'Maior plataforma de ciência de dados do mundo com milhares de datasets públicos e competições.',
        categoria: 'Geral',
        tipo: 'freemium',
        idioma: 'EN/PT',
        qualidade: 5,
        popularidade: 5,
        ultimaAtualizacao: '2025-09-01',
        tags: ['machine learning', 'competições', 'notebooks', 'comunidade'],
        datasetsCount: 50000,
        formato: ['CSV', 'JSON', 'SQL', 'Images']
      },
      {
        id: '2',
        nome: 'UCI Machine Learning Repository',
        url: 'https://archive.ics.uci.edu/ml/index.php',
        descricao: 'Repositório clássico da UC Irvine com datasets históricos e bem documentados para ML.',
        categoria: 'Acadêmico',
        tipo: 'gratuito',
        idioma: 'EN',
        qualidade: 5,
        popularidade: 4,
        ultimaAtualizacao: '2025-08-28',
        tags: ['academia', 'machine learning', 'classificação', 'regressão'],
        datasetsCount: 600,
        formato: ['CSV', 'ARFF', 'TXT']
      },
      {
        id: '3',
        nome: 'Google Dataset Search',
        url: 'https://datasetsearch.research.google.com/',
        descricao: 'Motor de busca do Google especializado em encontrar datasets científicos e públicos.',
        categoria: 'Buscador',
        tipo: 'gratuito',
        idioma: 'Multi',
        qualidade: 4,
        popularidade: 5,
        ultimaAtualizacao: '2025-09-01',
        tags: ['busca', 'científico', 'público', 'indexação'],
        datasetsCount: 25000000,
        formato: ['Todos']
      },
      {
        id: '4',
        nome: 'AWS Open Data',
        url: 'https://registry.opendata.aws/',
        descricao: 'Datasets públicos hospedados na AWS, incluindo dados geoespaciais, científicos e governamentais.',
        categoria: 'Cloud',
        tipo: 'gratuito',
        idioma: 'EN',
        qualidade: 5,
        popularidade: 4,
        ultimaAtualizacao: '2025-08-30',
        tags: ['cloud', 'geoespacial', 'científico', 'governo'],
        datasetsCount: 300,
        formato: ['S3', 'API', 'CSV', 'Parquet']
      },
      {
        id: '5',
        nome: 'Data.gov (EUA)',
        url: 'https://www.data.gov/',
        descricao: 'Portal oficial de dados abertos do governo americano com milhares de datasets públicos.',
        categoria: 'Governo',
        tipo: 'gratuito',
        idioma: 'EN',
        qualidade: 4,
        popularidade: 4,
        ultimaAtualizacao: '2025-08-31',
        tags: ['governo', 'público', 'transparência', 'política'],
        datasetsCount: 300000,
        formato: ['CSV', 'XML', 'JSON', 'API']
      },
      {
        id: '6',
        nome: 'Portal Brasileiro de Dados Abertos',
        url: 'https://dados.gov.br/',
        descricao: 'Portal oficial do governo brasileiro para acesso a dados públicos e transparência.',
        categoria: 'Governo',
        tipo: 'gratuito',
        idioma: 'PT',
        qualidade: 3,
        popularidade: 3,
        ultimaAtualizacao: '2025-08-29',
        tags: ['brasil', 'governo', 'transparência', 'público'],
        datasetsCount: 8000,
        formato: ['CSV', 'XML', 'JSON']
      },
      {
        id: '7',
        nome: 'World Bank Open Data',
        url: 'https://data.worldbank.org/',
        descricao: 'Dados econômicos e de desenvolvimento de países ao redor do mundo pelo Banco Mundial.',
        categoria: 'Econômico',
        tipo: 'gratuito',
        idioma: 'Multi',
        qualidade: 5,
        popularidade: 4,
        ultimaAtualizacao: '2024-12-11',
        tags: ['economia', 'desenvolvimento', 'países', 'indicadores'],
        datasetsCount: 2000,
        formato: ['CSV', 'XML', 'API', 'Excel']
      },
      {
        id: '8',
        nome: 'Eurostat',
        url: 'https://ec.europa.eu/eurostat/data/database',
        descricao: 'Escritório de estatísticas da União Europeia com dados socioeconômicos detalhados.',
        categoria: 'Estatístico',
        tipo: 'gratuito',
        idioma: 'Multi',
        qualidade: 5,
        popularidade: 3,
        ultimaAtualizacao: '2024-12-09',
        tags: ['europa', 'estatística', 'socioeconômico', 'oficial'],
        datasetsCount: 5000,
        formato: ['CSV', 'TSV', 'API']
      },
      {
        id: '9',
        nome: 'FiveThirtyEight Data',
        url: 'https://data.fivethirtyeight.com/',
        descricao: 'Datasets usados nas análises e artigos do site FiveThirtyEight sobre política e esportes.',
        categoria: 'Jornalismo',
        tipo: 'gratuito',
        idioma: 'EN',
        qualidade: 4,
        popularidade: 3,
        ultimaAtualizacao: '2024-12-08',
        tags: ['jornalismo', 'política', 'esportes', 'análise'],
        datasetsCount: 200,
        formato: ['CSV', 'JSON']
      },
      {
        id: '10',
        nome: 'IMDb Datasets',
        url: 'https://www.imdb.com/interfaces/',
        descricao: 'Datasets oficiais do IMDb com informações sobre filmes, séries, atores e avaliações.',
        categoria: 'Entretenimento',
        tipo: 'gratuito',
        idioma: 'EN',
        qualidade: 4,
        popularidade: 4,
        ultimaAtualizacao: '2024-12-15',
        tags: ['filmes', 'séries', 'entretenimento', 'avaliações'],
        datasetsCount: 7,
        formato: ['TSV', 'GZ']
      },
      {
        id: '11',
        nome: 'Reddit Datasets',
        url: 'https://www.reddit.com/r/datasets/',
        descricao: 'Comunidade no Reddit dedicada ao compartilhamento e discussão de datasets.',
        categoria: 'Comunidade',
        tipo: 'gratuito',
        idioma: 'EN',
        qualidade: 3,
        popularidade: 4,
        ultimaAtualizacao: '2024-12-15',
        tags: ['comunidade', 'compartilhamento', 'discussão', 'variados'],
        datasetsCount: 10000,
        formato: ['Variados']
      },
      {
        id: '12',
        nome: 'Papers With Code Datasets',
        url: 'https://paperswithcode.com/datasets',
        descricao: 'Datasets associados a papers acadêmicos em machine learning e IA.',
        categoria: 'Acadêmico',
        tipo: 'gratuito',
        idioma: 'EN',
        qualidade: 5,
        popularidade: 4,
        ultimaAtualizacao: '2025-08-30',
        tags: ['academia', 'papers', 'machine learning', 'IA'],
        datasetsCount: 4000,
        formato: ['Variados']
      },
      {
        id: '13',
        nome: 'Hugging Face Datasets',
        url: 'https://huggingface.co/datasets',
        descricao: 'Hub de datasets para NLP e Machine Learning da Hugging Face.',
        categoria: 'NLP',
        tipo: 'gratuito',
        idioma: 'Multi',
        qualidade: 5,
        popularidade: 5,
        ultimaAtualizacao: '2025-09-01',
        tags: ['NLP', 'transformers', 'linguagem', 'IA'],
        datasetsCount: 30000,
        formato: ['Arrow', 'Parquet', 'JSON']
      },
      {
        id: '14',
        nome: 'ImageNet',
        url: 'https://www.image-net.org/',
        descricao: 'Maior dataset de imagens para computer vision e deep learning.',
        categoria: 'Computer Vision',
        tipo: 'gratuito',
        idioma: 'EN',
        qualidade: 5,
        popularidade: 5,
        ultimaAtualizacao: '2025-07-15',
        tags: ['computer vision', 'imagens', 'deep learning', 'benchmark'],
        datasetsCount: 50,
        formato: ['JPEG', 'XML']
      },
      {
        id: '15',
        nome: 'NASA Open Data',
        url: 'https://data.nasa.gov/',
        descricao: 'Dados espaciais, climáticos e científicos da NASA.',
        categoria: 'Ciência',
        tipo: 'gratuito',
        idioma: 'EN',
        qualidade: 5,
        popularidade: 4,
        ultimaAtualizacao: '2025-08-31',
        tags: ['NASA', 'espaço', 'clima', 'ciência'],
        datasetsCount: 32000,
        formato: ['NetCDF', 'HDF5', 'CSV', 'GeoTIFF']
      },
      {
        id: '16',
        nome: 'OECD Data',
        url: 'https://data.oecd.org/',
        descricao: 'Dados econômicos e sociais dos países da OCDE.',
        categoria: 'Economia',
        tipo: 'gratuito',
        idioma: 'Multi',
        qualidade: 5,
        popularidade: 4,
        ultimaAtualizacao: '2025-08-30',
        tags: ['OCDE', 'economia', 'desenvolvimento', 'políticas'],
        datasetsCount: 1500,
        formato: ['CSV', 'Excel', 'SDMX']
      },
      {
        id: '17',
        nome: 'European Data Portal',
        url: 'https://data.europa.eu/',
        descricao: 'Portal oficial de dados da União Europeia.',
        categoria: 'Governo',
        tipo: 'gratuito',
        idioma: 'Multi',
        qualidade: 4,
        popularidade: 4,
        ultimaAtualizacao: '2025-08-29',
        tags: ['Europa', 'EU', 'governo', 'políticas'],
        datasetsCount: 1200000,
        formato: ['CSV', 'RDF', 'JSON', 'XML']
      },
      {
        id: '18',
        nome: 'Common Crawl',
        url: 'https://commoncrawl.org/',
        descricao: 'Arquivo da web com petabytes de dados crawleados mensalmente.',
        categoria: 'Web',
        tipo: 'gratuito',
        idioma: 'Multi',
        qualidade: 4,
        popularidade: 3,
        ultimaAtualizacao: '2025-09-01',
        tags: ['web crawl', 'big data', 'NLP', 'internet'],
        datasetsCount: 100,
        formato: ['WARC', 'WET', 'WAT']
      },
      {
        id: '19',
        nome: 'OpenStreetMap',
        url: 'https://www.openstreetmap.org/',
        descricao: 'Dados geográficos colaborativos do mundo inteiro.',
        categoria: 'Geografia',
        tipo: 'gratuito',
        idioma: 'Multi',
        qualidade: 4,
        popularidade: 5,
        ultimaAtualizacao: '2025-09-01',
        tags: ['geografia', 'mapas', 'geolocalização', 'colaborativo'],
        datasetsCount: 1,
        formato: ['OSM', 'XML', 'PBF']
      },
      {
        id: '20',
        nome: 'NASDAQ Data Link',
        url: 'https://data.nasdaq.com/',
        descricao: 'Dados financeiros e econômicos premium e gratuitos.',
        categoria: 'Finanças',
        tipo: 'freemium',
        idioma: 'EN',
        qualidade: 5,
        popularidade: 4,
        ultimaAtualizacao: '2025-09-01',
        tags: ['finanças', 'economia', 'mercados', 'API'],
        datasetsCount: 20000,
        formato: ['CSV', 'JSON', 'Excel', 'API']
      }
    ];
    setSites(sitesExemplo);

    // Datasets populares
    const datasetsExemplo: Dataset[] = [
      {
        id: '1',
        nome: 'Iris Flower Dataset',
        fonte: 'UCI ML Repository',
        categoria: 'Classificação',
        tamanho: '4.5 KB',
        formato: 'CSV',
        descricao: 'Dataset clássico com medidas de 150 flores íris de 3 espécies diferentes.',
        url: 'https://archive.ics.uci.edu/ml/datasets/iris',
        qualidade: 5,
        downloads: 1000000,
        atualizacao: '1988-07-01',
        licenca: 'CC0',
        tags: ['classificação', 'flores', 'clássico', 'beginner']
      },
      {
        id: '2',
        nome: 'Titanic Dataset',
        fonte: 'Kaggle',
        categoria: 'Classificação',
        tamanho: '60 KB',
        formato: 'CSV',
        descricao: 'Dados dos passageiros do Titanic para prever sobrevivência.',
        url: 'https://www.kaggle.com/c/titanic/data',
        qualidade: 4,
        downloads: 800000,
        atualizacao: '2012-09-28',
        licenca: 'CC0',
        tags: ['classificação', 'histórico', 'sobrevivência', 'popular']
      },
      {
        id: '3',
        nome: 'House Prices Dataset',
        fonte: 'Kaggle',
        categoria: 'Regressão',
        tamanho: '460 KB',
        formato: 'CSV',
        descricao: 'Preços de casas em Ames, Iowa com 79 variáveis explicativas.',
        url: 'https://www.kaggle.com/c/house-prices-advanced-regression-techniques',
        qualidade: 4,
        downloads: 500000,
        atualizacao: '2016-08-05',
        licenca: 'ODC-By',
        tags: ['regressão', 'imóveis', 'preços', 'competição']
      },
      {
        id: '4',
        nome: 'COVID-19 Dataset',
        fonte: 'Our World in Data',
        categoria: 'Séries Temporais',
        tamanho: '15 MB',
        formato: 'CSV',
        descricao: 'Dados globais sobre COVID-19: casos, mortes, vacinação.',
        url: 'https://github.com/owid/covid-19-data',
        qualidade: 5,
        downloads: 300000,
        atualizacao: '2024-12-15',
        licenca: 'CC BY',
        tags: ['covid', 'saúde', 'global', 'temporal']
      },
      {
        id: '5',
        nome: 'Stock Market Dataset',
        fonte: 'Yahoo Finance',
        categoria: 'Financeiro',
        tamanho: '100 MB',
        formato: 'CSV',
        descricao: 'Dados históricos de ações do mercado financeiro.',
        url: 'https://finance.yahoo.com/',
        qualidade: 4,
        downloads: 250000,
        atualizacao: '2024-12-15',
        licenca: 'Uso Pessoal',
        tags: ['finanças', 'ações', 'mercado', 'temporal']
      },
      {
        id: '6',
        nome: 'MNIST Handwritten Digits',
        fonte: 'Yann LeCun',
        categoria: 'Visão Computacional',
        tamanho: '11 MB',
        formato: 'IDX',
        descricao: 'Dataset de dígitos manuscritos 0-9 em escala de cinza 28x28.',
        url: 'http://yann.lecun.com/exdb/mnist/',
        qualidade: 5,
        downloads: 2000000,
        atualizacao: '1998-01-01',
        licenca: 'CC0',
        tags: ['visão computacional', 'dígitos', 'clássico', 'imagens']
      }
    ];
    setDatasets(datasetsExemplo);
  }, []);

  const categoriasSites = ['todos', 'Geral', 'Acadêmico', 'Governo', 'Econômico', 'Cloud', 'Buscador', 'Comunidade', 'Jornalismo', 'Entretenimento', 'Estatístico'];
  const tiposSites = ['todos', 'gratuito', 'freemium', 'pago'];
  const categoriasDatasets = ['todos', 'Classificação', 'Regressão', 'Séries Temporais', 'Financeiro', 'Visão Computacional'];

  const sitesFiltrados = sites.filter(site => {
    const matchCategoria = filtroCategoria === 'todos' || site.categoria === filtroCategoria;
    const matchTipo = filtroTipo === 'todos' || site.tipo === filtroTipo;
    const matchBusca = busca === '' || 
      site.nome.toLowerCase().includes(busca.toLowerCase()) ||
      site.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      site.tags.some(tag => tag.toLowerCase().includes(busca.toLowerCase()));
    
    return matchCategoria && matchTipo && matchBusca;
  });

  const datasetsFiltrados = datasets.filter(dataset => {
    const matchCategoria = filtroCategoria === 'todos' || dataset.categoria === filtroCategoria;
    const matchBusca = busca === '' || 
      dataset.nome.toLowerCase().includes(busca.toLowerCase()) ||
      dataset.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      dataset.tags.some(tag => tag.toLowerCase().includes(busca.toLowerCase()));
    
    return matchCategoria && matchBusca;
  });

  const getCategoryIcon = (categoria: string) => {
    const icons: { [key: string]: React.ReactElement } = {
      'Geral': <DataObject />,
      'Acadêmico': <School />,
      'Governo': <Business />,
      'Econômico': <AttachMoney />,
      'Cloud': <Public />,
      'Buscador': <Search />,
      'Comunidade': <Language />,
      'Jornalismo': <MovieCreation />,
      'Entretenimento': <Sports />,
      'Estatístico': <Analytics />,
      'Classificação': <Category />,
      'Regressão': <TrendingUp />,
      'Séries Temporais': <Analytics />,
      'Financeiro': <AttachMoney />,
      'Visão Computacional': <Visibility />
    };
    return icons[categoria] || <Storage />;
  };

  const getQualityColor = (qualidade: number) => {
    if (qualidade >= 4.5) return 'success';
    if (qualidade >= 3.5) return 'warning';
    return 'error';
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Storage sx={{ mr: 2, color: 'primary.main' }} />
          Datasets & Sites Reais
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Explore uma curadoria completa dos melhores sites de datasets e conjuntos de dados para suas análises.
        </Typography>
      </Box>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
          <Tab label="Sites de Datasets" icon={<Public />} />
          <Tab label="Datasets Populares" icon={<Storage />} />
          <Tab label="Guia de Uso" icon={<Science />} />
        </Tabs>
      </Paper>

      {/* Filtros */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            placeholder="Buscar..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Categoria</InputLabel>
            <Select
              value={filtroCategoria}
              label="Categoria"
              onChange={(e) => setFiltroCategoria(e.target.value)}
            >
              {(tabValue === 0 ? categoriasSites : categoriasDatasets).map(categoria => (
                <MenuItem key={categoria} value={categoria}>
                  {categoria === 'todos' ? 'Todas as categorias' : categoria}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {tabValue === 0 && (
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Tipo</InputLabel>
              <Select
                value={filtroTipo}
                label="Tipo"
                onChange={(e) => setFiltroTipo(e.target.value)}
              >
                {tiposSites.map(tipo => (
                  <MenuItem key={tipo} value={tipo}>
                    {tipo === 'todos' ? 'Todos os tipos' : tipo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
      </Grid>

      {/* Content */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          {sitesFiltrados.map((site) => (
            <Grid item xs={12} md={6} lg={4} key={site.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                        {getCategoryIcon(site.categoria)}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {site.nome}
                        </Typography>
                        <Chip 
                          label={site.tipo} 
                          size="small" 
                          color={site.tipo === 'gratuito' ? 'success' : site.tipo === 'freemium' ? 'warning' : 'error'}
                        />
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" color="primary">
                        {site.qualidade}/5
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Qualidade
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {site.descricao}
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      <strong>Datasets:</strong> {site.datasetsCount.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Formatos:</strong> {site.formato.join(', ')}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Idioma:</strong> {site.idioma}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    {site.tags.map((tag, index) => (
                      <Chip 
                        key={index} 
                        label={tag} 
                        size="small" 
                        sx={{ mr: 0.5, mb: 0.5 }} 
                      />
                    ))}
                  </Box>
                  
                  <Typography variant="caption" color="text.secondary">
                    Atualizado em {site.ultimaAtualizacao}
                  </Typography>
                </CardContent>
                
                <Divider />
                
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Visibility />}
                    onClick={() => setItemSelecionado(site)}
                  >
                    Detalhes
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    endIcon={<OpenInNew />}
                    component={Link}
                    href={site.url}
                    target="_blank"
                  >
                    Visitar
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
                      <Chip 
                        label={dataset.categoria} 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                        icon={getCategoryIcon(dataset.categoria)}
                      />
                    </Box>
                    <Badge badgeContent={dataset.qualidade} color={getQualityColor(dataset.qualidade)}>
                      <Star />
                    </Badge>
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
                      <strong>Formato:</strong> {dataset.formato}
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
                    {dataset.downloads.toLocaleString()} downloads • Atualizado {dataset.atualizacao}
                  </Typography>
                </CardContent>
                
                <Divider />
                
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Visibility />}
                    onClick={() => setItemSelecionado(dataset)}
                  >
                    Detalhes
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    endIcon={<Download />}
                    component={Link}
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
              Guia completo para encontrar, avaliar e usar datasets de qualidade em seus projetos.
            </Alert>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                🔍 Como Escolher um Dataset
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Science />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Relevância"
                    secondary="O dataset deve estar alinhado com seu problema"
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Analytics />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Qualidade"
                    secondary="Verifique completude, consistência e documentação"
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Public />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Licença"
                    secondary="Confirme que pode usar para seu propósito"
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Storage />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Tamanho"
                    secondary="Considere recursos computacionais disponíveis"
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                ⭐ Sites Recomendados por Categoria
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <School />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Iniciantes"
                    secondary="UCI ML Repository, Kaggle Learn"
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Business />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Dados Governamentais"
                    secondary="Data.gov, Dados.gov.br, Eurostat"
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <AttachMoney />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Dados Financeiros"
                    secondary="World Bank, Yahoo Finance, Quandl"
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Science />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Pesquisa Acadêmica"
                    secondary="Papers With Code, Google Dataset Search"
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                🚀 Dicas de Boas Práticas
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" gutterBottom>
                    Antes de Download:
                  </Typography>
                  <List dense>
                    <ListItem sx={{ py: 0.5 }}>
                      <ListItemText primary="• Leia a documentação completa" />
                    </ListItem>
                    <ListItem sx={{ py: 0.5 }}>
                      <ListItemText primary="• Verifique a licença de uso" />
                    </ListItem>
                    <ListItem sx={{ py: 0.5 }}>
                      <ListItemText primary="• Analise a qualidade dos dados" />
                    </ListItem>
                    <ListItem sx={{ py: 0.5 }}>
                      <ListItemText primary="• Confirme o formato dos arquivos" />
                    </ListItem>
                  </List>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" gutterBottom>
                    Durante a Análise:
                  </Typography>
                  <List dense>
                    <ListItem sx={{ py: 0.5 }}>
                      <ListItemText primary="• Faça análise exploratória primeiro" />
                    </ListItem>
                    <ListItem sx={{ py: 0.5 }}>
                      <ListItemText primary="• Identifique valores ausentes" />
                    </ListItem>
                    <ListItem sx={{ py: 0.5 }}>
                      <ListItemText primary="• Procure por outliers e inconsistências" />
                    </ListItem>
                    <ListItem sx={{ py: 0.5 }}>
                      <ListItemText primary="• Documente suas descobertas" />
                    </ListItem>
                  </List>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" gutterBottom>
                    Ética e Responsabilidade:
                  </Typography>
                  <List dense>
                    <ListItem sx={{ py: 0.5 }}>
                      <ListItemText primary="• Respeite a privacidade dos dados" />
                    </ListItem>
                    <ListItem sx={{ py: 0.5 }}>
                      <ListItemText primary="• Cite sempre a fonte" />
                    </ListItem>
                    <ListItem sx={{ py: 0.5 }}>
                      <ListItemText primary="• Verifique vieses nos dados" />
                    </ListItem>
                    <ListItem sx={{ py: 0.5 }}>
                      <ListItemText primary="• Use de forma responsável" />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
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
              {'nome' in itemSelecionado ? itemSelecionado.nome : (itemSelecionado as DatasetSite).nome}
            </DialogTitle>
            <DialogContent>
              {'url' in itemSelecionado ? (
                // Site details
                <Box>
                  <Typography variant="body1" gutterBottom>
                    {(itemSelecionado as DatasetSite).descricao}
                  </Typography>
                  
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2">Categoria:</Typography>
                      <Typography variant="body2">{(itemSelecionado as DatasetSite).categoria}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2">Tipo:</Typography>
                      <Typography variant="body2">{(itemSelecionado as DatasetSite).tipo}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2">Datasets:</Typography>
                      <Typography variant="body2">{(itemSelecionado as DatasetSite).datasetsCount.toLocaleString()}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2">Qualidade:</Typography>
                      <Typography variant="body2">{(itemSelecionado as DatasetSite).qualidade}/5</Typography>
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>Tags:</Typography>
                    {(itemSelecionado as DatasetSite).tags.map((tag, index) => (
                      <Chip key={index} label={tag} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                    ))}
                  </Box>
                </Box>
              ) : (
                // Dataset details
                <Box>
                  <Typography variant="body1" gutterBottom>
                    {(itemSelecionado as Dataset).descricao}
                  </Typography>
                  
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2">Fonte:</Typography>
                      <Typography variant="body2">{(itemSelecionado as Dataset).fonte}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2">Categoria:</Typography>
                      <Typography variant="body2">{(itemSelecionado as Dataset).categoria}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2">Tamanho:</Typography>
                      <Typography variant="body2">{(itemSelecionado as Dataset).tamanho}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2">Formato:</Typography>
                      <Typography variant="body2">{(itemSelecionado as Dataset).formato}</Typography>
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>Tags:</Typography>
                    {(itemSelecionado as Dataset).tags.map((tag, index) => (
                      <Chip key={index} label={tag} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                    ))}
                  </Box>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setItemSelecionado(null)}>
                Fechar
              </Button>
              <Button
                variant="contained"
                component={Link}
                href={'url' in itemSelecionado ? (itemSelecionado as DatasetSite).url : (itemSelecionado as Dataset).url}
                target="_blank"
                endIcon={<OpenInNew />}
              >
                Visitar
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default DatasetsESitesReais;
