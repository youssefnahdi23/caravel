import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { I18nProvider } from './components/I18nContext';
import './styles.css';

const studioPage = /create-website(?:\.html)?\/?$/.test(window.location.pathname);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <I18nProvider studioPage={studioPage}>
      <App studioPage={studioPage} />
    </I18nProvider>
  </React.StrictMode>,
);
