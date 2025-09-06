import React from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box, Typography, Button } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});

const AppSimple: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Box sx={{ 
          p: 6, 
          borderRadius: 4, 
          textAlign: 'center', 
          background: 'rgba(255,255,255,0.95)',
          maxWidth: 600,
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
          <Typography variant="body1" sx={{ mb: 4 }}>
            Plataforma funcionando corretamente! ✅
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              px: 6,
              py: 2,
              fontSize: '1.2rem',
              borderRadius: 3,
              background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
            }}
          >
            🚀 Aplicação Online
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AppSimple;
