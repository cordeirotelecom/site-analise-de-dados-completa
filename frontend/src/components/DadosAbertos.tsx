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
} from '@mui/icons-material';

interface Dataset {
  id: string;
  nome: string;
  descricao: string;
  categoria: string;
  municipio: string;
  fonte: string;
  ultimaAtualizacao: string;
  tamanho: string;
  formato: string;
  colunas: number;
  linhas: number;
  tags: string[];
  url: string;
  documentacao: string;
}

const DadosAbertos: React.FC = () => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [filteredDatasets, setFilteredDatasets] = useState<Dataset[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMunicipio, setSelectedMunicipio] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  
  // Novos estados para análise orientada
  const [selectedObjective, setSelectedObjective] = useState('');
  const [selectedDatasets, setSelectedDatasets] = useState<string[]>([]);

  // Objetivos de análise disponíveis
  const analysisObjectives = [
    {
      id: 'correlation',
      nome: 'Encontrar Correlações',
      descricao: 'Identificar relações estatísticas entre diferentes variáveis dos dados',
      tecnica: 'Coeficiente de Correlação de Pearson, Spearman e Kendall',
      exemplo: 'Ex: Correlação entre renda per capita e índices de criminalidade'
    },
    {
      id: 'comparison',
      nome: 'Comparar Municípios/Regiões',
      descricao: 'Comparar indicadores entre diferentes localidades',
      tecnica: 'Análise Comparativa Multivariada e Teste T de Student',
      exemplo: 'Ex: Comparar índices de saúde entre Florianópolis e São José'
    },
    {
      id: 'trend',
      nome: 'Analisar Tendências Temporais',
      descricao: 'Identificar padrões de crescimento, declínio ou sazonalidade',
      tecnica: 'Análise de Séries Temporais e Regressão Linear',
      exemplo: 'Ex: Evolução do PIB municipal nos últimos 5 anos'
    },
    {
      id: 'clusters',
      nome: 'Agrupar por Similaridade',
      descricao: 'Identificar grupos de municípios com características similares',
      tecnica: 'Algoritmo K-means e Análise Hierárquica de Clusters',
      exemplo: 'Ex: Agrupar municípios por perfil socioeconômico'
    },
    {
      id: 'prediction',
      nome: 'Fazer Predições',
      descricao: 'Prever valores futuros baseado em dados históricos',
      tecnica: 'Regressão Linear/Polinomial e Machine Learning',
      exemplo: 'Ex: Prever crescimento populacional para próximos anos'
    },
    {
      id: 'distribution',
      nome: 'Analisar Distribuições',
      descricao: 'Entender como os dados estão distribuídos estatisticamente',
      tecnica: 'Histogramas, Box-plots e Testes de Normalidade',
      exemplo: 'Ex: Distribuição de renda por faixa etária'
    }
  ];

  // Dados simulados dos datasets públicos de SC
  const mockDatasets: Dataset[] = [
    {
      id: 'saude-sc-001',
      nome: 'Dados de Saúde Pública - Santa Catarina',
      descricao: 'Informações sobre atendimentos, leitos hospitalares, profissionais de saúde e indicadores epidemiológicos do estado de SC.',
      categoria: 'Saúde',
      municipio: 'Santa Catarina',
      fonte: 'SES-SC',
      ultimaAtualizacao: '2025-08-25',
      tamanho: '45.2 MB',
      formato: 'CSV',
      colunas: 28,
      linhas: 125000,
      tags: ['hospitais', 'atendimentos', 'epidemiologia', 'sus'],
      url: 'https://dados.sc.gov.br/dataset/saude-publica',
      documentacao: 'Documentação técnica disponível com dicionário de dados e metodologia de coleta.'
    },
    {
      id: 'seguranca-floripa-001',
      nome: 'Ocorrências Policiais - Florianópolis',
      descricao: 'Registros de ocorrências policiais, tipos de crime, localização e dados temporais da Grande Florianópolis.',
      categoria: 'Segurança',
      municipio: 'Florianópolis',
      fonte: 'SSP-SC',
      ultimaAtualizacao: '2025-08-20',
      tamanho: '32.8 MB',
      formato: 'JSON',
      colunas: 15,
      linhas: 89000,
      tags: ['criminalidade', 'segurança', 'geolocalização', 'temporal'],
      url: 'https://dados.florianopolis.sc.gov.br/dataset/seguranca',
      documentacao: 'Inclui coordenadas geográficas e classificação por tipo penal.'
    },
    {
      id: 'educacao-sj-001',
      nome: 'Indicadores Educacionais - São José',
      descricao: 'Dados do IDEB, matrículas, infraestrutura escolar e desempenho estudantil das escolas públicas e privadas.',
      categoria: 'Educação',
      municipio: 'São José',
      fonte: 'SEDUC-SC',
      ultimaAtualizacao: '2025-08-18',
      tamanho: '18.5 MB',
      formato: 'Excel',
      colunas: 42,
      linhas: 15000,
      tags: ['ideb', 'matrículas', 'infraestrutura', 'desempenho'],
      url: 'https://dados.saojose.sc.gov.br/dataset/educacao',
      documentacao: 'Dados consolidados por escola com georreferenciamento.'
    },
    {
      id: 'economia-sc-001',
      nome: 'PIB Municipal e Setorial - Santa Catarina',
      descricao: 'Produto Interno Bruto por município, setor econômico, emprego formal e arrecadação tributária.',
      categoria: 'Economia',
      municipio: 'Santa Catarina',
      fonte: 'SEF-SC / IBGE',
      ultimaAtualizacao: '2025-08-15',
      tamanho: '62.1 MB',
      formato: 'CSV',
      colunas: 35,
      linhas: 295000,
      tags: ['pib', 'emprego', 'tributação', 'setores'],
      url: 'https://dados.sc.gov.br/dataset/economia',
      documentacao: 'Série histórica de 2010-2024 com metodologia IBGE.'
    },
    {
      id: 'transporte-floripa-001',
      nome: 'Transporte Público - Grande Florianópolis',
      descricao: 'Dados de passageiros, rotas, horários e integração do sistema de transporte público metropolitano.',
      categoria: 'Transporte',
      municipio: 'Florianópolis',
      fonte: 'Consórcio Fênix',
      ultimaAtualizacao: '2025-08-27',
      tamanho: '28.7 MB',
      formato: 'CSV',
      colunas: 22,
      linhas: 450000,
      tags: ['ônibus', 'passageiros', 'rotas', 'integração'],
      url: 'https://dados.fenix.com.br/dataset/transporte',
      documentacao: 'Dados em tempo real com API REST disponível.'
    },
    {
      id: 'meio-ambiente-sc-001',
      nome: 'Qualidade do Ar e Recursos Hídricos - SC',
      descricao: 'Monitoramento da qualidade do ar, recursos hídricos, licenciamento ambiental e áreas protegidas.',
      categoria: 'Meio Ambiente',
      municipio: 'Santa Catarina',
      fonte: 'FATMA / IMA',
      ultimaAtualizacao: '2025-08-22',
      tamanho: '41.3 MB',
      formato: 'JSON',
      colunas: 31,
      linhas: 78000,
      tags: ['ar', 'água', 'licenciamento', 'conservação'],
      url: 'https://dados.ima.sc.gov.br/dataset/qualidade-ambiental',
      documentacao: 'Estações de monitoramento georeferenciadas com histórico.'
    }
  ];

  const categorias = ['Saúde', 'Segurança', 'Educação', 'Economia', 'Transporte', 'Meio Ambiente'];
  const municipios = ['Santa Catarina', 'Florianópolis', 'São José', 'Palhoça', 'Biguaçu', 'São Pedro de Alcântara'];

  useEffect(() => {
    setDatasets(mockDatasets);
    setFilteredDatasets(mockDatasets);
  }, []);

  useEffect(() => {
    let filtered = datasets;

    if (selectedCategory) {
      filtered = filtered.filter(d => d.categoria === selectedCategory);
    }

    if (selectedMunicipio) {
      filtered = filtered.filter(d => d.municipio === selectedMunicipio);
    }

    if (searchTerm) {
      filtered = filtered.filter(d => 
        d.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredDatasets(filtered);
  }, [selectedCategory, selectedMunicipio, searchTerm, datasets]);

  const handleDownload = async (dataset: Dataset) => {
    setDownloadingId(dataset.id);

    // Simular download
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Criar arquivo simulado para download
    const csvContent = `ID,Nome,Categoria,Município,Fonte,Última Atualização
${dataset.id},"${dataset.nome}","${dataset.categoria}","${dataset.municipio}","${dataset.fonte}","${dataset.ultimaAtualizacao}"`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `${dataset.nome.replace(/\s+/g, '_').toLowerCase()}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    setDownloadingId(null);
  };

  const getCategoryIcon = (categoria: string) => {
    switch (categoria) {
      case 'Saúde': return <LocalHospital color="error" />;
      case 'Segurança': return <Security color="warning" />;
      case 'Educação': return <School color="primary" />;
      case 'Economia': return <Business color="success" />;
      case 'Transporte': return <LocationCity color="info" />;
      case 'Meio Ambiente': return <Public color="success" />;
      default: return <Analytics />;
    }
  };

  const getCategoryColor = (categoria: string): "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" => {
    switch (categoria) {
      case 'Saúde': return 'error';
      case 'Segurança': return 'warning';
      case 'Educação': return 'primary';
      case 'Economia': return 'success';
      case 'Transporte': return 'info';
      case 'Meio Ambiente': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Public sx={{ fontSize: 40, color: 'primary.main' }} />
          Dados Abertos de Santa Catarina
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Explore e analise datasets públicos oficiais de Santa Catarina. Baixe dados governamentais 
          verificados e atualizados para suas análises científicas e projetos.
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            📊 Portal Oficial de Dados Abertos
          </Typography>
          <Typography variant="body2">
            Todos os datasets são provenientes de fontes oficiais do governo do estado de Santa Catarina 
            e municípios da região metropolitana. Os dados são atualizados regularmente e seguem 
            padrões de transparência pública.
          </Typography>
        </Alert>
      </Box>

      {/* Seleção de Objetivo de Análise */}
      <Card sx={{ mb: 3, border: '2px solid', borderColor: 'primary.main', borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'primary.main' }}>
            <Analytics />
            O que você deseja descobrir nos dados?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Selecione seu objetivo de análise para receber orientações técnicas específicas e sugestões de datasets relevantes.
          </Typography>

          <Grid container spacing={2}>
            {analysisObjectives.map((objective, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  variant="outlined" 
                  sx={{ 
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: selectedObjective === objective.id ? '2px solid' : '1px solid',
                    borderColor: selectedObjective === objective.id ? 'primary.main' : 'divider',
                    backgroundColor: selectedObjective === objective.id ? 'primary.light' : 'transparent',
                    '&:hover': {
                      borderColor: 'primary.main',
                      backgroundColor: 'primary.light',
                      transform: 'translateY(-2px)',
                      boxShadow: 3,
                    }
                  }}
                  onClick={() => setSelectedObjective(objective.id)}
                >
                  <CardContent sx={{ textAlign: 'center', py: 2 }}>
                    <Box sx={{ color: 'primary.main', mb: 1 }}>
                      <Analytics sx={{ fontSize: 32 }} />
                    </Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      {objective.nome}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {objective.descricao}
                    </Typography>
                    <Chip 
                      label="Disponível" 
                      size="small" 
                      color="success"
                      variant="outlined"
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {selectedObjective && (
            <Box sx={{ mt: 3, p: 3, backgroundColor: 'grey.50', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom color="primary">
                🎯 Orientação Técnica Selecionada
              </Typography>
              {(() => {
                const objective = analysisObjectives.find(obj => obj.id === selectedObjective);
                return objective ? (
                  <Box>
                    <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
                      <strong>Análise:</strong> {objective.nome}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      <strong>Descrição:</strong> {objective.descricao}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      <strong>Técnica Estatística:</strong> {objective.tecnica}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      <strong>Exemplo Prático:</strong> {objective.exemplo}
                    </Typography>
                    
                    <Alert severity="info" sx={{ mt: 2 }}>
                      <Typography variant="body2">
                        💡 <strong>Dica:</strong> Selecione datasets relacionados abaixo para aplicar esta técnica de análise. 
                        O sistema irá guiá-lo através do processo passo a passo.
                      </Typography>
                    </Alert>
                  </Box>
                ) : null;
              })()}
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Comparação de Datasets */}
      {selectedDatasets.length > 0 && (
        <Card sx={{ mb: 3, backgroundColor: 'success.light' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TrendingUp />
              Datasets Selecionados para Comparação ({selectedDatasets.length})
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {selectedDatasets.map((datasetId) => {
                const dataset = datasets.find(d => d.id === datasetId);
                return dataset ? (
                  <Chip 
                    key={datasetId}
                    label={dataset.nome}
                    onDelete={() => setSelectedDatasets(prev => prev.filter(id => id !== datasetId))}
                    color="primary"
                  />
                ) : null;
              })}
            </Box>
            <Button 
              variant="contained" 
              color="success"
              disabled={selectedDatasets.length < 2}
              sx={{ mr: 1 }}
            >
              Iniciar Análise Comparativa
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => setSelectedDatasets([])}
            >
              Limpar Seleção
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Filtros */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FilterList />
            Filtros de Busca
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Buscar datasets"
                placeholder="Ex: saúde, crime, educação..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Categoria</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  label="Categoria"
                >
                  <MenuItem value="">
                    <em>Todas as categorias</em>
                  </MenuItem>
                  {categorias.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getCategoryIcon(cat)}
                        {cat}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Município</InputLabel>
                <Select
                  value={selectedMunicipio}
                  onChange={(e) => setSelectedMunicipio(e.target.value)}
                  label="Município"
                >
                  <MenuItem value="">
                    <em>Todos os municípios</em>
                  </MenuItem>
                  {municipios.map((mun) => (
                    <MenuItem key={mun} value={mun}>
                      {mun}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  setSelectedCategory('');
                  setSelectedMunicipio('');
                  setSearchTerm('');
                }}
                sx={{ height: '56px' }}
              >
                Limpar Filtros
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card variant="outlined">
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary.main" gutterBottom>
                {filteredDatasets.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Datasets Disponíveis
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card variant="outlined">
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="success.main" gutterBottom>
                {new Set(filteredDatasets.map(d => d.categoria)).size}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Categorias
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card variant="outlined">
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="info.main" gutterBottom>
                {filteredDatasets.reduce((sum, d) => sum + d.linhas, 0).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total de Registros
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card variant="outlined">
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="warning.main" gutterBottom>
                {new Set(filteredDatasets.map(d => d.municipio)).size}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Municípios
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Lista de Datasets */}
      <Grid container spacing={3}>
        {filteredDatasets.map((dataset) => (
          <Grid item xs={12} key={dataset.id}>
            <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                      {getCategoryIcon(dataset.categoria)}
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" gutterBottom>
                          {dataset.nome}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {dataset.descricao}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                          <Chip 
                            label={dataset.categoria} 
                            color={getCategoryColor(dataset.categoria)}
                            size="small"
                          />
                          <Chip 
                            label={dataset.municipio} 
                            variant="outlined" 
                            size="small"
                          />
                          <Chip 
                            label={dataset.formato} 
                            variant="outlined" 
                            size="small"
                          />
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {dataset.tags.map((tag, index) => (
                            <Chip 
                              key={index}
                              label={tag} 
                              size="small" 
                              variant="outlined"
                              sx={{ fontSize: '0.75rem', height: 24 }}
                            />
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                      <Typography variant="subtitle2" color="primary" gutterBottom>
                        Informações Técnicas
                      </Typography>
                      <List dense>
                        <ListItem sx={{ py: 0.5, px: 0 }}>
                          <ListItemText 
                            primary={`Registros: ${dataset.linhas.toLocaleString()}`}
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                        <ListItem sx={{ py: 0.5, px: 0 }}>
                          <ListItemText 
                            primary={`Colunas: ${dataset.colunas}`}
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                        <ListItem sx={{ py: 0.5, px: 0 }}>
                          <ListItemText 
                            primary={`Tamanho: ${dataset.tamanho}`}
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                        <ListItem sx={{ py: 0.5, px: 0 }}>
                          <ListItemText 
                            primary={`Fonte: ${dataset.fonte}`}
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                        <ListItem sx={{ py: 0.5, px: 0 }}>
                          <ListItemText 
                            primary={`Atualizado: ${new Date(dataset.ultimaAtualizacao).toLocaleDateString('pt-BR')}`}
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      </List>
                    </Paper>

                    <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                      <Button
                        variant="contained"
                        fullWidth
                        startIcon={downloadingId === dataset.id ? <CircularProgress size={20} /> : <Download />}
                        onClick={() => handleDownload(dataset)}
                        disabled={downloadingId === dataset.id}
                      >
                        {downloadingId === dataset.id ? 'Baixando...' : 'Baixar Dataset'}
                      </Button>
                      
                      <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<Visibility />}
                      >
                        Visualizar Amostra
                      </Button>
                      
                      <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<Info />}
                      >
                        Documentação
                      </Button>
                      
                      <Button
                        variant={selectedDatasets.includes(dataset.id) ? "contained" : "outlined"}
                        fullWidth
                        color={selectedDatasets.includes(dataset.id) ? "success" : "primary"}
                        startIcon={selectedDatasets.includes(dataset.id) ? <Analytics /> : <TrendingUp />}
                        onClick={() => {
                          if (selectedDatasets.includes(dataset.id)) {
                            setSelectedDatasets(prev => prev.filter(id => id !== dataset.id));
                          } else {
                            setSelectedDatasets(prev => [...prev, dataset.id]);
                          }
                        }}
                      >
                        {selectedDatasets.includes(dataset.id) ? 'Selecionado para Comparação' : 'Selecionar para Comparação'}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>

                <Accordion sx={{ mt: 2 }}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="subtitle2">
                      Detalhes Técnicos e Documentação
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {dataset.documentacao}
                    </Typography>
                    
                    <Typography variant="subtitle2" gutterBottom>
                      Possíveis Análises com este Dataset:
                    </Typography>
                    <List dense>
                      {dataset.categoria === 'Saúde' && (
                        <>
                          <ListItem sx={{ py: 0.5, px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <TrendingUp sx={{ fontSize: 16 }} />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Análise epidemiológica e tendências de saúde pública"
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                          <ListItem sx={{ py: 0.5, px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <Analytics sx={{ fontSize: 16 }} />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Correlação entre atendimentos e fatores demográficos"
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        </>
                      )}
                      {dataset.categoria === 'Segurança' && (
                        <>
                          <ListItem sx={{ py: 0.5, px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <TrendingUp sx={{ fontSize: 16 }} />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Análise temporal e espacial da criminalidade"
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                          <ListItem sx={{ py: 0.5, px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <Analytics sx={{ fontSize: 16 }} />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Correlação entre tipos de crime e localização"
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        </>
                      )}
                    </List>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredDatasets.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Nenhum dataset encontrado
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Tente ajustar os filtros de busca ou escolher categorias diferentes.
          </Typography>
        </Box>
      )}

      {/* Seção Educativa - Como Interpretar Resultados */}
      {selectedObjective && selectedDatasets.length > 0 && (
        <Card sx={{ mt: 4, border: '2px solid', borderColor: 'success.main' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ color: 'success.main', display: 'flex', alignItems: 'center', gap: 1 }}>
              <School />
              Como Interpretar os Resultados da Análise
            </Typography>
            
            {selectedObjective === 'correlation' && (
              <Box>
                <Typography variant="h6" gutterBottom>🔗 Análise de Correlação - Guia Passo a Passo</Typography>
                <List>
                  <ListItem>
                    <ListItemIcon><Analytics sx={{ color: 'primary.main' }} /></ListItemIcon>
                    <ListItemText 
                      primary="Passo 1: Preparação dos Dados"
                      secondary="Os dados serão limpos automaticamente, removendo valores ausentes e padronizando formatos."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><TrendingUp sx={{ color: 'warning.main' }} /></ListItemIcon>
                    <ListItemText 
                      primary="Passo 2: Cálculo do Coeficiente de Correlação"
                      secondary="Valores entre -1 e +1. Próximo de +1 = correlação positiva forte. Próximo de -1 = correlação negativa forte. Próximo de 0 = sem correlação."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Visibility sx={{ color: 'info.main' }} /></ListItemIcon>
                    <ListItemText 
                      primary="Passo 3: Interpretação Técnica"
                      secondary="r > 0.7: Correlação forte | r = 0.3-0.7: Correlação moderada | r < 0.3: Correlação fraca"
                    />
                  </ListItem>
                </List>
                <Alert severity="warning" sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    ⚠️ <strong>Importante:</strong> Correlação NÃO implica causalidade. Uma correlação forte apenas indica que as variáveis mudam juntas, não que uma causa a outra.
                  </Typography>
                </Alert>
              </Box>
            )}

            {selectedObjective === 'comparison' && (
              <Box>
                <Typography variant="h6" gutterBottom>⚖️ Análise Comparativa - Guia Técnico</Typography>
                <List>
                  <ListItem>
                    <ListItemIcon><Analytics sx={{ color: 'primary.main' }} /></ListItemIcon>
                    <ListItemText 
                      primary="Passo 1: Normalização dos Dados"
                      secondary="Os dados são padronizados para permitir comparação justa entre diferentes escalas e unidades."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><TrendingUp sx={{ color: 'warning.main' }} /></ListItemIcon>
                    <ListItemText 
                      primary="Passo 2: Teste de Significância Estatística"
                      secondary="Aplicação do Teste T para determinar se as diferenças observadas são estatisticamente significativas (p < 0.05)."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Visibility sx={{ color: 'info.main' }} /></ListItemIcon>
                    <ListItemText 
                      primary="Passo 3: Interpretação dos Resultados"
                      secondary="P-valor < 0.05: Diferença significativa | P-valor > 0.05: Diferença não significativa (pode ser devido ao acaso)"
                    />
                  </ListItem>
                </List>
              </Box>
            )}

            {selectedObjective === 'trend' && (
              <Box>
                <Typography variant="h6" gutterBottom>📈 Análise de Tendências - Metodologia</Typography>
                <List>
                  <ListItem>
                    <ListItemIcon><Analytics sx={{ color: 'primary.main' }} /></ListItemIcon>
                    <ListItemText 
                      primary="Passo 1: Decomposição da Série Temporal"
                      secondary="Separação entre tendência (direção geral), sazonalidade (padrões repetitivos) e ruído (variações aleatórias)."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><TrendingUp sx={{ color: 'warning.main' }} /></ListItemIcon>
                    <ListItemText 
                      primary="Passo 2: Regressão Linear e R²"
                      secondary="R² próximo de 1 = tendência bem definida | R² próximo de 0 = sem tendência clara"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Visibility sx={{ color: 'info.main' }} /></ListItemIcon>
                    <ListItemText 
                      primary="Passo 3: Projeção e Intervalo de Confiança"
                      secondary="Estimativas futuras com margem de erro. Projeções de longo prazo têm maior incerteza."
                    />
                  </ListItem>
                </List>
              </Box>
            )}

            <Box sx={{ mt: 3, p: 2, backgroundColor: 'grey.100', borderRadius: 2 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                📚 Glossário de Termos Técnicos
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2"><strong>P-valor:</strong> Probabilidade de observar o resultado por acaso</Typography>
                  <Typography variant="body2"><strong>R²:</strong> Percentual da variação explicada pelo modelo</Typography>
                  <Typography variant="body2"><strong>Correlação:</strong> Medida de relação linear entre variáveis</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2"><strong>Significância:</strong> Resultado provavelmente não devido ao acaso</Typography>
                  <Typography variant="body2"><strong>Outlier:</strong> Valor muito diferente dos demais</Typography>
                  <Typography variant="body2"><strong>Normalização:</strong> Padronização de escalas diferentes</Typography>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default DadosAbertos;
