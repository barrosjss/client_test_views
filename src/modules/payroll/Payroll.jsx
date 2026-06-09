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

export function Payroll() {
  const total = PAYROLL.reduce((a, p) => a + p.total, 0);
  return (
    <div>
      <PageHead title="Nómina conductores" subtitle="Liquidación por viajes, kilómetros y comisiones · Junio 2026"
        actions={<Fragment><Btn icon="calculator">Liquidar periodo</Btn><Btn variant="primary" icon="download">Generar pagos</Btn></Fragment>} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 20 }} className="grid-4">
        <Stat icon="users" label="Conductores" value={PAYROLL.length} tone="blue" />
        <Stat icon="route" label="Viajes liquidados" value="94" tone="green" />
        <Stat icon="wallet" label="Total a pagar" value={fmtCOP(total).replace(/,\d+$/, "")} tone="amber" />
        <Stat icon="percent" label="Comisiones" value="$8.8M" tone="amber" />
      </div>
      <Card>
        <table className="tbl">
          <thead><tr><th>Conductor</th><th className="num">Viajes</th><th className="num">Km</th><th className="num">Salario base</th><th className="num">Comisión</th><th className="num">Deducciones</th><th className="num">Total</th></tr></thead>
          <tbody>
            {PAYROLL.map(p => (
              <tr key={p.id}>
                <td><span className="row gap-10"><Avatar name={p.driver} size={32} /><span style={{ fontWeight: 600 }}>{p.driver}</span></span></td>
                <td className="num mono">{p.trips}</td>
                <td className="num mono">{fmtNum(p.km)}</td>
                <td className="num mono">{fmtCOP(p.base)}</td>
                <td className="num mono" style={{ color: "var(--success)" }}>{fmtCOP(p.commission)}</td>
                <td className="num mono" style={{ color: "var(--danger)" }}>-{fmtCOP(p.deductions)}</td>
                <td className="num mono" style={{ fontWeight: 700, color: "var(--ink-900)" }}>{fmtCOP(p.total)}</td>
              </tr>
            ))}
            <tr style={{ background: "var(--bg)" }}>
              <td style={{ fontWeight: 700 }}>Total</td><td colSpan="5"></td>
              <td className="num mono" style={{ fontWeight: 800, color: "var(--ink-900)" }}>{fmtCOP(total)}</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
}

