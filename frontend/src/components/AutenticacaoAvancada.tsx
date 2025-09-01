import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Tab,
  Tabs,
  Alert,
  LinearProgress,
  Avatar,
  Chip,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Login,
  PersonAdd,
  Security,
  Dashboard,
  Analytics,
  Settings,
  History,
  Key,
  Shield,
  Person,
  Email,
  VpnKey,
  AdminPanelSettings,
  Groups,
  Timeline
} from '@mui/icons-material';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  tipo: 'admin' | 'cientista' | 'analista' | 'viewer';
  ultimoAcesso: Date;
  projetos: number;
  analises: number;
  ativo: boolean;
}

interface SessaoUsuario {
  token: string;
  usuario: Usuario;
  permissoes: string[];
  configuracoes: any;
}

const AutenticacaoAvancada: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [usuario, setUsuario] = useState<SessaoUsuario | null>(null);
  const [formLogin, setFormLogin] = useState({
    email: '',
    senha: '',
    lembrar: false
  });
  const [formRegistro, setFormRegistro] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmaSenha: '',
    tipo: 'analista' as const
  });
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [alertas, setAlertas] = useState<{ tipo: 'success' | 'error' | 'warning'; mensagem: string }[]>([]);

  // Simulação de dados de usuários
  useEffect(() => {
    const usuariosDemo: Usuario[] = [
      {
        id: '1',
        nome: 'Dr. João Silva',
        email: 'joao@datascience.com',
        tipo: 'admin',
        ultimoAcesso: new Date(),
        projetos: 15,
        analises: 45,
        ativo: true
      },
      {
        id: '2',
        nome: 'Ana Santos',
        email: 'ana@datascience.com',
        tipo: 'cientista',
        ultimoAcesso: new Date(Date.now() - 24 * 60 * 60 * 1000),
        projetos: 8,
        analises: 23,
        ativo: true
      },
      {
        id: '3',
        nome: 'Carlos Oliveira',
        email: 'carlos@datascience.com',
        tipo: 'analista',
        ultimoAcesso: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        projetos: 3,
        analises: 12,
        ativo: false
      }
    ];
    setUsuarios(usuariosDemo);
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Simulação de autenticação
      setTimeout(() => {
        const usuarioAutenticado: SessaoUsuario = {
          token: 'jwt-token-exemplo',
          usuario: {
            id: '1',
            nome: 'Dr. João Silva',
            email: formLogin.email,
            tipo: 'admin',
            ultimoAcesso: new Date(),
            projetos: 15,
            analises: 45,
            ativo: true
          },
          permissoes: ['read', 'write', 'admin', 'manage_users'],
          configuracoes: {
            tema: 'dark',
            notificacoes: true,
            autoSave: true
          }
        };
        setUsuario(usuarioAutenticado);
        adicionarAlerta('success', 'Login realizado com sucesso!');
        setLoading(false);
      }, 1500);
    } catch (error) {
      adicionarAlerta('error', 'Erro ao fazer login. Verifique suas credenciais.');
      setLoading(false);
    }
  };

  const handleRegistro = async () => {
    setLoading(true);
    try {
      if (formRegistro.senha !== formRegistro.confirmaSenha) {
        adicionarAlerta('error', 'As senhas não coincidem');
        setLoading(false);
        return;
      }

      // Simulação de registro
      setTimeout(() => {
        const novoUsuario: Usuario = {
          id: Date.now().toString(),
          nome: formRegistro.nome,
          email: formRegistro.email,
          tipo: formRegistro.tipo,
          ultimoAcesso: new Date(),
          projetos: 0,
          analises: 0,
          ativo: true
        };
        setUsuarios(prev => [...prev, novoUsuario]);
        adicionarAlerta('success', 'Usuário registrado com sucesso!');
        setTab(0); // Voltar para login
        setLoading(false);
      }, 1500);
    } catch (error) {
      adicionarAlerta('error', 'Erro ao registrar usuário');
      setLoading(false);
    }
  };

  const adicionarAlerta = (tipo: 'success' | 'error' | 'warning', mensagem: string) => {
    const novoAlerta = { tipo, mensagem };
    setAlertas(prev => [...prev, novoAlerta]);
    setTimeout(() => {
      setAlertas(prev => prev.filter(a => a !== novoAlerta));
    }, 5000);
  };

  const getCorTipo = (tipo: string) => {
    const cores = {
      admin: 'error',
      cientista: 'primary',
      analista: 'secondary',
      viewer: 'default'
    } as const;
    return cores[tipo as keyof typeof cores] || 'default';
  };

  const getIconeTipo = (tipo: string) => {
    const icones = {
      admin: <AdminPanelSettings />,
      cientista: <Analytics />,
      analista: <Timeline />,
      viewer: <Person />
    };
    return icones[tipo as keyof typeof icones] || <Person />;
  };

  if (usuario) {
    return (
      <Box sx={{ p: 3 }}>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                {usuario.usuario.nome.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h5">
                  Bem-vindo, {usuario.usuario.nome}!
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {usuario.usuario.email} • {usuario.usuario.tipo}
                </Typography>
              </Box>
              <Box sx={{ ml: 'auto' }}>
                <Button
                  variant="outlined"
                  onClick={() => setUsuario(null)}
                  startIcon={<Login />}
                >
                  Sair
                </Button>
              </Box>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Dashboard sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h4">{usuario.usuario.projetos}</Typography>
                    <Typography variant="body2">Projetos Ativos</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Analytics sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
                    <Typography variant="h4">{usuario.usuario.analises}</Typography>
                    <Typography variant="body2">Análises Realizadas</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Shield sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                    <Typography variant="h4">{usuario.permissoes.length}</Typography>
                    <Typography variant="body2">Permissões</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              Permissões do Usuário
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {usuario.permissoes.map((permissao) => (
                <Chip
                  key={permissao}
                  label={permissao}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              ))}
            </Box>
          </CardContent>
        </Card>

        {usuario.usuario.tipo === 'admin' && (
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                <Groups sx={{ mr: 1, verticalAlign: 'middle' }} />
                Gerenciamento de Usuários
              </Typography>
              <List>
                {usuarios.map((user) => (
                  <React.Fragment key={user.id}>
                    <ListItem>
                      <ListItemIcon>
                        {getIconeTipo(user.tipo)}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {user.nome}
                            <Chip
                              label={user.tipo}
                              size="small"
                              color={getCorTipo(user.tipo)}
                            />
                            {!user.ativo && (
                              <Chip label="Inativo" size="small" color="default" />
                            )}
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2">
                              {user.email}
                            </Typography>
                            <Typography variant="caption">
                              Último acesso: {user.ultimoAcesso.toLocaleDateString()} •
                              {user.projetos} projetos • {user.analises} análises
                            </Typography>
                          </Box>
                        }
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={user.ativo}
                            onChange={(e) => {
                              setUsuarios(prev =>
                                prev.map(u =>
                                  u.id === user.id
                                    ? { ...u, ativo: e.target.checked }
                                    : u
                                )
                              );
                            }}
                          />
                        }
                        label="Ativo"
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', p: 3 }}>
      {alertas.map((alerta, index) => (
        <Alert
          key={index}
          severity={alerta.tipo}
          sx={{ mb: 2 }}
          onClose={() => setAlertas(prev => prev.filter((_, i) => i !== index))}
        >
          {alerta.mensagem}
        </Alert>
      ))}

      <Card>
        <CardContent>
          <Typography variant="h4" align="center" sx={{ mb: 3 }}>
            <Analytics sx={{ mr: 1, verticalAlign: 'middle' }} />
            DataScience Pro
          </Typography>

          <Tabs
            value={tab}
            onChange={(_, newValue) => setTab(newValue)}
            variant="fullWidth"
            sx={{ mb: 3 }}
          >
            <Tab label="Login" icon={<Login />} />
            <Tab label="Registrar" icon={<PersonAdd />} />
          </Tabs>

          {loading && <LinearProgress sx={{ mb: 2 }} />}

          {tab === 0 && (
            <Box component="form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formLogin.email}
                onChange={(e) => setFormLogin(prev => ({ ...prev, email: e.target.value }))}
                margin="normal"
                required
                InputProps={{
                  startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
              <TextField
                fullWidth
                label="Senha"
                type="password"
                value={formLogin.senha}
                onChange={(e) => setFormLogin(prev => ({ ...prev, senha: e.target.value }))}
                margin="normal"
                required
                InputProps={{
                  startAdornment: <VpnKey sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formLogin.lembrar}
                    onChange={(e) => setFormLogin(prev => ({ ...prev, lembrar: e.target.checked }))}
                  />
                }
                label="Lembrar-me"
                sx={{ mt: 1 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ mt: 3 }}
                startIcon={<Login />}
              >
                {loading ? 'Autenticando...' : 'Entrar'}
              </Button>
            </Box>
          )}

          {tab === 1 && (
            <Box component="form" onSubmit={(e) => { e.preventDefault(); handleRegistro(); }}>
              <TextField
                fullWidth
                label="Nome Completo"
                value={formRegistro.nome}
                onChange={(e) => setFormRegistro(prev => ({ ...prev, nome: e.target.value }))}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formRegistro.email}
                onChange={(e) => setFormRegistro(prev => ({ ...prev, email: e.target.value }))}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Senha"
                type="password"
                value={formRegistro.senha}
                onChange={(e) => setFormRegistro(prev => ({ ...prev, senha: e.target.value }))}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Confirmar Senha"
                type="password"
                value={formRegistro.confirmaSenha}
                onChange={(e) => setFormRegistro(prev => ({ ...prev, confirmaSenha: e.target.value }))}
                margin="normal"
                required
              />
              <TextField
                select
                fullWidth
                label="Tipo de Usuário"
                value={formRegistro.tipo}
                onChange={(e) => setFormRegistro(prev => ({ ...prev, tipo: e.target.value as any }))}
                margin="normal"
                SelectProps={{ native: true }}
              >
                <option value="analista">Analista de Dados</option>
                <option value="cientista">Cientista de Dados</option>
                <option value="viewer">Visualizador</option>
              </TextField>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ mt: 3 }}
                startIcon={<PersonAdd />}
              >
                {loading ? 'Registrando...' : 'Criar Conta'}
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default AutenticacaoAvancada;
