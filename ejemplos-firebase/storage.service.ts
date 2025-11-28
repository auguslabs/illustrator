// EJEMPLO: Servicio de Storage
// Copia este archivo a: src/services/storage.ts

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

// Listar archivos en carpeta
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

// Obtener metadata
export async function getFileMetadata(path: string) {
  try {
    const storageRef = ref(storage, path);
    return await getMetadata(storageRef);
  } catch (error: any) {
    throw new Error(error.message || 'Error al obtener metadata');
  }
}

