import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Alert,
  LinearProgress,
  Badge,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Rating,
  Divider,
  Tab,
  Tabs,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Public,
  People,
  School,
  Work,
  Science,
  TrendingUp,
  EmojiEvents,
  Chat,
  Share,
  Favorite,
  Star,
  Language,
  Timeline,
  Assessment,
  Psychology,
  Group,
  Forum,
  Code,
  DataUsage,
  Analytics,
  Insights,
  AutoAwesome,
  Speed,
} from '@mui/icons-material';

interface Usuario {
  id: string;
  nome: string;
  pais: string;
  avatar: string;
  nivel: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Expert' | 'PhD';
  especialidade: string;
  contribuicoes: number;
  pontuacao: number;
  online: boolean;
}

interface Projeto {
  id: string;
  titulo: string;
  descricao: string;
  criador: Usuario;
  colaboradores: Usuario[];
  categoria: string;
  tags: string[];
  likes: number;
  visualizacoes: number;
  status: 'Ativo' | 'Concluído' | 'Em Revisão';
  dificuldade: 1 | 2 | 3 | 4 | 5;
  dataAtualizacao: Date;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ComunidadeGlobal: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [usuariosOnline, setUsuariosOnline] = useState<Usuario[]>([]);
  const [projetosDestaque, setProjetosDestaque] = useState<Projeto[]>([]);
  const [dialogAberto, setDialogAberto] = useState(false);

  // Dados simulados da comunidade global
  const estatisticasComunidade = {
    usuariosAtivos: 2847291,
    projetosPublicos: 156783,
    analisesCompartilhadas: 5429876,
    paisesRepresentados: 195,
    idiomasSuportados: 67,
    colaboracoesAtivas: 23456,
    pesquisasPublicadas: 8934,
    citacoesAcademicas: 45672
  };

  const usuariosExemplo: Usuario[] = [
    {
      id: '1',
      nome: 'Dr. Maria Silva',
      pais: 'Brasil',
      avatar: 'MS',
      nivel: 'PhD',
      especialidade: 'Bioestatística',
      contribuicoes: 234,
      pontuacao: 9876,
      online: true
    },
    {
      id: '2',
      nome: 'Prof. John Smith',
      pais: 'Estados Unidos',
      avatar: 'JS',
      nivel: 'Expert',
      especialidade: 'Machine Learning',
      contribuicoes: 189,
      pontuacao: 8543,
      online: true
    },
    {
      id: '3',
      nome: 'Zhang Wei',
      pais: 'China',
      avatar: 'ZW',
      nivel: 'Expert',
      especialidade: 'Deep Learning',
      contribuicoes: 156,
      pontuacao: 7892,
      online: false
    },
    {
      id: '4',
      nome: 'Priya Sharma',
      pais: 'Índia',
      avatar: 'PS',
      nivel: 'Avançado',
      especialidade: 'Data Science',
      contribuicoes: 98,
      pontuacao: 5432,
      online: true
    }
  ];

  const projetosExemplo: Projeto[] = [
    {
      id: '1',
      titulo: 'Análise Global de Mudanças Climáticas',
      descricao: 'Modelo preditivo usando dados de 50 países para prever impactos climáticos',
      criador: usuariosExemplo[0],
      colaboradores: [usuariosExemplo[1], usuariosExemplo[2]],
      categoria: 'Meio Ambiente',
      tags: ['Python', 'Machine Learning', 'Climate Data', 'Collaboration'],
      likes: 2847,
      visualizacoes: 15632,
      status: 'Ativo',
      dificuldade: 5,
      dataAtualizacao: new Date()
    },
    {
      id: '2',
      titulo: 'Rede Neural para Diagnóstico Médico',
      descricao: 'IA para detecção precoce de doenças através de imagens médicas',
      criador: usuariosExemplo[1],
      colaboradores: [usuariosExemplo[0], usuariosExemplo[3]],
      categoria: 'Saúde',
      tags: ['TensorFlow', 'Medical AI', 'Deep Learning', 'Healthcare'],
      likes: 3921,
      visualizacoes: 28945,
      status: 'Em Revisão',
      dificuldade: 5,
      dataAtualizacao: new Date()
    },
    {
      id: '3',
      titulo: 'Análise de Sentimentos em Redes Sociais',
      descricao: 'Processamento de linguagem natural para análise de opinião pública',
      criador: usuariosExemplo[2],
      colaboradores: [usuariosExemplo[3]],
      categoria: 'NLP',
      tags: ['Python', 'NLP', 'Social Media', 'Sentiment Analysis'],
      likes: 1856,
      visualizacoes: 9234,
      status: 'Concluído',
      dificuldade: 3,
      dataAtualizacao: new Date()
    }
  ];

