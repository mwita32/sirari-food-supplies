import { useReveal } from '@/hooks/useReveal';
import { guestHouses } from '@/data/catalog';
import { formatKES } from '@/lib/format';
import { ArrowRight, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useLang } from '@/contexts/LanguageContext';
import BookingModal from '@/components/BookingModal';
import type { GuestHouse, Room } from '@/types';

export default function BookingCTA() {
  const { t } = useLang();
  const { ref, visible } = useReveal();
  const [booking, setBooking] = useState<{ house: GuestHouse; room: Room } | null>(null);

  return (
    <section id="booking" className="relative bg-sand-100 py-24 sm:py-32 bg-grain">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div ref={ref} className={`mx-auto max-w-2xl text-center ${visible ? 'animate-fade-up' : 'opacity-0'}`}>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
            {t.bookingCTA.sectionLabel}
          </span>
          <h2 className="mt-3 text-balance font-display text-4xl font-semibold text-forest-900 sm:text-5xl">
            {t.bookingCTA.headline}
          </h2>
          <p className="mt-5 text-lg text-forest-700/80">
            {t.bookingCTA.body}
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {guestHouses.map((house, i) => (
            <div
              key={house.id}
              className={`group overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-forest-100/60 transition-all duration-500 hover:shadow-lift ${visible ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${0.1 + i * 0.12}s` }}
            >
              <div className="relative h-52 overflow-hidden">
                <img src={house.image} alt={house.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 to-transparent" />
                <div className="absolute bottom-4 left-5 text-sand-50">
                  <h3 className="font-display text-2xl font-semibold">{house.name}</h3>
                  <p className="mt-0.5 flex items-center gap-1.5 text-sm text-sand-100/85">
                    <MapPin className="h-4 w-4 text-gold-300" />{house.location}
                  </p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-forest-500">{t.stays.from}</div>
                    <div className="font-display text-2xl font-semibold text-forest-900">{formatKES(house.startingPrice)}<span className="text-sm font-normal text-forest-500">{t.stays.perNight}</span></div>
                  </div>
                  <span className="text-sm text-forest-500">{house.rooms.length} {t.bookingCTA.roomTypes}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {house.highlights.slice(0, 3).map((h) => (
                    <span key={h} className="rounded-full bg-forest-50 px-3 py-1 text-xs font-medium text-forest-700">{h}</span>
                  ))}
                </div>
                <button
                  onClick={() => setBooking({ house, room: house.rooms[1] ?? house.rooms[0] })}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-forest-700 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-forest-600"
                >
                  {t.bookingCTA.checkAvailability} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {booking && <BookingModal house={booking.house} room={booking.room} onClose={() => setBooking(null)} />}
    </section>
  );
}
