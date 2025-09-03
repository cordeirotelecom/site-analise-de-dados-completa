import React from 'react';
import { Box, Typography, Paper, Container } from '@mui/material';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
  },
});

const AppMinimo: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom color="primary">
            🧠 DataScience Pro
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Portal de Análise de Dados - Versão Teste
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            ✅ React funcionando
          </Typography>
          <Typography variant="body1">
            ✅ Material-UI funcionando  
          </Typography>
          <Typography variant="body1">
            ✅ TypeScript funcionando
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, color: 'success.main' }}>
            🎉 Aplicação carregada com sucesso!
          </Typography>
          <Typography variant="caption" display="block" sx={{ mt: 2 }}>
            Timestamp: {new Date().toLocaleString('pt-BR')}
          </Typography>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default AppMinimo;
