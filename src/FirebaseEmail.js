import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getApps, getApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";

const firebaseConfigs = [
  {
    apiKey: "AIzaSyDriYHR51Ub9aVBZtgzcQJ1kmPJGra7h_4",
    authDomain: "arabicpracticetwo.firebaseapp.com",
    projectId: "arabicpracticetwo",
    storageBucket: "arabicpracticetwo.appspot.com",
    messagingSenderId: "171834861504",
    appId: "1:171834861504:web:026ba6b075f441f4070a25"
  },
  {
    apiKey: "AIzaSyANWOKxRJcIHemFix2Fhd1F-FxGHJvhTsw",
    authDomain: "thameemarabic.firebaseapp.com",
    projectId: "thameemarabic",
    storageBucket: "thameemarabic.appspot.com",
    messagingSenderId: "78833120634",
    appId: "1:78833120634:web:c011bd00d095553442d2c3",
    measurementId: "G-991TP2PT2J"
  },
  //... add more configurations as needed
];

let activeFirebaseIndex = 0; // initial index

export function setActiveFirebase(index) {
  if (index < 0 || index >= firebaseConfigs.length) {
    throw new Error("Invalid Firebase config index");
  }
  activeFirebaseIndex = index;
}

export function getActiveFirebase() {
  const app = initializeApp(firebaseConfigs[activeFirebaseIndex]);
  const auth = getAuth(app);
  return { app, auth };
}

let db;

export function getActiveDb() {
  if (db) {
    return db;
  }
  if (getApps().length > 0) {
    db = getFirestore(getApp());
  } else {
      // Initialize your app here if needed.
      console.log('default db setup has not been done yet, setting it now')
      const app = initializeApp(firebaseConfigs[activeFirebaseIndex]);
      db = getFirestore(app);

  }
  return db;
}