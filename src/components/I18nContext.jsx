import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from '../translations';

const I18nContext = createContext(null);
const supportedLanguages = ['en', 'fr', 'ar'];

function getInitialLanguage() {
  const queryLanguage = new URLSearchParams(window.location.search).get('lang');
  const savedLanguage = localStorage.getItem('caravel-language');
  return supportedLanguages.includes(queryLanguage)
    ? queryLanguage
    : supportedLanguages.includes(savedLanguage) ? savedLanguage : 'en';
}

export function I18nProvider({ children, studioPage }) {
  const [language, setLanguage] = useState(getInitialLanguage);
  const t = useCallback((text) => translations[language]?.[text] || text, [language]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('service-page', studioPage);
    document.title = t(studioPage
      ? 'Create your website — Caravel Studio'
      : 'Caravel — Tunisia builds together');
    localStorage.setItem('caravel-language', language);
    const url = new URL(window.location.href);
    url.searchParams.set('lang', language);
    history.replaceState({}, '', url);
  }, [language, studioPage, t]);

  const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used inside I18nProvider');
  return context;
}
