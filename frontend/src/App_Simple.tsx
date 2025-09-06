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
  Card,
  CardContent,
  Button,
  Grid,
  Paper,
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
} from '@mui/icons-material';

// Imports dos componentes
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

// Tema científico profissional
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1565c0',
      light: '#5e92f3',
      dark: '#003c8f',
    },
    secondary: {
      main: '#c62828',
      light: '#ff5f52',
      dark: '#8e0000',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});

// Componente de Página Inicial Simples
const PaginaInicialSimples: React.FC<{ onNavigateToTab: (index: number) => void }> = ({ onNavigateToTab }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main', fontWeight: 700 }}>
          🔬 DataScience Pro - Plataforma Científica
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Portal Completo de Análise de Dados e Ciência de Dados
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Desenvolvido por <strong>Professor Vagner Cordeiro</strong> - Transformando dados em conhecimento científico
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Upload de Dados */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => onNavigateToTab(0)}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Upload de Dados
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Carregue seus datasets para análise
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Análise Avançada */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => onNavigateToTab(1)}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Analytics sx={{ fontSize: 48, color: 'secondary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Análise Avançada
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ferramentas estatísticas profissionais
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Dashboard */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => onNavigateToTab(2)}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Assessment sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Dashboard Científico
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Visualizações interativas
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Hub Santa Catarina */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => onNavigateToTab(9)}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Public sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Hub SC - Dados Oficiais
              </Typography>
              <Typography variant="body2" color="text.secondary">
                APIs governamentais de Santa Catarina
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Databricks BigData */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => onNavigateToTab(17)}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Storage sx={{ fontSize: 48, color: 'info.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Databricks BigData Studio
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Apache Spark para BigData
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Metodologia Científica */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => onNavigateToTab(5)}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Science sx={{ fontSize: 48, color: 'purple', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Metodologia Científica
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Métodos de pesquisa aplicada
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Informações Adicionais */}
      <Paper sx={{ p: 3, mt: 4, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h6" gutterBottom>
          🏆 Plataforma Científica de Referência
        </Typography>
        <Typography variant="body1">
          Dados oficiais de Santa Catarina • Análise estatística rigorosa • Metodologia científica aplicada
        </Typography>
      </Paper>
    </Container>
  );
};

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
    console.log('Dados recebidos:', data);
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
    { icon: <Storage />, text: 'Hub SC - Dados Oficiais', index: 9 },
    { icon: <Science />, text: 'Bancada Científica', index: 10 },
    { icon: <TrendingUp />, text: 'IA Preditiva', index: 11 },
    { icon: <Storage />, text: 'BigData Analytics', index: 12 },
    { icon: <Notifications />, text: 'Sistema de Notificações', index: 13 },
    { icon: <MonitorHeart />, text: 'Monitoramento', index: 14 },
    { icon: <Backup />, text: 'Backup Avançado', index: 15 },
    { icon: <Settings />, text: 'Configurações', index: 16 },
    { icon: <Storage />, text: 'Databricks BigData Studio', index: 17 },
  ];

  if (showWelcome) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PaginaInicialSimples onNavigateToTab={handleNavigateToTab} />
      </ThemeProvider>
    );
  }

  const drawerContent = (
    <Box sx={{ overflow: 'auto', p: 2 }}>
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
          DataScience Pro
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Professor Vagner Cordeiro
        </Typography>
      </Box>
      
      <List>
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
                '& .MuiListItemIcon-root': {
                  color: 'white',
                },
              },
            }}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const renderTabContent = () => {
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
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - 260px)` },
            ml: { sm: `260px` },
            backgroundColor: 'white',
            color: 'text.primary',
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
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
            
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
              DataScience Pro - {menuItems[currentTab]?.text || 'Portal Científico'}
            </Typography>
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{ width: { sm: 260 }, flexShrink: { sm: 0 } }}
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
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 260 },
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
                width: 260,
                backgroundColor: '#fafafa',
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
            width: { sm: `calc(100% - 260px)` },
            mt: '64px',
            p: 3,
            backgroundColor: 'background.default',
          }}
        >
          {renderTabContent()}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
