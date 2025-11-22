"use client";

import { useEffect, useMemo, useState } from "react";

const plannerSections = [
  {
    title: "رسالة ترحيبية",
    body:
      "نحن سعداء بزيارتك! استكشف التجربة وتفاعل مع الأدوات المختلفة لتصميم يومك المثالي."
  },
  {
    title: "تخطيط اليوم",
    body:
      "اختر لحظاتك المفضلة وحدد الأنشطة التي تمنحك السعادة. جرّب النماذج الجاهزة أو كوّن جدولك الخاص."
  },
  {
    title: "مصادر الإلهام",
    body:
      "استلهم من العبارات التحفيزية والأمثال العربية التي تتجدد مع كل زيارة."
  }
];

const inspirationalQuotes = [
  "صباحُ الخيرِ لمن يزرعُ الفرحَ في قلوبِ الآخرين.",
  "كلُّ يومٍ جديدٍ فرصةٌ لصناعةِ حلمٍ مختلف.",
  "التفاؤلُ سرُّ النجاح، والابتسامةُ جوازُ المرور.",
  "من زرعَ المعروفَ حصدَ السعادة.",
  "الدربُ الطويلُ يبدأ بخطوةٍ صادقةٍ اليوم."
];

const favoriteCities = [
  { name: "الرياض", offset: 3 },
  { name: "دبي", offset: 4 },
  { name: "القاهرة", offset: 2 }
];

const curatedMoments = [
  {
    title: "لحظة امتنان",
    description: "دوّن ثلاثة أشياء تشعر بالامتنان لها هذا الصباح."
  },
  {
    title: "استراحة القهوة",
    description: "اختر زاوية هادئة واستمتع بفنجان قهوة مع موسيقى تحبها."
  },
  {
    title: "اتصال محبة",
    description: "تواصل مع شخص تود سماع صوته اليوم، ولو لدقائق قليلة."
  }
];

function useNow() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return now;
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("ar", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function getGreeting(date: Date) {
  const hour = date.getHours();
  if (hour < 12) return "صباح الخير";
  if (hour < 17) return "مساء الخير";
  return "مساء السعادة";
}

function withOffset(date: Date, offsetHours: number) {
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  return new Date(utc + offsetHours * 3600000);
}

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

export default function Home() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % inspirationalQuotes.length);
    }, 6000);

    return () => clearInterval(id);
  }, []);

  const now = useNow();
  const defaultOffset = 3;
  const userClock = useMemo(() => withOffset(now, defaultOffset), [now]);
  const greeting = getGreeting(userClock);
  const [featuredMoments, setFeaturedMoments] = useState(() =>
    shuffle(curatedMoments).slice(0, 2)
  );

  const reshuffleMoments = () => {
    setFeaturedMoments(shuffle(curatedMoments).slice(0, 2));
  };

  return (
    <main className="page">
      <div className="hero">
        <div className="hero__content">
          <div className="hero__badge">أهلاً وسهلاً</div>
          <h1>{greeting}! نُرحب بك في مساحتك المُلهمة.</h1>
          <p>
            اصنع يومك بحب، واستكشف لحظات صغيرة تصنع فرقاً كبيراً. هذه المساحة
            صُممت لتمنحك دفعة من الإيجابية والتوازن.
          </p>
          <button type="button" className="hero__cta" onClick={reshuffleMoments}>
            جدّد الإلهام
          </button>
        </div>
        <div className="hero__widgets">
          <div className="widget widget--quote">
            <span className="widget__label">اقتباس اليوم</span>
            <p className="widget__quote">{inspirationalQuotes[quoteIndex]}</p>
          </div>
          <div className="widget widget--clock">
            <span className="widget__label">الوقت الحالي</span>
            <div className="widget__time">
              <span>{formatTime(userClock)}</span>
              <small>منطقتك الافتراضية</small>
            </div>
            <div className="widget__cities">
              {favoriteCities.map((city) => {
                const cityClock = withOffset(now, city.offset);
                const cityTime = formatTime(cityClock);
                const cityGreeting = getGreeting(cityClock);
                return (
                  <div key={city.name} className="city">
                    <span>{city.name}</span>
                    <strong>{cityTime}</strong>
                    <small>{cityGreeting}</small>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <section className="planner">
        {plannerSections.map((section) => (
          <article key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </article>
        ))}
      </section>

      <section className="moments">
        <header>
          <h2>لحظات مُقترحة اليوم</h2>
          <button type="button" onClick={reshuffleMoments}>
            تبديل
          </button>
        </header>
        <div className="moments__grid">
          {featuredMoments.map((moment) => (
            <div key={moment.title} className="moment-card">
              <h3>{moment.title}</h3>
              <p>{moment.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
