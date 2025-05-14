import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Replace these values with your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCw3WqIGb-GaOyZTTBVAJfaozZemtL6ayA",
    authDomain: "chat-app-2e8cc.firebaseapp.com",
    projectId: "chat-app-2e8cc",
    storageBucket: "chat-app-2e8cc.firebasestorage.app",
    messagingSenderId: "386470901976",
    appId: "1:386470901976:web:c64f2b4c8a810bf0097fad"
  };  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 