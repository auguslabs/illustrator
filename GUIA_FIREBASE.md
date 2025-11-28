# 🔥 Guía Completa: Integrar Firebase como Backend

## ✅ ¿Por qué Firebase?

Firebase es perfecto para esta plantilla porque:
- ✅ Backend as a Service (BaaS) - No necesitas servidor propio
- ✅ Autenticación lista para usar
- ✅ Base de datos en tiempo real (Firestore)
- ✅ Almacenamiento de archivos (Storage)
- ✅ Funciones serverless (Cloud Functions)
- ✅ Hosting gratuito
- ✅ Escalable automáticamente

---

## 🎯 Servicios Firebase que Integraremos

1. **Authentication** - Login, registro, gestión de usuarios
2. **Firestore** - Base de datos NoSQL en tiempo real
3. **Storage** - Almacenamiento de archivos e imágenes
4. **Hosting** (opcional) - Despliegue de la aplicación

---

## 📋 Requisitos Previos

1. Cuenta de Google (gratis)
2. Proyecto Firebase creado en [Firebase Console](https://console.firebase.google.com/)
3. Node.js instalado (ya lo tienes)

---

## 🚀 Implementación Paso a Paso

### PASO 1: Crear Proyecto en Firebase Console

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Click en "Agregar proyecto"
3. Ingresa nombre del proyecto
4. (Opcional) Desactiva Google Analytics si no lo necesitas
5. Click "Crear proyecto"

---

### PASO 2: Configurar Firebase en tu Proyecto

#### 2.1 Instalar Dependencias

```bash
npm install firebase
```

#### 2.2 Obtener Configuración de Firebase

1. En Firebase Console, ve a **Configuración del proyecto** (⚙️)
2. Baja hasta "Tus aplicaciones"
3. Click en el ícono **Web** (`</>`)
4. Registra la app con un nombre
5. Copia las credenciales (aparecen como objeto de configuración)

#### 2.3 Crear Archivo de Configuración

Crea `src/config/firebase.ts`:

```typescript
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Configuración de Firebase (reemplaza con tus credenciales)
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROJECT_ID.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_PROJECT_ID.appspot.com",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

// Inicializar Firebase solo si no está ya inicializado
let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Exportar servicios
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);
export default app;
```

**⚠️ IMPORTANTE:** 
- **NUNCA** subas este archivo con credenciales reales a Git
- Usa variables de entorno (ver PASO 3)

---

### PASO 3: Configurar Variables de Entorno

#### 3.1 Crear `.env` (local)

Crea `.env` en la raíz del proyecto:

```env
PUBLIC_FIREBASE_API_KEY=tu_api_key_aqui
PUBLIC_FIREBASE_AUTH_DOMAIN=tu_project_id.firebaseapp.com
PUBLIC_FIREBASE_PROJECT_ID=tu_project_id
PUBLIC_FIREBASE_STORAGE_BUCKET=tu_project_id.appspot.com
PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
PUBLIC_FIREBASE_APP_ID=tu_app_id
```

#### 3.2 Actualizar `firebase.ts` para usar variables de entorno

```typescript
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
};

// ... resto del código igual
```

#### 3.3 Actualizar `.gitignore`

Asegúrate de que `.gitignore` incluya:

```
.env
.env.local
.env.production
```

---

### PASO 4: Configurar Authentication

#### 4.1 Habilitar Authentication en Firebase Console

1. Ve a Firebase Console → **Authentication**
2. Click en "Comenzar"
3. Habilita los métodos de autenticación que necesites:
   - **Email/Password** (recomendado para empezar)
   - **Google** (opcional)
   - **Facebook** (opcional)
   - Otros según necesites

#### 4.2 Crear Servicio de Autenticación

Crea `src/services/auth.ts`:

```typescript
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '@/config/firebase';

// Tipos
export interface AuthUser extends User {}
export type AuthStateListener = (user: AuthUser | null) => void;

// Registrar nuevo usuario
export async function registerUser(
  email: string,
  password: string,
  displayName?: string
): Promise<AuthUser> {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    
    // Actualizar perfil si se proporciona nombre
    if (displayName && userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName,
      });
    }
    
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message || 'Error al registrar usuario');
  }
}

// Iniciar sesión
export async function loginUser(
  email: string,
  password: string
): Promise<AuthUser> {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message || 'Error al iniciar sesión');
  }
}

// Cerrar sesión
export async function logoutUser(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message || 'Error al cerrar sesión');
  }
}

// Obtener usuario actual
export function getCurrentUser(): AuthUser | null {
  return auth.currentUser;
}

// Escuchar cambios en el estado de autenticación
export function onAuthStateChange(listener: AuthStateListener): () => void {
  return onAuthStateChanged(auth, listener);
}

// Recuperar contraseña
export async function resetPassword(email: string): Promise<void> {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw new Error(error.message || 'Error al enviar email de recuperación');
  }
}
```

---

### PASO 5: Configurar Firestore (Base de Datos)

#### 5.1 Habilitar Firestore en Firebase Console

1. Ve a Firebase Console → **Firestore Database**
2. Click en "Crear base de datos"
3. Elige modo:
   - **Modo de producción** (recomendado)
   - **Modo de prueba** (solo para desarrollo, expira en 30 días)
4. Selecciona ubicación (elige la más cercana)
5. Click "Habilitar"

#### 5.2 Crear Servicio de Firestore

Crea `src/services/firestore.ts`:

```typescript
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from '@/config/firebase';

// Tipos genéricos para Firestore
export interface FirestoreDocument {
  id: string;
  [key: string]: any;
}

// Crear documento
export async function createDocument<T>(
  collectionName: string,
  data: Omit<T, 'id'>,
  documentId?: string
): Promise<string> {
  try {
    const docRef = documentId
      ? doc(db, collectionName, documentId)
      : doc(collection(db, collectionName));
    
    await setDoc(docRef, {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    
    return docRef.id;
  } catch (error: any) {
    throw new Error(error.message || 'Error al crear documento');
  }
}

// Obtener documento por ID
export async function getDocument<T>(
  collectionName: string,
  documentId: string
): Promise<T & FirestoreDocument | null> {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as T & FirestoreDocument;
    }
    
    return null;
  } catch (error: any) {
    throw new Error(error.message || 'Error al obtener documento');
  }
}

// Obtener todos los documentos de una colección
export async function getDocuments<T>(
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<(T & FirestoreDocument)[]> {
  try {
    const q = constraints.length > 0
      ? query(collection(db, collectionName), ...constraints)
      : query(collection(db, collectionName));
    
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as (T & FirestoreDocument)[];
  } catch (error: any) {
    throw new Error(error.message || 'Error al obtener documentos');
  }
}

// Actualizar documento
export async function updateDocument(
  collectionName: string,
  documentId: string,
  data: Partial<any>
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
  } catch (error: any) {
    throw new Error(error.message || 'Error al actualizar documento');
  }
}

// Eliminar documento
export async function deleteDocument(
  collectionName: string,
  documentId: string
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, documentId);
    await deleteDoc(docRef);
  } catch (error: any) {
    throw new Error(error.message || 'Error al eliminar documento');
  }
}

// Funciones helper para queries comunes
export const firestoreHelpers = {
  where,
  orderBy,
  limit,
};
```

---

### PASO 6: Configurar Storage (Almacenamiento)

#### 6.1 Habilitar Storage en Firebase Console

1. Ve a Firebase Console → **Storage**
2. Click en "Comenzar"
3. Lee y acepta los términos
4. Elige ubicación (misma que Firestore recomendado)
5. Click "Listo"

#### 6.2 Crear Servicio de Storage

Crea `src/services/storage.ts`:

```typescript
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
  getMetadata,
} from 'firebase/storage';
import { storage } from '@/config/firebase';

// Subir archivo
export async function uploadFile(
  file: File,
  path: string,
  metadata?: { [key: string]: string }
): Promise<string> {
  try {
    const storageRef = ref(storage, path);
    const metadataObj = metadata ? { customMetadata: metadata } : undefined;
    
    await uploadBytes(storageRef, file, metadataObj);
    const downloadURL = await getDownloadURL(storageRef);
    
    return downloadURL;
  } catch (error: any) {
    throw new Error(error.message || 'Error al subir archivo');
  }
}

// Obtener URL de descarga
export async function getFileURL(path: string): Promise<string> {
  try {
    const storageRef = ref(storage, path);
    return await getDownloadURL(storageRef);
  } catch (error: any) {
    throw new Error(error.message || 'Error al obtener URL');
  }
}

// Eliminar archivo
export async function deleteFile(path: string): Promise<void> {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error: any) {
    throw new Error(error.message || 'Error al eliminar archivo');
  }
}

// Listar archivos en una carpeta
export async function listFiles(folderPath: string): Promise<string[]> {
  try {
    const folderRef = ref(storage, folderPath);
    const result = await listAll(folderRef);
    
    const urls = await Promise.all(
      result.items.map((item) => getDownloadURL(item))
    );
    
    return urls;
  } catch (error: any) {
    throw new Error(error.message || 'Error al listar archivos');
  }
}

// Obtener metadata de archivo
export async function getFileMetadata(path: string) {
  try {
    const storageRef = ref(storage, path);
    return await getMetadata(storageRef);
  } catch (error: any) {
    throw new Error(error.message || 'Error al obtener metadata');
  }
}
```

---

### PASO 7: Crear Hooks de React para Firebase

#### 7.1 Hook de Autenticación

Crea `src/hooks/useAuth.ts`:

```typescript
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

  return { user, loading, isAuthenticated: !!user };
}
```

#### 7.2 Hook para Firestore (Opcional)

Crea `src/hooks/useFirestore.ts`:

```typescript
import { useState, useEffect } from 'react';
import { getDocuments, FirestoreDocument } from '@/services/firestore';
import { QueryConstraint } from 'firebase/firestore';

export function useFirestore<T>(
  collectionName: string,
  constraints: QueryConstraint[] = []
) {
  const [data, setData] = useState<(T & FirestoreDocument)[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const documents = await getDocuments<T>(collectionName, constraints);
        setData(documents);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [collectionName, JSON.stringify(constraints)]);

  return { data, loading, error };
}
```

---

### PASO 8: Actualizar Modelos de Datos

Actualiza `src/data/models/index.ts` con ejemplos para Firebase:

```typescript
// Modelo de Usuario (compatible con Firebase Auth)
export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Modelo de Post (ejemplo para Firestore)
export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  imageURL?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Modelo de Comentario
export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: Date;
}
```

---

### PASO 9: Crear Componentes de Ejemplo

#### 9.1 Componente de Login

Crea `src/components/auth/LoginForm.tsx`:

```tsx
import React, { useState } from 'react';
import { loginUser, registerUser } from '@/services/auth';
import { Button, Input } from '@/components/ui';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isRegister) {
        await registerUser(email, password);
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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center">
        {isRegister ? 'Registrarse' : 'Iniciar Sesión'}
      </h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        client:load
      />

      <Input
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        client:load
      />

      <Button
        type="submit"
        variant="primary"
        disabled={loading}
        client:load
      >
        {loading ? 'Cargando...' : isRegister ? 'Registrarse' : 'Iniciar Sesión'}
      </Button>

      <button
        type="button"
        onClick={() => setIsRegister(!isRegister)}
        className="text-sm text-primary-600 hover:underline"
      >
        {isRegister
          ? '¿Ya tienes cuenta? Inicia sesión'
          : '¿No tienes cuenta? Regístrate'}
      </button>
    </form>
  );
}
```

---

## 🧪 Probar la Integración

### 1. Verificar Configuración

```bash
npm run dev
```

Abre la consola del navegador y verifica que no haya errores de Firebase.

### 2. Probar Autenticación

- Crea un componente que use `LoginForm`
- Intenta registrar un usuario
- Verifica en Firebase Console → Authentication que aparezca el usuario

### 3. Probar Firestore

- Crea un documento de prueba
- Verifica en Firebase Console → Firestore que aparezca

---

## 🔒 Reglas de Seguridad (IMPORTANTE)

### Firestore Rules

En Firebase Console → Firestore → Reglas, configura:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura/escritura solo a usuarios autenticados
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // O reglas más específicas según tu caso
    match /posts/{postId} {
      allow read: if true; // Todos pueden leer
      allow write: if request.auth != null; // Solo autenticados pueden escribir
    }
  }
}
```

### Storage Rules

En Firebase Console → Storage → Reglas:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## 📱 Uso en Componentes

### Ejemplo: Mostrar datos de Firestore

```tsx
import { useFirestore } from '@/hooks/useFirestore';
import { Post } from '@/data/models';

