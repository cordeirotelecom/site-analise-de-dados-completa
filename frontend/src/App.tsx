import React, { useState, Suspense, lazy } from 'react';
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
  CircularProgress,
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
} from '@mui/icons-material';

// Lazy loading dos componentes para melhor performance
const PaginaInicial = lazy(() => import('./components/PaginaInicial'));
const UploadArea = lazy(() => import('./components/UploadArea'));
const AnaliseAvancada = lazy(() => import('./components/AnaliseAvancada'));
const DashboardView = lazy(() => import('./components/DashboardView'));
const RelatoriosCientificos = lazy(() => import('./components/RelatoriosCientificos'));
const MetodologiaCientificaAvancada = lazy(() => import('./components/MetodologiaCientificaAvancada'));
const CentroAprendizadoCompleto = lazy(() => import('./components/CentroAprendizadoCompleto'));
const DatasetsESitesReais = lazy(() => import('./components/DatasetsESitesReais'));
const SistemaNotificacoes = lazy(() => import('./components/SistemaNotificacoes'));
const MonitoramentoTempoReal = lazy(() => import('./components/MonitoramentoTempoReal'));
const ConfiguracoesAvancadas = lazy(() => import('./components/ConfiguracoesAvancadas'));
import ErrorBoundary from './components/ErrorBoundary';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      color: '#1976d2',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentTab, setCurrentTab] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [uploadedData, setUploadedData] = useState<any>(null);
  
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleNavigateToTab = (tabIndex: number) => {
    setShowWelcome(false);
    setCurrentTab(tabIndex);
    setMobileOpen(false);
  };

  const handleBackToHome = () => {
    setShowWelcome(true);
    setCurrentTab(0);
    setMobileOpen(false);
  };

  const handleDataUpload = (data: any) => {
    setUploadedData(data);
    setShowWelcome(false);
    setCurrentTab(1);
  };

  const menuItems = [
    { icon: <CloudUpload />, text: 'Upload de Dados', index: 0 },
    { icon: <Analytics />, text: 'Análise Avançada', index: 1 },
    { icon: <Assessment />, text: 'Dashboard', index: 2 },
    { icon: <MenuBook />, text: 'Relatórios Científicos', index: 3 },
    { icon: <Science />, text: 'Metodologia Científica', index: 4 },
    { icon: <AutoAwesome />, text: 'Centro de Aprendizado', index: 5 },
    { icon: <Public />, text: 'Dados Públicos', index: 6 },
    { icon: <Notifications />, text: 'Notificações', index: 7 },
    { icon: <MonitorHeart />, text: 'Monitoramento', index: 8 },
    { icon: <Settings />, text: 'Configurações', index: 9 },
  ];

  if (showWelcome) {
    return (
      <ErrorBoundary>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Suspense 
            fallback={
              <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress size={60} />
              </Box>
            }
          >
            <PaginaInicial onNavigateToTab={handleNavigateToTab} />
          </Suspense>
        </ThemeProvider>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="menu"
                edge="start"
                onClick={() => setMobileOpen(!mobileOpen)}
                sx={{ mr: 2, display: { md: 'none' } }}
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
              
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
                DataScience Pro
              </Typography>
            </Toolbar>
          </AppBar>

          <Drawer
            variant={isMobile ? 'temporary' : 'permanent'}
            open={isMobile ? mobileOpen : true}
            onClose={() => setMobileOpen(false)}
            sx={{
              width: 280,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: 280,
                boxSizing: 'border-box',
                top: 64,
                height: 'calc(100% - 64px)',
              },
            }}
          >
            <Box sx={{ overflow: 'auto', p: 1 }}>
              <List>
                {menuItems.map((item) => (
                  <ListItem
                    key={item.index}
                    button
                    onClick={() => handleNavigateToTab(item.index)}
                    selected={currentTab === item.index}
                    sx={{ mb: 0.5, borderRadius: 1 }}
                  >
                    <ListItemIcon>
                      {React.cloneElement(item.icon, {
                        color: currentTab === item.index ? 'primary' : 'inherit'
                      })}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - 280px)` },
              ml: { sm: '280px' },
              mt: '64px',
            }}
          >
            <Suspense 
              fallback={
                <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                  <CircularProgress size={60} />
                </Box>
              }
            >
              {currentTab === 0 && <UploadArea onDataUpload={handleDataUpload} />}
              {currentTab === 1 && <AnaliseAvancada />}
              {currentTab === 2 && <DashboardView data={uploadedData} />}
              {currentTab === 3 && <RelatoriosCientificos />}
              {currentTab === 4 && <MetodologiaCientificaAvancada />}
              {currentTab === 5 && <CentroAprendizadoCompleto />}
              {currentTab === 6 && <DatasetsESitesReais />}
              {currentTab === 7 && <SistemaNotificacoes />}
              {currentTab === 8 && <MonitoramentoTempoReal />}
              {currentTab === 9 && <ConfiguracoesAvancadas />}
            </Suspense>
          </Box>
        </Box>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
