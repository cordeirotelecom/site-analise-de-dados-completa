import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import {
  CloudUpload,
  Analytics,
  Assessment,
  School,
  Public,
  CheckCircle
} from '@mui/icons-material';

interface WelcomePageProps {
  onStartAnalysis: () => void;
  onNavigateToTab?: (tabIndex: number) => void;
}

interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  benefits: string[];
}

const WelcomePageFixed: React.FC<WelcomePageProps> = ({ 
  onStartAnalysis, 
  onNavigateToTab 
}) => {
  const features: Feature[] = [
    {
      id: 'upload',
      icon: <CloudUpload sx={{ fontSize: 24, color: '#2563eb' }} />,
      title: 'Upload e Processamento de Dados',
      description: 'Carregue seus datasets e comece a analisar',
      action: 'Upload de Dados',
      benefits: [
        'Suporte a CSV, Excel, JSON e mais',
        'Limpeza automática de dados',
        'Detecção de tipos de dados',
        'Visualização prévia'
      ]
    },
    {
      id: 'analysis',
      icon: <Analytics sx={{ fontSize: 24, color: '#2563eb' }} />,
      title: 'Análise Estatística Avançada',
      description: 'Análises estatísticas completas e automáticas',
      action: 'Começar Análise',
      benefits: [
        'Estatísticas descritivas',
        'Testes de hipóteses',
        'Correlações e regressões',
        'Análise de tendências'
      ]
    },
    {
      id: 'dashboard',
      icon: <Assessment sx={{ fontSize: 24, color: '#2563eb' }} />,
      title: 'Dashboards e Visualizações',
      description: 'Gráficos interativos e dashboards personalizados',
      action: 'Ver Dashboard',
      benefits: [
        'Gráficos interativos',
        'Dashboards customizáveis',
        'Exportação de imagens',
        'Visualizações 3D'
      ]
    },
    {
      id: 'reports',
      icon: <CheckCircle sx={{ fontSize: 24, color: '#2563eb' }} />,
      title: 'Relatórios Científicos',
      description: 'Geração automática de relatórios em PDF',
      action: 'Gerar Relatório',
      benefits: [
        'Relatórios automatizados',
        'Exportação em PDF',
        'Templates científicos',
        'Análises interpretadas'
      ]
    },
    {
      id: 'learning',
      icon: <School sx={{ fontSize: 24, color: '#2563eb' }} />,
      title: 'Centro de Aprendizado',
      description: 'Tutoriais e recursos educacionais',
      action: 'Aprender',
      benefits: [
        'Tutoriais interativos',
        'Exemplos práticos',
        'Documentação completa',
        'Vídeos explicativos'
      ]
    },
    {
      id: 'opendata',
      icon: <Public sx={{ fontSize: 24, color: '#2563eb' }} />,
      title: 'Dados Abertos Governamentais',
      description: 'Acesso direto a APIs de dados públicos',
      action: 'Explorar Dados',
      benefits: [
        'APIs governamentais',
        'Dados atualizados',
        'Múltiplas fontes',
        'Integração automática'
      ]
    }
  ];

  const handleFeatureClick = (featureId: string) => {
    const featureMap: { [key: string]: number } = {
      'upload': 1,
      'analysis': 2,
      'dashboard': 3,
      'reports': 4,
      'learning': 5,
      'opendata': 6
    };
    
    const tabIndex = featureMap[featureId];
    if (tabIndex !== undefined && onNavigateToTab) {
      onNavigateToTab(tabIndex);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      py: 4
    }}>
      <Container maxWidth="xl">
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.8rem' },
              fontWeight: 700,
              color: '#1f2937',
              mb: 2,
              lineHeight: 1.2
            }}
          >
            DataScience Pro
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: '1rem', md: '1.2rem' },
              color: '#6b7280',
              maxWidth: 600,
              mx: 'auto',
              mb: 4,
              lineHeight: 1.5
            }}
          >
            Plataforma completa para análise de dados, aprendizado de máquina e relatórios científicos
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={onStartAnalysis}
            sx={{
              backgroundColor: '#2563eb',
              py: 1.5,
              px: 4,
              fontSize: '1.1rem',
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 2,
              '&:hover': {
                backgroundColor: '#1d4ed8'
              }
            }}
          >
            Começar Análise
          </Button>
        </Box>

        {/* Features Grid */}
        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item xs={12} md={6} lg={4} key={feature.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  border: '1px solid #e5e7eb',
                  borderRadius: 2,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    borderColor: '#2563eb'
                  }
                }}
                onClick={() => handleFeatureClick(feature.id)}
              >
                <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: 1,
                      backgroundColor: '#eff6ff',
                      mr: 2
                    }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600,
                      color: '#1f2937',
                      fontSize: '1.1rem'
                    }}>
                      {feature.title}
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" sx={{ 
                    color: '#6b7280',
                    mb: 2,
                    lineHeight: 1.5,
                    fontSize: '0.9rem'
                  }}>
                    {feature.description}
                  </Typography>

                  <Box sx={{ mb: 3, flexGrow: 1 }}>
                    {feature.benefits.slice(0, 3).map((benefit, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                        <CheckCircle sx={{ 
                          fontSize: 14, 
                          color: '#10b981', 
                          mr: 1, 
                          mt: 0.2,
                          flexShrink: 0
                        }} />
                        <Typography variant="body2" sx={{ 
                          color: '#4b5563', 
                          fontSize: '0.85rem',
                          lineHeight: 1.4
                        }}>
                          {benefit}
                        </Typography>
                      </Box>
                    ))}
                    {feature.benefits.length > 3 && (
                      <Typography variant="caption" sx={{ 
                        color: '#9ca3af', 
                        fontSize: '0.75rem',
                        ml: 2.5
                      }}>
                        +{feature.benefits.length - 3} funcionalidades
                      </Typography>
                    )}
                  </Box>
                  
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: '#2563eb',
                      py: 1,
                      textTransform: 'none',
                      fontWeight: 500,
                      fontSize: '0.9rem',
                      '&:hover': {
                        backgroundColor: '#1d4ed8'
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
      </Container>
    </Box>
  );
};

export default WelcomePageFixed;
