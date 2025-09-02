import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Switch,
  FormControlLabel,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Stack
} from '@mui/material';
import {
  Settings,
  ExpandMore,
  Save,
  Restore,
  Download,
  Upload,
  Security,
  Notifications,
  Palette,
  Language,
  Storage,
  NetworkCheck,
  Delete,
  Edit,
  Add
} from '@mui/icons-material';

interface ConfiguracoesGerais {
  tema: 'light' | 'dark' | 'auto';
  idioma: string;
  timezone: string;
  autoSave: boolean;
  notificacoes: boolean;
  sons: boolean;
  animacoes: boolean;
  performance: 'low' | 'medium' | 'high';
}

interface ConfiguracoesAPI {
  baseUrl: string;
  timeout: number;
  retryAttempts: number;
  cacheEnabled: boolean;
  debugMode: boolean;
}

interface ConfiguracoesSeguranca {
  sessaoTimeout: number;
  forcaPassword: 'low' | 'medium' | 'high';
  autenticacao2FA: boolean;
  logAuditoria: boolean;
}

const ConfiguracoesAvancadas: React.FC = () => {
  const [configGerais, setConfigGerais] = useState<ConfiguracoesGerais>({
    tema: 'light',
    idioma: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    autoSave: true,
    notificacoes: true,
    sons: true,
    animacoes: true,
    performance: 'high'
  });

  const [configAPI, setConfigAPI] = useState<ConfiguracoesAPI>({
    baseUrl: 'http://localhost:8000/api/v1',
    timeout: 30000,
    retryAttempts: 3,
    cacheEnabled: true,
    debugMode: false
  });

  const [configSeguranca, setConfigSeguranca] = useState<ConfiguracoesSeguranca>({
    sessaoTimeout: 3600,
    forcaPassword: 'medium',
    autenticacao2FA: false,
    logAuditoria: true
  });

  const [dialogExport, setDialogExport] = useState(false);
  const [dialogImport, setDialogImport] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    // Carregar configurações do localStorage
    const savedConfig = localStorage.getItem('configuracoes-sistema');
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        setConfigGerais(prev => ({ ...prev, ...parsed.gerais }));
        setConfigAPI(prev => ({ ...prev, ...parsed.api }));
        setConfigSeguranca(prev => ({ ...prev, ...parsed.seguranca }));
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);
      }
    }
  }, []);

  const salvarConfiguracoes = () => {
    const configuracoes = {
      gerais: configGerais,
      api: configAPI,
      seguranca: configSeguranca,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem('configuracoes-sistema', JSON.stringify(configuracoes));
    setAlertMessage('Configurações salvas com sucesso!');
    setTimeout(() => setAlertMessage(''), 3000);
  };

  const restaurarPadrao = () => {
    setConfigGerais({
      tema: 'light',
      idioma: 'pt-BR',
      timezone: 'America/Sao_Paulo',
      autoSave: true,
      notificacoes: true,
      sons: true,
      animacoes: true,
      performance: 'high'
    });

    setConfigAPI({
      baseUrl: 'http://localhost:8000/api/v1',
      timeout: 30000,
      retryAttempts: 3,
      cacheEnabled: true,
      debugMode: false
    });

    setConfigSeguranca({
      sessaoTimeout: 3600,
      forcaPassword: 'medium',
      autenticacao2FA: false,
      logAuditoria: true
    });

    setAlertMessage('Configurações restauradas para o padrão!');
    setTimeout(() => setAlertMessage(''), 3000);
  };

  const exportarConfiguracoes = () => {
    const configuracoes = {
      gerais: configGerais,
      api: configAPI,
      seguranca: configSeguranca,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };

    const blob = new Blob([JSON.stringify(configuracoes, null, 2)], {
      type: 'application/json'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `configuracoes-datasciencepro-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDialogExport(false);
    setAlertMessage('Configurações exportadas com sucesso!');
    setTimeout(() => setAlertMessage(''), 3000);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        <Settings sx={{ mr: 2 }} />
        Configurações Avançadas
      </Typography>

      {alertMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {alertMessage}
        </Alert>
      )}

      {/* Ações Principais */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Ações Rápidas
          </Typography>
          
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={salvarConfiguracoes}
            >
              Salvar Configurações
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<Restore />}
              onClick={restaurarPadrao}
            >
              Restaurar Padrão
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={() => setDialogExport(true)}
            >
              Exportar
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<Upload />}
              onClick={() => setDialogImport(true)}
            >
              Importar
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Configurações Gerais */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">
            <Palette sx={{ mr: 1 }} />
            Configurações Gerais
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Tema</InputLabel>
                <Select
                  value={configGerais.tema}
                  onChange={(e) => setConfigGerais(prev => ({ 
                    ...prev, 
                    tema: e.target.value as 'light' | 'dark' | 'auto' 
                  }))}
                >
                  <MenuItem value="light">Claro</MenuItem>
                  <MenuItem value="dark">Escuro</MenuItem>
                  <MenuItem value="auto">Automático</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Idioma</InputLabel>
                <Select
                  value={configGerais.idioma}
                  onChange={(e) => setConfigGerais(prev => ({ ...prev, idioma: e.target.value }))}
                >
                  <MenuItem value="pt-BR">Português (Brasil)</MenuItem>
                  <MenuItem value="en-US">English (US)</MenuItem>
                  <MenuItem value="es-ES">Español</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Performance</InputLabel>
                <Select
                  value={configGerais.performance}
                  onChange={(e) => setConfigGerais(prev => ({ 
                    ...prev, 
                    performance: e.target.value as 'low' | 'medium' | 'high' 
                  }))}
                >
                  <MenuItem value="low">Baixa (Economizar recursos)</MenuItem>
                  <MenuItem value="medium">Média (Balanceada)</MenuItem>
                  <MenuItem value="high">Alta (Máxima velocidade)</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Stack spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={configGerais.autoSave}
                      onChange={(e) => setConfigGerais(prev => ({ 
                        ...prev, 
                        autoSave: e.target.checked 
                      }))}
                    />
                  }
                  label="Salvamento Automático"
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={configGerais.notificacoes}
                      onChange={(e) => setConfigGerais(prev => ({ 
                        ...prev, 
                        notificacoes: e.target.checked 
                      }))}
                    />
                  }
                  label="Notificações do Sistema"
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={configGerais.sons}
                      onChange={(e) => setConfigGerais(prev => ({ 
                        ...prev, 
                        sons: e.target.checked 
                      }))}
                    />
                  }
                  label="Sons de Notificação"
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={configGerais.animacoes}
                      onChange={(e) => setConfigGerais(prev => ({ 
                        ...prev, 
                        animacoes: e.target.checked 
                      }))}
                    />
                  }
                  label="Animações da Interface"
                />
              </Stack>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Configurações de API */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">
            <NetworkCheck sx={{ mr: 1 }} />
            Configurações de API
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="URL Base da API"
                value={configAPI.baseUrl}
                onChange={(e) => setConfigAPI(prev => ({ ...prev, baseUrl: e.target.value }))}
                helperText="URL do servidor backend"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Timeout (ms)"
                value={configAPI.timeout}
                onChange={(e) => setConfigAPI(prev => ({ 
                  ...prev, 
                  timeout: parseInt(e.target.value) 
                }))}
                helperText="Tempo limite para requisições"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Tentativas de Retry"
                value={configAPI.retryAttempts}
                onChange={(e) => setConfigAPI(prev => ({ 
                  ...prev, 
                  retryAttempts: parseInt(e.target.value) 
                }))}
                helperText="Número de tentativas em caso de erro"
              />
            </Grid>

            <Grid item xs={12}>
              <Stack spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={configAPI.cacheEnabled}
                      onChange={(e) => setConfigAPI(prev => ({ 
                        ...prev, 
                        cacheEnabled: e.target.checked 
                      }))}
                    />
                  }
                  label="Cache Habilitado"
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={configAPI.debugMode}
                      onChange={(e) => setConfigAPI(prev => ({ 
                        ...prev, 
                        debugMode: e.target.checked 
                      }))}
                    />
                  }
                  label="Modo Debug (Logs detalhados)"
                />
              </Stack>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Configurações de Segurança */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">
            <Security sx={{ mr: 1 }} />
            Configurações de Segurança
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Timeout da Sessão (segundos)"
                value={configSeguranca.sessaoTimeout}
                onChange={(e) => setConfigSeguranca(prev => ({ 
                  ...prev, 
                  sessaoTimeout: parseInt(e.target.value) 
                }))}
                helperText="Tempo para logout automático"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Força da Senha</InputLabel>
                <Select
                  value={configSeguranca.forcaPassword}
                  onChange={(e) => setConfigSeguranca(prev => ({ 
                    ...prev, 
                    forcaPassword: e.target.value as 'low' | 'medium' | 'high' 
                  }))}
                >
                  <MenuItem value="low">Baixa (Mínimo 6 caracteres)</MenuItem>
                  <MenuItem value="medium">Média (8 caracteres + números)</MenuItem>
                  <MenuItem value="high">Alta (12 caracteres + símbolos)</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Stack spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={configSeguranca.autenticacao2FA}
                      onChange={(e) => setConfigSeguranca(prev => ({ 
                        ...prev, 
                        autenticacao2FA: e.target.checked 
                      }))}
                    />
                  }
                  label="Autenticação de Dois Fatores (2FA)"
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={configSeguranca.logAuditoria}
                      onChange={(e) => setConfigSeguranca(prev => ({ 
                        ...prev, 
                        logAuditoria: e.target.checked 
                      }))}
                    />
                  }
                  label="Log de Auditoria"
                />
              </Stack>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Dialog de Exportação */}
      <Dialog open={dialogExport} onClose={() => setDialogExport(false)}>
        <DialogTitle>Exportar Configurações</DialogTitle>
        <DialogContent>
          <Typography>
            Isso irá baixar um arquivo JSON com todas as suas configurações atuais.
            Você pode usar este arquivo para restaurar as configurações em outro dispositivo.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogExport(false)}>Cancelar</Button>
          <Button onClick={exportarConfiguracoes} variant="contained">
            Exportar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de Importação */}
      <Dialog open={dialogImport} onClose={() => setDialogImport(false)}>
        <DialogTitle>Importar Configurações</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Selecione um arquivo JSON de configurações para importar.
          </Typography>
          <input
            type="file"
            accept=".json"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  try {
                    const config = JSON.parse(event.target?.result as string);
                    setConfigGerais(prev => ({ ...prev, ...config.gerais }));
                    setConfigAPI(prev => ({ ...prev, ...config.api }));
                    setConfigSeguranca(prev => ({ ...prev, ...config.seguranca }));
                    setDialogImport(false);
                    setAlertMessage('Configurações importadas com sucesso!');
                    setTimeout(() => setAlertMessage(''), 3000);
                  } catch (error) {
                    alert('Erro ao importar configurações. Verifique o arquivo.');
                  }
                };
                reader.readAsText(file);
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogImport(false)}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ConfiguracoesAvancadas;
