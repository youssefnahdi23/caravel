import { useEffect } from 'react';
import { Arrow } from './Icons';
import { useI18n } from './I18nContext';

const base = import.meta.env.BASE_URL;

export function PromoBanner({ promo }) {
  const { t } = useI18n();

  useEffect(() => {
    document.body.classList.toggle('promo-active', promo.isLive);
    return () => document.body.classList.remove('promo-active');
  }, [promo.isLive]);

  if (!promo.isLive) return null;

  return (
    <div className="promo-banner">
      <span className="promo-banner-eyebrow">{t('Launch offer')}</span>
      <span className="promo-banner-message">{t('15% off every package — 20% off our most popular picks.')}</span>
      <span className="promo-banner-countdown">
        {t('Ends in')}
        <b>{promo.days}</b>{t('days')}
        <b>{promo.hours}</b>{t('hours')}
        <b>{promo.minutes}</b>{t('minutes')}
      </span>
      <a className="promo-banner-cta" href={`${base}create-website.html`}>{t('See the offers')} <Arrow /></a>
    </div>
  );
}
