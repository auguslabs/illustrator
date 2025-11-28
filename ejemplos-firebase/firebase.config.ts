// EJEMPLO: Configuración de Firebase
// Copia este archivo a: src/config/firebase.ts
// Reemplaza las credenciales con las de tu proyecto Firebase

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Configuración de Firebase
// IMPORTANTE: Usa variables de entorno en producción
const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY || "TU_API_KEY",
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN || "TU_PROJECT_ID.firebaseapp.com",
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID || "TU_PROJECT_ID",
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET || "TU_PROJECT_ID.appspot.com",
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "TU_MESSAGING_SENDER_ID",
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID || "TU_APP_ID",
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

