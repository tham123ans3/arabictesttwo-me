import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDriYHR51Ub9aVBZtgzcQJ1kmPJGra7h_4",
    authDomain: "arabicpracticetwo.firebaseapp.com",
    projectId: "arabicpracticetwo",
    storageBucket: "arabicpracticetwo.appspot.com",
    messagingSenderId: "171834861504",
    appId: "1:171834861504:web:026ba6b075f441f4070a25"
  };
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };