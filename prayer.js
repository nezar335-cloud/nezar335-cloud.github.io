const PNAMES = [["fajr", "الفجر"], ["sunrise", "الشروق"], ["dhuhr", "الظهر"], ["asr", "العصر"], ["maghrib", "المغرب"], ["isha", "العشاء"]];

function getLoc() {
  try { return JSON.parse(localStorage.getItem("loc") || "null"); } catch (e) { return null; }
}
function setLoc(l) { localStorage.setItem("loc", JSON.stringify(l)); }

function cityDate(tz, add) {
  const p = {};
  new Intl.DateTimeFormat("en-US", { timeZone: tz, year: "numeric", month: "numeric", day: "numeric" })
    .formatToParts(new Date()).forEach(x => { p[x.type] = x.value; });
  return new Date(Number(p.year), Number(p.month) - 1, Number(p.day) + (add || 0));
}

function paramsFor(l) {
  const f = adhan.CalculationMethod[l.method];
  const p = f ? f() : adhan.CalculationMethod.MuslimWorldLeague();
  p.madhab = (l.madhab === "Hanafi") ? adhan.Madhab.Hanafi : adhan.Madhab.Shafi;
  return p;
}

function timesFor(l, add) {
  const pt = new adhan.PrayerTimes(new adhan.Coordinates(l.lat, l.lng), cityDate(l.tz, add || 0), paramsFor(l));
  return PNAMES.map(x => ({ k: x[0], n: x[1], t: pt[x[0]] }));
}

function nextPrayer(l) {
  const now = new Date();
  let nx = timesFor(l, 0).find(x => x.k !== "sunrise" && x.t > now);
  if (!nx) nx = timesFor(l, 1)[0];
  return nx;
}

function fmtTime(d, tz) {
  return d.toLocaleTimeString("ar-EG-u-nu-latn", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: tz });
}

function fmtCountdown(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return [Math.floor(s / 3600), Math.floor(s % 3600 / 60), s % 60].map(v => String(v).padStart(2, "0")).join(":");
}
