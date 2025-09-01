import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Alert,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
  Badge,
} from '@mui/material';
import {
  Assessment,
  FileDownload,
  Visibility,
  Add,
  FilterList,
  Search,
  GetApp,
  MenuBook,
  Science,
  ArrowBack,
  PictureAsPdf,
  Description,
  Code,
  DataArray,
  Analytics,
  ExpandMore,
  CloudDownload,
  SchoolOutlined,
  AutoAwesome,
  CheckCircle,
  TrendingUp,
  Timeline,
} from '@mui/icons-material';

interface RelatorioItem {
  id: string;
  titulo: string;
  tipo: string;
  categoria: string;
  dataGeracao: string;
  status: 'completo' | 'processando' | 'erro';
  tamanho: string;
  descricao: string;
  tags: string[];
  autor: string;
  downloads: number;
  metodologia?: string;
  dataset?: string;
  resultados?: string[];
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
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface RelatoriosCientificosProps {
  onBackToHome?: () => void;
}

const RelatoriosCientificos: React.FC<RelatoriosCientificosProps> = ({ onBackToHome }) => {
  const [tabValue, setTabValue] = useState(0);
  const [relatorios, setRelatorios] = useState<RelatorioItem[]>([]);
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [busca, setBusca] = useState('');
  const [dialogAberto, setDialogAberto] = useState(false);
  const [relatorioSelecionado, setRelatorioSelecionado] = useState<RelatorioItem | null>(null);
  const [processandoDownload, setProcessandoDownload] = useState(false);

  // Dados mais robustos para relatórios
  useEffect(() => {
    const relatoriosExemplo: RelatorioItem[] = [
      {
        id: '1',
        titulo: 'Análise Estatística Descritiva - Vendas Q4 2024',
        tipo: 'Estatístico',
        categoria: 'Business Intelligence',
        dataGeracao: '2024-12-15',
        status: 'completo',
        tamanho: '2.4 MB',
        descricao: 'Análise completa das vendas do último trimestre com insights estatísticos avançados, incluindo análise de tendências, sazonalidade e correlações.',
        tags: ['vendas', 'estatística', 'Q4', 'business'],
        autor: 'Prof. Dr. Vagner Cordeiro',
        downloads: 127,
        metodologia: 'Análise Estatística Descritiva com testes de normalidade e correlação',
        dataset: 'Dados de vendas Q4 2024 (15.000 registros)',
        resultados: [
          'Crescimento de 15% nas vendas em relação ao Q3',
          'Correlação forte (r=0.85) entre investimento em marketing e vendas',
          'Sazonalidade identificada nos meses de novembro e dezembro'
        ]
      },
      {
        id: '2',
        titulo: 'Machine Learning - Predição de Churn de Clientes',
        tipo: 'Machine Learning',
        categoria: 'Customer Analytics',
        dataGeracao: '2024-12-10',
        status: 'completo',
        tamanho: '3.1 MB',
        descricao: 'Modelo preditivo Random Forest para identificação de clientes com risco de cancelamento, incluindo feature importance e análise SHAP.',
        tags: ['churn', 'ml', 'predição', 'random-forest'],
        autor: 'Prof. Dr. Vagner Cordeiro',
        downloads: 89,
        metodologia: 'Random Forest com validação cruzada 10-fold',
        dataset: 'Base de clientes 2024 (50.000 registros)',
        resultados: [
          'Acurácia de 92% na predição de churn',
          'Precision: 89%, Recall: 85%',
          'Principais features: tempo de contrato, valor mensal, suporte'
        ]
      },
      {
        id: '3',
        titulo: 'Análise de Séries Temporais - Previsão de Demanda',
        tipo: 'Forecasting',
        categoria: 'Supply Chain',
        dataGeracao: '2024-12-05',
        status: 'completo',
        tamanho: '1.8 MB',
        descricao: 'Modelo ARIMA e Prophet para previsão de demanda de produtos com componentes sazonais e de tendência.',
        tags: ['séries-temporais', 'arima', 'prophet', 'demanda'],
        autor: 'Prof. Dr. Vagner Cordeiro',
        downloads: 156,
        metodologia: 'ARIMA(2,1,2) e Facebook Prophet',
        dataset: 'Histórico de vendas 2020-2024 (1.460 dias)',
        resultados: [
          'MAPE de 8.5% para previsões de 30 dias',
          'Sazonalidade semanal e anual identificada',
          'Tendência de crescimento de 12% ao ano'
        ]
      },
      {
        id: '4',
        titulo: 'Análise Multivariada - Segmentação de Mercado',
        tipo: 'Clustering',
        categoria: 'Marketing Analytics',
        dataGeracao: '2024-11-28',
        status: 'completo',
        tamanho: '2.7 MB',
        descricao: 'Análise de clusters K-means e análise de componentes principais para segmentação estratégica de mercado.',
        tags: ['clustering', 'pca', 'segmentação', 'k-means'],
        autor: 'Prof. Dr. Vagner Cordeiro',
        downloads: 203,
        metodologia: 'K-means com PCA para redução dimensional',
        dataset: 'Pesquisa de mercado 2024 (8.500 respondentes)',
        resultados: [
          '4 segmentos distintos identificados',
          'Silhouette Score: 0.73',
          'Variância explicada pelo PCA: 82%'
        ]
      },
      {
        id: '5',
        titulo: 'Deep Learning - Classificação de Imagens',
        tipo: 'Deep Learning',
        categoria: 'Computer Vision',
        dataGeracao: '2024-11-20',
        status: 'processando',
        tamanho: '5.2 MB',
        descricao: 'CNN com arquitetura ResNet50 para classificação automática de produtos em e-commerce.',
        tags: ['cnn', 'resnet', 'classificação', 'imagens'],
        autor: 'Prof. Dr. Vagner Cordeiro',
        downloads: 67,
        metodologia: 'Transfer Learning com ResNet50',
        dataset: 'Dataset de produtos (25.000 imagens)',
        resultados: [
          'Acurácia: 94.2% (em progresso)',
          'Top-5 accuracy: 98.1%',
          'Tempo de inferência: 15ms por imagem'
        ]
      }
    ];

    setRelatorios(relatoriosExemplo);
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleDownload = async (relatorio: RelatorioItem, formato: 'pdf' | 'markdown' | 'latex' | 'jupyter') => {
    setProcessandoDownload(true);
    
    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 2000));

    let conteudo = '';
    let extensao = '';
    let mimeType = '';

    switch (formato) {
      case 'pdf':
        conteudo = generatePDFContent(relatorio);
        extensao = '.pdf';
        mimeType = 'application/pdf';
        break;
      case 'markdown':
        conteudo = generateMarkdownContent(relatorio);
        extensao = '.md';
        mimeType = 'text/markdown';
        break;
      case 'latex':
        conteudo = generateLatexContent(relatorio);
        extensao = '.tex';
        mimeType = 'application/x-latex';
        break;
      case 'jupyter':
        conteudo = generateJupyterContent(relatorio);
        extensao = '.ipynb';
        mimeType = 'application/json';
        break;
    }

    // Criar e baixar arquivo
    const blob = new Blob([conteudo], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${relatorio.titulo.replace(/[^a-zA-Z0-9]/g, '_')}${extensao}`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Atualizar contador
    setRelatorios(prev => 
      prev.map(r => 
        r.id === relatorio.id 
          ? { ...r, downloads: r.downloads + 1 }
          : r
      )
    );

    setProcessandoDownload(false);
  };

  const generateMarkdownContent = (relatorio: RelatorioItem) => {
    return `# ${relatorio.titulo}

## 📊 Informações Gerais
- **Autor:** ${relatorio.autor}
- **Data:** ${new Date(relatorio.dataGeracao).toLocaleDateString('pt-BR')}
- **Categoria:** ${relatorio.categoria}
- **Metodologia:** ${relatorio.metodologia}
- **Dataset:** ${relatorio.dataset}

## 📝 Descrição
${relatorio.descricao}

## 🎯 Principais Resultados
${relatorio.resultados?.map(resultado => `- ${resultado}`).join('\n')}

## 🏷️ Tags
${relatorio.tags.map(tag => `\`${tag}\``).join(' ')}

## 📈 Análise Detalhada

### Metodologia Aplicada
Este relatório utilizou ${relatorio.metodologia} para análise dos dados disponíveis.

### Dataset Utilizado
${relatorio.dataset}

### Resultados Obtidos
Os resultados demonstram insights significativos para tomada de decisão.

### Conclusões
Com base na análise realizada, recomenda-se implementar as ações identificadas.

---
*Relatório gerado pela DataScience Pro em ${new Date().toLocaleDateString('pt-BR')}*
`;
  };

  const generateLatexContent = (relatorio: RelatorioItem) => {
    return `\\documentclass[12pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[portuguese]{babel}
\\usepackage{graphicx}
\\usepackage{amsmath}
\\usepackage{amsfonts}
\\usepackage{amssymb}
\\usepackage{geometry}
\\geometry{margin=2.5cm}

\\title{${relatorio.titulo}}
\\author{${relatorio.autor}}
\\date{${new Date(relatorio.dataGeracao).toLocaleDateString('pt-BR')}}

\\begin{document}

\\maketitle

\\begin{abstract}
${relatorio.descricao}
\\end{abstract}

\\section{Introdução}
Este relatório apresenta uma análise detalhada utilizando ${relatorio.metodologia}.

\\section{Metodologia}
A metodologia aplicada foi ${relatorio.metodologia}, utilizando o dataset: ${relatorio.dataset}.

\\section{Resultados}
\\begin{itemize}
${relatorio.resultados?.map(resultado => `\\item ${resultado}`).join('\n')}
\\end{itemize}

\\section{Discussão}
Os resultados obtidos demonstram a eficácia da metodologia aplicada.

\\section{Conclusões}
Com base na análise realizada, as principais conclusões são...

\\section{Referências}
DataScience Pro. Plataforma de Análise de Dados. ${new Date().getFullYear()}.

\\end{document}`;
  };

  const generateJupyterContent = (relatorio: RelatorioItem) => {
    const notebook = {
      cells: [
        {
          cell_type: "markdown",
          metadata: {},
          source: [
            `# ${relatorio.titulo}\n`,
            `\n`,
            `**Autor:** ${relatorio.autor}\n`,
            `**Data:** ${new Date(relatorio.dataGeracao).toLocaleDateString('pt-BR')}\n`,
            `**Metodologia:** ${relatorio.metodologia}\n`,
            `\n`,
            `## Descrição\n`,
            `${relatorio.descricao}`
          ]
        },
        {
          cell_type: "code",
          execution_count: null,
          metadata: {},
          outputs: [],
          source: [
            "# Importar bibliotecas necessárias\n",
            "import pandas as pd\n",
            "import numpy as np\n",
            "import matplotlib.pyplot as plt\n",
            "import seaborn as sns\n",
            "from sklearn.model_selection import train_test_split\n",
            "from sklearn.metrics import accuracy_score, classification_report\n",
            "\n",
            "# Configurar visualizações\n",
            "plt.style.use('seaborn')\n",
            "sns.set_palette('husl')"
          ]
        },
        {
          cell_type: "markdown",
          metadata: {},
          source: [
            "## Carregamento e Exploração dos Dados"
          ]
        },
        {
          cell_type: "code",
          execution_count: null,
          metadata: {},
          outputs: [],
          source: [
            "# Carregar dados\n",
            "# df = pd.read_csv('dados.csv')\n",
            "\n",
            "# Exploração inicial\n",
            "# print(df.head())\n",
            "# print(df.info())\n",
            "# print(df.describe())"
          ]
        },
        {
          cell_type: "markdown",
          metadata: {},
          source: [
            "## Resultados Principais\n",
            ...relatorio.resultados?.map(r => `- ${r}`).join('\n')
          ]
        }
      ],
      metadata: {
        kernelspec: {
          display_name: "Python 3",
          language: "python",
          name: "python3"
        },
        language_info: {
          name: "python",
          version: "3.8.0"
        }
      },
      nbformat: 4,
      nbformat_minor: 4
    };

