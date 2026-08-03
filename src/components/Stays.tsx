import { useState } from 'react';
import { BedDouble, Check, MapPin, Maximize, Star, Users } from 'lucide-react';
import { guestHouses } from '@/data/catalog';
import { formatKES } from '@/lib/format';
import { useReveal } from '@/hooks/useReveal';
import { useLang } from '@/contexts/LanguageContext';
import BookingModal from '@/components/BookingModal';
import type { GuestHouse, Room } from '@/types';

export default function Stays() {
  const { t } = useLang();
  const { ref, visible } = useReveal();
  const [booking, setBooking] = useState<{ house: GuestHouse; room: Room } | null>(null);

  return (
    <section id="stays" className="relative bg-forest-950 py-24 text-sand-50 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-40" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div ref={ref} className={`mx-auto max-w-2xl text-center ${visible ? 'animate-fade-up' : 'opacity-0'}`}>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
            {t.stays.sectionLabel}
          </span>
          <h2 className="mt-3 text-balance font-display text-4xl font-semibold sm:text-5xl">
            {t.stays.headline}
          </h2>
          <p className="mt-5 text-lg text-sand-100/75">
            {t.stays.body}
          </p>
        </div>

        <div className="mt-16 space-y-20">
          {guestHouses.map((house, hi) => (
            <div key={house.id} className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              {/* Visual */}
              <div className={`lg:col-span-6 ${visible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: `${0.1 + hi * 0.1}s` }}>
                <div className="relative overflow-hidden rounded-3xl shadow-lift">
                  <img src={house.image} alt={house.name} className="aspect-[4/3] w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <h3 className="font-display text-2xl font-semibold">{house.name}</h3>
                      <div className="mt-1 flex items-center gap-2">
                        <p className="flex items-center gap-1.5 text-sm text-sand-100/85">
                          <MapPin className="h-4 w-4 text-gold-300" />
                          {house.location}
                        </p>
                        <a
                          href={house.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-full bg-sand-50/15 px-2.5 py-0.5 text-xs font-medium text-gold-200 ring-1 ring-gold-300/30 transition-colors hover:bg-sand-50/25"
                        >
                          <MapPin className="h-3 w-3" />
                          {t.stays.viewMap}
                        </a>
                      </div>
                    </div>
                    <div className="rounded-xl bg-sand-50/15 px-3 py-2 text-right backdrop-blur">
                      <div className="text-xs text-sand-100/70">{t.stays.from}</div>
                      <div className="font-display text-lg font-semibold text-gold-200">{formatKES(house.startingPrice)}<span className="text-xs font-normal text-sand-100/70">{t.stays.perNight}</span></div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {house.gallery.map((g, i) => (
                    <img key={i} src={g} alt={`${house.name} gallery`} className="aspect-[4/3] w-full rounded-2xl object-cover" />
                  ))}
                </div>
              </div>

              {/* Rooms */}
              <div className="lg:col-span-6">
                <p className="text-sand-100/80">{house.blurb}</p>
                <p className="mt-3 text-sm leading-relaxed text-sand-100/60">{house.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {house.highlights.map((h) => (
                    <span key={h} className="rounded-full bg-sand-50/10 px-3 py-1 text-xs font-medium text-sand-100/85 ring-1 ring-sand-50/15">
                      {h}
                    </span>
                  ))}
                </div>

                <h4 className="mt-8 font-display text-lg font-semibold text-sand-50">{t.stays.chooseRoom}</h4>
                <div className="mt-4 space-y-4">
                  {house.rooms.map((room) => (
                    <div
                      key={room.id}
                      className={`group relative flex flex-col gap-4 overflow-hidden rounded-2xl p-4 transition-all duration-300 sm:flex-row sm:items-center ${
                        room.popular ? 'bg-sand-50/10 ring-2 ring-gold-400/60' : 'bg-sand-50/5 ring-1 ring-sand-50/10 hover:ring-sand-50/25'
                      }`}
                    >
                      <img src={room.image} alt={room.type} className="h-28 w-full rounded-xl object-cover sm:h-24 sm:w-32" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h5 className="font-display text-base font-semibold text-sand-50">{room.type}</h5>
                          {room.popular && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-gold-400/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-200">
                              <Star className="h-3 w-3 fill-gold-300 text-gold-300" /> {t.stays.popular}
                            </span>
                          )}
                        </div>
                        <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-sand-100/65">
                          <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {room.capacity} {t.stays.guests}</span>
                          <span className="flex items-center gap-1"><BedDouble className="h-3.5 w-3.5" /> {room.beds}</span>
                          <span className="flex items-center gap-1"><Maximize className="h-3.5 w-3.5" /> {room.size}</span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {room.amenities.slice(0, 4).map((am) => (
                            <span key={am} className="flex items-center gap-1 rounded-md bg-forest-800/60 px-2 py-0.5 text-[11px] text-sand-100/80">
                              <Check className="h-3 w-3 text-gold-300" />{am}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-row items-center justify-between gap-3 sm:flex-col sm:items-end">
                        <div className="text-left sm:text-right">
                          <div className="font-display text-lg font-semibold text-gold-200">{formatKES(room.pricePerNight)}</div>
                          <div className="text-xs text-sand-100/60">{t.stays.perNight.replace('/', '')}</div>
                        </div>
                        <button
                          onClick={() => setBooking({ house, room })}
                          className="inline-flex items-center justify-center rounded-full bg-gold-500 px-4 py-2 text-sm font-semibold text-forest-950 transition-all hover:bg-gold-400"
                        >
                          {t.stays.book}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {booking && <BookingModal house={booking.house} room={booking.room} onClose={() => setBooking(null)} />}
    </section>
  );
}
