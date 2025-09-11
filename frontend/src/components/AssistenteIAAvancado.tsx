import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  Paper,
  Chip,
  Avatar,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Psychology,
  AutoAwesome,
  TrendingUp,
  Insights,
  ExpandMore,
  CheckCircle,
  Speed,
  School,
  Work,
  Science,
  Language,
  Code,
  Analytics,
} from '@mui/icons-material';

interface AnaliseIA {
  pergunta: string;
  resposta: string;
  codigo: string;
  visualizacao: string;
  insights: string[];
  confianca: number;
  tempo_processamento: number;
}

const AssistenteIAAvancado: React.FC = () => {
  const [pergunta, setPergunta] = useState('');
  const [analisando, setAnalisando] = useState(false);
  const [resultado, setResultado] = useState<AnaliseIA | null>(null);
  const [historico, setHistorico] = useState<AnaliseIA[]>([]);

  // Exemplos de perguntas inteligentes
  const exemplosPerguntas = [
    "Analise a correlação entre vendas e marketing nos últimos 6 meses",
    "Identifique padrões sazonais nos dados de turismo de Santa Catarina",
    "Preveja a demanda para o próximo trimestre baseado nos dados históricos",
    "Detecte outliers nos dados de salários e explique as possíveis causas",
    "Compare a performance de diferentes produtos usando machine learning",
    "Crie um modelo preditivo para taxa de evasão escolar",
    "Analise sentimentos em reviews de produtos usando NLP",
    "Otimize a estratégia de preços baseada em dados de concorrentes"
  ];

  const capacidadesIA = [
    {
      categoria: "Análise Automática",
      icon: <Psychology color="primary" />,
      capacidades: [
        "Detecção automática de padrões",
        "Limpeza inteligente de dados",
        "Seleção automática de modelos",
        "Interpretação de resultados",
        "Geração de insights acionáveis"
      ]
    },
    {
      categoria: "Machine Learning",
      icon: <AutoAwesome color="secondary" />,
      capacidades: [
        "Classificação e regressão automática",
        "Clustering inteligente",
        "Séries temporais avançadas",
        "Deep learning para padrões complexos",
        "AutoML para otimização de hiperparâmetros"
      ]
    },
    {
      categoria: "Visualização Inteligente",
      icon: <TrendingUp color="success" />,
      capacidades: [
        "Gráficos gerados automaticamente",
        "Dashboards adaptativos",
        "Storytelling com dados",
        "Visualizações interativas",
        "Relatórios narrados por IA"
      ]
    },
    {
      categoria: "Código Automático",
      icon: <Code color="warning" />,
      capacidades: [
        "Geração de código Python/R",
        "Scripts SQL otimizados",
        "Notebooks Jupyter completos",
        "Documentação automática",
        "Testes estatísticos apropriados"
      ]
    }
  ];

  const processarPerguntaIA = async (pergunta: string) => {
    setAnalisando(true);
    
    // Simulação de IA avançada (em produção seria conectada a GPT-4, Claude, etc.)
    const tempoInicio = Date.now();
    
    try {
      // Simular processamento de IA
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const analiseSimulada: AnaliseIA = {
        pergunta,
        resposta: `Análise completa realizada com IA avançada:\n\n` +
                 `📊 **Resultados Encontrados:**\n` +
                 `- Padrão significativo identificado (p < 0.001)\n` +
                 `- Correlação forte detectada (r = 0.84)\n` +
                 `- Tendência crescente de 15% ao mês\n` +
                 `- 3 outliers identificados e tratados\n\n` +
                 `🎯 **Insights Principais:**\n` +
                 `- Oportunidade de crescimento de 25% no próximo trimestre\n` +
                 `- Recomendação: Investir em marketing digital\n` +
                 `- Atenção: Sazonalidade em dezembro reduz 30%`,
        
        codigo: `# Código gerado automaticamente pela IA
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_absolute_error

# Carregamento e preparação dos dados
dados = pd.read_csv('dados_analisados.csv')
dados_limpos = dados.dropna()

# Análise exploratória automática
correlacao = dados_limpos.corr()
plt.figure(figsize=(12, 8))
sns.heatmap(correlacao, annot=True, cmap='coolwarm')
plt.title('Matriz de Correlação - Análise IA')
plt.show()

# Modelo preditivo automático
X = dados_limpos.drop('target', axis=1)
y = dados_limpos['target']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

modelo = RandomForestRegressor(n_estimators=100, random_state=42)
modelo.fit(X_train, y_train)

# Predições e métricas
predicoes = modelo.predict(X_test)
r2 = r2_score(y_test, predicoes)
mae = mean_absolute_error(y_test, predicoes)

print(f'R² Score: {r2:.3f}')
print(f'MAE: {mae:.3f}')

# Importância das features
importancia = pd.DataFrame({
    'feature': X.columns,
    'importancia': modelo.feature_importances_
}).sort_values('importancia', ascending=False)

print("\\nTop 5 variáveis mais importantes:")
print(importancia.head())`,
        
        visualizacao: "Gráficos gerados: Matriz de correlação, Importância de features, Predições vs Real, Distribuição de resíduos",
        
        insights: [
          "💡 Variável 'marketing_digital' é o principal driver (34% de importância)",
          "📈 Modelo atinge 87% de acurácia nas predições",
          "⚠️ Detectados 3 outliers que podem representar oportunidades especiais",
          "🔮 Previsão para próximo mês: crescimento de 12.5%",
          "🎯 Recomendação: Aumentar investimento em marketing digital em 15%"
        ],
        
        confianca: 0.87,
        tempo_processamento: Date.now() - tempoInicio
      };
      
      setResultado(analiseSimulada);
      setHistorico(prev => [analiseSimulada, ...prev]);
      
    } catch (error) {
      console.error('Erro na análise IA:', error);
    } finally {
      setAnalisando(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: 'primary.main' }}>
          <Psychology sx={{ fontSize: 40 }} />
        </Avatar>
        <Typography variant="h3" gutterBottom>
          🤖 Assistente IA Avançado
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Análise de dados com Inteligência Artificial de última geração
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          Faça qualquer pergunta sobre seus dados e receba análises completas com código, visualizações e insights acionáveis
        </Typography>
      </Box>

      {/* Interface de Pergunta */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            💬 Faça sua pergunta para a IA
          </Typography>
          
          <TextField
            fullWidth
            multiline
            rows={3}
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
            placeholder="Ex: Analise a correlação entre vendas e marketing, identifique padrões sazonais, preveja a demanda..."
            variant="outlined"
            sx={{ mb: 2 }}
          />
          
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => processarPerguntaIA(pergunta)}
              disabled={!pergunta.trim() || analisando}
              startIcon={analisando ? <CircularProgress size={20} /> : <Psychology />}
            >
              {analisando ? 'Analisando...' : 'Analisar com IA'}
            </Button>
            
            <Chip 
              label={`🚀 Tempo médio: 2-5 segundos`} 
              color="primary" 
              variant="outlined" 
            />
          </Box>
        </CardContent>
      </Card>

      {/* Exemplos de Perguntas */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            💡 Exemplos de perguntas inteligentes
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {exemplosPerguntas.map((exemplo, index) => (
              <Chip
                key={index}
                label={exemplo}
                onClick={() => setPergunta(exemplo)}
                variant="outlined"
                sx={{ mb: 1 }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Resultado da Análise */}
      {resultado && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Insights color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">
                Resultado da Análise IA
              </Typography>
              <Chip 
                label={`${(resultado.confianca * 100).toFixed(0)}% confiança`}
                color="success"
                size="small"
                sx={{ ml: 2 }}
              />
              <Chip 
                label={`${resultado.tempo_processamento}ms`}
                color="info"
                size="small"
                sx={{ ml: 1 }}
              />
            </Box>

            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="subtitle1">📋 Análise e Insights</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
                  {resultado.resposta}
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="subtitle1">💡 Insights Principais</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {resultado.insights.map((insight, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText primary={insight} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="subtitle1">💻 Código Gerado</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Paper sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                  <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                    {resultado.codigo}
                  </Typography>
                </Paper>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="subtitle1">📊 Visualizações</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Alert severity="info">
                  <Typography variant="body2">
                    {resultado.visualizacao}
                  </Typography>
                </Alert>
              </AccordionDetails>
            </Accordion>
          </CardContent>
        </Card>
      )}

      {/* Capacidades da IA */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        🧠 Capacidades da IA Avançada
      </Typography>
      
      <Grid container spacing={3}>
        {capacidadesIA.map((categoria, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {categoria.icon}
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {categoria.categoria}
                  </Typography>
                </Box>
                <List dense>
                  {categoria.capacidades.map((capacidade, idx) => (
                    <ListItem key={idx}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircle color="primary" sx={{ fontSize: 20 }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={capacidade}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Histórico de Análises */}
      {historico.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            📚 Histórico de Análises
          </Typography>
          {historico.slice(0, 3).map((analise, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  {analise.pergunta}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip size="small" label={`${(analise.confianca * 100).toFixed(0)}% confiança`} />
                  <Chip size="small" label={`${analise.insights.length} insights`} />
                  <Chip size="small" label={`${analise.tempo_processamento}ms`} />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Call to Action */}
      <Alert severity="success" sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          🚀 Revolucione sua análise de dados!
        </Typography>
        <Typography variant="body2">
          Nossa IA avançada analisa milhões de padrões em segundos, gera código automaticamente 
          e fornece insights que levariam horas para descobrir manualmente. 
          Seja o primeiro a usar a próxima geração de análise de dados!
        </Typography>
      </Alert>
    </Container>
  );
};

export default AssistenteIAAvancado;
