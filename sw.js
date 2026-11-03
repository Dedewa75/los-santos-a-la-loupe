// Service worker : rend l'appli installable et garde les pages de base en cache.
// Les données (Firebase) ne sont JAMAIS mises en cache : toujours en direct.
const CACHE = "lsl-v2";
const BASE = ["communaute.html", "communaute.css", "communaute.js", "communaute-config.js", "style.css", "manifest.webmanifest", "icons/icon-192.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(BASE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(n => n !== CACHE).map(n => caches.delete(n)))).then(() => self.clients.claim()));
});

// Réseau d'abord (toujours la version la plus récente), cache en secours si hors ligne
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;
  e.respondWith(
    fetch(e.request)
      .then(r => { const copie = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copie)); return r; })
      .catch(() => caches.match(e.request))
  );
});
