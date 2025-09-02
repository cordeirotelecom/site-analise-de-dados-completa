import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Tooltip,
  IconButton
} from '@mui/material';
import {
  Search,
  Speed,
  Accessibility,
  Security,
  CheckCircle,
  Warning,
  Error,
  ExpandMore,
  Refresh,
  GetApp,
  TrendingUp,
  Visibility,
  Code,
  Image,
  Link,
  Description,
  CloudUpload
} from '@mui/icons-material';

interface SEOMetric {
  category: string;
  score: number;
  status: 'excellent' | 'good' | 'needs-improvement' | 'poor';
  issues: string[];
  recommendations: string[];
}

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  target: number;
  status: 'good' | 'needs-improvement' | 'poor';
}

const AnalisadorSEOPerformance: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [seoMetrics, setSeoMetrics] = useState<SEOMetric[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);
  const [overallScore, setOverallScore] = useState(0);
  const [lastAnalysis, setLastAnalysis] = useState<Date | null>(null);

  useEffect(() => {
    runAnalysis();
  }, []);

  const runAnalysis = async () => {
    setLoading(true);
    
    // Simular análise (em produção, seria feita com ferramentas reais)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Análise de SEO
    const seoData: SEOMetric[] = [
      {
        category: 'Meta Tags',
        score: 85,
        status: 'good',
        issues: ['Meta description ausente em algumas páginas'],
        recommendations: [
          'Adicionar meta description única para cada página',
          'Otimizar títulos com palavras-chave relevantes'
        ]
      },
      {
        category: 'Estrutura HTML',
        score: 92,
        status: 'excellent',
        issues: [],
        recommendations: [
          'Manter a hierarquia de heading tags',
          'Continuar usando semantic HTML'
        ]
      },
      {
        category: 'Performance',
        score: 78,
        status: 'good',
        issues: ['Algumas imagens não otimizadas', 'Cache headers podem ser melhorados'],
        recommendations: [
          'Implementar lazy loading para imagens',
          'Comprimir imagens usando WebP',
          'Configurar cache de longo prazo para assets estáticos'
        ]
      },
      {
        category: 'Acessibilidade',
        score: 88,
        status: 'good',
        issues: ['Algumas labels ARIA ausentes'],
        recommendations: [
          'Adicionar aria-labels para botões sem texto',
          'Melhorar contraste de cores em alguns elementos'
        ]
      },
      {
        category: 'Mobile-First',
        score: 95,
        status: 'excellent',
        issues: [],
        recommendations: [
          'Continuar testando em diferentes dispositivos',
          'Manter design responsivo'
        ]
      }
    ];

    // Análise de Performance
    const perfData: PerformanceMetric[] = [
      {
        name: 'First Contentful Paint',
        value: 1.2,
        unit: 's',
        target: 1.8,
        status: 'good'
      },
      {
        name: 'Largest Contentful Paint',
        value: 2.1,
        unit: 's',
        target: 2.5,
        status: 'good'
      },
      {
        name: 'Total Blocking Time',
        value: 180,
        unit: 'ms',
        target: 200,
        status: 'good'
      },
      {
        name: 'Cumulative Layout Shift',
        value: 0.08,
        unit: '',
        target: 0.1,
        status: 'good'
      },
      {
        name: 'Speed Index',
        value: 2.3,
        unit: 's',
        target: 3.4,
        status: 'good'
      }
    ];

    setSeoMetrics(seoData);
    setPerformanceMetrics(perfData);
    
    // Calcular score geral
    const avgScore = seoData.reduce((sum, metric) => sum + metric.score, 0) / seoData.length;
    setOverallScore(Math.round(avgScore));
    setLastAnalysis(new Date());
    
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'success';
      case 'good': return 'primary';
      case 'needs-improvement': return 'warning';
      case 'poor': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle color="success" />;
      case 'good': return <CheckCircle color="primary" />;
      case 'needs-improvement': return <Warning color="warning" />;
      case 'poor': return <Error color="error" />;
      default: return <CheckCircle />;
    }
  };

  const exportReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      overallScore,
      seoMetrics,
      performanceMetrics,
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `seo-performance-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          🔍 Analisador SEO & Performance
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Exportar Relatório">
            <IconButton onClick={exportReport} color="primary">
              <GetApp />
            </IconButton>
          </Tooltip>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={runAnalysis}
            disabled={loading}
          >
            Nova Análise
          </Button>
        </Box>
      </Box>

      {lastAnalysis && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Última análise realizada em: {lastAnalysis.toLocaleString()}
        </Alert>
      )}

      {/* Score Geral */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <Box textAlign="center">
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                  <CircularProgress
                    variant="determinate"
                    value={overallScore}
                    size={120}
                    thickness={4}
                    sx={{
                      color: overallScore >= 90 ? 'success.main' : 
                             overallScore >= 70 ? 'primary.main' : 
                             overallScore >= 50 ? 'warning.main' : 'error.main'
                    }}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="h4" component="div" fontWeight="bold">
                      {overallScore}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="h6" sx={{ mt: 1 }}>
                  Score Geral
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                Status da Análise
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {overallScore >= 90 ? 'Excelente! Seu site está muito bem otimizado.' :
                 overallScore >= 70 ? 'Bom trabalho! Algumas melhorias podem ser implementadas.' :
                 overallScore >= 50 ? 'Performance adequada, mas há espaço para melhorias significativas.' :
                 'Atenção necessária! Várias otimizações precisam ser implementadas.'}
              </Typography>
              {loading && <LinearProgress sx={{ mt: 2 }} />}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Métricas de SEO */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            <Search sx={{ mr: 1, verticalAlign: 'middle' }} />
            Análise de SEO
          </Typography>
          
          {seoMetrics.map((metric, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  {getStatusIcon(metric.status)}
                  <Typography sx={{ ml: 2, flexGrow: 1 }}>
                    {metric.category}
                  </Typography>
                  <Chip
                    label={`${metric.score}/100`}
                    color={getStatusColor(metric.status)}
                    size="small"
                    sx={{ mr: 2 }}
                  />
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {metric.issues.length > 0 && (
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" color="error.main" gutterBottom>
                        Problemas Encontrados:
                      </Typography>
                      <List dense>
                        {metric.issues.map((issue, i) => (
                          <ListItem key={i}>
                            <ListItemIcon>
                              <Error color="error" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={issue} />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                  )}
                  <Grid item xs={12} md={metric.issues.length > 0 ? 6 : 12}>
                    <Typography variant="subtitle2" color="primary.main" gutterBottom>
                      Recomendações:
                    </Typography>
                    <List dense>
                      {metric.recommendations.map((rec, i) => (
                        <ListItem key={i}>
                          <ListItemIcon>
                            <TrendingUp color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={rec} />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </CardContent>
      </Card>

      {/* Métricas de Performance */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            <Speed sx={{ mr: 1, verticalAlign: 'middle' }} />
            Web Vitals & Performance
          </Typography>
          
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Métrica</TableCell>
                  <TableCell align="center">Valor Atual</TableCell>
                  <TableCell align="center">Meta</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {performanceMetrics.map((metric, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {metric.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2">
                        {metric.value}{metric.unit}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" color="text.secondary">
                        {'<'} {metric.target}{metric.unit}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        size="small"
                        label={metric.status === 'good' ? 'Bom' : 
                              metric.status === 'needs-improvement' ? 'Melhorar' : 'Ruim'}
                        color={getStatusColor(metric.status === 'good' ? 'excellent' : metric.status)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Dica:</strong> Essas métricas são baseadas nos Core Web Vitals do Google e 
              são fundamentais para o ranking de SEO.
            </Typography>
          </Alert>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AnalisadorSEOPerformance;
