import { Sprout, HandHeart, Sun } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { useLang } from '@/contexts/LanguageContext';

const icons = [Sprout, HandHeart, Sun];

export default function About() {
  const { t } = useLang();
  const { ref, visible } = useReveal();

  return (
    <section id="about" className="relative bg-sand-50 py-24 sm:py-32 bg-grain">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Image collage */}
          <div ref={ref} className={`relative ${visible ? 'animate-fade-up' : 'opacity-0'}`}>
            <div className="relative overflow-hidden rounded-3xl shadow-lift">
              <img
                src="/images/about1.jpeg"
                alt="sirari food supplies rice"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-4 hidden w-48 overflow-hidden rounded-2xl border-4 border-sand-50 shadow-lift sm:block lg:w-56">
              <img
                src="/images/about2.jpeg"
                alt="Sirari rice bag"
                className="aspect-square w-full object-cover"
              />
            </div>
            <div className="absolute -left-3 top-8 hidden rounded-2xl bg-forest-800 px-5 py-4 text-sand-50 shadow-lift sm:block">
              <div className="font-display text-3xl font-semibold">25+</div>
              <div className="text-xs text-sand-100/80">{t.about.yearsLabel}</div>
            </div>
          </div>

          {/* Copy */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
              {t.about.sectionLabel}
            </span>
            <h2 className="mt-3 text-balance font-display text-4xl font-semibold text-forest-900 sm:text-5xl">
              {t.about.headline}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-forest-700/90">
              {t.about.body}
            </p>

            <div className="mt-10 space-y-6">
              {t.about.pillars.map((p, i) => {
                const Icon = icons[i];
                return (
                  <div
                    key={p.title}
                    className={`flex gap-4 ${visible ? 'animate-fade-up' : 'opacity-0'}`}
                    style={{ animationDelay: `${0.15 + i * 0.12}s` }}
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-forest-100 text-forest-700">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-forest-900">{p.title}</h3>
                      <p className="mt-1 text-forest-700/80">{p.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
