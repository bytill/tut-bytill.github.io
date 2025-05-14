importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.3.0/workbox-sw.js');

if (workbox) {
  // Precaching assets
  workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '1.0.0' },
    { url: '/manifest.json', revision: '1.0.0' },
    { url: '/styles/main.css', revision: '1.0.0' },
    { url: '/scripts/app.js', revision: '1.0.0' },
    { url: '/scripts/sw.js', revision: '1.0.0' },
    { url: '/img/tut-icon_192.png', revision: '1' },
    { url: '/img/tut-icon_512.png', revision: '1' },
    { url: '/img/tut-icon_splsh.webp', revision: '1' },
    { url: '/img/tut-bombe.webp', revision: '1' },
    { url: '/img/tut-nhie.webp', revision: '1' },
    { url: '/img/tut-reflex.webp', revision: '1' },
    { url: '/img/tut-sagwas.webp', revision: '1' },
    { url: '/img/tut-schaetzmal.webp', revision: '1' },
    { url: '/img/tut-speed.webp', revision: '1' },
    { url: '/img/tut-timing.webp', revision: '1' },
    { url: '/img/tut-truefalse.webp', revision: '1' },
  ]);

  // Cache HTML files (NetworkFirst or CacheFirst)
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'document',
    new workbox.strategies.NetworkFirst({
      cacheName: 'html-pages',
    })
  );

  // Cache images with CacheFirst strategy
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        }),
      ],
    })
  );

  // Cache assets like CSS/JS with NetworkFirst strategy
  workbox.routing.registerRoute(
    ({ request }) => ['script', 'style'].includes(request.destination),
    new workbox.strategies.NetworkFirst({
      cacheName: 'assets',
    })
  );

  // Handling offline fallback
  self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
      event.respondWith(
        caches.match(event.request).then((response) => {
          return response || fetch(event.request);
        })
      );
    }
  });
}
