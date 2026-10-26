(function () {
  if (location.origin === "https://localhost" || !("serviceWorker" in navigator)) return;
  var KEY = "offlineReady";
  if (localStorage.getItem(KEY) === "1") return;
  var box = document.createElement("div");
  box.style.cssText = "position:fixed;left:12px;right:12px;bottom:calc(86px + env(safe-area-inset-bottom,0px));z-index:80;background:#0d0d0d;border:1px solid var(--g);border-radius:16px;padding:12px 14px;text-align:center;color:#fff6d6;font-family:'Cairo',sans-serif;font-size:14px;line-height:1.8;box-shadow:0 0 18px rgba(var(--gr),.4)";
  document.body.appendChild(box);
  function say(t) { box.innerHTML = t; }
  function done() {
    localStorage.setItem(KEY, "1");
    say("✅ تم التجهيز، التطبيق يعمل الآن بدون إنترنت");
    setTimeout(function () { box.remove(); }, 4000);
  }
  if (!navigator.onLine) {
    say("⚠️ شغّل الإنترنت مرة واحدة (حوالي 10 ثوانٍ) ليتحمّل القرآن والأحاديث للعمل بدون إنترنت");
    window.addEventListener("online", function () { location.reload(); });
    return;
  }
  say("⏳ جاري تحميل القرآن والأحاديث للعمل بدون إنترنت...<br>أبقِ الإنترنت شغّالاً");
  var need = 0;
  fetch("sw.js", { cache: "no-store" }).then(function (r) { return r.text(); }).then(function (t) {
    var m = (t.split("FILES")[1] || "").split("];")[0];
    need = (m.match(/"[^"]+"/g) || []).length;
  });
  var tries = 0;
  var iv = setInterval(function () {
    tries++;
    if (!window.caches || tries > 180) { clearInterval(iv); box.remove(); return; }
    caches.keys().then(function (ks) {
      var k = ks.filter(function (x) { return x.indexOf("khill-") === 0; })[0];
      return k ? caches.open(k).then(function (c) { return c.keys(); }) : null;
    }).then(function (r) {
      if (!r || !need) return;
      say("⏳ جاري التحميل: " + r.length + " من " + need + " ملف<br>أبقِ الإنترنت شغّالاً");
      if (r.length >= need - 1) { clearInterval(iv); done(); }
    });
  }, 1000);
})();
