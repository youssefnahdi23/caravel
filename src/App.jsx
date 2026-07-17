import { useEffect } from 'react';
import { HomePage } from './pages/HomePage';
import { StudioPage } from './pages/StudioPage';

export function App({ studioPage }) {
  useEffect(() => {
    const cleanUrl = () => `${window.location.pathname}${window.location.search}`;
    const goToHash = (hash, behavior = 'smooth') => {
      const target = document.querySelector(hash);
      if (!target) return false;
      target.scrollIntoView({ behavior, block: 'start' });
      history.replaceState(history.state, '', cleanUrl());
      return true;
    };

    // A loaded URL with an old hash is treated as a fresh visit to Home.
    if (window.location.hash) {
      history.replaceState(history.state, '', cleanUrl());
      window.scrollTo(0, 0);
    }

    // Cross-page Studio links use a temporary query parameter so they can
    // reach a section once, then disappear before the next refresh.
    const url = new URL(window.location.href);
    const initialSection = url.searchParams.get('section');
    if (initialSection) {
      const target = document.getElementById(initialSection);
      url.searchParams.delete('section');
      history.replaceState(history.state, '', `${url.pathname}${url.search}`);
      target?.scrollIntoView({ behavior: 'auto', block: 'start' });
    }

    const handleClick = (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link || !goToHash(link.getAttribute('href'))) return;
      event.preventDefault();
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return studioPage ? <StudioPage /> : <HomePage />;
}
