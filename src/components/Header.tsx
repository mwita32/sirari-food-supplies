import { useEffect, useState } from 'react';
import { Menu, X, Wheat, Globe } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

export default function Header() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: t.nav.rice, href: '#products' },
    { label: t.nav.stays, href: '#stays' },
    { label: t.nav.whyUs, href: '#features' },
    { label: t.nav.reviews, href: '#testimonials' },
    { label: t.nav.contact, href: '#contact' },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-sand-50/90 backdrop-blur-xl shadow-soft border-b border-forest-100'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span
            className={`grid h-10 w-10 place-items-center rounded-xl transition-all duration-500 ${
              scrolled ? 'bg-forest-700 text-gold-200' : 'bg-sand-50/15 text-gold-200 ring-1 ring-sand-50/30'
            }`}
          >
            <Wheat className="h-5 w-5" />
          </span>
          <span
            className={`font-display text-xl font-semibold tracking-tight transition-colors duration-500 ${
              scrolled ? 'text-forest-900' : 'text-sand-50'
            }`}
          >
            Sirari food supplies
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors hover:text-gold-500 ${
                scrolled ? 'text-forest-700' : 'text-sand-100'
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {/* Language switcher */}
          <div className={`flex items-center rounded-full p-0.5 text-xs font-semibold transition-colors ${scrolled ? 'bg-forest-100' : 'bg-sand-50/15 ring-1 ring-sand-50/25'}`}>
            <Globe className={`ml-2 h-3.5 w-3.5 ${scrolled ? 'text-forest-500' : 'text-sand-100/70'}`} />
            <button
              onClick={() => setLang('en')}
              className={`rounded-full px-2.5 py-1 transition-all ${lang === 'en' ? (scrolled ? 'bg-forest-700 text-white' : 'bg-sand-50 text-forest-900') : (scrolled ? 'text-forest-600' : 'text-sand-100/80')}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('sw')}
              className={`rounded-full px-2.5 py-1 transition-all ${lang === 'sw' ? (scrolled ? 'bg-forest-700 text-white' : 'bg-sand-50 text-forest-900') : (scrolled ? 'text-forest-600' : 'text-sand-100/80')}`}
            >
              SW
            </button>
          </div>
          <a
            href="#booking"
            className="inline-flex items-center rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-forest-950 shadow-soft transition-all duration-300 hover:bg-gold-400 hover:shadow-lift"
          >
            {t.nav.bookStay}
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <div className={`flex items-center rounded-full p-0.5 text-[11px] font-semibold ${scrolled ? 'bg-forest-100' : 'bg-sand-50/15 ring-1 ring-sand-50/25'}`}>
            <button
              onClick={() => setLang('en')}
              className={`rounded-full px-2 py-0.5 ${lang === 'en' ? (scrolled ? 'bg-forest-700 text-white' : 'bg-sand-50 text-forest-900') : (scrolled ? 'text-forest-600' : 'text-sand-100/80')}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('sw')}
              className={`rounded-full px-2 py-0.5 ${lang === 'sw' ? (scrolled ? 'bg-forest-700 text-white' : 'bg-sand-50 text-forest-900') : (scrolled ? 'text-forest-600' : 'text-sand-100/80')}`}
            >
              SW
            </button>
          </div>
          <button
            onClick={() => setOpen((v) => !v)}
            className={`grid h-10 w-10 place-items-center rounded-lg transition-colors ${
              scrolled ? 'text-forest-800 hover:bg-forest-50' : 'text-sand-50 hover:bg-sand-50/15'
            }`}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          open ? 'max-h-96 border-t border-forest-100' : 'max-h-0'
        } bg-sand-50/95 backdrop-blur-xl`}
      >
        <nav className="flex flex-col gap-1 px-5 py-4 sm:px-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-base font-medium text-forest-800 transition-colors hover:bg-forest-50"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-gold-500 px-5 py-3 text-base font-semibold text-forest-950"
          >
            {t.nav.bookStay}
          </a>
        </nav>
      </div>
    </header>
  );
}
