import { useEffect, useState } from 'react';

export const PROMO_END = new Date('2026-09-29T22:59:59Z'); // 23:59:59 Tunisia time (UTC+1)
export const DEFAULT_DISCOUNT = 0.15;

export function isPromoLive(now = Date.now()) {
  return now < PROMO_END.getTime();
}

export function parseDT(priceString) {
  return Number(priceString.replace(/[^0-9]/g, ''));
}

export function formatDT(amount) {
  return `${Math.round(amount).toLocaleString('en-US')} DT`;
}

export function getDiscountRate(service) {
  return service.promoRate ?? DEFAULT_DISCOUNT;
}

export function getDiscountedPrice(service) {
  return formatDT(parseDT(service.price) * (1 - getDiscountRate(service)));
}

function getCountdownParts(now = Date.now()) {
  const diff = Math.max(0, PROMO_END.getTime() - now);
  const minutesTotal = Math.floor(diff / 60000);
  return { days: Math.floor(minutesTotal / 1440), hours: Math.floor((minutesTotal % 1440) / 60), minutes: minutesTotal % 60 };
}

export function usePromoStatus() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(id);
  }, []);
  const live = isPromoLive(now);
  return { isLive: live, ...(live ? getCountdownParts(now) : { days: 0, hours: 0, minutes: 0 }) };
}
