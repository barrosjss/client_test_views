# Playbook — Flujo para agentes

## 1. Orientación (2 min)

- Lee `AGENTS.md` y confirma el **módulo** o **capa** (`app`, `platform`, `features`, `shared`, `modules/<id>`).
- Si el cambio viene del diseño Claude, lee `docs/design-handoff/README.md` y el chat en `.design-bundle/cmocs/chats/`.

## 2. Alcance mínimo

- Un PR lógico = un módulo o una capa shared.
- No refactorices módulos adyacentes “de paso”.
- Reutiliza `PageHead`, `Drawer`, `Stat`, `Badge` antes de crear componentes nuevos.

## 3. Implementación

```text
1. Identificar archivo en src/modules/<id>/
2. Verificar mock data en src/shared/data/
3. Aplicar cambio visual siguiendo tokens CSS existentes
4. Si añades módulo → docs/playbook/adding-a-module.md
5. npm run build
```

## 4. Sincronizar desde diseño

Si el usuario actualizó el handoff en `.design-bundle/`:

```bash
npm run port:design
npm run build
```

Revisa el diff en `src/` — el script sobrescribe archivos portados.

## 5. Checklist antes de entregar

- [ ] `npm run build` sin errores
- [ ] Módulo registrado en `module-registry.jsx` (si es nuevo)
- [ ] Sin imports circulares entre módulos
- [ ] Textos en español
- [ ] Responsive: clases `grid-4`, `desktop-only`, `mobile-only` respetadas

## 6. Cuándo preguntar al usuario

- Cambio de alcance (nuevo backend, auth real, permisos por rol)
- Ambigüedad visual no resuelta en el HTML del diseño
- Nuevo módulo no presente en el prototipo
