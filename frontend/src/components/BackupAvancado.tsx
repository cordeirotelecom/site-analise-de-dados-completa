import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Grid,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  IconButton,
  Tooltip,
  Fab,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { 
  CloudUpload, 
  CloudDownload, 
  Storage, 
  Schedule,
  CheckCircle,
  Warning,
  Error as ErrorIcon,
  Add,
  Delete,
  Edit,
  Refresh,
  Settings,
  History,
  Download,
  Restore,
  Info,
  PlayArrow,
  Pause,
  Stop,
  Security,
  ExpandMore,
  Backup as BackupIcon,
  AutoAwesome,
  AccessTime,
  DataUsage,
  CloudSync,
  VerifiedUser
} from '@mui/icons-material';

interface BackupConfig {
  id: string;
  nome: string;
  tipo: 'completo' | 'incremental' | 'diferencial' | 'automatico';
  frequencia: string;
  status: 'ativo' | 'inativo' | 'pausado';
  ultimoBackup: string;
  proximoBackup: string;
  tamanhoMedio: string;
  localizacao: string;
  criptografia: boolean;
  compressao: boolean;
  retencao: number; // dias
}

interface BackupHistorico {
  id: string;
  data: string;
  status: 'concluido' | 'erro' | 'em_andamento' | 'cancelado';
  tamanho: string;
  duracao: string;
  tipo: string;
  config: string;
  detalhes: string;
}

interface EstatisticasBackup {
  totalBackups: number;
  sucessos: number;
  erros: number;
  espacoUsado: string;
  economiaCompressao: string;
  tempoMedio: string;
  ultimaSincronizacao: string;
}

