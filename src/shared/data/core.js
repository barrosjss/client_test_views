export const VEHICLES = [
  { id: "VH-1042", plate: "WGT-481", type: "Camión de carga", make: "Volvo FH16", year: 2022, status: "Activo", driver: "Carlos Mendoza", odo: 184320, fuel: "Diésel", loc: "Bogotá — Calle 80", health: 92, category: "truck" },
  { id: "VH-1043", plate: "JKR-220", type: "Grúa", make: "Liebherr LTM 1090", year: 2019, status: "Mantenimiento", driver: "—", odo: 41200, fuel: "Diésel", loc: "Taller central", health: 48, category: "crane" },
  { id: "VH-1044", plate: "BNM-913", type: "Camioneta", make: "Toyota Hilux", year: 2023, status: "Activo", driver: "Laura Ramírez", odo: 62840, fuel: "Diésel", loc: "Medellín — Autopista Sur", health: 88, category: "pickup" },
  { id: "VH-1045", plate: "PLO-557", type: "Excavadora", make: "CAT 320", year: 2021, status: "En obra", driver: "Operador externo", odo: 9800, fuel: "Diésel", loc: "Proyecto Ruta 40", health: 76, category: "excavator" },
  { id: "VH-1046", plate: "QAZ-104", type: "Bus", make: "Mercedes-Benz O500", year: 2020, status: "Activo", driver: "Pedro Gómez", odo: 220140, fuel: "Diésel", loc: "Cali — Terminal", health: 81, category: "bus" },
  { id: "VH-1047", plate: "MOT-009", type: "Motocicleta", make: "Yamaha XTZ 250", year: 2024, status: "Activo", driver: "Andrés Ruiz", odo: 12450, fuel: "Gasolina", loc: "Bogotá — Centro", health: 95, category: "moto" },
  { id: "VH-1048", plate: "TRK-778", type: "Camión de carga", make: "Kenworth T880", year: 2021, status: "Inactivo", driver: "—", odo: 156700, fuel: "Diésel", loc: "Patio norte", health: 70, category: "truck" },
  { id: "VH-1049", plate: "VAN-330", type: "Camioneta", make: "Ford Transit", year: 2022, status: "Activo", driver: "María Torres", odo: 88900, fuel: "Diésel", loc: "Barranquilla — Vía 40", health: 84, category: "pickup" },
  { id: "VH-1050", plate: "EXC-512", type: "Excavadora", make: "Komatsu PC210", year: 2018, status: "En obra", driver: "Operador externo", odo: 14300, fuel: "Diésel", loc: "Mina La Esperanza", health: 63, category: "excavator" },
  { id: "VH-1051", plate: "GRU-201", type: "Grúa", make: "Grove GMK4100", year: 2023, status: "Activo", driver: "Jorge Salas", odo: 7600, fuel: "Diésel", loc: "Puerto de Cartagena", health: 90, category: "crane" },
];

export const VEH_STATUS_TONE = { "Activo": "green", "Mantenimiento": "amber", "En obra": "blue", "Inactivo": "gray" };

export const DRIVERS = [
  { id: "C-001", name: "Carlos Mendoza", license: "C3", phone: "+57 310 442 1180", status: "En ruta", trips: 142, rating: 4.8, vehicle: "WGT-481" },
  { id: "C-002", name: "Laura Ramírez", license: "C2", phone: "+57 311 905 3321", status: "Disponible", trips: 98, rating: 4.9, vehicle: "BNM-913" },
  { id: "C-003", name: "Pedro Gómez", license: "C3", phone: "+57 320 118 7745", status: "En ruta", trips: 211, rating: 4.6, vehicle: "QAZ-104" },
  { id: "C-004", name: "Andrés Ruiz", license: "A2", phone: "+57 315 660 2290", status: "Descanso", trips: 320, rating: 4.7, vehicle: "MOT-009" },
  { id: "C-005", name: "María Torres", license: "C2", phone: "+57 318 224 9087", status: "En ruta", trips: 76, rating: 5.0, vehicle: "VAN-330" },
  { id: "C-006", name: "Jorge Salas", license: "C3", phone: "+57 317 553 0012", status: "Disponible", trips: 54, rating: 4.5, vehicle: "GRU-201" },
];

