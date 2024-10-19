// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeTLw4pisAx4L4iU4fSCdBHic0S9d9ct4",
  authDomain: "cloud-computing-731ea.firebaseapp.com",
  projectId: "cloud-computing-731ea",
  storageBucket: "cloud-computing-731ea.appspot.com",
  messagingSenderId: "560929389524",
  appId: "1:560929389524:web:1f9fb64db489a19545f441",
  measurementId: "G-0F0HHHNG8Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth };

export { db };