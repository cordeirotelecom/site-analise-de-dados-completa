import React from 'react';
import { Box, CircularProgress, Typography, Fade } from '@mui/material';
import { keyframes } from '@emotion/react';

const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

interface LoadingComponentProps {
  message?: string;
  size?: number;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  fullScreen?: boolean;
}

export const LoadingComponent: React.FC<LoadingComponentProps> = ({
  message = 'Carregando...',
  size = 40,
  color = 'primary',
  fullScreen = false
}) => {
  const containerStyle = fullScreen ? {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center'
  } : {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem'
  };

  return (
    <Fade in={true} timeout={300}>
      <Box sx={containerStyle}>
        <CircularProgress 
          size={size} 
          color={color}
          thickness={4}
          sx={{
            animation: `${pulse} 2s ease-in-out infinite`,
            marginBottom: 2
          }}
        />
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{
            fontWeight: 500,
            textAlign: 'center',
            animation: `${pulse} 2s ease-in-out infinite`
          }}
        >
          {message}
        </Typography>
      </Box>
    </Fade>
  );
};

export default LoadingComponent;