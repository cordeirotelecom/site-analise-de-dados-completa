import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress,
  Alert,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Assessment,
  People,
  ShoppingCart,
  AttachMoney,
  Speed,
  CheckCircle,
  Warning,
  Error,
  Analytics,
  DataUsage,
  Timeline,
  PieChart,
} from '@mui/icons-material';

const DashboardInterativo: React.FC = () => {
  const [periodoSelecionado, setPeriodoSelecionado] = useState('30d');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('todas');

  // Dados mockados para demonstração
  const metricas = useMemo(() => ({
    vendas: {
      total: 127543.89,
      variacao: 15.3,
      meta: 120000,
      periodo: 'últimos 30 dias'
    },
    clientes: {
      ativos: 1247,
      novos: 89,
      retencao: 0.847,
      satisfacao: 4.2
    },
    produtos: {
      vendidos: 3421,
      categorias: 5,
      melhor: 'Eletrônicos',
      estoque_baixo: 12
    },
    performance: {
      automl_accuracy: 0.892,
      cba_rules: 47,
      modelos_ativos: 3,
      ultimo_treino: '2 horas atrás'
    }
  }), [periodoSelecionado, categoriaSelecionada]);

  const alertas = [
    { tipo: 'warning', mensagem: '12 produtos com estoque baixo', acao: 'Verificar estoque' },
    { tipo: 'success', mensagem: 'Meta de vendas atingida!', acao: 'Ver detalhes' },
    { tipo: 'info', mensagem: 'Novo modelo AutoML disponível', acao: 'Treinar modelo' },
    { tipo: 'error', mensagem: 'Falha na sincronização de dados', acao: 'Reprocessar' }
  ];

  const vendedoresTop = [
    { nome: 'Ana Costa', vendas: 45230.50, meta: 0.91, avatar: 'AC' },
    { nome: 'João Silva', vendas: 38750.25, meta: 0.78, avatar: 'JS' },
    { nome: 'Maria Santos', vendas: 42100.80, meta: 0.85, avatar: 'MS' },
    { nome: 'Pedro Lima', vendas: 33400.15, meta: 0.67, avatar: 'PL' }
  ];

  const produtosPopulares = [
    { produto: 'Smartphone', vendas: 234, receita: 210457.66, tendencia: 'up' },
    { produto: 'Notebook', vendas: 89, receita: 222491.11, tendencia: 'up' },
    { produto: 'Tablet', vendas: 156, receita: 101358.44, tendencia: 'down' },
    { produto: 'Smart TV', vendas: 67, receita: 127299.33, tendencia: 'up' }
  ];

  const getAlertIcon = (tipo: string) => {
    switch (tipo) {
      case 'warning': return <Warning color="warning" />;
      case 'error': return <Error color="error" />;
      case 'success': return <CheckCircle color="success" />;
      default: return <Assessment color="info" />;
    }
  };

  const MetricCard: React.FC<{
    title: string;
    value: string | number;
    subtitle: string;
    icon: React.ReactNode;
    color: 'primary' | 'secondary' | 'success' | 'warning';
    trend?: { value: number; label: string };
  }> = ({ title, value, subtitle, icon, color, trend }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: `${color}.main`, mr: 2 }}>
            {icon}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" component="div" color={`${color}.main`}>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
          </Box>
        </Box>
        
        {trend && (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            {trend.value > 0 ? (
              <TrendingUp color="success" sx={{ fontSize: 20, mr: 1 }} />
            ) : (
              <TrendingDown color="error" sx={{ fontSize: 20, mr: 1 }} />
            )}
            <Typography 
              variant="body2" 
              color={trend.value > 0 ? 'success.main' : 'error.main'}
            >
              {Math.abs(trend.value)}% {trend.label}
            </Typography>
          </Box>
        )}
        
        <Typography variant="caption" color="text.secondary">
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        <Analytics sx={{ fontSize: 40, mr: 2, verticalAlign: 'middle' }} />
        Dashboard Executivo
      </Typography>

      {/* Filtros */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Período</InputLabel>
          <Select
            value={periodoSelecionado}
            label="Período"
            onChange={(e) => setPeriodoSelecionado(e.target.value)}
          >
            <MenuItem value="7d">Últimos 7 dias</MenuItem>
            <MenuItem value="30d">Últimos 30 dias</MenuItem>
            <MenuItem value="90d">Últimos 90 dias</MenuItem>
            <MenuItem value="1y">Último ano</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Categoria</InputLabel>
          <Select
            value={categoriaSelecionada}
            label="Categoria"
            onChange={(e) => setCategoriaSelecionada(e.target.value)}
          >
            <MenuItem value="todas">Todas</MenuItem>
            <MenuItem value="eletronicos">Eletrônicos</MenuItem>
            <MenuItem value="roupas">Roupas</MenuItem>
            <MenuItem value="casa">Casa</MenuItem>
            <MenuItem value="livros">Livros</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Métricas Principais */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Vendas Totais"
            value={`R$ ${metricas.vendas.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
            subtitle={metricas.vendas.periodo}
            icon={<AttachMoney />}
            color="success"
            trend={{ value: metricas.vendas.variacao, label: 'vs período anterior' }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Clientes Ativos"
            value={metricas.clientes.ativos.toLocaleString('pt-BR')}
            subtitle={`${metricas.clientes.novos} novos clientes`}
            icon={<People />}
            color="primary"
            trend={{ value: 8.2, label: 'crescimento mensal' }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Produtos Vendidos"
            value={metricas.produtos.vendidos.toLocaleString('pt-BR')}
            subtitle={`${metricas.produtos.categorias} categorias ativas`}
            icon={<ShoppingCart />}
            color="warning"
            trend={{ value: -2.1, label: 'vs mês passado' }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Accuracy AutoML"
            value={`${(metricas.performance.automl_accuracy * 100).toFixed(1)}%`}
            subtitle={`${metricas.performance.modelos_ativos} modelos ativos`}
            icon={<Speed />}
            color="secondary"
            trend={{ value: 3.7, label: 'melhoria' }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Alertas e Notificações */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              <Warning sx={{ mr: 1, verticalAlign: 'middle' }} />
              Alertas e Notificações
            </Typography>
            
            <List>
              {alertas.map((alerta, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon>
                    {getAlertIcon(alerta.tipo)}
                  </ListItemIcon>
                  <ListItemText
                    primary={alerta.mensagem}
                    secondary={
                      <Button size="small" color="primary">
                        {alerta.acao}
                      </Button>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Top Vendedores */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              <TrendingUp sx={{ mr: 1, verticalAlign: 'middle' }} />
              Top Vendedores
            </Typography>
            
            <List>
              {vendedoresTop.map((vendedor, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {vendedor.avatar}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={vendedor.nome}
                    secondary={
                      <Box>
                        <Typography variant="body2">
                          R$ {vendedor.vendas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={vendedor.meta * 100}
                          sx={{ mt: 1 }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {(vendedor.meta * 100).toFixed(0)}% da meta
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Produtos Populares */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              <PieChart sx={{ mr: 1, verticalAlign: 'middle' }} />
              Produtos em Alta
            </Typography>
            
            <List>
              {produtosPopulares.map((produto, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon>
                    {produto.tendencia === 'up' ? (
                      <TrendingUp color="success" />
                    ) : (
                      <TrendingDown color="error" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={produto.produto}
                    secondary={
                      <Box>
                        <Typography variant="body2">
                          {produto.vendas} vendas • R$ {produto.receita.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </Typography>
                        <Chip
                          size="small"
                          label={produto.tendencia === 'up' ? 'Em alta' : 'Em queda'}
                          color={produto.tendencia === 'up' ? 'success' : 'error'}
                          sx={{ mt: 1 }}
                        />
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Seção de Machine Learning */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body1">
              <strong>Insights de ML:</strong> Seus modelos AutoML estão performando {metricas.performance.automl_accuracy > 0.85 ? 'excelentemente' : 'bem'} 
              com {metricas.performance.cba_rules} regras CBA descobertas. 
              Última atualização: {metricas.performance.ultimo_treino}.
            </Typography>
          </Alert>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <DataUsage sx={{ mr: 1, verticalAlign: 'middle' }} />
                Performance dos Modelos
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Classificação - Accuracy: {(metricas.performance.automl_accuracy * 100).toFixed(1)}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={metricas.performance.automl_accuracy * 100}
                  sx={{ mb: 2 }}
                />
                
                <Typography variant="body2" gutterBottom>
                  Regressão - R²: 87.3%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={87.3}
                  color="secondary"
                  sx={{ mb: 2 }}
                />
                
                <Typography variant="body2" gutterBottom>
                  Clustering - Silhouette: 0.74
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={74}
                  color="success"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <Timeline sx={{ mr: 1, verticalAlign: 'middle' }} />
                Regras CBA Principais
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText
                    primary="[Eletrônicos, Alto_Valor] → Vendas_Altas"
                    secondary="Confiança: 89.2% | Suporte: 12.4%"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="[Cliente_Premium, Desconto] → Compra_Recorrente"
                    secondary="Confiança: 76.8% | Suporte: 8.9%"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="[Fim_Semana, Online] → Carrinho_Abandonado"
                    secondary="Confiança: 65.3% | Suporte: 15.7%"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardInterativo;