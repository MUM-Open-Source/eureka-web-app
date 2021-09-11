import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/firestore';
import 'firebase/storage';

interface ConfigVars {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
}

// development config
const firebaseConfig: ConfigVars = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_PROJECT_ID + '.firebaseapp.com',
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_PROJECT_ID + '.appspot.com',
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_FIREBASE_APP_ID,
    measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const db_init = firebase.initializeApp(firebaseConfig);

const analytics = firebase.analytics();
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { analytics, db, auth, storage };
