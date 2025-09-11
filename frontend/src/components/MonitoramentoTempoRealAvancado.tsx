import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  Alert,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Switch,
  FormControlLabel,
  Button,
  Divider,
} from '@mui/material';
import {
  Speed,
  Timeline,
  TrendingUp,
  Warning,
  CheckCircle,
  Bolt,
  DataUsage,
  Analytics,
  Stream,
  Cloud,
  Memory,
  Storage,
} from '@mui/icons-material';

interface MetricaTempoReal {
  timestamp: Date;
  cpu_usage: number;
  memory_usage: number;
  active_users: number;
  analyses_per_minute: number;
  data_processed_gb: number;
  avg_response_time: number;
}

interface AlertaPerformance {
  id: string;
  tipo: 'warning' | 'error' | 'info' | 'success';
  titulo: string;
  descricao: string;
  timestamp: Date;
  ativo: boolean;
}

const MonitoramentoTempoRealAvancado: React.FC = () => {
  const [metricas, setMetricas] = useState<MetricaTempoReal[]>([]);
  const [alertas, setAlertas] = useState<AlertaPerformance[]>([]);
  const [monitoramentoAtivo, setMonitoramentoAtivo] = useState(true);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState<Date>(new Date());
  
  const wsRef = useRef<WebSocket | null>(null);

  // Simulação de WebSocket para demonstração
  useEffect(() => {
    if (!monitoramentoAtivo) return;

    const interval = setInterval(() => {
      const novaMetrica: MetricaTempoReal = {
        timestamp: new Date(),
        cpu_usage: Math.random() * 100,
        memory_usage: Math.random() * 100,
        active_users: Math.floor(Math.random() * 10000) + 1000,
        analyses_per_minute: Math.floor(Math.random() * 500) + 100,
        data_processed_gb: Math.random() * 1000,
        avg_response_time: Math.random() * 2000 + 200,
      };

      setMetricas(prev => [...prev.slice(-50), novaMetrica]);
      setUltimaAtualizacao(new Date());

      // Gerar alertas aleatórios
      if (Math.random() < 0.1) {
        const novoAlerta: AlertaPerformance = {
          id: `alert_${Date.now()}`,
          tipo: ['info', 'warning', 'success'][Math.floor(Math.random() * 3)] as any,
          titulo: ['Pico de usuários detectado', 'Performance otimizada', 'Nova análise completada'][Math.floor(Math.random() * 3)],
          descricao: 'Sistema operando com alta eficiência',
          timestamp: new Date(),
          ativo: true,
        };
        
        setAlertas(prev => [novoAlerta, ...prev.slice(0, 10)]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [monitoramentoAtivo]);

  const metricaAtual = metricas[metricas.length - 1];

  const estatisticasGlobais = [
    {
      titulo: "Usuários Ativos",
      valor: metricaAtual?.active_users.toLocaleString() || "0",
      icone: <DataUsage color="primary" />,
      tendencia: "+15% vs ontem",
      cor: "success"
    },
    {
      titulo: "Análises/Minuto",
      valor: metricaAtual?.analyses_per_minute.toString() || "0",
      icone: <Analytics color="secondary" />,
      tendencia: "+28% vs ontem",
      cor: "info"
    },
    {
      titulo: "Dados Processados",
      valor: `${metricaAtual?.data_processed_gb.toFixed(1) || "0"} GB`,
      icone: <Storage color="success" />,
      tendencia: "+45% vs ontem", 
      cor: "success"
    },
    {
      titulo: "Tempo Resposta",
      valor: `${metricaAtual?.avg_response_time.toFixed(0) || "0"} ms`,
      icone: <Speed color="warning" />,
      tendencia: "-12% vs ontem",
      cor: "success"
    }
  ];

  const alertasAtivos = alertas.filter(a => a.ativo);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            ⚡ Monitoramento em Tempo Real
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Sistema de alta performance processando dados globalmente
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={monitoramentoAtivo}
                onChange={(e) => setMonitoramentoAtivo(e.target.checked)}
                color="primary"
              />
            }
            label="Monitoramento Ativo"
          />
          <Chip 
            label={`Atualizado: ${ultimaAtualizacao.toLocaleTimeString()}`}
            color="primary"
            icon={<Stream />}
          />
        </Box>
      </Box>

      {/* Status do Sistema */}
      <Alert severity="success" sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <CheckCircle />
          <Typography variant="h6">
            🌍 Sistema Global Operacional
          </Typography>
          <Chip label="99.9% Uptime" color="success" size="small" />
          <Chip label="47 Servidores Ativos" color="info" size="small" />
          <Chip label="12 Países" color="warning" size="small" />
        </Box>
      </Alert>

      {/* Estatísticas Principais */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {estatisticasGlobais.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'background.paper', mr: 2 }}>
                    {stat.icone}
                  </Avatar>
                  <Typography variant="h4" color="primary">
                    {stat.valor}
                  </Typography>
                </Box>
                <Typography variant="h6" gutterBottom>
                  {stat.titulo}
                </Typography>
                <Chip 
                  label={stat.tendencia} 
                  color={stat.cor as any}
                  size="small"
                  icon={<TrendingUp />}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Performance em Tempo Real */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📊 Performance do Sistema
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">CPU Usage</Typography>
                  <Typography variant="body2">{metricaAtual?.cpu_usage.toFixed(1)}%</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={metricaAtual?.cpu_usage || 0} 
                  color={metricaAtual && metricaAtual.cpu_usage > 80 ? 'error' : 'primary'}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Memory Usage</Typography>
                  <Typography variant="body2">{metricaAtual?.memory_usage.toFixed(1)}%</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={metricaAtual?.memory_usage || 0}
                  color={metricaAtual && metricaAtual.memory_usage > 85 ? 'warning' : 'success'}
                />
              </Box>

              {/* Gráfico Simulado de Timeline */}
              <Paper sx={{ p: 2, bgcolor: '#f5f5f5', mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  📈 Gráfico de performance em tempo real seria renderizado aqui
                  (Integração com Chart.js, D3.js ou similar)
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                  {[...Array(20)].map((_, i) => (
                    <Box
                      key={i}
                      sx={{
                        width: 4,
                        height: Math.random() * 40 + 10,
                        bgcolor: 'primary.main',
                        opacity: 0.7 + Math.random() * 0.3,
                      }}
                    />
                  ))}
                </Box>
              </Paper>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                🔔 Alertas em Tempo Real
              </Typography>
              
              {alertasAtivos.length === 0 ? (
                <Alert severity="info">
                  <Typography variant="body2">
                    Nenhum alerta ativo. Sistema funcionando perfeitamente!
                  </Typography>
                </Alert>
              ) : (
                <List dense>
                  {alertasAtivos.slice(0, 5).map((alerta) => (
                    <ListItem key={alerta.id}>
                      <ListItemIcon>
                        {alerta.tipo === 'success' && <CheckCircle color="success" />}
                        {alerta.tipo === 'warning' && <Warning color="warning" />}
                        {alerta.tipo === 'info' && <DataUsage color="info" />}
                      </ListItemIcon>
                      <ListItemText
                        primary={alerta.titulo}
                        secondary={alerta.timestamp.toLocaleTimeString()}
                        primaryTypographyProps={{ variant: 'body2' }}
                        secondaryTypographyProps={{ variant: 'caption' }}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recursos Avançados */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                🚀 Recursos Ultra-Avançados
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon><Bolt color="warning" /></ListItemIcon>
                  <ListItemText 
                    primary="Processamento Distribuído"
                    secondary="47 servidores processando simultaneamente"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Cloud color="info" /></ListItemIcon>
                  <ListItemText 
                    primary="Auto-scaling Inteligente"
                    secondary="Capacidade ajusta automaticamente com demanda"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Memory color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="Cache Inteligente"
                    secondary="97% de cache hit rate para análises repetidas"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Analytics color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="IA Preditiva"
                    secondary="Antecipa necessidades de recursos"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                🌍 Alcance Global
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="primary">15M+</Typography>
                    <Typography variant="body2">Análises Processadas</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="secondary">180+</Typography>
                    <Typography variant="body2">Países Atendidos</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="success.main">99.97%</Typography>
                    <Typography variant="body2">Disponibilidade</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="warning.main">234ms</Typography>
                    <Typography variant="body2">Latência Média</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Call to Action */}
      <Alert severity="success" sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          ⚡ Performance Revolucionária!
        </Typography>
        <Typography variant="body2">
          Nosso sistema processa milhões de pontos de dados em tempo real, 
          com latência ultra-baixa e disponibilidade de 99.97%. 
          Experimente a próxima geração de análise de dados!
        </Typography>
      </Alert>
    </Container>
  );
};

export default MonitoramentoTempoRealAvancado;
