import { useEffect, useRef, useState } from 'react';
import { Footer } from '../components/Footer';
import { Arrow } from '../components/Icons';
import { useI18n } from '../components/I18nContext';
import { Nav } from '../components/Nav';

const base = import.meta.env.BASE_URL;
const studioUrl = `${base}create-website.html`;

const services = {
  websites: [
    { slug: 'showcase-website', name: 'Showcase website', price: '500 DT', accent: 'coral', image: 'business-web.jpg', description: 'A clear, credible online presence for your business.', ideal: 'Independent professionals, local businesses, artisans and small teams', timeline: '1–2 weeks', scope: 'Up to 5 pages', features: ['Domain name for 1 year', 'Up to 5 pages', 'Mobile-friendly design', 'Contact form & Google Maps', 'Basic search visibility', 'Social media links'] },
    { slug: 'landing-page', name: 'Campaign landing page', price: '350 DT', accent: 'violet', image: 'design-process.jpg', description: 'One focused page built to turn a campaign, event, or launch into enquiries.', ideal: 'Product launches, events, advertising campaigns and lead generation', timeline: '5–7 days', scope: '1 conversion page', features: ['Conversion-focused structure', 'Mobile-friendly design', 'Lead or booking form', 'Analytics setup', 'Social sharing preview', 'One campaign integration'] },
    { slug: 'restaurant-website', name: 'Restaurant website', price: '650 DT', accent: 'mint', image: 'ecommerce.jpg', description: 'A delicious digital front door with your menu, location, and reservations.', ideal: 'Restaurants, cafés, bakeries, guest houses and food brands', timeline: '1–2 weeks', scope: 'Up to 6 pages', features: ['Domain name for 1 year', 'Browsable menu', 'Photo gallery', 'Reservation requests', 'Maps and opening hours', 'Mobile-friendly design'] },
    { slug: 'ecommerce-website', name: 'E-commerce website', price: '750 DT', accent: 'blue', image: 'ecommerce.jpg', description: 'Everything you need to present and start selling your products.', ideal: 'Retailers, makers, fashion, beauty and specialist product brands', timeline: '2–3 weeks', scope: 'Up to 30 products', badge: 'Popular', features: ['Domain name for 1 year', 'Browsable product catalogue', 'Product & category pages', 'Cart and order requests', 'Simple management space', 'WhatsApp ordering'] },
    { slug: 'booking-website', name: 'Booking & services website', price: '950 DT', accent: 'coral', image: 'design-process.jpg', description: 'Present your services and let customers request or reserve an appointment.', ideal: 'Clinics, beauty salons, coaches, consultants and rental businesses', timeline: '2–3 weeks', scope: 'Services + booking flow', features: ['Service catalogue', 'Availability calendar', 'Booking requests', 'Automated confirmations', 'Customer contact records', 'Administration space'] },
    { slug: 'ecommerce-ai', name: 'E-commerce + AI chatbot', price: '1,200 DT', accent: 'violet', image: 'platform.jpg', description: 'An online shop with an assistant that helps visitors choose.', ideal: 'Stores with large catalogues or products that need guided selection', timeline: '3–4 weeks', scope: 'Store + AI assistant', features: ['Everything in E-commerce', 'AI product assistant', 'Catalogue-aware answers', 'Lead collection', 'Conversation insights', 'Custom assistant tone'] },
    { slug: 'online-platform', name: 'Online platform', price: '1,500 DT', accent: 'mint', image: 'platform.jpg', description: 'A custom web product built around your business workflow.', ideal: 'Startups, membership services, marketplaces and internal operations', timeline: '4–6 weeks', scope: 'Custom first version', features: ['Customer accounts', 'Secure database', 'User dashboard', 'Administration space', 'One custom business workflow', 'Cloud deployment'] },
  ],
  mobile: [
    { slug: 'business-mobile-app', name: 'Business mobile app', price: '1,200 DT', accent: 'coral', image: 'mobile-app.jpg', description: 'Put your services, news, and contact details in your customers’ pockets.', ideal: 'Businesses that want a direct, branded mobile presence', timeline: '3–4 weeks', scope: 'Android application', features: ['Android app', 'Branded design', 'Services or catalogue', 'Contact & map', 'News or offers section', 'Store publication support'] },
    { slug: 'catalogue-mobile-app', name: 'Catalogue mobile app', price: '1,800 DT', accent: 'blue', image: 'mobile-app.jpg', description: 'Let customers browse your products from a fast, branded app.', ideal: 'Wholesalers, showrooms, distributors and product-heavy businesses', timeline: '4–5 weeks', scope: 'Android + catalogue', features: ['Android app', 'Browsable catalogue', 'Search and categories', 'Product details', 'Request an order', 'Simple management space'] },
    { slug: 'booking-mobile-app', name: 'Booking mobile app', price: '2,200 DT', accent: 'mint', image: 'design-process.jpg', description: 'Make appointments and recurring services easy to book from a phone.', ideal: 'Health, wellness, sports, education and appointment-led services', timeline: '5–6 weeks', scope: 'Android + booking', features: ['Customer accounts', 'Service catalogue', 'Availability calendar', 'Booking management', 'Reminders', 'Administration dashboard'] },
    { slug: 'ecommerce-mobile-app', name: 'E-commerce mobile app', price: '2,500 DT', accent: 'violet', image: 'ecommerce.jpg', description: 'A complete mobile storefront made for repeat customers.', ideal: 'Growing stores with repeat customers and an active product catalogue', timeline: '5–7 weeks', scope: 'Android commerce app', badge: 'Popular', features: ['Android app', 'Customer accounts', 'Cart and checkout', 'Order tracking', 'Push notifications', 'Product management'] },
    { slug: 'delivery-mobile-app', name: 'Ordering & delivery app', price: '2,900 DT', accent: 'coral', image: 'ecommerce.jpg', description: 'Receive mobile orders and keep customers informed until delivery.', ideal: 'Restaurants, groceries, local delivery and click-and-collect businesses', timeline: '6–8 weeks', scope: 'Ordering + operations', features: ['Product or menu catalogue', 'Customer accounts', 'Order placement', 'Order status updates', 'Delivery zones', 'Operations dashboard'] },
    { slug: 'custom-mobile-app', name: 'Custom mobile app', price: '3,500 DT', accent: 'blue', image: 'platform.jpg', description: 'A made-to-measure app for a unique service or workflow.', ideal: 'Startups and established businesses with a specific product idea', timeline: '6–10 weeks', scope: 'Custom first version', features: ['Android app', 'Secure accounts', 'Cloud database', 'Admin dashboard', 'One custom business workflow', 'Store publication support'] },
  ],
};

