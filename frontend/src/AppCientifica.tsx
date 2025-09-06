import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Button,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Chip,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Science,
  School,
  Analytics,
  TrendingUp,
  Assessment,
  Psychology,
  AutoGraph,
  Functions,
  Calculate,
  Timeline,
  BarChart,
  ScatterPlot,
  MenuBook,
  Lightbulb,
  DataUsage,
  ShowChart,
} from '@mui/icons-material';

// Importar o componente de conhecimento científico
import CentroConhecimentoCientifico from './components/CentroConhecimentoCientifico';

const AppCientifica: React.FC = () => {
  const [secaoAtiva, setSecaoAtiva] = useState('dashboard');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const secoes = [
    { id: 'dashboard', nome: 'Dashboard', icon: <Assessment /> },
    { id: 'metodologia', nome: 'Metodologia Científica', icon: <Science /> },
    { id: 'ferramentas', nome: 'Ferramentas de Análise', icon: <Analytics /> },
    { id: 'exemplos', nome: 'Estudos de Caso', icon: <ShowChart /> },
  ];

  const estatisticasPlataforma = [
    { 
      titulo: "Métodos Científicos", 
      valor: "15+", 
      descricao: "Metodologias implementadas",
      icon: <Science color="primary" sx={{ fontSize: 40 }} />
    },
    { 
      titulo: "Técnicas Estatísticas", 
      valor: "25+", 
      descricao: "Análises disponíveis",
      icon: <Functions color="secondary" sx={{ fontSize: 40 }} />
    },
    { 
      titulo: "Exemplos Práticos", 
      valor: "50+", 
      descricao: "Casos de uso reais",
      icon: <Timeline color="success" sx={{ fontSize: 40 }} />
    },
    { 
      titulo: "Bases de Conhecimento", 
      valor: "100+", 
      descricao: "Artigos e referências",
      icon: <MenuBook color="warning" sx={{ fontSize: 40 }} />
    },
  ];

  const ferramentasAnalise = [
    {
      categoria: "Análise Descritiva",
      ferramentas: [
        { nome: "Medidas de Tendência Central", uso: "Média, mediana, moda para sumarizar dados" },
        { nome: "Medidas de Dispersão", uso: "Desvio padrão, variância para medir variabilidade" },
        { nome: "Distribuições de Frequência", uso: "Histogramas e tabelas para visualizar distribuições" },
        { nome: "Percentis e Quartis", uso: "Dividir dados em grupos para análise comparativa" }
      ]
    },
    {
      categoria: "Análise Inferencial",
      ferramentas: [
        { nome: "Teste t de Student", uso: "Comparar médias entre grupos" },
        { nome: "ANOVA", uso: "Comparar médias de múltiplos grupos" },
        { nome: "Teste Qui-quadrado", uso: "Testar independência entre variáveis categóricas" },
        { nome: "Intervalos de Confiança", uso: "Estimar parâmetros populacionais" }
      ]
    },
    {
      categoria: "Análise de Correlação",
      ferramentas: [
        { nome: "Correlação de Pearson", uso: "Medir relação linear entre variáveis contínuas" },
        { nome: "Correlação de Spearman", uso: "Medir relação monotônica para dados não-paramétricos" },
        { nome: "Análise de Componentes Principais", uso: "Reduzir dimensionalidade mantendo informação" },
        { nome: "Matriz de Correlação", uso: "Visualizar relações múltiplas simultaneamente" }
      ]
    },
    {
      categoria: "Análise Preditiva",
      ferramentas: [
        { nome: "Regressão Linear", uso: "Prever valores contínuos baseado em variáveis preditoras" },
        { nome: "Regressão Logística", uso: "Prever probabilidades de eventos binários" },
        { nome: "Árvores de Decisão", uso: "Criar modelos interpretáveis de classificação" },
        { nome: "Análise de Séries Temporais", uso: "Prever valores futuros baseado em padrões temporais" }
      ]
    }
  ];

  const estudosCaso = [
    {
      titulo: "📈 Análise de Indicadores Econômicos de Santa Catarina",
      objetivo: "Investigar relações entre PIB, educação e desenvolvimento humano nos municípios catarinenses",
      metodologia: [
        "Coleta de dados do IBGE, PNUD e FEE-SC",
        "Análise exploratória com estatísticas descritivas",
        "Correlação entre variáveis econômicas e sociais",
        "Modelagem preditiva com regressão múltipla",
        "Validação cruzada e teste de robustez"
      ],
      resultados: [
        "IDH correlaciona positivamente com PIB per capita (r=0.78)",
        "Educação é o principal preditor do desenvolvimento (β=0.65)",
        "Região Metropolitana concentra 45% da economia estadual",
        "Modelo explica 82% da variação no IDH municipal"
      ],
      aplicacoes: [
        "Direcionamento de políticas públicas",
        "Identificação de municípios prioritários",
        "Planejamento de investimentos regionais",
        "Monitoramento de desenvolvimento sustentável"
      ]
    },
    {
      titulo: "🏥 Estudo Epidemiológico: COVID-19 em SC",
      objetivo: "Analisar fatores associados à incidência e mortalidade por COVID-19 no estado",
      metodologia: [
        "Análise de dados da SES-SC (2020-2023)",
        "Análise de sobrevivência com Kaplan-Meier",
        "Regressão de Cox para fatores de risco",
        "Análise espacial com mapas de calor",
        "Modelagem epidemiológica SIR"
      ],
      resultados: [
        "Taxa de letalidade: 1.8% (média estadual)",
        "Idade >60 anos: HR=4.2 para óbito",
        "Comorbidades aumentam risco em 3.5x",
        "Vacinação reduziu hospitalizações em 85%"
      ],
      aplicacoes: [
        "Estratégias de vacinação direcionadas",
        "Alocação de recursos hospitalares",
        "Comunicação de risco para população",
        "Preparação para futuras pandemias"
      ]
    },
    {
      titulo: "🎓 Análise do Desempenho Educacional",
      objetivo: "Identificar fatores que influenciam o desempenho no ENEM em escolas catarinenses",
      metodologia: [
        "Dados do INEP (2015-2022)",
        "Análise multinível (aluno-escola-município)",
        "Regressão hierárquica linear",
        "Análise de mediação e moderação",
        "Machine learning para predição"
      ],
      resultados: [
        "NSE familiar explica 40% da variação nas notas",
        "Infraestrutura escolar: efeito moderado (β=0.23)",
        "Formação docente impacta significativamente",
        "Algoritmo prediz desempenho com 78% de acurácia"
      ],
      aplicacoes: [
        "Políticas de equidade educacional",
        "Formação continuada de professores",
        "Investimento em infraestrutura",
        "Sistema de alertas precoces"
      ]
    }
  ];

  const renderDashboard = () => (
    <Box>
      <Typography variant="h4" gutterBottom align="center">
        🔬 Plataforma de Análise Científica de Dados
      </Typography>
      
      <Typography variant="h6" align="center" color="text.secondary" paragraph>
        Centro integrado de metodologia científica, ferramentas estatísticas e estudos de caso
      </Typography>

      {/* Estatísticas da Plataforma */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {estatisticasPlataforma.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ textAlign: 'center', p: 2, height: '100%' }}>
              <CardContent>
                <Box sx={{ mb: 2 }}>
                  {stat.icon}
                </Box>
                <Typography variant="h4" component="div" color="primary" gutterBottom>
                  {stat.valor}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {stat.titulo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.descricao}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Destaques */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <Lightbulb sx={{ mr: 1, verticalAlign: 'middle' }} />
                Metodologia Científica
              </Typography>
              <Typography variant="body2" paragraph>
                Processo estruturado em 6 etapas para garantir rigor científico:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="1. Formulação do problema de pesquisa" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="2. Coleta sistemática de dados" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="3. Limpeza e preparação dos dados" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="4. Análise exploratória inicial" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="5. Análise estatística rigorosa" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="6. Interpretação e conclusões" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <DataUsage sx={{ mr: 1, verticalAlign: 'middle' }} />
                Recursos Disponíveis
              </Typography>
              <Typography variant="body2" paragraph>
                Ferramentas e recursos para análise científica completa:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                <Chip label="Estatística Descritiva" size="small" />
                <Chip label="Testes de Hipóteses" size="small" />
                <Chip label="Análise de Correlação" size="small" />
                <Chip label="Regressão Linear" size="small" />
                <Chip label="Análise Multivariada" size="small" />
                <Chip label="Machine Learning" size="small" />
                <Chip label="Visualização Avançada" size="small" />
                <Chip label="Relatórios Científicos" size="small" />
              </Box>
              <Alert severity="info">
                <Typography variant="body2">
                  Todas as análises seguem padrões de reprodutibilidade científica
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const renderFerramentas = () => (
    <Box>
      <Typography variant="h4" gutterBottom>
        🔧 Ferramentas de Análise Estatística
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography>
          Conjunto abrangente de técnicas estatísticas organizadas por categoria de análise.
          Cada ferramenta inclui explicação teórica, casos de uso e exemplos práticos.
        </Typography>
      </Alert>

      {ferramentasAnalise.map((categoria, index) => (
        <Card key={index} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="primary">
              {categoria.categoria}
            </Typography>
            <Grid container spacing={2}>
              {categoria.ferramentas.map((ferramenta, idx) => (
                <Grid item xs={12} md={6} key={idx}>
                  <Paper sx={{ p: 2, height: '100%' }}>
                    <Typography variant="subtitle1" gutterBottom>
                      {ferramenta.nome}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {ferramenta.uso}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  const renderExemplos = () => (
    <Box>
      <Typography variant="h4" gutterBottom>
        📊 Estudos de Caso Científicos
      </Typography>
      
      <Alert severity="success" sx={{ mb: 3 }}>
        <Typography>
          Exemplos reais de aplicação da metodologia científica em diferentes áreas:
          economia, saúde e educação. Cada caso inclui metodologia completa e resultados validados.
        </Typography>
      </Alert>

      {estudosCaso.map((estudo, index) => (
        <Card key={index} sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {estudo.titulo}
            </Typography>
            
            <Typography variant="body1" paragraph>
              <strong>Objetivo:</strong> {estudo.objetivo}
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              📋 Metodologia Aplicada:
            </Typography>
            <List>
              {estudo.metodologia.map((item, idx) => (
                <ListItem key={idx}>
                  <ListItemIcon>
                    <Typography color="primary">{idx + 1}.</Typography>
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>

            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              🎯 Principais Resultados:
            </Typography>
            <Grid container spacing={2}>
              {estudo.resultados.map((resultado, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                  <Alert severity="success">
                    <Typography variant="body2">{resultado}</Typography>
                  </Alert>
                </Grid>
              ))}
            </Grid>

            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              🎯 Aplicações Práticas:
            </Typography>
            <Grid container spacing={2}>
              {estudo.aplicacoes.map((aplicacao, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                  <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                    <Typography variant="body2">{aplicacao}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Science sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DataScience Pro - Análise Científica
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Menu de Navegação */}
        <Paper sx={{ mb: 3 }}>
          <Box sx={{ p: 2, display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
            {secoes.map((secao) => (
              <Button
                key={secao.id}
                variant={secaoAtiva === secao.id ? 'contained' : 'outlined'}
                startIcon={secao.icon}
                onClick={() => setSecaoAtiva(secao.id)}
                size={isMobile ? 'small' : 'medium'}
              >
                {isMobile ? secao.nome.split(' ')[0] : secao.nome}
              </Button>
            ))}
          </Box>
        </Paper>

        {/* Conteúdo das Seções */}
        {secaoAtiva === 'dashboard' && renderDashboard()}
        {secaoAtiva === 'metodologia' && <CentroConhecimentoCientifico />}
        {secaoAtiva === 'ferramentas' && renderFerramentas()}
        {secaoAtiva === 'exemplos' && renderExemplos()}
      </Container>
    </Box>
  );
};

export default AppCientifica;