const BackupAvancado: React.FC = () => {
  const [progresso, setProgresso] = useState(0);
  const [backupAtivo, setBackupAtivo] = useState(false);
  const [dialogConfig, setDialogConfig] = useState(false);
  const [dialogRestore, setDialogRestore] = useState(false);
  const [tabAtiva, setTabAtiva] = useState(0);
  const [novaConfig, setNovaConfig] = useState<Partial<BackupConfig>>({});
  const [autoBackup, setAutoBackup] = useState(true);

  const [configuracoes, setConfiguracoes] = useState<BackupConfig[]>([
    {
      id: '1',
      nome: 'Backup Completo Produção',
      tipo: 'completo',
      frequencia: 'Diário às 02:00',
      status: 'ativo',
      ultimoBackup: '01/09/2025 02:00',
      proximoBackup: '02/09/2025 02:00',
      tamanhoMedio: '2.5 GB',
      localizacao: 'AWS S3 / Brazil',
      criptografia: true,
      compressao: true,
      retencao: 30
    },
    {
      id: '2',
      nome: 'Backup Incremental Rápido',
      tipo: 'incremental',
      frequencia: 'A cada 4 horas',
      status: 'ativo',
      ultimoBackup: '01/09/2025 20:00',
      proximoBackup: '02/09/2025 00:00',
      tamanhoMedio: '180 MB',
      localizacao: 'Google Drive',
      criptografia: true,
      compressao: true,
      retencao: 7
    },
    {
      id: '3',
      nome: 'Backup Diferencial Semanal',
      tipo: 'diferencial',
      frequencia: 'Domingos às 01:00',
      status: 'pausado',
      ultimoBackup: '25/08/2025 01:00',
      proximoBackup: '03/09/2025 01:00',
      tamanhoMedio: '850 MB',
      localizacao: 'Local / NAS',
      criptografia: false,
      compressao: true,
      retencao: 90
    },
    {
      id: '4',
      nome: 'Backup Inteligente AutoML',
      tipo: 'automatico',
      frequencia: 'Baseado em atividade',
      status: 'ativo',
      ultimoBackup: '01/09/2025 18:30',
      proximoBackup: 'Adaptativo',
      tamanhoMedio: '120 MB',
      localizacao: 'Multi-Cloud',
      criptografia: true,
      compressao: true,
      retencao: 14
    }
  ]);

  const historico: BackupHistorico[] = [
    {
      id: '1',
      data: '01/09/2025 02:00',
      status: 'concluido',
      tamanho: '2.47 GB → 876 MB',
      duracao: '42 min',
      tipo: 'Completo',
      config: 'Backup Completo Produção',
      detalhes: 'Compressão: 64.5% | Criptografia: AES-256'
    },
    {
      id: '2',
      data: '01/09/2025 20:00',
      status: 'concluido',
      tamanho: '183 MB → 72 MB',
      duracao: '6 min',
      tipo: 'Incremental',
      config: 'Backup Incremental Rápido',
      detalhes: 'Compressão: 60.7% | Apenas deltas'
    },
    {
      id: '3',
      data: '01/09/2025 18:30',
      status: 'concluido',
      tamanho: '124 MB → 58 MB',
      duracao: '4 min',
      tipo: 'Automático',
      config: 'Backup Inteligente AutoML',
      detalhes: 'IA detectou mudanças significativas'
    },
    {
      id: '4',
      data: '01/09/2025 16:00',
      status: 'concluido',
      tamanho: '95 MB → 41 MB',
      duracao: '3 min',
      tipo: 'Incremental',
      config: 'Backup Incremental Rápido',
      detalhes: 'Sync automático realizado'
    },
    {
      id: '5',
      data: '31/08/2025 22:15',
      status: 'erro',
      tamanho: '-',
      duracao: '2 min',
      tipo: 'Automático',
      config: 'Backup Inteligente AutoML',
      detalhes: 'Erro: Conectividade de rede perdida'
    }
  ];

  const estatisticas: EstatisticasBackup = {
    totalBackups: 1247,
    sucessos: 1198,
    erros: 49,
    espacoUsado: '47.2 GB',
    economiaCompressao: '68.4%',
    tempoMedio: '12 min',
    ultimaSincronizacao: '01/09/2025 20:00'
  };

  const executarBackup = async (configId?: string) => {
    setBackupAtivo(true);
    setProgresso(0);

    const steps = [
      'Verificando integridade dos dados...',
      'Compactando arquivos...',
      'Aplicando criptografia...',
      'Transferindo para nuvem...',
      'Verificando backup...',
      'Finalizando processo...'
    ];

    for (let i = 0; i <= 100; i += 20) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProgresso(i);
    }

    setBackupAtivo(false);
    setProgresso(100);
  };

  const restaurarBackup = async (backupId: string) => {
    setBackupAtivo(true);
    setProgresso(0);

    for (let i = 0; i <= 100; i += 25) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setProgresso(i);
    }

    setBackupAtivo(false);
    setDialogRestore(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'success';
      case 'pausado': return 'warning';
      case 'inativo': return 'default';
      default: return 'default';
    }
  };

  const getStatusBackupColor = (status: string) => {
    switch (status) {
      case 'concluido': return 'success';
      case 'erro': return 'error';
      case 'em_andamento': return 'info';
      case 'cancelado': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Principal */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ 
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          🔄 Sistema de Backup Avançado
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Proteção inteligente e automatizada dos seus dados com IA
        </Typography>
      </Box>

      {/* Cards de Estatísticas Principais */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #4caf50, #81c784)',
            color: 'white',
            minHeight: 120
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CheckCircle sx={{ mr: 1 }} />
                <Typography variant="h6">Taxa de Sucesso</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {((estatisticas.sucessos / estatisticas.totalBackups) * 100).toFixed(1)}%
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {estatisticas.sucessos} de {estatisticas.totalBackups} backups
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
                <Storage sx={{ mr: 1 }} />
                <Typography variant="h6">Espaço Usado</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {estatisticas.espacoUsado}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Economia: {estatisticas.economiaCompressao}
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
                <AccessTime sx={{ mr: 1 }} />
                <Typography variant="h6">Tempo Médio</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {estatisticas.tempoMedio}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Otimização contínua
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
                <AutoAwesome sx={{ mr: 1 }} />
                <Typography variant="h6">IA Ativa</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                ON
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Última sync: {estatisticas.ultimaSincronizacao}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Controles Principais */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <BackupIcon sx={{ mr: 1, color: 'primary.main' }} />
              Controle Central de Backups
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={autoBackup}
                  onChange={(e) => setAutoBackup(e.target.checked)}
                  color="primary"
                />
              }
              label="Backup Automático"
            />
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="contained"
                startIcon={<PlayArrow />}
                onClick={() => executarBackup()}
                disabled={backupAtivo}
                fullWidth
                size="large"
                sx={{ py: 2 }}
              >
                {backupAtivo ? 'Executando...' : 'Backup Agora'}
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="outlined"
                startIcon={<Restore />}
                onClick={() => setDialogRestore(true)}
                fullWidth
                size="large"
                sx={{ py: 2 }}
              >
                Restaurar
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={() => setDialogConfig(true)}
                fullWidth
                size="large"
                sx={{ py: 2 }}
              >
                Nova Config
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="outlined"
                startIcon={<Settings />}
                fullWidth
                size="large"
                sx={{ py: 2 }}
              >
                Configurações
              </Button>
            </Grid>
          </Grid>

          {backupAtivo && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="body1" gutterBottom>
                Backup em andamento... {progresso}%
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={progresso} 
                sx={{ 
                  height: 10, 
                  borderRadius: 5,
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(45deg, #4caf50, #81c784)'
                  }
                }}
              />
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Configurações de Backup */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            📋 Configurações Ativas
          </Typography>
          
          {configuracoes.map((config) => (
            <Accordion key={config.id} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', pr: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {config.nome}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {config.frequencia} • {config.tamanhoMedio} • {config.localizacao}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip 
                      label={config.tipo.toUpperCase()} 
                      size="small" 
                      variant="outlined"
                    />
                    <Chip 
                      label={config.status.toUpperCase()} 
                      size="small" 
                      color={getStatusColor(config.status) as any}
                    />
                    {config.criptografia && <VerifiedUser color="success" fontSize="small" />}
                    {config.compressao && <DataUsage color="primary" fontSize="small" />}
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Último Backup:</strong> {config.ultimoBackup}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Próximo Backup:</strong> {config.proximoBackup}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Retenção:</strong> {config.retencao} dias
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Button startIcon={<PlayArrow />} size="small" variant="outlined">
                        Executar
                      </Button>
                      <Button startIcon={<Edit />} size="small" variant="outlined">
                        Editar
                      </Button>
                      <Button startIcon={<Pause />} size="small" variant="outlined">
                        Pausar
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </CardContent>
      </Card>

      {/* Histórico de Backups */}
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            📊 Histórico Detalhado
          </Typography>
          
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell><strong>Data/Hora</strong></TableCell>
                  <TableCell><strong>Tipo</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Tamanho</strong></TableCell>
                  <TableCell><strong>Duração</strong></TableCell>
                  <TableCell><strong>Detalhes</strong></TableCell>
                  <TableCell><strong>Ações</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historico.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {item.data}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.config}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={item.tipo} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={item.status.toUpperCase()} 
                        size="small" 
                        color={getStatusBackupColor(item.status) as any}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {item.tamanho}
                      </Typography>
                    </TableCell>
                    <TableCell>{item.duracao}</TableCell>
                    <TableCell>
                      <Tooltip title={item.detalhes}>
                        <IconButton size="small">
                          <Info />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Tooltip title="Restaurar">
                          <IconButton size="small" color="primary">
                            <Restore />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Download">
                          <IconButton size="small" color="secondary">
                            <Download />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Dialog para Nova Configuração */}
      <Dialog open={dialogConfig} onClose={() => setDialogConfig(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Add sx={{ mr: 1 }} />
            Nova Configuração de Backup
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome da Configuração"
                value={novaConfig.nome || ''}
                onChange={(e) => setNovaConfig({ ...novaConfig, nome: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Backup</InputLabel>
                <Select
                  value={novaConfig.tipo || ''}
                  onChange={(e) => setNovaConfig({ ...novaConfig, tipo: e.target.value as any })}
                >
                  <MenuItem value="completo">Completo</MenuItem>
                  <MenuItem value="incremental">Incremental</MenuItem>
                  <MenuItem value="diferencial">Diferencial</MenuItem>
                  <MenuItem value="automatico">Automático (IA)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Frequência"
                value={novaConfig.frequencia || ''}
                onChange={(e) => setNovaConfig({ ...novaConfig, frequencia: e.target.value })}
                placeholder="Ex: Diário às 02:00"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Localização"
                value={novaConfig.localizacao || ''}
                onChange={(e) => setNovaConfig({ ...novaConfig, localizacao: e.target.value })}
                placeholder="Ex: AWS S3, Google Drive"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Retenção (dias)"
                value={novaConfig.retencao || ''}
                onChange={(e) => setNovaConfig({ ...novaConfig, retencao: parseInt(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={novaConfig.criptografia || false}
                      onChange={(e) => setNovaConfig({ ...novaConfig, criptografia: e.target.checked })}
                    />
                  }
                  label="Criptografia AES-256"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={novaConfig.compressao || false}
                      onChange={(e) => setNovaConfig({ ...novaConfig, compressao: e.target.checked })}
                    />
                  }
                  label="Compressão Automática"
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogConfig(false)}>Cancelar</Button>
          <Button variant="contained" startIcon={<Add />}>
            Criar Configuração
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para Restauração */}
      <Dialog open={dialogRestore} onClose={() => setDialogRestore(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Restore sx={{ mr: 1 }} />
            Restaurar Backup
          </Box>
        </DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            Esta ação irá substituir os dados atuais pelos dados do backup selecionado.
          </Alert>
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Selecionar Backup</InputLabel>
            <Select defaultValue="">
              {historico.filter(h => h.status === 'concluido').map(backup => (
                <MenuItem key={backup.id} value={backup.id}>
                  {backup.data} - {backup.tipo} ({backup.tamanho})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {backupAtivo && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" gutterBottom>
                Restaurando dados... {progresso}%
              </Typography>
              <LinearProgress variant="determinate" value={progresso} />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogRestore(false)}>Cancelar</Button>
          <Button 
            variant="contained" 
            color="warning" 
            startIcon={<Restore />}
            onClick={() => restaurarBackup('1')}
            disabled={backupAtivo}
          >
            {backupAtivo ? 'Restaurando...' : 'Confirmar Restauração'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* FAB para ações rápidas */}
      <Fab
        color="primary"
        aria-label="backup rápido"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: 'linear-gradient(45deg, #1976d2, #42a5f5)'
        }}
        onClick={() => executarBackup()}
        disabled={backupAtivo}
      >
        {backupAtivo ? <CircularProgress size={24} color="inherit" /> : <CloudSync />}
      </Fab>
    </Box>
  );
};

export default BackupAvancado;
