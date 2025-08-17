// Service Worker for SOLO by Legalight
// Provides caching, offline functionality, and performance improvements

const CACHE_NAME = 'solo-legalight-v1.0.0';
const STATIC_CACHE_NAME = 'solo-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'solo-dynamic-v1.0.0';

// Assets to cache immediately (critical resources)
const STATIC_ASSETS = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
  '/manifest.json',
  // Add critical assets here
];

// Assets to cache on demand
const DYNAMIC_CACHE_PATTERNS = [
  /^https:\/\/solo-legalight-backend-production\.up\.railway\.app\/api\//,
  /^https:\/\/fonts\.googleapis\.com\//,
  /^https:\/\/fonts\.gstatic\.com\//,
];

// Assets to never cache
const NEVER_CACHE_PATTERNS = [
  /\/api\/auth\//,
  /\/api\/.*\?.*sensitive.*/, // Sensitive API calls
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Static assets cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Failed to cache static assets', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME &&
                cacheName !== CACHE_NAME) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Old caches cleaned');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip if marked as never cache
  if (NEVER_CACHE_PATTERNS.some(pattern => pattern.test(request.url))) {
    return;
  }

  // Handle different types of requests
  if (url.origin === location.origin) {
    // Same-origin requests - cache first, then network
    event.respondWith(cacheFirst(request));
  } else if (DYNAMIC_CACHE_PATTERNS.some(pattern => pattern.test(request.url))) {
    // External APIs - network first, then cache
    event.respondWith(networkFirst(request));
  } else {
    // Other external resources - stale while revalidate
    event.respondWith(staleWhileRevalidate(request));
  }
});

// Cache first strategy (for static assets)
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Cache first strategy failed:', error);
    
    // Return offline fallback if available
    const offlineFallback = await caches.match('/offline.html');
    return offlineFallback || new Response('Offline', { status: 503 });
  }
}

// Network first strategy (for API calls)
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache:', error);
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return error response for failed API calls
    return new Response(JSON.stringify({ 
      error: 'Network unavailable', 
      offline: true 
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Stale while revalidate strategy (for fonts, images)
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => cachedResponse);

  return cachedResponse || fetchPromise;
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  console.log('Service Worker: Background sync triggered');
  // Implement background sync logic here
  // e.g., sync offline form submissions, analytics, etc.
}

// Push notifications (if needed in future)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New notification from SOLO',
    icon: '/favicon/icon-192x192.png',
    badge: '/favicon/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Open App',
        icon: '/favicon/icon-192x192.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/favicon/icon-192x192.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('SOLO by Legalight', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Performance monitoring
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'PERFORMANCE_REPORT') {
    console.log('Performance metrics received:', event.data.metrics);
    // Could send to analytics service here
  }
});