import { useEffect, useRef, useState } from 'react';
import { Footer } from '../components/Footer';
import { Arrow } from '../components/Icons';
import { useI18n } from '../components/I18nContext';
import { Nav } from '../components/Nav';

const base = import.meta.env.BASE_URL;

const services = {
  websites: [
    {
      name: 'Showcase website', price: '500 DT', accent: 'coral',
      description: 'A clear, credible online presence for your business.',
      features: ['Domain name for 1 year', 'Up to 5 pages', 'Mobile-friendly design', 'Contact form & Google Maps', 'Basic search visibility'],
    },
    {
      name: 'E-commerce website', price: '750 DT', accent: 'blue',
      description: 'Everything you need to present and start selling your products.',
      features: ['Domain name for 1 year', 'Browsable product catalogue', 'Product & category pages', 'Cart and order requests', 'Simple management space'],
    },
    {
      name: 'Online platform', price: '1,500 DT', accent: 'mint',
      description: 'A custom web product built around your business workflow.',
      features: ['Customer accounts', 'Secure database', 'User dashboard', 'Administration space', 'One custom business workflow'],
    },
    {
      name: 'E-commerce + AI chatbot', price: '1,200 DT', accent: 'violet', badge: 'Popular',
      description: 'An online shop with an assistant that helps visitors choose.',
      features: ['Everything in E-commerce', 'AI product assistant', 'Catalogue-aware answers', 'Lead collection', 'Conversation insights'],
    },
  ],
  mobile: [
    {
      name: 'Business mobile app', price: '1,200 DT', accent: 'coral',
      description: 'Put your services, news, and contact details in your customers’ pockets.',
      features: ['Android app', 'Branded design', 'Services or catalogue', 'Contact & map', 'Store publication support'],
    },
    {
      name: 'Catalogue mobile app', price: '1,800 DT', accent: 'blue',
      description: 'Let customers browse your products from a fast, branded app.',
      features: ['Android app', 'Browsable catalogue', 'Search and categories', 'Product details', 'Request an order'],
    },
    {
      name: 'E-commerce mobile app', price: '2,500 DT', accent: 'mint', badge: 'Popular',
      description: 'A complete mobile storefront made for repeat customers.',
      features: ['Android app', 'Customer accounts', 'Cart and checkout', 'Order tracking', 'Push notifications'],
    },
    {
      name: 'Custom mobile app', price: '3,500 DT', accent: 'violet',
      description: 'A made-to-measure app for a unique service or workflow.',
      features: ['Android app', 'Secure accounts', 'Cloud database', 'Admin dashboard', 'One custom business workflow'],
    },
  ],
};

const businessTypes = ['Retail', 'Services', 'Restaurant & hospitality', 'Health & beauty', 'Education', 'Other'];

function ServiceCard({ service, onSelect, t }) {
  return (
    <article className={`package-card ${service.accent}`}>
      <div className="package-topline">
        <span>{t('Starting from')}</span>
        {service.badge && <b>{t(service.badge)}</b>}
      </div>
      <div className="package-price">{service.price}</div>
      <h3>{t(service.name)}</h3>
      <p>{t(service.description)}</p>
      <ul>{service.features.map((feature) => <li key={feature}><span>✓</span>{t(feature)}</li>)}</ul>
      <button type="button" className="package-action" onClick={() => onSelect(service)}>
        {t('Choose this package')} <Arrow />
      </button>
    </article>
  );
}

