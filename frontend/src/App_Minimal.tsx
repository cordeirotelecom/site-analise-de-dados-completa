import React, { useState } from 'react';
import {
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';

import PaginaInicial from './components/PaginaInicial';

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

  const handleNavigateToTab = (tabIndex: number) => {
    console.log('Navegando para tab:', tabIndex);
    // Por enquanto apenas log
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh' }}>
        <PaginaInicial onNavigateToTab={handleNavigateToTab} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
