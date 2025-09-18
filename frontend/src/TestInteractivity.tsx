import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';

const TestInteractivity: React.FC = () => {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('Clique no botão para testar!');

  const handleClick = () => {
    setCount(count + 1);
    setMessage(`Botão clicado ${count + 1} vez(es)!`);
    console.log('Botão funcionando!', count + 1);
  };

  const handleReset = () => {
    setCount(0);
    setMessage('Reset realizado!');
    console.log('Reset funcionando!');
  };

  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Teste de Interatividade
      </Typography>
      
      <Typography variant="h6" sx={{ my: 2 }}>
        {message}
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 3 }}>
        Contador: {count}
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleClick}
          size="large"
        >
          Clique Aqui
        </Button>
        
        <Button 
          variant="outlined" 
          color="secondary" 
          onClick={handleReset}
          size="large"
        >
          Reset
        </Button>
      </Box>
      
      <Typography variant="caption" sx={{ mt: 2, display: 'block' }}>
        Se os botões funcionarem, o problema não está na configuração do React.
      </Typography>
    </Box>
  );
};

export default TestInteractivity;