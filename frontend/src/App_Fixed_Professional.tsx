import React, { useState, useEffect } from 'react';
import {
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Container,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Button,
  Stack,
  Fade,
} from '@mui/material';
import {
  Home,
  CloudUpload,
  Analytics,
  Assessment,
  MenuBook,
  Science,
  AutoAwesome,
  Public,
  Menu as MenuIcon,
  Notifications,
  MonitorHeart,
  Settings,
  Backup,
  Storage,
  TrendingUp,
  ErrorOutline,
} from '@mui/icons-material';

// Imports dos componentes
import PaginaInicial from './components/PaginaInicial';
import UploadArea from './components/UploadArea';
import AnaliseAvancada from './components/AnaliseAvancada';
import DashboardView from './components/DashboardView';
import RelatoriosCientificos from './components/RelatoriosCientificos';
import RelatoriosCompletosStaCatarina from './components/RelatoriosCompletosStaCatarina';
import MetodologiaCientificaAvancada from './components/MetodologiaCientificaAvancada';
import CentroAprendizadoCompleto from './components/CentroAprendizadoCompleto';
import DatasetsESitesReais from './components/DatasetsESitesReais';
import SistemaNotificacoes from './components/SistemaNotificacoes';
import MonitoramentoTempoReal from './components/MonitoramentoTempoReal';
import ConfiguracoesAvancadas from './components/ConfiguracoesAvancadas';
import DadosAbertosCompleto from './components/DadosAbertosCompleto';
import BackupAvancado from './components/BackupAvancado';
import AnalisePreditivaIA from './components/AnalisePreditivaIA';
import BigDataAnalyticsCompleto from './components/BigDataAnalyticsCompleto';
import SantaCatarinaDataHub from './components/SantaCatarinaDataHub';
import ScientificAnalysisWorkbench from './components/ScientificAnalysisWorkbench';
import DatabricksBigDataStudio from './components/DatabricksBigDataStudio';
import PaginaInicialProfissional from './components/PaginaInicialProfissional';

// Tema profissional e científico
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1565c0', // Azul científico profissional
      light: '#5e92f3',
      dark: '#003c8f',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#c62828', // Vermelho científico
      light: '#ff5f52',
      dark: '#8e0000',
      contrastText: '#ffffff',
    },
    success: {
      main: '#2e7d32',
      light: '#60ad5e',
      dark: '#005005',
    },
    warning: {
      main: '#f57c00',
      light: '#ffad42',
      dark: '#bb4d00',
    },
    info: {
      main: '#0277bd',
      light: '#58a5f0',
      dark: '#004c8c',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a202c',
      secondary: '#4a5568',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.1rem',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.05)',
    '0px 4px 8px rgba(0, 0, 0, 0.08)',
    '0px 8px 16px rgba(0, 0, 0, 0.1)',
    '0px 12px 24px rgba(0, 0, 0, 0.12)',
    '0px 16px 32px rgba(0, 0, 0, 0.15)',
    '0px 20px 40px rgba(0, 0, 0, 0.18)',
    '0px 24px 48px rgba(0, 0, 0, 0.2)',
    '0px 32px 64px rgba(0, 0, 0, 0.25)',
    '0px 40px 80px rgba(0, 0, 0, 0.3)',
    '0px 40px 80px rgba(0, 0, 0, 0.3)',
    '0px 40px 80px rgba(0, 0, 0, 0.3)',
    '0px 40px 80px rgba(0, 0, 0, 0.3)',
    '0px 40px 80px rgba(0, 0, 0, 0.3)',
    '0px 40px 80px rgba(0, 0, 0, 0.3)',
    '0px 40px 80px rgba(0, 0, 0, 0.3)',
    '0px 40px 80px rgba(0, 0, 0, 0.3)',
    '0px 40px 80px rgba(0, 0, 0, 0.3)',
    '0px 40px 80px rgba(0, 0, 0, 0.3)',
    '0px 40px 80px rgba(0, 0, 0, 0.3)',
    '0px 40px 80px rgba(0, 0, 0, 0.3)',
    '0px 40px 80px rgba(0, 0, 0, 0.3)',
    '0px 40px 80px rgba(0, 0, 0, 0.3)',
    '0px 40px 80px rgba(0, 0, 0, 0.3)',
    '0px 40px 80px rgba(0, 0, 0, 0.3)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          fontWeight: 600,
        },
        contained: {
          boxShadow: '0px 4px 12px rgba(21, 101, 192, 0.3)',
          '&:hover': {
            boxShadow: '0px 6px 16px rgba(21, 101, 192, 0.4)',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
          '&:hover': {
            boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-2px)',
          },
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#1a202c',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

// Componente de Loading
const LoadingComponent: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    }}
  >
    <CircularProgress size={60} sx={{ color: 'white', mb: 3 }} />
    <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
      Carregando DataScience Pro
    </Typography>
    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
      Plataforma Científica de Análise de Dados
    </Typography>
  </Box>
);

