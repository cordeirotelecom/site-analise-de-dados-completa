import { useState, lazy, Suspense } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  Box,
  Paper,
  Tab,
  Tabs,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Chip,
  Stack,
  Button,
  CircularProgress,
} from '@mui/material';
import {
  UploadFile,
  Analytics,
  Dashboard,
  Assessment,
  School,
  Science,
  Storage,
  TrendingUp,
  Psychology,
  AutoFixHigh,
  Api,
  Schedule,
  Public,
  LocationOn,
  Security,
  Backup,
  Notifications,
  MonitorHeart,
  Group,
  CloudUpload,
  SmartToy,
} from '@mui/icons-material';

// Lazy loading dos componentes para otimização
const UploadAreaPro = lazy(() => import('./components/UploadAreaPro'));
const DataAnalysisPro = lazy(() => import('./components/DataAnalysisPro'));
const DashboardViewSimple = lazy(() => import('./components/DashboardViewSimple'));
const RelatoriosCientificos = lazy(() => import('./components/RelatoriosCientificos'));
const CentroAprendizadoCompleto = lazy(() => import('./components/CentroAprendizadoCompleto'));
const DatasetsESitesReais = lazy(() => import('./components/DatasetsESitesReais'));
const PaginaInicial = lazy(() => import('./components/PaginaInicial'));
const AnaliseAvancada = lazy(() => import('./components/AnaliseAvancada'));
const MetodologiaCientificaAvancada = lazy(() => import('./components/MetodologiaCientificaAvancada'));
const AutomacaoVariaveis = lazy(() => import('./components/AutomacaoVariaveis'));
const MonitoramentoAPIs = lazy(() => import('./components/MonitoramentoAPIs'));
const ColetorTempoReal = lazy(() => import('./components/ColetorTempoReal'));
const ExploradorAPIsGoverno = lazy(() => import('./components/ExploradorAPIsGoverno'));
const CatalogoDadosAbertosCompleto = lazy(() => import('./components/CatalogoDadosAbertosCompleto'));
const DadosAbertosStaCatarina = lazy(() => import('./components/DadosAbertosStaCatarina'));
const AutenticacaoCompleta = lazy(() => import('./components/AutenticacaoCompleta'));
const MonitoramentoSimples = lazy(() => import('./components/MonitoramentoSimples'));
const BackupSimples = lazy(() => import('./components/BackupSimples'));
const NotificacoesSimples = lazy(() => import('./components/NotificacoesSimples'));
const BackupAvancado = lazy(() => import('./components/BackupAvancado'));
const AnalisePreditivaIA = lazy(() => import('./components/AnalisePreditivaIA'));
const ColaboracaoTempoReal = lazy(() => import('./components/ColaboracaoTempoReal'));

// Loading component
const LoadingComponent = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
    <CircularProgress size={60} />
  </Box>
);

