import { Footer } from '../components/Footer';
import { Arrow } from '../components/Icons';
import { useI18n } from '../components/I18nContext';
import { Nav } from '../components/Nav';

const base = import.meta.env.BASE_URL;
const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdK28y0qONP4DH1f8WGqLOdupxMurnnO5MM6s746aRrZHxPUQ/viewform';

const processSteps = [
  ['01', 'Tell us the idea', 'A short form helps us understand your goal, audience, and timeline.'],
  ['02', 'Shape the right scope', 'We turn your thoughts into a clear, focused plan for the build.'],
  ['03', 'Build & launch', 'A thoughtful website, made smooth, responsive, and ready to share.'],
];

const proofItems = [
  ['01', 'Made around your goal', 'No recycled template. The structure, story, and experience are shaped around what your project needs to achieve.'],
  ['02', 'Clear from day one', 'We agree on the scope, direction, and next steps before the build begins—so there are no mystery milestones.'],
  ['03', 'Ready for real people', 'Responsive, thoughtful, and launch-ready. Your website will feel right on phones, laptops, and everything between.'],
];

export function StudioPage() {
  const { t } = useI18n();
  return (
    <main>
      <Nav studio />
      <section className="website-service section-pad" id="website-service">
        <div className="service-orbit" aria-hidden="true"><i /><i /><i /></div>
        <div className="website-service-copy">
          <a className="back-home" href={base}>{t('← Back to Caravel')}</a>
          <p className="eyebrow">{t('Caravel Studio · Now open')}</p>
          <h1>{t('Your idea deserves')}<br /><span>{t('a website that moves.')}</span></h1>
          <p>{t("Need a landing page, a startup website, or a new feature for something you've already built? Tell us what you have in mind. We'll help shape it, build it, and get it online.")}</p>
          <a className="button studio-button" href={formUrl} target="_blank" rel="noreferrer">{t('Create your website')} <Arrow /></a>
          <small>{t('Share your idea in 2 minutes · No technical brief needed')}</small>
        </div>
        <div className="website-service-panel">
          <div className="service-panel-head"><span>{t('From idea to online')}</span><b>↗</b></div>
          <ol>{processSteps.map(([number, title, body]) => <li key={number}><span>{number}</span><div><h2>{t(title)}</h2><p>{t(body)}</p></div></li>)}</ol>
          <div className="service-types"><span>{t('Landing pages')}</span><span>{t('Startup sites')}</span><span>{t('New features')}</span></div>
        </div>
      </section>
      <section className="studio-proof section-pad">{proofItems.map(([number, title, body]) => <div key={number}><span className="proof-number">{number}</span><h2>{t(title)}</h2><p>{t(body)}</p></div>)}</section>
      <Footer studio />
    </main>
  );
}