export const TRIPS = [
  { id: "VJ-8841", origin: "Bogotá", dest: "Medellín", driver: "Carlos Mendoza", vehicle: "WGT-481", cargo: "Materiales construcción", weight: "18 t", status: "En tránsito", progress: 62, eta: "Hoy 17:40", dist: "415 km" },
  { id: "VJ-8842", origin: "Cali", dest: "Buenaventura", driver: "Pedro Gómez", vehicle: "QAZ-104", cargo: "Pasajeros", weight: "—", status: "En tránsito", progress: 30, eta: "Hoy 14:10", dist: "120 km" },
  { id: "VJ-8843", origin: "Medellín", dest: "Barranquilla", driver: "María Torres", vehicle: "VAN-330", cargo: "Paquetería", weight: "2.4 t", status: "En tránsito", progress: 85, eta: "Hoy 19:25", dist: "705 km" },
  { id: "VJ-8844", origin: "Bogotá", dest: "Tunja", driver: "Laura Ramírez", vehicle: "BNM-913", cargo: "Equipos", weight: "1.1 t", status: "Programado", progress: 0, eta: "Mañana 08:00", dist: "147 km" },
  { id: "VJ-8845", origin: "Cartagena", dest: "Sincelejo", driver: "Jorge Salas", vehicle: "GRU-201", cargo: "Maquinaria", weight: "22 t", status: "Completado", progress: 100, eta: "Entregado", dist: "195 km" },
  { id: "VJ-8846", origin: "Bogotá", dest: "Villavicencio", driver: "Sin asignar", vehicle: "—", cargo: "Carga seca", weight: "12 t", status: "Pendiente", progress: 0, eta: "Por asignar", dist: "126 km" },
];

export const TRIP_TONE = { "En tránsito": "blue", "Programado": "amber", "Completado": "green", "Pendiente": "gray" };

export const MAINTENANCE = [
  { id: "OS-3301", vehicle: "JKR-220", type: "Correctivo", desc: "Reparación sistema hidráulico", priority: "Alta", status: "En proceso", cost: 4850000, tech: "Taller central", date: "01 Jun 2026" },
  { id: "OS-3302", vehicle: "EXC-512", type: "Preventivo", desc: "Cambio de aceite y filtros 500h", priority: "Media", status: "Programado", cost: 1200000, tech: "Mecánica en sitio", date: "04 Jun 2026" },
  { id: "OS-3303", vehicle: "TRK-778", type: "Correctivo", desc: "Cambio de frenos delanteros", priority: "Alta", status: "Programado", cost: 2300000, tech: "Taller central", date: "03 Jun 2026" },
  { id: "OS-3304", vehicle: "QAZ-104", type: "Preventivo", desc: "Revisión 220.000 km", priority: "Baja", status: "Completado", cost: 980000, tech: "Taller norte", date: "28 May 2026" },
  { id: "OS-3305", vehicle: "WGT-481", type: "Preventivo", desc: "Alineación y balanceo", priority: "Baja", status: "Completado", cost: 320000, tech: "Taller central", date: "25 May 2026" },
];

export const MNT_PRIORITY_TONE = { "Alta": "red", "Media": "amber", "Baja": "gray" };
export const MNT_STATUS_TONE = { "En proceso": "blue", "Programado": "amber", "Completado": "green" };

