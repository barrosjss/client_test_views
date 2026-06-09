import React, { useState, useEffect, Fragment } from 'react';
import { Icon } from '../../shared/ui/Icon.jsx';
import {
  Logo, Btn, Badge, Avatar, Field, Input, Select, Checkbox, Switch,
  Card, Stat, ImgSlot, Segmented, Bar,
} from '../../shared/ui/primitives.jsx';
import { fmtCOP, fmtNum } from '../../shared/data/index.js';

export function AuthBrandPanel() {
  const feats = [
    ["truck", "Toda tu flota en tiempo real"],
    ["route", "Despacho y rutas sin fricción"],
    ["receipt", "Factura y concilia en un clic"],
  ];
  return (
    <div style={{ position: "relative", overflow: "hidden", height: "100%", background: "radial-gradient(120% 90% at 20% 0%, #1a2531 0%, #0d141c 60%)", padding: "44px 46px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)", backgroundSize: "44px 44px", maskImage: "radial-gradient(90% 70% at 30% 20%, #000, transparent)" }} />
      <div style={{ position: "relative" }}><Logo light /></div>
      <div style={{ position: "relative" }}>
        <h2 style={{ color: "#fff", fontSize: 34, lineHeight: 1.12, letterSpacing: "-0.03em" }}>El centro de control de tu operación de transporte.</h2>
        <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 16 }}>
          {feats.map(([ic, t]) => (
            <div key={t} className="row gap-12" style={{ color: "rgba(255,255,255,.8)", fontSize: 15, fontWeight: 600 }}>
              <span style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(245,158,11,.14)", color: "var(--amber-400)", display: "grid", placeItems: "center", flex: "none" }}><Icon name={ic} size={17} /></span>
              {t}
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: "relative" }}>
        <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 14, padding: 18 }}>
          <p style={{ color: "rgba(255,255,255,.78)", fontSize: 14.5, lineHeight: 1.55, fontStyle: "italic" }}>"Pasamos de tres hojas de cálculo a una sola plataforma. Hoy sabemos dónde está cada camión y cuánto nos cuesta."</p>
          <div className="row gap-10" style={{ marginTop: 14 }}>
            <Avatar name="Ricardo Peña" size={34} />
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 13.5 }}>Ricardo Peña</div>
              <div style={{ color: "rgba(255,255,255,.45)", fontSize: 12 }}>Gerente · Constructora Andina</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Login({ go }) {
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  return (
    <form className="col gap-20 fade-in" style={{ width: "100%", maxWidth: 380 }} onSubmit={e => { e.preventDefault(); go("app"); }}>
      <div>
        <h1 style={{ fontSize: 28 }}>Bienvenido de vuelta</h1>
        <p className="muted" style={{ fontSize: 15, marginTop: 8 }}>Ingresa a tu cuenta para gestionar la flota.</p>
      </div>
      <Field label="Correo corporativo">
        <Input icon="mail" type="email" placeholder="tu@empresa.co" defaultValue="andrea@cmocs.co" required />
      </Field>
      <Field label="Contraseña">
        <div className="input-group">
          <Icon name="lock" size={17} />
          <input className="input" type={show ? "text" : "password"} placeholder="••••••••" defaultValue="demo1234" required style={{ paddingRight: 44 }} />
          <button type="button" className="input-affix" style={{ cursor: "pointer", background: "none", border: "none" }} onClick={() => setShow(s => !s)}>
            <Icon name={show ? "eye-off" : "eye"} size={17} />
          </button>
        </div>
      </Field>
      <div className="row between">
        <Checkbox checked={remember} onChange={setRemember} label="Recuérdame" />
        <button type="button" className="btn btn-link" style={{ fontSize: 13 }} onClick={() => go("forgot")}>¿Olvidaste tu contraseña?</button>
      </div>
      <button className="btn btn-primary btn-lg btn-block" type="submit">Iniciar sesión</button>
      <div className="row gap-12" style={{ color: "var(--slate-300)", fontSize: 12.5, fontWeight: 600 }}>
        <div className="grow" style={{ height: 1, background: "var(--line)" }} /> O CONTINÚA CON <div className="grow" style={{ height: 1, background: "var(--line)" }} />
      </div>
      <div className="row gap-12">
        <button type="button" className="btn btn-ghost btn-block"><Icon name="chrome" size={18} /> Google</button>
        <button type="button" className="btn btn-ghost btn-block"><Icon name="building-2" size={18} /> SSO</button>
      </div>
      <p style={{ textAlign: "center", fontSize: 14, color: "var(--slate-500)" }}>
        ¿No tienes cuenta? <button type="button" className="btn btn-link" style={{ color: "var(--amber-600)", fontWeight: 700 }} onClick={() => go("register")}>Solicita una demo</button>
      </p>
    </form>
  );
}

