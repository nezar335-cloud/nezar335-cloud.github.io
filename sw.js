const CACHE = "khill-1793048847";
const FILES = [
  "./",
  "about.html",
  "achievements.html",
  "adhan.js",
  "adhkar.html",
  "adhkar.json",
  "anbiya.html",
  "anbiya.js",
  "cities.js",
  "dates.html",
  "dates.js",
  "hadith-bukhari.json",
  "hadith-daily.json",
  "hadith-muslim.json",
  "hadith-nawawi.json",
  "hadith-qudsi.json",
  "hadith.html",
  "icon-180.png",
  "icon-192.png",
  "icon-512.png",
  "index.html",
  "install.js",
  "manifest.json",
  "nav.js",
  "prayer.html",
  "prayer.js",
  "quiz.html",
  "quran.html",
  "quran.json",
  "ready.js",
  "style.css",
  "tasbih.html",
  "theme.js",
  "tools.html"
];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(FILES.map(f => c.add(f).catch(() => null)))));
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(cached =>
      cached || fetch(e.request).then(res => {
        if (res && (res.status === 200 || res.type === "opaque")) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      }).catch(() => caches.match("index.html"))
    )
  );
});
