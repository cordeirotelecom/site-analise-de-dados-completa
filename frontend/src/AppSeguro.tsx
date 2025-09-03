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

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});

const AppSeguro: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const isMobile = useMediaQuery('(max-width:600px)');

  const menuItems = [
    { index: 0, label: 'Upload de Dados', icon: <CloudUpload /> },
    { index: 1, label: 'Análise Avançada', icon: <Analytics /> },
    { index: 2, label: 'Dashboard', icon: <Assessment /> },
    { index: 3, label: 'Relatórios Científicos', icon: <Description /> },
    { index: 4, label: 'Santa Catarina', icon: <Public /> },
    { index: 5, label: 'BigData Analytics', icon: <Storage /> },
  ];

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleNavigateToTab = (tabIndex: number) => {
    setCurrentTab(tabIndex);
    setShowWelcome(false);
    if (isMobile) setMobileOpen(false);
  };

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
            }}>
              <Typography variant="h2" component="h1" gutterBottom sx={{ 
                fontWeight: 'bold', 
                color: '#1976d2', 
                mb: 3,
              }}>
                🧠 DataScience Pro
              </Typography>
              <Typography variant="h5" component="h2" gutterBottom sx={{ 
                color: '#666', 
                mb: 4,
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
                    },
                    cursor: 'pointer',
                  }} onClick={() => handleNavigateToTab(1)}>
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      <Analytics sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
                      <Typography variant="h6" gutterBottom>
                        Análise Avançada
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Ferramentas completas de análise estatística
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
                    },
                    cursor: 'pointer',
                  }} onClick={() => handleNavigateToTab(4)}>
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      <Public sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
                      <Typography variant="h6" gutterBottom>
                        Santa Catarina
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Dados abertos de Santa Catarina
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
                    },
                    cursor: 'pointer',
                  }} onClick={() => handleNavigateToTab(5)}>
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      <Storage sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
                      <Typography variant="h6" gutterBottom>
                        BigData Analytics
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Processamento de grandes volumes
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
            sx={{ mb: 0.5, borderRadius: 2 }}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const renderContent = () => {
    switch (currentTab) {
      case 0:
        return (
          <Paper sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>📤 Upload de Dados</Typography>
            <Alert severity="info" sx={{ mb: 3 }}>
              Funcionalidade de upload será implementada em breve.
            </Alert>
            <Box sx={{ 
              border: '2px dashed #ccc', 
              borderRadius: 2, 
              p: 4, 
              textAlign: 'center',
              minHeight: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Typography variant="h6" color="text.secondary">
                Arraste arquivos aqui ou clique para selecionar
              </Typography>
            </Box>
          </Paper>
        );
      case 1:
        return (
          <Paper sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>📊 Análise Avançada</Typography>
            <Alert severity="success" sx={{ mb: 3 }}>
              Sistema de análise estatística em desenvolvimento.
            </Alert>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Estatística Descritiva</Typography>
                    <Typography variant="body2">Análises básicas dos dados</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Machine Learning</Typography>
                    <Typography variant="body2">Modelos preditivos</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        );
      case 2:
        return (
          <Paper sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>📈 Dashboard</Typography>
            <Alert severity="info" sx={{ mb: 3 }}>
              Dashboard interativo será carregado aqui.
            </Alert>
          </Paper>
        );
      case 3:
        return (
          <Paper sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>📋 Relatórios Científicos</Typography>
            <Alert severity="info" sx={{ mb: 3 }}>
              Gerador de relatórios em PDF.
            </Alert>
          </Paper>
        );
      case 4:
        return (
          <Paper sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>🏛️ Santa Catarina</Typography>
            <Alert severity="success" sx={{ mb: 3 }}>
              Dados abertos de municípios catarinenses.
            </Alert>
            <Typography variant="body1">
              Acesso a dados de São José, Florianópolis, Blumenau e outros municípios.
            </Typography>
          </Paper>
        );
      case 5:
        return (
          <Paper sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>💾 BigData Analytics</Typography>
            <Alert severity="warning" sx={{ mb: 3 }}>
              Sistema de processamento de grandes volumes de dados.
            </Alert>
          </Paper>
        );
      default:
        return (
          <Alert severity="error">
            Página não encontrada
          </Alert>
        );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <AppBar position="fixed" sx={{ zIndex: 1201 }}>
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
              🧠 DataScience Pro - {menuItems[currentTab]?.label || 'Carregando...'}
            </Typography>
            <Button
              color="inherit"
              onClick={() => setShowWelcome(true)}
              sx={{ border: '1px solid rgba(255,255,255,0.3)', borderRadius: 2 }}
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
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          <Toolbar />
          {drawerContent}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
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
          }}
        >
          {renderContent()}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AppSeguro;