export function PostsList() {
  const { data: posts, loading, error } = useFirestore<Post>('posts');

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## ✅ Checklist de Implementación

- [ ] Crear proyecto en Firebase Console
- [ ] Instalar `firebase`
- [ ] Crear archivo de configuración `src/config/firebase.ts`
- [ ] Configurar variables de entorno
- [ ] Habilitar Authentication en Firebase Console
- [ ] Crear servicio de autenticación
- [ ] Habilitar Firestore en Firebase Console
- [ ] Crear servicio de Firestore
- [ ] Habilitar Storage en Firebase Console
- [ ] Crear servicio de Storage
- [ ] Crear hooks de React
- [ ] Configurar reglas de seguridad
- [ ] Probar autenticación
- [ ] Probar Firestore
- [ ] Probar Storage

---

## 🐛 Solución de Problemas

### Error: "Firebase: Error (auth/configuration-not-found)"
- Verifica que las credenciales en `.env` sean correctas
- Asegúrate de que el prefijo sea `PUBLIC_` para variables accesibles en el cliente

### Error: "Permission denied"
- Revisa las reglas de Firestore/Storage
- Verifica que el usuario esté autenticado

### Variables de entorno no funcionan
- Reinicia el servidor de desarrollo
- Verifica que las variables tengan el prefijo `PUBLIC_`

---

## 📚 Recursos Adicionales

- [Documentación de Firebase](https://firebase.google.com/docs)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Cloud Firestore](https://firebase.google.com/docs/firestore)
- [Firebase Storage](https://firebase.google.com/docs/storage)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)

---

## 🎉 ¡Listo!

Tu plantilla ahora tiene Firebase completamente integrado como backend. Puedes:
- ✅ Autenticar usuarios
- ✅ Guardar y leer datos en tiempo real
- ✅ Subir y gestionar archivos
- ✅ Escalar automáticamente

**¡Tu aplicación ahora tiene un backend completo!** 🚀

