



self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(exchangecurrency).then(function(cache) {
      return cache.addAll([
        '/',
        '/main.js',
        '/main.css',
        '/index.html',
        '/image/SideImage.JPG'
      ]);
    })
  );
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});