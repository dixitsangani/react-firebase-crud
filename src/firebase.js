// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3A2Inl_c60q2Q1RCyWWbEcIY2qS1PGPw",
  authDomain: "fir-todo-project-2b34c.firebaseapp.com",
  projectId: "fir-todo-project-2b34c",
  storageBucket: "fir-todo-project-2b34c.appspot.com",
  messagingSenderId: "538077324359",
  appId: "1:538077324359:web:7e8ab063bcb90bdd943d62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db= getFirestore(app);