export const DOCUMENTS = [
  { id: 1, vehicle: "WGT-481", doc: "SOAT", expires: "12 Jun 2026", daysLeft: 10, status: "Por vencer" },
  { id: 2, vehicle: "JKR-220", doc: "Técnico-mecánica", expires: "28 May 2026", daysLeft: -5, status: "Vencido" },
  { id: 3, vehicle: "BNM-913", doc: "Póliza todo riesgo", expires: "30 Sep 2026", daysLeft: 120, status: "Vigente" },
  { id: 4, vehicle: "QAZ-104", doc: "SOAT", expires: "08 Jun 2026", daysLeft: 6, status: "Por vencer" },
  { id: 5, vehicle: "MOT-009", doc: "Técnico-mecánica", expires: "15 Dic 2026", daysLeft: 196, status: "Vigente" },
  { id: 6, vehicle: "VAN-330", doc: "Tarjeta de operación", expires: "02 Jul 2026", daysLeft: 30, status: "Por vencer" },
  { id: 7, vehicle: "EXC-512", doc: "Certificado emisiones", expires: "20 May 2026", daysLeft: -13, status: "Vencido" },
  { id: 8, vehicle: "GRU-201", doc: "SOAT", expires: "10 Nov 2026", daysLeft: 161, status: "Vigente" },
];

export const DOC_TONE = { "Vigente": "green", "Por vencer": "amber", "Vencido": "red" };

export const INVOICES = [
  { id: "FAC-2026-0418", client: "Constructora Andina S.A.", amount: 28400000, status: "Pagada", date: "20 May 2026", due: "20 Jun 2026", trips: 6 },
  { id: "FAC-2026-0419", client: "Minera El Cerrejón", amount: 51200000, status: "Pendiente", date: "24 May 2026", due: "24 Jun 2026", trips: 11 },
  { id: "FAC-2026-0420", client: "Logística del Caribe", amount: 12800000, status: "Vencida", date: "02 May 2026", due: "02 Jun 2026", trips: 4 },
  { id: "FAC-2026-0421", client: "Agroindustrias del Valle", amount: 8900000, status: "Pendiente", date: "28 May 2026", due: "28 Jun 2026", trips: 3 },
  { id: "FAC-2026-0422", client: "Cementos Bolívar", amount: 33600000, status: "Pagada", date: "30 May 2026", due: "30 Jun 2026", trips: 8 },
];

export const INV_TONE = { "Pagada": "green", "Pendiente": "amber", "Vencida": "red" };

export const CONTACTS = [
  { id: 1, name: "Constructora Andina S.A.", type: "Cliente", contact: "Ricardo Peña", phone: "+57 1 745 9920", city: "Bogotá", balance: 0 },
  { id: 2, name: "Minera El Cerrejón", type: "Cliente", contact: "Sandra Loaiza", phone: "+57 5 350 1180", city: "Riohacha", balance: 51200000 },
  { id: 3, name: "Terpel — Estación Norte", type: "Proveedor", contact: "Luis Fonseca", phone: "+57 1 220 4410", city: "Bogotá", balance: -3400000 },
  { id: 4, name: "Repuestos Diésel Ltda.", type: "Proveedor", contact: "Marta Gil", phone: "+57 4 511 7788", city: "Medellín", balance: -1850000 },
  { id: 5, name: "Logística del Caribe", type: "Cliente", contact: "Omar Castro", phone: "+57 5 660 3321", city: "Barranquilla", balance: 12800000 },
  { id: 6, name: "Seguros Bolívar", type: "Proveedor", contact: "Diana Rojas", phone: "+57 1 312 0099", city: "Bogotá", balance: 0 },
];

export const USERS = [
  { id: 1, name: "Andrea Villalba", email: "andrea@cmocs.co", role: "Administrador", status: "Activo", lastSeen: "Hace 5 min" },
  { id: 2, name: "Felipe Cárdenas", email: "felipe@cmocs.co", role: "Despachador", status: "Activo", lastSeen: "Hace 1 h" },
  { id: 3, name: "Natalia Suárez", email: "natalia@cmocs.co", role: "Contador", status: "Activo", lastSeen: "Ayer" },
  { id: 4, name: "Hernán Díaz", email: "hernan@cmocs.co", role: "Jefe de taller", status: "Activo", lastSeen: "Hace 3 h" },
  { id: 5, name: "Carolina Mejía", email: "carolina@cmocs.co", role: "Despachador", status: "Inactivo", lastSeen: "Hace 12 días" },
];

