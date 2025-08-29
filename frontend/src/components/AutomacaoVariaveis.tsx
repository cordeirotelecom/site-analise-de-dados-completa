import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Alert,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import {
  ExpandMore,
  AutoFixHigh,
  Functions,
  TrendingUp,
  Assessment,
  PlayArrow,
  CheckCircle,
  Settings,
  DataObject,
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
      id={`automation-tabpanel-${index}`}
      aria-labelledby={`automation-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const AutomacaoVariaveis: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [tipoVariavel, setTipoVariavel] = useState('');

  // Tipos de variáveis automáticas que podem ser criadas
  const tiposVariaveis = [
    {
      id: 'complementares',
      nome: 'Variáveis Complementares',
      descricao: 'Criar variáveis inversas ou complementares (ex: secura = 100 - umidade)',
      exemplos: [
        'Secura (100 - umidade)',
        'Frio (temperatura_máxima - temperatura)',
        'Déficit hídrico (precipitação_ideal - precipitação)',
        'Velocidade baixa (velocidade_máxima - velocidade_vento)',
        'Pressão baixa (pressão_padrão - pressão_atmosférica)'
      ],
      codigo: `
def criar_variaveis_complementares(dados):
    """Criar variáveis complementares automaticamente"""
    novas_variaveis = {}
    
    for coluna in dados.columns:
        coluna_lower = coluna.lower()
        
        # Umidade -> Secura
        if 'umidade' in coluna_lower:
            nome_nova = f"secura_{coluna}"
            novas_variaveis[nome_nova] = 100 - dados[coluna]
            
        # Temperatura -> Índice de frio
        elif 'temperatura' in coluna_lower and 'max' in coluna_lower:
            nome_nova = f"frio_{coluna}"
            # Frio = temperatura máxima possível - temperatura atual
            temp_max = dados[coluna].max()
            novas_variaveis[nome_nova] = temp_max - dados[coluna]
            
        # Precipitação -> Déficit hídrico
        elif 'precipitacao' in coluna_lower or 'chuva' in coluna_lower:
            nome_nova = f"deficit_hidrico_{coluna}"
            # Assumir 100mm como precipitação ideal
            novas_variaveis[nome_nova] = 100 - dados[coluna]
            
        # Velocidade vento -> Calmaria
        elif 'vento' in coluna_lower and 'velocidade' in coluna_lower:
            nome_nova = f"calmaria_{coluna}"
            vel_max = dados[coluna].max()
            novas_variaveis[nome_nova] = vel_max - dados[coluna]
            
        # Pressão -> Baixa pressão
        elif 'pressao' in coluna_lower:
            nome_nova = f"baixa_pressao_{coluna}"
            # 1013 hPa como pressão padrão ao nível do mar
            novas_variaveis[nome_nova] = 1013 - dados[coluna]
    
    # Adicionar as novas variáveis ao DataFrame
    for nome, serie in novas_variaveis.items():
        dados[nome] = serie
        print(f"✅ Criada: {nome}")
    
    return dados, list(novas_variaveis.keys())
      `
    },
    {
      id: 'temporais',
      nome: 'Variáveis Temporais (Lags)',
      descricao: 'Criar variáveis de defasagem temporal para análise de séries',
      exemplos: [
        'temperatura_lag1 (valor de ontem)',
        'umidade_lag2 (valor de anteontem)',
        'precipitacao_lag7 (valor de 7 dias atrás)',
        'media_movel_3_temperatura',
        'tendencia_7_dias_umidade'
      ],
      codigo: `
def criar_variaveis_temporais(dados, max_lag=7):
    """Criar variáveis temporais (lags) automaticamente"""
    novas_variaveis = {}
    colunas_numericas = dados.select_dtypes(include=['number']).columns
    
    for coluna in colunas_numericas:
        # Criar lags de 1 a max_lag dias
        for lag in range(1, max_lag + 1):
            nome_lag = f"{coluna}_lag{lag}"
            novas_variaveis[nome_lag] = dados[coluna].shift(lag)
            
        # Criar médias móveis
        for janela in [3, 7, 15]:
            if len(dados) >= janela:
                nome_media = f"media_movel_{janela}_{coluna}"
                novas_variaveis[nome_media] = dados[coluna].rolling(window=janela).mean()
                
        # Criar tendência (diferença entre hoje e média dos últimos N dias)
        for periodo in [3, 7]:
            if len(dados) >= periodo:
                nome_tendencia = f"tendencia_{periodo}_{coluna}"
                media_periodo = dados[coluna].rolling(window=periodo).mean().shift(1)
                novas_variaveis[nome_tendencia] = dados[coluna] - media_periodo
                
        # Criar variação percentual
        nome_variacao = f"variacao_pct_{coluna}"
        novas_variaveis[nome_variacao] = dados[coluna].pct_change() * 100
    
    # Adicionar as novas variáveis
    for nome, serie in novas_variaveis.items():
        dados[nome] = serie
        valores_validos = serie.notna().sum()
        print(f"✅ Criada: {nome} ({valores_validos} valores válidos)")
    
    return dados, list(novas_variaveis.keys())
      `
    },
    {
      id: 'matematicas',
      nome: 'Transformações Matemáticas',
      descricao: 'Aplicar transformações matemáticas para melhorar relações lineares',
      exemplos: [
        'temperatura_quadrado (relações não-lineares)',
        'umidade_raiz (reduzir assimetria)',
        'log_precipitacao (estabilizar variância)',
        'temperatura_umidade_interacao',
        'indice_calor_combinado'
      ],
      codigo: `
import numpy as np
from scipy import stats

def criar_transformacoes_matematicas(dados):
    """Criar transformações matemáticas automaticamente"""
    novas_variaveis = {}
    colunas_numericas = dados.select_dtypes(include=['number']).columns
    
    for coluna in colunas_numericas:
        serie_limpa = dados[coluna].dropna()
        
        if len(serie_limpa) == 0:
            continue
            
        # 1. Transformação quadrática (para relações em U)
        nome_quad = f"{coluna}_quadrado"
        novas_variaveis[nome_quad] = dados[coluna] ** 2
        
        # 2. Transformação raiz quadrada (para reduzir assimetria positiva)
        if (dados[coluna] >= 0).all():
            nome_sqrt = f"{coluna}_raiz"
            novas_variaveis[nome_sqrt] = np.sqrt(dados[coluna])
            
        # 3. Transformação logarítmica (para dados com grande variação)
        if (dados[coluna] > 0).all():
            nome_log = f"log_{coluna}"
            novas_variaveis[nome_log] = np.log(dados[coluna])
            
        # 4. Padronização Z-score
        nome_zscore = f"{coluna}_zscore"
        novas_variaveis[nome_zscore] = stats.zscore(dados[coluna], nan_policy='omit')
        
        # 5. Normalização Min-Max (0-1)
        nome_norm = f"{coluna}_normalizado"
        min_val = dados[coluna].min()
        max_val = dados[coluna].max()
        if max_val != min_val:
            novas_variaveis[nome_norm] = (dados[coluna] - min_val) / (max_val - min_val)
    
    # Criar interações entre variáveis importantes
    vars_importantes = ['temperatura', 'umidade', 'precipitacao', 'pressao']
    
    for i, var1 in enumerate(colunas_numericas):
        for var2 in colunas_numericas[i+1:]:
            # Apenas criar interações entre variáveis meteorológicas principais
            if any(termo in var1.lower() for termo in vars_importantes) and \\
               any(termo in var2.lower() for termo in vars_importantes):
                
                nome_interacao = f"{var1}_{var2}_interacao"
                novas_variaveis[nome_interacao] = dados[var1] * dados[var2]
    
    # Adicionar as novas variáveis
    for nome, serie in novas_variaveis.items():
        dados[nome] = serie
        print(f"✅ Criada: {nome}")
    
    return dados, list(novas_variaveis.keys())
      `
    },
    {
      id: 'indices',
      nome: 'Índices Compostos',
      descricao: 'Criar índices que combinam múltiplas variáveis',
      exemplos: [
        'Índice de Conforto Térmico',
        'Índice de Estresse Hídrico',
        'Índice de Condições Atmosféricas',
        'Score de Risco Climático',
        'Índice de Variabilidade Meteorológica'
      ],
      codigo: `
def criar_indices_compostos(dados):
    """Criar índices compostos automaticamente"""
    novas_variaveis = {}
    
    # Identificar variáveis disponíveis
    colunas = [col.lower() for col in dados.columns]
    
    # 1. Índice de Conforto Térmico
    temp_cols = [col for col in dados.columns if 'temperatura' in col.lower()]
    umid_cols = [col for col in dados.columns if 'umidade' in col.lower()]
    
    if temp_cols and umid_cols:
        # Usar primeira coluna de cada tipo encontrada
        temp_col = temp_cols[0]
        umid_col = umid_cols[0]
        
        # Fórmula simplificada do Heat Index
        nome_conforto = "indice_conforto_termico"
        T = dados[temp_col]
        H = dados[umid_col]
        
        # Heat Index simplificado
        HI = 0.5 * (T + 61.0 + ((T - 68.0) * 1.2) + (H * 0.094))
        novas_variaveis[nome_conforto] = HI
    
    # 2. Índice de Estresse Hídrico
    precip_cols = [col for col in dados.columns if any(termo in col.lower() 
                   for termo in ['precipitacao', 'chuva', 'pluvio'])]
    
    if precip_cols and umid_cols:
        precip_col = precip_cols[0]
        umid_col = umid_cols[0]
        
        nome_hidrico = "indice_estresse_hidrico"
        # Combinar baixa precipitação com baixa umidade
        precip_norm = (dados[precip_col] - dados[precip_col].min()) / \\
                      (dados[precip_col].max() - dados[precip_col].min())
        umid_norm = dados[umid_col] / 100
        
        # Estresse = 1 - média das duas variáveis normalizadas
        novas_variaveis[nome_hidrico] = 1 - (precip_norm + umid_norm) / 2
    
    # 3. Índice de Pressão Atmosférica
    pressao_cols = [col for col in dados.columns if 'pressao' in col.lower()]
    
    if pressao_cols:
        pressao_col = pressao_cols[0]
        nome_pressao = "indice_pressao_normalizada"
        
        # Normalizar pressão com base no padrão (1013 hPa)
        novas_variaveis[nome_pressao] = dados[pressao_col] / 1013
    
    # 4. Índice de Variabilidade Meteorológica
    if len(dados) > 7:  # Precisa de pelo menos 7 dias de dados
        nome_variabilidade = "indice_variabilidade_meteorologica"
        variabilidades = []
        
        for col in dados.select_dtypes(include=['number']).columns:
            # Calcular coeficiente de variação dos últimos 7 dias
            cv_7_dias = dados[col].rolling(window=7).std() / dados[col].rolling(window=7).mean()
            variabilidades.append(cv_7_dias)
        
        if variabilidades:
            # Média das variabilidades
            variabilidade_media = np.nanmean(variabilidades, axis=0)
            novas_variaveis[nome_variabilidade] = variabilidade_media
    
    # 5. Score de Risco Climático (combinação de extremos)
    if temp_cols and umid_cols and precip_cols:
        nome_risco = "score_risco_climatico"
        
        # Identificar condições extremas
        temp_extrema = np.abs(stats.zscore(dados[temp_cols[0]], nan_policy='omit'))
        umid_extrema = np.abs(stats.zscore(dados[umid_cols[0]], nan_policy='omit'))
        precip_extrema = np.abs(stats.zscore(dados[precip_cols[0]], nan_policy='omit'))
        
        # Score = média dos z-scores absolutos
        novas_variaveis[nome_risco] = (temp_extrema + umid_extrema + precip_extrema) / 3
    
    # Adicionar as novas variáveis
    for nome, serie in novas_variaveis.items():
        dados[nome] = serie
        media = serie.mean()
        std = serie.std()
        print(f"✅ Criado: {nome} (média: {media:.2f}, std: {std:.2f})")
    
    return dados, list(novas_variaveis.keys())
      `
    }
  ];

  const etapasAutomacao = [
    'Análise dos nomes das colunas',
    'Identificação de padrões meteorológicos',
    'Criação automática de variáveis complementares',
    'Geração de lags temporais',
    'Aplicação de transformações matemáticas',
    'Construção de índices compostos',
    'Validação e relatório final'
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
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1f2937', mb: 2 }}>
          🤖 Automação de Criação de Variáveis
        </Typography>
        <Typography variant="body1" sx={{ color: '#6b7280', mb: 3, maxWidth: 1000 }}>
          Sistema inteligente que analisa seus dados e cria automaticamente variáveis derivadas,
          transformações matemáticas e índices compostos baseados em padrões reconhecidos.
        </Typography>
        
        <Alert severity="warning" sx={{ mb: 3 }}>
          <strong>Regra de Ouro da Defesa:</strong> "Se vocês não apresentarem nenhuma variável que criaram,
          eu vou dar paulada!" - Sempre apresente variáveis derivadas em sua pesquisa.
        </Alert>
      </Box>

      {/* Tabs Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
          <Tab label="Tipos de Variáveis" icon={<DataObject />} />
          <Tab label="Configuração" icon={<Settings />} />
          <Tab label="Pipeline Automático" icon={<AutoFixHigh />} />
          <Tab label="Exemplos Práticos" icon={<Assessment />} />
        </Tabs>
      </Box>

      {/* Tab 1: Tipos de Variáveis */}
      <TabPanel value={tabValue} index={0}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          🧠 Tipos de Variáveis Automáticas
        </Typography>
        
        <Grid container spacing={3}>
          {tiposVariaveis.map((tipo, index) => (
            <Grid item xs={12} key={index}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Functions sx={{ mr: 2, color: '#2563eb' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {tipo.nome}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={5}>
                      <Typography variant="body2" sx={{ color: '#6b7280', mb: 3 }}>
                        {tipo.descricao}
                      </Typography>

                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                        💡 Exemplos de Variáveis Criadas:
                      </Typography>
                      <List dense>
                        {tipo.exemplos.map((exemplo, i) => (
                          <ListItem key={i}>
                            <ListItemIcon>
                              <CheckCircle sx={{ fontSize: 16, color: '#10b981' }} />
                            </ListItemIcon>
                            <ListItemText 
                              primary={exemplo}
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>

                    <Grid item xs={12} md={7}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                        💻 Código de Implementação:
                      </Typography>
                      <Paper sx={{ p: 2, backgroundColor: '#1f2937', color: '#f9fafb', overflow: 'auto', maxHeight: 400 }}>
                        <pre style={{ fontSize: '0.7rem', margin: 0, whiteSpace: 'pre-wrap' }}>
                          {tipo.codigo}
                        </pre>
                      </Paper>
                      
                      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                        <Button
                          variant="contained"
                          startIcon={<PlayArrow />}
                          onClick={() => navigator.clipboard.writeText(tipo.codigo)}
                        >
                          Copiar Código
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => setTipoVariavel(tipo.id)}
                        >
                          Usar Template
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Tab 2: Configuração */}
      <TabPanel value={tabValue} index={1}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          ⚙️ Configuração do Sistema Automático
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ border: '1px solid #e5e7eb' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  🎛️ Parâmetros de Automação
                </Typography>
                
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Tipo de Dados</InputLabel>
                  <Select
                    value={tipoVariavel}
                    onChange={(e) => setTipoVariavel(e.target.value)}
                    label="Tipo de Dados"
                  >
                    <MenuItem value="meteorologico">Dados Meteorológicos</MenuItem>
                    <MenuItem value="saude">Dados de Saúde</MenuItem>
                    <MenuItem value="demografico">Dados Demográficos</MenuItem>
                    <MenuItem value="economico">Dados Econômicos</MenuItem>
                    <MenuItem value="generico">Dados Genéricos</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="Máximo de Lags Temporais"
                  type="number"
                  defaultValue={7}
                  sx={{ mb: 3 }}
                  helperText="Número máximo de dias de defasagem a criar"
                />

                <TextField
                  fullWidth
                  label="Limiar de Correlação"
                  type="number"
                  defaultValue={0.3}
                  inputProps={{ min: 0, max: 1, step: 0.1 }}
                  sx={{ mb: 3 }}
                  helperText="Correlação mínima para criar interações"
                />

                <Alert severity="info" sx={{ mb: 3 }}>
                  <strong>Estratégia "Pega Tudo":</strong> O sistema criará todas as variáveis possíveis.
                  Você poderá filtrar as mais relevantes na análise posterior.
                </Alert>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ border: '1px solid #e5e7eb' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  📊 Padrões Reconhecidos
                </Typography>
                
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Meteorológicos:
                </Typography>
                <List dense sx={{ mb: 2 }}>
                  <ListItem>
                    <ListItemText primary="temperatura, temp → Índices de calor/frio" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="umidade → Secura, conforto térmico" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="precipitacao, chuva → Déficit hídrico" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="vento → Calmaria, índices eólicos" />
                  </ListItem>
                </List>

                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Saúde:
                </Typography>
                <List dense sx={{ mb: 2 }}>
                  <ListItem>
                    <ListItemText primary="mortalidade → Taxa complementar" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="nascimentos → Índices demográficos" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="casos → Incidência, prevalência" />
                  </ListItem>
                </List>

                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Genéricos:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Números → Transformações matemáticas" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Séries temporais → Lags e médias móveis" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Percentuais → Complementos (100 - valor)" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Tab 3: Pipeline Automático */}
      <TabPanel value={tabValue} index={2}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          🔄 Pipeline de Criação Automática
        </Typography>
        
        <Card sx={{ border: '1px solid #e5e7eb', mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              📋 Fluxo de Trabalho Automático
            </Typography>
            
            <Stepper activeStep={activeStep} orientation="vertical">
              {etapasAutomacao.map((etapa, index) => (
                <Step key={index}>
                  <StepLabel>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {index + 1}. {etapa}
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {index === 0 && "O sistema analisa os nomes das colunas para identificar padrões conhecidos (temperatura, umidade, precipitação, etc.)"}
                      {index === 1 && "Identificação automática de variáveis meteorológicas, de saúde, demográficas ou econômicas baseada em palavras-chave."}
                      {index === 2 && "Criação de variáveis inversas e complementares (ex: secura = 100 - umidade) para todas as variáveis compatíveis."}
                      {index === 3 && "Geração de variáveis de defasagem temporal (lag1, lag2, etc.) e médias móveis para análise de séries temporais."}
                      {index === 4 && "Aplicação de transformações matemáticas: quadrática, raiz, logarítmica, normalização e padronização."}
                      {index === 5 && "Construção de índices que combinam múltiplas variáveis (conforto térmico, estresse hídrico, etc.)"}
                      {index === 6 && "Geração de relatório final com todas as variáveis criadas e suas interpretações."}
                    </Typography>

                    <Button onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                      {index === etapasAutomacao.length - 1 ? 'Finalizar' : 'Próximo'}
                    </Button>
                    <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                      Voltar
                    </Button>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            
            {activeStep === etapasAutomacao.length && (
              <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  🎉 Pipeline de Automação Configurado!
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  O sistema está pronto para criar automaticamente dezenas de variáveis derivadas
                  a partir dos seus dados originais.
                </Typography>
                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                  Recomeçar
                </Button>
                <Button variant="contained" sx={{ mt: 1 }}>
                  Executar Automação
                </Button>
              </Paper>
            )}
          </CardContent>
        </Card>
      </TabPanel>

      {/* Tab 4: Exemplos Práticos */}
      <TabPanel value={tabValue} index={3}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          🎯 Exemplos Práticos de Uso
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ border: '1px solid #e5e7eb' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  📊 Resultado de Automação: Dados Meteorológicos
                </Typography>
                
                <Typography variant="body2" sx={{ mb: 3 }}>
                  Exemplo de como o sistema transformaria um dataset básico com 5 variáveis em um dataset
                  rico com mais de 50 variáveis derivadas:
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                      📁 Dados Originais (5 variáveis):
                    </Typography>
                    <TableContainer component={Paper} sx={{ border: '1px solid #e5e7eb' }}>
                      <Table size="small">
                        <TableHead sx={{ backgroundColor: '#f8fafc' }}>
                          <TableRow>
                            <TableCell><strong>Variável</strong></TableCell>
                            <TableCell><strong>Tipo</strong></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>temperatura_media</TableCell>
                            <TableCell>Numérica</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>umidade_relativa</TableCell>
                            <TableCell>Numérica</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>precipitacao_mm</TableCell>
                            <TableCell>Numérica</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>velocidade_vento</TableCell>
                            <TableCell>Numérica</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>pressao_atmosferica</TableCell>
                            <TableCell>Numérica</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                      🚀 Após Automação (50+ variáveis):
                    </Typography>
                    <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
                      <List dense>
                        {[
                          'secura_umidade_relativa',
                          'frio_temperatura_media',
                          'deficit_hidrico_precipitacao_mm',
                          'calmaria_velocidade_vento',
                          'baixa_pressao_pressao_atmosferica',
                          'temperatura_media_lag1',
                          'temperatura_media_lag2',
                          'umidade_relativa_lag1',
                          'media_movel_3_temperatura_media',
                          'media_movel_7_umidade_relativa',
                          'tendencia_3_precipitacao_mm',
                          'variacao_pct_velocidade_vento',
                          'temperatura_media_quadrado',
                          'umidade_relativa_raiz',
                          'log_precipitacao_mm',
                          'temperatura_media_zscore',
                          'umidade_relativa_normalizado',
                          'temperatura_media_umidade_relativa_interacao',
                          'indice_conforto_termico',
                          'indice_estresse_hidrico',
                          'score_risco_climatico',
                          'indice_variabilidade_meteorologica'
                        ].map((variavel, index) => (
                          <ListItem key={index}>
                            <ListItemIcon>
                              <Chip size="small" label={Math.floor(index / 5) + 1} color="primary" />
                            </ListItemIcon>
                            <ListItemText 
                              primary={variavel}
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        ))}
                        <ListItem>
                          <ListItemIcon>
                            <TrendingUp sx={{ color: '#10b981' }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary="... e mais 25+ variáveis automáticas"
                            primaryTypographyProps={{ 
                              variant: 'body2', 
                              fontStyle: 'italic',
                              color: '#6b7280'
                            }}
                          />
                        </ListItem>
                      </List>
                    </Box>
                  </Grid>
                </Grid>

                <Alert severity="success" sx={{ mt: 3 }}>
                  <strong>Resultado:</strong> De 5 variáveis originais para 50+ variáveis derivadas,
                  aumentando drasticamente o potencial de descoberta de padrões e relações nos dados.
                </Alert>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default AutomacaoVariaveis;
