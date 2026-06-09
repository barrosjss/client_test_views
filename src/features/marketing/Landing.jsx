import React, { useState, useEffect, Fragment } from 'react';
import { Icon } from '../../shared/ui/Icon.jsx';
import {
  Logo, Btn, Badge, Avatar, Field, Input, Select, Checkbox, Switch,
  Card, Stat, ImgSlot, Segmented, Bar,
} from '../../shared/ui/primitives.jsx';
import { fmtCOP, fmtNum } from '../../shared/data/index.js';

export const MODULES_LP = [
  { icon: "truck", title: "Flota y maquinaria", desc: "Carros, camiones, grúas, excavadoras y buses en un solo inventario vivo." },
  { icon: "route", title: "Viajes y despacho", desc: "Asigna conductores, planifica rutas y sigue cada carga en tiempo real." },
  { icon: "wrench", title: "Mantenimiento", desc: "Órdenes de servicio preventivas y correctivas con costos y repuestos." },
  { icon: "map-pin", title: "Rastreo GPS", desc: "Ubicación, geocercas y alertas de velocidad de toda la operación." },
  { icon: "file-check", title: "Documentos", desc: "SOAT, técnico-mecánica y pólizas con alertas antes de cada vencimiento." },
  { icon: "receipt", title: "Conciliación y facturación", desc: "Factura viajes, concilia pagos y controla la cartera por cliente." },
  { icon: "fuel", title: "Combustible", desc: "Registra tanqueos, detecta consumos anómalos y mide la eficiencia." },
  { icon: "bar-chart-3", title: "Reportes y analítica", desc: "Indicadores de costo por kilómetro, utilización y rentabilidad." },
];

