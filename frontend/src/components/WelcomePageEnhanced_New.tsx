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
  Avatar,
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
      icon: <CloudUpload sx={{ fontSize: 40, color: 'white' }} />,
      title: 'Upload Múltiplo',
      description: 'Carregue múltiplos arquivos CSV, Excel, JSON e Parquet simultaneamente',
      benefits: ['Suporte a 15+ formatos', 'Preview automático', 'Validação inteligente', 'Processamento paralelo'],
      action: 'Experimentar Upload'
    },
    {
      id: 'analysis',
      icon: <Analytics sx={{ fontSize: 40, color: 'white' }} />,
      title: 'Análise Automatizada',
      description: 'Mais de 50 análises estatísticas com interpretações automáticas',
      benefits: ['Estatística descritiva', 'Correlações', 'Testes de hipóteses', 'Outliers detection'],
      action: 'Ver Análises'
    },
    {
      id: 'visualization',
      icon: <Assessment sx={{ fontSize: 40, color: 'white' }} />,
      title: 'Visualizações Interativas',
      description: 'Gráficos profissionais personalizáveis e exportáveis',
      benefits: ['10+ tipos de gráficos', '5 esquemas de cores', 'Animações suaves', 'Exportação HD'],
      action: 'Criar Gráficos'
    },
    {
      id: 'reports',
      icon: <Article sx={{ fontSize: 40, color: 'white' }} />,
      title: 'Relatórios Profissionais',
      description: 'Gere relatórios completos com suas análises',
      benefits: ['Templates prontos', 'Exportação PDF', 'Gráficos inclusos', 'Interpretações automáticas'],
      action: 'Gerar Relatório'
    },
    {
      id: 'learning',
      icon: <School sx={{ fontSize: 40, color: 'white' }} />,
      title: 'Centro de Aprendizagem',
      description: 'Tutoriais interativos para dominar análise de dados',
      benefits: ['Passo a passo', 'Exemplos práticos', 'Diferentes níveis', 'Certificados'],
      action: 'Começar a Aprender'
    },
    {
      id: 'opendata',
      icon: <Public sx={{ fontSize: 40, color: 'white' }} />,
      title: 'Dados Abertos SC',
      description: 'Acesso direto a datasets oficiais de Santa Catarina',
      benefits: ['Dados governamentais', 'Sempre atualizados', 'Pré-processados', 'Análise comparativa'],
      action: 'Explorar Dados'
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
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  borderRadius: 3,
                  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                  border: '1px solid #e0e0e0',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    background: '#ffffff',
                    borderColor: '#1976d2',
                  }
                }}
                onClick={() => handleFeatureClick(feature.id)}
              >
                <CardContent sx={{ flex: 1, textAlign: 'center', p: 4 }}>
                  <Avatar 
                    sx={{ 
                      width: 80, 
                      height: 80, 
                      margin: '0 auto 24px',
                      background: 'linear-gradient(45deg, #263238 30%, #37474f 90%)',
                      boxShadow: '0 8px 24px rgba(38, 50, 56, 0.2)',
                    }}
                  >
                    {feature.icon}
                  </Avatar>
                  
                  <Typography variant="h5" gutterBottom sx={{ 
                    fontWeight: 600,
                    color: '#263238',
                    mb: 2,
                    fontSize: '1.5rem'
                  }}>
                    {feature.title}
                  </Typography>
                  
                  <Typography variant="body1" color="text.secondary" sx={{ 
                    mb: 3,
                    lineHeight: 1.6,
                    fontSize: '1rem',
                    color: '#546e7a'
                  }}>
                    {feature.description}
                  </Typography>

                  <List dense sx={{ mb: 3, textAlign: 'left' }}>
                    {feature.benefits.map((benefit, index) => (
                      <ListItem key={index} sx={{ py: 0.25, px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckCircle sx={{ fontSize: 18, color: '#4caf50' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={benefit}
                          primaryTypographyProps={{ 
                            variant: 'body2',
                            fontWeight: 500,
                            color: '#455a64',
                            fontSize: '0.9rem'
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 'auto',
                      py: 1.5,
                      fontWeight: 600,
                      background: 'linear-gradient(45deg, #263238 30%, #37474f 90%)',
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '1rem',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1c313a 30%, #263238 90%)',
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
