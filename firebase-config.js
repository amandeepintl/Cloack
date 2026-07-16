// Colack Secure Firebase Initialization Module
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getAuth, 
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Firebase client configuration. 
// Firebase client SDK configurations are designed to be public and embedded in clients.
// To keep it secure like a proper startup, make sure to configure Authorized Domains, 
// Email Templates, and Security Rules in your Firebase Console (https://console.firebase.google.com).
const firebaseConfig = {
  apiKey: "AIzaSyBfITz3zIgpw7x30FcQProSNjAXpmEqYtY",
  authDomain: "cloack-fb1c8.firebaseapp.com",
  projectId: "cloack-fb1c8",
  storageBucket: "cloack-fb1c8.firebasestorage.app",
  messagingSenderId: "847141121323",
  appId: "1:847141121323:web:6908f8e707549a5349a96e",
  measurementId: "G-Q49XLT4D2C"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with secure token persistence (LOCAL by default)
const auth = getAuth(app);

console.log("🔒 Colack Security: Firebase Auth client initialized successfully.");

export { app, auth, onAuthStateChanged, signOut };
