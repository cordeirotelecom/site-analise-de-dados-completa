import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  LinearProgress,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@mui/material';
import {
  Upload,
  AutoAwesome,
  Analytics,
  Assessment,
  TrendingUp,
  School,
  PlayArrow,
} from '@mui/icons-material';

const AutoMLRevolucionario: React.FC = () => {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [processandoAutoML, setProcessandoAutoML] = useState(false);
  const [resultado, setResultado] = useState<any>(null);
  const [etapaAtual, setEtapaAtual] = useState(0);

  const etapasAutoML = [
    {
      label: '📁 Upload dos Dados',
      description: 'Carregue seu arquivo CSV com os dados para análise',
      detalhes: 'Formatos aceitos: CSV, Excel. Certifique-se de ter uma coluna target (resultado esperado).'
    },
    {
      label: '🔍 Análise Exploratória',
      description: 'Sistema analisa automaticamente a qualidade e padrões dos dados',
      detalhes: 'Verifica tipos de dados, valores ausentes, correlações e distribuições.'
    },
    {
      label: '🧠 Seleção de Algoritmos',
      description: 'IA escolhe os melhores algoritmos para seu tipo de problema',
      detalhes: 'Testa Random Forest, XGBoost, SVM, Neural Networks e outros.'
    },
    {
      label: '⚙️ Otimização de Hiperparâmetros',
      description: 'Ajusta automaticamente os parâmetros para máxima performance',
      detalhes: 'Usa técnicas como Grid Search, Random Search e Bayesian Optimization.'
    },
    {
      label: '📊 Validação e Métricas',
      description: 'Avalia o modelo com cross-validation e métricas robustas',
      detalhes: 'Accuracy, Precision, Recall, F1-Score, ROC-AUC conforme o problema.'
    },
    {
      label: '🎯 Modelo Final',
      description: 'Entrega o melhor modelo treinado e pronto para uso',
      detalhes: 'Inclui explicabilidade, importância das features e predições.'
    }
  ];

  const algoritmosDisponiveis = [
    { nome: 'Random Forest', tipo: 'Ensemble', descricao: 'Combina múltiplas árvores de decisão' },
    { nome: 'XGBoost', tipo: 'Gradient Boosting', descricao: 'Algoritmo de boosting otimizado' },
    { nome: 'Neural Networks', tipo: 'Deep Learning', descricao: 'Redes neurais artificiais' },
    { nome: 'SVM', tipo: 'Kernel Methods', descricao: 'Support Vector Machines' },
    { nome: 'Logistic Regression', tipo: 'Linear', descricao: 'Regressão logística clássica' },
    { nome: 'K-Nearest Neighbors', tipo: 'Instance-based', descricao: 'Classificação por vizinhança' },
  ];

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setArquivo(file);
      setEtapaAtual(1);
    }
  };

  const executarAutoML = async () => {
    if (!arquivo) return;
    
    setProcessandoAutoML(true);
    setEtapaAtual(2);

    // Simulação do processo AutoML
    for (let i = 2; i <= 5; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setEtapaAtual(i);
    }

    // Resultado final simulado
    setResultado({
      melhorModelo: 'XGBoost',
      accuracy: 0.94,
      precision: 0.91,
      recall: 0.96,
      f1Score: 0.93,
      tempoTreinamento: '2.3 min',
      featuresImportantes: [
        { nome: 'feature_1', importancia: 0.35 },
        { nome: 'feature_2', importancia: 0.28 },
        { nome: 'feature_3', importancia: 0.22 },
        { nome: 'feature_4', importancia: 0.15 }
      ]
    });

    setProcessandoAutoML(false);
    setEtapaAtual(6);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          🤖 AutoML - Machine Learning Automatizado
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Aprenda e use AutoML: IA que cria modelos de ML automaticamente
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          Tutorial completo: do upload dos dados até o modelo pronto para uso
        </Typography>
      </Box>

      {/* Tutorial e Explicação */}
      <Card sx={{ mb: 4, background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)' }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
            📚 O que é AutoML? (Tutorial Didático)
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" sx={{ color: 'white' }}>
                <strong>📖 Conceito:</strong><br/>
                AutoML automatiza todo o processo de criação de modelos de Machine Learning, 
                desde a preparação dos dados até a otimização final.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" sx={{ color: 'white' }}>
                <strong>🎯 Como funciona:</strong><br/>
                1. Analisa seus dados<br/>
                2. Testa diferentes algoritmos<br/>
                3. Otimiza parâmetros automaticamente<br/>
                4. Escolhe o melhor modelo
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" sx={{ color: 'white' }}>
                <strong>💡 Vantagens:</strong><br/>
                • Não precisa ser especialista em ML<br/>
                • Economiza tempo de desenvolvimento<br/>
                • Testa múltiplas abordagens<br/>
                • Resultados profissionais
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Guia Passo a Passo */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            📋 Guia Passo a Passo: Como usar o AutoML
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center', p: 2, border: '2px dashed #2196f3', borderRadius: 2 }}>
                <Typography variant="h4" color="primary">1</Typography>
                <Typography variant="h6" gutterBottom>📁 Upload</Typography>
                <Typography variant="body2">
                  Faça upload do seu arquivo CSV com os dados. 
                  Certifique-se de que tem uma coluna target (resultado esperado).
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center', p: 2, border: '2px dashed #ff9800', borderRadius: 2 }}>
                <Typography variant="h4" color="primary">2</Typography>
                <Typography variant="h6" gutterBottom>🔍 Análise</Typography>
                <Typography variant="body2">
                  O sistema analisa automaticamente seus dados: 
                  tipos, qualidade, correlações e padrões.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center', p: 2, border: '2px dashed #4caf50', borderRadius: 2 }}>
                <Typography variant="h4" color="primary">3</Typography>
                <Typography variant="h6" gutterBottom>🤖 Treinamento</Typography>
                <Typography variant="body2">
                  Testa diferentes algoritmos: Random Forest, 
                  XGBoost, Neural Networks e escolhe o melhor.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center', p: 2, border: '2px dashed #9c27b0', borderRadius: 2 }}>
                <Typography variant="h4" color="primary">4</Typography>
                <Typography variant="h6" gutterBottom>📊 Resultado</Typography>
                <Typography variant="body2">
                  Receba o modelo treinado com métricas, 
                  gráficos e explicações detalhadas.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Interface de Upload e Execução */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                🚀 Execute seu AutoML
              </Typography>
              
              {!arquivo && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <input
                    accept=".csv,.xlsx,.xls"
                    style={{ display: 'none' }}
                    id="upload-automl"
                    type="file"
                    onChange={handleUpload}
                  />
                  <label htmlFor="upload-automl">
                    <Button
                      variant="contained"
                      component="span"
                      startIcon={<Upload />}
                      size="large"
                    >
                      Fazer Upload dos Dados
                    </Button>
                  </label>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    Formatos aceitos: CSV, Excel (.xlsx, .xls)
                  </Typography>
                </Box>
              )}

              {arquivo && !processandoAutoML && !resultado && (
                <Box>
                  <Alert severity="success" sx={{ mb: 2 }}>
                    <strong>Arquivo carregado:</strong> {arquivo.name} ({(arquivo.size / 1024).toFixed(1)} KB)
                  </Alert>
                  <Box sx={{ textAlign: 'center', py: 2 }}>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<PlayArrow />}
                      onClick={executarAutoML}
                    >
                      Iniciar AutoML
                    </Button>
                  </Box>
                </Box>
              )}

              {processandoAutoML && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    ⚡ Processando AutoML...
                  </Typography>
                  <LinearProgress sx={{ mb: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    Etapa {etapaAtual}/6: {etapasAutoML[etapaAtual - 1]?.description}
                  </Typography>
                </Box>
              )}

              {resultado && (
                <Box>
                  <Alert severity="success" sx={{ mb: 3 }}>
                    <strong>✅ AutoML Concluído!</strong> Seu modelo foi treinado com sucesso.
                  </Alert>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={3}>
                      <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4" color="primary">
                          {(resultado.accuracy * 100).toFixed(1)}%
                        </Typography>
                        <Typography variant="body2">Accuracy</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4" color="primary">
                          {(resultado.precision * 100).toFixed(1)}%
                        </Typography>
                        <Typography variant="body2">Precision</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4" color="primary">
                          {(resultado.recall * 100).toFixed(1)}%
                        </Typography>
                        <Typography variant="body2">Recall</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4" color="primary">
                          {resultado.melhorModelo}
                        </Typography>
                        <Typography variant="body2">Melhor Modelo</Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📊 Processo em Tempo Real
              </Typography>
              
              <Stepper activeStep={etapaAtual - 1} orientation="vertical">
                {etapasAutoML.map((etapa, index) => (
                  <Step key={index}>
                    <StepLabel>{etapa.label}</StepLabel>
                    <StepContent>
                      <Typography variant="body2">{etapa.detalhes}</Typography>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Algoritmos Disponíveis */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            🧠 Algoritmos de Machine Learning Disponíveis
          </Typography>
          
          <Grid container spacing={2}>
            {algoritmosDisponiveis.map((algo, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper sx={{ p: 2, border: '1px solid #e0e0e0' }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1" fontWeight="bold">
                      {algo.nome}
                    </Typography>
                    <Chip label={algo.tipo} size="small" color="primary" />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {algo.descricao}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Importância das Features */}
      {resultado && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              🎯 Importância das Características (Features)
            </Typography>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Estas são as características mais importantes que o modelo usa para fazer predições:
            </Typography>

            {resultado.featuresImportantes.map((feature: any, index: number) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body1">{feature.nome}</Typography>
                  <Typography variant="body2">{(feature.importancia * 100).toFixed(1)}%</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={feature.importancia * 100} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Dicas e Melhores Práticas */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            💡 Dicas para Melhores Resultados
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                📋 Preparação dos Dados:
              </Typography>
              <ul>
                <li>Tenha pelo menos 100 exemplos por classe</li>
                <li>Remova ou trate valores ausentes</li>
                <li>Inclua features relevantes para o problema</li>
                <li>Balanceie as classes se possível</li>
              </ul>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                🎯 Interpretação dos Resultados:
              </Typography>
              <ul>
                <li><strong>Accuracy:</strong> % de predições corretas</li>
                <li><strong>Precision:</strong> % de positivos realmente corretos</li>
                <li><strong>Recall:</strong> % de positivos encontrados</li>
                <li><strong>F1-Score:</strong> Média harmônica de Precision e Recall</li>
              </ul>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Exemplo Prático */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            🎓 Exemplo Prático: Predição de Vendas
          </Typography>
          
          <Typography variant="body1" paragraph>
            <strong>Cenário:</strong> Uma empresa quer prever se um cliente vai comprar um produto.
          </Typography>
          
          <Typography variant="body2" paragraph>
            <strong>Dados necessários:</strong> idade, renda, histórico_compras, region, etc.
          </Typography>
          
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>idade</TableCell>
                  <TableCell>renda</TableCell>
                  <TableCell>historico_compras</TableCell>
                  <TableCell>regiao</TableCell>
                  <TableCell><strong>vai_comprar</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>25</TableCell>
                  <TableCell>50000</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>SP</TableCell>
                  <TableCell><strong>Sim</strong></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>45</TableCell>
                  <TableCell>80000</TableCell>
                  <TableCell>12</TableCell>
                  <TableCell>RJ</TableCell>
                  <TableCell><strong>Sim</strong></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>18</TableCell>
                  <TableCell>20000</TableCell>
                  <TableCell>0</TableCell>
                  <TableCell>MG</TableCell>
                  <TableCell><strong>Não</strong></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          
          <Typography variant="body2" sx={{ mt: 2 }}>
            <strong>Resultado:</strong> O AutoML criaria um modelo que aprende esses padrões e pode prever 
            se novos clientes vão comprar, ajudando a empresa a focar nos prospects mais promissores.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AutoMLRevolucionario;