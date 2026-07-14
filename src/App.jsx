import { useEffect } from 'react';
import { HomePage } from './pages/HomePage';
import { StudioPage } from './pages/StudioPage';

export function App({ studioPage }) {
  useEffect(() => {
    if (!window.location.hash) return;
    const target = document.querySelector(window.location.hash);
    if (!target) return;
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, target.offsetTop);
    requestAnimationFrame(() => document.documentElement.style.removeProperty('scroll-behavior'));
  }, []);

  return studioPage ? <StudioPage /> : <HomePage />;
}
