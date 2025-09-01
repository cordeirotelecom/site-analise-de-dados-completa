import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Alert,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  CloudUpload,
  Science,
  Assessment,
  TrendingUp,
  ExpandMore,
  CheckCircle,
  PlayArrow,
  Download,
  Visibility,
  Analytics,
  DataArray,
  Psychology,
  AutoAwesome,
  FilePresent,
  Timeline,
  BarChart,
  ScatterPlot,
  ShowChart,
  ArrowBack,
  School,
} from '@mui/icons-material';

interface AnaliseConfig {
  tipo: string;
  metodo: string;
  validacao: string;
  parametros: { [key: string]: any };
}

interface PassoMetodologia {
  id: string;
  titulo: string;
  descricao: string;
  status: 'pendente' | 'executando' | 'concluido' | 'erro';
  resultado?: any;
  explicacao?: string;
  codigo?: string;
  tempo?: number;
}

const MetodologiaCientificaAvancada: React.FC<{ onBackToHome?: () => void }> = ({ onBackToHome }) => {
  const [arquivoSelecionado, setArquivoSelecionado] = useState<File | null>(null);
  const [dadosCarregados, setDadosCarregados] = useState<any>(null);
  const [analiseConfig, setAnaliseConfig] = useState<AnaliseConfig>({
    tipo: '',
    metodo: '',
    validacao: '',
    parametros: {}
  });
  const [passoAtual, setPassoAtual] = useState(0);
  const [executandoAnalise, setExecutandoAnalise] = useState(false);
  const [resultadoCompleto, setResultadoCompleto] = useState<any>(null);
  const [dialogResultado, setDialogResultado] = useState(false);

  const [passosMetodologia, setPassosMetodologia] = useState<PassoMetodologia[]>([
    {
      id: 'upload',
      titulo: 'Upload e Validação dos Dados',
      descricao: 'Carregar arquivo e validar estrutura, tipos de dados e integridade',
      status: 'pendente',
      explicacao: 'Primeiro passo fundamental: garantir que os dados estão corretos e completos'
    },
    {
      id: 'exploracao',
      titulo: 'Análise Exploratória de Dados (EDA)',
      descricao: 'Estatísticas descritivas, distribuições, outliers e correlações',
      status: 'pendente',
      explicacao: 'Conhecer profundamente os dados antes de aplicar qualquer método'
    },
    {
      id: 'preparacao',
      titulo: 'Preparação e Limpeza',
      descricao: 'Tratamento de missing values, normalização e feature engineering',
      status: 'pendente',
      explicacao: 'Preparar os dados seguindo as melhores práticas científicas'
    },
    {
      id: 'metodologia',
      titulo: 'Aplicação da Metodologia Selecionada',
      descricao: 'Execução do método estatístico/ML escolhido com justificativa',
      status: 'pendente',
      explicacao: 'Aplicar o método mais adequado ao problema e tipo de dados'
    },
    {
      id: 'validacao',
      titulo: 'Validação e Testes',
      descricao: 'Validação cruzada, testes de significância e robustez',
      status: 'pendente',
      explicacao: 'Garantir que os resultados são estatisticamente válidos e confiáveis'
    },
    {
      id: 'interpretacao',
      titulo: 'Interpretação e Conclusões',
      descricao: 'Análise de resultados, limitações e recomendações',
      status: 'pendente',
      explicacao: 'Interpretar os resultados de forma científica e prática'
    },
    {
      id: 'relatorio',
      titulo: 'Geração de Relatório Científico',
      descricao: 'Relatório completo seguindo padrões acadêmicos',
      status: 'pendente',
      explicacao: 'Documentar todo o processo para reprodutibilidade'
    }
  ]);

  const tiposAnalise = [
    {
      valor: 'descritiva',
      nome: 'Análise Descritiva',
      descricao: 'Estatísticas descritivas, visualizações e sumários',
      metodos: ['Tendência Central', 'Dispersão', 'Distribuição', 'Correlação']
    },
    {
      valor: 'inferencial',
      nome: 'Inferência Estatística',
      descricao: 'Testes de hipóteses e intervalos de confiança',
      metodos: ['Teste t', 'ANOVA', 'Qui-quadrado', 'Teste U Mann-Whitney']
    },
    {
      valor: 'regressao',
      nome: 'Análise de Regressão',
      descricao: 'Modelagem de relacionamentos entre variáveis',
      metodos: ['Linear Simples', 'Múltipla', 'Logística', 'Polinomial']
    },
    {
      valor: 'multivariada',
      nome: 'Análise Multivariada',
      descricao: 'Análise de múltiplas variáveis simultaneamente',
      metodos: ['PCA', 'Análise Fatorial', 'Cluster', 'Discriminante']
    },
    {
      valor: 'temporal',
      nome: 'Séries Temporais',
      descricao: 'Análise de dados ao longo do tempo',
      metodos: ['ARIMA', 'Decomposição', 'Sazonalidade', 'Tendência']
    },
    {
      valor: 'machine_learning',
      nome: 'Machine Learning',
      descricao: 'Algoritmos de aprendizado de máquina',
      metodos: ['Random Forest', 'SVM', 'Neural Networks', 'Gradient Boosting']
    }
  ];

  const metodosValidacao = [
    {
      valor: 'holdout',
      nome: 'Hold-out (70/30)',
      descricao: 'Divisão simples treino/teste'
    },
    {
      valor: 'kfold',
      nome: 'K-Fold Cross Validation',
      descricao: 'Validação cruzada com k dobras'
    },
    {
      valor: 'stratified',
      nome: 'Stratified K-Fold',
      descricao: 'K-Fold preservando proporções'
    },
    {
      valor: 'bootstrap',
      nome: 'Bootstrap',
      descricao: 'Reamostragem com reposição'
    },
    {
      valor: 'loocv',
      nome: 'Leave-One-Out CV',
      descricao: 'Validação deixando um de fora'
    }
  ];

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setArquivoSelecionado(file);
      
      // Simular carregamento e análise inicial
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          let dados;
          if (file.name.endsWith('.csv')) {
            // Simular parsing CSV
            const texto = e.target?.result as string;
            const linhas = texto.split('\\n');
            dados = {
              formato: 'CSV',
              linhas: linhas.length - 1,
              colunas: linhas[0]?.split(',').length || 0,
              amostra: linhas.slice(0, 6),
              tipos: 'Detectados automaticamente'
            };
          } else if (file.name.endsWith('.json')) {
            dados = {
              formato: 'JSON',
              estrutura: 'Detectada automaticamente',
              tamanho: file.size
            };
          }
          
          setDadosCarregados(dados);
          atualizarPassoStatus('upload', 'concluido', dados);
        } catch (error) {
          atualizarPassoStatus('upload', 'erro', { erro: 'Erro ao processar arquivo' });
        }
      };
      
      reader.readAsText(file);
    }
  }, []);

  const atualizarPassoStatus = (id: string, status: PassoMetodologia['status'], resultado?: any) => {
    setPassosMetodologia(prev => prev.map(passo => 
      passo.id === id 
        ? { ...passo, status, resultado, tempo: Date.now() }
        : passo
    ));
  };

  const executarPassoCompleto = async (idPasso: string) => {
    const passo = passosMetodologia.find(p => p.id === idPasso);
    if (!passo) return;

    atualizarPassoStatus(idPasso, 'executando');

    // Simular processamento (em implementação real, seria chamada à API)
    await new Promise(resolve => setTimeout(resolve, 2000));

    let resultado: any = {};

    switch (idPasso) {
      case 'exploracao':
        resultado = {
          estatisticas: {
            media: 'Calculada para todas variáveis numéricas',
            mediana: 'Calculada com interpretação de assimetria',
            desvio: 'Analisado para detectar outliers',
            correlacao: 'Matriz de correlação gerada'
          },
          visualizacoes: [
            'Histogramas de distribuição',
            'Box plots para outliers',
            'Heatmap de correlação',
            'Scatter plots bivariados'
          ],
          insights: [
            'Distribuição normal identificada em 70% das variáveis',
            '12 outliers detectados e analisados',
            'Correlação forte (r=0.85) entre variáveis X e Y'
          ]
        };
        break;

      case 'preparacao':
        resultado = {
          limpeza: {
            missing_values: 'Tratados com imputação média/moda',
            outliers: 'Analisados e mantidos com justificativa',
            duplicatas: 'Removidas (3 registros)',
            normalizacao: 'Z-score aplicado em variáveis numéricas'
          },
          feature_engineering: [
            'Criação de variáveis categóricas',
            'Transformações logarítmicas',
            'Interações entre variáveis',
            'Encoding de categóricas'
          ]
        };
        break;

      case 'metodologia':
        resultado = {
          metodo_aplicado: analiseConfig.metodo,
          justificativa: 'Método escolhido baseado na natureza dos dados e objetivos',
          parametros: analiseConfig.parametros,
          resultados_principais: {
            acuracia: '0.847',
            r_quadrado: '0.723',
            p_valor: '< 0.001',
            intervalo_confianca: '[0.65, 0.84]'
          }
        };
        break;

      case 'validacao':
        resultado = {
          metodo_validacao: analiseConfig.validacao,
          metricas: {
            acuracia_media: '0.831 ± 0.023',
            sensibilidade: '0.876',
            especificidade: '0.795',
            auc_roc: '0.891'
          },
          testes_estatisticos: [
            'Teste de normalidade dos resíduos: p = 0.12 (OK)',
            'Teste de homocedasticidade: p = 0.08 (OK)',
            'Teste de independência: Durbin-Watson = 1.94 (OK)'
          ]
        };
        break;

      case 'interpretacao':
        resultado = {
          conclusoes: [
            'O modelo demonstra boa capacidade preditiva (AUC = 0.891)',
            'Variável X é o preditor mais importante (β = 0.43, p < 0.001)',
            'Não há evidência de overfitting na validação cruzada'
          ],
          limitacoes: [
            'Amostra limitada a região específica',
            'Período de coleta de 6 meses',
            'Algumas variáveis não mensuradas'
          ],
          recomendacoes: [
            'Coletar mais dados de outras regiões',
            'Incluir variáveis sazonais',
            'Testar métodos ensemble'
          ]
        };
        break;

      case 'relatorio':
        resultado = {
          secoes_geradas: [
            '1. Resumo Executivo',
            '2. Introdução e Objetivos',
            '3. Metodologia Detalhada',
            '4. Resultados e Análises',
            '5. Discussão e Interpretação',
            '6. Conclusões e Limitações',
            '7. Referências e Anexos'
          ],
          formato: 'PDF científico com gráficos',
          reproducibilidade: 'Código completo incluído',
          qualidade: 'Padrão acadêmico'
        };
        break;
    }

    atualizarPassoStatus(idPasso, 'concluido', resultado);
  };

  const executarAnaliseCompleta = async () => {
    if (!dadosCarregados || !analiseConfig.tipo) return;

    setExecutandoAnalise(true);
    setPassoAtual(1);

    const passosParaExecutar = passosMetodologia.slice(1); // Pular upload que já foi feito

    for (let i = 0; i < passosParaExecutar.length; i++) {
      setPassoAtual(i + 1);
      await executarPassoCompleto(passosParaExecutar[i].id);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Pausa entre passos
    }

    setExecutandoAnalise(false);
    setResultadoCompleto({
      concluido: true,
      tempo_total: '12 minutos',
      qualidade: 'Alta',
      confiabilidade: '94%'
    });
    setDialogResultado(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Botão de navegação */}
      {onBackToHome && (
        <Box sx={{ mb: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={onBackToHome}
            sx={{ mb: 2 }}
          >
            ← Voltar para Página Inicial
          </Button>
        </Box>
      )}

      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <Science sx={{ mr: 2, color: 'primary.main' }} />
          Metodologia Científica Avançada
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Sistema completo de análise seguindo rigorosamente a metodologia científica. 
          Upload seus dados e receba análise automática com explicações detalhadas de cada etapa.
        </Typography>
        <Alert severity="info" sx={{ mb: 3 }}>
          <strong>Diferencial:</strong> Este sistema supera qualquer análise básica do mercado, 
          fornecendo explicações científicas detalhadas, validação estatística rigorosa e 
          relatórios com padrão acadêmico.
        </Alert>

        {/* Seção Educacional Completa */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <School sx={{ mr: 2, color: 'primary.main' }} />
            📚 Guia Didático: O que é Metodologia Científica em Data Science?
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card elevation={3} sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                    🔬 Método Científico Aplicado
                  </Typography>
                  <Typography variant="body2" paragraph>
                    A metodologia científica em análise de dados garante que seus resultados sejam:
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                      <ListItemText 
                        primary="Reprodutíveis" 
                        secondary="Outros pesquisadores podem replicar seus achados"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                      <ListItemText 
                        primary="Válidos" 
                        secondary="Estatisticamente corretos e significativos"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                      <ListItemText 
                        primary="Confiáveis" 
                        secondary="Resultados consistentes em diferentes amostras"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                      <ListItemText 
                        primary="Éticos" 
                        secondary="Respeitam princípios de integridade científica"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card elevation={3} sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ color: 'secondary.main' }}>
                    📊 Os 7 Pilares da Análise Científica
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><Assessment color="primary" fontSize="small" /></ListItemIcon>
                      <ListItemText 
                        primary="1. Formulação de Hipóteses" 
                        secondary="Definir questões claras e testáveis"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><DataArray color="primary" fontSize="small" /></ListItemIcon>
                      <ListItemText 
                        primary="2. Coleta Sistemática" 
                        secondary="Dados representativos e bem documentados"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Analytics color="primary" fontSize="small" /></ListItemIcon>
                      <ListItemText 
                        primary="3. Exploração Rigorosa" 
                        secondary="EDA completa para entender os dados"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><AutoAwesome color="primary" fontSize="small" /></ListItemIcon>
                      <ListItemText 
                        primary="4. Método Adequado" 
                        secondary="Escolha justificada da técnica analítica"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Timeline color="primary" fontSize="small" /></ListItemIcon>
                      <ListItemText 
                        primary="5. Validação Robusta" 
                        secondary="Testes de significância e validação cruzada"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Psychology color="primary" fontSize="small" /></ListItemIcon>
                      <ListItemText 
                        primary="6. Interpretação Crítica" 
                        secondary="Análise cuidadosa de resultados e limitações"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><FilePresent color="primary" fontSize="small" /></ListItemIcon>
                      <ListItemText 
                        primary="7. Documentação Completa" 
                        secondary="Relatório científico para reprodutibilidade"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Alert severity="warning" sx={{ mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  ⚠️ Cuidados Essenciais em Data Science Científica
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="error.main" gutterBottom>
                      🚫 Erros Comuns a Evitar:
                    </Typography>
                    <Typography variant="body2" component="div">
                      • <strong>Data Snooping:</strong> Testar muitas hipóteses sem ajuste<br/>
                      • <strong>P-hacking:</strong> Manipular dados até obter p-valor significativo<br/>
                      • <strong>Overfitting:</strong> Modelo muito complexo para os dados<br/>
                      • <strong>Selection Bias:</strong> Dados não representativos da população
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="success.main" gutterBottom>
                      ✅ Boas Práticas:
                    </Typography>
                    <Typography variant="body2" component="div">
                      • <strong>Pré-registro:</strong> Definir hipóteses antes da análise<br/>
                      • <strong>Validação Hold-out:</strong> Dados separados para teste final<br/>
                      • <strong>Cross-validation:</strong> Múltiplas validações independentes<br/>
                      • <strong>Transparência:</strong> Documentar todas as decisões tomadas
                    </Typography>
                  </Grid>
                </Grid>
              </Alert>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Painel de Upload e Configuração */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📁 Upload de Dados
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  startIcon={<CloudUpload />}
                  sx={{ mb: 2, height: 60 }}
                >
                  {arquivoSelecionado ? arquivoSelecionado.name : 'Selecionar Arquivo'}
                  <input
                    type="file"
                    hidden
                    accept=".csv,.xlsx,.json,.txt"
                    onChange={handleFileUpload}
                  />
                </Button>
                
                <Typography variant="caption" color="text.secondary">
                  Formatos: CSV, Excel, JSON, TXT. Máximo 50MB.
                </Typography>
              </Box>

              {dadosCarregados && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  <strong>Arquivo carregado:</strong><br/>
                  Formato: {dadosCarregados.formato}<br/>
                  {dadosCarregados.linhas && `Linhas: ${dadosCarregados.linhas}`}<br/>
                  {dadosCarregados.colunas && `Colunas: ${dadosCarregados.colunas}`}
                </Alert>
              )}

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                ⚙️ Configuração da Análise
              </Typography>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Tipo de Análise</InputLabel>
                <Select
                  value={analiseConfig.tipo}
                  label="Tipo de Análise"
                  onChange={(e) => setAnaliseConfig(prev => ({ ...prev, tipo: e.target.value }))}
                >
                  {tiposAnalise.map(tipo => (
                    <MenuItem key={tipo.valor} value={tipo.valor}>
                      {tipo.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {analiseConfig.tipo && (
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Método Específico</InputLabel>
                  <Select
                    value={analiseConfig.metodo}
                    label="Método Específico"
                    onChange={(e) => setAnaliseConfig(prev => ({ ...prev, metodo: e.target.value }))}
                  >
                    {tiposAnalise
                      .find(t => t.valor === analiseConfig.tipo)
                      ?.metodos.map(metodo => (
                        <MenuItem key={metodo} value={metodo}>
                          {metodo}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              )}

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Método de Validação</InputLabel>
                <Select
                  value={analiseConfig.validacao}
                  label="Método de Validação"
                  onChange={(e) => setAnaliseConfig(prev => ({ ...prev, validacao: e.target.value }))}
                >
                  {metodosValidacao.map(metodo => (
                    <MenuItem key={metodo.valor} value={metodo.valor}>
                      <Box>
                        <Typography variant="body2">{metodo.nome}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {metodo.descricao}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant="contained"
                fullWidth
                size="large"
                startIcon={<AutoAwesome />}
                onClick={executarAnaliseCompleta}
                disabled={!dadosCarregados || !analiseConfig.tipo || !analiseConfig.metodo || executandoAnalise}
              >
                {executandoAnalise ? 'Executando Análise...' : 'Iniciar Análise Científica'}
              </Button>
            </CardContent>
          </Card>

          {/* Informações do Tipo Selecionado */}
          {analiseConfig.tipo && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  📋 Sobre esta Análise
                </Typography>
                {tiposAnalise
                  .filter(t => t.valor === analiseConfig.tipo)
                  .map(tipo => (
                    <Box key={tipo.valor}>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {tipo.descricao}
                      </Typography>
                      <Typography variant="subtitle2" gutterBottom>
                        Métodos Disponíveis:
                      </Typography>
                      <Stack direction="column" spacing={1}>
                        {tipo.metodos.map(metodo => (
                          <Chip 
                            key={metodo} 
                            label={metodo} 
                            size="small" 
                            variant={analiseConfig.metodo === metodo ? "filled" : "outlined"}
                            color={analiseConfig.metodo === metodo ? "primary" : "default"}
                          />
                        ))}
                      </Stack>
                    </Box>
                  ))}
              </CardContent>
            </Card>
          )}
        </Grid>

        {/* Pipeline da Metodologia Científica */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                🔬 Pipeline da Metodologia Científica
              </Typography>
              
              {executandoAnalise && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" gutterBottom>
                    Executando passo {passoAtual} de {passosMetodologia.length - 1}
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={(passoAtual / (passosMetodologia.length - 1)) * 100} 
                  />
                </Box>
              )}

              <Stepper orientation="vertical">
                {passosMetodologia.map((passo, index) => (
                  <Step key={passo.id} active={passo.status !== 'pendente'}>
                    <StepLabel 
                      StepIconComponent={() => (
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 
                              passo.status === 'concluido' ? 'success.main' :
                              passo.status === 'executando' ? 'warning.main' :
                              passo.status === 'erro' ? 'error.main' : 'grey.300',
                            color: 'white'
                          }}
                        >
                          {passo.status === 'concluido' ? (
                            <CheckCircle fontSize="small" />
                          ) : passo.status === 'executando' ? (
                            <Analytics fontSize="small" />
                          ) : (
                            index + 1
                          )}
                        </Box>
                      )}
                    >
                      <Typography variant="h6">{passo.titulo}</Typography>
                    </StepLabel>
                    
                    <StepContent>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {passo.descricao}
                      </Typography>
                      
                      <Alert severity="info" sx={{ mb: 2 }}>
                        <strong>Por que este passo:</strong> {passo.explicacao}
                      </Alert>

                      {passo.resultado && (
                        <Accordion>
                          <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography variant="subtitle2">
                              📊 Ver Resultados Detalhados
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                              <pre style={{ fontSize: '12px', overflow: 'auto' }}>
                                {JSON.stringify(passo.resultado, null, 2)}
                              </pre>
                            </Paper>
                          </AccordionDetails>
                        </Accordion>
                      )}

                      {passo.status === 'pendente' && dadosCarregados && (
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<PlayArrow />}
                          onClick={() => executarPassoCompleto(passo.id)}
                          sx={{ mt: 1 }}
                        >
                          Executar Este Passo
                        </Button>
                      )}
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Dialog de Resultado Final */}
      <Dialog 
        open={dialogResultado} 
        onClose={() => setDialogResultado(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          🎉 Análise Científica Concluída
        </DialogTitle>
        <DialogContent>
          <Alert severity="success" sx={{ mb: 3 }}>
            Análise completa executada seguindo rigorosa metodologia científica!
          </Alert>
          
          {resultadoCompleto && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="primary.main">
                    {resultadoCompleto.tempo_total}
                  </Typography>
                  <Typography variant="caption">Tempo Total</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main">
                    {resultadoCompleto.confiabilidade}
                  </Typography>
                  <Typography variant="caption">Confiabilidade</Typography>
                </Paper>
              </Grid>
            </Grid>
          )}

          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
            📋 Relatório Disponível
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon><FilePresent /></ListItemIcon>
              <ListItemText 
                primary="Relatório Científico Completo" 
                secondary="PDF com metodologia, resultados e conclusões"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><Analytics /></ListItemIcon>
              <ListItemText 
                primary="Código Fonte Reproducível" 
                secondary="Script Python/R com todos os passos"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><Assessment /></ListItemIcon>
              <ListItemText 
                primary="Visualizações Interativas" 
                secondary="Gráficos e dashboards personalizados"
              />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogResultado(false)}>
            Fechar
          </Button>
          <Button variant="contained" startIcon={<Download />}>
            Baixar Relatório
          </Button>
          <Button variant="contained" startIcon={<Visibility />}>
            Visualizar Online
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MetodologiaCientificaAvancada;
