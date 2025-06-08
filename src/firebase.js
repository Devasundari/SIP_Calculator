// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // 

const firebaseConfig = {
  apiKey: "AIzaSyDhvB0M8wiAE1gUHAPqaUWpP4SsWSwTlDg",
  authDomain: "calcmysip.firebaseapp.com",
  projectId: "calcmysip",
  storageBucket: "calcmysip.firebasestorage.app",
  messagingSenderId: "1028092948037",
  appId: "1:1028092948037:web:ad3a0dcc7402f02e78fd2c",
  measurementId: "G-NWKHWYFDN7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // 👈 Get Firebase Auth instance
const googleProvider = new GoogleAuthProvider();

export { app, analytics, auth, googleProvider }; // 👈 Export it
