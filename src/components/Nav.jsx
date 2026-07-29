import { useState } from 'react';
import { useI18n } from './I18nContext';
import { LanguageSwitcher } from './LanguageSwitcher';

const base = import.meta.env.BASE_URL;

export function Nav({ studio = false }) {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();
  const homeLink = (hash) => studio ? `${base}?section=${hash.slice(1)}` : hash;

  return (
    <header className={`nav-wrap${studio ? ' service-nav' : ''}`}>
      <a href={studio ? base : '#home'} className="brand" aria-label="Caravel home"><img src={`${base}assets/caravel-lockup-white.png`} alt="Caravel" /></a>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu"><span /><span /></button>
      <nav className={`main-nav${open ? ' open' : ''}`} aria-label="Main navigation">
        <a href={homeLink('#story')} onClick={() => setOpen(false)}>{t('Our story')}</a>
        <a href={homeLink('#what-we-do')} onClick={() => setOpen(false)}>{t('What we do')}</a>
        <a href={homeLink('#founder')} onClick={() => setOpen(false)}>{t('Founder')}</a>
        {!studio && <a href={`${base}create-website.html`} onClick={() => setOpen(false)}>{t('Build your web/mobile app')}</a>}
        <LanguageSwitcher />
        <a href={homeLink('#join')} onClick={() => setOpen(false)} className="nav-cta">{t('Join the crew')} <span>↗</span></a>
      </nav>
    </header>
  );
}
