import { useState } from 'react';
import { Box, Typography, Container, AppBar, Toolbar, Button, Card, CardContent } from '@mui/material';

const AppSimples = () => {
  const [teste, setTeste] = useState('Funcionando!');

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">DataScience Pro - TESTE FUNCIONANDO</Typography>
        </Toolbar>
      </AppBar>
      
      <Container sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h3" gutterBottom>
              🎉 Site Funcionando: {teste}
            </Typography>
            <Typography variant="body1" paragraph>
              Se você está vendo isto, o React está funcionando corretamente!
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => setTeste('Clique detectado!')}
              size="large"
            >
              Testar Interatividade
            </Button>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default AppSimples;
