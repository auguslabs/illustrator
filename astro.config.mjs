import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      // Configuración de Tailwind
      applyBaseStyles: false, // Usaremos nuestro propio global.css
    }),
  ],
  output: 'static', // SSG por defecto, cambiar a 'server' para SSR
  // Para habilitar SSR, descomentar:
  // output: 'server',
  // adapter: node(),
});

