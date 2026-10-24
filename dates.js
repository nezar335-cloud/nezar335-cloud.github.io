const HM = ["محرم","صفر","ربيع الأول","ربيع الآخر","جمادى الأولى","جمادى الآخرة","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة"];

const HF = (function () {
  try {
    return new Intl.DateTimeFormat("en-US-u-ca-islamic-umalqura-nu-latn", { day: "numeric", month: "numeric", year: "numeric" });
  } catch (e) { return null; }
})();

function hij(date) {
  if (!HF) return null;
  const p = {};
  HF.formatToParts(date).forEach(x => { p[x.type] = x.value; });
  const r = { d: Number(p.day), m: Number(p.month), y: Number(p.year) };
  return r.y > 1400 ? r : null;
}

function hijText(h) { return h.d + " " + HM[h.m - 1] + " " + h.y + " هـ"; }

function gregText(date) {
  return date.toLocaleDateString("ar-SA-u-ca-gregory-nu-latn", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function nextHijri(m, d) {
  const base = new Date();
  base.setHours(12, 0, 0, 0);
  for (let i = 0; i < 400; i++) {
    const dt = new Date(base.getTime() + i * 86400000);
    const h = hij(dt);
    if (h && h.m === m && h.d === d) return { date: dt, days: i };
  }
  return null;
}

function daysText(n) {
  if (n === 0) return "اليوم 🎉";
  if (n === 1) return "غداً";
  if (n === 2) return "بعد يومين";
  if (n <= 10) return "بعد " + n + " أيام";
  return "بعد " + n + " يوماً";
}

const EVENTS = [
  { n: "بداية رمضان", ic: "🌙", m: 9, d: 1 },
  { n: "عيد الفطر", ic: "🎉", m: 10, d: 1 },
  { n: "يوم عرفة", ic: "🕋", m: 12, d: 9 },
  { n: "عيد الأضحى", ic: "🐑", m: 12, d: 10 },
  { n: "رأس السنة الهجرية", ic: "📅", m: 1, d: 1 },
  { n: "يوم عاشوراء", ic: "🤲", m: 1, d: 10 }
];
