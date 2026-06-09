# Añadir un módulo

## Pasos

### 1. Crear carpeta

```
src/modules/mi-modulo/
├── MiModulo.jsx      # componente principal exportado
└── README.md         # una línea: propósito del módulo
```

### 2. Implementar componente

```jsx
import React from 'react';
import { PageHead, /* ... */ } from '../../shared/ui/module-common.jsx';
import { Btn, Card } from '../../shared/ui/primitives.jsx';

export function MiModulo() {
  return (
    <div>
      <PageHead title="Mi módulo" subtitle="Descripción" />
      {/* ... */}
    </div>
  );
}
```

### 3. Registrar en `src/app/module-registry.jsx`

```jsx
import { MiModulo } from '../modules/mi-modulo/MiModulo.jsx';

export const MODULE_REGISTRY = {
  // ...
  'mi-modulo': { id: 'mi-modulo', label: 'Mi módulo', component: MiModulo },
};
```

### 4. Añadir al sidebar — `src/platform/shell/AppShell.jsx`

Agregar entrada en el array `NAV` del grupo correspondiente:

```jsx
{ id: 'mi-modulo', label: 'Mi módulo', icon: 'box' },
```

`NAV_TITLES` se construye automáticamente desde `NAV`.

### 5. Mock data (opcional)

Añadir en `src/shared/data/extended.js` y exportar vía `index.js`.

### 6. Documentar decisión (si es módulo nuevo de negocio)

Crear `docs/decisions/00N-mi-modulo.md` con contexto y alcance MVP.
