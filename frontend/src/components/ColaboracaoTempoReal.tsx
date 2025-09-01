import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemIcon,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tab,
  Tabs,
  Badge,
  Tooltip,
  Divider,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Alert,
  LinearProgress
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@mui/lab';
import {
  Group,
  PersonAdd,
  VideoCall,
  Chat,
  Share,
  Edit,
  Visibility,
  Lock,
  Public,
  NotificationImportant,
  History,
  CloudSync,
  Code,
  Analytics,
  Description,
  AddComment,
  Reply,
  MoreVert,
  FiberManualRecord,
  Schedule,
  ExpandMore,
  Message,
  Phone,
  Videocam,
  ScreenShare,
  Mic,
  MicOff,
  Settings,
  ExitToApp,
  PersonPin,
  Work,
  School,
  Business,
  Star,
  AccessTime,
  Security,
  GroupWork
} from '@mui/icons-material';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  avatar: string;
  status: 'online' | 'ausente' | 'ocupado' | 'offline';
  role: 'admin' | 'editor' | 'viewer';
  ultimaAtividade: string;
  organizacao: string;
}

interface Projeto {
  id: string;
  nome: string;
  descricao: string;
  status: 'ativo' | 'pausado' | 'concluido';
  membros: string[];
  ultimaAtualizacao: string;
  permissao: 'publico' | 'privado' | 'equipe';
  atividades: number;
  tipo: 'analise' | 'ml' | 'dashboard' | 'relatorio';
}

interface Atividade {
  id: string;
  usuario: string;
  acao: string;
  projeto: string;
  timestamp: string;
  detalhes: string;
  tipo: 'edicao' | 'comentario' | 'compartilhamento' | 'sistema';
}

interface Comentario {
  id: string;
  usuario: string;
  texto: string;
  timestamp: string;
  respostas: Comentario[];
  tipo: 'geral' | 'sugestao' | 'pergunta' | 'critica';
}

