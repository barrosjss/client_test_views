import React, { useState, useEffect, Fragment } from 'react';
import { Icon } from '../../shared/ui/Icon.jsx';
import { Logo, Btn, Badge, Avatar, Bar } from '../../shared/ui/primitives.jsx';
import { ALERTS } from '../../shared/data/index.js';
import { useIsMobile } from '../../shared/hooks/useIsMobile.js';

export const HOME_ITEM = { id: "dashboard", label: "Inicio", icon: "layout-dashboard" };

export const NAV = [
  { group: "Operación", items: [
    { id: "vehicles", label: "Vehículos", icon: "truck" },
    { id: "workorders", label: "Órdenes de trabajo", icon: "clipboard-list", badge: "92" },
    { id: "fuec", label: "FUEC", icon: "file-signature" },
    { id: "maintenance", label: "Mantenimientos", icon: "wrench" },
    { id: "tracking", label: "Rastreo satelital", icon: "satellite-dish" },
  ]},
  { group: "Contactos", items: [
    { id: "contacts", label: "Contactos", icon: "contact" },
    { id: "drivers", label: "Conductores", icon: "id-card" },
    { id: "workshops", label: "Talleres", icon: "warehouse" },
  ]},
  { group: "Facturación", items: [
    { id: "conciliations", label: "Conciliaciones", icon: "git-compare-arrows", badge: "34" },
    { id: "billing", label: "Facturas", icon: "receipt" },
    { id: "receivables", label: "Cuentas por cobrar", icon: "hand-coins" },
    { id: "siigo", label: "Integración SIIGO", icon: "refresh-cw" },
  ]},
  { group: "Gestión de personal", items: [
    { id: "payroll", label: "Nómina", icon: "wallet" },
    { id: "personnel", label: "Hoja de vida", icon: "folder-kanban" },
    { id: "perdiems", label: "Viáticos", icon: "banknote" },
  ]},
  { group: "Sistema", items: [
    { id: "documents", label: "Documentos", icon: "file-check", badge: "5" },
    { id: "reports", label: "Reportes", icon: "bar-chart-3" },
    { id: "users", label: "Usuarios y roles", icon: "users" },
  ]},
];

export const NAV_TITLES = { [HOME_ITEM.id]: HOME_ITEM.label };
NAV.forEach(g => g.items.forEach(i => NAV_TITLES[i.id] = i.label));

export function NavButton({ it, on, collapsed, onClick }) {
  return (
    <button onClick={onClick} title={collapsed ? it.label : undefined}
      className={"nav-item" + (on ? " active" : "")}
      style={{
        padding: collapsed ? "11px" : "10px 12px",
        justifyContent: collapsed ? "center" : "flex-start",
      }}>
      <span className="nav-active-bar" />
      <Icon name={it.icon} size={19} className="nav-ic" />
      {!collapsed && <span style={{ flex: 1, textAlign: "left" }}>{it.label}</span>}
      {!collapsed && it.badge && <span style={{ background: "var(--amber-500)", color: "var(--ink-950)", fontSize: 11, fontWeight: 700, borderRadius: 999, padding: "1px 7px" }}>{it.badge}</span>}
    </button>
  );
}

