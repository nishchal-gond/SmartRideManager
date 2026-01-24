import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'demo.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:123456789:web:demo',
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || 'https://demo-default-rtdb.firebaseio.com',
};

// Check if Firebase is properly configured
const isFirebaseConfigured = import.meta.env.VITE_FIREBASE_API_KEY && 
  import.meta.env.VITE_FIREBASE_API_KEY !== 'demo-key';

// Initialize Firebase (will show errors in console if not configured, but won't crash)
let app;
try {
  app = initializeApp(firebaseConfig);
  if (!isFirebaseConfigured) {
    console.warn('⚠️ Firebase is using demo configuration. Please set up your .env file for full functionality.');
  }
} catch (error) {
  console.error('Firebase initialization error:', error);
  // Create a mock app object to prevent crashes
  app = { name: 'demo', options: firebaseConfig };
}

// Initialize Firebase services (with error handling)
let auth, db, database, storage;

try {
  if (isFirebaseConfigured) {
    auth = getAuth(app);
    db = getFirestore(app);
    database = getDatabase(app);
    storage = getStorage(app);
  } else {
    // Create mock objects for demo mode
    auth = null;
    db = null;
    database = null;
    storage = null;
    console.warn('⚠️ Firebase services not initialized. Configure your .env file to enable authentication and database features.');
  }
} catch (error) {
  console.error('Error initializing Firebase services:', error);
  auth = null;
  db = null;
  database = null;
  storage = null;
}

export { auth, db, database, storage };

export default app;
