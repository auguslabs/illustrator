// EJEMPLO: Servicio de Firestore
// Copia este archivo a: src/services/firestore.ts

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

// Tipos
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
): Promise<(T & FirestoreDocument) | null> {
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

// Obtener todos los documentos
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

// Helpers para queries
export const firestoreHelpers = {
  where,
  orderBy,
  limit,
};

