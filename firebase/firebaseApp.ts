// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAkT7S6zNT2wrZrRm_4fAFZri54mABYzo",
  authDomain: "trusteeup-164f6.firebaseapp.com",
  projectId: "trusteeup-164f6",
  storageBucket: "trusteeup-164f6.firebasestorage.app",
  messagingSenderId: "1083816553417",
  appId: "1:1083816553417:web:f64a5b2bb31ee531741618",
  measurementId: "G-SQ4NP2QQ5B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {auth}
// const analytics = getAnalytics(app);