export const ROLES = [
  { name: "Administrador", users: 1, desc: "Acceso total al sistema y configuración", perms: 24, tone: "amber" },
  { name: "Despachador", users: 2, desc: "Gestión de viajes, rutas y asignación de flota", perms: 12, tone: "blue" },
  { name: "Contador", users: 1, desc: "Facturación, conciliaciones y reportes financieros", perms: 9, tone: "green" },
  { name: "Jefe de taller", users: 1, desc: "Órdenes de servicio, mantenimiento e inventario", perms: 11, tone: "violet" },
  { name: "Conductor", users: 6, desc: "App móvil: viajes asignados y documentos", perms: 4, tone: "gray" },
];

export const ALERTS = [
  { icon: "alert-triangle", tone: "red", title: "Técnico-mecánica vencida", desc: "Grúa JKR-220 — venció hace 5 días", time: "Hoy" },
  { icon: "wrench", tone: "blue", title: "Mantenimiento en proceso", desc: "OS-3301 · Sistema hidráulico Liebherr", time: "Hoy" },
  { icon: "clock", tone: "amber", title: "SOAT por vencer", desc: "Camión WGT-481 vence en 10 días", time: "Ayer" },
  { icon: "fuel", tone: "amber", title: "Consumo elevado", desc: "Bus QAZ-104 +18% sobre promedio", time: "Ayer" },
];

export const FUEL_LOG = [
  { id: 1, vehicle: "WGT-481", date: "01 Jun", liters: 320, cost: 2880000, odo: 184320, station: "Terpel Norte", eff: 2.4 },
  { id: 2, vehicle: "QAZ-104", date: "31 May", liters: 280, cost: 2520000, odo: 220140, station: "Primax Sur", eff: 1.9 },
  { id: 3, vehicle: "VAN-330", date: "31 May", liters: 90, cost: 810000, odo: 88900, station: "Terpel Caribe", eff: 9.2 },
  { id: 4, vehicle: "BNM-913", date: "30 May", liters: 75, cost: 675000, odo: 62840, station: "Esso Centro", eff: 11.4 },
  { id: 5, vehicle: "TRK-778", date: "29 May", liters: 410, cost: 3690000, odo: 156700, station: "Terpel Norte", eff: 2.1 },
];

export const INVENTORY = [
  { id: "RP-501", name: "Filtro de aceite Volvo FH", stock: 24, min: 10, location: "Bodega A-2", price: 85000, status: "OK" },
  { id: "RP-502", name: "Pastillas freno Kenworth", stock: 6, min: 8, location: "Bodega A-1", price: 320000, status: "Bajo" },
  { id: "RP-503", name: "Aceite hidráulico 20L", stock: 18, min: 6, location: "Bodega B-4", price: 540000, status: "OK" },
  { id: "RP-504", name: "Llanta 295/80 R22.5", stock: 3, min: 12, location: "Patio llantas", price: 1850000, status: "Crítico" },
  { id: "RP-505", name: "Batería 150A", stock: 11, min: 5, location: "Bodega A-3", price: 680000, status: "OK" },
];

export const INV_STOCK_TONE = { "OK": "green", "Bajo": "amber", "Crítico": "red" };

export const PAYROLL = [
  { id: 1, driver: "Carlos Mendoza", trips: 24, km: 9840, base: 1800000, commission: 2450000, deductions: 320000, total: 3930000 },
  { id: 2, driver: "Pedro Gómez", trips: 31, km: 4200, base: 1800000, commission: 2980000, deductions: 410000, total: 4370000 },
  { id: 3, driver: "María Torres", trips: 18, km: 12600, base: 1600000, commission: 1890000, deductions: 210000, total: 3280000 },
  { id: 4, driver: "Laura Ramírez", trips: 21, km: 3100, base: 1700000, commission: 1450000, deductions: 180000, total: 2970000 },
];

export function fmtCOP(n) {
  return "$" + n.toLocaleString("es-CO");
}
export function fmtNum(n) {
  return n.toLocaleString("es-CO");
}

