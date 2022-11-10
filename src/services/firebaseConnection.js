// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBEHI8nXgQvZiE1Wp89uqZagu90jMR9i1Y",
  authDomain: "devlink-19be9.firebaseapp.com",
  projectId: "devlink-19be9",
  storageBucket: "devlink-19be9.appspot.com",
  messagingSenderId: "1067493664473",
  appId: "1:1067493664473:web:53db182a33e8b9c5a480c8",
  measurementId: "G-ETT0DNMKKQ",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
