// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQmW2AMbzCV_bor6L8T8zYvueAL5V8XqA",
  authDomain: "boardgamestats-4c9c9.firebaseapp.com",
  databaseURL: "https://boardgamestats-4c9c9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "boardgamestats-4c9c9",
  storageBucket: "boardgamestats-4c9c9.appspot.com",
  messagingSenderId: "880279813154",
  appId: "1:880279813154:web:ffa922ec6a8ef734811e7b",
  measurementId: "G-PQ33DLJSB3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let firestoreApp = getFirestore(app)

export default firestoreApp;