import React from 'react';
import { Box, Typography } from '@mui/material';

const AppTeste2: React.FC = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        🧪 Teste de Carregamento da Aplicação
      </Typography>
      <Typography variant="body1">
        Se você está vendo esta mensagem, o React está funcionando corretamente.
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        DataScience Pro - Teste de Debug {new Date().toLocaleString()}
      </Typography>
    </Box>
  );
};

export default AppTeste2;
