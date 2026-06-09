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

export function Vehicles() {
  const [filter, setFilter] = useState("Todos");
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(null);
  const [view, setView] = useState("table");

  const counts = {
    Todos: VEHICLES.length,
    Activo: VEHICLES.filter(v => v.status === "Activo").length,
    "En obra": VEHICLES.filter(v => v.status === "En obra").length,
    Mantenimiento: VEHICLES.filter(v => v.status === "Mantenimiento").length,
    Inactivo: VEHICLES.filter(v => v.status === "Inactivo").length,
  };
  const rows = VEHICLES.filter(v => (filter === "Todos" || v.status === filter) &&
    (q === "" || (v.plate + v.make + v.driver + v.type).toLowerCase().includes(q.toLowerCase())));

  return (
    <div>
      <Breadcrumb items={[{ label: "Operación" }, { label: "Vehículos" }]} />
      <PageHead title="Vehículos" subtitle={`28 unidades registradas · 17 activas en este momento`}
        actions={<Fragment>
          <Btn icon="upload">Importar</Btn>
          <Btn variant="primary" icon="plus">Registrar unidad</Btn>
        </Fragment>} />

      <div className="row between wrap gap-12" style={{ marginBottom: 16 }}>
        <div className="row gap-8 wrap">
          {Object.keys(counts).map(k => <FilterChip key={k} label={k} count={counts[k]} active={filter === k} onClick={() => setFilter(k)} />)}
        </div>
        <div className="row gap-10">
          <div className="input-group" style={{ width: 240 }}><Icon name="search" size={17} /><input className="input" placeholder="Placa, marca, conductor…" onChange={e => setQ(e.target.value)} /></div>
          <Segmented options={[{ value: "table", label: "Tabla" }, { value: "grid", label: "Tarjetas" }]} value={view} onChange={setView} />
        </div>
      </div>

      {view === "table" ? (
        <Card>
          <table className="tbl">
            <thead><tr><th>Unidad</th><th>Tipo</th><th>Marca / modelo</th><th>Conductor</th><th>Odómetro</th><th>Estado</th><th>Salud</th><th></th></tr></thead>
            <tbody>
              {rows.map(v => (
                <tr key={v.id} style={{ cursor: "pointer" }} onClick={() => setSel(v)}>
                  <td>
                    <div className="row gap-12">
                      <span style={{ width: 38, height: 38, borderRadius: 10, background: "var(--bg-2)", color: "var(--ink-600)", display: "grid", placeItems: "center", flex: "none" }}><Icon name={CAT_ICON[v.category]} size={19} /></span>
                      <div><div className="mono" style={{ fontWeight: 700, color: "var(--ink-900)", fontSize: 13.5 }}>{v.plate}</div><div style={{ fontSize: 12, color: "var(--slate-400)" }}>{v.id}</div></div>
                    </div>
                  </td>
                  <td>{v.type}</td>
                  <td><div style={{ fontWeight: 600 }}>{v.make}</div><div style={{ fontSize: 12, color: "var(--slate-400)" }}>{v.year}</div></td>
                  <td>{v.driver === "—" ? <span className="muted">Sin asignar</span> : v.driver}</td>
                  <td className="mono tnum">{fmtNum(v.odo)} km</td>
                  <td><VehBadge status={v.status} /></td>
                  <td><div className="row gap-8" style={{ width: 90 }}><Bar value={v.health} tone={v.health > 75 ? "success" : v.health > 50 ? "amber" : "danger"} /><span className="mono" style={{ fontSize: 12, fontWeight: 600 }}>{v.health}</span></div></td>
                  <td><Icon name="chevron-right" size={16} className="muted" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }} className="grid-3">
          {rows.map(v => (
            <div key={v.id} className="card card-pad" style={{ cursor: "pointer", transition: "all .15s" }} onClick={() => setSel(v)}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "var(--sh-md)"} onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
              <div className="row between" style={{ marginBottom: 14 }}>
                <span style={{ width: 44, height: 44, borderRadius: 12, background: "var(--ink-800)", color: "var(--amber-400)", display: "grid", placeItems: "center" }}><Icon name={CAT_ICON[v.category]} size={22} /></span>
                <VehBadge status={v.status} />
              </div>
              <div className="mono" style={{ fontWeight: 700, fontSize: 17, color: "var(--ink-900)" }}>{v.plate}</div>
              <div style={{ fontSize: 13, color: "var(--slate-500)", marginTop: 2 }}>{v.make} · {v.year}</div>
              <div style={{ height: 1, background: "var(--line-soft)", margin: "14px 0" }} />
              <div className="row between" style={{ fontSize: 12.5 }}><span className="muted">Conductor</span><span style={{ fontWeight: 600 }}>{v.driver === "—" ? "Sin asignar" : v.driver}</span></div>
              <div className="row between" style={{ fontSize: 12.5, marginTop: 8 }}><span className="muted">Salud</span><span style={{ fontWeight: 700, color: v.health > 75 ? "var(--success)" : v.health > 50 ? "var(--warning)" : "var(--danger)" }}>{v.health}%</span></div>
            </div>
          ))}
        </div>
      )}

      <VehicleDrawer veh={sel} onClose={() => setSel(null)} />
    </div>
  );
}

