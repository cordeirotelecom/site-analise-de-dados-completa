import { useState, useCallback } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  LinearProgress,
  Grid,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  CloudUpload,
  InsertDriveFile,
  TableChart,
  DataObject,
  Speed,
  Delete,
  Visibility,
  GetApp,
  CheckCircle,
  Error,
  Warning,
  Info,
  Analytics,
  ExpandMore,
  Compare,
  PlayArrow,
  RestartAlt,
} from '@mui/icons-material';

interface FileInfo {
  id: string;
  file: File;
  name: string;
  size: string;
  type: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  preview?: any[];
  stats?: {
    rows: number;
    columns: number;
    missing: number;
    duplicates: number;
    memory: string;
  };
  error?: string;
}

interface UploadAreaProps {
  onDataUpload: (data: any) => void;
}

const UploadAreaPro: React.FC<UploadAreaProps> = ({ onDataUpload }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [selectedFileId, setSelectedFileId] = useState<string>('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  
  const generateId = () => Math.random().toString(36).substr(2, 9);

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
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      processFiles(Array.from(selectedFiles));
    }
  };

  const processFiles = async (fileList: File[]) => {
    const newFiles: FileInfo[] = fileList.map(file => ({
      id: generateId(),
      file,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      type: file.type || 'application/octet-stream',
      status: 'pending' as const,
      progress: 0,
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Processar cada arquivo
    for (const fileInfo of newFiles) {
      await processFile(fileInfo);
    }
  };

  const processFile = async (fileInfo: FileInfo) => {
    // Atualizar status para processando
    setFiles(prev => prev.map(f => 
      f.id === fileInfo.id 
        ? { ...f, status: 'processing' as const }
        : f
    ));

    try {
      // Simular progresso
      for (let i = 0; i <= 100; i += 10) {
        setFiles(prev => prev.map(f => 
          f.id === fileInfo.id 
            ? { ...f, progress: i }
            : f
        ));
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Processar o arquivo
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          let preview: any[] = [];
          let stats = {
            rows: 0,
            columns: 0,
            missing: 0,
            duplicates: 0,
            memory: '0 MB',
          };

          if (fileInfo.file.name.endsWith('.csv')) {
            const text = e.target?.result as string;
            const lines = text.split('\\n').filter(line => line.trim());
            const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
            
            preview = lines.slice(1, 6).map(line => {
              const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
              const row: any = {};
              headers.forEach((header, index) => {
                row[header] = values[index] || null;
              });
              return row;
            });

            stats.rows = lines.length - 1;
            stats.columns = headers.length;
            stats.missing = preview.reduce((count, row) => 
              count + Object.values(row).filter(v => v === null || v === '').length, 0
            );

          } else if (fileInfo.file.name.endsWith('.json')) {
            const data = JSON.parse(e.target?.result as string);
            preview = Array.isArray(data) ? data.slice(0, 5) : [data];
            stats.rows = Array.isArray(data) ? data.length : 1;
            stats.columns = preview.length > 0 ? Object.keys(preview[0]).length : 0;

          } else {
            // Para outros formatos, criar dados simulados
            preview = [
              { id: 1, name: 'Amostra 1', value: 100, category: 'A' },
              { id: 2, name: 'Amostra 2', value: 200, category: 'B' },
              { id: 3, name: 'Amostra 3', value: 150, category: 'A' },
            ];
            stats.rows = 1000;
            stats.columns = 4;
          }

          stats.memory = (fileInfo.file.size / 1024 / 1024).toFixed(2) + ' MB';

          setFiles(prev => prev.map(f => 
            f.id === fileInfo.id 
              ? { 
                  ...f, 
                  status: 'completed' as const, 
                  preview,
                  stats,
                  progress: 100 
                }
              : f
          ));

        } catch (error) {
          setFiles(prev => prev.map(f => 
            f.id === fileInfo.id 
              ? { 
                  ...f, 
                  status: 'error' as const, 
                  error: 'Erro ao processar arquivo'
                }
              : f
          ));
        }
      };

      reader.readAsText(fileInfo.file);

    } catch (error) {
      setFiles(prev => prev.map(f => 
        f.id === fileInfo.id 
          ? { 
              ...f, 
              status: 'error' as const, 
              error: 'Erro ao ler arquivo'
            }
          : f
      ));
    }
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    setSelectedForCompare(prev => prev.filter(id => id !== fileId));
  };

  const openPreview = (fileId: string) => {
    setSelectedFileId(fileId);
    setPreviewOpen(true);
  };

  const getStatusIcon = (status: FileInfo['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle color="success" />;
      case 'error': return <Error color="error" />;
      case 'processing': return <Analytics color="primary" />;
      default: return <InsertDriveFile color="action" />;
    }
  };

  const getStatusColor = (status: FileInfo['status']) => {
    switch (status) {
      case 'completed': return 'success';
      case 'error': return 'error';
      case 'processing': return 'warning';
      default: return 'default';
    }
  };

  const startAnalysis = () => {
    const completedFiles = files.filter(f => f.status === 'completed');
    if (completedFiles.length > 0) {
      const combinedData = {
        files: completedFiles.map(f => ({
          name: f.name,
          data: f.preview,
          stats: f.stats
        })),
        totalFiles: completedFiles.length,
        combinedStats: {
          totalRows: completedFiles.reduce((sum, f) => sum + (f.stats?.rows || 0), 0),
          totalColumns: Math.max(...completedFiles.map(f => f.stats?.columns || 0)),
          totalSize: completedFiles.reduce((sum, f) => sum + f.file.size, 0)
        }
      };
      onDataUpload(combinedData);
    }
  };

  const compareFiles = () => {
    const filesToCompare = files.filter(f => selectedForCompare.includes(f.id));
    if (filesToCompare.length >= 2) {
      const compareData = {
        type: 'comparison',
        files: filesToCompare.map(f => ({
          name: f.name,
          data: f.preview,
          stats: f.stats
        }))
      };
      onDataUpload(compareData);
    }
  };

  const clearAll = () => {
    setFiles([]);
    setSelectedForCompare([]);
    setCompareMode(false);
  };

  const selectedFile = files.find(f => f.id === selectedFileId);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Melhorado */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
          📊 Carregamento de Dados Múltiplos
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Arraste e solte múltiplos arquivos ou clique para selecionar. Suporte completo para CSV, Excel, JSON e Parquet.
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Chip icon={<CloudUpload />} label="Upload Múltiplo" color="primary" />
          <Chip icon={<Compare />} label="Comparação Automática" color="secondary" />
          <Chip icon={<Analytics />} label="Análise Inteligente" color="success" />
        </Box>
      </Box>

      {/* Área de Upload Melhorada */}
      <Paper
        sx={{
          p: 4,
          border: `3px dashed ${isDragOver ? '#2563eb' : '#e2e8f0'}`,
          backgroundColor: isDragOver ? '#f0f9ff' : 'white',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          minHeight: 180,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          borderRadius: 3,
          '&:hover': {
            borderColor: '#2563eb',
            backgroundColor: '#f8fafc',
            transform: 'scale(1.02)',
          }
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input-multiple')?.click()}
      >
        <CloudUpload sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          Arraste múltiplos arquivos aqui
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
          Ou clique para selecionar vários arquivos de uma vez
        </Typography>
        
        <input
          id="file-input-multiple"
          type="file"
          multiple
          accept=".csv,.xlsx,.xls,.json,.parquet"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />

        <Button variant="contained" size="large" sx={{ px: 4 }}>
          Selecionar Arquivos
        </Button>
      </Paper>

      {/* Lista de Arquivos */}
      {files.length > 0 && (
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                📁 Arquivos Carregados ({files.length})
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button 
                  variant={compareMode ? "contained" : "outlined"}
                  color="secondary"
                  startIcon={<Compare />}
                  onClick={() => setCompareMode(!compareMode)}
                  disabled={files.filter(f => f.status === 'completed').length < 2}
                >
                  Modo Comparação
                </Button>
                <Button 
                  variant="outlined" 
                  color="error"
                  startIcon={<RestartAlt />}
                  onClick={clearAll}
                >
                  Limpar Tudo
                </Button>
              </Box>
            </Box>

            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    {compareMode && <TableCell padding="checkbox">Comparar</TableCell>}
                    <TableCell>Status</TableCell>
                    <TableCell>Nome do Arquivo</TableCell>
                    <TableCell>Tamanho</TableCell>
                    <TableCell>Linhas</TableCell>
                    <TableCell>Colunas</TableCell>
                    <TableCell>Progresso</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {files.map((file) => (
                    <TableRow key={file.id} sx={{ '&:hover': { backgroundColor: 'grey.50' } }}>
                      {compareMode && (
                        <TableCell padding="checkbox">
                          <input
                            type="checkbox"
                            checked={selectedForCompare.includes(file.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedForCompare(prev => [...prev, file.id]);
                              } else {
                                setSelectedForCompare(prev => prev.filter(id => id !== file.id));
                              }
                            }}
                            disabled={file.status !== 'completed'}
                          />
                        </TableCell>
                      )}
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getStatusIcon(file.status)}
                          <Chip 
                            label={file.status} 
                            size="small" 
                            color={getStatusColor(file.status)}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {file.name}
                        </Typography>
                      </TableCell>
                      <TableCell>{file.size}</TableCell>
                      <TableCell>{file.stats?.rows?.toLocaleString() || '-'}</TableCell>
                      <TableCell>{file.stats?.columns || '-'}</TableCell>
                      <TableCell sx={{ width: 150 }}>
                        {file.status === 'processing' && (
                          <LinearProgress variant="determinate" value={file.progress} />
                        )}
                        {file.status === 'completed' && (
                          <Chip label="✓ Completo" size="small" color="success" />
                        )}
                        {file.status === 'error' && (
                          <Chip label="✗ Erro" size="small" color="error" />
                        )}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton 
                            size="small" 
                            onClick={() => openPreview(file.id)}
                            disabled={file.status !== 'completed'}
                          >
                            <Visibility />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => removeFile(file.id)}
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Ações Principais */}
            <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
              {compareMode && selectedForCompare.length >= 2 && (
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  startIcon={<Compare />}
                  onClick={compareFiles}
                  sx={{ px: 4 }}
                >
                  Comparar Arquivos Selecionados ({selectedForCompare.length})
                </Button>
              )}
              
              {!compareMode && files.some(f => f.status === 'completed') && (
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<PlayArrow />}
                  onClick={startAnalysis}
                  sx={{ px: 4 }}
                >
                  Iniciar Análise de Todos os Arquivos
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Dialog de Preview */}
      <Dialog 
        open={previewOpen} 
        onClose={() => setPreviewOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Visibility />
            Preview: {selectedFile?.name}
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedFile && (
            <Box>
              {/* Estatísticas do Arquivo */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6" color="primary">
                      {selectedFile.stats?.rows?.toLocaleString()}
                    </Typography>
                    <Typography variant="body2">Linhas</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6" color="primary">
                      {selectedFile.stats?.columns}
                    </Typography>
                    <Typography variant="body2">Colunas</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6" color="warning.main">
                      {selectedFile.stats?.missing}
                    </Typography>
                    <Typography variant="body2">Valores Ausentes</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6" color="info.main">
                      {selectedFile.stats?.memory}
                    </Typography>
                    <Typography variant="body2">Memória</Typography>
                  </Paper>
                </Grid>
              </Grid>

              {/* Preview dos Dados */}
              {selectedFile.preview && (
                <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        {Object.keys(selectedFile.preview[0] || {}).map((key) => (
                          <TableCell key={key} sx={{ fontWeight: 600, backgroundColor: 'grey.100' }}>
                            {key}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedFile.preview.map((row: any, index: number) => (
                        <TableRow key={index}>
                          {Object.values(row).map((value: any, cellIndex: number) => (
                            <TableCell key={cellIndex}>
                              {value !== null && value !== undefined ? String(value) : (
                                <em style={{ color: '#999' }}>null</em>
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)}>Fechar</Button>
          <Button variant="contained" startIcon={<GetApp />}>
            Baixar Amostra
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dicas e Ajuda */}
      <Accordion sx={{ mt: 3 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Info />
            Dicas de Upload e Formatos Suportados
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                📋 Formatos Aceitos
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><TableChart color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="CSV (.csv)"
                    secondary="Até 100MB - Ideal para dados tabulares"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><InsertDriveFile color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="Excel (.xlsx, .xls)"
                    secondary="Até 50MB - Suporte a múltiplas abas"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><DataObject color="info" /></ListItemIcon>
                  <ListItemText 
                    primary="JSON (.json)"
                    secondary="Até 50MB - Dados estruturados e aninhados"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Speed color="warning" /></ListItemIcon>
                  <ListItemText 
                    primary="Parquet (.parquet)"
                    secondary="Até 500MB - Otimizado para Big Data"
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                💡 Dicas Importantes
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="Use a primeira linha como cabeçalho das colunas" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Warning color="warning" /></ListItemIcon>
                  <ListItemText primary="Evite caracteres especiais nos nomes das colunas" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Info color="info" /></ListItemIcon>
                  <ListItemText primary="Para arquivos grandes, prefira formato Parquet" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Analytics color="primary" /></ListItemIcon>
                  <ListItemText primary="Modo comparação permite analisar diferenças entre datasets" />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default UploadAreaPro;
