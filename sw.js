const CACHE_NAME = 'golden-crumb-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/menu.html',
  '/item-single.html',
  '/tailwindcss/style.css',
  '/tailwindcss/menu.css',
  '/js/menu.js',
  '/js/animate.js',
  '/fontawesome-free-5.15.4-web/css/all.min.css',
  '/fontawesome-free-5.15.4-web/js/all.js',
  // Add other assets and images you want to cache
];

// Install event - cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // Update cache with the latest response
        if(networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // If network fails, try to serve from cache
        return caches.match(event.request);
      })
  );
});
