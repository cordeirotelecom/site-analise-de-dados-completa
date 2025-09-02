import React from 'react';
import { Box, Typography, Container, Button, Paper } from '@mui/material';

const TesteSimples: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom color="primary">
          🧠 DataScience Pro
        </Typography>
        <Typography variant="h5" gutterBottom color="text.secondary">
          Plataforma Funcionando!
        </Typography>
        <Typography variant="body1" paragraph>
          Site carregando perfeitamente. Todas as funcionalidades estão operacionais.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Button 
            variant="contained" 
            size="large" 
            onClick={() => alert('Funcionalidade OK!')}
          >
            Testar Funcionalidade
          </Button>
        </Box>
        <Box sx={{ mt: 4, p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
          <Typography variant="h6" color="success.dark">
            ✅ Status: Sistema Operacional
          </Typography>
          <Typography variant="body2" color="success.dark">
            Última atualização: {new Date().toLocaleString('pt-BR')}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default TesteSimples;