const allServices = Object.entries(services).flatMap(([category, items]) => items.map((service) => ({ ...service, category })));
const businessTypes = ['Retail', 'Services', 'Restaurant & hospitality', 'Health & beauty', 'Education', 'Other'];
const imageUrl = (image) => `${base}assets/packages/${image}`;
const packageUrl = (slug) => `${studioUrl}?package=${slug}`;

function ServiceCard({ service, t, compact = false }) {
  return (
    <article className={`package-card ${service.accent}${compact ? ' compact' : ''}`}>
      <a className="package-visual" href={packageUrl(service.slug)} aria-label={`${t('View package')}: ${t(service.name)}`}>
        <img src={imageUrl(service.image)} alt="" loading="lazy" />
        <span>{t('View details')} ↗</span>
      </a>
      <div className="package-card-body">
        <div className="package-topline"><span>{t('Starting from')}</span>{service.badge && <b>{t(service.badge)}</b>}</div>
        <div className="package-price">{service.price}</div>
        <h3>{t(service.name)}</h3>
        <p>{t(service.description)}</p>
        {!compact && <ul>{service.features.slice(0, 5).map((feature) => <li key={feature}><span>✓</span>{t(feature)}</li>)}</ul>}
        <a className="package-action" href={packageUrl(service.slug)}>{t('Explore this package')} <Arrow /></a>
      </div>
    </article>
  );
}

