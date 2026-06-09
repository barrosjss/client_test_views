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

export function WorkOrders({ setActive }) {
  const [tab, setTab] = useState("Abiertas");
  const [sel, setSel] = useState(null);
  const { push, node } = useToasts();

  const tabFilter = {
    "Abiertas": o => o.state === "Abierta" || o.state === "En ejecución",
    "En validación": o => o.state === "En validación",
    "Aprobadas/Rechazadas": o => o.state === "Aprobada" || o.state === "Rechazada",
    "Histórico": o => true,
  };
  const rows = WORK_ORDERS.filter(tabFilter[tab]);
  const { sorted, sort, toggle } = useSort(rows, "date");

  return (
    <div>
      {node}
      <Breadcrumb items={[{ label: "Operación" }, { label: "Órdenes de trabajo" }]} />
      <PageHead title="Órdenes de trabajo" subtitle="Gestión de OT, autorizaciones y ejecución en taller"
        actions={<Fragment><Btn icon="file-spreadsheet" onClick={() => push("Exportando a Excel…", "info")}>Exportar</Btn><Btn variant="primary" icon="plus" onClick={() => push("Formulario de nueva OT (demo)", "info")}>Agregar OT</Btn></Fragment>} />

      {/* OT KPI dashboard */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 12, marginBottom: 22 }} className="grid-6">
        {OT_KPIS.map(k => (
          <div key={k.label} className="card card-pad" style={{ padding: 16 }}>
            <span style={{ width: 34, height: 34, borderRadius: 10, background: `var(--${k.tone}-tint)`, color: `var(--${k.tone === "amber" ? "amber-600" : k.tone === "gray" ? "slate-500" : k.tone})`, display: "grid", placeItems: "center" }}><Icon name={k.icon} size={17} /></span>
            <div style={{ fontFamily: "var(--font-head)", fontSize: 26, fontWeight: 700, marginTop: 10 }} className="tnum">{k.value}</div>
            <div style={{ fontSize: 12, color: "var(--slate-500)", fontWeight: 600 }}>{k.label}</div>
          </div>
        ))}
      </div>

      <Card style={{ overflow: "hidden" }}>
        <div style={{ padding: "0 8px" }}>
          <Tabs tabs={[
            { value: "Abiertas", label: "Abiertas", count: WORK_ORDERS.filter(tabFilter["Abiertas"]).length },
            { value: "En validación", label: "Enviadas y en validación", count: WORK_ORDERS.filter(tabFilter["En validación"]).length },
            { value: "Aprobadas/Rechazadas", label: "Aprobadas y rechazadas", count: WORK_ORDERS.filter(tabFilter["Aprobadas/Rechazadas"]).length },
            { value: "Histórico", label: "Histórico global", count: WORK_ORDERS.length },
          ]} value={tab} onChange={setTab} />
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr>
              <SortTh label="OT #" sortKey="id" sort={sort} toggle={toggle} />
              <SortTh label="Estado" sortKey="state" sort={sort} toggle={toggle} />
              <th>Autorización</th>
              <SortTh label="Placa" sortKey="plate" sort={sort} toggle={toggle} />
              <th>Observación</th>
              <SortTh label="Fecha" sortKey="date" sort={sort} toggle={toggle} />
              <SortTh label="Prioridad" sortKey="priority" sort={sort} toggle={toggle} />
              <th>Taller</th><th>OC</th><th></th>
            </tr></thead>
            <tbody>
              {sorted.map(o => (
                <tr key={o.id} style={{ cursor: "pointer" }} onClick={() => setSel(o)}>
                  <td className="mono" style={{ fontWeight: 700, color: "var(--ink-900)" }}>{o.id}</td>
                  <td><Badge tone={OT_STATES[o.state]} dot>{o.state}</Badge></td>
                  <td><Badge tone={o.auth === "Enviada" ? "green" : "gray"}>{o.auth}</Badge></td>
                  <td className="mono" style={{ fontWeight: 600 }}>{o.plate}</td>
                  <td style={{ maxWidth: 220 }}><div style={{ fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{o.obs}</div></td>
                  <td className="muted">{o.date}</td>
                  <td><Badge tone={o.priority === "Alta" ? "red" : o.priority === "Media" ? "amber" : "gray"}>{o.priority}</Badge></td>
                  <td style={{ fontSize: 13 }}>{o.taller}</td>
                  <td className="mono" style={{ color: o.oc === "—" ? "var(--danger)" : "inherit", fontWeight: 600 }}>{o.oc}</td>
                  <td><Icon name="chevron-right" size={16} className="muted" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TableFooter total={rows.length} />
      </Card>

      <Drawer open={!!sel} onClose={() => setSel(null)} title={sel ? "Orden " + sel.id : ""} width={500}
        footer={sel && <Fragment>
          {sel.auth === "Sin enviar" ? <Btn variant="primary" icon="send" className="grow" onClick={() => { push("OT enviada a validación"); setSel(null); }}>Enviar a validación</Btn> : <Btn variant="primary" icon="check" className="grow" onClick={() => { push("OT aprobada"); setSel(null); }}>Aprobar</Btn>}
          <Btn icon="printer" />
        </Fragment>}>
        {sel && <div>
          <div className="row gap-10" style={{ marginBottom: 18 }}>
            <Badge tone={OT_STATES[sel.state]} dot>{sel.state}</Badge>
            <Badge tone={sel.auth === "Enviada" ? "green" : "gray"}>{sel.auth}</Badge>
            <Badge tone={sel.priority === "Alta" ? "red" : sel.priority === "Media" ? "amber" : "gray"}>Prioridad {sel.priority}</Badge>
          </div>
          <h3 style={{ fontSize: 18, marginBottom: 4 }}>{sel.obs}</h3>
          <p className="muted" style={{ fontSize: 13.5, marginBottom: 18 }}>Vehículo {sel.plate} · {sel.client}</p>
          <KV label="Estado del vehículo"><Badge tone={sel.vehState === "Operativo" ? "green" : "red"}>{sel.vehState}</Badge></KV>
          <KV label="Fecha de orden">{sel.date}</KV>
          <KV label="Odómetro"><span className="mono">{fmtNum(sel.odo)} km</span></KV>
          <KV label="Responsable de pago">{sel.payResp}</KV>
          <KV label="Taller asignado">{sel.taller}</KV>
          <KV label="Orden de compra"><span className="mono" style={{ color: sel.oc === "—" ? "var(--danger)" : "inherit" }}>{sel.oc === "—" ? "Sin OC" : sel.oc}</span></KV>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--slate-400)", textTransform: "uppercase", letterSpacing: ".06em", margin: "20px 0 10px" }}>Línea de tiempo</div>
          {[["Orden creada", sel.date, true], ["Enviada a validación", sel.auth === "Enviada" ? sel.date : "—", sel.auth === "Enviada"], ["Aprobación", sel.state === "Aprobada" || sel.state === "En ejecución" || sel.state === "Cerrada" ? sel.date : "—", sel.state === "Aprobada" || sel.state === "En ejecución" || sel.state === "Cerrada"], ["Cierre", sel.state === "Cerrada" ? sel.date : "—", sel.state === "Cerrada"]].map(([l, d, done], i) => (
            <div key={i} className="row gap-12" style={{ alignItems: "center", padding: "8px 0" }}>
              <span style={{ width: 22, height: 22, borderRadius: 999, background: done ? "var(--success)" : "var(--bg-2)", color: "#fff", display: "grid", placeItems: "center", flex: "none", border: done ? "none" : "2px solid var(--slate-200)" }}>{done && <Icon name="check" size={12} strokeWidth={3} />}</span>
              <span style={{ flex: 1, fontSize: 13.5, fontWeight: 600, color: done ? "var(--ink-800)" : "var(--slate-400)" }}>{l}</span>
              <span className="muted" style={{ fontSize: 12.5 }}>{d}</span>
            </div>
          ))}
        </div>}
      </Drawer>
    </div>
  );
}

