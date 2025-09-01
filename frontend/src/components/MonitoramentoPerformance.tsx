import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Button,
  IconButton,
  Tooltip,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Speed,
  Memory,
  Storage,
  NetworkCheck,
  BugReport,
  Security,
  Timeline,
  Refresh,
  TrendingUp,
  TrendingDown,
  Warning,
  CheckCircle,
  Error,
  Info,
  Analytics,
  MonitorHeart,
  Dashboard,
  Assessment
} from '@mui/icons-material';
import Plot from 'react-plotly.js';

interface MetricaPerformance {
  nome: string;
  valor: number;
  limite: number;
  unidade: string;
  status: 'ok' | 'warning' | 'error';
  tendencia: 'up' | 'down' | 'stable';
  historico: { timestamp: Date; valor: number }[];
}

interface LogSistema {
  id: string;
  timestamp: Date;
  nivel: 'info' | 'warning' | 'error';
  componente: string;
  mensagem: string;
  detalhes?: any;
}

interface StatusServico {
  nome: string;
  status: 'online' | 'offline' | 'degraded';
  ultimaVerificacao: Date;
  tempoResposta: number;
  disponibilidade: number;
}

const MonitoramentoPerformance: React.FC = () => {
  const [metricas, setMetricas] = useState<MetricaPerformance[]>([]);
  const [logs, setLogs] = useState<LogSistema[]>([]);
  const [servicos, setServicos] = useState<StatusServico[]>([]);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [intervaloRefresh, setIntervaloRefresh] = useState(30);
  const [filtroLogs, setFiltroLogs] = useState<'all' | 'info' | 'warning' | 'error'>('all');

  // Gerar dados simulados
  useEffect(() => {
    const gerarMetricas = (): MetricaPerformance[] => {
      return [
        {
          nome: 'CPU Usage',
          valor: Math.random() * 100,
          limite: 80,
          unidade: '%',
          status: Math.random() > 0.8 ? 'warning' : 'ok',
          tendencia: Math.random() > 0.5 ? 'up' : 'down',
          historico: Array.from({ length: 20 }, (_, i) => ({
            timestamp: new Date(Date.now() - (19 - i) * 60000),
            valor: Math.random() * 100
          }))
        },
        {
          nome: 'Memory Usage',
          valor: Math.random() * 100,
          limite: 85,
          unidade: '%',
          status: Math.random() > 0.7 ? 'error' : 'ok',
          tendencia: Math.random() > 0.5 ? 'stable' : 'up',
          historico: Array.from({ length: 20 }, (_, i) => ({
            timestamp: new Date(Date.now() - (19 - i) * 60000),
            valor: Math.random() * 100
          }))
        },
        {
          nome: 'Disk Usage',
          valor: Math.random() * 100,
          limite: 90,
          unidade: '%',
          status: 'ok',
          tendencia: 'stable',
          historico: Array.from({ length: 20 }, (_, i) => ({
            timestamp: new Date(Date.now() - (19 - i) * 60000),
            valor: Math.random() * 100
          }))
        },
        {
          nome: 'Network Latency',
          valor: Math.random() * 500,
          limite: 200,
          unidade: 'ms',
          status: Math.random() > 0.9 ? 'warning' : 'ok',
          tendencia: 'down',
          historico: Array.from({ length: 20 }, (_, i) => ({
            timestamp: new Date(Date.now() - (19 - i) * 60000),
            valor: Math.random() * 500
          }))
        },
        {
          nome: 'Active Users',
          valor: Math.floor(Math.random() * 1000),
          limite: 500,
          unidade: 'users',
          status: 'ok',
          tendencia: 'up',
          historico: Array.from({ length: 20 }, (_, i) => ({
            timestamp: new Date(Date.now() - (19 - i) * 60000),
            valor: Math.floor(Math.random() * 1000)
          }))
        },
        {
          nome: 'API Requests/min',
          valor: Math.floor(Math.random() * 10000),
          limite: 5000,
          unidade: 'req/min',
          status: Math.random() > 0.8 ? 'warning' : 'ok',
          tendencia: 'up',
          historico: Array.from({ length: 20 }, (_, i) => ({
            timestamp: new Date(Date.now() - (19 - i) * 60000),
            valor: Math.floor(Math.random() * 10000)
          }))
        }
      ];
    };

    const gerarLogs = (): LogSistema[] => {
      const componentes = ['API', 'Database', 'Frontend', 'Auth', 'Cache', 'ML Engine'];
      const mensagens = {
        info: ['Sistema iniciado', 'Backup concluído', 'Cache atualizado', 'Usuário logado'],
        warning: ['Memória alta', 'Cache expirado', 'Conexão lenta', 'Limite atingido'],
        error: ['Falha na conexão', 'Erro no processo', 'Timeout na API', 'Falha na autenticação']
      };

      return Array.from({ length: 50 }, (_, i) => {
        const nivel = Math.random() > 0.8 ? 'error' : Math.random() > 0.6 ? 'warning' : 'info';
        const componente = componentes[Math.floor(Math.random() * componentes.length)];
        const mensagensPorNivel = mensagens[nivel];
        const mensagem = mensagensPorNivel[Math.floor(Math.random() * mensagensPorNivel.length)];

        return {
          id: `log-${i}`,
          timestamp: new Date(Date.now() - i * 60000),
          nivel,
          componente,
          mensagem,
          detalhes: nivel === 'error' ? { stack: 'Error stack trace...', code: 500 } : undefined
        };
      });
    };

    const gerarServicos = (): StatusServico[] => {
      return [
        {
          nome: 'API Principal',
          status: Math.random() > 0.9 ? 'offline' : 'online',
          ultimaVerificacao: new Date(),
          tempoResposta: Math.random() * 500,
          disponibilidade: 95 + Math.random() * 5
        },
        {
          nome: 'Banco de Dados',
          status: Math.random() > 0.95 ? 'degraded' : 'online',
          ultimaVerificacao: new Date(),
          tempoResposta: Math.random() * 200,
          disponibilidade: 98 + Math.random() * 2
        },
        {
          nome: 'Cache Redis',
          status: 'online',
          ultimaVerificacao: new Date(),
          tempoResposta: Math.random() * 50,
          disponibilidade: 99 + Math.random() * 1
        },
        {
          nome: 'ML Engine',
          status: Math.random() > 0.85 ? 'degraded' : 'online',
          ultimaVerificacao: new Date(),
          tempoResposta: Math.random() * 1000,
          disponibilidade: 92 + Math.random() * 8
        }
      ];
    };

    setMetricas(gerarMetricas());
    setLogs(gerarLogs());
    setServicos(gerarServicos());
  }, []);

  // Auto refresh
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setMetricas(prev => prev.map(metrica => ({
        ...metrica,
        valor: Math.random() * (metrica.nome === 'Active Users' || metrica.nome === 'API Requests/min' ? 1000 : 100),
        status: Math.random() > 0.8 ? 'warning' : Math.random() > 0.95 ? 'error' : 'ok'
      })));
    }, intervaloRefresh * 1000);

    return () => clearInterval(interval);
  }, [autoRefresh, intervaloRefresh]);

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
        return <Info />;
    }
  };

  const getTendenciaIcon = (tendencia: string) => {
    switch (tendencia) {
      case 'up':
        return <TrendingUp color="error" />;
      case 'down':
        return <TrendingDown color="success" />;
      default:
        return <Timeline color="primary" />;
    }
  };

  const filtrarLogs = () => {
    if (filtroLogs === 'all') return logs;
    return logs.filter(log => log.nivel === filtroLogs);
  };

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
          <FormControl size="small">
            <InputLabel>Intervalo</InputLabel>
            <Select
              value={intervaloRefresh}
              onChange={(e) => setIntervaloRefresh(e.target.value as number)}
              label="Intervalo"
            >
              <MenuItem value={10}>10s</MenuItem>
              <MenuItem value={30}>30s</MenuItem>
              <MenuItem value={60}>1min</MenuItem>
              <MenuItem value={300}>5min</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={() => window.location.reload()}
          >
            Atualizar
          </Button>
        </Box>
      </Box>

      {/* Status dos Serviços */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
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
                  Resposta: {servico.tempoResposta.toFixed(0)}ms
                </Typography>
                <Typography variant="body2">
                  Uptime: {servico.disponibilidade.toFixed(1)}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Métricas de Performance */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {metricas.map((metrica) => (
          <Grid item xs={12} sm={6} md={4} key={metrica.nome}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">{metrica.nome}</Typography>
                  <Tooltip title={`Tendência: ${metrica.tendencia}`}>
                    {getTendenciaIcon(metrica.tendencia)}
                  </Tooltip>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h4" sx={{ mr: 1 }}>
                    {metrica.valor.toFixed(metrica.nome.includes('Users') || metrica.nome.includes('API') ? 0 : 1)}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {metrica.unidade}
                  </Typography>
                  <Chip
                    label={metrica.status}
                    color={getStatusColor(metrica.status) as any}
                    size="small"
                    sx={{ ml: 'auto' }}
                  />
                </Box>

                <LinearProgress
                  variant="determinate"
                  value={(metrica.valor / metrica.limite) * 100}
                  color={metrica.valor > metrica.limite ? 'error' : 'primary'}
                  sx={{ mb: 1 }}
                />

                <Typography variant="caption" color="textSecondary">
                  Limite: {metrica.limite} {metrica.unidade}
                </Typography>

                {/* Mini gráfico */}
                <Box sx={{ mt: 2, height: 100 }}>
                  <Plot
                    data={[
                      {
                        x: metrica.historico.map(h => h.timestamp),
                        y: metrica.historico.map(h => h.valor),
                        type: 'scatter',
                        mode: 'lines',
                        line: { color: metrica.status === 'error' ? '#f44336' : metrica.status === 'warning' ? '#ff9800' : '#4caf50' },
                        name: metrica.nome
                      }
                    ]}
                    layout={{
                      width: 300,
                      height: 80,
                      margin: { l: 0, r: 0, t: 0, b: 0 },
                      showlegend: false,
                      xaxis: { visible: false },
                      yaxis: { visible: false }
                    }}
                    config={{ displayModeBar: false }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Logs do Sistema */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              <BugReport sx={{ mr: 1, verticalAlign: 'middle' }} />
              Logs do Sistema
            </Typography>
            <FormControl size="small">
              <InputLabel>Filtro</InputLabel>
              <Select
                value={filtroLogs}
                onChange={(e) => setFiltroLogs(e.target.value as any)}
                label="Filtro"
              >
                <MenuItem value="all">Todos</MenuItem>
                <MenuItem value="info">Info</MenuItem>
                <MenuItem value="warning">Warning</MenuItem>
                <MenuItem value="error">Error</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TableContainer sx={{ maxHeight: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>Nível</TableCell>
                  <TableCell>Componente</TableCell>
                  <TableCell>Mensagem</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtrarLogs().slice(0, 20).map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      {log.timestamp.toLocaleTimeString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={log.nivel}
                        color={getStatusColor(log.nivel) as any}
                        size="small"
                        icon={getStatusIcon(log.nivel)}
                      />
                    </TableCell>
                    <TableCell>{log.componente}</TableCell>
                    <TableCell>{log.mensagem}</TableCell>
                    <TableCell>
                      {log.detalhes && (
                        <Tooltip title="Ver detalhes">
                          <IconButton size="small">
                            <Info />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Alertas do Sistema */}
      <Box sx={{ mt: 3 }}>
        {metricas.some(m => m.status === 'error') && (
          <Alert severity="error" sx={{ mb: 1 }}>
            <strong>Alerta Crítico:</strong> Algumas métricas estão em estado crítico. Intervenção necessária.
          </Alert>
        )}
        {metricas.some(m => m.status === 'warning') && (
          <Alert severity="warning" sx={{ mb: 1 }}>
            <strong>Atenção:</strong> Algumas métricas estão próximas dos limites. Monitoramento recomendado.
          </Alert>
        )}
        {servicos.some(s => s.status === 'offline') && (
          <Alert severity="error">
            <strong>Serviços Offline:</strong> Um ou mais serviços críticos estão indisponíveis.
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default MonitoramentoPerformance;
