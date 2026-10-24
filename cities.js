const PLACES = [
  { c: "اليمن", m: "UmmAlQura", cities: [
    ["صنعاء", 15.3694, 44.1910, "Asia/Aden"], ["عدن", 12.7855, 45.0187, "Asia/Aden"],
    ["تعز", 13.5789, 44.0219, "Asia/Aden"], ["الحديدة", 14.7979, 42.9540, "Asia/Aden"],
    ["إب", 13.9667, 44.1833, "Asia/Aden"], ["ذمار", 14.5430, 44.4051, "Asia/Aden"],
    ["مأرب", 15.4543, 45.3260, "Asia/Aden"], ["المكلا", 14.5425, 49.1242, "Asia/Aden"],
    ["سيئون", 15.9433, 48.7872, "Asia/Aden"] ] },
  { c: "السعودية", m: "UmmAlQura", cities: [
    ["مكة المكرمة", 21.3891, 39.8579, "Asia/Riyadh"], ["المدينة المنورة", 24.4686, 39.6142, "Asia/Riyadh"],
    ["الرياض", 24.7136, 46.6753, "Asia/Riyadh"], ["جدة", 21.5433, 39.1728, "Asia/Riyadh"],
    ["الدمام", 26.4207, 50.0888, "Asia/Riyadh"], ["أبها", 18.2164, 42.5053, "Asia/Riyadh"],
    ["تبوك", 28.3838, 36.5550, "Asia/Riyadh"], ["بريدة", 26.3260, 43.9750, "Asia/Riyadh"] ] },
  { c: "مصر", m: "Egyptian", cities: [
    ["القاهرة", 30.0444, 31.2357, "Africa/Cairo"], ["الإسكندرية", 31.2001, 29.9187, "Africa/Cairo"],
    ["أسوان", 24.0889, 32.8998, "Africa/Cairo"], ["الأقصر", 25.6872, 32.6396, "Africa/Cairo"],
    ["بورسعيد", 31.2653, 32.3019, "Africa/Cairo"] ] },
  { c: "الإمارات", m: "Dubai", cities: [
    ["دبي", 25.2048, 55.2708, "Asia/Dubai"], ["أبوظبي", 24.4539, 54.3773, "Asia/Dubai"],
    ["الشارقة", 25.3463, 55.4209, "Asia/Dubai"] ] },
  { c: "قطر", m: "Qatar", cities: [["الدوحة", 25.2854, 51.5310, "Asia/Qatar"]] },
  { c: "الكويت", m: "Kuwait", cities: [["مدينة الكويت", 29.3759, 47.9774, "Asia/Kuwait"]] },
  { c: "البحرين", m: "UmmAlQura", cities: [["المنامة", 26.2285, 50.5860, "Asia/Bahrain"]] },
  { c: "عُمان", m: "MuslimWorldLeague", cities: [
    ["مسقط", 23.5880, 58.3829, "Asia/Muscat"], ["صلالة", 17.0151, 54.0924, "Asia/Muscat"] ] },
  { c: "العراق", m: "MuslimWorldLeague", cities: [
    ["بغداد", 33.3152, 44.3661, "Asia/Baghdad"], ["البصرة", 30.5085, 47.7804, "Asia/Baghdad"],
    ["الموصل", 36.3489, 43.1577, "Asia/Baghdad"], ["أربيل", 36.1901, 44.0091, "Asia/Baghdad"] ] },
  { c: "سوريا", m: "Egyptian", cities: [
    ["دمشق", 33.5138, 36.2765, "Asia/Damascus"], ["حلب", 36.2021, 37.1343, "Asia/Damascus"] ] },
  { c: "لبنان", m: "Egyptian", cities: [
    ["بيروت", 33.8938, 35.5018, "Asia/Beirut"], ["طرابلس", 34.4367, 35.8497, "Asia/Beirut"] ] },
  { c: "الأردن", m: "MuslimWorldLeague", cities: [
    ["عمّان", 31.9454, 35.9284, "Asia/Amman"], ["إربد", 32.5556, 35.8469, "Asia/Amman"] ] },
  { c: "فلسطين", m: "MuslimWorldLeague", cities: [
    ["القدس", 31.7683, 35.2137, "Asia/Hebron"], ["غزة", 31.5017, 34.4668, "Asia/Gaza"],
    ["نابلس", 32.2211, 35.2544, "Asia/Hebron"], ["الخليل", 31.5326, 35.0998, "Asia/Hebron"] ] },
  { c: "ليبيا", m: "MuslimWorldLeague", cities: [
    ["طرابلس", 32.8872, 13.1913, "Africa/Tripoli"], ["بنغازي", 32.1167, 20.0667, "Africa/Tripoli"] ] },
  { c: "تونس", m: "MuslimWorldLeague", cities: [
    ["تونس", 36.8065, 10.1815, "Africa/Tunis"], ["صفاقس", 34.7406, 10.7603, "Africa/Tunis"] ] },
  { c: "الجزائر", m: "MuslimWorldLeague", cities: [
    ["الجزائر", 36.7538, 3.0588, "Africa/Algiers"], ["وهران", 35.6971, -0.6308, "Africa/Algiers"],
    ["قسنطينة", 36.3650, 6.6147, "Africa/Algiers"] ] },
  { c: "المغرب", m: "MuslimWorldLeague", cities: [
    ["الرباط", 34.0209, -6.8416, "Africa/Casablanca"], ["الدار البيضاء", 33.5731, -7.5898, "Africa/Casablanca"],
    ["مراكش", 31.6295, -7.9811, "Africa/Casablanca"], ["فاس", 34.0181, -5.0078, "Africa/Casablanca"] ] },
  { c: "السودان", m: "Egyptian", cities: [
    ["الخرطوم", 15.5007, 32.5599, "Africa/Khartoum"], ["بورتسودان", 19.6158, 37.2164, "Africa/Khartoum"] ] },
  { c: "الصومال", m: "MuslimWorldLeague", cities: [
    ["مقديشو", 2.0469, 45.3182, "Africa/Mogadishu"], ["هرجيسا", 9.5600, 44.0650, "Africa/Mogadishu"] ] },
  { c: "موريتانيا", m: "MuslimWorldLeague", cities: [["نواكشوط", 18.0735, -15.9582, "Africa/Nouakchott"]] },
  { c: "تركيا", m: "Turkey", cities: [
    ["إسطنبول", 41.0082, 28.9784, "Europe/Istanbul"], ["أنقرة", 39.9334, 32.8597, "Europe/Istanbul"],
    ["إزمير", 38.4237, 27.1428, "Europe/Istanbul"] ] },
  { c: "إيران", m: "Tehran", cities: [
    ["طهران", 35.6892, 51.3890, "Asia/Tehran"], ["مشهد", 36.2605, 59.6168, "Asia/Tehran"] ] },
  { c: "باكستان", m: "Karachi", cities: [
    ["كراتشي", 24.8607, 67.0011, "Asia/Karachi"], ["إسلام آباد", 33.6844, 73.0479, "Asia/Karachi"],
    ["لاهور", 31.5204, 74.3587, "Asia/Karachi"] ] },
  { c: "الهند", m: "Karachi", cities: [
    ["دلهي", 28.6139, 77.2090, "Asia/Kolkata"], ["مومباي", 19.0760, 72.8777, "Asia/Kolkata"],
    ["حيدر آباد", 17.3850, 78.4867, "Asia/Kolkata"] ] },
  { c: "بنغلاديش", m: "Karachi", cities: [["دكا", 23.8103, 90.4125, "Asia/Dhaka"]] },
  { c: "إندونيسيا", m: "Singapore", cities: [["جاكرتا", -6.2088, 106.8456, "Asia/Jakarta"]] },
  { c: "ماليزيا", m: "Singapore", cities: [["كوالالمبور", 3.1390, 101.6869, "Asia/Kuala_Lumpur"]] },
  { c: "بريطانيا", m: "MuslimWorldLeague", cities: [["لندن", 51.5072, -0.1276, "Europe/London"]] },
  { c: "ألمانيا", m: "MuslimWorldLeague", cities: [["برلين", 52.5200, 13.4050, "Europe/Berlin"]] },
  { c: "فرنسا", m: "MuslimWorldLeague", cities: [["باريس", 48.8566, 2.3522, "Europe/Paris"]] },
  { c: "أمريكا", m: "NorthAmerica", cities: [
    ["نيويورك", 40.7128, -74.0060, "America/New_York"], ["لوس أنجلوس", 34.0522, -118.2437, "America/Los_Angeles"] ] },
  { c: "كندا", m: "NorthAmerica", cities: [["تورونتو", 43.6532, -79.3832, "America/Toronto"]] }
];
