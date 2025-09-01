import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  LinearProgress,
  Chip,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import {
  Backup,
  Restore,
  Storage,
  Schedule,
  CheckCircle,
  PlayArrow,
  Settings,
  CloudUpload
} from '@mui/icons-material';

interface BackupConfig {
  id: string;
  nome: string;
  tipo: 'completo' | 'incremental' | 'diferencial';
  frequencia: string;
  status: 'ativo' | 'inativo';
}

interface BackupHistorico {
  id: string;
  data: string;
  status: 'concluido' | 'erro' | 'em_andamento';
  tamanho: string;
  duracao: string;
}

const BackupSimples: React.FC = () => {
  const [progresso, setProgresso] = useState(0);
  const [backupAtivo, setBackupAtivo] = useState(false);
  const [dialogConfig, setDialogConfig] = useState(false);

  const configuracoes: BackupConfig[] = [
    {
      id: '1',
      nome: 'Backup Completo Diário',
      tipo: 'completo',
      frequencia: 'Diário às 02:00',
      status: 'ativo'
    },
    {
      id: '2',
      nome: 'Backup Incremental',
      tipo: 'incremental',
      frequencia: 'A cada 6 horas',
      status: 'ativo'
    },
    {
      id: '3',
      nome: 'Backup Semanal',
      tipo: 'diferencial',
      frequencia: 'Domingos às 01:00',
      status: 'inativo'
    }
  ];

  const historico: BackupHistorico[] = [
    {
      id: '1',
      data: '01/09/2025 02:00',
      status: 'concluido',
      tamanho: '2.5 GB',
      duracao: '45 min'
    },
    {
      id: '2',
      data: '31/08/2025 20:00',
      status: 'concluido',
      tamanho: '180 MB',
      duracao: '8 min'
    },
    {
      id: '3',
      data: '31/08/2025 14:00',
      status: 'erro',
      tamanho: '-',
      duracao: '-'
    },
    {
      id: '4',
      data: '31/08/2025 08:00',
      status: 'concluido',
      tamanho: '95 MB',
      duracao: '5 min'
    }
  ];

  const iniciarBackup = () => {
    setBackupAtivo(true);
    setProgresso(0);
    
    const interval = setInterval(() => {
      setProgresso(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setBackupAtivo(false);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concluido':
        return 'success';
      case 'em_andamento':
        return 'info';
      case 'erro':
        return 'error';
      case 'ativo':
        return 'primary';
      case 'inativo':
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'concluido':
        return <CheckCircle />;
      case 'em_andamento':
        return <PlayArrow />;
      case 'ativo':
        return <Schedule />;
      default:
        return <Storage />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          <Backup sx={{ mr: 1, verticalAlign: 'middle' }} />
          Sistema de Backup
        </Typography>
        <Button
          variant="contained"
          startIcon={<Settings />}
          onClick={() => setDialogConfig(true)}
        >
          Nova Configuração
        </Button>
      </Box>

      {/* Status Geral */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Storage sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4">{configuracoes.length}</Typography>
              <Typography variant="body2">Configurações</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <CheckCircle sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              <Typography variant="h4">
                {historico.filter(h => h.status === 'concluido').length}
              </Typography>
              <Typography variant="body2">Backups Concluídos</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Schedule sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
              <Typography variant="h4">
                {configuracoes.filter(c => c.status === 'ativo').length}
              </Typography>
              <Typography variant="body2">Configs Ativas</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <CloudUpload sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
              <Typography variant="h4">3.2 GB</Typography>
              <Typography variant="body2">Total Backups</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Backup em Andamento */}
      {backupAtivo && (
        <Alert severity="info" sx={{ mb: 3 }}>
          <Box sx={{ width: '100%' }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Backup em andamento... {progresso.toFixed(1)}%
            </Typography>
            <LinearProgress variant="determinate" value={progresso} />
          </Box>
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Configurações */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Configurações de Backup
              </Typography>
              <List>
                {configuracoes.map((config) => (
                  <ListItem key={config.id}>
                    <ListItemIcon>
                      {getStatusIcon(config.status)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {config.nome}
                          <Chip
                            label={config.tipo}
                            size="small"
                            variant="outlined"
                          />
                          <Chip
                            label={config.status}
                            size="small"
                            color={getStatusColor(config.status) as any}
                          />
                        </Box>
                      }
                      secondary={config.frequencia}
                    />
                    <Button
                      size="small"
                      startIcon={<PlayArrow />}
                      onClick={iniciarBackup}
                      disabled={backupAtivo}
                    >
                      Executar
                    </Button>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Histórico */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Histórico de Backups
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<Restore />}
                  size="small"
                >
                  Restaurar
                </Button>
              </Box>
              <List>
                {historico.map((backup) => (
                  <ListItem key={backup.id}>
                    <ListItemIcon>
                      {getStatusIcon(backup.status)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {backup.data}
                          <Chip
                            label={backup.status}
                            size="small"
                            color={getStatusColor(backup.status) as any}
                          />
                        </Box>
                      }
                      secondary={`${backup.tamanho} • ${backup.duracao}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Dialog Nova Configuração */}
      <Dialog open={dialogConfig} onClose={() => setDialogConfig(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Nova Configuração de Backup</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nome"
            margin="normal"
            defaultValue="Novo Backup"
          />
          <TextField
            select
            fullWidth
            label="Tipo"
            margin="normal"
            defaultValue="completo"
            SelectProps={{ native: true }}
          >
            <option value="completo">Completo</option>
            <option value="incremental">Incremental</option>
            <option value="diferencial">Diferencial</option>
          </TextField>
          <TextField
            select
            fullWidth
            label="Frequência"
            margin="normal"
            defaultValue="diario"
            SelectProps={{ native: true }}
          >
            <option value="diario">Diário</option>
            <option value="semanal">Semanal</option>
            <option value="mensal">Mensal</option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogConfig(false)}>Cancelar</Button>
          <Button variant="contained" onClick={() => setDialogConfig(false)}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BackupSimples;
