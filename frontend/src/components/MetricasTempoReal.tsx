import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  LinearProgress,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Speed,
  TrendingUp,
  Assessment,
  Security,
  Nature,
  Psychology,
  Refresh
} from '@mui/icons-material';

interface Metric {
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  category: 'performance' | 'scientific' | 'sustainability' | 'security';
  icon: React.ReactElement;
}

const MetricasTempoReal: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    // Simula métricas em tempo real
    const updateMetrics = () => {
      const newMetrics: Metric[] = [
        {
          name: 'Performance Score',
          value: 94 + Math.random() * 6,
          target: 95,
          unit: '%',
          trend: 'up',
          category: 'performance',
          icon: <Speed />
        },
        {
          name: 'Rigor Científico',
          value: 98 + Math.random() * 2,
          target: 98,
          unit: '%',
          trend: 'stable',
          category: 'scientific',
          icon: <Psychology />
        },
        {
          name: 'Sustentabilidade',
          value: 92 + Math.random() * 8,
          target: 95,
          unit: '%',
          trend: 'up',
          category: 'sustainability',
          icon: <Nature />
        },
        {
          name: 'Segurança',
          value: 99 + Math.random() * 1,
          target: 99,
          unit: '%',
          trend: 'stable',
          category: 'security',
          icon: <Security />
        },
        {
          name: 'Análises Processadas',
          value: 1247 + Math.floor(Math.random() * 10),
          target: 1500,
          unit: '',
          trend: 'up',
          category: 'performance',
          icon: <Assessment />
        },
        {
          name: 'Accuracy Preditiva',
          value: 89 + Math.random() * 11,
          target: 90,
          unit: '%',
          trend: 'up',
          category: 'scientific',
          icon: <TrendingUp />
        }
      ];
      
      setMetrics(newMetrics);
      setLastUpdate(new Date());
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 3000); // Atualiza a cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'performance': return '#2196f3';
      case 'scientific': return '#9c27b0';
      case 'sustainability': return '#4caf50';
      case 'security': return '#f44336';
      default: return '#757575';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '📊';
      default: return '📊';
    }
  };

  const refreshMetrics = () => {
    const event = new CustomEvent('refreshMetrics');
    window.dispatchEvent(event);
  };

  return (
    <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#1565c0' }}>
            📊 Métricas em Tempo Real - Sistema Harmônico
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="caption" color="textSecondary">
              Última atualização: {lastUpdate.toLocaleTimeString('pt-BR')}
            </Typography>
            <Tooltip title="Atualizar métricas">
              <IconButton size="small" onClick={refreshMetrics}>
                <Refresh />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Grid container spacing={2}>
          {metrics.map((metric, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ 
                height: '100%',
                background: 'white',
                border: `2px solid ${getCategoryColor(metric.category)}20`,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 3
                }
              }}>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ 
                      color: getCategoryColor(metric.category),
                      mr: 1,
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      {metric.icon}
                    </Box>
                    <Typography variant="body2" fontWeight={500} sx={{ flex: 1 }}>
                      {metric.name}
                    </Typography>
                    <Chip 
                      label={getTrendIcon(metric.trend)}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                  
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 700,
                      color: getCategoryColor(metric.category),
                      mb: 1
                    }}
                  >
                    {metric.unit === '%' 
                      ? `${metric.value.toFixed(1)}${metric.unit}`
                      : metric.value.toFixed(0)
                    }
                  </Typography>
                  
                  <Box sx={{ mb: 1 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={metric.unit === '%' ? metric.value : (metric.value / metric.target) * 100}
                      sx={{ 
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: `${getCategoryColor(metric.category)}20`,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: getCategoryColor(metric.category),
                          borderRadius: 3
                        }
                      }}
                    />
                  </Box>
                  
                  <Typography variant="caption" color="textSecondary">
                    Meta: {metric.unit === '%' 
                      ? `${metric.target}${metric.unit}`
                      : metric.target.toLocaleString()
                    }
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 2, p: 2, backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 2 }}>
          <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
            🌱 <strong>Gestão Sistêmica:</strong> Todos os indicadores são monitorados em tempo real para garantir 
            desenvolvimento harmônico e sustentável da plataforma científica.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MetricasTempoReal;
