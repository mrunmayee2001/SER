import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBk-lVBMqrFFL72IOJ_jQcp9_v8e-xNBZc",
  authDomain: "ser-nlp-project.firebaseapp.com",
  projectId: "ser-nlp-project",
  storageBucket: "ser-nlp-project.appspot.com",
  messagingSenderId: "747419408969",
  appId: "1:747419408969:web:46c3df7c795ce7a190bd98"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default db;
