import React, { useState, Fragment } from 'react';
import { Icon } from '../../shared/ui/Icon.jsx';
import { Btn, Card } from '../../shared/ui/primitives.jsx';
import { PageHead, KV, CAT_ICON, VehBadge } from '../../shared/ui/module-common.jsx';
import { EmptyState } from '../../shared/ui/EmptyState.jsx';
import { VEHICLES } from '../../shared/data/index.js';
import { useIsMobile } from '../../shared/hooks/useIsMobile.js';

const SPEEDS = [62, 0, 48, 71, 0, 55, 80];

export function Tracking() {
  const isMobile = useIsMobile();
  const live = VEHICLES.filter((v) => v.status === 'Activo' || v.status === 'En obra');
  const [sel, setSel] = useState(() => live[0] ?? null);
  const markers = [
    { x: 32, y: 40 }, { x: 58, y: 28 }, { x: 70, y: 60 }, { x: 44, y: 68 },
    { x: 25, y: 72 }, { x: 80, y: 38 }, { x: 52, y: 50 },
  ];

  const selSpeed = sel ? SPEEDS[live.findIndex((v) => v.id === sel.id) % 7] : 0;

  if (live.length === 0) {
    return (
      <div>
        <PageHead
          title="Rastreo GPS"
          subtitle="Sin unidades en línea en este momento"
        />
        <div className="card">
          <EmptyState
            variant="empty"
            icon="satellite-dish"
            title="No hay señal GPS activa"
            description="No hay vehículos en estado Activo o En obra transmitiendo ubicación. Revisa el módulo de Flota o vuelve más tarde."
          />
        </div>
      </div>
    );
  }

  return (
    <div className="m-noscroll">
      <PageHead
        title="Rastreo GPS"
        subtitle={`${live.length} unidades transmitiendo en tiempo real`}
        actions={
          <Fragment>
            <Btn icon="bell">Geocercas</Btn>
            <Btn variant="primary" icon="locate">Centrar flota</Btn>
          </Fragment>
        }
      />

      <div
        className="track-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '340px 1fr',
          gap: 16,
          height: isMobile ? 'auto' : 'calc(100vh - 200px)',
          minHeight: isMobile ? 0 : 520,
        }}
      >
        <Card className="track-list" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: 14, borderBottom: "1px solid var(--line-soft)" }}>
            <div className="input-group"><Icon name="search" size={16} /><input className="input" placeholder="Buscar unidad…" style={{ height: 38, background: "var(--bg)" }} /></div>
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {live.map((v, i) => {
              const on = sel && sel.id === v.id;
              const speed = SPEEDS[i % 7];
              return (
                <button key={v.id} onClick={() => setSel(v)} style={{ display: "block", width: "100%", textAlign: "left", border: "none", borderLeft: on ? "3px solid var(--amber-500)" : "3px solid transparent", background: on ? "var(--amber-tint)" : "transparent", padding: "13px 16px", borderBottom: "1px solid var(--line-soft)", cursor: "pointer" }}>
                  <div className="row between">
                    <span className="row gap-10">
                      <span style={{ width: 32, height: 32, borderRadius: 9, background: "var(--ink-800)", color: "var(--amber-400)", display: "grid", placeItems: "center", flex: "none" }}><Icon name={CAT_ICON[v.category]} size={16} /></span>
                      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.3 }}><span className="mono" style={{ fontWeight: 700, fontSize: 13.5, color: "var(--ink-900)" }}>{v.plate}</span><span style={{ fontSize: 11.5, color: "var(--slate-400)" }}>{v.driver === "—" ? "Sin conductor" : v.driver.split(" ")[0]}</span></span>
                    </span>
                    <span style={{ textAlign: "right" }}>
                      <span className="mono" style={{ fontWeight: 700, fontSize: 14, color: speed > 0 ? "var(--success)" : "var(--slate-400)" }}>{speed}</span>
                      <span style={{ fontSize: 10, color: "var(--slate-400)", display: "block" }}>km/h</span>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        <Card className="track-map" style={{ position: 'relative', overflow: 'hidden', padding: 0, minHeight: 520 }}>
          <div
            className="track-map-canvas"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #eef3f6, #e3eaef)',
              backgroundImage:
                'linear-gradient(rgba(120,140,160,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(120,140,160,.12) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          >
            {/* fake roads */}
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} preserveAspectRatio="none">
              <path d="M -50 220 Q 300 120 700 280 T 1400 240" stroke="#cdd6de" strokeWidth="14" fill="none" strokeLinecap="round" />
              <path d="M 200 -50 Q 320 250 180 600" stroke="#cdd6de" strokeWidth="10" fill="none" strokeLinecap="round" />
              <path d="M -50 460 Q 400 400 900 520" stroke="#d6dee5" strokeWidth="9" fill="none" strokeLinecap="round" />
            </svg>
            {/* markers */}
            {markers.map((m, i) => {
              const v = live[i]; if (!v) return null;
              const on = sel && sel.id === v.id;
              return (
                <button key={i} onClick={() => setSel(v)} style={{ position: "absolute", left: m.x + "%", top: m.y + "%", transform: "translate(-50%,-50%)", border: "none", background: "transparent", cursor: "pointer", zIndex: on ? 5 : 2 }}>
                  <span style={{ width: on ? 42 : 34, height: on ? 42 : 34, borderRadius: "50% 50% 50% 0", transform: "rotate(-45deg)", background: on ? "var(--amber-500)" : "var(--ink-800)", display: "grid", placeItems: "center", boxShadow: "var(--sh-md)", border: "2px solid #fff", transition: "all .15s" }}>
                    <span style={{ transform: "rotate(45deg)", color: on ? "var(--ink-950)" : "#fff", display: "grid", placeItems: "center" }}><Icon name={CAT_ICON[v.category]} size={on ? 18 : 15} /></span>
                  </span>
                </button>
              );
            })}
            <div className="mono" style={{ position: "absolute", bottom: 12, left: 14, fontSize: 11, color: "var(--slate-400)", background: "rgba(255,255,255,.7)", padding: "3px 8px", borderRadius: 6 }}>mapa · placeholder de integración GPS</div>
            <div style={{ position: "absolute", top: 14, right: 14, display: "flex", flexDirection: "column", gap: 6 }}>
              <button className="btn btn-icon" style={{ background: "#fff", boxShadow: "var(--sh-sm)" }}><Icon name="plus" size={16} /></button>
              <button className="btn btn-icon" style={{ background: "#fff", boxShadow: "var(--sh-sm)" }}><Icon name="minus" size={16} /></button>
            </div>
          </div>

          {/* selected card */}
          {sel && (
            <div className="card fade-in" style={{ position: "absolute", bottom: 16, right: 16, width: 280, boxShadow: "var(--sh-lg)", zIndex: 6 }}>
              <div className="card-pad">
                <div className="row between" style={{ marginBottom: 12 }}>
                  <span className="mono" style={{ fontWeight: 700, fontSize: 16, color: "var(--ink-900)" }}>{sel.plate}</span>
                  <VehBadge status={sel.status} />
                </div>
                <KV label="Conductor">{sel.driver === "—" ? "Sin asignar" : sel.driver}</KV>
                <KV label="Ubicación"><span style={{ fontSize: 12.5 }}>{sel.loc}</span></KV>
                <KV label="Velocidad"><span className="mono">{selSpeed} km/h</span></KV>
                <KV label="Última señal">hace 8 s</KV>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

