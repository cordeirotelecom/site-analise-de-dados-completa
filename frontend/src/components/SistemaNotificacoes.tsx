import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Notifications } from '@mui/icons-material';

const SistemaNotificacoes: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        <Notifications sx={{ mr: 2 }} />
        Sistema de Notificações
      </Typography>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Central de Notificações
        </Typography>
        <Typography>
          Sistema de notificações em tempo real para acompanhar análises, alertas e atualizações do sistema.
        </Typography>
      </Paper>
    </Box>
  );
};

export default SistemaNotificacoes;
