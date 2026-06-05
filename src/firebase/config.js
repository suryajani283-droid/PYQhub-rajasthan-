import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD1R1dOYjhr9SY4saZihXr5YpIFWr0Dut8",
  authDomain: "https://pyqhubrajasthan.suryajani28.workers.dev",
  projectId: "pyqhub-rajasthan",
  storageBucket: "pyqhub-rajasthan.firebasestorage.app",
  messagingSenderId: "92908580623",
  appId: "1:92908580623:web:c93108ccfb1a9b971dd87a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);