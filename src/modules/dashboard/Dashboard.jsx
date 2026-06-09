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

export function KpiCard({ icon, label, value, tone = "amber", onClick, hint }) {
  const c = tone === "amber" ? "amber-600" : tone === "gray" ? "slate-500" : tone;
  return (
    <button onClick={onClick} className="card card-pad" style={{ textAlign: "left", cursor: "pointer", border: "1px solid var(--line)", transition: "all .15s", display: "flex", flexDirection: "column", gap: 12 }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--amber-400)"; e.currentTarget.style.boxShadow = "var(--sh-sm)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
      <div className="row between">
        <span style={{ width: 38, height: 38, borderRadius: 11, display: "grid", placeItems: "center", background: `var(--${tone}-tint)`, color: `var(--${c})` }}><Icon name={icon} size={19} /></span>
        <Icon name="arrow-up-right" size={16} className="muted" />
      </div>
      <div>
        <div style={{ fontFamily: "var(--font-head)", fontSize: 30, fontWeight: 700, letterSpacing: "-0.03em" }} className="tnum">{value}</div>
        <div style={{ fontSize: 13, color: "var(--slate-500)", fontWeight: 600 }}>{label}</div>
        {hint && <div style={{ fontSize: 11.5, color: "var(--slate-400)", marginTop: 2 }}>{hint}</div>}
      </div>
    </button>
  );
}

