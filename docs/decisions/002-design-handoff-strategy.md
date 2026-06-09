# ADR 002 — Estrategia de handoff Claude Design

**Estado:** Aceptado  
**Fecha:** 2026-06-08

## Contexto

El diseño llegó como bundle HTML/JSX (prototipo Babel in-browser). Debemos producciónizar en React + Vite sin perder fidelidad visual.

## Decisión

1. Conservar `.design-bundle/` como referencia inmutable del handoff.
2. Script `scripts/port-design.mjs` transforma JSX del bundle → ES modules en `src/`.
3. Reemplazar `window.lucide` por `lucide-react`.
4. Mantener `styles.css` como `src/styles/design-system.css` (tokens + componentes).
5. No replicar `bundle.jsx` — Vite resuelve imports.

## Consecuencias

- Cambios en diseño requieren re-port o edición manual en `src/`.
- Fidelidad pixel-level depende de conservar clases CSS del prototipo.
- Datos siguen siendo mock hasta integración API.
