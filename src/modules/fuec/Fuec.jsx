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

export function Fuec() {
  const [view, setView] = useState("list");
  const [sel, setSel] = useState(null);
  const { push, node } = useToasts();
  const { sorted, sort, toggle } = useSort(FUEC_LIST, "id");

  return (
    <div>
      {node}
      <Breadcrumb items={[{ label: "Operación" }, { label: "FUEC", onClick: view !== "list" ? () => setView("list") : null }, ...(view === "create" ? [{ label: "Nuevo FUEC" }] : [])]} />
      {view === "list" ? (
        <Fragment>
          <PageHead title="FUEC" subtitle="Formato Único de Extracto del Contrato · 330 documentos emitidos"
            actions={<Fragment><Btn icon="search">Validar vigencia</Btn><Btn variant="primary" icon="plus" onClick={() => setView("create")}>Crear FUEC</Btn></Fragment>} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 20 }} className="grid-4">
            <Stat icon="file-signature" label="FUEC vigentes" value="318" tone="green" />
            <Stat icon="clock" label="Por vencer (7 días)" value="12" tone="amber" />
            <Stat icon="file-x" label="Vencidos" value="9" tone="danger" />
            <Stat icon="file-check" label="Emitidos (mes)" value="46" tone="blue" />
          </div>

          <Card style={{ overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table className="tbl">
                <thead><tr>
                  <SortTh label="N° FUEC" sortKey="id" sort={sort} toggle={toggle} />
                  <SortTh label="Contrato" sortKey="contract" sort={sort} toggle={toggle} />
                  <SortTh label="Placa" sortKey="plate" sort={sort} toggle={toggle} />
                  <th>Marca / modelo</th>
                  <SortTh label="Conductor" sortKey="driver" sort={sort} toggle={toggle} />
                  <th>Ruta</th>
                  <th>Vigencia</th>
                  <SortTh label="Estado" sortKey="status" sort={sort} toggle={toggle} />
                  <th>PDF</th>
                </tr></thead>
                <tbody>
                  {sorted.map(f => (
                    <tr key={f.id} style={{ cursor: "pointer" }} onClick={() => setSel(f)}>
                      <td className="mono" style={{ fontWeight: 700, color: "var(--ink-900)" }}>{f.id}</td>
                      <td className="mono" style={{ fontSize: 13 }}>{f.contract}</td>
                      <td className="mono" style={{ fontWeight: 600 }}>{f.plate}</td>
                      <td>{f.make} · {f.model}</td>
                      <td>{f.driver}</td>
                      <td><span className="row gap-6" style={{ fontSize: 13 }}>{f.origin}<Icon name="arrow-right" size={12} className="muted" />{f.dest}</span></td>
                      <td className="muted" style={{ fontSize: 12.5 }}>{f.from} – {f.to}</td>
                      <td><Badge tone={FUEC_STATUS_TONE[f.status]} dot>{f.status}</Badge></td>
                      <td><button className="btn btn-soft btn-sm" onClick={e => { e.stopPropagation(); push("Descargando " + f.id + ".pdf"); }}><Icon name="file-down" size={15} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <TableFooter total={FUEC_LIST.length} />
          </Card>

          <Drawer open={!!sel} onClose={() => setSel(null)} title={sel ? sel.id : ""} width={480}
            footer={sel && <Fragment><Btn variant="primary" icon="file-down" className="grow" onClick={() => push("Descargando " + sel.id + ".pdf")}>Descargar PDF</Btn><Btn icon="copy" /></Fragment>}>
            {sel && <div>
              <div className="row between" style={{ marginBottom: 18 }}><Badge tone={FUEC_STATUS_TONE[sel.status]} dot>{sel.status}</Badge><span className="muted mono" style={{ fontSize: 12 }}>{sel.contract}</span></div>
              <KV label="Contratante">{sel.contratante}</KV>
              <KV label="Vehículo"><span className="mono">{sel.plate}</span> · {sel.make} {sel.model}</KV>
              <KV label="Conductor">{sel.driver}</KV>
              <KV label="Origen">{sel.origin}</KV>
              <KV label="Destino">{sel.dest}</KV>
              <KV label="Vigencia desde">{sel.from}</KV>
              <KV label="Vigencia hasta">{sel.to}</KV>
            </div>}
          </Drawer>
        </Fragment>
      ) : (
        <FuecCreate onCancel={() => setView("list")} onSave={() => { setView("list"); push("FUEC creado y PDF generado"); }} />
      )}
    </div>
  );
}

export function FuecCreate({ onCancel, onSave }) {
  return (
    <div>
      <PageHead title="Crear FUEC" subtitle="Diligencia los datos del contrato y el viaje" />
      <form onSubmit={e => { e.preventDefault(); onSave(); }}>
        <Card title="Datos del contrato" style={{ marginBottom: 16 }}>
          <div className="card-pad" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Field label="Empresa"><Input defaultValue="Transportes CMOCS S.A.S." /></Field>
            <Field label="Contratante"><Input placeholder="Ej: Ecopetrol S.A." /></Field>
            <Field label="N° de contrato"><Input placeholder="CT-2026-000" /></Field>
            <Field label="NIT contratante"><Input placeholder="900.000.000-0" /></Field>
            <div style={{ gridColumn: "1 / -1" }}><Field label="Objeto del contrato"><textarea className="textarea" placeholder="Descripción del objeto del contrato…" /></Field></div>
            <Field label="Responsable"><Input placeholder="Nombre del responsable" /></Field>
            <Field label="Afiliación"><Select defaultValue=""><option value="" disabled>Selecciona</option><option>Propia</option><option>Afiliada</option></Select></Field>
          </div>
        </Card>

        <Card title="Vehículo y operación" style={{ marginBottom: 16 }}>
          <div className="card-pad" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            <Field label="Vehículo (placa)"><Select defaultValue=""><option value="" disabled>Selecciona</option>{VEHICLES.map(v => <option key={v.id}>{v.plate}</option>)}</Select></Field>
            <Field label="Marca"><Input placeholder="Auto" /></Field>
            <Field label="Modelo"><Input placeholder="2022" /></Field>
            <Field label="Clase"><Input placeholder="Camioneta" /></Field>
            <Field label="N° interno"><Input placeholder="001" /></Field>
            <Field label="Tarjeta de operación"><Input placeholder="TO-00000" /></Field>
            <Field label="Vigencia desde"><Input type="date" /></Field>
            <Field label="Vigencia hasta"><Input type="date" /></Field>
            <div />
            <Field label="Origen"><Input icon="map-pin" placeholder="Ciudad origen" /></Field>
            <Field label="Destino"><Input icon="map-pin" placeholder="Ciudad destino" /></Field>
            <div />
          </div>
        </Card>

        <Card title="Conductores" style={{ marginBottom: 20 }}>
          <div className="card-pad" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Field label="Conductor 1"><Select defaultValue=""><option value="" disabled>Selecciona</option>{DRIVERS.map(d => <option key={d.id}>{d.name}</option>)}</Select></Field>
            <Field label="Conductor 2 (opcional)"><Select defaultValue=""><option value="">Ninguno</option>{DRIVERS.map(d => <option key={d.id}>{d.name}</option>)}</Select></Field>
          </div>
        </Card>

        <div className="row gap-12 between">
          <Btn variant="ghost" onClick={onCancel}>Cancelar</Btn>
          <div className="row gap-10"><Btn variant="soft" icon="save">Guardar borrador</Btn><Btn variant="primary" icon="file-check" type="submit">Crear y generar PDF</Btn></div>
        </div>
      </form>
    </div>
  );
}

