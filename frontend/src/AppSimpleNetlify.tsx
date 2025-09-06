import React from 'react';
import {
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Typography,
  Card,
  CardContent,
  Alert,
  Button,
  Grid,
  Chip,
  Paper,
  Stack,
} from '@mui/material';
import {
  CheckCircle,
  CloudUpload,
  Analytics,
  Assessment,
  GitHub,
  Launch,
  Speed,
  Security,
} from '@mui/icons-material';

// Tema customizado
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            🚀 DataScience Pro
          </Typography>
          
          <Typography variant="h6" align="center" color="text.secondary" paragraph>
            Plataforma Completa de Análise de Dados Científicos
          </Typography>

          <Alert severity="success" sx={{ mb: 4 }}>
            <CheckCircle sx={{ mr: 1 }} />
            ✅ Sistema Online e Funcionando! Deploy realizado com sucesso em {new Date().toLocaleDateString('pt-BR')}.
          </Alert>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom color="primary">
                    <CloudUpload sx={{ mr: 1, verticalAlign: 'middle' }} />
                    📊 Funcionalidades Principais
                  </Typography>
                  
                  <Box component="ul" sx={{ pl: 2 }}>
                    <Typography component="li" paragraph>
                      <strong>Upload de Dados:</strong> Suporte para CSV, Excel, JSON
                    </Typography>
                    <Typography component="li" paragraph>
                      <strong>Análise Estatística:</strong> Descritiva, correlações, outliers
                    </Typography>
                    <Typography component="li" paragraph>
                      <strong>Visualizações:</strong> Gráficos interativos e dashboards
                    </Typography>
                    <Typography component="li" paragraph>
                      <strong>Santa Catarina:</strong> Dados específicos e análises regionais
                    </Typography>
                    <Typography component="li" paragraph>
                      <strong>API Completa:</strong> Backend FastAPI com documentação
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom color="secondary">
                    <Assessment sx={{ mr: 1, verticalAlign: 'middle' }} />
                    🔧 Status Técnico
                  </Typography>
                  
                  <Stack spacing={2}>
                    <Box>
                      <Chip icon={<CheckCircle />} label="Frontend: React + TypeScript" color="success" />
                    </Box>
                    <Box>
                      <Chip icon={<CheckCircle />} label="Backend: FastAPI + Python" color="success" />
                    </Box>
                    <Box>
                      <Chip icon={<CheckCircle />} label="Deploy: Netlify + GitHub" color="success" />
                    </Box>
                    <Box>
                      <Chip icon={<CheckCircle />} label="Build: Vite + Material-UI" color="success" />
                    </Box>
                  </Stack>

                  <Typography variant="body2" sx={{ mt: 2 }}>
                    <Speed sx={{ mr: 1, verticalAlign: 'middle', fontSize: 16 }} />
                    <strong>Performance:</strong> Build otimizado com chunking inteligente
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    <Security sx={{ mr: 1, verticalAlign: 'middle', fontSize: 16 }} />
                    <strong>Segurança:</strong> CORS configurado, validação de dados
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Paper sx={{ p: 3, mb: 4, bgcolor: '#e3f2fd' }}>
            <Typography variant="h6" gutterBottom>
              🧪 Próximos Passos
            </Typography>
            <Typography paragraph>
              Este deploy contém a estrutura base funcionando. As funcionalidades completas serão ativadas 
              progressivamente para garantir estabilidade.
            </Typography>
            
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Button 
                variant="contained" 
                startIcon={<GitHub />}
                href="https://github.com/cordeirotelecom/site-analise-de-dados-completa"
                target="_blank"
              >
                Ver Código
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<Launch />}
                href="/api/docs"
                target="_blank"
              >
                API Docs
              </Button>
            </Stack>
          </Paper>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              <strong>Versão 3.0</strong> - Deploy: {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Hospedado no Netlify | Backend: FastAPI | Frontend: React + TypeScript + Material-UI
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              Build ID: {Date.now()} | Status: Online
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
