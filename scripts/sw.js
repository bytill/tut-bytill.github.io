importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.3.0/workbox-sw.js');

if (workbox) {
  // Dateien bei der Installation precachen (offline verfügbar machen)
  workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '1.0.0'},
    { url: '/manifest.json', revision: '1.0.0'},
    { url: '/styles/main.css', revision: '1.0.0'},
    { url: '/scripts/app.js', revision: '1.0.0'},
    { url: '/scripts/sw.js', revision: '1.0.0'},
    { url: '/img/tut-icon_192.png', revision: '1' },
    { url: '/img/tut-icon_512.png', revision: '1' },
    { url: '/img/tut-icon_splsh.png', revision: '1' },
    { url: '/img/tut-bombe.png', revision: '1' },
    { url: '/img/tut-milli.png', revision: '1' },
  ]);

  // Alle Bilder mit Cache First Strategie
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Tage
        })
      ]
    })
  );

  // CSS/JS/HTML mit Network First (holt Updates, wenn online)
  workbox.routing.registerRoute(
    ({ request }) => ['document', 'script', 'style'].includes(request.destination),
    new workbox.strategies.NetworkFirst({
      cacheName: 'assets',
    })
  );
}