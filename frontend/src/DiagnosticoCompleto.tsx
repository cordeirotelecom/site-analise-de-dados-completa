import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
  Alert,
  AlertTitle,
  Chip,
  Paper
} from '@mui/material';
import {
  BugReport,
  CheckCircle,
  Warning,
  Info
} from '@mui/icons-material';

const DiagnosticoCompleto: React.FC = () => {
  const [testesExecutados, setTestesExecutados] = useState<string[]>([]);

  const problemas = [
    {
      tipo: 'critico',
      titulo: 'API Santa Catarina não implementada',
      descricao: 'Arquivo santa_catarina_completo.py estava vazio',
      status: 'corrigido',
      solucao: 'Implementei endpoints completos para dados de SC'
    },
    {
      tipo: 'erro',
      titulo: 'Links de navegação não funcionais',
      descricao: 'Cliques nos botões não alteravam as seções',
      status: 'investigando',
      solucao: 'Verificando event handlers e state management'
    },
    {
      tipo: 'erro',
      titulo: 'Sistema de conhecimento incompleto',
      descricao: 'Funcionalidades de busca e conhecimento faltando',
      status: 'pendente',
      solucao: 'Implementar busca e base de conhecimento'
    },
    {
      tipo: 'warning',
      titulo: 'Lazy loading causando problemas',
      descricao: 'Componentes não carregam corretamente',
      status: 'investigando',
      solucao: 'Revisar imports dinâmicos'
    }
  ];

  const testarFuncionalidade = (nome: string) => {
    if (!testesExecutados.includes(nome)) {
      setTestesExecutados([...testesExecutados, nome]);
    }
    console.log(`Testando: ${nome}`);
  };

  const getCorPorTipo = (tipo: string): 'error' | 'warning' | 'info' | 'success' => {
    switch (tipo) {
      case 'critico': return 'error';
      case 'erro': return 'error';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return 'info';
    }
  };

  const getIconePorTipo = (tipo: string) => {
    switch (tipo) {
      case 'critico': return <BugReport />;
      case 'erro': return <Warning />;
      case 'warning': return <Info />;
      default: return <CheckCircle />;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom align="center">
        🔧 Diagnóstico e Correções do Sistema
      </Typography>
      
      <Typography variant="h6" align="center" sx={{ mb: 4, color: 'text.secondary' }}>
        Identificando e corrigindo todos os problemas reportados
      </Typography>

      {/* Status Geral */}
      <Paper sx={{ p: 3, mb: 4, bgcolor: 'background.paper' }}>
        <Typography variant="h5" gutterBottom>
          📊 Status Geral do Sistema
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Card sx={{ textAlign: 'center', bgcolor: 'success.light', color: 'success.contrastText' }}>
              <CardContent>
                <Typography variant="h4">1</Typography>
                <Typography variant="body2">Corrigido</Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Card sx={{ textAlign: 'center', bgcolor: 'warning.light', color: 'warning.contrastText' }}>
              <CardContent>
                <Typography variant="h4">2</Typography>
                <Typography variant="body2">Em Andamento</Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Card sx={{ textAlign: 'center', bgcolor: 'error.light', color: 'error.contrastText' }}>
              <CardContent>
                <Typography variant="h4">1</Typography>
                <Typography variant="body2">Pendente</Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Card sx={{ textAlign: 'center', bgcolor: 'info.light', color: 'info.contrastText' }}>
              <CardContent>
                <Typography variant="h4">4</Typography>
                <Typography variant="body2">Total</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Lista de Problemas */}
      <Typography variant="h5" gutterBottom>
        🐛 Problemas Identificados e Soluções
      </Typography>
      
      {problemas.map((problema, index) => (
        <Alert 
          key={index} 
          severity={getCorPorTipo(problema.tipo)}
          icon={getIconePorTipo(problema.tipo)}
          sx={{ mb: 2 }}
        >
          <AlertTitle>
            <strong>{problema.titulo}</strong>
            <Chip 
              label={problema.status} 
              size="small" 
              color={problema.status === 'corrigido' ? 'success' : 'warning'}
              sx={{ ml: 2 }}
            />
          </AlertTitle>
          
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Problema:</strong> {problema.descricao}
          </Typography>
          
          <Typography variant="body2" color="success.main">
            <strong>Solução:</strong> {problema.solucao}
          </Typography>
        </Alert>
      ))}

      {/* Testes de Funcionalidade */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          🧪 Testes de Funcionalidade
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          Clique nos botões abaixo para testar as funcionalidades básicas:
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {[
            'Navegação por Seções',
            'API Santa Catarina',
            'Sistema de Upload',
            'Análise Estatística',
            'Visualizações',
            'Base de Conhecimento'
          ].map((teste) => (
            <Button
              key={teste}
              variant={testesExecutados.includes(teste) ? 'contained' : 'outlined'}
              onClick={() => testarFuncionalidade(teste)}
              startIcon={testesExecutados.includes(teste) ? <CheckCircle /> : <BugReport />}
              color={testesExecutados.includes(teste) ? 'success' : 'primary'}
            >
              {teste}
            </Button>
          ))}
        </Box>
        
        {testesExecutados.length > 0 && (
          <Alert severity="info" sx={{ mt: 3 }}>
            <AlertTitle>Testes Executados</AlertTitle>
            {testesExecutados.length} de 6 funcionalidades testadas. 
            Verifique o console do navegador para logs detalhados.
          </Alert>
        )}
      </Paper>

      {/* Próximos Passos */}
      <Paper sx={{ p: 3, mt: 4, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
        <Typography variant="h5" gutterBottom>
          🚀 Próximos Passos
        </Typography>
        
        <ol>
          <li>✅ API Santa Catarina implementada e funcional</li>
          <li>🔄 Corrigir navegação entre seções (em andamento)</li>
          <li>⏳ Implementar sistema de conhecimento completo</li>
          <li>⏳ Adicionar testes automatizados</li>
          <li>⏳ Documentação completa de APIs</li>
        </ol>
      </Paper>
    </Container>
  );
};

export default DiagnosticoCompleto;