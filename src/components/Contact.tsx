import { useState } from 'react';
import { Mail, MapPin, Phone, Send, MessageCircle } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { useLang } from '@/contexts/LanguageContext';
import { company, guestHouses } from '@/data/catalog';

const stripPhone = (p: string) => p.replace(/[^\d]/g, '');
const waLink = (number: string, text?: string) =>
  `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export default function Contact() {
  const { t } = useLang();
  const { ref, visible } = useReveal();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const msg = `*Message from ${name.trim()}*\nPhone: ${phone.trim()}\n\n${message.trim()}`;
    window.open(`https://wa.me/255767513101?text=${encodeURIComponent(msg)}`, '_blank');
  }

  const waNumber = stripPhone(company.phoneTZ2);
  const contactInfo = [
    { icon: Phone, label: t.contact.callLabel, value: company.phoneKE, href: `tel:${stripPhone(company.phoneKE)}` },
    { icon: Mail, label: t.contact.emailLabel, value: company.email },
    { icon: MapPin, label: t.contact.addressLabel, value: company.address },
  ];

  return (
    <section id="contact" className="bg-sand-50 py-24 sm:py-32 bg-grain">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div ref={ref} className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Info */}
          <div className={visible ? 'animate-fade-up' : 'opacity-0'}>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
              {t.contact.sectionLabel}
            </span>
            <h2 className="mt-3 text-balance font-display text-4xl font-semibold text-forest-900 sm:text-5xl">
              {t.contact.headline}
            </h2>
            <p className="mt-5 text-lg text-forest-700/80">
              {t.contact.body}
            </p>

            <div className="mt-10 space-y-5">
              {contactInfo.map((c) => {
                const Wrapper = c.href ? 'a' : 'div';
                return (
                  <Wrapper key={c.label} href={c.href} className="flex items-center gap-4 transition-opacity hover:opacity-80">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-forest-100 text-forest-700">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-forest-500">{c.label}</div>
                      <div className="font-medium text-forest-900">{c.value}</div>
                    </div>
                  </Wrapper>
                );
              })}
            </div>

            {/* Guest house WhatsApp numbers */}
            <div className="mt-10">
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-forest-600">
                {t.contact.guestHouseWhatsapp}
              </h3>
              <div className="mt-4 space-y-3">
                {guestHouses.map((house) => (
                  <div key={house.id} className="rounded-2xl bg-white px-5 py-4 ring-1 ring-forest-100">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-semibold text-forest-900">{house.name}</div>
                        <div className="mt-0.5 text-xs text-forest-500">{house.location}</div>
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        {house.whatsappNumbers.map((num) => (
                          <a
                            key={num}
                            href={waLink(num)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366]/10 px-3 py-1 text-sm font-medium text-[#128C7E] transition-colors hover:bg-[#25D366]/20"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                            +{num}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <a
              href={waLink(waNumber, `Hello ${company.name}, I'd like to make an enquiry.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] px-6 py-3.5 text-base font-semibold text-white transition-all hover:bg-[#1ebe5b] sm:w-auto"
            >
              <MessageCircle className="h-5 w-5" />
              {t.contact.whatsappBtn}
            </a>
          </div>

          {/* Form */}
          <div className={`rounded-3xl bg-white p-7 shadow-soft ring-1 ring-forest-100/60 sm:p-8 ${visible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '0.15s' }}>
            <form onSubmit={submit}>
              <h3 className="font-display text-xl font-semibold text-forest-900">{t.contact.formTitle}</h3>
              <div className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-forest-500">{t.contact.nameLabel}</label>
                  <input required value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5 w-full rounded-xl border border-forest-200 bg-white px-4 py-2.5 text-forest-900 outline-none transition-colors focus:border-forest-500 focus:ring-2 focus:ring-forest-200" placeholder={t.contact.namePlaceholder} />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-forest-500">Phone</label>
                  <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1.5 w-full rounded-xl border border-forest-200 bg-white px-4 py-2.5 text-forest-900 outline-none transition-colors focus:border-forest-500 focus:ring-2 focus:ring-forest-200" placeholder="Your phone number" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-forest-500">{t.contact.messageLabel}</label>
                  <textarea required value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="mt-1.5 w-full rounded-xl border border-forest-200 bg-white px-4 py-2.5 text-forest-900 outline-none transition-colors focus:border-forest-500 focus:ring-2 focus:ring-forest-200" placeholder={t.contact.messagePlaceholder} />
                </div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-base font-semibold text-white transition-all hover:bg-[#1ebe5b]"
                >
                  {t.contact.sendBtn} <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

