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
  Chip
} from '@mui/material';
import {
  CloudUpload,
  InsertDriveFile,
  CheckCircle
} from '@mui/icons-material';

interface UploadAreaProps {
  onDataUpload: (data: any) => void;
}

const UploadArea: React.FC<UploadAreaProps> = ({ onDataUpload }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dataPreview, setDataPreview] = useState<any>(null);
  const [error, setError] = useState<string>('');

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
      handleFileUpload(files[0] as File);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    setError('');
    setUploading(true);
    setUploadProgress(0);
    setUploadedFile(file);

    try {
      // Simular upload com progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Processar arquivo
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          let data;
          const result = e.target?.result as string;

          if (file.name.endsWith('.csv')) {
            // Processar CSV
            const lines = result.split('\n');
            const headers = lines[0].split(',');
            const rows = lines.slice(1, 11).map(line => {
              const values = line.split(',');
              const row: any = {};
              headers.forEach((header, index) => {
                row[header.trim()] = values[index]?.trim();
              });
              return row;
            });
            data = {
              headers,
              rows,
              totalRows: lines.length - 1,
              fileInfo: {
                name: file.name,
                size: file.size,
                type: file.type
              }
            };
          } else if (file.name.endsWith('.json')) {
            // Processar JSON
            const jsonData = JSON.parse(result);
            data = {
              data: jsonData,
              fileInfo: {
                name: file.name,
                size: file.size,
                type: file.type
              }
            };
          }

          clearInterval(interval);
          setUploadProgress(100);
          setDataPreview(data);
          onDataUpload(data);
          
          setTimeout(() => {
            setUploading(false);
          }, 500);

        } catch (err) {
          setError('Erro ao processar arquivo. Verifique o formato.');
          setUploading(false);
          clearInterval(interval);
        }
      };

      reader.readAsText(file);

    } catch (err) {
      setError('Erro no upload do arquivo.');
      setUploading(false);
    }
  };

  const getSupportedFormats = () => [
    { ext: 'CSV', desc: 'Comma-separated values' },
    { ext: 'XLSX', desc: 'Microsoft Excel' },
    { ext: 'JSON', desc: 'JavaScript Object Notation' },
    { ext: 'TSV', desc: 'Tab-separated values' },
    { ext: 'Parquet', desc: 'Apache Parquet (Em breve)' }
  ];

  return (
    <Box>
      <Grid container spacing={4}>
        {/* Área de Upload */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={3}
            className={`upload-area ${isDragOver ? 'dragover' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            sx={{
              p: 4,
              textAlign: 'center',
              border: isDragOver ? '2px dashed #1976d2' : '2px dashed #ccc',
              backgroundColor: isDragOver ? '#e3f2fd' : '#fafafa',
              transition: 'all 0.3s ease'
            }}
          >
            <CloudUpload sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
            
            <Typography variant="h5" gutterBottom>
              Carregar Dados
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Arraste e solte seus arquivos aqui ou clique para selecionar
            </Typography>

            <input
              type="file"
              accept=".csv,.xlsx,.xls,.json,.tsv"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
              id="file-upload"
            />
            
            <label htmlFor="file-upload">
              <Button
                component="span"
                variant="contained"
                size="large"
                startIcon={<InsertDriveFile />}
                disabled={uploading}
              >
                Selecionar Arquivo
              </Button>
            </label>

            {uploading && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Carregando {uploadedFile?.name}...
                </Typography>
                <LinearProgress variant="determinate" value={uploadProgress} />
                <Typography variant="caption" sx={{ mt: 1 }}>
                  {uploadProgress}%
                </Typography>
              </Box>
            )}

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            {dataPreview && !uploading && (
              <Alert severity="success" sx={{ mt: 2 }} icon={<CheckCircle />}>
                Arquivo carregado com sucesso! {dataPreview.totalRows || 'Dados'} registros encontrados.
              </Alert>
            )}
          </Paper>
        </Grid>

        {/* Formatos Suportados */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Formatos Suportados
              </Typography>
              <List dense>
                {getSupportedFormats().map((format, index) => (
                  <ListItem key={index} divider>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip label={format.ext} size="small" color="primary" />
                        </Box>
                      }
                      secondary={format.desc}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Dicas */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                💡 Dicas
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Arquivos até 100MB<br/>
                • Use a primeira linha para cabeçalhos<br/>
                • Evite células mescladas<br/>
                • Dados limpos = melhores resultados
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Preview dos Dados */}
      {dataPreview && !uploading && (
        <Paper elevation={2} sx={{ mt: 4, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Preview dos Dados
          </Typography>
          
          {dataPreview.headers && (
            <Box sx={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {dataPreview.headers.map((header: string, index: number) => (
                      <th
                        key={index}
                        style={{
                          border: '1px solid #ddd',
                          padding: '8px',
                          backgroundColor: '#f5f5f5',
                          textAlign: 'left'
                        }}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataPreview.rows?.slice(0, 5).map((row: any, rowIndex: number) => (
                    <tr key={rowIndex}>
                      {dataPreview.headers.map((header: string, colIndex: number) => (
                        <td
                          key={colIndex}
                          style={{
                            border: '1px solid #ddd',
                            padding: '8px'
                          }}
                        >
                          {row[header]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          )}
          
          <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
            Mostrando primeiras 5 linhas de {dataPreview.totalRows} registros
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default UploadArea;
