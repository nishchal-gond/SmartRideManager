// Service Worker for SmartRide Manager PWA
const CACHE_NAME = 'smartride-v1.0.0';
const RUNTIME_CACHE = 'smartride-runtime';

// Assets to cache on install
const PRECACHE_URLS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
];

// Install event - cache essential assets
self.addEventListener('install', (event) => {
    console.log('[ServiceWorker] Install event');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[ServiceWorker] Caching app shell');
                return cache.addAll(PRECACHE_URLS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Activate event');
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
                            console.log('[ServiceWorker] Removing old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip cross-origin requests
    if (url.origin !== location.origin) {
        return;
    }

    // API requests - Network first, cache fallback
    if (request.url.includes('/api/') || request.url.includes('firestore.googleapis.com')) {
        event.respondWith(
            fetch(request)
                .then(response => {
                    // Clone the response
                    const responseToCache = response.clone();

                    // Cache the API response
                    caches.open(RUNTIME_CACHE)
                        .then(cache => {
                            cache.put(request, responseToCache);
                        });

                    return response;
                })
                .catch(() => {
                    // If network fails, try cache
                    return caches.match(request);
                })
        );
        return;
    }

    // Static assets - Cache first, network fallback
    event.respondWith(
        caches.match(request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(request)
                    .then(response => {
                        // Don't cache non-successful responses
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        caches.open(RUNTIME_CACHE)
                            .then(cache => {
                                cache.put(request, responseToCache);
                            });

                        return response;
                    });
            })
    );
});

// Background Sync - for offline data submission
self.addEventListener('sync', (event) => {
    console.log('[ServiceWorker] Background sync:', event.tag);

    if (event.tag === 'sync-data') {
        event.waitUntil(
            // Implement your sync logic here
            syncData()
        );
    }
});

async function syncData() {
    // This would sync any pending data to Firebase
    // For now, just log that sync was triggered
    console.log('[ServiceWorker] Syncing data...');
    return Promise.resolve();
}

// Push notifications
self.addEventListener('push', (event) => {
    console.log('[ServiceWorker] Push received');

    const options = {
        body: event.data ? event.data.text() : 'New notification',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'View',
                icon: '/icons/checkmark.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/icons/close.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('SmartRide Manager', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    console.log('[ServiceWorker] Notification click');
    event.notification.close();

    event.waitUntil(
        clients.openWindow('/')
    );
});
