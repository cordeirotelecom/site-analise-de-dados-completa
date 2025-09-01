import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
  IconButton,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Fab,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
  Alert,
  Snackbar,
  CircularProgress,
  Paper,
  Divider,
  Chip,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse
} from '@mui/material';
import {
  Home,
  CloudUpload,
  Analytics,
  Assessment,
  MenuBook,
  Public,
  Settings,
  Notifications,
  AccountCircle,
  Menu as MenuIcon,
  ChevronLeft,
  ExpandLess,
  ExpandMore,
  Science,
  AutoAwesome,
  Storage,
  Api,
  Security,
  Backup,
  Group,
  CloudUpload as Upload,
  SmartToy,
} from '@mui/icons-material';

// Imports diretos dos componentes (sem lazy loading)
import UploadAreaPro from './components/UploadAreaPro';
import DataAnalysisPro from './components/DataAnalysisPro';
import DashboardViewSimple from './components/DashboardViewSimple';
import RelatoriosCientificos from './components/RelatoriosCientificos';
import CentroAprendizadoCompleto from './components/CentroAprendizadoCompleto';
import DatasetsESitesReais from './components/DatasetsESitesReais';
import PaginaInicial from './components/PaginaInicial';
import AnaliseAvancada from './components/AnaliseAvancada';
import MetodologiaCientificaAvancada from './components/MetodologiaCientificaAvancada';
import AutomacaoVariaveis from './components/AutomacaoVariaveis';
import MonitoramentoAPIs from './components/MonitoramentoAPIs';
import ColetorTempoReal from './components/ColetorTempoReal';
import ExploradorAPIsGoverno from './components/ExploradorAPIsGoverno';
import CatalogoDadosAbertosCompleto from './components/CatalogoDadosAbertosCompleto';
import DadosAbertosStaCatarina from './components/DadosAbertosStaCatarina';
import AutenticacaoCompleta from './components/AutenticacaoCompleta';
import MonitoramentoSimples from './components/MonitoramentoSimples';
import BackupSimples from './components/BackupSimples';
import NotificacoesSimples from './components/NotificacoesSimples';
import BackupAvancado from './components/BackupAvancado';
import AnalisePreditivaIA from './components/AnalisePreditivaIA';
import ColaboracaoTempoReal from './components/ColaboracaoTempoReal';

// Tema profissional focado em análise de dados
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
      light: '#ff5983',
      dark: '#9a0036',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      color: '#1976d2',
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.9rem',
          minHeight: 48,
        },
      },
    },
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
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function App() {
  const [value, setValue] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationCount, setNotificationCount] = useState(3);
  const [showNotification, setShowNotification] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<{[key: string]: boolean}>({});
  const [uploadedData, setUploadedData] = useState<any>(null);
  
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleDataUpload = (data: any) => {
    setUploadedData(data);
    setValue(1); // Navegar para análise
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
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Tooltip title="Notificações">
                <IconButton color="inherit">
                  <Badge badgeContent={notificationCount} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Configurações">
                <IconButton color="inherit">
                  <Settings />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Perfil">
                <IconButton color="inherit">
                  <AccountCircle />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Sidebar Navigation */}
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
              {/* Upload de Dados */}
              <ListItem
                button
                onClick={() => setValue(0)}
                selected={value === 0}
                sx={{ mb: 0.5, borderRadius: 1 }}
              >
                <ListItemIcon>
                  <CloudUpload color={value === 0 ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Upload de Dados" />
              </ListItem>

              {/* Análise Avançada */}
              <ListItem
                button
                onClick={() => setValue(1)}
                selected={value === 1}
                sx={{ mb: 0.5, borderRadius: 1 }}
              >
                <ListItemIcon>
                  <Analytics color={value === 1 ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Análise Avançada" />
              </ListItem>

              {/* Dashboard */}
              <ListItem
                button
                onClick={() => setValue(2)}
                selected={value === 2}
                sx={{ mb: 0.5, borderRadius: 1 }}
              >
                <ListItemIcon>
                  <Assessment color={value === 2 ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>

              {/* Relatórios */}
              <ListItem
                button
                onClick={() => setValue(3)}
                selected={value === 3}
                sx={{ mb: 0.5, borderRadius: 1 }}
              >
                <ListItemIcon>
                  <MenuBook color={value === 3 ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Relatórios Científicos" />
              </ListItem>

              {/* Metodologia */}
              <ListItem
                button
                onClick={() => setValue(4)}
                selected={value === 4}
                sx={{ mb: 0.5, borderRadius: 1 }}
              >
                <ListItemIcon>
                  <Science color={value === 4 ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Metodologia Científica" />
              </ListItem>

              {/* Centro de Aprendizado */}
              <ListItem
                button
                onClick={() => setValue(5)}
                selected={value === 5}
                sx={{ mb: 0.5, borderRadius: 1 }}
              >
                <ListItemIcon>
                  <AutoAwesome color={value === 5 ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Centro de Aprendizado" />
              </ListItem>

              {/* Dados Públicos */}
              <ListItem
                button
                onClick={() => setValue(6)}
                selected={value === 6}
                sx={{ mb: 0.5, borderRadius: 1 }}
              >
                <ListItemIcon>
                  <Public color={value === 6 ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Dados Públicos" />
              </ListItem>
            </List>
          </Box>
        </Drawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { md: `calc(100% - 280px)` },
            ml: { md: '280px' },
            mt: '64px',
            minHeight: 'calc(100vh - 64px)',
          }}
        >
          <TabPanel value={value} index={0}>
            <UploadAreaPro onDataUpload={handleDataUpload} />
          </TabPanel>
          
          <TabPanel value={value} index={1}>
            <AnaliseAvancada />
          </TabPanel>
          
          <TabPanel value={value} index={2}>
            <DashboardViewSimple data={uploadedData} />
          </TabPanel>
          
          <TabPanel value={value} index={3}>
            <RelatoriosCientificos />
          </TabPanel>
          
          <TabPanel value={value} index={4}>
            <MetodologiaCientificaAvancada />
          </TabPanel>
          
          <TabPanel value={value} index={5}>
            <CentroAprendizadoCompleto />
          </TabPanel>
          
          <TabPanel value={value} index={6}>
            <DatasetsESitesReais />
          </TabPanel>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
