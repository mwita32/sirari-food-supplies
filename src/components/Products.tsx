import { useEffect, useMemo, useState } from 'react';
import { Check, Minus, Package, Plus, ShoppingBag, X, MapPin, CreditCard, Navigation } from 'lucide-react';
import { riceProducts, paymentMethods, branchLocations } from '@/data/catalog';
import { formatKES } from '@/lib/format';
import { useReveal } from '@/hooks/useReveal';
import { supabase } from '@/lib/supabase';
import { useLang } from '@/contexts/LanguageContext';
import type { OrderPayload, RiceProduct } from '@/types';

const accentMap = {
  forest: { chip: 'bg-forest-100 text-forest-700', btn: 'bg-forest-700 hover:bg-forest-600', ring: 'ring-forest-300', soft: 'bg-forest-50' },
  gold: { chip: 'bg-gold-100 text-gold-700', btn: 'bg-gold-600 hover:bg-gold-500', ring: 'ring-gold-300', soft: 'bg-gold-50' },
  clay: { chip: 'bg-clay-100 text-clay-700', btn: 'bg-clay-600 hover:bg-clay-500', ring: 'ring-clay-300', soft: 'bg-clay-50' },
} as const;

export default function Products() {
  const { t } = useLang();
  const { ref, visible } = useReveal();
  const [order, setOrder] = useState<{
    product: RiceProduct;
    size: string;
    price: number;
  } | null>(null);

  return (
    <section id="products" className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div ref={ref} className={`mx-auto max-w-2xl text-center ${visible ? 'animate-fade-up' : 'opacity-0'}`}>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
            {t.products.sectionLabel}
          </span>
          <h2 className="mt-3 text-balance font-display text-4xl font-semibold text-forest-900 sm:text-5xl">
            {t.products.headline}
          </h2>
          <p className="mt-5 text-lg text-forest-700/80">
            {t.products.body}
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {riceProducts.map((p, i) => {
            const a = accentMap[p.accent];
            const cheapest = Math.min(...p.packages.map((pk) => pk.price));
            return (
              <article
                key={p.id}
                className={`group flex flex-col overflow-hidden rounded-3xl bg-sand-50 shadow-soft ring-1 ring-forest-100/60 transition-all duration-500 hover:shadow-lift ${visible ? 'animate-fade-up' : 'opacity-0'}`}
                style={{ animationDelay: `${0.1 + i * 0.12}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/45 to-transparent" />
                  <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${a.chip}`}>
                    {p.grade}
                  </span>
                  <span className="absolute right-4 top-4 rounded-full bg-sand-50/90 px-3 py-1 text-xs font-semibold text-forest-700">
                    {t.products.rawBadge}
                  </span>
                  <div className="absolute bottom-4 left-4 right-4 text-sand-50">
                    <h3 className="font-display text-2xl font-semibold">{p.name}</h3>
                    <p className="text-sm text-sand-100/90">{p.tagline}</p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm leading-relaxed text-forest-700/85">{p.description}</p>

                  <ul className="mt-5 grid grid-cols-2 gap-2">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-1.5 text-sm text-forest-700">
                        <Check className={`h-4 w-4 ${a.chip.split(' ')[1]}`} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-forest-500">
                        {t.products.packSizes}
                      </span>
                      <span className="text-xs text-forest-500">{t.products.from} {formatKES(cheapest)}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {p.packages.map((pk) => (
                        <button
                          key={pk.size}
                          onClick={() => setOrder({ product: p, size: pk.size, price: pk.price })}
                          className="group/pkg inline-flex items-center gap-1.5 rounded-xl border border-forest-200 bg-white px-3 py-2 text-sm font-medium text-forest-800 transition-all hover:border-forest-700 hover:bg-forest-700 hover:text-white"
                        >
                          <Package className="h-4 w-4 text-forest-400 group-hover/pkg:text-white" />
                          {pk.size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setOrder({ product: p, size: p.packages[0].size, price: p.packages[0].price })}
                    className={`mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all ${a.btn}`}
                  >
                    <ShoppingBag className="h-4 w-4" />
                    {t.products.orderBtn}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-forest-500">
          {t.products.footNote}
        </p>
      </div>

      {order && <OrderModal order={order} onClose={() => setOrder(null)} />}
    </section>
  );
}

function OrderModal({
  order,
  onClose,
}: {
  order: { product: RiceProduct; size: string; price: number };
  onClose: () => void;
}) {
  const { t } = useLang();
  const product = order.product;
  const [selectedSize, setSelectedSize] = useState(order.size);
  const [cart, setCart] = useState<Record<string, number>>({ [order.size]: 1 });
  const [branch, setBranch] = useState<'tanzania' | 'kenya'>('tanzania');
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const currentQty = cart[selectedSize] ?? 0;

  const cartItems = useMemo(
    () =>
      product.packages
        .filter((pk) => (cart[pk.size] ?? 0) > 0)
        .map((pk) => ({ size: pk.size, price: pk.price, qty: cart[pk.size] ?? 0 })),
    [cart, product.packages]
  );

  const grandTotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  function setQty(size: string, delta: number) {
    setCart((prev) => {
      const next = Math.max(0, Math.min(99, (prev[size] ?? 0) + delta));
      if (next === 0) {
        const rest = { ...prev };
        delete rest[size];
        return rest;
      }
      return { ...prev, [size]: next };
    });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');

    if (cartItems.length === 0) {
      setStatus('error');
      setErrorMsg('Please add at least one item to your order.');
      return;
    }
    if (!paymentMethod) {
      setStatus('error');
      setErrorMsg(t.order.paymentError);
      return;
    }

    setStatus('loading');

    // Save each line item to Supabase
    const rows: OrderPayload[] = cartItems.map((item) => ({
      customer_name: name.trim(),
      customer_phone: phone.trim(),
      rice_grade: product.grade,
      package_size: item.size,
      quantity: item.qty,
      unit_price: item.price,
      total_price: item.price * item.qty,
      delivery_notes: notes.trim(),
      branch,
      payment_method: paymentMethod,
      pickup_location: null,
    }));
    await supabase.from('order_requests').insert(rows);

    // Build WhatsApp message
    const itemLines = cartItems
      .map((item) => `  • ${item.qty} x ${item.size} @ KES ${item.price.toLocaleString()} = KES ${(item.price * item.qty).toLocaleString()}`)
      .join('\n');
    const paymentLine = `\nPayment: ${paymentMethods.find((m) => m.id === paymentMethod)?.label}`;
    const notesLine = notes.trim() ? `\nDelivery destination: ${notes.trim()}` : '';
    const msg = [
      `*NEW ORDER — Sirari Food Supplies*`,
      ``,
      `Customer: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      `Product: ${product.name}`,
      `Branch: ${branch === 'tanzania' ? 'Tanzania' : 'Kenya'}`,
      ``,
      `*Items Ordered:*`,
      itemLines,
      ``,
      `*TOTAL: KES ${grandTotal.toLocaleString()}*`,
      `${paymentLine}${notesLine}`,
    ].join('\n');

    window.open(`https://wa.me/254700011899?text=${encodeURIComponent(msg)}`, '_blank');
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-forest-950/60 backdrop-blur-sm p-0 sm:items-center sm:p-6 animate-fade-in" onClick={onClose}>
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-t-3xl bg-white shadow-lift sm:rounded-3xl animate-scale-in max-h-[94vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <>
          <div className="relative h-32 overflow-hidden">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 to-transparent" />
            <button
              onClick={onClose}
              className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-sand-50/20 text-sand-50 backdrop-blur transition-colors hover:bg-sand-50/30"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="absolute bottom-3 left-5 text-sand-50">
              <h3 className="font-display text-xl font-semibold">{product.name}</h3>
              <p className="text-sm text-sand-100/85">{product.grade} {t.order.gradeBadge}</p>
            </div>
          </div>

          <form onSubmit={submit} className="p-6">
            {/* Branch */}
            <label className="block text-xs font-semibold uppercase tracking-wider text-forest-500">
              {t.order.chooseBranch}
            </label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(['tanzania', 'kenya'] as const).map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBranch(b)}
                  className={`rounded-xl border px-4 py-3 text-left transition-all ${
                    branch === b ? 'border-forest-700 bg-forest-700 text-white' : 'border-forest-200 bg-white text-forest-800 hover:border-forest-400'
                  }`}
                >
                  <div className="text-sm font-semibold">{b === 'tanzania' ? t.order.tanzaniaLabel : t.order.kenyaLabel}</div>
                  <div className={`text-xs ${branch === b ? 'text-sand-100/80' : 'text-forest-500'}`}>
                    {b === 'tanzania' ? t.order.tanzaniaNote : t.order.kenyaNote}
                  </div>
                </button>
              ))}
            </div>

            {/* Package size selector */}
            <label className="mt-5 block text-xs font-semibold uppercase tracking-wider text-forest-500">
              {t.order.packageSize}
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.packages.map((pk) => {
                const inCart = (cart[pk.size] ?? 0) > 0;
                return (
                  <button
                    key={pk.size}
                    type="button"
                    onClick={() => setSelectedSize(pk.size)}
                    className={`relative rounded-xl border px-3 py-2 text-sm font-medium transition-all ${
                      selectedSize === pk.size
                        ? 'border-forest-700 bg-forest-700 text-white'
                        : 'border-forest-200 bg-white text-forest-800 hover:border-forest-400'
                    }`}
                  >
                    {pk.size}
                    {inCart && (
                      <span className="absolute -right-1.5 -top-1.5 grid h-4 w-4 place-items-center rounded-full bg-gold-400 text-[10px] font-bold text-forest-950">
                        {cart[pk.size]}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quantity for selected size */}
            <div className="mt-4 flex items-center gap-4">
              <label className="text-xs font-semibold uppercase tracking-wider text-forest-500">
                {t.order.quantity} ({selectedSize})
              </label>
              <div className="inline-flex items-center rounded-xl border border-forest-200 bg-white">
                <button type="button" onClick={() => setQty(selectedSize, -1)} className="grid h-10 w-10 place-items-center text-forest-600 hover:bg-forest-50 rounded-l-xl">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-semibold text-forest-900">{currentQty}</span>
                <button type="button" onClick={() => setQty(selectedSize, 1)} className="grid h-10 w-10 place-items-center text-forest-600 hover:bg-forest-50 rounded-r-xl">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Cart line items */}
            {cartItems.length > 0 && (
              <div className="mt-5 rounded-2xl bg-sand-50 p-4 ring-1 ring-forest-100">
                <div className="text-xs font-semibold uppercase tracking-wider text-forest-500 mb-3">Your Order</div>
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.size} className="flex items-center justify-between text-sm">
                      <span className="text-forest-700">
                        {item.qty} × {item.size} <span className="text-forest-400">@ {formatKES(item.price)}</span>
                      </span>
                      <span className="font-semibold text-forest-900">{formatKES(item.price * item.qty)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-forest-200 pt-3">
                  <span className="font-semibold text-forest-900">Total</span>
                  <span className="font-display text-xl font-semibold text-forest-900">{formatKES(grandTotal)}</span>
                </div>
              </div>
            )}

            {/* Payment methods — both branches */}
            <div className="mt-5 rounded-2xl bg-sand-50 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest-600">
                <CreditCard className="h-4 w-4" /> {t.order.paymentMethod}
              </div>
              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                {paymentMethods.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id)}
                    className={`rounded-xl border px-3 py-2.5 text-left transition-all ${
                      paymentMethod === m.id ? 'border-forest-700 bg-forest-700 text-white' : 'border-forest-200 bg-white text-forest-800 hover:border-forest-400'
                    }`}
                  >
                    <div className="text-sm font-semibold">{m.label}</div>
                    <div className={`text-[11px] ${paymentMethod === m.id ? 'text-sand-100/75' : 'text-forest-500'}`}>{m.note}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Shop location — map link */}
            <div className="mt-4 rounded-2xl bg-sand-50 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest-600">
                <MapPin className="h-4 w-4" /> {t.order.shopLocation}
              </div>
              <div className="mt-2 flex items-center justify-between rounded-xl border border-forest-200 bg-white px-4 py-3">
                <div>
                  <div className="text-sm font-semibold text-forest-900">{branchLocations[branch].label}</div>
                  <div className="text-xs text-forest-500">{branchLocations[branch].address}</div>
                </div>
                <a
                  href={branchLocations[branch].mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-forest-700 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-forest-600"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  {t.order.viewMap}
                </a>
              </div>
            </div>

            {/* Contact */}
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-forest-500">{t.order.fullName}</label>
                <input required value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5 w-full rounded-xl border border-forest-200 bg-white px-4 py-2.5 text-forest-900 outline-none transition-colors focus:border-forest-500 focus:ring-2 focus:ring-forest-200" placeholder={t.order.namePlaceholder} />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-forest-500">{t.order.phone}</label>
                <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1.5 w-full rounded-xl border border-forest-200 bg-white px-4 py-2.5 text-forest-900 outline-none transition-colors focus:border-forest-500 focus:ring-2 focus:ring-forest-200" placeholder={t.order.phonePlaceholder} />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-forest-500">
                {branch === 'kenya' ? t.order.deliveryNotes : t.order.deliveryAddress}
              </label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className="mt-1.5 w-full rounded-xl border border-forest-200 bg-white px-4 py-2.5 text-forest-900 outline-none transition-colors focus:border-forest-500 focus:ring-2 focus:ring-forest-200" placeholder={branch === 'kenya' ? t.order.deliveryNotesPlaceholder : t.order.deliveryAddressPlaceholder} />
            </div>

            {status === 'error' && (
              <p className="mt-4 rounded-xl bg-clay-50 px-4 py-3 text-sm text-clay-700">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading' || cartItems.length === 0}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-base font-semibold text-white transition-all hover:bg-[#1ebe5b] disabled:opacity-60"
            >
              {status === 'loading'
                ? t.order.submitting
                : `${t.order.submitBtn}${grandTotal > 0 ? ` — ${formatKES(grandTotal)}` : ''}`}
            </button>
            <p className="mt-3 text-center text-xs text-forest-500">
              {branch === 'kenya' ? t.order.kenyaNote2 : t.order.tanzaniaNote2}
            </p>
            </form>
        </>
      </div>
    </div>
  );
}
