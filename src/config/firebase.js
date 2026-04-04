// src/config/firebase.js
// Firebase SDK configuration for Renclo

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey:            "AIzaSyBgcJhEUOLavW4EB2K0RNL-zLOxA40B12Y",
  authDomain:        "renclo.firebaseapp.com",
  projectId:         "renclo",
  storageBucket:     "renclo.firebasestorage.app",
  messagingSenderId: "789572216822",
  appId:             "1:789572216822:web:9992c6f7fe469c28fe49d7",
  measurementId:     "G-3N5VLX7HLZ",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
export default app;