function RequestForm({ selected, onClose }) {
  const { language, t } = useI18n();
  const [sent, setSent] = useState(false);
  const firstInput = useRef(null);

  useEffect(() => {
    setSent(false);
    requestAnimationFrame(() => firstInput.current?.focus({ preventScroll: true }));
  }, [selected]);

  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const copy = {
      en: { subject: `Project request — ${t(selected.name)}`, intro: 'Hello Youssef, I would like to discuss this package.' },
      fr: { subject: `Demande de projet — ${t(selected.name)}`, intro: 'Bonjour Youssef, je souhaite discuter de cette formule.' },
      ar: { subject: `طلب مشروع — ${t(selected.name)}`, intro: 'مرحبًا يوسف، أود مناقشة هذه الباقة.' },
    }[language];
    const body = `${copy.intro}\n\n${t('Selected package')}: ${t(selected.name)} (${t('Starting from')} ${selected.price})\n${t('Name')}: ${data.get('name')}\n${t('Contact details')}: ${data.get('contact')}\n${t('Business type')}: ${t(data.get('business'))}\n${t('Business name')}: ${data.get('company') || '—'}`;
    window.location.href = `mailto:youssefnahdi95@gmail.com?subject=${encodeURIComponent(copy.subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section className="package-request section-pad" id="project-request">
      <div className="request-copy">
        <p className="eyebrow">{t('Your project')}</p>
        <h2>{t('A few details.')}<br /><span>{t('Then we talk.')}</span></h2>
        <p>{t('No long brief. Tell us how to reach you and we will confirm the scope, final price, and timeline together.')}</p>
        <div className="selected-package"><small>{t('Selected package')}</small><strong>{t(selected.name)}</strong><span>{t('Starting from')} {selected.price}</span></div>
      </div>
      {sent ? (
        <div className="request-success"><span>✓</span><h3>{t('Your request is ready.')}</h3><p>{t('Your email app is opening. Send the prepared message and we will get back to you.')}</p><button type="button" onClick={() => setSent(false)}>{t('Edit details')}</button></div>
      ) : (
        <form className="request-form" onSubmit={submit}>
          <button className="request-close" type="button" onClick={onClose} aria-label={t('Close form')}>×</button>
          <label><span>{t('Name')}</span><input ref={firstInput} name="name" type="text" placeholder={t('Your full name')} required /></label>
          <label><span>{t('Contact details')}</span><input name="contact" type="text" placeholder={t('Phone number or email')} required /></label>
          <label><span>{t('Business type')}</span><select name="business" defaultValue="" required><option value="" disabled>{t('Choose one')}</option>{businessTypes.map((type) => <option key={type} value={type}>{t(type)}</option>)}</select></label>
          <label><span>{t('Business name')} <i>{t('Optional')}</i></span><input name="company" type="text" placeholder={t('What is it called?')} /></label>
          <button className="button studio-button" type="submit">{t('Send my request')} <Arrow /></button>
          <small>{t('No commitment · We reply within 1 business day')}</small>
        </form>
      )}
    </section>
  );
}

export function StudioPage() {
  const { t } = useI18n();
  const [category, setCategory] = useState('websites');
  const [selected, setSelected] = useState(null);

  function selectService(service) {
    setSelected(service);
    requestAnimationFrame(() => document.getElementById('project-request')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }

  function changeCategory(next) {
    setCategory(next);
    setSelected(null);
  }

  return (
    <main>
      <Nav studio />
      <section className="studio-hero section-pad">
        <div className="studio-hero-copy">
          <a className="back-home" href={base}>{t('← Back to Caravel')}</a>
          <p className="eyebrow">{t('Simple offers · Clear prices')}</p>
          <h1>{t('Choose what you need.')}<br /><span>{t('Know where you start.')}</span></h1>
          <p>{t('Browse our ready-to-adapt packages for websites and mobile apps. Every project is tailored to your brand, with a clear starting price.')}</p>
          <a className="button studio-button" href="#packages">{t('Browse packages')} <Arrow down /></a>
        </div>
        <div className="price-promise">
          <span>{t('Our price promise')}</span>
          <strong>{t('Clear before we build.')}</strong>
          <p>{t('You receive a final quote after a short call. Nothing starts until the scope and price are approved.')}</p>
          <div><b>01</b>{t('Choose a package')}</div><div><b>02</b>{t('Share your contact')}</div><div><b>03</b>{t('Confirm the quote')}</div>
        </div>
      </section>

      <section className="packages section-pad" id="packages">
        <div className="packages-heading">
          <div><p className="section-kicker"><span>01</span> {t('Our packages')}</p><h2>{t('Start with the right')}<br />{t('foundation.')}</h2></div>
          <p>{t('The prices below are starting estimates in Tunisian dinars. Your final quote depends only on the features you choose.')}</p>
        </div>
        <div className="category-tabs" role="tablist" aria-label={t('Project category')}>
          <button type="button" role="tab" aria-selected={category === 'websites'} className={category === 'websites' ? 'active' : ''} onClick={() => changeCategory('websites')}><span>⌘</span><b>{t('Websites')}</b><small>4 {t('packages')}</small></button>
          <button type="button" role="tab" aria-selected={category === 'mobile'} className={category === 'mobile' ? 'active' : ''} onClick={() => changeCategory('mobile')}><span>▯</span><b>{t('Mobile apps')}</b><small>4 {t('packages')}</small></button>
        </div>
        <div className="package-grid" role="tabpanel">{services[category].map((service) => <ServiceCard key={service.name} service={service} onSelect={selectService} t={t} />)}</div>
        <p className="package-note">{t('Hosting, paid third-party services, and advertising budgets are quoted separately when needed.')}</p>
      </section>

      {selected && <RequestForm selected={selected} onClose={() => setSelected(null)} />}
      <Footer studio />
    </main>
  );
}
