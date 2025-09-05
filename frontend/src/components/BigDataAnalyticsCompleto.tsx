import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab,
  Breadcrumbs,
  Avatar,
  CardHeader,
  CardActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Fab,
  Divider,
} from '@mui/material';
import {
  ExpandMore,
  Home,
  BarChart,
  BookmarkBorder,
  Share,
  Download,
  VolumeUp,
  FlashOn,
  Category,
  CheckCircle,
  AttachMoney,
  Architecture,
  Layers,
  Transform,
  CloudDownload,
  CloudUpload,
  Sensors,
  Lightbulb,
  TrendingUp,
  NavigateNext,
  Star,
  Info,
  Settings,
  LocalHospital,
  Factory,
  Public,
  LocationOn,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const BigDataAnalyticsCompleto: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedV, setSelectedV] = useState<string>('');

  // Os 5 Vs do Big Data
  const cincosVs = [
    {
      id: 'volume',
      nome: 'Volume',
      titulo: 'Quantidade Massiva de Dados',
      descricao: 'Refere-se à quantidade extremamente grande de dados gerados diariamente. Estamos falando de terabytes, petabytes e exabytes.',
      icon: <VolumeUp sx={{ fontSize: 40, color: '#1976d2' }} />,
      exemplos: [
        'Facebook processa 4 petabytes de dados por dia',
        'YouTube recebe 500 horas de vídeo por minuto',
        'Google processa 20 petabytes de dados diariamente'
      ],
      metricas: { valor: '2.5', unidade: 'quintilhões de bytes/dia', status: 'excelente' as const }
    },
    {
      id: 'velocity',
      nome: 'Velocity',
      titulo: 'Rapidez no Processamento',
      descricao: 'A velocidade com que os dados são gerados, processados e analisados em tempo real.',
      icon: <FlashOn sx={{ fontSize: 40, color: '#ff9800' }} />,
      exemplos: [
        'Detecção de fraude em cartão em milissegundos',
        'Recomendações do Netflix em tempo real',
        'Alertas de tráfego do Google Maps'
      ],
      metricas: { valor: '<1', unidade: 'segundo', status: 'excelente' as const }
    },
    {
      id: 'variety',
      nome: 'Variety',
      titulo: 'Diversidade de Tipos de Dados',
      descricao: 'A diversidade de tipos e formatos: estruturados, semi-estruturados e não estruturados.',
      icon: <Category sx={{ fontSize: 40, color: '#4caf50' }} />,
      exemplos: [
        'Dados estruturados: tabelas SQL',
        'Semi-estruturados: JSON, XML',
        'Não estruturados: emails, redes sociais'
      ],
      metricas: { valor: '80%', unidade: 'dados não estruturados', status: 'bom' as const }
    },
    {
      id: 'veracity',
      nome: 'Veracity',
      titulo: 'Qualidade e Confiabilidade',
      descricao: 'A qualidade, precisão e confiabilidade dos dados. Inclui limpeza e validação.',
      icon: <CheckCircle sx={{ fontSize: 40, color: '#2196f3' }} />,
      exemplos: [
        'Detecção de dados duplicados',
        'Validação de informações',
        'Identificação de fake news'
      ],
      metricas: { valor: '95%', unidade: 'confiabilidade', status: 'excelente' as const }
    },
    {
      id: 'value',
      nome: 'Value',
      titulo: 'Geração de Insights e ROI',
      descricao: 'A capacidade de extrair valor comercial e insights acionáveis dos dados.',
      icon: <AttachMoney sx={{ fontSize: 40, color: '#ff5722' }} />,
      exemplos: [
        'Aumento de vendas via recomendações',
        'Redução de custos operacionais',
        'Decisões estratégicas baseadas em dados'
      ],
      metricas: { valor: '300%', unidade: 'ROI médio', status: 'excelente' as const }
    }
  ];

  const dataInfo = {
    warehouse: {
      conceito: 'Repositório central de dados integrados, otimizado para consultas e análises complexas.',
      caracteristicas: [
        'Orientado por assunto (vendas, marketing)',
        'Dados integrados de múltiplas fontes',
        'Não volátil - dados históricos preservados',
        'Schema bem definido e estruturado'
      ]
    },
    lake: {
      conceito: 'Repositório que armazena grandes quantidades de dados em formato nativo até serem necessários.',
      caracteristicas: [
        'Schema on Read (aplicado na leitura)',
        'Armazena dados em formato bruto',
        'Suporte a todos os tipos de dados',
        'Custos de armazenamento reduzidos'
      ]
    }
  };

  const etlSteps = [
    {
      etapa: 'Extract (Extração)',
      descricao: 'Extrair dados de diversas fontes como bancos, APIs, arquivos.',
      icon: <CloudDownload />,
      ferramentas: ['Apache NiFi', 'Talend', 'Pentaho']
    },
    {
      etapa: 'Transform (Transformação)',
      descricao: 'Limpeza, normalização e enriquecimento dos dados.',
      icon: <Transform />,
      ferramentas: ['Apache Spark', 'dbt', 'Pandas']
    },
    {
      etapa: 'Load (Carregamento)',
      descricao: 'Carregar dados transformados no destino final.',
      icon: <CloudUpload />,
      ferramentas: ['Apache Airflow', 'Azure Data Factory']
    }
  ];

  const iotApps = [
    {
      setor: 'Casa Inteligente',
      icon: <LocationOn />,
      casos: ['Termostatos inteligentes', 'Sistemas de segurança', 'Iluminação automatizada'],
      beneficios: ['Economia de energia 30%', 'Maior segurança', 'Conveniência']
    },
    {
      setor: 'Agricultura',
      icon: <Lightbulb />,
      casos: ['Monitoramento de solo', 'Irrigação automatizada', 'Drones'],
      beneficios: ['Aumento de 20% na produtividade', 'Redução no uso de água']
    },
    {
      setor: 'Saúde',
      icon: <LocalHospital />,
      casos: ['Wearables', 'Monitoramento remoto', 'Medicamentos inteligentes'],
      beneficios: ['Prevenção de doenças', 'Cuidados personalizados']
    },
    {
      setor: 'Indústria',
      icon: <Factory />,
      casos: ['Manutenção preditiva', 'Controle de qualidade', 'Logística'],
      beneficios: ['Redução de 40% em paradas', 'Eficiência operacional']
    }
  ];

  return (
    <Box sx={{ p: 3, maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Home sx={{ mr: 0.5 }} fontSize="inherit" />
            <Typography>Data Science Pro</Typography>
          </Box>
          <Typography sx={{ display: 'flex', alignItems: 'center' }}>
            <BarChart sx={{ mr: 0.5 }} fontSize="inherit" />
            Big Data Analytics
          </Typography>
        </Breadcrumbs>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#1976d2', mb: 1 }}>
              🚀 Big Data Analytics Center
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Centro completo de aprendizado sobre Big Data, Data Warehouse, Data Lake, IoT e Analytics
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" startIcon={<BookmarkBorder />}>Favoritos</Button>
            <Button variant="outlined" startIcon={<Share />}>Compartilhar</Button>
            <Button variant="contained" startIcon={<Download />}>Baixar Guia</Button>
          </Box>
        </Box>
      </Box>

      {/* Alert educacional */}
      <Alert severity="info" sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
          🎓 Bem-vindo ao Centro de Aprendizado Big Data
        </Typography>
        <Typography>
          Aprenda os conceitos fundamentais do Big Data, incluindo os <strong>5 Vs corretos</strong>, 
          diferenças entre Data Warehouse e Data Lake, pipelines ETL, IoT e muito mais!
        </Typography>
      </Alert>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} variant="scrollable">
          <Tab label="5 Vs do Big Data" icon={<BarChart />} iconPosition="start" />
          <Tab label="Data Warehouse vs Data Lake" icon={<Architecture />} iconPosition="start" />
          <Tab label="ETL & Pipelines" icon={<Transform />} iconPosition="start" />
          <Tab label="Internet das Coisas (IoT)" icon={<Sensors />} iconPosition="start" />
        </Tabs>
      </Box>

      {/* Tab 1: 5 Vs do Big Data */}
      <TabPanel value={tabValue} index={0}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, textAlign: 'center' }}>
          📊 Os 5 Vs do Big Data (Corretos!)
        </Typography>
        
        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>⚠️ Correção Importante!</Typography>
          <Typography>
            O Big Data possui <strong>5 Vs, não 4</strong>! São eles: Volume, Velocity, Variety, Veracity e Value.
          </Typography>
        </Alert>

        <Grid container spacing={3}>
          {cincosVs.map((v, index) => (
            <Grid item xs={12} md={6} lg={4} key={v.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 24px rgba(0,0,0,0.15)' },
                  border: selectedV === v.id ? '2px solid #1976d2' : '1px solid #e0e0e0'
                }}
                onClick={() => setSelectedV(selectedV === v.id ? '' : v.id)}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: '#1976d2', width: 56, height: 56 }}>
                      {v.icon}
                    </Avatar>
                  }
                  title={
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      {index + 1}. {v.nome}
                    </Typography>
                  }
                  subheader={v.titulo}
                />
                
                <CardContent>
                  <Typography variant="body1" sx={{ mb: 2 }}>{v.descricao}</Typography>

                  <Box sx={{ mb: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                    <Typography variant="h4" color="primary" sx={{ fontWeight: 700, textAlign: 'center' }}>
                      {v.metricas.valor}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                      {v.metricas.unidade}
                    </Typography>
                  </Box>

                  {selectedV === v.id && (
                    <Box sx={{ mt: 2 }}>
                      <Divider sx={{ mb: 2 }} />
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Typography variant="h6">💡 Exemplos Práticos</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <List dense>
                            {v.exemplos.map((ex, idx) => (
                              <ListItem key={idx}>
                                <ListItemIcon>
                                  <Lightbulb color="warning" fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary={ex} />
                              </ListItem>
                            ))}
                          </List>
                        </AccordionDetails>
                      </Accordion>
                    </Box>
                  )}
                </CardContent>
                
                <CardActions>
                  <Button size="small">
                    {selectedV === v.id ? 'Menos Detalhes' : 'Ver Detalhes'}
                  </Button>
                  <Button size="small" startIcon={<Star />}>Favoritar</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Tab 2: Data Warehouse vs Data Lake */}
      <TabPanel value={tabValue} index={1}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, textAlign: 'center' }}>
          🏗️ Data Warehouse vs Data Lake
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} lg={6}>
            <Card sx={{ height: '100%' }}>
              <CardHeader
                avatar={<Avatar sx={{ bgcolor: '#1976d2', width: 56, height: 56 }}><Architecture /></Avatar>}
                title={<Typography variant="h4" sx={{ fontWeight: 700, color: '#1976d2' }}>Data Warehouse</Typography>}
                subheader="Repositório estruturado e otimizado"
              />
              <CardContent>
                <Typography variant="body1" sx={{ mb: 3 }}>{dataInfo.warehouse.conceito}</Typography>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="h6">📋 Características</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List dense>
                      {dataInfo.warehouse.caracteristicas.map((car, idx) => (
                        <ListItem key={idx}>
                          <ListItemIcon><CheckCircle color="primary" fontSize="small" /></ListItemIcon>
                          <ListItemText primary={car} />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Card sx={{ height: '100%' }}>
              <CardHeader
                avatar={<Avatar sx={{ bgcolor: '#4caf50', width: 56, height: 56 }}><Layers /></Avatar>}
                title={<Typography variant="h4" sx={{ fontWeight: 700, color: '#4caf50' }}>Data Lake</Typography>}
                subheader="Repositório flexível para dados brutos"
              />
              <CardContent>
                <Typography variant="body1" sx={{ mb: 3 }}>{dataInfo.lake.conceito}</Typography>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="h6">📋 Características</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List dense>
                      {dataInfo.lake.caracteristicas.map((car, idx) => (
                        <ListItem key={idx}>
                          <ListItemIcon><CheckCircle color="primary" fontSize="small" /></ListItemIcon>
                          <ListItemText primary={car} />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Tab 3: ETL & Pipelines */}
      <TabPanel value={tabValue} index={2}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, textAlign: 'center' }}>
          🔄 ETL & Pipelines de Dados
        </Typography>
        
        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>🚀 Fundamentos de ETL</Typography>
          <Typography>
            ETL (Extract, Transform, Load) é o processo fundamental para movimentar e preparar dados para análise.
          </Typography>
        </Alert>

        <Grid container spacing={3}>
          {etlSteps.map((etapa, index) => (
            <Grid item xs={12} lg={4} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ 
                      bgcolor: index === 0 ? '#2196f3' : index === 1 ? '#ff9800' : '#4caf50',
                      width: 56, height: 56 
                    }}>
                      {etapa.icon}
                    </Avatar>
                  }
                  title={<Typography variant="h5" sx={{ fontWeight: 700 }}>{etapa.etapa}</Typography>}
                  subheader={etapa.descricao}
                />
                <CardContent>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>Ferramentas:</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {etapa.ferramentas.map((tool, idx) => (
                      <Chip key={idx} label={tool} color="primary" variant="outlined" size="small" />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pipeline Visualização */}
        <Card sx={{ mt: 4 }}>
          <CardHeader title={<Typography variant="h5" sx={{ fontWeight: 700 }}>🔗 Pipeline Completo</Typography>} />
          <CardContent>
            <Stepper orientation="horizontal" alternativeLabel>
              {['Fontes', 'Extração', 'Transformação', 'Carregamento', 'Análise'].map((label) => (
                <Step key={label} active>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Tab 4: IoT */}
      <TabPanel value={tabValue} index={3}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, textAlign: 'center' }}>
          🌐 Internet das Coisas (IoT)
        </Typography>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>🔗 O que é IoT?</Typography>
          <Typography>
            Internet das Coisas é uma rede de objetos físicos conectados que coletam e compartilham dados 
            através de sensores, software e outras tecnologias.
          </Typography>
        </Alert>

        <Grid container spacing={3}>
          {iotApps.map((app, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardHeader
                  avatar={<Avatar sx={{ bgcolor: '#4caf50', width: 56, height: 56 }}>{app.icon}</Avatar>}
                  title={<Typography variant="h5" sx={{ fontWeight: 700 }}>{app.setor}</Typography>}
                />
                <CardContent>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="h6">💡 Casos de Uso</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense>
                        {app.casos.map((caso, idx) => (
                          <ListItem key={idx}>
                            <ListItemIcon><Lightbulb color="warning" fontSize="small" /></ListItemIcon>
                            <ListItemText primary={caso} />
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="h6">📈 Benefícios</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense>
                        {app.beneficios.map((ben, idx) => (
                          <ListItem key={idx}>
                            <ListItemIcon><TrendingUp color="success" fontSize="small" /></ListItemIcon>
                            <ListItemText primary={ben} />
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Tipos de Dados IoT */}
        <Card sx={{ mt: 4 }}>
          <CardHeader title={<Typography variant="h5" sx={{ fontWeight: 700 }}>📊 Tipos de Dados IoT</Typography>} />
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Tipo de Sensor</strong></TableCell>
                    <TableCell><strong>Frequência</strong></TableCell>
                    <TableCell><strong>Volume por Leitura</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Sensores de Temperatura</TableCell>
                    <TableCell>A cada minuto</TableCell>
                    <TableCell>1 KB</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Câmeras de Segurança</TableCell>
                    <TableCell>Contínuo (24/7)</TableCell>
                    <TableCell>2-5 GB por hora</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>GPS Trackers</TableCell>
                    <TableCell>A cada 30 segundos</TableCell>
                    <TableCell>100 bytes</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Floating Action Button */}
      <Fab 
        color="primary" 
        sx={{ position: 'fixed', bottom: 20, right: 20 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <NavigateNext />
      </Fab>
    </Box>
  );
};

export default BigDataAnalyticsCompleto;