const ColaboracaoTempoReal: React.FC = () => {
  const [tabAtiva, setTabAtiva] = useState(0);
  const [usuarioAtual] = useState<Usuario>({
    id: '1',
    nome: 'Vagner Cordeiro',
    email: 'cordeirotelecom@gmail.com',
    avatar: '/api/placeholder/40/40',
    status: 'online',
    role: 'admin',
    ultimaAtividade: 'Agora',
    organizacao: 'DataScience Pro'
  });

  const [usuarios] = useState<Usuario[]>([
    {
      id: '2',
      nome: 'Ana Silva',
      email: 'ana.silva@empresa.com',
      avatar: '/api/placeholder/40/40',
      status: 'online',
      role: 'editor',
      ultimaAtividade: '2 min atrás',
      organizacao: 'Tech Analytics'
    },
    {
      id: '3',
      nome: 'Carlos Santos',
      email: 'carlos@datascience.com',
      avatar: '/api/placeholder/40/40',
      status: 'ocupado',
      role: 'viewer',
      ultimaAtividade: '5 min atrás',
      organizacao: 'Data Corp'
    },
    {
      id: '4',
      nome: 'Maria Oliveira',
      email: 'maria.oliveira@ai.com',
      avatar: '/api/placeholder/40/40',
      status: 'ausente',
      role: 'editor',
      ultimaAtividade: '15 min atrás',
      organizacao: 'AI Solutions'
    },
    {
      id: '5',
      nome: 'João Pereira',
      email: 'joao@analytics.com',
      avatar: '/api/placeholder/40/40',
      status: 'offline',
      role: 'admin',
      ultimaAtividade: '1 hora atrás',
      organizacao: 'Analytics Plus'
    }
  ]);

  const [projetos] = useState<Projeto[]>([
    {
      id: '1',
      nome: 'Análise de Vendas Q3',
      descricao: 'Análise detalhada das vendas do terceiro trimestre',
      status: 'ativo',
      membros: ['1', '2', '3'],
      ultimaAtualizacao: 'há 5 minutos',
      permissao: 'equipe',
      atividades: 34,
      tipo: 'analise'
    },
    {
      id: '2',
      nome: 'Modelo de Predição de Churn',
      descricao: 'Machine Learning para prever abandono de clientes',
      status: 'ativo',
      membros: ['1', '4', '5'],
      ultimaAtualizacao: 'há 12 minutos',
      permissao: 'privado',
      atividades: 67,
      tipo: 'ml'
    },
    {
      id: '3',
      nome: 'Dashboard Executivo',
      descricao: 'Painel de controle para diretoria',
      status: 'pausado',
      membros: ['1', '2'],
      ultimaAtualizacao: 'há 2 horas',
      permissao: 'publico',
      atividades: 23,
      tipo: 'dashboard'
    }
  ]);

  const [atividades] = useState<Atividade[]>([
    {
      id: '1',
      usuario: 'Ana Silva',
      acao: 'editou o dataset principal',
      projeto: 'Análise de Vendas Q3',
      timestamp: 'há 2 minutos',
      detalhes: 'Adicionou 500 novas linhas de dados',
      tipo: 'edicao'
    },
    {
      id: '2',
      usuario: 'Carlos Santos',
      acao: 'comentou no gráfico de tendências',
      projeto: 'Análise de Vendas Q3',
      timestamp: 'há 8 minutos',
      detalhes: 'Sugeriu incluir dados de sazonalidade',
      tipo: 'comentario'
    },
    {
      id: '3',
      usuario: 'Maria Oliveira',
      acao: 'treinou novo modelo',
      projeto: 'Modelo de Predição de Churn',
      timestamp: 'há 15 minutos',
      detalhes: 'Random Forest com acurácia de 94.2%',
      tipo: 'sistema'
    },
    {
      id: '4',
      usuario: 'João Pereira',
      acao: 'compartilhou relatório',
      projeto: 'Dashboard Executivo',
      timestamp: 'há 45 minutos',
      detalhes: 'Enviado para equipe de marketing',
      tipo: 'compartilhamento'
    }
  ]);

  const [comentarios] = useState<Comentario[]>([
    {
      id: '1',
      usuario: 'Ana Silva',
      texto: 'Os dados do último mês estão mostrando uma tendência interessante. Podemos explorar mais?',
      timestamp: 'há 10 minutos',
      tipo: 'pergunta',
      respostas: [
        {
          id: '1a',
          usuario: 'Vagner Cordeiro',
          texto: 'Ótima observação! Vou adicionar uma análise sazonal.',
          timestamp: 'há 8 minutos',
          tipo: 'geral',
          respostas: []
        }
      ]
    },
    {
      id: '2',
      usuario: 'Carlos Santos',
      texto: 'Sugiro usar algoritmo de clustering para segmentar melhor os clientes.',
      timestamp: 'há 25 minutos',
      tipo: 'sugestao',
      respostas: []
    }
  ]);

  const [dialogConvite, setDialogConvite] = useState(false);
  const [dialogVideoCall, setDialogVideoCall] = useState(false);
  const [novoComentario, setNovoComentario] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#4caf50';
      case 'ocupado': return '#ff9800';
      case 'ausente': return '#ffeb3b';
      case 'offline': return '#9e9e9e';
      default: return '#9e9e9e';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Star color="warning" />;
      case 'editor': return <Edit color="primary" />;
      case 'viewer': return <Visibility color="action" />;
      default: return <PersonPin />;
    }
  };

  const getPermissaoIcon = (permissao: string) => {
    switch (permissao) {
      case 'publico': return <Public color="success" />;
      case 'privado': return <Lock color="error" />;
      case 'equipe': return <Group color="primary" />;
      default: return <Security />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Principal */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ 
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          👥 Colaboração em Tempo Real
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Trabalhe junto com sua equipe de forma sincronizada e eficiente
        </Typography>
      </Box>

      {/* Status do Usuário Atual */}
      <Card sx={{ mb: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <FiberManualRecord 
                  sx={{ 
                    color: getStatusColor(usuarioAtual.status), 
                    fontSize: 14 
                  }} 
                />
              }
            >
              <Avatar 
                src={usuarioAtual.avatar} 
                sx={{ width: 60, height: 60, mr: 2 }}
              >
                {usuarioAtual.nome.charAt(0)}
              </Avatar>
            </Badge>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {usuarioAtual.nome}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                {usuarioAtual.organizacao} • {usuarioAtual.role.toUpperCase()}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Status: {usuarioAtual.status.toUpperCase()} • {usuarioAtual.ultimaAtividade}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Chamada de Vídeo">
                <IconButton 
                  color="inherit" 
                  onClick={() => setDialogVideoCall(true)}
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}
                >
                  <Videocam />
                </IconButton>
              </Tooltip>
              <Tooltip title="Convidar Membro">
                <IconButton 
                  color="inherit" 
                  onClick={() => setDialogConvite(true)}
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}
                >
                  <PersonAdd />
                </IconButton>
              </Tooltip>
              <Tooltip title="Configurações">
                <IconButton 
                  color="inherit"
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}
                >
                  <Settings />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Estatísticas de Colaboração */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #4caf50, #81c784)',
            color: 'white',
            minHeight: 120
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Group sx={{ mr: 1 }} />
                <Typography variant="h6">Usuários Online</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {usuarios.filter(u => u.status === 'online').length + 1}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                de {usuarios.length + 1} total
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #2196f3, #64b5f6)',
            color: 'white',
            minHeight: 120
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Work sx={{ mr: 1 }} />
                <Typography variant="h6">Projetos Ativos</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {projetos.filter(p => p.status === 'ativo').length}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {projetos.reduce((acc, p) => acc + p.atividades, 0)} atividades
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #ff9800, #ffb74d)',
            color: 'white',
            minHeight: 120
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Chat sx={{ mr: 1 }} />
                <Typography variant="h6">Mensagens</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {comentarios.length + comentarios.reduce((acc, c) => acc + c.respostas.length, 0)}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Última há 8 min
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #9c27b0, #ba68c8)',
            color: 'white',
            minHeight: 120
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CloudSync sx={{ mr: 1 }} />
                <Typography variant="h6">Sincronização</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                100%
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Tempo real ativo
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs de Navegação */}
      <Card sx={{ mb: 4 }}>
        <Tabs 
          value={tabAtiva} 
          onChange={(e, newValue) => setTabAtiva(newValue)}
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab icon={<Group />} label="Equipe" />
          <Tab icon={<Work />} label="Projetos" />
          <Tab icon={<History />} label="Atividades" />
          <Tab icon={<Chat />} label="Discussões" />
        </Tabs>

        {/* Tab 1: Equipe */}
        {tabAtiva === 0 && (
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                👨‍💼 Membros da Equipe
              </Typography>
              <Button
                variant="contained"
                startIcon={<PersonAdd />}
                onClick={() => setDialogConvite(true)}
                sx={{ background: 'linear-gradient(45deg, #667eea, #764ba2)' }}
              >
                Convidar Membro
              </Button>
            </Box>

            <Grid container spacing={2}>
              {/* Usuário Atual */}
              <Grid item xs={12} sm={6} md={4}>
                <Card 
                  variant="outlined" 
                  sx={{ 
                    border: '2px solid #4caf50',
                    bgcolor: 'rgba(76, 175, 80, 0.05)'
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                          <FiberManualRecord 
                            sx={{ 
                              color: getStatusColor(usuarioAtual.status), 
                              fontSize: 12 
                            }} 
                          />
                        }
                      >
                        <Avatar src={usuarioAtual.avatar} sx={{ width: 48, height: 48 }}>
                          {usuarioAtual.nome.charAt(0)}
                        </Avatar>
                      </Badge>
                      <Box sx={{ ml: 2, flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {usuarioAtual.nome}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {usuarioAtual.organizacao}
                        </Typography>
                      </Box>
                      {getRoleIcon(usuarioAtual.role)}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Chip 
                        label={usuarioAtual.role.toUpperCase()} 
                        color="primary" 
                        size="small" 
                      />
                      <Chip 
                        label="VOCÊ" 
                        color="success" 
                        size="small" 
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {usuarioAtual.ultimaAtividade}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                      <IconButton size="small" color="primary">
                        <Message />
                      </IconButton>
                      <IconButton size="small" color="success">
                        <Videocam />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Outros Usuários */}
              {usuarios.map((usuario) => (
                <Grid item xs={12} sm={6} md={4} key={usuario.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Badge
                          overlap="circular"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          badgeContent={
                            <FiberManualRecord 
                              sx={{ 
                                color: getStatusColor(usuario.status), 
                                fontSize: 12 
                              }} 
                            />
                          }
                        >
                          <Avatar src={usuario.avatar} sx={{ width: 48, height: 48 }}>
                            {usuario.nome.charAt(0)}
                          </Avatar>
                        </Badge>
                        <Box sx={{ ml: 2, flex: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {usuario.nome}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {usuario.organizacao}
                          </Typography>
                        </Box>
                        {getRoleIcon(usuario.role)}
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Chip 
                          label={usuario.role.toUpperCase()} 
                          variant="outlined" 
                          size="small" 
                        />
                        <Chip 
                          label={usuario.status.toUpperCase()} 
                          size="small" 
                          sx={{ 
                            bgcolor: getStatusColor(usuario.status),
                            color: 'white'
                          }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {usuario.ultimaAtividade}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                        <IconButton size="small" color="primary">
                          <Message />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          color="success"
                          disabled={usuario.status === 'offline'}
                        >
                          <Videocam />
                        </IconButton>
                        <IconButton size="small">
                          <MoreVert />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        )}

        {/* Tab 2: Projetos */}
        {tabAtiva === 1 && (
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
              📊 Projetos Colaborativos
            </Typography>

            {projetos.map((projeto) => (
              <Accordion key={projeto.id} sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', pr: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {projeto.nome}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {projeto.descricao} • {projeto.membros.length} membros
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getPermissaoIcon(projeto.permissao)}
                      <Chip 
                        label={projeto.status.toUpperCase()} 
                        color={projeto.status === 'ativo' ? 'success' : 'default'}
                        size="small"
                      />
                      <Badge badgeContent={projeto.atividades} color="primary">
                        <NotificationImportant />
                      </Badge>
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                      <Typography variant="body2" gutterBottom>
                        <strong>Última atualização:</strong> {projeto.ultimaAtualizacao}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Tipo:</strong> {projeto.tipo.toUpperCase()}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Permissões:</strong> {projeto.permissao.toUpperCase()}
                      </Typography>
                      
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" gutterBottom>
                          <strong>Membros ativos:</strong>
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          {projeto.membros.map((membroId) => {
                            const membro = membroId === '1' ? usuarioAtual : usuarios.find(u => u.id === membroId);
                            return membro ? (
                              <Tooltip key={membroId} title={`${membro.nome} (${membro.role})`}>
                                <Badge
                                  overlap="circular"
                                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                  badgeContent={
                                    <FiberManualRecord 
                                      sx={{ 
                                        color: getStatusColor(membro.status), 
                                        fontSize: 8 
                                      }} 
                                    />
                                  }
                                >
                                  <Avatar 
                                    src={membro.avatar} 
                                    sx={{ width: 32, height: 32 }}
                                  >
                                    {membro.nome.charAt(0)}
                                  </Avatar>
                                </Badge>
                              </Tooltip>
                            ) : null;
                          })}
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Button
                          variant="outlined"
                          startIcon={<Edit />}
                          size="small"
                          fullWidth
                        >
                          Editar
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<Share />}
                          size="small"
                          fullWidth
                        >
                          Compartilhar
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<Videocam />}
                          size="small"
                          fullWidth
                        >
                          Reunião
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))}
          </CardContent>
        )}

        {/* Tab 3: Atividades */}
        {tabAtiva === 2 && (
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
              📝 Atividades Recentes
            </Typography>

            <Timeline>
              {atividades.map((atividade, index) => (
                <TimelineItem key={atividade.id}>
                  <TimelineOppositeContent sx={{ m: 'auto 0' }} variant="body2" color="text.secondary">
                    {atividade.timestamp}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot 
                      color={
                        atividade.tipo === 'edicao' ? 'primary' :
                        atividade.tipo === 'comentario' ? 'secondary' :
                        atividade.tipo === 'compartilhamento' ? 'success' : 'warning'
                      }
                    >
                      {atividade.tipo === 'edicao' && <Edit />}
                      {atividade.tipo === 'comentario' && <Chat />}
                      {atividade.tipo === 'compartilhamento' && <Share />}
                      {atividade.tipo === 'sistema' && <CloudSync />}
                    </TimelineDot>
                    {index < atividades.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography variant="h6" component="span">
                      {atividade.usuario}
                    </Typography>
                    <Typography color="text.secondary">
                      {atividade.acao} em <strong>{atividade.projeto}</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {atividade.detalhes}
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </CardContent>
        )}

        {/* Tab 4: Discussões */}
        {tabAtiva === 3 && (
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
              💬 Discussões em Tempo Real
            </Typography>

            {/* Nova mensagem */}
            <Card variant="outlined" sx={{ mb: 3, bgcolor: 'grey.50' }}>
              <CardContent>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Avatar src={usuarioAtual.avatar}>
                    {usuarioAtual.nome.charAt(0)}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      placeholder="Escreva um comentário ou faça uma pergunta..."
                      value={novoComentario}
                      onChange={(e) => setNovoComentario(e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip label="Geral" size="small" variant="outlined" />
                        <Chip label="Sugestão" size="small" variant="outlined" />
                        <Chip label="Pergunta" size="small" variant="outlined" />
                      </Box>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<AddComment />}
                        disabled={!novoComentario.trim()}
                      >
                        Enviar
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Lista de comentários */}
            {comentarios.map((comentario) => (
              <Card key={comentario.id} variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Avatar>
                      {comentario.usuario.charAt(0)}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          {comentario.usuario}
                        </Typography>
                        <Chip 
                          label={comentario.tipo.toUpperCase()} 
                          size="small" 
                          variant="outlined"
                          color={
                            comentario.tipo === 'pergunta' ? 'primary' :
                            comentario.tipo === 'sugestao' ? 'success' : 'default'
                          }
                        />
                        <Typography variant="caption" color="text.secondary">
                          {comentario.timestamp}
                        </Typography>
                      </Box>
                      <Typography variant="body1" gutterBottom>
                        {comentario.texto}
                      </Typography>
                      
                      {/* Respostas */}
                      {comentario.respostas.map((resposta) => (
                        <Box key={resposta.id} sx={{ ml: 4, mt: 2, pl: 2, borderLeft: '2px solid #e0e0e0' }}>
                          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                            <Avatar sx={{ width: 24, height: 24 }}>
                              {resposta.usuario.charAt(0)}
                            </Avatar>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                              {resposta.usuario}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {resposta.timestamp}
                            </Typography>
                          </Box>
                          <Typography variant="body2">
                            {resposta.texto}
                          </Typography>
                        </Box>
                      ))}
                      
                      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                        <Button size="small" startIcon={<Reply />}>
                          Responder
                        </Button>
                        <Button size="small">
                          Curtir
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        )}
      </Card>

      {/* Dialog para Convidar Membro */}
      <Dialog open={dialogConvite} onClose={() => setDialogConvite(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PersonAdd sx={{ mr: 1 }} />
            Convidar Novo Membro
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email do convidado"
                type="email"
                placeholder="usuario@empresa.com"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Nível de Acesso</InputLabel>
                <Select defaultValue="viewer">
                  <MenuItem value="admin">Administrador - Acesso total</MenuItem>
                  <MenuItem value="editor">Editor - Pode editar e comentar</MenuItem>
                  <MenuItem value="viewer">Visualizador - Apenas visualização</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Mensagem personalizada (opcional)"
                placeholder="Olá! Gostaria de convidá-lo para colaborar no nosso projeto..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogConvite(false)}>Cancelar</Button>
          <Button variant="contained" startIcon={<PersonAdd />}>
            Enviar Convite
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para Video Call */}
      <Dialog 
        open={dialogVideoCall} 
        onClose={() => setDialogVideoCall(false)} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Videocam sx={{ mr: 1 }} />
            Reunião em Vídeo
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" gutterBottom>
              Funcionalidade em desenvolvimento
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Em breve você poderá fazer chamadas de vídeo diretamente na plataforma
            </Typography>
            
            <Box sx={{ my: 3 }}>
              <LinearProgress />
            </Box>
            
            <Typography variant="body2" color="text.secondary">
              Recursos planejados:
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon><Videocam /></ListItemIcon>
                <ListItemText primary="Chamadas de vídeo HD" />
              </ListItem>
              <ListItem>
                <ListItemIcon><ScreenShare /></ListItemIcon>
                <ListItemText primary="Compartilhamento de tela" />
              </ListItem>
              <ListItem>
                <ListItemIcon><GroupWork /></ListItemIcon>
                <ListItemText primary="Salas de reunião virtuais" />
              </ListItem>
            </List>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogVideoCall(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ColaboracaoTempoReal;
