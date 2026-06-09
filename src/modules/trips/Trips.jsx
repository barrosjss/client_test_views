import React, { useState, useEffect, Fragment } from 'react';
import { Icon } from '../../shared/ui/Icon.jsx';
import {
  Logo, Btn, Badge, Avatar, Field, Input, Select, Checkbox, Switch,
  Card, Stat, ImgSlot, Segmented, Bar,
} from '../../shared/ui/primitives.jsx';
import {
  PageHead, Toolbar, FilterChip, Drawer, KV, CAT_ICON, VehBadge,
  Donut, BarChart, AreaChart, EmptyHint, Breadcrumb, Tabs,
  useSort, SortTh, useToasts, TableFooter,
} from '../../shared/ui/module-common.jsx';
import {
  VEHICLES, VEH_STATUS_TONE, DRIVERS, TRIPS, TRIP_TONE, MAINTENANCE,
  MNT_PRIORITY_TONE, MNT_STATUS_TONE, DOCUMENTS, DOC_TONE, INVOICES, INV_TONE,
  CONTACTS, USERS, ROLES, ALERTS, FUEL_LOG, INVENTORY, INV_STOCK_TONE, PAYROLL,
  WORKSHOPS, OT_STATES, WORK_ORDERS, OT_KPIS, FUEC_LIST, FUEC_STATUS_TONE,
  CONCILIATIONS, CONC_TONE, COMPARENDOS, COMP_TONE, CLIENTS, ODOMETER,
  INSPECTIONS, INSP_TONE, PERSONNEL, PERDIEMS, PERDIEM_TONE,
  SIIGO_JOURNALS, SIIGO_TONE, INSIGHTS_TEXT,
  fmtCOP, fmtNum,
} from '../../shared/data/index.js';

