import React, { Component, ReactNode } from 'react';
import { Box, Typography, Button, Alert, Card, CardContent } from '@mui/material';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: any;
}

class ErrorBoundaryGlobal extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary capturou um erro:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box sx={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          p: 3,
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}>
          <Card sx={{ maxWidth: 600, width: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 4 }}>
              <Typography variant="h4" color="error" gutterBottom>
                🚨 Ops! Algo deu errado
              </Typography>
              
              <Alert severity="error" sx={{ mb: 3, textAlign: 'left' }}>
                <Typography variant="h6" gutterBottom>
                  Erro Detectado:
                </Typography>
                <Typography variant="body2" component="pre" sx={{ 
                  whiteSpace: 'pre-wrap',
                  fontSize: '0.875rem',
                  maxHeight: 200,
                  overflow: 'auto'
                }}>
                  {this.state.error?.message || 'Erro desconhecido'}
                </Typography>
              </Alert>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Não se preocupe! Isso pode acontecer. Tente uma das opções abaixo:
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button 
                  variant="contained" 
                  onClick={this.handleReset}
                  sx={{ minWidth: 120 }}
                >
                  🔄 Tentar Novamente
                </Button>
                
                <Button 
                  variant="outlined" 
                  onClick={this.handleReload}
                  sx={{ minWidth: 120 }}
                >
                  🔃 Recarregar Página
                </Button>
              </Box>

              {process.env.NODE_ENV === 'development' && (
                <Box sx={{ mt: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                  <Typography variant="caption" component="pre" sx={{ 
                    whiteSpace: 'pre-wrap',
                    fontSize: '0.75rem',
                    maxHeight: 150,
                    overflow: 'auto',
                    display: 'block'
                  }}>
                    {JSON.stringify(this.state.errorInfo, null, 2)}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundaryGlobal;
