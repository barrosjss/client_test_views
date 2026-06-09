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

export function Maintenance() {
  const [sel, setSel] = useState(null);
  const totalCost = MAINTENANCE.reduce((a, m) => a + m.cost, 0);
  return (
    <div>
      <PageHead title="Mantenimiento" subtitle="Órdenes de servicio preventivas y correctivas"
        actions={<Btn variant="primary" icon="plus">Nueva orden</Btn>} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 20 }} className="grid-4">
        <Stat icon="clipboard-list" label="Órdenes abiertas" value="3" tone="blue" />
        <Stat icon="wrench" label="En proceso" value="1" tone="amber" />
        <Stat icon="check-circle-2" label="Completadas (mes)" value="2" tone="green" />
        <Stat icon="dollar-sign" label="Costo del mes" value={fmtCOP(totalCost)} tone="amber" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: 16 }} className="grid-2-1">
        <Card title="Órdenes de servicio">
          <table className="tbl">
            <thead><tr><th>Orden</th><th>Vehículo</th><th>Descripción</th><th>Prioridad</th><th>Estado</th><th className="num">Costo</th></tr></thead>
            <tbody>
              {MAINTENANCE.map(m => (
                <tr key={m.id} style={{ cursor: "pointer" }} onClick={() => setSel(m)}>
                  <td><div className="mono" style={{ fontWeight: 700, color: "var(--ink-900)" }}>{m.id}</div><Badge tone={m.type === "Correctivo" ? "red" : "blue"}>{m.type}</Badge></td>
                  <td className="mono" style={{ fontWeight: 600 }}>{m.vehicle}</td>
                  <td><div style={{ fontWeight: 600 }}>{m.desc}</div><div style={{ fontSize: 12, color: "var(--slate-400)" }}>{m.tech} · {m.date}</div></td>
                  <td><Badge tone={MNT_PRIORITY_TONE[m.priority]}>{m.priority}</Badge></td>
                  <td><Badge tone={MNT_STATUS_TONE[m.status]} dot>{m.status}</Badge></td>
                  <td className="num mono" style={{ fontWeight: 600 }}>{fmtCOP(m.cost)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <div className="col gap-16">
          <Card title="Próximos preventivos">
            <div style={{ padding: "6px 0" }}>
              {[["WGT-481", "Cambio aceite", "en 2 400 km"], ["VAN-330", "Revisión 90.000 km", "en 1 100 km"], ["QAZ-104", "Frenos", "en 12 días"]].map(([v, t, w]) => (
                <div key={v} className="row between" style={{ padding: "12px 20px", borderBottom: "1px solid var(--line-soft)" }}>
                  <div><div className="mono" style={{ fontWeight: 700, fontSize: 13.5 }}>{v}</div><div style={{ fontSize: 12.5, color: "var(--slate-500)" }}>{t}</div></div>
                  <Badge tone="amber">{w}</Badge>
                </div>
              ))}
            </div>
          </Card>
          <Card title="Costo por categoría" >
            <div className="card-pad">
              <BarChart data={[{ l: "Motor", v: 48 }, { l: "Frenos", v: 32, hl: true }, { l: "Hidr.", v: 65 }, { l: "Llantas", v: 28 }, { l: "Otros", v: 19 }]} height={150} />
            </div>
          </Card>
        </div>
      </div>

      <Drawer open={!!sel} onClose={() => setSel(null)} title={sel ? "Orden " + sel.id : ""} width={460}
        footer={sel && <Fragment><Btn variant="primary" icon="check" className="grow">Marcar completada</Btn><Btn icon="printer" /></Fragment>}>
        {sel && <div>
          <div className="row gap-10" style={{ marginBottom: 18 }}>
            <Badge tone={sel.type === "Correctivo" ? "red" : "blue"}>{sel.type}</Badge>
            <Badge tone={MNT_PRIORITY_TONE[sel.priority]}>Prioridad {sel.priority}</Badge>
            <Badge tone={MNT_STATUS_TONE[sel.status]} dot>{sel.status}</Badge>
          </div>
          <h3 style={{ fontSize: 18, marginBottom: 4 }}>{sel.desc}</h3>
          <p className="muted" style={{ fontSize: 13.5, marginBottom: 18 }}>Vehículo {sel.vehicle} · {sel.tech}</p>
          <KV label="Fecha programada">{sel.date}</KV>
          <KV label="Taller / técnico">{sel.tech}</KV>
          <KV label="Costo estimado"><span className="mono" style={{ fontWeight: 700 }}>{fmtCOP(sel.cost)}</span></KV>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--slate-400)", textTransform: "uppercase", letterSpacing: ".06em", margin: "20px 0 8px" }}>Repuestos</div>
          {[["Filtro de aceite", "x2", 170000], ["Aceite hidráulico 20L", "x1", 540000], ["Mano de obra", "4h", 480000]].map(([n, q, c]) => (
            <div key={n} className="row between" style={{ padding: "9px 0", borderBottom: "1px solid var(--line-soft)" }}>
              <span style={{ fontSize: 13.5, fontWeight: 600 }}>{n} <span className="muted">{q}</span></span>
              <span className="mono" style={{ fontSize: 13 }}>{fmtCOP(c)}</span>
            </div>
          ))}
        </div>}
      </Drawer>
    </div>
  );
}