function RequestForm({ selected }) {
  const { t } = useI18n();
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const firstInput = useRef(null);
  useEffect(() => { requestAnimationFrame(() => firstInput.current?.focus({ preventScroll: true })); }, []);

  async function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setStatus('sending');
    setError('');
    try {
      const response = await fetch('/api/project-request', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name: data.get('name'), email: data.get('email'), business: t(data.get('business')), company: data.get('company'), website: data.get('website'), packageName: t(selected.name), packagePrice: selected.price, packageSlug: selected.slug }),
      });
      if (response.status === 429) throw new Error('limit');
      if (!response.ok) throw new Error('send');
      setStatus('sent');
    } catch (sendError) {
      setError(sendError.message === 'limit' ? t('You can send one request every 24 hours.') : t('We could not send your request. Please try again.'));
      setStatus('error');
    }
  }

  if (status === 'sent') return <div className="request-success" role="status"><span>✓</span><h3>{t('Your request has been sent.')}</h3><p>{t('We received your details and will contact you within one business day.')}</p></div>;
  return (
    <form className="request-form" onSubmit={submit}>
      <label><span>{t('Name')}</span><input ref={firstInput} name="name" type="text" placeholder={t('Your full name')} required /></label>
      <label><span>{t('Email address')}</span><input name="email" type="email" placeholder="you@example.com" required /></label>
      <label><span>{t('Business type')}</span><select name="business" defaultValue="" required><option value="" disabled>{t('Choose one')}</option>{businessTypes.map((type) => <option key={type} value={type}>{t(type)}</option>)}</select></label>
      <label><span>{t('Business name')} <i>{t('Optional')}</i></span><input name="company" type="text" placeholder={t('What is it called?')} /></label>
      <input className="request-hp" name="website" type="text" tabIndex="-1" autoComplete="off" aria-hidden="true" />
      {error && <p className="request-error" role="alert">{error}</p>}
      <button className="button studio-button" type="submit" disabled={status === 'sending'}>{t(status === 'sending' ? 'Sending…' : 'Send my request')} <Arrow /></button>
      <small>{t('No commitment · One request every 24 hours')}</small>
    </form>
  );
}

function PackageDetail({ service }) {
  const { t } = useI18n();
  const related = services[service.category].filter((item) => item.slug !== service.slug).slice(0, 3);
  return (
    <main>
      <Nav studio />
      <section className="package-detail-hero section-pad">
        <div className="package-detail-copy">
          <a className="back-home" href={studioUrl}>{t('← All packages')}</a>
          <p className="eyebrow">{t(service.category === 'websites' ? 'Website package' : 'Mobile app package')}</p>
          <h1>{t(service.name)}</h1>
          <p>{t(service.description)}</p>
          <div className="detail-price"><span>{t('Starting from')}</span><strong>{service.price}</strong></div>
          <a className="button studio-button" href="#project-request">{t('Discuss this package')} <Arrow /></a>
        </div>
        <div className={`package-detail-image ${service.accent}`}><img src={imageUrl(service.image)} alt={t(service.name)} /><div><span>{t('Designed around your brand')}</span><b>{t('Responsive · Fast · Ready to grow')}</b></div></div>
      </section>

      <section className="package-inclusions section-pad">
        <div className="inclusions-main">
          <p className="section-kicker"><span>01</span> {t('What you receive')}</p>
          <h2>{t('Everything needed for')}<br />{t('a confident launch.')}</h2>
          <p>{t('This is a starting scope, not a rigid template. The design, content structure, colors, and user journey are adapted to your business.')}</p>
          <div className="inclusion-grid">{service.features.map((feature, index) => <div key={feature}><span>{String(index + 1).padStart(2, '0')}</span><b>{t(feature)}</b><p>{t('Planned, designed, tested, and prepared for launch.')}</p></div>)}</div>
        </div>
        <aside className="project-facts">
          <span>{t('Project at a glance')}</span>
          <div><small>{t('Best for')}</small><p>{t(service.ideal)}</p></div>
          <div><small>{t('Typical delivery')}</small><strong>{t(service.timeline)}</strong></div>
          <div><small>{t('Starting scope')}</small><strong>{t(service.scope)}</strong></div>
          <div><small>{t('Always included')}</small><p>{t('Custom visual direction, responsive testing, launch support, and one revision round.')}</p></div>
        </aside>
      </section>

      <section className="detail-process section-pad">
        <p className="section-kicker light"><span>02</span> {t('How the project moves')}</p>
        <div>{[['01', 'Discovery', 'We learn about your business, customers, and priorities.'], ['02', 'Design direction', 'You approve the visual direction before the full build.'], ['03', 'Build & review', 'We build the experience and refine it with your feedback.'], ['04', 'Launch', 'We test, publish, and show you how everything works.']].map(([number, title, body]) => <article key={number}><span>{number}</span><h3>{t(title)}</h3><p>{t(body)}</p></article>)}</div>
      </section>

      <section className="package-request section-pad" id="project-request">
        <div className="request-copy"><p className="eyebrow">{t('Your project')}</p><h2>{t('Ready to make it')}<br /><span>{t('yours?')}</span></h2><p>{t('Share only the essentials. We will contact you to understand the project and confirm a clear final quote.')}</p><div className="selected-package"><small>{t('Selected package')}</small><strong>{t(service.name)}</strong><span>{t('Starting from')} {service.price}</span></div></div>
        <RequestForm selected={service} />
      </section>

      <section className="related-packages section-pad"><div className="related-head"><div><p className="section-kicker"><span>03</span> {t('Keep exploring')}</p><h2>{t('Similar packages')}</h2></div><a href={studioUrl}>{t('View all packages')} <Arrow /></a></div><div className="package-grid related-grid">{related.map((item) => <ServiceCard key={item.slug} service={item} t={t} compact />)}</div></section>
      <Footer studio />
    </main>
  );
}

