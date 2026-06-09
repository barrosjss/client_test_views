/* ---------------- TALLERES ---------------- */
export const WORKSHOPS = [
  { id: "TL-001", name: "Taller Central CMOCS", city: "Bogotá", specialty: "Mecánica general", rating: 4.8, ot: 142, phone: "+57 1 745 0012", status: "Activo" },
  { id: "TL-002", name: "Diésel Pro Norte", city: "Bogotá", specialty: "Motores diésel", rating: 4.6, ot: 88, phone: "+57 1 620 7741", status: "Activo" },
  { id: "TL-003", name: "Hidráulicos del Valle", city: "Cali", specialty: "Sistemas hidráulicos", rating: 4.9, ot: 54, phone: "+57 2 558 3390", status: "Activo" },
  { id: "TL-004", name: "Llantas y Frenos Sur", city: "Medellín", specialty: "Llantas y frenos", rating: 4.3, ot: 67, phone: "+57 4 311 0098", status: "Activo" },
  { id: "TL-005", name: "Electromecánica Caribe", city: "Barranquilla", specialty: "Sistema eléctrico", rating: 4.5, ot: 41, phone: "+57 5 350 8820", status: "Activo" },
  { id: "TL-006", name: "Servicio Móvil Ruta 40", city: "En sitio", specialty: "Asistencia en carretera", rating: 4.7, ot: 33, phone: "+57 320 118 0033", status: "Activo" },
  { id: "TL-007", name: "Carrocerías Andinas", city: "Tunja", specialty: "Latonería y pintura", rating: 4.2, ot: 19, phone: "+57 8 740 5512", status: "Inactivo" },
  { id: "TL-008", name: "Maquinaria Pesada CAT", city: "Bogotá", specialty: "Maquinaria amarilla", rating: 4.9, ot: 27, phone: "+57 1 425 7700", status: "Activo" },
];

/* ---------------- ÓRDENES DE TRABAJO (OT) ---------------- */
export const OT_STATES = {
  "Abierta": "blue", "En validación": "amber", "Aprobada": "green", "En ejecución": "violet",
  "Rechazada": "red", "Cerrada": "gray", "Anulada": "gray",
};
export const WORK_ORDERS = [
  { id: "OT-10492", state: "En ejecución", auth: "Enviada", plate: "WGT-481", vehState: "Operativo", date: "03 Jun 2026", obs: "Cambio sistema de frenos delanteros", odo: 184320, priority: "Alta", payResp: "Empresa", taller: "Llantas y Frenos Sur", oc: "OC-2291", client: "Constructora Andina" },
  { id: "OT-10493", state: "Abierta", auth: "Sin enviar", plate: "JKR-220", vehState: "No operativo", date: "01 Jun 2026", obs: "Reparación sistema hidráulico grúa", odo: 41200, priority: "Alta", payResp: "Empresa", taller: "Hidráulicos del Valle", oc: "—", client: "Minera El Cerrejón" },
  { id: "OT-10494", state: "En validación", auth: "Enviada", plate: "EXC-512", vehState: "Operativo", date: "02 Jun 2026", obs: "Mantenimiento preventivo 500h", odo: 14300, priority: "Media", payResp: "Propietario", taller: "Maquinaria Pesada CAT", oc: "OC-2288", client: "Minera El Cerrejón" },
  { id: "OT-10495", state: "Aprobada", auth: "Enviada", plate: "QAZ-104", vehState: "Operativo", date: "31 May 2026", obs: "Revisión general 220.000 km", odo: 220140, priority: "Baja", payResp: "Empresa", taller: "Diésel Pro Norte", oc: "OC-2280", client: "Transporte Intermunicipal" },
  { id: "OT-10496", state: "Abierta", auth: "Sin enviar", plate: "TRK-778", vehState: "No operativo", date: "03 Jun 2026", obs: "Diagnóstico falla de motor", odo: 156700, priority: "Alta", payResp: "Empresa", taller: "Taller Central CMOCS", oc: "—", client: "Logística del Caribe" },
  { id: "OT-10497", state: "En ejecución", auth: "Enviada", plate: "VAN-330", vehState: "Operativo", date: "02 Jun 2026", obs: "Cambio de aceite y filtros", odo: 88900, priority: "Baja", payResp: "Empresa", taller: "Taller Central CMOCS", oc: "OC-2285", client: "Agroindustrias del Valle" },
  { id: "OT-10498", state: "Cerrada", auth: "Enviada", plate: "BNM-913", vehState: "Operativo", date: "28 May 2026", obs: "Alineación y balanceo", odo: 62840, priority: "Baja", payResp: "Empresa", taller: "Llantas y Frenos Sur", oc: "OC-2271", client: "Constructora Andina" },
  { id: "OT-10499", state: "Anulada", auth: "Sin enviar", plate: "GRU-201", vehState: "Operativo", date: "27 May 2026", obs: "Solicitud duplicada", odo: 7600, priority: "Media", payResp: "Empresa", taller: "—", oc: "—", client: "Puerto Cartagena" },
  { id: "OT-10500", state: "Rechazada", auth: "Enviada", plate: "MOT-009", vehState: "Operativo", date: "26 May 2026", obs: "Costo fuera de presupuesto", odo: 12450, priority: "Baja", payResp: "Empresa", taller: "Electromecánica Caribe", oc: "—", client: "Mensajería Express" },
];
export const OT_KPIS = [
  { label: "OT Abiertas", value: 92, tone: "blue", icon: "folder-open" },
  { label: "En validación", value: 19, tone: "amber", icon: "clock" },
  { label: "Aprobadas", value: 1, tone: "green", icon: "check-circle-2" },
  { label: "En ejecución", value: 4, tone: "violet", icon: "wrench" },
  { label: "Faltan por OC", value: 23, tone: "amber", icon: "file-warning" },
  { label: "Anuladas hoy", value: 9, tone: "gray", icon: "x-circle" },
];

/* ---------------- FUEC ---------------- */
export const FUEC_LIST = [
  { id: "FUEC-003314", contract: "CT-2026-118", plate: "QAZ-104", make: "Mercedes-Benz", model: 2020, driver: "Pedro Gómez", origin: "Bogotá", dest: "Villavicencio", from: "01 Jun 2026", to: "30 Jun 2026", contratante: "Ecopetrol S.A.", status: "Vigente" },
  { id: "FUEC-003313", contract: "CT-2026-117", plate: "VAN-330", make: "Ford", model: 2022, driver: "María Torres", origin: "Barranquilla", dest: "Santa Marta", from: "28 May 2026", to: "28 Jun 2026", contratante: "Logística del Caribe", status: "Vigente" },
  { id: "FUEC-003312", contract: "CT-2026-116", plate: "BNM-913", make: "Toyota", model: 2023, driver: "Laura Ramírez", origin: "Bogotá", dest: "Tunja", from: "25 May 2026", to: "10 Jun 2026", contratante: "Constructora Andina", status: "Vigente" },
  { id: "FUEC-003311", contract: "CT-2026-115", plate: "WGT-481", make: "Volvo", model: 2022, driver: "Carlos Mendoza", origin: "Bogotá", dest: "Medellín", from: "20 May 2026", to: "20 Jun 2026", contratante: "Cementos Bolívar", status: "Vigente" },
  { id: "FUEC-003310", contract: "CT-2026-110", plate: "QAZ-104", make: "Mercedes-Benz", model: 2020, driver: "Pedro Gómez", origin: "Cali", dest: "Buenaventura", from: "01 May 2026", to: "31 May 2026", contratante: "Puerto de Buenaventura", status: "Vencido" },
  { id: "FUEC-003309", contract: "CT-2026-108", plate: "GRU-201", make: "Grove", model: 2023, driver: "Jorge Salas", origin: "Cartagena", dest: "Sincelejo", from: "15 Abr 2026", to: "15 May 2026", contratante: "Puerto Cartagena", status: "Vencido" },
];
export const FUEC_STATUS_TONE = { "Vigente": "green", "Vencido": "red", "Por vencer": "amber" };

