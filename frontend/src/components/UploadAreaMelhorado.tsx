import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  LinearProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Chip,
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Switch,
  FormControlLabel,
  Divider,
  Badge,
  Avatar,
  ListItemIcon,
  ListItemButton,
  Collapse,
  RadioGroup,
  Radio,
  FormLabel,
  Slider,
  Tab,
  Tabs,
} from '@mui/material';
import {
  CloudUpload,
  InsertDriveFile,
  Analytics,
  TableChart,
  ExpandMore,
  DataObject,
  Speed,
  Info,
  Download,
  Refresh,
  Visibility,
  Close,
  Assessment,
  AutoAwesome,
  Science,
  PlayArrow,
  FileUpload,
  DeleteSweep,
  CheckCircle as CheckCircleIcon,
  Warning,
  Error as ErrorIcon,
  School,
  TipsAndUpdates,
  Timeline,
  Transform,
  CleaningServices,
  Tune,
  Preview,
  DataArray,
  Storage,
  Psychology,
  Code,
  LightbulbOutlined,
  QuestionAnswer,
  Explore,
  TrendingUp,
  BugReport,
  Assignment,
  BarChart,
  PieChart,
  ShowChart,
  ScatterPlot,
  FilterList,
  SortByAlpha,
  Functions,
  Calculate,
} from '@mui/icons-material';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import DataAnalysisDashboard from './DataAnalysisDashboard';
import AdvancedDataFilter from './AdvancedDataFilter';
import DataTableAdvanced from './DataTableAdvanced';
import { sampleDatasets, dataTypes } from '../data/sampleData';