function CataloguePage() {
  const { t } = useI18n();
  const [category, setCategory] = useState('websites');
  return (
    <main>
      <Nav studio />
      <section className="studio-hero section-pad"><div className="studio-hero-copy"><a className="back-home" href={base}>{t('← Back to Caravel')}</a><p className="eyebrow">{t('Simple offers · Clear prices')}</p><h1>{t('Choose what you need.')}<br /><span>{t('See what you receive.')}</span></h1><p>{t('Explore detailed packages for websites and mobile apps. Compare the value, open any package, and see exactly how your investment is used.')}</p><a className="button studio-button" href="#packages">{t('Browse packages')} <Arrow down /></a></div><div className="catalogue-showcase"><img src={imageUrl('mobile-app.jpg')} alt="" /><img src={imageUrl('ecommerce.jpg')} alt="" /><div><span>13</span><b>{t('clear packages')}</b><small>{t('made for real businesses')}</small></div></div></section>
      <section className="packages section-pad" id="packages">
        <div className="packages-heading"><div><p className="section-kicker"><span>01</span> {t('Our packages')}</p><h2>{t('Find the right')}<br />{t('starting point.')}</h2></div><p>{t('Every card opens a complete package page with deliverables, recommended use, estimated timeline, and a clear starting price.')}</p></div>
        <div className="category-tabs" role="tablist" aria-label={t('Project category')}><button type="button" role="tab" aria-selected={category === 'websites'} className={category === 'websites' ? 'active' : ''} onClick={() => setCategory('websites')}><span>⌘</span><b>{t('Websites')}</b><small>7 {t('packages')}</small></button><button type="button" role="tab" aria-selected={category === 'mobile'} className={category === 'mobile' ? 'active' : ''} onClick={() => setCategory('mobile')}><span>▯</span><b>{t('Mobile apps')}</b><small>6 {t('packages')}</small></button></div>
        <div className="package-grid" role="tabpanel">{services[category].map((service) => <ServiceCard key={service.slug} service={service} t={t} />)}</div>
        <p className="package-note">{t('Hosting, paid third-party services, and advertising budgets are quoted separately when needed.')}</p>
      </section>
      <Footer studio />
    </main>
  );
}

export function StudioPage() {
  const slug = new URLSearchParams(window.location.search).get('package');
  const selected = allServices.find((service) => service.slug === slug);
  return selected ? <PackageDetail service={selected} /> : <CataloguePage />;
}
