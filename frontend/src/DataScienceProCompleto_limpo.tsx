import React, { useState, useMemo, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Button,
  Grid,
  Paper,
  Alert,
  Chip,
  useTheme,
  useMediaQuery,
  Switch,
  FormControlLabel,
  CircularProgress,
} from '@mui/material';
import {
  Science,
  Assessment,
  AutoAwesome,
  Functions,
  Api,
} from '@mui/icons-material';

// Importações diretas dos componentes essenciais
import AutoMLRevolucionario from './components/AutoMLFuncional';
import AnalisadorCientificoRevolucionario from './components/AnalisadorCBAFuncional';
import DashboardInterativo from './components/DashboardInterativo';
import ConteudoEducativo from './components/ConteudoEducativo';
import SistemaRelatorios from './components/SistemaRelatorios';
import HadoopHDFS from './components/HadoopHDFS';
import ApacheSpark from './components/ApacheSpark';

const DataScienceProCompleto: React.FC = () => {
  const [secaoAtiva, setSecaoAtiva] = useState('dashboard');
  const [modoAvancado, setModoAvancado] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const secoes = useMemo(() => [
    { id: 'dashboard', nome: 'Dashboard Científico', icon: <Assessment />, status: 'ativo' },
    { id: 'educativo', nome: 'Metodologia Científica', icon: <Science />, status: 'ativo' },
    { id: 'hadoop', nome: 'Hadoop & HDFS', icon: <Functions />, status: 'ativo' },
    { id: 'spark', nome: 'Apache Spark', icon: <AutoAwesome />, status: 'ativo' },
    { id: 'automl', nome: 'AutoML Científico', icon: <Functions />, status: 'ativo' },
    { id: 'analisador', nome: 'Analisador CBA', icon: <AutoAwesome />, status: 'ativo' },
    { id: 'relatorios', nome: 'Relatórios Científicos', icon: <Api />, status: 'ativo' },
    { id: 'santa_catarina', nome: 'Portal Santa Catarina', icon: <Api />, status: 'implementado' },
  ], []);

  const handleSecaoChange = useCallback(async (novaSecao: string) => {
    setCarregando(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    setSecaoAtiva(novaSecao);
    setCarregando(false);
    console.log(`Navegando para: ${novaSecao}`);
  }, []);

  const renderDashboard = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="h6">📊 Sistema de Análise de Dados</Typography>
          <Typography variant="body2">
            Interface web para análise de dados com ferramentas de machine learning e estatística.
          </Typography>
        </Alert>
      </Grid>
      
      {/* Estatísticas */}
      <Grid item xs={12} md={4}>
        <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              🚀 AutoML
            </Typography>
            <Typography variant="h6">Machine Learning Automático</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Treine modelos automaticamente com seus dados
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              🔍 CBA
            </Typography>
            <Typography variant="h6">Descoberta de Regras</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Encontre padrões e regras nos seus dados
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              📈 Dados SC
            </Typography>
            <Typography variant="h6">Santa Catarina</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Dados públicos de Santa Catarina
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Lista de Funcionalidades */}
      <Grid item xs={12}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            🛠️ Seções da Plataforma
          </Typography>
          
          <Grid container spacing={2}>
            {secoes.map((secao) => (
              <Grid item xs={12} sm={6} md={3} key={secao.id}>
                <Card 
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': { transform: 'scale(1.02)' },
                    transition: 'transform 0.2s',
                    border: secaoAtiva === secao.id ? 2 : 0,
                    borderColor: 'primary.main'
                  }}
                  onClick={() => handleSecaoChange(secao.id)}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    {secao.icon}
                    <Typography variant="h6" sx={{ mt: 1 }}>
                      {secao.nome}
                    </Typography>
                    <Chip 
                      label={secao.status} 
                      color={secao.status === 'ativo' ? 'success' : 'primary'}
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );

  const renderSecaoSantaCatarina = () => (
    <Box>
      <Typography variant="h4" gutterBottom>
        🏝️ Dados de Santa Catarina
      </Typography>
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="h6">Portal de Dados Públicos</Typography>
        <Typography variant="body2">
          Acesso a dados públicos e estatísticas oficiais de Santa Catarina.
        </Typography>
      </Alert>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          📊 Datasets Disponíveis:
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">População por Município</Typography>
                <Typography variant="body2">Dados demográficos atualizados</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Indicadores Econômicos</Typography>
                <Typography variant="body2">PIB, emprego e desenvolvimento</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );

  const renderSecaoAtual = () => {
    if (carregando) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ ml: 2 }}>
            Carregando seção...
          </Typography>
        </Box>
      );
    }

    switch (secaoAtiva) {
      case 'dashboard':
        return <DashboardInterativo />;
      case 'educativo':
        return <ConteudoEducativo />;
      case 'hadoop':
        return <HadoopHDFS />;
      case 'spark':
        return <ApacheSpark />;
      case 'automl':
        return <AutoMLRevolucionario />;
      case 'analisador':
        return <AnalisadorCientificoRevolucionario />;
      case 'relatorios':
        return <SistemaRelatorios />;
      case 'santa_catarina':
        return renderSecaoSantaCatarina();
      default:
        return <DashboardInterativo />;
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>
        <Toolbar>
          <Science sx={{ mr: 2, fontSize: { xs: 24, md: 32 } }} />
          <Typography 
            variant={isMobile ? "h6" : "h5"} 
            component="div" 
            sx={{ 
              flexGrow: 1, 
              fontWeight: 'bold',
              fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' }
            }}
          >
            {isMobile ? 'DataScience Pro' : 'DataScience Pro - Plataforma de Análise de Dados'}
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={modoAvancado}
                onChange={(e) => setModoAvancado(e.target.checked)}
                color="default"
              />
            }
            label="Modo Avançado"
            sx={{ color: 'white' }}
          />
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
        {/* Menu de Navegação */}
        <Paper sx={{ p: 2, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            🧭 Navegação Principal
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {secoes.map((secao) => (
              <Button
                key={secao.id}
                variant={secaoAtiva === secao.id ? 'contained' : 'outlined'}
                startIcon={secao.icon}
                onClick={() => handleSecaoChange(secao.id)}
                size={isMobile ? 'small' : 'medium'}
                sx={{ mb: 1 }}
              >
                {isMobile ? secao.nome.split(' ')[0] : secao.nome}
              </Button>
            ))}
          </Box>
        </Paper>

        {/* Conteúdo Principal */}
        <Box sx={{ minHeight: 400 }}>
          {renderSecaoAtual()}
        </Box>
      </Container>
    </Box>
  );
};

export default DataScienceProCompleto;