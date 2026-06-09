import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App.jsx';
import { AppErrorBoundary } from './app/AppErrorBoundary.jsx';
import './styles/design-system.css';
import './styles/responsive.css';
import './styles/pwa-mobile.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </StrictMode>,
);
