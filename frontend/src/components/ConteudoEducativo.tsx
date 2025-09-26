import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Paper,
  Tab,
  Tabs,
  Alert,
  Button,
  LinearProgress,
} from '@mui/material';
import {
  ExpandMore,
  School,
  Psychology,
  Functions,
  Assessment,
  Science,
  PlayArrow,
  CheckCircle,
  BookmarkBorder,
  Lightbulb,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tutorial-tabpanel-${index}`}
      aria-labelledby={`tutorial-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const ConteudoEducativo: React.FC = () => {
  const [tabAtiva, setTabAtiva] = useState(0);
  const [progressoTutorial, setProgressoTutorial] = useState<{ [key: string]: number }>({});

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabAtiva(newValue);
  };

  const iniciarTutorial = (tutorialId: string) => {
    setProgressoTutorial(prev => ({ ...prev, [tutorialId]: 10 }));
    // Simular progresso
    setTimeout(() => setProgressoTutorial(prev => ({ ...prev, [tutorialId]: 50 })), 1000);
    setTimeout(() => setProgressoTutorial(prev => ({ ...prev, [tutorialId]: 100 })), 2000);
  };

  const conceitos = [
    {
      titulo: "Data Science",
      descricao: "Ciência de dados é a área que combina estatística, programação e conhecimento de domínio para extrair insights de dados.",
      aplicacoes: ["Análise preditiva", "Segmentação de clientes", "Detecção de fraudes", "Otimização de processos"],
      nivel: "Básico"
    },
    {
      titulo: "Machine Learning",
      descricao: "Aprendizado de máquina é um subcampo da IA que permite aos computadores aprenderem sem programação explícita.",
      aplicacoes: ["Classificação", "Regressão", "Clustering", "Sistemas de recomendação"],
      nivel: "Intermediário"
    },
    {
      titulo: "AutoML",
      descricao: "AutoML automatiza o processo de aplicação de machine learning, tornando-o acessível a não especialistas.",
      aplicacoes: ["Seleção automática de modelos", "Engenharia de features", "Otimização de hiperparâmetros"],
      nivel: "Avançado"
    },
    {
      titulo: "CBA (Class-Based Association)",
      descricao: "CBA é uma técnica que combina mineração de regras de associação com classificação para descobrir padrões.",
      aplicacoes: ["Análise de cesta de compras", "Regras de negócio", "Padrões comportamentais"],
      nivel: "Avançado"
    }
  ];

  const tutoriais = [
    {
      id: "csv-upload",
      titulo: "Como Fazer Upload de CSV",
      tempo: "5 min",
      dificuldade: "Básico",
      passos: [
        "Prepare seu arquivo CSV com cabeçalhos claros",
        "Clique em 'Selecionar Arquivo' na seção AutoML",
        "Aguarde a validação automática",
        "Revise os warnings e sugestões",
        "Clique em 'Processar Dados' para continuar"
      ]
    },
    {
      id: "automl-basico",
      titulo: "Seu Primeiro Modelo AutoML",
      tempo: "10 min",
      dificuldade: "Básico",
      passos: [
        "Faça upload de um dataset com target definido",
        "Selecione a coluna target (variável a prever)",
        "Escolha o tipo de problema (classificação/regressão)",
        "Clique em 'Treinar Modelo'",
        "Analise os resultados e métricas geradas"
      ]
    },
    {
      id: "cba-analise",
      titulo: "Análise CBA Avançada",
      tempo: "15 min",
      dificuldade: "Intermediário",
      passos: [
        "Carregue dados transacionais ou categóricos",
        "Configure suporte e confiança mínimos",
        "Execute a mineração de regras",
        "Interprete as regras descobertas",
        "Exporte relatório com insights"
      ]
    }
  ];

  const glossario = [
    { termo: "Accuracy", definicao: "Proporção de predições corretas em relação ao total de predições" },
    { termo: "Cross-validation", definicao: "Técnica para avaliar modelos dividindo dados em múltiplas partições" },
    { termo: "Feature", definicao: "Variável independente ou característica usada para fazer predições" },
    { termo: "Overfitting", definicao: "Quando um modelo aprende demais os dados de treino e não generaliza bem" },
    { termo: "Precision", definicao: "Proporção de verdadeiros positivos entre todas as predições positivas" },
    { termo: "Recall", definicao: "Proporção de verdadeiros positivos identificados corretamente" },
    { termo: "Support", definicao: "Frequência com que um item ou conjunto aparece nos dados" },
    { termo: "Confidence", definicao: "Probabilidade condicional de Y dado X em regras de associação" }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        <Science sx={{ fontSize: 40, mr: 2, verticalAlign: 'middle' }} />
        Centro de Aprendizado
      </Typography>

      <Alert severity="info" sx={{ mb: 4 }}>
        <Typography variant="body1">
          <strong>Para Educadores:</strong> Esta seção foi desenvolvida para auxiliar no ensino de Data Science. 
          Cada conceito inclui exemplos práticos e exercícios aplicados.
        </Typography>
      </Alert>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabAtiva} onChange={handleTabChange} centered>
          <Tab icon={<School />} label="Tutoriais" />
          <Tab icon={<Psychology />} label="Conceitos" />
          <Tab icon={<BookmarkBorder />} label="Glossário" />
        </Tabs>
      </Box>

      <TabPanel value={tabAtiva} index={0}>
        <Typography variant="h4" gutterBottom>
          Tutoriais Passo a Passo
        </Typography>
        <Grid container spacing={3}>
          {tutoriais.map((tutorial, index) => (
            <Grid item xs={12} md={6} key={tutorial.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" component="h3">
                      {tutorial.titulo}
                    </Typography>
                    <Chip 
                      label={tutorial.dificuldade} 
                      color={tutorial.dificuldade === 'Básico' ? 'success' : tutorial.dificuldade === 'Intermediário' ? 'warning' : 'error'}
                      size="small"
                    />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    ⏱️ {tutorial.tempo} • {tutorial.passos.length} passos
                  </Typography>

                  {progressoTutorial[tutorial.id] && (
                    <Box sx={{ mb: 2 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={progressoTutorial[tutorial.id]} 
                        sx={{ mb: 1 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        Progresso: {progressoTutorial[tutorial.id]}%
                      </Typography>
                    </Box>
                  )}

                  <List dense>
                    {tutorial.passos.map((passo, passoIndex) => (
                      <ListItem key={passoIndex} sx={{ pl: 0 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          {progressoTutorial[tutorial.id] === 100 ? (
                            <CheckCircle color="success" />
                          ) : (
                            <Typography variant="body2" color="primary">
                              {passoIndex + 1}
                            </Typography>
                          )}
                        </ListItemIcon>
                        <ListItemText 
                          primary={passo} 
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Button
                    variant="contained"
                    startIcon={<PlayArrow />}
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => iniciarTutorial(tutorial.id)}
                    disabled={progressoTutorial[tutorial.id] === 100}
                  >
                    {progressoTutorial[tutorial.id] === 100 ? 'Concluído' : 'Iniciar Tutorial'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabAtiva} index={1}>
        <Typography variant="h4" gutterBottom>
          Conceitos Fundamentais
        </Typography>
        <Grid container spacing={3}>
          {conceitos.map((conceito, index) => (
            <Grid item xs={12} key={index}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Lightbulb sx={{ mr: 2, color: 'primary.main' }} />
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                      {conceito.titulo}
                    </Typography>
                    <Chip 
                      label={conceito.nivel}
                      size="small"
                      color={conceito.nivel === 'Básico' ? 'success' : conceito.nivel === 'Intermediário' ? 'warning' : 'error'}
                    />
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography paragraph>
                    {conceito.descricao}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Aplicações Práticas:
                  </Typography>
                  <Grid container spacing={1}>
                    {conceito.aplicacoes.map((aplicacao, appIndex) => (
                      <Grid item key={appIndex}>
                        <Chip 
                          label={aplicacao} 
                          variant="outlined" 
                          size="small"
                          icon={<Functions />}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabAtiva} index={2}>
        <Typography variant="h4" gutterBottom>
          Glossário Técnico
        </Typography>
        <Grid container spacing={2}>
          {glossario.map((item, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper sx={{ p: 2, height: '100%' }}>
                <Typography variant="h6" color="primary" gutterBottom>
                  {item.termo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.definicao}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    </Container>
  );
};

export default ConteudoEducativo;