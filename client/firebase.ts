// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-b5386.firebaseapp.com",
  projectId: "mern-blog-b5386",
  storageBucket: "mern-blog-b5386.appspot.com",
  messagingSenderId: "240275662754",
  appId: "1:240275662754:web:28e7af3208aac68f70b4fb",
  measurementId: "G-EHDYHF9DSG"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);