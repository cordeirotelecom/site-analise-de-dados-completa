import React, { useState, createContext, useContext, ReactNode } from 'react';
import {
  Snackbar,
  Alert,
  AlertColor,
  IconButton,
  Box,
  Typography,
  LinearProgress,
} from '@mui/material';
import { Close } from '@mui/icons-material';

interface Notification {
  id: string;
  message: string;
  type: AlertColor;
  duration?: number;
  progress?: number;
  persistent?: boolean;
}

interface NotificationContextType {
  showNotification: (message: string, type: AlertColor, options?: {
    duration?: number;
    progress?: number;
    persistent?: boolean;
  }) => void;
  showProgress: (message: string, progress: number) => void;
  hideNotification: (id?: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification deve ser usado dentro de NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = (
    message: string, 
    type: AlertColor, 
    options: {
      duration?: number;
      progress?: number;
      persistent?: boolean;
    } = {}
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    const notification: Notification = {
      id,
      message,
      type,
      duration: options.duration ?? 6000,
      progress: options.progress,
      persistent: options.persistent ?? false,
    };

    setNotifications(prev => [...prev, notification]);

    if (!notification.persistent && notification.duration && notification.duration > 0) {
      setTimeout(() => {
        hideNotification(id);
      }, notification.duration);
    }
  };

  const showProgress = (message: string, progress: number) => {
    const existingProgressNotification = notifications.find(n => n.progress !== undefined);
    
    if (existingProgressNotification) {
      setNotifications(prev => 
        prev.map(n => 
          n.id === existingProgressNotification.id 
            ? { ...n, message, progress, type: 'info' as AlertColor }
            : n
        )
      );
    } else {
      showNotification(message, 'info', { persistent: true, progress });
    }
  };

  const hideNotification = (id?: string) => {
    if (id) {
      setNotifications(prev => prev.filter(n => n.id !== id));
    } else {
      setNotifications(prev => prev.slice(1));
    }
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{
      showNotification,
      showProgress,
      hideNotification,
      clearAll,
    }}>
      {children}
      
      {notifications.map((notification, index) => (
        <Snackbar
          key={notification.id}
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          style={{ top: 80 + (index * 70) }}
        >
          <Alert
            severity={notification.type}
            variant="filled"
            sx={{ 
              minWidth: 300,
              '& .MuiAlert-message': {
                width: '100%',
              }
            }}
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => hideNotification(notification.id)}
              >
                <Close fontSize="small" />
              </IconButton>
            }
          >
            <Box>
              <Typography variant="body2">
                {notification.message}
              </Typography>
              {typeof notification.progress === 'number' && (
                <Box sx={{ mt: 1 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={notification.progress} 
                    sx={{ 
                      backgroundColor: 'rgba(255,255,255,0.3)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: 'rgba(255,255,255,0.8)'
                      }
                    }}
                  />
                  <Typography variant="caption" sx={{ mt: 0.5, display: 'block' }}>
                    {Math.round(notification.progress)}% concluído
                  </Typography>
                </Box>
              )}
            </Box>
          </Alert>
        </Snackbar>
      ))}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
