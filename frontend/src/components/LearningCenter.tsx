import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Chip,
  Button,
  Alert,
  Step,
  Stepper,
  StepLabel,
  StepContent,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  School,
  CheckCircle,
  PlayArrow,
  MenuBook,
  Science,
  DataObject,
  TrendingUp,
  Psychology,
} from '@mui/icons-material';

const LearningCenter = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const learningSteps = [
    {
      label: 'Preparação dos Dados',
      content: 'Aprenda como preparar seus dados para análise, incluindo limpeza, formatação e estruturação.',
      details: [
        'Formatos de arquivo suportados: CSV, Excel, JSON, Parquet',
        'Como estruturar dados em linhas e colunas',
        'Identificação e tratamento de valores ausentes',
        'Padronização de tipos de dados',
      ],
    },
    {
      label: 'Análise Exploratória',
      content: 'Descubra padrões e insights iniciais nos seus dados através de estatísticas descritivas.',
      details: [
        'Medidas de tendência central (média, mediana, moda)',
        'Medidas de dispersão (desvio padrão, variância)',
        'Identificação de outliers e valores atípicos',
        'Análise de distribuições',
      ],
    },
    {
      label: 'Visualização de Dados',
      content: 'Crie gráficos e visualizações que comunicam insights de forma clara e efetiva.',
      details: [
        'Gráficos de barras e histogramas',
        'Gráficos de dispersão e correlação',
        'Box plots e violin plots',
        'Mapas de calor e gráficos de série temporal',
      ],
    },
    {
      label: 'Análise Estatística',
      content: 'Aplique testes estatísticos para validar hipóteses e encontrar relações significativas.',
      details: [
        'Testes de normalidade',
        'Testes de correlação',
        'Testes t e ANOVA',
        'Testes qui-quadrado',
      ],
    },
    {
      label: 'Machine Learning',
      content: 'Implemente algoritmos de aprendizado de máquina para predições e classificações.',
      details: [
        'Regressão linear e logística',
        'Árvores de decisão e Random Forest',
        'Clustering (K-means, hierárquico)',
        'Validação cruzada e métricas de performance',
      ],
    },
  ];

  const analysisTypes = [
    {
      icon: <DataObject sx={{ color: '#2563eb' }} />,
      title: 'Análise Descritiva',
      description: 'Resumo e descrição das características principais dos dados',
      level: 'Iniciante',
      color: '#10b981',
      techniques: ['Estatísticas sumárias', 'Frequências', 'Percentis', 'Distribuições'],
    },
    {
      icon: <TrendingUp sx={{ color: '#2563eb' }} />,
      title: 'Análise Preditiva',
      description: 'Modelos para prever comportamentos e tendências futuras',
      level: 'Intermediário',
      color: '#f59e0b',
      techniques: ['Regressão', 'Séries temporais', 'Machine Learning', 'Validação'],
    },
    {
      icon: <Psychology sx={{ color: '#2563eb' }} />,
      title: 'Análise Prescritiva',
      description: 'Recomendações de ações baseadas em análises avançadas',
      level: 'Avançado',
      color: '#ef4444',
      techniques: ['Otimização', 'Simulação', 'IA Avançada', 'Tomada de decisão'],
    },
  ];

  const tutorials = [
    {
      title: 'Primeiros Passos com Dados',
      description: 'Tutorial completo para iniciantes em análise de dados',
      duration: '15 min',
      topics: ['O que são dados', 'Tipos de variáveis', 'Como carregar dados', 'Primeiras visualizações'],
    },
    {
      title: 'Limpeza e Preparação',
      description: 'Como preparar dados para análise profissional',
      duration: '20 min',
      topics: ['Valores ausentes', 'Outliers', 'Normalização', 'Feature engineering'],
    },
    {
      title: 'Estatística Aplicada',
      description: 'Conceitos estatísticos essenciais para análise',
      duration: '25 min',
      topics: ['Distribuições', 'Testes de hipóteses', 'Intervalos de confiança', 'P-valor'],
    },
    {
      title: 'Machine Learning na Prática',
      description: 'Implementação prática de algoritmos de ML',
      duration: '30 min',
      topics: ['Classificação', 'Regressão', 'Clustering', 'Avaliação de modelos'],
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <School sx={{ fontSize: 40, color: 'primary.main' }} />
          Centro de Aprendizagem
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Aprenda análise de dados do básico ao avançado com tutoriais práticos e exemplos reais.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Guia Passo a Passo */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <MenuBook />
                Guia Passo a Passo
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Siga este roteiro estruturado para dominar análise de dados
              </Typography>

              <Stepper activeStep={activeStep} orientation="vertical">
                {learningSteps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {step.label}
                      </Typography>
                    </StepLabel>
                    <StepContent>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {step.content}
                      </Typography>
                      <List dense>
                        {step.details.map((detail, idx) => (
                          <ListItem key={idx} sx={{ pl: 0 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
                            </ListItemIcon>
                            <ListItemText 
                              primary={detail} 
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                      <Box sx={{ mb: 2 }}>
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{ mt: 1, mr: 1 }}
                          disabled={index === learningSteps.length - 1}
                        >
                          {index === learningSteps.length - 1 ? 'Concluído' : 'Próximo'}
                        </Button>
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Anterior
                        </Button>
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </CardContent>
          </Card>
        </Grid>

        {/* Tipos de Análise */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Science />
                Tipos de Análise
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Compreenda os diferentes tipos de análise e quando utilizá-los
              </Typography>

              <Grid container spacing={2}>
                {analysisTypes.map((type, index) => (
                  <Grid item xs={12} key={index}>
                    <Paper 
                      variant="outlined" 
                      sx={{ 
                        p: 2, 
                        border: `2px solid ${type.color}20`,
                        borderLeft: `4px solid ${type.color}`,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        {type.icon}
                        <Box sx={{ flexGrow: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Typography variant="subtitle1" fontWeight={600}>
                              {type.title}
                            </Typography>
                            <Chip 
                              label={type.level} 
                              size="small" 
                              sx={{ 
                                backgroundColor: `${type.color}20`,
                                color: type.color,
                                fontWeight: 500,
                              }}
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {type.description}
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {type.techniques.map((technique, idx) => (
                              <Chip 
                                key={idx}
                                label={technique} 
                                size="small" 
                                variant="outlined"
                                sx={{ fontSize: '0.75rem' }}
                              />
                            ))}
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Tutoriais Práticos */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PlayArrow />
                Tutoriais Práticos
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Tutoriais hands-on com exemplos reais e datasets práticos
              </Typography>

              <Grid container spacing={2}>
                {tutorials.map((tutorial, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                      <CardContent>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                          {tutorial.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {tutorial.description}
                        </Typography>
                        <Chip 
                          label={tutorial.duration} 
                          size="small" 
                          color="primary" 
                          variant="outlined"
                          sx={{ mb: 2 }}
                        />
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                          Tópicos abordados:
                        </Typography>
                        {tutorial.topics.map((topic, idx) => (
                          <Typography key={idx} variant="caption" display="block" sx={{ ml: 1 }}>
                            • {topic}
                          </Typography>
                        ))}
                        <Button 
                          variant="outlined" 
                          size="small" 
                          fullWidth 
                          sx={{ mt: 2 }}
                          startIcon={<PlayArrow />}
                        >
                          Iniciar Tutorial
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Dicas Importantes */}
        <Grid item xs={12}>
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              💡 Dica para Iniciantes
            </Typography>
            <Typography variant="body2">
              Comece sempre com uma análise exploratória dos dados antes de aplicar técnicas avançadas. 
              Entender a estrutura e qualidade dos seus dados é fundamental para análises precisas.
            </Typography>
          </Alert>

          <Alert severity="success">
            <Typography variant="subtitle2" gutterBottom>
              🚀 Para Profissionais
            </Typography>
            <Typography variant="body2">
              Esta plataforma oferece integração com bibliotecas avançadas como scikit-learn, pandas, numpy e scipy. 
              Você pode exportar código Python para reproduzir análises em seus próprios ambientes.
            </Typography>
          </Alert>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LearningCenter;