export function Dashboard({ setActive }) {
  const revenue = [120, 132, 128, 145, 138, 156, 149, 162, 158, 171, 168, 184];
  const driversToShow = DRIVERS.slice(0, 5).map((d, i) => ({ ...d, expired: i === 3 }));

  return (
    <div className="col gap-20">
      {/* Hero banner */}
      <div style={{ position: "relative", overflow: "hidden", borderRadius: 20, padding: "26px 28px", background: "radial-gradient(120% 160% at 85% -20%, #1a2531 0%, #0d141c 60%)" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)", backgroundSize: "40px 40px", maskImage: "radial-gradient(80% 100% at 90% 0%, #000, transparent)" }} />
        <div className="row between wrap gap-16" style={{ position: "relative" }}>
          <div>
            <span className="badge" style={{ background: "rgba(245,158,11,.14)", color: "var(--amber-300)", marginBottom: 12 }}><span className="dot" />Centro de Mando · en línea</span>
            <h2 style={{ color: "#fff", fontSize: 26 }}>Buenos días, Andrea 👋</h2>
            <p style={{ color: "rgba(255,255,255,.6)", fontSize: 14.5, marginTop: 6 }}>Jueves, 4 de junio de 2026 · Resumen operativo de la flota</p>
            <div className="row gap-8 wrap" style={{ marginTop: 16 }}>
              {[["17 vehículos activos", "truck"], ["92 OT abiertas", "clipboard-list"], ["7 conductores", "id-card"], ["5 docs vencidos", "file-warning"]].map(([t, ic]) => (
                <span key={t} className="row gap-6" style={{ background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.85)", padding: "6px 12px", borderRadius: 999, fontSize: 12.5, fontWeight: 600 }}><Icon name={ic} size={14} style={{ color: "var(--amber-400)" }} />{t}</span>
              ))}
            </div>
          </div>
          <div className="row gap-10">
            <button className="btn btn-primary" onClick={() => setActive("workorders")}><Icon name="plus" size={18} /> Nueva OT</button>
            <button className="btn" style={{ background: "rgba(255,255,255,.08)", color: "#fff", border: "1px solid rgba(255,255,255,.16)" }} onClick={() => setActive("vehicles")}>Ver flota</button>
          </div>
        </div>
      </div>

      {/* KPI cards (actionable) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 14 }} className="grid-6">
        <KpiCard icon="truck" label="Vehículos activos" value="17" hint="de 28 totales" tone="green" onClick={() => setActive("vehicles")} />
        <KpiCard icon="clipboard-list" label="OT activas" value="92" tone="blue" onClick={() => setActive("workorders")} />
        <KpiCard icon="git-compare-arrows" label="Conciliaciones" value="34" tone="violet" onClick={() => setActive("conciliations")} />
        <KpiCard icon="file-warning" label="Docs vencidos" value="5" tone="red" onClick={() => setActive("documents")} />
        <KpiCard icon="id-card" label="Conductores" value="7" tone="amber" onClick={() => setActive("drivers")} />
        <KpiCard icon="warehouse" label="Talleres" value="95" tone="gray" onClick={() => setActive("workshops")} />
      </div>

      {/* charts + flota dist + insights */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }} className="grid-2-1">
        <Card title="Estadísticas operativas" action={<Segmented options={["6M", "12M", "Año"]} value="12M" onChange={() => {}} />}>
          <div className="card-pad">
            <div className="row gap-24" style={{ marginBottom: 16 }}>
              <div><div className="muted" style={{ fontSize: 12.5, fontWeight: 600 }}>Ingresos</div><div style={{ fontFamily: "var(--font-head)", fontSize: 24, fontWeight: 700 }}>$1.84B</div></div>
              <div><div className="muted" style={{ fontSize: 12.5, fontWeight: 600 }}>Costos</div><div style={{ fontFamily: "var(--font-head)", fontSize: 24, fontWeight: 700, color: "var(--slate-500)" }}>$1.12B</div></div>
              <div><div className="muted" style={{ fontSize: 12.5, fontWeight: 600 }}>Margen</div><div style={{ fontFamily: "var(--font-head)", fontSize: 24, fontWeight: 700, color: "var(--success)" }}>39%</div></div>
            </div>
            <AreaChart points={revenue} height={170} />
            <div className="row between" style={{ marginTop: 6 }}>
              {["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"].map(m => <span key={m} style={{ fontSize: 10.5, color: "var(--slate-300)", fontWeight: 600 }}>{m}</span>)}
            </div>
          </div>
        </Card>

        <div className="col gap-16">
          <Card title="Distribución de flota por cliente">
            <div className="card-pad col center gap-14">
              <Donut value={68} label="28" sub="vehículos" size={130} />
              <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
                {[["Constructora Andina", 8, "amber-500"], ["Minera El Cerrejón", 6, "info"], ["Cementos Bolívar", 5, "success"], ["Otros", 9, "slate-300"]].map(([l, v, c]) => (
                  <div key={l} className="row between"><span className="row gap-8" style={{ fontSize: 12.5, fontWeight: 600 }}><span style={{ width: 9, height: 9, borderRadius: 3, background: `var(--${c})` }} />{l}</span><span style={{ fontWeight: 700, fontSize: 12.5 }}>{v}</span></div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Insights IA + alerts */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }} className="grid-2-1">
        <Card>
          <div className="card-pad">
            <div className="row gap-10" style={{ marginBottom: 12 }}>
              <span style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(145deg,#fbbf24,#d97706)", display: "grid", placeItems: "center", color: "var(--ink-950)" }}><Icon name="sparkles" size={19} /></span>
              <div><div style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: 15 }}>Insights operativos</div><div className="muted" style={{ fontSize: 12 }}>Generado por IA · hace 5 min</div></div>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ink-700)" }}>{INSIGHTS_TEXT}</p>
            <div className="row gap-8" style={{ marginTop: 14 }}>
              <Btn size="sm" variant="soft" icon="clipboard-list" onClick={() => setActive("workorders")}>Ver OT sin OC</Btn>
              <Btn size="sm" variant="soft" icon="file-warning" onClick={() => setActive("documents")}>Documentos críticos</Btn>
            </div>
          </div>
        </Card>

        <Card title="Alertas" action={<Badge tone="red">{ALERTS.length}</Badge>}>
          <div style={{ padding: "4px 0" }}>
            {ALERTS.map((a, i) => (
              <button key={i} onClick={() => setActive(i === 0 || i === 2 ? "documents" : i === 1 ? "workorders" : "fuel")} className="row gap-12" style={{ width: "100%", border: "none", background: "transparent", padding: "11px 20px", alignItems: "flex-start", cursor: "pointer", textAlign: "left" }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--bg)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <span style={{ width: 32, height: 32, borderRadius: 9, flex: "none", background: `var(--${a.tone}-tint)`, color: `var(--${a.tone === "amber" ? "amber-600" : a.tone})`, display: "grid", placeItems: "center" }}><Icon name={a.icon} size={16} /></span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-900)" }}>{a.title}</div>
                  <div style={{ fontSize: 12, color: "var(--slate-500)", marginTop: 1 }}>{a.desc}</div>
                </div>
                <Icon name="chevron-right" size={15} className="muted" />
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* conductores + odometro */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="grid-2-1">
        <Card title="Conductores registrados" action={<button className="btn btn-link" style={{ fontSize: 13 }} onClick={() => setActive("drivers")}>Ver todos</button>}>
          <table className="tbl">
            <thead><tr><th>Conductor</th><th>Licencia</th><th>Estado</th><th>Vigencia</th></tr></thead>
            <tbody>
              {driversToShow.map(d => (
                <tr key={d.id}>
                  <td><span className="row gap-10"><Avatar name={d.name} size={30} /><span style={{ fontWeight: 600 }}>{d.name}</span></span></td>
                  <td><Badge tone="gray">{d.license}</Badge></td>
                  <td><Badge tone={d.status === "En ruta" ? "blue" : d.status === "Disponible" ? "green" : "gray"} dot>{d.status}</Badge></td>
                  <td>{d.expired ? <span className="row gap-6" style={{ color: "var(--danger)", fontWeight: 700 }}><Icon name="alert-triangle" size={14} />Vencida 28/02</span> : <span className="muted">Vigente</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card title="Últimas lecturas de odómetro" action={<button className="btn btn-link" style={{ fontSize: 13 }} onClick={() => setActive("vehicles")}>Detalle</button>}>
          <table className="tbl">
            <thead><tr><th>Placa</th><th className="num">Lectura</th><th>Origen</th><th>Fecha</th></tr></thead>
            <tbody>
              {ODOMETER.map(o => (
                <tr key={o.plate}>
                  <td className="mono" style={{ fontWeight: 700, color: "var(--ink-900)" }}>{o.plate}</td>
                  <td className="num mono tnum" style={{ fontWeight: 600 }}>{fmtNum(o.value)} km</td>
                  <td><Badge tone={o.source === "GPS" ? "blue" : "gray"}>{o.source}</Badge></td>
                  <td className="muted">{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* clientes + actividad OT */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="grid-2-1">
        <Card title="Clientes activos" action={<Badge tone="gray">{CLIENTS.length}</Badge>}>
          <table className="tbl">
            <thead><tr><th>Cliente</th><th>Ciudad</th><th className="num">Vehículos</th><th className="num">Contratos</th></tr></thead>
            <tbody>
              {CLIENTS.map(c => (
                <tr key={c.name}>
                  <td><span className="row gap-10"><Avatar name={c.name} size={28} /><span style={{ fontWeight: 600 }}>{c.name}</span></span></td>
                  <td className="muted">{c.city}</td>
                  <td className="num"><Badge tone="blue">{c.vehicles}</Badge></td>
                  <td className="num"><Badge tone="gray">{c.contracts}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card title="Actividad reciente de OT" action={<button className="btn btn-link" style={{ fontSize: 13 }} onClick={() => setActive("workorders")}>Ver módulo</button>}>
          <div style={{ padding: "6px 0" }}>
            {WORK_ORDERS.slice(0, 5).map(o => (
              <div key={o.id} className="row gap-12" style={{ padding: "11px 20px", borderBottom: "1px solid var(--line-soft)", alignItems: "center" }}>
                <span style={{ width: 32, height: 32, borderRadius: 9, flex: "none", background: `var(--${OT_STATES[o.state]}-tint)`, color: `var(--${OT_STATES[o.state] === "gray" ? "slate-500" : OT_STATES[o.state]})`, display: "grid", placeItems: "center" }}><Icon name="clipboard-list" size={16} /></span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-900)" }}><span className="mono">{o.id}</span> · {o.plate}</div>
                  <div style={{ fontSize: 12, color: "var(--slate-500)" }}>{o.obs}</div>
                </div>
                <Badge tone={OT_STATES[o.state]} dot>{o.state}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

