import { useState, useEffect } from 'react';
import { Landing } from '../features/marketing/Landing.jsx';
import { Auth } from '../features/marketing/Auth.jsx';
import { Docs } from '../features/marketing/Docs.jsx';
import { AppMobile } from '../features/marketing/AppMobile.jsx';
import { Shell } from '../platform/shell/AppShell.jsx';
import { renderModule } from './module-registry.jsx';
import { usePathname } from '../shared/hooks/usePathname.js';

const STORAGE_KEY = 'cmocs.active';

export function App() {
  const pathname = usePathname();
  const [screen, setScreen] = useState('landing');
  const [active, setActive] = useState(() => localStorage.getItem(STORAGE_KEY) || 'dashboard');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, active);
  }, [active]);

  const go = (s) => {
    if (s === 'app') setLoggedIn(true);
    if (s === 'login' || s === 'landing') setLoggedIn(false);
    setScreen(s);
  };

  if (pathname === '/app-mobile') return <AppMobile />;

  if (screen === 'landing') return <Landing go={go} />;
  if (screen === 'login' || screen === 'register' || screen === 'forgot') {
    return <Auth mode={screen} go={go} />;
  }
  if (screen === 'docs') {
    return <Docs go={go} loggedIn={loggedIn} setActive={setActive} />;
  }

  return (
    <Shell active={active} setActive={setActive} go={go}>
      {renderModule(active, { setActive })}
    </Shell>
  );
}
