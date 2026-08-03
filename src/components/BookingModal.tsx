import { useEffect, useMemo, useState } from 'react';
import { Calendar, MessageCircle, X } from 'lucide-react';
import { formatKES, nightsBetween, todayISO, addDaysISO } from '@/lib/format';
import { useLang } from '@/contexts/LanguageContext';
import type { GuestHouse, Room } from '@/types';

function buildWhatsAppUrl(waNumber: string, msg: string) {
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
}

function buildMessage(name: string, phone: string, house: GuestHouse, room: Room, checkIn: string, checkOut: string, guests: number, nights: number, total: number) {
  return [
    `Hello ${house.name}!`,
    ``,
    `I would like to request a room booking. Please find my details below:`,
    ``,
    `*Guest Name:* ${name}`,
    `*Phone:* ${phone}`,
    `*Room Type:* ${room.type}`,
    `*Check-in:* ${checkIn}`,
    `*Check-out:* ${checkOut}`,
    `*Guests:* ${guests}`,
    `*Nights:* ${nights}`,
    `*Estimated Total:* KES ${total.toLocaleString()}`,
    ``,
    `Please confirm availability. Thank you!`,
  ].join('\n');
}

export default function BookingModal({
  house,
  room,
  onClose,
}: {
  house: GuestHouse;
  room: Room;
  onClose: () => void;
}) {
  const { t } = useLang();
  const [checkIn, setCheckIn] = useState(todayISO());
  const [checkOut, setCheckOut] = useState(addDaysISO(todayISO(), 1));
  const [guests, setGuests] = useState(Math.min(2, room.capacity));
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const nights = useMemo(() => nightsBetween(checkIn, checkOut), [checkIn, checkOut]);
  const total = nights * room.pricePerNight;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  function adjustGuests(delta: number) {
    setGuests((g) => Math.max(1, Math.min(room.capacity, g + delta)));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');

    if (nights < 1) {
      setErrorMsg(t.booking.datesError);
      return;
    }

    const msg = buildMessage(name.trim(), phone.trim(), house, room, checkIn, checkOut, guests, nights, total);
    const numbers = house.whatsappNumbers;
    window.open(buildWhatsAppUrl(numbers[0], msg), '_blank');
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-forest-950/60 backdrop-blur-sm p-0 sm:items-center sm:p-6 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-t-3xl bg-sand-50 shadow-lift sm:rounded-3xl animate-scale-in max-h-[94vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative h-28 overflow-hidden">
          <img src={room.image} alt={room.type} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 to-transparent" />
          <button
            onClick={onClose}
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-sand-50/20 text-sand-50 backdrop-blur transition-colors hover:bg-sand-50/30"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="absolute bottom-3 left-5 right-5 text-sand-50">
            <div className="text-xs text-sand-100/80">{house.name}</div>
            <h3 className="font-display text-xl font-semibold">{room.type}</h3>
          </div>
        </div>

        <form onSubmit={submit} className="p-6">
          {/* Dates */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-forest-500">{t.booking.checkIn}</label>
              <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-forest-200 bg-white px-3">
                <Calendar className="h-4 w-4 text-forest-400" />
                <input
                  type="date"
                  min={todayISO()}
                  value={checkIn}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                    if (e.target.value >= checkOut) setCheckOut(addDaysISO(e.target.value, 1));
                  }}
                  className="w-full bg-transparent py-2.5 text-forest-900 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-forest-500">{t.booking.checkOut}</label>
              <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-forest-200 bg-white px-3">
                <Calendar className="h-4 w-4 text-forest-400" />
                <input
                  type="date"
                  min={addDaysISO(checkIn, 1)}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-transparent py-2.5 text-forest-900 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Guests */}
          <div className="mt-4">
            <label className="block text-xs font-semibold uppercase tracking-wider text-forest-500">
              {t.booking.guests} <span className="font-normal text-forest-400">({t.booking.maxGuests} {room.capacity})</span>
            </label>
            <div className="mt-1.5 inline-flex items-center rounded-xl border border-forest-200 bg-white">
              <button type="button" onClick={() => adjustGuests(-1)} className="grid h-11 w-11 place-items-center text-forest-600 hover:bg-forest-50">–</button>
              <span className="w-14 text-center font-semibold text-forest-900">{guests}</span>
              <button type="button" onClick={() => adjustGuests(1)} className="grid h-11 w-11 place-items-center text-forest-600 hover:bg-forest-50">+</button>
            </div>
          </div>

          {/* Contact */}
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-forest-500">{t.booking.fullName}</label>
              <input required value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5 w-full rounded-xl border border-forest-200 bg-white px-4 py-2.5 text-forest-900 outline-none transition-colors focus:border-forest-500 focus:ring-2 focus:ring-forest-200" placeholder={t.order.namePlaceholder} />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-forest-500">{t.booking.phone}</label>
              <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1.5 w-full rounded-xl border border-forest-200 bg-white px-4 py-2.5 text-forest-900 outline-none transition-colors focus:border-forest-500 focus:ring-2 focus:ring-forest-200" placeholder={t.order.phonePlaceholder} />
            </div>
          </div>

          {/* Error */}
          {errorMsg && (
            <p className="mt-4 rounded-xl bg-clay-50 px-4 py-3 text-sm text-clay-700">{errorMsg}</p>
          )}

          {/* Summary */}
          <div className="mt-6 rounded-2xl bg-white p-5 ring-1 ring-forest-100">
            <div className="flex items-center justify-between text-sm text-forest-600">
              <span>{formatKES(room.pricePerNight)} × {nights} {nights > 1 ? t.booking.nightsLabel : t.booking.nightLabel}</span>
              <span>{formatKES(total)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-forest-100 pt-2">
              <span className="font-semibold text-forest-900">{t.booking.estimatedTotal}</span>
              <span className="font-display text-xl font-semibold text-forest-900">{formatKES(total)}</span>
            </div>
          </div>

          {/* WhatsApp numbers hint */}
          <div className="mt-4 rounded-xl bg-forest-50 px-4 py-3 text-sm text-forest-700">
            <span className="font-semibold">{house.name} WhatsApp:</span>{' '}
            {house.whatsappNumbers.map((n, i) => (
              <span key={n}>
                {i > 0 && ' / '}+{n}
              </span>
            ))}
          </div>

          <button
            type="submit"
            disabled={nights < 1}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-base font-semibold text-white transition-all hover:bg-[#1ebe5b] disabled:opacity-60"
          >
            <MessageCircle className="h-5 w-5" />
            {t.booking.requestBooking}
          </button>
          <p className="mt-3 text-center text-xs text-forest-500">
            {t.booking.noPayment}
          </p>
        </form>
      </div>
    </div>
  );
}