  const rankingGlobal = [
    { posicao: 1, usuario: 'Dr. Elena Rodriguez', pais: 'Espanha', pontos: 15847, especialidade: 'Epidemiologia' },
    { posicao: 2, usuario: 'Prof. Akira Tanaka', pais: 'Japão', pontos: 14932, especialidade: 'Quantum Computing' },
    { posicao: 3, usuario: 'Dr. Sarah Connor', pais: 'Reino Unido', pontos: 14765, especialidade: 'AI Ethics' },
    { posicao: 4, usuario: 'Prof. Ahmad Hassan', pais: 'Emirados Árabes', pontos: 13987, especialidade: 'Fintech Analytics' },
    { posicao: 5, usuario: 'Dra. Ana Gutierrez', pais: 'México', pontos: 13542, especialidade: 'Social Data Science' }
  ];

  const eventosGlobais = [
    {
      nome: 'Global Data Science Summit 2025',
      data: '15-17 Março 2025',
      local: 'Virtual + São Paulo',
      participantes: 50000,
      tipo: 'Conferência'
    },
    {
      nome: 'AI for Good Hackathon',
      data: '22-24 Março 2025',
      local: 'Mundial (Online)',
      participantes: 25000,
      tipo: 'Competição'
    },
    {
      nome: 'Open Science Week',
      data: '5-12 Abril 2025',
      local: 'Global',
      participantes: 100000,
      tipo: 'Evento Educacional'
    }
  ];

  useEffect(() => {
    setUsuariosOnline(usuariosExemplo.filter(u => u.online));
    setProjetosDestaque(projetosExemplo);
  }, []);

  const getCorNivel = (nivel: string) => {
    switch (nivel) {
      case 'PhD': return 'error';
      case 'Expert': return 'warning';
      case 'Avançado': return 'info';
      case 'Intermediário': return 'success';
      default: return 'default';
    }
  };

