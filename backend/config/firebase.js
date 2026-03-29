const admin = require('firebase-admin');

let db;
let auth;

const initFirebase = () => {
  if (admin.apps.length > 0) {
    // Already initialized
    db = admin.firestore();
    auth = admin.auth();
    return;
  }

  // Validate required env vars
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;

  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    const missing = [];
    if (!FIREBASE_PROJECT_ID) missing.push('FIREBASE_PROJECT_ID');
    if (!FIREBASE_CLIENT_EMAIL) missing.push('FIREBASE_CLIENT_EMAIL');
    if (!FIREBASE_PRIVATE_KEY) missing.push('FIREBASE_PRIVATE_KEY');
    
    console.error('❌ Missing Firebase credentials on Vercel Dashboard:', missing.join(', '));
    throw new Error(`Firebase initialization failed: Missing ${missing.join(', ')}`);
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        // Replace escaped newlines (needed when stored in .env)
        privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
    });

    db = admin.firestore();
    auth = admin.auth();

    // Firestore settings
    db.settings({ ignoreUndefinedProperties: true });

    console.log('✅ Firebase Admin SDK initialized');
    console.log(`📦 Firestore project: ${FIREBASE_PROJECT_ID}`);
  } catch (error) {
    console.error('❌ Firebase initialization crashed:', error.message);
    throw error;
  }
};

const getDB = () => {
  if (!db) throw new Error('Firestore not initialized. Call initFirebase() first.');
  return db;
};

const getAuth = () => {
  if (!auth) throw new Error('Firebase Auth not initialized. Call initFirebase() first.');
  return auth;
};

module.exports = { initFirebase, getDB, getAuth, admin };
