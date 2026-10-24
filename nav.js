(function () {
  var items = [["index.html", "🏠", "الرئيسية"], ["quran.html", "📖", "القرآن الكريم"], ["hadith.html", "📚", "الأحاديث"],
               ["adhkar.html", "🤲", "الأذكار"], ["tools.html", "🧩", "بقية الأدوات"]];
  var group = ["tools.html", "tasbih.html", "prayer.html", "dates.html", "achievements.html", "quiz.html", "anbiya.html", "about.html"];
  var page = location.pathname.split("/").pop() || "index.html";
  var html = "";
  items.forEach(function (it) {
    var on = it[0] === page || (it[0] === "tools.html" && group.indexOf(page) >= 0);
    html += '<a href="' + it[0] + '"' + (on ? ' class="active"' : '') + '><span>' + it[1] + '</span>' + it[2] + '</a>';
  });
  var nav = document.createElement("nav");
  nav.id = "appnav";
  nav.innerHTML = html;
  document.body.appendChild(nav);
})();
