
const cache_name = 'currency_exchange-v1';
const cache_items = [
        './',
        './main.js',
        './main.css',
        './index.html',
        './image/sideImage.JPG'
      ]


self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cache_name)
      .then((cache) => cache.addAll(cache_items))
  )
});


self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(key => {
          if (key !== cache_name) {
            return caches.delete(key);
          }
        }),
      ),
    ),
  );
});


addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;     
          
        } else {
          return fetch(event.request)   
          
            .then(res => caches.open(cache_name)
            .then(cache => {
              cache.put(event.request.url, res.clone());   
            
              return res;  
            }))
            .catch(err => caches.open("Error")
            .then(cache => cache.match(cache_name)));
        }
      })
  );
});         



self.addEventListener('message', (event) => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});