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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Alert,
  Stack,
  CircularProgress,
  Divider,
  Tabs,
  Tab
} from '@mui/material';
import {
  Speed,
  Memory,
  Storage,
  NetworkCheck,
  Refresh,
  TrendingUp,
  TrendingDown,
  PlayArrow,
  Pause,
  Warning,
  CheckCircle,
  Error,
  Timeline,
  Analytics,
  CloudSync
} from '@mui/icons-material';
import MetricasPerformanceAvancadas from './MetricasPerformanceAvancadas';

interface MetricaTempoReal {
  nome: string;
  valor: number;
  unidade: string;
  status: 'normal' | 'warning' | 'critical';
  tendencia: 'up' | 'down' | 'stable';
  historico: number[];
  limite?: number;
  icon: React.ReactNode;
}

interface StatusAPI {
  nome: string;
  url: string;
  status: 'online' | 'offline' | 'slow';
  tempoResposta: number;
  ultimaVerificacao: Date;
  uptime: number;
  erros24h: number;
}

const MonitoramentoTempoReal: React.FC = () => {
  const [metricas, setMetricas] = useState<MetricaTempoReal[]>([]);
  const [apisStatus, setApisStatus] = useState<StatusAPI[]>([]);
  const [monitorandoAtivo, setMonitorandoAtivo] = useState(true);
  const [carregando, setCarregando] = useState(true);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState<Date>(new Date());
  const [tabAtual, setTabAtual] = useState(0);

  // Inicializar dados
  useEffect(() => {
    const inicializarMetricas = () => {
      const metricasIniciais: MetricaTempoReal[] = [
        {
          nome: 'CPU',
          valor: 45,
          unidade: '%',
          status: 'normal',
          tendencia: 'stable',
          historico: [40, 42, 45, 43, 45, 47, 45],
          limite: 80,
          icon: <Speed />
        },
        {
          nome: 'Memória RAM',
          valor: 68,
          unidade: '%',
          status: 'normal',
          tendencia: 'up',
          historico: [60, 62, 65, 67, 68, 70, 68],
          limite: 85,
          icon: <Memory />
        },
        {
          nome: 'Disco',
          valor: 52,
          unidade: '%',
          status: 'normal',
          tendencia: 'stable',
          historico: [50, 51, 52, 52, 52, 53, 52],
          limite: 90,
          icon: <Storage />
        },
        {
          nome: 'Rede',
          valor: 12.5,
          unidade: 'Mbps',
          status: 'normal',
          tendencia: 'down',
          historico: [15, 14, 13.5, 13, 12.8, 12.6, 12.5],
          limite: 100,
          icon: <NetworkCheck />
        },
        {
          nome: 'Requisições/min',
          valor: 847,
          unidade: 'req/min',
          status: 'normal',
          tendencia: 'up',
          historico: [800, 820, 830, 835, 840, 845, 847],
          limite: 1000,
          icon: <Analytics />
        },
        {
          nome: 'APIs Ativas',
          valor: 24,
          unidade: 'APIs',
          status: 'normal',
          tendencia: 'stable',
          historico: [22, 23, 24, 24, 24, 24, 24],
          limite: 30,
          icon: <CloudSync />
        }
      ];

      const apisIniciais: StatusAPI[] = [
        {
          nome: 'IBGE - Localidades',
          url: 'https://servicodados.ibge.gov.br/api/v1/localidades',
          status: 'online',
          tempoResposta: 120,
          ultimaVerificacao: new Date(),
          uptime: 99.8,
          erros24h: 2
        },
        {
          nome: 'Banco Central',
          url: 'https://api.bcb.gov.br',
          status: 'online',
          tempoResposta: 250,
          ultimaVerificacao: new Date(),
          uptime: 99.5,
          erros24h: 5
        },
        {
          nome: 'ViaCEP',
          url: 'https://viacep.com.br/ws',
          status: 'online',
          tempoResposta: 80,
          ultimaVerificacao: new Date(),
          uptime: 99.9,
          erros24h: 1
        },
        {
          nome: 'Dados SC',
          url: 'https://dados.sc.gov.br/api',
          status: 'slow',
          tempoResposta: 850,
          ultimaVerificacao: new Date(),
          uptime: 97.2,
          erros24h: 12
        },
        {
          nome: 'Portal Transparência',
          url: 'https://portaldatransparencia.gov.br/api',
          status: 'offline',
          tempoResposta: 0,
          ultimaVerificacao: new Date(),
          uptime: 95.1,
          erros24h: 25
        }
      ];

      setMetricas(metricasIniciais);
      setApisStatus(apisIniciais);
      setCarregando(false);
    };

    inicializarMetricas();
  }, []);

  // Atualização automática
  useEffect(() => {
    if (!monitorandoAtivo) return;

    const interval = setInterval(() => {
      setMetricas(prev => prev.map(metrica => {
        // Simular variação dos dados
        let novoValor = metrica.valor;
        const variacao = (Math.random() - 0.5) * 10; // -5 a +5
        
        if (metrica.nome === 'CPU') {
          novoValor = Math.max(20, Math.min(90, metrica.valor + variacao));
        } else if (metrica.nome === 'Memória RAM') {
          novoValor = Math.max(30, Math.min(95, metrica.valor + variacao * 0.5));
        } else if (metrica.nome === 'Disco') {
          novoValor = Math.max(40, Math.min(95, metrica.valor + variacao * 0.2));
        } else if (metrica.nome === 'Rede') {
          novoValor = Math.max(5, Math.min(50, metrica.valor + variacao * 0.8));
        } else if (metrica.nome === 'Requisições/min') {
          novoValor = Math.max(500, Math.min(1200, metrica.valor + variacao * 5));
        } else if (metrica.nome === 'APIs Ativas') {
          novoValor = Math.max(20, Math.min(30, metrica.valor + Math.floor(variacao * 0.1)));
        }

        // Determinar status
        let status: 'normal' | 'warning' | 'critical' = 'normal';
        if (metrica.limite) {
          if (novoValor > metrica.limite * 0.9) status = 'critical';
          else if (novoValor > metrica.limite * 0.7) status = 'warning';
        }

        // Determinar tendência
        const anterior = metrica.valor;
        let tendencia: 'up' | 'down' | 'stable' = 'stable';
        if (novoValor > anterior + 1) tendencia = 'up';
        else if (novoValor < anterior - 1) tendencia = 'down';

        // Atualizar histórico
        const novoHistorico = [...metrica.historico.slice(1), novoValor];

        return {
          ...metrica,
          valor: parseFloat(novoValor.toFixed(1)),
          status,
          tendencia,
          historico: novoHistorico
        };
      }));

      setUltimaAtualizacao(new Date());
    }, 3000); // Atualizar a cada 3 segundos

    return () => clearInterval(interval);
  }, [monitorandoAtivo]);

  const toggleMonitoramento = () => {
    setMonitorandoAtivo(!monitorandoAtivo);
  };

  const atualizarManual = () => {
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      setUltimaAtualizacao(new Date());
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'success';
      case 'warning': return 'warning';
      case 'critical': return 'error';
      case 'online': return 'success';
      case 'slow': return 'warning';
      case 'offline': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal':
      case 'online': return <CheckCircle color="success" />;
      case 'warning':
      case 'slow': return <Warning color="warning" />;
      case 'critical':
      case 'offline': return <Error color="error" />;
      default: return <CheckCircle />;
    }
  };

  const getTendenciaIcon = (tendencia: string) => {
    switch (tendencia) {
      case 'up': return <TrendingUp color="success" />;
      case 'down': return <TrendingDown color="error" />;
      case 'stable': return <Timeline color="info" />;
      default: return <Timeline />;
    }
  };

  if (carregando) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Carregando métricas...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Monitoramento em Tempo Real
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body2" color="textSecondary">
            Última atualização: {ultimaAtualizacao.toLocaleTimeString()}
          </Typography>
          <Button
            variant="outlined"
            onClick={atualizarManual}
            startIcon={<Refresh />}
            disabled={carregando}
          >
            Atualizar
          </Button>
          <Button
            variant={monitorandoAtivo ? "contained" : "outlined"}
            onClick={toggleMonitoramento}
            startIcon={monitorandoAtivo ? <Pause /> : <PlayArrow />}
            color={monitorandoAtivo ? "error" : "success"}
          >
            {monitorandoAtivo ? 'Pausar' : 'Iniciar'}
          </Button>
        </Stack>
      </Box>

      {/* Alertas */}
      {metricas.some(m => m.status === 'critical') && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography fontWeight="bold">Alerta Crítico!</Typography>
          Algumas métricas estão em níveis críticos. Verifique imediatamente.
        </Alert>
      )}

      {/* Abas de Monitoramento */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabAtual} onChange={(_, newValue) => setTabAtual(newValue)}>
          <Tab label="Sistema" icon={<Speed />} />
          <Tab label="Performance" icon={<Analytics />} />
          <Tab label="APIs" icon={<CloudSync />} />
        </Tabs>
      </Box>

      {/* Conteúdo das Abas */}
      {tabAtual === 0 && (
        <>
          {/* Métricas em Cards */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            {metricas.map((metrica, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {metrica.icon}
                    <Typography variant="subtitle1" fontWeight="bold">
                      {metrica.nome}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1}>
                    {getTendenciaIcon(metrica.tendencia)}
                    <Chip
                      label={metrica.status}
                      color={getStatusColor(metrica.status) as any}
                      size="small"
                    />
                  </Stack>
                </Box>

                <Typography variant="h3" fontWeight="bold" color={
                  metrica.status === 'critical' ? 'error.main' :
                  metrica.status === 'warning' ? 'warning.main' : 'primary.main'
                }>
                  {metrica.valor} {metrica.unidade}
                </Typography>

                {metrica.limite && (
                  <Box sx={{ mt: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={(metrica.valor / metrica.limite) * 100}
                      color={
                        metrica.status === 'critical' ? 'error' :
                        metrica.status === 'warning' ? 'warning' : 'primary'
                      }
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                    <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5, display: 'block' }}>
                      Limite: {metrica.limite} {metrica.unidade}
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Status das APIs */}
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Status das APIs Externas
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>API</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Tempo Resposta</TableCell>
                  <TableCell>Uptime</TableCell>
                  <TableCell>Erros 24h</TableCell>
                  <TableCell>Última Verificação</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {apisStatus.map((api, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getStatusIcon(api.status)}
                        <Box>
                          <Typography variant="body2" fontWeight="bold">
                            {api.nome}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {api.url}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={api.status}
                        color={getStatusColor(api.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {api.status === 'offline' ? '-' : `${api.tempoResposta}ms`}
                    </TableCell>
                    <TableCell>{api.uptime}%</TableCell>
                    <TableCell>
                      <Chip
                        label={api.erros24h}
                        color={api.erros24h > 10 ? 'error' : api.erros24h > 5 ? 'warning' : 'success'}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption">
                        {api.ultimaVerificacao.toLocaleTimeString()}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      </>
      )}

      {/* Aba Performance */}
      {tabAtual === 1 && (
        <MetricasPerformanceAvancadas />
      )}

      {/* Aba APIs - pode ser implementada futuramente */}
      {tabAtual === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h6">Monitoramento de APIs</Typography>
            <Typography variant="body2" color="text.secondary">
              Funcionalidade em desenvolvimento...
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default MonitoramentoTempoReal;
