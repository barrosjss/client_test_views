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

export function Reports() {
  const kpis = [
    { label: "Costo por kilómetro", value: "$2 840", delta: -4, tone: "green", icon: "trending-down" },
    { label: "Utilización de flota", value: "68%", delta: 6, tone: "amber", icon: "activity" },
    { label: "Ingreso por viaje", value: "$1.9M", delta: 8, tone: "amber", icon: "trending-up" },
    { label: "Disponibilidad", value: "94%", delta: 2, tone: "blue", icon: "check-circle-2" },
  ];
  const reportList = [
    ["Rentabilidad por vehículo", "file-bar-chart", "Actualizado hoy"],
    ["Costo operativo mensual", "receipt", "Actualizado hoy"],
    ["Consumo de combustible", "fuel", "Hace 2 días"],
    ["Cumplimiento documental", "file-check", "Hace 3 días"],
    ["Productividad por conductor", "users", "Hace 1 semana"],
    ["Mantenimientos por flota", "wrench", "Hace 1 semana"],
  ];
  return (
    <div>
      <PageHead title="Reportes y analítica" subtitle="Indicadores de costo, utilización y rentabilidad"
        actions={<Fragment><Btn icon="calendar">Junio 2026</Btn><Btn variant="primary" icon="download">Exportar</Btn></Fragment>} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 20 }} className="grid-4">
        {kpis.map(k => <Stat key={k.label} icon={k.icon} label={k.label} value={k.value} delta={k.delta} tone={k.tone} />)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16, marginBottom: 16 }} className="grid-2-1">
        <Card title="Rentabilidad por mes" action={<Segmented options={["6M", "12M"]} value="12M" onChange={() => {}} />}>
          <div className="card-pad">
            <BarChart data={[{ l: "Ene", v: 32 }, { l: "Feb", v: 38 }, { l: "Mar", v: 35 }, { l: "Abr", v: 44 }, { l: "May", v: 41 }, { l: "Jun", v: 52, hl: true }, { l: "Jul", v: 48 }, { l: "Ago", v: 55 }, { l: "Sep", v: 51 }, { l: "Oct", v: 60 }, { l: "Nov", v: 58 }, { l: "Dic", v: 67, hl: true }]} height={200} />
          </div>
        </Card>
        <Card title="Distribución de costos">
          <div className="card-pad col center gap-16">
            <Donut value={100} label="$1.12B" sub="costo total" size={150} tone="ink-700" />
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
              {[["Combustible", "38%", "amber-500"], ["Mantenimiento", "24%", "info"], ["Nómina", "26%", "success"], ["Otros", "12%", "slate-300"]].map(([l, v, c]) => (
                <div key={l} className="row between"><span className="row gap-8" style={{ fontSize: 13.5, fontWeight: 600 }}><span style={{ width: 9, height: 9, borderRadius: 3, background: `var(--${c})` }} />{l}</span><span style={{ fontWeight: 700 }}>{v}</span></div>
              ))}
            </div>
          </div>
        </Card>
      </div>
      <Card title="Reportes guardados">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
          {reportList.map(([t, ic, d], i) => (
            <button key={t} className="row between" style={{ border: "none", background: "transparent", padding: "16px 20px", borderBottom: "1px solid var(--line-soft)", borderRight: (i % 3 !== 2) ? "1px solid var(--line-soft)" : "none", cursor: "pointer", textAlign: "left" }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--bg)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <span className="row gap-12"><span style={{ width: 36, height: 36, borderRadius: 10, background: "var(--amber-tint)", color: "var(--amber-600)", display: "grid", placeItems: "center" }}><Icon name={ic} size={18} /></span><span><span style={{ fontWeight: 700, fontSize: 13.5, display: "block" }}>{t}</span><span className="muted" style={{ fontSize: 12 }}>{d}</span></span></span>
              <Icon name="download" size={16} className="muted" />
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}

