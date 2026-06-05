import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut,
} from 'firebase/auth';
import { auth } from './config';

// Email/Password
export const loginWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const registerWithEmail = (name, email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

// Email Link (Passwordless)
export const sendMagicLink = async (email) => {
  const actionCodeSettings = {
    url: window.location.origin + '/#/login?email=' + email,
    handleCodeInApp: true,
  };
  await sendSignInLinkToEmail(auth, email, actionCodeSettings);
  window.localStorage.setItem('emailForSignIn', email);
};

export const checkEmailLink = () => isSignInWithEmailLink(auth, window.location.href);

export const completeEmailSignIn = async () => {
  let email = window.localStorage.getItem('emailForSignIn');
  if (!email) {
    email = window.prompt('Please enter your email again for confirmation');
  }
  if (!email) throw new Error('Email required');
  const result = await signInWithEmailLink(auth, email, window.location.href);
  window.localStorage.removeItem('emailForSignIn');
  return result;
};

export const logoutUser = () => signOut(auth);