const CACHE = 'indagini-v3';
const FILES = [
  './index.html',
  './paris1800.html',
  './mosca1968.html',
  './the_document_v2.html',
  './privacy.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];
 
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES.filter(f => !f.includes('icon'))))
  );
  self.skipWaiting();
});
 
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});
 
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
