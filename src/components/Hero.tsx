import { ChevronRight, Leaf, Star } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { useLang } from '@/contexts/LanguageContext';

export default function Hero() {
  const { t } = useLang();
  const { ref, visible } = useReveal();

  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/37395343/pexels-photo-37395343.jpeg?auto=compress&cs=tinysrgb&h=1080&w=1920"
          alt="Golden rice field at harvest"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/70 via-forest-900/55 to-forest-950/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/60 to-transparent" />
      </div>

      {/* Floating decorative grain */}
      <div className="pointer-events-none absolute right-[6%] top-[28%] hidden lg:block animate-float">
        <div className="h-28 w-28 rounded-full bg-gold-300/20 blur-2xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 pt-28 pb-20 sm:px-8">
        <div ref={ref} className={`max-w-3xl ${visible ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-sand-50/10 px-4 py-1.5 text-sm font-medium text-gold-200 ring-1 ring-sand-50/20 backdrop-blur">
            <Leaf className="h-4 w-4" />
            {t.hero.badge}
          </div>

          <h1 className="text-balance font-display text-5xl font-semibold leading-[1.05] text-sand-50 sm:text-6xl lg:text-7xl">
            {t.hero.headline1}
            <br />
            <span className="text-gold-300">{t.hero.headline2}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-sand-100/90">
            {t.hero.body}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#products"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-base font-semibold text-forest-950 shadow-lift transition-all duration-300 hover:bg-gold-400"
            >
              {t.hero.exploreRice}
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#stays"
              className="inline-flex items-center justify-center rounded-full bg-sand-50/10 px-7 py-3.5 text-base font-semibold text-sand-50 ring-1 ring-sand-50/30 backdrop-blur transition-all duration-300 hover:bg-sand-50/20"
            >
              {t.hero.discoverStays}
            </a>
          </div>

          {/* Stats */}
          <div className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-sand-50/15 pt-7">
            {[
              { value: '3', label: t.hero.riceGrades },
              { value: '2', label: t.hero.branches },
              { value: '4.9', label: t.hero.buyerRating, icon: true },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex items-center gap-1 font-display text-3xl font-semibold text-sand-50">
                  {s.value}
                  {s.icon && <Star className="h-5 w-5 fill-gold-300 text-gold-300" />}
                </div>
                <div className="mt-1 text-sm text-sand-100/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden sm:block">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-sand-50/40 p-1.5">
          <div className="h-2 w-1 rounded-full bg-sand-50/70 animate-float" />
        </div>
      </div>
    </section>
  );
}
