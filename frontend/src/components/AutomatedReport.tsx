import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Divider,
  Paper,
  Stack,
  LinearProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Switch,
  FormControlLabel,
  IconButton,
  Tooltip,
  Badge,
} from '@mui/material';
import {
  Assessment,
  AutoAwesome,
  TrendingUp,
  Warning,
  CheckCircle,
  Error,
  Info,
  ExpandMore,
  Download,
  Share,
  Print,
  Refresh,
  Psychology,
  Science,
  Analytics,
  Speed,
  DataUsage,
  Functions,
  Timeline,
  BarChart,
  PieChart,
  ShowChart,
  TableChart,
  FilterList,
  School,
  LightbulbOutlined,
  BugReport,
  Assignment,
  Insights,
  Code,
  FilePresent,
  CloudDownload,
} from '@mui/icons-material';

interface AutomatedReportProps {
  data: any[];
  analysis: any;
  fileName: string;
}

const AutomatedReport: React.FC<AutomatedReportProps> = ({
  data,
  analysis,
  fileName
}) => {
  const [reportType, setReportType] = useState<'executive' | 'technical' | 'complete'>('executive');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeRecommendations, setIncludeRecommendations] = useState(true);
  const [includeDataSample, setIncludeDataSample] = useState(false);

  // Gerar insights automáticos
  const automaticInsights = useMemo(() => {
    if (!data || data.length === 0 || !analysis) return [];

    const insights = [];

    // Análise de tamanho do dataset
    if (data.length > 100000) {
      insights.push({
        type: 'size',
        level: 'info',
        title: 'Dataset Grande',
        description: `Com ${data.length.toLocaleString()} registros, este é um dataset de grande escala que pode beneficiar de técnicas de Big Data.`,
        recommendation: 'Considere usar amostragem estatística para análises exploratórias mais rápidas.'
      });
    } else if (data.length < 100) {
      insights.push({
        type: 'size',
        level: 'warning',
        title: 'Dataset Pequeno',
        description: `Com apenas ${data.length} registros, análises estatísticas podem ter poder limitado.`,
        recommendation: 'Colete mais dados se possível ou use técnicas apropriadas para amostras pequenas.'
      });
    }

    // Análise de qualidade dos dados
    if (analysis.dataQuality < 70) {
      insights.push({
        type: 'quality',
        level: 'error',
        title: 'Qualidade de Dados Baixa',
        description: `Apenas ${analysis.dataQuality}% dos dados estão completos.`,
        recommendation: 'Implemente um processo de limpeza de dados antes de análises mais avançadas.'
      });
    } else if (analysis.dataQuality > 95) {
      insights.push({
        type: 'quality',
        level: 'success',
        title: 'Excelente Qualidade',
        description: `${analysis.dataQuality}% de completude dos dados indica alta qualidade.`,
        recommendation: 'Dados prontos para análises avançadas e modelagem preditiva.'
      });
    }

    // Análise de tipos de dados
    const numericColumns = analysis.columns?.filter((col: any) => col.type === 'numeric')?.length || 0;
    const categoricalColumns = analysis.columns?.filter((col: any) => col.type === 'categorical')?.length || 0;
    const dateColumns = analysis.columns?.filter((col: any) => col.type === 'date')?.length || 0;

    if (numericColumns > categoricalColumns * 2) {
      insights.push({
        type: 'structure',
        level: 'info',
        title: 'Dataset Quantitativo',
        description: `Com ${numericColumns} colunas numéricas, este dataset é ideal para análises estatísticas.`,
        recommendation: 'Considere análises de correlação, regressão e técnicas de machine learning supervisionado.'
      });
    }

    if (dateColumns > 0) {
      insights.push({
        type: 'temporal',
        level: 'info',
        title: 'Dados Temporais Detectados',
        description: `${dateColumns} coluna(s) de data encontrada(s).`,
        recommendation: 'Explore análises de séries temporais, sazonalidade e tendências.'
      });
    }

    // Análise de distribuição de valores
    if (categoricalColumns > 0) {
      insights.push({
        type: 'categorical',
        level: 'info',
        title: 'Dados Categóricos Presentes',
        description: `${categoricalColumns} variáveis categóricas identificadas.`,
        recommendation: 'Use análises de frequência, testes qui-quadrado e visualizações de barras.'
      });
    }

    return insights;
  }, [data, analysis]);

  // Gerar recomendações de análise
  const analysisRecommendations = useMemo(() => {
    if (!analysis) return [];

    const recommendations = [];

    // Recomendações baseadas no tipo de dados
    const numericColumns = analysis.columns?.filter((col: any) => col.type === 'numeric')?.length || 0;
    const categoricalColumns = analysis.columns?.filter((col: any) => col.type === 'categorical')?.length || 0;
    const dateColumns = analysis.columns?.filter((col: any) => col.type === 'date')?.length || 0;

    if (numericColumns >= 2) {
      recommendations.push({
        category: 'Análise Estatística',
        items: [
          'Matriz de correlação entre variáveis numéricas',
          'Análise de regressão linear/múltipla',
          'Teste de normalidade das distribuições',
          'Identificação e tratamento de outliers',
          'Análise de componentes principais (PCA)'
        ]
      });
    }

    if (categoricalColumns > 0) {
      recommendations.push({
        category: 'Análise Categórica',
        items: [
          'Tabelas de frequência e proporções',
          'Testes de independência (Chi-quadrado)',
          'Análise de correspondência',
          'Gráficos de barras e pizza',
          'Análise de associação entre variáveis'
        ]
      });
    }

    if (dateColumns > 0) {
      recommendations.push({
        category: 'Análise Temporal',
        items: [
          'Decomposição de séries temporais',
          'Análise de tendências e sazonalidade',
          'Previsão usando modelos ARIMA',
          'Detecção de pontos de mudança',
          'Correlação serial (autocorrelação)'
        ]
      });
    }

    if (data.length > 1000) {
      recommendations.push({
        category: 'Machine Learning',
        items: [
          'Algoritmos de clustering (K-means, DBSCAN)',
          'Modelos de classificação supervisionada',
          'Análise de ensemble e cross-validation',
          'Feature engineering e seleção',
          'Validação e métricas de performance'
        ]
      });
    }

    recommendations.push({
      category: 'Visualização',
      items: [
        'Dashboard interativo com filtros',
        'Histogramas e box plots',
        'Scatter plots multidimensionais',
        'Heatmaps de correlação',
        'Gráficos de densidade e distribuição'
      ]
    });

    return recommendations;
  }, [analysis, data]);

  // Gerar sumário executivo
  const executiveSummary = useMemo(() => {
    if (!data || !analysis) return null;

    const completeness = analysis.dataQuality || 0;
    const totalRecords = data.length;
    const totalColumns = analysis.totalColumns || 0;
    
    let assessment = 'Boa';
    if (completeness >= 95) assessment = 'Excelente';
    else if (completeness >= 80) assessment = 'Boa';
    else if (completeness >= 60) assessment = 'Regular';
    else assessment = 'Baixa';

    return {
      datasetName: fileName,
      totalRecords,
      totalColumns,
      completeness,
      assessment,
      keyFindings: automaticInsights.slice(0, 3),
      priority: automaticInsights.some(i => i.level === 'error') ? 'Alta' : 
               automaticInsights.some(i => i.level === 'warning') ? 'Média' : 'Baixa'
    };
  }, [data, analysis, fileName, automaticInsights]);

  // Exportar relatório
  const exportReport = (format: 'pdf' | 'html' | 'docx') => {
    const reportContent = generateReportContent();
    
    if (format === 'html') {
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Relatório de Análise de Dados - ${fileName}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            .header { color: #1976d2; border-bottom: 2px solid #1976d2; padding-bottom: 10px; }
            .section { margin: 20px 0; }
            .insight { margin: 10px 0; padding: 10px; border-left: 4px solid #ccc; }
            .success { border-color: #4caf50; background: #f1f8e9; }
            .warning { border-color: #ff9800; background: #fff3e0; }
            .error { border-color: #f44336; background: #ffebee; }
            .info { border-color: #2196f3; background: #e3f2fd; }
          </style>
        </head>
        <body>
          ${reportContent}
        </body>
        </html>
      `;
      
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `relatorio_${fileName.replace(/\.[^/.]+$/, '')}.html`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  // Gerar conteúdo do relatório
  const generateReportContent = () => {
    return `
      <div class="header">
        <h1>Relatório de Análise de Dados</h1>
        <h2>${fileName}</h2>
        <p>Gerado em: ${new Date().toLocaleDateString('pt-BR')}</p>
      </div>
      
      <div class="section">
        <h3>Sumário Executivo</h3>
        <p>Dataset com ${executiveSummary?.totalRecords?.toLocaleString()} registros e ${executiveSummary?.totalColumns} colunas.</p>
        <p>Qualidade dos dados: ${executiveSummary?.assessment} (${executiveSummary?.completeness}%)</p>
      </div>
      
      <div class="section">
        <h3>Insights Principais</h3>
        ${automaticInsights.map(insight => `
          <div class="insight ${insight.level}">
            <h4>${insight.title}</h4>
            <p>${insight.description}</p>
            <p><strong>Recomendação:</strong> ${insight.recommendation}</p>
          </div>
        `).join('')}
      </div>
    `;
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Assessment color="primary" />
        Relatório Automatizado de Análise
      </Typography>

      {/* Configurações do Relatório */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Configurações do Relatório
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Tipo de Relatório</InputLabel>
                <Select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value as any)}
                >
                  <MenuItem value="executive">Executivo</MenuItem>
                  <MenuItem value="technical">Técnico</MenuItem>
                  <MenuItem value="complete">Completo</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={8}>
              <Stack direction="row" spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={includeCharts}
                      onChange={(e) => setIncludeCharts(e.target.checked)}
                    />
                  }
                  label="Incluir Gráficos"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={includeRecommendations}
                      onChange={(e) => setIncludeRecommendations(e.target.checked)}
                    />
                  }
                  label="Incluir Recomendações"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={includeDataSample}
                      onChange={(e) => setIncludeDataSample(e.target.checked)}
                    />
                  }
                  label="Incluir Amostra de Dados"
                />
              </Stack>
            </Grid>
          </Grid>

          <Box sx={{ mt: 2 }}>
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                startIcon={<CloudDownload />}
                onClick={() => exportReport('html')}
              >
                Exportar HTML
              </Button>
              <Button
                variant="outlined"
                startIcon={<FilePresent />}
                onClick={() => exportReport('pdf')}
              >
                Exportar PDF
              </Button>
              <Button
                variant="outlined"
                startIcon={<Print />}
                onClick={() => window.print()}
              >
                Imprimir
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>

      {/* Sumário Executivo */}
      {executiveSummary && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AutoAwesome color="primary" />
              Sumário Executivo
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  Visão Geral dos Dados
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <DataUsage fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Total de Registros" 
                      secondary={executiveSummary.totalRecords.toLocaleString()}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <TableChart fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Total de Colunas" 
                      secondary={executiveSummary.totalColumns}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Speed fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Qualidade dos Dados" 
                      secondary={
                        <Box>
                          <Typography variant="body2">
                            {executiveSummary.assessment} ({executiveSummary.completeness}%)
                          </Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={executiveSummary.completeness} 
                            sx={{ mt: 1 }}
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  Status da Análise
                </Typography>
                <Alert 
                  severity={
                    executiveSummary.priority === 'Alta' ? 'error' :
                    executiveSummary.priority === 'Média' ? 'warning' : 'success'
                  }
                  sx={{ mb: 2 }}
                >
                  <Typography variant="body2">
                    <strong>Prioridade {executiveSummary.priority}</strong>
                    <br />
                    {executiveSummary.keyFindings.length} principais descobertas identificadas
                  </Typography>
                </Alert>
                
                <Typography variant="caption" color="text.secondary">
                  Relatório gerado automaticamente em {new Date().toLocaleDateString('pt-BR')}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Insights Automáticos */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Psychology color="primary" />
            Insights Automáticos
            <Badge badgeContent={automaticInsights.length} color="primary" />
          </Typography>
          
          {automaticInsights.map((insight, index) => (
            <Alert 
              key={index}
              severity={
                insight.level === 'error' ? 'error' :
                insight.level === 'warning' ? 'warning' :
                insight.level === 'success' ? 'success' : 'info'
              }
              sx={{ mb: 2 }}
            >
              <Typography variant="subtitle2" gutterBottom>
                {insight.title}
              </Typography>
              <Typography variant="body2" paragraph>
                {insight.description}
              </Typography>
              <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                <strong>💡 Recomendação:</strong> {insight.recommendation}
              </Typography>
            </Alert>
          ))}
        </CardContent>
      </Card>

      {/* Recomendações de Análise */}
      {includeRecommendations && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LightbulbOutlined color="primary" />
              Recomendações de Análise
            </Typography>
            
            {analysisRecommendations.map((category, index) => (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {category.category}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List dense>
                    {category.items.map((item, itemIndex) => (
                      <ListItem key={itemIndex}>
                        <ListItemIcon>
                          <CheckCircle fontSize="small" color="success" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Próximos Passos */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Timeline color="primary" />
            Próximos Passos Recomendados
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                Imediatos (Próximos 7 dias)
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <Assignment fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Realizar limpeza de dados identificados" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BarChart fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Criar visualizações exploratórias" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Functions fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Calcular estatísticas descritivas detalhadas" />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                Médio Prazo (Próximas 2-4 semanas)
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <TrendingUp fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Implementar análises avançadas" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Science fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Explorar modelos preditivos" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Insights fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Desenvolver dashboard interativo" />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AutomatedReport;
