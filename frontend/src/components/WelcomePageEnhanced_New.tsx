import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from '@mui/material';
import {
  Article,
  PlayArrow,
  CheckCircle,
  CloudUpload,
  Analytics,
  Assessment,
  School,
  Public,
  VideoLibrary,
  ArrowForward,
} from '@mui/icons-material';

interface WelcomePageProps {
  onStartAnalysis: () => void;
  onNavigateToTab?: (tabIndex: number) => void;
}

const WelcomePageEnhanced: React.FC<WelcomePageProps> = ({ onStartAnalysis, onNavigateToTab }) => {
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [quickTourStep, setQuickTourStep] = useState(0);

  const features = [
    {
      id: 'upload',
      icon: <CloudUpload sx={{ fontSize: 24, color: 'white' }} />,
      title: 'Upload Inteligente de Dados',
      description: 'Sistema avançado de processamento para múltiplos formatos de dados com validação automática e pré-processamento inteligente.',
      benefits: [
        'Suporte a 15+ formatos (CSV, Excel, JSON, Parquet, SQL, XML)',
        'Validação automática de integridade e qualidade dos dados', 
        'Preview inteligente com detecção de tipos de dados',
        'Processamento paralelo para grandes volumes',
        'Sugestões automáticas de limpeza e formatação'
      ],
      action: 'Iniciar Upload',
      metrics: '1M+ arquivos processados'
    },
    {
      id: 'analysis',
      icon: <Analytics sx={{ fontSize: 24, color: 'white' }} />,
      title: 'Análise Estatística Avançada',
      description: 'Mais de 60 análises estatísticas automatizadas com interpretações baseadas em IA e recomendações estratégicas.',
      benefits: [
        'Estatística descritiva completa (média, mediana, quartis, outliers)',
        'Análises de correlação e regressão avançadas',
        'Testes de hipóteses (t-test, ANOVA, Chi-square, Mann-Whitney)',
        'Detecção automática de padrões e anomalias',
        'Interpretações em linguagem natural geradas por IA'
      ],
      action: 'Explorar Análises',
      metrics: '60+ testes estatísticos'
    },
    {
      id: 'visualization',
      icon: <Assessment sx={{ fontSize: 24, color: 'white' }} />,
      title: 'Visualizações Interativas',
      description: 'Biblioteca completa de gráficos profissionais com personalização avançada e exportação em alta qualidade.',
      benefits: [
        '20+ tipos de gráficos (barras, linhas, scatter, heatmaps, box plots)',
        '8 esquemas de cores profissionais e personalizáveis',
        'Interatividade completa (zoom, filtros, tooltips dinâmicos)',
        'Exportação em múltiplos formatos (PNG, SVG, PDF, HTML)',
        'Templates prontos para diferentes setores industriais'
      ],
      action: 'Criar Visualizações',
      metrics: '20+ tipos de gráficos'
    },
    {
      id: 'reports',
      icon: <Article sx={{ fontSize: 24, color: 'white' }} />,
      title: 'Relatórios Executivos',
      description: 'Geração automática de relatórios profissionais com insights estratégicos e recomendações baseadas em dados.',
      benefits: [
        'Templates executivos prontos para diferentes indústrias',
        'Geração automática de insights e conclusões',
        'Exportação em PDF, Word e PowerPoint',
        'Gráficos integrados com qualidade de impressão',
        'Narrativa automática dos dados com recomendações'
      ],
      action: 'Gerar Relatório',
      metrics: '10+ templates profissionais'
    },
    {
      id: 'learning',
      icon: <School sx={{ fontSize: 24, color: 'white' }} />,
      title: 'Academia de Data Science',
      description: 'Programa completo de capacitação em análise de dados, estatística e machine learning com certificação.',
      benefits: [
        'Cursos estruturados do básico ao avançado',
        'Tutoriais interativos com datasets reais',
        'Certificações reconhecidas pela indústria',
        'Projetos práticos com feedback automatizado',
        'Mentoria virtual com IA especializada'
      ],
      action: 'Começar Aprendizado',
      metrics: '50+ horas de conteúdo'
    },
    {
      id: 'opendata',
      icon: <Public sx={{ fontSize: 24, color: 'white' }} />,
      title: 'Portal de Dados Abertos SC',
      description: 'Acesso direto e integrado aos datasets oficiais do governo de Santa Catarina com APIs atualizadas em tempo real.',
      benefits: [
        'Dados governamentais sempre atualizados (saúde, educação, economia)',
        'APIs REST para integração automatizada',
        'Datasets pré-processados e validados',
        'Análises comparativas entre municípios',
        'Indicadores socioeconômicos em tempo real'
      ],
      action: 'Explorar Dados Públicos',
      metrics: '200+ datasets disponíveis'
    }
  ];

  const quickTourSteps = [
    {
      title: 'Bem-vindo ao DataScience Pro!',
      content: 'Esta é a plataforma mais completa para análise de dados. Vamos fazer um tour rápido?',
      action: 'Começar Tour'
    },
    {
      title: 'Upload de Dados',
      content: 'Comece carregando seus dados na primeira aba. Suportamos CSV, Excel, JSON e muito mais.',
      action: 'Próximo'
    },
    {
      title: 'Análise Automática',
      content: 'Nossa IA analisa seus dados automaticamente e gera insights valiosos.',
      action: 'Próximo'
    },
    {
      title: 'Visualizações',
      content: 'Crie gráficos profissionais com poucos cliques. Totalmente personalizáveis.',
      action: 'Próximo'
    },
    {
      title: 'Pronto para começar!',
      content: 'Agora você está pronto para explorar todos os recursos. Boa análise!',
      action: 'Começar Análise'
    }
  ];

  const handleFeatureClick = (featureId: string) => {
    if (!onNavigateToTab) {
      onStartAnalysis();
      return;
    }

    switch (featureId) {
      case 'upload':
        onStartAnalysis();
        onNavigateToTab(0);
        break;
      case 'analysis':
        onStartAnalysis();
        onNavigateToTab(1);
        break;
      case 'visualization':
        onStartAnalysis();
        onNavigateToTab(2);
        break;
      case 'reports':
        onStartAnalysis();
        onNavigateToTab(3);
        break;
      case 'learning':
        onStartAnalysis();
        onNavigateToTab(4);
        break;
      case 'opendata':
        onStartAnalysis();
        onNavigateToTab(5);
        break;
      default:
        onStartAnalysis();
        break;
    }
  };

  const startQuickTour = () => {
    setQuickTourStep(0);
    setTutorialOpen(true);
  };

  const nextTourStep = () => {
    if (quickTourStep < quickTourSteps.length - 1) {
      setQuickTourStep(quickTourStep + 1);
    } else {
      setTutorialOpen(false);
      onStartAnalysis();
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #263238 0%, #37474f 100%)', 
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Corporate Background Pattern */}
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20.5H20z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: { xs: 4, md: 8 } }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 }, color: 'white' }}>
          <Typography variant="h1" component="h1" gutterBottom sx={{ 
            fontWeight: 700, 
            mb: 2,
            fontSize: { xs: '2.5rem', md: '4rem', lg: '4.5rem' },
            letterSpacing: '-0.02em',
            color: '#ffffff'
          }}>
            DataScience Pro
          </Typography>
          
          <Typography variant="h4" sx={{ 
            mb: 3, 
            fontWeight: 300,
            fontSize: { xs: '1.25rem', md: '1.75rem', lg: '2rem' },
            color: '#cfd8dc',
            letterSpacing: '0.5px'
          }}>
            Plataforma Empresarial de Análise de Dados
          </Typography>
          
          <Typography variant="h6" sx={{ 
            mb: 6, 
            opacity: 0.9,
            maxWidth: 800,
            mx: 'auto',
            lineHeight: 1.6,
            fontSize: { xs: '1rem', md: '1.1rem' },
            color: '#b0bec5'
          }}>
            Solução completa para transformar dados corporativos em insights estratégicos. 
            Inteligência artificial, automação avançada e relatórios executivos em uma plataforma única.
          </Typography>
          
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={3} 
            justifyContent="center" 
            sx={{ mb: 8 }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrow />}
              onClick={onStartAnalysis}
              sx={{ 
                px: { xs: 6, md: 10 }, 
                py: { xs: 2, md: 2.5 },
                fontSize: { xs: '1.1rem', md: '1.2rem' },
                fontWeight: 600,
                background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                boxShadow: '0 8px 32px rgba(25, 118, 210, 0.3)',
                borderRadius: 2,
                textTransform: 'none',
                minWidth: { xs: 200, md: 240 },
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 40px rgba(25, 118, 210, 0.4)',
                  background: 'linear-gradient(45deg, #1565c0 30%, #2196f3 90%)',
                }
              }}
            >
              Iniciar Análise
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              startIcon={<VideoLibrary />}
              onClick={startQuickTour}
              sx={{ 
                px: { xs: 6, md: 10 }, 
                py: { xs: 2, md: 2.5 },
                fontSize: { xs: '1.1rem', md: '1.2rem' },
                fontWeight: 600,
                borderColor: '#546e7a',
                color: '#cfd8dc',
                borderRadius: 2,
                textTransform: 'none',
                minWidth: { xs: 200, md: 240 },
                borderWidth: '2px',
                '&:hover': {
                  borderColor: '#78909c',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  transform: 'translateY(-2px)',
                  borderWidth: '2px',
                }
              }}
            >
              Demonstração
            </Button>
          </Stack>

          {/* Professional Stats */}
          <Grid container spacing={2} justifyContent="center" sx={{ maxWidth: 600, mx: 'auto' }}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#42a5f5', mb: 0.5 }}>
                  50+
                </Typography>
                <Typography variant="body2" sx={{ color: '#90a4ae', fontWeight: 500 }}>
                  Análises Estatísticas
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#42a5f5', mb: 0.5 }}>
                  15+
                </Typography>
                <Typography variant="body2" sx={{ color: '#90a4ae', fontWeight: 500 }}>
                  Formatos de Dados
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#42a5f5', mb: 0.5 }}>
                  24/7
                </Typography>
                <Typography variant="body2" sx={{ color: '#90a4ae', fontWeight: 500 }}>
                  Disponibilidade
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Features Grid */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {features.map((feature) => (
            <Grid item xs={12} md={6} lg={4} key={feature.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  borderRadius: 3,
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.98) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(148, 163, 184, 0.15)',
                  overflow: 'hidden',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'linear-gradient(90deg, #1976d2, #42a5f5, #1976d2)',
                    transform: 'translateX(-100%)',
                    transition: 'transform 0.6s ease'
                  },
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
                    background: '#ffffff',
                    borderColor: 'rgba(25, 118, 210, 0.3)',
                    '&::before': {
                      transform: 'translateX(0)'
                    }
                  }
                }}
                onClick={() => handleFeatureClick(feature.id)}
              >
                <CardContent sx={{ flex: 1, textAlign: 'center', p: 3 }}>
                  <Box sx={{ 
                    width: 56, 
                    height: 56, 
                    margin: '0 auto 20px',
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                    boxShadow: '0 8px 24px rgba(25, 118, 210, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {feature.icon}
                  </Box>
                  
                  <Typography variant="h6" gutterBottom sx={{ 
                    fontWeight: 700,
                    color: '#1a365d',
                    mb: 1.5,
                    fontSize: '1.2rem',
                    lineHeight: 1.3
                  }}>
                    {feature.title}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ 
                    mb: 2.5,
                    lineHeight: 1.6,
                    fontSize: '0.875rem',
                    color: '#4a5568'
                  }}>
                    {feature.description}
                  </Typography>

                  <List dense sx={{ mb: 2.5, textAlign: 'left' }}>
                    {feature.benefits.slice(0, 3).map((benefit, index) => (
                      <ListItem key={index} sx={{ py: 0.25, px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 28 }}>
                          <CheckCircle sx={{ fontSize: 16, color: '#10b981' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={benefit}
                          primaryTypographyProps={{ 
                            variant: 'body2',
                            fontWeight: 500,
                            color: '#6b7280',
                            fontSize: '0.8rem',
                            lineHeight: 1.4
                          }}
                        />
                      </ListItem>
                    ))}
                    {feature.benefits.length > 3 && (
                      <Typography variant="caption" sx={{ 
                        color: '#9ca3af', 
                        fontStyle: 'italic',
                        fontSize: '0.7rem',
                        ml: 3.5
                      }}>
                        +{feature.benefits.length - 3} recursos adicionais
                      </Typography>
                    )}
                  </List>

                  <Button
                    variant="contained"
                    fullWidth
                    endIcon={<ArrowForward sx={{ fontSize: 18 }} />}
                    sx={{
                      mt: 'auto',
                      py: 1.2,
                      fontWeight: 600,
                      background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                      borderRadius: 2.5,
                      textTransform: 'none',
                      fontSize: '0.9rem',
                      boxShadow: '0 4px 15px rgba(25, 118, 210, 0.25)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
                        boxShadow: '0 6px 20px rgba(25, 118, 210, 0.35)',
                        transform: 'translateY(-1px)',
                      }
                    }}
                  >
                    {feature.action}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Corporate CTA Section */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Paper 
            elevation={0}
            sx={{ 
              p: { xs: 4, md: 8 }, 
              background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
              borderRadius: 4,
              border: '1px solid #e0e0e0',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)'
            }}
          >
            <Typography variant="h3" gutterBottom sx={{ 
              fontWeight: 700,
              color: '#263238',
              mb: 3,
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}>
              Pronto para Elevar sua Análise de Dados?
            </Typography>
            
            <Typography variant="h6" color="text.secondary" sx={{ 
              mb: 5, 
              lineHeight: 1.6,
              maxWidth: 700,
              mx: 'auto',
              color: '#546e7a'
            }}>
              Transforme dados em decisões estratégicas com nossa plataforma empresarial. 
              Comece gratuitamente e descubra o poder da análise automatizada.
            </Typography>
            
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
              <Button
                variant="contained"
                size="large"
                onClick={onStartAnalysis}
                sx={{
                  px: 6,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                  borderRadius: 2,
                  textTransform: 'none',
                  minWidth: 200,
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1565c0 30%, #2196f3 90%)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                Começar Gratuitamente
              </Button>
              
              <Button
                variant="outlined"
                size="large"
                onClick={startQuickTour}
                sx={{
                  px: 6,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderColor: '#546e7a',
                  color: '#546e7a',
                  borderRadius: 2,
                  textTransform: 'none',
                  minWidth: 200,
                  borderWidth: '2px',
                  '&:hover': {
                    borderColor: '#37474f',
                    backgroundColor: 'rgba(84, 110, 122, 0.04)',
                    transform: 'translateY(-2px)',
                    borderWidth: '2px',
                  }
                }}
              >
                Ver Demonstração
              </Button>
            </Stack>
          </Paper>
        </Box>
      </Container>

      {/* Quick Tour Dialog */}
      <Dialog
        open={tutorialOpen}
        onClose={() => setTutorialOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
          }
        }}
      >
        <DialogTitle sx={{ 
          textAlign: 'center', 
          fontWeight: 700,
          fontSize: '1.5rem',
          color: '#263238'
        }}>
          {quickTourSteps[quickTourStep]?.title}
        </DialogTitle>
        
        <DialogContent sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
            {quickTourSteps[quickTourStep]?.content}
          </Typography>
        </DialogContent>
        
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button
            variant="contained"
            onClick={nextTourStep}
            sx={{
              px: 4,
              py: 1,
              fontWeight: 700,
              background: 'linear-gradient(45deg, #263238 30%, #37474f 90%)',
              borderRadius: 2,
              textTransform: 'none',
            }}
          >
            {quickTourSteps[quickTourStep]?.action}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WelcomePageEnhanced;
