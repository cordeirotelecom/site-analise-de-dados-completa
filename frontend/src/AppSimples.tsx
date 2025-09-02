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

import PaginaInicial from './components/PaginaInicial';
import UploadArea from './components/UploadArea';
import AnaliseAvancada from './components/AnaliseAvancada';
import DashboardView from './components/DashboardView';
import RelatoriosCientificos from './components/RelatoriosCientificos';
import MetodologiaCientificaAvancada from './components/MetodologiaCientificaAvancada';
import CentroAprendizadoCompleto from './components/CentroAprendizadoCompleto';
import DatasetsESitesReais from './components/DatasetsESitesReais';
import SistemaNotificacoes from './components/SistemaNotificacoes';
import MonitoramentoTempoReal from './components/MonitoramentoTempoReal';
import ConfiguracoesAvancadas from './components/ConfiguracoesAvancadas';

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
    { icon: <Science />, text: 'Metodologia Científica', index: 4 },
    { icon: <AutoAwesome />, text: 'Centro de Aprendizado', index: 5 },
    { icon: <Public />, text: 'Datasets e Sites Reais', index: 6 },
    { icon: <Notifications />, text: 'Sistema de Notificações', index: 7 },
    { icon: <MonitorHeart />, text: 'Monitoramento', index: 8 },
    { icon: <Settings />, text: 'Configurações', index: 9 },
  ];

  if (showWelcome) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PaginaInicial onNavigateToTab={handleNavigateToTab} />
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
      <Box sx={{ display: 'flex' }}>
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
            width: { sm: `calc(100% - 240px)` }
          }}
        >
          <Toolbar />
          
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
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
