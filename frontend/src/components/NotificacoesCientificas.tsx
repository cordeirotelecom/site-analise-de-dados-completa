import React, { useState, useEffect } from 'react';
import {
  Snackbar,
  Alert,
  AlertTitle,
  Fab,
  Badge,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Box,
  Chip,
  Divider
} from '@mui/material';
import {
  Notifications,
  Science,
  TrendingUp,
  Warning,
  CheckCircle,
  Psychology,
  Close
} from '@mui/icons-material';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  category: 'scientific' | 'system' | 'analysis' | 'sustainability';
  read: boolean;
}

const NotificacoesCientificas: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeNotification, setActiveNotification] = useState<Notification | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Simula notificações científicas em tempo real
    const generateNotification = () => {
      const scientificNotifications = [
        {
          type: 'success' as const,
          title: 'Análise Completada',
          message: 'Correlação espacial detectada com 94% de confiança. Padrões significativos encontrados.',
          category: 'scientific' as const
        },
        {
          type: 'info' as const,
          title: 'Rigor Científico Validado',
          message: 'Todos os pressupostos estatísticos foram verificados. Análise em conformidade.',
          category: 'scientific' as const
        },
        {
          type: 'warning' as const,
          title: 'Atenção: Multicolinearidade',
          message: 'Detectada alta correlação entre variáveis. Recomenda-se análise de componentes principais.',
          category: 'analysis' as const
        },
        {
          type: 'success' as const,
          title: 'Sistema Sustentável Ativo',
          message: 'Gestão sistêmica operando com 96% de eficiência harmônica.',
          category: 'sustainability' as const
        },
        {
          type: 'info' as const,
          title: 'Nova API Integrada',
          message: 'Dados governamentais de SC atualizados. 1.247 novos registros processados.',
          category: 'system' as const
        }
      ];

      const randomNotification = scientificNotifications[Math.floor(Math.random() * scientificNotifications.length)];
      
      const newNotification: Notification = {
        id: `notif_${Date.now()}`,
        ...randomNotification,
        timestamp: new Date(),
        read: false
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 9)]); // Manter apenas 10 mais recentes
    };

    // Gerar notificação inicial
    generateNotification();
    
    // Gerar notificações a cada 15 segundos
    const interval = setInterval(generateNotification, 15000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Contar notificações não lidas
    const unread = notifications.filter(n => !n.read).length;
    setUnreadCount(unread);

    // Mostrar notificação mais recente se não foi lida
    const latestUnread = notifications.find(n => !n.read);
    if (latestUnread && !activeNotification) {
      setActiveNotification(latestUnread);
      
      // Auto-fechar após 6 segundos
      setTimeout(() => {
        setActiveNotification(null);
      }, 6000);
    }
  }, [notifications, activeNotification]);

  const handleCloseSnackbar = () => {
    if (activeNotification) {
      markAsRead(activeNotification.id);
    }
    setActiveNotification(null);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'scientific': return <Science />;
      case 'analysis': return <TrendingUp />;
      case 'sustainability': return <Psychology />;
      case 'system': return <CheckCircle />;
      default: return <Notifications />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'scientific': return '#9c27b0';
      case 'analysis': return '#2196f3';
      case 'sustainability': return '#4caf50';
      case 'system': return '#ff9800';
      default: return '#757575';
    }
  };

  return (
    <>
      {/* Botão de Notificações */}
      <Fab
        size="medium"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
          zIndex: 1000
        }}
        onClick={() => setDrawerOpen(true)}
      >
        <Badge badgeContent={unreadCount} color="error">
          <Notifications />
        </Badge>
      </Fab>

      {/* Snackbar para Notificação Ativa */}
      {activeNotification && (
        <Snackbar
          open={!!activeNotification}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{ mt: 8 }}
        >
          <Alert 
            severity={activeNotification.type}
            onClose={handleCloseSnackbar}
            sx={{ minWidth: 350 }}
          >
            <AlertTitle>{activeNotification.title}</AlertTitle>
            {activeNotification.message}
          </Alert>
        </Snackbar>
      )}

      {/* Drawer de Histórico */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 400,
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              🔔 Notificações Científicas
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <Close />
            </IconButton>
          </Box>
          
          {unreadCount > 0 && (
            <Box sx={{ mb: 2 }}>
              <Chip
                label={`Marcar todas como lidas (${unreadCount})`}
                onClick={markAllAsRead}
                size="small"
                variant="outlined"
                color="primary"
              />
            </Box>
          )}
          
          <Divider sx={{ mb: 2 }} />
        </Box>

        <List sx={{ flex: 1, px: 1 }}>
          {notifications.length === 0 ? (
            <ListItem>
              <ListItemText
                primary="Nenhuma notificação"
                secondary="O sistema irá notificar sobre análises e descobertas científicas"
              />
            </ListItem>
          ) : (
            notifications.map((notification) => (
              <ListItem
                key={notification.id}
                sx={{
                  mb: 1,
                  borderRadius: 2,
                  backgroundColor: notification.read ? 'transparent' : 'rgba(25, 118, 210, 0.08)',
                  border: notification.read ? '1px solid #e0e0e0' : '1px solid #1976d2',
                  cursor: 'pointer'
                }}
                onClick={() => markAsRead(notification.id)}
              >
                <ListItemIcon sx={{ color: getCategoryColor(notification.category) }}>
                  {getCategoryIcon(notification.category)}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {notification.title}
                      </Typography>
                      {!notification.read && (
                        <Chip label="Nova" size="small" color="primary" />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        {notification.message}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {notification.timestamp.toLocaleString('pt-BR')}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))
          )}
        </List>

        <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}>
          <Typography variant="caption" color="textSecondary" sx={{ textAlign: 'center', display: 'block' }}>
            🌱 Sistema de gestão sistêmica para desenvolvimento harmônico sustentável
          </Typography>
        </Box>
      </Drawer>
    </>
  );
};

export default NotificacoesCientificas;
