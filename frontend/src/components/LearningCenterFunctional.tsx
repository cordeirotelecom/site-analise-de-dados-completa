import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Alert,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  IconButton,
  LinearProgress,
  Stack,
} from '@mui/material';
import {
  School,
  PlayArrow,
  Science,
  Download,
  CheckCircle,
  Menu as MenuIcon,
  VideoLibrary,
  Article,
  Quiz,
  Close,
  NavigateNext,
  NavigateBefore,
} from '@mui/icons-material';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  duration: string;
  category: string;
  steps: TutorialStep[];
  completed: boolean;
}

interface TutorialStep {
  title: string;
  content: string;
  code?: string;
  action?: string;
  tip?: string;
}

const LearningCenterFunctional: React.FC = () => {
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedTutorials, setCompletedTutorials] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const tutorials: Tutorial[] = [
    {
      id: 'upload-basico',
      title: 'Como Fazer Upload de Dados',
      description: 'Aprenda a carregar seus arquivos CSV, Excel e JSON na plataforma',
      difficulty: 'Iniciante',
      duration: '5 min',
      category: 'Upload',
      completed: false,
      steps: [
        {
          title: 'Acessando a Aba Upload',
          content: 'Clique na primeira aba "Upload de Dados" no menu principal da plataforma.',
          action: 'Navegue para a aba Upload de Dados',
          tip: 'Esta é sempre a primeira etapa para qualquer análise.'
        },
        {
          title: 'Selecionando Arquivos',
          content: 'Você pode arrastar e soltar arquivos na área indicada ou clicar em "Selecionar Arquivos".',
          action: 'Experimente arrastar um arquivo CSV para a área de upload',
          tip: 'Formatos suportados: CSV, Excel (.xlsx), JSON e Parquet'
        },
        {
          title: 'Verificando o Preview',
          content: 'Após o upload, você verá um preview dos seus dados com estatísticas básicas.',
          tip: 'Verifique se os dados foram interpretados corretamente antes de prosseguir.'
        },
        {
          title: 'Iniciando a Análise',
          content: 'Clique em "Iniciar Análise" para processar seus dados e ir para a próxima etapa.',
          action: 'Clique no botão "Iniciar Análise"'
        }
      ]
    },
    {
      id: 'analise-estatistica',
      title: 'Análise Estatística Básica',
      description: 'Entenda como interpretar estatísticas descritivas e correlações',
      difficulty: 'Iniciante',
      duration: '10 min',
      category: 'Análise',
      completed: false,
      steps: [
        {
          title: 'Acessando Análise Estatística',
          content: 'Após carregar dados, vá para a aba "Análise Estatística" para ver os resultados automáticos.',
          action: 'Clique na aba "Análise Estatística"'
        },
        {
          title: 'Entendendo Medidas de Tendência Central',
          content: 'Média: valor central dos dados. Mediana: valor do meio quando ordenados. Moda: valor mais frequente.',
          tip: 'Se média e mediana são muito diferentes, seus dados podem ter outliers.'
        },
        {
          title: 'Interpretando Variabilidade',
          content: 'Desvio padrão mostra o quanto os dados se espalham. Valores maiores = mais variabilidade.',
          code: 'Desvio Padrão = √(Σ(xi - μ)² / N)',
          tip: 'Compare o desvio padrão com a média para entender a dispersão relativa.'
        },
        {
          title: 'Analisando Correlações',
          content: 'Correlação varia de -1 a +1. Próximo de +1 = correlação positiva forte. Próximo de -1 = correlação negativa forte.',
          tip: 'Correlação não implica causalidade!'
        }
      ]
    },
    {
      id: 'visualizacoes',
      title: 'Criando Visualizações Eficazes',
      description: 'Aprenda a escolher e personalizar gráficos para seus dados',
      difficulty: 'Intermediário',
      duration: '15 min',
      category: 'Visualização',
      completed: false,
      steps: [
        {
          title: 'Escolhendo o Tipo de Gráfico',
          content: 'Barras: comparar categorias. Linha: mostrar tendências temporais. Pizza: mostrar proporções.',
          action: 'Experimente diferentes tipos na aba Visualizações'
        },
        {
          title: 'Personalizando Cores',
          content: 'Use esquemas de cores consistentes. Azul para dados principais, cores contrastantes para comparações.',
          action: 'Teste diferentes esquemas de cores no painel de configurações'
        },
        {
          title: 'Configurando Animações',
          content: 'Animações ajudam a guiar a atenção, mas não exagere. 500-1000ms é ideal para a maioria dos casos.',
          tip: 'Animações muito rápidas (<200ms) ou muito lentas (>2000ms) podem prejudicar a experiência.'
        },
        {
          title: 'Exportando Gráficos',
          content: 'Use o botão "Exportar PNG" para salvar seus gráficos em alta qualidade.',
          action: 'Exporte um gráfico como PNG'
        }
      ]
    },
    {
      id: 'dados-abertos',
      title: 'Explorando Dados Abertos SC',
      description: 'Como usar datasets públicos de Santa Catarina',
      difficulty: 'Intermediário',
      duration: '12 min',
      category: 'Dados Públicos',
      completed: false,
      steps: [
        {
          title: 'Acessando Dados Abertos',
          content: 'A aba "Dados Abertos SC" oferece acesso a datasets oficiais do governo de Santa Catarina.',
          action: 'Clique na aba "Dados Abertos SC"'
        },
        {
          title: 'Escolhendo um Objetivo',
          content: 'Selecione entre 6 objetivos: Análise Correlacional, Comparativa, Tendências, Clustering, Preditiva ou Distribuição.',
          action: 'Escolha "Análise de Tendências" para começar'
        },
        {
          title: 'Selecionando Datasets',
          content: 'Cada objetivo mostra datasets relevantes com descrições detalhadas sobre fonte e atualização.',
          tip: 'Leia sempre a descrição para entender a origem e qualidade dos dados.'
        },
        {
          title: 'Executando Análise Comparativa',
          content: 'Use a funcionalidade de comparação para analisar diferenças entre datasets ou períodos.',
          action: 'Execute uma comparação entre dois datasets diferentes'
        }
      ]
    },
    {
      id: 'relatorios-avancados',
      title: 'Gerando Relatórios Profissionais',
      description: 'Crie relatórios completos com suas análises',
      difficulty: 'Avançado',
      duration: '20 min',
      category: 'Relatórios',
      completed: false,
      steps: [
        {
          title: 'Planejando seu Relatório',
          content: 'Defina objetivos claros: O que você quer comunicar? Quem é seu público? Que decisões o relatório deve apoiar?',
          tip: 'Um bom relatório conta uma história com seus dados.'
        },
        {
          title: 'Estruturando Seções',
          content: 'Use a sequência: Resumo Executivo → Metodologia → Resultados → Conclusões → Recomendações.',
          action: 'Organize suas análises seguindo esta estrutura'
        },
        {
          title: 'Interpretando Resultados',
          content: 'Não apenas apresente números. Explique o que eles significam no contexto do negócio ou problema.',
          tip: 'Use linguagem simples e evite jargão técnico desnecessário.'
        },
        {
          title: 'Exportando e Compartilhando',
          content: 'Exporte seus relatórios em diferentes formatos e prepare apresentações interativas.',
          action: 'Experimente exportar um relatório completo'
        }
      ]
    }
  ];

  const categories = ['all', 'Upload', 'Análise', 'Visualização', 'Dados Públicos', 'Relatórios'];

  const filteredTutorials = selectedCategory === 'all' 
    ? tutorials 
    : tutorials.filter(t => t.category === selectedCategory);

  const openTutorial = (tutorial: Tutorial) => {
    setSelectedTutorial(tutorial);
    setCurrentStep(0);
    setTutorialOpen(true);
  };

  const closeTutorial = () => {
    setTutorialOpen(false);
    setSelectedTutorial(null);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (selectedTutorial && currentStep < selectedTutorial.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeTutorial = () => {
    if (selectedTutorial) {
      setCompletedTutorials([...completedTutorials, selectedTutorial.id]);
      closeTutorial();
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Iniciante': return 'success';
      case 'Intermediário': return 'warning';
      case 'Avançado': return 'error';
      default: return 'default';
    }
  };

  const getProgressPercentage = () => {
    return (completedTutorials.length / tutorials.length) * 100;
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Cabeçalho */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
          🎓 Centro de Aprendizagem Interativo
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Tutoriais práticos e interativos para dominar a análise de dados. Aprenda no seu ritmo com exemplos reais.
        </Typography>

        {/* Progresso Geral */}
        <Card sx={{ mb: 3, p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <School />
            Seu Progresso de Aprendizagem
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <LinearProgress 
              variant="determinate" 
              value={getProgressPercentage()} 
              sx={{ flex: 1, height: 8, borderRadius: 4 }}
            />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {completedTutorials.length}/{tutorials.length} concluídos
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Continue aprendendo para se tornar um especialista em análise de dados!
          </Typography>
        </Card>

        {/* Filtros por Categoria */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            📚 Categorias de Tutoriais
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {categories.map((category) => (
              <Chip
                key={category}
                label={category === 'all' ? 'Todos' : category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? 'filled' : 'outlined'}
                color={selectedCategory === category ? 'primary' : 'default'}
                sx={{ mb: 1 }}
              />
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Grid de Tutoriais */}
      <Grid container spacing={3}>
        {filteredTutorials.map((tutorial) => (
          <Grid item xs={12} md={6} lg={4} key={tutorial.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                }
              }}
            >
              <CardContent sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                    {tutorial.title}
                  </Typography>
                  {completedTutorials.includes(tutorial.id) && (
                    <CheckCircle color="success" sx={{ ml: 1 }} />
                  )}
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {tutorial.description}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  <Chip 
                    label={tutorial.difficulty} 
                    size="small" 
                    color={getDifficultyColor(tutorial.difficulty) as any}
                  />
                  <Chip 
                    label={tutorial.duration} 
                    size="small" 
                    variant="outlined"
                    icon={<VideoLibrary />}
                  />
                  <Chip 
                    label={tutorial.category} 
                    size="small" 
                    variant="outlined"
                  />
                </Box>

                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>{tutorial.steps.length} passos</strong> • Interativo • Com exemplos práticos
                </Typography>
              </CardContent>

              <Box sx={{ p: 2, pt: 0 }}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={completedTutorials.includes(tutorial.id) ? <CheckCircle /> : <PlayArrow />}
                  onClick={() => openTutorial(tutorial)}
                  disabled={false}
                >
                  {completedTutorials.includes(tutorial.id) ? 'Revisar' : 'Iniciar Tutorial'}
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Card sx={{ mt: 4, p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <MenuIcon />
          Ações Rápidas
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<Download />}
              onClick={() => {
                const blob = new Blob(['Guia Completo DataScience Pro\n\nEste é um guia básico para usar a plataforma...'], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'guia-datasciencepro.txt';
                link.click();
                URL.revokeObjectURL(url);
              }}
              sx={{ height: 60 }}
            >
              Baixar Guia Completo
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<Article />}
              onClick={() => window.open('https://datasciencepro-completo.netlify.app', '_blank')}
              sx={{ height: 60 }}
            >
              Documentação Online
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<Quiz />}
              onClick={() => alert('Quiz interativo será implementado em breve! 🎯')}
              sx={{ height: 60 }}
            >
              Quiz de Conhecimento
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<Science />}
              onClick={() => alert('Exemplos práticos disponíveis em cada tutorial! 🔬')}
              sx={{ height: 60 }}
            >
              Exemplos Práticos
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Dialog do Tutorial */}
      <Dialog 
        open={tutorialOpen} 
        onClose={closeTutorial}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { minHeight: '70vh' }
        }}
      >
        {selectedTutorial && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h6">{selectedTutorial.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Passo {currentStep + 1} de {selectedTutorial.steps.length}
                </Typography>
              </Box>
              <IconButton onClick={closeTutorial}>
                <Close />
              </IconButton>
            </DialogTitle>

            <DialogContent>
              <LinearProgress 
                variant="determinate" 
                value={((currentStep + 1) / selectedTutorial.steps.length) * 100}
                sx={{ mb: 3 }}
              />

              <Stepper activeStep={currentStep} orientation="vertical">
                {selectedTutorial.steps.map((step, index) => (
                  <Step key={index}>
                    <StepLabel>
                      <Typography variant="h6">{step.title}</Typography>
                    </StepLabel>
                    <StepContent>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        {step.content}
                      </Typography>

                      {step.code && (
                        <Paper sx={{ p: 2, mb: 2, backgroundColor: 'grey.100' }}>
                          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
                            {step.code}
                          </Typography>
                        </Paper>
                      )}

                      {step.action && (
                        <Alert severity="info" sx={{ mb: 2 }}>
                          <Typography variant="body2">
                            <strong>Ação:</strong> {step.action}
                          </Typography>
                        </Alert>
                      )}

                      {step.tip && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                          <Typography variant="body2">
                            <strong>Dica:</strong> {step.tip}
                          </Typography>
                        </Alert>
                      )}
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </DialogContent>

            <DialogActions sx={{ p: 3 }}>
              <Button 
                onClick={prevStep} 
                disabled={currentStep === 0}
                startIcon={<NavigateBefore />}
              >
                Anterior
              </Button>
              <Box sx={{ flex: 1 }} />
              {currentStep === selectedTutorial.steps.length - 1 ? (
                <Button 
                  onClick={completeTutorial}
                  variant="contained"
                  startIcon={<CheckCircle />}
                >
                  Concluir Tutorial
                </Button>
              ) : (
                <Button 
                  onClick={nextStep}
                  variant="contained"
                  endIcon={<NavigateNext />}
                >
                  Próximo
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default LearningCenterFunctional;
