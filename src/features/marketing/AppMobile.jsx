import { useState } from 'react';
import { Logo, Btn, Badge } from '../../shared/ui/primitives.jsx';
import { Icon } from '../../shared/ui/Icon.jsx';
import { useIsMobile } from '../../shared/hooks/useIsMobile.js';
import { usePwaInstall } from '../../shared/hooks/usePwaInstall.js';

const FEATURES = [
  { icon: 'truck', text: 'Flota y maquinaria en tiempo real' },
  { icon: 'map-pin', text: 'Rastreo GPS y alertas' },
  { icon: 'wrench', text: 'Órdenes de trabajo y mantenimiento' },
];

function DesktopGate() {
  const [copied, setCopied] = useState(false);
  const url = window.location.href;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <div className="app-mobile app-mobile--desktop">
      <div className="app-mobile__card fade-in">
        <Logo size={36} light />
        <div className="app-mobile__icon-wrap">
          <Icon name="smartphone" size={40} />
        </div>
        <h1>Abre esta página en tu celular</h1>
        <p className="app-mobile__lead">
          La instalación de la app CMOCS solo está disponible en dispositivos móviles.
        </p>
        <div className="app-mobile__url-box">
          <code>{url}</code>
        </div>
        <Btn variant="primary" block icon={copied ? 'check' : 'copy'} onClick={copy}>
          {copied ? 'Enlace copiado' : 'Copiar enlace'}
        </Btn>
        <a href="/" className="app-mobile__back">Volver al inicio</a>
      </div>
    </div>
  );
}

function IosInstructions() {
  return (
    <div className="app-mobile__ios-steps">
      <p className="app-mobile__ios-title">Instalar en iPhone / iPad</p>
      <ol>
        <li>
          Toca <Icon name="share-2" size={16} /> <strong>Compartir</strong> en Safari
        </li>
        <li>
          Elige <strong>Añadir a pantalla de inicio</strong>
        </li>
        <li>
          Confirma con <strong>Añadir</strong>
        </li>
      </ol>
    </div>
  );
}

export function AppMobile() {
  const isMobile = useIsMobile();
  const { canInstall, installed, installing, install, isIos } = usePwaInstall();

  if (!isMobile) return <DesktopGate />;

  const enterApp = () => {
    window.location.href = '/';
  };

  return (
    <div className="app-mobile">
      <div className="app-mobile__glow" aria-hidden />
      <div className="app-mobile__content fade-in">
        <header className="app-mobile__header">
          <Logo size={34} light />
          <Badge tone="amber">App móvil</Badge>
        </header>

        <div className="app-mobile__hero">
          <div className="app-mobile__app-icon" aria-hidden>
            <Logo size={52} showText={false} />
          </div>
          <h1>Instala CMOCS en tu celular</h1>
          <p className="app-mobile__lead">
            Accede más rápido a tu flota, rutas y operación — como una app nativa, sin App Store.
          </p>
        </div>

        <ul className="app-mobile__features">
          {FEATURES.map(({ icon, text }) => (
            <li key={text}>
              <span className="app-mobile__feat-icon"><Icon name={icon} size={18} /></span>
              {text}
            </li>
          ))}
        </ul>

        <div className="app-mobile__actions">
          {installed ? (
            <>
              <div className="app-mobile__installed">
                <Icon name="check-circle-2" size={22} />
                <span>CMOCS ya está instalado en este dispositivo</span>
              </div>
              <Btn variant="primary" block size="lg" icon="arrow-right" iconRight onClick={enterApp}>
                Abrir CMOCS
              </Btn>
            </>
          ) : canInstall ? (
            <Btn
              variant="primary"
              block
              size="lg"
              icon="download"
              disabled={installing}
              onClick={install}
            >
              {installing ? 'Instalando…' : 'Descargar app CMOCS'}
            </Btn>
          ) : isIos ? (
            <IosInstructions />
          ) : (
            <>
              <Btn variant="primary" block size="lg" icon="download" disabled>
                Instalar no disponible
              </Btn>
              <p className="app-mobile__hint muted">
                Abre esta página en Chrome o Edge para instalar la app. Si ya la instalaste, ábrela desde tu pantalla de inicio.
              </p>
            </>
          )}
        </div>

        <footer className="app-mobile__footer">
          <a href="/">Ir al sitio web</a>
        </footer>
      </div>
    </div>
  );
}