export function Sidebar({ active, setActive, collapsed, mobileOpen, setMobileOpen }) {
  const width = collapsed ? 76 : 248;
  const [open, setOpen] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cmocs.navOpen")) || {}; } catch (e) { return {}; }
  });
  // default: every group expanded unless explicitly closed
  const isOpen = (g) => open[g] !== false;
  const toggleGroup = (g) => setOpen(o => {
    const next = { ...o, [g]: o[g] === false ? true : false };
    localStorage.setItem("cmocs.navOpen", JSON.stringify(next));
    return next;
  });

  const go = (id) => { setActive(id); setMobileOpen(false); };

  return (
    <Fragment>
      {mobileOpen && <div onClick={() => setMobileOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(13,20,28,.5)", zIndex: 60 }} className="sb-overlay" />}
      <aside className={"cmocs-sidebar" + (mobileOpen ? " open" : "")} style={{ width, background: "var(--ink-900)", display: "flex", flexDirection: "column", flex: "none", transition: "width .2s", zIndex: 70 }}>
        <div style={{ height: 64, display: "flex", alignItems: "center", padding: collapsed ? "0" : "0 20px", justifyContent: collapsed ? "center" : "flex-start", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
          <Logo light showText={!collapsed} size={28} />
        </div>
        <nav style={{ flex: 1, overflowY: "auto", padding: "12px 12px" }}>
          {/* Inicio — standalone */}
          <div style={{ marginBottom: 10, paddingBottom: 10, borderBottom: "1px solid rgba(255,255,255,.07)" }}>
            <NavButton it={HOME_ITEM} on={active === HOME_ITEM.id} collapsed={collapsed} onClick={() => go(HOME_ITEM.id)} />
          </div>

          {NAV.map(g => {
            const expanded = isOpen(g.group);
            const hasActive = g.items.some(i => i.id === active);
            return (
              <div key={g.group} style={{ marginBottom: 4 }}>
                {!collapsed ? (
                  <button onClick={() => toggleGroup(g.group)} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", border: "none", background: "transparent", cursor: "pointer",
                    fontSize: 10.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase",
                    color: hasActive ? "rgba(245,158,11,.9)" : "rgba(255,255,255,.34)", padding: "8px 12px",
                  }}>
                    <span>{g.group}</span>
                    <Icon name="chevron-down" size={14} style={{ transition: "transform .2s", transform: expanded ? "none" : "rotate(-90deg)", opacity: .8 }} />
                  </button>
                ) : (
                  <div style={{ height: 1, background: "rgba(255,255,255,.07)", margin: "8px 8px" }} />
                )}
                {(expanded || collapsed) && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 2, paddingBottom: 6 }}>
                    {g.items.map(it => <NavButton key={it.id} it={it} on={active === it.id} collapsed={collapsed} onClick={() => go(it.id)} />)}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div style={{ padding: 12, borderTop: "1px solid rgba(255,255,255,.07)" }}>
          {!collapsed ? (
            <div style={{ background: "rgba(255,255,255,.04)", borderRadius: 12, padding: 14 }}>
              <div className="row gap-8" style={{ color: "var(--amber-400)", marginBottom: 8 }}><Icon name="sparkles" size={16} /><span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Plan Pro</span></div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)", lineHeight: 1.5, marginBottom: 10 }}>32 de 50 vehículos activos</div>
              <Bar value={64} />
            </div>
          ) : (
            <div style={{ display: "grid", placeItems: "center", color: "var(--amber-400)" }}><Icon name="sparkles" size={20} /></div>
          )}
        </div>
      </aside>
    </Fragment>
  );
}

export function Topbar({ active, collapsed, setCollapsed, setMobileOpen, go }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  return (
    <header style={{ height: 64, background: "var(--surface)", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", gap: 16, padding: "0 20px", flex: "none", position: "relative", zIndex: 40 }}>
      <button className="btn btn-ghost btn-icon btn-sm desktop-only" onClick={() => setCollapsed(c => !c)}><Icon name="panel-left" size={18} /></button>
      <button className="btn btn-ghost btn-icon btn-sm mobile-only" onClick={() => setMobileOpen(true)}><Icon name="menu" size={18} /></button>
      <div>
        <h1 style={{ fontSize: 18 }}>{NAV_TITLES[active] || "Dashboard"}</h1>
      </div>
      <div className="grow" />
      <div className="input-group desktop-only" style={{ width: 280 }}>
        <Icon name="search" size={17} />
        <input className="input" placeholder="Buscar vehículo, viaje, factura…" style={{ height: 40, background: "var(--bg)" }} />
        <span className="input-affix mono" style={{ fontSize: 11, color: "var(--slate-300)" }}>⌘K</span>
      </div>
      <button className="btn btn-ghost btn-icon"><Icon name="plus" size={18} /></button>
      <div style={{ position: "relative" }}>
        <button className="btn btn-ghost btn-icon" onClick={() => { setNotifOpen(o => !o); setUserOpen(false); }} style={{ position: "relative" }}>
          <Icon name="bell" size={18} />
          <span style={{ position: "absolute", top: 8, right: 9, width: 7, height: 7, borderRadius: 999, background: "var(--danger)", border: "1.5px solid #fff" }} />
        </button>
        {notifOpen && <NotifMenu close={() => setNotifOpen(false)} />}
      </div>
      <div style={{ width: 1, height: 28, background: "var(--line)" }} />
      <div style={{ position: "relative" }}>
        <button onClick={() => { setUserOpen(o => !o); setNotifOpen(false); }} className="row gap-8" style={{ border: "none", background: "transparent", padding: 4, borderRadius: 10 }}>
          <Avatar name="Andrea Villalba" size={34} />
          <div className="desktop-only" style={{ textAlign: "left", lineHeight: 1.2 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-900)" }}>Andrea Villalba</div>
            <div style={{ fontSize: 11.5, color: "var(--slate-400)" }}>Administrador</div>
          </div>
          <Icon name="chevron-down" size={15} className="desktop-only muted" />
        </button>
        {userOpen && <UserMenu close={() => setUserOpen(false)} go={go} />}
      </div>
    </header>
  );
}

export function NotifMenu({ close }) {
  return (
    <Fragment>
      <div onClick={close} style={{ position: "fixed", inset: 0, zIndex: 80 }} />
      <div className="card fade-in" style={{ position: "absolute", top: 52, right: 0, width: 340, boxShadow: "var(--sh-lg)", zIndex: 90, overflow: "hidden" }}>
        <div className="card-hd"><span className="card-title">Alertas</span><Badge tone="red">4 nuevas</Badge></div>
        <div style={{ maxHeight: 360, overflowY: "auto" }}>
          {ALERTS.map((a, i) => (
            <div key={i} className="row gap-12" style={{ padding: "13px 18px", borderBottom: "1px solid var(--line-soft)", alignItems: "flex-start" }}>
              <span style={{ width: 34, height: 34, borderRadius: 10, flex: "none", background: `var(--${a.tone}-tint)`, color: `var(--${a.tone === "amber" ? "amber-600" : a.tone})`, display: "grid", placeItems: "center" }}><Icon name={a.icon} size={17} /></span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink-900)" }}>{a.title}</div>
                <div style={{ fontSize: 12.5, color: "var(--slate-500)", marginTop: 2 }}>{a.desc}</div>
              </div>
              <span style={{ fontSize: 11, color: "var(--slate-300)" }}>{a.time}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: 12 }}><button className="btn btn-soft btn-block btn-sm">Ver todas</button></div>
      </div>
    </Fragment>
  );
}

export function UserMenu({ close, go }) {
  const items = [["user", "Mi perfil"], ["building-2", "Mi empresa"], ["settings", "Configuración"], ["life-buoy", "Ayuda y soporte"]];
  return (
    <Fragment>
      <div onClick={close} style={{ position: "fixed", inset: 0, zIndex: 80 }} />
      <div className="card fade-in" style={{ position: "absolute", top: 52, right: 0, width: 240, boxShadow: "var(--sh-lg)", zIndex: 90, padding: 8 }}>
        <div className="row gap-10" style={{ padding: "8px 10px 12px", borderBottom: "1px solid var(--line-soft)", marginBottom: 6 }}>
          <Avatar name="Andrea Villalba" size={38} />
          <div><div style={{ fontSize: 13.5, fontWeight: 700 }}>Andrea Villalba</div><div style={{ fontSize: 12, color: "var(--slate-400)" }}>andrea@cmocs.co</div></div>
        </div>
        {items.map(([ic, l]) => (
          <button key={l} className="row gap-10" style={{ width: "100%", border: "none", background: "transparent", padding: "9px 10px", borderRadius: 8, fontSize: 13.5, fontWeight: 600, color: "var(--ink-700)" }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--bg)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            <Icon name={ic} size={17} className="muted" /> {l}
          </button>
        ))}
        <div style={{ height: 1, background: "var(--line-soft)", margin: "6px 0" }} />
        <button className="row gap-10" style={{ width: "100%", border: "none", background: "var(--amber-tint)", padding: "9px 10px", borderRadius: 8, fontSize: 13.5, fontWeight: 700, color: "var(--amber-700)" }}
          onMouseEnter={e => e.currentTarget.style.background = "var(--amber-tint-2)"} onMouseLeave={e => e.currentTarget.style.background = "var(--amber-tint)"}
          onClick={() => { close(); go("docs"); }}>
          <Icon name="book-open" size={17} /> Documentación y guía
        </button>
        <div style={{ height: 1, background: "var(--line-soft)", margin: "6px 0" }} />
        <button className="row gap-10" style={{ width: "100%", border: "none", background: "transparent", padding: "9px 10px", borderRadius: 8, fontSize: 13.5, fontWeight: 600, color: "var(--danger)" }}
          onMouseEnter={e => e.currentTarget.style.background = "var(--danger-tint)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          onClick={() => go("login")}>
          <Icon name="log-out" size={17} /> Cerrar sesión
        </button>
      </div>
    </Fragment>
  );
}

/* --- MOBILE APP CHROME (PWA) --- */
const M_TABS = [
  { id: 'dashboard', label: 'Inicio', icon: 'home' },
  { id: 'vehicles', label: 'Flota', icon: 'truck' },
  { id: 'workorders', label: 'OT', icon: 'clipboard-list', badge: '92' },
  { id: 'tracking', label: 'Mapa', icon: 'satellite-dish' },
  { id: '__more', label: 'Más', icon: 'menu' },
];

function MobileAppBar({ active, onBell, onProfile }) {
  return (
    <header className="m-appbar">
      <Logo size={28} showText={false} />
      <h1>{NAV_TITLES[active] || 'CMOCS'}</h1>
      <div className="grow" />
      <button className="btn btn-ghost btn-icon btn-sm" onClick={onBell} style={{ position: 'relative' }}>
        <Icon name="bell" size={19} />
        <span style={{ position: 'absolute', top: 6, right: 7, width: 7, height: 7, borderRadius: 999, background: 'var(--danger)', border: '1.5px solid #fff' }} />
      </button>
      <button onClick={onProfile} style={{ border: 'none', background: 'transparent', padding: 2, borderRadius: 999 }}>
        <Avatar name="Andrea Villalba" size={32} />
      </button>
    </header>
  );
}

function MobileBottomNav({ active, onTab, moreActive }) {
  const inTabs = M_TABS.some((t) => t.id === active);
  return (
    <nav className="m-bottomnav">
      {M_TABS.map((t) => {
        const on = t.id === '__more' ? (moreActive || !inTabs) : (active === t.id && !moreActive);
        return (
          <button key={t.id} className={'m-tab' + (on ? ' on' : '')} onClick={() => onTab(t.id)}>
            <span className="m-tab-ic">
              <Icon name={t.icon} size={22} />
              {t.badge && <span className="m-tab-badge">{t.badge}</span>}
            </span>
            {t.label}
          </button>
        );
      })}
    </nav>
  );
}

function BottomSheet({ open, onClose, title, action, children }) {
  if (!open) return null;
  return (
    <Fragment>
      <div className="m-sheet-backdrop" onClick={onClose} />
      <div className="m-sheet">
        <div className="m-sheet-grip" />
        {title && (
          <div className="row between" style={{ padding: '6px 16px 12px', borderBottom: '1px solid var(--line-soft)' }}>
            <span style={{ fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 17 }}>{title}</span>
            <div className="row gap-8">{action}<button className="btn btn-soft btn-icon btn-sm" onClick={onClose}><Icon name="x" size={18} /></button></div>
          </div>
        )}
        <div style={{ overflowY: 'auto', padding: '6px 0 10px' }}>{children}</div>
      </div>
    </Fragment>
  );
}

function MoreSheet({ open, onClose, active, goModule, goScreen }) {
  return (
    <BottomSheet open={open} onClose={onClose} title="Menú">
      <button className={'m-sheet-row' + (active === HOME_ITEM.id ? ' on' : '')} onClick={() => goModule(HOME_ITEM.id)}>
        <Icon name={HOME_ITEM.icon} size={20} style={{ color: active === HOME_ITEM.id ? 'var(--amber-600)' : 'var(--slate-400)' }} />
        <span style={{ flex: 1 }}>{HOME_ITEM.label}</span>
        <Icon name="chevron-right" size={16} className="muted" />
      </button>
      {NAV.map((g) => (
        <div key={g.group}>
          <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--slate-400)', padding: '12px 18px 4px' }}>{g.group}</div>
          {g.items.map((it) => {
            const on = active === it.id;
            return (
              <button key={it.id} className={'m-sheet-row' + (on ? ' on' : '')} onClick={() => goModule(it.id)}>
                <Icon name={it.icon} size={20} style={{ color: on ? 'var(--amber-600)' : 'var(--slate-400)' }} />
                <span style={{ flex: 1 }}>{it.label}</span>
                {it.badge && <span style={{ background: 'var(--amber-500)', color: 'var(--ink-950)', fontSize: 11, fontWeight: 700, borderRadius: 999, padding: '1px 8px' }}>{it.badge}</span>}
                <Icon name="chevron-right" size={16} className="muted" />
              </button>
            );
          })}
        </div>
      ))}
      <div style={{ height: 1, background: 'var(--line-soft)', margin: '10px 0' }} />
      <button className="m-sheet-row" style={{ color: 'var(--amber-700)' }} onClick={() => goScreen('docs')}>
        <Icon name="book-open" size={20} /><span style={{ flex: 1 }}>Documentación y guía</span><Icon name="chevron-right" size={16} className="muted" />
      </button>
    </BottomSheet>
  );
}

function NotifSheet({ open, onClose }) {
  return (
    <BottomSheet open={open} onClose={onClose} title="Alertas" action={<Badge tone="red">4 nuevas</Badge>}>
      {ALERTS.map((a, i) => (
        <div key={i} className="row gap-12" style={{ padding: '13px 18px', borderBottom: '1px solid var(--line-soft)', alignItems: 'flex-start' }}>
          <span style={{ width: 36, height: 36, borderRadius: 10, flex: 'none', background: `var(--${a.tone}-tint)`, color: `var(--${a.tone === 'amber' ? 'amber-600' : a.tone})`, display: 'grid', placeItems: 'center' }}><Icon name={a.icon} size={18} /></span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-900)' }}>{a.title}</div>
            <div style={{ fontSize: 13, color: 'var(--slate-500)', marginTop: 2 }}>{a.desc}</div>
          </div>
          <span style={{ fontSize: 11, color: 'var(--slate-300)' }}>{a.time}</span>
        </div>
      ))}
      <div style={{ padding: 14 }}><button className="btn btn-soft btn-block">Ver todas las alertas</button></div>
    </BottomSheet>
  );
}

function ProfileSheet({ open, onClose, goScreen }) {
  const items = [['user', 'Mi perfil'], ['building-2', 'Mi empresa'], ['settings', 'Configuración'], ['life-buoy', 'Ayuda y soporte']];
  return (
    <BottomSheet open={open} onClose={onClose}>
      <div className="row gap-12" style={{ padding: '4px 18px 14px', borderBottom: '1px solid var(--line-soft)' }}>
        <Avatar name="Andrea Villalba" size={46} />
        <div><div style={{ fontWeight: 700, fontSize: 15.5 }}>Andrea Villalba</div><div style={{ fontSize: 12.5, color: 'var(--slate-400)' }}>andrea@cmocs.co</div><div style={{ marginTop: 4 }}><Badge tone="amber">Administrador</Badge></div></div>
      </div>
      {items.map(([ic, l]) => (
        <button key={l} className="m-sheet-row" onClick={onClose}><Icon name={ic} size={20} className="muted" /><span style={{ flex: 1 }}>{l}</span><Icon name="chevron-right" size={16} className="muted" /></button>
      ))}
      <button className="m-sheet-row" style={{ color: 'var(--amber-700)' }} onClick={() => goScreen('docs')}><Icon name="book-open" size={20} /><span style={{ flex: 1 }}>Documentación y guía</span></button>
      <div style={{ height: 1, background: 'var(--line-soft)', margin: '8px 0' }} />
      <button className="m-sheet-row" style={{ color: 'var(--danger)' }} onClick={() => goScreen('login')}><Icon name="log-out" size={20} /><span style={{ flex: 1 }}>Cerrar sesión</span></button>
    </BottomSheet>
  );
}

export function Shell({ active, setActive, go, children }) {
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem('cmocs.collapsed') === '1');
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();
  const [sheet, setSheet] = useState(null);

  useEffect(() => { localStorage.setItem('cmocs.collapsed', collapsed ? '1' : '0'); }, [collapsed]);
  useEffect(() => { if (!isMobile) setSheet(null); }, [isMobile]);

  const onTab = (id) => {
    if (id === '__more') setSheet((s) => (s === 'more' ? null : 'more'));
    else { setActive(id); setSheet(null); }
  };
  const goModule = (id) => { setActive(id); setSheet(null); };
  const goScreen = (s) => { setSheet(null); go(s); };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg)' }}>
      {!isMobile && <Sidebar active={active} setActive={setActive} collapsed={collapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {isMobile
          ? <MobileAppBar active={active} onBell={() => setSheet((s) => (s === 'notif' ? null : 'notif'))} onProfile={() => setSheet((s) => (s === 'profile' ? null : 'profile'))} />
          : <Topbar active={active} collapsed={collapsed} setCollapsed={setCollapsed} setMobileOpen={setMobileOpen} go={go} />}
        <main className="cmocs-main" style={{ flex: 1, overflowY: 'auto', padding: isMobile ? undefined : '26px 28px 60px' }}>
          <div key={active} className="fade-in" style={{ maxWidth: 1280, margin: '0 auto' }}>{children}</div>
        </main>
      </div>

      {isMobile && <MobileBottomNav active={active} onTab={onTab} moreActive={sheet === 'more'} />}
      <MoreSheet open={sheet === 'more'} onClose={() => setSheet(null)} active={active} goModule={goModule} goScreen={goScreen} />
      <NotifSheet open={sheet === 'notif'} onClose={() => setSheet(null)} />
      <ProfileSheet open={sheet === 'profile'} onClose={() => setSheet(null)} goScreen={goScreen} />
    </div>
  );
}

