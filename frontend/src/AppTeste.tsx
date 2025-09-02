import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import TesteSimples from './components/TesteSimples';

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

const AppTeste: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TesteSimples />
    </ThemeProvider>
  );
};

export default AppTeste;
