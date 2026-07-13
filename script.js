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
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get('name');
  const email = data.get('email');
  const interest = data.get('interest');
  const body = `Hi Youssef,\n\nI'm ${name} (${email}) and I'd like to join the Caravel community.\n\nI'm most interested in: ${interest}.\n\nA little about me:\n`;
  window.location.href = `mailto:youssefnahdi95@gmail.com?subject=${encodeURIComponent('I want to join Caravel')}&body=${encodeURIComponent(body)}`;
  form.innerHTML = '<div class="form-success"><span>✓</span><h3>You\'re on your way.</h3><p>Your email app is opening—send the note and Youssef will take it from there.</p></div>';
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