// Tema profissional focado em análise de dados
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb', // Azul profissional
      light: '#3b82f6',
      dark: '#1d4ed8',
    },
    secondary: {
      main: '#0f172a', // Cinza escuro
      light: '#334155',
      dark: '#020617',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
    h4: {
      fontWeight: 700,
      color: '#0f172a',
    },
    h5: {
      fontWeight: 600,
      color: '#1e293b',
    },
    h6: {
      fontWeight: 600,
      color: '#334155',
    },
    body1: {
      color: '#475569',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#0f172a',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.875rem',
        },
      },
    },
  },
});

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
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function App() {
  const [value, setValue] = useState(0);
  const [uploadedData, setUploadedData] = useState<any>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleDataUpload = (data: any) => {
    setUploadedData(data);
    setValue(1); // Vai automaticamente para a aba de análise
  };

  const handleStartAnalysis = () => {
    setShowWelcome(false);
    setValue(0); // Ir para a aba de upload
  };

  const handleNavigateToTab = (tabIndex: number) => {
    setShowWelcome(false);
    setValue(tabIndex);
  };

  const handleBackToHome = () => {
    setShowWelcome(true);
    setValue(0);
  };

  if (showWelcome) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PaginaInicial 
          onNavigateToTab={handleNavigateToTab}
        />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: '#f8fafc' }}>
        <AppBar position="static" elevation={0}>
          <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
            <Science sx={{ mr: 2, color: 'primary.main' }} />
            <Typography
              variant="h5"
              component="div"
              sx={{ 
                flexGrow: 1, 
                fontWeight: 700,
                background: 'linear-gradient(45deg, #2563eb 30%, #1d4ed8 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                cursor: 'pointer'
              }}
              onClick={() => setShowWelcome(true)}
            >
              DataScience Pro
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mr: 2 }}>
              <Chip 
                label="Análise Avançada" 
                size="small" 
                variant="outlined"
                sx={{ color: 'text.secondary', borderColor: 'divider' }}
              />
              <Chip 
                label="Machine Learning" 
                size="small" 
                variant="outlined"
                sx={{ color: 'text.secondary', borderColor: 'divider' }}
              />
            </Stack>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setShowWelcome(true)}
              sx={{ color: 'white', borderColor: 'white' }}
            >
              🏠 Home
            </Button>
          </Toolbar>
        </AppBar>

  <Container maxWidth="xl" sx={{ py: { xs: 2, md: 6 }, px: { xs: 1, md: 0 } }}>
          {/* Header da Plataforma */}
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom sx={{ 
              fontWeight: 800, 
              color: '#1a237e', 
              letterSpacing: 0.5,
              background: 'linear-gradient(45deg, #1a237e, #2563eb)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Plataforma Profissional de Análise de Dados
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1, fontWeight: 600, color: '#4a5568' }}>
              Solução Empresarial Completa para Data Science e Business Intelligence
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ 
              mb: 4, 
              fontSize: 17, 
              lineHeight: 1.7,
              maxWidth: '900px',
              color: '#6b7280'
            }}>
              Transforme dados corporativos em insights estratégicos com nossa plataforma de análise avançada. 
              Integre múltiplas fontes de dados, execute análises estatísticas complexas, crie visualizações interativas 
              e gere relatórios executivos automatizados. Do cientista de dados ao executivo C-level.
            </Typography>

            {/* Professional Features Grid */}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Card elevation={2} sx={{ textAlign: 'center', py: 3, borderRadius: 2, boxShadow: '0 2px 8px #1a237e11', height: '100%' }}>
                  <Storage sx={{ fontSize: 24, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>15+ Formatos</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem', px: 1 }}>
                    CSV, Excel, JSON, Parquet, SQL, XML, APIs REST, dados de streaming em tempo real
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card elevation={2} sx={{ textAlign: 'center', py: 3, borderRadius: 2, boxShadow: '0 2px 8px #1a237e11', height: '100%' }}>
                  <TrendingUp sx={{ fontSize: 24, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>60+ Análises</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem', px: 1 }}>
                    Estatística avançada, testes de hipóteses, modelos preditivos, análise de séries temporais
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card elevation={2} sx={{ textAlign: 'center', py: 3, borderRadius: 2, boxShadow: '0 2px 8px #1a237e11', height: '100%' }}>
                  <Science sx={{ fontSize: 24, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>AutoML</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem', px: 1 }}>
                    Machine learning automatizado, otimização de hiperparâmetros, deployment de modelos
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card elevation={2} sx={{ textAlign: 'center', py: 3, borderRadius: 2, boxShadow: '0 2px 8px #1a237e11', height: '100%' }}>
                  <School sx={{ fontSize: 24, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>Academia</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem', px: 1 }}>
                    Cursos certificados, tutoriais interativos, mentoria especializada, projetos reais
                  </Typography>
                </Card>
              </Grid>
            </Grid>

            {/* Enterprise Features */}
            <Grid container spacing={2} sx={{ mt: 3, mb: 3 }}>
              <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={1} sx={{ p: 2, textAlign: 'center', borderRadius: 2, background: '#f8fafc' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1a237e', mb: 0.5 }}>
                    🏢 Nível Empresarial
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Segurança SOC 2, LGPD compliance, auditoria completa
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={1} sx={{ p: 2, textAlign: 'center', borderRadius: 2, background: '#f8fafc' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1a237e', mb: 0.5 }}>
                    ⚡ Performance
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Processamento distribuído, cache inteligente, 99.9% uptime
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={1} sx={{ p: 2, textAlign: 'center', borderRadius: 2, background: '#f8fafc' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1a237e', mb: 0.5 }}>
                    🤝 Suporte 24/7
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Equipe especializada, SLA garantido, treinamento dedicado
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>

          {/* Navegação Principal Organizada */}
          <Paper sx={{ 
            mb: 3, 
            borderRadius: 3,
            background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(26, 35, 126, 0.1)'
          }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="h6" sx={{ p: 2, fontWeight: 600, color: 'primary.main' }}>
                🚀 Ferramentas Profissionais de Data Science
              </Typography>
            </Box>
            
            {/* Tabs Principais - Linha 1 */}
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{
                background: 'linear-gradient(90deg, #1a237e 0%, #2563eb 100%)',
                minHeight: 56,
                '& .MuiTabs-flexContainer': {
                  gap: 0,
                },
                '& .MuiTab-root': {
                  color: 'rgba(255,255,255,0.85)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  minHeight: 56,
                  px: 2,
                  '&:hover': {
                    color: '#ffffff',
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  },
                  '&.Mui-selected': {
                    color: '#ffffff',
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    fontWeight: 700
                  }
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#ffd700',
                  height: 3,
                  borderRadius: '3px 3px 0 0'
                }
              }}
            >
              <Tab label="📤 Upload" />
              <Tab label="� Análise" />
              <Tab label="📊 Gráficos" />
              <Tab label="📋 Relatórios" />
              <Tab label="🎓 Aprendizado" />
              <Tab label="⚗️ Metodologia" />
              <Tab label="🗃️ Datasets" />
              <Tab label="🧠 IA Avançada" />
              <Tab label="🤖 Automação" />
              <Tab label="🔌 APIs" />
              <Tab label="⏱️ Tempo Real" />
              <Tab label="🏛️ Gov APIs" />
              <Tab label="🧬 IA Preditiva" />
              <Tab label="🔐 Segurança" />
              <Tab label="🗺️ Dados SC" />
            </Tabs>
          </Paper>

          {/* Conteúdo das Abas */}
          <TabPanel value={value} index={0}>
            <UploadAreaPro onDataUpload={handleDataUpload} />
          </TabPanel>
          
          <TabPanel value={value} index={1}>
            <DataAnalysisPro data={uploadedData} />
          </TabPanel>
          
          <TabPanel value={value} index={2}>
            <DashboardViewSimple data={uploadedData} />
          </TabPanel>
          
          <TabPanel value={value} index={3}>
            <RelatoriosCientificos onBackToHome={handleBackToHome} />
          </TabPanel>
          
          <TabPanel value={value} index={4}>
            <CentroAprendizadoCompleto onBackToHome={handleBackToHome} />
          </TabPanel>
          
          <TabPanel value={value} index={5}>
            <MetodologiaCientificaAvancada onBackToHome={handleBackToHome} />
          </TabPanel>

          <TabPanel value={value} index={6}>
            <DatasetsESitesReais />
          </TabPanel>
          
          <TabPanel value={value} index={7}>
            <AnaliseAvancada />
          </TabPanel>
          
          <TabPanel value={value} index={8}>
            <AutomacaoVariaveis />
          </TabPanel>
          
          <TabPanel value={value} index={9}>
            <MonitoramentoAPIs />
          </TabPanel>
          
          <TabPanel value={value} index={10}>
            <ColetorTempoReal />
          </TabPanel>
          
          <TabPanel value={value} index={11}>
            <ExploradorAPIsGoverno />
          </TabPanel>
          
          <TabPanel value={value} index={12}>
            <CatalogoDadosAbertosCompleto />
          </TabPanel>
          
          <TabPanel value={value} index={13}>
            <DadosAbertosStaCatarina />
          </TabPanel>
          
          <TabPanel value={value} index={14}>
            <AutenticacaoCompleta />
          </TabPanel>
          
          <TabPanel value={value} index={15}>
            <MonitoramentoSimples />
          </TabPanel>
          
          <TabPanel value={value} index={16}>
            <BackupSimples />
          </TabPanel>
          
          <TabPanel value={value} index={17}>
            <NotificacoesSimples />
          </TabPanel>
          
          <TabPanel value={value} index={18}>
            <BackupAvancado />
          </TabPanel>
          
          <TabPanel value={value} index={19}>
            <AnalisePreditivaIA />
          </TabPanel>
          
          <TabPanel value={value} index={20}>
            <ColaboracaoTempoReal />
          </TabPanel>
        </Container>

        {/* Rodapé Profissional */}
        <Box
          component="footer"
          sx={{
            mt: 8,
            py: 3,
            px: 2,
            background: 'linear-gradient(90deg, #1a237e 0%, #2563eb 100%)',
            color: '#fff',
            textAlign: 'center',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            boxShadow: '0 -2px 16px #1a237e22',
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 800, letterSpacing: 1 }}>
              DataScience Pro
            </Typography>
            <Typography variant="body2" color="#e3eafc" sx={{ mb: 1 }}>
              Plataforma profissional de análise de dados e machine learning
            </Typography>
            <Typography variant="caption" color="#b0bec5" sx={{ mb: 1, display: 'block' }}>
              Desenvolvido com técnica de gestão sistêmica para resultados sustentáveis
            </Typography>
            <Typography variant="caption" color="#b0bec5" sx={{ fontSize: '0.7rem', opacity: 0.8 }}>
              Elaborado pelo Prof. Vagner Cordeiro
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
