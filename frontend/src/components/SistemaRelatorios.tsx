import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Alert,
  LinearProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from '@mui/material';
import {
  Assessment,
  PictureAsPdf,
  TableChart,
  FileDownload,
  Email,
  Schedule,
  TrendingUp,
  ExpandMore,
  Analytics,
  BarChart,
  PieChart,
  ShowChart,
  InsertChart,
  Print,
  Share,
} from '@mui/icons-material';

const SistemaRelatorios: React.FC = () => {
  const [tipoRelatorio, setTipoRelatorio] = useState('vendas');
  const [formatoExportacao, setFormatoExportacao] = useState('pdf');
  const [periodoRelatorio, setPeriodoRelatorio] = useState('mensal');
  const [gerandoRelatorio, setGerandoRelatorio] = useState(false);
  const [relatorioGerado, setRelatorioGerado] = useState<string | null>(null);

  const templatesDisponiveis = [
    {
      id: 'executivo',
      nome: 'Relatório Executivo',
      descricao: 'Resumo executivo com KPIs principais e insights estratégicos',
      secoes: ['Resumo Executivo', 'Métricas Principais', 'Tendências', 'Recomendações'],
      tempo: '2 min',
      formatos: ['PDF', 'PowerPoint', 'Word']
    },
    {
      id: 'vendas',
      nome: 'Análise de Vendas',
      descricao: 'Relatório detalhado de performance de vendas por período',
      secoes: ['Vendas por Período', 'Top Produtos', 'Performance Vendedores', 'Projeções'],
      tempo: '3 min',
      formatos: ['PDF', 'Excel', 'CSV']
    },
    {
      id: 'clientes',
      nome: 'Perfil de Clientes',
      descricao: 'Segmentação e análise comportamental de clientes',
      secoes: ['Segmentação', 'Comportamento', 'Satisfação', 'Churn Analysis'],
      tempo: '4 min',
      formatos: ['PDF', 'Word', 'HTML']
    },
    {
      id: 'ml-model',
      nome: 'Performance de Modelos ML',
      descricao: 'Avaliação técnica de modelos de machine learning',
      secoes: ['Métricas de Performance', 'Feature Importance', 'Validation Results', 'Model Comparison'],
      tempo: '5 min',
      formatos: ['PDF', 'Jupyter Notebook', 'HTML']
    }
  ];

  const relatoriosRecentes = [
    {
      nome: 'Relatório Vendas - Janeiro 2025',
      data: '2025-01-30',
      tipo: 'Vendas',
      status: 'Concluído',
      downloads: 47
    },
    {
      nome: 'Análise AutoML - Modelo Cliente',
      data: '2025-01-28',
      tipo: 'Machine Learning',
      status: 'Concluído',
      downloads: 23
    },
    {
      nome: 'Dashboard Executivo - Q4 2024',
      data: '2025-01-25',
      tipo: 'Executivo',
      status: 'Concluído',
      downloads: 89
    }
  ];

  const metricas = {
    relatorios_gerados: 234,
    tempo_medio: '3.2 min',
    satisfacao: 4.7,
    downloads_total: 1847
  };

  const gerarRelatorio = async () => {
    setGerandoRelatorio(true);
    setRelatorioGerado(null);

    // Simular geração de relatório
    await new Promise(resolve => setTimeout(resolve, 2000));

    const nomeArquivo = `relatorio_${tipoRelatorio}_${new Date().toISOString().split('T')[0]}.${formatoExportacao}`;
    setRelatorioGerado(nomeArquivo);
    setGerandoRelatorio(false);
  };

  const downloadRelatorio = () => {
    // Simular download
    const link = document.createElement('a');
    link.href = '#';
    link.download = relatorioGerado || 'relatorio.pdf';
    link.click();
  };

  const compartilharRelatorio = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Relatório DataScience Pro',
        text: 'Confira este relatório gerado automaticamente',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        <Assessment sx={{ fontSize: 40, mr: 2, verticalAlign: 'middle' }} />
        Sistema de Relatórios
      </Typography>

      {/* Métricas do Sistema */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary">
                {metricas.relatorios_gerados}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Relatórios Gerados
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="success.main">
                {metricas.tempo_medio}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tempo Médio
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="warning.main">
                {metricas.satisfacao}⭐
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Satisfação Média
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="info.main">
                {metricas.downloads_total}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Downloads
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Configuração de Relatório */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                <InsertChart sx={{ mr: 1, verticalAlign: 'middle' }} />
                Gerar Novo Relatório
              </Typography>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Tipo de Relatório</InputLabel>
                    <Select
                      value={tipoRelatorio}
                      label="Tipo de Relatório"
                      onChange={(e) => setTipoRelatorio(e.target.value)}
                    >
                      <MenuItem value="vendas">Análise de Vendas</MenuItem>
                      <MenuItem value="clientes">Perfil de Clientes</MenuItem>
                      <MenuItem value="produtos">Análise de Produtos</MenuItem>
                      <MenuItem value="ml-performance">Performance ML</MenuItem>
                      <MenuItem value="executivo">Relatório Executivo</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Período</InputLabel>
                    <Select
                      value={periodoRelatorio}
                      label="Período"
                      onChange={(e) => setPeriodoRelatorio(e.target.value)}
                    >
                      <MenuItem value="semanal">Semanal</MenuItem>
                      <MenuItem value="mensal">Mensal</MenuItem>
                      <MenuItem value="trimestral">Trimestral</MenuItem>
                      <MenuItem value="anual">Anual</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Formato</InputLabel>
                    <Select
                      value={formatoExportacao}
                      label="Formato"
                      onChange={(e) => setFormatoExportacao(e.target.value)}
                    >
                      <MenuItem value="pdf">PDF</MenuItem>
                      <MenuItem value="xlsx">Excel</MenuItem>
                      <MenuItem value="csv">CSV</MenuItem>
                      <MenuItem value="docx">Word</MenuItem>
                      <MenuItem value="html">HTML</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Button
                variant="contained"
                fullWidth
                onClick={gerarRelatorio}
                disabled={gerandoRelatorio}
                startIcon={gerandoRelatorio ? <Schedule /> : <Analytics />}
                sx={{ mb: 2 }}
              >
                {gerandoRelatorio ? 'Gerando Relatório...' : 'Gerar Relatório'}
              </Button>

              {gerandoRelatorio && (
                <Box sx={{ mb: 2 }}>
                  <LinearProgress />
                  <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                    Processando dados e gerando visualizações...
                  </Typography>
                </Box>
              )}

              {relatorioGerado && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  <Typography variant="body1" gutterBottom>
                    <strong>Relatório gerado com sucesso!</strong>
                  </Typography>
                  <Typography variant="body2">
                    Arquivo: {relatorioGerado}
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<FileDownload />}
                      onClick={downloadRelatorio}
                    >
                      Download
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<Share />}
                      onClick={compartilharRelatorio}
                    >
                      Compartilhar
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<Email />}
                    >
                      Enviar por Email
                    </Button>
                  </Box>
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Templates Disponíveis */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                <PictureAsPdf sx={{ mr: 1, verticalAlign: 'middle' }} />
                Templates Disponíveis
              </Typography>

              {templatesDisponiveis.map((template) => (
                <Accordion key={template.id} sx={{ mb: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        {template.nome}
                      </Typography>
                      <Chip label={template.tempo} size="small" color="primary" />
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" paragraph>
                      {template.descricao}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      Seções incluídas:
                    </Typography>
                    <List dense>
                      {template.secoes.map((secao, index) => (
                        <ListItem key={index} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <BarChart fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={secao} />
                        </ListItem>
                      ))}
                    </List>
                    <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {template.formatos.map((formato) => (
                        <Chip key={formato} label={formato} variant="outlined" size="small" />
                      ))}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Relatórios Recentes */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            <TableChart sx={{ mr: 1, verticalAlign: 'middle' }} />
            Relatórios Recentes
          </Typography>

          <List>
            {relatoriosRecentes.map((relatorio, index) => (
              <React.Fragment key={index}>
                <ListItem
                  sx={{
                    '&:hover': {
                      bgcolor: 'action.hover',
                      cursor: 'pointer'
                    }
                  }}
                >
                  <ListItemIcon>
                    <PictureAsPdf color="error" />
                  </ListItemIcon>
                  <ListItemText
                    primary={relatorio.nome}
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {relatorio.data} • {relatorio.tipo} • {relatorio.downloads} downloads
                        </Typography>
                      </Box>
                    }
                  />
                  <Chip
                    label={relatorio.status}
                    color="success"
                    size="small"
                    sx={{ mr: 2 }}
                  />
                  <Button
                    size="small"
                    startIcon={<FileDownload />}
                    onClick={() => downloadRelatorio()}
                  >
                    Download
                  </Button>
                </ListItem>
                {index < relatoriosRecentes.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Dicas e Ajuda */}
      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="body1" gutterBottom>
          <strong>💡 Dicas para Relatórios Eficazes:</strong>
        </Typography>
        <List dense>
          <ListItem sx={{ py: 0 }}>
            <ListItemText primary="• Use o formato PDF para apresentações executivas" />
          </ListItem>
          <ListItem sx={{ py: 0 }}>
            <ListItemText primary="• Excel/CSV são ideais para análises detalhadas" />
          </ListItem>
          <ListItem sx={{ py: 0 }}>
            <ListItemText primary="• Configure relatórios automáticos para rotinas mensais" />
          </ListItem>
          <ListItem sx={{ py: 0 }}>
            <ListItemText primary="• Inclua insights de ML para maior valor analítico" />
          </ListItem>
        </List>
      </Alert>
    </Container>
  );
};

export default SistemaRelatorios;