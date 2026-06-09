import React, { useState, useEffect, Fragment } from 'react';
import { Icon } from '../../shared/ui/Icon.jsx';
import {
  Logo, Btn, Badge, Avatar, Field, Input, Select, Checkbox, Switch,
  Card, Stat, ImgSlot, Segmented, Bar,
} from '../../shared/ui/primitives.jsx';
import { fmtCOP, fmtNum } from '../../shared/data/index.js';

export const DOCS_INTRO = {
  id: "intro", icon: "compass", title: "Introducción",
  tagline: "Por qué una empresa de transporte necesita un centro de mando",
};

export const DOCS = [
  { group: "Operación", items: [
    { id: "d-vehicles", nav: "vehicles", icon: "truck", title: "Vehículos y maquinaria",
      tagline: "El inventario vivo de todo lo que se mueve y trabaja.",
      what: "Un registro único de cada unidad —carros, camionetas, motos, camiones de carga, grúas, excavadoras y buses— con su ficha técnica completa: placa, propietario, marca, modelo, motor, VIN, capacidad y estado.",
      why: ["Sin un inventario centralizado nadie sabe con certeza cuántos activos hay, dónde están ni en qué estado.", "La información dispersa en hojas de cálculo genera duplicados, datos vencidos y decisiones a ciegas.", "Cada vehículo es capital de trabajo: saber su salud y disponibilidad protege la rentabilidad."],
      how: ["Ficha técnica unificada con foto, propietario y cliente asignado.", "Vista en tabla o tarjetas, con filtros por estado (activo, en obra, mantenimiento, inactivo).", "Detalle con pestañas: documentación, inspecciones, odómetro, mantenimientos, órdenes de trabajo y comparendos en un solo lugar."] },
    { id: "d-workorders", nav: "workorders", icon: "clipboard-list", title: "Órdenes de trabajo",
      tagline: "El flujo de aprobación de cada intervención en taller.",
      what: "Las OT controlan el ciclo completo de un trabajo sobre un vehículo: apertura, autorización, orden de compra, ejecución en taller y cierre — con estados, prioridades y responsable de pago.",
      why: ["Autorizar reparaciones sin control es la principal fuga de dinero en una flota.", "Sin trazabilidad no se sabe qué se aprobó, quién lo aprobó ni cuánto costó realmente.", "Las OT sin orden de compra frenan la facturación al cliente."],
      how: ["Tablero con indicadores: abiertas, en validación, aprobadas, en ejecución, sin OC y anuladas.", "Flujo de autorización claro (enviar → validar → aprobar) con línea de tiempo por OT.", "Vínculo directo con vehículo, taller y orden de compra para cerrar el círculo de costos."] },
    { id: "d-fuec", nav: "fuec", icon: "file-signature", title: "FUEC",
      tagline: "El Formato Único de Extracto del Contrato, en regla y a un clic.",
      what: "El FUEC es el documento legal que autoriza el transporte especial en Colombia. Asocia un contrato, un vehículo, conductores y una ruta con vigencia definida.",
      why: ["Operar sin FUEC vigente expone a sanciones, inmovilización y pérdida del contrato.", "Diligenciarlo a mano es lento y propenso a errores en datos críticos.", "Los contratantes exigen el documento al instante antes de cada servicio."],
      how: ["Formulario guiado: contrato, contratante, vehículo, operación y hasta dos conductores.", "Generación y descarga del PDF listo para presentar.", "Control de vigencia con alertas de vencimiento por documento."] },
    { id: "d-maintenance", nav: "maintenance", icon: "wrench", title: "Mantenimientos",
      tagline: "Preventivo planificado y correctivo bajo control.",
      what: "Planes de mantenimiento por kilometraje u horas y registro de los trabajos ejecutados, con repuestos y costos asociados.",
      why: ["El mantenimiento reactivo cuesta hasta 3 veces más que el preventivo y para la operación.", "Una unidad varada por falta de servicio es ingreso perdido y un cliente insatisfecho.", "Sin historial no se puede negociar garantías ni prever fallas recurrentes."],
      how: ["Programación preventiva con avisos antes de cada intervención.", "Costo por categoría (motor, frenos, hidráulico, llantas) para detectar gastos atípicos.", "Historial completo por vehículo enlazado a las órdenes de trabajo."] },
    { id: "d-tracking", nav: "tracking", icon: "satellite-dish", title: "Rastreo satelital",
      tagline: "Dónde está cada unidad, ahora mismo.",
      what: "Ubicación en tiempo real de la flota sobre el mapa, con velocidad, última señal y estado de cada vehículo.",
      why: ["La visibilidad en vivo permite responder a clientes y resolver imprevistos al instante.", "El monitoreo disuade el mal uso de los vehículos y mejora la seguridad.", "Confirmar posiciones reduce disputas sobre tiempos de entrega."],
      how: ["Mapa con marcadores por unidad y panel lateral con detalle.", "Velocidad y última señal por vehículo.", "Base para geocercas y alertas de comportamiento (integrable con tu proveedor GPS)."] },
  ]},
  { group: "Contactos", items: [
    { id: "d-contacts", nav: "contacts", icon: "contact", title: "Contactos",
      tagline: "Clientes y proveedores con su saldo siempre a la vista.",
      what: "Directorio de empresas y personas con las que operas: clientes que contratan servicios y proveedores que te abastecen, con su saldo y actividad.",
      why: ["Conocer el saldo de cada contacto evita seguir prestando servicio a quien ya debe.", "Centralizar contactos elimina la duplicación entre áreas.", "La relación comercial se gestiona mejor con el historial a la mano."],
      how: ["Saldo por cobrar o por pagar visible en cada ficha.", "Filtros por tipo (cliente / proveedor) y actividad reciente.", "Atajo directo para facturar o crear una orden desde el contacto."] },
    { id: "d-drivers", nav: "drivers", icon: "id-card", title: "Conductores",
      tagline: "El activo humano que mueve tu operación.",
      what: "Registro de conductores con licencia, categoría, vigencia, vehículo asignado, viajes y calificación.",
      why: ["Un conductor con licencia vencida es un riesgo legal y de seguridad inaceptable.", "Asignar al conductor correcto al vehículo correcto optimiza la operación.", "Medir desempeño permite reconocer y mejorar al equipo."],
      how: ["Alerta visible de licencias vencidas para bloquear asignaciones.", "Indicadores de viajes, rating y disponibilidad.", "Ficha enlazada con viáticos, nómina y hoja de vida."] },
    { id: "d-workshops", nav: "workshops", icon: "warehouse", title: "Talleres",
      tagline: "Tu red de servicio, evaluada y organizada.",
      what: "Catálogo de talleres y proveedores de servicio con especialidad, ciudad, calificación y volumen de trabajos atendidos.",
      why: ["Elegir el taller adecuado por especialidad reduce tiempos y costos.", "Evaluar proveedores evita repetir errores y mejora la negociación.", "Una red ordenada agiliza la asignación de cada orden de trabajo."],
      how: ["Tarjetas con especialidad, ubicación, rating y OT atendidas.", "Búsqueda por nombre, ciudad o especialidad.", "Asignación directa de talleres a las órdenes de trabajo."] },
  ]},
  { group: "Facturación", items: [
    { id: "d-conciliations", nav: "conciliations", icon: "git-compare-arrows", title: "Conciliaciones",
      tagline: "Cuadrar lo prestado con lo cobrado, por contrato y período.",
      what: "Proceso que consolida los servicios prestados en un período y los concilia contra lo facturado y pagado, detectando diferencias.",
      why: ["Las diferencias no detectadas son dinero que nunca se cobra.", "Conciliar por contrato da claridad sobre la rentabilidad real de cada cliente.", "Es la base para cerrar el mes contable con confianza."],
      how: ["Consolidado por consecutivo, contrato, contacto y período.", "Estados claros: aprobada, en revisión, con diferencias, borrador.", "Total conciliado y alertas de descuadres para resolver a tiempo."] },
    { id: "d-billing", nav: "billing", icon: "receipt", title: "Facturas",
      tagline: "Del servicio prestado a la factura emitida, sin saltos.",
      what: "Emisión y gestión de facturas a clientes a partir de los viajes y servicios prestados, con su estado de pago.",
      why: ["Facturar tarde retrasa el flujo de caja que sostiene la operación.", "Errores de facturación dañan la relación con el cliente.", "El control del estado de cada factura evita cobros perdidos."],
      how: ["Facturas vinculadas a viajes y contratos.", "Estados de pago: pagada, pendiente, vencida.", "Indicadores de facturado, recaudado y por cobrar del período."] },
    { id: "d-receivables", nav: "receivables", icon: "hand-coins", title: "Cuentas por cobrar",
      tagline: "Tu cartera, ordenada por antigüedad.",
      what: "Control de la cartera por cliente, clasificada por antigüedad de saldo (corriente, 30-60, +60 días).",
      why: ["La cartera vencida es la causa número uno de quiebra por falta de liquidez.", "Saber qué saldo está por vencer permite gestionar el cobro a tiempo.", "Una cartera sana es lo que mantiene la operación en marcha."],
      how: ["Saldos clasificados por antigüedad y estado.", "Recordatorios de pago por cliente.", "Visión consolidada de la cartera total y en riesgo."] },
    { id: "d-siigo", nav: "siigo", icon: "refresh-cw", title: "Integración SIIGO",
      tagline: "La contabilidad sincronizada, sin doble digitación.",
      what: "Integración con el software contable SIIGO para sincronizar automáticamente los asientos (journals) de ventas, egresos, nómina y viáticos.",
      why: ["Digitar dos veces la información es lento y multiplica los errores.", "La contabilidad desactualizada impide decisiones financieras correctas.", "La conciliación contable manual consume horas del equipo cada mes."],
      how: ["Sincronización automática de asientos contables.", "Estado por asiento: sincronizado, pendiente o con error.", "Conexión configurable con tu empresa en SIIGO."] },
  ]},
  { group: "Gestión de personal", items: [
    { id: "d-payroll", nav: "payroll", icon: "wallet", title: "Nómina de conductores",
      tagline: "Liquidación justa por viajes, kilómetros y comisiones.",
      what: "Cálculo de la nómina de conductores combinando salario base, comisiones por viaje o kilómetro y deducciones.",
      why: ["Una liquidación opaca genera desconfianza y rotación del personal.", "Los errores de nómina cuestan dinero y tiempo en reprocesos.", "Pagar por desempeño alinea al conductor con los resultados del negocio."],
      how: ["Liquidación por período con base, comisión y deducciones.", "Totales claros por conductor listos para pago.", "Conectado con viajes y kilómetros reales de la operación."] },
    { id: "d-personnel", nav: "personnel", icon: "folder-kanban", title: "Hoja de vida",
      tagline: "El expediente completo de tu equipo.",
      what: "Expedientes del personal interno y externo con documento, contacto, fecha de ingreso y tipo de vinculación.",
      why: ["Tener la documentación del personal en regla es una exigencia legal.", "Un expediente ordenado agiliza auditorías y procesos internos.", "Centralizar la información reduce el riesgo de perder datos críticos."],
      how: ["Expedientes particulares y públicos separados.", "Datos clave y documentos en una sola ficha.", "Enlace con nómina, viáticos y asignaciones."] },
    { id: "d-perdiems", nav: "perdiems", icon: "banknote", title: "Viáticos",
      tagline: "Cada peso de viaje, registrado y aprobado.",
      what: "Registro y aprobación de los gastos de viaje (peajes, alimentación, hospedaje) por vehículo y conductor.",
      why: ["Los viáticos sin control se convierten en un gasto difuso e incontrolable.", "Aprobar y soportar cada gasto previene fraudes y reclamos.", "Imputar el viático al viaje muestra el costo real de cada servicio."],
      how: ["Registro por conductor, vehículo y trayecto.", "Flujo de aprobación con estados (pendiente, aprobado, liquidado).", "Totales del período para control presupuestal."] },
  ]},
  { group: "Sistema", items: [
    { id: "d-documents", nav: "documents", icon: "file-check", title: "Documentos y vencimientos",
      tagline: "SOAT, técnico-mecánica y pólizas que nunca te toman por sorpresa.",
      what: "Control de los documentos legales de cada vehículo con su fecha de vencimiento y estado.",
      why: ["Circular con un documento vencido implica multas e inmovilización inmediata.", "El seguimiento manual de decenas de vencimientos siempre falla.", "Un documento al día es requisito para prestar el servicio."],
      how: ["Semáforo de estado: vigente, por vencer y vencido.", "Alertas anticipadas antes de cada vencimiento.", "Vista consolidada de toda la flota y por vehículo."] },
    { id: "d-reports", nav: "reports", icon: "bar-chart-3", title: "Reportes y analítica",
      tagline: "Los números que revelan si el negocio gana o pierde.",
      what: "Indicadores de costo por kilómetro, utilización de flota, rentabilidad y distribución de costos.",
      why: ["Sin datos no se sabe qué vehículos, rutas o clientes son realmente rentables.", "Medir el costo por kilómetro es la base para fijar tarifas que dejen margen.", "Los reportes convierten la operación diaria en decisiones estratégicas."],
      how: ["KPIs de costo, utilización, ingreso por viaje y disponibilidad.", "Rentabilidad mensual y distribución de costos.", "Reportes guardados y exportables para tu equipo."] },
    { id: "d-users", nav: "users", icon: "users", title: "Usuarios y roles",
      tagline: "Cada quien ve y hace solo lo que le corresponde.",
      what: "Gestión de usuarios y roles (administrador, despachador, contador, jefe de taller, conductor) con permisos por módulo.",
      why: ["Dar acceso total a todos es un riesgo de seguridad y de error humano.", "Los roles bien definidos ordenan la responsabilidad de cada área.", "El control de acceso protege la información sensible del negocio."],
      how: ["Roles predefinidos para la operación de transporte.", "Matriz de permisos por módulo, fácil de auditar.", "Invitación de usuarios y control de estado de cada cuenta."] },
  ]},
];

