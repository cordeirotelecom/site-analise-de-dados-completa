import React, { useState } from 'react';
import {
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
} from '@mui/material';

import PaginaInicial from './components/PaginaInicial';
import UploadAreaPro from './components/UploadAreaPro';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentTab, setCurrentTab] = useState(0);

  console.log('🔍 App renderizando - showWelcome:', showWelcome, 'currentTab:', currentTab);

  const handleNavigateToTab = (tabIndex: number) => {
    console.log('🚀 Navegando para aba:', tabIndex);
    setShowWelcome(false);
    setCurrentTab(tabIndex);
    console.log('✅ Estados após navegação - showWelcome:', false, 'currentTab:', tabIndex);
  };

  const handleBackToHome = () => {
    console.log('🏠 Voltando para home');
    setShowWelcome(true);
    setCurrentTab(0);
  };

  // Página inicial
  if (showWelcome) {
    console.log('📄 Renderizando página inicial');
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PaginaInicial onNavigateToTab={handleNavigateToTab} />
      </ThemeProvider>
    );
  }

  // Interface principal
  console.log('🎯 Renderizando interface principal - aba:', currentTab);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              DataScience Pro - Aba {currentTab}
            </Typography>
            <Button color="inherit" onClick={handleBackToHome}>
              Voltar ao Início
            </Button>
          </Toolbar>
        </AppBar>
        
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {currentTab === 0 && (
            <Box>
              <Typography variant="h4" gutterBottom>
                Upload de Dados
              </Typography>
              <UploadAreaPro onDataUpload={(data) => console.log('Dados:', data)} />
            </Box>
          )}
          
          {currentTab === 1 && (
            <Box>
              <Typography variant="h4" gutterBottom>
                Análise Avançada
              </Typography>
              <Typography>Componente de análise carregado!</Typography>
            </Box>
          )}
          
          {currentTab === 4 && (
            <Box>
              <Typography variant="h4" gutterBottom>
                Metodologia Científica
              </Typography>
              <Typography>Tutorial científico carregado!</Typography>
            </Box>
          )}
          
          {![0, 1, 4].includes(currentTab) && (
            <Box>
              <Typography variant="h4" gutterBottom>
                Aba {currentTab}
              </Typography>
              <Typography>Conteúdo da aba {currentTab} será carregado aqui.</Typography>
            </Box>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
