import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXTIaouVU46DG2MkfZVppWjahbISjoNcU",
  authDomain: "insiderstask.firebaseapp.com",
  projectId: "insiderstask",
  storageBucket: "insiderstask.firebasestorage.app",
  messagingSenderId: "74975119934",
  appId: "1:74975119934:web:2f04a097241d2580f75f6f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;