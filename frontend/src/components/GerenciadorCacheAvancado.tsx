import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Alert,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Cached,
  Storage,
  CleaningServices,
  Settings,
  Info,
  CheckCircle,
  Warning,
  Error,
  Refresh,
  Download,
  Upload,
  Delete,
  Analytics
} from '@mui/icons-material';

interface CacheInfo {
  name: string;
  size: number;
  entries: number;
  lastUpdated: Date;
  type: 'static' | 'api' | 'runtime';
}

interface CacheStats {
  totalSize: number;
  totalEntries: number;
  hitRate: number;
  missRate: number;
  cleanupNeeded: boolean;
}

const GerenciadorCacheAvancado: React.FC = () => {
  const [cachesInfo, setCachesInfo] = useState<CacheInfo[]>([]);
  const [stats, setStats] = useState<CacheStats>({
    totalSize: 0,
    totalEntries: 0,
    hitRate: 85,
    missRate: 15,
    cleanupNeeded: false
  });
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [autoCleanup, setAutoCleanup] = useState(true);
  const [cacheEnabled, setCacheEnabled] = useState(true);

  useEffect(() => {
    loadCacheInfo();
    startCacheMonitoring();
  }, []);

  const loadCacheInfo = async () => {
    setLoading(true);
    try {
      if ('caches' in window) {
        const cacheNames = await window.caches.keys();
        const cacheInfoPromises = cacheNames.map(async (name) => {
          const cache = await window.caches.open(name);
          const keys = await cache.keys();
          
          // Estimar tamanho do cache
          let totalSize = 0;
          for (const request of keys.slice(0, 5)) { // Amostra para performance
            try {
              const response = await cache.match(request);
              if (response) {
                const blob = await response.clone().blob();
                totalSize += blob.size;
              }
            } catch (error) {
              console.warn('Erro ao calcular tamanho do cache:', error);
            }
          }

          const type = name.includes('api') ? 'api' : 
                      name.includes('runtime') ? 'runtime' : 'static';

          return {
            name,
            size: totalSize * (keys.length / Math.min(keys.length, 5)), // Extrapolação
            entries: keys.length,
            lastUpdated: new Date(),
            type
          } as CacheInfo;
        });

        const cacheInfos = await Promise.all(cacheInfoPromises);
        setCachesInfo(cacheInfos);

        // Calcular estatísticas
        const totalSize = cacheInfos.reduce((sum, cache) => sum + cache.size, 0);
        const totalEntries = cacheInfos.reduce((sum, cache) => sum + cache.entries, 0);
        
        setStats(prev => ({
          ...prev,
          totalSize,
          totalEntries,
          cleanupNeeded: totalSize > 50 * 1024 * 1024 // 50MB
        }));
      }
    } catch (error) {
      console.error('Erro ao carregar informações do cache:', error);
    } finally {
      setLoading(false);
    }
  };

  const startCacheMonitoring = () => {
    // Monitorar hit/miss rate simulado
    const interval = setInterval(() => {
      const hitRate = Math.random() * 20 + 75; // 75-95%
      setStats(prev => ({
        ...prev,
        hitRate: Math.round(hitRate),
        missRate: Math.round(100 - hitRate)
      }));
    }, 10000);

    return () => clearInterval(interval);
  };

  const clearCache = async (cacheName?: string) => {
    setLoading(true);
    try {
      if (cacheName) {
        await window.caches.delete(cacheName);
      } else {
        const cacheNames = await window.caches.keys();
        await Promise.all(cacheNames.map(name => window.caches.delete(name)));
      }
      await loadCacheInfo();
    } catch (error) {
      console.error('Erro ao limpar cache:', error);
    } finally {
      setLoading(false);
    }
  };

  const optimizeCache = async () => {
    setLoading(true);
    try {
      // Remover entradas antigas (mais de 7 dias)
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 7);

      for (const cacheInfo of cachesInfo) {
        const cache = await window.caches.open(cacheInfo.name);
        const keys = await cache.keys();
        
        for (const request of keys) {
          const response = await cache.match(request);
          if (response) {
            const dateHeader = response.headers.get('date');
            if (dateHeader) {
              const responseDate = new Date(dateHeader);
              if (responseDate < cutoffDate) {
                await cache.delete(request);
              }
            }
          }
        }
      }

      await loadCacheInfo();
    } catch (error) {
      console.error('Erro ao otimizar cache:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportCacheData = () => {
    const data = {
      caches: cachesInfo,
      stats,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cache-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCacheTypeColor = (type: CacheInfo['type']) => {
    switch (type) {
      case 'static': return 'primary';
      case 'api': return 'secondary';
      case 'runtime': return 'success';
      default: return 'default';
    }
  };

  const getCacheTypeIcon = (type: CacheInfo['type']) => {
    switch (type) {
      case 'static': return <Storage />;
      case 'api': return <Analytics />;
      case 'runtime': return <Refresh />;
      default: return <Cached />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          🗄️ Gerenciador de Cache Avançado
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Exportar Relatório">
            <IconButton onClick={exportCacheData} color="primary">
              <Download />
            </IconButton>
          </Tooltip>
          <Tooltip title="Otimizar Cache">
            <IconButton onClick={optimizeCache} color="success" disabled={loading}>
              <CleaningServices />
            </IconButton>
          </Tooltip>
          <Tooltip title="Atualizar">
            <IconButton onClick={loadCacheInfo} disabled={loading}>
              <Refresh />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Estatísticas Gerais */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <Storage sx={{ mr: 1, verticalAlign: 'middle' }} />
                Tamanho Total
              </Typography>
              <Typography variant="h4" color="primary">
                {formatBytes(stats.totalSize)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stats.totalEntries} entradas
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <CheckCircle sx={{ mr: 1, verticalAlign: 'middle' }} />
                Taxa de Acerto
              </Typography>
              <Typography variant="h4" color="success.main">
                {stats.hitRate}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={stats.hitRate}
                color="success"
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <Error sx={{ mr: 1, verticalAlign: 'middle' }} />
                Taxa de Falha
              </Typography>
              <Typography variant="h4" color="error.main">
                {stats.missRate}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={stats.missRate}
                color="error"
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <Settings sx={{ mr: 1, verticalAlign: 'middle' }} />
                Status
              </Typography>
              <Chip
                icon={stats.cleanupNeeded ? <Warning /> : <CheckCircle />}
                label={stats.cleanupNeeded ? 'Limpeza Necessária' : 'Otimizado'}
                color={stats.cleanupNeeded ? 'warning' : 'success'}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {cachesInfo.length} caches ativos
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Alertas */}
      {stats.cleanupNeeded && (
        <Alert severity="warning" sx={{ mb: 3 }} action={
          <Button color="inherit" size="small" onClick={optimizeCache}>
            Otimizar Agora
          </Button>
        }>
          O cache está ocupando mais de 50MB. Recomenda-se uma limpeza para melhorar a performance.
        </Alert>
      )}

      {/* Configurações */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            ⚙️ Configurações de Cache
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={cacheEnabled}
                    onChange={(e) => setCacheEnabled(e.target.checked)}
                  />
                }
                label="Cache Habilitado"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={autoCleanup}
                    onChange={(e) => setAutoCleanup(e.target.checked)}
                  />
                }
                label="Limpeza Automática"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Lista de Caches */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              📋 Caches Detalhados
            </Typography>
            <Button
              variant="outlined"
              color="error"
              startIcon={<Delete />}
              onClick={() => setDialogOpen(true)}
              disabled={loading}
            >
              Limpar Todos
            </Button>
          </Box>

          {loading ? (
            <Box sx={{ py: 3 }}>
              <LinearProgress />
              <Typography textAlign="center" sx={{ mt: 2 }}>
                Carregando informações do cache...
              </Typography>
            </Box>
          ) : (
            <List>
              {cachesInfo.map((cache, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <Button
                      size="small"
                      color="error"
                      onClick={() => clearCache(cache.name)}
                    >
                      Limpar
                    </Button>
                  }
                >
                  <ListItemIcon>
                    {getCacheTypeIcon(cache.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle1">
                          {cache.name}
                        </Typography>
                        <Chip
                          size="small"
                          label={cache.type}
                          color={getCacheTypeColor(cache.type)}
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2">
                          Tamanho: {formatBytes(cache.size)} • 
                          Entradas: {cache.entries} • 
                          Atualizado: {cache.lastUpdated.toLocaleTimeString()}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
              {cachesInfo.length === 0 && (
                <ListItem>
                  <ListItemText
                    primary="Nenhum cache encontrado"
                    secondary="O cache será criado automaticamente conforme você usar a aplicação"
                  />
                </ListItem>
              )}
            </List>
          )}
        </CardContent>
      </Card>

      {/* Dialog de Confirmação */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirmar Limpeza</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza de que deseja limpar todos os caches? 
            Isso pode afetar temporariamente a performance da aplicação.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
          <Button
            onClick={() => {
              clearCache();
              setDialogOpen(false);
            }}
            color="error"
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GerenciadorCacheAvancado;
