import React, { useState, Suspense } from 'react';
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
  Backup,
  School,
  Description,
  SmartToy,
} from '@mui/icons-material';

// Lazy loading dos componentes
const UploadArea = React.lazy(() => import('./components/UploadArea'));
const AnaliseAvancada = React.lazy(() => import('./components/AnaliseAvancada'));
const DashboardView = React.lazy(() => import('./components/DashboardView'));

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});

const App: React.FC = () => {
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
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <Container maxWidth="lg" sx={{ pt: 8 }}>
            <Paper elevation={10} sx={{ p: 6, borderRadius: 4, textAlign: 'center', background: 'rgba(255,255,255,0.95)' }}>
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2', mb: 3 }}>
                🧠 DataScience Pro
              </Typography>
              <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#666', mb: 4 }}>
                Portal Completo de Análise de Dados e Ciência de Dados
              </Typography>
              
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={4}>
                  <Card sx={{ height: '100%', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-5px)' } }}>
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      <Analytics sx={{ fontSize: 48, color: '#1976d2', mb: 2 }} />
                      <Typography variant="h6" gutterBottom>Análise Avançada</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Ferramentas completas de análise estatística e machine learning
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card sx={{ height: '100%', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-5px)' } }}>
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      <Public sx={{ fontSize: 48, color: '#1976d2', mb: 2 }} />
                      <Typography variant="h6" gutterBottom>Dados Abertos</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Acesso direto a 30+ APIs de dados públicos do Brasil
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card sx={{ height: '100%', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-5px)' } }}>
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      <Assessment sx={{ fontSize: 48, color: '#1976d2', mb: 2 }} />
                      <Typography variant="h6" gutterBottom>Relatórios Pro</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Geração automática de relatórios científicos em PDF
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

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
                  boxShadow: '0 3px 5px 2px rgba(25, 118, 210, .3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                  }
                }}
              >
                🚀 Começar Análise
              </Button>
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
            <ListItemText 
              primary={item.label}
              sx={{ 
                '& .MuiListItemText-primary': {
                  fontWeight: currentTab === item.index ? 'bold' : 'normal'
                }
              }}
            />
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
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              🧠 DataScience Pro - {menuItems[currentTab]?.label}
            </Typography>
            <Button
              color="inherit"
              onClick={() => setShowWelcome(true)}
              sx={{ 
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 2,
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
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
              width: 240,
              background: 'linear-gradient(180deg, #f5f5f5 0%, #e3f2fd 100%)'
            },
          }}
        >
          {drawerContent}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 240,
              background: 'linear-gradient(180deg, #f5f5f5 0%, #e3f2fd 100%)'
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
            width: { sm: `calc(100% - 240px)` },
            mt: '64px',
            overflow: 'auto'
          }}
        >
          <Suspense fallback={
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
              <CircularProgress size={60} />
              <Typography variant="h6" sx={{ ml: 2 }}>Carregando componente...</Typography>
            </Box>
          }>
            {currentTab === 0 && <UploadArea onDataUpload={handleDataUpload} />}
            {currentTab === 1 && <AnaliseAvancada />}
            {currentTab === 2 && <DashboardView data={uploadedData} />}
            {currentTab === 3 && (
              <Box sx={{ p: 2 }}>
                <Typography variant="h4">Relatórios Científicos</Typography>
                <Typography>Em desenvolvimento...</Typography>
              </Box>
            )}
            {currentTab === 4 && (
              <Box sx={{ p: 2 }}>
                <Typography variant="h4">Santa Catarina</Typography>
                <Typography>Em desenvolvimento...</Typography>
              </Box>
            )}
          </Suspense>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
