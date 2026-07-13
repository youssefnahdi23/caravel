const menuButton = document.querySelector('.menu-button');
const mainNav = document.querySelector('.main-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

mainNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const form = document.querySelector('.join-form');
const t = (text) => window.caravelTranslate ? window.caravelTranslate(text) : text;

const WEBSITE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdK28y0qONP4DH1f8WGqLOdupxMurnnO5MM6s746aRrZHxPUQ/viewform';
const websiteFormLink = document.querySelector('#create-website-link');
if (websiteFormLink) {
  if (WEBSITE_FORM_URL) {
    websiteFormLink.href = WEBSITE_FORM_URL;
  } else {
    websiteFormLink.removeAttribute('target');
    websiteFormLink.addEventListener('click', (event) => {
      event.preventDefault();
      window.alert(t('The website request form is coming soon.'));
    });
  }
}

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get('name');
  const email = data.get('email');
  const interest = data.get('interest');
  const language = document.documentElement.lang;
  const copy = {
    en: { subject: 'I want to join Caravel', body: `Hi Youssef,\n\nI'm ${name} (${email}) and I'd like to join the Caravel community.\n\nI'm most interested in: ${interest}.\n\nA little about me:\n` },
    fr: { subject: 'Je souhaite rejoindre Caravel', body: `Bonjour Youssef,\n\nJe m'appelle ${name} (${email}) et je souhaite rejoindre la communauté Caravel.\n\nCe qui m'intéresse le plus : ${interest}.\n\nQuelques mots sur moi :\n` },
    ar: { subject: 'أرغب في الانضمام إلى كارافيل', body: `مرحبًا يوسف،\n\nأنا ${name} (${email}) وأرغب في الانضمام إلى مجتمع كارافيل.\n\nأكثر ما يهمني: ${interest}.\n\nنبذة عني:\n` }
  }[language] || null;
  window.location.href = `mailto:youssefnahdi95@gmail.com?subject=${encodeURIComponent(copy.subject)}&body=${encodeURIComponent(copy.body)}`;
  form.innerHTML = `<div class="form-success"><span>✓</span><h3>${t("You're on your way.")}</h3><p>${t('Your email app is opening—send the note and Youssef will take it from there.')}</p></div>`;
});

document.querySelector('#year').textContent = new Date().getFullYear();

if (window.location.hash) {
  const target = document.querySelector(window.location.hash);
  if (target) {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, target.offsetTop);
    requestAnimationFrame(() => document.documentElement.style.removeProperty('scroll-behavior'));
  }
}
