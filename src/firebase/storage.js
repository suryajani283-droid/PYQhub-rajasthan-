import { storage } from './config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadPDF = async (file, path) => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};