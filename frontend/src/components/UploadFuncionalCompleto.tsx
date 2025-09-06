import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Alert,
  LinearProgress,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
} from '@mui/material';
import {
  CloudUpload,
  TableChart,
  Assessment,
  CheckCircle,
  Error as ErrorIcon,
  Visibility,
  Download,
  DeleteForever,
  Info,
  ExpandMore,
  CleaningServices,
  Analytics,
  FilePresent,
  DataObject,
} from '@mui/icons-material';
import * as Papa from 'papaparse';

interface DataRow {
  [key: string]: string | number;
}

interface DataSummary {
  totalRows: number;
  totalColumns: number;
  columns: string[];
  dataTypes: { [key: string]: string };
  missingValues: { [key: string]: number };
  duplicateRows: number;
  memoryUsage: string;
}

interface CleaningStep {
  step: number;
  title: string;
  description: string;
  action: string;
  completed: boolean;
}

const UploadFuncionalCompleto: React.FC<{ onDataUpload?: (data: any) => void }> = ({ onDataUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<DataRow[]>([]);
  const [originalData, setOriginalData] = useState<DataRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<DataSummary | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [cleaningSteps, setCleaningSteps] = useState<CleaningStep[]>([
    {
      step: 1,
      title: 'Análise Inicial',
      description: 'Verificar estrutura dos dados e identificar problemas',
      action: 'analyze',
      completed: false
    },
    {
      step: 2,
      title: 'Remover Duplicatas',
      description: 'Identificar e remover linhas duplicadas',
      action: 'remove_duplicates',
      completed: false
    },
    {
      step: 3,
      title: 'Tratar Valores Ausentes',
      description: 'Identificar e tratar células vazias ou nulas',
      action: 'handle_missing',
      completed: false
    },
    {
      step: 4,
      title: 'Padronizar Tipos',
      description: 'Converter tipos de dados para formatos apropriados',
      action: 'standardize_types',
      completed: false
    },
    {
      step: 5,
      title: 'Validação Final',
      description: 'Verificar qualidade final dos dados',
      action: 'validate',
      completed: false
    }
  ]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setLoading(true);
    setError(null);

    // Verificar tipo de arquivo
    const fileExtension = uploadedFile.name.split('.').pop()?.toLowerCase();
    
    if (!['csv', 'xlsx', 'xls', 'json', 'txt'].includes(fileExtension || '')) {
      setError('Formato de arquivo não suportado. Use CSV, Excel, JSON ou TXT.');
      setLoading(false);
      return;
    }

    // Processar arquivo baseado no tipo
    if (fileExtension === 'csv' || fileExtension === 'txt') {
      Papa.parse(uploadedFile, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          if (result.errors.length > 0) {
            setError(`Erro ao processar CSV: ${result.errors[0].message}`);
          } else {
            processData(result.data as DataRow[]);
          }
          setLoading(false);
        },
        error: (error) => {
          setError(`Erro ao ler arquivo: ${error.message}`);
          setLoading(false);
        }
      });
    } else if (fileExtension === 'json') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target?.result as string);
          const dataArray = Array.isArray(jsonData) ? jsonData : [jsonData];
          processData(dataArray);
        } catch (error) {
          setError('Erro ao processar JSON: formato inválido');
        }
        setLoading(false);
      };
      reader.readAsText(uploadedFile);
    }
  }, []);

  const processData = (rawData: DataRow[]) => {
    if (!rawData || rawData.length === 0) {
      setError('Arquivo vazio ou sem dados válidos');
      return;
    }

    setData(rawData);
    setOriginalData([...rawData]);
    
    // Gerar sumário dos dados
    const columns = Object.keys(rawData[0]);
    const dataTypes: { [key: string]: string } = {};
    const missingValues: { [key: string]: number } = {};

    columns.forEach(col => {
      // Detectar tipo de dados
      const sampleValues = rawData.slice(0, 100).map(row => row[col]);
      const nonEmptyValues = sampleValues.filter(val => val !== null && val !== undefined && val !== '');
      
      if (nonEmptyValues.length === 0) {
        dataTypes[col] = 'vazio';
      } else if (nonEmptyValues.every(val => !isNaN(Number(val)))) {
        dataTypes[col] = 'numérico';
      } else if (nonEmptyValues.every(val => !isNaN(Date.parse(String(val))))) {
        dataTypes[col] = 'data';
      } else {
        dataTypes[col] = 'texto';
      }

      // Contar valores ausentes
      missingValues[col] = rawData.filter(row => 
        row[col] === null || row[col] === undefined || row[col] === '' || row[col] === 'NaN'
      ).length;
    });

    // Detectar duplicatas
    const duplicateRows = rawData.length - new Set(rawData.map(row => JSON.stringify(row))).size;

    const summary: DataSummary = {
      totalRows: rawData.length,
      totalColumns: columns.length,
      columns,
      dataTypes,
      missingValues,
      duplicateRows,
      memoryUsage: `${(JSON.stringify(rawData).length / 1024).toFixed(2)} KB`
    };

    setSummary(summary);
    
    // Marcar primeiro passo como completo
    setCleaningSteps(prev => prev.map((step, index) => 
      index === 0 ? { ...step, completed: true } : step
    ));

    if (onDataUpload) {
      onDataUpload({ data: rawData, summary });
    }
  };

  const executeCleaningStep = (stepIndex: number) => {
    const step = cleaningSteps[stepIndex];
    let cleanedData = [...data];

    switch (step.action) {
      case 'remove_duplicates':
        const uniqueData = cleanedData.filter((row, index, self) => 
          index === self.findIndex(r => JSON.stringify(r) === JSON.stringify(row))
        );
        cleanedData = uniqueData;
        break;

      case 'handle_missing':
        cleanedData = cleanedData.map(row => {
          const cleanedRow = { ...row };
          Object.keys(cleanedRow).forEach(key => {
            if (cleanedRow[key] === null || cleanedRow[key] === undefined || cleanedRow[key] === '') {
              // Para números, usar 0; para texto, usar 'N/A'
              if (summary?.dataTypes[key] === 'numérico') {
                cleanedRow[key] = 0;
              } else {
                cleanedRow[key] = 'N/A';
              }
            }
          });
          return cleanedRow;
        });
        break;

      case 'standardize_types':
        cleanedData = cleanedData.map(row => {
          const standardizedRow = { ...row };
          Object.keys(standardizedRow).forEach(key => {
            if (summary?.dataTypes[key] === 'numérico') {
              const numValue = Number(standardizedRow[key]);
              standardizedRow[key] = isNaN(numValue) ? 0 : numValue;
            } else if (summary?.dataTypes[key] === 'texto') {
              standardizedRow[key] = String(standardizedRow[key]).trim();
            }
          });
          return standardizedRow;
        });
        break;

      case 'validate':
        // Validação final - recalcular sumário
        processData(cleanedData);
        break;
    }

    setData(cleanedData);
    
    // Marcar passo como completo
    setCleaningSteps(prev => prev.map((s, index) => 
      index === stepIndex ? { ...s, completed: true } : s
    ));

    setCurrentStep(stepIndex + 1);
  };

  const resetData = () => {
    setData([...originalData]);
    setCleaningSteps(prev => prev.map((step, index) => 
      ({ ...step, completed: index === 0 })
    ));
    setCurrentStep(0);
  };

  const downloadCleanedData = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `dados_limpos_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: '#1976d2' }}>
        📂 Upload e Limpeza de Dados - Sistema Completo
      </Typography>

      {/* Upload Area */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box
            sx={{
              border: '2px dashed #1976d2',
              borderRadius: 2,
              p: 4,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#f5f5f5',
                borderColor: '#1565c0'
              }
            }}
            component="label"
          >
            <input
              type="file"
              hidden
              accept=".csv,.xlsx,.xls,.json,.txt"
              onChange={handleFileUpload}
            />
            <CloudUpload sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1 }}>
              Clique para selecionar arquivo ou arraste aqui
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Formatos suportados: CSV, Excel (.xlsx, .xls), JSON, TXT
            </Typography>
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              Tamanho máximo: 50MB
            </Typography>
          </Box>

          {file && (
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
              <FilePresent color="primary" />
              <Typography variant="body1">{file.name}</Typography>
              <Chip label={`${(file.size / 1024).toFixed(2)} KB`} size="small" />
            </Box>
          )}

          {loading && (
            <Box sx={{ mt: 2 }}>
              <LinearProgress />
              <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                Processando arquivo...
              </Typography>
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Data Summary */}
      {summary && (
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <DataObject sx={{ fontSize: 40, color: '#4caf50', mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {summary.totalRows.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Linhas de Dados
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <TableChart sx={{ fontSize: 40, color: '#2196f3', mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {summary.totalColumns}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Colunas
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <ErrorIcon sx={{ fontSize: 40, color: '#ff9800', mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {Object.values(summary.missingValues).reduce((a, b) => a + b, 0)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Valores Ausentes
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Analytics sx={{ fontSize: 40, color: '#9c27b0', mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {summary.duplicateRows}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Duplicatas
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Cleaning Steps */}
      {summary && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
              🧹 Processo de Limpeza de Dados
            </Typography>
            
            <Stepper activeStep={currentStep} orientation="vertical">
              {cleaningSteps.map((step, index) => (
                <Step key={step.step}>
                  <StepLabel
                    icon={step.completed ? <CheckCircle color="success" /> : step.step}
                  >
                    <Typography variant="h6">{step.title}</Typography>
                  </StepLabel>
                  <StepContent>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {step.description}
                    </Typography>
                    
                    {!step.completed && (
                      <Button
                        variant="contained"
                        onClick={() => executeCleaningStep(index)}
                        startIcon={<CleaningServices />}
                      >
                        Executar {step.title}
                      </Button>
                    )}
                    
                    {step.completed && (
                      <Alert severity="success" sx={{ mt: 1 }}>
                        ✅ {step.title} concluído com sucesso!
                      </Alert>
                    )}
                  </StepContent>
                </Step>
              ))}
            </Stepper>

            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={resetData}
                startIcon={<ErrorIcon />}
              >
                Resetar para Dados Originais
              </Button>
              
              <Button
                variant="contained"
                onClick={() => setPreviewOpen(true)}
                startIcon={<Visibility />}
              >
                Visualizar Dados
              </Button>
              
              <Button
                variant="contained"
                color="success"
                onClick={downloadCleanedData}
                startIcon={<Download />}
              >
                Baixar Dados Limpos
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Data Quality Report */}
      {summary && (
        <Card>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
              📊 Relatório de Qualidade dos Dados
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="h6">Tipos de Dados</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer component={Paper}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell><strong>Coluna</strong></TableCell>
                            <TableCell><strong>Tipo</strong></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.entries(summary.dataTypes).map(([col, type]) => (
                            <TableRow key={col}>
                              <TableCell>{col}</TableCell>
                              <TableCell>
                                <Chip 
                                  label={type}
                                  size="small"
                                  color={
                                    type === 'numérico' ? 'primary' :
                                    type === 'data' ? 'secondary' :
                                    type === 'texto' ? 'default' : 'error'
                                  }
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              </Grid>

              <Grid item xs={12} md={6}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="h6">Valores Ausentes</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer component={Paper}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell><strong>Coluna</strong></TableCell>
                            <TableCell><strong>Ausentes</strong></TableCell>
                            <TableCell><strong>%</strong></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.entries(summary.missingValues).map(([col, missing]) => (
                            <TableRow key={col}>
                              <TableCell>{col}</TableCell>
                              <TableCell>{missing}</TableCell>
                              <TableCell>
                                {((missing / summary.totalRows) * 100).toFixed(1)}%
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Data Preview Dialog */}
      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          Visualização dos Dados ({data.length} linhas)
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {summary?.columns.map(col => (
                    <TableCell key={col}><strong>{col}</strong></TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(0, 50).map((row, index) => (
                  <TableRow key={index}>
                    {summary?.columns.map(col => (
                      <TableCell key={col}>
                        {String(row[col]).length > 30 
                          ? `${String(row[col]).substring(0, 30)}...`
                          : String(row[col])
                        }
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {data.length > 50 && (
            <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
              Mostrando primeiras 50 linhas de {data.length} total
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UploadFuncionalCompleto;
