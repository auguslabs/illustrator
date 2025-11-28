// EJEMPLO: Servicio de Autenticación
// Copia este archivo a: src/services/auth.ts

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
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

// Iniciar sesión con email/password
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

// Iniciar sesión con Google
export async function loginWithGoogle(): Promise<AuthUser> {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message || 'Error al iniciar sesión con Google');
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

