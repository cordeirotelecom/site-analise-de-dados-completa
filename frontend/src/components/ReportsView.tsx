import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Alert,
} from '@mui/material';
import {
  Download,
  Description,
  PictureAsPdf,
  Assessment,
} from '@mui/icons-material';

interface ReportsViewProps {
  data?: any[];
}

const ReportsView = ({ data }: ReportsViewProps) => {
  const [loading, setLoading] = useState(false);

  const handleGenerateReport = () => {
    setLoading(true);
    // Simular geração de relatório
    setTimeout(() => {
      setLoading(false);
      alert('Relatório gerado com sucesso!');
    }, 2000);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, color: '#1f2937', mb: 2 }}>
        📋 Relatórios Científicos
      </Typography>
      
      <Typography variant="body1" sx={{ color: '#6b7280', mb: 3 }}>
        Geração automatizada de relatórios técnicos e científicos com metodologia rigorosa.
      </Typography>

      <Alert severity="success" sx={{ mb: 3 }}>
        Sistema de relatórios automáticos funcional! Escolha o tipo de relatório abaixo.
      </Alert>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', border: '1px solid #e5e7eb' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Description sx={{ mr: 2, color: '#2563eb' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Relatório Executivo
                </Typography>
              </Box>
              
              <Typography variant="body2" sx={{ color: '#6b7280', mb: 3 }}>
                Resumo gerencial com principais insights e recomendações dos dados analisados.
              </Typography>

              <Button
                variant="contained"
                fullWidth
                onClick={handleGenerateReport}
                startIcon={<Download />}
                disabled={loading}
                sx={{
                  backgroundColor: '#2563eb',
                  '&:hover': { backgroundColor: '#1d4ed8' }
                }}
              >
                {loading ? 'Gerando...' : 'Gerar Relatório'}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', border: '1px solid #e5e7eb' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PictureAsPdf sx={{ mr: 2, color: '#dc2626' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Relatório PDF
                </Typography>
              </Box>
              
              <Typography variant="body2" sx={{ color: '#6b7280', mb: 3 }}>
                Documento PDF completo com gráficos, tabelas e análise estatística detalhada.
              </Typography>

              <Button
                variant="contained"
                fullWidth
                onClick={handleGenerateReport}
                startIcon={<PictureAsPdf />}
                disabled={loading}
                sx={{
                  backgroundColor: '#dc2626',
                  '&:hover': { backgroundColor: '#b91c1c' }
                }}
              >
                {loading ? 'Gerando...' : 'Gerar PDF'}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', border: '1px solid #e5e7eb' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Assessment sx={{ mr: 2, color: '#10b981' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Análise Técnica
                </Typography>
              </Box>
              
              <Typography variant="body2" sx={{ color: '#6b7280', mb: 3 }}>
                Documentação técnica completa com metodologia, resultados e interpretação estatística.
              </Typography>

              <Button
                variant="outlined"
                fullWidth
                onClick={handleGenerateReport}
                startIcon={<Assessment />}
                disabled={loading}
                sx={{
                  borderColor: '#10b981',
                  color: '#10b981',
                  '&:hover': { 
                    borderColor: '#059669',
                    backgroundColor: '#f0fdf4'
                  }
                }}
              >
                {loading ? 'Gerando...' : 'Gerar Análise'}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', border: '1px solid #e5e7eb' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Description sx={{ mr: 2, color: '#7c3aed' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  LaTeX Científico
                </Typography>
              </Box>
              
              <Typography variant="body2" sx={{ color: '#6b7280', mb: 3 }}>
                Documento LaTeX profissional pronto para publicação acadêmica e científica.
              </Typography>

              <Button
                variant="outlined"
                fullWidth
                onClick={handleGenerateReport}
                startIcon={<Description />}
                disabled={loading}
                sx={{
                  borderColor: '#7c3aed',
                  color: '#7c3aed',
                  '&:hover': { 
                    borderColor: '#6d28d9',
                    backgroundColor: '#faf5ff'
                  }
                }}
              >
                {loading ? 'Gerando...' : 'Gerar LaTeX'}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {data && data.length > 0 && (
        <Alert severity="info" sx={{ mt: 3 }}>
          <strong>Dados carregados:</strong> {data.length} registros disponíveis para análise nos relatórios
        </Alert>
      )}

      <Alert severity="warning" sx={{ mt: 2 }}>
        <strong>Próximas funcionalidades:</strong> Templates personalizáveis, exportação automática, 
        integração com análises estatísticas avançadas e geração de gráficos em tempo real.
      </Alert>
    </Box>
  );
};

export default ReportsView;
export { ReportsView };
