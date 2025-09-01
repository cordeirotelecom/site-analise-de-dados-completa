import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  LinearProgress,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Tooltip,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Backup,
  Restore,
  Storage,
  Schedule,
  CloudDownload,
  CloudUpload,
  CheckCircle,
  Error,
  Warning,
  Folder,
  PlayArrow,
  Pause,
  Stop,
  Delete,
  Download,
  Refresh,
  Settings,
  Security,
  History,
  Archive,
  Unarchive
} from '@mui/icons-material';

interface BackupConfig {
  id: string;
  nome: string;
  tipo: 'completo' | 'incremental' | 'diferencial';
  frequencia: 'diario' | 'semanal' | 'mensal' | 'manual';
  horario: string;
  retencao: number; // dias
  compressao: boolean;
  criptografia: boolean;
  destinos: string[];
  ativo: boolean;
}

interface BackupHistorico {
  id: string;
  configId: string;
  dataInicio: Date;
  dataFim?: Date;
  status: 'em_andamento' | 'concluido' | 'erro' | 'cancelado';
  tamanho?: number;
  arquivos?: number;
  erro?: string;
  duracao?: number;
}

interface RestoreRequest {
  backupId: string;
  destino: string;
  seletivo: boolean;
  arquivos?: string[];
  sobrescrever: boolean;
}

