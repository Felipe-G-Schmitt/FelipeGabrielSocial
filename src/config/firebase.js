// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgR7tg1ePxje47xClLzvo28ilQVCGP9FY",
  authDomain: "felipegabsocial.firebaseapp.com",
  projectId: "felipegabsocial",
  storageBucket: "felipegabsocial.appspot.com",
  messagingSenderId: "188807074081",
  appId: "1:188807074081:web:86fdf98173ab4338f16e60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
export { auth };

export default db;