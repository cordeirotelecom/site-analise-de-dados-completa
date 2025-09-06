import React from 'react';
import {
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Typography,
  Card,
  CardContent,
  Alert,
} from '@mui/material';

// Tema customizado
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            🚀 DataScience Pro
          </Typography>
          
          <Typography variant="h6" align="center" color="text.secondary" paragraph>
            Plataforma Completa de Análise de Dados Científicos
          </Typography>

          <Alert severity="success" sx={{ mb: 4 }}>
            ✅ Sistema Online e Funcionando! Deploy realizado com sucesso.
          </Alert>

          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                📊 Funcionalidades Principais
              </Typography>
              
              <Box component="ul" sx={{ pl: 2 }}>
                <Typography component="li" paragraph>
                  <strong>Upload de Dados:</strong> Suporte para CSV, Excel, JSON
                </Typography>
                <Typography component="li" paragraph>
                  <strong>Análise Estatística:</strong> Descritiva, correlações, outliers
                </Typography>
                <Typography component="li" paragraph>
                  <strong>Visualizações:</strong> Gráficos interativos e dashboards
                </Typography>
                <Typography component="li" paragraph>
                  <strong>Santa Catarina:</strong> Dados específicos e análises regionais
                </Typography>
                <Typography component="li" paragraph>
                  <strong>API Completa:</strong> Backend FastAPI com documentação
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Versão 3.0 - Deploy: {new Date().toLocaleDateString('pt-BR')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Hospedado no Netlify | Backend: FastAPI | Frontend: React + TypeScript
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
