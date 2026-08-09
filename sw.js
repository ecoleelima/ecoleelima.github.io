/* ELIMA — sw.js : mise en cache basique pour un fonctionnement hors-ligne minimal */
const CACHE_NAME = 'elima-cache-v1';
const CORE_ASSETS = [
  './index.html',
  './style.css',
  './script.js',
  './i18n.js',
  './theme.js',
  './portal.js',
  './manifest.json',
  './images/logo.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(CORE_ASSETS);
    }).catch(function () { /* ignore missing assets on install */ })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE_NAME; }).map(function (k) { return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      const fetchPromise = fetch(event.request).then(function (networkResponse) {
        if (networkResponse && networkResponse.ok && event.request.url.startsWith(self.location.origin)) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then(function (cache) { cache.put(event.request, clone); });
        }
        return networkResponse;
      }).catch(function () { return cached; });
      return cached || fetchPromise;
    })
  );
});
