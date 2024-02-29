// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmm60sebisIDavcXcXFEd_1jM8wYcysKg",
  authDomain: "beaware-1565d.firebaseapp.com",
  databaseURL: "https://beaware-1565d-default-rtdb.firebaseio.com",
  projectId: "beaware-1565d",
  storageBucket: "beaware-1565d.appspot.com",
  messagingSenderId: "652902905933",
  appId: "1:652902905933:web:629e18b53a548cf6c60404",
  measurementId: "G-QLS1114W99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
const db = getFirestore(app);

export { db, app };
