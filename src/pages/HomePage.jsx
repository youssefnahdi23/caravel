import { useState } from 'react';
import { Footer } from '../components/Footer';
import { Arrow, Spark } from '../components/Icons';
import { useI18n } from '../components/I18nContext';
import { Nav } from '../components/Nav';

const base = import.meta.env.BASE_URL;

function Hero() {
  const { t } = useI18n();
  return (
    <section className="hero section-pad" id="home">
      <div className="hero-glow" />
      <div className="hero-copy">
        <p className="eyebrow reveal">{t('Born in Tunisia · Open to builders')}</p>
        <h1 className="reveal delay-1">{t('Curiosity finds')} <br /><span>{t('a crew.')}</span></h1>
        <p className="hero-lede reveal delay-2">{t("Caravel is where Tunisia's tech-passionate people meet, turn sparks into plans, and build ideas that deserve to exist.")}</p>
        <div className="hero-actions reveal delay-3">
          <a href="#join" className="button button-primary">{t('Join the community')} <Arrow /></a>
          <a href="#story" className="text-link">{t('Our story')} <Arrow down /></a>
        </div>
      </div>
      <div className="hero-art" aria-label="A network of ideas gathering momentum">
        <div className="orbit orbit-one"><i /></div><div className="orbit orbit-two"><i /></div><div className="orbit orbit-three"><i /></div>
        <div className="hero-mark" aria-hidden="true"><div className="hero-symbol"><i /></div></div>
        <div className="float-note note-one"><b>01</b><span>{t('Meet')}</span></div><div className="float-note note-two"><b>02</b><span>{t('Make')}</span></div><div className="float-note note-three"><b>03</b><span>{t('Move')}</span></div>
        <span className="art-caption">{t('Ideas move further together.')}</span>
      </div>
      <div className="scroll-cue">{t('Scroll to explore')} <span>↓</span></div>
    </section>
  );
}

function Ticker() {
  const { t } = useI18n();
  const values = ['Builders welcome', 'Ideas in motion', 'Community first', 'Made in Tunisia'];
  return <section className="ticker" aria-label="Caravel values"><div>{[...values, ...values].map((value, index) => <span key={`${value}-${index}`}>{t(value)} <i>✦</i></span>)}</div></section>;
}

function Story() {
  const { t } = useI18n();
  return (
    <section className="story section-pad light-section" id="story">
      <div className="section-kicker"><span>01</span> {t('Why Caravel')}</div>
      <div className="story-grid">
        <h2>{t('Talent is everywhere.')}<br /><em>{t("Momentum isn't.")}</em></h2>
        <div className="story-copy">
          <p className="lead">{t('Too many good ideas stay trapped in a notebook, waiting for the right person, skill, or push.')}</p>
          <p>{t('Caravel started with a simple belief: Tunisia has no shortage of bright minds. What we need are more places for them to collide—openly, generously, and with purpose.')}</p>
          <p>{t("So we're building that place. A community that helps you find your people, sharpen your thinking, and move from")} <em>{t('“what if?”')}</em> {t('to')} <em>{t("“what's next?”")}</em></p>
        </div>
      </div>
      <div className="manifesto-card"><Spark /><p>{t('Not an audience.')}<br />{t('A crew.')}</p><span>{t('Caravel is built with its community—not simply for it.')}</span></div>
    </section>
  );
}

const offers = [
  { number: '01', color: 'coral', icon: 'people', title: 'Find your crew', body: 'Meet developers, designers, students, founders, and curious minds who care about making things happen.', tag: 'Community' },
  { number: '02', color: 'blue', icon: 'idea', title: 'Shape the idea', body: 'Get honest feedback, practical guidance, and the perspectives that turn a rough thought into a stronger direction.', tag: 'Support' },
  { number: '03', color: 'mint', icon: 'build', title: 'Build it together', body: 'Form teams around promising ideas, share skills, prototype fast, and learn by making something real.', tag: 'Action' },
];

function OfferIcon({ type }) {
  if (type === 'people') return <div className="card-icon people-icon"><i /><i /><i /></div>;
  if (type === 'idea') return <div className="card-icon idea-icon">✦</div>;
  return <div className="card-icon build-icon"><i /><i /><i /><i /></div>;
}

function WhatWeDo() {
  const { t } = useI18n();
  return (
    <section className="what section-pad" id="what-we-do">
      <div className="section-kicker light"><span>02</span> {t('What we do')}</div>
      <div className="section-heading-row"><h2>{t('From first spark')}<br />{t('to forward motion.')}</h2><p>{t("Whatever stage you're at, Caravel helps you take the next honest step.")}</p></div>
      <div className="offer-grid">{offers.map((offer) => <article className={`offer-card ${offer.color}`} key={offer.number}><div className="card-num">{offer.number}</div><OfferIcon type={offer.icon} /><h3>{t(offer.title)}</h3><p>{t(offer.body)}</p><span className="card-tag">{t(offer.tag)}</span></article>)}</div>
    </section>
  );
}