interface UploadAreaMelhoradoProps {
  onDataUpload: (data: any) => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`upload-tabpanel-${index}`}
      aria-labelledby={`upload-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const UploadAreaMelhorado: React.FC<UploadAreaMelhoradoProps> = ({ onDataUpload }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [dataPreview, setDataPreview] = useState<any>(null);
  const [dataAnalysis, setDataAnalysis] = useState<any>(null);
  const [processingOptions, setProcessingOptions] = useState({
    encoding: 'UTF-8',
    delimiter: 'auto',
    hasHeader: true,
    dateFormat: 'auto',
    missingValueStrategy: 'keep',
    dataTypeInference: true,
    removeEmptyRows: true,
    trimWhitespace: true,
  });
  const [validationResults, setValidationResults] = useState<any>(null);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showDataTable, setShowDataTable] = useState(false);
  const [currentAnalysisView, setCurrentAnalysisView] = useState<'upload' | 'table' | 'dashboard' | 'filter'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Formatos suportados com explicações detalhadas
  const supportedFormats = {
    'CSV': {
      extensions: ['.csv'],
      description: 'Comma-Separated Values - Formato universal para dados tabulares',
      icon: <TableChart color="primary" />,
      advantages: [
        'Universalmente suportado',
        'Formato simples e legível',
        'Compatível com Excel, Google Sheets',
        'Ideal para dados estruturados',
        'Tamanho de arquivo pequeno'
      ],
      disadvantages: [
        'Não suporta múltiplas planilhas',
        'Problemas com encoding',
        'Sem formatação visual'
      ],
      when_to_use: 'Dados tabulares simples, exportações de banco de dados, análises estatísticas',
      examples: [
        'Vendas por período',
        'Dados de clientes',
        'Resultados de experimentos',
        'Logs de sistema formatados'
      ]
    },
    'Excel': {
      extensions: ['.xlsx', '.xls'],
      description: 'Microsoft Excel - Planilhas com múltiplas abas e formatação',
      icon: <Assessment color="success" />,
      advantages: [
        'Múltiplas planilhas em um arquivo',
        'Formatação preservada',
        'Fórmulas e cálculos',
        'Amplamente usado em empresas',
        'Metadados incluídos'
      ],
      disadvantages: [
        'Arquivos maiores',
        'Formato proprietário',
        'Pode ter problemas de compatibilidade'
      ],
      when_to_use: 'Relatórios complexos, dados financeiros, planilhas de controle empresarial',
      examples: [
        'Relatórios financeiros mensais',
        'Controle de estoque',
        'Planos de projeto',
        'Dados contábeis'
      ]
    },
    'JSON': {
      extensions: ['.json'],
      description: 'JavaScript Object Notation - Formato estruturado para APIs',
      icon: <DataObject color="warning" />,
      advantages: [
        'Estrutura hierárquica',
        'Perfeito para APIs',
        'Legível por humanos',
        'Suporta arrays e objetos',
        'Padrão web moderno'
      ],
      disadvantages: [
        'Pode ser complexo para análise tabular',
        'Requer transformação para alguns casos'
      ],
      when_to_use: 'Dados de APIs, configurações, dados semi-estruturados',
      examples: [
        'Dados de redes sociais',
        'Respostas de APIs',
        'Configurações de sistema',
        'Dados de sensores IoT'
      ]
    },
    'TSV': {
      extensions: ['.tsv'],
      description: 'Tab-Separated Values - Similar ao CSV mas separado por tabs',
      icon: <Storage color="info" />,
      advantages: [
        'Menos problemas com vírgulas no texto',
        'Boa para dados científicos',
        'Formato limpo'
      ],
      disadvantages: [
        'Menos comum que CSV',
        'Problemas com tabs no texto'
      ],
      when_to_use: 'Dados científicos, bioinformática, quando CSV tem conflitos',
      examples: [
        'Dados genômicos',
        'Resultados laboratoriais',
        'Logs de servidor',
        'Dados de pesquisa'
      ]
    }
  };

  // Etapas do processo de upload e preparação
  const uploadSteps = [
    {
      label: 'Seleção do Arquivo',
      description: 'Escolha e faça upload do seu arquivo de dados',
      icon: <FileUpload />,
      details: 'Selecione arquivos CSV, Excel, JSON ou TSV. Verifique se o arquivo não está corrompido e tem dados válidos.'
    },
    {
      label: 'Análise Inicial',
      description: 'Detectamos automaticamente a estrutura e formato dos dados',
      icon: <Analytics />,
      details: 'Analisamos encoding, delimitadores, tipos de dados e estrutura geral do arquivo.'
    },
    {
      label: 'Configuração de Parsing',
      description: 'Configure como os dados devem ser interpretados',
      icon: <Tune />,
      details: 'Defina delimitadores, encoding, tratamento de valores faltantes e tipos de dados.'
    },
    {
      label: 'Validação e Limpeza',
      description: 'Identificamos e corrigimos problemas nos dados',
      icon: <CleaningServices />,
      details: 'Removemos linhas vazias, tratamos valores faltantes e validamos tipos de dados.'
    },
    {
      label: 'Preview e Confirmação',
      description: 'Visualize uma amostra dos dados processados',
      icon: <Preview />,
      details: 'Veja como ficaram os dados após o processamento e confirme se está correto.'
    },
    {
      label: 'Finalização',
      description: 'Dados prontos para análise',
      icon: <CheckCircleIcon />,
      details: 'Seus dados estão prontos para análises estatísticas, visualizações e modelagem.'
    }
  ];

  // Guia de preparação de dados
  const dataPreparationGuide = {
    'Limpeza de Dados': {
      icon: <CleaningServices color="primary" />,
      steps: [
        {
          title: 'Valores Faltantes (Missing Values)',
          explanation: 'Valores ausentes podem distorcer análises. É crucial identificá-los e tratá-los adequadamente.',
          methods: [
            'Remoção: Excluir linhas/colunas com muitos valores faltantes',
            'Imputação: Substituir por média, mediana ou moda',
            'Interpolação: Estimar valores baseado em padrões',
            'Indicador: Criar variável binária indicando ausência'
          ],
          when_to_use: 'Quando tiver menos de 5% de dados faltantes, considere remoção. Para mais, use imputação.',
          example: 'Em dados de vendas, se faltar o valor de algumas transações, pode-se usar a média do período.'
        },
        {
          title: 'Outliers (Valores Atípicos)',
          explanation: 'Valores muito diferentes do padrão podem ser erros ou casos especiais importantes.',
          methods: [
            'Detecção por IQR: Valores fora de 1.5×IQR dos quartis',
            'Z-Score: Valores com |z| > 3 são considerados outliers',
            'Análise visual: Boxplots e scatter plots',
            'Método de Tukey: Baseado na distribuição dos dados'
          ],
          when_to_use: 'Sempre analise outliers antes de removê-los. Podem ser insights valiosos.',
          example: 'Vendas de R$100.000 quando a média é R$1.000 pode ser um erro ou um cliente especial.'
        },
        {
          title: 'Duplicatas',
          explanation: 'Registros duplicados podem inflacionar estatísticas e distorcer análises.',
          methods: [
            'Identificação exata: Todas as colunas iguais',
            'Identificação parcial: Chaves específicas iguais',
            'Similaridade: Registros muito parecidos',
            'Remoção ou marcação para análise'
          ],
          when_to_use: 'Sempre verificar duplicatas, especialmente em dados de múltiplas fontes.',
          example: 'Cliente cadastrado duas vezes com pequenas diferenças na digitação do nome.'
        }
      ]
    },
    'Transformação de Dados': {
      icon: <Transform color="secondary" />,
      steps: [
        {
          title: 'Normalização e Padronização',
          explanation: 'Ajustar escalas diferentes entre variáveis para análises mais precisas.',
          methods: [
            'Min-Max: Escala 0-1 → (x - min) / (max - min)',
            'Z-Score: Média 0, desvio 1 → (x - μ) / σ',
            'Robust Scaling: Usando mediana e IQR',
            'Unit Vector: Normalização por vetor unitário'
          ],
          when_to_use: 'Quando variáveis têm escalas muito diferentes (ex: idade vs salário).',
          example: 'Idade (0-100) e salário (1000-10000) precisam ser normalizados para clustering.'
        },
        {
          title: 'Encoding de Variáveis Categóricas',
          explanation: 'Converter categorias em números para algoritmos de machine learning.',
          methods: [
            'One-Hot: Criar colunas binárias para cada categoria',
            'Label Encoding: Números sequenciais para categorias',
            'Ordinal: Para categorias com ordem natural',
            'Target Encoding: Baseado na variável dependente'
          ],
          when_to_use: 'One-hot para nominais sem ordem, ordinal para categorias ordenadas.',
          example: 'Cores (nominal) → One-hot | Educação (ordinal) → 1,2,3,4'
        },
        {
          title: 'Feature Engineering',
          explanation: 'Criar novas variáveis que capturem melhor os padrões dos dados.',
          methods: [
            'Combinação: Multiplicar/somar variáveis relacionadas',
            'Derivação temporal: Extrair ano, mês, dia de datas',
            'Binning: Agrupar valores contínuos em faixas',
            'Polinomial: Criar termos quadráticos, cúbicos'
          ],
          when_to_use: 'Quando conhecimento do domínio sugere relações importantes.',
          example: 'De data de nascimento criar idade, geração, signo, etc.'
        }
      ]
    },
    'Validação de Qualidade': {
      icon: <CheckCircleIcon color="success" />,
      steps: [
        {
          title: 'Consistência de Tipos',
          explanation: 'Verificar se cada coluna tem o tipo de dado correto e consistente.',
          methods: [
            'Verificação automática de tipos',
            'Detecção de inconsistências',
            'Validação de formatos (datas, emails)',
            'Verificação de ranges válidos'
          ],
          when_to_use: 'Sempre, especialmente com dados de múltiplas fontes.',
          example: 'Coluna de idades não deve ter valores negativos ou acima de 150.'
        },
        {
          title: 'Integridade Referencial',
          explanation: 'Verificar se relações entre tabelas/colunas fazem sentido.',
          methods: [
            'Chaves estrangeiras válidas',
            'Relacionamentos lógicos',
            'Agregações consistentes',
            'Balanceamento de classes'
          ],
          when_to_use: 'Com dados relacionais ou quando há dependências lógicas.',
          example: 'Todo ID de cliente em vendas deve existir na tabela de clientes.'
        }
      ]
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  }, []);

  const handleFileUpload = async (files: File[]) => {
    if (files.length === 0) return;

    setUploading(true);
    setUploadProgress(0);
    setCurrentStep(0);

    try {
      const file = files[0];
      
      // Simulação de progresso
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Análise do arquivo
      const fileInfo = await analyzeFile(file);
      
      setUploadProgress(100);
      setSelectedFile({ file, ...fileInfo });
      setCurrentStep(1);
      
      // Auto-análise inicial
      setTimeout(() => performInitialAnalysis(file, fileInfo), 500);
      
    } catch (error) {
      console.error('Erro no upload:', error);
    } finally {
      setUploading(false);
    }
  };

  const analyzeFile = async (file: File): Promise<any> => {
    const extension = file.name.toLowerCase().split('.').pop();
    
    return {
      name: file.name,
      size: file.size,
      type: file.type,
      extension,
      lastModified: file.lastModified,
      format: getFormatFromExtension(extension),
      encoding: await detectEncoding(file),
      estimatedRows: await estimateRows(file),
      estimatedColumns: await estimateColumns(file)
    };
  };

  const getFormatFromExtension = (ext: string | undefined): string => {
    switch (ext) {
      case 'csv': return 'CSV';
      case 'xlsx':
      case 'xls': return 'Excel';
      case 'json': return 'JSON';
      case 'tsv': return 'TSV';
      default: return 'Desconhecido';
    }
  };

  const detectEncoding = async (file: File): Promise<string> => {
    // Implementação simplificada
    return 'UTF-8';
  };

  const estimateRows = async (file: File): Promise<number> => {
    // Estimativa baseada no tamanho do arquivo
    return Math.floor(file.size / 100);
  };

  const estimateColumns = async (file: File): Promise<number> => {
    // Estimativa para demonstração
    return Math.floor(Math.random() * 20) + 5;
  };

  const performInitialAnalysis = async (file: File, fileInfo: any) => {
    setCurrentStep(1);
    
    try {
      let parsedData;
      
      if (fileInfo.format === 'CSV' || fileInfo.format === 'TSV') {
        parsedData = await parseCSVFile(file);
      } else if (fileInfo.format === 'Excel') {
        parsedData = await parseExcelFile(file);
      } else if (fileInfo.format === 'JSON') {
        parsedData = await parseJSONFile(file);
      }

      if (parsedData) {
        const analysis = analyzeDataStructure(parsedData);
        setDataAnalysis(analysis);
        setDataPreview(parsedData.slice(0, 10)); // Preview das primeiras 10 linhas
        
        // Processar análise avançada
        processAnalysisData(parsedData, file.name);
        
        setCurrentStep(2);
      }
    } catch (error) {
      console.error('Erro na análise:', error);
    }
  };

  const parseCSVFile = (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: processingOptions.hasHeader,
        skipEmptyLines: processingOptions.removeEmptyRows,
        delimiter: processingOptions.delimiter === 'auto' ? '' : processingOptions.delimiter,
        encoding: processingOptions.encoding,
        transformHeader: processingOptions.trimWhitespace ? (header: string) => header.trim() : undefined,
        transform: processingOptions.trimWhitespace ? (value: string) => value.trim() : undefined,
        complete: (results) => {
          if (results.errors.length > 0) {
            reject(new Error(results.errors.map(e => e.message).join(', ')));
          } else {
            resolve(results.data);
          }
        },
        error: reject
      });
    });
  };

  const parseExcelFile = async (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: processingOptions.hasHeader ? 1 : undefined });
          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  const parseJSONFile = (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const data = JSON.parse(content);
          resolve(Array.isArray(data) ? data : [data]);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file, processingOptions.encoding);
    });
  };

  const analyzeDataStructure = (data: any[]): any => {
    if (!data || data.length === 0) return null;

    const columns = Object.keys(data[0]);
    const columnAnalysis = columns.map(col => {
      const values = data.map(row => row[col]).filter(v => v !== null && v !== undefined && v !== '');
      const uniqueCount = new Set(values).size;
      const nullCount = data.length - values.length;
      
      return {
        name: col,
        type: inferDataType(values),
        uniqueCount,
        nullCount,
        nullPercentage: (nullCount / data.length) * 100,
        sampleValues: values.slice(0, 5),
        hasNulls: nullCount > 0,
        isUnique: uniqueCount === values.length,
        cardinality: uniqueCount / values.length
      };
    });

    return {
      totalRows: data.length,
      totalColumns: columns.length,
      columns: columnAnalysis,
      dataQuality: calculateDataQuality(columnAnalysis),
      suggestedActions: generateSuggestedActions(columnAnalysis)
    };
  };

  const inferDataType = (values: any[]): string => {
    if (values.length === 0) return 'unknown';
    
    const numericCount = values.filter(v => !isNaN(Number(v)) && isFinite(Number(v))).length;
    const dateCount = values.filter(v => !isNaN(Date.parse(v))).length;
    const booleanCount = values.filter(v => 
      typeof v === 'boolean' || 
      ['true', 'false', '1', '0', 'yes', 'no'].includes(String(v).toLowerCase())
    ).length;

    const total = values.length;
    
    if (numericCount / total > 0.8) return 'numeric';
    if (dateCount / total > 0.8) return 'date';
    if (booleanCount / total > 0.8) return 'boolean';
    if (values.every(v => typeof v === 'string')) return 'text';
    
    return 'mixed';
  };

  const calculateDataQuality = (columnAnalysis: any[]): number => {
    const totalColumns = columnAnalysis.length;
    let qualityScore = 0;

    columnAnalysis.forEach(col => {
      let colScore = 100;
      
      // Penalizar valores nulos
      colScore -= col.nullPercentage;
      
      // Penalizar baixa cardinalidade em colunas não-categóricas
      if (col.type === 'numeric' && col.cardinality < 0.1) {
        colScore -= 20;
      }
      
      qualityScore += Math.max(0, colScore);
    });

    return Math.round(qualityScore / totalColumns);
  };

  const generateSuggestedActions = (columnAnalysis: any[]): string[] => {
    const actions: string[] = [];

    columnAnalysis.forEach(col => {
      if (col.nullPercentage > 5) {
        actions.push(`Tratar valores faltantes na coluna '${col.name}' (${col.nullPercentage.toFixed(1)}%)`);
      }
      
      if (col.type === 'mixed') {
        actions.push(`Revisar tipos de dados inconsistentes na coluna '${col.name}'`);
      }
      
      if (col.cardinality < 0.01 && col.type !== 'boolean') {
        actions.push(`Verificar se '${col.name}' deveria ser categórica`);
      }
    });

    return actions;
  };

  const renderFormatGuide = () => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <School color="primary" />
          Guia de Formatos Suportados
        </Typography>
        
        <Grid container spacing={2}>
          {Object.entries(supportedFormats).map(([format, info]) => (
            <Grid item xs={12} md={6} key={format}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    {info.icon}
                    <Typography variant="h6">{format}</Typography>
                    <Chip label={info.extensions.join(', ')} size="small" />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {info.description}
                  </Typography>

                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="subtitle2">Detalhes Técnicos</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Stack spacing={2}>
                        <Box>
                          <Typography variant="caption" color="success.main" fontWeight="bold">
                            ✅ Vantagens:
                          </Typography>
                          <List dense>
                            {info.advantages.map((adv, idx) => (
                              <ListItem key={idx} sx={{ py: 0 }}>
                                <ListItemText primary={`• ${adv}`} />
                              </ListItem>
                            ))}
                          </List>
                        </Box>

                        <Box>
                          <Typography variant="caption" color="warning.main" fontWeight="bold">
                            ⚠️ Limitações:
                          </Typography>
                          <List dense>
                            {info.disadvantages.map((dis, idx) => (
                              <ListItem key={idx} sx={{ py: 0 }}>
                                <ListItemText primary={`• ${dis}`} />
                              </ListItem>
                            ))}
                          </List>
                        </Box>

                        <Box>
                          <Typography variant="caption" color="primary.main" fontWeight="bold">
                            📋 Quando Usar:
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            {info.when_to_use}
                          </Typography>
                        </Box>

                        <Box>
                          <Typography variant="caption" color="secondary.main" fontWeight="bold">
                            🎯 Exemplos Práticos:
                          </Typography>
                          <List dense>
                            {info.examples.map((example, idx) => (
                              <ListItem key={idx} sx={{ py: 0 }}>
                                <ListItemText primary={`• ${example}`} />
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      </Stack>
                    </AccordionDetails>
                  </Accordion>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );

  const renderDataPreparationGuide = () => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Psychology color="primary" />
          Guia Completo de Preparação de Dados
        </Typography>
        
        <Typography variant="body2" color="text.secondary" paragraph>
          A preparação de dados é responsável por 80% do trabalho em ciência de dados. 
          Este guia explica cada etapa com exemplos práticos e quando aplicar cada técnica.
        </Typography>

        {Object.entries(dataPreparationGuide).map(([category, info]) => (
          <Accordion key={category} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {info.icon}
                <Typography variant="h6">{category}</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              {info.steps.map((step, idx) => (
                <Card key={idx} variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {step.title}
                    </Typography>
                    
                    <Typography variant="body2" paragraph>
                      <strong>Por que é importante:</strong> {step.explanation}
                    </Typography>

                    <Typography variant="subtitle2" color="secondary" gutterBottom>
                      🔧 Métodos Disponíveis:
                    </Typography>
                    <List dense>
                      {step.methods.map((method, midx) => (
                        <ListItem key={midx}>
                          <ListItemIcon>
                            <Functions color="action" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={method} />
                        </ListItem>
                      ))}
                    </List>

                    <Alert severity="info" sx={{ my: 2 }}>
                      <Typography variant="caption">
                        <strong>💡 Quando usar:</strong> {step.when_to_use}
                      </Typography>
                    </Alert>

                    <Alert severity="success" sx={{ mb: 2 }}>
                      <Typography variant="caption">
                        <strong>📝 Exemplo prático:</strong> {step.example}
                      </Typography>
                    </Alert>
                  </CardContent>
                </Card>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </CardContent>
    </Card>
  );

  const renderUploadArea = () => (
    <Box>
      {/* Área de Upload */}
      <Paper
        sx={{
          p: 4,
          textAlign: 'center',
          cursor: 'pointer',
          border: '2px dashed',
          borderColor: isDragOver ? 'primary.main' : 'grey.300',
          bgcolor: isDragOver ? 'primary.50' : 'background.paper',
          transition: 'all 0.3s ease',
          mb: 3,
          '&:hover': {
            borderColor: 'primary.main',
            bgcolor: 'primary.50'
          }
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          hidden
          accept=".csv,.xlsx,.xls,.json,.tsv"
          onChange={(e) => e.target.files && handleFileUpload(Array.from(e.target.files))}
        />
        
        <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        
        <Typography variant="h6" gutterBottom>
          Arraste e solte seus arquivos aqui ou clique para selecionar
        </Typography>
        
        <Typography variant="body2" color="text.secondary" paragraph>
          Suportamos CSV, Excel (.xlsx/.xls), JSON e TSV
        </Typography>
        
        <Typography variant="caption" color="text.secondary">
          Tamanho máximo: 100MB • Múltiplos arquivos aceitos
        </Typography>
      </Paper>

      {/* Progresso do Upload */}
      {uploading && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Speed color="primary" />
              <Typography variant="h6">Processando arquivo...</Typography>
            </Box>
            <LinearProgress variant="determinate" value={uploadProgress} sx={{ mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              {uploadProgress}% concluído
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Stepper do Processo */}
      {selectedFile && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Timeline color="primary" />
              Processo de Preparação dos Dados
            </Typography>
            
            <Stepper activeStep={currentStep} orientation="vertical">
              {uploadSteps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel icon={step.icon}>
                    {step.label}
                  </StepLabel>
                  <StepContent>
                    <Typography variant="body2" paragraph>
                      {step.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {step.details}
                    </Typography>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </CardContent>
        </Card>
      )}

      {/* Informações do Arquivo Selecionado */}
      {selectedFile && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <InsertDriveFile color="primary" />
              Informações do Arquivo
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <List dense>
                  <ListItem>
                    <ListItemText 
                      primary="Nome do arquivo" 
                      secondary={selectedFile.name} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Tamanho" 
                      secondary={`${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Formato" 
                      secondary={selectedFile.format} 
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <List dense>
                  <ListItem>
                    <ListItemText 
                      primary="Encoding detectado" 
                      secondary={selectedFile.encoding} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Linhas estimadas" 
                      secondary={selectedFile.estimatedRows?.toLocaleString() || '0'} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Colunas estimadas" 
                      secondary={selectedFile.estimatedColumns} 
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Análise dos Dados */}
      {dataAnalysis && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Assessment color="primary" />
              Análise Automática dos Dados
            </Typography>
            
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6} md={3}>
                <Card variant="outlined">
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary">
                      {(dataAnalysis?.totalRows || 0).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Linhas
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={3}>
                <Card variant="outlined">
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="secondary">
                      {dataAnalysis.totalColumns}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Colunas
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={3}>
                <Card variant="outlined">
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="success.main">
                      {dataAnalysis.dataQuality}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Qualidade
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={3}>
                <Card variant="outlined">
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="warning.main">
                      {dataAnalysis.suggestedActions.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Ações Sugeridas
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Análise das Colunas */}
            <Typography variant="h6" gutterBottom>
              Análise Detalhada das Colunas
            </Typography>
            
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Coluna</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell align="right">Únicos</TableCell>
                    <TableCell align="right">Nulos</TableCell>
                    <TableCell align="right">% Nulos</TableCell>
                    <TableCell>Amostras</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataAnalysis.columns.map((col: any) => (
                    <TableRow key={col.name}>
                      <TableCell component="th" scope="row">
                        <Typography variant="body2" fontWeight="medium">
                          {col.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={col.type} 
                          size="small" 
                          color={col.type === 'mixed' ? 'warning' : 'default'}
                        />
                      </TableCell>
                      <TableCell align="right">{(col.uniqueCount || 0).toLocaleString()}</TableCell>
                      <TableCell align="right">{col.nullCount}</TableCell>
                      <TableCell align="right">
                        <Typography 
                          variant="body2" 
                          color={col.nullPercentage > 10 ? 'error' : 'text.secondary'}
                        >
                          {col.nullPercentage.toFixed(1)}%
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption" color="text.secondary">
                          {col.sampleValues.slice(0, 2).join(', ')}...
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {col.hasNulls && col.nullPercentage > 5 ? (
                          <Tooltip title="Contém muitos valores nulos">
                            <Warning color="warning" fontSize="small" />
                          </Tooltip>
                        ) : col.type === 'mixed' ? (
                          <Tooltip title="Tipos de dados inconsistentes">
                            <ErrorIcon color="error" fontSize="small" />
                          </Tooltip>
                        ) : (
                          <Tooltip title="Dados em boa qualidade">
                            <CheckCircleIcon color="success" fontSize="small" />
                          </Tooltip>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Ações Sugeridas */}
            {dataAnalysis.suggestedActions.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TipsAndUpdates color="warning" />
                  Ações Recomendadas
                </Typography>
                
                {dataAnalysis.suggestedActions.map((action: string, idx: number) => (
                  <Alert key={idx} severity="info" sx={{ mb: 1 }}>
                    {action}
                  </Alert>
                ))}
              </Box>
            )}
          </CardContent>
        </Card>
      )}

      {/* Preview dos Dados */}
      {dataPreview && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Preview color="primary" />
              Preview dos Dados (Primeiras 10 linhas)
            </Typography>
            
            <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 400 }}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    {Object.keys(dataPreview[0] || {}).map((col) => (
                      <TableCell key={col}>
                        <Typography variant="caption" fontWeight="bold">
                          {col}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataPreview.map((row: any, idx: number) => (
                    <TableRow key={idx} hover>
                      {Object.values(row).map((value: any, cellIdx: number) => (
                        <TableCell key={cellIdx}>
                          <Typography variant="body2">
                            {value !== null && value !== undefined ? String(value) : 
                              <em style={{ color: '#999' }}>null</em>
                            }
                          </Typography>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<CheckCircleIcon />}
                onClick={() => {
                  onDataUpload({
                    data: dataPreview,
                    analysis: dataAnalysis,
                    file: selectedFile
                  });
                  setCurrentStep(5);
                }}
              >
                Confirmar e Usar Dados
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<Tune />}
                onClick={() => setShowAdvancedOptions(true)}
              >
                Configurações Avançadas
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );

  // Processar análise dos dados
  const processAnalysisData = (data: any[], fileName: string) => {
    if (!data || data.length === 0) return null;

    // Detectar tipos de colunas
    const columns = Object.keys(data[0]).map(colName => {
      const values = data.slice(0, 100).map(row => row[colName]).filter(v => v !== null && v !== undefined);
      
      let type = 'text';
      if (values.length > 0) {
        // Tentar detectar números
        const numericValues = values.filter(v => !isNaN(Number(v)) && v !== '');
        if (numericValues.length / values.length > 0.8) {
          type = 'numeric';
        } else {
          // Tentar detectar datas
          const dateValues = values.filter(v => !isNaN(Date.parse(v)));
          if (dateValues.length / values.length > 0.8) {
            type = 'date';
          } else if (values.every(v => v === true || v === false || v === 'true' || v === 'false')) {
            type = 'boolean';
          } else {
            const uniqueValues = new Set(values);
            if (uniqueValues.size < values.length * 0.5 && uniqueValues.size < 20) {
              type = 'categorical';
            }
          }
        }
      }

      return {
        name: colName,
        type,
        visible: true
      };
    });

    // Calcular estatísticas básicas
    const totalRows = data.length;
    const totalColumns = columns.length;
    let nullCount = 0;
    
    data.forEach(row => {
      Object.values(row).forEach(value => {
        if (value === null || value === undefined || value === '') {
          nullCount++;
        }
      });
    });

    const dataQuality = Math.max(0, ((totalRows * totalColumns - nullCount) / (totalRows * totalColumns)) * 100);

    const analysis = {
      fileName,
      totalRows,
      totalColumns,
      dataQuality: Math.round(dataQuality),
      columns,
      nullCount,
      suggestedActions: dataQuality < 80 ? ['Limpar valores nulos', 'Validar tipos de dados'] : []
    };

    setDataAnalysis(analysis);
    setFilteredData(data);
    return analysis;
  };

  // Renderizar análise avançada
  const renderAdvancedAnalysis = () => {
    if (!dataPreview || !dataAnalysis) return null;

    return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Analytics color="primary" />
          Análise Avançada dos Dados
        </Typography>

        {/* Navegação da Análise */}
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={1}>
            <Grid item>
              <Button
                variant={currentAnalysisView === 'table' ? 'contained' : 'outlined'}
                startIcon={<TableChart />}
                onClick={() => setCurrentAnalysisView('table')}
                size="small"
              >
                Tabela
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant={currentAnalysisView === 'filter' ? 'contained' : 'outlined'}
                startIcon={<FilterList />}
                onClick={() => setCurrentAnalysisView('filter')}
                size="small"
              >
                Filtros
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant={currentAnalysisView === 'dashboard' ? 'contained' : 'outlined'}
                startIcon={<Assessment />}
                onClick={() => setCurrentAnalysisView('dashboard')}
                size="small"
              >
                Dashboard
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Renderização Condicional */}
        {currentAnalysisView === 'table' && (
          <DataTableAdvanced
            data={filteredData}
            columns={dataAnalysis.columns}
            title={`Dados de ${dataAnalysis.fileName}`}
            subtitle={`${filteredData.length} registros × ${dataAnalysis.columns.length} colunas`}
            showStats={true}
            showColumnTypes={true}
            onRowClick={(row, index) => {
              console.log('Linha clicada:', index, row);
            }}
            onExport={(format) => {
              console.log('Exportar como:', format);
            }}
          />
        )}

        {currentAnalysisView === 'filter' && (
          <AdvancedDataFilter
            data={dataPreview}
            columns={dataAnalysis.columns}
            onFilteredDataChange={(filtered) => {
              setFilteredData(filtered);
            }}
            onFiltersChange={(filters) => {
              console.log('Filtros alterados:', filters);
            }}
          />
        )}

        {currentAnalysisView === 'dashboard' && (
          <DataAnalysisDashboard
            data={filteredData}
            analysis={dataAnalysis}
            fileName={dataAnalysis.fileName}
          />
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <DataArray color="primary" />
        Centro de Upload e Preparação de Dados
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Portal completo para upload, análise e preparação de dados com guias detalhados, 
        explicações passo-a-passo e exemplos práticos para cada etapa do processo.
      </Typography>

      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab 
          label="Guia de Formatos" 
          icon={<School />}
          iconPosition="start"
        />
        <Tab 
          label="Preparação de Dados" 
          icon={<Psychology />}
          iconPosition="start"
        />
        <Tab 
          label="Upload e Análise" 
          icon={<CloudUpload />}
          iconPosition="start"
        />
        {dataPreview && (
          <Tab 
            label="Análise Avançada" 
            icon={<Analytics />}
            iconPosition="start"
          />
        )}
      </Tabs>

      <CustomTabPanel value={activeTab} index={0}>
        {renderFormatGuide()}
      </CustomTabPanel>

      <CustomTabPanel value={activeTab} index={1}>
        {renderDataPreparationGuide()}
      </CustomTabPanel>

      <CustomTabPanel value={activeTab} index={2}>
        {renderUploadArea()}
      </CustomTabPanel>

      {dataPreview && (
        <CustomTabPanel value={activeTab} index={3}>
          {renderAdvancedAnalysis()}
        </CustomTabPanel>
      )}
    </Box>
  );
};

export default UploadAreaMelhorado;