export function LPNav({ go }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const links = ['Plataforma', 'Módulos', 'Precios'];

  useEffect(() => {
    const el = document.querySelector('.lp-scroll');
    const fn = () => setScrolled((el ? el.scrollTop : window.scrollY) > 12);
    (el || window).addEventListener('scroll', fn);
    return () => (el || window).removeEventListener('scroll', fn);
  }, []);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        transition: 'all .2s',
        background: scrolled || open ? 'rgba(13,20,28,.92)' : 'transparent',
        backdropFilter: scrolled || open ? 'blur(14px)' : 'none',
        borderBottom: scrolled || open ? '1px solid rgba(255,255,255,.08)' : '1px solid transparent',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 22px' }} className="row between">
        <Logo light />
        <nav className="row gap-24 lp-nav-links" style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,.72)' }}>
          {links.map((l) => (
            <a
              key={l}
              href="#"
              style={{ transition: 'color .15s' }}
              onMouseEnter={(e) => { e.target.style.color = '#fff'; }}
              onMouseLeave={(e) => { e.target.style.color = 'rgba(255,255,255,.72)'; }}
            >
              {l}
            </a>
          ))}
          <a
            href="#"
            style={{ transition: 'color .15s' }}
            onClick={(e) => { e.preventDefault(); go('docs'); }}
            onMouseEnter={(e) => { e.target.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.target.style.color = 'rgba(255,255,255,.72)'; }}
          >
            Documentación
          </a>
        </nav>
        <div className="row gap-10 lp-cta-desktop">
          <button className="btn btn-link" style={{ color: 'rgba(255,255,255,.85)' }} onClick={() => go('login')}>
            Iniciar sesión
          </button>
          <button className="btn btn-primary" onClick={() => go('login')}>Ingresar</button>
        </div>
        <button
          type="button"
          className="lp-burger"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menú"
          style={{
            display: 'none',
            width: 42,
            height: 42,
            borderRadius: 11,
            border: '1px solid rgba(255,255,255,.16)',
            background: 'rgba(255,255,255,.06)',
            color: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <Icon name={open ? 'x' : 'menu'} size={22} />
        </button>
      </div>

      <div
        className="lp-mobile-panel"
        style={{
          display: 'none',
          overflow: 'hidden',
          maxHeight: open ? 420 : 0,
          transition: 'max-height .28s ease',
        }}
      >
        <div style={{ padding: '8px 22px 22px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {links.map((l) => (
            <a
              key={l}
              href="#"
              onClick={() => setOpen(false)}
              style={{
                color: 'rgba(255,255,255,.82)',
                fontSize: 16,
                fontWeight: 600,
                padding: '12px 4px',
                borderBottom: '1px solid rgba(255,255,255,.07)',
              }}
            >
              {l}
            </a>
          ))}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); setOpen(false); go('docs'); }}
            style={{
              color: 'rgba(255,255,255,.82)',
              fontSize: 16,
              fontWeight: 600,
              padding: '12px 4px',
              borderBottom: '1px solid rgba(255,255,255,.07)',
            }}
          >
            Documentación
          </a>
          <div className="col gap-10" style={{ marginTop: 14 }}>
            <button
              type="button"
              className="btn btn-lg btn-block"
              style={{ background: 'rgba(255,255,255,.08)', color: '#fff', border: '1px solid rgba(255,255,255,.16)' }}
              onClick={() => { setOpen(false); go('login'); }}
            >
              Iniciar sesión
            </button>
            <button
              type="button"
              className="btn btn-primary btn-lg btn-block"
              onClick={() => { setOpen(false); go('login'); }}
            >
              Ingresar a la plataforma
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export function LPHero({ go }) {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "radial-gradient(120% 90% at 80% -10%, #1a2531 0%, #0d141c 55%)" }}>
      {/* grid texture */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)", backgroundSize: "46px 46px", maskImage: "radial-gradient(80% 60% at 50% 30%, #000 30%, transparent 100%)" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "70px 28px 90px", position: "relative" }}>
        <div style={{ maxWidth: 720 }}>
          <span className="row gap-8" style={{ display: "inline-flex", background: "rgba(245,158,11,.12)", border: "1px solid rgba(245,158,11,.3)", color: "var(--amber-300)", padding: "6px 13px", borderRadius: 999, fontSize: 13, fontWeight: 600, marginBottom: 26 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--amber-400)" }} />
            La plataforma para flotas y maquinaria
          </span>
          <h1 style={{ color: "#fff", fontSize: 60, lineHeight: 1.02, letterSpacing: "-0.035em" }}>
            Toda tu operación de transporte,<br /><span style={{ color: "var(--amber-400)" }}>en un solo control.</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,.66)", fontSize: 19, lineHeight: 1.55, marginTop: 22, maxWidth: 560 }}>
            CMOCS reúne flota, viajes, mantenimiento, documentos y facturación para que gerentes, despachadores y contadores trabajen sobre los mismos datos, en tiempo real.
          </p>
          <div className="row gap-12 wrap" style={{ marginTop: 34 }}>
            <button className="btn btn-primary btn-lg" onClick={() => go("register")}>Solicitar una demo</button>
            <button className="btn btn-lg" style={{ background: "rgba(255,255,255,.08)", color: "#fff", border: "1px solid rgba(255,255,255,.16)" }} onClick={() => go("app")}>
              <Icon name="play" size={17} /> Ver la plataforma
            </button>
          </div>
          <div className="row gap-24 wrap" style={{ marginTop: 40, color: "rgba(255,255,255,.55)", fontSize: 13.5, fontWeight: 600 }}>
            <span className="row gap-8"><Icon name="check-circle-2" size={16} style={{ color: "var(--amber-400)" }} /> Sin tarjeta de crédito</span>
            <span className="row gap-8"><Icon name="check-circle-2" size={16} style={{ color: "var(--amber-400)" }} /> Implementación guiada</span>
            <span className="row gap-8"><Icon name="check-circle-2" size={16} style={{ color: "var(--amber-400)" }} /> Soporte en español</span>
          </div>
        </div>

        {/* dashboard preview */}
        <div style={{ marginTop: 60, borderRadius: 18, overflow: "hidden", border: "1px solid rgba(255,255,255,.12)", boxShadow: "0 40px 90px rgba(0,0,0,.5)", background: "var(--surface)" }}>
          <div style={{ height: 38, background: "var(--ink-800)", display: "flex", alignItems: "center", padding: "0 14px", gap: 7 }}>
            {["#ff5f57", "#febc2e", "#28c840"].map(c => <span key={c} style={{ width: 11, height: 11, borderRadius: 999, background: c }} />)}
            <span className="mono" style={{ marginLeft: 12, fontSize: 12, color: "rgba(255,255,255,.4)" }}>app.cmocs.co/dashboard</span>
          </div>
          <LPHeroPreview />
        </div>
      </div>
    </section>
  );
}

