// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApj2-1VZr9XjpRSHV9R__k9SN1sJ9qMAQ",
  authDomain: "bloom-70a53.firebaseapp.com",
  projectId: "bloom-70a53",
  storageBucket: "bloom-70a53.firebasestorage.app",
  messagingSenderId: "501378260262",
  appId: "1:501378260262:web:98a412805c7466131535e7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googlProvider = new GoogleAuthProvider();
