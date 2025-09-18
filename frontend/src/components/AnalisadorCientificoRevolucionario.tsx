import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Alert,
  Paper,
  LinearProgress,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Upload,
  Analytics,
  Assessment,
  TrendingUp,
} from '@mui/icons-material';

const AnalisadorCientificoRevolucionario: React.FC = () => {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [analisando, setAnalisando] = useState(false);
  const [resultados, setResultados] = useState<any>(null);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setArquivo(file);
    }
  };

  const analisar = async () => {
    if (!arquivo) return;
    
    setAnalisando(true);
    
    // Simulação de análise
    setTimeout(() => {
      setResultados({
        totalRegistros: 1000,
        colunas: 8,
        regrasEncontradas: 15,
        precisaoMedia: 0.85,
        suporte: 0.1,
        confianca: 0.8
      });
      setAnalisando(false);
    }, 2000);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        📊 Analisador CBA (Classification Based on Associations)
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 3 }}>
        Ferramenta para análise de dados usando algoritmo CBA - Classification Based on Associations.
        Faça upload de um arquivo CSV para iniciar a análise.
      </Typography>

      {/* Upload */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            📁 Upload de Dados
          </Typography>
          
          <input
            accept=".csv,.xlsx,.xls"
            style={{ display: 'none' }}
            id="upload-file"
            type="file"
            onChange={handleUpload}
          />
          <label htmlFor="upload-file">
            <Button
              variant="outlined"
              component="span"
              startIcon={<Upload />}
              sx={{ mr: 2 }}
            >
              Selecionar Arquivo
            </Button>
          </label>
          
          {arquivo && (
            <Chip 
              label={`${arquivo.name} (${(arquivo.size / 1024).toFixed(1)} KB)`}
              color="primary"
              sx={{ ml: 2 }}
            />
          )}
          
          {arquivo && (
            <Button
              variant="contained"
              onClick={analisar}
              disabled={analisando}
              startIcon={<Analytics />}
              sx={{ ml: 2 }}
            >
              Iniciar Análise CBA
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Progresso */}
      {analisando && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              ⚡ Processando Análise
            </Typography>
            <LinearProgress />
            <Typography variant="body2" sx={{ mt: 1 }}>
              Aplicando algoritmo CBA aos dados...
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Resultados */}
      {resultados && (
        <>
          <Alert severity="success" sx={{ mb: 3 }}>
            <Typography variant="h6">✅ Análise Concluída</Typography>
            <Typography variant="body2">
              Análise CBA realizada com sucesso. Resultados abaixo.
            </Typography>
          </Alert>

          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">
                    {resultados.totalRegistros}
                  </Typography>
                  <Typography variant="body2">
                    Registros Analisados
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">
                    {resultados.regrasEncontradas}
                  </Typography>
                  <Typography variant="body2">
                    Regras Encontradas
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">
                    {(resultados.precisaoMedia * 100).toFixed(1)}%
                  </Typography>
                  <Typography variant="body2">
                    Precisão Média
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">
                    {(resultados.suporte * 100).toFixed(1)}%
                  </Typography>
                  <Typography variant="body2">
                    Suporte Mínimo
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Detalhes da Análise */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📋 Detalhes da Análise CBA
              </Typography>
              
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Métrica</TableCell>
                      <TableCell>Valor</TableCell>
                      <TableCell>Descrição</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Suporte</TableCell>
                      <TableCell>{(resultados.suporte * 100).toFixed(1)}%</TableCell>
                      <TableCell>Frequência mínima das regras</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Confiança</TableCell>
                      <TableCell>{(resultados.confianca * 100).toFixed(1)}%</TableCell>
                      <TableCell>Precisão das regras geradas</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Total de Regras</TableCell>
                      <TableCell>{resultados.regrasEncontradas}</TableCell>
                      <TableCell>Número de regras de associação encontradas</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </>
      )}

      {/* Informações do CBA */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            ℹ️ Sobre o Algoritmo CBA
          </Typography>
          
          <Typography variant="body2" paragraph>
            <strong>CBA (Classification Based on Associations)</strong> é um algoritmo de mineração de dados
            que combina regras de associação com classificação para descobrir padrões nos dados.
          </Typography>
          
          <Typography variant="body2" paragraph>
            <strong>Características:</strong>
          </Typography>
          <ul>
            <li>Gera regras de associação interpretáveis</li>
            <li>Combina múltiplas regras para classificação</li>
            <li>Eficaz para datasets categóricos</li>
            <li>Permite análise exploratória de padrões</li>
          </ul>
          
          <Typography variant="body2" paragraph>
            <strong>Parâmetros principais:</strong>
          </Typography>
          <ul>
            <li><strong>Suporte:</strong> Frequência mínima da regra no dataset</li>
            <li><strong>Confiança:</strong> Precisão da regra (consequente dado antecedente)</li>
            <li><strong>Lift:</strong> Melhoria da predição em relação ao acaso</li>
          </ul>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AnalisadorCientificoRevolucionario;