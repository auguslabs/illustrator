// EJEMPLO: Componente de Login
// Copia este archivo a: src/components/auth/LoginForm.tsx

import React, { useState } from 'react';
import { loginUser, registerUser } from '@/services/auth';
import { Button, Input } from '@/components/ui';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isRegister) {
        await registerUser(email, password, displayName);
      } else {
        await loginUser(email, password);
      }
      // El hook useAuth detectará el cambio automáticamente
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        {isRegister ? 'Registrarse' : 'Iniciar Sesión'}
      </h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {isRegister && (
        <Input
          label="Nombre"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Tu nombre"
          client:load
        />
      )}

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="tu@email.com"
        client:load
      />

      <Input
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="Mínimo 6 caracteres"
        client:load
      />

      <Button
        type="submit"
        variant="primary"
        disabled={loading}
        className="w-full"
        client:load
      >
        {loading ? 'Cargando...' : isRegister ? 'Registrarse' : 'Iniciar Sesión'}
      </Button>

      <button
        type="button"
        onClick={() => {
          setIsRegister(!isRegister);
          setError('');
        }}
        className="text-sm text-primary-600 hover:underline w-full text-center block"
      >
        {isRegister
          ? '¿Ya tienes cuenta? Inicia sesión'
          : '¿No tienes cuenta? Regístrate'}
      </button>
    </form>
  );
}