    return JSON.stringify(notebook, null, 2);
  };

  const generatePDFContent = (relatorio: RelatorioItem) => {
    return `PDF Content for: ${relatorio.titulo}
    
    Esta é uma representação textual do PDF.
    Para um PDF real, seria necessário usar uma biblioteca como jsPDF.
    
    Conteúdo:
    ${relatorio.descricao}
    
    Resultados:
    ${relatorio.resultados?.join('\n')}`;
  };

  const relatoriosFiltrados = relatorios.filter(relatorio => {
    const matchTipo = filtroTipo === 'todos' || relatorio.tipo === filtroTipo;
    const matchCategoria = filtroCategoria === 'todos' || relatorio.categoria === filtroCategoria;
    const matchBusca = relatorio.titulo.toLowerCase().includes(busca.toLowerCase()) ||
                      relatorio.descricao.toLowerCase().includes(busca.toLowerCase()) ||
                      relatorio.tags.some(tag => tag.toLowerCase().includes(busca.toLowerCase()));
    
    return matchTipo && matchCategoria && matchBusca;
  });

  const visualizarRelatorio = (relatorio: RelatorioItem) => {
    setRelatorioSelecionado(relatorio);
    setDialogAberto(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header com navegação */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        {onBackToHome && (
          <IconButton 
            onClick={onBackToHome} 
            sx={{ mr: 2 }}
            size="large"
          >
            <ArrowBack />
          </IconButton>
        )}
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 2 }}>
            <Assessment color="primary" sx={{ fontSize: 40 }} />
            Relatórios Científicos
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Biblioteca completa de relatórios de análise com downloads em múltiplos formatos
          </Typography>
        </Box>
      </Box>

      {/* Tabs de navegação */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
          <Tab icon={<Assessment />} label="Relatórios Disponíveis" />
          <Tab icon={<Add />} label="Gerar Novo Relatório" />
          <Tab icon={<SchoolOutlined />} label="Templates & Guias" />
          <Tab icon={<Analytics />} label="Estatísticas" />
        </Tabs>
      </Box>

      {/* Tab 1: Relatórios Disponíveis */}
      <TabPanel value={tabValue} index={0}>
        {/* Filtros e busca */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Buscar relatórios"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              InputProps={{
                startAdornment: <Search />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Tipo</InputLabel>
              <Select
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
              >
                <MenuItem value="todos">Todos os tipos</MenuItem>
                <MenuItem value="Estatístico">Estatístico</MenuItem>
                <MenuItem value="Machine Learning">Machine Learning</MenuItem>
                <MenuItem value="Forecasting">Forecasting</MenuItem>
                <MenuItem value="Clustering">Clustering</MenuItem>
                <MenuItem value="Deep Learning">Deep Learning</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Categoria</InputLabel>
              <Select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
              >
                <MenuItem value="todos">Todas as categorias</MenuItem>
                <MenuItem value="Business Intelligence">Business Intelligence</MenuItem>
                <MenuItem value="Customer Analytics">Customer Analytics</MenuItem>
                <MenuItem value="Supply Chain">Supply Chain</MenuItem>
                <MenuItem value="Marketing Analytics">Marketing Analytics</MenuItem>
                <MenuItem value="Computer Vision">Computer Vision</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FilterList />}
              onClick={() => {
                setFiltroTipo('todos');
                setFiltroCategoria('todos');
                setBusca('');
              }}
            >
              Limpar Filtros
            </Button>
          </Grid>
        </Grid>

        {/* Lista de relatórios */}
        <Grid container spacing={3}>
          {relatoriosFiltrados.map((relatorio) => (
            <Grid item xs={12} md={6} lg={4} key={relatorio.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                      {relatorio.titulo}
                    </Typography>
                    <Chip 
                      label={relatorio.status} 
                      color={
                        relatorio.status === 'completo' ? 'success' :
                        relatorio.status === 'processando' ? 'warning' : 'error'
                      }
                      size="small"
                    />
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {relatorio.descricao}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      <strong>Autor:</strong> {relatorio.autor}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      <strong>Data:</strong> {new Date(relatorio.dataGeracao).toLocaleDateString('pt-BR')}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      <strong>Tipo:</strong> {relatorio.tipo} | <strong>Tamanho:</strong> {relatorio.tamanho}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    {relatorio.tags.map((tag) => (
                      <Chip 
                        key={tag} 
                        label={tag} 
                        size="small" 
                        variant="outlined" 
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CloudDownload sx={{ mr: 1, fontSize: 16 }} />
                    <Typography variant="caption">
                      {relatorio.downloads} downloads
                    </Typography>
                  </Box>
                </CardContent>

                <Box sx={{ p: 2, pt: 0 }}>
                  <Stack spacing={1}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<Visibility />}
                      onClick={() => visualizarRelatorio(relatorio)}
                      disabled={relatorio.status !== 'completo'}
                    >
                      Visualizar Detalhes
                    </Button>
                    
                    <Grid container spacing={1}>
                      <Grid item xs={3}>
                        <Tooltip title="Download PDF">
                          <Button
                            fullWidth
                            size="small"
                            variant="outlined"
                            onClick={() => handleDownload(relatorio, 'pdf')}
                            disabled={relatorio.status !== 'completo' || processandoDownload}
                          >
                            <PictureAsPdf fontSize="small" />
                          </Button>
                        </Tooltip>
                      </Grid>
                      <Grid item xs={3}>
                        <Tooltip title="Download Markdown">
                          <Button
                            fullWidth
                            size="small"
                            variant="outlined"
                            onClick={() => handleDownload(relatorio, 'markdown')}
                            disabled={relatorio.status !== 'completo' || processandoDownload}
                          >
                            <Description fontSize="small" />
                          </Button>
                        </Tooltip>
                      </Grid>
                      <Grid item xs={3}>
                        <Tooltip title="Download LaTeX">
                          <Button
                            fullWidth
                            size="small"
                            variant="outlined"
                            onClick={() => handleDownload(relatorio, 'latex')}
                            disabled={relatorio.status !== 'completo' || processandoDownload}
                          >
                            <MenuBook fontSize="small" />
                          </Button>
                        </Tooltip>
                      </Grid>
                      <Grid item xs={3}>
                        <Tooltip title="Download Jupyter">
                          <Button
                            fullWidth
                            size="small"
                            variant="outlined"
                            onClick={() => handleDownload(relatorio, 'jupyter')}
                            disabled={relatorio.status !== 'completo' || processandoDownload}
                          >
                            <Code fontSize="small" />
                          </Button>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Stack>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {relatoriosFiltrados.length === 0 && (
          <Alert severity="info" sx={{ mt: 3 }}>
            Nenhum relatório encontrado com os filtros aplicados.
          </Alert>
        )}
      </TabPanel>

      {/* Tab 2: Gerar Novo Relatório */}
      <TabPanel value={tabValue} index={1}>
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            🚀 Gerador de Relatórios Automático
          </Typography>
          Conecte seus dados e gere relatórios científicos profissionais automaticamente.
        </Alert>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  📊 Upload de Dados
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Carregue seus dados em CSV, Excel ou JSON
                </Typography>
                <Button variant="contained" fullWidth startIcon={<CloudDownload />}>
                  Selecionar Arquivo
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🎯 Tipo de Análise
                </Typography>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Selecione o tipo</InputLabel>
                  <Select defaultValue="">
                    <MenuItem value="descritiva">Análise Descritiva</MenuItem>
                    <MenuItem value="inferencial">Análise Inferencial</MenuItem>
                    <MenuItem value="preditiva">Modelagem Preditiva</MenuItem>
                    <MenuItem value="clustering">Análise de Clusters</MenuItem>
                  </Select>
                </FormControl>
                <Button variant="outlined" fullWidth startIcon={<AutoAwesome />}>
                  Gerar Automaticamente
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Tab 3: Templates & Guias */}
      <TabPanel value={tabValue} index={2}>
        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            📚 Biblioteca de Templates
          </Typography>
          Baixe templates profissionais para seus relatórios científicos.
        </Alert>

        <Grid container spacing={3}>
          {[
            { titulo: 'Template LaTeX Acadêmico', descricao: 'Modelo para papers científicos', formato: 'LaTeX' },
            { titulo: 'Template Jupyter Notebook', descricao: 'Estrutura para análise reproduzível', formato: 'Jupyter' },
            { titulo: 'Template Relatório Executivo', descricao: 'Formato para apresentações corporativas', formato: 'Markdown' },
            { titulo: 'Template Análise Estatística', descricao: 'Modelo para testes estatísticos', formato: 'PDF' }
          ].map((template, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {template.titulo}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {template.descricao}
                  </Typography>
                  <Chip label={template.formato} size="small" sx={{ mb: 2 }} />
                  <Button variant="contained" fullWidth startIcon={<GetApp />}>
                    Download Template
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Tab 4: Estatísticas */}
      <TabPanel value={tabValue} index={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <TrendingUp sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h4" color="primary.main">
                  {relatorios.length}
                </Typography>
                <Typography variant="body1">
                  Relatórios Disponíveis
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <CloudDownload sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
                <Typography variant="h4" color="success.main">
                  {relatorios.reduce((sum, r) => sum + r.downloads, 0)}
                </Typography>
                <Typography variant="body1">
                  Total de Downloads
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Timeline sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
                <Typography variant="h4" color="warning.main">
                  {relatorios.filter(r => r.status === 'processando').length}
                </Typography>
                <Typography variant="body1">
                  Em Processamento
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Dialog de visualização */}
      <Dialog 
        open={dialogAberto} 
        onClose={() => setDialogAberto(false)} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Assessment color="primary" />
            {relatorioSelecionado?.titulo}
          </Box>
        </DialogTitle>
        <DialogContent>
          {relatorioSelecionado && (
            <Box>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {relatorioSelecionado.descricao}
              </Typography>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="h6">📊 Metodologia</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{relatorioSelecionado.metodologia}</Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="h6">📈 Principais Resultados</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {relatorioSelecionado.resultados?.map((resultado, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CheckCircle color="success" />
                        </ListItemIcon>
                        <ListItemText primary={resultado} />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>

              <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                  📋 Informações Técnicas:
                </Typography>
                <Typography variant="body2">
                  <strong>Dataset:</strong> {relatorioSelecionado.dataset}
                </Typography>
                <Typography variant="body2">
                  <strong>Downloads:</strong> {relatorioSelecionado.downloads}
                </Typography>
                <Typography variant="body2">
                  <strong>Tamanho:</strong> {relatorioSelecionado.tamanho}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogAberto(false)}>
            Fechar
          </Button>
          {relatorioSelecionado && (
            <Button 
              variant="contained" 
              startIcon={<FileDownload />}
              onClick={() => handleDownload(relatorioSelecionado, 'markdown')}
            >
              Download Completo
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Loading para downloads */}
      {processandoDownload && (
        <Box sx={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          bgcolor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <Card sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Gerando Relatório...
            </Typography>
            <LinearProgress sx={{ width: 200, mb: 2 }} />
            <Typography variant="body2" color="text.secondary">
              Preparando download do arquivo
            </Typography>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default RelatoriosCientificos;
