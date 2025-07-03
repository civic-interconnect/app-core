/**
 * app-core/docs/sw.js
 * Civic Interconnect App Core
 *
 * Service Worker to cache core assets for offline support
 * and faster load times across Civic Interconnect apps.
 */

const CACHE_NAME = "ci-core-cache-0.0.1";
const BASE_PATH = "/app-core/";

const urlsToCache = [
  `${BASE_PATH}`,
  `${BASE_PATH}favicon.ico`,
  `${BASE_PATH}index.html`,
  `${BASE_PATH}index.js`,
  `${BASE_PATH}manifest.json`,
  `${BASE_PATH}components/ci-footer/ci-footer.js`,
  `${BASE_PATH}components/ci-header/ci-header.js`,
  `${BASE_PATH}components/ci-theme-toggle/ci-theme-toggle.js`,
  `${BASE_PATH}components/ci-footer/ci-footer.html`,
  `${BASE_PATH}components/ci-footer/ci-footer.css`,
  `${BASE_PATH}components/ci-header/ci-header.html`,
  `${BASE_PATH}components/ci-header/ci-header.css`,
  `${BASE_PATH}components/ci-theme-toggle/ci-theme-toggle.html`,
  `${BASE_PATH}components/ci-theme-toggle/ci-theme-toggle.css`,
  `${BASE_PATH}styles/app.css`,
  `${BASE_PATH}styles/base.css`,
  `${BASE_PATH}styles/themes.css`,
  `${BASE_PATH}styles/tokens.css`,
  `${BASE_PATH}utils/ci-footer-status.js`,
  `${BASE_PATH}utils/ui-utils.js`,
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() => {
          // Optionally, return a fallback page or asset here
          return new Response(
            "Network error occurred and no cached response available.",
            { status: 503, statusText: "Service Unavailable" }
          );
        })
      );
    })
  );
});
