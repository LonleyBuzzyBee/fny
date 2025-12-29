// import dotenv from 'dotenv';
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore/lite';
// import { getAuth } from 'firebase/auth';

// dotenv.config()

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID 
// }

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// const auth = getAuth(app)

// export {
//   app, auth, db
// }

// src/firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// IMPORTANT: use your own keys here from your .env
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase once
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);

}

// Get the initialized app instance
const app = firebase.app();

// Helpers used elsewhere
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { app, auth, db, storage };
// Default export for ReactReduxFirebaseProvider
export default firebase;
