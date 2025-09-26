import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  LinearProgress,
  Chip,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@mui/material';
import {
  Storage,
  CloudQueue,
  DataObject,
  Terminal,
  PlayArrow,
  ExpandMore,
  School,
  Code,
  Assessment,
  Speed,
  Security,
  Memory,
} from '@mui/icons-material';

const HadoopHDFS: React.FC = () => {
  const [etapaAtiva, setEtapaAtiva] = useState(0);
  const [comandoExecutando, setComandoExecutando] = useState<string | null>(null);

  const etapasHadoop = [
    {
      titulo: "Introdução ao Hadoop Ecosystem",
      conteudo: "Entenda os componentes fundamentais do Apache Hadoop para processamento de Big Data",
      comandos: [
        "hadoop version",
        "hdfs version"
      ]
    },
    {
      titulo: "HDFS - Sistema de Arquivos Distribuído",
      conteudo: "Aprenda como o HDFS armazena e gerencia grandes volumes de dados em clusters",
      comandos: [
        "hdfs dfs -ls /",
        "hdfs dfs -mkdir /user/dados",
        "hdfs dfs -put dataset.csv /user/dados/"
      ]
    },
    {
      titulo: "MapReduce - Processamento Distribuído",
      conteudo: "Implementação de algoritmos MapReduce para análise científica de dados",
      comandos: [
        "hadoop jar hadoop-mapreduce-examples.jar wordcount input output",
        "hdfs dfs -cat /output/part-r-00000"
      ]
    },
    {
      titulo: "YARN - Gerenciamento de Recursos",
      conteudo: "Configuração e otimização de recursos para processamento científico",
      comandos: [
        "yarn application -list",
        "yarn node -list"
      ]
    }
  ];

  const conceitos = [
    {
      titulo: "HDFS - Hadoop Distributed File System",
      descricao: "Sistema de arquivos distribuído projetado para armazenar grandes volumes de dados em clusters de commodity hardware",
      aplicacoes: [
        "Armazenamento de datasets científicos massivos",
        "Backup distribuído de dados de pesquisa",
        "Repositórios de dados genômicos",
        "Arquivos de sensores IoT para pesquisa ambiental"
      ],
      caracteristicas: [
        "Tolerância a falhas automática",
        "Replicação de dados configurável", 
        "Acesso de alta throughput",
        "Escalabilidade horizontal"
      ]
    },
    {
      titulo: "MapReduce",
      descricao: "Modelo de programação para processamento distribuído de grandes datasets através de operações Map e Reduce",
      aplicacoes: [
        "Análise de logs científicos",
        "Processamento de sequências genômicas",
        "Análise de dados climáticos",
        "Mineração de dados educacionais"
      ],
      caracteristicas: [
        "Processamento paralelo automático",
        "Tolerância a falhas integrada",
        "Balanceamento de carga dinâmico",
        "Otimização de localidade de dados"
      ]
    },
    {
      titulo: "YARN - Yet Another Resource Negotiator",
      descricao: "Sistema de gerenciamento de recursos que permite múltiplas aplicações compartilharem um cluster Hadoop",
      aplicacoes: [
        "Execução simultânea de múltiplas análises",
        "Compartilhamento de recursos entre pesquisadores",
        "Scheduling de jobs científicos",
        "Isolamento de recursos por projeto"
      ],
      caracteristicas: [
        "Gerenciamento dinâmico de recursos",
        "Múltiplos frameworks suportados",
        "Queues de prioridade",
        "Monitoramento em tempo real"
      ]
    }
  ];

  const exemplosPraticos = [
    {
      titulo: "Análise de Dados Meteorológicos",
      problema: "Processar 10TB de dados climáticos de estações meteorológicas de SC",
      solucao: "Usar HDFS para armazenamento distribuído e MapReduce para calcular médias mensais por região",
      codigo: `// Mapper para dados meteorológicos
public void map(LongWritable key, Text value, Context context) {
    String[] campos = value.toString().split(",");
    String regiao = campos[0];
    double temperatura = Double.parseDouble(campos[2]);
    context.write(new Text(regiao), new DoubleWritable(temperatura));
}

// Reducer para calcular médias
public void reduce(Text key, Iterable<DoubleWritable> values, Context context) {
    double soma = 0;
    int contador = 0;
    for (DoubleWritable temp : values) {
        soma += temp.get();
        contador++;
    }
    double media = soma / contador;
    context.write(key, new DoubleWritable(media));
}`
    },
    {
      titulo: "Processamento de Logs de Pesquisa Científica",
      problema: "Analisar padrões de acesso em repositórios científicos com milhões de registros",
      solucao: "Pipeline Hadoop para extrair estatísticas de acesso e identificar tendências de pesquisa",
      codigo: `# Comandos HDFS para carregar logs
hdfs dfs -mkdir /logs/cientificos
hdfs dfs -put *.log /logs/cientificos/

# Executar MapReduce para análise de padrões
hadoop jar analise-logs.jar LogAnalyzer /logs/cientificos /output/padroes

# Visualizar resultados
hdfs dfs -cat /output/padroes/part-r-00000 | head -20`
    }
  ];

  const executarComando = async (comando: string) => {
    setComandoExecutando(comando);
    // Simular execução de comando
    await new Promise(resolve => setTimeout(resolve, 2000));
    setComandoExecutando(null);
  };

  const proximaEtapa = () => {
    if (etapaAtiva < etapasHadoop.length - 1) {
      setEtapaAtiva(etapaAtiva + 1);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        <Storage sx={{ fontSize: 40, mr: 2, verticalAlign: 'middle' }} />
        🐘 Apache Hadoop & HDFS
      </Typography>

      <Alert severity="info" sx={{ mb: 4 }}>
        <Typography variant="body1">
          <strong>Foco Científico:</strong> Este módulo ensina como usar Hadoop para processamento de 
          grandes volumes de dados científicos, incluindo dados de pesquisa, sensores ambientais, 
          genômicos e estudos longitudinais.
        </Typography>
      </Alert>

      {/* Tutorial Passo-a-Passo */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            <School sx={{ mr: 1, verticalAlign: 'middle' }} />
            Tutorial Prático - Configuração e Uso
          </Typography>

          <Stepper activeStep={etapaAtiva} orientation="vertical">
            {etapasHadoop.map((etapa, index) => (
              <Step key={index}>
                <StepLabel>
                  <Typography variant="h6">{etapa.titulo}</Typography>
                </StepLabel>
                <StepContent>
                  <Typography paragraph>{etapa.conteudo}</Typography>
                  
                  <Paper sx={{ p: 2, bgcolor: 'grey.100', mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      <Terminal sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Comandos para praticar:
                    </Typography>
                    {etapa.comandos.map((comando, cmdIndex) => (
                      <Box key={cmdIndex} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <code style={{ 
                          backgroundColor: '#1e1e1e', 
                          color: '#d4d4d4', 
                          padding: '8px 12px', 
                          borderRadius: '4px',
                          fontFamily: 'Consolas, Monaco, monospace',
                          flexGrow: 1,
                          marginRight: '8px'
                        }}>
                          $ {comando}
                        </code>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={comandoExecutando === comando ? <Speed /> : <PlayArrow />}
                          onClick={() => executarComando(comando)}
                          disabled={comandoExecutando !== null}
                        >
                          {comandoExecutando === comando ? 'Executando...' : 'Executar'}
                        </Button>
                      </Box>
                    ))}
                    
                    {comandoExecutando && (
                      <Box sx={{ mt: 2 }}>
                        <LinearProgress />
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          Executando: {comandoExecutando}
                        </Typography>
                      </Box>
                    )}
                  </Paper>

                  <Box sx={{ mb: 1 }}>
                    <Button
                      variant="contained"
                      onClick={proximaEtapa}
                      sx={{ mt: 1, mr: 1 }}
                      disabled={index === etapasHadoop.length - 1}
                    >
                      {index === etapasHadoop.length - 1 ? 'Concluído' : 'Próxima Etapa'}
                    </Button>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      {/* Conceitos Fundamentais */}
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        📚 Conceitos Fundamentais
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {conceitos.map((conceito, index) => (
          <Grid item xs={12} key={index}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <DataObject sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography variant="h6">{conceito.titulo}</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography paragraph>{conceito.descricao}</Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      <Assessment sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Aplicações Científicas:
                    </Typography>
                    <List dense>
                      {conceito.aplicacoes.map((app, appIndex) => (
                        <ListItem key={appIndex} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <Chip label={appIndex + 1} size="small" color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={app} />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      <Speed sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Características Técnicas:
                    </Typography>
                    <List dense>
                      {conceito.caracteristicas.map((car, carIndex) => (
                        <ListItem key={carIndex} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <Security fontSize="small" color="success" />
                          </ListItemIcon>
                          <ListItemText primary={car} />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>

      {/* Exemplos Práticos Científicos */}
      <Typography variant="h4" gutterBottom>
        🔬 Casos de Uso Científicos
      </Typography>

      <Grid container spacing={3}>
        {exemplosPraticos.map((exemplo, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  {exemplo.titulo}
                </Typography>
                
                <Typography variant="subtitle2" gutterBottom>
                  <strong>Problema:</strong>
                </Typography>
                <Typography paragraph>{exemplo.problema}</Typography>
                
                <Typography variant="subtitle2" gutterBottom>
                  <strong>Solução com Hadoop:</strong>
                </Typography>
                <Typography paragraph>{exemplo.solucao}</Typography>
                
                <Typography variant="subtitle2" gutterBottom>
                  <Code sx={{ mr: 1, verticalAlign: 'middle' }} />
                  <strong>Código de Exemplo:</strong>
                </Typography>
                <Paper sx={{ p: 2, bgcolor: '#1e1e1e', color: '#d4d4d4', overflow: 'auto' }}>
                  <pre style={{ margin: 0, fontFamily: 'Consolas, Monaco, monospace', fontSize: '14px' }}>
                    {exemplo.codigo}
                  </pre>
                </Paper>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recursos Adicionais */}
      <Alert severity="success" sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          🎯 Próximos Passos para Pesquisadores
        </Typography>
        <List dense>
          <ListItem>
            <ListItemIcon><Memory /></ListItemIcon>
            <ListItemText primary="Configure um cluster Hadoop para sua pesquisa" />
          </ListItem>
          <ListItem>
            <ListItemIcon><Assessment /></ListItemIcon>
            <ListItemText primary="Implemente pipelines de dados para seus datasets científicos" />
          </ListItem>
          <ListItem>
            <ListItemIcon><CloudQueue /></ListItemIcon>
            <ListItemText primary="Integre com Apache Spark para análises mais rápidas" />
          </ListItem>
          <ListItem>
            <ListItemIcon><Security /></ListItemIcon>
            <ListItemText primary="Configure políticas de segurança para dados sensíveis" />
          </ListItem>
        </List>
      </Alert>
    </Container>
  );
};

export default HadoopHDFS;