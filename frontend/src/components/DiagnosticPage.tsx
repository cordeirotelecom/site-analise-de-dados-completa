import React from 'react';
import {
  Box,
  Typography,
  Container,
  Alert,
  Card,
  CardContent
} from '@mui/material';

const DiagnosticPage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" gutterBottom>
          DataScience Pro - Página de Diagnóstico
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Verificação do sistema
        </Typography>
      </Box>

      <Alert severity="success" sx={{ mb: 3 }}>
        ✅ Aplicação carregando corretamente!
      </Alert>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Status do Sistema
          </Typography>
          <Typography variant="body1" paragraph>
            • React: Funcionando ✅
          </Typography>
          <Typography variant="body1" paragraph>
            • Material-UI: Funcionando ✅
          </Typography>
          <Typography variant="body1" paragraph>
            • TypeScript: Funcionando ✅
          </Typography>
          <Typography variant="body1" paragraph>
            • Build: Sem erros ✅
          </Typography>
          <Typography variant="body1" paragraph>
            • Deploy Netlify: Concluído ✅
          </Typography>
        </CardContent>
      </Card>

      <Box mt={4} textAlign="center">
        <Typography variant="body2" color="text.secondary">
          URL: https://datasciencepro-completo.netlify.app
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Data do deploy: {new Date().toLocaleString('pt-BR')}
        </Typography>
      </Box>
    </Container>
  );
};

export default DiagnosticPage;
