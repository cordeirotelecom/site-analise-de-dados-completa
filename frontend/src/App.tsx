import React, { useState } from 'react';
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
  TrendingUp
} from '@mui/icons-material';

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
import BigDataAnalytics from './components/BigDataAnalytics';

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
    h6: {
      fontWeight: 600,
    },
  },
});

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [uploadedData, setUploadedData] = useState<any>(null);

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleNavigateToTab = (tabIndex: number) => {
    setCurrentTab(tabIndex);
    setShowWelcome(false);
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
    { icon: <MenuBook />, text: 'Relatórios PDF Santa Catarina', index: 4 },
    { icon: <Science />, text: 'Metodologia Científica', index: 5 },
    { icon: <AutoAwesome />, text: 'Centro de Aprendizado', index: 6 },
    { icon: <Public />, text: 'Datasets e Sites Reais', index: 7 },
    { icon: <Storage />, text: 'Dados Abertos Completo', index: 8 },
    { icon: <TrendingUp />, text: 'IA Preditiva', index: 9 },
    { icon: <Storage />, text: 'BigData Analytics', index: 10 },
    { icon: <Notifications />, text: 'Sistema de Notificações', index: 11 },
    { icon: <MonitorHeart />, text: 'Monitoramento', index: 12 },
    { icon: <Backup />, text: 'Backup Avançado', index: 13 },
    { icon: <Settings />, text: 'Configurações', index: 14 },
  ];

  if (showWelcome) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ minHeight: '100vh', p: 3 }}>
          <Container maxWidth="xl">
            {/* Hero Section */}
            <Paper
              elevation={0}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                p: 6,
                mb: 4,
                borderRadius: 3,
                textAlign: 'center'
              }}
            >
              <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
                🚀 DataScience Pro
              </Typography>
              <Typography variant="h5" sx={{ mb: 3, opacity: 0.9 }}>
                Plataforma Completa de Análise de Dados e Machine Learning
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem' }}>
                Transforme seus dados em insights valiosos com nossa suíte completa de ferramentas científicas
              </Typography>
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<CloudUpload />}
                  onClick={() => handleNavigateToTab(0)}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
                  }}
                >
                  Começar Análise
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Assessment />}
                  onClick={() => handleNavigateToTab(2)}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
                  }}
                >
                  Ver Dashboard
                </Button>
              </Stack>
            </Paper>

            {/* Features Grid */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => handleNavigateToTab(4)}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <MenuBook sx={{ mr: 2, fontSize: 40, color: 'primary.main' }} />
                      <Typography variant="h6">Relatórios PDF SC</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Gere relatórios completos em PDF com dados oficiais de Santa Catarina
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => handleNavigateToTab(10)}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Storage sx={{ mr: 2, fontSize: 40, color: 'secondary.main' }} />
                      <Typography variant="h6">BigData Analytics</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Plataforma para processamento de grandes volumes de dados em tempo real
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => handleNavigateToTab(9)}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <TrendingUp sx={{ mr: 2, fontSize: 40, color: 'success.main' }} />
                      <Typography variant="h6">IA Preditiva</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Modelos avançados de machine learning e predição automática
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Quick Stats */}
            <Paper sx={{ p: 3, mt: 4 }}>
              <Typography variant="h6" gutterBottom>📊 Estatísticas da Plataforma</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="primary">15</Typography>
                    <Typography variant="body2">Módulos Disponíveis</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="secondary">606TB</Typography>
                    <Typography variant="body2">Dados Processados</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="success.main">8</Typography>
                    <Typography variant="body2">Municípios SC</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="info.main">4</Typography>
                    <Typography variant="body2">Clusters BigData</Typography>
                  </Box>
                </Grid>
              </Grid>
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
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - 240px)` },
            ml: { sm: `240px` },
          }}
        >
          <Toolbar>
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
            
            <Typography variant="h6" noWrap component="div">
              DataScience Pro - Portal Completo
            </Typography>
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
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
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
            }}
          >
            {drawerContent}
          </Drawer>
          
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
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
            p: 3,
            width: { sm: `calc(100% - 240px)` },
            mt: '64px', // Altura da AppBar
            overflow: 'auto'
          }}
        >
          {currentTab === 0 && <UploadArea onDataUpload={handleDataUpload} />}
          {currentTab === 1 && <AnaliseAvancada />}
          {currentTab === 2 && <DashboardView data={uploadedData} />}
          {currentTab === 3 && <RelatoriosCientificos />}
          {currentTab === 4 && <RelatoriosCompletosStaCatarina />}
          {currentTab === 5 && <MetodologiaCientificaAvancada />}
          {currentTab === 6 && <CentroAprendizadoCompleto />}
          {currentTab === 7 && <DatasetsESitesReais />}
          {currentTab === 8 && <DadosAbertosCompleto />}
          {currentTab === 9 && <AnalisePreditivaIA />}
          {currentTab === 10 && <BigDataAnalytics />}
          {currentTab === 11 && <SistemaNotificacoes />}
          {currentTab === 12 && <MonitoramentoTempoReal />}
          {currentTab === 13 && <BackupAvancado />}
          {currentTab === 14 && <ConfiguracoesAvancadas />}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
