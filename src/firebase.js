import firebase from "firebase/compat/app";
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBIWA1p52iLyWbHjiyYKxIp43lTH0_jdxE",

  authDomain: "hwhat-to-do.firebaseapp.com",

  projectId: "hwhat-to-do",

  storageBucket: "hwhat-to-do.appspot.com",

  messagingSenderId: "72971965763",

  appId: "1:72971965763:web:9f2231bfc45fbe43798bf6",

  measurementId: "G-V6NRTXSNFT",
};

// Initialize Firebase

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();

export {db};
