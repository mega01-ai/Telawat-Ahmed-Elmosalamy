const CACHE_NAME = 'ahmed-elmosalamy-cache-v4';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/index.tsx',
  'https://archive.org/download/t-401753960439209/__ia_thumb.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || event.request.url.startsWith('chrome-extension://')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // For navigation requests, use a network-first strategy
      if (event.request.mode === 'navigate') {
          const fetchRequest = fetch(event.request).then(networkResponse => {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then(cache => {
                  cache.put(event.request, responseToCache);
              });
              return networkResponse;
          }).catch(() => {
              return cachedResponse;
          });
          return fetchRequest;
      }

      // For all other requests, use a cache-first strategy
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then(networkResponse => {
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          if (event.request.url.startsWith('http')) {
            cache.put(event.request, responseToCache);
          }
        });
        return networkResponse;
      });
    })
  );
});

self.addEventListener('push', event => {
  // Fallback data if push is not sent with a payload from a server
  const data = event.data ? event.data.json() : {
      title: 'تلاوات احمد المسلمي',
      body: 'تم إضافة تلاوة جديدة! استمع الآن.',
      url: '/'
  };

  const options = {
    body: data.body,
    icon: 'https://archive.org/download/t-401753960439209/__ia_thumb.jpg',
    badge: 'https://archive.org/download/t-401753960439209/__ia_thumb.jpg', // For Android
    data: {
      url: data.url
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    const urlToOpen = event.notification.data.url || '/';
    
    event.waitUntil(
        clients.matchAll({
            type: 'window',
            includeUncontrolled: true
        }).then(windowClients => {
            // Check if a window is already open with the target URL
            for(let i = 0; i < windowClients.length; i++) {
                const client = windowClients[i];
                if (client.url === self.location.origin + urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }
            // If not, open a new window
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});


self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});