import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Chip,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  MenuItem,
  Badge,
  Tooltip,
  Divider,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Switch,
  FormControlLabel,
  Paper,
  Stack,
  Tab,
  Tabs
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot
} from '@mui/lab';
import {
  Group,
  PersonAdd,
  Message,
  VideoCall,
  Share,
  Sync,
  Edit,
  Visibility,
  Delete,
  MoreVert,
  Schedule,
  Notifications,
  CheckCircle,
  Warning,
  Info,
  ExpandMore,
  Chat,
  Code,
  DataUsage,
  Analytics,
  CloudSync,
  People,
  Settings,
  Assignment
} from '@mui/icons-material';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  ultimaAtividade: Date;
  permissao: 'admin' | 'editor' | 'viewer';
}

interface Atividade {
  id: string;
  usuario: Usuario;
  acao: string;
  descricao: string;
  timestamp: Date;
  tipo: 'edit' | 'comment' | 'upload' | 'analysis' | 'share';
}

interface Projeto {
  id: string;
  nome: string;
  descricao: string;
  membros: Usuario[];
  criador: Usuario;
  dataCriacao: Date;
  ultimaModificacao: Date;
  status: 'ativo' | 'pausado' | 'concluido';
}

const ColaboracaoTempoRealCompleta: React.FC = () => {
  const [tabAtual, setTabAtual] = useState(0);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [dialogConvite, setDialogConvite] = useState(false);
  const [emailConvite, setEmailConvite] = useState('');
  const [permissaoConvite, setPermissaoConvite] = useState<'admin' | 'editor' | 'viewer'>('viewer');
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(true);
  const [syncAutomatico, setSyncAutomatico] = useState(true);

  useEffect(() => {
    carregarDados();
    iniciarSincronizacao();
  }, []);

  const carregarDados = () => {
    // Simular dados de usuários colaborando
    const usuariosMock: Usuario[] = [
      {
        id: '1',
        nome: 'João Silva',
        email: 'joao@empresa.com',
        avatar: 'https://ui-avatars.com/api/?name=Joao+Silva&background=1976d2&color=fff',
        status: 'online',
        ultimaAtividade: new Date(),
        permissao: 'admin'
      },
      {
        id: '2',
        nome: 'Maria Santos',
        email: 'maria@empresa.com',
        avatar: 'https://ui-avatars.com/api/?name=Maria+Santos&background=dc004e&color=fff',
        status: 'online',
        ultimaAtividade: new Date(Date.now() - 5 * 60 * 1000),
        permissao: 'editor'
      },
      {
        id: '3',
        nome: 'Carlos Pereira',
        email: 'carlos@empresa.com',
        avatar: 'https://ui-avatars.com/api/?name=Carlos+Pereira&background=388e3c&color=fff',
        status: 'away',
        ultimaAtividade: new Date(Date.now() - 30 * 60 * 1000),
        permissao: 'viewer'
      }
    ];

    const atividadesMock: Atividade[] = [
      {
        id: '1',
        usuario: usuariosMock[0],
        acao: 'Editou análise',
        descricao: 'Atualizou o modelo de regressão linear',
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        tipo: 'edit'
      },
      {
        id: '2',
        usuario: usuariosMock[1],
        acao: 'Comentou',
        descricao: 'Adicionou observações sobre os dados de vendas',
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        tipo: 'comment'
      },
      {
        id: '3',
        usuario: usuariosMock[2],
        acao: 'Fez upload',
        descricao: 'Enviou novo dataset de clientes',
        timestamp: new Date(Date.now() - 25 * 60 * 1000),
        tipo: 'upload'
      }
    ];

    const projetosMock: Projeto[] = [
      {
        id: '1',
        nome: 'Análise de Vendas Q3',
        descricao: 'Análise trimestral de performance de vendas',
        membros: usuariosMock,
        criador: usuariosMock[0],
        dataCriacao: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        ultimaModificacao: new Date(Date.now() - 2 * 60 * 1000),
        status: 'ativo'
      },
      {
        id: '2',
        nome: 'Previsão de Demanda',
        descricao: 'Modelo preditivo para demanda de produtos',
        membros: [usuariosMock[0], usuariosMock[1]],
        criador: usuariosMock[1],
        dataCriacao: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        ultimaModificacao: new Date(Date.now() - 1 * 60 * 60 * 1000),
        status: 'ativo'
      }
    ];

    setUsuarios(usuariosMock);
    setAtividades(atividadesMock);
    setProjetos(projetosMock);
  };

  const iniciarSincronizacao = () => {
    if (syncAutomatico) {
      const interval = setInterval(() => {
        // Simular sincronização em tempo real
        console.log('Sincronizando dados...');
      }, 5000);

      return () => clearInterval(interval);
    }
  };

  const enviarConvite = () => {
    if (emailConvite) {
      // Simular envio de convite
      console.log(`Convite enviado para ${emailConvite} com permissão ${permissaoConvite}`);
      setDialogConvite(false);
      setEmailConvite('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'success';
      case 'away': return 'warning';
      case 'offline': return 'error';
      default: return 'default';
    }
  };

  const getPermissaoColor = (permissao: string) => {
    switch (permissao) {
      case 'admin': return 'error';
      case 'editor': return 'primary';
      case 'viewer': return 'default';
      default: return 'default';
    }
  };

  const getTipoAtividadeIcon = (tipo: string) => {
    switch (tipo) {
      case 'edit': return <Edit color="primary" />;
      case 'comment': return <Message color="info" />;
      case 'upload': return <CloudSync color="success" />;
      case 'analysis': return <Analytics color="warning" />;
      case 'share': return <Share color="secondary" />;
      default: return <Info />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          👥 Colaboração em Tempo Real
        </Typography>
        <Button
          variant="contained"
          startIcon={<PersonAdd />}
          onClick={() => setDialogConvite(true)}
        >
          Convidar Colaborador
        </Button>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        Colabore em tempo real com sua equipe. Veja quem está online e acompanhe todas as atividades do projeto.
      </Alert>

      {/* Abas */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabAtual} onChange={(_, newValue) => setTabAtual(newValue)}>
          <Tab label="Usuários Online" icon={<People />} />
          <Tab label="Atividades" icon={<Assignment />} />
          <Tab label="Projetos" icon={<DataUsage />} />
          <Tab label="Configurações" icon={<Settings />} />
        </Tabs>
      </Box>

      {/* Aba Usuários Online */}
      {tabAtual === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <Group sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Usuários Ativos ({usuarios.filter(u => u.status === 'online').length})
                </Typography>
                <List>
                  {usuarios.map((usuario) => (
                    <ListItem key={usuario.id}>
                      <ListItemAvatar>
                        <Badge
                          overlap="circular"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          badgeContent={
                            <Box
                              sx={{
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                backgroundColor: usuario.status === 'online' ? 'success.main' : 
                                               usuario.status === 'away' ? 'warning.main' : 'error.main',
                                border: '2px solid white'
                              }}
                            />
                          }
                        >
                          <Avatar src={usuario.avatar} alt={usuario.nome} />
                        </Badge>
                      </ListItemAvatar>
                      <ListItemText
                        primary={usuario.nome}
                        secondary={
                          <Box>
                            <Typography variant="body2">{usuario.email}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              Última atividade: {usuario.ultimaAtividade.toLocaleTimeString()}
                            </Typography>
                          </Box>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Chip
                            size="small"
                            label={usuario.permissao}
                            color={getPermissaoColor(usuario.permissao)}
                          />
                          <Chip
                            size="small"
                            label={usuario.status}
                            color={getStatusColor(usuario.status)}
                          />
                          <IconButton>
                            <Message />
                          </IconButton>
                          <IconButton>
                            <VideoCall />
                          </IconButton>
                        </Stack>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Estatísticas
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Total de Usuários
                    </Typography>
                    <Typography variant="h4" color="primary">
                      {usuarios.length}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Online Agora
                    </Typography>
                    <Typography variant="h4" color="success.main">
                      {usuarios.filter(u => u.status === 'online').length}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Projetos Ativos
                    </Typography>
                    <Typography variant="h4" color="warning.main">
                      {projetos.filter(p => p.status === 'ativo').length}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Aba Atividades */}
      {tabAtual === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <Schedule sx={{ mr: 1, verticalAlign: 'middle' }} />
              Timeline de Atividades
            </Typography>
            <Timeline>
              {atividades.map((atividade, index) => (
                <TimelineItem key={atividade.id}>
                  <TimelineSeparator>
                    <TimelineDot color="primary">
                      {getTipoAtividadeIcon(atividade.tipo)}
                    </TimelineDot>
                    {index < atividades.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Paper elevation={1} sx={{ p: 2, mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Avatar
                          src={atividade.usuario.avatar}
                          sx={{ width: 24, height: 24, mr: 1 }}
                        />
                        <Typography variant="subtitle2">
                          {atividade.usuario.nome}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                          {atividade.acao}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {atividade.descricao}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {atividade.timestamp.toLocaleString()}
                      </Typography>
                    </Paper>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </CardContent>
        </Card>
      )}

      {/* Aba Projetos */}
      {tabAtual === 2 && (
        <Grid container spacing={3}>
          {projetos.map((projeto) => (
            <Grid item xs={12} md={6} key={projeto.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {projeto.nome}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {projeto.descricao}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Chip
                      label={projeto.status}
                      color={projeto.status === 'ativo' ? 'success' : 'default'}
                      size="small"
                    />
                    <Typography variant="caption" color="text.secondary">
                      Criado por {projeto.criador.nome}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="body2" sx={{ mr: 1 }}>
                      Membros:
                    </Typography>
                    <Stack direction="row" spacing={-1}>
                      {projeto.membros.map((membro) => (
                        <Tooltip key={membro.id} title={membro.nome}>
                          <Avatar
                            src={membro.avatar}
                            sx={{ width: 32, height: 32 }}
                          />
                        </Tooltip>
                      ))}
                    </Stack>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    Última modificação: {projeto.ultimaModificacao.toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Aba Configurações */}
      {tabAtual === 3 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Configurações de Colaboração
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notificacoesAtivas}
                      onChange={(e) => setNotificacoesAtivas(e.target.checked)}
                    />
                  }
                  label="Notificações em Tempo Real"
                />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                  Receber notificações quando outros usuários fazem alterações
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={syncAutomatico}
                      onChange={(e) => setSyncAutomatico(e.target.checked)}
                    />
                  }
                  label="Sincronização Automática"
                />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                  Sincronizar dados automaticamente a cada 5 segundos
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Dialog Convite */}
      <Dialog open={dialogConvite} onClose={() => setDialogConvite(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Convidar Colaborador</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email do colaborador"
            type="email"
            fullWidth
            variant="outlined"
            value={emailConvite}
            onChange={(e) => setEmailConvite(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            select
            label="Permissão"
            value={permissaoConvite}
            onChange={(e) => setPermissaoConvite(e.target.value as 'admin' | 'editor' | 'viewer')}
            fullWidth
            variant="outlined"
          >
            <MenuItem value="viewer">Visualizador</MenuItem>
            <MenuItem value="editor">Editor</MenuItem>
            <MenuItem value="admin">Administrador</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogConvite(false)}>Cancelar</Button>
          <Button onClick={enviarConvite} variant="contained">
            Enviar Convite
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ColaboracaoTempoRealCompleta;
