/**
 * Registro central de módulos de la plataforma CMOCS.
 * Carga diferida + error boundary para que un módulo roto no tumbe la app.
 */
import { lazy, Suspense } from 'react';
import { ModuleErrorBoundary } from '../shared/ui/ModuleErrorBoundary.jsx';
import { EmptyState } from '../shared/ui/EmptyState.jsx';

function lazyModule(loader, label) {
  return lazy(() =>
    loader().catch((err) => {
      console.error(`[CMOCS] Falló import de "${label}":`, err);
      return {
        default: function ModuleLoadFailed() {
          return (
            <EmptyState
              variant="error"
              title={`${label} no disponible`}
              description="Hubo un problema al cargar este módulo. Usa el menú para ir a otra sección."
            />
          );
        },
      };
    }),
  );
}

export const MODULE_REGISTRY = {
  dashboard: {
    id: 'dashboard',
    label: 'Inicio',
    component: lazyModule(() => import('../modules/dashboard/Dashboard.jsx').then((m) => ({ default: m.Dashboard })), 'Inicio'),
  },
  vehicles: {
    id: 'vehicles',
    label: 'Vehículos',
    component: lazyModule(() => import('../modules/vehicles/Vehicles.jsx').then((m) => ({ default: m.Vehicles })), 'Vehículos'),
  },
  workorders: {
    id: 'workorders',
    label: 'Órdenes de trabajo',
    component: lazyModule(() => import('../modules/workorders/WorkOrders.jsx').then((m) => ({ default: m.WorkOrders })), 'Órdenes de trabajo'),
  },
  fuec: {
    id: 'fuec',
    label: 'FUEC',
    component: lazyModule(() => import('../modules/fuec/Fuec.jsx').then((m) => ({ default: m.Fuec })), 'FUEC'),
  },
  maintenance: {
    id: 'maintenance',
    label: 'Mantenimientos',
    component: lazyModule(() => import('../modules/maintenance/Maintenance.jsx').then((m) => ({ default: m.Maintenance })), 'Mantenimientos'),
  },
  tracking: {
    id: 'tracking',
    label: 'Rastreo satelital',
    component: lazyModule(() => import('../modules/tracking/Tracking.jsx').then((m) => ({ default: m.Tracking })), 'Rastreo satelital'),
  },
  contacts: {
    id: 'contacts',
    label: 'Contactos',
    component: lazyModule(() => import('../modules/contacts/Contacts.jsx').then((m) => ({ default: m.Contacts })), 'Contactos'),
  },
  drivers: {
    id: 'drivers',
    label: 'Conductores',
    component: lazyModule(() => import('../modules/personnel/index.jsx').then((m) => ({ default: m.Drivers })), 'Conductores'),
  },
  workshops: {
    id: 'workshops',
    label: 'Talleres',
    component: lazyModule(() => import('../modules/personnel/index.jsx').then((m) => ({ default: m.Workshops })), 'Talleres'),
  },
  conciliations: {
    id: 'conciliations',
    label: 'Conciliaciones',
    component: lazyModule(() => import('../modules/personnel/index.jsx').then((m) => ({ default: m.Conciliations })), 'Conciliaciones'),
  },
  billing: {
    id: 'billing',
    label: 'Facturas',
    component: lazyModule(() => import('../modules/billing/Billing.jsx').then((m) => ({ default: m.Billing })), 'Facturas'),
  },
  receivables: {
    id: 'receivables',
    label: 'Cuentas por cobrar',
    component: lazyModule(() => import('../modules/personnel/index.jsx').then((m) => ({ default: m.Receivables })), 'Cuentas por cobrar'),
  },
  siigo: {
    id: 'siigo',
    label: 'Integración SIIGO',
    component: lazyModule(() => import('../modules/personnel/index.jsx').then((m) => ({ default: m.Siigo })), 'Integración SIIGO'),
  },
  payroll: {
    id: 'payroll',
    label: 'Nómina',
    component: lazyModule(() => import('../modules/payroll/Payroll.jsx').then((m) => ({ default: m.Payroll })), 'Nómina'),
  },
  personnel: {
    id: 'personnel',
    label: 'Hoja de vida',
    component: lazyModule(() => import('../modules/personnel/index.jsx').then((m) => ({ default: m.Personnel })), 'Hoja de vida'),
  },
  perdiems: {
    id: 'perdiems',
    label: 'Viáticos',
    component: lazyModule(() => import('../modules/personnel/index.jsx').then((m) => ({ default: m.Perdiems })), 'Viáticos'),
  },
  documents: {
    id: 'documents',
    label: 'Documentos',
    component: lazyModule(() => import('../modules/documents/Documents.jsx').then((m) => ({ default: m.Documents })), 'Documentos'),
  },
  reports: {
    id: 'reports',
    label: 'Reportes',
    component: lazyModule(() => import('../modules/reports/Reports.jsx').then((m) => ({ default: m.Reports })), 'Reportes'),
  },
  users: {
    id: 'users',
    label: 'Usuarios y roles',
    component: lazyModule(() => import('../modules/users/Users.jsx').then((m) => ({ default: m.Users })), 'Usuarios y roles'),
  },
};

export function renderModule(id, props = {}) {
  const entry = MODULE_REGISTRY[id] ?? MODULE_REGISTRY.dashboard;
  const Component = entry.component;

  return (
    <ModuleErrorBoundary moduleLabel={entry.label} resetKey={id}>
      <Suspense
        fallback={(
          <EmptyState
            variant="loading"
            title={`Cargando ${entry.label}…`}
            description="Preparando la vista. Un momento."
            compact
          />
        )}
      >
        <Component {...props} />
      </Suspense>
    </ModuleErrorBoundary>
  );
}
