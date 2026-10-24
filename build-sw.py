import os, time
exts = (".html", ".js", ".css", ".json", ".png")
files = ["./"]
for f in sorted(os.listdir(".")):
    if (os.path.isfile(f) and f.endswith(exts) and "backup" not in f and f != "sw.js"
            and not f.startswith("dev-") and f != "reset.html"):
        files.append(f)
lst = ",\n  ".join('"%s"' % f for f in files)
js = '''const CACHE = "khill-%d";
const FILES = [
  %s
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
''' % (int(time.time()), lst)
open("sw.js", "w", encoding="utf-8").write(js)
print("تم: sw.js يحتوي", len(files), "ملف")