// Componente de Erro
const ErrorComponent: React.FC<{ error: string; onRetry: () => void }> = ({ error, onRetry }) => (
  <Container maxWidth="md" sx={{ py: 8 }}>
    <Card sx={{ textAlign: 'center', p: 4 }}>
      <CardContent>
        <ErrorOutline sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
        <Typography variant="h5" gutterBottom color="error">
          Erro na Aplicação
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {error}
        </Typography>
        <Button variant="contained" onClick={onRetry} startIcon={<Home />}>
          Tentar Novamente
        </Button>
      </CardContent>
    </Card>
  </Container>
);

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [uploadedData, setUploadedData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Simulação de carregamento inicial
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Simular carregamento de recursos
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar a aplicação');
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  const handleNavigateToTab = (tabIndex: number) => {
    try {
      setCurrentTab(tabIndex);
      setShowWelcome(false);
      setMobileOpen(false);
    } catch (err) {
      setError('Erro na navegação');
    }
  };

  const handleBackToHome = () => {
    try {
      setShowWelcome(true);
      setCurrentTab(0);
      setMobileOpen(false);
    } catch (err) {
      setError('Erro ao retornar à página inicial');
    }
  };

  const handleDataUpload = (data: any) => {
    try {
      setUploadedData(data);
      setShowWelcome(false);
      setCurrentTab(1);
    } catch (err) {
      setError('Erro no upload de dados');
    }
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    // Recarregar página
    window.location.reload();
  };

  const menuItems = [
    { icon: <CloudUpload />, text: 'Upload de Dados', index: 0, description: 'Carregue seus datasets' },
    { icon: <Analytics />, text: 'Análise Avançada', index: 1, description: 'Análise estatística completa' },
    { icon: <Assessment />, text: 'Dashboard', index: 2, description: 'Visualizações interativas' },
    { icon: <MenuBook />, text: 'Relatórios Científicos', index: 3, description: 'Geração de relatórios' },
    { icon: <MenuBook />, text: 'Relatórios PDF Santa Catarina', index: 4, description: 'Dados oficiais SC' },
    { icon: <Science />, text: 'Metodologia Científica', index: 5, description: 'Métodos de pesquisa' },
    { icon: <AutoAwesome />, text: 'Centro de Aprendizado', index: 6, description: 'Tutoriais e cursos' },
    { icon: <Public />, text: 'Datasets e Sites Reais', index: 7, description: 'Fontes de dados' },
    { icon: <Storage />, text: 'Dados Abertos Completo', index: 8, description: 'Portal de dados públicos' },
    { icon: <Storage />, text: 'Hub SC - Dados Oficiais', index: 9, description: 'APIs governamentais SC' },
    { icon: <Science />, text: 'Bancada Científica', index: 10, description: 'Análise experimental' },
    { icon: <TrendingUp />, text: 'IA Preditiva', index: 11, description: 'Machine Learning' },
    { icon: <Storage />, text: 'BigData Analytics', index: 12, description: 'Processamento massivo' },
    { icon: <Notifications />, text: 'Sistema de Notificações', index: 13, description: 'Alertas e avisos' },
    { icon: <MonitorHeart />, text: 'Monitoramento', index: 14, description: 'Status em tempo real' },
    { icon: <Backup />, text: 'Backup Avançado', index: 15, description: 'Proteção de dados' },
    { icon: <Settings />, text: 'Configurações', index: 16, description: 'Ajustes do sistema' },
    { icon: <Storage />, text: 'Databricks BigData Studio', index: 17, description: 'Apache Spark Studio' },
  ];

  // Renderização com tratamento de erro
  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ErrorComponent error={error} onRetry={handleRetry} />
      </ThemeProvider>
    );
  }

  if (showWelcome) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Fade in timeout={800}>
          <Box>
            <PaginaInicialProfissional onNavigateToTab={handleNavigateToTab} />
          </Box>
        </Fade>
      </ThemeProvider>
    );
  }

  const drawerContent = (
    <Box sx={{ overflow: 'auto', p: 2, height: '100%' }}>
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
          DataScience Pro
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Professor Vagner Cordeiro
        </Typography>
      </Box>
      
      <List sx={{ px: 0 }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.index}
            button
            onClick={() => handleNavigateToTab(item.index)}
            selected={currentTab === item.index}
            sx={{
              mb: 1,
              borderRadius: 2,
              '&.Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
                '& .MuiListItemIcon-root': {
                  color: 'white',
                },
              },
              '&:hover': {
                backgroundColor: 'primary.light',
                color: 'white',
                '& .MuiListItemIcon-root': {
                  color: 'white',
                },
              },
              transition: 'all 0.3s',
            }}
          >
            <ListItemIcon>
              {React.cloneElement(item.icon, {
                color: currentTab === item.index ? 'inherit' : 'primary'
              })}
            </ListItemIcon>
            <ListItemText 
              primary={item.text}
              secondary={currentTab !== item.index ? item.description : undefined}
              primaryTypographyProps={{
                fontSize: '0.9rem',
                fontWeight: currentTab === item.index ? 600 : 500,
              }}
              secondaryTypographyProps={{
                fontSize: '0.75rem',
                color: 'inherit',
                sx: { opacity: 0.7 },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const renderTabContent = () => {
    try {
      const components = [
        <UploadArea key="upload" onDataUpload={handleDataUpload} />,
        <AnaliseAvancada key="analise" />,
        <DashboardView key="dashboard" data={uploadedData} />,
        <RelatoriosCientificos key="relatorios" />,
        <RelatoriosCompletosStaCatarina key="relatorios-sc" />,
        <MetodologiaCientificaAvancada key="metodologia" />,
        <CentroAprendizadoCompleto key="aprendizado" />,
        <DatasetsESitesReais key="datasets" />,
        <DadosAbertosCompleto key="dados-abertos" />,
        <SantaCatarinaDataHub key="sc-hub" />,
        <ScientificAnalysisWorkbench key="bancada" />,
        <AnalisePreditivaIA key="ia-preditiva" />,
        <BigDataAnalyticsCompleto key="bigdata" />,
        <SistemaNotificacoes key="notificacoes" />,
        <MonitoramentoTempoReal key="monitoramento" />,
        <BackupAvancado key="backup" />,
        <ConfiguracoesAvancadas key="configuracoes" />,
        <DatabricksBigDataStudio key="databricks" />,
      ];

      return components[currentTab] || components[0];
    } catch (err) {
      return (
        <Alert severity="error" sx={{ m: 2 }}>
          Erro ao carregar componente. Tente selecionar outro módulo.
        </Alert>
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - 280px)` },
            ml: { sm: `280px` },
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={() => setMobileOpen(!mobileOpen)}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              
              <IconButton
                color="inherit"
                onClick={handleBackToHome}
                sx={{ mr: 2 }}
              >
                <Home />
              </IconButton>
              
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  DataScience Pro
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', lineHeight: 1 }}>
                  {menuItems[currentTab]?.text || 'Portal Científico'}
                </Typography>
              </Box>
            </Box>

            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2" sx={{ color: 'text.secondary', display: { xs: 'none', sm: 'block' } }}>
                Professor Vagner Cordeiro
              </Typography>
              <IconButton color="inherit">
                <Notifications />
              </IconButton>
            </Stack>
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{ width: { sm: 280 }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
            }}
          >
            {drawerContent}
          </Drawer>
          
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: 280,
                backgroundColor: '#fafafa',
                borderRight: '1px solid #e0e0e0',
              },
            }}
            open
          >
            {drawerContent}
          </Drawer>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { sm: `calc(100% - 280px)` },
            mt: '80px',
            minHeight: 'calc(100vh - 80px)',
            backgroundColor: 'background.default',
          }}
        >
          <Fade in timeout={600}>
            <Box sx={{ height: '100%' }}>
              {renderTabContent()}
            </Box>
          </Fade>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
