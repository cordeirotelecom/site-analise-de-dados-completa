import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { Security } from '@mui/icons-material';

const AutenticacaoSimples: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        <Security sx={{ mr: 1, verticalAlign: 'middle' }} />
        Sistema de Autenticação
      </Typography>
      
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Sistema de Login e Registro
          </Typography>
          <Typography variant="body1">
            Sistema completo de autenticação com suporte a múltiplos tipos de usuário,
            controle de permissões e dashboard personalizado.
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
            Funcionalidades:
          </Typography>
          <ul>
            <li>Login e registro de usuários</li>
            <li>Tipos de usuário: Admin, Cientista, Analista, Viewer</li>
            <li>Dashboard com estatísticas</li>
            <li>Gerenciamento de usuários</li>
            <li>Controle de permissões</li>
          </ul>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AutenticacaoSimples;
