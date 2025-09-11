import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Tab,
  Tabs,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  LinearProgress,
  Alert
} from '@mui/material';
import {
  Storage as HadoopIcon,
  Speed as SparkIcon,
  Psychology as MLIcon,
  AutoAwesome as DeepLearningIcon,
  Engineering as DataEngIcon,
  CloudUpload as UploadIcon,
  Analytics as AnalyticsIcon,
  School as LearningIcon,
  Code as CodeIcon,
  PlayArrow as RunIcon
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
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const DataScienceProCompleto = () => {
  const [tabValue, setTabValue] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const simulateUpload = () => {
    setUploadProgress(0);
    const timer = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 200);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header */}
      <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #1976d2, #42a5f5)' }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            🚀 DataScience Pro - Plataforma Big Data & Machine Learning
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Estatísticas Principais */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
              <CardContent>
                <HadoopIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6">Hadoop Cluster</Typography>
                <Typography variant="h4">15 Nodes</Typography>
                <Typography variant="body2">Processamento Distribuído</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
              <CardContent>
                <SparkIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6">Apache Spark</Typography>
                <Typography variant="h4">3.5.0</Typography>
                <Typography variant="body2">Análise em Tempo Real</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
              <CardContent>
                <MLIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6">ML Models</Typography>
                <Typography variant="h4">47</Typography>
                <Typography variant="body2">Modelos Treinados</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: 'white' }}>
              <CardContent>
                <DeepLearningIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6">Deep Learning</Typography>
                <Typography variant="h4">12 TB</Typography>
                <Typography variant="body2">Dados Processados</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Navegação por Abas */}
        <Paper sx={{ width: '100%', mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab icon={<HadoopIcon />} label="Hadoop & Big Data" />
            <Tab icon={<SparkIcon />} label="Apache Spark" />
            <Tab icon={<MLIcon />} label="Machine Learning" />
            <Tab icon={<DeepLearningIcon />} label="Deep Learning" />
            <Tab icon={<DataEngIcon />} label="Data Engineering" />
            <Tab icon={<LearningIcon />} label="Aprendizado" />
          </Tabs>

          {/* Hadoop & Big Data */}
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      🐘 Ecossistema Hadoop
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon><HadoopIcon color="primary" /></ListItemIcon>
                        <ListItemText primary="HDFS - Sistema de Arquivos Distribuído" secondary="Armazenamento escalável de petabytes" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><AnalyticsIcon color="primary" /></ListItemIcon>
                        <ListItemText primary="MapReduce - Processamento Paralelo" secondary="Algoritmos distribuídos eficientes" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><DataEngIcon color="primary" /></ListItemIcon>
                        <ListItemText primary="YARN - Gerenciamento de Recursos" secondary="Orquestração de workloads" />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      📊 Ferramentas do Ecossistema
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      <Chip label="Hive" color="primary" />
                      <Chip label="HBase" color="secondary" />
                      <Chip label="Kafka" color="success" />
                      <Chip label="Flume" color="info" />
                      <Chip label="Sqoop" color="warning" />
                      <Chip label="Oozie" color="error" />
                    </Box>
                    <Button variant="contained" startIcon={<UploadIcon />} onClick={simulateUpload}>
                      Upload Big Data
                    </Button>
                    {uploadProgress > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <LinearProgress variant="determinate" value={uploadProgress} />
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          Progresso: {uploadProgress}%
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Apache Spark */}
          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      ⚡ Apache Spark - Processamento Rápido
                    </Typography>
                    <Alert severity="info" sx={{ mb: 2 }}>
                      Spark é 100x mais rápido que Hadoop MapReduce para processamento em memória
                    </Alert>
                    <List>
                      <ListItem>
                        <ListItemText 
                          primary="Spark SQL" 
                          secondary="Processamento de dados estruturados com queries SQL otimizadas" 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Spark Streaming" 
                          secondary="Processamento de dados em tempo real com micro-batches" 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="MLlib" 
                          secondary="Biblioteca de machine learning escalável e distribuída" 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="GraphX" 
                          secondary="Processamento de grafos em larga escala" 
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      🔧 Configuração Atual
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Executors:</strong> 50
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Cores:</strong> 200 total
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Memória:</strong> 500GB
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      <strong>Modo:</strong> Cluster
                    </Typography>
                    <Button variant="outlined" startIcon={<RunIcon />} fullWidth>
                      Executar Job Spark
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Machine Learning */}
          <TabPanel value={tabValue} index={2}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      🤖 Algoritmos de Machine Learning Implementados
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={{ p: 2, textAlign: 'center' }}>
                          <Typography variant="h6" color="primary">Supervisão</Typography>
                          <List dense>
                            <ListItem><ListItemText primary="Random Forest" /></ListItem>
                            <ListItem><ListItemText primary="SVM" /></ListItem>
                            <ListItem><ListItemText primary="Gradient Boosting" /></ListItem>
                            <ListItem><ListItemText primary="Linear/Logistic Regression" /></ListItem>
                          </List>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={{ p: 2, textAlign: 'center' }}>
                          <Typography variant="h6" color="secondary">Não Supervisionado</Typography>
                          <List dense>
                            <ListItem><ListItemText primary="K-Means" /></ListItem>
                            <ListItem><ListItemText primary="DBSCAN" /></ListItem>
                            <ListItem><ListItemText primary="PCA" /></ListItem>
                            <ListItem><ListItemText primary="Autoencoders" /></ListItem>
                          </List>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={{ p: 2, textAlign: 'center' }}>
                          <Typography variant="h6" color="success.main">Reinforcement</Typography>
                          <List dense>
                            <ListItem><ListItemText primary="Q-Learning" /></ListItem>
                            <ListItem><ListItemText primary="Deep Q-Network" /></ListItem>
                            <ListItem><ListItemText primary="Policy Gradient" /></ListItem>
                            <ListItem><ListItemText primary="Actor-Critic" /></ListItem>
                          </List>
                        </Paper>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Deep Learning */}
          <TabPanel value={tabValue} index={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      🧠 Arquiteturas de Deep Learning
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText 
                          primary="Redes Neurais Convolucionais (CNN)" 
                          secondary="Para visão computacional e processamento de imagens" 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Redes Neurais Recorrentes (RNN/LSTM)" 
                          secondary="Para processamento de sequências e séries temporais" 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Transformers & Attention" 
                          secondary="Para processamento de linguagem natural (NLP)" 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="GANs (Generative Adversarial Networks)" 
                          secondary="Para geração de dados sintéticos" 
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      🛠 Frameworks Utilizados
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      <Chip label="TensorFlow" color="primary" />
                      <Chip label="PyTorch" color="secondary" />
                      <Chip label="Keras" color="success" />
                      <Chip label="Hugging Face" color="info" />
                      <Chip label="ONNX" color="warning" />
                    </Box>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      Modelos pré-treinados disponíveis: BERT, GPT, ResNet, EfficientNet
                    </Typography>
                    <Button variant="contained" color="secondary">
                      Treinar Novo Modelo
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Data Engineering */}
          <TabPanel value={tabValue} index={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      🔧 Pipeline de Engenharia de Dados
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2 }}>
                          <Typography variant="h6" color="primary">Ingestão</Typography>
                          <List dense>
                            <ListItem><ListItemText primary="Apache Kafka" secondary="Streaming em tempo real" /></ListItem>
                            <ListItem><ListItemText primary="Apache Flume" secondary="Coleta de logs" /></ListItem>
                            <ListItem><ListItemText primary="Sqoop" secondary="Transferência RDBMS" /></ListItem>
                            <ListItem><ListItemText primary="APIs REST" secondary="Integração de sistemas" /></ListItem>
                          </List>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2 }}>
                          <Typography variant="h6" color="secondary">Processamento</Typography>
                          <List dense>
                            <ListItem><ListItemText primary="Apache Spark" secondary="Processamento distribuído" /></ListItem>
                            <ListItem><ListItemText primary="Apache Flink" secondary="Stream processing" /></ListItem>
                            <ListItem><ListItemText primary="Airflow" secondary="Orquestração de workflows" /></ListItem>
                            <ListItem><ListItemText primary="Pandas/Dask" secondary="Análise exploratória" /></ListItem>
                          </List>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2 }}>
                          <Typography variant="h6" color="success.main">Armazenamento</Typography>
                          <List dense>
                            <ListItem><ListItemText primary="HDFS" secondary="Data Lake distribuído" /></ListItem>
                            <ListItem><ListItemText primary="HBase" secondary="NoSQL em tempo real" /></ListItem>
                            <ListItem><ListItemText primary="ElasticSearch" secondary="Busca e análise" /></ListItem>
                            <ListItem><ListItemText primary="Cassandra" secondary="Base distribuída" /></ListItem>
                          </List>
                        </Paper>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Aprendizado */}
          <TabPanel value={tabValue} index={5}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      📚 Cursos e Recursos de Aprendizado
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon><LearningIcon color="primary" /></ListItemIcon>
                        <ListItemText 
                          primary="Hadoop Fundamentals" 
                          secondary="Aprenda HDFS, MapReduce e YARN do zero" 
                        />
                        <Button variant="outlined" size="small">Iniciar</Button>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><SparkIcon color="primary" /></ListItemIcon>
                        <ListItemText 
                          primary="Apache Spark Avançado" 
                          secondary="Spark SQL, Streaming e MLlib na prática" 
                        />
                        <Button variant="outlined" size="small">Iniciar</Button>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><MLIcon color="primary" /></ListItemIcon>
                        <ListItemText 
                          primary="Machine Learning em Produção" 
                          secondary="MLOps, deployment e monitoramento de modelos" 
                        />
                        <Button variant="outlined" size="small">Iniciar</Button>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><DeepLearningIcon color="primary" /></ListItemIcon>
                        <ListItemText 
                          primary="Deep Learning com TensorFlow" 
                          secondary="CNNs, RNNs e Transformers aplicados" 
                        />
                        <Button variant="outlined" size="small">Iniciar</Button>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><DataEngIcon color="primary" /></ListItemIcon>
                        <ListItemText 
                          primary="Data Engineering Pipeline" 
                          secondary="Construa pipelines robustos de dados" 
                        />
                        <Button variant="outlined" size="small">Iniciar</Button>
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      🏆 Certificações
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemText primary="Cloudera Data Engineer" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="AWS Big Data Specialist" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Google Cloud ML Engineer" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Microsoft Azure Data Scientist" />
                      </ListItem>
                    </List>
                    <Button variant="contained" color="success" fullWidth sx={{ mt: 2 }}>
                      Ver Todas
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>
        </Paper>

        {/* Seção de Upload de Dados */}
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📁 Centro de Upload de Datasets
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Button variant="outlined" fullWidth startIcon={<UploadIcon />}>
                  CSV/Excel
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button variant="outlined" fullWidth startIcon={<UploadIcon />}>
                  JSON/XML
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button variant="outlined" fullWidth startIcon={<UploadIcon />}>
                  Parquet/Avro
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button variant="outlined" fullWidth startIcon={<UploadIcon />}>
                  Conectar BD
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default DataScienceProCompleto;
