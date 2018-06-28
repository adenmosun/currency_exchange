
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


// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request) .then((response) => {
//         if (response) {
//           return response;
//         }
//         const fetchRequest = event.request.clone();

//         return fetch(fetchRequest).then( (response) => {
//             if (!response || response.status !== 200 || response.type !== 'basic') {
//               return response;
//             }
//             const responseToCache = response.clone();

//             // caches.open(CACHE_NAME)
//             //   .then((cache) => {
//             //     cache.put(event.request, responseToCache);
//             //   });
            
//             // return response;
//           }
//         )
//       })
//   )
// });
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
        return caches.open('cache_name').then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        });  
      });
    })
  );
});


self.addEventListener('message', (event) => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});