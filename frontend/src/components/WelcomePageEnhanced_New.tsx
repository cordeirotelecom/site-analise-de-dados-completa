import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Paper,
  Divider,
} from '@mui/material';
import {
  CheckCircle,
  CloudUpload,
  Analytics,
  Assessment,
  School,
  Public,
  TrendingUp,
  Code,
  Map,
  Api,
  Timeline,
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

const WelcomePageEnhanced: React.FC<WelcomePageProps> = ({ 
  onStartAnalysis, 
  onNavigateToTab 
}) => {
  const features: Feature[] = [
    {
      id: 'upload',
      icon: <CloudUpload sx={{ fontSize: 24, color: '#2563eb' }} />,
      title: 'Upload e ETL Automatizado',
      description: 'Carregue dados e execute pipelines de limpeza automática com explicação detalhada',
      action: 'Processar Dados',
      benefits: [
        'ETL automatizado com log detalhado',
        'Detecção de outliers e missing values',
        'Normalização e transformação de dados',
        'Validação de qualidade com métricas',
        'Suporte a 15+ formatos (CSV, JSON, Parquet, SQL)'
      ]
    },
    {
      id: 'analysis',
      icon: <Analytics sx={{ fontSize: 24, color: '#2563eb' }} />,
      title: 'Análise Estatística com Explicação',
      description: 'Métodos estatísticos com explicação passo-a-passo dos cálculos realizados',
      action: 'Executar Análises',
      benefits: [
        'Correlação de Pearson/Spearman com interpretação',
        'Testes de hipóteses (t-test, ANOVA, Chi²)',
        'Regressão linear/múltipla com diagnósticos',
        'Análise de componentes principais (PCA)',
        'Séries temporais com sazonalidade'
      ]
    },
    {
      id: 'dashboard',
      icon: <Assessment sx={{ fontSize: 24, color: '#2563eb' }} />,
      title: 'Visualizações Técnicas Avançadas',
      description: 'Gráficos estatísticos profissionais com controle total dos parâmetros',
      action: 'Criar Gráficos',
      benefits: [
        'Box plots com outliers identificados',
        'Heatmaps de correlação interativos',
        'Gráficos de distribuição com testes',
        'Scatter plots 3D com clustering',
        'Dashboards com filtros dinâmicos'
      ]
    },
    {
      id: 'reports',
      icon: <CheckCircle sx={{ fontSize: 24, color: '#2563eb' }} />,
      title: 'Relatórios Científicos Automáticos',
      description: 'Geração de relatórios técnicos com metodologia e interpretação estatística',
      action: 'Gerar Relatório',
      benefits: [
        'Metodologia detalhada dos testes aplicados',
        'Interpretação automática dos resultados',
        'Formatação científica (APA, ABNT)',
        'Exportação LaTeX e Word',
        'Citações automáticas das fontes'
      ]
    },
    {
      id: 'learning',
      icon: <School sx={{ fontSize: 24, color: '#2563eb' }} />,
      title: 'Centro Técnico de Conhecimento',
      description: 'Explicação detalhada de cada método estatístico com exemplos práticos',
      action: 'Estudar Métodos',
      benefits: [
        'Explicação matemática dos algoritmos',
        'Quando usar cada método estatístico',
        'Interpretação correta dos resultados',
        'Exemplos com datasets reais',
        'Troubleshooting de problemas comuns'
      ]
    },
    {
      id: 'apis',
      icon: <Api sx={{ fontSize: 24, color: '#2563eb' }} />,
      title: 'APIs Governamentais em Tempo Real',
      description: 'Acesso direto a dados oficiais com atualização automática',
      action: 'Conectar APIs',
      benefits: [
        'IBGE - Municípios, População, PIB',
        'DATASUS - Saúde, Mortalidade, SUS',
        'Portal Gov.br - Dados Abertos Federais',
        'INEP - Educação e IDEB',
        'Receita Federal - CNPJ e Empresas'
      ]
    },
    {
      id: 'datasets',
      icon: <Public sx={{ fontSize: 24, color: '#2563eb' }} />,
      title: 'Links Diretos para Datasets',
      description: 'Catálogo curado com 500+ datasets públicos verificados e funcionais',
      action: 'Explorar Datasets',
      benefits: [
        'Links diretos verificados diariamente',
        'Datasets de saúde, economia, educação',
        'Dados municipais e estaduais',
        'Formatos CSV, JSON, XML prontos',
        'Documentação técnica incluída'
      ]
    },
    {
      id: 'automl',
      icon: <TrendingUp sx={{ fontSize: 24, color: '#2563eb' }} />,
      title: 'Machine Learning Explicável',
      description: 'AutoML com explicação detalhada dos algoritmos e parâmetros utilizados',
      action: 'Treinar Modelos',
      benefits: [
        'Seleção automática do melhor algoritmo',
        'Otimização de hiperparâmetros explicada',
        'Feature importance com interpretação',
        'Validação cruzada com métricas',
        'Deploy de modelos em produção'
      ]
    },
    {
      id: 'avancada',
      icon: <Analytics sx={{ fontSize: 24, color: '#2563eb' }} />,
      title: 'Análise Científica Avançada',
      description: 'Pipeline completo de mineração de dados e análise preditiva automática',
      action: 'Executar Pipeline',
      benefits: [
        'Mineração automática "pega tudo"',
        'Análise multivariada completa (cluster + fatorial)',
        'Modelos preditivos com validação cruzada',
        'Interpretação científica rigorosa',
        'Superior ao CBA e Statistica'
      ]
    },
    {
      id: 'automacao',
      icon: <TrendingUp sx={{ fontSize: 24, color: '#2563eb' }} />,
      title: 'Automação de Variáveis',
      description: 'Sistema inteligente que cria automaticamente 50+ variáveis derivadas',
      action: 'Criar Variáveis',
      benefits: [
        'Variáveis complementares (secura = 100 - umidade)',
        'Lags temporais e médias móveis',
        'Transformações matemáticas automáticas',
        'Índices compostos (conforto térmico)',
        'Discretização inteligente em tercis'
      ]
    }
  ];

  const handleFeatureClick = (featureId: string) => {
    const featureMap: { [key: string]: number } = {
      'upload': 0,
      'analysis': 1,
      'dashboard': 2,
      'reports': 3,
      'learning': 4,
      'apis': 5,
      'datasets': 5,
      'automl': 6,
      'avancada': 6,
      'automacao': 7
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
              maxWidth: 800,
              mx: 'auto',
              mb: 2,
              lineHeight: 1.5
            }}
          >
            Plataforma Técnica Avançada para Análise de Dados - Melhor que Power BI, Python e R
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '0.9rem', md: '1rem' },
              color: '#475569',
              maxWidth: 900,
              mx: 'auto',
              mb: 4,
              lineHeight: 1.6
            }}
          >
            Sistema especializado para analistas de dados profissionais. Integração direta com APIs governamentais (DATASUS, IBGE, Portal de Dados Abertos), 
            análises estatísticas automáticas com explicação passo-a-passo dos métodos utilizados, e acesso a datasets públicos em tempo real.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
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
              Começar Análise Técnica
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => onNavigateToTab && onNavigateToTab(5)}
              sx={{
                borderColor: '#2563eb',
                color: '#2563eb',
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: '#eff6ff'
                }
              }}
            >
              Acessar Datasets Públicos
            </Button>
          </Box>
        </Box>

        {/* Statistics Section */}
        <Box sx={{ mb: 8 }}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={6} sm={3}>
              <Paper sx={{ p: 3, textAlign: 'center', border: '1px solid #e5e7eb' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#2563eb', mb: 1 }}>
                  75+
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  Métodos Estatísticos
                </Typography>
                <Typography variant="caption" sx={{ color: '#9ca3af', fontSize: '0.7rem' }}>
                  Correlação, Regressão, ANOVA, Chi-quadrado
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper sx={{ p: 3, textAlign: 'center', border: '1px solid #e5e7eb' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#10b981', mb: 1 }}>
                  50+
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  APIs Integradas
                </Typography>
                <Typography variant="caption" sx={{ color: '#9ca3af', fontSize: '0.7rem' }}>
                  IBGE, DATASUS, Portal Gov.br
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper sx={{ p: 3, textAlign: 'center', border: '1px solid #e5e7eb' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#f59e0b', mb: 1 }}>
                  500+
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  Datasets Públicos
                </Typography>
                <Typography variant="caption" sx={{ color: '#9ca3af', fontSize: '0.7rem' }}>
                  Links diretos atualizados
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper sx={{ p: 3, textAlign: 'center', border: '1px solid #e5e7eb' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#ef4444', mb: 1 }}>
                  Real-Time
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  Dados ao Vivo
                </Typography>
                <Typography variant="caption" sx={{ color: '#9ca3af', fontSize: '0.7rem' }}>
                  APIs funcionais verificadas
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Why Choose Us Section */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              fontWeight: 700,
              color: '#1f2937',
              mb: 6
            }}
          >
            Superioridade Técnica Sobre Outras Ferramentas
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  backgroundColor: '#eff6ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2
                }}>
                  <Analytics sx={{ fontSize: 30, color: '#2563eb' }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#1f2937' }}>
                  Explicação Passo-a-Passo
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  Diferente do Power BI, explica cada método estatístico usado
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  backgroundColor: '#f0fdf4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2
                }}>
                  <Api sx={{ fontSize: 30, color: '#10b981' }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#1f2937' }}>
                  APIs Reais Funcionais
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  Dados em tempo real de fontes oficiais verificadas
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  backgroundColor: '#fef3f2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2
                }}>
                  <Code sx={{ fontSize: 30, color: '#ef4444' }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#1f2937' }}>
                  Nível Python/R
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  Poder de análise do Python com interface amigável
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  backgroundColor: '#fffbeb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2
                }}>
                  <School sx={{ fontSize: 30, color: '#f59e0b' }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#1f2937' }}>
                  Educação Integrada
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  Aprenda estatística enquanto analisa seus dados
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Health Data Analysis Showcase */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              fontWeight: 700,
              color: '#1f2937',
              mb: 2
            }}
          >
            Análise de Dados de Saúde Pública
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              color: '#6b7280',
              maxWidth: 800,
              mx: 'auto',
              mb: 6,
              lineHeight: 1.6
            }}
          >
            Especialização em análise de dados governamentais de saúde, integrando múltiplas fontes 
            oficiais para gerar insights sobre políticas públicas e indicadores de saúde populacional.
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', border: '1px solid #e5e7eb' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Api sx={{ fontSize: 24, color: '#2563eb', mr: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1f2937' }}>
                      Fontes de Dados
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#6b7280', mb: 2 }}>
                    Integração com principais bases de dados oficiais:
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Chip label="DATASUS / Ministério da Saúde" size="small" variant="outlined" />
                    <Chip label="IBGE - Indicadores Sociais" size="small" variant="outlined" />
                    <Chip label="Portal de Dados Abertos (Gov.br)" size="small" variant="outlined" />
                    <Chip label="SIOPS - Orçamentos em Saúde" size="small" variant="outlined" />
                    <Chip label="APIs Estaduais e Municipais" size="small" variant="outlined" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', border: '1px solid #e5e7eb' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Timeline sx={{ fontSize: 24, color: '#10b981', mr: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1f2937' }}>
                      Análises Especializadas
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#6b7280', mb: 2 }}>
                    Metodologias específicas para dados de saúde:
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>• Análise de morbidade e mortalidade</Typography>
                    <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>• Correlações socioeconômicas</Typography>
                    <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>• Análise temporal de epidemias</Typography>
                    <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>• Indicadores de desempenho SUS</Typography>
                    <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>• Análise de gastos públicos</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', border: '1px solid #e5e7eb' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Map sx={{ fontSize: 24, color: '#f59e0b', mr: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1f2937' }}>
                      Caso de Estudo
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#6b7280', mb: 2 }}>
                    Grande Florianópolis - SC:
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>• 4 municípios analisados</Typography>
                    <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>• Dados climáticos integrados</Typography>
                    <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>• Análise de cobertura ESF</Typography>
                    <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>• Ocupação de leitos UTI</Typography>
                    <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>• Relatório científico completo</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Features Title */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#1f2937',
              mb: 3
            }}
          >
            Funcionalidades Principais
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1, mb: 4 }}>
            <Chip label="Python" size="small" sx={{ backgroundColor: '#dbeafe', color: '#1d4ed8' }} />
            <Chip label="DATASUS" size="small" sx={{ backgroundColor: '#dcfce7', color: '#16a34a' }} />
            <Chip label="IBGE APIs" size="small" sx={{ backgroundColor: '#fef3f2', color: '#dc2626' }} />
            <Chip label="Saúde Pública" size="small" sx={{ backgroundColor: '#fffbeb', color: '#d97706' }} />
            <Chip label="Machine Learning" size="small" sx={{ backgroundColor: '#f3e8ff', color: '#9333ea' }} />
            <Chip label="Santa Catarina" size="small" sx={{ backgroundColor: '#f0fdf4', color: '#059669' }} />
          </Box>
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

        {/* Health Data Sources Highlight */}
        <Box sx={{ 
          backgroundColor: '#f0f9ff', 
          borderRadius: 3, 
          p: 6, 
          mt: 8,
          border: '1px solid #bae6fd'
        }}>
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              fontWeight: 700,
              color: '#1e40af',
              mb: 4
            }}
          >
            🔗 Links Diretos para Datasets Públicos Verificados
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1e40af' }}>
                  📊 APIs Governamentais Funcionais
                </Typography>
                <Box sx={{ pl: 2 }}>
                  <Typography variant="body2" sx={{ color: '#1e40af', mb: 1, display: 'flex', alignItems: 'center' }}>
                    <CheckCircle sx={{ fontSize: 16, mr: 1, color: '#10b981' }} />
                    <strong>IBGE API:</strong> https://servicodados.ibge.gov.br/api/v1/
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#1e40af', mb: 1, display: 'flex', alignItems: 'center' }}>
                    <CheckCircle sx={{ fontSize: 16, mr: 1, color: '#10b981' }} />
                    <strong>DATASUS:</strong> https://datasus.saude.gov.br/informacoes-de-saude-tabnet/
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#1e40af', mb: 1, display: 'flex', alignItems: 'center' }}>
                    <CheckCircle sx={{ fontSize: 16, mr: 1, color: '#10b981' }} />
                    <strong>Portal Gov.br:</strong> https://dados.gov.br/dados/conjuntos-dados
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#1e40af', mb: 1, display: 'flex', alignItems: 'center' }}>
                    <CheckCircle sx={{ fontSize: 16, mr: 1, color: '#10b981' }} />
                    <strong>INEP:</strong> https://www.gov.br/inep/pt-br/acesso-a-informacao/dados-abertos
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1e40af' }}>
                  🌊 Datasets Santa Catarina
                </Typography>
                <Box sx={{ pl: 2 }}>
                  <Typography variant="body2" sx={{ color: '#1e40af', mb: 1, display: 'flex', alignItems: 'center' }}>
                    <CheckCircle sx={{ fontSize: 16, mr: 1, color: '#10b981' }} />
                    <strong>Portal SC:</strong> https://dados.sc.gov.br/
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#1e40af', mb: 1, display: 'flex', alignItems: 'center' }}>
                    <CheckCircle sx={{ fontSize: 16, mr: 1, color: '#10b981' }} />
                    <strong>Florianópolis:</strong> https://dados.florianopolis.sc.gov.br/
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#1e40af', mb: 1, display: 'flex', alignItems: 'center' }}>
                    <CheckCircle sx={{ fontSize: 16, mr: 1, color: '#10b981' }} />
                    <strong>SES-SC:</strong> http://www.saude.sc.gov.br/index.php/informacoes/ferramentas
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#1e40af', mb: 1, display: 'flex', alignItems: 'center' }}>
                    <CheckCircle sx={{ fontSize: 16, mr: 1, color: '#10b981' }} />
                    <strong>INMET:</strong> https://portal.inmet.gov.br/dadoshistoricos
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          
          <Box sx={{ 
            backgroundColor: '#ffffff', 
            borderRadius: 2, 
            p: 4, 
            mt: 4,
            border: '1px solid #bae6fd'
          }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#1e40af', textAlign: 'center' }}>
              🎯 Datasets Prontos para Análise (Links Verificados)
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                    População Municípios
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#1e40af', fontSize: '0.8rem' }}>
                    CSV direto IBGE 2024
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                    Internações SUS
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#1e40af', fontSize: '0.8rem' }}>
                    DATASUS 2020-2024
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                    IDEB Escolas
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#1e40af', fontSize: '0.8rem' }}>
                    INEP por município
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                    PIB Municipal
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#1e40af', fontSize: '0.8rem' }}>
                    IBGE série histórica
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* Additional Info Section */}
        <Box sx={{ mt: 8, mb: 6 }}>
          <Divider sx={{ mb: 6 }} />
          
          <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1f2937' }}>
                📊 Para Analistas de Dados
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280', lineHeight: 1.6 }}>
                Ferramentas profissionais para análise exploratória, limpeza de dados, 
                testes estatísticos e criação de relatórios científicos.
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1f2937' }}>
                🎓 Para Estudantes
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280', lineHeight: 1.6 }}>
                Interface amigável para aprender estatística e ciência de dados na prática, 
                com tutoriais e exemplos educacionais.
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1f2937' }}>
                🔬 Para Pesquisadores
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280', lineHeight: 1.6 }}>
                Análises rigorosas com métodos científicos validados, 
                geração automática de relatórios e exportação para publicações.
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Footer */}
        <Box sx={{ 
          backgroundColor: '#f8fafc', 
          borderRadius: 2, 
          p: 4, 
          mt: 6,
          border: '1px solid #e5e7eb'
        }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#1f2937' }}>
                Pronto para começar sua análise?
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                Faça upload dos seus dados e descubra insights valiosos em minutos. 
                Sem necessidade de instalação ou conhecimento técnico avançado.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
              <Button
                variant="contained"
                size="large"
                onClick={onStartAnalysis}
                sx={{
                  backgroundColor: '#10b981',
                  py: 1.5,
                  px: 4,
                  fontSize: '1rem',
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: '#059669'
                  }
                }}
              >
                Iniciar Agora
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default WelcomePageEnhanced;
