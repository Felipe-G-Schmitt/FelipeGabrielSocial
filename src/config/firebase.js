// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";


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
const uploadToFirebase = async (uri, name) => {
  const fetchResponse = await fetch(uri);
  const theBlob = await fetchResponse.blob();

  const imageRef = ref(getStorage(), `images/${name}`);
  const uploadTask = (uploadBytes(imageRef, theBlob));
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth, uploadToFirebase };