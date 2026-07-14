import { useI18n } from './I18nContext';

const languages = [['en', 'EN'], ['fr', 'FR'], ['ar', 'ع']];

export function LanguageSwitcher() {
  const { language, setLanguage } = useI18n();
  return (
    <div className="language-switcher" aria-label="Choose language" dir="ltr">
      {languages.map(([code, label]) => (
        <button key={code} type="button" className={language === code ? 'active' : ''} aria-pressed={language === code} onClick={() => setLanguage(code)}>{label}</button>
      ))}
    </div>
  );
}
