import { useState, useCallback, useEffect } from 'react';
import { useCache } from '../utils/cache';
import { useLoadingState } from './useLoadingState';

interface UseApiOptions {
  cacheKey?: string;
  cacheTTL?: number;
  autoFetch?: boolean;
  dependencies?: any[];
}

interface UseApiReturn<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  fetch: () => Promise<void>;
  refetch: () => Promise<void>;
  reset: () => void;
}

export const useApi = <T>(
  apiFunction: () => Promise<T>,
  options: UseApiOptions = {}
): UseApiReturn<T> => {
  const {
    cacheKey,
    cacheTTL,
    autoFetch = false,
    dependencies = []
  } = options;

  const [data, setData] = useState<T | null>(null);
  const { isLoading, error, withLoading, reset: resetLoading } = useLoadingState();
  const cache = useCache();

  const fetchData = useCallback(async (useCache = true) => {
    // Verifica cache primeiro se habilitado
    if (useCache && cacheKey && cache.has(cacheKey)) {
      const cachedData = cache.get(cacheKey) as T;
      if (cachedData) {
        setData(cachedData);
        return;
      }
    }

    const result = await withLoading(async () => {
      const response = await apiFunction();
      
      // Salva no cache se especificado
      if (cacheKey) {
        cache.set(cacheKey, response, cacheTTL);
      }
      
      return response;
    });

    if (result !== null) {
      setData(result);
    }
  }, [apiFunction, cacheKey, cacheTTL, cache, withLoading]);

  const refetch = useCallback(async () => {
    // Remove do cache antes de refazer a requisição
    if (cacheKey) {
      cache.delete(cacheKey);
    }
    await fetchData(false);
  }, [fetchData, cacheKey, cache]);

  const reset = useCallback(() => {
    setData(null);
    resetLoading();
    if (cacheKey) {
      cache.delete(cacheKey);
    }
  }, [resetLoading, cacheKey, cache]);

  // Auto fetch no mount ou quando dependências mudarem
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch, fetchData, ...dependencies]);

  return {
    data,
    isLoading,
    error,
    fetch: fetchData,
    refetch,
    reset
  };
};

export default useApi;
