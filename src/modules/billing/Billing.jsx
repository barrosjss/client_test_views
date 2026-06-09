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

export function Billing() {
  const [tab, setTab] = useState("invoices");
  const total = INVOICES.reduce((a, i) => a + i.amount, 0);
  const paid = INVOICES.filter(i => i.status === "Pagada").reduce((a, i) => a + i.amount, 0);
  const overdue = INVOICES.filter(i => i.status === "Vencida").reduce((a, i) => a + i.amount, 0);

  return (
    <div>
      <Breadcrumb items={[{ label: "Facturación" }, { label: "Facturas" }]} />
      <PageHead title="Facturas" subtitle="Emisión de facturas y control de cartera"
        actions={<Fragment><Btn icon="git-compare-arrows">Conciliar</Btn><Btn variant="primary" icon="plus">Nueva factura</Btn></Fragment>} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 20 }} className="grid-4">
        <Stat icon="file-text" label="Facturado (mes)" value={fmtCOP(total).replace(/,\d+$/, "")} tone="amber" />
        <Stat icon="check-circle-2" label="Recaudado" value={fmtCOP(paid).replace(/,\d+$/, "")} tone="green" delta={6} />
        <Stat icon="clock" label="Por cobrar" value={fmtCOP(total - paid).replace(/,\d+$/, "")} tone="blue" />
        <Stat icon="alert-triangle" label="Cartera vencida" value={fmtCOP(overdue).replace(/,\d+$/, "")} tone="danger" delta={-3} />
      </div>

      <div className="row gap-8" style={{ marginBottom: 16 }}>
        <Segmented options={[{ value: "invoices", label: "Facturas" }, { value: "recon", label: "Conciliación" }]} value={tab} onChange={setTab} />
      </div>

      {tab === "invoices" ? (
        <Card>
          <table className="tbl">
            <thead><tr><th>Factura</th><th>Cliente</th><th>Emisión</th><th>Vencimiento</th><th>Viajes</th><th className="num">Monto</th><th>Estado</th><th></th></tr></thead>
            <tbody>
              {INVOICES.map(inv => (
                <tr key={inv.id}>
                  <td className="mono" style={{ fontWeight: 700, color: "var(--ink-900)" }}>{inv.id}</td>
                  <td style={{ fontWeight: 600 }}>{inv.client}</td>
                  <td>{inv.date}</td>
                  <td>{inv.due}</td>
                  <td><Badge tone="gray">{inv.trips}</Badge></td>
                  <td className="num mono" style={{ fontWeight: 700, color: "var(--ink-900)" }}>{fmtCOP(inv.amount)}</td>
                  <td><Badge tone={INV_TONE[inv.status]} dot>{inv.status}</Badge></td>
                  <td><div className="row gap-6"><button className="btn btn-soft btn-sm"><Icon name="eye" size={15} /></button><button className="btn btn-soft btn-sm"><Icon name="download" size={15} /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      ) : (
        <ReconView />
      )}
    </div>
  );
}

export function ReconView() {
  const items = [
    { date: "01 Jun", ref: "FAC-2026-0422", bank: "$33.600.000", system: "$33.600.000", match: true },
    { date: "31 May", ref: "FAC-2026-0418", bank: "$28.400.000", system: "$28.400.000", match: true },
    { date: "30 May", ref: "Transf. 7781", bank: "$12.000.000", system: "—", match: false },
    { date: "28 May", ref: "FAC-2026-0420", bank: "$12.800.000", system: "$12.800.000", match: true },
    { date: "27 May", ref: "Pago parcial", bank: "$5.000.000", system: "$8.900.000", match: false },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }} className="grid-2-1">
      <Card title="Movimientos bancarios vs. sistema" action={<Badge tone="amber">2 por conciliar</Badge>}>
        <table className="tbl">
          <thead><tr><th>Fecha</th><th>Referencia</th><th className="num">Banco</th><th className="num">Sistema</th><th>Estado</th></tr></thead>
          <tbody>
            {items.map((it, i) => (
              <tr key={i}>
                <td>{it.date}</td>
                <td className="mono" style={{ fontWeight: 600 }}>{it.ref}</td>
                <td className="num mono">{it.bank}</td>
                <td className="num mono" style={{ color: it.system === "—" ? "var(--slate-300)" : "inherit" }}>{it.system}</td>
                <td>{it.match ? <Badge tone="green" icon="check">Conciliado</Badge> : <Badge tone="amber" icon="alert-triangle">Diferencia</Badge>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <div className="col gap-16">
        <Card title="Resumen">
          <div className="card-pad col gap-14">
            <div className="row between"><span className="muted" style={{ fontSize: 13.5, fontWeight: 600 }}>Conciliado</span><span style={{ fontWeight: 700, color: "var(--success)" }}>$74.8M</span></div>
            <div className="row between"><span className="muted" style={{ fontSize: 13.5, fontWeight: 600 }}>Pendiente</span><span style={{ fontWeight: 700, color: "var(--warning)" }}>$17.0M</span></div>
            <Bar value={81} tone="success" />
            <div className="muted" style={{ fontSize: 12.5 }}>81% de los movimientos conciliados este mes</div>
          </div>
        </Card>
        <Card title="Sugerencias automáticas">
          <div className="card-pad col gap-10">
            <div style={{ background: "var(--info-tint)", borderRadius: 10, padding: 12, fontSize: 13 }}>
              <strong>Transf. 7781</strong> podría corresponder a un anticipo de Logística del Caribe.
              <button className="btn btn-soft btn-sm" style={{ marginTop: 10 }}>Vincular</button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