/* ---------------- CONCILIACIONES ---------------- */
export const CONCILIATIONS = [
  { id: "CC-0341", consec: "2026-0341", estado: "Aprobada", total: 51200000, desde: "01 May 2026", hasta: "31 May 2026", fecha: "01 Jun 2026", contacto: "Minera El Cerrejón", contrato: "CT-2026-101" },
  { id: "CC-0340", consec: "2026-0340", estado: "En revisión", total: 28400000, desde: "01 May 2026", hasta: "31 May 2026", fecha: "01 Jun 2026", contacto: "Constructora Andina", contrato: "CT-2026-115" },
  { id: "CC-0339", consec: "2026-0339", estado: "Aprobada", total: 33600000, desde: "01 May 2026", hasta: "31 May 2026", fecha: "31 May 2026", contacto: "Cementos Bolívar", contrato: "CT-2026-099" },
  { id: "CC-0338", consec: "2026-0338", estado: "Con diferencias", total: 12800000, desde: "01 May 2026", hasta: "31 May 2026", fecha: "30 May 2026", contacto: "Logística del Caribe", contrato: "CT-2026-117" },
  { id: "CC-0337", consec: "2026-0337", estado: "Borrador", total: 8900000, desde: "01 May 2026", hasta: "31 May 2026", fecha: "29 May 2026", contacto: "Agroindustrias del Valle", contrato: "CT-2026-088" },
  { id: "CC-0336", consec: "2026-0336", estado: "Aprobada", total: 19400000, desde: "01 Abr 2026", hasta: "30 Abr 2026", fecha: "02 May 2026", contacto: "Ecopetrol S.A.", contrato: "CT-2026-118" },
];
export const CONC_TONE = { "Aprobada": "green", "En revisión": "blue", "Con diferencias": "amber", "Borrador": "gray" };

/* ---------------- COMPARENDOS ---------------- */
export const COMPARENDOS = [
  { id: "CMP-7781", plate: "QAZ-104", code: "C29", reason: "Exceso de velocidad", date: "22 May 2026", amount: 522000, status: "Pendiente", driver: "Pedro Gómez" },
  { id: "CMP-7780", plate: "WGT-481", code: "B01", reason: "Mal estacionado", date: "18 May 2026", amount: 261000, status: "Pagado", driver: "Carlos Mendoza" },
  { id: "CMP-7779", plate: "VAN-330", code: "D02", reason: "Documentos vencidos", date: "10 May 2026", amount: 696000, status: "En trámite", driver: "María Torres" },
];
export const COMP_TONE = { "Pendiente": "red", "En trámite": "amber", "Pagado": "green" };

/* ---------------- CLIENTES ACTIVOS ---------------- */
export const CLIENTS = [
  { name: "Constructora Andina S.A.", vehicles: 8, contracts: 3, city: "Bogotá" },
  { name: "Minera El Cerrejón", vehicles: 6, contracts: 2, city: "Riohacha" },
  { name: "Cementos Bolívar", vehicles: 5, contracts: 2, city: "Cartagena" },
  { name: "Logística del Caribe", vehicles: 4, contracts: 1, city: "Barranquilla" },
  { name: "Ecopetrol S.A.", vehicles: 3, contracts: 2, city: "Bogotá" },
  { name: "Agroindustrias del Valle", vehicles: 2, contracts: 1, city: "Cali" },
];

/* ---------------- ODÓMETRO ---------------- */
export const ODOMETER = [
  { plate: "TAX-471", value: 363627, date: "Hoy 09:41", driver: "Carlos Mendoza", source: "Manual" },
  { plate: "WGT-481", value: 184320, date: "Hoy 08:12", driver: "Carlos Mendoza", source: "GPS" },
  { plate: "QAZ-104", value: 220140, date: "Ayer 18:30", driver: "Pedro Gómez", source: "GPS" },
  { plate: "VAN-330", value: 88900, date: "Ayer 17:05", driver: "María Torres", source: "Manual" },
  { plate: "BNM-913", value: 62840, date: "Ayer 12:20", driver: "Laura Ramírez", source: "Manual" },
];

/* ---------------- INSPECCIONES / PREOPERACIONAL ---------------- */
export const INSPECTIONS = [
  { id: "INS-2208", plate: "WGT-481", type: "Preoperacional", date: "03 Jun 2026", result: "Apto", items: "32/32", inspector: "Carlos Mendoza" },
  { id: "INS-2207", plate: "QAZ-104", type: "Preoperacional", date: "03 Jun 2026", result: "Apto con observaciones", items: "30/32", inspector: "Pedro Gómez" },
  { id: "INS-2206", plate: "JKR-220", type: "Estado", date: "01 Jun 2026", result: "No apto", items: "24/32", inspector: "Hernán Díaz" },
  { id: "INS-2205", plate: "VAN-330", type: "Preoperacional", date: "02 Jun 2026", result: "Apto", items: "32/32", inspector: "María Torres" },
];
export const INSP_TONE = { "Apto": "green", "Apto con observaciones": "amber", "No apto": "red" };

