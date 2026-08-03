import { Star, Quote } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { useLang } from '@/contexts/LanguageContext';

export default function Testimonials() {
  const { t } = useLang();
  const { ref, visible } = useReveal();

  return (
    <section id="testimonials" className="bg-forest-900 py-24 text-sand-50 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div ref={ref} className={`mx-auto max-w-2xl text-center ${visible ? 'animate-fade-up' : 'opacity-0'}`}>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
            {t.testimonials.sectionLabel}
          </span>
          <h2 className="mt-3 text-balance font-display text-4xl font-semibold sm:text-5xl">
            {t.testimonials.headline}
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {t.testimonials.items.map((item, i) => (
            <figure
              key={item.name}
              className={`relative rounded-3xl bg-sand-50/5 p-7 ring-1 ring-sand-50/10 backdrop-blur transition-all duration-300 hover:bg-sand-50/10 ${visible ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${0.1 + i * 0.12}s` }}
            >
              <Quote className="h-8 w-8 text-gold-400/50" />
              <blockquote className="mt-4 text-sand-100/90 leading-relaxed">"{item.quote}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-gold-400/20 font-display font-semibold text-gold-200">
                  {item.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-sand-50">{item.name}</div>
                  <div className="text-xs text-sand-100/60">{item.role}</div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-gold-300 text-gold-300" />
                  ))}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
