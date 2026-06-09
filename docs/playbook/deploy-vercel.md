# Despliegue en Vercel (preview para stakeholders)

Guía para publicar el prototipo CMOCS y compartir avances con el equipo.

## Requisitos

- Repositorio en GitHub: `client_test_views` (espejo de `cmocs-v2-frontend` para pruebas)
- Cuenta Vercel personal (o equipo/org)
- Node.js 20+ (Vercel lo usa por defecto)

## Opción A — GitHub + Vercel (recomendada)

Cada push a `main` despliega automáticamente.

1. **Subir el código a GitHub** (si aún no está):
   ```bash
   git add .
   git commit -m "feat: prototipo CMOCS v2 con PWA y chrome mobile"
   git push -u origin main
   ```

2. **Importar en Vercel**
   - [vercel.com/new](https://vercel.com/new) → Import Git Repository
   - Seleccionar `client_test_views`
   - Vercel detecta **Vite** automáticamente (`vercel.json` ya define build/output)

3. **Configuración del proyecto** (verificar, no suele requerir cambios):

   | Campo | Valor |
   |-------|-------|
   | Framework Preset | Vite |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
   | Install Command | `npm install` |
   | Node.js Version | 20.x |

4. **Deploy** → Vercel asigna una URL tipo `client-test-views.vercel.app`

5. **Compartir con stakeholders**
   - URL de producción (rama `main`)
   - Cada PR genera una **Preview URL** única para revisar cambios antes de merge

## Opción B — CLI (deploy manual)

```bash
npm i -g vercel
vercel login
vercel          # preview
vercel --prod   # producción
```

## Qué verán los stakeholders

1. **Landing** pública en `/`
2. **Iniciar sesión** → cualquier credencial (prototipo sin backend)
3. **Dashboard** con los 19 módulos
4. En móvil (≤920px): bottom nav, sheets de menú/alertas/perfil
5. PWA instalable desde el navegador (Chrome/Safari)

## Protección opcional

En el dashboard de Vercel → Project → Settings → Deployment Protection:

- **Vercel Authentication** — solo usuarios del equipo ven el preview
- **Password Protection** (plan Pro) — contraseña para stakeholders externos

## Variables de entorno

No se requieren por ahora (datos mock, sin API). Cuando exista backend, añadir en Vercel → Settings → Environment Variables.

## Troubleshooting

| Problema | Solución |
|----------|----------|
| Build falla en Vercel | Reproducir local: `npm run build` |
| Pantalla en blanco | Revisar logs; confirmar `outputDirectory: dist` |
| PWA no instala | Requiere HTTPS (Vercel lo provee); limpiar cache del SW |
| Cambios no aparecen | Esperar redeploy; en móvil, cerrar pestaña PWA y reabrir |

## Archivos de despliegue en el repo

- `vercel.json` — build, rewrites SPA, headers PWA
- `.vercelignore` — excluye bundles de diseño (más rápido el upload)
- `package.json` → `engines.node >= 20`
