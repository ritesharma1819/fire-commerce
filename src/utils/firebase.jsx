import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJOdZiuRY_CHkf-9I5sCY0181igToIbMA",
  authDomain: "firecommerce-cfa90.firebaseapp.com",
  projectId: "firecommerce-cfa90",
  storageBucket: "firecommerce-cfa90.appspot.com",
  messagingSenderId: "262357503049",
  appId: "1:262357503049:web:799fc6f4594f3b793b8398",
  measurementId: "G-J9BR8JR9TJ",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
