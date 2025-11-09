// BIS Standards Club - Service Worker
// Version 1.0.0 - Optimized for performance and offline support

const CACHE_VERSION = 'bis-club-v1.0.0';
const CACHE_NAME = `bis-standards-club-${CACHE_VERSION}`;

// Assets to cache immediately
const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/page.html',
    '/index.css',
    '/index.js',
    '/data.js',
    '/pageRenderer.js',
    'https://standardsclubvitv.github.io/image-api/images/logo_club.png',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Assets to cache on first request
const CACHE_ON_REQUEST = [
    /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
    /\.(?:js|css)$/,
    /^https:\/\/images\.unsplash\.com\//,
    /^https:\/\/cdn\.jsdelivr\.net\//,
    /^https:\/\/cdnjs\.cloudflare\.com\//
];

// Install event - precache essential assets
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Precaching assets');
                return cache.addAll(PRECACHE_ASSETS.map(url => new Request(url, { cache: 'reload' })));
            })
            .then(() => {
                console.log('[Service Worker] Installation complete');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[Service Worker] Precache failed:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('[Service Worker] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('[Service Worker] Activation complete');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip chrome extension requests
    if (url.protocol === 'chrome-extension:') {
        return;
    }
    
    // Network-first strategy for HTML pages (always get fresh content)
    if (request.headers.get('accept').includes('text/html')) {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    // Clone and cache the response
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseClone);
                    });
                    return response;
                })
                .catch(() => {
                    // Fallback to cache if offline
                    return caches.match(request);
                })
        );
        return;
    }
    
    // Cache-first strategy for other assets
    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    // Return cached version and update in background
                    updateCache(request);
                    return cachedResponse;
                }
                
                // Not in cache, fetch from network
                return fetch(request)
                    .then((response) => {
                        // Don't cache if not successful
                        if (!response || response.status !== 200 || response.type === 'error') {
                            return response;
                        }
                        
                        // Check if should cache this request
                        const shouldCache = CACHE_ON_REQUEST.some((pattern) => {
                            if (pattern instanceof RegExp) {
                                return pattern.test(url.pathname) || pattern.test(url.href);
                            }
                            return url.href.includes(pattern);
                        });
                        
                        if (shouldCache) {
                            const responseClone = response.clone();
                            caches.open(CACHE_NAME).then((cache) => {
                                cache.put(request, responseClone);
                            });
                        }
                        
                        return response;
                    })
                    .catch((error) => {
                        console.error('[Service Worker] Fetch failed:', error);
                        
                        // Return offline page if available
                        if (request.headers.get('accept').includes('text/html')) {
                            return caches.match('/index.html');
                        }
                        
                        // Return cached version or placeholder
                        return caches.match(request);
                    });
            })
    );
});

// Update cache in background (stale-while-revalidate pattern)
function updateCache(request) {
    fetch(request)
        .then((response) => {
            if (response && response.status === 200) {
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(request, response);
                });
            }
        })
        .catch(() => {
            // Silently fail - we already have cached version
        });
}

// Handle messages from clients
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => caches.delete(cacheName))
                );
            })
        );
    }
});

// Background sync for offline actions (if supported)
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-data') {
        event.waitUntil(syncData());
    }
});

function syncData() {
    // Implement your background sync logic here
    return Promise.resolve();
}

// Push notification support (optional)
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'New update available!',
        icon: 'https://standardsclubvitv.github.io/image-api/images/logo_club.png',
        badge: 'https://standardsclubvitv.github.io/image-api/images/logo_club.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    
    event.waitUntil(
        self.registration.showNotification('BIS Standards Club', options)
    );
});

console.log('[Service Worker] Loaded successfully');
