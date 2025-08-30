import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  ExpandMore,
  TrendingUp,
  TrendingDown,
  Analytics,
  Assessment,
  ShowChart,
  PieChart,
  BarChart,
  Timeline,
  Speed,
  CheckCircle,
  Warning,
  Error,
  Info,
} from '@mui/icons-material';
import { analysisEngine, DataQuality, AnalysisResult } from '../utils/analysisEngine';

interface VisualizadorAnaliseProps {
  dados: any[];
  onAnalysisComplete?: (results: AnalysisResult) => void;
}

const VisualizadorAnalise = ({ dados, onAnalysisComplete }: VisualizadorAnaliseProps) => {
  const [loading, setLoading] = useState(false);
  const [qualidadeDados, setQualidadeDados] = useState<DataQuality | null>(null);
  const [analiseDescritiva, setAnaliseDescritiva] = useState<any>(null);
  const [analiseTemporal, setAnaliseTemporal] = useState<any>(null);
  const [analiseMultivariada, setAnaliseMultivariada] = useState<any>(null);
  const [progresso, setProgresso] = useState(0);
  const [etapaAtual, setEtapaAtual] = useState('');

  useEffect(() => {
    if (dados && dados.length > 0) {
      executarAnaliseCompleta();
    }
  }, [dados]);

  const executarAnaliseCompleta = async () => {
    setLoading(true);
    setProgresso(0);
    
    try {
      // Etapa 1: Avaliar qualidade dos dados
      setEtapaAtual('Avaliando qualidade dos dados...');
      setProgresso(10);
      const qualidade = await analysisEngine.assessDataQuality(dados);
      setQualidadeDados(qualidade);
      
      // Etapa 2: Análise descritiva
      setEtapaAtual('Executando análise descritiva...');
      setProgresso(30);
      const descritiva = await analysisEngine.performDescriptiveAnalysis(dados);
      setAnaliseDescritiva(descritiva);
      
      // Etapa 3: Análise temporal
      setEtapaAtual('Analisando tendências temporais...');
      setProgresso(60);
      const temporal = await analysisEngine.performTemporalAnalysis(dados);
      setAnaliseTemporal(temporal);
      
      // Etapa 4: Análise multivariada
      setEtapaAtual('Executando análise multivariada...');
      setProgresso(90);
      const multivariada = await analysisEngine.performMultivariateAnalysis(dados);
      setAnaliseMultivariada(multivariada);
      
      setProgresso(100);
      setEtapaAtual('Análise concluída!');
      
      // Chamar callback se fornecido
      if (onAnalysisComplete) {
        onAnalysisComplete({
          descriptive: descritiva,
          temporal: temporal,
          multivariate: multivariada
        });
      }
      
    } catch (error) {
      console.error('Erro na análise:', error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setProgresso(0);
        setEtapaAtual('');
      }, 2000);
    }
  };

  const getQualityIcon = (score: number) => {
    if (score >= 90) return <CheckCircle sx={{ color: '#10b981' }} />;
    if (score >= 75) return <Info sx={{ color: '#2563eb' }} />;
    if (score >= 60) return <Warning sx={{ color: '#f59e0b' }} />;
    return <Error sx={{ color: '#dc2626' }} />;
  };

  const getQualityColor = (overall: string) => {
    switch (overall) {
      case 'Excelente': return '#10b981';
      case 'Boa': return '#2563eb';
      case 'Regular': return '#f59e0b';
      case 'Ruim': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'Crescente': return <TrendingUp sx={{ color: '#10b981' }} />;
      case 'Decrescente': return <TrendingDown sx={{ color: '#dc2626' }} />;
      default: return <Timeline sx={{ color: '#6b7280' }} />;
    }
  };

  if (!dados || dados.length === 0) {
    return (
      <Alert severity="info">
        Carregue dados para visualizar a análise automática.
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        🔍 Análise Automática Completa
      </Typography>

      {/* Progress Bar */}
      {loading && (
        <Box sx={{ mb: 3 }}>
          <LinearProgress variant="determinate" value={progresso} />
          <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
            {etapaAtual} {progresso}%
          </Typography>
        </Box>
      )}

      <Grid container spacing={3}>
        {/* Qualidade dos Dados */}
        {qualidadeDados && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Speed sx={{ mr: 2, color: getQualityColor(qualidadeDados.overall) }} />
                  <Typography variant="h6">Qualidade dos Dados</Typography>
                  <Chip 
                    label={qualidadeDados.overall} 
                    sx={{ 
                      ml: 2, 
                      backgroundColor: getQualityColor(qualidadeDados.overall),
                      color: 'white' 
                    }} 
                  />
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, backgroundColor: '#f8fafc' }}>
                      <Typography variant="subtitle2" sx={{ mb: 2 }}>Métricas de Qualidade</Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            {getQualityIcon(qualidadeDados.completeness)}
                            <Typography variant="body2" sx={{ ml: 1 }}>
                              Completude: {qualidadeDados.completeness}%
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            {getQualityIcon(qualidadeDados.consistency)}
                            <Typography variant="body2" sx={{ ml: 1 }}>
                              Consistência: {qualidadeDados.consistency}%
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            {getQualityIcon(qualidadeDados.validity)}
                            <Typography variant="body2" sx={{ ml: 1 }}>
                              Validade: {qualidadeDados.validity}%
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            {getQualityIcon(qualidadeDados.timeliness)}
                            <Typography variant="body2" sx={{ ml: 1 }}>
                              Atualidade: {qualidadeDados.timeliness}%
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    {qualidadeDados.issues.length > 0 && (
                      <Alert severity="warning" sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>Problemas Identificados:</Typography>
                        <List dense>
                          {qualidadeDados.issues.map((issue, index) => (
                            <ListItem key={index} sx={{ py: 0 }}>
                              <ListItemText primary={issue} primaryTypographyProps={{ variant: 'caption' }} />
                            </ListItem>
                          ))}
                        </List>
                      </Alert>
                    )}
                    
                    {qualidadeDados.recommendations.length > 0 && (
                      <Alert severity="info">
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>Recomendações:</Typography>
                        <List dense>
                          {qualidadeDados.recommendations.map((rec, index) => (
                            <ListItem key={index} sx={{ py: 0 }}>
                              <ListItemText primary={rec} primaryTypographyProps={{ variant: 'caption' }} />
                            </ListItem>
                          ))}
                        </List>
                      </Alert>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Análise Descritiva */}
        {analiseDescritiva && (
          <Grid item xs={12}>
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <BarChart sx={{ mr: 2, color: '#2563eb' }} />
                  <Typography variant="h6">Análise Descritiva</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3}>
                  {/* Estatísticas Resumo */}
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                      📊 Estatísticas Resumo
                    </Typography>
                    <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                      <Table stickyHeader size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Variável</TableCell>
                            <TableCell align="right">Contagem</TableCell>
                            <TableCell align="right">Média</TableCell>
                            <TableCell align="right">Mediana</TableCell>
                            <TableCell align="right">Desvio Padrão</TableCell>
                            <TableCell align="right">Mín</TableCell>
                            <TableCell align="right">Máx</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.entries(analiseDescritiva.summary).map(([col, stats]: [string, any]) => (
                            stats.mean !== undefined && (
                              <TableRow key={col}>
                                <TableCell component="th" scope="row">
                                  <strong>{col}</strong>
                                </TableCell>
                                <TableCell align="right">{stats.count}</TableCell>
                                <TableCell align="right">{stats.mean}</TableCell>
                                <TableCell align="right">{stats.median}</TableCell>
                                <TableCell align="right">{stats.std}</TableCell>
                                <TableCell align="right">{stats.min}</TableCell>
                                <TableCell align="right">{stats.max}</TableCell>
                              </TableRow>
                            )
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>

                  {/* Outliers */}
                  {analiseDescritiva.outliers.length > 0 && (
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                        🎯 Outliers Detectados
                      </Typography>
                      {analiseDescritiva.outliers.map((outlierInfo: any, index: number) => (
                        <Alert key={index} severity="warning" sx={{ mb: 1 }}>
                          <Typography variant="body2">
                            <strong>{outlierInfo.column}:</strong> {outlierInfo.count} outliers 
                            ({outlierInfo.percentage}% dos dados)
                          </Typography>
                        </Alert>
                      ))}
                    </Grid>
                  )}

                  {/* Correlações Fortes */}
                  {Object.keys(analiseDescritiva.correlations).length > 0 && (
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                        🔗 Correlações Significativas
                      </Typography>
                      <List dense>
                        {Object.entries(analiseDescritiva.correlations)
                          .filter(([, corr]) => Math.abs(corr as number) > 0.5)
                          .sort(([, a], [, b]) => Math.abs(b as number) - Math.abs(a as number))
                          .map(([vars, corr], index) => (
                            <ListItem key={index}>
                              <ListItemIcon>
                                <Analytics sx={{ 
                                  color: (corr as number) > 0 ? '#10b981' : '#dc2626' 
                                }} />
                              </ListItemIcon>
                              <ListItemText
                                primary={vars.replace('_', ' ↔ ')}
                                secondary={`r = ${(corr as number).toFixed(3)} (${
                                  Math.abs(corr as number) > 0.8 ? 'Muito forte' :
                                  Math.abs(corr as number) > 0.6 ? 'Forte' : 'Moderada'
                                })`}
                              />
                            </ListItem>
                          ))}
                      </List>
                    </Grid>
                  )}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        )}

        {/* Análise Temporal */}
        {analiseTemporal && !analiseTemporal.error && (
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Timeline sx={{ mr: 2, color: '#10b981' }} />
                  <Typography variant="h6">Análise Temporal</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3}>
                  {/* Tendências */}
                  {analiseTemporal.trends && analiseTemporal.trends.length > 0 && (
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                        📈 Tendências Detectadas
                      </Typography>
                      {analiseTemporal.trends.map((trend: any, index: number) => (
                        <Card key={index} sx={{ mb: 2, border: '1px solid #e5e7eb' }}>
                          <CardContent sx={{ py: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              {getTrendIcon(trend.trend)}
                              <Typography variant="body2" sx={{ ml: 1, fontWeight: 600 }}>
                                {trend.valueColumn}
                              </Typography>
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                              Tendência: {trend.trend} | R²: {trend.r2} | Força: {trend.strength}
                            </Typography>
                          </CardContent>
                        </Card>
                      ))}
                    </Grid>
                  )}

                  {/* Sazonalidade */}
                  {analiseTemporal.seasonality && analiseTemporal.seasonality.length > 0 && (
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                        🔄 Padrões Sazonais
                      </Typography>
                      {analiseTemporal.seasonality.map((seasonal: any, index: number) => (
                        <Card key={index} sx={{ mb: 2, border: '1px solid #e5e7eb' }}>
                          <CardContent sx={{ py: 2 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                              {seasonal.valueColumn}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Sazonalidade: {seasonal.hasSeasonality ? 'Detectada' : 'Não detectada'} | 
                              Força: {seasonal.strength}
                            </Typography>
                          </CardContent>
                        </Card>
                      ))}
                    </Grid>
                  )}

                  {/* Previsões */}
                  {analiseTemporal.forecasts && analiseTemporal.forecasts.length > 0 && (
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                        🔮 Previsões (Próximos 5 períodos)
                      </Typography>
                      <TableContainer component={Paper}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Variável</TableCell>
                              <TableCell align="right">Período 1</TableCell>
                              <TableCell align="right">Período 2</TableCell>
                              <TableCell align="right">Período 3</TableCell>
                              <TableCell align="right">Período 4</TableCell>
                              <TableCell align="right">Período 5</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {analiseTemporal.forecasts.map((forecast: any, index: number) => (
                              <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                  <strong>{forecast.valueColumn}</strong>
                                </TableCell>
                                {forecast.predictions.map((pred: any, i: number) => (
                                  <TableCell key={i} align="right">
                                    {pred.predicted}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  )}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        )}

        {/* Análise Multivariada */}
        {analiseMultivariada && !analiseMultivariada.error && (
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PieChart sx={{ mr: 2, color: '#f59e0b' }} />
                  <Typography variant="h6">Análise Multivariada</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3}>
                  {/* Clustering */}
                  {analiseMultivariada.clusters && (
                    <Grid item xs={12} md={4}>
                      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                        🎯 Clusters Identificados
                      </Typography>
                      <Alert severity="info" sx={{ mb: 2 }}>
                        <Typography variant="body2">
                          {analiseMultivariada.clusters.totalPoints} pontos agrupados em{' '}
                          {analiseMultivariada.clusters.clusterSizes.length} clusters
                        </Typography>
                      </Alert>
                      {analiseMultivariada.clusters.clusterSizes.map((size: number, index: number) => (
                        <Chip
                          key={index}
                          label={`Cluster ${index + 1}: ${size} itens`}
                          sx={{ mr: 1, mb: 1 }}
                          variant="outlined"
                        />
                      ))}
                    </Grid>
                  )}

                  {/* PCA */}
                  {analiseMultivariada.pca && (
                    <Grid item xs={12} md={4}>
                      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                        📊 Componentes Principais
                      </Typography>
                      <Alert severity="success" sx={{ mb: 2 }}>
                        <Typography variant="body2">
                          Variância explicada pelos 2 primeiros componentes:{' '}
                          {analiseMultivariada.pca.explainedVariance?.toFixed(1)}%
                        </Typography>
                      </Alert>
                      {analiseMultivariada.pca.components?.slice(0, 3).map((comp: any, index: number) => (
                        <Box key={index} sx={{ mb: 1 }}>
                          <Typography variant="caption">
                            {comp.column}: {comp.contribution.toFixed(1)}% da variância
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={comp.contribution}
                            sx={{ height: 6, borderRadius: 3 }}
                          />
                        </Box>
                      ))}
                    </Grid>
                  )}

                  {/* Análise Fatorial */}
                  {analiseMultivariada.factors && (
                    <Grid item xs={12} md={4}>
                      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                        🔗 Relacionamentos Fortes
                      </Typography>
                      {analiseMultivariada.factors.strongRelationships?.slice(0, 5).map((rel: any, index: number) => (
                        <Alert key={index} severity="info" sx={{ mb: 1 }}>
                          <Typography variant="caption">
                            {rel.variables.join(' ↔ ')}: r = {rel.correlation.toFixed(3)}
                          </Typography>
                        </Alert>
                      ))}
                    </Grid>
                  )}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        )}

        {/* Resumo e Ações */}
        <Grid item xs={12}>
          <Card sx={{ backgroundColor: '#f8fafc', border: '1px solid #e5e7eb' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🎯 Resumo da Análise
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ color: '#2563eb', fontWeight: 700 }}>
                      {dados.length.toLocaleString('pt-BR')}
                    </Typography>
                    <Typography variant="caption">Registros Analisados</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ color: '#10b981', fontWeight: 700 }}>
                      {Object.keys(dados[0] || {}).length}
                    </Typography>
                    <Typography variant="caption">Variáveis</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ color: '#f59e0b', fontWeight: 700 }}>
                      {qualidadeDados?.overall || 'N/A'}
                    </Typography>
                    <Typography variant="caption">Qualidade</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Button
                      variant="contained"
                      startIcon={<Assessment />}
                      onClick={executarAnaliseCompleta}
                      disabled={loading}
                    >
                      Reexecutar Análise
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VisualizadorAnalise;
