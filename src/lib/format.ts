const TSH_RATE = 20.00;

export function formatKES(amount: number): string {
  return 'KES ' + amount.toLocaleString('en-KE');
}

export function formatTSh(amount: number): string {
  return 'TSh ' + Math.round(amount * TSH_RATE).toLocaleString('en-KE');
}

export function todayISO(): string {
  return new Date().toISOString().split('T')[0];
}

export function addDaysISO(iso: string, days: number): string {
  const d = new Date(iso + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const a = new Date(checkIn + 'T00:00:00').getTime();
  const b = new Date(checkOut + 'T00:00:00').getTime();
  const diff = Math.round((b - a) / 86400000);
  return diff > 0 ? diff : 0;
}
