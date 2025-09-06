interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

class SimpleCache {
  private cache: Map<string, CacheItem<any>> = new Map();
  private readonly defaultTTL = 5 * 60 * 1000; // 5 minutos

  set<T>(key: string, data: T, ttl?: number): void {
    const expiry = Date.now() + (ttl || this.defaultTTL);
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiry
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  has(key: string): boolean {
    const item = this.cache.get(key);
    
    if (!item) {
      return false;
    }

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }

  // Limpa itens expirados
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
      }
    }
  }

  // Gera chave para requisições
  generateKey(url: string, params?: Record<string, any>): string {
    if (!params) return url;
    
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}=${JSON.stringify(params[key])}`)
      .join('&');
    
    return `${url}?${sortedParams}`;
  }
}

// Instância global do cache
export const globalCache = new SimpleCache();

// Hook para usar cache com React
export const useCache = () => {
  return {
    get: globalCache.get.bind(globalCache),
    set: globalCache.set.bind(globalCache),
    has: globalCache.has.bind(globalCache),
    delete: globalCache.delete.bind(globalCache),
    clear: globalCache.clear.bind(globalCache),
    generateKey: globalCache.generateKey.bind(globalCache)
  };
};

export default SimpleCache;
