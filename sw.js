const CACHE_NAME = 'ahmed-elmosalamy-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.webmanifest'
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