export function VehicleDrawer({ veh, onClose }) {
  const [tab, setTab] = useState("info");
  useEffect(() => { setTab("info"); }, [veh && veh.id]);
  if (!veh) return null;
  const vehDocs = DOCUMENTS.filter(d => d.vehicle === veh.plate);
  const vehInsp = INSPECTIONS.filter(i => i.plate === veh.plate);
  const vehMnt = MAINTENANCE.filter(m => m.vehicle === veh.plate);
  const vehOT = WORK_ORDERS.filter(o => o.plate === veh.plate);
  const vehComp = COMPARENDOS.filter(c => c.plate === veh.plate);
  return (
    <Drawer open={!!veh} onClose={onClose} title="Detalle de unidad" width={560}
      footer={<Fragment><Btn variant="primary" icon="route" className="grow">Asignar viaje</Btn><Btn icon="wrench">Crear OT</Btn></Fragment>}>
      <div className="row gap-16" style={{ marginBottom: 18 }}>
        <span style={{ width: 60, height: 60, borderRadius: 15, background: "var(--ink-800)", color: "var(--amber-400)", display: "grid", placeItems: "center", flex: "none" }}><Icon name={CAT_ICON[veh.category]} size={30} /></span>
        <div>
          <div className="mono" style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 24, color: "var(--ink-900)" }}>{veh.plate}</div>
          <div style={{ color: "var(--slate-500)", fontSize: 14 }}>{veh.make} · {veh.type}</div>
        </div>
        <div style={{ marginLeft: "auto" }}><VehBadge status={veh.status} /></div>
      </div>

      <div style={{ marginBottom: 18 }}>
        <Tabs size="sm" value={tab} onChange={setTab} tabs={[
          { value: "info", label: "Información" },
          { value: "docs", label: "Documentación", count: vehDocs.length },
          { value: "insp", label: "Inspecciones", count: vehInsp.length },
          { value: "odo", label: "Odómetro" },
          { value: "mnt", label: "Mantenimientos", count: vehMnt.length },
          { value: "ot", label: "OT", count: vehOT.length },
          { value: "comp", label: "Comparendos", count: vehComp.length },
        ]} />
      </div>

      {tab === "info" && <div className="fade-in">
        <div className="row gap-10" style={{ marginBottom: 18 }}>
          <Badge tone="gray" icon="gauge">{fmtNum(veh.odo)} km</Badge>
          <Badge tone="gray" icon="fuel">{veh.fuel}</Badge>
          <Badge tone={veh.health > 75 ? "green" : veh.health > 50 ? "amber" : "red"} icon="heart-pulse">Salud {veh.health}%</Badge>
        </div>
        <ImgSlot label="foto del vehículo" height={150} radius={14} style={{ marginBottom: 18 }} />
        <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--slate-400)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 4 }}>Ficha técnica</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
          <KV label="ID interno">{veh.id}</KV>
          <KV label="Año">{veh.year}</KV>
          <KV label="Marca / línea">{veh.make}</KV>
          <KV label="Clase">{veh.type}</KV>
          <KV label="Combustible">{veh.fuel}</KV>
          <KV label="Conductor">{veh.driver === "—" ? "Sin asignar" : veh.driver}</KV>
        </div>
        <KV label="Ubicación actual"><span className="row gap-6"><Icon name="map-pin" size={14} className="muted" />{veh.loc}</span></KV>
      </div>}

      {tab === "docs" && <div className="fade-in">
        {vehDocs.length === 0 ? <EmptyHint icon="file-x" text="Sin documentos registrados" /> : vehDocs.map(d => (
          <div key={d.id} className="row between" style={{ padding: "13px 0", borderBottom: "1px solid var(--line-soft)" }}>
            <span className="row gap-10"><span style={{ width: 32, height: 32, borderRadius: 9, background: "var(--bg-2)", display: "grid", placeItems: "center", color: "var(--ink-600)" }}><Icon name="file-text" size={16} /></span><div><div style={{ fontWeight: 600 }}>{d.doc}</div><div className="muted" style={{ fontSize: 12 }}>Vence {d.expires}</div></div></span>
            <Badge tone={DOC_TONE[d.status]} dot>{d.status}</Badge>
          </div>
        ))}
      </div>}

      {tab === "insp" && <div className="fade-in">
        {vehInsp.length === 0 ? <EmptyHint icon="clipboard-x" text="Sin inspecciones registradas" /> : vehInsp.map(i => (
          <div key={i.id} className="row between" style={{ padding: "13px 0", borderBottom: "1px solid var(--line-soft)" }}>
            <div><div style={{ fontWeight: 600 }}>{i.type} · <span className="mono" style={{ fontSize: 12.5 }}>{i.id}</span></div><div className="muted" style={{ fontSize: 12 }}>{i.date} · {i.items} ítems · {i.inspector}</div></div>
            <Badge tone={INSP_TONE[i.result]} dot>{i.result}</Badge>
          </div>
        ))}
      </div>}

      {tab === "odo" && <div className="fade-in">
        <div className="card card-pad" style={{ marginBottom: 14, textAlign: "center" }}>
          <div className="muted" style={{ fontSize: 12.5, fontWeight: 600 }}>Lectura actual</div>
          <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 32 }} className="mono">{fmtNum(veh.odo)} <span style={{ fontSize: 16, color: "var(--slate-400)" }}>km</span></div>
        </div>
        <AreaChart points={[veh.odo - 5200, veh.odo - 4100, veh.odo - 3200, veh.odo - 2000, veh.odo - 900, veh.odo]} height={120} />
        <div className="muted" style={{ fontSize: 12, textAlign: "center", marginTop: 8 }}>Evolución últimos 6 registros</div>
      </div>}

      {tab === "mnt" && <div className="fade-in">
        {vehMnt.length === 0 ? <EmptyHint icon="wrench" text="Sin mantenimientos" /> : vehMnt.map(m => (
          <div key={m.id} className="row between" style={{ padding: "13px 0", borderBottom: "1px solid var(--line-soft)" }}>
            <div><div style={{ fontWeight: 600 }}>{m.desc}</div><div className="muted" style={{ fontSize: 12 }}>{m.id} · {m.date} · {m.tech}</div></div>
            <span className="mono" style={{ fontWeight: 600, fontSize: 13 }}>{fmtCOP(m.cost)}</span>
          </div>
        ))}
      </div>}

      {tab === "ot" && <div className="fade-in">
        {vehOT.length === 0 ? <EmptyHint icon="clipboard-list" text="Sin órdenes de trabajo" /> : vehOT.map(o => (
          <div key={o.id} className="row between" style={{ padding: "13px 0", borderBottom: "1px solid var(--line-soft)" }}>
            <div><div style={{ fontWeight: 600 }}><span className="mono">{o.id}</span> · {o.obs}</div><div className="muted" style={{ fontSize: 12 }}>{o.date} · {o.taller}</div></div>
            <Badge tone={OT_STATES[o.state]} dot>{o.state}</Badge>
          </div>
        ))}
      </div>}

      {tab === "comp" && <div className="fade-in">
        {vehComp.length === 0 ? <EmptyHint icon="shield-check" text="Sin comparendos · vehículo al día" /> : vehComp.map(c => (
          <div key={c.id} className="row between" style={{ padding: "13px 0", borderBottom: "1px solid var(--line-soft)" }}>
            <div><div style={{ fontWeight: 600 }}>{c.reason} <span className="muted">({c.code})</span></div><div className="muted" style={{ fontSize: 12 }}>{c.id} · {c.date} · {c.driver}</div></div>
            <div style={{ textAlign: "right" }}><div className="mono" style={{ fontWeight: 600, fontSize: 13 }}>{fmtCOP(c.amount)}</div><Badge tone={COMP_TONE[c.status]}>{c.status}</Badge></div>
          </div>
        ))}
      </div>}
    </Drawer>
  );
}