const pathSteps = [
  ['01', 'Arrive curious', 'Bring a skill, a question, or an idea. No finished pitch required.'],
  ['02', 'Connect openly', "Find people whose perspective adds something yours can't."],
  ['03', 'Make a move', 'Join a project, start one, or help someone else take theirs forward.'],
  ['04', 'Share the lift', 'Pass on what you learn. A rising community lifts every builder.'],
];

function Path() {
  const { t } = useI18n();
  return <section className="path section-pad light-section"><div className="section-kicker"><span>03</span> {t('The Caravel way')}</div><h2>{t('Every journey starts')}<br />{t('with showing up.')}</h2><div className="path-line">{pathSteps.map(([number, title, body]) => <div className="path-step" key={number}><b>{number}</b><i /><h3>{t(title)}</h3><p>{t(body)}</p></div>)}</div></section>;
}

function Founder() {
  const { t } = useI18n();
  return (
    <section className="founder section-pad" id="founder">
      <div className="section-kicker light"><span>04</span> {t('Meet the founder')}</div>
      <div className="founder-card">
        <div className="founder-profile"><div className="founder-avatar"><img src={`${base}assets/youssef-nahdi.jpg`} alt="Youssef Nahdi, founder of Caravel" /></div><div><span className="founder-label">{t('Founder & builder')}</span><h2>Youssef Nahdi</h2><p className="founder-role">{t('Computer Networks & Systems Graduate')}</p></div></div>
        <div className="founder-story"><blockquote>{t('“I wanted to create the community I was always looking for.”')}</blockquote><p>{t("With a background in cloud infrastructure, networks, and software, Youssef knows technology gets interesting when people connect the pieces. Caravel is his invitation to Tunisia's builders to stop waiting for permission and start making progress—together.")}</p><div className="founder-actions"><div className="skill-row"><span>{t('Cloud')}</span><span>{t('Networks')}</span><span>{t('Development')}</span><span>{t('Community')}</span></div><a className="button button-light" href={`${base}assets/Youssef_Nahdi_CV.pdf`} target="_blank" rel="noreferrer">{t('Read CV')} <Arrow /></a></div></div>
      </div>
    </section>
  );
}

function JoinForm() {
  const { language, t } = useI18n();
  const [sent, setSent] = useState(false);
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name'); const email = data.get('email'); const interest = t(data.get('interest'));
    const copy = {
      en: { subject: 'I want to join Caravel', body: `Hi Youssef,\n\nI'm ${name} (${email}) and I'd like to join the Caravel community.\n\nI'm most interested in: ${interest}.\n\nA little about me:\n` },
      fr: { subject: 'Je souhaite rejoindre Caravel', body: `Bonjour Youssef,\n\nJe m'appelle ${name} (${email}) et je souhaite rejoindre la communauté Caravel.\n\nCe qui m'intéresse le plus : ${interest}.\n\nQuelques mots sur moi :\n` },
      ar: { subject: 'أرغب في الانضمام إلى كارافيل', body: `مرحبًا يوسف،\n\nأنا ${name} (${email}) وأرغب في الانضمام إلى مجتمع كارافيل.\n\nأكثر ما يهمني: ${interest}.\n\nنبذة عني:\n` },
    }[language];
    window.location.href = `mailto:youssefnahdi95@gmail.com?subject=${encodeURIComponent(copy.subject)}&body=${encodeURIComponent(copy.body)}`;
    setSent(true);
  }
  if (sent) return <div className="form-success"><span>✓</span><h3>{t("You're on your way.")}</h3><p>{t('Your email app is opening—send the note and Youssef will take it from there.')}</p></div>;
  return <form className="join-form" onSubmit={submit}><label><span>{t('Your name')}</span><input name="name" type="text" placeholder={t('How should we call you?')} required /></label><label><span>{t('Email address')}</span><input name="email" type="email" placeholder="you@example.com" required /></label><label><span>{t("I'm most interested in")}</span><select name="interest" defaultValue="" required><option value="" disabled>{t('Choose one')}</option>{['Meeting the community', 'Building a project', 'Sharing my skills', 'Learning and exploring'].map((option) => <option value={option} key={option}>{t(option)}</option>)}</select></label><button className="button button-primary" type="submit">{t('Join the community')} <span>→</span></button><small>{t('No noise. Just meaningful updates and invitations.')}</small></form>;
}

function Join() {
  const { t } = useI18n();
  return <section className="join section-pad" id="join"><div className="join-copy"><p className="eyebrow">{t('Your seat is open')}</p><h2>{t('Bring your curiosity.')}<br /><span>{t("We'll find the crew.")}</span></h2><p>{t('Join the early Caravel community and be first to hear about meetups, projects, and opportunities to build.')}</p></div><JoinForm /></section>;
}

export function HomePage() {
  return <main><Nav /><Hero /><Ticker /><Story /><WhatWeDo /><Path /><Founder /><Join /><Footer /></main>;
}
