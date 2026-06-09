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

export function Documents() {
  const [filter, setFilter] = useState("Todos");
  const counts = {
    Todos: DOCUMENTS.length,
    Vencido: DOCUMENTS.filter(d => d.status === "Vencido").length,
    "Por vencer": DOCUMENTS.filter(d => d.status === "Por vencer").length,
    Vigente: DOCUMENTS.filter(d => d.status === "Vigente").length,
  };
  const rows = DOCUMENTS.filter(d => filter === "Todos" || d.status === filter)
    .sort((a, b) => a.daysLeft - b.daysLeft);

  return (
    <div>
      <PageHead title="Documentos y vencimientos" subtitle="SOAT, técnico-mecánica, pólizas y tarjetas de operación"
        actions={<Fragment><Btn icon="calendar">Calendario</Btn><Btn variant="primary" icon="plus">Subir documento</Btn></Fragment>} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 20 }} className="grid-3">
        <div className="card card-pad row gap-16" style={{ borderLeft: "3px solid var(--danger)" }}>
          <span style={{ width: 44, height: 44, borderRadius: 12, background: "var(--danger-tint)", color: "var(--danger)", display: "grid", placeItems: "center" }}><Icon name="alert-octagon" size={22} /></span>
          <div><div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 26 }}>{counts.Vencido}</div><div className="muted" style={{ fontSize: 13, fontWeight: 600 }}>Vencidos</div></div>
        </div>
        <div className="card card-pad row gap-16" style={{ borderLeft: "3px solid var(--warning)" }}>
          <span style={{ width: 44, height: 44, borderRadius: 12, background: "var(--warning-tint)", color: "var(--warning)", display: "grid", placeItems: "center" }}><Icon name="clock" size={22} /></span>
          <div><div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 26 }}>{counts["Por vencer"]}</div><div className="muted" style={{ fontSize: 13, fontWeight: 600 }}>Por vencer (30 días)</div></div>
        </div>
        <div className="card card-pad row gap-16" style={{ borderLeft: "3px solid var(--success)" }}>
          <span style={{ width: 44, height: 44, borderRadius: 12, background: "var(--success-tint)", color: "var(--success)", display: "grid", placeItems: "center" }}><Icon name="shield-check" size={22} /></span>
          <div><div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 26 }}>{counts.Vigente}</div><div className="muted" style={{ fontSize: 13, fontWeight: 600 }}>Vigentes</div></div>
        </div>
      </div>

      <div className="row gap-8 wrap" style={{ marginBottom: 16 }}>
        {Object.keys(counts).map(k => <FilterChip key={k} label={k} count={counts[k]} active={filter === k} onClick={() => setFilter(k)} />)}
      </div>

      <Card>
        <table className="tbl">
          <thead><tr><th>Documento</th><th>Vehículo</th><th>Vence</th><th>Tiempo restante</th><th>Estado</th><th></th></tr></thead>
          <tbody>
            {rows.map(d => (
              <tr key={d.id}>
                <td><span className="row gap-10"><span style={{ width: 34, height: 34, borderRadius: 9, background: "var(--bg-2)", color: "var(--ink-600)", display: "grid", placeItems: "center" }}><Icon name="file-text" size={17} /></span><span style={{ fontWeight: 600 }}>{d.doc}</span></span></td>
                <td className="mono" style={{ fontWeight: 600 }}>{d.vehicle}</td>
                <td>{d.expires}</td>
                <td>
                  {d.daysLeft < 0
                    ? <span style={{ color: "var(--danger)", fontWeight: 700 }}>Venció hace {Math.abs(d.daysLeft)} días</span>
                    : d.daysLeft <= 30
                      ? <span style={{ color: "var(--warning)", fontWeight: 700 }}>{d.daysLeft} días</span>
                      : <span className="muted">{d.daysLeft} días</span>}
                </td>
                <td><Badge tone={DOC_TONE[d.status]} dot>{d.status}</Badge></td>
                <td><div className="row gap-6"><button className="btn btn-soft btn-sm">{d.status === "Vencido" ? "Renovar" : "Ver"}</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

