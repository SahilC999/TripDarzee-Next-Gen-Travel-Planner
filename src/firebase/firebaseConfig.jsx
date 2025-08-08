// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdMtQXt1CASJJTCPRAfAEsqhPI6iOJ2-c",
  authDomain: "travel-planner-f3b53.firebaseapp.com",
  projectId: "travel-planner-f3b53",
  storageBucket: "travel-planner-f3b53.firebasestorage.app",
  messagingSenderId: "465988373009",
  appId: "1:465988373009:web:ee9a392e8f800ee3fe3fb0",
  measurementId: "G-FZ1W6CXH69"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);