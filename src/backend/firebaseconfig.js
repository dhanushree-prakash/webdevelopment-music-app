// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqJsLIuUqH-jk2H2-OPaBQPRLuDDX81T0",
  authDomain: "innovators-hub-music-3cd38.firebaseapp.com",
  projectId: "innovators-hub-music-3cd38",
  storageBucket: "innovators-hub-music-3cd38.firebasestorage.app",
  messagingSenderId: "291195347647",
  appId: "1:291195347647:web:f291c3edb1136a7d445c0a"
};

// Initialize Firebase
const firebaseApp= initializeApp(firebaseConfig);
export const __AUTH=getAuth(firebaseApp)

export const __DB=getFirestore(firebaseApp)