import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Typography, Container } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h3" gutterBottom>
            🚀 DataScience Pro - Teste Simples
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Se você está vendo esta mensagem, o React está funcionando!
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Agora vou restaurar os componentes gradualmente...
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;