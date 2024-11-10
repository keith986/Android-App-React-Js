
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFpwEyEMddDh9FrT4KsD9K7ueN3V8oApY",
  authDomain: "onlinestore-eaac7.firebaseapp.com",
  projectId: "onlinestore-eaac7",
  storageBucket: "onlinestore-eaac7.appspot.com",
  messagingSenderId: "581738163852",
  appId: "1:581738163852:web:b876e890d0f5eba692d5a9"
};


const app = initializeApp(firebaseConfig);
export const auth  = getAuth(app)
export const db = getFirestore(app)
