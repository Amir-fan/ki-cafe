// ===== KI COFFEE SERVICE WORKER =====

const CACHE_NAME = 'ki-coffee-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/images/ki.png',
    '/images/latte-250616120601.jpg',
    '/images/cappuchino-250616120659.jpg',
    '/images/mocha-250616120314.jpg',
    '/images/americano-250616120722.jpg',
    '/images/flat-white.webp',
    '/images/turk-kahvesi-7bpc-cover-gphf_cover-250616120223.webp',
    '/images/caramel-latte-250616120528.jpg',
    '/images/hazelnut-latte.jpg',
    '/images/vanillia-latte.jpg',
    '/images/white-choclate-mocha.jpg',
    '/images/caramel-maccihato.jpg',
    '/images/affogato-250616124335.jpg',
    '/images/ice-latte.jpg',
    '/images/ice-vanillia-latte.jpg',
    '/images/ice-caremel-latte-250616124701.jpg',
    '/images/ice-americano.jpg',
    '/images/ice-mocha.jpg',
    '/images/ice-flat-white.jpg',
    '/images/ice-hazelnut-latte.jpg',
    '/images/ice-caramel-maccihato.jpg',
    '/images/ice-white-chocolate-mocha.jpg',
    '/images/frappe-caramel.jpg',
    '/images/frappe-choclate.webp',
    '/images/latte-matcha.jpg',
    '/images/latte-matcha-2.jpg',
    '/images/matcha-cayi.jpg',
    '/images/0e33ff6c-57e2-4677-89f3-9a557afca681-250801132922.jpg',
    '/images/dondurma-250616131000.jpg',
    '/images/dondurma-kulah.webp',
    '/images/oip-250730124406.webp',
    '/images/japanese-souffle-pancakes-696x392-250720131328.png',
    '/images/browni-bite.jpeg',
    '/images/102109045-mochi-photo-by-meredith-650x465-daf1a49a814b4648875d99897a181d9f-250730125833.jpg',
    '/images/red-velvet.jpg',
    '/images/kuma-250616152702.jpeg',
    '/images/kiki-250616152732.jpeg',
    '/images/smoothie-250616130017.jpg',
    '/images/limonata-250616130057.webp',
    '/images/mcdonalds-milkshake-02-250730131347.jpg'
];

// Install event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version or fetch from network
                return response || fetch(event.request);
            })
    );
});

// Activate event
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Background sync for offline functionality
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

function doBackgroundSync() {
    // Handle background sync tasks
    console.log('Background sync triggered');
    return Promise.resolve();
}

// Push notification handling
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'New update from KI Coffee!',
        icon: '/images/ki.png',
        badge: '/images/ki.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'View Menu',
                icon: '/images/ki.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/images/ki.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('KI Coffee', options)
    );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
}); 