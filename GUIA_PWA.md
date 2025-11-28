# 📱 Guía Completa: Convertir esta Plantilla en PWA

## ✅ Sí, esta plantilla es perfecta para PWA

Esta plantilla base es ideal para construir una PWA porque:
- ✅ Ya tiene Astro configurado (excelente para PWA)
- ✅ Estructura organizada por capas
- ✅ TypeScript para mejor mantenimiento
- ✅ Tailwind CSS para UI responsiva
- ✅ Fácil de extender con funcionalidades PWA

---

## 🎯 ¿Qué es una PWA?

Una **Progressive Web App (PWA)** es una aplicación web que:
- Se puede instalar en dispositivos (como una app nativa)
- Funciona offline
- Se actualiza automáticamente
- Tiene íconos en la pantalla de inicio
- Puede recibir notificaciones push (opcional)

---

## 📋 Requisitos para PWA

Para que una web sea considerada PWA necesita:

1. ✅ **Manifest.json** - Define la app (nombre, íconos, colores)
2. ✅ **Service Worker** - Maneja el cache y funcionalidad offline
3. ✅ **HTTPS** - Requerido en producción (localhost funciona en desarrollo)
4. ✅ **Íconos** - Múltiples tamaños para diferentes dispositivos
5. ✅ **Meta tags** - Para mejor integración móvil

---

## 🚀 Implementación Paso a Paso

### PASO 1: Instalar Dependencias PWA

```bash
npm install vite-plugin-pwa -D
```

Esta dependencia maneja automáticamente:
- Generación del manifest
- Service Worker
- Cache de assets
- Actualizaciones automáticas

---

### PASO 2: Configurar Astro para PWA

Edita `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  output: 'static',
  vite: {
    plugins: [
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'robots.txt'],
        manifest: {
          name: 'Mi Aplicación PWA',
          short_name: 'MiApp',
          description: 'Descripción de mi aplicación PWA',
          theme_color: '#3b82f6',
          background_color: '#ffffff',
          display: 'standalone',
          orientation: 'portrait',
          scope: '/',
          start_url: '/',
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,svg,png,jpg,jpeg,gif,webp,woff,woff2}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/api\./i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'api-cache',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24, // 24 horas
                },
              },
            },
          ],
        },
        devOptions: {
          enabled: true, // Habilita PWA en desarrollo
          type: 'module',
        },
      }),
    ],
  },
});
```

**Explicación de la configuración:**
- `registerType: 'autoUpdate'` - Actualiza automáticamente el service worker
- `manifest` - Define cómo se ve la app cuando se instala
- `workbox` - Configura el cache y estrategias offline
- `devOptions.enabled: true` - Permite probar PWA en desarrollo

---

### PASO 3: Crear Íconos PWA

Necesitas crear íconos en diferentes tamaños. Opciones:

#### Opción A: Generar automáticamente (Recomendado)

Usa herramientas online:
- https://realfavicongenerator.net/
- https://www.pwabuilder.com/imageGenerator
- https://www.appicon.co/

Sube tu logo y descarga los íconos en tamaños:
- 192x192 px
- 512x512 px

#### Opción B: Crear manualmente

Crea estos archivos en `public/`:
- `pwa-192x192.png` (192x192 píxeles)
- `pwa-512x512.png` (512x512 píxeles)

**Recomendaciones:**
- Usa formato PNG con transparencia
- El ícono debe ser cuadrado
- Deja espacio alrededor (padding) para que no se corte en dispositivos
- Usa colores contrastantes

---

### PASO 4: Actualizar BaseLayout.astro

Agrega meta tags PWA en `src/layouts/BaseLayout.astro`:

```astro
---
interface Props {
  title?: string;
}

import '../styles/global.css';
import { Header, Footer } from '@/components/layout';

const { title = 'Mi Aplicación' } = Astro.props;
---

<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content="Plantilla base Astro + React + Tailwind CSS" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
    
    <!-- PWA Meta Tags -->
    <meta name="theme-color" content="#3b82f6" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="Mi App" />
    
    <!-- Apple Touch Icons -->
    <link rel="apple-touch-icon" href="/pwa-192x192.png" />
    
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="manifest" href="/manifest.webmanifest" />
    <meta name="generator" content={Astro.generator} />
    <title>{title}</title>
  </head>
  <body>
    <Header client:load />
    <main>
      <slot />
    </main>
    <Footer client:load />
  </body>
</html>
```

---

### PASO 5: Crear Componente de Instalación (Opcional pero Recomendado)

Crea `src/components/pwa/InstallPrompt.tsx`:

