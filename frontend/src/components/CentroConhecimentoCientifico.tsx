import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Chip,
  Grid,
  Divider,
  Tab,
  Tabs,
} from '@mui/material';
import {
  Science,
  ExpandMore,
  CheckCircle,
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
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const CentroConhecimentoCientifico: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [tabValue, setTabValue] = useState(0);

  const metodologiaCientifica = [
    {
      titulo: "1. Formulação do Problema",
      descricao: "Definição clara e objetiva do problema de pesquisa",
      detalhes: [
        "Identificar a questão de pesquisa específica",
        "Definir objetivos gerais e específicos",
        "Estabelecer hipóteses testáveis",
        "Determinar a relevância e viabilidade do estudo"
      ],
      exemplo: "Problema: 'Qual a relação entre escolaridade e renda em Santa Catarina?'",
      ferramentas: ["Revisão bibliográfica", "Análise exploratória", "Brainstorming estruturado"]
    },
    {
      titulo: "2. Coleta de Dados",
      descricao: "Obtenção sistemática de dados confiáveis e representativos",
      detalhes: [
        "Definir população e amostra",
        "Escolher métodos de coleta apropriados",
        "Garantir qualidade e confiabilidade dos dados",
        "Documentar todo o processo de coleta"
      ],
      exemplo: "Coleta: Dados do IBGE sobre educação e renda por município de SC",
      ferramentas: ["Surveys", "APIs públicas", "Web scraping", "Banco de dados oficiais"]
    },
    {
      titulo: "3. Limpeza e Preparação",
      descricao: "Tratamento dos dados para garantir qualidade analítica",
      detalhes: [
        "Identificar e tratar valores ausentes",
        "Detectar e corrigir outliers",
        "Padronizar formatos e escalas",
        "Validar consistência dos dados"
      ],
      exemplo: "Limpeza: Remoção de municípios com dados incompletos, padronização de valores monetários",
      ferramentas: ["Python/Pandas", "R", "Excel avançado", "SQL"]
    },
    {
      titulo: "4. Análise Exploratória",
      descricao: "Investigação inicial para compreender padrões nos dados",
      detalhes: [
        "Calcular estatísticas descritivas",
        "Criar visualizações preliminares",
        "Identificar relações e tendências",
        "Formular hipóteses adicionais"
      ],
      exemplo: "Exploração: Distribuição de renda por região, correlação inicial educação-renda",
      ferramentas: ["Histogramas", "Box plots", "Scatter plots", "Mapas de calor"]
    },
    {
      titulo: "5. Análise Estatística",
      descricao: "Aplicação de testes estatísticos para validar hipóteses",
      detalhes: [
        "Escolher testes estatísticos apropriados",
        "Verificar premissas dos testes",
        "Interpretar resultados com significância",
        "Calcular tamanhos de efeito"
      ],
      exemplo: "Análise: Teste de correlação de Pearson, regressão linear múltipla",
      ferramentas: ["SPSS", "R", "Python/SciPy", "Stata"]
    },
    {
      titulo: "6. Interpretação e Conclusões",
      descricao: "Síntese dos resultados e implicações práticas",
      detalhes: [
        "Interpretar resultados no contexto do problema",
        "Discutir limitações do estudo",
        "Propor aplicações práticas",
        "Sugerir pesquisas futuras"
      ],
      exemplo: "Conclusão: 'Existe correlação moderada (r=0.65) entre escolaridade e renda em SC'",
      ferramentas: ["Relatórios", "Dashboards", "Apresentações", "Artigos científicos"]
    }
  ];

  const tiposAnalise = [
    {
      nome: "Análise Descritiva",
      icon: <BarChart color="primary" />,
      descricao: "Sumarização e descrição das características dos dados",
      quando_usar: "Para entender a distribuição e características básicas dos dados",
      metodos: [
        "Medidas de tendência central (média, mediana, moda)",
        "Medidas de dispersão (desvio padrão, variância, amplitude)",
        "Distribuições de frequência",
        "Percentis e quartis"
      ],
      exemplo_pratico: "Analisar a distribuição de idades em uma pesquisa de satisfação",
      codigo_exemplo: `# Exemplo em Python
import pandas as pd
import numpy as np

# Estatísticas descritivas
dados.describe()
dados['idade'].mean()  # Média
dados['idade'].median()  # Mediana
dados['idade'].std()   # Desvio padrão`,
      interpretacao: "Resultados mostram tendência central e variabilidade dos dados"
    },
    {
      nome: "Análise de Correlação",
      icon: <ScatterPlot color="secondary" />,
      descricao: "Investigação de relações lineares entre variáveis quantitativas",
      quando_usar: "Para identificar se duas ou mais variáveis se relacionam linearmente",
      metodos: [
        "Correlação de Pearson (dados paramétricos)",
        "Correlação de Spearman (dados não-paramétricos)",
        "Correlação de Kendall (dados ordinais)",
        "Matriz de correlação para múltiplas variáveis"
      ],
      exemplo_pratico: "Verificar se há relação entre horas de estudo e notas dos alunos",
      codigo_exemplo: `# Correlação de Pearson
from scipy.stats import pearsonr

correlacao, p_value = pearsonr(dados['horas_estudo'], dados['nota'])
print(f'Correlação: {correlacao:.3f}')
print(f'P-value: {p_value:.3f}')`,
      interpretacao: "r próximo de 1 indica correlação positiva forte; próximo de -1 indica correlação negativa forte"
    },
    {
      nome: "Análise de Regressão",
      icon: <TrendingUp color="success" />,
      descricao: "Modelagem de relações causais e predição de valores",
      quando_usar: "Para prever valores de uma variável baseado em outras variáveis",
      metodos: [
        "Regressão linear simples",
        "Regressão linear múltipla",
        "Regressão logística",
        "Regressão polinomial"
      ],
      exemplo_pratico: "Prever salário baseado em anos de experiência e nível educacional",
      codigo_exemplo: `from sklearn.linear_model import LinearRegression

# Regressão linear múltipla
modelo = LinearRegression()
modelo.fit(X[['experiencia', 'educacao']], y['salario'])
predicoes = modelo.predict(X_novo)`,
      interpretacao: "R² indica quanto da variabilidade é explicada pelo modelo"
    },
    {
      nome: "Teste de Hipóteses",
      icon: <Psychology color="warning" />,
      descricao: "Verificação estatística de afirmações sobre populações",
      quando_usar: "Para confirmar ou refutar hipóteses sobre diferenças entre grupos",
      metodos: [
        "Teste t (comparar médias)",
        "Teste qui-quadrado (independência)",
        "ANOVA (comparar múltiplos grupos)",
        "Teste de normalidade"
      ],
      exemplo_pratico: "Testar se há diferença significativa na renda entre homens e mulheres",
      codigo_exemplo: `from scipy.stats import ttest_ind

# Teste t para amostras independentes
estatistica, p_value = ttest_ind(renda_homens, renda_mulheres)
alpha = 0.05
if p_value < alpha:
    print("Diferença significativa encontrada")`,
      interpretacao: "P-value < 0.05 indica diferença estatisticamente significativa"
    }
  ];

  const exemplosPraticos = [
    {
      titulo: "📊 Análise de Vendas E-commerce",
      contexto: "Empresa quer entender padrões de vendas para otimizar estratégia",
      dataset: "Vendas mensais por produto, região e canal",
      metodologia: [
        "1. Análise descritiva: Vendas médias, produtos mais vendidos",
        "2. Análise temporal: Sazonalidade e tendências",
        "3. Segmentação: Clusters de clientes por comportamento",
        "4. Correlação: Relação entre preço e volume de vendas",
        "5. Predição: Modelo para prever vendas futuras"
      ],
      resultados_esperados: [
        "Identificação de produtos com melhor performance",
        "Padrões sazonais para planejamento de estoque",
        "Segmentos de clientes para marketing direcionado",
        "Previsões para próximos trimestres"
      ]
    },
    {
      titulo: "🏥 Análise Epidemiológica",
      contexto: "Secretaria de Saúde quer entender fatores de risco de uma doença",
      dataset: "Dados de pacientes: idade, gênero, comorbidades, desfecho",
      metodologia: [
        "1. Análise descritiva: Perfil demográfico dos pacientes",
        "2. Análise bivariada: Associação fatores de risco-doença",
        "3. Regressão logística: Modelo de risco ajustado",
        "4. Curvas de sobrevivência: Análise temporal",
        "5. Validação: Teste do modelo em nova amostra"
      ],
      resultados_esperados: [
        "Identificação dos principais fatores de risco",
        "Grupos populacionais de alto risco",
        "Modelo para predição de risco individual",
        "Recomendações para políticas de prevenção"
      ]
    },
    {
      titulo: "🎓 Análise Educacional",
      contexto: "Universidade quer identificar fatores que influenciam o desempenho acadêmico",
      dataset: "Dados de estudantes: notas, frequência, background socioeconômico",
      metodologia: [
        "1. Análise exploratória: Distribuição de notas por curso",
        "2. Correlação: Relação entre variáveis socioeconômicas e desempenho",
        "3. ANOVA: Diferenças entre grupos (cursos, turnos)",
        "4. Regressão múltipla: Modelo preditivo de desempenho",
        "5. Análise de clusters: Perfis de estudantes"
      ],
      resultados_esperados: [
        "Fatores mais importantes para o sucesso acadêmico",
        "Perfis de estudantes em risco de evasão",
        "Diferenças entre cursos e turnos",
        "Estratégias de apoio acadêmico personalizadas"
      ]
    }
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        <Science sx={{ mr: 2, fontSize: 'inherit' }} />
        Centro de Conhecimento Científico
      </Typography>
      
      <Typography variant="h6" align="center" color="text.secondary" paragraph>
        Metodologia, Técnicas e Exemplos Práticos para Análise de Dados
      </Typography>

      <Box sx={{ width: '100%' }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} aria-label="tabs">
          <Tab label="Metodologia Científica" />
          <Tab label="Tipos de Análise" />
          <Tab label="Exemplos Práticos" />
        </Tabs>

        {/* Tab 1: Metodologia Científica */}
        <TabPanel value={tabValue} index={0}>
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body1">
              <strong>Metodologia Científica em Análise de Dados:</strong> Processo sistemático e rigoroso 
              para investigar fenômenos através de dados, garantindo resultados confiáveis e reproduzíveis.
            </Typography>
          </Alert>

          <Stepper activeStep={activeStep} orientation="vertical">
            {metodologiaCientifica.map((etapa, index) => (
              <Step key={index}>
                <StepLabel>
                  <Typography variant="h6">{etapa.titulo}</Typography>
                </StepLabel>
                <StepContent>
                  <Typography paragraph>{etapa.descricao}</Typography>
                  
                  <Card sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        <CheckCircle sx={{ mr: 1, fontSize: 'small' }} />
                        Passos Detalhados:
                      </Typography>
                      <List dense>
                        {etapa.detalhes.map((detalhe, idx) => (
                          <ListItem key={idx} sx={{ py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              <Typography variant="body2" color="primary">
                                {idx + 1}.
                              </Typography>
                            </ListItemIcon>
                            <ListItemText primary={detalhe} />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>

                  <Alert severity="success" sx={{ mb: 2 }}>
                    <Typography variant="body2">
                      <strong>Exemplo Prático:</strong> {etapa.exemplo}
                    </Typography>
                  </Alert>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Ferramentas Recomendadas:
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {etapa.ferramentas.map((ferramenta, idx) => (
                        <Chip key={idx} label={ferramenta} size="small" variant="outlined" />
                      ))}
                    </Box>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mr: 1 }}
                      disabled={index === metodologiaCientifica.length - 1}
                    >
                      {index === metodologiaCientifica.length - 1 ? 'Finalizar' : 'Próxima Etapa'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Voltar
                    </Button>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>

          {activeStep === metodologiaCientifica.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                🎉 Metodologia Científica Completa!
              </Typography>
              <Typography paragraph>
                Você concluiu todas as etapas da metodologia científica para análise de dados. 
                Este processo garante que sua pesquisa seja rigorosa, reproduzível e confiável.
              </Typography>
              <Button onClick={handleReset} sx={{ mr: 1 }}>
                Revisar Metodologia
              </Button>
            </Paper>
          )}
        </TabPanel>

        {/* Tab 2: Tipos de Análise */}
        <TabPanel value={tabValue} index={1}>
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body1">
              <strong>Tipos de Análise Estatística:</strong> Diferentes abordagens para extrair insights 
              dos dados, cada uma adequada para tipos específicos de perguntas de pesquisa.
            </Typography>
          </Alert>

          <Grid container spacing={3}>
            {tiposAnalise.map((analise, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {analise.icon}
                      <Typography variant="h6" sx={{ ml: 1 }}>
                        {analise.nome}
                      </Typography>
                    </Box>
                    
                    <Typography variant="body2" paragraph>
                      {analise.descricao}
                    </Typography>

                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="subtitle2">Quando Usar</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant="body2">
                          {analise.quando_usar}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="subtitle2">Métodos</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <List dense>
                          {analise.metodos.map((metodo, idx) => (
                            <ListItem key={idx} sx={{ py: 0.5 }}>
                              <ListItemIcon sx={{ minWidth: 20 }}>
                                <Typography variant="body2" color="primary">•</Typography>
                              </ListItemIcon>
                              <ListItemText 
                                primary={<Typography variant="body2">{metodo}</Typography>} 
                              />
                            </ListItem>
                          ))}
                        </List>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="subtitle2">Exemplo Prático</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant="body2" paragraph>
                          {analise.exemplo_pratico}
                        </Typography>
                        <Paper sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                          <Typography variant="caption" component="pre" sx={{ fontFamily: 'monospace' }}>
                            {analise.codigo_exemplo}
                          </Typography>
                        </Paper>
                      </AccordionDetails>
                    </Accordion>

                    <Alert severity="info" sx={{ mt: 2 }}>
                      <Typography variant="body2">
                        <strong>Interpretação:</strong> {analise.interpretacao}
                      </Typography>
                    </Alert>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Tab 3: Exemplos Práticos */}
        <TabPanel value={tabValue} index={2}>
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body1">
              <strong>Estudos de Caso Reais:</strong> Exemplos práticos de como aplicar a metodologia 
              científica em diferentes contextos e áreas de conhecimento.
            </Typography>
          </Alert>

          {exemplosPraticos.map((exemplo, index) => (
            <Card key={index} sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {exemplo.titulo}
                </Typography>
                
                <Typography variant="body1" paragraph>
                  <strong>Contexto:</strong> {exemplo.contexto}
                </Typography>
                
                <Typography variant="body1" paragraph>
                  <strong>Dataset:</strong> {exemplo.dataset}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>
                  <Assessment sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Metodologia Aplicada:
                </Typography>
                
                <List>
                  {exemplo.metodologia.map((etapa, idx) => (
                    <ListItem key={idx}>
                      <ListItemIcon>
                        <CheckCircle color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={etapa} />
                    </ListItem>
                  ))}
                </List>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>
                  <TrendingUp sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Resultados Esperados:
                </Typography>
                
                <Grid container spacing={2}>
                  {exemplo.resultados_esperados.map((resultado, idx) => (
                    <Grid item xs={12} sm={6} key={idx}>
                      <Alert severity="success" sx={{ height: '100%' }}>
                        <Typography variant="body2">
                          {resultado}
                        </Typography>
                      </Alert>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          ))}
        </TabPanel>
      </Box>
    </Container>
  );
};

export default CentroConhecimentoCientifico;
