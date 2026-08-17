const CACHE = 'trading-pwa-v31';
const SHELL = ['./', './index.html', './manifest.json',
                 'https://cdn.jsdelivr.net/npm/chart.js@4.5.0/dist/chart.umd.js'];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL).catch(()=>{})));
    self.skipWaiting();
});
self.addEventListener('activate', e => {
    e.waitUntil(caches.keys().then(keys =>
          Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
    self.clients.claim();
});
self.addEventListener('fetch', e => {
    if (e.request.url.includes('googleapis.com')) return; // always fresh
                        e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