export function Register({ go }) {
  const [step, setStep] = useState(1);
  const [agree, setAgree] = useState(false);
  return (
    <form className="col gap-20 fade-in" style={{ width: "100%", maxWidth: 400 }} onSubmit={e => { e.preventDefault(); step === 1 ? setStep(2) : go("app"); }}>
      <div>
        <div className="row gap-8" style={{ marginBottom: 14 }}>
          {[1, 2].map(n => <div key={n} style={{ height: 4, flex: 1, borderRadius: 999, background: step >= n ? "var(--amber-500)" : "var(--line)" }} />)}
        </div>
        <h1 style={{ fontSize: 26 }}>{step === 1 ? "Crea tu cuenta" : "Sobre tu empresa"}</h1>
        <p className="muted" style={{ fontSize: 15, marginTop: 8 }}>{step === 1 ? "Empieza tu prueba guiada de CMOCS." : "Esto nos ayuda a configurar tu operación."}</p>
      </div>
      {step === 1 ? (
        <Fragment>
          <div className="row gap-12">
            <Field label="Nombre"><Input placeholder="Andrea" required /></Field>
            <Field label="Apellido"><Input placeholder="Villalba" required /></Field>
          </div>
          <Field label="Correo corporativo"><Input icon="mail" type="email" placeholder="tu@empresa.co" required /></Field>
          <Field label="Contraseña" hint="Mínimo 8 caracteres"><Input icon="lock" type="password" placeholder="••••••••" required /></Field>
        </Fragment>
      ) : (
        <Fragment>
          <Field label="Nombre de la empresa"><Input icon="building-2" placeholder="Transportes del Sur S.A." required /></Field>
          <div className="row gap-12">
            <Field label="Tamaño de flota">
              <Select defaultValue=""><option value="" disabled>Selecciona</option><option>1 – 10 vehículos</option><option>11 – 50 vehículos</option><option>51 – 200 vehículos</option><option>+200 vehículos</option></Select>
            </Field>
            <Field label="País"><Select defaultValue="Colombia"><option>Colombia</option><option>México</option><option>Perú</option><option>Chile</option><option>Ecuador</option></Select></Field>
          </div>
          <Field label="Tipo de operación">
            <Select defaultValue=""><option value="" disabled>Selecciona</option><option>Transporte de carga</option><option>Maquinaria y construcción</option><option>Transporte de pasajeros</option><option>Mixta</option></Select>
          </Field>
          <Checkbox checked={agree} onChange={setAgree} label="Acepto los términos y la política de privacidad" />
        </Fragment>
      )}
      <div className="row gap-12">
        {step === 2 && <button type="button" className="btn btn-ghost btn-lg" onClick={() => setStep(1)}><Icon name="arrow-left" size={18} /></button>}
        <button className="btn btn-primary btn-lg btn-block" type="submit" disabled={step === 2 && !agree}>{step === 1 ? "Continuar" : "Crear cuenta"}</button>
      </div>
      <p style={{ textAlign: "center", fontSize: 14, color: "var(--slate-500)" }}>
        ¿Ya tienes cuenta? <button type="button" className="btn btn-link" style={{ color: "var(--amber-600)", fontWeight: 700 }} onClick={() => go("login")}>Inicia sesión</button>
      </p>
    </form>
  );
}

export function Forgot({ go }) {
  const [sent, setSent] = useState(false);
  return (
    <form className="col gap-20 fade-in" style={{ width: "100%", maxWidth: 380 }} onSubmit={e => { e.preventDefault(); setSent(true); }}>
      <button type="button" className="btn btn-link" style={{ alignSelf: "flex-start", fontSize: 13 }} onClick={() => go("login")}><Icon name="arrow-left" size={16} /> Volver a iniciar sesión</button>
      {sent ? (
        <Fragment>
          <span style={{ width: 52, height: 52, borderRadius: 14, background: "var(--success-tint)", color: "var(--success)", display: "grid", placeItems: "center" }}><Icon name="mail-check" size={26} /></span>
          <div>
            <h1 style={{ fontSize: 26 }}>Revisa tu correo</h1>
            <p className="muted" style={{ fontSize: 15, marginTop: 8, lineHeight: 1.5 }}>Enviamos un enlace de recuperación. Sigue las instrucciones para restablecer tu contraseña.</p>
          </div>
          <button type="button" className="btn btn-dark btn-lg btn-block" onClick={() => go("login")}>Entendido</button>
        </Fragment>
      ) : (
        <Fragment>
          <div>
            <h1 style={{ fontSize: 26 }}>Recuperar contraseña</h1>
            <p className="muted" style={{ fontSize: 15, marginTop: 8, lineHeight: 1.5 }}>Ingresa tu correo y te enviaremos un enlace para restablecerla.</p>
          </div>
          <Field label="Correo corporativo"><Input icon="mail" type="email" placeholder="tu@empresa.co" required /></Field>
          <button className="btn btn-primary btn-lg btn-block" type="submit">Enviar enlace</button>
        </Fragment>
      )}
    </form>
  );
}

export function Auth({ mode, go }) {
  return (
    <div className="auth-grid" style={{ height: '100vh', display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,1fr)' }}>
      <div className="auth-brand" style={{ minHeight: 0 }}><AuthBrandPanel /></div>
      <div
        className="auth-form-col"
        style={{ display: 'grid', placeItems: 'center', padding: '32px', overflowY: 'auto', background: 'var(--surface)' }}
      >
        <div className="auth-mobile-top" style={{ display: 'none' }}>
          <button type="button" onClick={() => go('landing')} style={{ border: 'none', background: 'transparent', padding: 0, cursor: 'pointer' }}>
            <Logo />
          </button>
        </div>
        {mode === 'login' && <Login go={go} />}
        {mode === 'register' && <Register go={go} />}
        {mode === 'forgot' && <Forgot go={go} />}
      </div>
    </div>
  );
}

