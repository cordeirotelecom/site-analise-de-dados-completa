import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Box,
  Paper,
  Tab,
  Tabs,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import {
  UploadFile,
  Analytics,
  Dashboard,
  Assessment,
  AutoAwesome,
  Science,
  Psychology
} from '@mui/icons-material';
import UploadArea from './components/UploadArea';
import DataAnalysis from './components/DataAnalysis';
import DashboardView from './components/DashboardView';
import ReportsView from './components/ReportsView';
import DashboardCientificoAvancado from './components/DashboardCientificoAvancado';
import MetricasTempoReal from './components/MetricasTempoReal';
import NotificacoesCientificas from './components/NotificacoesCientificas';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
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
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
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
  const [activeTab, setActiveTab] = useState(0);
  const [uploadedData, setUploadedData] = useState(null);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleDataUpload = (data: any) => {
    setUploadedData(data);
    setActiveTab(1); // Mover para aba de análise
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Science sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              DataScience Pro - Plataforma Completa de Análise de Dados
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          {/* Métricas em Tempo Real */}
          <MetricasTempoReal />
          
          {/* Seção de Boas-vindas */}
          <Paper elevation={3} sx={{ p: 4, mb: 4, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>
            <Typography variant="h3" component="h1" gutterBottom color="white" textAlign="center">
              Bem-vindo ao DataScience Pro
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom color="white" textAlign="center">
              A plataforma mais avançada para análise de dados, machine learning e estatística
            </Typography>
            <Typography variant="body1" color="white" textAlign="center" sx={{ mt: 2 }}>
              Carregue seus dados e deixe nossa IA fazer toda a análise para você - 
              sem necessidade de conhecimento técnico!
            </Typography>
          </Paper>

          {/* Cards de Funcionalidades */}
          <Grid container spacing={4} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <AutoAwesome color="primary" sx={{ fontSize: 48, mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    AutoML Inteligente
                  </Typography>
                  <Typography variant="body2">
                    Machine Learning automatizado que escolhe o melhor modelo para seus dados
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Analytics color="primary" sx={{ fontSize: 48, mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Análise Completa
                  </Typography>
                  <Typography variant="body2">
                    Estatística descritiva, correlações, clustering e análise fatorial automáticos
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Assessment color="primary" sx={{ fontSize: 48, mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Relatórios Científicos
                  </Typography>
                  <Typography variant="body2">
                    Geração automática de artigos científicos com LaTeX e documentação completa
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Abas Principais */}
          <Paper elevation={2}>
            <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth">
              <Tab icon={<UploadFile />} label="Upload de Dados" />
              <Tab icon={<Analytics />} label="Análise de Dados" />
              <Tab icon={<Dashboard />} label="Dashboard" />
              <Tab icon={<Psychology />} label="Dashboard Científico" />
              <Tab icon={<Assessment />} label="Relatórios" />
            </Tabs>

            <TabPanel value={activeTab} index={0}>
              <UploadArea onDataUpload={handleDataUpload} />
            </TabPanel>

            <TabPanel value={activeTab} index={1}>
              <DataAnalysis data={uploadedData} />
            </TabPanel>

            <TabPanel value={activeTab} index={2}>
              <DashboardView data={uploadedData} />
            </TabPanel>

            <TabPanel value={activeTab} index={3}>
              <DashboardCientificoAvancado />
            </TabPanel>

            <TabPanel value={activeTab} index={4}>
              <ReportsView />
            </TabPanel>
          </Paper>
          
          {/* Rodapé Institucional */}
          <Box sx={{ 
            mt: 6, 
            py: 4, 
            px: 3,
            background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 50%, #5c6bc0 100%)',
            borderRadius: 3,
            color: 'white',
            textAlign: 'center'
          }}>
            <Typography variant="body2" sx={{ 
              fontSize: '0.9rem', 
              lineHeight: 1.6,
              fontWeight: 500,
              letterSpacing: '0.5px'
            }}>
              🌱 Desenvolvido com técnica de planejamento de gestão sistêmica para desenvolvimento harmônico sustentável
            </Typography>
            <Typography variant="caption" sx={{ 
              mt: 1, 
              display: 'block',
              opacity: 0.8,
              fontSize: '0.75rem'
            }}>
              DataScience Pro © {new Date().getFullYear()} - Plataforma Científica Avançada para Análise de Dados
            </Typography>
          </Box>
        </Container>
        
        {/* Sistema de Notificações Científicas */}
        <NotificacoesCientificas />
      </div>
    </ThemeProvider>
  );
}

export default App;
