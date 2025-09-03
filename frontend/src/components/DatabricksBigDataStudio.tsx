import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Grid,
  TextField,
  Alert,
  Chip,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  FormControlLabel,
  Divider,
  CircularProgress,
} from '@mui/material';
import {
  Cloud,
  Storage,
  Speed,
  Analytics,
  Code,
  PlayArrow,
  Stop,
  CheckCircle,
  Warning,
  Info,
  DataObject,
  Timeline,
  Memory,
  CloudUpload,
  Download,
  Refresh,
  Settings,
  Security,
  MonitorHeart,
  ExpandMore,
} from '@mui/icons-material';

const DatabricksBigDataStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [clusterStatus, setClusterStatus] = useState('stopped');
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    dataSource: '',
    processingType: 'batch',
  });

  // Estados para simulação de dados BigData
  const [bigDataMetrics, setBigDataMetrics] = useState({
    totalRecords: 0,
    processedRecords: 0,
    errorRecords: 0,
    processingSpeed: 0,
    memoryUsage: 0,
    cpuUsage: 0,
  });

  // Simulação de progresso
  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setBigDataMetrics(prev => ({
          ...prev,
          processedRecords: Math.min(prev.processedRecords + Math.random() * 1000, prev.totalRecords),
          processingSpeed: 800 + Math.random() * 400,
          memoryUsage: 60 + Math.random() * 20,
          cpuUsage: 70 + Math.random() * 25,
        }));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  const databricksSteps = [
    {
      label: '🚀 Configuração do Workspace',
      description: 'Configure seu ambiente Databricks',
      content: (
        <Box>
          <Typography variant="h6" gutterBottom color="primary">
            1. Configuração Inicial do Databricks
          </Typography>
          
          <Alert severity="info" sx={{ mb: 2 }}>
            <strong>Pré-requisitos:</strong> Conta Azure/AWS, conhecimento básico de Spark
          </Alert>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    🌐 Configuração do Workspace
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                      <ListItemText primary="Criar workspace no Azure/AWS" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                      <ListItemText primary="Configurar rede e segurança" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                      <ListItemText primary="Definir políticas de acesso" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    ⚙️ Código de Configuração
                  </Typography>
                  <Paper sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                    <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
{`# Configuração inicial
spark.conf.set("spark.sql.adaptive.enabled", "true")
spark.conf.set("spark.sql.adaptive.coalescePartitions.enabled", "true")
spark.conf.set("spark.serializer", "org.apache.spark.serializer.KryoSerializer")`}
                    </Typography>
                  </Paper>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <TextField
            fullWidth
            label="Nome do Projeto BigData"
            value={projectData.name}
            onChange={(e) => setProjectData({...projectData, name: e.target.value})}
            sx={{ mt: 2 }}
          />
        </Box>
      )
    },
    {
      label: '💾 Configuração de Cluster',
      description: 'Configure clusters para processamento BigData',
      content: (
        <Box>
          <Typography variant="h6" gutterBottom color="primary">
            2. Configuração de Cluster Databricks
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    🖥️ Configurações do Cluster
                  </Typography>
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={clusterStatus === 'running'}
                        onChange={(e) => setClusterStatus(e.target.checked ? 'running' : 'stopped')}
                      />
                    }
                    label={`Cluster ${clusterStatus === 'running' ? 'Ativo' : 'Parado'}`}
                  />

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" gutterBottom>Tipo de Cluster:</Typography>
                    <Chip label="Standard_DS3_v2" color="primary" size="small" />
                    <Chip label="4 núcleos, 14GB RAM" color="secondary" size="small" sx={{ ml: 1 }} />
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" gutterBottom>Workers:</Typography>
                    <Chip label="Auto Scaling: 2-8 nodes" color="success" size="small" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={8}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    📊 Monitoramento do Cluster
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Memory sx={{ mr: 1 }} />
                        <Typography variant="body2">Uso de Memória</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={bigDataMetrics.memoryUsage} 
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                      <Typography variant="caption">{bigDataMetrics.memoryUsage.toFixed(1)}%</Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Speed sx={{ mr: 1 }} />
                        <Typography variant="body2">Uso de CPU</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={bigDataMetrics.cpuUsage} 
                        color="secondary"
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                      <Typography variant="caption">{bigDataMetrics.cpuUsage.toFixed(1)}%</Typography>
                    </Grid>
                  </Grid>

                  <Paper sx={{ p: 2, mt: 2, bgcolor: '#f5f5f5' }}>
                    <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
{`# Configuração otimizada do cluster
cluster_config = {
    "spark_version": "11.3.x-scala2.12",
    "node_type_id": "Standard_DS3_v2",
    "autoscale": {
        "min_workers": 2,
        "max_workers": 8
    },
    "spark_conf": {
        "spark.sql.adaptive.enabled": "true",
        "spark.sql.adaptive.coalescePartitions.enabled": "true"
    }
}`}
                    </Typography>
                  </Paper>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )
    },
    {
      label: '📊 Ingestão de Dados',
      description: 'Configure fontes de dados BigData',
      content: (
        <Box>
          <Typography variant="h6" gutterBottom color="primary">
            3. Ingestão de Dados BigData
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    🔗 Fontes de Dados Suportadas
                  </Typography>
                  
                  <List dense>
                    <ListItem>
                      <ListItemIcon><Storage color="primary" /></ListItemIcon>
                      <ListItemText 
                        primary="Azure Data Lake Storage" 
                        secondary="Para dados estruturados e não estruturados"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Cloud color="info" /></ListItemIcon>
                      <ListItemText 
                        primary="Amazon S3" 
                        secondary="Armazenamento escalável na nuvem"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><DataObject color="secondary" /></ListItemIcon>
                      <ListItemText 
                        primary="Apache Kafka" 
                        secondary="Streaming de dados em tempo real"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Analytics color="success" /></ListItemIcon>
                      <ListItemText 
                        primary="APIs REST" 
                        secondary="Integração com sistemas externos"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    💻 Código de Ingestão
                  </Typography>
                  
                  <Paper sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                    <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
{`# Leitura de dados do Data Lake
df = spark.read \\
    .option("header", "true") \\
    .option("inferSchema", "true") \\
    .csv("abfss://container@storage.dfs.core.windows.net/data/")

# Streaming do Kafka
streaming_df = spark \\
    .readStream \\
    .format("kafka") \\
    .option("kafka.bootstrap.servers", "localhost:9092") \\
    .option("subscribe", "big_data_topic") \\
    .load()

# Transformações distribuídas
processed_df = df \\
    .filter(col("amount") > 1000) \\
    .groupBy("category") \\
    .agg(sum("amount").alias("total_amount"))`}
                    </Typography>
                  </Paper>

                  <Button 
                    variant="contained" 
                    startIcon={<PlayArrow />}
                    onClick={() => {
                      setIsProcessing(true);
                      setBigDataMetrics({
                        ...bigDataMetrics,
                        totalRecords: 1000000,
                        processedRecords: 0
                      });
                    }}
                    disabled={isProcessing || clusterStatus !== 'running'}
                    sx={{ mt: 2 }}
                  >
                    Executar Ingestão
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {isProcessing && (
            <Card elevation={2} sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  📈 Progresso da Ingestão
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    Processando {bigDataMetrics.processedRecords.toLocaleString()} de {bigDataMetrics.totalRecords.toLocaleString()} registros
                  </Typography>
                </Box>

                <LinearProgress 
                  variant="determinate" 
                  value={(bigDataMetrics.processedRecords / bigDataMetrics.totalRecords) * 100}
                  sx={{ height: 8, borderRadius: 4 }}
                />

                <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                  Velocidade: {bigDataMetrics.processingSpeed.toFixed(0)} registros/segundo
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>
      )
    },
    {
      label: '⚡ Processamento Spark',
      description: 'Execute transformações distribuídas',
      content: (
        <Box>
          <Typography variant="h6" gutterBottom color="primary">
            4. Processamento com Apache Spark
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    🔥 Operações Spark Avançadas
                  </Typography>

                  <Accordion defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="subtitle1">📊 Análise Exploratória</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Paper sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                        <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
{`# Análise exploratória distribuída
from pyspark.sql.functions import *
from pyspark.sql.types import *

# Estatísticas descritivas
df.describe().show()

# Análise de valores únicos
df.select("category").distinct().count()

# Detecção de outliers usando Spark SQL
outliers = spark.sql("""
    SELECT *
    FROM dados
    WHERE amount > (
        SELECT percentile_approx(amount, 0.95) 
        FROM dados
    )
""")

# Agregações complexas
summary = df.groupBy("category", "region") \\
    .agg(
        count("*").alias("total_transactions"),
        sum("amount").alias("total_amount"),
        avg("amount").alias("avg_amount"),
        stddev("amount").alias("stddev_amount")
    ) \\
    .orderBy(desc("total_amount"))`}
                        </Typography>
                      </Paper>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="subtitle1">🤖 Machine Learning</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Paper sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                        <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
{`# Machine Learning com MLlib
from pyspark.ml.feature import VectorAssembler, StandardScaler
from pyspark.ml.clustering import KMeans
from pyspark.ml.classification import RandomForestClassifier
from pyspark.ml.evaluation import MulticlassClassificationEvaluator

# Preparação dos dados
assembler = VectorAssembler(
    inputCols=["feature1", "feature2", "feature3"],
    outputCol="features"
)

scaler = StandardScaler(
    inputCol="features",
    outputCol="scaledFeatures"
)

# Clustering K-Means distribuído
kmeans = KMeans(
    featuresCol="scaledFeatures",
    k=5,
    predictionCol="cluster"
)

# Pipeline de ML
from pyspark.ml import Pipeline

pipeline = Pipeline(stages=[assembler, scaler, kmeans])
model = pipeline.fit(df)
predictions = model.transform(df)`}
                        </Typography>
                      </Paper>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="subtitle1">⚡ Otimizações Avançadas</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Paper sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                        <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
{`# Otimizações de performance
# 1. Particionamento inteligente
df_partitioned = df.repartition(200, "date_column")

# 2. Cache para datasets reutilizados
df.cache()
df.count()  # Materializa o cache

# 3. Broadcast de tabelas pequenas
from pyspark.sql.functions import broadcast
result = large_df.join(broadcast(small_df), "key")

# 4. Configurações avançadas do Spark
spark.conf.set("spark.sql.adaptive.enabled", "true")
spark.conf.set("spark.sql.adaptive.coalescePartitions.enabled", "true")
spark.conf.set("spark.sql.adaptive.skewJoin.enabled", "true")

# 5. Otimização de joins
df1.hint("broadcast").join(df2, "key")

# 6. Persitência estratégica
df.persist(StorageLevel.MEMORY_AND_DISK_SER)`}
                        </Typography>
                      </Paper>
                    </AccordionDetails>
                  </Accordion>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )
    },
    {
      label: '📈 Visualização e MLOps',
      description: 'Deploy e monitoramento de modelos',
      content: (
        <Box>
          <Typography variant="h6" gutterBottom color="primary">
            5. MLOps e Deployment
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    🚀 MLflow Integration
                  </Typography>
                  
                  <Paper sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                    <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
{`import mlflow
import mlflow.spark

# Configuração do MLflow
mlflow.set_experiment("/Shared/BigData_Experiment")

with mlflow.start_run():
    # Treinar modelo
    model = pipeline.fit(train_data)
    
    # Log parâmetros
    mlflow.log_param("k_clusters", 5)
    mlflow.log_param("data_size", df.count())
    
    # Log métricas
    mlflow.log_metric("silhouette_score", 0.85)
    
    # Log modelo
    mlflow.spark.log_model(
        model, 
        "kmeans_model",
        registered_model_name="BigDataKMeans"
    )

# Deploy do modelo
model_uri = "models:/BigDataKMeans/Production"
loaded_model = mlflow.spark.load_model(model_uri)`}
                    </Typography>
                  </Paper>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    📊 Monitoramento de Performance
                  </Typography>
                  
                  <TableContainer component={Paper} elevation={0}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Métrica</TableCell>
                          <TableCell align="right">Valor</TableCell>
                          <TableCell align="right">Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>Throughput</TableCell>
                          <TableCell align="right">{bigDataMetrics.processingSpeed.toFixed(0)} rec/s</TableCell>
                          <TableCell align="right">
                            <Chip label="Ótimo" color="success" size="small" />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Latência</TableCell>
                          <TableCell align="right">250ms</TableCell>
                          <TableCell align="right">
                            <Chip label="Bom" color="primary" size="small" />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Acurácia</TableCell>
                          <TableCell align="right">94.5%</TableCell>
                          <TableCell align="right">
                            <Chip label="Excelente" color="success" size="small" />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Drift Detectado</TableCell>
                          <TableCell align="right">Não</TableCell>
                          <TableCell align="right">
                            <Chip label="OK" color="success" size="small" />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      🔄 Auto-retraining configurado para executar semanalmente
                    </Typography>
                    <LinearProgress variant="determinate" value={75} sx={{ height: 6 }} />
                    <Typography variant="caption">Próximo treino em 2 dias</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    🏗️ Arquitetura Completa do Projeto
                  </Typography>
                  
                  <Paper sx={{ p: 3, bgcolor: '#f8f9fa' }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} md={2}>
                        <Box textAlign="center">
                          <CloudUpload fontSize="large" color="primary" />
                          <Typography variant="caption" display="block">Ingestão</Typography>
                          <Typography variant="body2">Data Lake</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <Box textAlign="center">
                          <Storage fontSize="large" color="secondary" />
                          <Typography variant="caption" display="block">Processamento</Typography>
                          <Typography variant="body2">Spark Cluster</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <Box textAlign="center">
                          <Analytics fontSize="large" color="success" />
                          <Typography variant="caption" display="block">ML/AI</Typography>
                          <Typography variant="body2">MLflow</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <Box textAlign="center">
                          <MonitorHeart fontSize="large" color="info" />
                          <Typography variant="caption" display="block">Monitoramento</Typography>
                          <Typography variant="body2">Dashboards</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <Box textAlign="center">
                          <Security fontSize="large" color="warning" />
                          <Typography variant="caption" display="block">Governança</Typography>
                          <Typography variant="body2">Unity Catalog</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <Box textAlign="center">
                          <Timeline fontSize="large" color="primary" />
                          <Typography variant="caption" display="block">Deploy</Typography>
                          <Typography variant="body2">Production</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )
    }
  ];

  const TabPanel = ({ children, value, index }: any) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      {/* Header */}
      <Card elevation={3} sx={{ mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
            🏗️ Databricks BigData Studio
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)' }}>
            Plataforma Completa para Projetos BigData com Apache Spark
          </Typography>
          
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item>
              <Chip 
                icon={<Cloud />} 
                label="Azure Databricks" 
                variant="outlined" 
                sx={{ color: 'white', borderColor: 'white' }}
              />
            </Grid>
            <Grid item>
              <Chip 
                icon={<Analytics />} 
                label="Apache Spark 3.4+" 
                variant="outlined" 
                sx={{ color: 'white', borderColor: 'white' }}
              />
            </Grid>
            <Grid item>
              <Chip 
                icon={<Code />} 
                label="MLflow Integration" 
                variant="outlined" 
                sx={{ color: 'white', borderColor: 'white' }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Tabs Navigation */}
      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="🚀 Tutorial Passo a Passo" />
          <Tab label="📊 Dashboard de Monitoramento" />
          <Tab label="💻 Notebook Interativo" />
          <Tab label="🔧 Configurações Avançadas" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      <TabPanel value={activeTab} index={0}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {databricksSteps.map((step, index) => (
            <Step key={index}>
              <StepLabel
                onClick={() => setActiveStep(index)}
                sx={{ cursor: 'pointer' }}
              >
                <Typography variant="h6">{step.label}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {step.description}
                </Typography>
              </StepLabel>
              <StepContent>
                {step.content}
                <Box sx={{ mb: 2, mt: 2 }}>
                  <Button
                    variant="contained"
                    onClick={() => setActiveStep(activeStep + 1)}
                    sx={{ mr: 1 }}
                    disabled={activeStep >= databricksSteps.length - 1}
                  >
                    {activeStep === databricksSteps.length - 1 ? 'Finalizar' : 'Próximo'}
                  </Button>
                  <Button
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Anterior
                  </Button>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </TabPanel>

      <TabPanel value={activeTab} index={1}>
        <Typography variant="h5" gutterBottom>📊 Dashboard de Monitoramento BigData</Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Total de Registros</Typography>
                <Typography variant="h4" color="primary">
                  {bigDataMetrics.totalRecords.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Processados</Typography>
                <Typography variant="h4" color="success.main">
                  {bigDataMetrics.processedRecords.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Velocidade</Typography>
                <Typography variant="h4" color="info.main">
                  {bigDataMetrics.processingSpeed.toFixed(0)} rec/s
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Status do Cluster</Typography>
                <Chip 
                  label={clusterStatus} 
                  color={clusterStatus === 'running' ? 'success' : 'default'}
                  icon={clusterStatus === 'running' ? <CheckCircle /> : <Stop />}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={activeTab} index={2}>
        <Typography variant="h5" gutterBottom>💻 Notebook Interativo Databricks</Typography>
        
        <Card elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Ambiente de Desenvolvimento</Typography>
            <Alert severity="info" sx={{ mb: 2 }}>
              Esta é uma simulação do ambiente Databricks. Para usar o ambiente real, acesse: 
              <strong> https://databricks.com</strong>
            </Alert>
            
            <Paper sx={{ p: 2, bgcolor: '#f5f5f5', minHeight: 400 }}>
              <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
{`# Databricks BigData Project - Notebook Completo
# ================================================

# 1. Importações necessárias
from pyspark.sql import SparkSession
from pyspark.sql.functions import *
from pyspark.sql.types import *
import mlflow
import mlflow.spark

# 2. Configuração do Spark
spark = SparkSession.builder \\
    .appName("BigDataProject") \\
    .config("spark.sql.adaptive.enabled", "true") \\
    .getOrCreate()

# 3. Leitura de dados BigData
df = spark.read \\
    .option("header", "true") \\
    .option("inferSchema", "true") \\
    .parquet("abfss://container@storage.dfs.core.windows.net/bigdata/")

print(f"Total de registros: {df.count():,}")

# 4. Análise exploratória
df.printSchema()
df.describe().show()

# 5. Transformações distribuídas
processed_df = df \\
    .filter(col("value") > 0) \\
    .withColumn("value_category", 
                when(col("value") < 100, "low")
                .when(col("value") < 1000, "medium")
                .otherwise("high")) \\
    .groupBy("category", "value_category") \\
    .agg(
        count("*").alias("count"),
        sum("value").alias("total_value"),
        avg("value").alias("avg_value")
    )

# 6. Machine Learning
from pyspark.ml.feature import VectorAssembler
from pyspark.ml.clustering import KMeans

assembler = VectorAssembler(
    inputCols=["feature1", "feature2", "feature3"],
    outputCol="features"
)

kmeans = KMeans(k=5, featuresCol="features")
model = kmeans.fit(assembled_df)

# 7. Salvamento otimizado
processed_df \\
    .coalesce(10) \\
    .write \\
    .mode("overwrite") \\
    .partitionBy("date") \\
    .parquet("abfss://container@storage.dfs.core.windows.net/processed/")

print("✅ Processamento BigData concluído com sucesso!")`}
              </Typography>
            </Paper>
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value={activeTab} index={3}>
        <Typography variant="h5" gutterBottom>🔧 Configurações Avançadas</Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom>⚙️ Configurações do Spark</Typography>
                
                <Paper sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                  <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
{`# spark.conf
spark.sql.adaptive.enabled=true
spark.sql.adaptive.coalescePartitions.enabled=true
spark.sql.adaptive.skewJoin.enabled=true
spark.serializer=org.apache.spark.serializer.KryoSerializer
spark.sql.adaptive.advisoryPartitionSizeInBytes=128MB
spark.sql.adaptive.maxShuffledHashJoinLocalMapThreshold=1GB`}
                  </Typography>
                </Paper>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom>🔐 Configurações de Segurança</Typography>
                
                <List dense>
                  <ListItem>
                    <ListItemIcon><Security color="primary" /></ListItemIcon>
                    <ListItemText 
                      primary="Unity Catalog"
                      secondary="Governança de dados unificada"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Security color="secondary" /></ListItemIcon>
                    <ListItemText 
                      primary="RBAC (Role-Based Access)"
                      secondary="Controle de acesso baseado em funções"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Security color="success" /></ListItemIcon>
                    <ListItemText 
                      primary="Data Lineage"
                      secondary="Rastreamento de origem dos dados"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Action Buttons */}
      <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<PlayArrow />}
          onClick={() => {
            setIsProcessing(!isProcessing);
            if (!isProcessing) {
              setBigDataMetrics({
                ...bigDataMetrics,
                totalRecords: 5000000,
                processedRecords: 0
              });
            }
          }}
          disabled={clusterStatus !== 'running'}
        >
          {isProcessing ? 'Parar Processamento' : 'Iniciar BigData Pipeline'}
        </Button>

        <Button
          variant="outlined"
          size="large"
          startIcon={<Download />}
          onClick={() => {
            const code = 'from pyspark.sql import SparkSession\nspark = SparkSession.builder.appName("DataScience").getOrCreate()\nprint("Template por Professor Vagner Cordeiro")';
            const blob = new Blob([code], {type: 'text/plain'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'databricks_template.py';
            a.click();
            URL.revokeObjectURL(url);
          }}
        >
          Download Template Python
        </Button>

        <Button
          variant="outlined"
          size="large"
          startIcon={<Refresh />}
          onClick={() => {
            setBigDataMetrics({
              totalRecords: 0,
              processedRecords: 0,
              errorRecords: 0,
              processingSpeed: 0,
              memoryUsage: 0,
              cpuUsage: 0,
            });
            setActiveStep(0);
          }}
        >
          Reset Tutorial
        </Button>
      </Box>
    </Box>
  );
};

export default DatabricksBigDataStudio;
