import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Chip,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button
} from '@mui/material';
import {
  ExpandMore,
  Analytics,
  TrendingUp,
  Assessment,
  Science,
  Download,
  Insights
} from '@mui/icons-material';

interface DataAnalysisProps {
  data: any;
}

interface AnalysisStep {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  progress: number;
  results?: any;
}

const DataAnalysis: React.FC<DataAnalysisProps> = ({ data }) => {
  const [analysisSteps, setAnalysisSteps] = useState<AnalysisStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (data) {
      initializeAnalysis();
    }
  }, [data]);

  const initializeAnalysis = () => {
    const steps: AnalysisStep[] = [
      {
        id: 'data_validation',
        name: 'Validação dos Dados',
        description: 'Verificando qualidade e integridade dos dados',
        completed: false,
        progress: 0
      },
      {
        id: 'descriptive_stats',
        name: 'Estatística Descritiva',
        description: 'Calculando médias, desvios, quartis e distribuições',
        completed: false,
        progress: 0
      },
      {
        id: 'correlation_analysis',
        name: 'Análise de Correlação',
        description: 'Identificando correlações entre variáveis',
        completed: false,
        progress: 0
      },
      {
        id: 'clustering',
        name: 'Análise de Agrupamento',
        description: 'Aplicando K-means e clustering hierárquico',
        completed: false,
        progress: 0
      },
      {
        id: 'factor_analysis',
        name: 'Análise Fatorial',
        description: 'Redução de dimensionalidade e fatores latentes',
        completed: false,
        progress: 0
      },
      {
        id: 'automl',
        name: 'AutoML - Machine Learning',
        description: 'Seleção automática do melhor modelo de ML',
        completed: false,
        progress: 0
      }
    ];

    setAnalysisSteps(steps);
    setIsAnalyzing(true);
    runAnalysis(steps);
  };

  const runAnalysis = async (steps: AnalysisStep[]) => {
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      
      // Simular progresso da análise
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setAnalysisSteps(prev => prev.map((step, index) => 
          index === i ? { ...step, progress } : step
        ));
      }

      // Marcar como completo e adicionar resultados simulados
      setAnalysisSteps(prev => prev.map((step, index) => 
        index === i ? { 
          ...step, 
          completed: true,
          results: generateMockResults(step.id)
        } : step
      ));

      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setIsAnalyzing(false);
  };

  const generateMockResults = (stepId: string) => {
    switch (stepId) {
      case 'data_validation':
        return {
          totalRows: data?.totalRows || 0,
          totalColumns: data?.headers?.length || 0,
          missingValues: Math.floor(Math.random() * 10),
          dataTypes: ['Numérico: 8', 'Categórico: 3', 'Data: 1'],
          quality: 'Excelente'
        };
      case 'descriptive_stats':
        return {
          summary: 'Estatísticas calculadas para todas as variáveis numéricas',
          distributions: ['Normal: 5 variáveis', 'Assimétrica: 3 variáveis'],
          outliers: Math.floor(Math.random() * 5) + 1
        };
      case 'correlation_analysis':
        return {
          strongCorrelations: Math.floor(Math.random() * 8) + 2,
          maxCorrelation: (0.7 + Math.random() * 0.3).toFixed(3),
          significantPairs: Math.floor(Math.random() * 15) + 5
        };
      case 'clustering':
        return {
          optimalClusters: Math.floor(Math.random() * 3) + 3,
          silhouetteScore: (0.6 + Math.random() * 0.3).toFixed(3),
          method: 'K-means + Hierarchical'
        };
      case 'factor_analysis':
        return {
          factors: Math.floor(Math.random() * 3) + 2,
          varianceExplained: (65 + Math.random() * 25).toFixed(1) + '%',
          kmo: (0.7 + Math.random() * 0.2).toFixed(3)
        };
      case 'automl':
        return {
          bestModel: ['Random Forest', 'XGBoost', 'Neural Network'][Math.floor(Math.random() * 3)],
          accuracy: (85 + Math.random() * 10).toFixed(1) + '%',
          features: Math.floor(Math.random() * 5) + 8
        };
      default:
        return {};
    }
  };

  if (!data) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Science sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Carregue um arquivo de dados para começar a análise
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Sua jornada científica começa com o upload dos dados
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Analytics color="primary" />
          Análise Completa de Dados
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Arquivo: {data.fileInfo?.name} • {data.totalRows} registros • {data.headers?.length} variáveis
        </Typography>
      </Box>

      {/* Progress Overview */}
      <Card sx={{ mb: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <CardContent>
          <Typography variant="h6" color="white" gutterBottom>
            🚀 Pipeline de Análise Automática
          </Typography>
          <Typography variant="body2" color="white" sx={{ mb: 2 }}>
            Processamento inteligente usando IA e algoritmos avançados de estatística
          </Typography>
          
          <Grid container spacing={1}>
            {analysisSteps.map((step, index) => (
              <Grid item xs={2} key={step.id}>
                <Box sx={{ textAlign: 'center' }}>
                  <Chip
                    label={index + 1}
                    size="small"
                    color={step.completed ? 'success' : currentStep === index ? 'warning' : 'default'}
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="caption" color="white" display="block">
                    {step.name.split(' ')[0]}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Analysis Steps */}
      <Grid container spacing={3}>
        {analysisSteps.map((step, index) => (
          <Grid item xs={12} key={step.id}>
            <Accordion expanded={step.completed || currentStep === index}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2 }}>
                  <Chip
                    icon={step.completed ? <TrendingUp /> : <Assessment />}
                    label={step.completed ? 'Concluído' : isAnalyzing && currentStep === index ? 'Processando...' : 'Pendente'}
                    color={step.completed ? 'success' : currentStep === index ? 'warning' : 'default'}
                    size="small"
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{step.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {step.description}
                    </Typography>
                  </Box>
                  <Typography variant="h6" color="primary">
                    {step.progress}%
                  </Typography>
                </Box>
              </AccordionSummary>
              
              <AccordionDetails>
                {!step.completed && currentStep === index && (
                  <LinearProgress 
                    variant="determinate" 
                    value={step.progress} 
                    sx={{ mb: 2, height: 8, borderRadius: 4 }}
                  />
                )}
                
                {step.completed && step.results && (
                  <Box>
                    <Typography variant="subtitle2" gutterBottom color="success.main">
                      ✅ Análise concluída com sucesso!
                    </Typography>
                    
                    <TableContainer component={Paper} variant="outlined" sx={{ mt: 2 }}>
                      <Table size="small">
                        <TableBody>
                          {Object.entries(step.results).map(([key, value]) => (
                            <TableRow key={key}>
                              <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                              </TableCell>
                              <TableCell>
                                {Array.isArray(value) ? value.join(', ') : String(value)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                )}
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>

      {/* Actions */}
      {!isAnalyzing && analysisSteps.every(step => step.completed) && (
        <Card sx={{ mt: 4, background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' }}>
          <CardContent>
            <Typography variant="h5" color="white" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Insights />
              Análise Completa! 🎉
            </Typography>
            <Typography variant="body1" color="white" sx={{ mb: 3 }}>
              Todos os processos foram concluídos com sucesso. Agora você pode:
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  color="inherit"
                  startIcon={<Assessment />}
                  sx={{ bgcolor: 'white', color: 'primary.main' }}
                >
                  Ver Dashboard
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="inherit"
                  startIcon={<Download />}
                  sx={{ bgcolor: 'white', color: 'primary.main' }}
                >
                  Gerar Relatório
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="inherit"
                  sx={{ borderColor: 'white', color: 'white' }}
                >
                  Exportar Resultados
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          � Próximos Passos Recomendados:
        </Typography>
        <Typography variant="body2">
          • Explore o Dashboard para visualizações interativas<br/>
          • Gere um relatório científico automaticamente<br/>
          • Aplique os modelos de ML em novos dados<br/>
          • Exporte os resultados para sua equipe
        </Typography>
      </Alert>
    </Box>
  );
};

export default DataAnalysis;