/* ---------------- HOJA DE VIDA (personal) ---------------- */
export const PERSONNEL = [
  { id: "EMP-001", name: "Carlos Mendoza", role: "Conductor", doc: "CC 79.441.180", phone: "+57 310 442 1180", entry: "12 Mar 2021", type: "Particular", status: "Activo" },
  { id: "EMP-002", name: "Pedro Gómez", role: "Conductor", doc: "CC 80.118.774", phone: "+57 320 118 7745", entry: "05 Ene 2020", type: "Particular", status: "Activo" },
  { id: "EMP-003", name: "Hernán Díaz", role: "Jefe de taller", doc: "CC 16.554.221", phone: "+57 317 220 1190", entry: "20 Jul 2019", type: "Particular", status: "Activo" },
  { id: "EMP-004", name: "Natalia Suárez", role: "Contador", doc: "CC 52.778.901", phone: "+57 311 905 8820", entry: "01 Feb 2022", type: "Particular", status: "Activo" },
  { id: "EMP-005", name: "Operador Ruta 40", role: "Operador externo", doc: "CC 91.220.044", phone: "+57 315 660 0011", entry: "10 Abr 2024", type: "Pública", status: "Activo" },
];

/* ---------------- VIÁTICOS ---------------- */
export const PERDIEMS = [
  { id: "VT-0912", driver: "Carlos Mendoza", plate: "WGT-481", trip: "Bogotá → Medellín", amount: 380000, items: "Peajes, alimentación", date: "01 Jun 2026", status: "Aprobado" },
  { id: "VT-0911", driver: "Pedro Gómez", plate: "QAZ-104", trip: "Cali → Buenaventura", amount: 210000, items: "Alimentación, hospedaje", date: "31 May 2026", status: "Pendiente" },
  { id: "VT-0910", driver: "María Torres", plate: "VAN-330", trip: "Barranquilla → Santa Marta", amount: 165000, items: "Peajes", date: "30 May 2026", status: "Aprobado" },
  { id: "VT-0909", driver: "Laura Ramírez", plate: "BNM-913", trip: "Bogotá → Tunja", amount: 140000, items: "Alimentación", date: "29 May 2026", status: "Liquidado" },
];
export const PERDIEM_TONE = { "Aprobado": "green", "Pendiente": "amber", "Liquidado": "blue" };

/* ---------------- SIIGO journals ---------------- */
export const SIIGO_JOURNALS = [
  { id: "J-20260601", date: "01 Jun 2026", type: "Factura de venta", doc: "FAC-2026-0422", value: 33600000, status: "Sincronizado", account: "4135 - Ingresos" },
  { id: "J-20260531", date: "31 May 2026", type: "Comprobante egreso", doc: "OT-10498", value: 320000, status: "Sincronizado", account: "5135 - Mantenimiento" },
  { id: "J-20260530", date: "30 May 2026", type: "Factura de venta", doc: "FAC-2026-0420", value: 12800000, status: "Error", account: "4135 - Ingresos" },
  { id: "J-20260529", date: "29 May 2026", type: "Nómina", doc: "NOM-2026-05", value: 14550000, status: "Pendiente", account: "5105 - Gastos personal" },
  { id: "J-20260528", date: "28 May 2026", type: "Comprobante egreso", doc: "VT-0911", value: 210000, status: "Sincronizado", account: "5115 - Viáticos" },
];
export const SIIGO_TONE = { "Sincronizado": "green", "Pendiente": "amber", "Error": "red" };

export const INSIGHTS_TEXT = "La flota opera al 68% de utilización. 2 documentos críticos requieren atención inmediata (técnico-mecánica JKR-220 y certificado EXC-512). El consumo del bus QAZ-104 está 18% por encima del promedio — se recomienda inspección. Hay 23 órdenes de trabajo sin orden de compra que frenan la facturación de mayo.";

