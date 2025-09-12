import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

// Componentes principais
import DataScienceProCompleto from './DataScienceProCompleto';
import Navigation from './components/Navigation';

// Lazy loading dos componentes de páginas
import { Suspense } from 'react';
import LoadingComponent from './components/LoadingComponent';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#0d47a1',
    },
    secondary: {
      main: '#f50057',
      light: '#ff5983',
      dark: '#c51162',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

// Componentes de página
const HomePage = () => <DataScienceProCompleto defaultTab={0} />;
const HadoopPage = () => <DataScienceProCompleto defaultTab={0} />;
const SparkPage = () => <DataScienceProCompleto defaultTab={1} />;
const MLPage = () => <DataScienceProCompleto defaultTab={2} />;
const DeepLearningPage = () => <DataScienceProCompleto defaultTab={3} />;
const DataEngineeringPage = () => <DataScienceProCompleto defaultTab={4} />;
const AnalyticsPage = () => <DataScienceProCompleto defaultTab={5} />;

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navigation />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Suspense fallback={<LoadingComponent fullScreen message="Carregando página..." />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/hadoop" element={<HadoopPage />} />
                <Route path="/spark" element={<SparkPage />} />
                <Route path="/machine-learning" element={<MLPage />} />
                <Route path="/deep-learning" element={<DeepLearningPage />} />
                <Route path="/data-engineering" element={<DataEngineeringPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;