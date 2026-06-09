# CMOCS — Guía para agentes de IA

**Lee esto antes de tocar código.** Este repositorio está optimizado para que agentes trabajen por módulos sin perder contexto.

## Punto de entrada

1. `docs/README.md` — mapa del proyecto y reglas de oro
2. `docs/architecture.md` — capas, carpetas y flujo de navegación
3. `docs/playbook/agent-workflow.md` — cómo implementar cambios de forma segura
4. `docs/design-handoff/README.md` — intención del diseño Claude Design (CMOCS.html)

## Reglas rápidas

- **Un módulo = una carpeta** en `src/modules/<id>/`. Regístralo en `src/app/module-registry.jsx`.
- **No edites** `.design-bundle/` ni `.design-bundle-pwa/` — son referencia del handoff. Cambios van en `src/`.
- Tras editar fuentes del prototipo en `.design-bundle`, ejecuta `npm run port:design`.
- **PWA / mobile**: chrome en `src/platform/shell/AppShell.jsx`, estilos en `src/styles/pwa-mobile.css`, manifest vía `vite-plugin-pwa` en `vite.config.js`.
- **Design system**: tokens y componentes en `src/styles/design-system.css` y `src/shared/ui/`.
- **Datos mock**: `src/shared/data/` (reemplazar por API cuando exista backend).
- **Idioma UI**: español. **Paleta**: navy `#0f1720` + ámbar `#f59e0b`.

## Comandos

```bash
npm run dev          # desarrollo local
npm run build        # verificar compilación
npm run port:design  # re-sincronizar desde .design-bundle
```

Despliegue: ver `docs/playbook/deploy-vercel.md` (Vercel + GitHub).

## Alcance actual (prototipo)

Landing → Auth → Dashboard con 19 módulos navegables. PWA instalable; en ≤920px usa bottom nav y sheets. Datos simulados, sin backend.
