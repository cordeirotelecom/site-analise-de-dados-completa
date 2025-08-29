import React, { useState, useCallback } from 'react';
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
} from '@mui/icons-material';

interface UploadAreaProps {
  onDataUpload: (data: any) => void;
}

const UploadArea: React.FC<UploadAreaProps> = ({ onDataUpload }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dataPreview, setDataPreview] = useState<any>(null);
  const [dataInfo, setDataInfo] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [currentStep, setCurrentStep] = useState(0);

  const supportedFormats = [
    { 
      format: 'CSV', 
      extension: '.csv', 
      description: 'Valores separados por vírgula - formato mais comum',
      icon: <TableChart />,
      maxSize: '100MB',
      features: ['Estrutura tabular', 'Cabeçalhos automáticos', 'Tipos inferidos']
    },
    { 
      format: 'Excel', 
      extension: '.xlsx, .xls', 
      description: 'Planilhas do Microsoft Excel',
      icon: <InsertDriveFile />,
      maxSize: '50MB',
      features: ['Múltiplas abas', 'Formatação preservada', 'Fórmulas convertidas']
    },
    { 
      format: 'JSON', 
      extension: '.json', 
      description: 'JavaScript Object Notation - dados estruturados',
      icon: <DataObject />,
      maxSize: '50MB',
      features: ['Dados aninhados', 'Arrays e objetos', 'Metadados preservados']
    },
    { 
      format: 'Parquet', 
      extension: '.parquet', 
      description: 'Formato columnar otimizado para big data',
      icon: <Speed />,
      maxSize: '500MB',
      features: ['Compressão eficiente', 'Tipos preservados', 'Performance otimizada']
    },
  ];

  const steps = [
    'Seleção do Arquivo',
    'Validação e Upload',
    'Análise Preliminar',
    'Pronto para Análise'
  ];

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
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const processFile = async (file: File) => {
    setError('');
    setUploading(true);
    setUploadProgress(0);
    setCurrentStep(1);
    
    try {
      // Validação do arquivo
      const validTypes = [
        'text/csv',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/json',
        'application/octet-stream', // para parquet
      ];

      if (!validTypes.includes(file.type) && !file.name.match(/\\.(csv|xlsx?|json|parquet)$/i)) {
        throw new Error('Tipo de arquivo não suportado. Use CSV, Excel, JSON ou Parquet.');
      }

      if (file.size > 500 * 1024 * 1024) { // 500MB
        throw new Error('Arquivo muito grande. Tamanho máximo: 500MB.');
      }

      setCurrentStep(2);

      // Processar o arquivo (simulação)
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          let data: any[] = [];
          let info = {
            fileName: file.name,
            fileSize: (file.size / 1024 / 1024).toFixed(2) + ' MB',
            fileType: file.type || 'application/octet-stream',
            lastModified: new Date(file.lastModified).toLocaleString(),
            encoding: 'UTF-8',
            rows: 0,
            columns: 0,
            missingValues: 0,
            duplicates: 0,
            memoryUsage: '0 MB',
            dataTypes: {} as any,
          };

          if (file.name.endsWith('.csv')) {
            const text = e.target?.result as string;
            const lines = text.split('\\n').filter(line => line.trim());
            const headers = lines[0].split(',').map(h => h.trim().replace(/\"/g, ''));
            
            // Simular dados estruturados
            data = lines.slice(1, 6).map(line => {
              const values = line.split(',').map(v => v.trim().replace(/\"/g, ''));
              const row: any = {};
              headers.forEach((header, index) => {
                row[header] = values[index] || null;
              });
              return row;
            });

            info.rows = lines.length - 1;
            info.columns = headers.length;
            info.dataTypes = headers.reduce((acc, header) => {
              acc[header] = inferDataType(data.map((row: any) => row[header]));
              return acc;
            }, {} as any);

          } else if (file.name.endsWith('.json')) {
            data = JSON.parse(e.target?.result as string);
            if (Array.isArray(data)) {
              info.rows = data.length;
              info.columns = data.length > 0 ? Object.keys(data[0]).length : 0;
            }
          } else {
            // Para Excel e Parquet, simular dados
            data = [
              { id: 1, name: 'Amostra 1', value: 100, category: 'A' },
              { id: 2, name: 'Amostra 2', value: 200, category: 'B' },
              { id: 3, name: 'Amostra 3', value: 150, category: 'A' },
            ];
            info.rows = 3;
            info.columns = 4;
          }

          // Calcular estatísticas adicionais
          info.missingValues = countMissingValues(data);
          info.duplicates = countDuplicates(data);
          info.memoryUsage = estimateMemoryUsage(data);

          setDataPreview(data);
          setDataInfo(info);
          setCurrentStep(3);

          // Notificar componente pai
          onDataUpload({
            data,
            info,
            file: {
              name: file.name,
              size: file.size,
              type: file.type,
              lastModified: file.lastModified,
            }
          });

          setTimeout(() => setCurrentStep(4), 1000);

        } catch (err) {
          setError('Erro ao processar o arquivo. Verifique o formato e tente novamente.');
          setCurrentStep(0);
        }
      };

      reader.onerror = () => {
        setError('Erro ao ler o arquivo.');
        setCurrentStep(0);
      };

      reader.readAsText(file);

    } catch (err: any) {
      setError(err.message);
      setCurrentStep(0);
    } finally {
      setUploading(false);
    }
  };

  const inferDataType = (values: any[]) => {
    const nonNullValues = values.filter(v => v !== null && v !== undefined && v !== '');
    if (nonNullValues.length === 0) return 'string';
    
    if (nonNullValues.every(v => !isNaN(Number(v)))) {
      return nonNullValues.every(v => Number.isInteger(Number(v))) ? 'integer' : 'float';
    }
    
    if (nonNullValues.every(v => ['true', 'false', 'True', 'False', '1', '0'].includes(String(v)))) {
      return 'boolean';
    }
    
    return 'string';
  };

  const countMissingValues = (data: any[]): number => {
    return data.reduce((count, row) => {
      return count + Object.values(row).filter(v => v === null || v === undefined || v === '').length;
    }, 0);
  };

  const countDuplicates = (data: any[]): number => {
    const seen = new Set();
    let duplicates = 0;
    data.forEach(row => {
      const key = JSON.stringify(row);
      if (seen.has(key)) {
        duplicates++;
      } else {
        seen.add(key);
      }
    });
    return duplicates;
  };

  const estimateMemoryUsage = (data: any[]): string => {
    const size = new Blob([JSON.stringify(data)]).size;
    return (size / 1024 / 1024).toFixed(2) + ' MB';
  };

  return (
    <Box>
      {/* Header */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Upload e Preparação de Dados
      </Typography>

      {/* Stepper */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stepper activeStep={currentStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      <Grid container spacing={3}>
        {/* Upload Area */}
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 4,
              border: `2px dashed ${isDragOver ? '#2563eb' : '#e2e8f0'}`,
              backgroundColor: isDragOver ? '#f8fafc' : 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              minHeight: 200,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Arraste seu arquivo aqui ou clique para selecionar
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
              Suportamos CSV, Excel, JSON e Parquet até 500MB
            </Typography>
            
            <input
              id="file-input"
              type="file"
              accept=".csv,.xlsx,.xls,.json,.parquet"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />

            <Button variant="outlined" component="span">
              Selecionar Arquivo
            </Button>

            {uploading && (
              <Box sx={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
                <LinearProgress variant="determinate" value={uploadProgress} />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                  Processando... {uploadProgress}%
                </Typography>
              </Box>
            )}
          </Paper>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {/* Informações do Arquivo */}
          {dataInfo && (
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Analytics />
                  Informações do Dataset
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="subtitle2" color="primary" gutterBottom>
                        Arquivo
                      </Typography>
                      <Typography variant="body2">Nome: {dataInfo.fileName}</Typography>
                      <Typography variant="body2">Tamanho: {dataInfo.fileSize}</Typography>
                      <Typography variant="body2">Tipo: {dataInfo.fileType}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="subtitle2" color="primary" gutterBottom>
                        Estrutura
                      </Typography>
                      <Typography variant="body2">Linhas: {dataInfo.rows.toLocaleString()}</Typography>
                      <Typography variant="body2">Colunas: {dataInfo.columns}</Typography>
                      <Typography variant="body2">Memória: {dataInfo.memoryUsage}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="subtitle2" color="primary" gutterBottom>
                        Qualidade
                      </Typography>
                      <Typography variant="body2">Valores ausentes: {dataInfo.missingValues}</Typography>
                      <Typography variant="body2">Duplicatas: {dataInfo.duplicates}</Typography>
                      <Typography variant="body2">
                        Qualidade: {dataInfo.missingValues + dataInfo.duplicates === 0 ? 'Excelente' : 'Boa'}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="subtitle2" color="primary" gutterBottom>
                        Tipos de Dados
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {Object.entries(dataInfo.dataTypes).slice(0, 3).map(([col, type]) => (
                          <Chip 
                            key={col} 
                            label={`${col}: ${type}`} 
                            size="small" 
                            variant="outlined"
                          />
                        ))}
                        {Object.keys(dataInfo.dataTypes).length > 3 && (
                          <Chip 
                            label={`+${Object.keys(dataInfo.dataTypes).length - 3} mais`} 
                            size="small" 
                            variant="outlined"
                          />
                        )}
                      </Stack>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}

          {/* Preview dos Dados */}
          {dataPreview && (
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Preview dos Dados
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        {Object.keys(dataPreview[0] || {}).map((key) => (
                          <TableCell key={key} sx={{ fontWeight: 600 }}>
                            {key}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dataPreview.slice(0, 5).map((row: any, index: number) => (
                        <TableRow key={index}>
                          {Object.values(row).map((value: any, cellIndex: number) => (
                            <TableCell key={cellIndex}>
                              {value !== null && value !== undefined ? String(value) : <em>null</em>}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Mostrando primeiras 5 linhas de {dataInfo?.rows} total
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>

        {/* Formatos Suportados */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Formatos Suportados
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Carregue dados nos formatos mais populares
              </Typography>
              
              <Stack spacing={2}>
                {supportedFormats.map((format, index) => (
                  <Accordion key={index} variant="outlined">
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {format.icon}
                        <Box>
                          <Typography variant="subtitle2">
                            {format.format}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {format.extension}
                          </Typography>
                        </Box>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {format.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" gutterBottom>
                        Tamanho máximo: {format.maxSize}
                      </Typography>
                      <List dense>
                        {format.features.map((feature, idx) => (
                          <ListItem key={idx} sx={{ py: 0.5, pl: 0 }}>
                            <ListItemText 
                              primary={`• ${feature}`}
                              primaryTypographyProps={{ variant: 'caption' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Stack>
            </CardContent>
          </Card>

          {/* Dicas */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Info />
                Dicas de Upload
              </Typography>
              
              <List dense>
                <ListItem sx={{ pl: 0 }}>
                  <ListItemText 
                    primary="Certifique-se de que seu arquivo tenha cabeçalhos na primeira linha"
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
                <ListItem sx={{ pl: 0 }}>
                  <ListItemText 
                    primary="Evite caracteres especiais nos nomes das colunas"
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
                <ListItem sx={{ pl: 0 }}>
                  <ListItemText 
                    primary="Para arquivos grandes, considere usar formato Parquet"
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
                <ListItem sx={{ pl: 0 }}>
                  <ListItemText 
                    primary="Dados em UTF-8 são processados mais rapidamente"
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UploadArea;
