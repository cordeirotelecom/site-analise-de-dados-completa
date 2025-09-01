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
  Stack,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Tooltip,
  Alert,
  Fade,
  Slide
} from '@mui/material';
import {
  DataObject,
  Analytics,
  Assessment,
  TrendingUp,
  Speed,
  Security,
  CloudUpload,
  AutoAwesome,
  Science,
  Storage,
  Api,
  Public,
  School,
  Business,
  Timeline,
  BarChart,
  PieChart,
  ShowChart,
  Psychology,
  Lightbulb,
  Rocket,
  Star,
  CheckCircle,
  ArrowForward,
  PlayArrow,
} from '@mui/icons-material';

interface FeatureCard {
  id: string;
  titulo: string;
  descricao: string;
  icon: React.ReactElement;
  cor: string;
  estatisticas: {
    label: string;
    valor: string;
  }[];
  acao: {
    label: string;
    tabIndex: number;
  };
}

interface Estatistica {
  label: string;
  valor: string;
  icon: React.ReactElement;
  cor: string;
  progresso?: number;
  descricao?: string;
}

interface PaginaInicial {
  onNavigateToTab: (tabIndex: number) => void;
  onBackToHome?: () => void;
}

const PaginaInicial: React.FC<PaginaInicial> = ({ onNavigateToTab, onBackToHome }) => {
  const [animacaoAtiva, setAnimacaoAtiva] = useState(false);
  const [estatisticasCarregadas, setEstatisticasCarregadas] = useState(false);

  useEffect(() => {
    setAnimacaoAtiva(true);
    setTimeout(() => {
      setEstatisticasCarregadas(true);
    }, 1000);
  }, []);

  const features: FeatureCard[] = [
    {
      id: '1',
      titulo: 'Upload & Processamento',
      descricao: 'Faça upload de seus dados em múltiplos formatos e processe automaticamente.',
      icon: <CloudUpload />,
      cor: '#2563eb',
      estatisticas: [
        { label: 'Formatos suportados', valor: '15+' },
        { label: 'Processamento automático', valor: '100%' },
        { label: 'Validação de dados', valor: 'Completa' }
      ],
      acao: { label: 'Fazer Upload', tabIndex: 0 }
    },
    {
      id: '2',
      titulo: 'Análise Estatística',
      descricao: 'Análises estatísticas avançadas com visualizações profissionais.',
      icon: <Analytics />,
      cor: '#059669',
      estatisticas: [
        { label: 'Métodos estatísticos', valor: '50+' },
        { label: 'Tipos de gráficos', valor: '20+' },
        { label: 'Testes automáticos', valor: '15+' }
      ],
      acao: { label: 'Iniciar Análise', tabIndex: 1 }
    },
    {
      id: '3',
      titulo: 'Dashboards Interativos',
      descricao: 'Crie dashboards dinâmicos e interativos para seus dados.',
      icon: <Assessment />,
      cor: '#dc2626',
      estatisticas: [
        { label: 'Templates prontos', valor: '10+' },
        { label: 'Widgets disponíveis', valor: '25+' },
        { label: 'Exportação', valor: 'PDF/PNG' }
      ],
      acao: { label: 'Ver Dashboards', tabIndex: 2 }
    },
    {
      id: '4',
      titulo: 'Centro de Aprendizado',
      descricao: 'Aprenda técnicas avançadas de análise de dados e estatística.',
      icon: <School />,
      cor: '#7c3aed',
      estatisticas: [
        { label: 'Tutoriais', valor: '100+' },
        { label: 'Exemplos práticos', valor: '50+' },
        { label: 'Exercícios', valor: '200+' }
      ],
      acao: { label: 'Começar a Aprender', tabIndex: 4 }
    },
    {
      id: '4b',
      titulo: 'Metodologia Científica Pro',
      descricao: 'Sistema completo de análise seguindo rigorosamente a metodologia científica.',
      icon: <Science />,
      cor: '#16a34a',
      estatisticas: [
        { label: 'Upload automático', valor: 'Múltiplos formatos' },
        { label: 'Validação estatística', valor: '15+ testes' },
        { label: 'Relatório completo', valor: 'Padrão acadêmico' }
      ],
      acao: { label: 'Análise Científica', tabIndex: 5 }
    },
    {
      id: '5',
      titulo: 'APIs & Datasets',
      descricao: 'Acesse milhares de datasets e APIs públicas brasileiras.',
      icon: <Api />,
      cor: '#ea580c',
      estatisticas: [
        { label: 'APIs disponíveis', valor: '30+' },
        { label: 'Datasets públicos', valor: '1000+' },
        { label: 'Atualizações', valor: 'Tempo real' }
      ],
      acao: { label: 'Explorar APIs', tabIndex: 6 }
    },
    {
      id: '6',
      titulo: 'Relatórios Científicos',
      descricao: 'Gere relatórios científicos automáticos e profissionais.',
      icon: <Science />,
      cor: '#0891b2',
      estatisticas: [
        { label: 'Templates científicos', valor: '15+' },
        { label: 'Formato LaTeX', valor: 'Suportado' },
        { label: 'Exportação', valor: 'PDF/Word' }
      ],
      acao: { label: 'Criar Relatório', tabIndex: 3 }
    }
  ];

  const estatisticasEducacionais: Estatistica[] = [
    {
      label: 'Conceitos Fundamentais de Estatística',
      valor: 'Essencial',
      icon: <TrendingUp />,
      cor: '#059669',
      progresso: 100,
      descricao: 'Média, mediana, moda, desvio padrão são base para qualquer análise'
    },
    {
      label: 'Importância da Visualização',
      valor: 'Crítica',
      icon: <Storage />,
      cor: '#2563eb',
      progresso: 100,
      descricao: 'Gráficos revelam padrões que números sozinhos não mostram'
    },
    {
      label: 'Metodologia Científica',
      valor: 'Rigorosa',
      icon: <Psychology />,
      cor: '#7c3aed',
      progresso: 100,
      descricao: 'Hipóteses, testes e validação garantem resultados confiáveis'
    },
    {
      label: 'Reprodutibilidade',
      valor: 'Fundamental',
      icon: <Api />,
      cor: '#dc2626',
      progresso: 100,
      descricao: 'Análises devem ser replicáveis para serem cientificamente válidas'
    }
  ];

  const metodosDisponiveis = [
    'Estatística Descritiva',
    'Análise de Regressão',
    'Testes de Hipóteses',
    'Análise de Correlação',
    'Séries Temporais',
    'Machine Learning',
    'Análise Multivariada',
    'Análise de Sobrevivência',
    'Análise Bayesiana',
    'Data Mining'
  ];

  const fontesDisponiveis = [
    'Portal da Transparência',
    'IBGE - Dados Geográficos',
    'Banco Central do Brasil',
    'Ministério da Saúde',
    'INEP - Dados Educacionais',
    'CNES - Estabelecimentos',
    'DATASUS',
    'Receita Federal',
    'TSE - Dados Eleitorais',
    'ANEEL - Energia'
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Fade in={animacaoAtiva} timeout={1000}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #2563eb, #7c3aed)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              mb: 2
            }}
          >
            DataScience Pro
          </Typography>
          
          <Typography 
            variant="h5" 
            color="text.secondary" 
            sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}
          >
            A plataforma mais avançada e completa para análise de dados, estatística e ciência de dados do Brasil
          </Typography>
          
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<Rocket />}
              onClick={() => onNavigateToTab(0)}
              sx={{ px: 4, py: 1.5 }}
            >
              Começar Agora
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<PlayArrow />}
              onClick={() => onNavigateToTab(4)}
              sx={{ px: 4, py: 1.5 }}
            >
              Ver Tutorial
            </Button>
          </Stack>
          
          {/* Badges de Funcionalidades */}
          <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" useFlexGap>
            {[
              { label: '17 Sistemas Integrados', icon: <CheckCircle /> },
              { label: '50+ Métodos Estatísticos', icon: <Analytics /> },
              { label: '30+ APIs Governamentais', icon: <Api /> },
              { label: 'Relatórios Automáticos', icon: <AutoAwesome /> }
            ].map((badge, index) => (
              <Chip
                key={index}
                icon={badge.icon}
                label={badge.label}
                variant="outlined"
                color="primary"
                sx={{ m: 0.5 }}
              />
            ))}
          </Stack>
        </Box>
      </Fade>

      {/* Estatísticas Gerais */}
      <Slide in={estatisticasCarregadas} direction="up" timeout={1000}>
        <Paper sx={{ p: 3, mb: 6, background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
          <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
            � Capacidades da Plataforma
          </Typography>
          
          <Grid container spacing={3}>
            {estatisticasEducacionais.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ height: '100%', textAlign: 'center' }}>
                  <CardContent>
                    <Avatar
                      sx={{
                        bgcolor: stat.cor,
                        width: 56,
                        height: 56,
                        mx: 'auto',
                        mb: 2
                      }}
                    >
                      {stat.icon}
                    </Avatar>
                    
                    <Typography variant="h4" fontWeight="bold" color={stat.cor}>
                      {stat.valor}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {stat.label}
                    </Typography>
                    
                    {stat.progresso && (
                      <Box>
                        <LinearProgress
                          variant="determinate"
                          value={stat.progresso}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: 'grey.200',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: stat.cor
                            }
                          }}
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                          {stat.progresso}% de capacidade
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Slide>

      {/* Features Grid */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          🚀 Funcionalidades Principais
        </Typography>
        
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} lg={4} key={feature.id}>
              <Fade in={animacaoAtiva} timeout={1000} style={{ transitionDelay: `${index * 200}ms` }}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: feature.cor,
                          mr: 2,
                          width: 48,
                          height: 48
                        }}
                      >
                        {feature.icon}
                      </Avatar>
                      <Typography variant="h6" fontWeight="bold">
                        {feature.titulo}
                      </Typography>
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      {feature.descricao}
                    </Typography>
                    
                    <List dense>
                      {feature.estatisticas.map((stat, statIndex) => (
                        <ListItem key={statIndex} sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <Star sx={{ fontSize: 16, color: feature.cor }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2">{stat.label}</Typography>
                                <Typography variant="body2" fontWeight="bold" color={feature.cor}>
                                  {stat.valor}
                                </Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                  
                  <Divider />
                  
                  <Box sx={{ p: 2 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      endIcon={<ArrowForward />}
                      onClick={() => onNavigateToTab(feature.acao.tabIndex)}
                      sx={{
                        bgcolor: feature.cor,
                        '&:hover': {
                          bgcolor: feature.cor,
                          filter: 'brightness(0.9)'
                        }
                      }}
                    >
                      {feature.acao.label}
                    </Button>
                  </Box>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Métodos e Fontes */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <Science sx={{ mr: 2, color: 'primary.main' }} />
              Métodos Estatísticos
            </Typography>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Mais de 50 métodos estatísticos e técnicas de análise disponíveis:
            </Typography>
            
            <Grid container spacing={1}>
              {metodosDisponiveis.map((metodo, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Chip
                    label={metodo}
                    variant="outlined"
                    size="small"
                    sx={{ mb: 1, width: '100%', justifyContent: 'flex-start' }}
                    icon={<CheckCircle sx={{ fontSize: 16 }} />}
                  />
                </Grid>
              ))}
            </Grid>
            
            <Box sx={{ mt: 3 }}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => onNavigateToTab(1)}
                endIcon={<ArrowForward />}
              >
                Ver Todas as Análises
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <Public sx={{ mr: 2, color: 'primary.main' }} />
              Fontes de Dados
            </Typography>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Mais de 30 APIs governamentais e milhares de datasets públicos:
            </Typography>
            
            <Grid container spacing={1}>
              {fontesDisponiveis.map((fonte, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Chip
                    label={fonte}
                    variant="outlined"
                    size="small"
                    sx={{ mb: 1, width: '100%', justifyContent: 'flex-start' }}
                    icon={<Api sx={{ fontSize: 16 }} />}
                  />
                </Grid>
              ))}
            </Grid>
            
            <Box sx={{ mt: 3 }}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => onNavigateToTab(6)}
                endIcon={<ArrowForward />}
              >
                Explorar Dados Públicos
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Seção Educacional - Fatos sobre Análise de Dados */}
      <Paper sx={{ p: 4, mb: 6, background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          🎓 Fatos Interessantes sobre Análise de Dados
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', bgcolor: '#fefefe' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TrendingUp sx={{ color: '#059669', mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    90% dos Dados Mundiais
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Foram criados nos últimos 2 anos. A quantidade de dados cresce exponencialmente, 
                  criando 2.5 quintilhões de bytes diariamente.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', bgcolor: '#fefefe' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Assessment sx={{ color: '#2563eb', mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Data Science Profissão
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Foi eleita como "Trabalho Mais Sexy do Século XXI" pela Harvard Business Review, 
                  com crescimento de 650% nas vagas desde 2012.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', bgcolor: '#fefefe' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Psychology sx={{ color: '#7c3aed', mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    80% do Tempo
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  De um cientista de dados é gasto na limpeza e preparação dos dados. 
                  Apenas 20% é dedicado à análise propriamente dita.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', bgcolor: '#fefefe' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AutoAwesome sx={{ color: '#ea580c', mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Metodologia Científica
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  O processo de análise de dados segue o método científico: observação, 
                  hipótese, experimentação, análise e conclusão. Isso garante resultados 
                  confiáveis e reprodutíveis.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', bgcolor: '#fefefe' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <BarChart sx={{ color: '#dc2626', mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Visualização de Dados
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  O cérebro humano processa informações visuais 60.000x mais rápido que texto. 
                  Por isso, gráficos e visualizações são fundamentais para comunicar insights.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Call to Action Final */}
      <Paper 
        sx={{ 
          p: 4, 
          textAlign: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}
      >
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Pronto para Revolucionar suas Análises?
        </Typography>
        
        <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
          Junte-se a milhares de profissionais que já usam a DataScience Pro
        </Typography>
        
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            size="large"
            startIcon={<CloudUpload />}
            onClick={() => onNavigateToTab(0)}
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'grey.100'
              }
            }}
          >
            Fazer Upload de Dados
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<Lightbulb />}
            onClick={() => onNavigateToTab(4)}
            sx={{
              borderColor: 'white',
              color: 'white',
              '&:hover': {
                borderColor: 'white',
                bgcolor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            Ver Exemplos
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default PaginaInicial;
