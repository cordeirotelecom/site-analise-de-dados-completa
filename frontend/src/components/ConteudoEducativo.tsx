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
      titulo: "Metodologia Científica",
      descricao: "Conjunto de procedimentos sistemáticos para investigar fenômenos, validar hipóteses e produzir conhecimento científico confiável.",
      aplicacoes: ["Estudos epidemiológicos", "Ensaios clínicos", "Pesquisa educacional", "Análise de dados ambientais"],
      nivel: "Básico"
    },
    {
      titulo: "Biostatística",
      descricao: "Aplicação de métodos estatísticos para resolver problemas em ciências biológicas, medicina e saúde pública.",
      aplicacoes: ["Análise de sobrevivência", "Estudos caso-controle", "Ensaios clínicos randomizados", "Meta-análise"],
      nivel: "Intermediário"
    },
    {
      titulo: "Epidemiologia",
      descricao: "Estudo da distribuição e determinantes de estados relacionados à saúde em populações específicas.",
      aplicacoes: ["Vigilância epidemiológica", "Investigação de surtos", "Estudos de fatores de risco", "Avaliação de programas"],
      nivel: "Avançado"
    },
    {
      titulo: "Big Data em Saúde",
      descricao: "Uso de tecnologias como Hadoop e Spark para processar grandes volumes de dados de saúde e pesquisa científica.",
      aplicacoes: ["Análise de prontuários eletrônicos", "Processamento de dados genômicos", "Vigilância em tempo real", "Machine learning médico"],
      nivel: "Avançado"
    }
  ];

  const tutoriais = [
    {
      id: "metodologia-cientifica",
      titulo: "Metodologia Científica em Data Science",
      tempo: "8 min",
      dificuldade: "Básico",
      passos: [
        "Formule uma hipótese científica testável",
        "Defina variáveis e população de estudo",
        "Escolha o desenho de estudo apropriado",
        "Colete dados seguindo protocolos éticos",
        "Analise dados com métodos estatísticos apropriados",
        "Interprete resultados e tire conclusões válidas"
      ]
    },
    {
      id: "hadoop-bigdata",
      titulo: "Processamento de Big Data com Hadoop",
      tempo: "15 min",
      dificuldade: "Avançado",
      passos: [
        "Configure ambiente Hadoop para dados científicos",
        "Carregue datasets grandes (>1GB) no HDFS",
        "Implemente MapReduce para análise distribuída",
        "Use Hive para queries SQL em big data",
        "Otimize performance para processamento científico"
      ]
    },
    {
      id: "spark-filtering",
      titulo: "Filtragem Avançada com Apache Spark",
      tempo: "12 min",
      dificuldade: "Intermediário",
      passos: [
        "Carregue dados científicos no Spark DataFrame",
        "Aplique filtros complexos (múltiplas condições)",
        "Use window functions para análise temporal",
        "Implemente UDFs para cálculos específicos",
        "Otimize queries com cache e particionamento"
      ]
    },
    {
      id: "analise-epidemiologica",
      titulo: "Análise Epidemiológica com R/Python",
      tempo: "20 min",
      dificuldade: "Avançado",
      passos: [
        "Carregue dados epidemiológicos padronizados",
        "Calcule medidas de frequência (prevalência, incidência)",
        "Analise associações (OR, RR, IC95%)",
        "Teste hipóteses com métodos apropriados",
        "Visualize resultados com gráficos científicos"
      ]
    }
  ];

  const glossario = [
    { termo: "Hipótese Nula", definicao: "Proposição que assume não haver diferença ou associação entre variáveis" },
    { termo: "P-valor", definicao: "Probabilidade de observar resultado igual ou mais extremo, assumindo H0 verdadeira" },
    { termo: "Intervalo de Confiança", definicao: "Faixa de valores que provavelmente contém o parâmetro populacional verdadeiro" },
    { termo: "Odds Ratio", definicao: "Medida de associação que compara odds de exposição entre casos e controles" },
    { termo: "Hadoop HDFS", definicao: "Sistema de arquivos distribuído para armazenar grandes volumes de dados científicos" },
    { termo: "MapReduce", definicao: "Paradigma de processamento paralelo para análise de big data científico" },
    { termo: "Spark DataFrame", definicao: "Estrutura de dados distribuída otimizada para análise de dados estruturados" },
    { termo: "Biostatística", definicao: "Aplicação de métodos estatísticos em problemas biológicos e de saúde" }
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