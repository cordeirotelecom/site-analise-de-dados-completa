import React, { useState } from 'react';
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
  Avatar,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  FormControlLabel,
  Divider
} from '@mui/material';
import {
  Login,
  PersonAdd,
  Dashboard,
  Analytics,
  Shield,
  Person,
  Email,
  VpnKey,
  AdminPanelSettings,
  Groups
} from '@mui/icons-material';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  tipo: 'admin' | 'cientista' | 'analista' | 'viewer';
  projetos: number;
  analises: number;
  ativo: boolean;
}

const AutenticacaoCompleta: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [formLogin, setFormLogin] = useState({
    email: '',
    senha: ''
  });
  const [alerta, setAlerta] = useState<{ tipo: 'success' | 'error'; mensagem: string } | null>(null);

  // Dados simulados de usuários
  const usuarios: Usuario[] = [
    {
      id: '1',
      nome: 'Dr. João Silva',
      email: 'admin@datascience.com',
      tipo: 'admin',
      projetos: 15,
      analises: 45,
      ativo: true
    },
    {
      id: '2',
      nome: 'Ana Santos',
      email: 'ana@datascience.com',
      tipo: 'cientista',
      projetos: 8,
      analises: 23,
      ativo: true
    },
    {
      id: '3',
      nome: 'Carlos Oliveira',
      email: 'carlos@datascience.com',
      tipo: 'analista',
      projetos: 3,
      analises: 12,
      ativo: false
    }
  ];

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const usuarioEncontrado = usuarios.find(u => 
        u.email.toLowerCase() === formLogin.email.toLowerCase()
      );
      
      if (usuarioEncontrado) {
        setUsuario(usuarioEncontrado);
        setAlerta({ tipo: 'success', mensagem: 'Login realizado com sucesso!' });
      } else {
        setAlerta({ tipo: 'error', mensagem: 'Usuário não encontrado.' });
      }
      setLoading(false);
    }, 1000);
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
      analista: <Dashboard />,
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
                {usuario.nome.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h5">
                  Bem-vindo, {usuario.nome}!
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {usuario.email} • {usuario.tipo}
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
                    <Typography variant="h4">{usuario.projetos}</Typography>
                    <Typography variant="body2">Projetos Ativos</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Analytics sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
                    <Typography variant="h4">{usuario.analises}</Typography>
                    <Typography variant="body2">Análises Realizadas</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Shield sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                    <Typography variant="h4">{usuario.tipo === 'admin' ? '4' : '2'}</Typography>
                    <Typography variant="body2">Permissões</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {usuario.tipo === 'admin' && (
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                <Groups sx={{ mr: 1, verticalAlign: 'middle' }} />
                Gerenciamento de Usuários
              </Typography>
              <List>
                {usuarios.map((user, index) => (
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
                              {user.projetos} projetos • {user.analises} análises
                            </Typography>
                          </Box>
                        }
                      />
                      <FormControlLabel
                        control={<Switch checked={user.ativo} />}
                        label="Ativo"
                      />
                    </ListItem>
                    {index < usuarios.length - 1 && <Divider />}
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
      {alerta && (
        <Alert
          severity={alerta.tipo}
          sx={{ mb: 2 }}
          onClose={() => setAlerta(null)}
        >
          {alerta.mensagem}
        </Alert>
      )}

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
                placeholder="admin@datascience.com"
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
                placeholder="Digite qualquer senha"
                InputProps={{
                  startAdornment: <VpnKey sx={{ mr: 1, color: 'text.secondary' }} />
                }}
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
              
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <strong>Demo:</strong> Use qualquer email da lista de usuários acima e qualquer senha.
                </Typography>
              </Alert>
            </Box>
          )}

          {tab === 1 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Criar Nova Conta
              </Typography>
              <TextField
                fullWidth
                label="Nome Completo"
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Senha"
                type="password"
                margin="normal"
                required
              />
              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3 }}
                startIcon={<PersonAdd />}
              >
                Criar Conta
              </Button>
            </Box>
          )}

          <Typography variant="body2" sx={{ mt: 3, textAlign: 'center', color: 'text.secondary' }}>
            Usuários disponíveis para teste:
            <br />
            • admin@datascience.com (Admin)
            <br />
            • ana@datascience.com (Cientista)
            <br />
            • carlos@datascience.com (Analista)
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AutenticacaoCompleta;
