import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Alert,
  Button,
  Stack,
  Badge,
  Divider,
  Switch,
  FormControlLabel,
  Grid
} from '@mui/material';
import {
  Notifications,
  NotificationsActive,
  Delete,
  MarkAsUnread,
  CheckCircle,
  Warning,
  Error,
  Info,
  Settings,
  Refresh,
  Clear
} from '@mui/icons-material';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const SistemaNotificacoes: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [settings, setSettings] = useState({
    showOnlyUnread: false,
    enableSound: true,
    autoRefresh: true
  });

  useEffect(() => {
    // Simular notificações do sistema
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'success',
        title: 'Análise Concluída',
        message: 'Análise de dados do dataset "vendas_2024.csv" foi concluída com sucesso.',
        timestamp: new Date(Date.now() - 5 * 60000),
        read: false
      },
      {
        id: '2',
        type: 'warning',
        title: 'Backup Pendente',
        message: 'Seu último backup foi há 3 dias. Recomendamos fazer um backup dos seus projetos.',
        timestamp: new Date(Date.now() - 30 * 60000),
        read: false
      },
      {
        id: '3',
        type: 'info',
        title: 'Nova Funcionalidade',
        message: 'Agora você pode exportar relatórios em formato LaTeX para publicações científicas.',
        timestamp: new Date(Date.now() - 60 * 60000),
        read: true
      },
      {
        id: '4',
        type: 'error',
        title: 'Erro de Conexão',
        message: 'Falha ao conectar com a API de dados públicos. Verifique sua conexão.',
        timestamp: new Date(Date.now() - 2 * 60 * 60000),
        read: false
      }
    ];

    setNotifications(mockNotifications);

    // Auto-refresh se habilitado
    let interval: NodeJS.Timeout | null = null;
    if (settings.autoRefresh) {
      interval = setInterval(() => {
        // Simular nova notificação ocasionalmente
        if (Math.random() > 0.8) {
          const newNotification: Notification = {
            id: Date.now().toString(),
            type: Math.random() > 0.5 ? 'info' : 'success',
            title: 'Nova Atualização',
            message: 'Sistema atualizado automaticamente.',
            timestamp: new Date(),
            read: false
          };
          setNotifications(prev => [newNotification, ...prev]);
        }
      }, 30000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [settings.autoRefresh]);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAsUnread = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: false } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const clearAllRead = () => {
    setNotifications(prev => prev.filter(notif => !notif.read));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle color="success" />;
      case 'warning': return <Warning color="warning" />;
      case 'error': return <Error color="error" />;
      case 'info': return <Info color="info" />;
      default: return <Notifications />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = settings.showOnlyUnread 
    ? notifications.filter(n => !n.read)
    : notifications;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsActive sx={{ mr: 2 }} />
          </Badge>
          Sistema de Notificações
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton onClick={() => window.location.reload()} title="Atualizar">
            <Refresh />
          </IconButton>
          <IconButton onClick={markAllAsRead} title="Marcar todas como lidas">
            <CheckCircle />
          </IconButton>
          <IconButton onClick={clearAllRead} title="Limpar lidas">
            <Clear />
          </IconButton>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Painel de Configurações */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <Settings sx={{ mr: 1 }} />
                Configurações
              </Typography>
              
              <Stack spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.showOnlyUnread}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        showOnlyUnread: e.target.checked
                      }))}
                    />
                  }
                  label="Mostrar apenas não lidas"
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.enableSound}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        enableSound: e.target.checked
                      }))}
                    />
                  }
                  label="Habilitar som"
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.autoRefresh}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        autoRefresh: e.target.checked
                      }))}
                    />
                  }
                  label="Atualização automática"
                />
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={1}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={markAllAsRead}
                  startIcon={<CheckCircle />}
                  fullWidth
                >
                  Marcar Todas como Lidas
                </Button>
                
                <Button
                  variant="outlined"
                  size="small"
                  onClick={clearAllRead}
                  startIcon={<Clear />}
                  fullWidth
                >
                  Limpar Lidas
                </Button>
              </Stack>
            </CardContent>
          </Card>

          {/* Estatísticas */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Estatísticas
              </Typography>
              
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Total:</Typography>
                  <Chip label={notifications.length} size="small" />
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Não lidas:</Typography>
                  <Chip label={unreadCount} color="error" size="small" />
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Lidas:</Typography>
                  <Chip label={notifications.length - unreadCount} color="success" size="small" />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Lista de Notificações */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Notificações Recentes
              {settings.showOnlyUnread && (
                <Chip label="Apenas não lidas" size="small" sx={{ ml: 1 }} />
              )}
            </Typography>
            
            {filteredNotifications.length === 0 ? (
              <Alert severity="info" sx={{ mt: 2 }}>
                {settings.showOnlyUnread 
                  ? 'Nenhuma notificação não lida encontrada.'
                  : 'Nenhuma notificação disponível.'
                }
              </Alert>
            ) : (
              <List>
                {filteredNotifications.map((notification, index) => (
                  <React.Fragment key={notification.id}>
                    <ListItem
                      sx={{
                        bgcolor: notification.read ? 'transparent' : 'action.hover',
                        borderRadius: 1,
                        mb: 1,
                        border: notification.read ? 'none' : '1px solid',
                        borderColor: 'primary.light'
                      }}
                    >
                      <ListItemIcon>
                        {getNotificationIcon(notification.type)}
                      </ListItemIcon>
                      
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="subtitle1" fontWeight={notification.read ? 'normal' : 'bold'}>
                              {notification.title}
                            </Typography>
                            {!notification.read && (
                              <Chip size="small" label="Nova" color="primary" />
                            )}
                            <Chip
                              size="small"
                              label={notification.type.toUpperCase()}
                              color={
                                notification.type === 'error' ? 'error' :
                                notification.type === 'warning' ? 'warning' :
                                notification.type === 'success' ? 'success' : 'info'
                              }
                              variant="outlined"
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                              {notification.message}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {notification.timestamp.toLocaleString('pt-BR')}
                            </Typography>
                          </Box>
                        }
                      />
                      
                      <ListItemSecondaryAction>
                        <Stack direction="row" spacing={1}>
                          {notification.read ? (
                            <IconButton
                              size="small"
                              onClick={() => markAsUnread(notification.id)}
                              title="Marcar como não lida"
                            >
                              <MarkAsUnread fontSize="small" />
                            </IconButton>
                          ) : (
                            <IconButton
                              size="small"
                              onClick={() => markAsRead(notification.id)}
                              title="Marcar como lida"
                            >
                              <CheckCircle fontSize="small" />
                            </IconButton>
                          )}
                          
                          <IconButton
                            size="small"
                            onClick={() => deleteNotification(notification.id)}
                            title="Excluir"
                            color="error"
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Stack>
                      </ListItemSecondaryAction>
                    </ListItem>
                    
                    {index < filteredNotifications.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SistemaNotificacoes;
