import { ChefHat, Truck, ShieldCheck, Leaf, Mountain, Droplets } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { useLang } from '@/contexts/LanguageContext';

const icons = [Leaf, ShieldCheck, Truck, ChefHat, Droplets, Mountain];

export default function Features() {
  const { t } = useLang();
  const { ref, visible } = useReveal();

  return (
    <section id="features" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div ref={ref} className={`mx-auto max-w-2xl text-center ${visible ? 'animate-fade-up' : 'opacity-0'}`}>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
            {t.features.sectionLabel}
          </span>
          <h2 className="mt-3 text-balance font-display text-4xl font-semibold text-forest-900 sm:text-5xl">
            {t.features.headline}
          </h2>
          <p className="mt-5 text-lg text-forest-700/80">
            {t.features.body}
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.features.items.map((f, i) => {
            const Icon = icons[i];
            return (
              <div
                key={f.title}
                className={`group rounded-3xl bg-sand-50 p-7 ring-1 ring-forest-100/60 transition-all duration-300 hover:bg-forest-700 hover:shadow-lift ${visible ? 'animate-fade-up' : 'opacity-0'}`}
                style={{ animationDelay: `${0.08 + i * 0.08}s` }}
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-forest-100 text-forest-700 transition-colors duration-300 group-hover:bg-sand-50/15 group-hover:text-gold-200">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-forest-900 transition-colors duration-300 group-hover:text-sand-50">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-forest-700/80 transition-colors duration-300 group-hover:text-sand-100/80">
                  {f.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
