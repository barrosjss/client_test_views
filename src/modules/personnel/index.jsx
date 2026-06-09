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

/* ---------------- TALLERES ---------------- */
export function Workshops() {
  const [q, setQ] = useState("");
  const rows = WORKSHOPS.filter(w => q === "" || (w.name + w.city + w.specialty).toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <Breadcrumb items={[{ label: "Contactos" }, { label: "Talleres" }]} />
      <PageHead title="Talleres" subtitle="Catálogo de talleres y proveedores de servicio"
        actions={<Btn variant="primary" icon="plus">Registrar taller</Btn>} />
      <div className="row between wrap gap-12" style={{ marginBottom: 16 }}>
        <div className="row gap-8 wrap">
          <FilterChip label="Todos" count={WORKSHOPS.length} active />
          <Badge tone="gray">95 en catálogo</Badge>
        </div>
        <div className="input-group" style={{ width: 280 }}><Icon name="search" size={17} /><input className="input" placeholder="Buscar por nombre, ciudad o especialidad…" onChange={e => setQ(e.target.value)} /></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }} className="grid-3">
        {rows.map(w => (
          <div key={w.id} className="card card-pad">
            <div className="row between" style={{ marginBottom: 12 }}>
              <span style={{ width: 44, height: 44, borderRadius: 12, background: "var(--ink-800)", color: "var(--amber-400)", display: "grid", placeItems: "center" }}><Icon name="warehouse" size={22} /></span>
              <Badge tone={w.status === "Activo" ? "green" : "gray"} dot>{w.status}</Badge>
            </div>
            <div style={{ fontWeight: 700, fontSize: 15.5 }}>{w.name}</div>
            <div className="muted" style={{ fontSize: 13, marginTop: 2 }}>{w.specialty}</div>
            <div style={{ height: 1, background: "var(--line-soft)", margin: "14px 0" }} />
            <div className="row between" style={{ fontSize: 12.5 }}><span className="row gap-6 muted"><Icon name="map-pin" size={13} />{w.city}</span><span className="row gap-4" style={{ fontWeight: 700, color: "var(--amber-600)" }}><Icon name="star" size={13} />{w.rating}</span></div>
            <div className="row between" style={{ fontSize: 12.5, marginTop: 8 }}><span className="muted">OT atendidas</span><span style={{ fontWeight: 700 }}>{w.ot}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- CONDUCTORES ---------------- */
export function Drivers() {
  const data = DRIVERS.map((d, i) => ({ ...d, expired: i === 3 }));
  const { sorted, sort, toggle } = useSort(data, "name");
  const [sel, setSel] = useState(null);
  return (
    <div>
      <Breadcrumb items={[{ label: "Contactos" }, { label: "Conductores" }]} />
      <PageHead title="Conductores" subtitle="Personal de conducción, licencias y vigencias"
        actions={<Btn variant="primary" icon="user-plus">Nuevo conductor</Btn>} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 20 }} className="grid-4">
        <Stat icon="id-card" label="Total conductores" value={DRIVERS.length} tone="blue" />
        <Stat icon="route" label="En ruta" value={DRIVERS.filter(d => d.status === "En ruta").length} tone="amber" />
        <Stat icon="check-circle-2" label="Disponibles" value={DRIVERS.filter(d => d.status === "Disponible").length} tone="green" />
        <Stat icon="alert-triangle" label="Licencias vencidas" value="1" tone="danger" />
      </div>
      <Card style={{ overflow: "hidden" }}>
        <table className="tbl">
          <thead><tr>
            <SortTh label="Conductor" sortKey="name" sort={sort} toggle={toggle} />
            <SortTh label="Licencia" sortKey="license" sort={sort} toggle={toggle} />
            <th>Teléfono</th>
            <SortTh label="Viajes" sortKey="trips" sort={sort} toggle={toggle} align="right" />
            <SortTh label="Rating" sortKey="rating" sort={sort} toggle={toggle} align="right" />
            <th>Vehículo</th><th>Estado</th><th>Vigencia licencia</th><th></th>
          </tr></thead>
          <tbody>
            {sorted.map(d => (
              <tr key={d.id} style={{ cursor: "pointer" }} onClick={() => setSel(d)}>
                <td><span className="row gap-10"><Avatar name={d.name} size={34} /><div><div style={{ fontWeight: 700, color: "var(--ink-900)" }}>{d.name}</div><div className="mono" style={{ fontSize: 11.5, color: "var(--slate-400)" }}>{d.id}</div></div></span></td>
                <td><Badge tone="gray">{d.license}</Badge></td>
                <td className="mono" style={{ fontSize: 13 }}>{d.phone}</td>
                <td className="num mono">{d.trips}</td>
                <td className="num"><span className="row gap-4" style={{ justifyContent: "flex-end", fontWeight: 700, color: "var(--amber-600)" }}><Icon name="star" size={13} />{d.rating}</span></td>
                <td className="mono" style={{ fontWeight: 600 }}>{d.vehicle}</td>
                <td><Badge tone={d.status === "En ruta" ? "blue" : d.status === "Disponible" ? "green" : "gray"} dot>{d.status}</Badge></td>
                <td>{d.expired ? <Badge tone="red" icon="alert-triangle">Vencida</Badge> : <span className="muted">Vigente</span>}</td>
                <td><Icon name="chevron-right" size={16} className="muted" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Drawer open={!!sel} onClose={() => setSel(null)} title="Conductor" width={440}
        footer={sel && <Fragment><Btn variant="primary" icon="route" className="grow">Asignar viaje</Btn><Btn icon="phone" /></Fragment>}>
        {sel && <div>
          <div className="row gap-16" style={{ marginBottom: 20 }}><Avatar name={sel.name} size={56} /><div><h3 style={{ fontSize: 19 }}>{sel.name}</h3><div className="muted" style={{ fontSize: 13 }}>Licencia {sel.license} · {sel.id}</div></div></div>
          {sel.expired && <div className="row gap-10" style={{ background: "var(--danger-tint)", color: "#c01f1f", padding: "12px 14px", borderRadius: 10, marginBottom: 18, fontSize: 13, fontWeight: 600 }}><Icon name="alert-triangle" size={18} />Licencia vencida el 28/02/2026 — bloquear asignaciones</div>}
          <KV label="Teléfono"><span className="mono">{sel.phone}</span></KV>
          <KV label="Vehículo asignado"><span className="mono">{sel.vehicle}</span></KV>
          <KV label="Viajes realizados">{sel.trips}</KV>
          <KV label="Calificación">{sel.rating} / 5.0</KV>
          <KV label="Estado">{sel.status}</KV>
        </div>}
      </Drawer>
    </div>
  );
}

/* ---------------- CONCILIACIONES ---------------- */
export function Conciliations() {
  const { sorted, sort, toggle } = useSort(CONCILIATIONS, "fecha");
  const total = CONCILIATIONS.reduce((a, c) => a + c.total, 0);
  return (
    <div>
      <Breadcrumb items={[{ label: "Facturación" }, { label: "Conciliaciones" }]} />
      <PageHead title="Conciliaciones" subtitle="Conciliación de servicios por contrato y período"
        actions={<Fragment><Btn icon="filter">Filtros</Btn><Btn variant="primary" icon="plus">Nueva conciliación</Btn></Fragment>} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 20 }} className="grid-4">
        <Stat icon="git-compare-arrows" label="Activas" value="34" tone="violet" />
        <Stat icon="check-circle-2" label="Aprobadas" value={CONCILIATIONS.filter(c => c.estado === "Aprobada").length} tone="green" />
        <Stat icon="alert-triangle" label="Con diferencias" value={CONCILIATIONS.filter(c => c.estado === "Con diferencias").length} tone="amber" />
        <Stat icon="dollar-sign" label="Total conciliado" value={fmtCOP(total).replace(/,\d+$/, "")} tone="amber" />
      </div>
      <Card style={{ overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr>
              <SortTh label="ID" sortKey="id" sort={sort} toggle={toggle} />
              <th>Consecutivo</th>
              <SortTh label="Estado" sortKey="estado" sort={sort} toggle={toggle} />
              <SortTh label="Total general" sortKey="total" sort={sort} toggle={toggle} align="right" />
              <th>Período</th>
              <SortTh label="Fecha" sortKey="fecha" sort={sort} toggle={toggle} />
              <SortTh label="Contacto" sortKey="contacto" sort={sort} toggle={toggle} />
              <th>Contrato</th><th></th>
            </tr></thead>
            <tbody>
              {sorted.map(c => (
                <tr key={c.id} style={{ cursor: "pointer" }}>
                  <td className="mono" style={{ fontWeight: 700, color: "var(--ink-900)" }}>{c.id}</td>
                  <td className="mono" style={{ fontSize: 13 }}>{c.consec}</td>
                  <td><Badge tone={CONC_TONE[c.estado]} dot>{c.estado}</Badge></td>
                  <td className="num mono" style={{ fontWeight: 700, color: "var(--ink-900)" }}>{fmtCOP(c.total)}</td>
                  <td className="muted" style={{ fontSize: 12.5 }}>{c.desde} – {c.hasta}</td>
                  <td>{c.fecha}</td>
                  <td style={{ fontWeight: 600 }}>{c.contacto}</td>
                  <td className="mono" style={{ fontSize: 13 }}>{c.contrato}</td>
                  <td><div className="row gap-6"><button className="btn btn-soft btn-sm"><Icon name="eye" size={15} /></button><button className="btn btn-soft btn-sm"><Icon name="download" size={15} /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TableFooter total={CONCILIATIONS.length} />
      </Card>
    </div>
  );
}

/* ---------------- CUENTAS POR COBRAR ---------------- */
export function Receivables() {
  const rows = CONTACTS.filter(c => c.balance > 0);
  const total = rows.reduce((a, c) => a + c.balance, 0);
  return (
    <div>
      <Breadcrumb items={[{ label: "Facturación" }, { label: "Cuentas por cobrar" }]} />
      <PageHead title="Cuentas por cobrar" subtitle="Cartera por cliente y antigüedad de saldos"
        actions={<Btn variant="primary" icon="bell">Recordatorios de pago</Btn>} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 20 }} className="grid-4">
        <Stat icon="hand-coins" label="Cartera total" value={fmtCOP(total).replace(/,\d+$/, "")} tone="amber" />
        <Stat icon="clock" label="Corriente (0-30)" value="$60M" tone="green" />
        <Stat icon="alert-triangle" label="30-60 días" value="$12.8M" tone="amber" />
        <Stat icon="alert-octagon" label="+60 días" value="$0" tone="danger" />
      </div>
      <Card style={{ overflow: "hidden" }}>
        <table className="tbl">
          <thead><tr><th>Cliente</th><th>Ciudad</th><th className="num">Saldo</th><th className="num">Corriente</th><th className="num">30-60</th><th>Estado</th><th></th></tr></thead>
          <tbody>
            {rows.map(c => (
              <tr key={c.id}>
                <td><span className="row gap-10"><Avatar name={c.name} size={32} /><span style={{ fontWeight: 700 }}>{c.name}</span></span></td>
                <td className="muted">{c.city}</td>
                <td className="num mono" style={{ fontWeight: 700, color: "var(--ink-900)" }}>{fmtCOP(c.balance)}</td>
                <td className="num mono">{c.name === "Logística del Caribe" ? "$0" : fmtCOP(c.balance)}</td>
                <td className="num mono" style={{ color: c.name === "Logística del Caribe" ? "var(--warning)" : "var(--slate-300)" }}>{c.name === "Logística del Caribe" ? fmtCOP(c.balance) : "$0"}</td>
                <td><Badge tone={c.name === "Logística del Caribe" ? "amber" : "green"} dot>{c.name === "Logística del Caribe" ? "Por vencer" : "Al día"}</Badge></td>
                <td><button className="btn btn-soft btn-sm">Cobrar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

/* ---------------- HOJA DE VIDA / PERSONAL ---------------- */
export function Personnel() {
  const [tab, setTab] = useState("Particular");
  const rows = PERSONNEL.filter(p => p.type === tab);
  return (
    <div>
      <Breadcrumb items={[{ label: "Gestión de personal" }, { label: "Hoja de vida" }]} />
      <PageHead title="Hoja de vida" subtitle="Expedientes del personal interno y externo"
        actions={<Btn variant="primary" icon="user-plus">Nueva hoja de vida</Btn>} />
      <div style={{ marginBottom: 16 }}>
        <Tabs tabs={[{ value: "Particular", label: "HV Particular", count: PERSONNEL.filter(p => p.type === "Particular").length }, { value: "Pública", label: "HV Pública", count: PERSONNEL.filter(p => p.type === "Pública").length }]} value={tab} onChange={setTab} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }} className="grid-2-1">
        {rows.map(p => (
          <div key={p.id} className="card card-pad row gap-16">
            <Avatar name={p.name} size={52} />
            <div style={{ flex: 1 }}>
              <div className="row between"><div style={{ fontWeight: 700, fontSize: 15.5 }}>{p.name}</div><Badge tone="green" dot>{p.status}</Badge></div>
              <div className="muted" style={{ fontSize: 13, marginBottom: 10 }}>{p.role}</div>
              <div className="row gap-16 wrap" style={{ fontSize: 12.5, color: "var(--slate-500)" }}>
                <span className="row gap-6"><Icon name="fingerprint" size={13} />{p.doc}</span>
                <span className="row gap-6"><Icon name="phone" size={13} />{p.phone}</span>
                <span className="row gap-6"><Icon name="calendar" size={13} />Ingreso {p.entry}</span>
              </div>
            </div>
            <button className="btn btn-soft btn-sm btn-icon"><Icon name="folder-open" size={16} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- VIÁTICOS ---------------- */
export function Perdiems() {
  const { sorted, sort, toggle } = useSort(PERDIEMS, "date");
  const total = PERDIEMS.reduce((a, p) => a + p.amount, 0);
  return (
    <div>
      <Breadcrumb items={[{ label: "Gestión de personal" }, { label: "Viáticos" }]} />
      <PageHead title="Viáticos" subtitle="Gastos de viaje por vehículo y conductor"
        actions={<Btn variant="primary" icon="plus">Registrar viático</Btn>} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 20 }} className="grid-4">
        <Stat icon="banknote" label="Total mes" value={fmtCOP(total).replace(/,\d+$/, "")} tone="amber" />
        <Stat icon="check-circle-2" label="Aprobados" value={PERDIEMS.filter(p => p.status === "Aprobado").length} tone="green" />
        <Stat icon="clock" label="Pendientes" value={PERDIEMS.filter(p => p.status === "Pendiente").length} tone="amber" />
        <Stat icon="receipt" label="Liquidados" value={PERDIEMS.filter(p => p.status === "Liquidado").length} tone="blue" />
      </div>
      <Card style={{ overflow: "hidden" }}>
        <table className="tbl">
          <thead><tr>
            <SortTh label="ID" sortKey="id" sort={sort} toggle={toggle} />
            <SortTh label="Conductor" sortKey="driver" sort={sort} toggle={toggle} />
            <th>Vehículo</th><th>Trayecto</th><th>Conceptos</th>
            <SortTh label="Fecha" sortKey="date" sort={sort} toggle={toggle} />
            <SortTh label="Monto" sortKey="amount" sort={sort} toggle={toggle} align="right" />
            <th>Estado</th>
          </tr></thead>
          <tbody>
            {sorted.map(p => (
              <tr key={p.id}>
                <td className="mono" style={{ fontWeight: 700, color: "var(--ink-900)" }}>{p.id}</td>
                <td><span className="row gap-8"><Avatar name={p.driver} size={28} /><span style={{ fontWeight: 600 }}>{p.driver}</span></span></td>
                <td className="mono" style={{ fontWeight: 600 }}>{p.plate}</td>
                <td>{p.trip}</td>
                <td className="muted" style={{ fontSize: 12.5 }}>{p.items}</td>
                <td>{p.date}</td>
                <td className="num mono" style={{ fontWeight: 700 }}>{fmtCOP(p.amount)}</td>
                <td><Badge tone={PERDIEM_TONE[p.status]} dot>{p.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

/* ---------------- SIIGO ---------------- */
export function Siigo() {
  const { push, node } = useToasts();
  return (
    <div>
      {node}
      <Breadcrumb items={[{ label: "Facturación" }, { label: "Integración SIIGO" }]} />
      <PageHead title="Integración SIIGO" subtitle="Sincronización contable de asientos (journals)"
        actions={<Btn variant="primary" icon="refresh-cw" onClick={() => push("Sincronizando con SIIGO…", "info")}>Sincronizar ahora</Btn>} />
      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 16 }} className="grid-2-1">
        <Card>
          <div className="card-pad col gap-16">
            <div className="row gap-12">
              <span style={{ width: 46, height: 46, borderRadius: 12, background: "var(--success-tint)", color: "var(--success)", display: "grid", placeItems: "center" }}><Icon name="plug-zap" size={23} /></span>
              <div><div style={{ fontWeight: 700, fontSize: 15 }}>Conexión activa</div><div className="muted" style={{ fontSize: 12.5 }}>Última sync: hace 12 min</div></div>
            </div>
            <div style={{ height: 1, background: "var(--line-soft)" }} />
            <KV label="Sincronizados hoy">42</KV>
            <KV label="Pendientes"><span style={{ color: "var(--warning)", fontWeight: 700 }}>1</span></KV>
            <KV label="Con error"><span style={{ color: "var(--danger)", fontWeight: 700 }}>1</span></KV>
            <KV label="Empresa SIIGO">Transportes CMOCS</KV>
            <div className="row gap-8" style={{ marginTop: 4 }}><Switch checked={true} onChange={() => {}} /><span style={{ fontSize: 13, fontWeight: 600 }}>Sincronización automática</span></div>
          </div>
        </Card>
        <Card title="Asientos contables (journals)" style={{ overflow: "hidden" }}>
          <table className="tbl">
            <thead><tr><th>ID asiento</th><th>Fecha</th><th>Tipo</th><th>Documento</th><th>Cuenta</th><th className="num">Valor</th><th>Estado</th></tr></thead>
            <tbody>
              {SIIGO_JOURNALS.map(j => (
                <tr key={j.id}>
                  <td className="mono" style={{ fontWeight: 700, color: "var(--ink-900)" }}>{j.id}</td>
                  <td>{j.date}</td>
                  <td>{j.type}</td>
                  <td className="mono" style={{ fontSize: 13 }}>{j.doc}</td>
                  <td style={{ fontSize: 12.5 }} className="muted">{j.account}</td>
                  <td className="num mono" style={{ fontWeight: 600 }}>{fmtCOP(j.value)}</td>
                  <td>{j.status === "Error" ? <Badge tone="red" icon="alert-circle">Error</Badge> : <Badge tone={SIIGO_TONE[j.status]} dot>{j.status}</Badge>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}

