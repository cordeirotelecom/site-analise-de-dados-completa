import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Alert,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Tab,
  Tabs,
  IconButton,
  Tooltip,
  Badge,
  Zoom,
  Fade
} from '@mui/material';
import {
  School,
  MenuBook,
  Quiz,
  Science,
  EmojiObjects,
  TrendingUp,
  Assessment,
  Timeline,
  Functions,
  Calculate,
  BarChart,
  ShowChart,
  Analytics,
  PlayArrow,
  Pause,
  Refresh,
  CheckCircle,
  Cancel,
  Info,
  Warning,
  Star,
  ExpandMore,
  Lightbulb,
  Psychology,
  AutoAwesome,
  Speed,
  Memory,
  DataObject,
  Group,
  Category,
  Rule,
  Transform,
  FilterAlt,
  Tune,
  Settings,
  Visibility,
  Download,
  Share,
  Bookmark,
  ThumbUp,
  Comment,
  Flag
} from '@mui/icons-material';

interface LessonStep {
  id: string;
  title: string;
  type: 'theory' | 'example' | 'practice' | 'quiz' | 'reflection';
  content: string;
  fabioQuote?: string;
  scientificBasis?: string;
  practicalExample?: string;
  excelFormulas?: string[];
  interactiveDemo?: any;
  quiz?: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
}

interface LearningModule {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  duration: string;
  prerequisites: string[];
  objectives: string[];
  steps: LessonStep[];
  fabioInsights: string[];
  scientificReferences: string[];
  practicalCases: string[];
}

