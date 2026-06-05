import { db } from './config';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';

// पेपर लाओ (एग्जाम कोड के अनुसार)
export const getPapersByExam = async (exam) => {
  const q = query(
    collection(db, 'papers'),
    where('exam', '==', exam),
    orderBy('year', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

// फ्री पेपर
export const getFreePapers = async () => {
  const q = query(collection(db, 'papers'), where('isFree', '==', true));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

// सारे पेपर (एडमिन)
export const getAllPapers = async () => {
  const snap = await getDocs(collection(db, 'papers'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

// पेपर जोड़ें (एडमिन)
export const addPaper = async (paperData) => {
  return await addDoc(collection(db, 'papers'), paperData);
};

// पेपर अपडेट करें (एडमिन)
export const updatePaper = async (id, data) => {
  const ref = doc(db, 'papers', id);
  return await updateDoc(ref, data);
};

// पेपर हटाएँ (एडमिन)
export const deletePaper = async (id) => {
  const ref = doc(db, 'papers', id);
  return await deleteDoc(ref);
};

// खरीदारी सेव करें
export const savePurchase = async (purchaseData) => {
  return await addDoc(collection(db, 'purchases'), purchaseData);
};

// यूज़र की खरीदारी
export const getUserPurchases = async (userId) => {
  const q = query(collection(db, 'purchases'), where('userId', '==', userId));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

// सारी खरीदारियाँ (एडमिन)
export const getAllPurchases = async () => {
  const snap = await getDocs(collection(db, 'purchases'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}; 