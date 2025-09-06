import React, { useState, useCallback, useRef } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  LinearProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  Stepper,
  Step,
  StepLabel,
  StepContent,
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
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  CloudUpload,
  InsertDriveFile,
  CheckCircle,
  Error,
  Warning,
  Delete,
  Visibility,
  Download,
  CleaningServices,
  Analytics,
  ExpandMore,
  TableChart,
  BarChart,
  PieChart,
  Timeline,
  Assessment,
  PlayArrow,
  Stop,
  Refresh,
} from '@mui/icons-material';
import Papa from 'papaparse';

interface FileData {
  name: string;
  size: number;
  type: string;
  data: any[];
  headers: string[];
  preview: any[];
  errors: string[];
  warnings: string[];
  processed: boolean;
  cleaned: boolean;
  statistics: {
    rows: number;
    columns: number;
    nullValues: number;
    duplicates: number;
    dataTypes: Record<string, string>;
  };
}

interface CleaningStep {
  id: string;
  name: string;
  description: string;
  applied: boolean;
  automated: boolean;
  parameters?: Record<string, any>;
}

const UploadSistemaProfissional: React.FC = () => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const [previewDialog, setPreviewDialog] = useState(false);
  const [cleaningDialog, setCleaningDialog] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [analysisType, setAnalysisType] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [cleaningSteps] = useState<CleaningStep[]>([
    {
      id: 'remove_duplicates',
      name: 'Remover Duplicatas',
      description: 'Remove linhas completamente duplicadas do dataset',
      applied: false,
      automated: true
    },
    {
      id: 'handle_nulls',
      name: 'Tratar Valores Nulos',
      description: 'Remove ou imputa valores nulos/vazios',
      applied: false,
      automated: true,
      parameters: { strategy: 'remove' }
    },
    {
      id: 'standardize_text',
      name: 'Padronizar Texto',
      description: 'Converte texto para minúsculo e remove espaços extras',
      applied: false,
      automated: true
    },
    {
      id: 'detect_outliers',
      name: 'Detectar Outliers',
      description: 'Identifica valores extremos em colunas numéricas',
      applied: false,
      automated: false
    },
    {
      id: 'convert_types',
      name: 'Converter Tipos de Dados',
      description: 'Converte colunas para tipos apropriados (número, data, etc.)',
      applied: false,
      automated: true
    }
  ]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files || []);
    
    uploadedFiles.forEach((file) => {
      setIsProcessing(true);
      setUploadProgress(0);
      
      const reader = new FileReader();
      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          setUploadProgress((e.loaded / e.total) * 100);
        }
      };
      
      reader.onload = (e) => {
        const text = e.target?.result as string;
        
        if (file.name.endsWith('.csv')) {
          Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
              processFileData(file, results.data, results.meta.fields || []);
            },
            error: (error) => {
              console.error('Erro ao processar CSV:', error);
            }
          });
        } else if (file.name.endsWith('.json')) {
          try {
            const jsonData = JSON.parse(text);
            const dataArray = Array.isArray(jsonData) ? jsonData : [jsonData];
            const headers = dataArray.length > 0 ? Object.keys(dataArray[0]) : [];
            processFileData(file, dataArray, headers);
          } catch (error) {
            console.error('Erro ao processar JSON:', error);
          }
        } else if (file.name.endsWith('.txt')) {
          // Assumindo CSV separado por tab ou vírgula
          Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            delimiter: text.includes('\t') ? '\t' : ',',
            complete: (results) => {
              processFileData(file, results.data, results.meta.fields || []);
            }
          });
        }
      };
      
      reader.readAsText(file);
    });
  }, []);

  const processFileData = (file: File, data: any[], headers: string[]) => {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    // Validações básicas
    if (data.length === 0) {
      errors.push('Arquivo vazio ou sem dados válidos');
    }
    
    if (headers.length === 0) {
      errors.push('Nenhuma coluna identificada');
    }
    
    if (data.length > 100000) {
      warnings.push('Arquivo muito grande (>100k linhas). Considere dividir em partes menores.');
    }
    
    // Análise estatística básica
    const statistics = calculateStatistics(data, headers);
    
    if (statistics.nullValues > data.length * 0.5) {
      warnings.push(`Alto percentual de valores nulos (${((statistics.nullValues / (data.length * headers.length)) * 100).toFixed(1)}%)`);
    }
    
    const fileData: FileData = {
      name: file.name,
      size: file.size,
      type: file.type,
      data: data,
      headers: headers,
      preview: data.slice(0, 10),
      errors: errors,
      warnings: warnings,
      processed: true,
      cleaned: false,
      statistics: statistics
    };
    
    setFiles(prev => [...prev, fileData]);
    setIsProcessing(false);
    setUploadProgress(0);
  };

  const calculateStatistics = (data: any[], headers: string[]) => {
    const dataTypes: Record<string, string> = {};
    let nullValues = 0;
    
    headers.forEach(header => {
      const columnData = data.map(row => row[header]).filter(val => val !== null && val !== undefined && val !== '');
      
      if (columnData.length === 0) {
        dataTypes[header] = 'empty';
        nullValues += data.length;
        return;
      }
      
      // Detectar tipo de dados
      const sample = columnData[0];
      if (!isNaN(Number(sample)) && sample !== '') {
        dataTypes[header] = 'numeric';
      } else if (Date.parse(sample)) {
        dataTypes[header] = 'date';
      } else {
        dataTypes[header] = 'text';
      }
      
      // Contar nulos
      nullValues += data.length - columnData.length;
    });
    
    // Detectar duplicatas
    const duplicates = data.length - new Set(data.map(row => JSON.stringify(row))).size;
    
    return {
      rows: data.length,
      columns: headers.length,
      nullValues: nullValues,
      duplicates: duplicates,
      dataTypes: dataTypes
    };
  };

  const cleanData = (fileData: FileData) => {
    let cleanedData = [...fileData.data];
    
    // Aplicar etapas de limpeza
    cleaningSteps.forEach(step => {
      if (!step.applied || !step.automated) return;
      
      switch (step.id) {
        case 'remove_duplicates':
          const uniqueData = cleanedData.filter((row, index, self) => 
            index === self.findIndex(r => JSON.stringify(r) === JSON.stringify(row))
          );
          cleanedData = uniqueData;
          break;
          
        case 'handle_nulls':
          if (step.parameters?.strategy === 'remove') {
            cleanedData = cleanedData.filter(row => 
              Object.values(row).some(val => val !== null && val !== undefined && val !== '')
            );
          }
          break;
          
        case 'standardize_text':
          cleanedData = cleanedData.map(row => {
            const cleanedRow = { ...row };
            Object.keys(cleanedRow).forEach(key => {
              if (typeof cleanedRow[key] === 'string') {
                cleanedRow[key] = cleanedRow[key].trim().toLowerCase();
              }
            });
            return cleanedRow;
          });
          break;
          
        case 'convert_types':
          cleanedData = cleanedData.map(row => {
            const convertedRow = { ...row };
            Object.keys(convertedRow).forEach(key => {
              const value = convertedRow[key];
              if (value && !isNaN(Number(value))) {
                convertedRow[key] = Number(value);
              }
            });
            return convertedRow;
          });
          break;
      }
    });
    
    // Atualizar arquivo com dados limpos
    const updatedFile = {
      ...fileData,
      data: cleanedData,
      cleaned: true,
      statistics: calculateStatistics(cleanedData, fileData.headers)
    };
    
    setFiles(prev => prev.map(f => f.name === fileData.name ? updatedFile : f));
    setCleaningDialog(false);
  };

  const removeFile = (fileName: string) => {
    setFiles(prev => prev.filter(f => f.name !== fileName));
  };

  const processSteps = [
    {
      label: 'Upload do Arquivo',
      description: 'Selecione e faça upload dos seus arquivos de dados'
    },
    {
      label: 'Validação e Preview',
      description: 'Visualize e valide a estrutura dos dados'
    },
    {
      label: 'Limpeza de Dados',
      description: 'Aplique técnicas de limpeza e tratamento'
    },
    {
      label: 'Seleção de Análise',
      description: 'Escolha o tipo de análise a ser realizada'
    },
    {
      label: 'Resultados',
      description: 'Visualize os resultados e gere relatórios'
    }
  ];

  return (
    <Box sx={{ p: 3, maxWidth: '1400px', margin: '0 auto' }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: '#1976d2' }}>
        📂 Sistema Profissional de Upload e Análise
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body1">
          <strong>Formatos Suportados:</strong> CSV, JSON, TXT (separado por vírgula/tab) • 
          <strong>Tamanho Máximo:</strong> 100MB por arquivo • 
          <strong>Processamento:</strong> Automático com validação e limpeza
        </Typography>
      </Alert>

      {/* Stepper do Processo */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stepper activeStep={currentStep} orientation="horizontal" alternativeLabel>
            {processSteps.map((step, index) => (
              <Step key={index}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      {/* Área de Upload */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box
            sx={{
              border: '2px dashed #1976d2',
              borderRadius: 2,
              p: 4,
              textAlign: 'center',
              cursor: 'pointer',
              '&:hover': { bgcolor: '#f5f5f5' }
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <CloudUpload sx={{ fontSize: 48, color: '#1976d2', mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1 }}>
              Clique para selecionar arquivos ou arraste aqui
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Suporte para CSV, JSON, TXT • Múltiplos arquivos • Processamento automático
            </Typography>
            
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".csv,.json,.txt"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
          </Box>
          
          {isProcessing && (
            <Box sx={{ mt: 2 }}>
              <LinearProgress variant="determinate" value={uploadProgress} />
              <Typography variant="body2" sx={{ mt: 1 }}>
                Processando: {uploadProgress.toFixed(0)}%
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Lista de Arquivos */}
      {files.length > 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              📁 Arquivos Carregados ({files.length})
            </Typography>
            
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Arquivo</TableCell>
                    <TableCell>Tamanho</TableCell>
                    <TableCell>Linhas</TableCell>
                    <TableCell>Colunas</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {files.map((file, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <InsertDriveFile sx={{ mr: 1, color: '#1976d2' }} />
                          {file.name}
                        </Box>
                      </TableCell>
                      <TableCell>{(file.size / 1024).toFixed(0)} KB</TableCell>
                      <TableCell>{file.statistics.rows.toLocaleString()}</TableCell>
                      <TableCell>{file.statistics.columns}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          {file.processed && (
                            <Chip
                              icon={<CheckCircle />}
                              label="Processado"
                              color="success"
                              size="small"
                            />
                          )}
                          {file.cleaned && (
                            <Chip
                              icon={<CleaningServices />}
                              label="Limpo"
                              color="primary"
                              size="small"
                            />
                          )}
                          {file.errors.length > 0 && (
                            <Chip
                              icon={<Error />}
                              label={`${file.errors.length} erros`}
                              color="error"
                              size="small"
                            />
                          )}
                          {file.warnings.length > 0 && (
                            <Chip
                              icon={<Warning />}
                              label={`${file.warnings.length} avisos`}
                              color="warning"
                              size="small"
                            />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="Visualizar">
                            <IconButton
                              size="small"
                              onClick={() => {
                                setSelectedFile(file);
                                setPreviewDialog(true);
                              }}
                            >
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Limpar Dados">
                            <IconButton
                              size="small"
                              onClick={() => {
                                setSelectedFile(file);
                                setCleaningDialog(true);
                              }}
                            >
                              <CleaningServices />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Analisar">
                            <IconButton
                              size="small"
                              color="primary"
                            >
                              <Analytics />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Remover">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => removeFile(file.name)}
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {/* Seleção do Tipo de Análise */}
      {files.length > 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              🎯 Tipo de Análise
            </Typography>
            
            <Grid container spacing={2}>
              {[
                { id: 'descriptive', name: 'Análise Descritiva', icon: <BarChart />, desc: 'Estatísticas básicas e distribuições' },
                { id: 'correlation', name: 'Análise de Correlação', icon: <Timeline />, desc: 'Relações entre variáveis' },
                { id: 'clustering', name: 'Agrupamento', icon: <PieChart />, desc: 'Identificação de grupos nos dados' },
                { id: 'regression', name: 'Regressão', icon: <Assessment />, desc: 'Modelos preditivos lineares' },
                { id: 'classification', name: 'Classificação', icon: <TableChart />, desc: 'Modelos de machine learning' }
              ].map((analysis) => (
                <Grid item xs={12} md={6} lg={4} key={analysis.id}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      border: analysisType === analysis.id ? '2px solid #1976d2' : '1px solid #e0e0e0',
                      '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 }
                    }}
                    onClick={() => setAnalysisType(analysis.id)}
                  >
                    <CardContent sx={{ textAlign: 'center' }}>
                      {analysis.icon}
                      <Typography variant="h6" sx={{ mt: 1 }}>
                        {analysis.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {analysis.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            
            {analysisType && (
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<PlayArrow />}
                  onClick={() => setCurrentStep(4)}
                >
                  Iniciar Análise
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      )}

      {/* Dialog de Preview */}
      <Dialog
        open={previewDialog}
        onClose={() => setPreviewDialog(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          📊 Preview: {selectedFile?.name}
        </DialogTitle>
        <DialogContent>
          {selectedFile && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Estatísticas do Arquivo
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4">{selectedFile.statistics.rows.toLocaleString()}</Typography>
                    <Typography variant="body2">Linhas</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4">{selectedFile.statistics.columns}</Typography>
                    <Typography variant="body2">Colunas</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4">{selectedFile.statistics.nullValues.toLocaleString()}</Typography>
                    <Typography variant="body2">Valores Nulos</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4">{selectedFile.statistics.duplicates}</Typography>
                    <Typography variant="body2">Duplicatas</Typography>
                  </Paper>
                </Grid>
              </Grid>
              
              <Typography variant="h6" sx={{ mb: 2 }}>
                Preview dos Dados (primeiras 10 linhas)
              </Typography>
              
              <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      {selectedFile.headers.map((header) => (
                        <TableCell key={header}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {header}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            ({selectedFile.statistics.dataTypes[header]})
                          </Typography>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedFile.preview.map((row, index) => (
                      <TableRow key={index}>
                        {selectedFile.headers.map((header) => (
                          <TableCell key={header}>
                            {row[header]?.toString() || '-'}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              {(selectedFile.errors.length > 0 || selectedFile.warnings.length > 0) && (
                <Box sx={{ mt: 3 }}>
                  {selectedFile.errors.map((error, index) => (
                    <Alert key={index} severity="error" sx={{ mb: 1 }}>
                      {error}
                    </Alert>
                  ))}
                  {selectedFile.warnings.map((warning, index) => (
                    <Alert key={index} severity="warning" sx={{ mb: 1 }}>
                      {warning}
                    </Alert>
                  ))}
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewDialog(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de Limpeza */}
      <Dialog
        open={cleaningDialog}
        onClose={() => setCleaningDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          🧹 Limpeza de Dados: {selectedFile?.name}
        </DialogTitle>
        <DialogContent>
          {selectedFile && (
            <Box>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Selecione as etapas de limpeza que deseja aplicar aos dados:
              </Typography>
              
              {cleaningSteps.map((step) => (
                <Accordion key={step.id}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <Typography variant="subtitle1" sx={{ flex: 1 }}>
                        {step.name}
                      </Typography>
                      <Chip
                        label={step.automated ? 'Automático' : 'Manual'}
                        size="small"
                        color={step.automated ? 'success' : 'warning'}
                      />
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" color="text.secondary">
                      {step.description}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCleaningDialog(false)}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={() => selectedFile && cleanData(selectedFile)}
            startIcon={<CleaningServices />}
          >
            Aplicar Limpeza
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UploadSistemaProfissional;
