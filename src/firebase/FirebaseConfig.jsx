// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWF9Ks2ppBM4JudLDWJKtATrqiBbR5MQ0",
  authDomain: "website-ecommerce-d2089.firebaseapp.com",
  projectId: "website-ecommerce-d2089",
  storageBucket: "website-ecommerce-d2089.appspot.com",
  messagingSenderId: "557025052016",
  appId: "1:557025052016:web:64b9553abfc65356413bb5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)
export {fireDB,auth } ;