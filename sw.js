// (A) FILES TO CACHE
const cName = "Weather",
const version = '1.0',

cFiles = [
  "index.html",
  "style.css",
  "pulltorefresh.js",
  "main.js"
];

// (B) CREATE/INSTALL CACHE
self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(cName)
    .then((cache) => { return cache.addAll(cFiles); })
    .catch((err) => { console.error(err) })
  );
});

// (C) CACHE STRATEGY
self.addEventListener("fetch", (evt) => {
//  // (C1) LOAD FROM CACHE FIRST, FALLBACK TO NETWORK IF NOT FOUND
//  evt.respondWith(
//    caches.match(evt.request)
//    .then((res) => { return res || fetch(evt.request); })
//  );

  // (C2) LOAD WITH NETWORK FIRST, FALLBACK TO CACHE IF OFFLINE
  evt.respondWith(
    fetch(evt.request)
    .catch(() => { return caches.match(evt.request); })
  );
});
