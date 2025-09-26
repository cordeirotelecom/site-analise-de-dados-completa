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
  Tab,
  Tabs,
} from '@mui/material';
import {
  FlashOn,
  Memory,
  Speed,
  Analytics,
  Terminal,
  PlayArrow,
  ExpandMore,
  School,
  Code,
  DataUsage,
  FilterList,
  Transform,
  GroupWork,
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
      id={`spark-tabpanel-${index}`}
      aria-labelledby={`spark-tab-${index}`}
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

const ApacheSpark: React.FC = () => {
  const [tabAtiva, setTabAtiva] = useState(0);
  const [etapaAtiva, setEtapaAtiva] = useState(0);
  const [comandoExecutando, setComandoExecutando] = useState<string | null>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabAtiva(newValue);
  };

  const etapasSpark = [
    {
      titulo: "Configuração do Ambiente Spark",
      conteudo: "Instalação e configuração do Apache Spark para análise científica",
      comandos: [
        "spark-shell --version",
        "pyspark --version",
        "spark-submit --help"
      ]
    },
    {
      titulo: "RDDs - Resilient Distributed Datasets",
      conteudo: "Estrutura de dados fundamental do Spark para processamento distribuído",
      comandos: [
        "val rdd = sc.textFile('dataset_cientifico.csv')",
        "rdd.count()",
        "rdd.first()"
      ]
    },
    {
      titulo: "DataFrames e SQL",
      conteudo: "API de alto nível para análise estruturada de dados científicos",
      comandos: [
        "val df = spark.read.csv('dados_pesquisa.csv')",
        "df.show()",
        "df.createOrReplaceTempView('pesquisa')"
      ]
    },
    {
      titulo: "MLlib - Machine Learning",
      conteudo: "Biblioteca de machine learning escalável para análise científica",
      comandos: [
        "from pyspark.ml.classification import LogisticRegression",
        "from pyspark.ml.feature import VectorAssembler",
        "model.fit(training_data)"
      ]
    }
  ];

  const exemplosFiltragem = [
    {
      titulo: "Filtragem de Dados Climáticos",
      problema: "Filtrar dados de temperatura acima de 30°C em estações de SC",
      codigo: `# PySpark - Filtragem de dados climáticos
from pyspark.sql import SparkSession
from pyspark.sql.functions import col

spark = SparkSession.builder.appName("ClimaSC").getOrCreate()

# Carregar dados
df_clima = spark.read.csv("dados_clima_sc.csv", header=True, inferSchema=True)

# Filtrar temperaturas altas
temp_alta = df_clima.filter(col("temperatura") > 30.0)

# Agrupar por cidade
resultado = temp_alta.groupBy("cidade").count().orderBy("count", ascending=False)

resultado.show()`,
      explicacao: "Este código demonstra como usar Spark para filtrar grandes volumes de dados climáticos e identificar padrões regionais de temperatura em Santa Catarina."
    },
    {
      titulo: "Processamento de Dados Genômicos",
      problema: "Filtrar sequências genômicas por qualidade e comprimento",
      codigo: `# Scala - Filtragem de dados genômicos
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._

val spark = SparkSession.builder().appName("Genomics").getOrCreate()
import spark.implicits._

// Carregar dados genômicos
val sequencias = spark.read.parquet("sequencias_genomicas.parquet")

// Filtrar por qualidade e comprimento
val sequencias_filtradas = sequencias
  .filter($"qualidade" > 20)
  .filter(length($"sequencia") > 100)
  .filter($"gc_content" > 0.4 && $"gc_content" < 0.6)

// Estatísticas
sequencias_filtradas.describe("qualidade", "gc_content").show()`,
      explicacao: "Exemplo de como usar Spark para processar dados genômicos, aplicando filtros de qualidade essenciais para análise científica."
    },
    {
      titulo: "Análise de Dados Educacionais",
      problema: "Filtrar e analisar dados de desempenho escolar por região",
      codigo: `# PySpark - Análise educacional
from pyspark.sql import SparkSession
from pyspark.sql.functions import *

spark = SparkSession.builder.appName("EducacaoSC").getOrCreate()

# Carregar dados educacionais
df_educacao = spark.read.json("dados_educacao_sc.json")

# Filtrar por critérios de qualidade
escolas_qualidade = df_educacao.filter(
    (col("nota_enem") > 500) & 
    (col("taxa_aprovacao") > 0.8) &
    (col("infraestrutura_score") > 7)
)

# Análise por região
analise_regional = escolas_qualidade.groupBy("regiao") \\
    .agg(
        avg("nota_enem").alias("media_enem"),
        avg("taxa_aprovacao").alias("media_aprovacao"),
        count("*").alias("total_escolas")
    )

analise_regional.orderBy("media_enem", ascending=False).show()`,
      explicacao: "Demonstra como filtrar e analisar dados educacionais para identificar padrões regionais de qualidade do ensino."
    }
  ];

  const tecnicasAvancadas = [
    {
      nome: "Window Functions",
      descricao: "Análise de séries temporais e ranking",
      exemplo: `df.withColumn("rank", 
  row_number().over(
    Window.partitionBy("categoria").orderBy("valor")
  )
)`
    },
    {
      nome: "UDFs (User Defined Functions)",
      descricao: "Funções personalizadas para análise científica",
      exemplo: `from pyspark.sql.types import FloatType
def calcular_indice_complexidade(sequencia):
    return len(set(sequencia)) / len(sequencia)

udf_complexidade = udf(calcular_indice_complexidade, FloatType())`
    },
    {
      nome: "Streaming",
      descricao: "Processamento de dados em tempo real",
      exemplo: `stream = spark.readStream \\
  .format("kafka") \\
  .option("kafka.bootstrap.servers", "localhost:9092") \\
  .load()`
    },
    {
      nome: "MLlib Pipeline",
      descricao: "Pipeline completo de machine learning",
      exemplo: `from pyspark.ml import Pipeline
pipeline = Pipeline(stages=[
    vectorAssembler,
    scaler,
    logisticRegression
])`
    }
  ];

  const executarComando = async (comando: string) => {
    setComandoExecutando(comando);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setComandoExecutando(null);
  };

  const proximaEtapa = () => {
    if (etapaAtiva < etapasSpark.length - 1) {
      setEtapaAtiva(etapaAtiva + 1);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        <FlashOn sx={{ fontSize: 40, mr: 2, verticalAlign: 'middle', color: 'orange' }} />
        ⚡ Apache Spark
      </Typography>

      <Alert severity="info" sx={{ mb: 4 }}>
        <Typography variant="body1">
          <strong>Processamento Científico:</strong> Apache Spark para análise rápida de grandes volumes 
          de dados científicos, incluindo filtragem avançada, transformações complexas e machine learning escalável.
        </Typography>
      </Alert>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabAtiva} onChange={handleTabChange} centered>
          <Tab icon={<School />} label="Tutorial" />
          <Tab icon={<FilterList />} label="Filtragem de Dados" />
          <Tab icon={<Analytics />} label="Técnicas Avançadas" />
        </Tabs>
      </Box>

      <TabPanel value={tabAtiva} index={0}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              <School sx={{ mr: 1, verticalAlign: 'middle' }} />
              Tutorial Prático - Apache Spark
            </Typography>

            <Stepper activeStep={etapaAtiva} orientation="vertical">
              {etapasSpark.map((etapa, index) => (
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
                            {comando}
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
                        disabled={index === etapasSpark.length - 1}
                      >
                        {index === etapasSpark.length - 1 ? 'Concluído' : 'Próxima Etapa'}
                      </Button>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value={tabAtiva} index={1}>
        <Typography variant="h4" gutterBottom>
          🔍 Filtragem Avançada de Dados Científicos
        </Typography>

        <Grid container spacing={3}>
          {exemplosFiltragem.map((exemplo, index) => (
            <Grid item xs={12} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    <FilterList sx={{ mr: 1, verticalAlign: 'middle' }} />
                    {exemplo.titulo}
                  </Typography>
                  
                  <Typography variant="subtitle2" gutterBottom>
                    <strong>Problema Científico:</strong>
                  </Typography>
                  <Typography paragraph>{exemplo.problema}</Typography>
                  
                  <Typography variant="subtitle2" gutterBottom>
                    <Code sx={{ mr: 1, verticalAlign: 'middle' }} />
                    <strong>Implementação em Spark:</strong>
                  </Typography>
                  <Paper sx={{ p: 2, bgcolor: '#1e1e1e', color: '#d4d4d4', overflow: 'auto', mb: 2 }}>
                    <pre style={{ margin: 0, fontFamily: 'Consolas, Monaco, monospace', fontSize: '14px' }}>
                      {exemplo.codigo}
                    </pre>
                  </Paper>
                  
                  <Alert severity="info">
                    <Typography variant="body2">
                      <strong>Explicação:</strong> {exemplo.explicacao}
                    </Typography>
                  </Alert>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Alert severity="success" sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            💡 Dicas para Filtragem Eficiente
          </Typography>
          <List dense>
            <ListItem>
              <ListItemIcon><Speed /></ListItemIcon>
              <ListItemText primary="Use pushdown predicates: aplique filtros antes de operações custosas" />
            </ListItem>
            <ListItem>
              <ListItemIcon><Memory /></ListItemIcon>
              <ListItemText primary="Cache DataFrames filtrados se serão reutilizados múltiplas vezes" />
            </ListItem>
            <ListItem>
              <ListItemIcon><DataUsage /></ListItemIcon>
              <ListItemText primary="Combine múltiplos filtros em uma única operação quando possível" />
            </ListItem>
            <ListItem>
              <ListItemIcon><Transform /></ListItemIcon>
              <ListItemText primary="Use particionamento para otimizar filtros por colunas frequentes" />
            </ListItem>
          </List>
        </Alert>
      </TabPanel>

      <TabPanel value={tabAtiva} index={2}>
        <Typography variant="h4" gutterBottom>
          🚀 Técnicas Avançadas para Análise Científica
        </Typography>

        <Grid container spacing={3}>
          {tecnicasAvancadas.map((tecnica, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    <GroupWork sx={{ mr: 1, verticalAlign: 'middle' }} />
                    {tecnica.nome}
                  </Typography>
                  
                  <Typography paragraph>
                    {tecnica.descricao}
                  </Typography>
                  
                  <Typography variant="subtitle2" gutterBottom>
                    Exemplo de código:
                  </Typography>
                  <Paper sx={{ p: 2, bgcolor: '#f5f5f5', overflow: 'auto' }}>
                    <pre style={{ 
                      margin: 0, 
                      fontFamily: 'Consolas, Monaco, monospace', 
                      fontSize: '12px',
                      whiteSpace: 'pre-wrap'
                    }}>
                      {tecnica.exemplo}
                    </pre>
                  </Paper>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              <Analytics sx={{ mr: 1, verticalAlign: 'middle' }} />
              Pipeline Completo para Pesquisa Científica
            </Typography>
            
            <Paper sx={{ p: 2, bgcolor: '#1e1e1e', color: '#d4d4d4', overflow: 'auto' }}>
              <pre style={{ margin: 0, fontFamily: 'Consolas, Monaco, monospace', fontSize: '14px' }}>
{`# Pipeline completo para análise de dados científicos
from pyspark.sql import SparkSession
from pyspark.ml import Pipeline
from pyspark.ml.feature import VectorAssembler, StandardScaler
from pyspark.ml.classification import RandomForestClassifier
from pyspark.ml.evaluation import MulticlassClassificationEvaluator

# 1. Inicializar Spark
spark = SparkSession.builder \\
    .appName("AnaliseGientifica") \\
    .config("spark.sql.adaptive.enabled", "true") \\
    .getOrCreate()

# 2. Carregar e filtrar dados
df = spark.read.parquet("dados_pesquisa_completos.parquet")
dados_filtrados = df.filter(df.qualidade > 0.8)

# 3. Preparar features
assembler = VectorAssembler(
    inputCols=["feature1", "feature2", "feature3"],
    outputCol="features"
)

scaler = StandardScaler(
    inputCol="features",
    outputCol="scaledFeatures"
)

# 4. Modelo de ML
rf = RandomForestClassifier(
    featuresCol="scaledFeatures",
    labelCol="label",
    numTrees=100
)

# 5. Pipeline completo
pipeline = Pipeline(stages=[assembler, scaler, rf])

# 6. Treinar e avaliar
train_data, test_data = dados_filtrados.randomSplit([0.8, 0.2])
model = pipeline.fit(train_data)
predictions = model.transform(test_data)

# 7. Métricas de avaliação
evaluator = MulticlassClassificationEvaluator()
accuracy = evaluator.evaluate(predictions)
print(f"Acurácia do modelo: {accuracy:.3f}")

# 8. Salvar modelo para produção
model.write().overwrite().save("modelo_cientifico_v1")
`}
              </pre>
            </Paper>
          </CardContent>
        </Card>
      </TabPanel>
    </Container>
  );
};

export default ApacheSpark;