export function LPHeroPreview() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", background: "var(--bg)" }}>
      <div className="lp-preview-nav" style={{ background: "var(--ink-900)", padding: "18px 14px" }}>
        <Logo light size={24} />
        <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 4 }}>
          {[["layout-dashboard", "Dashboard", true], ["truck", "Flota", false], ["route", "Viajes", false], ["wrench", "Mantenimiento", false], ["receipt", "Facturación", false]].map(([ic, lb, on]) => (
            <div key={lb} className="row gap-10" style={{ padding: "9px 11px", borderRadius: 9, fontSize: 13, fontWeight: 600, color: on ? "#fff" : "rgba(255,255,255,.5)", background: on ? "rgba(245,158,11,.16)" : "transparent" }}>
              <Icon name={ic} size={16} style={{ color: on ? "var(--amber-400)" : "inherit" }} />{lb}
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: 22 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
          {[["Vehículos activos", "47", "truck", "green"], ["Viajes en curso", "12", "route", "blue"], ["Por vencer", "6", "file-warning", "amber"], ["Ingresos mes", "$184M", "trending-up", "amber"]].map(([l, v, ic, t]) => (
            <div key={l} className="card" style={{ padding: 14 }}>
              <span style={{ width: 30, height: 30, borderRadius: 9, display: "grid", placeItems: "center", background: `var(--${t}-tint)`, color: `var(--${t === "amber" ? "amber-600" : t})` }}><Icon name={ic} size={16} /></span>
              <div style={{ fontFamily: "var(--font-head)", fontSize: 23, fontWeight: 700, marginTop: 10 }}>{v}</div>
              <div style={{ fontSize: 11.5, color: "var(--slate-400)", fontWeight: 600 }}>{l}</div>
            </div>
          ))}
        </div>
        <div className="card" style={{ marginTop: 14, padding: 16 }}>
          <div className="row between" style={{ marginBottom: 12 }}>
            <span style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: 14 }}>Utilización de flota</span>
            <Badge tone="green" dot>En línea</Badge>
          </div>
          <div className="row gap-6" style={{ alignItems: "flex-end", height: 90 }}>
            {[58, 72, 64, 88, 76, 92, 70, 84, 66, 90, 78, 95].map((h, i) => (
              <div key={i} style={{ flex: 1, height: h + "%", background: i % 3 === 2 ? "var(--amber-500)" : "var(--ink-700)", borderRadius: "4px 4px 0 0", opacity: i % 3 === 2 ? 1 : .85 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function LPStats() {
  const stats = [["+9 800", "vehículos gestionados"], ["320", "empresas de transporte"], ["1.4M", "viajes liquidados"], ["99.9%", "disponibilidad"]];
  return (
    <section style={{ background: "var(--ink-900)", borderTop: "1px solid rgba(255,255,255,.07)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 28px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
        {stats.map(([v, l]) => (
          <div key={l}>
            <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 38, color: "#fff", letterSpacing: "-0.03em" }}>{v}</div>
            <div style={{ color: "rgba(255,255,255,.5)", fontSize: 14, fontWeight: 600, marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function LPModules() {
  return (
    <section id="modulos" style={{ background: "var(--bg)", padding: "90px 28px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 54px" }}>
          <span style={{ color: "var(--amber-600)", fontWeight: 700, fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase" }}>Módulos</span>
          <h2 style={{ fontSize: 42, marginTop: 12, letterSpacing: "-0.03em" }}>Una plataforma, toda la operación</h2>
          <p style={{ color: "var(--slate-500)", fontSize: 18, marginTop: 14, lineHeight: 1.5 }}>Activa solo lo que necesitas. Cada módulo comparte los mismos vehículos, conductores y clientes — sin doble digitación.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 }}>
          {MODULES_LP.map(m => (
            <div key={m.title} className="card card-pad" style={{ transition: "all .18s", cursor: "default" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "var(--sh-md)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
              <span style={{ width: 44, height: 44, borderRadius: 13, display: "grid", placeItems: "center", background: "var(--amber-tint)", color: "var(--amber-600)" }}><Icon name={m.icon} size={22} /></span>
              <h3 style={{ fontSize: 17, marginTop: 16 }}>{m.title}</h3>
              <p style={{ color: "var(--slate-500)", fontSize: 14, marginTop: 7, lineHeight: 1.5 }}>{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LPFeature() {
  const points = [
    { icon: "users", title: "Roles a la medida de tu empresa", desc: "Gerente, despachador, contador, jefe de taller o conductor — cada quien ve solo lo que le corresponde." },
    { icon: "bell-ring", title: "Alertas que se adelantan", desc: "Vencimientos, mantenimientos y consumos anómalos te avisan antes de que se vuelvan un problema." },
    { icon: "smartphone", title: "App para conductores", desc: "Tus operadores reciben viajes, suben documentos y reportan novedades desde el celular." },
  ];
  return (
    <section style={{ background: "var(--surface)", padding: "90px 28px", borderTop: "1px solid var(--line)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        <div>
          <span style={{ color: "var(--amber-600)", fontWeight: 700, fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase" }}>Por qué CMOCS</span>
          <h2 style={{ fontSize: 40, marginTop: 12, letterSpacing: "-0.03em", lineHeight: 1.1 }}>Pensada para quien mueve cargas pesadas</h2>
          <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 22 }}>
            {points.map(p => (
              <div key={p.title} className="row gap-16" style={{ alignItems: "flex-start" }}>
                <span style={{ width: 42, height: 42, borderRadius: 12, display: "grid", placeItems: "center", background: "var(--ink-800)", color: "var(--amber-400)", flex: "none" }}><Icon name={p.icon} size={20} /></span>
                <div>
                  <h3 style={{ fontSize: 17 }}>{p.title}</h3>
                  <p style={{ color: "var(--slate-500)", fontSize: 14.5, marginTop: 5, lineHeight: 1.55 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <ImgSlot label="foto operación · flota en carretera" height={420} radius={20} />
          <div className="card" style={{ position: "absolute", bottom: -22, left: -22, padding: 16, width: 230, boxShadow: "var(--sh-lg)" }}>
            <div className="row gap-10">
              <span style={{ width: 36, height: 36, borderRadius: 10, background: "var(--success-tint)", color: "var(--success)", display: "grid", placeItems: "center" }}><Icon name="check" size={18} /></span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Viaje entregado</div>
                <div style={{ fontSize: 12, color: "var(--slate-400)" }}>Cartagena → Sincelejo</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LPCta({ go }) {
  return (
    <section style={{ padding: "70px 28px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", borderRadius: 26, padding: "64px 48px", textAlign: "center", position: "relative", overflow: "hidden", background: "radial-gradient(120% 140% at 50% 0%, #1a2531, #0d141c)" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)", backgroundSize: "40px 40px", maskImage: "radial-gradient(70% 70% at 50% 0%, #000, transparent)" }} />
        <div style={{ position: "relative" }}>
          <h2 style={{ color: "#fff", fontSize: 42, letterSpacing: "-0.03em" }}>Empieza a controlar tu flota hoy</h2>
          <p style={{ color: "rgba(255,255,255,.66)", fontSize: 18, marginTop: 14, maxWidth: 520, margin: "14px auto 0" }}>Agenda una demo personalizada y migra tu operación en días, no meses.</p>
          <div className="row gap-12 center" style={{ marginTop: 30 }}>
            <button className="btn btn-primary btn-lg" onClick={() => go("register")}>Solicitar demo</button>
            <button className="btn btn-lg" style={{ background: "rgba(255,255,255,.08)", color: "#fff", border: "1px solid rgba(255,255,255,.16)" }} onClick={() => go("login")}>Iniciar sesión</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LPFooter() {
  const cols = [
    ["Producto", ["Módulos", "Precios", "Seguridad", "Integraciones"]],
    ["Empresa", ["Nosotros", "Clientes", "Blog", "Empleo"]],
    ["Soporte", ["Centro de ayuda", "Estado del servicio", "Contacto", "API"]],
  ];
  return (
    <footer style={{ background: "var(--ink-900)", padding: "56px 28px 36px", borderTop: "1px solid rgba(255,255,255,.07)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 40 }}>
        <div>
          <Logo light />
          <p style={{ color: "rgba(255,255,255,.5)", fontSize: 14, marginTop: 16, lineHeight: 1.6, maxWidth: 260 }}>La plataforma de gestión para empresas de flota, maquinaria y transporte de carga.</p>
        </div>
        {cols.map(([t, links]) => (
          <div key={t}>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, marginBottom: 14 }}>{t}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {links.map(l => <a key={l} href="#" style={{ color: "rgba(255,255,255,.55)", fontSize: 14 }}>{l}</a>)}
            </div>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1200, margin: "36px auto 0", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,.08)", color: "rgba(255,255,255,.4)", fontSize: 13 }} className="row between">
        <span>© 2026 CMOCS. Todos los derechos reservados.</span>
        <span className="row gap-20"><a href="#" style={{ color: "inherit" }}>Privacidad</a><a href="#" style={{ color: "inherit" }}>Términos</a></span>
      </div>
    </footer>
  );
}

export function Landing({ go }) {
  return (
    <div className="lp-scroll" style={{ height: "100vh", overflowY: "auto", background: "var(--ink-900)" }}>
      <LPNav go={go} />
      <LPHero go={go} />
      <LPStats />
      <LPModules />
      <LPFeature />
      <LPCta go={go} />
      <LPFooter />
    </div>
  );
}

