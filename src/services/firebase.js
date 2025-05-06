import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3_slXHmS1UvN34uzp7acQdqUT576Oj38",
  authDomain: "recipe-6b435.firebaseapp.com",
  projectId: "recipe-6b435",
  storageBucket: "recipe-6b435.firebasestorage.app",
  messagingSenderId: "770810066460",
  appId: "1:770810066460:web:58e523827c92c95bb951d9",
  measurementId: "G-73X637HJGC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export {
  auth,
  provider,
  signInWithPopup,
  signOut,
  db,
  collection,
  addDoc,
  getDocs,
  query,
  where
};
