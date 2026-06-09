# CMOCS v2 — Frontend

Plataforma de gestión de flotas y maquinaria. React 19 + Vite.

## Inicio rápido

```bash
npm install
npm run dev
```

Abre `http://localhost:5173` — Landing → Iniciar sesión → Dashboard con todos los módulos.

## Despliegue (Vercel)

El proyecto está listo para Vercel. Ver **[docs/playbook/deploy-vercel.md](./docs/playbook/deploy-vercel.md)**.

Resumen rápido:

1. Push a GitHub (`client_test_views`)
2. Importar repo en [vercel.com/new](https://vercel.com/new) (cuenta personal)
3. Deploy automático — compartir la URL para pruebas y presentación de vistas

> Espejo de `cmocs-v2-frontend` para despliegue de prueba en Vercel personal.

Cada PR genera una preview URL para revisar avances antes de merge.

## Para agentes de IA

Lee **[AGENTS.md](./AGENTS.md)** y la carpeta **[docs/](./docs/)** antes de implementar.

## Estructura

- `src/modules/` — módulos de negocio (vehículos, OT, facturación, …)
- `src/platform/shell/` — sidebar y layout
- `src/shared/` — UI compartida y datos mock
- `docs/` — arquitectura, decisiones (ADR), playbook
- `.design-bundle/` — handoff Claude Design (referencia, no editar)

## Design

Basado en el prototipo **CMOCS.html** (navy + ámbar, Space Grotesk + Manrope). Ver `docs/design-handoff/`.

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run port:design` | Re-portar desde `.design-bundle/` |
