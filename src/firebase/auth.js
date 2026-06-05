import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import { auth } from './config';

const googleProvider = new GoogleAuthProvider();

export const loginWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const registerWithEmail = (name, email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const loginWithGoogle = () =>
  signInWithRedirect(auth, googleProvider);

export const getGoogleRedirectResult = () =>
  getRedirectResult(auth);

export const logoutUser = () => signOut(auth);