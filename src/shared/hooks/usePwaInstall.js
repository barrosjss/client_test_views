import { useState, useEffect, useCallback } from 'react';

function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches
    || window.navigator.standalone === true
  );
}

export function isIosSafari() {
  const ua = window.navigator.userAgent;
  const ios = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
  const webkit = /WebKit/.test(ua);
  const notChrome = !/CriOS|FxiOS|EdgiOS/.test(ua);
  return ios && webkit && notChrome;
}

export function usePwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installed, setInstalled] = useState(isStandalone);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    const onBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    const onAppInstalled = () => {
      setInstalled(true);
      setDeferredPrompt(null);
    };
    const onDisplayMode = () => setInstalled(isStandalone());

    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    window.addEventListener('appinstalled', onAppInstalled);
    window.matchMedia('(display-mode: standalone)').addEventListener('change', onDisplayMode);

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('appinstalled', onAppInstalled);
      window.matchMedia('(display-mode: standalone)').removeEventListener('change', onDisplayMode);
    };
  }, []);

  const install = useCallback(async () => {
    if (!deferredPrompt || installing) return false;
    setInstalling(true);
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      if (outcome === 'accepted') setInstalled(true);
      return outcome === 'accepted';
    } finally {
      setInstalling(false);
    }
  }, [deferredPrompt, installing]);

  return {
    canInstall: !!deferredPrompt,
    installed,
    installing,
    install,
    isIos: isIosSafari(),
  };
}
