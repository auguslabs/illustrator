// EJEMPLO: Hook de Autenticación
// Copia este archivo a: src/hooks/useAuth.ts

import { useState, useEffect } from 'react';
import { AuthUser, onAuthStateChange, getCurrentUser } from '@/services/auth';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener usuario actual inmediatamente
    setUser(getCurrentUser());
    setLoading(false);

    // Escuchar cambios en autenticación
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { 
    user, 
    loading, 
    isAuthenticated: !!user 
  };
}

