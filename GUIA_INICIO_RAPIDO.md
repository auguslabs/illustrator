# 🚀 Guía de Inicio Rápido - Usar esta Plantilla

## ✅ Sí, puedes usar esto como plantilla base

Simplemente copia la carpeta `Aretal` y renómbrala con el nombre de tu nuevo proyecto.

---

## 📋 Pasos para Iniciar un Nuevo Proyecto

### 1. **Copiar la Plantilla**
```bash
# Copia la carpeta Aretal a tu nueva ubicación
# Ejemplo:
cp -r Aretal mi-nuevo-proyecto
# O en Windows:
xcopy Aretal mi-nuevo-proyecto /E /I
```

### 2. **Actualizar Información del Proyecto**

#### 📝 Editar `package.json`
```json
{
  "name": "mi-nuevo-proyecto",  // ← Cambia esto
  "version": "1.0.0",            // ← Actualiza la versión
  "description": "Descripción de tu proyecto"  // ← Actualiza esto
}
```

#### 🎨 Personalizar Branding
- **Favicon**: Reemplaza `public/favicon.svg` con el de tu proyecto
- **Título**: Edita `src/layouts/BaseLayout.astro` - cambia "Mi Aplicación"
- **Header/Footer**: Edita `src/components/layout/Header.tsx` y `Footer.tsx`

### 3. **Instalar Dependencias**
```bash
cd mi-nuevo-proyecto
npm install
```

### 4. **Iniciar Desarrollo**
```bash
npm run dev
```

Abre `http://localhost:4321` en tu navegador.

---

## 🔧 Configuraciones Iniciales Recomendadas

### 1. **Variables de Entorno** (si las necesitas)
Crea un archivo `.env` en la raíz:
```env
PUBLIC_API_URL=https://api.tu-dominio.com
```

### 2. **Personalizar Tailwind CSS**
Edita `tailwind.config.mjs`:
- Cambia los colores del tema (`primary`, etc.)
- Agrega fuentes personalizadas
- Configura breakpoints si es necesario

### 3. **Configurar Git** (si usas control de versiones)
```bash
git init
git add .
git commit -m "Initial commit from template"
```

### 4. **Limpiar Ejemplos** (opcional)
- Elimina o modifica `src/pages/index.astro` y `about.astro`
- Limpia `src/data/mock/` con datos de ejemplo
- Personaliza componentes en `src/components/ui/`

---

## 📦 Qué Instalar al Inicio

### ✅ Ya está incluido (NO necesitas instalar):
- ✅ Astro
- ✅ React y React DOM
- ✅ Tailwind CSS
- ✅ TypeScript
- ✅ Integraciones de Astro (@astrojs/react, @astrojs/tailwind)

### 🔌 Dependencias Adicionales (instalar según necesidad):

#### Para APIs y HTTP:
```bash
npm install axios
# o
npm install fetch
```

#### Para Manejo de Estado:
```bash
npm install zustand
# o
npm install @tanstack/react-query
```

#### Para Formularios:
```bash
npm install react-hook-form
npm install zod  # Para validación
```

#### Para Routing (si necesitas SPA):
```bash
npm install @tanstack/react-router
# o
npm install react-router-dom
```

#### Para Utilidades:
```bash
npm install date-fns  # Manejo de fechas
npm install clsx      # Clases condicionales
```

#### Para SSR (si necesitas):
```bash
npm install @astrojs/node
# Luego edita astro.config.mjs para habilitar SSR
```

---

## 🎯 Recomendaciones Importantes

### 1. **Estructura de Carpetas**
✅ **MANTÉN** la estructura por capas:
- `src/data/` - Modelos y datos
- `src/services/` - Lógica de negocio
- `src/components/` - Componentes UI
- `src/pages/` - Páginas de Astro

### 2. **Path Aliases**
✅ **YA están configurados** en `tsconfig.json`:
```typescript
import { Button } from '@/components/ui';
import { getUser } from '@/services/api';
import { formatDate } from '@/utils';
```

### 3. **Componentes React en Astro**
✅ Usa `client:load` para componentes interactivos:
```astro
<Button client:load>Click me</Button>
```

### 4. **TypeScript**
✅ **Siempre tipa** tus datos y funciones:
```typescript
// src/data/models/index.ts
export interface User {
  id: string;
  name: string;
}
```

### 5. **Estilos**
✅ Usa Tailwind CSS para estilos:
- Clases utility-first
- Componentes personalizados en `tailwind.config.mjs`
- Estilos globales en `src/styles/global.css`

---

## 🗑️ Qué Eliminar al Iniciar

### Archivos de Ejemplo (opcional):
- `src/pages/about.astro` - Si no lo necesitas
- `src/data/mock/index.ts` - Datos de ejemplo
- Contenido de ejemplo en `src/pages/index.astro`

### NO elimines:
- ❌ Estructura de carpetas
- ❌ Componentes base (Button, Card, Input)
- ❌ Configuraciones (tsconfig.json, tailwind.config.mjs)
- ❌ Layouts base

---

## 📚 Comandos Útiles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Construir para producción
npm run preview      # Previsualizar build de producción

# Limpieza (si necesitas)
rm -rf node_modules  # Eliminar dependencias
rm -rf dist          # Eliminar build
```

---

## 🚨 Problemas Comunes

### Error: "Cannot find module"
```bash
# Solución: Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Error: "Port already in use"
- Astro automáticamente usa el siguiente puerto disponible
- O cambia el puerto en `astro.config.mjs`

### TypeScript errors
- Verifica que `tsconfig.json` tenga los path aliases correctos
- Reinicia el servidor de TypeScript en tu IDE

---

## ✨ Próximos Pasos

1. ✅ Personaliza el branding (título, favicon, colores)
2. ✅ Crea tus primeras páginas en `src/pages/`
3. ✅ Define tus modelos de datos en `src/data/models/`
4. ✅ Crea tus servicios en `src/services/`
5. ✅ Construye tus componentes en `src/components/`

---

## 📖 Recursos

- [Documentación de Astro](https://docs.astro.build)
- [Documentación de React](https://react.dev)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Documentación de TypeScript](https://www.typescriptlang.org/docs)

---

**¡Listo para construir! 🎉**

