import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  Chip,
  Button,
  Alert,
  FormControlLabel,
  Switch
} from '@mui/material';
import {
  MonitorHeart,
  CheckCircle,
  Warning,
  Error,
  Refresh
} from '@mui/icons-material';

interface Metrica {
  nome: string;
  valor: number;
  limite: number;
  unidade: string;
  status: 'ok' | 'warning' | 'error';
}

interface Servico {
  nome: string;
  status: 'online' | 'offline' | 'degraded';
  tempoResposta: number;
  disponibilidade: number;
}

const MonitoramentoSimples: React.FC = () => {
  const [metricas, setMetricas] = useState<Metrica[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [autoRefresh, setAutoRefresh] = useState(false);

  useEffect(() => {
    // Dados iniciais simulados
    const metricasIniciais: Metrica[] = [
      {
        nome: 'CPU Usage',
        valor: 45,
        limite: 80,
        unidade: '%',
        status: 'ok'
      },
      {
        nome: 'Memory Usage',
        valor: 62,
        limite: 85,
        unidade: '%',
        status: 'ok'
      },
      {
        nome: 'Disk Usage',
        valor: 78,
        limite: 90,
        unidade: '%',
        status: 'ok'
      },
      {
        nome: 'Network Latency',
        valor: 45,
        limite: 200,
        unidade: 'ms',
        status: 'ok'
      },
      {
        nome: 'Active Users',
        valor: 234,
        limite: 500,
        unidade: 'users',
        status: 'ok'
      },
      {
        nome: 'API Requests/min',
        valor: 1245,
        limite: 5000,
        unidade: 'req/min',
        status: 'ok'
      }
    ];

    const servicosIniciais: Servico[] = [
      {
        nome: 'API Principal',
        status: 'online',
        tempoResposta: 120,
        disponibilidade: 99.9
      },
      {
        nome: 'Banco de Dados',
        status: 'online',
        tempoResposta: 85,
        disponibilidade: 99.8
      },
      {
        nome: 'Cache Redis',
        status: 'online',
        tempoResposta: 15,
        disponibilidade: 99.9
      },
      {
        nome: 'ML Engine',
        status: 'degraded',
        tempoResposta: 450,
        disponibilidade: 95.2
      }
    ];

    setMetricas(metricasIniciais);
    setServicos(servicosIniciais);
  }, []);

  // Auto refresh simplificado
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setMetricas(prev => prev.map(metrica => ({
        ...metrica,
        valor: Math.max(0, metrica.valor + (Math.random() - 0.5) * 10),
        status: metrica.valor > metrica.limite * 0.9 ? 'warning' : 
                metrica.valor > metrica.limite ? 'error' : 'ok'
      })));
    }, 5000); // Atualiza a cada 5 segundos

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const atualizarDados = () => {
    setMetricas(prev => prev.map(metrica => ({
      ...metrica,
      valor: Math.random() * metrica.limite * 1.2,
      status: Math.random() > 0.8 ? 'warning' : Math.random() > 0.95 ? 'error' : 'ok'
    })));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ok':
      case 'online':
        return 'success';
      case 'warning':
      case 'degraded':
        return 'warning';
      case 'error':
      case 'offline':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ok':
      case 'online':
        return <CheckCircle />;
      case 'warning':
      case 'degraded':
        return <Warning />;
      case 'error':
      case 'offline':
        return <Error />;
      default:
        return <CheckCircle />;
    }
  };

  const temAlertas = metricas.some(m => m.status === 'error' || m.status === 'warning') ||
                    servicos.some(s => s.status === 'offline' || s.status === 'degraded');

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          <MonitorHeart sx={{ mr: 1, verticalAlign: 'middle' }} />
          Monitoramento do Sistema
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FormControlLabel
            control={
              <Switch
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
              />
            }
            label="Auto Refresh"
          />
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={atualizarDados}
          >
            Atualizar
          </Button>
        </Box>
      </Box>

      {/* Alertas */}
      {temAlertas && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          Alguns serviços requerem atenção. Verifique os status abaixo.
        </Alert>
      )}

      {/* Status dos Serviços */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Status dos Serviços
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {servicos.map((servico) => (
          <Grid item xs={12} sm={6} md={3} key={servico.nome}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                  {getStatusIcon(servico.status)}
                </Box>
                <Typography variant="h6">{servico.nome}</Typography>
                <Chip
                  label={servico.status}
                  color={getStatusColor(servico.status) as any}
                  size="small"
                  sx={{ mb: 1 }}
                />
                <Typography variant="body2">
                  Resposta: {servico.tempoResposta}ms
                </Typography>
                <Typography variant="body2">
                  Uptime: {servico.disponibilidade}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Métricas de Performance */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Métricas de Performance
      </Typography>
      <Grid container spacing={3}>
        {metricas.map((metrica) => (
          <Grid item xs={12} sm={6} md={4} key={metrica.nome}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">{metrica.nome}</Typography>
                  <Chip
                    label={metrica.status}
                    color={getStatusColor(metrica.status) as any}
                    size="small"
                  />
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h4" sx={{ mr: 1 }}>
                    {metrica.nome.includes('Users') || metrica.nome.includes('API') 
                      ? Math.round(metrica.valor) 
                      : metrica.valor.toFixed(1)}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {metrica.unidade}
                  </Typography>
                </Box>

                <LinearProgress
                  variant="determinate"
                  value={Math.min((metrica.valor / metrica.limite) * 100, 100)}
                  color={metrica.valor > metrica.limite ? 'error' : 'primary'}
                  sx={{ mb: 1 }}
                />

                <Typography variant="caption" color="textSecondary">
                  Limite: {metrica.limite} {metrica.unidade}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Estatísticas Gerais */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Resumo do Sistema
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <Typography variant="body2" color="textSecondary">
                Serviços Online
              </Typography>
              <Typography variant="h6">
                {servicos.filter(s => s.status === 'online').length}/{servicos.length}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="body2" color="textSecondary">
                Métricas OK
              </Typography>
              <Typography variant="h6">
                {metricas.filter(m => m.status === 'ok').length}/{metricas.length}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="body2" color="textSecondary">
                Tempo Médio Resposta
              </Typography>
              <Typography variant="h6">
                {Math.round(servicos.reduce((acc, s) => acc + s.tempoResposta, 0) / servicos.length)}ms
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="body2" color="textSecondary">
                Disponibilidade Média
              </Typography>
              <Typography variant="h6">
                {(servicos.reduce((acc, s) => acc + s.disponibilidade, 0) / servicos.length).toFixed(1)}%
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MonitoramentoSimples;
