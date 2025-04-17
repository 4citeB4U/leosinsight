// Leo's Insight Service Worker - Fully Static, No Build Required
const CACHE_NAME = 'leosinsight-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './05. bluudanc.mp3',
  './images/Leosavatr.png',
  './images/top3.png',
  './images/breaking_news.png',
  './images/fxeffect.png',
  './images/DALL·E 2025-03-22 17.45.58 - Create an epic, high-resolution background image divided into four distinct sections, styled in the iconic blocky and colorful art style of Roblox. __.webp',
  './images/aa8d321b-227b-477d-b192-374f826e7b9e.webp',
  './images/ced4e9b2-18ec-4f9a-8571-cf0bf9c86c58.webp',
  './images/0c6aafe0-0c9d-4036-9f1f-103127d41199.webp',
  './assets/favicon.ico',
  './assets/apple-touch-icon.png',
  './assets/og-thumbnail.jpg'
];

// Install event - cache essential files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Error during service worker install:', error);
      })
  );
});

// Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request because it's a one-time use stream
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then(response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response because it's a one-time use stream
            const responseToCache = response.clone();

            // Add the new response to cache for future use
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(error => {
            console.error('Fetch failed:', error);
            // You can return a custom offline page here
          });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // If this cache name isn't in the whitelist, delete it
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
