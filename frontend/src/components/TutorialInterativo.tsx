import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  PlayArrow,
  CheckCircle,
  Upload,
  Analytics,
  Assessment,
  ExpandMore,
  School,
  TrendingUp,
  BarChart,
} from '@mui/icons-material';

const TutorialInterativo: React.FC = () => {
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [etapasCompletas, setEtapasCompletas] = useState<number[]>([]);

  const tutorials = [
    {
      titulo: "🤖 Como usar o AutoML",
      descricao: "Aprenda a usar machine learning automático",
      etapas: [
        {
          titulo: "Preparar seus dados",
          conteudo: "Organize seus dados em arquivo CSV com colunas bem definidas",
          dicas: [
            "Use nomes claros para as colunas (ex: 'idade', 'salario', 'vendas')",
            "Remova linhas vazias ou com dados incompletos",
            "Uma coluna deve ser o que você quer prever (variável alvo)"
          ],
          exemplo: "exemplo: idade,salario,experiencia,aprovado\n25,3000,2,sim\n30,5000,5,sim\n22,2000,1,nao"
        },
        {
          titulo: "Carregar arquivo CSV",
          conteudo: "Clique em 'Carregar CSV' e selecione seu arquivo",
          dicas: [
            "Arquivos até 5MB são aceitos",
            "Formato deve ser .csv com vírgulas separando os valores",
            "A primeira linha deve conter os nomes das colunas"
          ],
          exemplo: "💡 Dica: Se não tem dados, use nosso arquivo de exemplo disponível no site"
        },
        {
          titulo: "Configurar análise",
          conteudo: "Escolha qual coluna quer prever e configure parâmetros",
          dicas: [
            "Selecione a 'variável alvo' (o que quer prever)",
            "Escolha o tipo de problema: classificação ou regressão",
            "Ajuste a porcentagem de dados para treino (recomendado: 80%)"
          ],
          exemplo: "Exemplo: Se quer prever 'aprovado', selecione essa coluna como alvo"
        },
        {
          titulo: "Executar AutoML",
          conteudo: "Clique em 'Executar AutoML' e aguarde os resultados",
          dicas: [
            "O processo pode levar alguns segundos",
            "Vários algoritmos são testados automaticamente",
            "O melhor modelo é selecionado pela precisão"
          ],
          exemplo: "⏱️ Tempo estimado: 10-30 segundos dependendo do tamanho dos dados"
        },
        {
          titulo: "Analisar resultados",
          conteudo: "Veja a precisão do modelo e as predições",
          dicas: [
            "Precisão acima de 80% é considerada boa",
            "Veja quais variáveis são mais importantes",
            "Teste o modelo com novos dados"
          ],
          exemplo: "🎯 Meta: Entender quais fatores mais influenciam suas predições"
        }
      ]
    },
    {
      titulo: "🔍 Como usar análise CBA",
      descricao: "Descubra regras 'SE...ENTÃO' nos seus dados",
      etapas: [
        {
          titulo: "Entender regras CBA",
          conteudo: "CBA encontra padrões do tipo 'SE idade=jovem ENTÃO compra=sim'",
          dicas: [
            "Funciona melhor com dados categóricos (ex: alto/médio/baixo)",
            "Descobre associações entre variáveis",
            "Útil para entender comportamentos e padrões"
          ],
          exemplo: "Exemplo de regra: 'SE renda=alta E idade=jovem ENTÃO compra_online=sim'"
        },
        {
          titulo: "Preparar dados categóricos",
          conteudo: "Seus dados devem ter valores como 'alto/médio/baixo' ao invés de números",
          dicas: [
            "Converta números em categorias (ex: salário > 5000 = 'alto')",
            "Use valores descritivos (ex: 'jovem/adulto/idoso')",
            "Evite muitas categorias únicas (máximo 10 por coluna)"
          ],
          exemplo: "idade,renda,regiao,compra\njovem,alta,norte,sim\nadulto,media,sul,nao"
        },
        {
          titulo: "Carregar e executar",
          conteudo: "Carregue o CSV e clique em 'Descobrir Regras CBA'",
          dicas: [
            "Mínimo 20 registros para regras confiáveis",
            "Mais dados = regras mais precisas",
            "O algoritmo testa todas as combinações possíveis"
          ],
          exemplo: "⚡ Processo automático: o sistema faz toda a análise para você"
        },
        {
          titulo: "Interpretar regras",
          conteudo: "Analise as regras descobertas e suas métricas",
          dicas: [
            "Suporte: frequência da regra nos dados",
            "Confiança: precisão da regra (% de acertos)",
            "Lift: força da associação (>1 = associação positiva)"
          ],
          exemplo: "Regra forte: Suporte > 10%, Confiança > 80%, Lift > 2"
        }
      ]
    },
    {
      titulo: "📊 Como criar visualizações",
      descricao: "Gere gráficos funcionais dos seus dados",
      etapas: [
        {
          titulo: "Escolher tipo de gráfico",
          conteudo: "Selecione o gráfico adequado para seus dados",
          dicas: [
            "Barras: comparar categorias",
            "Linha: mostrar tendências ao longo do tempo",
            "Pizza: mostrar proporções",
            "Histograma: distribuição de valores"
          ],
          exemplo: "💡 Vendas por mês = linha | Vendas por região = barras"
        },
        {
          titulo: "Carregar dados CSV",
          conteudo: "Upload do arquivo com os dados para visualizar",
          dicas: [
            "Dados numéricos para eixo Y (valores)",
            "Dados categóricos para eixo X (categorias)",
            "Primeira linha deve ter nomes das colunas"
          ],
          exemplo: "mes,vendas\njan,1000\nfev,1200\nmar,1100"
        },
        {
          titulo: "Gerar gráfico",
          conteudo: "O sistema cria automaticamente o gráfico mais adequado",
          dicas: [
            "Gráfico é atualizado automaticamente",
            "Dados são processados e analisados",
            "Valores são calculados e formatados"
          ],
          exemplo: "🎨 Gráfico interativo criado em segundos"
        }
      ]
    }
  ];

  const [tutorialSelecionado, setTutorialSelecionado] = useState(0);

  const marcarEtapaCompleta = (etapa: number) => {
    if (!etapasCompletas.includes(etapa)) {
      setEtapasCompletas([...etapasCompletas, etapa]);
    }
    
    if (etapa < tutorials[tutorialSelecionado].etapas.length - 1) {
      setEtapaAtual(etapa + 1);
    }
  };

  const reiniciarTutorial = () => {
    setEtapaAtual(0);
    setEtapasCompletas([]);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          🎓 Tutoriais Interativos
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Aprenda a usar cada ferramenta passo a passo
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Seleção de Tutorial */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📚 Escolha um Tutorial
              </Typography>
              
              {tutorials.map((tutorial, index) => (
                <Paper 
                  key={index}
                  sx={{ 
                    p: 2, 
                    mb: 2, 
                    cursor: 'pointer',
                    backgroundColor: tutorialSelecionado === index ? 'primary.light' : 'grey.50',
                    '&:hover': { backgroundColor: 'grey.100' }
                  }}
                  onClick={() => {
                    setTutorialSelecionado(index);
                    reiniciarTutorial();
                  }}
                >
                  <Typography variant="h6" color={tutorialSelecionado === index ? 'white' : 'text.primary'}>
                    {tutorial.titulo}
                  </Typography>
                  <Typography variant="body2" color={tutorialSelecionado === index ? 'white' : 'text.secondary'}>
                    {tutorial.descricao}
                  </Typography>
                </Paper>
              ))}

              <Alert severity="info" sx={{ mt: 2 }}>
                💡 <strong>Dica:</strong> Complete cada etapa para liberar a próxima!
              </Alert>
            </CardContent>
          </Card>

          {/* Progresso */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📈 Seu Progresso
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  {etapasCompletas.length} de {tutorials[tutorialSelecionado].etapas.length} etapas
                </Typography>
                <Box sx={{ 
                  width: '100%', 
                  height: 8, 
                  backgroundColor: 'grey.200', 
                  borderRadius: 1,
                  mt: 1
                }}>
                  <Box sx={{ 
                    width: `${(etapasCompletas.length / tutorials[tutorialSelecionado].etapas.length) * 100}%`,
                    height: '100%',
                    backgroundColor: 'success.main',
                    borderRadius: 1
                  }} />
                </Box>
              </Box>

              {etapasCompletas.length === tutorials[tutorialSelecionado].etapas.length && (
                <Alert severity="success">
                  🎉 <strong>Parabéns!</strong> Tutorial completo!
                </Alert>
              )}

              <Button
                fullWidth
                variant="outlined"
                onClick={reiniciarTutorial}
                sx={{ mt: 2 }}
              >
                🔄 Reiniciar Tutorial
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Conteúdo do Tutorial */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ flexGrow: 1 }}>
                  {tutorials[tutorialSelecionado].titulo}
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<School />}
                  size="small"
                >
                  Modo Tutorial
                </Button>
              </Box>

              <Stepper activeStep={etapaAtual} orientation="vertical">
                {tutorials[tutorialSelecionado].etapas.map((etapa, index) => (
                  <Step key={index}>
                    <StepLabel 
                      icon={etapasCompletas.includes(index) ? <CheckCircle color="success" /> : undefined}
                    >
                      <Typography variant="h6">
                        {etapa.titulo}
                      </Typography>
                    </StepLabel>
                    <StepContent>
                      <Box sx={{ pb: 2 }}>
                        <Typography variant="body1" paragraph>
                          {etapa.conteudo}
                        </Typography>

                        {/* Dicas */}
                        <Accordion>
                          <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography variant="subtitle2">
                              💡 Dicas importantes
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <List dense>
                              {etapa.dicas.map((dica, dIndex) => (
                                <ListItem key={dIndex}>
                                  <ListItemIcon>
                                    <TrendingUp color="primary" />
                                  </ListItemIcon>
                                  <ListItemText primary={dica} />
                                </ListItem>
                              ))}
                            </List>
                          </AccordionDetails>
                        </Accordion>

                        {/* Exemplo */}
                        <Paper sx={{ p: 2, mt: 2, backgroundColor: 'grey.50' }}>
                          <Typography variant="subtitle2" gutterBottom>
                            📝 Exemplo prático:
                          </Typography>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-line' }}>
                            {etapa.exemplo}
                          </Typography>
                        </Paper>

                        <Box sx={{ mt: 2 }}>
                          <Button
                            variant="contained"
                            onClick={() => marcarEtapaCompleta(index)}
                            startIcon={etapasCompletas.includes(index) ? <CheckCircle /> : <PlayArrow />}
                            disabled={index > 0 && !etapasCompletas.includes(index - 1) && index !== etapaAtual}
                          >
                            {etapasCompletas.includes(index) ? 'Concluída!' : 'Marcar como Concluída'}
                          </Button>
                          
                          {index < tutorials[tutorialSelecionado].etapas.length - 1 && etapasCompletas.includes(index) && (
                            <Button
                              variant="outlined"
                              onClick={() => setEtapaAtual(index + 1)}
                              sx={{ ml: 1 }}
                            >
                              Próxima Etapa
                            </Button>
                          )}
                        </Box>
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>

              {etapasCompletas.length === tutorials[tutorialSelecionado].etapas.length && (
                <Box sx={{ mt: 4, p: 3, backgroundColor: 'success.light', borderRadius: 2 }}>
                  <Typography variant="h6" color="white" gutterBottom>
                    🎊 Tutorial Concluído!
                  </Typography>
                  <Typography variant="body1" color="white" paragraph>
                    Parabéns! Você dominou {tutorials[tutorialSelecionado].titulo}. 
                    Agora você pode usar essa ferramenta com confiança.
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      const proximoTutorial = (tutorialSelecionado + 1) % tutorials.length;
                      setTutorialSelecionado(proximoTutorial);
                      reiniciarTutorial();
                    }}
                  >
                    📚 Próximo Tutorial
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TutorialInterativo;