import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Badge,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Fab,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Notifications,
  NotificationsActive,
  Email,
  Warning,
  Info,
  CheckCircle,
  Error,
  Delete,
  MarkEmailRead,
  Settings,
  Add,
  Send
} from '@mui/icons-material';

interface Notificacao {
  id: string;
  titulo: string;
  mensagem: string;
  tipo: 'info' | 'warning' | 'error' | 'success';
  categoria: string;
  lida: boolean;
  dataHora: Date;
}

const NotificacoesSimples: React.FC = () => {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([
    {
      id: '1',
      titulo: 'Backup Concluído',
      mensagem: 'Backup diário foi concluído com sucesso.',
      tipo: 'success',
      categoria: 'backup',
      lida: false,
      dataHora: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: '2',
      titulo: 'Alerta de Segurança',
      mensagem: 'Tentativa de login suspeita detectada.',
      tipo: 'warning',
      categoria: 'seguranca',
      lida: false,
      dataHora: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '3',
      titulo: 'Análise Finalizada',
      mensagem: 'Análise de dados concluída com sucesso.',
      tipo: 'info',
      categoria: 'analise',
      lida: true,
      dataHora: new Date(Date.now() - 4 * 60 * 60 * 1000)
    },
    {
      id: '4',
      titulo: 'Erro no Sistema',
      mensagem: 'Falha na conexão com banco de dados.',
      tipo: 'error',
      categoria: 'sistema',
      lida: false,
      dataHora: new Date(Date.now() - 10 * 60 * 1000)
    }
  ]);

  const [dialogEnviar, setDialogEnviar] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

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

  const contarNaoLidas = () => notificacoes.filter(n => !n.lida).length;

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

  const enviarNotificacaoTeste = () => {
    const novaNotificacao: Notificacao = {
      id: Date.now().toString(),
      titulo: 'Notificação de Teste',
      mensagem: 'Esta é uma notificação de teste enviada manualmente.',
      tipo: 'info',
      categoria: 'sistema',
      lida: false,
      dataHora: new Date()
    };
    setNotificacoes(prev => [novaNotificacao, ...prev]);
    setDialogEnviar(false);
    setSnackbar({ open: true, message: 'Notificação de teste enviada!' });
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
        <Button
          variant="outlined"
          startIcon={<Settings />}
        >
          Configurações
        </Button>
      </Box>

      {/* Estatísticas */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <NotificationsActive sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4">{notificacoes.length}</Typography>
              <Typography variant="body2">Total</Typography>
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
              <Email sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
              <Typography variant="h4">{contarNaoLidas()}</Typography>
              <Typography variant="body2">Não Lidas</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Error sx={{ fontSize: 40, color: 'error.main', mb: 1 }} />
              <Typography variant="h4">
                {notificacoes.filter(n => n.tipo === 'error' || n.tipo === 'warning').length}
              </Typography>
              <Typography variant="body2">Alertas</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Controles */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              onClick={marcarTodasComoLidas}
              startIcon={<MarkEmailRead />}
            >
              Marcar Todas como Lidas
            </Button>
            <Button
              variant="outlined"
              startIcon={<Email />}
            >
              Filtrar por Categoria
            </Button>
            <Button
              variant="outlined"
              startIcon={<Settings />}
            >
              Configurar Alertas
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Lista de Notificações */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Notificações Recentes
          </Typography>
          <List>
            {notificacoes.map((notificacao) => (
              <ListItem
                key={notificacao.id}
                sx={{
                  bgcolor: notificacao.lida ? 'transparent' : 'action.hover',
                  borderRadius: 1,
                  mb: 1
                }}
              >
                <ListItemIcon>
                  {getIconeTipo(notificacao.tipo)}
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
                        label={notificacao.tipo}
                        size="small"
                        color={getCorTipo(notificacao.tipo) as any}
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
                        {notificacao.dataHora.toLocaleString()}
                      </Typography>
                    </Box>
                  }
                />
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
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* FAB */}
      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setDialogEnviar(true)}
      >
        <Add />
      </Fab>

      {/* Dialog Enviar Teste */}
      <Dialog open={dialogEnviar} onClose={() => setDialogEnviar(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Enviar Notificação de Teste</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            Esta notificação será adicionada à lista para demonstração.
          </Alert>
          <TextField
            fullWidth
            label="Título"
            defaultValue="Notificação de Teste"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Mensagem"
            defaultValue="Esta é uma notificação de teste."
            multiline
            rows={3}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogEnviar(false)}>Cancelar</Button>
          <Button onClick={enviarNotificacaoTeste} variant="contained" startIcon={<Send />}>
            Enviar Teste
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert severity="success" onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NotificacoesSimples;