```tsx
import React, { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setShowPrompt(false);
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Guardar en localStorage para no mostrar de nuevo por un tiempo
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">
            Instalar Aplicación
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Instala nuestra app para una mejor experiencia y acceso rápido.
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleInstall}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
            >
              Instalar
            </button>
            <button
              onClick={handleDismiss}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Ahora no
            </button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Cerrar"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
```

Agrega el componente en `BaseLayout.astro`:

```astro
---
import { InstallPrompt } from '@/components/pwa/InstallPrompt';
---

<body>
  <Header client:load />
  <main>
    <slot />
  </main>
  <Footer client:load />
  <InstallPrompt client:load />
</body>
```

---

### PASO 6: Crear Hook para Detectar Instalación

Crea `src/hooks/usePWAInstall.ts`:

```typescript
import { useState, useEffect } from 'react';

export function usePWAInstall() {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Verificar si ya está instalado
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  return { isInstallable, isInstalled };
}
```

---

### PASO 7: Agregar robots.txt (Opcional)

Crea `public/robots.txt`:

```
User-agent: *
Allow: /
```

---

## 🧪 Probar la PWA

### En Desarrollo:

1. **Inicia el servidor:**
   ```bash
   npm run dev
   ```

2. **Abre DevTools:**
   - Chrome: F12 → Application → Service Workers
   - Verifica que el service worker esté registrado

3. **Prueba el Manifest:**
   - DevTools → Application → Manifest
   - Verifica que todos los íconos estén cargados

4. **Simula Instalación:**
   - DevTools → Application → Manifest → "Add to homescreen"

### En Producción:

1. **Construye el proyecto:**
   ```bash
   npm run build
   ```

2. **Previsualiza:**
   ```bash
   npm run preview
   ```

3. **Despliega con HTTPS:**
   - Netlify, Vercel, o cualquier hosting con HTTPS
   - Las PWA requieren HTTPS en producción

---

## 📱 Personalización Avanzada

### Cambiar Colores del Tema

En `astro.config.mjs`, actualiza:
```javascript
theme_color: '#TU_COLOR_PRIMARIO',
background_color: '#TU_COLOR_FONDO',
```

### Configurar Cache Estratégico

En `workbox.runtimeCaching`, puedes agregar más estrategias:

```javascript
runtimeCaching: [
  {
    urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
    handler: 'CacheFirst',
    options: {
      cacheName: 'google-fonts-cache',
      expiration: {
        maxEntries: 10,
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 año
      },
    },
  },
  {
    urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
    handler: 'CacheFirst',
    options: {
      cacheName: 'images-cache',
      expiration: {
        maxEntries: 100,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 días
      },
    },
  },
],
```

### Agregar Notificaciones Push (Avanzado)

Requiere configuración adicional del servidor. Consulta la documentación de:
- Web Push API
- Firebase Cloud Messaging (FCM)

---

## ✅ Checklist de Implementación

- [ ] Instalar `vite-plugin-pwa`
- [ ] Configurar `astro.config.mjs` con VitePWA
- [ ] Crear íconos PWA (192x192 y 512x512)
- [ ] Colocar íconos en `public/`
- [ ] Actualizar `BaseLayout.astro` con meta tags PWA
- [ ] Agregar componente InstallPrompt (opcional)
- [ ] Probar en desarrollo
- [ ] Construir y probar en producción
- [ ] Verificar que funciona offline
- [ ] Probar instalación en dispositivo móvil

---

## 🐛 Solución de Problemas

### Service Worker no se registra
- Verifica que `devOptions.enabled: true` en desarrollo
- Revisa la consola del navegador para errores
- Limpia el cache del navegador

### Íconos no aparecen
- Verifica que los archivos estén en `public/`
- Comprueba las rutas en el manifest
- Asegúrate de que los tamaños sean correctos

### No se puede instalar
- Verifica que tengas HTTPS (en producción)
- Comprueba que el manifest sea válido
- Asegúrate de que todos los íconos estén presentes

### Cache no funciona
- Revisa la configuración de `workbox`
- Verifica los `globPatterns`
- Limpia el cache del navegador y prueba de nuevo

---

## 📚 Recursos Adicionales

- [Documentación de vite-plugin-pwa](https://vite-pwa-org.netlify.app/)
- [MDN: Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Web.dev: PWA](https://web.dev/progressive-web-apps/)
- [Workbox Documentation](https://developers.google.com/web/tools/workbox)

---

## 🎉 ¡Listo!

Tu plantilla ahora es una PWA completa. Los usuarios podrán:
- ✅ Instalar la app en sus dispositivos
- ✅ Usarla offline
- ✅ Tener actualizaciones automáticas
- ✅ Disfrutar de una experiencia similar a app nativa

**¡Tu aplicación web ahora es una Progressive Web App!** 🚀

