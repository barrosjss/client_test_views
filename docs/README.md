# Documentación CMOCS v2

Plataforma SaaS de gestión de flotas y maquinaria. Frontend React + Vite.

## Índice

| Documento | Para qué sirve |
|-----------|----------------|
| [architecture.md](./architecture.md) | Estructura de carpetas y responsabilidades |
| [playbook/agent-workflow.md](./playbook/agent-workflow.md) | Flujo de trabajo para agentes |
| [playbook/adding-a-module.md](./playbook/adding-a-module.md) | Cómo añadir un módulo nuevo |
| [playbook/deploy-vercel.md](./playbook/deploy-vercel.md) | Despliegue en Vercel para stakeholders |
| [decisions/001-modular-architecture.md](./decisions/001-modular-architecture.md) | ADR: arquitectura por módulos |
| [decisions/002-design-handoff-strategy.md](./decisions/002-design-handoff-strategy.md) | ADR: portación desde Claude Design |
| [design-handoff/README.md](./design-handoff/README.md) | Contexto del diseño original |

## Mapa de `src/`

```
src/
├── app/              # App root, module-registry
├── platform/shell/   # Sidebar, topbar, layout
├── features/         # Landing, auth, docs (fuera del shell)
├── modules/          # Un directorio por módulo de negocio
├── shared/
│   ├── ui/           # Icon, primitives, module-common
│   └── data/         # Mock data (core + extended)
└── styles/           # design-system.css + responsive.css
```

## Módulos registrados

Ver `src/app/module-registry.jsx` para la lista canónica de IDs (`dashboard`, `vehicles`, `workorders`, …).

## Antes de implementar

1. Confirma el **módulo** afectado (no disperses cambios entre carpetas).
2. Lee el componente existente y el mock data relacionado.
3. Mantén el design system — no introduzcas librerías UI nuevas sin ADR.
4. Ejecuta `npm run build` al terminar.
