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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Chip,
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
      icon: <CloudUpload sx={{ fontSize: 20, color: 'white' }} />,
      title: 'Upload Corporativo Inteligente',
      description: 'Sistema empresarial de ingestão de dados com validação automática, ETL integrado e processamento distribuído para grandes volumes.',
      benefits: [
        'Suporte nativo a 25+ formatos empresariais (CSV, Excel, JSON, Parquet, SQL, XML, ORC, Avro)',
        'ETL automatizado com transformações customizáveis e pipeline de dados',
        'Validação automática ACID, detecção de anomalias e limpeza inteligente',
        'API REST para integração contínua e streaming de dados em tempo real',
        'Processamento distribuído com Apache Spark para datasets de TB+',
        'Versionamento de dados com controle de mudanças e auditoria completa',
        'Integração com AWS S3, Azure Blob, Google Cloud e sistemas corporativos'
      ],
      action: 'Iniciar Ingestão Enterprise',
      metrics: '5M+ arquivos processados',
      category: 'Data Engineering'
    },
    {
      id: 'analysis',
      icon: <Analytics sx={{ fontSize: 20, color: 'white' }} />,
      title: 'Análise Estatística Avançada',
      description: 'Suíte completa de análises estatísticas, econométricas e machine learning com interpretação automática por IA.',
      benefits: [
        'Estatística inferencial completa (95+ testes paramétricos e não-paramétricos)',
        'Análise multivariada: PCA, Factor Analysis, Cluster Analysis, MANOVA',
        'Econometria avançada: séries temporais, cointegração, modelos ARIMA/GARCH',
        'Machine Learning: classificação, regressão, clustering, deep learning',
        'Análise de sobrevivência, análise bayesiana e métodos não-paramétricos',
        'Testes A/B automatizados com cálculo de significância estatística',
        'Interpretação automática em linguagem empresarial gerada por GPT-4'
      ],
      action: 'Explorar Análises Enterprise',
      metrics: '180+ análises disponíveis',
      category: 'Advanced Analytics'
    },
    {
      id: 'visualization',
      icon: <Assessment sx={{ fontSize: 20, color: 'white' }} />,
      title: 'Business Intelligence & Dashboards',
      description: 'Plataforma de BI empresarial com dashboards interativos, storytelling de dados e visualizações executivas.',
      benefits: [
        'Dashboards executivos em tempo real com KPIs personalizáveis',
        '50+ tipos de visualizações profissionais (Sankey, Treemap, Heatmaps)',
        'Storytelling automático de dados com narrativa inteligente',
        'Integração com Tableau, Power BI e ferramentas corporativas',
        'Exportação para apresentações executivas (PPT, PDF) automática',
        'Alertas inteligentes e monitoramento de métricas críticas',
        'Embedding em aplicações corporativas via iFrame/API'
      ],
      action: 'Criar Dashboard Executivo',
      metrics: '40+ tipos de visualizações',
      category: 'Business Intelligence'
    },
    {
      id: 'reports',
      icon: <Article sx={{ fontSize: 20, color: 'white' }} />,
      title: 'Relatórios Executivos Automatizados',
      description: 'Geração automática de relatórios empresariais com insights estratégicos, recomendações e análise de impacto.',
      benefits: [
        'Templates executivos para diferentes indústrias (financeiro, saúde, varejo)',
        'Geração automática de insights estratégicos e recomendações de negócio',
        'Análise de ROI, impacto financeiro e cenários what-if automatizados',
        'Relatórios regulatórios e compliance (SOX, IFRS, LGPD) pré-configurados',
        'Distribuição automática por email/Slack com agendamento inteligente',
        'Versionamento e histórico completo de relatórios com diff tracking',
        'Exportação multi-formato (PDF executivo, Excel, Word, PowerPoint)'
      ],
      action: 'Gerar Relatório C-Level',
      metrics: '25+ templates executivos',
      category: 'Executive Reporting'
    },
    {
      id: 'learning',
      icon: <School sx={{ fontSize: 20, color: 'white' }} />,
      title: 'Corporate Data Science Academy',
      description: 'Programa corporativo de capacitação em data science com certificação internacional e mentoria especializada.',
      benefits: [
        'Trilhas de aprendizado personalizadas por função (analista, cientista, gestor)',
        'Certificações reconhecidas internacionalmente (Microsoft, Google, AWS)',
        'Projetos práticos com dados reais da empresa e feedback especializado',
        'Mentoria 1:1 com cientistas de dados sênior e consultores especializados',
        'Workshops executivos sobre ROI de data science e transformação digital',
        'Biblioteca de casos de uso por indústria com implementação prática',
        'Gamificação corporativa com rankings e reconhecimento de achievements'
      ],
      action: 'Iniciar Programa Corporativo',
      metrics: '120+ horas de conteúdo premium',
      category: 'Corporate Learning'
    },
    {
      id: 'opendata',
      icon: <Public sx={{ fontSize: 20, color: 'white' }} />,
      title: 'API Dados Governamentais Tempo Real',
      description: 'Integração completa com APIs governamentais federais, estaduais e municipais com atualização em tempo real.',
      benefits: [
        'APIs federais: IBGE, Banco Central, Receita Federal, INEP, DATASUS',
        'Dados estaduais SC: SES, SEF, SPG, FATMA com atualização automática',
        'Indicadores municipais: PIB, população, saúde, educação, segurança',
        'Séries históricas completas com análise de tendências automatizada',
        'Cruzamento inteligente de bases com análise de correlações sociais',
        'Alertas de mudanças em indicadores críticos e benchmarking automático',
        'Compliance total com LGPD e transparência pública garantida'
      ],
      action: 'Conectar APIs Governamentais',
      metrics: '500+ APIs integradas',
      category: 'Government Data'
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
            fontWeight: 800, 
            mb: 2,
            fontSize: { xs: '2.8rem', md: '4.2rem', lg: '5rem' },
            letterSpacing: '-0.03em',
            background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Enterprise Data Platform
          </Typography>
          
          <Typography variant="h4" sx={{ 
            mb: 3, 
            fontWeight: 300,
            fontSize: { xs: '1.4rem', md: '1.8rem', lg: '2.2rem' },
            color: '#cbd5e1',
            letterSpacing: '0.5px'
          }}>
            Solução Corporativa com IA, APIs Tempo Real & Automação
          </Typography>
          
          <Typography variant="h6" sx={{ 
            mb: 6, 
            opacity: 0.95,
            maxWidth: 900,
            mx: 'auto',
            lineHeight: 1.6,
            fontSize: { xs: '1.1rem', md: '1.25rem' },
            color: '#b0bec5',
            fontWeight: 400
          }}>
            Transforme dados corporativos em insights estratégicos com nossa plataforma enterprise. 
            180+ análises avançadas, 500+ APIs integradas e compliance total para decisões data-driven.
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
                px: { xs: 8, md: 12 }, 
                py: { xs: 2.5, md: 3 },
                fontSize: { xs: '1.15rem', md: '1.3rem' },
                fontWeight: 700,
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                boxShadow: '0 12px 40px rgba(59, 130, 246, 0.4)',
                borderRadius: 3,
                textTransform: 'none',
                minWidth: { xs: 260, md: 300 },
                border: '1px solid rgba(59, 130, 246, 0.3)',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 16px 50px rgba(59, 130, 246, 0.5)',
                  background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                }
              }}
            >
              Iniciar Análise Enterprise
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              startIcon={<VideoLibrary />}
              onClick={startQuickTour}
              sx={{ 
                px: { xs: 8, md: 12 }, 
                py: { xs: 2.5, md: 3 },
                fontSize: { xs: '1.15rem', md: '1.3rem' },
                fontWeight: 700,
                borderColor: '#475569',
                color: '#e2e8f0',
                borderRadius: 3,
                textTransform: 'none',
                minWidth: { xs: 260, md: 300 },
                borderWidth: '2px',
                background: 'rgba(15, 23, 42, 0.3)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  borderColor: '#3b82f6',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  transform: 'translateY(-3px)',
                  borderWidth: '2px',
                  boxShadow: '0 12px 40px rgba(59, 130, 246, 0.2)'
                }
              }}
            >
              Demo Executiva
            </Button>
          </Stack>

          {/* Enterprise Metrics */}
          <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: 800, mx: 'auto' }}>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ 
                  fontWeight: 800, 
                  background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  mb: 0.5 
                }}>
                  180+
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 600, fontSize: '0.9rem' }}>
                  Análises Avançadas
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ 
                  fontWeight: 800, 
                  background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  mb: 0.5 
                }}>
                  500+
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 600, fontSize: '0.9rem' }}>
                  APIs Tempo Real
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ 
                  fontWeight: 800, 
                  background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  mb: 0.5 
                }}>
                  99.9%
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 600, fontSize: '0.9rem' }}>
                  Uptime SLA
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ 
                  fontWeight: 800, 
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  mb: 0.5 
                }}>
                  24/7
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 600, fontSize: '0.9rem' }}>
                  Suporte Enterprise
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
                <CardContent sx={{ flex: 1, p: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* Modern Header with Category Tag */}
                  <Box sx={{ 
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                    p: 3,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '1px',
                      background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent)'
                    }
                  }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 44,
                        height: 44,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                      }}>
                        {feature.icon}
                      </Box>
                      <Chip 
                        label={feature.category}
                        size="small"
                        sx={{ 
                          backgroundColor: 'rgba(59, 130, 246, 0.15)',
                          color: '#60a5fa',
                          fontWeight: 600,
                          fontSize: '0.65rem',
                          border: '1px solid rgba(59, 130, 246, 0.3)'
                        }}
                      />
                    </Box>
                    
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: '#f8fafc',
                        fontWeight: 700,
                        mb: 1,
                        fontSize: '1.1rem',
                        lineHeight: 1.3
                      }}
                    >
                      {feature.title}
                    </Typography>
                    
                    <Chip 
                      label={feature.metrics}
                      size="small"
                      sx={{ 
                        backgroundColor: 'rgba(16, 185, 129, 0.15)',
                        color: '#34d399',
                        fontWeight: 600,
                        fontSize: '0.7rem',
                        border: '1px solid rgba(16, 185, 129, 0.3)'
                      }}
                    />
                  </Box>

                  {/* Content Area */}
                  <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#64748b',
                        mb: 2.5,
                        lineHeight: 1.6,
                        fontSize: '0.875rem',
                        fontWeight: 500
                      }}
                    >
                      {feature.description}
                    </Typography>

                    {/* Enhanced Benefits List */}
                    <Box sx={{ mb: 3, flexGrow: 1 }}>
                      {feature.benefits.slice(0, 4).map((benefit, index) => (
                        <Box key={index} sx={{ 
                          display: 'flex', 
                          alignItems: 'flex-start', 
                          mb: 1.5,
                          p: 1,
                          borderRadius: 1.5,
                          transition: 'background-color 0.2s ease',
                          '&:hover': {
                            backgroundColor: 'rgba(59, 130, 246, 0.05)'
                          }
                        }}>
                          <Box sx={{
                            width: 16,
                            height: 16,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 1.5,
                            mt: 0.2,
                            flexShrink: 0
                          }}>
                            <CheckCircle sx={{ 
                              fontSize: 12, 
                              color: 'white'
                            }} />
                          </Box>
                          <Typography variant="body2" sx={{ 
                            color: '#475569', 
                            fontSize: '0.8rem',
                            lineHeight: 1.5,
                            fontWeight: 500
                          }}>
                            {benefit}
                          </Typography>
                        </Box>
                      ))}
                      {feature.benefits.length > 4 && (
                        <Typography variant="caption" sx={{ 
                          color: '#94a3b8', 
                          fontStyle: 'italic',
                          fontSize: '0.7rem',
                          ml: 4,
                          display: 'block',
                          mt: 1
                        }}>
                          +{feature.benefits.length - 4} funcionalidades enterprise adicionais
                        </Typography>
                      )}
                    </Box>
                    
                    {/* Professional CTA Button */}
                    <Button
                      variant="contained"
                      fullWidth
                      endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
                      sx={{
                        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                        color: '#f8fafc',
                        borderRadius: 2,
                        py: 1.5,
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        border: '1px solid #334155',
                        boxShadow: '0 4px 12px rgba(15, 23, 42, 0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
                          borderColor: '#3b82f6',
                          boxShadow: '0 6px 20px rgba(59, 130, 246, 0.25)',
                          transform: 'translateY(-1px)',
                          color: '#f8fafc'
                        }
                      }}
                    >
                      {feature.action}
                    </Button>
                  </Box>
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
