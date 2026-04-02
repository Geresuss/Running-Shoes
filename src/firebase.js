import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXn1c9bSciy_vlmmMsa3t8N1OE1Urq_TU",
  authDomain: "running-shoes-app-ce6df.firebaseapp.com",
  projectId: "running-shoes-app-ce6df",
  storageBucket: "running-shoes-app-ce6df.firebasestorage.app",
  messagingSenderId: "301490311613",
  appId: "1:301490311613:web:e97e76cfad139a4c2682d4",
  measurementId: "G-F2LHQHW6E8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);