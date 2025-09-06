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
  Container,
  Paper,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  CircularProgress,
  Alert,
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
  Description,
  SmartToy,
} from '@mui/icons-material';

// Lazy loading components para melhor performance
const UploadArea = lazy(() => import('./components/UploadArea'));
const AnaliseAvancada = lazy(() => import('./components/AnaliseAvancada'));
const DashboardView = lazy(() => import('./components/DashboardView'));
const RelatoriosCientificos = lazy(() => import('./components/RelatoriosCientificos'));
const RelatoriosCompletosStaCatarina = lazy(() => import('./components/RelatoriosCompletosStaCatarina'));
const MetodologiaCientificaAvancada = lazy(() => import('./components/MetodologiaCientificaAvancada'));
const CentroAprendizadoCompleto = lazy(() => import('./components/CentroAprendizadoCompleto'));
const DatasetsESitesReais = lazy(() => import('./components/DatasetsESitesReais'));
const DadosAbertosCompleto = lazy(() => import('./components/DadosAbertosCompleto'));
const AnalisePreditivaIA = lazy(() => import('./components/AnalisePreditivaIA'));
const BigDataAnalyticsCompleto = lazy(() => import('./components/BigDataAnalyticsCompleto'));
const SistemaNotificacoes = lazy(() => import('./components/SistemaNotificacoes'));
const MonitoramentoTempoReal = lazy(() => import('./components/MonitoramentoTempoReal'));
const BackupAvancado = lazy(() => import('./components/BackupAvancado'));
const ConfiguracoesAvancadas = lazy(() => import('./components/ConfiguracoesAvancadas'));

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const AppFixo: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [uploadedData, setUploadedData] = useState<any>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const isMobile = useMediaQuery('(max-width:600px)');

  const menuItems = [
    { index: 0, label: 'Upload de Dados', icon: <CloudUpload /> },
    { index: 1, label: 'Análise Avançada', icon: <Analytics /> },
    { index: 2, label: 'Dashboard', icon: <Assessment /> },
    { index: 3, label: 'Relatórios Científicos', icon: <Description /> },
    { index: 4, label: 'Santa Catarina', icon: <Public /> },
    { index: 5, label: 'Metodologia Científica', icon: <Science /> },
    { index: 6, label: 'Centro de Aprendizado', icon: <MenuBook /> },
    { index: 7, label: 'Datasets e Sites', icon: <Storage /> },
    { index: 8, label: 'Dados Abertos Completo', icon: <Storage /> },
    { index: 9, label: 'IA Preditiva', icon: <TrendingUp /> },
    { index: 10, label: 'BigData Analytics', icon: <Storage /> },
    { index: 11, label: 'Notificações', icon: <Notifications /> },
    { index: 12, label: 'Monitoramento', icon: <MonitorHeart /> },
    { index: 13, label: 'Backup Avançado', icon: <Backup /> },
    { index: 14, label: 'Configurações', icon: <Settings /> },
  ];

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleNavigateToTab = (tabIndex: number) => {
    setCurrentTab(tabIndex);
    setShowWelcome(false);
    if (isMobile) setMobileOpen(false);
  };
  const handleDataUpload = (data: any) => setUploadedData(data);

  if (showWelcome) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ 
          minHeight: '100vh', 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
        }}>
          <Container maxWidth="lg">
            <Paper elevation={20} sx={{ 
              p: 6, 
              borderRadius: 4, 
              textAlign: 'center', 
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
            }}>
              <Typography variant="h2" component="h1" gutterBottom sx={{ 
                fontWeight: 'bold', 
                color: '#1976d2', 
                mb: 3,
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              }}>
                🧠 DataScience Pro
              </Typography>
              <Typography variant="h5" component="h2" gutterBottom sx={{ 
                color: '#666', 
                mb: 4,
                fontWeight: 300,
              }}>
                Portal Completo de Análise de Dados e Ciência de Dados
              </Typography>
              
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={4}>
                  <Card sx={{ 
                    height: '100%', 
                    transition: 'all 0.3s ease', 
                    '&:hover': { 
                      transform: 'translateY(-8px)', 
                      boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                    },
                    cursor: 'pointer',
                  }} onClick={() => handleNavigateToTab(1)}>
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      <Analytics sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Análise Avançada
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Ferramentas completas de análise estatística e machine learning
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card sx={{ 
                    height: '100%', 
                    transition: 'all 0.3s ease', 
                    '&:hover': { 
                      transform: 'translateY(-8px)', 
                      boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                    },
                    cursor: 'pointer',
                  }} onClick={() => handleNavigateToTab(8)}>
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      <Public sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Dados Abertos
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Acesso direto a 30+ APIs de dados públicos do Brasil
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card sx={{ 
                    height: '100%', 
                    transition: 'all 0.3s ease', 
                    '&:hover': { 
                      transform: 'translateY(-8px)', 
                      boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                    },
                    cursor: 'pointer',
                  }} onClick={() => handleNavigateToTab(10)}>
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      <Storage sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                        BigData Analytics
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Processamento e análise de grandes volumes de dados
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => setShowWelcome(false)}
                  sx={{
                    px: 6,
                    py: 2,
                    fontSize: '1.2rem',
                    borderRadius: 3,
                    background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                    boxShadow: '0 4px 15px rgba(25, 118, 210, .4)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(25, 118, 210, .6)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  🚀 Começar Análise
                </Button>
              </Stack>
            </Paper>
          </Container>
        </Box>
      </ThemeProvider>
    );
  }

  const drawerContent = (
    <Box sx={{ overflow: 'auto', p: 1 }}>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.index}
            button
            onClick={() => handleNavigateToTab(item.index)}
            selected={currentTab === item.index}
            sx={{ 
              mb: 0.5, 
              borderRadius: 2,
              '&.Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              },
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <ListItemIcon>
              {React.cloneElement(item.icon, {
                color: currentTab === item.index ? 'inherit' : 'primary'
              })}
            </ListItemIcon>
            <ListItemText 
              primary={item.label}
              sx={{ 
                '& .MuiListItemText-primary': {
                  fontWeight: currentTab === item.index ? 'bold' : 'normal',
                  fontSize: '0.9rem',
                }
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const renderComponent = () => {
    try {
      switch (currentTab) {
        case 0: return <UploadArea onDataUpload={handleDataUpload} />;
        case 1: return <AnaliseAvancada />;
        case 2: return <DashboardView data={uploadedData} />;
        case 3: return <RelatoriosCientificos />;
        case 4: return <RelatoriosCompletosStaCatarina />;
        case 5: return <MetodologiaCientificaAvancada />;
        case 6: return <CentroAprendizadoCompleto />;
        case 7: return <DatasetsESitesReais />;
        case 8: return <DadosAbertosCompleto />;
        case 9: return <AnalisePreditivaIA />;
        case 10: return <BigDataAnalyticsCompleto />;
        case 11: return <SistemaNotificacoes />;
        case 12: return <MonitoramentoTempoReal />;
        case 13: return <BackupAvancado />;
        case 14: return <ConfiguracoesAvancadas />;
        default: return (
          <Alert severity="error" sx={{ m: 2 }}>
            Componente não encontrado para a aba {currentTab}
          </Alert>
        );
      }
    } catch (error) {
      return (
        <Alert severity="error" sx={{ m: 2 }}>
          Erro ao carregar o componente: {error instanceof Error ? error.message : 'Erro desconhecido'}
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
            zIndex: (theme) => theme.zIndex.drawer + 1,
            background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              🧠 DataScience Pro - {menuItems[currentTab]?.label || 'Loading...'}
            </Typography>
            <Button
              color="inherit"
              onClick={() => setShowWelcome(true)}
              sx={{ 
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 2,
                '&:hover': { 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <Home sx={{ mr: 1 }} />
              Início
            </Button>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 280,
              background: 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)'
            },
          }}
        >
          <Toolbar />
          {drawerContent}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 280,
              background: 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)'
            },
          }}
          open
        >
          <Toolbar />
          {drawerContent}
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - 280px)` },
            mt: '64px',
            overflow: 'auto',
            minHeight: 'calc(100vh - 64px)',
          }}
        >
          <Suspense fallback={
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              minHeight: '400px',
              flexDirection: 'column',
            }}>
              <CircularProgress size={60} color="primary" />
              <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
                Carregando {menuItems[currentTab]?.label}...
              </Typography>
            </Box>
          }>
            {renderComponent()}
          </Suspense>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AppFixo;
