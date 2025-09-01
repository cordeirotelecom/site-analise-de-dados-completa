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
  CircularProgress,
  useMediaQuery,
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
} from '@mui/icons-material';

import PaginaInicial from './components/PaginaInicial';
// Imports principais que sabemos que funcionam
import UploadAreaPro from './components/UploadAreaPro';

// Testando componentes um por vez
import AnaliseAvancada from './components/AnaliseAvancada';
import DashboardViewSimple from './components/DashboardViewSimple';
import RelatoriosCientificos from './components/RelatoriosCientificos';
import MetodologiaCientificaAvancada from './components/MetodologiaCientificaAvancada';
import CentroAprendizadoCompleto from './components/CentroAprendizadoCompleto';
import DatasetsESitesReais from './components/DatasetsESitesReais';

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

const LoadingComponent = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
    <CircularProgress size={60} />
  </Box>
);

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentTab, setCurrentTab] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [uploadedData, setUploadedData] = useState<any>(null);
  
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Debug logs detalhados
  console.log('🔍 App State:', { showWelcome, currentTab, mobileOpen });

  const handleNavigateToTab = (tabIndex: number) => {
    console.log('🚀 Navegando para aba:', tabIndex);
    console.log('📍 Estado antes:', { showWelcome, currentTab });
    setShowWelcome(false);
    setCurrentTab(tabIndex);
    setMobileOpen(false);
    console.log('📍 Estado após:', { showWelcome: false, currentTab: tabIndex });
  };

  const handleBackToHome = () => {
    console.log('🏠 Voltando para home');
    setShowWelcome(true);
    setCurrentTab(0);
    setMobileOpen(false);
  };

  const handleDataUpload = (data: any) => {
    console.log('📁 Dados carregados:', data);
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
  ];

  // Página inicial
  if (showWelcome) {
    console.log('🏠 Renderizando PaginaInicial');
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PaginaInicial onNavigateToTab={handleNavigateToTab} />
      </ThemeProvider>
    );
  }

  // Interface principal
  console.log('🎯 Renderizando interface principal - currentTab:', currentTab);
  return (
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
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { md: `calc(100% - 280px)` },
            ml: { md: '280px' },
            mt: '64px',
            minHeight: 'calc(100vh - 64px)',
            p: 3,
          }}
        >
          {(() => {
            console.log('🎯 Renderizando componente para aba:', currentTab);
            
            switch (currentTab) {
              case 0:
                console.log('📤 Carregando UploadAreaPro');
                return <UploadAreaPro onDataUpload={handleDataUpload} />;
              case 1:
                console.log('📊 Carregando AnaliseAvancada');
                return <AnaliseAvancada />;
              case 2:
                console.log('📈 Carregando DashboardViewSimple');
                return <DashboardViewSimple data={uploadedData} />;
              case 3:
                console.log('📝 Carregando RelatoriosCientificos');
                return <RelatoriosCientificos />;
              case 4:
                console.log('🔬 Carregando MetodologiaCientificaAvancada');
                return <MetodologiaCientificaAvancada />;
              case 5:
                console.log('🎓 Carregando CentroAprendizadoCompleto');
                return <CentroAprendizadoCompleto />;
              case 6:
                console.log('🌐 Carregando DatasetsESitesReais');
                return <DatasetsESitesReais />;
              default:
                console.log('❌ Aba não encontrada:', currentTab);
                return (
                  <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="h5" color="error">
                      Página não encontrada (Aba {currentTab})
                    </Typography>
                  </Box>
                );
            }
          })()}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
