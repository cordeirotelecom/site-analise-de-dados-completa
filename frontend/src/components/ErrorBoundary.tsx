import React, { Component, ReactNode } from 'react';
import { Box, Typography, Button, Container, Paper, Alert } from '@mui/material';
import { ErrorOutline, Refresh } from '@mui/icons-material';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: any;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary capturou um erro:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <Box sx={{ mb: 3 }}>
              <ErrorOutline sx={{ fontSize: 60, color: 'error.main' }} />
            </Box>
            
            <Typography variant="h4" gutterBottom color="error">
              Oops! Algo deu errado
            </Typography>
            
            <Typography variant="h6" gutterBottom color="text.secondary">
              Ocorreu um erro inesperado na aplicação
            </Typography>

            <Alert severity="error" sx={{ mt: 2, mb: 3, textAlign: 'left' }}>
              <Typography variant="body2">
                <strong>Erro:</strong> {this.state.error?.message || 'Erro desconhecido'}
              </Typography>
              {this.state.error?.stack && (
                <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                  {this.state.error.stack}
                </Typography>
              )}
            </Alert>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                startIcon={<Refresh />}
                onClick={this.handleReload}
                color="primary"
              >
                Recarregar Página
              </Button>
              
              <Button
                variant="outlined"
                onClick={this.handleReset}
                color="secondary"
              >
                Tentar Novamente
              </Button>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
              Se o problema persistir, entre em contato com o suporte.
            </Typography>
          </Paper>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
