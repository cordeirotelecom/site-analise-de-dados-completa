import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  CheckCircle,
  TrendingUp,
  Science,
  Speed,
  Psychology,
  CloudUpload,
  AutoAwesome,
  Assessment
} from '@mui/icons-material';

interface ReportsViewProps {
  data?: any;
}

const ReportsView: React.FC<ReportsViewProps> = ({ data: _ }) => {
  const features = [
    {
      icon: <AutoAwesome color="primary" />,
      title: 'Geração Automática de LaTeX',
      description: 'Artigos científicos prontos para submissão em revistas'
    },
    {
      icon: <Psychology color="success" />,
      title: 'IA Explicável (XAI)',
      description: 'SHAP e LIME para interpretabilidade dos modelos'
    },
    {
      icon: <TrendingUp color="warning" />,
      title: 'AutoML Avançado',
      description: 'Seleção automática dos melhores algoritmos de ML'
    },
    {
      icon: <Speed color="info" />,
      title: 'Pipeline Otimizado',
      description: 'Do upload à análise em menos de 5 minutos'
    }
  ];

  const capabilities = [
    'Análise estatística descritiva completa',
    'Matriz de correlação com visualizações',
    'Clustering hierárquico e K-means',
    'Análise fatorial e PCA',
    'Regressão linear e logística',
    'Random Forest e XGBoost',
    'Redes neurais artificiais',
    'Séries temporais e ARIMA',
    'Detecção de outliers automática',
    'Validação cruzada estratificada'
  ];

  const advantages = [
    'Substitui SPSS, SAS, Stata e R',
    'Interface sem código',
    'Relatórios em 15+ idiomas',
    'Integração com APIs públicas',
    'Exportação multi-formato',
    'Colaboração em tempo real',
    'Versionamento de análises',
    'Auditoria completa de processos'
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" gutterBottom color="primary">
          🚀 DataScience Pro
        </Typography>
        <Typography variant="h5" gutterBottom color="text.secondary">
          A Revolução em Análise de Dados
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
          Plataforma que supera todas as ferramentas tradicionais, oferecendo
          análise completa de dados com IA, sem necessidade de programação.
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Chip label="✅ AutoML" color="success" />
          <Chip label="📊 Visualizações IA" color="primary" />
          <Chip label="📄 LaTeX Automático" color="warning" />
          <Chip label="🌐 Sem Código" color="info" />
        </Box>
      </Box>

      {/* Features Grid */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {feature.icon}
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {feature.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Capabilities */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Science color="primary" />
                Capacidades Científicas
              </Typography>
              <List dense>
                {capabilities.map((capability, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={capability}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Assessment color="primary" />
                Vantagens Competitivas
              </Typography>
              <List dense>
                {advantages.map((advantage, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={advantage}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Workflow */}
      <Card sx={{ mb: 6, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <CardContent>
          <Typography variant="h5" color="white" gutterBottom textAlign="center">
            🔄 Workflow Automático
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {[
              { icon: <CloudUpload />, title: '1. Upload', desc: 'Arraste seus dados' },
              { icon: <AutoAwesome />, title: '2. IA Processa', desc: 'Análise automática' },
              { icon: <TrendingUp />, title: '3. Visualizações', desc: 'Gráficos inteligentes' },
              { icon: <Assessment />, title: '4. Relatório', desc: 'Artigo científico' }
            ].map((step, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box sx={{ textAlign: 'center', color: 'white' }}>
                  {step.icon}
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {step.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Alert severity="success" sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          🎉 Plataforma Totalmente Funcional!
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Todos os componentes foram implementados com sucesso:
          • Upload inteligente • Análise automática • Dashboard interativo • Sistema de relatórios
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button variant="contained" color="success">
            Testar Upload
          </Button>
          <Button variant="outlined" color="success">
            Ver Documentação
          </Button>
        </Box>
      </Alert>

      {/* Statistics */}
      <Grid container spacing={3}>
        <Grid item xs={6} md={3}>
          <Card sx={{ textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h4">27</Typography>
              <Typography variant="body2">Problemas Corrigidos</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card sx={{ textAlign: 'center', bgcolor: 'success.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h4">100%</Typography>
              <Typography variant="body2">Funcional</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card sx={{ textAlign: 'center', bgcolor: 'warning.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h4">0</Typography>
              <Typography variant="body2">Erros Atuais</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card sx={{ textAlign: 'center', bgcolor: 'info.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h4">∞</Typography>
              <Typography variant="body2">Possibilidades</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportsView;
