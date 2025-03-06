const CACHE_NAME = "todo-app-cache-v1";
const ASSETS = [
    "/",
    "/index.html",
    "/style.css",
    "/script.js",
    "/assets/check.png",
    "/assets/eye.png",
    "/assets/hintergrund.png",
    "/manifest.json"
];

// Installiert den Service Worker und speichert Dateien im Cache
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS);
        })
    );
});



// Interceptet Netzwerk-Anfragen und lädt aus dem Cache, falls offline
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        }).catch(() => {
            return caches.match("/index.html");
        })
    );
});