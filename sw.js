const CACHE_NAME = 'pipe-dia-cache-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './sw.js',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request).catch(() => caches.match('./index.html')))
  );
});
