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

export function Users() {
  const [tab, setTab] = useState("users");
  return (
    <div>
      <PageHead title="Usuarios y roles" subtitle="Gestiona el acceso del equipo a cada módulo"
        actions={<Btn variant="primary" icon="user-plus">Invitar usuario</Btn>} />

      <div className="row gap-8" style={{ marginBottom: 16 }}>
        <Segmented options={[{ value: "users", label: "Usuarios" }, { value: "roles", label: "Roles y permisos" }]} value={tab} onChange={setTab} />
      </div>

      {tab === "users" ? (
        <Card>
          <table className="tbl">
            <thead><tr><th>Usuario</th><th>Rol</th><th>Estado</th><th>Última actividad</th><th></th></tr></thead>
            <tbody>
              {USERS.map(u => (
                <tr key={u.id}>
                  <td><span className="row gap-12"><Avatar name={u.name} size={38} /><div><div style={{ fontWeight: 700, color: "var(--ink-900)" }}>{u.name}</div><div style={{ fontSize: 12.5, color: "var(--slate-400)" }}>{u.email}</div></div></span></td>
                  <td><Badge tone={u.role === "Administrador" ? "amber" : "gray"}>{u.role}</Badge></td>
                  <td><Badge tone={u.status === "Activo" ? "green" : "gray"} dot>{u.status}</Badge></td>
                  <td className="muted">{u.lastSeen}</td>
                  <td><div className="row gap-6"><button className="btn btn-soft btn-sm"><Icon name="pencil" size={14} /></button><button className="btn btn-soft btn-sm"><Icon name="more-horizontal" size={14} /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      ) : (
        <RolesView />
      )}
    </div>
  );
}

export const PERM_MATRIX = [
  ["Flota y maquinaria", true, true, false, true, false],
  ["Viajes y despacho", true, true, false, false, true],
  ["Mantenimiento", true, false, false, true, false],
  ["Documentos", true, true, true, true, true],
  ["Facturación", true, false, true, false, false],
  ["Nómina", true, false, true, false, false],
  ["Usuarios y roles", true, false, false, false, false],
];
export const ROLE_COLS = ["Administrador", "Despachador", "Contador", "Jefe taller", "Conductor"];

export function RolesView() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 14 }} className="grid-5">
        {ROLES.map(r => (
          <div key={r.name} className="card card-pad">
            <span style={{ width: 38, height: 38, borderRadius: 11, background: `var(--${r.tone}-tint)`, color: `var(--${r.tone === "amber" ? "amber-600" : r.tone === "gray" ? "slate-500" : r.tone})`, display: "grid", placeItems: "center" }}><Icon name="shield" size={19} /></span>
            <div style={{ fontWeight: 700, fontSize: 14.5, marginTop: 12 }}>{r.name}</div>
            <div className="muted" style={{ fontSize: 12.5, marginTop: 4, lineHeight: 1.45, minHeight: 52 }}>{r.desc}</div>
            <div className="row between" style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--line-soft)" }}>
              <span className="row gap-6" style={{ fontSize: 12.5, fontWeight: 600 }}><Icon name="users" size={14} className="muted" />{r.users}</span>
              <span className="muted" style={{ fontSize: 12 }}>{r.perms} permisos</span>
            </div>
          </div>
        ))}
      </div>

      <Card title="Matriz de permisos" action={<Btn size="sm" icon="plus">Crear rol</Btn>}>
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Módulo</th>{ROLE_COLS.map(c => <th key={c} style={{ textAlign: "center" }}>{c}</th>)}</tr></thead>
            <tbody>
              {PERM_MATRIX.map((row, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{row[0]}</td>
                  {row.slice(1).map((on, j) => (
                    <td key={j} style={{ textAlign: "center" }}>
                      {on
                        ? <span style={{ display: "inline-grid", placeItems: "center", width: 24, height: 24, borderRadius: 7, background: "var(--success-tint)", color: "var(--success)" }}><Icon name="check" size={14} strokeWidth={3} /></span>
                        : <span style={{ display: "inline-grid", placeItems: "center", width: 24, height: 24, borderRadius: 7, background: "var(--bg-2)", color: "var(--slate-300)" }}><Icon name="minus" size={14} /></span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

