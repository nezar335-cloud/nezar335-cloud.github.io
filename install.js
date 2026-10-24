(function () {
  var ev = null;
  function hide() { var b = document.getElementById("installBtn"); if (b) b.remove(); }
  function show() {
    if (document.getElementById("installBtn")) return;
    var a = document.createElement("a");
    a.id = "installBtn"; a.href = "#"; a.className = "card now";
    a.innerHTML = '<div class="nowt">📲 ثبّت خليل المسلم كتطبيق</div><div class="small">يعمل بدون إنترنت ومن شاشتك الرئيسية</div>';
    a.onclick = function (e) {
      e.preventDefault();
      if (!ev) return;
      ev.prompt();
      ev.userChoice.then(function () { ev = null; hide(); });
    };
    var h = document.querySelector("header");
    if (h && h.parentNode) h.parentNode.insertBefore(a, h.nextSibling);
  }
  window.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); ev = e; show(); });
  window.addEventListener("appinstalled", hide);
})();
