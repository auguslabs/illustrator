import React from 'react';
import { Button } from '../ui';

/**
 * Componente Header - Layout
 * 
 * Encabezado de la aplicación.
 */
export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary-600">
              Mi Aplicación
            </h1>
          </div>
          <nav className="flex items-center space-x-4">
            <a href="/" className="text-gray-700 hover:text-primary-600">
              Inicio
            </a>
            <a href="/about" className="text-gray-700 hover:text-primary-600">
              Acerca de
            </a>
            <Button variant="primary" size="sm">
              Contacto
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}