  const renderEstatisticasComunidade = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent sx={{ textAlign: 'center' }}>
            <People color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4" color="primary">
              {(estatisticasComunidade.usuariosAtivos / 1000000).toFixed(1)}M
            </Typography>
            <Typography variant="body2">Usuários Ativos</Typography>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent sx={{ textAlign: 'center' }}>
            <Assessment color="secondary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4" color="secondary">
              {(estatisticasComunidade.analisesCompartilhadas / 1000000).toFixed(1)}M
            </Typography>
            <Typography variant="body2">Análises Compartilhadas</Typography>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent sx={{ textAlign: 'center' }}>
            <Public color="success" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4" color="success.main">
              {estatisticasComunidade.paisesRepresentados}
            </Typography>
            <Typography variant="body2">Países</Typography>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent sx={{ textAlign: 'center' }}>
            <Science color="warning" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4" color="warning.main">
              {estatisticasComunidade.pesquisasPublicadas.toLocaleString()}
            </Typography>
            <Typography variant="body2">Pesquisas Publicadas</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderUsuariosOnline = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          🌍 Usuários Online Agora ({usuariosOnline.length.toLocaleString()})
        </Typography>
        <List>
          {usuariosOnline.map((usuario) => (
            <ListItem key={usuario.id}>
              <ListItemAvatar>
                <Badge
                  color="success"
                  variant="dot"
                  invisible={!usuario.online}
                >
                  <Avatar sx={{ bgcolor: getCorNivel(usuario.nivel) }}>
                    {usuario.avatar}
                  </Avatar>
                </Badge>
              </ListItemAvatar>
              <ListItemText
                primary={usuario.nome}
                secondary={
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {usuario.pais} • {usuario.especialidade}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                      <Chip 
                        label={usuario.nivel} 
                        size="small" 
                        color={getCorNivel(usuario.nivel) as any}
                      />
                      <Chip 
                        label={`${usuario.pontuacao} pts`} 
                        size="small" 
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                }
              />
              <IconButton>
                <Chat />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );

  const renderProjetosDestaque = () => (
    <Grid container spacing={3}>
      {projetosDestaque.map((projeto) => (
        <Grid item xs={12} md={6} key={projeto.id}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="h6" sx={{ flex: 1 }}>
                  {projeto.titulo}
                </Typography>
                <Chip 
                  label={projeto.status} 
                  color={
                    projeto.status === 'Ativo' ? 'success' :
                    projeto.status === 'Em Revisão' ? 'warning' : 'info'
                  }
                  size="small"
                />
              </Box>
              
              <Typography variant="body2" color="text.secondary" paragraph>
                {projeto.descricao}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                  {projeto.criador.avatar}
                </Avatar>
                <Typography variant="body2">
                  {projeto.criador.nome}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  + {projeto.colaboradores.length} colaboradores
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                {projeto.tags.map((tag, index) => (
                  <Chip key={index} label={tag} size="small" variant="outlined" />
                ))}
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Favorite color="primary" sx={{ fontSize: 18 }} />
                    <Typography variant="body2">{projeto.likes}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Assessment color="secondary" sx={{ fontSize: 18 }} />
                    <Typography variant="body2">{projeto.visualizacoes}</Typography>
                  </Box>
                </Box>
                <Rating value={projeto.dificuldade} readOnly size="small" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const renderRankingGlobal = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          🏆 Ranking Global de Especialistas
        </Typography>
        <List>
          {rankingGlobal.map((item) => (
            <ListItem key={item.posicao}>
              <ListItemAvatar>
                <Avatar sx={{ 
                  bgcolor: item.posicao <= 3 ? 'gold' : 'primary.main',
                  color: item.posicao <= 3 ? 'black' : 'white'
                }}>
                  {item.posicao}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.usuario}
                secondary={
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {item.pais} • {item.especialidade}
                    </Typography>
                    <Typography variant="body2" color="primary">
                      {item.pontos.toLocaleString()} pontos
                    </Typography>
                  </Box>
                }
              />
              {item.posicao <= 3 && (
                <EmojiEvents sx={{ color: 'gold' }} />
              )}
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );

  const renderEventosGlobais = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          📅 Próximos Eventos Globais
        </Typography>
        <List>
          {eventosGlobais.map((evento, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={evento.nome}
                secondary={
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      📅 {evento.data} • 📍 {evento.local}
                    </Typography>
                    <Typography variant="body2" color="primary">
                      👥 {evento.participantes.toLocaleString()} participantes
                    </Typography>
                  </Box>
                }
              />
              <Chip label={evento.tipo} size="small" />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          🌍 Comunidade Global de Data Science
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Conectando 2.8 milhões de cientistas de dados em 195 países
        </Typography>
      </Box>

      {/* Estatísticas Principais */}
      <Box sx={{ mb: 4 }}>
        {renderEstatisticasComunidade()}
      </Box>

      {/* Navegação por Tabs */}
      <Box sx={{ width: '100%' }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} aria-label="tabs">
          <Tab label="🌟 Destaques" />
          <Tab label="👥 Comunidade Ativa" />
          <Tab label="🏆 Rankings" />
          <Tab label="📅 Eventos" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Typography variant="h5" gutterBottom>
            🚀 Projetos em Destaque
          </Typography>
          {renderProjetosDestaque()}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              {renderUsuariosOnline()}
            </Grid>
            <Grid item xs={12} md={4}>
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  💬 Chat Global Ativo
                </Typography>
                <Typography variant="body2">
                  Conecte-se com especialistas do mundo todo em tempo real!
                </Typography>
              </Alert>
              
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  🌐 Distribuição Global (Agora)
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="🇺🇸 Estados Unidos" secondary="45,234 usuários" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="🇧🇷 Brasil" secondary="38,921 usuários" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="🇮🇳 Índia" secondary="52,156 usuários" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="🇨🇳 China" secondary="67,893 usuários" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              {renderRankingGlobal()}
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    📊 Estatísticas de Contribuição
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      Análises compartilhadas esta semana
                    </Typography>
                    <LinearProgress variant="determinate" value={78} />
                    <Typography variant="caption">124,567 de 160,000 meta</Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      Colaborações internacionais
                    </Typography>
                    <LinearProgress variant="determinate" value={92} color="success" />
                    <Typography variant="caption">45,678 projetos colaborativos</Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      Publicações acadêmicas
                    </Typography>
                    <LinearProgress variant="determinate" value={65} color="warning" />
                    <Typography variant="caption">1,234 artigos este mês</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              {renderEventosGlobais()}
            </Grid>
            <Grid item xs={12} md={4}>
              <Alert severity="success">
                <Typography variant="h6" gutterBottom>
                  🎉 Participe da Revolução!
                </Typography>
                <Typography variant="body2" paragraph>
                  Junte-se à maior comunidade de cientistas de dados do mundo.
                  Colabore em projetos que estão mudando o planeta!
                </Typography>
                <Button variant="contained" fullWidth>
                  Entrar na Comunidade
                </Button>
              </Alert>
            </Grid>
          </Grid>
        </TabPanel>
      </Box>

      {/* Call to Action Final */}
      <Alert severity="info" sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          🚀 Seja Parte da Revolução Global de Dados!
        </Typography>
        <Typography variant="body1">
          Nossa plataforma conecta mentes brilhantes de todo o mundo para resolver os maiores desafios da humanidade através da ciência de dados. 
          Junte-se a nós e faça parte desta transformação histórica!
        </Typography>
      </Alert>
    </Container>
  );
};

export default ComunidadeGlobal;
