const CACHE_NAME = "ci-core-cache-v1";
const BASE_PATH = "/app-core/";
const urlsToCache = [
  `${BASE_PATH}`,
  `${BASE_PATH}index.html`,
  `${BASE_PATH}index.js`,
  `${BASE_PATH}manifest.json`,
  `${BASE_PATH}components/ci-footer.js`,
  `${BASE_PATH}components/ci-header.js`,
  `${BASE_PATH}styles/app.css`,
  `${BASE_PATH}styles/base.css`,
  `${BASE_PATH}styles/themes.css`,
  `${BASE_PATH}styles/tokens.css`,
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