export const DOCS_FLAT = DOCS.flatMap(g => g.items);

export function DocsHeader({ go, loggedIn }) {
  return (
    <header style={{ height: 64, background: "var(--ink-900)", display: "flex", alignItems: "center", gap: 16, padding: "0 22px", flex: "none", position: "sticky", top: 0, zIndex: 30 }}>
      <button onClick={() => go(loggedIn ? "app" : "landing")} style={{ border: "none", background: "transparent", cursor: "pointer", padding: 0 }}><Logo light /></button>
      <span style={{ color: "rgba(255,255,255,.3)" }}>/</span>
      <span style={{ color: "#fff", fontFamily: "var(--font-head)", fontWeight: 600, fontSize: 16 }}>Documentación</span>
      <div className="grow" />
      <div className="input-group desktop-only" style={{ width: 240 }}>
        <Icon name="search" size={16} />
        <input className="input" placeholder="Buscar en la guía…" style={{ height: 38, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)", color: "#fff" }} />
      </div>
      <button className="btn btn-primary" onClick={() => go(loggedIn ? "app" : "login")}>{loggedIn ? "Volver a la plataforma" : "Ingresar"}<Icon name="arrow-right" size={17} /></button>
    </header>
  );
}

export function DocsIndex({ sel, setSel }) {
  return (
    <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <button onClick={() => setSel("intro")} className="nav-item" style={{ color: sel === "intro" ? "var(--ink-900)" : "var(--slate-500)", background: sel === "intro" ? "var(--amber-tint)" : "transparent", padding: "9px 12px", fontWeight: 700 }}>
        <Icon name="compass" size={17} /> Introducción
      </button>
      {DOCS.map(g => (
        <div key={g.group} style={{ marginTop: 12 }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--slate-400)", padding: "0 12px 6px" }}>{g.group}</div>
          {g.items.map(it => {
            const on = sel === it.id;
            return (
              <button key={it.id} onClick={() => setSel(it.id)} style={{
                display: "flex", alignItems: "center", gap: 10, width: "100%", border: "none", cursor: "pointer",
                background: on ? "var(--amber-tint)" : "transparent", color: on ? "var(--amber-700)" : "var(--ink-700)",
                padding: "8px 12px", borderRadius: 9, fontSize: 13.5, fontWeight: 600, textAlign: "left", transition: "background .12s",
              }}
                onMouseEnter={e => { if (!on) e.currentTarget.style.background = "var(--bg)"; }}
                onMouseLeave={e => { if (!on) e.currentTarget.style.background = "transparent"; }}>
                <Icon name={it.icon} size={16} style={{ color: on ? "var(--amber-600)" : "var(--slate-400)", flex: "none" }} /> {it.title}
              </button>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

export function DocsIntroContent({ setSel }) {
  return (
    <div className="fade-in">
      <span className="badge badge-amber" style={{ marginBottom: 16 }}><span className="dot" /> Guía de gestión de flotas</span>
      <h1 style={{ fontSize: 38, letterSpacing: "-0.03em", lineHeight: 1.1 }}>Todo lo que tu empresa de transporte debe gestionar —<span style={{ color: "var(--amber-600)" }}> y cómo CMOCS lo hace simple.</span></h1>
      <p style={{ fontSize: 17, color: "var(--slate-500)", lineHeight: 1.6, marginTop: 18, maxWidth: 680 }}>
        Operar una flota de carga, maquinaria o pasajeros significa coordinar decenas de frentes a la vez: vehículos, conductores, documentos legales, mantenimientos, contratos, facturación y cartera. Cuando esa información vive en hojas de cálculo dispersas, las cosas se caen: un SOAT vencido, una reparación sin autorizar, una factura que nunca se cobró.
      </p>
      <p style={{ fontSize: 17, color: "var(--slate-500)", lineHeight: 1.6, marginTop: 14, maxWidth: 680 }}>
        CMOCS es el <strong style={{ color: "var(--ink-800)" }}>centro de mando</strong> que reúne todos esos frentes en una sola plataforma, donde cada área trabaja sobre los mismos datos en tiempo real. Esta guía explica, módulo por módulo, <strong style={{ color: "var(--ink-800)" }}>qué debes gestionar, por qué importa</strong> para tu negocio y <strong style={{ color: "var(--ink-800)" }}>cómo CMOCS te lo resuelve</strong>.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginTop: 30 }} className="grid-3">
        {[["layers", "Una sola fuente de verdad", "Vehículos, conductores y clientes compartidos por todos los módulos, sin doble digitación."], ["shield-check", "Cumplimiento sin sustos", "Documentos, FUEC y licencias con alertas que se adelantan a cada vencimiento."], ["trending-up", "Decisiones con datos", "Costo por kilómetro, rentabilidad y cartera siempre a la vista."]].map(([ic, t, d]) => (
          <div key={t} className="card card-pad">
            <span style={{ width: 42, height: 42, borderRadius: 12, background: "var(--amber-tint)", color: "var(--amber-600)", display: "grid", placeItems: "center" }}><Icon name={ic} size={21} /></span>
            <h3 style={{ fontSize: 16, marginTop: 14 }}>{t}</h3>
            <p style={{ fontSize: 13.5, color: "var(--slate-500)", marginTop: 6, lineHeight: 1.5 }}>{d}</p>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 22, marginTop: 40, marginBottom: 4 }}>Explora cada módulo</h2>
      <p style={{ color: "var(--slate-500)", fontSize: 15, marginBottom: 18 }}>Selecciona un módulo en el índice o empieza por los más usados:</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }} className="grid-2-1">
        {DOCS_FLAT.slice(0, 6).map(it => (
          <button key={it.id} onClick={() => setSel(it.id)} className="card card-pad row gap-14" style={{ cursor: "pointer", textAlign: "left", alignItems: "flex-start", transition: "all .15s" }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--sh-md)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
            <span style={{ width: 44, height: 44, borderRadius: 12, background: "var(--ink-800)", color: "var(--amber-400)", display: "grid", placeItems: "center", flex: "none" }}><Icon name={it.icon} size={22} /></span>
            <div><div style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.3 }}>{it.title}</div><div style={{ fontSize: 13, color: "var(--slate-500)", marginTop: 3, lineHeight: 1.45 }}>{it.tagline}</div></div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function DocsModuleContent({ doc, go, loggedIn, setActive }) {
  return (
    <div className="fade-in">
      <div className="row gap-16" style={{ marginBottom: 22 }}>
        <span style={{ width: 60, height: 60, borderRadius: 16, background: "var(--ink-800)", color: "var(--amber-400)", display: "grid", placeItems: "center", flex: "none" }}><Icon name={doc.icon} size={30} /></span>
        <div>
          <h1 style={{ fontSize: 30, letterSpacing: "-0.03em" }}>{doc.title}</h1>
          <p style={{ fontSize: 16, color: "var(--slate-500)", marginTop: 4 }}>{doc.tagline}</p>
        </div>
      </div>

      <div className="card card-pad" style={{ marginBottom: 20, borderLeft: "3px solid var(--amber-500)" }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--amber-700)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 6 }}>¿Qué es?</div>
        <p style={{ fontSize: 15.5, color: "var(--ink-700)", lineHeight: 1.6 }}>{doc.what}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="grid-2-1">
        <div className="card card-pad">
          <div className="row gap-10" style={{ marginBottom: 14 }}>
            <span style={{ width: 34, height: 34, borderRadius: 9, background: "var(--info-tint)", color: "var(--info)", display: "grid", placeItems: "center" }}><Icon name="alert-circle" size={18} /></span>
            <h3 style={{ fontSize: 16 }}>Por qué importa para tu negocio</h3>
          </div>
          <div className="col gap-12">
            {doc.why.map((w, i) => (
              <div key={i} className="row gap-10" style={{ alignItems: "flex-start" }}>
                <Icon name="dot" size={18} style={{ color: "var(--info)", flex: "none", marginTop: 1 }} />
                <span style={{ fontSize: 14, color: "var(--ink-700)", lineHeight: 1.5 }}>{w}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card card-pad" style={{ background: "var(--ink-900)", border: "none" }}>
          <div className="row gap-10" style={{ marginBottom: 14 }}>
            <span style={{ width: 34, height: 34, borderRadius: 9, background: "rgba(245,158,11,.18)", color: "var(--amber-400)", display: "grid", placeItems: "center" }}><Icon name="sparkles" size={18} /></span>
            <h3 style={{ fontSize: 16, color: "#fff" }}>Cómo lo hace fácil CMOCS</h3>
          </div>
          <div className="col gap-12">
            {doc.how.map((h, i) => (
              <div key={i} className="row gap-10" style={{ alignItems: "flex-start" }}>
                <Icon name="check" size={17} strokeWidth={3} style={{ color: "var(--amber-400)", flex: "none", marginTop: 1 }} />
                <span style={{ fontSize: 14, color: "rgba(255,255,255,.82)", lineHeight: 1.5 }}>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {loggedIn && (
        <div className="card card-pad row between wrap gap-12" style={{ marginTop: 20 }}>
          <div className="row gap-12"><span style={{ width: 40, height: 40, borderRadius: 11, background: "var(--amber-tint)", color: "var(--amber-600)", display: "grid", placeItems: "center" }}><Icon name="arrow-right-circle" size={20} /></span><div><div style={{ fontWeight: 700, fontSize: 15 }}>Ir al módulo {doc.title}</div><div style={{ fontSize: 13, color: "var(--slate-500)" }}>Abre esta sección directamente en la plataforma.</div></div></div>
          <Btn variant="primary" icon="external-link" onClick={() => { setActive(doc.nav); go("app"); }}>Abrir módulo</Btn>
        </div>
      )}
    </div>
  );
}

export function Docs({ go, loggedIn, setActive }) {
  const [sel, setSel] = useState("intro");
  const mainRef = React.useRef(null);
  useEffect(() => { if (mainRef.current) mainRef.current.scrollTop = 0; }, [sel]);
  const doc = DOCS_FLAT.find(d => d.id === sel);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      <DocsHeader go={go} loggedIn={loggedIn} />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "280px 1fr", minHeight: 0 }} className="docs-grid">
        <aside className="docs-index" style={{ borderRight: "1px solid var(--line)", background: "var(--surface)", overflowY: "auto", padding: "20px 14px" }}>
          <DocsIndex sel={sel} setSel={setSel} />
        </aside>
        <main ref={mainRef} style={{ overflowY: "auto", padding: "40px 48px 80px" }}>
          <div style={{ maxWidth: 880, margin: "0 auto" }}>
            {sel === "intro" ? <DocsIntroContent setSel={setSel} /> : <DocsModuleContent doc={doc} go={go} loggedIn={loggedIn} setActive={setActive} />}
          </div>
        </main>
      </div>
    </div>
  );
}

