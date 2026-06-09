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

export function Contacts() {
  const [filter, setFilter] = useState("Todos");
  const [sel, setSel] = useState(null);
  const counts = { Todos: CONTACTS.length, Cliente: CONTACTS.filter(c => c.type === "Cliente").length, Proveedor: CONTACTS.filter(c => c.type === "Proveedor").length };
  const rows = CONTACTS.filter(c => filter === "Todos" || c.type === filter);

  return (
    <div>
      <PageHead title="Contactos" subtitle="Clientes y proveedores de la operación"
        actions={<Btn variant="primary" icon="plus">Nuevo contacto</Btn>} />

      <div className="row between wrap gap-12" style={{ marginBottom: 16 }}>
        <div className="row gap-8">{Object.keys(counts).map(k => <FilterChip key={k} label={k === "Cliente" ? "Clientes" : k === "Proveedor" ? "Proveedores" : k} count={counts[k]} active={filter === k} onClick={() => setFilter(k)} />)}</div>
        <div className="input-group" style={{ width: 240 }}><Icon name="search" size={17} /><input className="input" placeholder="Buscar contacto…" /></div>
      </div>

      <Card>
        <table className="tbl">
          <thead><tr><th>Empresa</th><th>Tipo</th><th>Contacto</th><th>Teléfono</th><th>Ciudad</th><th className="num">Saldo</th><th></th></tr></thead>
          <tbody>
            {rows.map(c => (
              <tr key={c.id} style={{ cursor: "pointer" }} onClick={() => setSel(c)}>
                <td><span className="row gap-10"><Avatar name={c.name} size={36} /><span style={{ fontWeight: 700, color: "var(--ink-900)" }}>{c.name}</span></span></td>
                <td><Badge tone={c.type === "Cliente" ? "blue" : "violet"}>{c.type}</Badge></td>
                <td>{c.contact}</td>
                <td className="mono" style={{ fontSize: 13 }}>{c.phone}</td>
                <td>{c.city}</td>
                <td className="num mono" style={{ fontWeight: 700, color: c.balance > 0 ? "var(--success)" : c.balance < 0 ? "var(--danger)" : "var(--slate-400)" }}>
                  {c.balance === 0 ? "—" : (c.balance > 0 ? "" : "-") + fmtCOP(Math.abs(c.balance))}
                </td>
                <td><Icon name="chevron-right" size={16} className="muted" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Drawer open={!!sel} onClose={() => setSel(null)} title="Detalle de contacto" width={460}
        footer={sel && <Fragment><Btn variant="primary" icon="receipt" className="grow">{sel.type === "Cliente" ? "Nueva factura" : "Nueva orden"}</Btn><Btn icon="message-square" /></Fragment>}>
        {sel && <div>
          <div className="row gap-16" style={{ marginBottom: 20 }}>
            <Avatar name={sel.name} size={56} />
            <div><h3 style={{ fontSize: 18 }}>{sel.name}</h3><Badge tone={sel.type === "Cliente" ? "blue" : "violet"}>{sel.type}</Badge></div>
          </div>
          <div className="card card-pad row between" style={{ marginBottom: 20 }}>
            <div><div className="muted" style={{ fontSize: 12.5, fontWeight: 600 }}>Saldo actual</div><div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 22, color: sel.balance > 0 ? "var(--success)" : sel.balance < 0 ? "var(--danger)" : "var(--ink-900)" }}>{sel.balance === 0 ? "$0" : (sel.balance > 0 ? "" : "-") + fmtCOP(Math.abs(sel.balance))}</div></div>
            <Badge tone={sel.balance > 0 ? "amber" : "green"}>{sel.balance > 0 ? "Por cobrar" : "Al día"}</Badge>
          </div>
          <KV label="Contacto principal">{sel.contact}</KV>
          <KV label="Teléfono"><span className="mono">{sel.phone}</span></KV>
          <KV label="Ciudad">{sel.city}</KV>
          <KV label="Tipo">{sel.type}</KV>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--slate-400)", textTransform: "uppercase", letterSpacing: ".06em", margin: "20px 0 8px" }}>Actividad reciente</div>
          {["Factura FAC-2026-0419 emitida", "Pago recibido $28.4M", "Viaje VJ-8841 asignado"].map((a, i) => (
            <div key={i} className="row gap-10" style={{ padding: "9px 0", fontSize: 13.5 }}><Icon name="circle-dot" size={14} className="muted" />{a}</div>
          ))}
        </div>}
      </Drawer>
    </div>
  );
}

