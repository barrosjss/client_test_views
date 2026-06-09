# Design handoff — CMOCS

### Bundle base (escritorio + responsive)

Fuente: [Claude Design bundle](https://api.anthropic.com/v1/design/h/YBhieYL-hkjhXgB4t5BjPg)  
Archivo principal: `CMOCS.html` (`.design-bundle/cmocs/project/`)

### Bundle PWA / mobile

Fuente: [Claude Design bundle PWA](https://api.anthropic.com/v1/design/h/oDVXgUTdFyS1wGbNTjJh-A)  
Archivo principal: `CMOCS.html` (`.design-bundle-pwa/cmocs/project/`)

Incluye: `manifest.json`, iconos PWA, chrome mobile (app bar, bottom nav, bottom sheets), estilos safe-area y landing mobile.

### Bundle tracking / mobile refinado

Fuente: [Claude Design bundle tracking](https://api.anthropic.com/v1/design/h/fCoF5R60ZH1kiga6Dg5_Jg)  
Archivo principal: `CMOCS.html` (`.design-bundle-tracking/cmocs/project/`)

Incluye: rastreo GPS, menú hamburguesa en landing, auth responsive y ajustes mobile posteriores al bundle PWA.

## Intención del producto

**CMOCS** — Plataforma SaaS para empresas que gestionan flotas, maquinaria y transporte.

### Entrega del prototipo

- Landing → Auth (login/registro/recuperar) → Dashboard con módulos
- Web responsive (escritorio + móvil) e instalable como PWA
- Idioma: español
- Audiencia: gerente de flota, despachador, contador, dueño

### Dirección visual

- SaaS moderno, mucho espacio en blanco
- Navy profundo + acento ámbar/naranja
- Tipografía: Space Grotesk (títulos), Manrope (UI), JetBrains Mono (datos)
- Iconos: Lucide (línea)

### Módulos implementados en el prototipo

| Grupo | Módulos |
|-------|---------|
| Operación | Dashboard, Vehículos, OT, FUEC, Mantenimiento, Rastreo |
| Contactos | Contactos, Conductores, Talleres |
| Facturación | Conciliaciones, Facturas, CxC, SIIGO |
| Personal | Nómina, Hoja de vida, Viáticos |
| Sistema | Documentos, Reportes, Usuarios y roles |

### Transcripts

Leer `.design-bundle/cmocs/chats/chat1.md` para iteraciones y decisiones del usuario con el asistente de diseño.

## Implementación en este repo

Ver `docs/decisions/002-design-handoff-strategy.md` y `docs/decisions/003-pwa.md`. El código productivo está en `src/`, no en `.design-bundle*/`.
