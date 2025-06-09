
// src/lib/firebase.ts
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
// Add other Firebase services like Firestore if needed:
// import { getFirestore } from "firebase/firestore";

// TODO: Replace with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // Replace with your Firebase API key
  authDomain: "YOUR_AUTH_DOMAIN", // Replace with your Firebase auth domain
  projectId: "YOUR_PROJECT_ID", // Replace with your Firebase project ID
  storageBucket: "YOUR_STORAGE_BUCKET", // Replace with your Firebase storage bucket
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // Replace with your Firebase messaging sender ID
  appId: "YOUR_APP_ID", // Replace with your Firebase app ID
  measurementId: "YOUR_MEASUREMENT_ID" // Optional: Replace with your Firebase measurement ID for Analytics
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);
// const db = getFirestore(app); // Initialize Firestore if you're using it

export { app, auth /*, db */ };