export function Trips() {
  const [tab, setTab] = useState("board");
  const [sel, setSel] = useState(null);

  const cols = [
    { key: "Pendiente", tone: "gray", icon: "inbox" },
    { key: "Programado", tone: "amber", icon: "calendar-clock" },
    { key: "En tránsito", tone: "blue", icon: "truck" },
    { key: "Completado", tone: "green", icon: "check-circle-2" },
  ];

  return (
    <div>
      <PageHead title="Viajes y despacho" subtitle="6 viajes esta semana · 12 conductores disponibles"
        actions={<Fragment>
          <Segmented options={[{ value: "board", label: "Tablero" }, { value: "list", label: "Lista" }]} value={tab} onChange={setTab} />
          <Btn variant="primary" icon="plus">Nuevo viaje</Btn>
        </Fragment>} />

      {tab === "board" ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, alignItems: "start" }} className="grid-4">
          {cols.map(c => {
            const items = TRIPS.filter(t => t.status === c.key);
            return (
              <div key={c.key} style={{ background: "var(--bg-2)", borderRadius: 14, padding: 12 }}>
                <div className="row between" style={{ padding: "4px 6px 12px" }}>
                  <span className="row gap-8" style={{ fontWeight: 700, fontSize: 13.5 }}><Icon name={c.icon} size={16} className="muted" />{c.key}</span>
                  <span style={{ background: "var(--surface)", borderRadius: 999, padding: "1px 9px", fontSize: 12, fontWeight: 700, color: "var(--slate-500)" }}>{items.length}</span>
                </div>
                <div className="col gap-10">
                  {items.length === 0 && <div style={{ padding: "24px 0", textAlign: "center", color: "var(--slate-300)", fontSize: 12.5, fontWeight: 600 }}>Sin viajes</div>}
                  {items.map(t => (
                    <div key={t.id} className="card" style={{ padding: 14, cursor: "pointer", transition: "all .14s" }} onClick={() => setSel(t)}
                      onMouseEnter={e => e.currentTarget.style.boxShadow = "var(--sh-md)"} onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                      <div className="row between" style={{ marginBottom: 10 }}>
                        <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-900)" }}>{t.id}</span>
                        <Badge tone={t.weight === "—" ? "violet" : "gray"}>{t.weight === "—" ? "Pasajeros" : t.weight}</Badge>
                      </div>
                      <div className="row gap-8" style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{t.origin}<Icon name="arrow-right" size={13} className="muted" />{t.dest}</div>
                      <div style={{ fontSize: 12, color: "var(--slate-400)", marginBottom: 12 }}>{t.cargo} · {t.dist}</div>
                      {t.progress > 0 && t.progress < 100 && <div style={{ marginBottom: 12 }}><Bar value={t.progress} /></div>}
                      <div className="row between" style={{ paddingTop: 10, borderTop: "1px solid var(--line-soft)" }}>
                        <span className="row gap-6">{t.driver === "Sin asignar" ? <span className="muted" style={{ fontSize: 12 }}>Sin conductor</span> : <Fragment><Avatar name={t.driver} size={22} /><span style={{ fontSize: 12, fontWeight: 600 }}>{t.driver.split(" ")[0]}</span></Fragment>}</span>
                        <span style={{ fontSize: 11.5, color: "var(--slate-400)", fontWeight: 600 }}>{t.eta}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Card>
          <table className="tbl">
            <thead><tr><th>Viaje</th><th>Ruta</th><th>Carga</th><th>Conductor / vehículo</th><th>ETA</th><th>Estado</th><th></th></tr></thead>
            <tbody>
              {TRIPS.map(t => (
                <tr key={t.id} style={{ cursor: "pointer" }} onClick={() => setSel(t)}>
                  <td className="mono" style={{ fontWeight: 700, color: "var(--ink-900)" }}>{t.id}</td>
                  <td><span className="row gap-6" style={{ fontWeight: 600 }}>{t.origin}<Icon name="arrow-right" size={13} className="muted" />{t.dest}</span><div style={{ fontSize: 12, color: "var(--slate-400)" }}>{t.dist}</div></td>
                  <td>{t.cargo}<div style={{ fontSize: 12, color: "var(--slate-400)" }}>{t.weight}</div></td>
                  <td>{t.driver === "Sin asignar" ? <span className="muted">Sin asignar</span> : <span className="row gap-8"><Avatar name={t.driver} size={26} /><div><div style={{ fontWeight: 600, fontSize: 13 }}>{t.driver}</div><div className="mono" style={{ fontSize: 11.5, color: "var(--slate-400)" }}>{t.vehicle}</div></div></span>}</td>
                  <td>{t.eta}</td>
                  <td><Badge tone={TRIP_TONE[t.status]} dot>{t.status}</Badge></td>
                  <td><Icon name="chevron-right" size={16} className="muted" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      <TripDrawer trip={sel} onClose={() => setSel(null)} />
    </div>
  );
}

export function TripDrawer({ trip, onClose }) {
  if (!trip) return null;
  const stops = [
    { city: trip.origin, label: "Origen", done: trip.progress > 0 },
    { city: "Punto de control", label: "En ruta", done: trip.progress > 50 },
    { city: trip.dest, label: "Destino", done: trip.progress === 100 },
  ];
  return (
    <Drawer open={!!trip} onClose={onClose} title={"Viaje " + trip.id} width={480}
      footer={<Fragment><Btn variant="primary" icon="map-pin" className="grow">Ver en mapa</Btn><Btn icon="printer">Manifiesto</Btn></Fragment>}>
      <div className="row between" style={{ marginBottom: 18 }}>
        <Badge tone={TRIP_TONE[trip.status]} dot>{trip.status}</Badge>
        <span className="muted" style={{ fontSize: 13 }}>{trip.dist} · ETA {trip.eta}</span>
      </div>

      <div className="card card-pad" style={{ marginBottom: 18 }}>
        {stops.map((s, i) => (
          <div key={i} className="row gap-12" style={{ alignItems: "flex-start", paddingBottom: i < stops.length - 1 ? 18 : 0 }}>
            <div className="col center" style={{ alignItems: "center" }}>
              <span style={{ width: 22, height: 22, borderRadius: 999, background: s.done ? "var(--success)" : "var(--bg-2)", color: "#fff", display: "grid", placeItems: "center", flex: "none", border: s.done ? "none" : "2px solid var(--slate-200)" }}>{s.done && <Icon name="check" size={12} strokeWidth={3} />}</span>
              {i < stops.length - 1 && <div style={{ width: 2, height: 30, background: s.done ? "var(--success)" : "var(--line)" }} />}
            </div>
            <div><div style={{ fontWeight: 700, fontSize: 14 }}>{s.city}</div><div style={{ fontSize: 12.5, color: "var(--slate-400)" }}>{s.label}</div></div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--slate-400)", textTransform: "uppercase", letterSpacing: ".06em" }}>Detalle</div>
      <KV label="Conductor">{trip.driver}</KV>
      <KV label="Vehículo"><span className="mono">{trip.vehicle}</span></KV>
      <KV label="Carga">{trip.cargo}</KV>
      <KV label="Peso">{trip.weight}</KV>
      <KV label="Progreso">{trip.progress}%</KV>
    </Drawer>
  );
}

