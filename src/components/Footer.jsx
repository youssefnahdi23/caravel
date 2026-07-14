import { useI18n } from './I18nContext';

const base = import.meta.env.BASE_URL;

export function Footer({ studio = false }) {
  const { t } = useI18n();
  const homeLink = (hash = '') => studio ? `${base}${hash}` : hash || '#home';
  return (
    <footer className={`footer section-pad${studio ? ' studio-footer' : ''}`}>
      <div className="footer-brand"><img src={`${base}assets/caravel-lockup-white.png`} alt="Caravel" /><p>{t('Tunisia builds together.')}</p></div>
      <nav aria-label="Footer navigation">
        {studio && <a href={base}>{t('Home')}</a>}
        <a href={homeLink('#story')}>{t('Our story')}</a>
        {!studio && <a href="#what-we-do">{t('What we do')}</a>}
        <a href={homeLink('#founder')}>{t('Founder')}</a>
        {!studio && <a href={`${base}create-website.html`}>{t('Build a website')}</a>}
        <a href={homeLink('#join')}>{t('Join us')}</a>
      </nav>
      <div className="footer-contact"><span>{t(studio ? 'Start a conversation' : 'Say hello')}</span><a href="mailto:youssefnahdi95@gmail.com">youssefnahdi95@gmail.com</a><p>{t('Nabeul, Tunisia')}</p></div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Caravel</span><span>{t('Made with conviction in Tunisia.')}</span></div>
    </footer>
  );
}
