import { Wheat, Phone, Mail, MapPin } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';
import { company } from '@/data/catalog';

export default function Footer() {
  const { t } = useLang();

  const cols = [
    { title: t.footer.colRice, links: t.footer.riceLinks },
    { title: t.footer.colStays, links: t.footer.stayLinks },
    { title: t.footer.colCompany, links: t.footer.companyLinks },
  ];

  return (
    <footer className="bg-forest-950 text-sand-100/70">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-forest-700 text-gold-200">
                <Wheat className="h-5 w-5" />
              </span>
              <span className="font-display text-xl font-semibold text-sand-50">Sirari</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              {t.footer.tagline}
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <a href={`tel:${company.phoneTZ1.replace(/\s/g, '')}`} className="flex items-center gap-2 transition-colors hover:text-gold-300">
                <Phone className="h-4 w-4 text-gold-400" /> {company.phoneTZ1}
              </a>
              <a href={`tel:${company.phoneTZ2.replace(/\s/g, '')}`} className="flex items-center gap-2 transition-colors hover:text-gold-300">
                <Phone className="h-4 w-4 text-gold-400" /> {company.phoneTZ2}
              </a>
              <a href={`tel:${company.phoneKE.replace(/\s/g, '')}`} className="flex items-center gap-2 transition-colors hover:text-gold-300">
                <Phone className="h-4 w-4 text-gold-400" /> {company.phoneKE} <span className="text-xs text-sand-100/50">(Kenya)</span>
              </a>
              <a href={`tel:${company.phoneKE2.replace(/\s/g, '')}`} className="flex items-center gap-2 transition-colors hover:text-gold-300">
                <Phone className="h-4 w-4 text-gold-400" /> {company.phoneKE2} <span className="text-xs text-sand-100/50">(Kenya)</span>
              </a>
              <a href={`mailto:${company.email}`} className="flex items-center gap-2 transition-colors hover:text-gold-300">
                <Mail className="h-4 w-4 text-gold-400" /> {company.email}
              </a>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold-400" /> {company.address}
              </p>
            </div>
          </div>

          {/* Links */}
          {cols.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-sand-50">{col.title}</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="transition-colors hover:text-gold-300">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Hours */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-sand-50">{t.footer.colHours}</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {t.footer.hours.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-sand-50/10 pt-6 text-xs sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {t.footer.copyright}</p>
          <p>{t.footer.grown}</p>
        </div>
      </div>
    </footer>
  );
}
