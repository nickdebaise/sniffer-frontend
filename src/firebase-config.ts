// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDa1ag3k3Ewgu1FB4nG_foRxcTzN0ckGPI",
    authDomain: "scholarsproject-1f3ff.firebaseapp.com",
    projectId: "scholarsproject-1f3ff",
    storageBucket: "scholarsproject-1f3ff.appspot.com",
    messagingSenderId: "618464232790",
    appId: "1:618464232790:web:16816c02c0626a50fac2f7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
