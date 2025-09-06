import { useState, useCallback } from 'react';

interface UseLoadingState {
  isLoading: boolean;
  error: string | null;
  startLoading: () => void;
  stopLoading: () => void;
  setError: (error: string | null) => void;
  withLoading: <T>(asyncFn: () => Promise<T>) => Promise<T | null>;
  reset: () => void;
}

export const useLoadingState = (initialLoading = false): UseLoadingState => {
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [error, setError] = useState<string | null>(null);

  const startLoading = useCallback(() => {
    setIsLoading(true);
    setError(null);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const setErrorState = useCallback((error: string | null) => {
    setError(error);
    setIsLoading(false);
  }, []);

  const withLoading = useCallback(async <T>(asyncFn: () => Promise<T>): Promise<T | null> => {
    try {
      startLoading();
      const result = await asyncFn();
      stopLoading();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setErrorState(errorMessage);
      console.error('Erro capturado em withLoading:', err);
      return null;
    }
  }, [startLoading, stopLoading, setErrorState]);

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    startLoading,
    stopLoading,
    setError: setErrorState,
    withLoading,
    reset
  };
};

export default useLoadingState;
