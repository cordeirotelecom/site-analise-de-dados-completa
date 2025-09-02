import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Alert,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Chip,
  Divider,
  LinearProgress,
  Grid,
  IconButton,
  Tooltip,
  Paper,
  Stack
} from '@mui/material';
import {
  Notifications,
  Warning,
  CheckCircle,
  Error,
  Info,
  Settings,
  Refresh,
  Delete,
  NotificationsActive,
  Schedule,
  TrendingUp,
  Storage,
  CloudSync,
  Security
} from '@mui/icons-material';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    handler: () => void;
  };
}

interface SystemStatus {
  component: string;
  status: 'online' | 'warning' | 'error' | 'maintenance';
  uptime: number;
  lastCheck: Date;
  response_time: number;
}

const SistemaNotificacoes: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [systemStatus, setSystemStatus] = useState<SystemStatus[]>([]);
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [loading, setLoading] = useState(false);

  // Simular dados do sistema
  useEffect(() => {
    // Notificações iniciais
    const initialNotifications: Notification[] = [
      {
        id: '1',
        type: 'success',
        title: 'Upload Concluído',
        message: 'Arquivo dataset_vendas.csv foi processado com sucesso.',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        read: false
      },
      {
        id: '2',
        type: 'info',
        title: 'Nova API Disponível',
        message: 'API do IBGE - Indicadores Econômicos foi adicionada ao catálogo.',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        read: false,
        action: {
          label: 'Ver API',
          handler: () => console.log('Navegar para APIs')
        }
      },
      {
        id: '3',
        type: 'warning',
        title: 'Limite de API Próximo',
        message: 'Você utilizou 85% do seu limite mensal da API do Banco Central.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: true
      }
    ];

    // Status do sistema
    const initialStatus: SystemStatus[] = [
      {
        component: 'Backend API',
        status: 'online',
        uptime: 99.8,
        lastCheck: new Date(),
        response_time: 120
      },
      {
        component: 'Banco de Dados',
        status: 'online',
        uptime: 99.9,
        lastCheck: new Date(),
        response_time: 45
      },
      {
        component: 'APIs Externas',
        status: 'warning',
        uptime: 97.5,
        lastCheck: new Date(),
        response_time: 350
      }
    ];

    setNotifications(initialNotifications);
    setSystemStatus(initialStatus);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const refreshSystemStatus = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSystemStatus(prev =>
      prev.map(status => ({
        ...status,
        lastCheck: new Date(),
        response_time: Math.floor(Math.random() * 500) + 50
      }))
    );
    setLoading(false);
  };

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle color="success" />;
      case 'warning': return <Warning color="warning" />;
      case 'error': return <Error color="error" />;
      case 'info': return <Info color="info" />;
      default: return <Notifications />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'success';
      case 'warning': return 'warning';
      case 'error': return 'error';
      case 'maintenance': return 'info';
      default: return 'default';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <NotificationsActive color="primary" sx={{ fontSize: 32 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Centro de Notificações
          </Typography>
          {unreadCount > 0 && (
            <Chip 
              label={`${unreadCount} não lidas`} 
              color="error" 
              size="small" 
            />
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2">Notificações ativas</Typography>
          <Switch
            checked={enableNotifications}
            onChange={(e) => setEnableNotifications(e.target.checked)}
            color="primary"
          />
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Status do Sistema */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  Status do Sistema
                </Typography>
                <Tooltip title="Atualizar status">
                  <IconButton onClick={refreshSystemStatus} disabled={loading}>
                    <Refresh />
                  </IconButton>
                </Tooltip>
              </Box>

              {loading && <LinearProgress sx={{ mb: 2 }} />}

              <List>
                {systemStatus.map((status, index) => (
                  <React.Fragment key={status.component}>
                    <ListItem>
                      <ListItemIcon>
                        <Storage />
                      </ListItemIcon>
                      <ListItemText
                        primary={status.component}
                        secondary={
                          <Box>
                            <Typography variant="caption" display="block">
                              Uptime: {status.uptime}% | Resp: {status.response_time}ms
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              Última verificação: {status.lastCheck.toLocaleTimeString()}
                            </Typography>
                          </Box>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Chip
                          label={status.status}
                          color={getStatusColor(status.status) as any}
                          size="small"
                          variant="outlined"
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index < systemStatus.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Notificações */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Notificações Recentes
              </Typography>

              {notifications.length === 0 ? (
                <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.50' }}>
                  <Notifications color="disabled" sx={{ fontSize: 48, mb: 1 }} />
                  <Typography variant="body2" color="textSecondary">
                    Nenhuma notificação
                  </Typography>
                </Paper>
              ) : (
                <List>
                  {notifications.map((notification, index) => (
                    <React.Fragment key={notification.id}>
                      <ListItem
                        sx={{
                          bgcolor: notification.read ? 'transparent' : 'action.hover',
                          borderRadius: 1,
                          mb: 1
                        }}
                      >
                        <ListItemIcon>
                          {getStatusIcon(notification.type)}
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography 
                                variant="subtitle2" 
                                fontWeight={notification.read ? 'normal' : 'bold'}
                              >
                                {notification.title}
                              </Typography>
                              {!notification.read && (
                                <Chip label="Nova" color="primary" size="small" />
                              )}
                            </Box>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" sx={{ mb: 0.5 }}>
                                {notification.message}
                              </Typography>
                              <Typography variant="caption" color="textSecondary">
                                {new Date(notification.timestamp).toLocaleString()}
                              </Typography>
                              {notification.action && (
                                <Button
                                  size="small"
                                  color="primary"
                                  onClick={notification.action.handler}
                                  sx={{ ml: 1 }}
                                >
                                  {notification.action.label}
                                </Button>
                              )}
                            </Box>
                          }
                        />
                        <ListItemSecondaryAction>
                          <Stack direction="row" spacing={1}>
                            {!notification.read && (
                              <Tooltip title="Marcar como lida">
                                <IconButton
                                  size="small"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <CheckCircle fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}
                            <Tooltip title="Excluir">
                              <IconButton
                                size="small"
                                onClick={() => deleteNotification(notification.id)}
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SistemaNotificacoes;
  Close,
  Schedule,
  Person,
  Group,
  Analytics,
  Security,
  Backup,
  BugReport,
  TrendingUp,
  VolumeUp,
  VolumeOff,
  FilterList,
  Search,
  Send,
  NotificationImportant
} from '@mui/icons-material';

interface Notificacao {
  id: string;
  titulo: string;
  mensagem: string;
  tipo: 'info' | 'warning' | 'error' | 'success';
  categoria: 'sistema' | 'backup' | 'seguranca' | 'analise' | 'usuario';
  prioridade: 'baixa' | 'media' | 'alta' | 'critica';
  lida: boolean;
  dataHora: Date;
  origem: string;
  acao?: {
    label: string;
    url?: string;
    callback?: () => void;
  };
  destinatarios: string[];
}

interface ConfigNotificacao {
  id: string;
  nome: string;
  descricao: string;
  tipo: 'email' | 'push' | 'sms' | 'webhook';
  ativo: boolean;
  filtros: {
    categorias: string[];
    prioridades: string[];
    palavrasChave: string[];
  };
  agendamento?: {
    imediato: boolean;
    resumoDiario: boolean;
    resumoSemanal: boolean;
    horarioResumo: string;
  };
  destinatarios: string[];
}

interface TemplateNotificacao {
  id: string;
  nome: string;
  assunto: string;
  corpo: string;
  tipo: 'email' | 'push' | 'sms';
  variaveis: string[];
}

const SistemaNotificacoes: React.FC = () => {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [configuracoes, setConfiguracoes] = useState<ConfigNotificacao[]>([]);
  const [templates, setTemplates] = useState<TemplateNotificacao[]>([]);
  const [tab, setTab] = useState(0);
  const [dialogConfig, setDialogConfig] = useState(false);
  const [dialogTemplate, setDialogTemplate] = useState(false);
  const [dialogEnviar, setDialogEnviar] = useState(false);
  const [configAtual, setConfigAtual] = useState<Partial<ConfigNotificacao>>({});
  const [templateAtual, setTemplateAtual] = useState<Partial<TemplateNotificacao>>({});
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas');
  const [filtroPrioridade, setFiltroPrioridade] = useState<string>('todas');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' as const });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(true);

  // Simulação de dados
  useEffect(() => {
    const notificacoesDemo: Notificacao[] = [
      {
        id: '1',
        titulo: 'Backup Concluído',
        mensagem: 'Backup diário foi concluído com sucesso. 1.2GB de dados foram salvos.',
        tipo: 'success',
        categoria: 'backup',
        prioridade: 'media',
        lida: false,
        dataHora: new Date(Date.now() - 30 * 60 * 1000),
        origem: 'Sistema de Backup',
        acao: {
          label: 'Ver Detalhes',
          url: '/backup'
        },
        destinatarios: ['admin@company.com']
      },
      {
        id: '2',
        titulo: 'Alerta de Segurança',
        mensagem: 'Tentativa de login suspeita detectada para o usuário admin.',
        tipo: 'warning',
        categoria: 'seguranca',
        prioridade: 'alta',
        lida: false,
        dataHora: new Date(Date.now() - 2 * 60 * 60 * 1000),
        origem: 'Sistema de Segurança',
        acao: {
          label: 'Investigar',
          url: '/security'
        },
        destinatarios: ['admin@company.com', 'security@company.com']
      },
      {
        id: '3',
        titulo: 'Análise Finalizada',
        mensagem: 'Análise de dados de vendas foi concluída. Relatório disponível para download.',
        tipo: 'info',
        categoria: 'analise',
        prioridade: 'baixa',
        lida: true,
        dataHora: new Date(Date.now() - 4 * 60 * 60 * 1000),
        origem: 'Engine de Análise',
        acao: {
          label: 'Baixar Relatório',
          callback: () => console.log('Download iniciado')
        },
        destinatarios: ['analyst@company.com']
      },
      {
        id: '4',
        titulo: 'Erro Crítico no Sistema',
        mensagem: 'Falha na conexão com o banco de dados principal. Sistema em modo degradado.',
        tipo: 'error',
        categoria: 'sistema',
        prioridade: 'critica',
        lida: false,
        dataHora: new Date(Date.now() - 10 * 60 * 1000),
        origem: 'Monitor do Sistema',
        acao: {
          label: 'Ver Logs',
          url: '/monitoring'
        },
        destinatarios: ['admin@company.com', 'dev@company.com']
      },
      {
        id: '5',
        titulo: 'Novo Usuário Registrado',
        mensagem: 'João Silva se registrou na plataforma e aguarda aprovação.',
        tipo: 'info',
        categoria: 'usuario',
        prioridade: 'media',
        lida: true,
        dataHora: new Date(Date.now() - 6 * 60 * 60 * 1000),
        origem: 'Sistema de Usuários',
        acao: {
          label: 'Aprovar',
          callback: () => console.log('Usuário aprovado')
        },
        destinatarios: ['admin@company.com']
      }
    ];

    const configsDemo: ConfigNotificacao[] = [
      {
        id: '1',
        nome: 'Alertas Críticos',
        descricao: 'Notificações imediatas para eventos críticos do sistema',
        tipo: 'email',
        ativo: true,
        filtros: {
          categorias: ['sistema', 'seguranca'],
          prioridades: ['critica', 'alta'],
          palavrasChave: ['erro', 'falha', 'crítico']
        },
        agendamento: {
          imediato: true,
          resumoDiario: false,
          resumoSemanal: false,
          horarioResumo: '09:00'
        },
        destinatarios: ['admin@company.com', 'dev@company.com']
      },
      {
        id: '2',
        nome: 'Resumo Diário',
        descricao: 'Resumo diário de todas as atividades da plataforma',
        tipo: 'email',
        ativo: true,
        filtros: {
          categorias: ['backup', 'analise', 'usuario'],
          prioridades: ['baixa', 'media', 'alta'],
          palavrasChave: []
        },
        agendamento: {
          imediato: false,
          resumoDiario: true,
          resumoSemanal: false,
          horarioResumo: '08:00'
        },
        destinatarios: ['manager@company.com']
      }
    ];

    const templatesDemo: TemplateNotificacao[] = [
      {
        id: '1',
        nome: 'Alerta de Sistema',
        assunto: '[{{prioridade}}] {{titulo}}',
        corpo: `Olá,

Um evento foi detectado no sistema:

**Tipo:** {{tipo}}
**Mensagem:** {{mensagem}}
**Data/Hora:** {{dataHora}}
**Origem:** {{origem}}

{{#acao}}
Ação recomendada: {{acao.label}}
{{/acao}}

Atenciosamente,
Sistema DataScience Pro`,
        tipo: 'email',
        variaveis: ['prioridade', 'titulo', 'tipo', 'mensagem', 'dataHora', 'origem', 'acao']
      },
      {
        id: '2',
        nome: 'Notificação Push',
        assunto: '{{titulo}}',
        corpo: '{{mensagem}}',
        tipo: 'push',
        variaveis: ['titulo', 'mensagem']
      }
    ];

    setNotificacoes(notificacoesDemo);
    setConfiguracoes(configsDemo);
    setTemplates(templatesDemo);
  }, []);

  // Simulação de novas notificações
  useEffect(() => {
    if (!notificacoesAtivas) return;

    const interval = setInterval(() => {
      if (Math.random() > 0.8) { // 20% chance a cada 15 segundos
        const novaNotificacao: Notificacao = {
          id: Date.now().toString(),
          titulo: 'Nova Notificação',
          mensagem: 'Esta é uma notificação de teste gerada automaticamente.',
          tipo: Math.random() > 0.7 ? 'warning' : 'info',
          categoria: ['sistema', 'backup', 'analise'][Math.floor(Math.random() * 3)] as any,
          prioridade: ['baixa', 'media'][Math.floor(Math.random() * 2)] as any,
          lida: false,
          dataHora: new Date(),
          origem: 'Sistema de Teste',
          destinatarios: ['admin@company.com']
        };
        setNotificacoes(prev => [novaNotificacao, ...prev]);
        
        // Som de notificação (simulado)
        if (notificacoesAtivas) {
          setSnackbar({
            open: true,
            message: `Nova notificação: ${novaNotificacao.titulo}`,
            severity: novaNotificacao.tipo as any
          });
        }
      }
    }, 15000); // Mudado para 15 segundos

    return () => clearInterval(interval);
  }, [notificacoesAtivas]); // Dependência fixa

  const marcarComoLida = (id: string) => {
    setNotificacoes(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, lida: true } : notif
      )
    );
  };

  const marcarTodasComoLidas = () => {
    setNotificacoes(prev => 
      prev.map(notif => ({ ...notif, lida: true }))
    );
  };

  const deletarNotificacao = (id: string) => {
    setNotificacoes(prev => prev.filter(notif => notif.id !== id));
  };

  const filtrarNotificacoes = () => {
    return notificacoes.filter(notif => {
      const categoriaMatch = filtroCategoria === 'todas' || notif.categoria === filtroCategoria;
      const prioridadeMatch = filtroPrioridade === 'todas' || notif.prioridade === filtroPrioridade;
      return categoriaMatch && prioridadeMatch;
    });
  };

  const getCorTipo = (tipo: string) => {
    const cores = {
      info: 'info',
      warning: 'warning',
      error: 'error',
      success: 'success'
    };
    return cores[tipo as keyof typeof cores] || 'default';
  };

  const getIconeTipo = (tipo: string) => {
    const icones = {
      info: <Info />,
      warning: <Warning />,
      error: <Error />,
      success: <CheckCircle />
    };
    return icones[tipo as keyof typeof icones] || <Info />;
  };

  const getCorPrioridade = (prioridade: string) => {
    const cores = {
      baixa: 'default',
      media: 'primary',
      alta: 'warning',
      critica: 'error'
    };
    return cores[prioridade as keyof typeof cores] || 'default';
  };

  const contarNaoLidas = () => notificacoes.filter(n => !n.lida).length;

  const enviarNotificacaoTeste = () => {
    const novaNotificacao: Notificacao = {
      id: Date.now().toString(),
      titulo: 'Notificação de Teste',
      mensagem: 'Esta é uma notificação de teste enviada manualmente.',
      tipo: 'info',
      categoria: 'sistema',
      prioridade: 'media',
      lida: false,
      dataHora: new Date(),
      origem: 'Usuário',
      destinatarios: ['test@company.com']
    };
    setNotificacoes(prev => [novaNotificacao, ...prev]);
    setDialogEnviar(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          <Badge badgeContent={contarNaoLidas()} color="error">
            <Notifications sx={{ mr: 1, verticalAlign: 'middle' }} />
          </Badge>
          Sistema de Notificações
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Tooltip title={notificacoesAtivas ? 'Desativar Notificações' : 'Ativar Notificações'}>
            <IconButton
              onClick={() => setNotificacoesAtivas(!notificacoesAtivas)}
              color={notificacoesAtivas ? 'primary' : 'default'}
            >
              {notificacoesAtivas ? <VolumeUp /> : <VolumeOff />}
            </IconButton>
          </Tooltip>
          <Button
            variant="outlined"
            startIcon={<Settings />}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            Configurações
          </Button>
        </Box>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => { setDialogConfig(true); setAnchorEl(null); }}>
          <Settings sx={{ mr: 1 }} /> Nova Configuração
        </MenuItem>
        <MenuItem onClick={() => { setDialogTemplate(true); setAnchorEl(null); }}>
          <Email sx={{ mr: 1 }} /> Novo Template
        </MenuItem>
        <MenuItem onClick={() => { setDialogEnviar(true); setAnchorEl(null); }}>
          <Send sx={{ mr: 1 }} /> Enviar Teste
        </MenuItem>
      </Menu>

      <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)} sx={{ mb: 3 }}>
        <Tab label={`Notificações (${contarNaoLidas()})`} icon={<NotificationsActive />} />
        <Tab label="Configurações" icon={<Settings />} />
        <Tab label="Templates" icon={<Email />} />
        <Tab label="Estatísticas" icon={<Analytics />} />
      </Tabs>

      {tab === 0 && (
        <Box>
          {/* Controles de Filtro */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                <FilterList sx={{ color: 'text.secondary' }} />
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Categoria</InputLabel>
                  <Select
                    value={filtroCategoria}
                    onChange={(e) => setFiltroCategoria(e.target.value)}
                    label="Categoria"
                  >
                    <MenuItem value="todas">Todas</MenuItem>
                    <MenuItem value="sistema">Sistema</MenuItem>
                    <MenuItem value="backup">Backup</MenuItem>
                    <MenuItem value="seguranca">Segurança</MenuItem>
                    <MenuItem value="analise">Análise</MenuItem>
                    <MenuItem value="usuario">Usuário</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Prioridade</InputLabel>
                  <Select
                    value={filtroPrioridade}
                    onChange={(e) => setFiltroPrioridade(e.target.value)}
                    label="Prioridade"
                  >
                    <MenuItem value="todas">Todas</MenuItem>
                    <MenuItem value="baixa">Baixa</MenuItem>
                    <MenuItem value="media">Média</MenuItem>
                    <MenuItem value="alta">Alta</MenuItem>
                    <MenuItem value="critica">Crítica</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="outlined"
                  onClick={marcarTodasComoLidas}
                  startIcon={<MarkEmailRead />}
                >
                  Marcar Todas como Lidas
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Lista de Notificações */}
          <Card>
            <CardContent>
              <List>
                {filtrarNotificacoes().map((notificacao, index) => (
                  <React.Fragment key={notificacao.id}>
                    <ListItem
                      sx={{
                        bgcolor: notificacao.lida ? 'transparent' : 'action.hover',
                        borderRadius: 1,
                        mb: 1
                      }}
                    >
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: `${getCorTipo(notificacao.tipo)}.main` }}>
                          {getIconeTipo(notificacao.tipo)}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: notificacao.lida ? 'normal' : 'bold' }}
                            >
                              {notificacao.titulo}
                            </Typography>
                            <Chip
                              label={notificacao.prioridade}
                              size="small"
                              color={getCorPrioridade(notificacao.prioridade) as any}
                            />
                            <Chip
                              label={notificacao.categoria}
                              size="small"
                              variant="outlined"
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                              {notificacao.mensagem}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {notificacao.dataHora.toLocaleString()} • {notificacao.origem}
                            </Typography>
                            {notificacao.acao && (
                              <Button
                                size="small"
                                sx={{ ml: 1 }}
                                onClick={() => {
                                  if (notificacao.acao?.callback) {
                                    notificacao.acao.callback();
                                  }
                                  marcarComoLida(notificacao.id);
                                }}
                              >
                                {notificacao.acao.label}
                              </Button>
                            )}
                          </Box>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          {!notificacao.lida && (
                            <Tooltip title="Marcar como lida">
                              <IconButton
                                onClick={() => marcarComoLida(notificacao.id)}
                                size="small"
                              >
                                <MarkEmailRead />
                              </IconButton>
                            </Tooltip>
                          )}
                          <Tooltip title="Deletar">
                            <IconButton
                              onClick={() => deletarNotificacao(notificacao.id)}
                              size="small"
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index < filtrarNotificacoes().length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>
      )}

      {tab === 1 && (
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Configurações de Notificação</Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => {
                  setConfigAtual({
                    nome: '',
                    descricao: '',
                    tipo: 'email',
                    ativo: true,
                    filtros: { categorias: [], prioridades: [], palavrasChave: [] },
                    destinatarios: []
                  });
                  setDialogConfig(true);
                }}
              >
                Nova Configuração
              </Button>
            </Box>
            <List>
              {configuracoes.map((config) => (
                <ListItem key={config.id}>
                  <ListItemIcon>
                    {config.tipo === 'email' ? <Email /> : 
                     config.tipo === 'sms' ? <Sms /> : <Notifications />}
                  </ListItemIcon>
                  <ListItemText
                    primary={config.nome}
                    secondary={
                      <Box>
                        <Typography variant="body2">{config.descricao}</Typography>
                        <Typography variant="caption">
                          Tipo: {config.tipo} • 
                          Destinatários: {config.destinatarios.length} • 
                          {config.ativo ? 'Ativo' : 'Inativo'}
                        </Typography>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={config.ativo}
                      onChange={(e) => {
                        setConfiguracoes(prev =>
                          prev.map(c =>
                            c.id === config.id ? { ...c, ativo: e.target.checked } : c
                          )
                        );
                      }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {tab === 2 && (
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Templates de Notificação</Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => {
                  setTemplateAtual({
                    nome: '',
                    assunto: '',
                    corpo: '',
                    tipo: 'email',
                    variaveis: []
                  });
                  setDialogTemplate(true);
                }}
              >
                Novo Template
              </Button>
            </Box>
            <Grid container spacing={2}>
              {templates.map((template) => (
                <Grid item xs={12} md={6} key={template.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6">{template.nome}</Typography>
                      <Chip label={template.tipo} size="small" sx={{ mb: 2 }} />
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Assunto:</strong> {template.assunto}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        <strong>Variáveis:</strong> {template.variaveis.join(', ')}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button size="small" onClick={() => {
                          setTemplateAtual(template);
                          setDialogTemplate(true);
                        }}>
                          Editar
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      {tab === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <NotificationsActive sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h4">{notificacoes.length}</Typography>
                <Typography variant="body2">Total de Notificações</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <MarkEmailRead sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                <Typography variant="h4">{notificacoes.filter(n => n.lida).length}</Typography>
                <Typography variant="body2">Lidas</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <NotificationImportant sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                <Typography variant="h4">{contarNaoLidas()}</Typography>
                <Typography variant="body2">Não Lidas</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Settings sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                <Typography variant="h4">{configuracoes.filter(c => c.ativo).length}</Typography>
                <Typography variant="body2">Configs Ativas</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* FAB para nova notificação */}
      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setDialogEnviar(true)}
      >
        <Add />
      </Fab>

      {/* Snackbar para notificações */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Dialog Configuração */}
      <Dialog open={dialogConfig} onClose={() => setDialogConfig(false)} maxWidth="md" fullWidth>
        <DialogTitle>Nova Configuração de Notificação</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome"
                value={configAtual.nome || ''}
                onChange={(e) => setConfigAtual(prev => ({ ...prev, nome: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descrição"
                multiline
                rows={2}
                value={configAtual.descricao || ''}
                onChange={(e) => setConfigAtual(prev => ({ ...prev, descricao: e.target.value }))}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Tipo</InputLabel>
                <Select
                  value={configAtual.tipo || 'email'}
                  onChange={(e) => setConfigAtual(prev => ({ ...prev, tipo: e.target.value as any }))}
                  label="Tipo"
                >
                  <MenuItem value="email">Email</MenuItem>
                  <MenuItem value="push">Push</MenuItem>
                  <MenuItem value="sms">SMS</MenuItem>
                  <MenuItem value="webhook">Webhook</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={configAtual.ativo !== false}
                    onChange={(e) => setConfigAtual(prev => ({ ...prev, ativo: e.target.checked }))}
                  />
                }
                label="Configuração Ativa"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogConfig(false)}>Cancelar</Button>
          <Button variant="contained">Salvar</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Template */}
      <Dialog open={dialogTemplate} onClose={() => setDialogTemplate(false)} maxWidth="md" fullWidth>
        <DialogTitle>Novo Template de Notificação</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome do Template"
                value={templateAtual.nome || ''}
                onChange={(e) => setTemplateAtual(prev => ({ ...prev, nome: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Assunto"
                value={templateAtual.assunto || ''}
                onChange={(e) => setTemplateAtual(prev => ({ ...prev, assunto: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Corpo da Mensagem"
                multiline
                rows={8}
                value={templateAtual.corpo || ''}
                onChange={(e) => setTemplateAtual(prev => ({ ...prev, corpo: e.target.value }))}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogTemplate(false)}>Cancelar</Button>
          <Button variant="contained">Salvar</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Enviar Teste */}
      <Dialog open={dialogEnviar} onClose={() => setDialogEnviar(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Enviar Notificação de Teste</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            Esta notificação será adicionada à lista para demonstração.
          </Alert>
          <Typography>
            Deseja enviar uma notificação de teste para verificar o funcionamento do sistema?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogEnviar(false)}>Cancelar</Button>
          <Button onClick={enviarNotificacaoTeste} variant="contained">
            Enviar Teste
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SistemaNotificacoes;