const SistemaBackup: React.FC = () => {
  const [configuracoes, setConfiguracoes] = useState<BackupConfig[]>([]);
  const [historico, setHistorico] = useState<BackupHistorico[]>([]);
  const [dialogConfig, setDialogConfig] = useState(false);
  const [dialogRestore, setDialogRestore] = useState(false);
  const [configAtual, setConfigAtual] = useState<Partial<BackupConfig>>({});
  const [restoreRequest, setRestoreRequest] = useState<Partial<RestoreRequest>>({});
  const [backupEmAndamento, setBackupEmAndamento] = useState<string | null>(null);
  const [progressoBackup, setProgressoBackup] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  // Dados simulados
  useEffect(() => {
    const configsDemo: BackupConfig[] = [
      {
        id: '1',
        nome: 'Backup Completo Diário',
        tipo: 'completo',
        frequencia: 'diario',
        horario: '02:00',
        retencao: 30,
        compressao: true,
        criptografia: true,
        destinos: ['S3 Bucket', 'Drive Local'],
        ativo: true
      },
      {
        id: '2',
        nome: 'Backup Incremental',
        tipo: 'incremental',
        frequencia: 'diario',
        horario: '12:00',
        retencao: 7,
        compressao: true,
        criptografia: false,
        destinos: ['Drive Local'],
        ativo: true
      },
      {
        id: '3',
        nome: 'Backup Semanal Arquivos',
        tipo: 'diferencial',
        frequencia: 'semanal',
        horario: '01:00',
        retencao: 90,
        compressao: true,
        criptografia: true,
        destinos: ['S3 Bucket', 'FTP Server'],
        ativo: false
      }
    ];

    const historicoDemo: BackupHistorico[] = [
      {
        id: '1',
        configId: '1',
        dataInicio: new Date(Date.now() - 24 * 60 * 60 * 1000),
        dataFim: new Date(Date.now() - 23 * 60 * 60 * 1000),
        status: 'concluido',
        tamanho: 1024 * 1024 * 500, // 500MB
        arquivos: 1250,
        duracao: 3600 // 1 hora
      },
      {
        id: '2',
        configId: '2',
        dataInicio: new Date(Date.now() - 12 * 60 * 60 * 1000),
        dataFim: new Date(Date.now() - 11.5 * 60 * 60 * 1000),
        status: 'concluido',
        tamanho: 1024 * 1024 * 50, // 50MB
        arquivos: 125,
        duracao: 1800 // 30 min
      },
      {
        id: '3',
        configId: '1',
        dataInicio: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        status: 'erro',
        erro: 'Falha na conexão com S3 Bucket'
      },
      {
        id: '4',
        configId: '2',
        dataInicio: new Date(),
        status: 'em_andamento'
      }
    ];

    setConfiguracoes(configsDemo);
    setHistorico(historicoDemo);
  }, []);

  // Simulação de progresso de backup
  useEffect(() => {
    const backupAtivo = historico.find(h => h.status === 'em_andamento');
    if (backupAtivo) {
      setBackupEmAndamento(backupAtivo.id);
      const interval = setInterval(() => {
        setProgressoBackup(prev => {
          if (prev >= 100) {
            setBackupEmAndamento(null);
            setHistorico(hist => hist.map(h => 
              h.id === backupAtivo.id 
                ? { ...h, status: 'concluido' as const, dataFim: new Date(), tamanho: 1024 * 1024 * 75, arquivos: 200, duracao: 2400 }
                : h
            ));
            return 0;
          }
          return prev + Math.random() * 10;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [historico]);

  const iniciarBackup = (configId: string) => {
    const novoBackup: BackupHistorico = {
      id: Date.now().toString(),
      configId,
      dataInicio: new Date(),
      status: 'em_andamento'
    };
    setHistorico(prev => [novoBackup, ...prev]);
    setProgressoBackup(0);
  };

  const formatarTamanho = (bytes?: number) => {
    if (!bytes) return 'N/A';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Math.round(bytes / Math.pow(1024, i) * 100) / 100} ${sizes[i]}`;
  };

  const formatarDuracao = (segundos?: number) => {
    if (!segundos) return 'N/A';
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    return `${horas}h ${minutos}m`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concluido':
        return 'success';
      case 'em_andamento':
        return 'info';
      case 'erro':
        return 'error';
      case 'cancelado':
        return 'warning';
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
      case 'erro':
        return <Error />;
      case 'cancelado':
        return <Warning />;
      default:
        return <Backup />;
    }
  };

  const salvarConfiguracao = () => {
    if (configAtual.id) {
      setConfiguracoes(prev => prev.map(c => c.id === configAtual.id ? configAtual as BackupConfig : c));
    } else {
      const novaConfig: BackupConfig = {
        ...configAtual,
        id: Date.now().toString()
      } as BackupConfig;
      setConfiguracoes(prev => [...prev, novaConfig]);
    }
    setDialogConfig(false);
    setConfigAtual({});
  };

  const iniciarRestore = () => {
    // Simulação de restore
    setActiveStep(0);
    const steps = ['Validando backup', 'Preparando arquivos', 'Restaurando dados', 'Finalizando'];
    
    const interval = setInterval(() => {
      setActiveStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setDialogRestore(false);
          setRestoreRequest({});
          return 0;
        }
        return prev + 1;
      });
    }, 2000);
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
          onClick={() => {
            setConfigAtual({
              nome: '',
              tipo: 'completo',
              frequencia: 'diario',
              horario: '02:00',
              retencao: 30,
              compressao: true,
              criptografia: true,
              destinos: [],
              ativo: true
            });
            setDialogConfig(true);
          }}
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
              <PlayArrow sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
              <Typography variant="h4">
                {historico.filter(h => h.status === 'em_andamento').length}
              </Typography>
              <Typography variant="body2">Em Andamento</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Error sx={{ fontSize: 40, color: 'error.main', mb: 1 }} />
              <Typography variant="h4">
                {historico.filter(h => h.status === 'erro').length}
              </Typography>
              <Typography variant="body2">Com Erro</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Backup em Andamento */}
      {backupEmAndamento && (
        <Alert severity="info" sx={{ mb: 3 }}>
          <Box sx={{ width: '100%' }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Backup em andamento... {progressoBackup.toFixed(1)}%
            </Typography>
            <LinearProgress variant="determinate" value={progressoBackup} />
          </Box>
        </Alert>
      )}

      {/* Configurações de Backup */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            <Schedule sx={{ mr: 1, verticalAlign: 'middle' }} />
            Configurações de Backup
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Frequência</TableCell>
                  <TableCell>Horário</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {configuracoes.map((config) => (
                  <TableRow key={config.id}>
                    <TableCell>{config.nome}</TableCell>
                    <TableCell>
                      <Chip label={config.tipo} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>{config.frequencia}</TableCell>
                    <TableCell>{config.horario}</TableCell>
                    <TableCell>
                      <Chip
                        label={config.ativo ? 'Ativo' : 'Inativo'}
                        color={config.ativo ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Executar Backup">
                        <IconButton
                          onClick={() => iniciarBackup(config.id)}
                          disabled={!!backupEmAndamento}
                        >
                          <PlayArrow />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Editar">
                        <IconButton
                          onClick={() => {
                            setConfigAtual(config);
                            setDialogConfig(true);
                          }}
                        >
                          <Settings />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Histórico de Backups */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              <History sx={{ mr: 1, verticalAlign: 'middle' }} />
              Histórico de Backups
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Restore />}
              onClick={() => setDialogRestore(true)}
            >
              Restaurar
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Data/Hora</TableCell>
                  <TableCell>Configuração</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Tamanho</TableCell>
                  <TableCell>Arquivos</TableCell>
                  <TableCell>Duração</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historico.slice(0, 10).map((backup) => {
                  const config = configuracoes.find(c => c.id === backup.configId);
                  return (
                    <TableRow key={backup.id}>
                      <TableCell>
                        {backup.dataInicio.toLocaleString()}
                      </TableCell>
                      <TableCell>{config?.nome}</TableCell>
                      <TableCell>
                        <Chip
                          label={backup.status.replace('_', ' ')}
                          color={getStatusColor(backup.status) as any}
                          size="small"
                          icon={getStatusIcon(backup.status)}
                        />
                      </TableCell>
                      <TableCell>{formatarTamanho(backup.tamanho)}</TableCell>
                      <TableCell>{backup.arquivos || 'N/A'}</TableCell>
                      <TableCell>{formatarDuracao(backup.duracao)}</TableCell>
                      <TableCell>
                        {backup.status === 'concluido' && (
                          <>
                            <Tooltip title="Download">
                              <IconButton size="small">
                                <Download />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Restaurar">
                              <IconButton
                                size="small"
                                onClick={() => {
                                  setRestoreRequest({ backupId: backup.id });
                                  setDialogRestore(true);
                                }}
                              >
                                <Restore />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                        {backup.status === 'erro' && backup.erro && (
                          <Tooltip title={backup.erro}>
                            <IconButton size="small">
                              <Error />
                            </IconButton>
                          </Tooltip>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Dialog Configuração */}
      <Dialog open={dialogConfig} onClose={() => setDialogConfig(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {configAtual.id ? 'Editar' : 'Nova'} Configuração de Backup
        </DialogTitle>
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
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Tipo</InputLabel>
                <Select
                  value={configAtual.tipo || 'completo'}
                  onChange={(e) => setConfigAtual(prev => ({ ...prev, tipo: e.target.value as any }))}
                  label="Tipo"
                >
                  <MenuItem value="completo">Completo</MenuItem>
                  <MenuItem value="incremental">Incremental</MenuItem>
                  <MenuItem value="diferencial">Diferencial</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Frequência</InputLabel>
                <Select
                  value={configAtual.frequencia || 'diario'}
                  onChange={(e) => setConfigAtual(prev => ({ ...prev, frequencia: e.target.value as any }))}
                  label="Frequência"
                >
                  <MenuItem value="diario">Diário</MenuItem>
                  <MenuItem value="semanal">Semanal</MenuItem>
                  <MenuItem value="mensal">Mensal</MenuItem>
                  <MenuItem value="manual">Manual</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Horário"
                type="time"
                value={configAtual.horario || '02:00'}
                onChange={(e) => setConfigAtual(prev => ({ ...prev, horario: e.target.value }))}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Retenção (dias)"
                type="number"
                value={configAtual.retencao || 30}
                onChange={(e) => setConfigAtual(prev => ({ ...prev, retencao: parseInt(e.target.value) }))}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={configAtual.compressao || false}
                    onChange={(e) => setConfigAtual(prev => ({ ...prev, compressao: e.target.checked }))}
                  />
                }
                label="Habilitar Compressão"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={configAtual.criptografia || false}
                    onChange={(e) => setConfigAtual(prev => ({ ...prev, criptografia: e.target.checked }))}
                  />
                }
                label="Habilitar Criptografia"
              />
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
          <Button onClick={salvarConfiguracao} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Restore */}
      <Dialog open={dialogRestore} onClose={() => setDialogRestore(false)} maxWidth="md" fullWidth>
        <DialogTitle>Restaurar Backup</DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} orientation="vertical">
            <Step>
              <StepLabel>Validando backup</StepLabel>
              <StepContent>
                <Typography>Verificando integridade dos arquivos...</Typography>
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Preparando arquivos</StepLabel>
              <StepContent>
                <Typography>Descompactando e descriptografando...</Typography>
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Restaurando dados</StepLabel>
              <StepContent>
                <Typography>Copiando arquivos para o destino...</Typography>
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Finalizando</StepLabel>
              <StepContent>
                <Typography>Verificando integridade dos dados restaurados...</Typography>
              </StepContent>
            </Step>
          </Stepper>

          {activeStep === 0 && (
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Backup</InputLabel>
                  <Select
                    value={restoreRequest.backupId || ''}
                    onChange={(e) => setRestoreRequest(prev => ({ ...prev, backupId: e.target.value }))}
                    label="Backup"
                  >
                    {historico.filter(h => h.status === 'concluido').map((backup) => (
                      <MenuItem key={backup.id} value={backup.id}>
                        {backup.dataInicio.toLocaleString()} - {formatarTamanho(backup.tamanho)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Destino"
                  value={restoreRequest.destino || ''}
                  onChange={(e) => setRestoreRequest(prev => ({ ...prev, destino: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={restoreRequest.sobrescrever || false}
                      onChange={(e) => setRestoreRequest(prev => ({ ...prev, sobrescrever: e.target.checked }))}
                    />
                  }
                  label="Sobrescrever arquivos existentes"
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogRestore(false)}>Cancelar</Button>
          {activeStep === 0 && (
            <Button onClick={iniciarRestore} variant="contained">
              Iniciar Restore
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SistemaBackup;
