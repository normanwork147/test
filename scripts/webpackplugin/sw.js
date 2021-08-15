const precacheList = <%- precacheList %>;

const precacheName = 'myapp-' + <%- version %>

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(precacheName)
      .then((cache) => {
        return cache.addAll(precacheList);
      })
      .then(function () {
        self.skipWaiting();
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();

      for (const cacheName of cacheNames) {
        if (cacheName !== precacheName && /^myapp\-\d+$/.test(cacheName)) {
          await caches.delete(cacheName);
        }
      }
    })()
  );
});

async function fetchFromNetwork(event) {
  const response = await fetch(event.request);
  if (response) {
    const cloneResponse = response.clone();
    event.waitUntil(
      (async () => {
        const cache = await caches.open(precacheName);
        await cache.put(event.request, cloneResponse);
        console.log(
          '[Service Worker] Caching new resource: ' + event.request.url
        );
      })()
    );
  }
  return response;
}

self.addEventListener('fetch', (event) => {
  // check if request is made by chrome extensions or web page
  // if request is made for web page url must contains http.
  if (!(event.request.url.indexOf('http') === 0)) return; // 跳过非http的请求

  if (event.request.method.toLowerCase() === 'get') {
    event.respondWith(
      (async () => {
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          // 如果存在，将会返回缓存的资源
          return cachedResponse;
        }
        // 如果不存在，会转而从网络中请求数据，然后将它缓存起来，这样下次有相同的请求发生时，我们就可以直接使用缓存

        return await fetchFromNetwork(event);
      })()
    );
  }
});