const EnsinerCientificoInterativo: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<string>('');
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: number }>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPracticeData, setShowPracticeData] = useState(false);

  const learningModules: LearningModule[] = [
    {
      id: 'data_collection',
      title: '1. A Importância da Coleta de Dados',
      description: 'Fundamentos da coleta científica de dados e sua importância para análises significativas',
      difficulty: 'beginner',
      duration: '45 min',
      prerequisites: [],
      objectives: [
        'Compreender a importância estratégica da coleta de dados',
        'Identificar diferentes tipos de bancos de dados',
        'Aplicar metodologia científica na coleta',
        'Reconhecer padrões nos dados coletados'
      ],
      steps: [
        {
          id: 'theory_importance',
          title: 'A Chave do Sucesso',
          type: 'theory',
          content: 'A coleta de dados é o ponto de partida para qualquer análise significativa. Sem dados de qualidade, não há ciência válida.',
          fabioQuote: 'Você tem que pegar o dado, entendeu? Porque o dado te conta alguma história, né? O dado vai te contar alguma história. O resto é muita teoria, né? Muita teoria que eu desconfio. Agora o dado não, né? O dado está nos contando uma história.',
          scientificBasis: 'A coleta sistemática de dados é fundamental para o método científico desde Francis Bacon (1620). Dados são a base empírica que sustenta ou refuta hipóteses.',
          practicalExample: 'Durante seu doutorado, Fábio teve que buscar dados em diversas instituições, pois "nenhum desses institutos foram lá em Copacabana, bateram na minha porta."'
        },
        {
          id: 'types_databases',
          title: 'Tipos de Bancos de Dados',
          type: 'example',
          content: 'Existem diferentes tipos de bancos de dados, cada um com características específicas para análise.',
          practicalExample: `
            🕐 TEMPORAIS: Dados organizados cronologicamente
            • Exemplo: Medições de temperatura e umidade em intervalos regulares
            • Os casos são cada horário de medição
            • As variáveis são valores numéricos

            🗺️ ESPACIAIS: Dados associados a unidades geográficas
            • Exemplo: Casos de dengue por cidade/região
            • Permitem geração de mapas
            • "Os casos ou registros continuam sendo na horizontal. Porém, agora vejam que os meus casos são unidades geográficas."

            💳 TRANSACIONAIS: Registram transações individuais
            • Exemplo: "O cliente número um foi lá no supermercado e comprou ketchup... O cliente número dois comprou não sei o quê de cebola, suga, etc."
            • Tempo não é necessariamente o fator organizador principal

            🏥 PACIENTES: Dados que caracterizam indivíduos
            • Exemplo: Informações de diagnóstico, idade, febre, peso
            • Cada linha representa um paciente/caso
          `
        },
        {
          id: 'practice_identification',
          title: 'Prática: Identificando Tipos de Dados',
          type: 'practice',
          content: 'Vamos praticar identificando tipos de variáveis em datasets reais.',
          interactiveDemo: {
            datasets: [
              { name: 'Temperatura', values: [25.5, 30.2, 18.7], type: 'numeric' },
              { name: 'Região', values: ['Norte', 'Sul', 'Centro'], type: 'categorical' },
              { name: 'Data', values: ['2023-01-01', '2023-01-02'], type: 'temporal' }
            ]
          }
        },
        {
          id: 'quiz_data_types',
          title: 'Quiz: Tipos de Variáveis',
          type: 'quiz',
          content: 'Teste seu conhecimento sobre tipos de variáveis.',
          quiz: {
            question: 'Segundo Fábio, qual é a diferença fundamental entre variáveis numéricas e categóricas?',
            options: [
              'Numéricas são sempre maiores que categóricas',
              'Numéricas representam quantidades, categóricas representam qualidades',
              'Não há diferença significativa',
              'Categóricas são mais importantes para análise'
            ],
            correct: 1,
            explanation: 'Variáveis numéricas representam quantidades e são utilizadas para cálculos matemáticos (temperatura, umidade), enquanto categóricas representam qualidades ("nublado", "ensolarado"). Porém, categóricas podem "embutir nela um número" ao serem transformadas em intervalos.'
          }
        }
      ],
      fabioInsights: [
        'O dado não mente - "O dado está nos contando uma história"',
        'Colete o máximo de dados possível, mesmo que a utilidade não seja aparente imediatamente',
        'Variáveis categóricas podem embutir números quando transformadas em intervalos',
        'A coleta ativa é necessária - os dados não vêm até você'
      ],
      scientificReferences: [
        'Bacon, F. (1620). Novum Organum - Fundamentos do método empírico',
        'Tukey, J. (1977). Exploratory Data Analysis - Análise exploratória de dados',
        'Hand, D. (2008). Statistics: A Very Short Introduction - Importância dos dados na ciência'
      ],
      practicalCases: [
        'Doutorado de Fábio: Preenchimento de dados de pluviômetros usando redes neurais',
        'Estudo dengue Maringá/Foz: Associação entre chuva acumulada e casos de dengue',
        'COVID-19 Bruxelas/São Paulo: Correlação entre secura do ar e mortalidade'
      ]
    },
    {
      id: 'data_preparation',
      title: '2. Preparação de Dados no Excel',
      description: 'Técnicas avançadas de preparação e limpeza de dados usando Excel com metodologia científica',
      difficulty: 'intermediate',
      duration: '60 min',
      prerequisites: ['data_collection'],
      objectives: [
        'Dominar técnicas de limpeza de dados no Excel',
        'Aplicar discretização científica de variáveis',
        'Criar novas variáveis a partir das existentes',
        'Preparar dados para análise CBA'
      ],
      steps: [
        {
          id: 'data_cleaning',
          title: 'Tratamento Inicial dos Dados',
          type: 'theory',
          content: 'A preparação adequada dos dados é crítica para análises de qualidade.',
          fabioQuote: 'Não usem isso. Esse aqui é um exemplo que eu não usaria. Célula mesclada... só vai te trazer dor de cabeça no futuro.',
          excelFormulas: [
            'Evitar células mescladas',
            'Padronizar formatos (vírgula vs. ponto para decimais)',
            'Organizar linhas para cálculos no início da planilha'
          ],
          practicalExample: 'Corrigir inconsistências: "Vem na coluna O... ela tá abichada, por que que ela tá abichada? Ponto. Porque ela tá com ponto, ó, e os outros estão vírgula."'
        },
        {
          id: 'discretization_theory',
          title: 'Discretização de Variáveis Numéricas',
          type: 'theory',
          content: 'A discretização transforma variáveis numéricas em categorias, tornando-as adequadas para modelos de regras.',
          excelFormulas: [
            'Mínimo: =MÍNIMO(B21:B118)',
            'Primeiro tercil: =PERCENTIL(B21:B118;1/3)',
            'Segundo tercil: =PERCENTIL(B21:B118;2/3)',
            'Máximo: =MÁXIMO(B21:B118)'
          ],
          scientificBasis: 'Divisão em tercis (33% cada) garante distribuição balanceada para análise estatística.'
        },
        {
          id: 'rounding_practice',
          title: 'Arredondamento Científico',
          type: 'practice',
          content: 'Prática de arredondamento para facilitar comunicação dos resultados.',
          fabioQuote: 'Se eu venho em seis dias mais que 92.6 mm. Número quebrado aqui o cara não vai nem memorizar. Eu vou falar 90.',
          practicalExample: 'Regra: "todas as três classes apresentarem mais de 20%" após o arredondamento.'
        },
        {
          id: 'frequency_calculation',
          title: 'Cálculo de Frequência e Percentual',
          type: 'example',
          content: 'Verificação da distribuição dos dados nos novos intervalos.',
          excelFormulas: [
            'Frequência: =FREQÜÊNCIA(B21:B118;B6:B8)',
            'Percentual: =B10/B$13*100 (onde B13 é fixado com $)'
          ]
        },
        {
          id: 'categorical_transformation',
          title: 'Transformação Categórica Avançada',
          type: 'example',
          content: 'Conversão de valores numéricos em categorias usando funções Excel complexas.',
          excelFormulas: [
            '=SE(ÉCÉL.VAZIA(B21);"";SE(B21>B$7;CONCATENAR(V$20;"_>_";V$7);SE(B21>B$6;CONCATENAR(V$6;"_<_";V$20;"_<_";V$7);CONCATENAR(V$20;"_<_";V$6))))',
            'É.CÉL.VAZIA: Verifica se a célula está vazia',
            'SE: Permite criar condições lógicas',
            'CONCATENAR: Combina textos para formar descrição categórica'
          ]
        }
      ],
      fabioInsights: [
        'Células mescladas trazem dor de cabeça - sempre evitar',
        'Números quebrados são difíceis de memorizar - arredondar para comunicação',
        'Todas as classes devem ter mais de 20% para análise válida',
        'Verificar sempre se formatação está consistente (vírgula vs. ponto)'
      ],
      scientificReferences: [
        'Dougherty, J. (1995). Supervised and Unsupervised Discretization of Continuous Features',
        'Fayyad, U. (1993). Multi-Interval Discretization of Continuous-Valued Attributes',
        'Liu, H. (2002). Discretization: An Enabling Technique - Data Mining and Knowledge Discovery'
      ],
      practicalCases: [
        'Discretização PM2.5 em intervalos para análise de poluição',
        'Transformação de estiagem em dias com chuva',
        'Criação de variáveis complementares (secura = 100 - umidade)'
      ]
    },
    {
      id: 'exploratory_analysis',
      title: '3. Análise Exploratória e Modelagem',
      description: 'Técnicas avançadas de mineração de dados para insights qualitativos e quantitativos',
      difficulty: 'advanced',
      duration: '90 min',
      prerequisites: ['data_collection', 'data_preparation'],
      objectives: [
        'Dominar análise de correlação linear',
        'Aplicar técnicas de clustering (dendrograma e K-means)',
        'Realizar análise fatorial para redução dimensional',
        'Interpretar resultados com base científica'
      ],
      steps: [
        {
          id: 'correlation_analysis',
          title: 'Análise Linear (Correlação)',
          type: 'theory',
          content: 'Medição da relação linear entre duas variáveis usando correlação de Pearson.',
          scientificBasis: 'A diagonal da matriz sempre será 1 (variável correlacionada consigo mesma). Valores próximos de 1 ou -1 indicam forte correlação.',
          practicalExample: 'Exemplo: correlação de 0.98 entre estiagem agrícola e mortes por COVID-19.',
          excelFormulas: [
            'Statistics > Basic Statistics/Tables > Correlation Matrix',
            'Gráficos de dispersão: Graphs > Scatterplots',
            'R² (coeficiente de determinação) para ajuste do modelo'
          ]
        },
        {
          id: 'cluster_theory',
          title: 'Análise de Cluster - Fundamentos',
          type: 'theory',
          content: 'Identificação de grupos de objetos altamente similares entre si e distintos de outros grupos.',
          scientificBasis: 'Algoritmos baseados em distância matemática para construir hierarquias ou partições.',
          practicalExample: 'Exemplo de Fábio: "morbidade e pressão atmosférica tendem a estar no mesmo galho" do dendrograma.'
        },
        {
          id: 'dendrogram_practice',
          title: 'Dendrograma (Joining Tree Cluster)',
          type: 'example',
          content: 'Construção de árvore hierárquica mostrando distâncias entre objetos.',
          fabioQuote: 'Ele constrói essa árvore de acordo com uma distância matemática.',
          excelFormulas: [
            'Statistics > Multivariate Exploratory Techniques > Cluster Analysis > Joining (Tree) Cluster',
            'Interpretação: "galhos" indicam agrupamentos naturais',
            'Exemplo: morbidade e pressão atmosférica no mesmo galho'
          ]
        },
        {
          id: 'kmeans_practice',
          title: 'K-Means Cluster',
          type: 'practice',
          content: 'Agrupamento em número predefinido de clusters com validação.',
          scientificBasis: 'Maximiza similaridade dentro dos clusters e dissimilaridade entre eles.',
          excelFormulas: [
            'Statistics > Multivariate Exploratory Techniques > K-Means Cluster',
            'K determinado pela análise do dendrograma',
            'Validação por silhueta ou elbow method'
          ]
        },
        {
          id: 'factor_analysis',
          title: 'Análise Fatorial',
          type: 'theory',
          content: 'Redução de dimensionalidade e identificação de fatores latentes.',
          scientificBasis: 'Cria "eixos" (fatores) e calcula coordenadas das variáveis nesses eixos.',
          fabioQuote: 'Essas caixinhas a gente cria para tentar juntar o máximo de variáveis possíveis.',
          excelFormulas: [
            'Statistics > Multivariate Exploratory Techniques > Factor Analysis',
            'Summary Factor Loadings destaca variáveis mais associadas',
            'Plots of Loadings (2D, 3D) para visualização'
          ]
        },
        {
          id: 'quiz_advanced',
          title: 'Quiz: Análises Multivariadas',
          type: 'quiz',
          content: 'Teste seu conhecimento sobre técnicas avançadas.',
          quiz: {
            question: 'Qual é a principal diferença entre dendrograma e K-means segundo a metodologia apresentada?',
            options: [
              'Dendrograma é mais rápido que K-means',
              'Dendrograma constrói hierarquia, K-means requer K predefinido',
              'K-means é sempre melhor que dendrograma',
              'Não há diferença significativa'
            ],
            correct: 1,
            explanation: 'Dendrograma constrói uma árvore hierárquica baseada em distância matemática, mostrando agrupamentos naturais. K-means requer que o número de clusters (K) seja especificado antecipadamente, frequentemente determinado pela análise do dendrograma.'
          }
        }
      ],
      fabioInsights: [
        'Dendrograma constrói árvore por distância matemática - galhos mostram grupos naturais',
        'K-means precisa de K predefinido - use dendrograma para escolher',
        'Análise fatorial cria "caixinhas" para juntar máximo de variáveis',
        'Factor loadings em vermelho/negrito são mais importantes'
      ],
      scientificReferences: [
        'Ward, J.H. (1963). Hierarchical Grouping to Optimize an Objective Function',
        'MacQueen, J. (1967). Some Methods for Classification and Analysis of Multivariate Observations',
        'Kaiser, H.F. (1958). The Varimax Criterion for Analytic Rotation in Factor Analysis'
      ],
      practicalCases: [
        'Curitiba: Morbidade respiratória associada com pressão atmosférica',
        'Maringá/Foz: Dengue e chuva acumulada via PCA e K-means',
        'Rio de Janeiro: Agrupamento de pluviômetros por similaridade espacial'
      ]
    }
  ];

  const getCurrentModule = () => {
    return learningModules.find(m => m.id === selectedModule);
  };

  const getCurrentStep = () => {
    const module = getCurrentModule();
    return module?.steps[currentStep];
  };

  const handleStepComplete = () => {
    const step = getCurrentStep();
    if (step) {
      setCompletedSteps(prev => new Set([...prev, step.id]));
      if (currentStep < (getCurrentModule()?.steps.length || 0) - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleQuizAnswer = (stepId: string, answer: number) => {
    setQuizAnswers(prev => ({ ...prev, [stepId]: answer }));
    setShowExplanation(true);
  };

  const renderStepContent = (step: LessonStep) => {
    switch (step.type) {
      case 'theory':
        return (
          <Box>
            <Typography variant="body1" paragraph>
              {step.content}
            </Typography>
            
            {step.fabioQuote && (
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2" fontStyle="italic">
                  💬 <strong>Fábio diz:</strong> "{step.fabioQuote}"
                </Typography>
              </Alert>
            )}

            {step.scientificBasis && (
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle2">
                    <Science sx={{ mr: 1 }} /> Base Científica
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2">{step.scientificBasis}</Typography>
                </AccordionDetails>
              </Accordion>
            )}

            {step.excelFormulas && (
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle2">
                    <Functions sx={{ mr: 1 }} /> Fórmulas Excel
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List dense>
                    {step.excelFormulas.map((formula, index) => (
                      <ListItem key={index}>
                        <ListItemIcon><Calculate /></ListItemIcon>
                        <ListItemText 
                          primary={formula}
                          primaryTypographyProps={{ fontFamily: 'monospace' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            )}
          </Box>
        );

      case 'example':
        return (
          <Box>
            <Typography variant="body1" paragraph>
              {step.content}
            </Typography>
            
            {step.practicalExample && (
              <Paper sx={{ p: 2, bgcolor: 'grey.50', mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  <EmojiObjects sx={{ mr: 1 }} /> Exemplo Prático:
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                  {step.practicalExample}
                </Typography>
              </Paper>
            )}

            {step.excelFormulas && (
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle2">
                    <Functions sx={{ mr: 1 }} /> Implementação Excel
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List dense>
                    {step.excelFormulas.map((formula, index) => (
                      <ListItem key={index}>
                        <ListItemText 
                          primary={formula}
                          primaryTypographyProps={{ fontFamily: 'monospace', fontSize: '0.9rem' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            )}
          </Box>
        );

      case 'practice':
        return (
          <Box>
            <Typography variant="body1" paragraph>
              {step.content}
            </Typography>
            
            <Button
              variant="contained"
              onClick={() => setShowPracticeData(true)}
              startIcon={<DataObject />}
              sx={{ mb: 2 }}
            >
              Abrir Dados de Prática
            </Button>

            {step.interactiveDemo && (
              <Card sx={{ mt: 2 }}>
                <CardContent>
                  <Typography variant="subtitle2" gutterBottom>Dados para Prática:</Typography>
                  <Grid container spacing={2}>
                    {step.interactiveDemo.datasets?.map((dataset: any, index: number) => (
                      <Grid item xs={12} md={4} key={index}>
                        <Paper sx={{ p: 2 }}>
                          <Typography variant="subtitle2">{dataset.name}</Typography>
                          <Chip size="small" label={dataset.type} color="primary" />
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            Valores: {dataset.values.join(', ')}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            )}
          </Box>
        );

      case 'quiz':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              <Quiz sx={{ mr: 1 }} /> {step.quiz?.question}
            </Typography>
            
            <Grid container spacing={1} sx={{ mb: 2 }}>
              {step.quiz?.options.map((option, index) => (
                <Grid item xs={12} key={index}>
                  <Button
                    variant={quizAnswers[step.id] === index ? "contained" : "outlined"}
                    fullWidth
                    onClick={() => handleQuizAnswer(step.id, index)}
                    sx={{ textAlign: 'left', justifyContent: 'flex-start' }}
                  >
                    {String.fromCharCode(65 + index)}. {option}
                  </Button>
                </Grid>
              ))}
            </Grid>

            {showExplanation && quizAnswers[step.id] !== undefined && (
              <Fade in={showExplanation}>
                <Alert 
                  severity={quizAnswers[step.id] === step.quiz?.correct ? "success" : "error"}
                  icon={quizAnswers[step.id] === step.quiz?.correct ? <CheckCircle /> : <Cancel />}
                >
                  <Typography variant="body2">
                    <strong>
                      {quizAnswers[step.id] === step.quiz?.correct ? "Correto!" : "Incorreto!"}
                    </strong>
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {step.quiz?.explanation}
                  </Typography>
                </Alert>
              </Fade>
            )}
          </Box>
        );

      default:
        return <Typography>Tipo de passo não reconhecido</Typography>;
    }
  };

  const calculateProgress = () => {
    const module = getCurrentModule();
    if (!module) return 0;
    return (completedSteps.size / module.steps.length) * 100;
  };

  useEffect(() => {
    setProgress(calculateProgress());
  }, [completedSteps, selectedModule]);

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        <School sx={{ mr: 2, fontSize: 40 }} />
        Ensino Científico Interativo
      </Typography>
      
      <Typography variant="h6" align="center" color="text.secondary" gutterBottom>
        Aprenda análise de dados com metodologia científica completa e insights de especialistas
      </Typography>

      <Card sx={{ mb: 3, background: 'linear-gradient(45deg, #1565c0 30%, #42a5f5 90%)' }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
            🎓 Sistema de Ensino Revolucionário
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" sx={{ color: 'white' }}>
                ✅ Metodologia baseada em casos reais<br/>
                ✅ Citações diretas de especialistas<br/>
                ✅ Base científica referenciada<br/>
                ✅ Exemplos práticos detalhados
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" sx={{ color: 'white' }}>
                ✅ Quizzes interativos<br/>
                ✅ Fórmulas Excel completas<br/>
                ✅ Exercícios práticos<br/>
                ✅ Progresso personalizado
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" sx={{ color: 'white' }}>
                ✅ Insights de Fábio<br/>
                ✅ Casos reais de pesquisa<br/>
                ✅ Metodologia científica<br/>
                ✅ Aplicação profissional
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Tabs value={selectedTab} onChange={(e, v) => setSelectedTab(v)} sx={{ mb: 3 }}>
        <Tab label="Módulos" icon={<MenuBook />} />
        <Tab label="Progresso" icon={<Assessment />} />
        <Tab label="Recursos" icon={<Lightbulb />} />
      </Tabs>

      {selectedTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Módulos de Aprendizagem</Typography>
            {learningModules.map((module) => (
              <Card 
                key={module.id} 
                sx={{ 
                  mb: 2, 
                  cursor: 'pointer',
                  border: selectedModule === module.id ? 2 : 0,
                  borderColor: selectedModule === module.id ? 'primary.main' : 'transparent'
                }}
                onClick={() => {
                  setSelectedModule(module.id);
                  setCurrentStep(0);
                  setShowExplanation(false);
                }}
              >
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                    <Typography variant="h6">{module.title}</Typography>
                    <Chip 
                      size="small" 
                      label={module.difficulty} 
                      color={
                        module.difficulty === 'beginner' ? 'success' :
                        module.difficulty === 'intermediate' ? 'warning' :
                        module.difficulty === 'advanced' ? 'error' : 'secondary'
                      }
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {module.description}
                  </Typography>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="caption">
                      ⏱️ {module.duration}
                    </Typography>
                    <Badge 
                      badgeContent={`${Math.floor((completedSteps.size / module.steps.length) * 100)}%`} 
                      color="primary"
                    >
                      <Star color={selectedModule === module.id ? 'primary' : 'disabled'} />
                    </Badge>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Grid>

          <Grid item xs={12} md={8}>
            {selectedModule && getCurrentModule() && (
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h5">{getCurrentModule()?.title}</Typography>
                    <Box display="flex" alignItems="center">
                      <IconButton onClick={() => setIsPlaying(!isPlaying)}>
                        {isPlaying ? <Pause /> : <PlayArrow />}
                      </IconButton>
                      <IconButton onClick={() => setCurrentStep(0)}>
                        <Refresh />
                      </IconButton>
                    </Box>
                  </Box>

                  <LinearProgress 
                    variant="determinate" 
                    value={progress} 
                    sx={{ mb: 3, height: 8, borderRadius: 4 }}
                  />

                  <Typography variant="body1" color="text.secondary" paragraph>
                    {getCurrentModule()?.description}
                  </Typography>

                  <Accordion sx={{ mb: 2 }}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="subtitle1">Objetivos de Aprendizagem</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense>
                        {getCurrentModule()?.objectives.map((objective, index) => (
                          <ListItem key={index}>
                            <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                            <ListItemText primary={objective} />
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>

                  <Stepper activeStep={currentStep} orientation="vertical">
                    {getCurrentModule()?.steps.map((step, index) => (
                      <Step key={step.id}>
                        <StepLabel>
                          <Box display="flex" alignItems="center">
                            {step.title}
                            {completedSteps.has(step.id) && (
                              <CheckCircle color="success" sx={{ ml: 1, fontSize: 20 }} />
                            )}
                          </Box>
                        </StepLabel>
                        <StepContent>
                          {renderStepContent(step)}
                          <Box sx={{ mt: 2 }}>
                            <Button
                              variant="contained"
                              onClick={handleStepComplete}
                              disabled={completedSteps.has(step.id)}
                              sx={{ mr: 1 }}
                            >
                              {completedSteps.has(step.id) ? 'Completo' : 'Marcar como Completo'}
                            </Button>
                            {index > 0 && (
                              <Button onClick={() => setCurrentStep(index - 1)}>
                                Anterior
                              </Button>
                            )}
                          </Box>
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>
                </CardContent>
              </Card>
            )}

            {!selectedModule && (
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom align="center">
                    Selecione um módulo para começar
                  </Typography>
                  <Typography variant="body1" align="center" color="text.secondary">
                    Escolha um dos módulos ao lado para iniciar sua jornada de aprendizado científico.
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      )}

      {selectedTab === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Seu Progresso de Aprendizagem</Typography>
            
            <Grid container spacing={3}>
              {learningModules.map((module) => {
                const moduleProgress = (completedSteps.size / module.steps.length) * 100;
                return (
                  <Grid item xs={12} md={6} key={module.id}>
                    <Card>
                      <CardContent>
                        <Typography variant="subtitle1" gutterBottom>{module.title}</Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={moduleProgress} 
                          sx={{ mb: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {Math.floor(moduleProgress)}% completo
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>

            <Alert severity="info" sx={{ mt: 3 }}>
              <Typography variant="body2">
                💡 <strong>Dica:</strong> Complete todos os módulos para obter certificação em 
                Análise Científica de Dados com metodologia avançada!
              </Typography>
            </Alert>
          </CardContent>
        </Card>
      )}

      {selectedTab === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <Lightbulb /> Insights de Fábio
                </Typography>
                {getCurrentModule()?.fabioInsights.map((insight, index) => (
                  <Alert key={index} severity="info" sx={{ mb: 1 }}>
                    <Typography variant="body2">💬 {insight}</Typography>
                  </Alert>
                ))}
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <MenuBook /> Referências Científicas
                </Typography>
                <List dense>
                  {getCurrentModule()?.scientificReferences.map((ref, index) => (
                    <ListItem key={index}>
                      <ListItemIcon><Science /></ListItemIcon>
                      <ListItemText 
                        primary={ref}
                        primaryTypographyProps={{ fontSize: '0.9rem' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <Timeline /> Casos Práticos Reais
                </Typography>
                <Grid container spacing={2}>
                  {getCurrentModule()?.practicalCases.map((case_study, index) => (
                    <Grid item xs={12} md={4} key={index}>
                      <Paper sx={{ p: 2, height: '100%' }}>
                        <Typography variant="body2">{case_study}</Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      <Dialog open={showPracticeData} onClose={() => setShowPracticeData(false)} maxWidth="md" fullWidth>
        <DialogTitle>Dados de Prática Interativa</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Use estes dados para praticar as técnicas aprendidas:
          </Typography>
          {/* Conteúdo do diálogo seria implementado aqui */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPracticeData(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EnsinerCientificoInterativo;
