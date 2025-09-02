// Service Worker Avançado para DataScience Pro PWA
const CACHE_NAME = 'datasciencepro-v1.2.1';
const API_CACHE = 'datasciencepro-api-cache';
const RUNTIME_CACHE = 'datasciencepro-runtime';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
];

// URLs de API que devem ser cachadas
const API_URLS = [
  '/api/',
  'https://api.',
  'dados.gov.br',
  'transparencia.'
];

// Install - cache assets estáticos
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando Service Worker...');
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => {
        console.log('[SW] Cachando assets estáticos');
        return cache.addAll(STATIC_ASSETS.map(url => new Request(url, {cache: 'reload'})));
      }),
      caches.open(API_CACHE),
      caches.open(RUNTIME_CACHE)
    ]).then(() => {
      console.log('[SW] Service Worker instalado com sucesso');
      return self.skipWaiting();
    })
  );
});

// Activate - limpar caches antigos
self.addEventListener('activate', (event) => {
  console.log('[SW] Ativando Service Worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== API_CACHE && cacheName !== RUNTIME_CACHE) {
            console.log('[SW] Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Service Worker ativado');
      return self.clients.claim();
    })
  );
});

// Fetch - estratégia inteligente de cache
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Estratégia para assets estáticos
  if (STATIC_ASSETS.some(asset => url.pathname.includes(asset.replace('/', '')))) {
    event.respondWith(cacheFirst(request, CACHE_NAME));
    return;
  }

  // Estratégia para APIs - Network First com fallback
  if (API_URLS.some(apiUrl => url.href.includes(apiUrl))) {
    event.respondWith(networkFirstWithCache(request, API_CACHE));
    return;
  }

  // Estratégia para outros recursos - Stale While Revalidate
  event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE));
});

// Cache First Strategy
async function cacheFirst(request, cacheName) {
  try {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    
    if (cached) {
      return cached;
    }
    
    const fresh = await fetch(request);
    cache.put(request, fresh.clone());
    return fresh;
  } catch (error) {
    console.error('[SW] Cache First error:', error);
    return new Response('Offline', { status: 503 });
  }
}

// Network First Strategy
async function networkFirstWithCache(request, cacheName) {
  try {
    const fresh = await fetch(request);
    const cache = await caches.open(cacheName);
    
    // Cache apenas respostas válidas
    if (fresh.ok) {
      cache.put(request, fresh.clone());
    }
    
    return fresh;
  } catch (error) {
    console.log('[SW] Network failed, trying cache');
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    
    if (cached) {
      return cached;
    }
    
    return new Response(JSON.stringify({
      error: 'Dados não disponíveis offline',
      offline: true
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request, cacheName) {
  try {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    
    // Buscar recurso atualizado em background
    const fresh = fetch(request).then(response => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    }).catch(() => cached);
    
    // Retornar cache imediatamente se disponível
    return cached || fresh;
  } catch (error) {
    console.error('[SW] Stale While Revalidate error:', error);
    return fetch(request);
  }
}
