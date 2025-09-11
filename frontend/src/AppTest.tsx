import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Card,
  CardContent,
  Grid
} from '@mui/material';

const AppTest = () => {
  const [teste, setTeste] = useState('Dashboard');

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            🔬 DataScience Pro - TESTE
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h4" component="h1" gutterBottom>
                  🎯 Projeto Funcionando!
                </Typography>
                <Typography variant="body1">
                  Esta é uma versão de teste para verificar se o projeto está funcionando corretamente.
                  Seção ativa: {teste}
                </Typography>
                <Button 
                  variant="contained" 
                  onClick={() => setTeste('Teste Clicado')}
                  sx={{ mt: 2 }}
                >
                  Testar Funcionalidade
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AppTest;
