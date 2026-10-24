(function () {
  var T = [
    ["ذهبي", "#d4af37", "#ffe27a", "#a99552", "#8a6d1d", "#3a3010", "#1a1608", "#2a220a", "212,175,55"],
    ["بنفسجي", "#a56cff", "#d9bfff", "#8f78b8", "#5b2fb0", "#2a1a4a", "#160f26", "#241640", "165,108,255"],
    ["أحمر", "#e04b4b", "#ff9d9d", "#b07a7a", "#9c1f1f", "#3d1414", "#1f0f0f", "#331616", "224,75,75"],
    ["أخضر", "#2fbf71", "#8cf0b6", "#78a98c", "#1b7a47", "#143a26", "#0f1f16", "#163324", "47,191,113"],
    ["أزرق", "#3b9eff", "#a5d4ff", "#7a9bb8", "#1f5fa8", "#14304a", "#0f1a26", "#16283d", "59,158,255"],
    ["برتقالي", "#ff8a3d", "#ffc59a", "#b8906f", "#b4521a", "#40220f", "#211209", "#37200f", "255,138,61"],
    ["وردي", "#ff5fa2", "#ffb3d3", "#b87a96", "#a3236a", "#401427", "#210f19", "#35162a", "255,95,162"],
    ["فيروزي", "#22d3c5", "#8ff3ea", "#6fa9a4", "#12877e", "#123a37", "#0e1f1e", "#143432", "34,211,197"],
    ["فضي", "#cfd3da", "#ffffff", "#9aa0aa", "#6b717c", "#2a2d33", "#16171a", "#222428", "207,211,218"]
  ];
  var KEYS = ["--g", "--g2", "--g3", "--g4", "--b", "--c2", "--c3", "--gr"];
  var cur = parseInt(localStorage.getItem("theme"), 10);
  if (isNaN(cur) || !T[cur]) cur = 0;

  function apply(i) {
    cur = i;
    var t = T[i], r = document.documentElement;
    for (var k = 0; k < KEYS.length; k++) r.style.setProperty(KEYS[k], t[k + 1]);
    localStorage.setItem("theme", String(i));
    var lbl = document.getElementById("tname");
    if (lbl) lbl.textContent = "اللون الحالي: " + t[0];
    var sw = document.querySelectorAll("#tsw .sw");
    for (var s = 0; s < sw.length; s++) sw[s].className = "sw" + (s === i ? " on" : "");
  }
  apply(cur);

  function goBackOne() {
    var r = document.getElementById("reader");
    if (r && r.style.display === "block" && typeof window.goBack === "function") { window.goBack(); return; }
    var qb = document.getElementById("qbox"), en = document.getElementById("end"), st = document.getElementById("start");
    if (st && ((qb && qb.style.display === "block") || (en && en.style.display === "block"))) {
      qb.style.display = "none"; en.style.display = "none"; st.style.display = "block";
      window.scrollTo(0, 0);
      return;
    }
    var sq = document.getElementById("secQ");
    if (sq && sq.style.display === "block" && typeof window.showTab === "function") { window.showTab("t"); return; }
    var ref = document.referrer || "";
    if (history.length > 1 && ref.indexOf(location.host) >= 0) history.back();
    else location.href = "index.html";
  }

  function ui() {
    var page = location.pathname.split("/").pop() || "index.html";
    var home = (page === "index.html");

    var css = document.createElement("style");
    css.textContent = [
      "html{scroll-padding-top:calc(68px + env(safe-area-inset-top, 0px))}",
      "#topbar{position:fixed;top:0;left:50%;transform:translateX(-50%);width:100%;max-width:640px;box-sizing:border-box;height:calc(56px + env(safe-area-inset-top, 0px));padding:calc(7px + env(safe-area-inset-top, 0px)) 12px 7px;background:#050505;border-bottom:1px solid var(--b);display:flex;align-items:center;gap:8px;z-index:60;transition:transform .25s}",
      "#topbar.hide{transform:translate(-50%,-110%)}",
      "body.has-bar{padding-top:calc(56px + env(safe-area-inset-top, 0px)) !important}",
      "body.has-bar header{padding-top:10px !important}",
      ".tbb{flex:0 0 42px;width:42px;height:42px;border-radius:50%;border:1px solid var(--g);background:#0d0d0d;color:var(--g2);font-size:19px;display:flex;align-items:center;justify-content:center;padding:0;box-shadow:0 0 8px rgba(var(--gr),.3)}",
      "#bbtn{font-size:22px}",
      "#ttl{flex:1;text-align:center;color:var(--g2);font-weight:900;font-size:17px;font-family:'Cairo',sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
      "#tbtn.float{position:fixed;top:calc(10px + env(safe-area-inset-top, 0px));left:12px;z-index:60;background:rgba(0,0,0,.65);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);transition:transform .25s}",
      "#tbtn.float.hide{transform:translateY(-150%)}",
      "#tpanel{display:none;position:fixed;top:calc(64px + env(safe-area-inset-top, 0px));left:12px;width:250px;background:#0d0d0d;border:1px solid var(--g);border-radius:18px;padding:14px;z-index:70;text-align:center;font-family:'Cairo',sans-serif;box-shadow:0 0 24px rgba(var(--gr),.45)}",
      "#tpanel .tt{color:var(--g2);font-weight:900;margin-bottom:10px}",
      "#trand{width:100%;padding:12px;border:none;border-radius:14px;background:linear-gradient(90deg,var(--g4),var(--g));color:#000;font-size:16px;font-weight:900;font-family:'Cairo',sans-serif}",
      "#tsw{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin:12px 0 8px}",
      "#tsw .sw{aspect-ratio:1;border-radius:50%;border:2px solid transparent;padding:0}",
      "#tsw .sw.on{border-color:#fff}",
      "#tname{color:var(--g3);font-size:13px}",
      "#tpanel .th{color:#888;font-size:11px;margin-top:6px;line-height:1.7}"
    ].join("");
    document.head.appendChild(css);

    var tb = document.createElement("button");
    tb.id = "tbtn";
    tb.className = "tbb" + (home ? " float" : "");
    tb.textContent = "🎨";
    tb.setAttribute("aria-label", "الألوان");

    var target = tb;
    if (home) {
      document.body.appendChild(tb);
    } else {
      var bar = document.createElement("div");
      bar.id = "topbar";
      var bb = document.createElement("button");
      bb.id = "bbtn"; bb.className = "tbb"; bb.textContent = "→"; bb.setAttribute("aria-label", "رجوع");
      bb.onclick = goBackOne;
      var xb = document.createElement("button");
      xb.id = "xbtn"; xb.className = "tbb"; xb.textContent = "✕"; xb.setAttribute("aria-label", "خروج");
      xb.onclick = function () { location.href = "index.html"; };
      var ttl = document.createElement("div");
      ttl.id = "ttl";
      ttl.textContent = (document.title || "").split(" - ")[0];
      bar.appendChild(bb); bar.appendChild(xb); bar.appendChild(ttl); bar.appendChild(tb);
      document.body.appendChild(bar);
      document.body.classList.add("has-bar");
      target = bar;
    }

    // يختفي عند النزول للقراءة، ويرجع عند السحب لفوق
    var last = window.pageYOffset || 0, hidden = false;
    window.addEventListener("scroll", function () {
      var y = window.pageYOffset || 0, d = y - last;
      if (Math.abs(d) < 8) return;
      if (d > 0 && y > 80 && !hidden) { target.classList.add("hide"); hidden = true; }
      else if ((d < 0 || y <= 80) && hidden) { target.classList.remove("hide"); hidden = false; }
      last = y;
    }, { passive: true });

    var panel = document.createElement("div");
    panel.id = "tpanel";
    panel.innerHTML = '<div class="tt">🎨 لون التطبيق</div><button id="trand">🎲 تغيير عشوائي</button><div id="tsw"></div><div id="tname"></div><div class="th">اضغط 🎲 حتى يعجبك اللون ثم توقّف</div>';
    document.body.appendChild(panel);

    var box = panel.querySelector("#tsw");
    T.forEach(function (t, i) {
      var b = document.createElement("button");
      b.className = "sw";
      b.style.background = "linear-gradient(135deg," + t[1] + "," + t[4] + ")";
      b.title = t[0];
      b.onclick = function () { apply(i); };
      box.appendChild(b);
    });
    panel.querySelector("#trand").onclick = function () {
      var n;
      do { n = Math.floor(Math.random() * T.length); } while (n === cur);
      apply(n);
      if (navigator.vibrate) navigator.vibrate(15);
    };
    tb.onclick = function (e) {
      e.stopPropagation();
      panel.style.display = panel.style.display === "block" ? "none" : "block";
    };
    document.addEventListener("click", function (e) {
      if (!panel.contains(e.target) && e.target !== tb) panel.style.display = "none";
    });
    apply(cur);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ui);
  else ui();
})();
