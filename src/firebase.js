// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNkLoYIs7EYxjzqHsDCzTH_j7OfZHJN4w",
  authDomain: "adb-1e009.firebaseapp.com",
  projectId: "adb-1e009",
  storageBucket: "adb-1e009.firebasestorage.app", // ✅ this must match your actual bucket
  messagingSenderId: "1017348693605",
  appId: "1:1017348693605:web:17a27d534bc6f88b5d708c",
  measurementId: "G-SC2N3TF3Z2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
