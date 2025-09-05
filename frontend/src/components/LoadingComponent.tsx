import React from 'react';
import { Box, CircularProgress, Typography, Fade, LinearProgress } from '@mui/material';

interface LoadingComponentProps {
  message?: string;
  variant?: 'circular' | 'linear' | 'skeleton';
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({
  message = 'Carregando...',
  variant = 'circular',
  size = 'medium',
  fullScreen = false
}) => {
  const getSize = () => {
    switch (size) {
      case 'small': return 24;
      case 'large': return 60;
      default: return 40;
    }
  };

  const containerProps = fullScreen ? {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 9999
  } : {};

  const renderLoading = () => {
    switch (variant) {
      case 'linear':
        return (
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <LinearProgress sx={{ mb: 2 }} />
            <Typography variant="body2" color="text.secondary" align="center">
              {message}
            </Typography>
          </Box>
        );
      
      case 'skeleton':
        return (
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 1,
              mb: 2
            }}>
              {[...Array(3)].map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    height: 20,
                    backgroundColor: '#f0f0f0',
                    borderRadius: 1,
                    animation: 'pulse 1.5s ease-in-out infinite',
                    animationDelay: `${i * 0.2}s`,
                    '@keyframes pulse': {
                      '0%': { opacity: 1 },
                      '50%': { opacity: 0.4 },
                      '100%': { opacity: 1 }
                    }
                  }}
                />
              ))}
            </Box>
            <Typography variant="body2" color="text.secondary" align="center">
              {message}
            </Typography>
          </Box>
        );
      
      default:
        return (
          <>
            <CircularProgress 
              size={getSize()} 
              thickness={4}
              sx={{ 
                color: '#1976d2',
                mb: 2
              }}
            />
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ 
                fontWeight: 500,
                letterSpacing: 0.5
              }}
            >
              {message}
            </Typography>
          </>
        );
    }
  };

  return (
    <Fade in timeout={300}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: fullScreen ? '100vh' : 200,
          p: 3,
          ...containerProps
        }}
      >
        {renderLoading()}
      </Box>
    </Fade>
  );
};

export default LoadingComponent;
