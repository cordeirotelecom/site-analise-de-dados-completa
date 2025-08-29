import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  Box,
  Paper,
  Tab,
  Tabs,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Chip,
  Stack,
} from '@mui/material';
import {
  UploadFile,
  Analytics,
  Dashboard,
  Assessment,
  School,
  Science,
  Storage,
  TrendingUp
} from '@mui/icons-material';
import UploadArea from './components/UploadArea';
import DataAnalysis from './components/DataAnalysis';
import DashboardView from './components/DashboardView';
// import ReportsView from './components/ReportsView';
import LearningCenter from './components/LearningCenter';

// Tema profissional focado em análise de dados
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb', // Azul profissional
      light: '#3b82f6',
      dark: '#1d4ed8',
    },
    secondary: {
      main: '#0f172a', // Cinza escuro
      light: '#334155',
      dark: '#020617',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
    h4: {
      fontWeight: 700,
      color: '#0f172a',
    },
    h5: {
      fontWeight: 600,
      color: '#1e293b',
    },
    h6: {
      fontWeight: 600,
      color: '#334155',
    },
    body1: {
      color: '#475569',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#0f172a',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.875rem',
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
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function App() {
  const [value, setValue] = useState(0);
  const [uploadedData, setUploadedData] = useState<any>(null);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleDataUpload = (data: any) => {
    setUploadedData(data);
    setValue(1); // Vai automaticamente para a aba de análise
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: '#f8fafc' }}>
        <AppBar position="static" elevation={0}>
          <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
            <Science sx={{ mr: 2, color: 'primary.main' }} />
            <Typography
              variant="h5"
              component="div"
              sx={{ 
                flexGrow: 1, 
                fontWeight: 700,
                background: 'linear-gradient(45deg, #2563eb 30%, #1d4ed8 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              DataScience Pro
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip 
                label="Análise Avançada" 
                size="small" 
                variant="outlined"
                sx={{ color: 'text.secondary', borderColor: 'divider' }}
              />
              <Chip 
                label="Machine Learning" 
                size="small" 
                variant="outlined"
                sx={{ color: 'text.secondary', borderColor: 'divider' }}
              />
            </Stack>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ py: 4 }}>
          {/* Header da Plataforma */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom>
              Plataforma Profissional de Análise de Dados
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Ferramenta completa para análise estatística, machine learning e visualização de dados.
              Adequada para iniciantes em análise de dados até engenheiros de dados experientes.
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Card variant="outlined" sx={{ textAlign: 'center', py: 2 }}>
                  <Storage sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h6" gutterBottom>15+ Formatos</Typography>
                  <Typography variant="body2" color="text.secondary">
                    CSV, Excel, JSON, Parquet, SQL e mais
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card variant="outlined" sx={{ textAlign: 'center', py: 2 }}>
                  <TrendingUp sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h6" gutterBottom>50+ Análises</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Estatística descritiva, testes de hipóteses, correlações
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card variant="outlined" sx={{ textAlign: 'center', py: 2 }}>
                  <Science sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h6" gutterBottom>Machine Learning</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Scikit-learn, AutoML, modelos pré-treinados
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card variant="outlined" sx={{ textAlign: 'center', py: 2 }}>
                  <School sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h6" gutterBottom>Educacional</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tutoriais, exemplos práticos, documentação
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {/* Navegação Principal */}
          <Paper sx={{ mb: 3 }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                '& .MuiTabs-flexContainer': {
                  gap: 1,
                },
              }}
            >
              <Tab
                icon={<UploadFile />}
                label="Upload de Dados"
                iconPosition="start"
                sx={{ minHeight: 64 }}
              />
              <Tab
                icon={<Analytics />}
                label="Análise Estatística"
                iconPosition="start"
                sx={{ minHeight: 64 }}
              />
              <Tab
                icon={<Dashboard />}
                label="Visualizações"
                iconPosition="start"
                sx={{ minHeight: 64 }}
              />
              <Tab
                icon={<Assessment />}
                label="Relatórios"
                iconPosition="start"
                sx={{ minHeight: 64 }}
              />
              <Tab
                icon={<School />}
                label="Aprender"
                iconPosition="start"
                sx={{ minHeight: 64 }}
              />
            </Tabs>
          </Paper>

          {/* Conteúdo das Abas */}
          <TabPanel value={value} index={0}>
            <UploadArea onDataUpload={handleDataUpload} />
          </TabPanel>
          
          <TabPanel value={value} index={1}>
            <DataAnalysis data={uploadedData} />
          </TabPanel>
          
          <TabPanel value={value} index={2}>
            <DashboardView data={uploadedData} />
          </TabPanel>
          
          <TabPanel value={value} index={3}>
            {/* <ReportsView /> */}
          </TabPanel>
          
          <TabPanel value={value} index={4}>
            <LearningCenter />
          </TabPanel>
        </Container>

        {/* Rodapé Profissional */}
        <Box
          component="footer"
          sx={{
            mt: 8,
            py: 4,
            px: 3,
            backgroundColor: 'secondary.main',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h6" gutterBottom>
              DataScience Pro
            </Typography>
            <Typography variant="body2" color="grey.300" sx={{ mb: 2 }}>
              Plataforma profissional de análise de dados e machine learning
            </Typography>
            <Typography variant="caption" color="grey.400">
              Desenvolvido com técnica de planejamento de gestão sistêmica para desenvolvimento harmônico sustentável
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
