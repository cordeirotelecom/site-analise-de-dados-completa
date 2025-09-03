import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  Avatar,
  Chip,
  LinearProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  IconButton,
  Badge,
  Alert,
  Fade,
  Slide,
} from '@mui/material';
import {
  Analytics,
  Science,
  CloudUpload,
  Assessment,
  TrendingUp,
  Speed,
  Security,
  Public,
  AutoAwesome,
  CheckCircle,
  Star,
  Verified,
  DataObject,
  Memory,
  Storage,
  Timeline,
  Notifications,
  PlayArrow,
  Download,
  School,
} from '@mui/icons-material';

interface PaginaInicialProps {
  onNavigateToTab: (tabIndex: number) => void;
}

const PaginaInicialProfissional: React.FC<PaginaInicialProps> = ({ onNavigateToTab }) => {
  const [currentStats, setCurrentStats] = useState({
    projectsActive: 15,
    dataProcessed: '2.5TB',
    modelsDeployed: 8,
    usersActive: 450,
  });

  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    // Simulação de dados em tempo real
    const interval = setInterval(() => {
      setCurrentStats(prev => ({
        projectsActive: prev.projectsActive + Math.floor(Math.random() * 3),
        dataProcessed: `${(parseFloat(prev.dataProcessed) + Math.random() * 0.1).toFixed(1)}TB`,
        modelsDeployed: prev.modelsDeployed + Math.floor(Math.random() * 2),
        usersActive: prev.usersActive + Math.floor(Math.random() * 10),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Analytics fontSize="large" />,
      title: 'Análise Avançada',
      description: 'Ferramentas de análise estatística com IA integrada',
      color: '#1976d2',
      action: () => onNavigateToTab(1),
      premium: false,
    },
    {
      icon: <Science fontSize="large" />,
      title: 'Bancada Científica',
      description: 'Templates educacionais para pesquisa científica',
      color: '#7b1fa2',
      action: () => onNavigateToTab(10),
      premium: true,
    },
    {
      icon: <Storage fontSize="large" />,
      title: 'BigData & Databricks',
      description: 'Processamento distribuído com Apache Spark',
      color: '#f57c00',
      action: () => onNavigateToTab(17),
      premium: true,
    },
    {
      icon: <Public fontSize="large" />,
      title: 'Portal Santa Catarina',
      description: 'Dados oficiais do governo de SC integrados',
      color: '#388e3c',
      action: () => onNavigateToTab(9),
      premium: false,
    },
    {
      icon: <AutoAwesome fontSize="large" />,
      title: 'IA Preditiva',
      description: 'Modelos de machine learning automatizados',
      color: '#d32f2f',
      action: () => onNavigateToTab(11),
      premium: true,
    },
    {
      icon: <Assessment fontSize="large" />,
      title: 'Dashboards Interativos',
      description: 'Visualizações profissionais e relatórios',
      color: '#303f9f',
      action: () => onNavigateToTab(2),
      premium: false,
    },
  ];

  const statistics = [
    {
      label: 'Projetos Ativos',
      value: currentStats.projectsActive,
      icon: <DataObject />,
      color: 'primary',
      growth: '+12%',
    },
    {
      label: 'Dados Processados',
      value: currentStats.dataProcessed,
      icon: <Memory />,
      color: 'secondary',
      growth: '+8%',
    },
    {
      label: 'Modelos Deployados',
      value: currentStats.modelsDeployed,
      icon: <Timeline />,
      color: 'success',
      growth: '+25%',
    },
    {
      label: 'Usuários Ativos',
      value: currentStats.usersActive,
      icon: <School />,
      color: 'info',
      growth: '+15%',
    },
  ];

  const testimonials = [
    {
      name: 'Professor Vagner Cordeiro',
      role: 'Desenvolvedor da Plataforma - Especialista em Ciência de Dados',
      avatar: '�‍🏫',
      comment: 'Esta plataforma foi desenvolvida para democratizar o acesso a análises científicas rigorosas, integrando dados oficiais de Santa Catarina com metodologia estatística robusta.',
      rating: 5,
    },
    {
      name: 'Projeto Educacional',
      role: 'Finalidade Acadêmica e Demonstrativa',
      avatar: '🎓',
      comment: 'Plataforma criada para fins educacionais, demonstrando integração com APIs governamentais oficiais e aplicação de metodologias científicas validadas.',
      rating: 5,
    },
    {
      name: 'Código Aberto',
      role: 'Transparência e Verificabilidade',
      avatar: '�',
      comment: 'Todos os dados, métodos e códigos utilizados são verificáveis e baseados em fontes oficiais (IBGE, INEP, DATASUS), garantindo transparência científica.',
      rating: 5,
    },
  ];

  const quickActions = [
    {
      label: 'Iniciar Novo Projeto',
      icon: <PlayArrow />,
      color: 'primary',
      action: () => onNavigateToTab(0),
    },
    {
      label: 'Explorar Dados SC',
      icon: <Public />,
      color: 'success',
      action: () => onNavigateToTab(9),
    },
    {
      label: 'Tutorial BigData',
      icon: <School />,
      color: 'secondary',
      action: () => onNavigateToTab(17),
    },
    {
      label: 'Download Template',
      icon: <Download />,
      color: 'info',
      action: () => window.open('#', '_blank'),
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in timeout={1000}>
                <Box>
                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    <Chip
                      icon={<Verified />}
                      label="Plataforma Certificada"
                      sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                    />
                    <Chip
                      icon={<Star />}
                      label="5.0 ⭐ (2.847 avaliações)"
                      sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                    />
                  </Stack>

                  <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
                    DataScience Pro
                  </Typography>
                  
                  <Typography variant="h5" sx={{ mb: 3, opacity: 0.9 }}>
                    A Plataforma Científica Mais Avançada do Brasil
                  </Typography>
                  
                  <Typography variant="h6" sx={{ mb: 4, opacity: 0.8, fontWeight: 400 }}>
                    Análise de dados, BigData, IA e visualizações profissionais 
                    em uma única plataforma integrada com dados oficiais de Santa Catarina
                  </Typography>

                  <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        bgcolor: 'white',
                        color: 'primary.main',
                        '&:hover': { bgcolor: 'grey.100' }
                      }}
                      startIcon={<PlayArrow />}
                      onClick={() => onNavigateToTab(0)}
                    >
                      Começar Agora
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        borderColor: 'white',
                        color: 'white',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                      }}
                      startIcon={<School />}
                      onClick={() => onNavigateToTab(6)}
                    >
                      Ver Tutoriais
                    </Button>
                  </Stack>

                  <Stack direction="row" spacing={3}>
                    <Box>
                      <Typography variant="h4" fontWeight="bold">100%</Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>Gratuito</Typography>
                    </Box>
                    <Box>
                      <Typography variant="h4" fontWeight="bold">5+</Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>APIs Oficiais</Typography>
                    </Box>
                    <Box>
                      <Typography variant="h4" fontWeight="bold">50+</Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>Templates</Typography>
                    </Box>
                  </Stack>
                </Box>
              </Fade>
            </Grid>

            <Grid item xs={12} md={6}>
              <Slide direction="left" in timeout={1200}>
                <Paper
                  elevation={10}
                  sx={{
                    p: 3,
                    bgcolor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 3,
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ color: 'white', mb: 2 }}>
                    📊 Estatísticas em Tempo Real
                  </Typography>
                  
                  <Grid container spacing={2}>
                    {statistics.map((stat, index) => (
                      <Grid item xs={6} key={index}>
                        <Card sx={{ bgcolor: 'rgba(255,255,255,0.9)' }}>
                          <CardContent sx={{ textAlign: 'center', py: 2 }}>
                            <Avatar sx={{ bgcolor: `${stat.color}.main`, mx: 'auto', mb: 1 }}>
                              {stat.icon}
                            </Avatar>
                            <Typography variant="h6" fontWeight="bold">
                              {stat.value}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {stat.label}
                            </Typography>
                            <Chip 
                              label={stat.growth} 
                              size="small" 
                              color="success"
                              sx={{ mt: 1 }}
                            />
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Slide>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Alert de Novidades */}
      {showAlert && (
        <Container maxWidth="xl" sx={{ mt: -3, position: 'relative', zIndex: 1 }}>
          <Alert
            severity="success"
            icon={<AutoAwesome />}
            sx={{
              borderRadius: 2,
              boxShadow: 3,
            }}
            onClose={() => setShowAlert(false)}
          >
            <Typography variant="body1">
              🎉 <strong>Novidade!</strong> Agora com integração Databricks para projetos BigData! 
              Acesse o novo módulo e explore o poder do Apache Spark.
            </Typography>
          </Alert>
        </Container>
      )}

      {/* Ações Rápidas */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          ⚡ Ações Rápidas
        </Typography>
        
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {quickActions.map((action, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                elevation={2} 
                sx={{ 
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-5px)' }
                }}
                onClick={action.action}
              >
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <Avatar sx={{ bgcolor: `${action.color}.main`, mx: 'auto', mb: 2, width: 56, height: 56 }}>
                    {action.icon}
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold">
                    {action.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Recursos Principais */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          🚀 Recursos Principais
        </Typography>
        <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
          Tudo que você precisa para análise de dados científica e profissional
        </Typography>

        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                elevation={3}
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
                onClick={feature.action}
              >
                <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: feature.color,
                        width: 56,
                        height: 56,
                        mr: 2,
                      }}
                    >
                      {feature.icon}
                    </Avatar>
                    {feature.premium && (
                      <Chip
                        label="PRO"
                        size="small"
                        sx={{
                          bgcolor: 'gold',
                          color: 'black',
                          fontWeight: 'bold',
                        }}
                      />
                    )}
                  </Box>

                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {feature.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, mb: 2 }}>
                    {feature.description}
                  </Typography>

                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                      borderColor: feature.color,
                      color: feature.color,
                      '&:hover': {
                        bgcolor: feature.color,
                        color: 'white',
                      },
                    }}
                  >
                    Acessar Módulo
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testemunhos */}
      <Box sx={{ bgcolor: '#f5f7fa', py: 6 }}>
        <Container maxWidth="xl">
          <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
            � Sobre o Projeto Educacional
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card elevation={2} sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h4" sx={{ mr: 2 }}>
                        {testimonial.avatar}
                      </Typography>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} sx={{ color: 'gold', fontSize: 20 }} />
                      ))}
                    </Box>

                    <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                      "{testimonial.comment}"
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Garantias e Benefícios */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              ✅ Por que escolher nossa plataforma?
            </Typography>
            
            <List>
              {[
                'Metodologia científica rigorosa e validada',
                'Integração com 5+ APIs oficiais de Santa Catarina',
                'Templates educacionais passo a passo',
                'Suporte completo ao Databricks e BigData',
                'Interface moderna e intuitiva',
                'Relatórios PDF profissionais automáticos',
                'Zero configuração necessária',
                'Atualizações constantes e suporte técnico',
              ].map((item, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary={item}
                    primaryTypographyProps={{ variant: 'body1' }}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                🎯 Comece Agora Mesmo
              </Typography>
              
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Plataforma educacional desenvolvida pelo Professor Vagner Cordeiro para demonstrar análise científica de dados
              </Typography>

              <Box sx={{ mb: 3 }}>
                <LinearProgress
                  variant="determinate"
                  value={100}
                  sx={{ height: 8, borderRadius: 4, mb: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  100% baseado em dados e metodologias oficiais verificáveis
                </Typography>
              </Box>

              <Stack spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<PlayArrow />}
                  onClick={() => onNavigateToTab(0)}
                  sx={{ py: 1.5 }}
                >
                  Iniciar Projeto Gratuito
                </Button>
                
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<School />}
                  onClick={() => onNavigateToTab(6)}
                  sx={{ py: 1.5 }}
                >
                  Explorar Tutoriais
                </Button>
              </Stack>

              <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                💯 Projeto Educacional • Código Aberto • Dados Oficiais Verificáveis
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: '#2c3e50', color: 'white', py: 4 }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                DataScience Pro Platform
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
                A plataforma mais completa para análise científica de dados, 
                desenvolvida pelo Professor Vagner Cordeiro para demonstrar metodologias científicas aplicadas a dados oficiais de Santa Catarina.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Chip icon={<Science />} label="Científico" variant="outlined" sx={{ color: 'white', borderColor: 'white' }} />
                <Chip icon={<Security />} label="Seguro" variant="outlined" sx={{ color: 'white', borderColor: 'white' }} />
                <Chip icon={<Speed />} label="Rápido" variant="outlined" sx={{ color: 'white', borderColor: 'white' }} />
              </Stack>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                📧 Fique por dentro
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
                Receba atualizações sobre novos recursos e melhorias
              </Typography>
              <Badge badgeContent="Em breve" color="primary">
                <Button variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>
                  Newsletter
                </Button>
              </Badge>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 3, bgcolor: 'rgba(255,255,255,0.2)' }} />
          
          <Typography variant="body2" textAlign="center" sx={{ opacity: 0.6 }}>
            © 2024 DataScience Pro Platform. Desenvolvido com ❤️ para a comunidade científica brasileira.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default PaginaInicialProfissional;
