import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Chip,
  Stack,
  Avatar,
} from '@mui/material';
import { 
  School, 
  PlayArrow, 
  Analytics, 
  Assessment, 
  BarChart, 
  AutoAwesome,
  CheckCircle,
  Star,
  Business,
  EmojiEvents,
  Close
} from '@mui/icons-material';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  duration: string;
  icon: React.ReactNode;
  steps: TutorialStep[];
  completed?: boolean;
}

interface TutorialStep {
  title: string;
  content: string;
  example?: string;
  code?: string;
}

const LearningCenterFunctional: React.FC = () => {
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedTutorials, setCompletedTutorials] = useState<string[]>([]);

  const tutorials: Tutorial[] = [
    {
      id: 'basics',
      title: 'Fundamentos de Análise de Dados',
      description: 'Aprenda os conceitos essenciais de análise de dados, estatística descritiva e preparação de dados.',
      level: 'Iniciante',
      duration: '15 min',
      icon: <School />,
      steps: [
        {
          title: 'Introdução à Análise de Dados',
          content: 'A análise de dados é o processo de examinar, limpar, transformar e modelar dados para descobrir informações úteis, chegar a conclusões e apoiar a tomada de decisões.',
          example: 'Exemplo: Analisar vendas mensais para identificar tendências sazonais.'
        },
        {
          title: 'Tipos de Dados',
          content: 'Dados podem ser categóricos (qualitativos) ou numéricos (quantitativos). Dados categóricos incluem ordinais e nominais, enquanto numéricos incluem discretos e contínuos.',
          example: 'Categórico: Cores (azul, vermelho), Numérico: Idade (25, 30, 35)'
        },
        {
          title: 'Estatística Descritiva',
          content: 'Medidas de tendência central (média, mediana, moda) e dispersão (desvio padrão, variância) nos ajudam a entender a distribuição dos dados.',
          example: 'Para idades [20, 25, 30, 35, 40]: Média = 30, Mediana = 30'
        },
        {
          title: 'Limpeza de Dados',
          content: 'Identificar e tratar valores ausentes, outliers e inconsistências é crucial para análises precisas.',
          example: 'Remover registros com idade negativa ou substituir valores nulos pela média.'
        }
      ]
    },
    {
      id: 'visualizations',
      title: 'Visualizações Eficazes',
      description: 'Domine as técnicas de visualização de dados para comunicar insights de forma clara e impactante.',
      level: 'Intermediário',
      duration: '20 min',
      icon: <BarChart />,
      steps: [
        {
          title: 'Escolhendo o Gráfico Certo',
          content: 'Diferentes tipos de dados requerem diferentes visualizações. Gráficos de barras para comparações, linhas para tendências, pizza para proporções.',
          example: 'Vendas por região → Gráfico de barras, Vendas ao longo do tempo → Gráfico de linhas'
        },
        {
          title: 'Princípios de Design',
          content: 'Use cores consistentes, evite 3D desnecessário, mantenha simplicidade e foque na mensagem principal.',
          example: 'Use azul para uma categoria consistentemente em todos os gráficos do relatório.'
        },
        {
          title: 'Gráficos Interativos',
          content: 'Adicione interatividade com tooltips, zoom, filtros para permitir exploração mais profunda dos dados.',
          example: 'Dashboards com filtros de data permitem análise por diferentes períodos.'
        },
        {
          title: 'Storytelling com Dados',
          content: 'Organize visualizações em uma narrativa lógica que guie o público através dos insights.',
          example: 'Comece com visão geral, depois detalhe problemas específicos e termine com recomendações.'
        }
      ]
    },
    {
      id: 'statistics',
      title: 'Análise Estatística Avançada',
      description: 'Aprenda técnicas estatísticas avançadas para extrair insights mais profundos dos seus dados.',
      level: 'Avançado',
      duration: '30 min',
      icon: <Analytics />,
      steps: [
        {
          title: 'Correlação vs Causalidade',
          content: 'Correlação indica relacionamento entre variáveis, mas não implica causalidade. Use testes estatísticos para validar hipóteses.',
          example: 'Vendas de sorvete e afogamentos estão correlacionados (ambos aumentam no verão), mas um não causa o outro.'
        },
        {
          title: 'Testes de Hipóteses',
          content: 'Teste t, ANOVA, qui-quadrado ajudam a determinar se diferenças observadas são estatisticamente significativas.',
          example: 'Testar se uma nova campanha publicitária realmente aumentou as vendas além da variação normal.'
        },
        {
          title: 'Regressão Linear',
          content: 'Modele relacionamentos entre variáveis para fazer previsões e entender impactos.',
          example: 'Prever vendas baseado em investimento em marketing, sazonalidade e preço.'
        },
        {
          title: 'Intervalos de Confiança',
          content: 'Quantifique a incerteza em suas estimativas usando intervalos de confiança.',
          example: 'A média de satisfação é 8.5 com 95% de confiança entre 8.2 e 8.8.'
        }
      ]
    },
    {
      id: 'business',
      title: 'Análise de Negócios',
      description: 'Aplique análise de dados para resolver problemas reais de negócio e gerar valor empresarial.',
      level: 'Intermediário',
      duration: '25 min',
      icon: <Business />,
      steps: [
        {
          title: 'KPIs e Métricas de Negócio',
          content: 'Identifique e monitore indicadores-chave de performance relevantes para seu negócio.',
          example: 'E-commerce: Taxa de conversão, CAC (Custo de Aquisição), LTV (Lifetime Value)'
        },
        {
          title: 'Análise de Coorte',
          content: 'Acompanhe comportamento de grupos de usuários ao longo do tempo para entender retenção e engajamento.',
          example: 'Comparar retenção de usuários que se cadastraram em janeiro vs fevereiro.'
        },
        {
          title: 'Análise de Funil',
          content: 'Identifique gargalos no processo de conversão para otimizar cada etapa.',
          example: 'Funil de vendas: Visitantes → Leads → Prospects → Clientes'
        },
        {
          title: 'Segmentação de Clientes',
          content: 'Divida clientes em grupos homogêneos para estratégias de marketing e vendas mais eficazes.',
          example: 'Segmentar por valor gasto, frequência de compra, produtos preferidos.'
        }
      ]
    },
    {
      id: 'automation',
      title: 'Automação e Machine Learning',
      description: 'Explore técnicas de automação e aprendizado de máquina para análises mais sofisticadas.',
      level: 'Avançado',
      duration: '35 min',
      icon: <AutoAwesome />,
      steps: [
        {
          title: 'Introdução ao Machine Learning',
          content: 'ML permite que computadores aprendam padrões dos dados sem programação explícita. Inclui aprendizado supervisionado, não-supervisionado e por reforço.',
          example: 'Classificar emails como spam ou não-spam baseado em características do texto.'
        },
        {
          title: 'Algoritmos de Classificação',
          content: 'Decision Trees, Random Forest, SVM ajudam a categorizar dados em classes predefinidas.',
          example: 'Prever se um cliente vai cancelar o serviço baseado em histórico de uso.'
        },
        {
          title: 'Clustering e Segmentação',
          content: 'K-means, hierarchical clustering identificam grupos naturais nos dados sem labels predefinidos.',
          example: 'Agrupar clientes por comportamento de compra para criar personas.'
        },
        {
          title: 'Pipelines Automatizados',
          content: 'Automatize coleta, processamento e análise de dados para insights em tempo real.',
          example: 'Dashboard que atualiza automaticamente com dados de vendas a cada hora.'
        }
      ]
    },
    {
      id: 'reporting',
      title: 'Relatórios Executivos',
      description: 'Crie relatórios profissionais que comuniquem insights de forma clara para stakeholders.',
      level: 'Intermediário',
      duration: '20 min',
      icon: <Assessment />,
      steps: [
        {
          title: 'Estrutura de Relatórios',
          content: 'Organize relatórios com sumário executivo, metodologia, resultados principais e recomendações.',
          example: 'Sumário → Objetivos → Dados utilizados → Análises → Insights → Ações recomendadas'
        },
        {
          title: 'Visualizações para Executivos',
          content: 'Use visualizações simples e diretas. Evite jargão técnico e foque em insights acionáveis.',
          example: 'Gráfico de barras simples mostrando receita por trimestre, não scatter plot complexo.'
        },
        {
          title: 'Narrativa de Dados',
          content: 'Conte uma história com os dados, conectando insights a impactos no negócio.',
          example: 'Queda nas vendas → Análise de causas → Impacto financeiro → Plano de ação'
        },
        {
          title: 'Apresentação e Follow-up',
          content: 'Prepare apresentações claras e estabeleça processo de acompanhamento das recomendações.',
          example: 'Slides com 1 insight por slide, reunião de follow-up em 30 dias para revisar progresso.'
        }
      ]
    }
  ];

  const handleStartTutorial = (tutorial: Tutorial) => {
    setSelectedTutorial(tutorial);
    setCurrentStep(0);
  };

  const handleNextStep = () => {
    if (selectedTutorial && currentStep < selectedTutorial.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (selectedTutorial) {
      // Tutorial completed
      if (!completedTutorials.includes(selectedTutorial.id)) {
        setCompletedTutorials([...completedTutorials, selectedTutorial.id]);
      }
      setSelectedTutorial(null);
      setCurrentStep(0);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCloseTutorial = () => {
    setSelectedTutorial(null);
    setCurrentStep(0);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Iniciante': return '#4caf50';
      case 'Intermediário': return '#ff9800';
      case 'Avançado': return '#f44336';
      default: return '#2196f3';
    }
  };

  const progress = completedTutorials.length / tutorials.length * 100;

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ 
          fontWeight: 700, 
          color: '#263238',
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <School sx={{ fontSize: 40, color: '#1976d2' }} />
          Centro de Aprendizagem
        </Typography>
        
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Domine a análise de dados com nossos tutoriais interativos profissionais
        </Typography>

        {/* Progress Card */}
        <Paper sx={{ p: 3, mb: 4, background: 'linear-gradient(145deg, #f8f9fa 0%, #ffffff 100%)' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Seu Progresso
            </Typography>
            <Chip 
              icon={<EmojiEvents />}
              label={`${completedTutorials.length}/${tutorials.length} Completos`}
              color="primary"
              variant="outlined"
            />
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ height: 8, borderRadius: 4, mb: 1 }}
          />
          <Typography variant="body2" color="text.secondary">
            {progress.toFixed(0)}% concluído - Continue aprendendo!
          </Typography>
        </Paper>
      </Box>

      {/* Tutorials Grid */}
      <Grid container spacing={3}>
        {tutorials.map((tutorial) => {
          const isCompleted = completedTutorials.includes(tutorial.id);
          
          return (
            <Grid item xs={12} md={6} lg={4} key={tutorial.id}>
              <Card sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                border: isCompleted ? '2px solid #4caf50' : '1px solid #e0e0e0',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
                }
              }}>
                <CardContent sx={{ flex: 1, p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ 
                      mr: 2, 
                      bgcolor: getLevelColor(tutorial.level),
                      width: 56,
                      height: 56
                    }}>
                      {tutorial.icon}
                    </Avatar>
                    {isCompleted && (
                      <CheckCircle sx={{ color: '#4caf50', fontSize: 24 }} />
                    )}
                  </Box>
                  
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#263238' }}>
                    {tutorial.title}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                    {tutorial.description}
                  </Typography>

                  <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                    <Chip 
                      label={tutorial.level}
                      size="small"
                      sx={{ 
                        bgcolor: getLevelColor(tutorial.level),
                        color: 'white',
                        fontWeight: 600
                      }}
                    />
                    <Chip 
                      label={tutorial.duration}
                      size="small"
                      variant="outlined"
                    />
                  </Stack>

                  <Button
                    variant={isCompleted ? "outlined" : "contained"}
                    fullWidth
                    startIcon={isCompleted ? <Star /> : <PlayArrow />}
                    onClick={() => handleStartTutorial(tutorial)}
                    sx={{
                      mt: 'auto',
                      py: 1.5,
                      fontWeight: 600,
                      textTransform: 'none',
                      ...(isCompleted ? {
                        borderColor: '#4caf50',
                        color: '#4caf50'
                      } : {})
                    }}
                  >
                    {isCompleted ? 'Revisar Tutorial' : 'Iniciar Tutorial'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Tutorial Dialog */}
      <Dialog
        open={!!selectedTutorial}
        onClose={handleCloseTutorial}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            minHeight: '70vh'
          }
        }}
      >
        {selectedTutorial && (
          <>
            <DialogTitle sx={{ 
              background: 'linear-gradient(45deg, #263238 30%, #37474f 90%)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {selectedTutorial.icon}
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {selectedTutorial.title}
                </Typography>
              </Box>
              <Button
                onClick={handleCloseTutorial}
                sx={{ color: 'white', minWidth: 'auto', p: 1 }}
              >
                <Close />
              </Button>
            </DialogTitle>

            <DialogContent sx={{ p: 0 }}>
              {/* Progress Stepper */}
              <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
                <Stepper activeStep={currentStep} alternativeLabel>
                  {selectedTutorial.steps.map((step, index) => (
                    <Step key={index}>
                      <StepLabel>{step.title}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>

              {/* Step Content */}
              <Box sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#263238' }}>
                  {selectedTutorial.steps[currentStep]?.title}
                </Typography>
                
                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, fontSize: '1.1rem' }}>
                  {selectedTutorial.steps[currentStep]?.content}
                </Typography>

                {selectedTutorial.steps[currentStep]?.example && (
                  <Paper sx={{ p: 3, bgcolor: '#f8f9fa', border: '1px solid #e9ecef' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#1976d2' }}>
                      💡 Exemplo Prático:
                    </Typography>
                    <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                      {selectedTutorial.steps[currentStep].example}
                    </Typography>
                  </Paper>
                )}
              </Box>
            </DialogContent>

            <DialogActions sx={{ p: 3, borderTop: '1px solid #e0e0e0' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Button
                  onClick={handlePrevStep}
                  disabled={currentStep === 0}
                  variant="outlined"
                >
                  Anterior
                </Button>
                
                <Typography variant="body2" color="text.secondary" sx={{ alignSelf: 'center' }}>
                  {currentStep + 1} de {selectedTutorial.steps.length}
                </Typography>
                
                <Button
                  onClick={handleNextStep}
                  variant="contained"
                  sx={{ minWidth: 120 }}
                >
                  {currentStep === selectedTutorial.steps.length - 1 ? 'Finalizar' : 'Próximo'}
                </Button>
              </Box>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default LearningCenterFunctional;
