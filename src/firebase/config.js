import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// 🛑 अपनी Firebase Config यहाँ डालें (Firebase Console → Project Settings → Web App)
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "pyqhub-rajasthan.firebaseapp.com",
  projectId: "pyqhub-rajasthan",
  storageBucket: "pyqhub-rajasthan.appspot.com",
  messagingSenderId: "...",
  appId: "..."
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 