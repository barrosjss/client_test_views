# ADR 001 — Arquitectura modular por dominio

**Estado:** Aceptado  
**Fecha:** 2026-06-08

## Contexto

CMOCS agrupa ~20 módulos de negocio (flota, OT, facturación, nómina, etc.). Agentes de IA deben poder trabajar en un módulo sin cargar todo el codebase.

## Decisión

- Cada módulo de negocio vive en `src/modules/<id>/` con un componente raíz exportado.
- Registro central en `src/app/module-registry.jsx` — única fuente de IDs de módulo.
- Shell (`platform/shell`) separado de módulos.
- Shared UI y datos mock en `src/shared/`.

## Consecuencias

- Los módulos no se importan entre sí; comparten `shared/`.
- Navegación sidebar y registry deben mantenerse sincronizados manualmente.
- Code-splitting futuro: lazy load por entrada del registry.
