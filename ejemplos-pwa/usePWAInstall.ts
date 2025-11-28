// EJEMPLO: Hook para detectar si la PWA es instalable
// Copia este archivo a: src/hooks/usePWAInstall.ts

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

  const install = async () => {
    // Este método se puede llamar desde el componente que use el hook
    // El prompt real se maneja en InstallPrompt.tsx
  };

  return { isInstallable, isInstalled, install };
}

