# 📁 Ejemplos Firebase - Archivos de Referencia

Esta carpeta contiene ejemplos de archivos necesarios para integrar Firebase como backend.

## 📋 Archivos Incluidos

1. **`firebase.config.ts`** - Configuración de Firebase
2. **`auth.service.ts`** - Servicio de autenticación
3. **`firestore.service.ts`** - Servicio de base de datos
4. **`storage.service.ts`** - Servicio de almacenamiento
5. **`useAuth.ts`** - Hook de React para autenticación
6. **`LoginForm.tsx`** - Componente de login/registro
7. **`.env.example`** - Ejemplo de variables de entorno
8. **`firestore.rules`** - Reglas de seguridad para Firestore
9. **`storage.rules`** - Reglas de seguridad para Storage

## 🚀 Cómo Usar

1. **Lee primero:** `../GUIA_FIREBASE.md` para instrucciones completas
2. **Crea proyecto en Firebase Console** y obtén las credenciales
3. **Copia los archivos** según las instrucciones de la guía
4. **Configura variables de entorno** usando `.env.example`
5. **Configura reglas de seguridad** en Firebase Console

## ⚠️ Importante

- Estos son **archivos de ejemplo**
- NO los copies directamente sin personalizar
- Sigue las instrucciones en `GUIA_FIREBASE.md`
- **NUNCA** subas archivos `.env` con credenciales reales a Git
- Configura las reglas de seguridad antes de usar en producción

## 📝 Checklist Rápido

- [ ] Leer `GUIA_FIREBASE.md`
- [ ] Crear proyecto en Firebase Console
- [ ] Instalar `firebase`
- [ ] Crear archivo de configuración
- [ ] Configurar variables de entorno
- [ ] Habilitar Authentication, Firestore y Storage
- [ ] Crear servicios (auth, firestore, storage)
- [ ] Crear hooks de React
- [ ] Configurar reglas de seguridad
- [ ] Probar autenticación
- [ ] Probar Firestore
- [ ] Probar Storage

## 🔒 Seguridad

- Usa variables de entorno para credenciales
- Configura reglas de seguridad apropiadas
- Nunca expongas credenciales en el código
- Revisa las reglas antes de producción

