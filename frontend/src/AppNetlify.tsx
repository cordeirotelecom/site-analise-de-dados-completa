import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Box, CircularProgress, Typography } from '@mui/material';
import ErrorBoundary from './components/ErrorBoundary';

console.log('AppNetlify: Iniciando carregamento...');

// Lazy loading dos componentes principais
const DashboardView = lazy(() => {
  console.log('AppNetlify: Carregando DashboardView...');
  return import('./components/DashboardView');
});
const DataAnalysis = lazy(() => {
  console.log('AppNetlify: Carregando DataAnalysis...');
  return import('./components/DataAnalysis');
});

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});

// Componente de loading
const LoadingFallback: React.FC = () => {
  console.log('AppNetlify: Exibindo loading...');
  return (
    <Box 
      display="flex" 
      flexDirection="column"
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh"
      sx={{ backgroundColor: '#f5f5f5' }}
    >
      <CircularProgress size={60} />
      <Typography variant="h6" sx={{ mt: 2 }}>
        Carregando DataScience Pro...
      </Typography>
    </Box>
  );
};

// Componente Home simples
const Home: React.FC = () => {
  console.log('AppNetlify: Renderizando Home...');
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h3" component="h1" gutterBottom color="primary">
        🧠 DataScience Pro
      </Typography>
      <Typography variant="h5" color="text.secondary" gutterBottom>
        Plataforma Completa de Análise de Dados
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        ✅ Sistema funcionando corretamente
      </Typography>
      <Typography variant="body1">
        ✅ Deploy no Netlify ativo
      </Typography>
      <Typography variant="body1">
        ✅ React + TypeScript + Material-UI
      </Typography>
      <Typography variant="caption" display="block" sx={{ mt: 2 }}>
        Timestamp: {new Date().toLocaleString('pt-BR')}
      </Typography>
    </Box>
  );
};

const AppNetlify: React.FC = () => {
  console.log('AppNetlify: Iniciando renderização...');
  
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<DashboardView data={[]} />} />
              <Route path="/analysis" element={<DataAnalysis data={[]} />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

console.log('AppNetlify: Componente definido, exportando...');
export default AppNetlify;
